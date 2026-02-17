-- Feature 4: Skill-based Day Unlocks
CREATE TABLE day_unlock_overrides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  day_id INT NOT NULL,
  reason TEXT NOT NULL,  -- 'assessment' | 'manual'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, day_id)
);

-- RLS
ALTER TABLE day_unlock_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to day_unlock_overrides" ON day_unlock_overrides FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_day_unlock_overrides_user ON day_unlock_overrides(user_id);
