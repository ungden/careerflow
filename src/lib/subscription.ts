type Tier = "free" | "pro";

export interface ProfileLike {
  subscription_tier?: Tier | string | null;
  subscription_expires_at?: string | null;
}

export function getEffectiveTier(profile: ProfileLike | null | undefined): Tier {
  if (!profile) return "free";
  if (profile.subscription_tier !== "pro") return "free";
  if (!profile.subscription_expires_at) return "free";
  const expires = new Date(profile.subscription_expires_at).getTime();
  if (Number.isNaN(expires)) return "free";
  return expires > Date.now() ? "pro" : "free";
}

export function isPro(profile: ProfileLike | null | undefined): boolean {
  return getEffectiveTier(profile) === "pro";
}
