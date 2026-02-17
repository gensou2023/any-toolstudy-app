-- Fix feedbacks table: allow nullable fields for general feedback + add type column

-- 1. Drop the NOT NULL + CHECK constraint on rating
ALTER TABLE feedbacks ALTER COLUMN rating DROP NOT NULL;
ALTER TABLE feedbacks DROP CONSTRAINT IF EXISTS feedbacks_rating_check;
ALTER TABLE feedbacks ADD CONSTRAINT feedbacks_rating_check CHECK (rating IS NULL OR (rating BETWEEN 1 AND 5));

-- 2. Make quest_id and quest_title nullable
ALTER TABLE feedbacks ALTER COLUMN quest_id DROP NOT NULL;
ALTER TABLE feedbacks ALTER COLUMN quest_title DROP NOT NULL;

-- 3. Add type column
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'general';
