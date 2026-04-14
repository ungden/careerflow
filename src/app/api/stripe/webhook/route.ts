import { NextRequest } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe/client";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return Response.json(
      { error: "Webhook đang được cấu hình" },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json(
      { error: "Thiếu chữ ký Stripe" },
      { status: 400 }
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return Response.json(
      { error: "Chữ ký webhook không hợp lệ" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;

    if (!userId) {
      console.error("Webhook session thiếu user_id metadata");
      return Response.json({ received: true });
    }

    const supabase = await createClient();
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        subscription_tier: "pro",
        subscription_expires_at: expiresAt.toISOString(),
      })
      .eq("id", userId);

    if (profileError) {
      console.error("Lỗi cập nhật profile:", profileError);
    }

    const amount =
      typeof session.amount_total === "number" ? session.amount_total : 99000;

    const { error: txError } = await supabase.from("transactions").insert({
      user_id: userId,
      amount,
      currency: (session.currency || "vnd").toUpperCase(),
      provider: "stripe",
      provider_session_id: session.id,
      status: "completed",
      description: "CareerFlow Pro Monthly",
    });

    if (txError) {
      console.error("Lỗi ghi nhận giao dịch:", txError);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", userId)
      .single();

    if (profile?.email) {
      const { error: emailError } = await supabase.from("email_queue").insert({
        to_email: profile.email,
        subject: "Chào mừng đến với CareerFlow Pro!",
        template: "subscription_activated",
        payload: {
          name: profile.full_name || "bạn",
          expires_at: expiresAt.toISOString(),
        },
        status: "pending",
      });

      if (emailError) {
        console.error("Lỗi xếp hàng email:", emailError);
      }
    }
  }

  return Response.json({ received: true });
}
