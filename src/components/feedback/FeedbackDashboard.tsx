'use client';

import { useEffect, useState } from 'react';
import type { FeedbackWithUser } from '@/types';
import FeedbackStats from './FeedbackStats';
import FeedbackUserCard from './FeedbackUserCard';
import FeedbackFilters from './FeedbackFilters';

interface DashboardStats {
  totalCount: number;
  averageRating: number;
  uniqueUsers: number;
  thisWeekCount: number;
  ratingDistribution: Record<number, number>;
}

export default function FeedbackDashboard() {
  const [feedbacks, setFeedbacks] = useState<FeedbackWithUser[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<'all' | 'quest' | 'general'>('all');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/feedback/dashboard');
        if (res.ok) {
          const data = await res.json();
          setFeedbacks(data.feedbacks || []);
          setStats(data.stats || null);
        }
      } catch {
        // Silently fail
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (typeFilter !== 'all' && fb.type !== typeFilter) return false;
    if (ratingFilter !== null && fb.rating !== ratingFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchComment = fb.comment?.toLowerCase().includes(q);
      const matchUser = fb.user_nickname?.toLowerCase().includes(q);
      const matchQuest = fb.quest_title?.toLowerCase().includes(q);
      if (!matchComment && !matchUser && !matchQuest) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          📊 フィードバックダッシュボード
        </h1>
        <p className="text-sm text-text-muted mt-1">
          全ユーザーからのフィードバック・進捗をリアルタイムで確認
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-surface rounded-xl border border-border animate-pulse" />
            ))}
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-surface rounded-xl border border-border animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          {stats && (
            <FeedbackStats
              totalCount={stats.totalCount}
              averageRating={stats.averageRating}
              uniqueUsers={stats.uniqueUsers}
              thisWeekCount={stats.thisWeekCount}
            />
          )}

          {/* Filters */}
          <FeedbackFilters
            typeFilter={typeFilter}
            ratingFilter={ratingFilter}
            searchQuery={searchQuery}
            onTypeChange={setTypeFilter}
            onRatingChange={setRatingFilter}
            onSearchChange={setSearchQuery}
          />

          {/* Feedback list */}
          {filteredFeedbacks.length === 0 ? (
            <div className="bg-surface rounded-xl border border-border p-12 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-text-secondary font-medium">
                {feedbacks.length === 0 ? 'まだフィードバックがありません' : '条件に一致するフィードバックがありません'}
              </p>
              <p className="text-text-muted text-sm mt-1">
                {feedbacks.length === 0
                  ? 'ダッシュボードのフォームから最初のフィードバックを送信してみましょう'
                  : 'フィルター条件を変更してみてください'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-text-muted">
                {filteredFeedbacks.length}件表示 / 全{feedbacks.length}件
              </p>
              {filteredFeedbacks.map((fb) => (
                <FeedbackUserCard key={fb.id} feedback={fb} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
