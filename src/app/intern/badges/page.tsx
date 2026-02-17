'use client';

import { useAuth } from '@/hooks/useAuth';
import { useBadges } from '@/hooks/useBadges';
import { badges } from '@/data/badges';
import { filterBadges } from '@/lib/badge-utils';
import Link from 'next/link';

export default function InternBadgesPage() {
  const { loading: authLoading } = useAuth();
  const { earnedBadges, loading: badgesLoading } = useBadges();

  const loading = authLoading || badgesLoading;

  const internBadges = filterBadges(badges, 'intern');

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-text-muted">読み込み中...</p>
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
            🎓 インターンバッジコレクション
          </h1>
          <p className="text-text-secondary">
            インターンカリキュラムを完了してバッジを集めよう！
          </p>
        </div>

        {/* Link to standard badges */}
        <div className="mb-6 text-center">
          <Link
            href="/badges"
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            総合バッジを見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Badge grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {internBadges.map((badge) => {
            const isEarned = earnedBadges.includes(badge.badgeId);

            return (
              <div
                key={badge.badgeId}
                className={`relative flex flex-col items-center p-6 rounded-xl border transition-all ${
                  isEarned
                    ? 'bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/30 shadow-md'
                    : 'bg-surface border-border opacity-50 grayscale'
                }`}
              >
                <span className="text-4xl mb-3">{badge.icon}</span>
                <h3 className="font-bold text-text-primary text-sm text-center mb-1">
                  {badge.name}
                </h3>
                <p className="text-xs text-text-muted text-center">
                  {badge.description}
                </p>
                {isEarned && (
                  <div className="absolute top-2 right-2">
                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
