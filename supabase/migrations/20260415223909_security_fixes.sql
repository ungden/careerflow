DROP POLICY IF EXISTS "email_queue_admin_only" ON public.email_queue;
CREATE POLICY "email_queue_admin_only" ON public.email_queue FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

ALTER FUNCTION public.increment_job_view(uuid, uuid, text) SET search_path = public, pg_temp;
ALTER FUNCTION public.get_or_create_conversation(uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.jobs_search_trigger() SET search_path = public, pg_temp;
ALTER FUNCTION public.messages_sync_body() SET search_path = public, pg_temp;

DROP POLICY IF EXISTS "job_reports_insert_any" ON public.job_reports;
CREATE POLICY "job_reports_insert_authed" ON public.job_reports FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "job_views_insert_any" ON public.job_views;
CREATE POLICY "job_views_insert_authed_or_anon" ON public.job_views FOR INSERT WITH CHECK (true);
