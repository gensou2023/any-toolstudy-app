import { DayCurriculum, RoleId } from '@/types';
import { DAY_UNLOCK_THRESHOLD } from './constants';

export function getQuestsForRole(day: DayCurriculum, role: RoleId | null): string[] {
  return day.quests
    .filter((q) => q.targetRoles === 'all' || (role && q.targetRoles.includes(role)))
    .map((q) => q.id);
}

export function getDayCompletionRate(
  dayId: number,
  completions: string[],
  curriculum: DayCurriculum[],
  role: RoleId | null
): number {
  const day = curriculum.find((d) => d.dayId === dayId);
  if (!day) return 0;

  const roleQuests = getQuestsForRole(day, role);
  if (roleQuests.length === 0) return 0;

  const completed = roleQuests.filter((qId) => completions.includes(qId)).length;
  return completed / roleQuests.length;
}

// For student-intern, the visible day sequence is: 1, 2, 6, 7, 8, 9, 10
// Day 6 unlocks based on Day 2 completion (not Day 5)
function getPreviousDayForRole(dayId: number, role: RoleId | null): number | null {
  if (dayId === 1) return null;
  if (role === 'student-intern' && dayId === 6) return 2;
  return dayId - 1;
}

export function isDayUnlocked(
  dayId: number,
  completions: string[],
  curriculum: DayCurriculum[],
  role: RoleId | null
): boolean {
  const prevDay = getPreviousDayForRole(dayId, role);
  if (prevDay === null) return true;

  const prevDayRate = getDayCompletionRate(prevDay, completions, curriculum, role);
  return prevDayRate >= DAY_UNLOCK_THRESHOLD;
}

export function getOverallProgress(
  completions: string[],
  curriculum: DayCurriculum[],
  role: RoleId | null
): number {
  const allRoleQuests = curriculum.flatMap((day) => getQuestsForRole(day, role));
  if (allRoleQuests.length === 0) return 0;

  const completed = allRoleQuests.filter((qId) => completions.includes(qId)).length;
  return completed / allRoleQuests.length;
}

export function getTotalQuestsForRole(
  curriculum: DayCurriculum[],
  role: RoleId | null
): number {
  return curriculum.flatMap((day) => getQuestsForRole(day, role)).length;
}

export function getCompletedCountForDay(
  dayId: number,
  completions: string[],
  curriculum: DayCurriculum[],
  role: RoleId | null
): { completed: number; total: number } {
  const day = curriculum.find((d) => d.dayId === dayId);
  if (!day) return { completed: 0, total: 0 };

  const roleQuests = getQuestsForRole(day, role);
  const completed = roleQuests.filter((qId) => completions.includes(qId)).length;
  return { completed, total: roleQuests.length };
}
