-- Feature 5: Typing Game Scores
CREATE TABLE typing_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('30s', '60s', '90s')),
  score INT NOT NULL,
  max_combo INT NOT NULL DEFAULT 0,
  accuracy DECIMAL(5,2) NOT NULL DEFAULT 0,
  wpm DECIMAL(5,1) NOT NULL DEFAULT 0,
  played_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE typing_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to typing_scores" ON typing_scores FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_typing_scores_mode_score ON typing_scores(mode, score DESC);
CREATE INDEX IF NOT EXISTS idx_typing_scores_user ON typing_scores(user_id);
