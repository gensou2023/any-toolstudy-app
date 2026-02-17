'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { IS_DEMO_MODE } from '@/lib/constants';
import { getRoleById } from '@/data/roles';
import type { User } from '@/types';

interface RankedUser {
  id: string;
  nickname: string;
  role: string | null;
  completedCount: number;
}

export default function RankingPage() {
  const { user, loading: authLoading } = useAuth();
  const [rankedUsers, setRankedUsers] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxQuests, setMaxQuests] = useState(0);

  useEffect(() => {
    const fetchRanking = async () => {
      if (IS_DEMO_MODE) {
        const demoRanking: RankedUser[] = [
          { id: 'demo-user-001', nickname: 'デモユーザー', role: 'frontend-engineer', completedCount: 6 },
          { id: 'demo-user-002', nickname: '田中太郎', role: 'backend-engineer', completedCount: 10 },
          { id: 'demo-user-003', nickname: '佐藤花子', role: 'web-designer', completedCount: 8 },
          { id: 'demo-user-004', nickname: '鈴木一郎', role: 'director', completedCount: 5 },
          { id: 'demo-user-005', nickname: '高橋美咲', role: 'non-engineer', completedCount: 4 },
          { id: 'demo-user-006', nickname: '伊藤健太', role: 'frontend-engineer', completedCount: 3 },
          { id: 'demo-user-007', nickname: '渡辺雅子', role: 'backend-engineer', completedCount: 2 },
        ];
        demoRanking.sort((a, b) => b.completedCount - a.completedCount);
        setMaxQuests(demoRanking[0].completedCount);
        setRankedUsers(demoRanking);
        setLoading(false);
        return;
      }

      try {
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('*');

        if (usersError || !users) {
          setLoading(false);
          return;
        }

        const { data: completions, error: completionsError } = await supabase
          .from('quest_completions')
          .select('user_id');

        if (completionsError) {
          setLoading(false);
          return;
        }

        const countMap: Record<string, number> = {};
        (completions || []).forEach((row) => {
          countMap[row.user_id] = (countMap[row.user_id] || 0) + 1;
        });

        const ranked: RankedUser[] = (users as User[]).map((u) => ({
          id: u.id,
          nickname: u.nickname,
          role: u.role,
          completedCount: countMap[u.id] || 0,
        }));

        ranked.sort((a, b) => b.completedCount - a.completedCount);

        const max = ranked.length > 0 ? ranked[0].completedCount : 0;
        setMaxQuests(max > 0 ? max : 1);

        setRankedUsers(ranked);
      } catch {
        // Silently handle errors
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  const getRankEmoji = (rank: number): string => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `${rank}`;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-text-muted">ランキングを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-text-muted hover:text-primary transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          ダッシュボードに戻る
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            🏆 チームランキング
          </h1>
          <p className="text-text-secondary">
            クエスト完了数で競い合おう！
          </p>
        </div>

        {/* Ranking list */}
        {rankedUsers.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-5xl block mb-4">📊</span>
            <p className="text-text-muted">まだランキングデータがありません</p>
          </div>
        ) : (
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[60px_1fr_auto_120px] md:grid-cols-[60px_1fr_150px_120px] items-center px-4 py-3 bg-surface-hover border-b border-border">
              <span className="text-xs font-semibold text-text-muted text-center">順位</span>
              <span className="text-xs font-semibold text-text-muted">ニックネーム</span>
              <span className="text-xs font-semibold text-text-muted hidden md:block">ロール</span>
              <span className="text-xs font-semibold text-text-muted text-right">完了クエスト</span>
            </div>

            {/* Ranking rows */}
            {rankedUsers.map((rankedUser, index) => {
              const rank = index + 1;
              const isCurrentUser = user?.userId === rankedUser.id;
              const roleInfo = rankedUser.role ? getRoleById(rankedUser.role) : null;

              return (
                <div
                  key={rankedUser.id}
                  className={`grid grid-cols-[60px_1fr_auto_120px] md:grid-cols-[60px_1fr_150px_120px] items-center px-4 py-3
                    border-b border-border last:border-b-0 transition-colors
                    ${isCurrentUser ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-surface-hover'}
                    ${rank <= 3 ? 'bg-secondary/5' : ''}`}
                >
                  {/* Rank */}
                  <div className="text-center">
                    {rank <= 3 ? (
                      <span className="text-2xl">{getRankEmoji(rank)}</span>
                    ) : (
                      <span className="text-sm font-semibold text-text-muted">{rank}</span>
                    )}
                  </div>

                  {/* Nickname */}
                  <div className="min-w-0">
                    <p
                      className={`font-medium truncate ${
                        isCurrentUser ? 'text-primary' : 'text-text-primary'
                      }`}
                    >
                      {rankedUser.nickname}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          あなた
                        </span>
                      )}
                    </p>
                    {/* Role on mobile */}
                    {roleInfo && (
                      <span className="md:hidden text-xs text-text-muted">
                        {roleInfo.emoji} {roleInfo.label}
                      </span>
                    )}
                  </div>

                  {/* Role badge (desktop) */}
                  <div className="hidden md:block">
                    {roleInfo ? (
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full text-white ${roleInfo.color}`}
                      >
                        {roleInfo.emoji} {roleInfo.label}
                      </span>
                    ) : (
                      <span className="text-xs text-text-muted">-</span>
                    )}
                  </div>

                  {/* Completed quests count and progress bar */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text-primary">
                      {rankedUser.completedCount} クエスト
                    </p>
                    <div className="mt-1 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          rank === 1
                            ? 'bg-secondary'
                            : rank <= 3
                              ? 'bg-accent'
                              : 'bg-primary'
                        }`}
                        style={{
                          width: `${(rankedUser.completedCount / maxQuests) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
