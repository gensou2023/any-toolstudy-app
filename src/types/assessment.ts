export interface AssessmentQuestion {
  id: string;
  question: string;
  emoji: string;
  options: AssessmentOption[];
}

export interface AssessmentOption {
  label: string;
  score: number;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface AssessmentResult {
  id: string;
  user_id: string;
  answers: Record<string, number>; // questionId -> selectedIndex
  skill_level: SkillLevel;
  total_score: number;
  completed_at: string;
}
