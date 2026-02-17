'use client';

import Card from '@/components/ui/Card';
import type { AnalyticsSummary } from '@/types/analytics';

interface StatsSummaryCardsProps {
  summary: AnalyticsSummary;
}

interface StatCardProps {
  emoji: string;
  label: string;
  value: string | number;
}

function StatCard({ emoji, label, value }: StatCardProps) {
  return (
    <Card className="flex items-center gap-3">
      <span className="text-2xl">{emoji}</span>
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-xl font-bold text-text-primary">{value}</p>
      </div>
    </Card>
  );
}

export default function StatsSummaryCards({ summary }: StatsSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
      <StatCard emoji="👥" label="総ユーザー" value={summary.totalUsers} />
      <StatCard emoji="🔥" label="今日のDAU" value={summary.activeUsersToday} />
      <StatCard emoji="📅" label="今週WAU" value={summary.activeUsersThisWeek} />
      <StatCard emoji="✅" label="完了数" value={summary.totalCompletions} />
      <StatCard emoji="⌨️" label="プレイ数" value={summary.totalTypingPlays} />
      <StatCard emoji="⭐" label="平均評価" value={summary.averageRating || '-'} />
    </div>
  );
}
