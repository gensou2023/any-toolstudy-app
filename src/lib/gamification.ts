import { DayCurriculum } from '@/types';

// XP awarded by difficulty
export function getXPForDifficulty(difficulty: number): number {
  const xpMap: Record<number, number> = { 1: 10, 2: 20, 3: 35, 4: 50, 5: 100 };
  return xpMap[difficulty] || 10;
}

// Level thresholds (Duolingo-style exponential)
export const LEVELS = [
  { level: 1, title: '入門者', minXP: 0, emoji: '🥚' },
  { level: 2, title: '見習い', minXP: 30, emoji: '🐣' },
  { level: 3, title: '修行者', minXP: 80, emoji: '🐥' },
  { level: 4, title: '中級者', minXP: 150, emoji: '🐔' },
  { level: 5, title: '上級者', minXP: 250, emoji: '🦅' },
  { level: 6, title: '達人', minXP: 400, emoji: '🐉' },
  { level: 7, title: '師範', minXP: 600, emoji: '🏯' },
  { level: 8, title: '伝説', minXP: 850, emoji: '⭐' },
  { level: 9, title: '仙人', minXP: 1100, emoji: '🌟' },
  { level: 10, title: 'Cursorマスター', minXP: 1500, emoji: '👑' },
];

export type LevelInfo = (typeof LEVELS)[number];

export function getLevelForXP(xp: number) {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.minXP) current = level;
    else break;
  }
  const nextLevel = LEVELS.find((l) => l.level === current.level + 1);
  const progressToNext = nextLevel
    ? (xp - current.minXP) / (nextLevel.minXP - current.minXP)
    : 1;
  return { ...current, xp, nextLevel, progressToNext: Math.min(progressToNext, 1) };
}

// Calculate total XP from completions and curriculum data
export function calculateTotalXP(completions: string[], curriculum: DayCurriculum[]): number {
  let totalXP = 0;
  for (const day of curriculum) {
    for (const quest of day.quests) {
      if (completions.includes(quest.id)) {
        totalXP += getXPForDifficulty(quest.difficulty);
      }
    }
  }
  return totalXP;
}

// Streak encouragement messages
export const STREAK_MESSAGES = [
  '今日も学習スタート！',
  '2日連続！いい調子！',
  '3日連続！素晴らしい！',
  '4日連続！止まらない！',
  '5日連続！すごい集中力！',
];

// Random encouragement for quest completion
export const COMPLETION_MESSAGES = [
  'やったね！すごい！ 🎉',
  'ナイス！その調子！ 💪',
  '完璧！天才か？ 🧠',
  'お見事！達人の道を歩んでるね！ 🥷',
  'ブラボー！AIマスターに一歩近づいた！ ⚡',
  'すごいぞ！Cursorの力を手に入れた！ 🗡️',
  'エクセレント！もう止められない！ 🚀',
  'ファンタスティック！仲間も驚いてるよ！ 👏',
];

export function getRandomCompletionMessage(): string {
  return COMPLETION_MESSAGES[Math.floor(Math.random() * COMPLETION_MESSAGES.length)];
}
