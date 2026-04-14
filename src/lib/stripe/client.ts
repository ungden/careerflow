import Stripe from "stripe";

type StripeOptions = ConstructorParameters<typeof Stripe>[1];

export function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    // Pin to a known-stable API version. The literal type accepted by the
    // Stripe SDK changes across majors, so we cast to the SDK's option type.
    apiVersion: "2024-12-18.acacia",
  } as unknown as StripeOptions);
}
