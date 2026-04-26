-- Profile extensions
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS availability text CHECK (availability IN ('open','considering','not_looking')) DEFAULT 'considering';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS salary_expectation_min bigint;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS salary_expectation_max bigint;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_locations text[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code text UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referred_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false;

ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS featured_until timestamptz;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS skills text[];

ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS cover_url text;
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS founded_year int;
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS benefits text;
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS tech_stack text[];

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  link text,
  payload jsonb DEFAULT '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, read_at NULLS FIRST, created_at DESC);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
CREATE POLICY "notifications_select_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "notifications_update_own" ON public.notifications;
CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.job_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  viewer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_hash text,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_job_views_job_created ON public.job_views(job_id, created_at DESC);
ALTER TABLE public.job_views ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "job_views_insert_any" ON public.job_views;
CREATE POLICY "job_views_insert_any" ON public.job_views FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "job_views_select_job_owner" ON public.job_views;
CREATE POLICY "job_views_select_job_owner" ON public.job_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND j.posted_by = auth.uid())
);

CREATE TABLE IF NOT EXISTS public.profile_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  viewer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_hash text,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_profile_views_profile_created ON public.profile_views(profile_id, created_at DESC);
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profile_views_insert_any" ON public.profile_views;
CREATE POLICY "profile_views_insert_any" ON public.profile_views FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "profile_views_select_own" ON public.profile_views;
CREATE POLICY "profile_views_select_own" ON public.profile_views FOR SELECT USING (auth.uid() = profile_id);

CREATE TABLE IF NOT EXISTS public.saved_candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  candidate_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  note text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(employer_id, candidate_id)
);
ALTER TABLE public.saved_candidates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "saved_candidates_own" ON public.saved_candidates;
CREATE POLICY "saved_candidates_own" ON public.saved_candidates FOR ALL USING (auth.uid() = employer_id) WITH CHECK (auth.uid() = employer_id);

CREATE TABLE IF NOT EXISTS public.company_followers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, company_id)
);
ALTER TABLE public.company_followers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "company_followers_own" ON public.company_followers;
CREATE POLICY "company_followers_own" ON public.company_followers FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "company_followers_select_public" ON public.company_followers;
CREATE POLICY "company_followers_select_public" ON public.company_followers FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.application_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_application_notes_app ON public.application_notes(application_id, created_at DESC);
ALTER TABLE public.application_notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "application_notes_employer" ON public.application_notes;
CREATE POLICY "application_notes_employer" ON public.application_notes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.applications a JOIN public.jobs j ON j.id = a.job_id WHERE a.id = application_id AND j.posted_by = auth.uid())
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.applications a JOIN public.jobs j ON j.id = a.job_id WHERE a.id = application_id AND j.posted_by = auth.uid())
);

CREATE TABLE IF NOT EXISTS public.cv_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cv_id uuid NOT NULL REFERENCES public.cvs(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  snapshot jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_cv_versions_cv ON public.cv_versions(cv_id, created_at DESC);
ALTER TABLE public.cv_versions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "cv_versions_own" ON public.cv_versions;
CREATE POLICY "cv_versions_own" ON public.cv_versions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_a uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  participant_b uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  CHECK (participant_a < participant_b),
  UNIQUE(participant_a, participant_b)
);
CREATE INDEX IF NOT EXISTS idx_conversations_a ON public.conversations(participant_a, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_b ON public.conversations(participant_b, last_message_at DESC);
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "conversations_participants" ON public.conversations;
CREATE POLICY "conversations_participants" ON public.conversations FOR SELECT USING (auth.uid() IN (participant_a, participant_b));
DROP POLICY IF EXISTS "conversations_insert_participant" ON public.conversations;
CREATE POLICY "conversations_insert_participant" ON public.conversations FOR INSERT WITH CHECK (auth.uid() IN (participant_a, participant_b));

ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS attachment_url text;
CREATE INDEX IF NOT EXISTS idx_messages_conv ON public.messages(conversation_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.company_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  pros text,
  cons text,
  advice text,
  is_anonymous boolean DEFAULT true,
  is_current_employee boolean DEFAULT false,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(company_id, reviewer_id)
);
CREATE INDEX IF NOT EXISTS idx_company_reviews_company ON public.company_reviews(company_id, created_at DESC);
ALTER TABLE public.company_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "company_reviews_select_approved" ON public.company_reviews;
CREATE POLICY "company_reviews_select_approved" ON public.company_reviews FOR SELECT USING (approved OR auth.uid() = reviewer_id);
DROP POLICY IF EXISTS "company_reviews_insert_self" ON public.company_reviews;
CREATE POLICY "company_reviews_insert_self" ON public.company_reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
DROP POLICY IF EXISTS "company_reviews_update_self" ON public.company_reviews;
CREATE POLICY "company_reviews_update_self" ON public.company_reviews FOR UPDATE USING (auth.uid() = reviewer_id);

CREATE TABLE IF NOT EXISTS public.saved_searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  filters jsonb NOT NULL,
  email_alert boolean DEFAULT false,
  last_alerted_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "saved_searches_own" ON public.saved_searches;
CREATE POLICY "saved_searches_own" ON public.saved_searches FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.job_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  reporter_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reason text NOT NULL,
  details text,
  status text DEFAULT 'pending' CHECK (status IN ('pending','reviewed','dismissed','actioned')),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.job_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "job_reports_insert_any" ON public.job_reports;
CREATE POLICY "job_reports_insert_any" ON public.job_reports FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "job_reports_select_own" ON public.job_reports;
CREATE POLICY "job_reports_select_own" ON public.job_reports FOR SELECT USING (auth.uid() = reporter_id);

CREATE TABLE IF NOT EXISTS public.skills_taxonomy (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text,
  aliases text[],
  usage_count int DEFAULT 0
);
ALTER TABLE public.skills_taxonomy ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "skills_taxonomy_public_read" ON public.skills_taxonomy;
CREATE POLICY "skills_taxonomy_public_read" ON public.skills_taxonomy FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referee_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rewarded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(referrer_id, referee_id)
);
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "referrals_select_self" ON public.referrals;
CREATE POLICY "referrals_select_self" ON public.referrals FOR SELECT USING (auth.uid() IN (referrer_id, referee_id));

CREATE OR REPLACE FUNCTION public.increment_job_view(p_job_id uuid, p_viewer uuid, p_ip_hash text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.job_views (job_id, viewer_id, ip_hash) VALUES (p_job_id, p_viewer, p_ip_hash);
  UPDATE public.jobs SET views_count = COALESCE(views_count, 0) + 1 WHERE id = p_job_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_or_create_conversation(p_other uuid)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_me uuid := auth.uid();
  v_a uuid;
  v_b uuid;
  v_id uuid;
BEGIN
  IF v_me IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF v_me = p_other THEN RAISE EXCEPTION 'cannot converse with self'; END IF;
  v_a := LEAST(v_me, p_other); v_b := GREATEST(v_me, p_other);
  SELECT id INTO v_id FROM public.conversations WHERE participant_a = v_a AND participant_b = v_b;
  IF v_id IS NOT NULL THEN RETURN v_id; END IF;
  INSERT INTO public.conversations (participant_a, participant_b) VALUES (v_a, v_b) RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;
