import { DayCurriculum } from '@/types';
import { day1 } from './day1';
import { day2 } from './day2';
import { day3 } from './day3';
import { day4 } from './day4';
import { day5 } from './day5';

export const curriculum: DayCurriculum[] = [day1, day2, day3, day4, day5];

// Helper to get a specific day
export function getDay(dayId: number): DayCurriculum | undefined {
  return curriculum.find((d) => d.dayId === dayId);
}

// Helper to get a specific quest
export function getQuest(questId: string) {
  for (const day of curriculum) {
    const quest = day.quests.find((q) => q.id === questId);
    if (quest) return { quest, day };
  }
  return undefined;
}
