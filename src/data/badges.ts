import { Badge } from '@/types';

export const badges: Badge[] = [
  {
    id: 'badge-first-step',
    badgeId: 'first-step',
    name: 'はじめの一歩',
    description: '最初のクエストを完了した',
    icon: '👣',
    condition: 'complete-first-quest',
  },
  {
    id: 'badge-day1-complete',
    badgeId: 'day1-complete',
    name: 'Day1マスター',
    description: 'Day 1の全クエストを完了した',
    icon: '🌟',
    condition: 'complete-day1',
  },
  {
    id: 'badge-day2-complete',
    badgeId: 'day2-complete',
    name: 'AI会話マスター',
    description: 'Day 2の全クエストを完了した',
    icon: '💬',
    condition: 'complete-day2',
  },
  {
    id: 'badge-day3-complete',
    badgeId: 'day3-complete',
    name: 'スペシャリスト',
    description: 'Day 3の全クエストを完了した',
    icon: '🎯',
    condition: 'complete-day3',
  },
  {
    id: 'badge-day4-complete',
    badgeId: 'day4-complete',
    name: 'プロジェクトビルダー',
    description: 'Day 4の全クエストを完了した',
    icon: '🔨',
    condition: 'complete-day4',
  },
  {
    id: 'badge-day5-complete',
    badgeId: 'day5-complete',
    name: '卒業生',
    description: 'Day 5の全クエストを完了し、道場を卒業した',
    icon: '🎓',
    condition: 'complete-day5',
  },
  {
    id: 'badge-speed-runner',
    badgeId: 'speed-runner',
    name: 'スピードランナー',
    description: '1日で5つ以上のクエストを完了した',
    icon: '⚡',
    condition: 'complete-5-in-day',
  },
  {
    id: 'badge-explorer',
    badgeId: 'explorer',
    name: 'エクスプローラー',
    description: '10個以上のクエストを完了した',
    icon: '🗺️',
    condition: 'complete-10-quests',
  },
  {
    id: 'badge-half-way',
    badgeId: 'half-way',
    name: '折り返し地点',
    description: '全クエストの50%を完了した',
    icon: '🏔️',
    condition: 'complete-50-percent',
  },
  {
    id: 'badge-feedback-hero',
    badgeId: 'feedback-hero',
    name: 'フィードバックヒーロー',
    description: 'フィードバックを3回以上送信した',
    icon: '📝',
    condition: 'send-3-feedbacks',
  },
  {
    id: 'badge-perfect-score',
    badgeId: 'perfect-score',
    name: 'パーフェクトスコア',
    description: '確認クイズを全問正解した',
    icon: '💯',
    condition: 'perfect-quiz',
  },
  {
    id: 'badge-all-complete',
    badgeId: 'all-complete',
    name: '道場師範',
    description: '全てのクエストを完了した',
    icon: '🏆',
    condition: 'complete-all-quests',
  },
];

export function getBadgeById(badgeId: string): Badge | undefined {
  return badges.find((b) => b.badgeId === badgeId);
}
