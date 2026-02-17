'use client';

import { useAuth } from '@/hooks/useAuth';
import { useBadges } from '@/hooks/useBadges';
import BadgeGrid from '@/components/badges/BadgeGrid';
import Link from 'next/link';

export default function BadgesPage() {
  const { user, loading: authLoading } = useAuth();
  const { earnedBadges, loading: badgesLoading } = useBadges();

  const loading = authLoading || badgesLoading;

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
            🏅 バッジコレクション
          </h1>
          <p className="text-text-secondary">
            クエストを完了してバッジを集めよう！
          </p>
        </div>

        {/* Badge grid */}
        <BadgeGrid earnedBadges={earnedBadges} />
      </div>
    </div>
  );
}
