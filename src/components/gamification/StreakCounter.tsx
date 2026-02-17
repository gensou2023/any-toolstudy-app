'use client';

import { STREAK_MESSAGES } from '@/lib/gamification';

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  const isActive = streak > 0;
  const messageIndex = Math.min(streak, STREAK_MESSAGES.length - 1);
  const message = isActive ? STREAK_MESSAGES[messageIndex] : '今日の学習を始めよう！';

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300
        ${
          isActive
            ? 'bg-gradient-to-r from-secondary/10 to-danger/10 border-secondary/30'
            : 'bg-surface-hover border-border opacity-60'
        }
      `}
    >
      {/* Fire emoji with animation */}
      <div className={`relative flex-shrink-0 ${isActive ? 'streak-fire' : ''}`}>
        <span
          className={`text-2xl leading-none ${!isActive ? 'grayscale opacity-40' : ''}`}
          role="img"
          aria-label="Streak fire"
        >
          🔥
        </span>
        {isActive && (
          <span className="absolute -top-1 -right-1 streak-glow" aria-hidden="true" />
        )}
      </div>

      {/* Streak info */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-lg font-extrabold leading-tight ${
              isActive ? 'text-secondary' : 'text-text-muted'
            }`}
          >
            {streak}
          </span>
          <span
            className={`text-xs font-medium leading-tight ${
              isActive ? 'text-text-secondary' : 'text-text-muted'
            }`}
          >
            日連続
          </span>
        </div>
        <span className="text-[11px] text-text-secondary leading-tight truncate">
          {message}
        </span>
      </div>

      <style jsx>{`
        .streak-fire {
          animation: flamePulse 1.5s ease-in-out infinite;
        }
        .streak-glow {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-secondary);
          animation: glowPulse 1.5s ease-in-out infinite;
        }
        @keyframes flamePulse {
          0%,
          100% {
            transform: scale(1) translateY(0);
          }
          25% {
            transform: scale(1.1) translateY(-2px);
          }
          50% {
            transform: scale(1) translateY(0);
          }
          75% {
            transform: scale(1.05) translateY(-1px);
          }
        }
        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}
