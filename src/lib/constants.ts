export const APP_NAME = 'Cursor道場';
export const COOKIE_NAME = 'cursor-dojo-auth';
export const DAY_UNLOCK_THRESHOLD = 0.5; // 50% completion to unlock next day
export const TOTAL_DAYS = 10;
export const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const DAYS_FOR_ROLE: Record<string, number> = {
  'student-intern': 10,
  default: 5,
};

export function getTotalDays(role: string | null): number {
  return DAYS_FOR_ROLE[role ?? 'default'] ?? DAYS_FOR_ROLE.default;
}
