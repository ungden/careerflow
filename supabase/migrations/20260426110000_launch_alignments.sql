-- Email queue: code writes `payload` and `html` columns. Add them and sync with `data`.
ALTER TABLE public.email_queue ADD COLUMN IF NOT EXISTS payload jsonb;
ALTER TABLE public.email_queue ADD COLUMN IF NOT EXISTS html text;
ALTER TABLE public.email_queue ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

CREATE OR REPLACE FUNCTION public.email_queue_sync_payload() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.payload IS NULL AND NEW.data IS NOT NULL THEN NEW.payload := NEW.data; END IF;
  IF NEW.data IS NULL AND NEW.payload IS NOT NULL THEN NEW.data := NEW.payload; END IF;
  RETURN NEW;
END $$;
ALTER FUNCTION public.email_queue_sync_payload() SET search_path = public, pg_temp;

DROP TRIGGER IF EXISTS email_queue_sync_payload_t ON public.email_queue;
CREATE TRIGGER email_queue_sync_payload_t BEFORE INSERT OR UPDATE ON public.email_queue
FOR EACH ROW EXECUTE FUNCTION public.email_queue_sync_payload();

-- Performance indexes (N3)
CREATE INDEX IF NOT EXISTS idx_jobs_active_expires ON public.jobs(is_active, expires_at DESC) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_applications_user ON public.applications(candidate_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_job_status ON public.applications(job_id, status);
CREATE INDEX IF NOT EXISTS idx_messages_conv_created ON public.messages(conversation_id, created_at);

-- Make sure transactions can record Sepay rows during checkout creation (pending) and Stripe with succeeded status.
-- Existing CHECK already allows pending|succeeded|failed|refunded — no change needed.
