'use client';

import { useEffect, useState } from 'react';

interface DailyGoalProps {
  completed: number;
  goal?: number;
}

export default function DailyGoal({ completed, goal = 3 }: DailyGoalProps) {
  const isCompleted = completed >= goal;
  const progress = Math.min(completed / goal, 1);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    setDisplayProgress(0);
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  // SVG circle dimensions
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - displayProgress);

  return (
    <div className="inline-flex flex-col items-center gap-1.5">
      {/* Circular progress ring */}
      <div className={`relative ${isCompleted ? 'daily-goal-glow' : ''}`}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="daily-goal-svg"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-surface-hover)"
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isCompleted ? 'var(--color-secondary)' : 'var(--color-primary)'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="daily-goal-progress"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isCompleted ? (
            <>
              <span className="text-lg leading-none daily-goal-check" role="img" aria-label="Goal complete">
                ✅
              </span>
            </>
          ) : (
            <>
              <span className="text-xs leading-none mb-0.5" role="img" aria-label="Lightning">
                ⚡
              </span>
              <span className="text-sm font-extrabold text-text-primary leading-none">
                {completed}/{goal}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Label text */}
      <span
        className={`text-[11px] font-semibold leading-tight ${
          isCompleted ? 'text-secondary' : 'text-text-secondary'
        }`}
      >
        {isCompleted ? '目標達成！' : '今日のゴール'}
      </span>

      <style jsx>{`
        .daily-goal-progress {
          transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .daily-goal-glow {
          filter: drop-shadow(0 0 8px var(--color-secondary));
          animation: goalGlow 2s ease-in-out infinite;
        }
        .daily-goal-check {
          animation: checkBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes goalGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 14px rgba(245, 158, 11, 0.6));
          }
        }
        @keyframes checkBounce {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
