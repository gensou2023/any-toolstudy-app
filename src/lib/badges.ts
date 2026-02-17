import { badges } from '@/data/badges';
import { DayCurriculum, RoleId } from '@/types';
import { getQuestsForRole } from './progress';

export function checkBadgeEligibility(
  completions: string[],
  earnedBadges: string[],
  curriculum: DayCurriculum[],
  role: RoleId | null,
  feedbackCount?: number
): string[] {
  const newBadges: string[] = [];

  for (const badge of badges) {
    if (earnedBadges.includes(badge.badgeId)) continue;

    const eligible = evaluateCondition(
      badge.condition,
      completions,
      curriculum,
      role,
      feedbackCount
    );

    if (eligible) {
      newBadges.push(badge.badgeId);
    }
  }

  return newBadges;
}

function evaluateCondition(
  condition: string,
  completions: string[],
  curriculum: DayCurriculum[],
  role: RoleId | null,
  feedbackCount?: number
): boolean {
  switch (condition) {
    case 'complete-first-quest':
      return completions.length >= 1;

    case 'complete-day1':
      return isDayComplete(1, completions, curriculum, role);

    case 'complete-day2':
      return isDayComplete(2, completions, curriculum, role);

    case 'complete-day3':
      return isDayComplete(3, completions, curriculum, role);

    case 'complete-day4':
      return isDayComplete(4, completions, curriculum, role);

    case 'complete-day5':
      return isDayComplete(5, completions, curriculum, role);

    case 'complete-5-in-day':
      return completions.length >= 5;

    case 'complete-10-quests':
      return completions.length >= 10;

    case 'complete-50-percent': {
      const allQuests = curriculum.flatMap((day) => getQuestsForRole(day, role));
      return allQuests.length > 0 && completions.length >= allQuests.length * 0.5;
    }

    case 'send-3-feedbacks':
      return (feedbackCount ?? 0) >= 3;

    case 'perfect-quiz':
      return false; // Tracked separately in quest completion

    case 'complete-all-quests': {
      const totalQuests = curriculum.flatMap((day) => getQuestsForRole(day, role));
      return totalQuests.length > 0 && totalQuests.every((qId) => completions.includes(qId));
    }

    default:
      return false;
  }
}

function isDayComplete(
  dayId: number,
  completions: string[],
  curriculum: DayCurriculum[],
  role: RoleId | null
): boolean {
  const day = curriculum.find((d) => d.dayId === dayId);
  if (!day) return false;

  const roleQuests = getQuestsForRole(day, role);
  return roleQuests.length > 0 && roleQuests.every((qId) => completions.includes(qId));
}
