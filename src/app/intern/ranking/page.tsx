'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { IS_DEMO_MODE } from '@/lib/constants';
import { getRoleById } from '@/data/roles';
import { curriculum } from '@/data/curriculum';
import { getXPForDifficulty, getLevelForXP } from '@/lib/gamification';
import type { User } from '@/types';

interface RankedUser {
  id: string;
  nickname: string;
  role: string | null;
  completedCount: number;
  xp: number;
  level: ReturnType<typeof getLevelForXP>;
}

// Intern quest IDs (Day 6-10)
const internQuestIds = curriculum
  .filter((d) => d.dayId >= 6 && d.dayId <= 10)
  .flatMap((d) => d.quests.map((q) => q.id));

// Calculate XP from intern quests only
function calculateInternXP(questIds: string[]): number {
  let xp = 0;
  for (const day of curriculum) {
    if (day.dayId < 6 || day.dayId > 10) continue;
    for (const quest of day.quests) {
      if (questIds.includes(quest.id)) {
        xp += getXPForDifficulty(quest.difficulty);
      }
    }
  }
  return xp;
}

export default function InternRankingPage() {
  const { user, loading: authLoading } = useAuth();
  const [rankedUsers, setRankedUsers] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxXP, setMaxXP] = useState(1);

  useEffect(() => {
    const fetchRanking = async () => {
      if (IS_DEMO_MODE) {
        const demoCompletions: Record<string, string[]> = {
          'demo-user-001': ['day1-quest1', 'day1-quest2', 'day6-intern-quest1', 'day6-intern-quest2'],
          'demo-user-008': ['day1-quest1', 'day6-intern-quest1', 'day6-intern-quest2', 'day6-intern-quest3', 'day7-intern-quest1'],
          'demo-user-009': ['day1-quest1', 'day6-intern-quest1'],
        };

        const demoUsers = [
          { id: 'demo-user-001', nickname: 'デモインターン', role: 'student-intern' },
          { id: 'demo-user-008', nickname: '山田学生', role: 'student-intern' },
          { id: 'demo-user-009', nickname: '中村研修生', role: 'student-intern' },
        ];

        const demoRanking: RankedUser[] = demoUsers.map((u) => {
          const quests = demoCompletions[u.id] || [];
          const internQuests = quests.filter((q) => internQuestIds.includes(q));
          const xp = calculateInternXP(internQuests);
          return {
            ...u,
            completedCount: internQuests.length,
            xp,
            level: getLevelForXP(xp),
          };
        });

        demoRanking.sort((a, b) => b.xp - a.xp);
        setMaxXP(demoRanking[0]?.xp || 1);
        setRankedUsers(demoRanking);
        setLoading(false);
        return;
      }

      try {
        // Fetch only student-intern users
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'student-intern');

        if (usersError || !users) {
          setLoading(false);
          return;
        }

        const { data: completions, error: completionsError } = await supabase
          .from('quest_completions')
          .select('user_id, quest_id');

        if (completionsError) {
          setLoading(false);
          return;
        }

        // Group quest IDs by user, filter to intern quests only
        const userQuests: Record<string, string[]> = {};
        (completions || []).forEach((row) => {
          if (!internQuestIds.includes(row.quest_id)) return;
          if (!userQuests[row.user_id]) userQuests[row.user_id] = [];
          userQuests[row.user_id].push(row.quest_id);
        });

        const ranked: RankedUser[] = (users as User[]).map((u) => {
          const quests = userQuests[u.id] || [];
          const xp = calculateInternXP(quests);
          return {
            id: u.id,
            nickname: u.nickname,
            role: u.role,
            completedCount: quests.length,
            xp,
            level: getLevelForXP(xp),
          };
        });

        ranked.sort((a, b) => b.xp - a.xp);

        const max = ranked.length > 0 ? ranked[0].xp : 1;
        setMaxXP(max > 0 ? max : 1);

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
            🎓 インターンランキング
          </h1>
          <p className="text-text-secondary">
            インターンプログラムのXPでランキング上位を目指そう！
          </p>
        </div>

        {/* Link to overall ranking */}
        <div className="mb-6 text-center">
          <Link
            href="/ranking"
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            総合ランキングを見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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
            <div className="grid grid-cols-[50px_1fr_auto_140px] md:grid-cols-[50px_1fr_100px_150px_140px] items-center px-4 py-3 bg-surface-hover border-b border-border">
              <span className="text-xs font-semibold text-text-muted text-center">順位</span>
              <span className="text-xs font-semibold text-text-muted">ニックネーム</span>
              <span className="text-xs font-semibold text-text-muted hidden md:block">ロール</span>
              <span className="text-xs font-semibold text-text-muted hidden md:block text-center">レベル</span>
              <span className="text-xs font-semibold text-text-muted text-right">XP / クエスト</span>
            </div>

            {/* Ranking rows */}
            {rankedUsers.map((rankedUser, index) => {
              const rank = index + 1;
              const isCurrentUser = user?.userId === rankedUser.id;
              const roleInfo = rankedUser.role ? getRoleById(rankedUser.role) : null;

              return (
                <div
                  key={rankedUser.id}
                  className={`grid grid-cols-[50px_1fr_auto_140px] md:grid-cols-[50px_1fr_100px_150px_140px] items-center px-4 py-3
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

                  {/* Nickname + Level (mobile) */}
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
                    {/* Level + Role on mobile */}
                    <div className="md:hidden flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-text-muted">
                        {rankedUser.level.emoji} Lv.{rankedUser.level.level} {rankedUser.level.title}
                      </span>
                      {roleInfo && (
                        <span className="text-xs text-text-muted">
                          · {roleInfo.emoji} {roleInfo.label}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Role badge (desktop) */}
                  <div className="hidden md:block">
                    {roleInfo ? (
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full text-white ${roleInfo.color}`}
                      >
                        {roleInfo.emoji}
                      </span>
                    ) : (
                      <span className="text-xs text-text-muted">-</span>
                    )}
                  </div>

                  {/* Level (desktop) */}
                  <div className="hidden md:flex items-center justify-center gap-1">
                    <span className="text-lg">{rankedUser.level.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        Lv.{rankedUser.level.level}
                      </p>
                      <p className="text-[10px] text-text-muted">{rankedUser.level.title}</p>
                    </div>
                  </div>

                  {/* XP and quest count */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-xp-gold-dark">
                      {rankedUser.xp} XP
                    </p>
                    <p className="text-[10px] text-text-muted">
                      {rankedUser.completedCount} クエスト完了
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
                          width: `${(rankedUser.xp / maxXP) * 100}%`,
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
