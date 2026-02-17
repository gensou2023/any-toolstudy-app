import type { SkillLevel } from '@/types/assessment';

/**
 * Returns the day IDs that should be unlocked based on skill level and role.
 *
 * Rules:
 * - beginner: no overrides (default behavior)
 * - intermediate: Day 1-2 (intern: + Day 6)
 * - advanced: Day 1-3 (engineer) / Day 1-2 (non-engineer) / Day 1-2, 6-7 (intern)
 */
export function getUnlockedDaysForSkill(
  skillLevel: SkillLevel,
  role: string | null
): number[] {
  const isIntern = role === 'student-intern';
  const isEngineer = role === 'frontend-engineer' || role === 'backend-engineer';

  switch (skillLevel) {
    case 'beginner':
      return [];

    case 'intermediate':
      if (isIntern) return [1, 2, 6];
      return [1, 2];

    case 'advanced':
      if (isIntern) return [1, 2, 6, 7];
      if (isEngineer) return [1, 2, 3];
      return [1, 2]; // non-engineer, designer, director

    default:
      return [];
  }
}
