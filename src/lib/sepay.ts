import { env } from "@/lib/env";

// Plan codes are exactly 4 alphanumeric chars so every ref code is a fixed
// 12-char pattern: `CF` + 4-char plan + 6-char random — easy to match in Sepay
// "Cấu trúc mã thanh toán": tiền tố `CF`, hậu tố 10 ký tự, số và chữ.
export const SEPAY_PLANS = {
  pro_monthly: {
    code: "PROM",
    label: "YourCV Pro Monthly",
    amount: 99000,
    durationDays: 31,
  },
  pro_yearly: {
    code: "PROY",
    label: "YourCV Pro Annual",
    amount: 990000,
    durationDays: 366,
  },
  featured_basic: {
    code: "FTBS",
    label: "Job Featured 7 ngày",
    amount: 199000,
    durationDays: 7,
  },
  featured_pro: {
    code: "FTPR",
    label: "Job Featured 30 ngày",
    amount: 599000,
    durationDays: 30,
  },
} as const;

export type SepayPlan = keyof typeof SEPAY_PLANS;

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateRefCode(plan: SepayPlan): string {
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += REF_ALPHABET[Math.floor(Math.random() * REF_ALPHABET.length)];
  }
  return `CF${SEPAY_PLANS[plan].code}${suffix}`;
}

// VietQR via Sepay — params per https://docs.sepay.vn/tao-qr-code-vietqr-dong.html
// Only `acc`, `bank` are required. `amount` + `des` are optional but used here for dynamic QR.
export function buildQrUrl(opts: {
  amount: number;
  refCode: string;
}): string {
  const account = env.SEPAY_BANK_ACCOUNT;
  const bank = env.SEPAY_BANK_BRAND || "MBBank";
  const params = new URLSearchParams({
    acc: account || "",
    bank: bank,
    amount: String(opts.amount),
    des: opts.refCode,
  });
  return `https://qr.sepay.vn/img?${params.toString()}`;
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function verifySepayAuth(authHeader: string | null): boolean {
  const expected = env.SEPAY_API_KEY;
  if (!expected) return false;
  if (!authHeader) return false;
  const prefix = "Apikey ";
  if (!authHeader.startsWith(prefix)) return false;
  const provided = authHeader.slice(prefix.length).trim();
  return timingSafeEqual(provided, expected);
}

export function extractRefCode(transferContent: string | null | undefined): string | null {
  if (!transferContent) return null;
  // CF + 4-char plan + 6-char random suffix = 12 chars total, alphanumeric uppercase.
  const match = transferContent.toUpperCase().match(/CF[A-Z0-9]{10}/);
  return match ? match[0] : null;
}
