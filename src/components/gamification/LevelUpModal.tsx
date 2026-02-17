'use client';

import { useEffect, useCallback } from 'react';
import { type LevelInfo } from '@/lib/gamification';
import { triggerCelebration } from '@/components/ui/Confetti';

interface LevelUpModalProps {
  level: LevelInfo;
  isOpen: boolean;
  onClose: () => void;
}

export default function LevelUpModal({ level, isOpen, onClose }: LevelUpModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Fire confetti on open
      const timer = setTimeout(() => {
        triggerCelebration();
      }, 300);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        clearTimeout(timer);
      };
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 levelup-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center w-full max-w-sm mx-4 px-8 py-10 bg-surface rounded-3xl shadow-2xl border border-border levelup-card"
        role="dialog"
        aria-modal="true"
        aria-label="Level up celebration"
      >
        {/* Sparkle particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="sparkle-particle"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 1.5}s`,
              }}
            />
          ))}
        </div>

        {/* Level emoji */}
        <div className="levelup-emoji mb-4">
          <span className="text-7xl leading-none" role="img" aria-label={level.title}>
            {level.emoji}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-text-primary mb-1 levelup-title">
          レベルアップ！
        </h2>

        {/* Level number */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-bold text-primary">Level {level.level}</span>
          <span className="text-text-muted">|</span>
          <span className="text-sm font-semibold text-text-secondary">{level.title}</span>
        </div>

        {/* Description */}
        <p className="text-center text-sm text-text-secondary mb-6 leading-relaxed">
          素晴らしい成長です！<br />
          {level.title}の称号を手に入れました。
          <br />
          この調子で学習を続けましょう！
        </p>

        {/* Continue button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold text-base rounded-xl transition-colors duration-200 cursor-pointer levelup-button"
        >
          続ける
        </button>
      </div>

      <style jsx>{`
        .levelup-backdrop {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          animation: fadeIn 300ms ease-out;
        }
        .levelup-card {
          animation: levelCardIn 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .levelup-emoji {
          animation: emojiEntrance 800ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms both;
        }
        .levelup-title {
          animation: titleSlideUp 500ms ease-out 400ms both;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .levelup-button {
          animation: titleSlideUp 500ms ease-out 600ms both;
        }
        .sparkle-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-secondary);
          animation: sparkleFloat ease-in-out infinite;
          opacity: 0;
        }
        .sparkle-particle:nth-child(odd) {
          background: var(--color-primary-light);
          width: 4px;
          height: 4px;
        }
        .sparkle-particle:nth-child(3n) {
          background: var(--color-accent);
          width: 5px;
          height: 5px;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes levelCardIn {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes emojiEntrance {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-20deg);
          }
          60% {
            transform: scale(1.2) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes titleSlideUp {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes sparkleFloat {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1) translateY(-5px);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.8) translateY(-15px);
          }
          80% {
            opacity: 0.3;
            transform: scale(0.5) translateY(-25px);
          }
        }
      `}</style>
    </div>
  );
}
