/**
 * Analytics date bucketing and aggregation utilities
 */

/** Format a Date to YYYY-MM-DD */
export function toDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Format a Date to its ISO week string (YYYY-Www) */
export function toWeekString(d: Date): string {
  const target = new Date(d.getTime());
  target.setHours(0, 0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number (Mon=1)
  target.setDate(target.getDate() + 4 - (target.getDay() || 7));
  const yearStart = new Date(target.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${target.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/** Generate an array of date strings for the past N days (inclusive of today) */
export function getPastDays(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(toDateString(d));
  }
  return dates;
}

/** Generate an array of week strings for the past N weeks (inclusive of current week) */
export function getPastWeeks(n: number): string[] {
  const weeks: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i * 7);
    const w = toWeekString(d);
    if (!weeks.includes(w)) {
      weeks.push(w);
    }
  }
  return weeks;
}

/**
 * Build a DAU map from multiple activity timestamp arrays.
 * Returns Map<dateString, Set<userId>>
 */
export function buildDailyActiveMap(
  activities: { userId: string; timestamp: string }[]
): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  for (const { userId, timestamp } of activities) {
    const dateStr = toDateString(new Date(timestamp));
    if (!map.has(dateStr)) {
      map.set(dateStr, new Set());
    }
    map.get(dateStr)!.add(userId);
  }
  return map;
}

/**
 * Build a WAU map from daily active map.
 * Returns Map<weekString, Set<userId>>
 */
export function buildWeeklyActiveMap(
  dailyMap: Map<string, Set<string>>
): Map<string, Set<string>> {
  const weeklyMap = new Map<string, Set<string>>();
  for (const [dateStr, userSet] of dailyMap) {
    const weekStr = toWeekString(new Date(dateStr));
    if (!weeklyMap.has(weekStr)) {
      weeklyMap.set(weekStr, new Set());
    }
    const weekSet = weeklyMap.get(weekStr)!;
    for (const uid of userSet) {
      weekSet.add(uid);
    }
  }
  return weeklyMap;
}

/** Bucket a WPM value into a human-readable range */
export function wpmBucket(wpm: number): string {
  if (wpm < 50) return '0-49';
  if (wpm < 100) return '50-99';
  if (wpm < 150) return '100-149';
  if (wpm < 200) return '150-199';
  if (wpm < 250) return '200-249';
  return '250+';
}

/** Progress percentage to bucket label */
export function progressBucket(pct: number): string {
  if (pct === 0) return '0%';
  if (pct <= 25) return '1-25%';
  if (pct <= 50) return '26-50%';
  if (pct <= 75) return '51-75%';
  if (pct < 100) return '76-99%';
  return '100%';
}
