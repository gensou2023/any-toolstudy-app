-- Feature 3: Assessment
CREATE TABLE assessment_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  answers JSONB NOT NULL,
  skill_level TEXT NOT NULL,  -- 'beginner' | 'intermediate' | 'advanced'
  total_score INT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS skill_level TEXT DEFAULT NULL;

-- RLS
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to assessment_results" ON assessment_results FOR ALL USING (true) WITH CHECK (true);
