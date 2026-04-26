# YourCV — Operational Runbook

## Production env vars

See `.env.example` for the full list. Required in production:

| Var | Purpose | Where |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Vercel + GitHub Actions |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key | Vercel + GitHub Actions |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role for webhooks | Vercel only |
| `NEXT_PUBLIC_APP_URL` | Canonical app URL | Vercel |
| `SEPAY_API_KEY` | Webhook auth for Sepay | Vercel only |
| `SEPAY_BANK_ACCOUNT` | Bank account number | Vercel |
| `SEPAY_BANK_BRAND` | e.g. `MBBank` | Vercel |
| `SEPAY_ACCOUNT_NAME` | Account holder | Vercel |
| `RESEND_API_KEY` | Transactional email | Vercel only |
| `RESEND_FROM_EMAIL` | `YourCV <no-reply@yourcv.net>` | Vercel |
| `OPENAI_API_KEY` | AI tools | Vercel only |
| `CRON_SECRET` | Cron auth — generate `openssl rand -hex 32` | Vercel only |

Optional: `STRIPE_ENABLED=true` + `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` to re-enable Stripe.
Optional: `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` for distributed rate limiting (in-memory fallback otherwise).
Optional: `NEXT_PUBLIC_GA_ID` (GA4 ID) — only loads after the user accepts cookies.

## Sepay setup

1. Sign up at https://my.sepay.vn, link your bank account (MBBank recommended for fastest reconciliation).
2. Generate an API key under **Cài đặt → API**.
3. In Vercel, set `SEPAY_API_KEY`, `SEPAY_BANK_ACCOUNT`, `SEPAY_BANK_BRAND`, `SEPAY_ACCOUNT_NAME`.
4. In Sepay dashboard → **Webhooks**, add `https://yourcv.net/api/sepay/webhook` with `Authorization: Apikey <SEPAY_API_KEY>` header.
5. Send a 1,000 VND test transfer with content `CFTEST123` and verify the webhook hits `/api/sepay/webhook` (Vercel logs).

## Cron jobs

- `POST /api/email/send-queued` — drain pending emails. Schedule: every 5 minutes.
  - Vercel: add to `vercel.json` cron with `Authorization: Bearer ${CRON_SECRET}`.

## Deployment

1. Push to `main` → Vercel auto-deploys.
2. Apply pending Supabase migrations BEFORE promoting the deploy:
   ```
   supabase db push --project-ref zgbpkrvninhjhctxwbsp
   ```
3. Smoke test: `curl https://yourcv.net/api/health` → expect `{ status: "ok" }`.

## Backups

- Supabase Pro plan: daily automated backups, 7-day retention, PITR enabled.
- Manual snapshot before risky migrations: `supabase db dump > snapshot-$(date +%F).sql`.
- Restore drill: monthly — pull a backup into a staging branch via Supabase MCP `create_branch` and run smoke tests.

## Incident response

| Symptom | First check | Next step |
|---|---|---|
| 500s spike | Vercel logs + `/api/health` | Roll back via Vercel dashboard |
| Sepay payments not reconciling | `transactions` table — `pending` rows older than 30m | Check Sepay webhook delivery + `SEPAY_API_KEY` |
| AI 502s | OpenAI status page + `OPENAI_API_KEY` quota | Disable `cong-cu` page temporarily |
| Email not sending | `email_queue` rows with `status=failed` + Resend dashboard | Re-queue and rerun cron |

## Common ops

- Backfill pending emails: `curl -X POST -H "Authorization: Bearer $CRON_SECRET" https://yourcv.net/api/email/send-queued`
- Find users with expired Pro: `SELECT id, email, subscription_expires_at FROM profiles WHERE subscription_tier='pro' AND subscription_expires_at < now();`
- Manual upgrade: update `profiles.subscription_tier='pro'`, `subscription_expires_at = now() + interval '31 days'`.

## Security

- RLS is enabled on all `public.*` tables; the only paths to user data are (a) authenticated client → RLS-gated, or (b) service role from server routes.
- Webhooks (`/api/sepay/webhook`, `/api/stripe/webhook`) MUST use the service-role client and verify auth headers — never the SSR client.
- Stripe is disabled by default (`STRIPE_ENABLED=false`). Re-enable only after re-running webhook idempotency tests.
