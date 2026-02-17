'use client';

import NinjaMascot from '@/components/gamification/NinjaMascot';

interface LevelInfo {
  level: number;
  title: string;
  emoji: string;
}

interface WelcomeHeroProps {
  nickname: string;
  progressPercent: number;
  xp?: number;
  streak?: number;
  level?: LevelInfo;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'おはよう';
  if (hour >= 12 && hour < 18) return 'こんにちは';
  return 'こんばんは';
}

function getMotivationalMessage(percent: number): string {
  if (percent === 0) return 'さあ、Cursor道場の修行を始めましょう！';
  if (percent < 25) return 'いい調子です！一歩ずつ前に進んでいきましょう。';
  if (percent < 50) return '素晴らしい進捗です！もう少しで半分達成です。';
  if (percent < 75) return '半分以上達成！この調子でマスターを目指しましょう。';
  if (percent < 100) return 'もうすぐ全クエスト達成！最後まで駆け抜けましょう！';
  return '全クエスト達成おめでとうございます！あなたはCursorマスターです！';
}

const DAILY_ENCOURAGEMENTS = [
  '今日も一歩ずつ成長しよう！',
  '継続は力なり！',
  'AIと一緒に最強になろう！',
  '今日のクエストが待っている！',
  'レベルアップまであと少し！',
  '修行の成果が出てきたね！',
  'コードの達人への道を歩もう！',
];

function getDailyEncouragement(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_ENCOURAGEMENTS[dayOfYear % DAILY_ENCOURAGEMENTS.length];
}

function getMascotMood(percent: number): 'happy' | 'excited' | 'thinking' | 'sleeping' | 'cheering' {
  if (percent === 0) return 'thinking';
  if (percent < 25) return 'happy';
  if (percent < 75) return 'excited';
  if (percent >= 100) return 'cheering';
  return 'excited';
}

export default function WelcomeHero({
  nickname,
  progressPercent,
  xp = 0,
  streak = 0,
  level,
}: WelcomeHeroProps) {
  const greeting = getGreeting();
  const message = getMotivationalMessage(progressPercent);
  const roundedPercent = Math.round(progressPercent);
  const encouragement = getDailyEncouragement();
  const mascotMood = getMascotMood(progressPercent);

  return (
    <div className="animate-slide-up relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-light to-secondary p-6 md:p-8 text-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        {/* Left content */}
        <div className="flex-1">
          {/* Level badge + Streak */}
          <div className="flex items-center gap-3 mb-3">
            {level && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold">
                <span>{level.emoji}</span>
                <span>Lv.{level.level} {level.title}</span>
              </span>
            )}
            {streak > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/30 backdrop-blur-sm text-sm font-bold">
                <span className="text-base">🔥</span>
                <span>{streak}日連続</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            {greeting}、{nickname}さん！
          </h1>
          <p className="text-white/90 text-sm md:text-base mb-1">
            {message}
          </p>
          <p className="text-white/70 text-xs md:text-sm mb-4 italic">
            {encouragement}
          </p>

          {/* Progress indicator */}
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/70">全体の進捗</span>
                <span className="font-bold">{roundedPercent}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${roundedPercent}%` }}
                />
              </div>
            </div>

            {/* XP display */}
            {xp > 0 && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm">
                <span className="text-yellow-300 text-lg">⚡</span>
                <span className="font-bold text-lg">{xp}</span>
                <span className="text-white/70 text-sm">XP</span>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Mascot */}
        <div className="hidden md:flex items-center justify-center flex-shrink-0">
          <NinjaMascot mood={mascotMood} size="lg" />
        </div>
      </div>
    </div>
  );
}
