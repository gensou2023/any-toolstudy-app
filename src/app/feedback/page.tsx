'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import type { Feedback } from '@/types';

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

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('/api/feedback');
        if (res.ok) {
          const data = await res.json();
          setFeedbacks(data.feedbacks || []);
        }
      } catch {
        // Silently fail
      }
      setLoading(false);
    };
    fetchFeedbacks();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            📝 フィードバック一覧
          </h1>
          <p className="text-sm text-text-muted mt-1">
            全ユーザーからのフィードバック・要望を確認できます
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-surface rounded-xl border border-border animate-pulse"
              />
            ))}
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="bg-surface rounded-xl border border-border p-12 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-text-secondary font-medium">
              まだフィードバックがありません
            </p>
            <p className="text-text-muted text-sm mt-1">
              ダッシュボードのフォームから最初のフィードバックを送信してみましょう
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-surface rounded-xl border border-border p-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* User and type badge */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-semibold text-text-primary">
                        {fb.nickname || '匿名'}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          fb.type === 'quest'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {fb.type === 'quest' ? '📖 クエスト' : '💬 一般'}
                      </span>
                      {fb.quest_title && (
                        <span className="text-xs text-text-muted truncate">
                          {fb.quest_title}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    {fb.rating && (
                      <div className="mb-1">
                        <StarDisplay rating={fb.rating} />
                      </div>
                    )}

                    {/* Comment */}
                    {fb.comment && (
                      <p className="text-sm text-text-secondary whitespace-pre-wrap">
                        {fb.comment}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <span className="text-xs text-text-muted whitespace-nowrap flex-shrink-0">
                    {formatDate(fb.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
