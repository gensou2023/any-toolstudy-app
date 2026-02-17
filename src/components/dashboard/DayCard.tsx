'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';

interface DayCardProps {
  dayId: number;
  title: string;
  emoji: string;
  completed: number;
  total: number;
  isLocked: boolean;
  isCurrent: boolean;
  xpAvailable?: number;
  index?: number;
}

function getDifficultyStars(dayId: number): string {
  // Approximate difficulty by day
  const stars = Math.min(dayId, 5);
  return '\u2B50'.repeat(stars);
}

export default function DayCard({
  dayId,
  title,
  emoji,
  completed,
  total,
  isLocked,
  isCurrent,
  xpAvailable = 0,
  index = 0,
}: DayCardProps) {
  const router = useRouter();
  const isCompleted = total > 0 && completed >= total;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleClick = () => {
    if (!isLocked) {
      router.push(`/day/${dayId}`);
    }
  };

  if (isLocked) {
    return (
      <Card
        className="animate-slide-up opacity-60 relative overflow-hidden"
        hover={false}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Locked overlay */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-surface-hover flex items-center justify-center text-2xl grayscale">
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-text-muted">Day {dayId}</h3>
              <svg
                className="w-5 h-5 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <p className="text-sm text-text-muted truncate">{title}</p>
            <p className="text-xs text-text-muted mt-2">
              前のDayを50%完了で解放
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      hover
      onClick={handleClick}
      className={`animate-slide-up card-lift relative overflow-hidden ${
        isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''
      } ${isCompleted ? 'bg-gradient-to-br from-white to-accent/5' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Completed badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <svg
            className="w-7 h-7 text-accent"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Current indicator */}
      {isCurrent && !isCompleted && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-white animate-pulse">
            進行中
          </span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 ${
            isCompleted ? 'bg-accent/10 scale-110' : 'bg-primary/10'
          }`}
        >
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-text-primary mb-0.5">
            Day {dayId}
          </h3>
          <p className="text-sm text-text-secondary mb-1 truncate">{title}</p>

          {/* Difficulty stars + XP */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs" title={`難易度: Day ${dayId}`}>
              {getDifficultyStars(dayId)}
            </span>
            {xpAvailable > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                💰 {xpAvailable} XP
              </span>
            )}
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar
                value={percent}
                size="sm"
                color={isCompleted ? 'accent' : 'primary'}
              />
            </div>
            <span className="text-xs font-medium text-text-secondary whitespace-nowrap">
              {completed}/{total} 完了
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
