export interface AnalyticsSummary {
  totalUsers: number;
  activeUsersToday: number;
  activeUsersThisWeek: number;
  totalCompletions: number;
  totalTypingPlays: number;
  averageRating: number;
}

export interface DailyCount {
  date: string;
  count: number;
}

export interface WeeklyCount {
  week: string;
  count: number;
}

export interface RoleDistribution {
  role: string;
  count: number;
}

export interface UsageData {
  dailyActiveUsers: DailyCount[];
  weeklyActiveUsers: WeeklyCount[];
  userGrowth: { date: string; cumulative: number }[];
  roleDistribution: RoleDistribution[];
}

export interface DayCompletionRate {
  dayId: number;
  title: string;
  emoji: string;
  completionRate: number;
  startedCount: number;
  completedCount: number;
}

export interface ProgressBucket {
  bucket: string;
  count: number;
}

export interface LearningProgressData {
  dayCompletionRates: DayCompletionRate[];
  averageProgress: number;
  progressDistribution: ProgressBucket[];
}

export interface ModeStats {
  mode: string;
  count: number;
}

export interface ModeAverage {
  mode: string;
  avgScore: number;
  avgWPM: number;
  avgAccuracy: number;
}

export interface WPMRange {
  range: string;
  count: number;
}

export interface TypingStatsData {
  totalPlays: number;
  playsByMode: ModeStats[];
  averageByMode: ModeAverage[];
  wpmDistribution: WPMRange[];
  dailyPlays: DailyCount[];
}

export interface FeedbackTrendsData {
  ratingDistribution: Record<number, number>;
  weeklyVolume: { week: string; questCount: number; generalCount: number }[];
  averageRatingTrend: { week: string; avgRating: number }[];
  questSatisfaction: { questTitle: string; avgRating: number; count: number }[];
}

export interface AnalyticsResponse {
  summary: AnalyticsSummary;
  usage: UsageData;
  learningProgress: LearningProgressData;
  typingStats: TypingStatsData;
  feedbackTrends: FeedbackTrendsData;
}
