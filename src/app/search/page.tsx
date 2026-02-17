'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRole } from '@/hooks/useRole';
import { useProgress } from '@/hooks/useProgress';
import { curriculum } from '@/data/curriculum';
import { roles } from '@/data/roles';
import { getXPForDifficulty } from '@/lib/gamification';
import AppLayout from '@/components/layout/AppLayout';
import type { RoleId } from '@/types';

export default function SearchPage() {
  const { role } = useRole();
  const { isQuestCompleted } = useProgress();
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleId | 'all'>('all');

  const allQuests = useMemo(() => {
    return curriculum.flatMap((day) =>
      day.quests.map((quest) => ({
        ...quest,
        dayTitle: day.title,
        dayEmoji: day.emoji,
      }))
    );
  }, []);

  const filteredQuests = useMemo(() => {
    let results = allQuests;

    // Filter by role
    if (roleFilter !== 'all') {
      results = results.filter(
        (q) => q.targetRoles === 'all' || q.targetRoles.includes(roleFilter)
      );
    }

    // Filter by query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (q) =>
          q.title.toLowerCase().includes(lowerQuery) ||
          q.description.toLowerCase().includes(lowerQuery) ||
          q.challenge.toLowerCase().includes(lowerQuery) ||
          q.steps.some(
            (s) =>
              s.title.toLowerCase().includes(lowerQuery) ||
              s.content.toLowerCase().includes(lowerQuery)
          )
      );
    }

    return results;
  }, [allQuests, query, roleFilter]);

  const difficultyDots = (difficulty: number) => {
    const colors = ['bg-accent', 'bg-accent', 'bg-secondary', 'bg-streak-orange', 'bg-danger'];
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${
              i < difficulty ? colors[difficulty - 1] : 'bg-border'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            🔍 クエスト検索
          </h1>
          <p className="text-text-secondary text-sm">
            {allQuests.length}件のクエストからキーワードで検索
          </p>
        </div>

        {/* Search input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="クエスト名、キーワードで検索..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                placeholder:text-text-muted text-text-primary transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleId | 'all')}
            className="px-3 py-2.5 text-sm bg-surface border border-border rounded-xl
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              text-text-primary cursor-pointer"
          >
            <option value="all">すべてのロール</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.emoji} {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-text-muted">
          {filteredQuests.length}件の結果
          {query && (
            <span>
              （「<span className="text-primary font-medium">{query}</span>」で検索）
            </span>
          )}
        </p>

        {/* Results */}
        {filteredQuests.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-text-muted">
              {query ? '検索結果が見つかりませんでした' : 'クエストがありません'}
            </p>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="mt-3 text-sm text-primary hover:underline cursor-pointer"
              >
                検索をクリア
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredQuests.map((quest) => {
              const completed = isQuestCompleted(quest.id);
              const isMyRole =
                quest.targetRoles === 'all' ||
                (role && quest.targetRoles.includes(role));

              return (
                <Link
                  key={quest.id}
                  href={`/day/${quest.dayId}/quest/${quest.id}`}
                  className={`block bg-surface rounded-xl border border-border p-4
                    hover:border-primary-light hover:shadow-sm transition-all
                    ${completed ? 'border-l-4 border-l-accent' : ''}
                    ${!isMyRole ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-text-muted">
                          {quest.dayEmoji} Day {quest.dayId}
                        </span>
                        {completed && (
                          <span className="text-xs text-accent font-medium">✓ 完了</span>
                        )}
                        {!isMyRole && (
                          <span className="text-[10px] text-text-muted bg-surface-hover px-1.5 py-0.5 rounded">
                            他ロール
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-text-primary truncate">
                        {quest.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-1 line-clamp-1">
                        {quest.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      {difficultyDots(quest.difficulty)}
                      <span className="text-xs text-xp-gold-dark font-medium">
                        {getXPForDifficulty(quest.difficulty)} XP
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {quest.estimatedMinutes}分
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
