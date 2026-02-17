import { Badge } from '@/types';

// Intern-specific badge IDs (Day 6-10 related)
export const INTERN_BADGE_IDS = [
  'intern-day6-complete',
  'intern-day7-complete',
  'intern-day8-complete',
  'intern-day9-complete',
  'intern-day10-complete',
  'intern-all-complete',
];

// Standard badge IDs (Day 1-5 and general)
export const STANDARD_BADGE_IDS = [
  'first-step',
  'day1-complete',
  'day2-complete',
  'day3-complete',
  'day4-complete',
  'day5-complete',
  'speed-runner',
  'explorer',
  'half-way',
  'feedback-hero',
  'perfect-score',
  'all-complete',
];

export function filterBadges(
  badges: Badge[],
  mode: 'intern' | 'standard' | 'all'
): Badge[] {
  switch (mode) {
    case 'intern':
      return badges.filter((b) => INTERN_BADGE_IDS.includes(b.badgeId));
    case 'standard':
      return badges.filter((b) => STANDARD_BADGE_IDS.includes(b.badgeId));
    case 'all':
    default:
      return badges;
  }
}
