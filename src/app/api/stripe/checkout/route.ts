import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe/client";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  if (!env.STRIPE_ENABLED) {
    return Response.json(
      { error: "Stripe đang tạm tắt — vui lòng dùng Sepay." },
      { status: 404 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json(
      { error: "Vui lòng đăng nhập để tiếp tục." },
      { status: 401 }
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return Response.json(
      { error: "Thanh toán đang được cấu hình" },
      { status: 503 }
    );
  }

  const origin =
    request.headers.get("origin") ||
    env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email ?? undefined,
      line_items: [
        {
          price_data: {
            currency: "vnd",
            product_data: {
              name: "YourCV Pro Monthly",
              description:
                "Tất cả templates, AI không giới hạn, không watermark",
            },
            unit_amount: 99000,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/nang-cap/thanh-cong?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bang-gia`,
      metadata: { user_id: user.id },
      subscription_data: {
        metadata: { user_id: user.id },
      },
    });

    return Response.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return Response.json(
      { error: "Không thể tạo phiên thanh toán. Vui lòng thử lại." },
      { status: 502 }
    );
  }
}
