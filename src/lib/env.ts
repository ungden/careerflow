import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";
// During `next build`, env vars used only at runtime won't be set. Don't fail
// the build for those — only fail at boot when running the app.
const isBuildPhase =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.NEXT_PHASE === "phase-export";
const isStrict = isProd && !isBuildPhase;

const required = (msg: string) =>
  isStrict ? z.string().min(1, msg) : z.string().min(1, msg).optional();

const schema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: required("SUPABASE_SERVICE_ROLE_KEY missing"),

  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_GA_ID: z.string().optional(),

  SEPAY_API_KEY: required("SEPAY_API_KEY missing — payment webhook is open"),
  SEPAY_BANK_ACCOUNT: required("SEPAY_BANK_ACCOUNT missing"),
  SEPAY_BANK_BRAND: z.string().default("MBBank"),
  SEPAY_ACCOUNT_NAME: required("SEPAY_ACCOUNT_NAME missing"),

  STRIPE_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  RESEND_API_KEY: required("RESEND_API_KEY missing — email queue will fail"),
  RESEND_FROM_EMAIL: z
    .string()
    .default("YourCV <no-reply@yourcv.net>"),

  OPENAI_API_KEY: z.string().optional(),

  CRON_SECRET: required("CRON_SECRET missing — cron endpoints are open"),

  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const flat = parsed.error.flatten().fieldErrors;
  const message = Object.entries(flat)
    .map(([key, errs]) => `  - ${key}: ${(errs ?? []).join(", ")}`)
    .join("\n");
  if (isStrict) {
    throw new Error(`Invalid environment variables:\n${message}`);
  } else {
    console.warn(
      `[env] Missing/invalid env vars (dev or build phase — continuing):\n${message}`
    );
  }
}

const data = (parsed.success ? parsed.data : (process.env as unknown)) as z.infer<
  typeof schema
>;

export const env = {
  ...data,
  STRIPE_ENABLED:
    parsed.success
      ? parsed.data.STRIPE_ENABLED
      : process.env.STRIPE_ENABLED === "true",
  IS_PROD: isProd,
};

export function requireEnv<K extends keyof typeof env>(key: K): NonNullable<(typeof env)[K]> {
  const v = env[key];
  if (v === undefined || v === null || v === "") {
    throw new Error(`Required env var ${String(key)} is not set`);
  }
  return v as NonNullable<(typeof env)[K]>;
}
