-- CVs table
CREATE TABLE public.cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'CV chưa đặt tên',
  template_id TEXT NOT NULL DEFAULT 'classic',
  is_primary BOOLEAN DEFAULT FALSE,
  personal_info JSONB DEFAULT '{}',
  experiences JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  languages JSONB DEFAULT '[]',
  certifications JSONB DEFAULT '[]',
  projects JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cvs_user_id ON public.cvs(user_id);
CREATE INDEX idx_cvs_is_primary ON public.cvs(user_id, is_primary) WHERE is_primary = TRUE;

ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own CVs"
  ON public.cvs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create CVs"
  ON public.cvs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs"
  ON public.cvs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs"
  ON public.cvs FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Published CVs are visible to all"
  ON public.cvs FOR SELECT
  USING (
    is_primary = true
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = cvs.user_id
      AND profiles.is_published = true
    )
  );
