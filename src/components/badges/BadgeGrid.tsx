'use client';

import { badges } from '@/data/badges';
import BadgeCard from '@/components/badges/BadgeCard';

interface BadgeGridProps {
  earnedBadges: string[];
}

export default function BadgeGrid({ earnedBadges }: BadgeGridProps) {
  const earnedCount = badges.filter((b) => earnedBadges.includes(b.badgeId)).length;

  return (
    <div>
      {/* Badge count header */}
      <div className="mb-6 text-center">
        <p className="text-lg font-semibold text-text-primary">
          <span className="text-secondary">{earnedCount}</span>
          <span className="text-text-muted"> / {badges.length} </span>
          バッジ獲得
        </p>
        {/* Progress bar */}
        <div className="mt-2 mx-auto max-w-xs h-2 bg-surface-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${(earnedCount / badges.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const isEarned = earnedBadges.includes(badge.badgeId);
          return (
            <BadgeCard
              key={badge.badgeId}
              badge={badge}
              earned={isEarned}
              earnedAt={isEarned ? new Date().toISOString() : null}
            />
          );
        })}
      </div>
    </div>
  );
}
