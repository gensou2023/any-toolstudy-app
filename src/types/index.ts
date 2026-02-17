export type RoleId = 'frontend-engineer' | 'backend-engineer' | 'web-designer' | 'director' | 'non-engineer' | 'student-intern';

export interface User {
  id: string;
  nickname: string;
  role: RoleId | null;
  email?: string;
  auth_id?: string;
  skill_level?: string;
  created_at: string;
  last_active_at: string;
}

export interface Quest {
  id: string;
  dayId: number;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  targetRoles: RoleId[] | 'all';
  steps: QuestStep[];
  challenge: string;
  hints: string[];
  checkQuestions: CheckQuestion[];
}

export interface QuestStep {
  title: string;
  content: string;
}

export interface CheckQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuestCompletion {
  id: string;
  user_id: string;
  quest_id: string;
  completed_at: string;
}

export interface Badge {
  id: string;
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  nickname?: string;
  quest_id: string | null;
  quest_title: string | null;
  rating: number | null;
  comment: string | null;
  type: 'quest' | 'general';
  created_at: string;
}

export interface FeedbackWithUser extends Feedback {
  user_nickname: string;
  user_role: RoleId | null;
  user_level: number;
  user_xp: number;
  user_progress: number;
}

export interface DayCurriculum {
  dayId: number;
  title: string;
  description: string;
  emoji: string;
  quests: Quest[];
}

export interface AuthCookie {
  userId: string;
  nickname: string;
}

export interface RoleInfo {
  id: RoleId;
  label: string;
  emoji: string;
  description: string;
  color: string;
}
