'use client';

import type { Badge } from '@/types';
import Card from '@/components/ui/Card';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  earnedAt: string | null;
}

export default function BadgeCard({ badge, earned, earnedAt }: BadgeCardProps) {
  return (
    <Card
      className={`relative text-center transition-all duration-300 ${
        earned
          ? 'ring-2 ring-secondary shadow-lg shadow-secondary/20'
          : 'opacity-70 grayscale'
      }`}
    >
      {/* Badge icon */}
      <div className="relative mx-auto mb-3">
        <span
          className={`text-5xl block ${
            earned ? 'animate-[badgePulse_2s_ease-in-out_infinite]' : ''
          }`}
        >
          {badge.icon}
        </span>

        {/* Locked overlay for unearned badges */}
        {!earned && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl opacity-60">🔒</span>
          </div>
        )}
      </div>

      {/* Badge name */}
      <h3
        className={`font-semibold text-sm mb-1 ${
          earned ? 'text-text-primary' : 'text-text-muted'
        }`}
      >
        {badge.name}
      </h3>

      {/* Badge description */}
      <p
        className={`text-xs leading-relaxed ${
          earned ? 'text-text-secondary' : 'text-text-muted'
        }`}
      >
        {badge.description}
      </p>

      {/* Earned date */}
      {earned && earnedAt && (
        <p className="text-xs text-accent mt-2">
          {new Date(earnedAt).toLocaleDateString('ja-JP')} 獲得
        </p>
      )}

      {/* Glow effect for earned badges */}
      <style jsx>{`
        @keyframes badgePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </Card>
  );
}
