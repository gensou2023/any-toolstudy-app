'use client';

import Card from '@/components/ui/Card';
import XPBar from '@/components/gamification/XPBar';
import DailyGoal from '@/components/gamification/DailyGoal';

interface OverallProgressProps {
  completedCount: number;
  totalCount: number;
  currentDay: number;
  xp?: number;
  dailyCompleted?: number;
  dailyGoal?: number;
  isIntern?: boolean;
}

export default function OverallProgress({
  completedCount,
  totalCount,
  currentDay,
  xp = 0,
  dailyCompleted = 0,
  dailyGoal = 3,
  isIntern = false,
}: OverallProgressProps) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Calculate the circle's stroke values
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <Card className="flex flex-col gap-6">
      {/* Top row: Circular progress + XP bar + Daily goal */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Circular progress */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="var(--color-surface-hover)"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
              style={{
                filter: 'drop-shadow(0 0 6px var(--color-primary))',
              }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">{percent}%</span>
            <span className="text-xs text-text-muted">達成率</span>
          </div>
        </div>

        {/* Middle: Stats + XP */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-text-primary mb-1">
            {isIntern ? 'インターンプログラム進捗' : '全体の進捗'}
          </h3>
          <p className="text-3xl font-bold text-primary mb-1">
            {completedCount}
            <span className="text-lg text-text-muted font-normal"> / {totalCount} クエスト完了</span>
          </p>

          {/* XP display */}
          <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start">
            <span className="text-yellow-500 text-lg">⚡</span>
            <span className="text-xl font-bold text-yellow-600">{xp} XP</span>
          </div>

          {/* XP Bar */}
          <div className="mb-3">
            <XPBar xp={xp} animated />
          </div>

          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              現在: Day {currentDay}
            </span>
          </div>
        </div>

        {/* Right: Daily Goal */}
        <div className="flex-shrink-0">
          <DailyGoal completed={dailyCompleted} goal={dailyGoal} />
        </div>
      </div>
    </Card>
  );
}
