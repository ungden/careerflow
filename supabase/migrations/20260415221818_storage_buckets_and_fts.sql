INSERT INTO storage.buckets (id, name, public) VALUES ('avatars','avatars',true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('company-logos','company-logos',true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('company-covers','company-covers',true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('message-attachments','message-attachments',false) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "avatars_read_public" ON storage.objects;
CREATE POLICY "avatars_read_public" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
DROP POLICY IF EXISTS "avatars_write_own" ON storage.objects;
CREATE POLICY "avatars_write_own" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
DROP POLICY IF EXISTS "avatars_update_own" ON storage.objects;
CREATE POLICY "avatars_update_own" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
DROP POLICY IF EXISTS "avatars_delete_own" ON storage.objects;
CREATE POLICY "avatars_delete_own" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "company_logos_read_public" ON storage.objects;
CREATE POLICY "company_logos_read_public" ON storage.objects FOR SELECT USING (bucket_id = 'company-logos');
DROP POLICY IF EXISTS "company_logos_write_own" ON storage.objects;
CREATE POLICY "company_logos_write_own" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'company-logos' AND auth.uid()::text = (storage.foldername(name))[1]);
DROP POLICY IF EXISTS "company_logos_update_own" ON storage.objects;
CREATE POLICY "company_logos_update_own" ON storage.objects FOR UPDATE USING (bucket_id = 'company-logos' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "company_covers_read_public" ON storage.objects;
CREATE POLICY "company_covers_read_public" ON storage.objects FOR SELECT USING (bucket_id = 'company-covers');
DROP POLICY IF EXISTS "company_covers_write_own" ON storage.objects;
CREATE POLICY "company_covers_write_own" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'company-covers' AND auth.uid()::text = (storage.foldername(name))[1]);
DROP POLICY IF EXISTS "company_covers_update_own" ON storage.objects;
CREATE POLICY "company_covers_update_own" ON storage.objects FOR UPDATE USING (bucket_id = 'company-covers' AND auth.uid()::text = (storage.foldername(name))[1]);

ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS search_vector tsvector;
CREATE OR REPLACE FUNCTION public.jobs_search_trigger() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_vector := to_tsvector('simple',
    coalesce(NEW.title,'') || ' ' ||
    coalesce(NEW.description,'') || ' ' ||
    coalesce(NEW.requirements,'') || ' ' ||
    coalesce(NEW.industry,'') || ' ' ||
    coalesce(NEW.location,'') || ' ' ||
    coalesce(array_to_string(NEW.skills, ' '),'')
  );
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS jobs_search_update ON public.jobs;
CREATE TRIGGER jobs_search_update BEFORE INSERT OR UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.jobs_search_trigger();
CREATE INDEX IF NOT EXISTS idx_jobs_search ON public.jobs USING gin(search_vector);
UPDATE public.jobs SET updated_at = updated_at;

INSERT INTO public.skills_taxonomy (name, category) VALUES
  ('JavaScript','tech'),('TypeScript','tech'),('React','tech'),('Next.js','tech'),
  ('Node.js','tech'),('Python','tech'),('Java','tech'),('C#','tech'),('PHP','tech'),
  ('SQL','tech'),('PostgreSQL','tech'),('MongoDB','tech'),('AWS','tech'),('Docker','tech'),
  ('Figma','design'),('Photoshop','design'),('Illustrator','design'),('UI/UX','design'),
  ('Tiếng Anh','soft'),('Giao tiếp','soft'),('Quản lý dự án','soft'),('Lãnh đạo','soft'),
  ('Marketing','business'),('SEO','business'),('Content','business'),('Sales','business'),
  ('Kế toán','business'),('Tài chính','business'),('Nhân sự','business')
ON CONFLICT (name) DO NOTHING;
