'use client';

import { useEffect, useState } from 'react';
import { getLevelForXP } from '@/lib/gamification';

interface XPBarProps {
  xp: number;
  animated?: boolean;
}

export default function XPBar({ xp, animated = true }: XPBarProps) {
  const levelInfo = getLevelForXP(xp);
  const [displayProgress, setDisplayProgress] = useState(animated ? 0 : levelInfo.progressToNext);

  useEffect(() => {
    if (!animated) {
      setDisplayProgress(levelInfo.progressToNext);
      return;
    }

    // Reset to 0 then animate to target
    setDisplayProgress(0);
    const timer = setTimeout(() => {
      setDisplayProgress(levelInfo.progressToNext);
    }, 100);

    return () => clearTimeout(timer);
  }, [levelInfo.progressToNext, animated]);

  const currentXP = xp - levelInfo.minXP;
  const xpNeeded = levelInfo.nextLevel
    ? levelInfo.nextLevel.minXP - levelInfo.minXP
    : 0;

  return (
    <div className="flex items-center gap-3 min-w-0">
      {/* Level badge */}
      <div className="flex-shrink-0 flex items-center gap-1.5">
        <span className="text-xl leading-none" role="img" aria-label={levelInfo.title}>
          {levelInfo.emoji}
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-text-primary leading-tight">
            Lv.{levelInfo.level}
          </span>
          <span className="text-[10px] text-text-secondary leading-tight">
            {levelInfo.title}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex-1 min-w-0">
        <div className="relative h-5 bg-surface-hover rounded-full overflow-hidden border border-border">
          {/* Gradient fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full xp-bar-fill"
            style={{
              width: `${displayProgress * 100}%`,
              transition: animated ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          />

          {/* Shimmer overlay */}
          {displayProgress > 0 && (
            <div
              className="absolute inset-y-0 left-0 rounded-full xp-bar-shimmer"
              style={{
                width: `${displayProgress * 100}%`,
                transition: animated ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              }}
            />
          )}

          {/* XP text centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-bold text-text-primary drop-shadow-sm">
              {levelInfo.nextLevel
                ? `${currentXP} / ${xpNeeded} XP`
                : `${xp} XP (MAX)`}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .xp-bar-fill {
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        }
        .xp-bar-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
