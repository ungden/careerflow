ALTER TABLE public.ai_usage DROP CONSTRAINT IF EXISTS ai_usage_tool_check;
ALTER TABLE public.ai_usage ADD CONSTRAINT ai_usage_tool_check
  CHECK (tool IN ('review', 'cover_letter', 'interview', 'salary', 'jd_match', 'rewrite'));
