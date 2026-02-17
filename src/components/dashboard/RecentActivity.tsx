'use client';

import Card from '@/components/ui/Card';
import NinjaMascot from '@/components/gamification/NinjaMascot';

interface ActivityItem {
  questTitle: string;
  completedAt: string;
  xpGained?: number;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'たった今';
  if (diffMin < 60) return `${diffMin}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  if (diffDays < 7) return `${diffDays}日前`;
  return date.toLocaleDateString('ja-JP');
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        最近のアクティビティ
      </h3>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-3">
            <NinjaMascot mood="sleeping" size="md" />
          </div>
          <p className="text-sm text-text-muted mb-1">
            忍者はまだお休み中...
          </p>
          <p className="text-sm text-text-muted">
            クエストを完了して忍者を起こそう！
          </p>
        </div>
      ) : (
        <ul className="stagger-children space-y-3">
          {activities.map((activity, index) => (
            <li
              key={index}
              className="animate-slide-up flex items-center gap-3 p-3 rounded-lg hover:bg-surface-hover transition-colors"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Checkmark icon */}
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Activity info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {activity.questTitle}
                </p>
                <p className="text-xs text-text-muted">
                  {getRelativeTime(activity.completedAt)}
                </p>
              </div>

              {/* XP gained */}
              {activity.xpGained && activity.xpGained > 0 && (
                <span className="text-sm font-bold text-yellow-500 whitespace-nowrap">
                  +{activity.xpGained} XP
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
