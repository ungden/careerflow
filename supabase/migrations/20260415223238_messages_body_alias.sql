ALTER TABLE public.messages ALTER COLUMN content DROP NOT NULL;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS body text;

CREATE OR REPLACE FUNCTION public.messages_sync_body() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.body IS NULL AND NEW.content IS NOT NULL THEN NEW.body := NEW.content; END IF;
  IF NEW.content IS NULL AND NEW.body IS NOT NULL THEN NEW.content := NEW.body; END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS messages_sync_body_t ON public.messages;
CREATE TRIGGER messages_sync_body_t BEFORE INSERT OR UPDATE ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.messages_sync_body();

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "messages_own" ON public.messages;
CREATE POLICY "messages_select_own" ON public.messages FOR SELECT USING (auth.uid() IN (from_user_id, to_user_id));
DROP POLICY IF EXISTS "messages_insert_own" ON public.messages;
CREATE POLICY "messages_insert_own" ON public.messages FOR INSERT WITH CHECK (auth.uid() = from_user_id);
DROP POLICY IF EXISTS "messages_update_participants" ON public.messages;
CREATE POLICY "messages_update_participants" ON public.messages FOR UPDATE USING (auth.uid() IN (from_user_id, to_user_id));

DROP POLICY IF EXISTS "referrals_insert_system" ON public.referrals;
CREATE POLICY "referrals_insert_system" ON public.referrals FOR INSERT WITH CHECK (true);
