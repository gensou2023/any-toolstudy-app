'use client';

import type { FeedbackWithUser } from '@/types';
import { getRoleById } from '@/data/roles';
import { LEVELS } from '@/lib/gamification';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
}

function StarDisplay({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <span className="text-sm">
      {'⭐'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
}

interface FeedbackUserCardProps {
  feedback: FeedbackWithUser;
}

export default function FeedbackUserCard({ feedback }: FeedbackUserCardProps) {
  const roleInfo = feedback.user_role ? getRoleById(feedback.user_role) : null;
  const levelInfo = LEVELS.find(l => l.level === feedback.user_level) || LEVELS[0];

  return (
    <div className="bg-surface rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* User info row */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-sm font-semibold text-text-primary">
              {feedback.user_nickname}
            </span>
            {roleInfo && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                {roleInfo.emoji} {roleInfo.label}
              </span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
              {levelInfo.emoji} Lv.{feedback.user_level}
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent">
              {feedback.user_xp} XP
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-1.5 bg-surface-hover rounded-full overflow-hidden max-w-[120px]">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${feedback.user_progress}%` }}
              />
            </div>
            <span className="text-[10px] text-text-muted">{feedback.user_progress}%</span>
          </div>

          {/* Feedback type badge */}
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                feedback.type === 'quest'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {feedback.type === 'quest' ? '📖 クエスト' : '💬 一般'}
            </span>
            {feedback.quest_title && (
              <span className="text-xs text-text-muted truncate">
                {feedback.quest_title}
              </span>
            )}
          </div>

          {/* Rating */}
          {feedback.rating && (
            <div className="mb-1">
              <StarDisplay rating={feedback.rating} />
            </div>
          )}

          {/* Comment */}
          {feedback.comment && (
            <p className="text-sm text-text-secondary whitespace-pre-wrap">
              {feedback.comment}
            </p>
          )}
        </div>

        {/* Date */}
        <span className="text-xs text-text-muted whitespace-nowrap flex-shrink-0">
          {formatDate(feedback.created_at)}
        </span>
      </div>
    </div>
  );
}
