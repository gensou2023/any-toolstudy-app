import type { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    question: 'パソコンでコードを書いたことはありますか？',
    emoji: '🖥️',
    options: [
      { label: 'まったくない', score: 0 },
      { label: '少しだけ（授業や体験で）', score: 1 },
      { label: '趣味や課題で何度か', score: 2 },
      { label: '日常的に書いている', score: 3 },
    ],
  },
  {
    id: 'q2',
    question: 'ターミナル（黒い画面）は使ったことある？',
    emoji: '⬛',
    options: [
      { label: '見たこともない', score: 0 },
      { label: '見たことはあるけど使ってない', score: 1 },
      { label: '基本的なコマンドは使える', score: 2 },
      { label: 'バリバリ使ってる', score: 3 },
    ],
  },
  {
    id: 'q3',
    question: 'AIツール（ChatGPTなど）は使ったことある？',
    emoji: '🤖',
    options: [
      { label: '使ったことがない', score: 0 },
      { label: '少し試したことがある', score: 1 },
      { label: 'よく使っている', score: 2 },
      { label: '仕事や学習に活用している', score: 3 },
    ],
  },
  {
    id: 'q4',
    question: 'チームで何かを作った経験はある？',
    emoji: '👥',
    options: [
      { label: 'ない', score: 0 },
      { label: '学校の課題で少し', score: 1 },
      { label: 'プロジェクトに参加したことがある', score: 2 },
      { label: 'チーム開発の経験が豊富', score: 3 },
    ],
  },
  {
    id: 'q5',
    question: 'どんなことを学びたい？',
    emoji: '🎯',
    options: [
      { label: 'まずは基本から知りたい', score: 0 },
      { label: 'AIを使った効率的な開発', score: 1 },
      { label: '実践的なプロジェクト開発', score: 2 },
      { label: '高度なテクニックやベストプラクティス', score: 3 },
    ],
  },
  {
    id: 'q6',
    question: 'プログラミング言語、知ってるものはある？',
    emoji: '💻',
    options: [
      { label: '何も知らない', score: 0 },
      { label: '1つ（HTMLやPythonなど）', score: 1 },
      { label: '2〜3つ', score: 2 },
      { label: '4つ以上', score: 3 },
    ],
  },
  {
    id: 'q7',
    question: 'Gitやバージョン管理は知ってる？',
    emoji: '🔀',
    options: [
      { label: '聞いたこともない', score: 0 },
      { label: '名前は聞いたことがある', score: 1 },
      { label: '基本的な操作はできる', score: 2 },
      { label: 'ブランチ運用もバッチリ', score: 3 },
    ],
  },
  {
    id: 'q8',
    question: 'コードエディタは何を使ってる？',
    emoji: '📝',
    options: [
      { label: '使ったことがない', score: 0 },
      { label: 'メモ帳やテキストエディット', score: 1 },
      { label: 'VS Codeなどのエディタ', score: 2 },
      { label: 'カスタマイズした開発環境がある', score: 3 },
    ],
  },
];

export function calculateSkillLevel(totalScore: number): 'beginner' | 'intermediate' | 'advanced' {
  if (totalScore <= 8) return 'beginner';
  if (totalScore <= 16) return 'intermediate';
  return 'advanced';
}

export const skillLevelLabels = {
  beginner: { label: '初心者', emoji: '🌱', description: '基礎からしっかり学んでいきましょう！' },
  intermediate: { label: '中級者', emoji: '🌿', description: '基礎はOK！実践的なスキルを伸ばしましょう！' },
  advanced: { label: '上級者', emoji: '🌳', description: 'さすが！高度なテクニックにチャレンジ！' },
};
