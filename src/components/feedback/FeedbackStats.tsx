'use client';

interface FeedbackStatsProps {
  totalCount: number;
  averageRating: number;
  uniqueUsers: number;
  thisWeekCount: number;
}

export default function FeedbackStats({
  totalCount,
  averageRating,
  uniqueUsers,
  thisWeekCount,
}: FeedbackStatsProps) {
  const cards = [
    { label: '総フィードバック数', value: totalCount, icon: '📊', color: 'text-primary' },
    { label: '平均評価', value: averageRating > 0 ? `${averageRating}` : '-', icon: '⭐', color: 'text-yellow-500' },
    { label: '送信者数', value: uniqueUsers, icon: '👥', color: 'text-accent' },
    { label: '今週の件数', value: thisWeekCount, icon: '📅', color: 'text-secondary' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-surface rounded-xl border border-border p-4 text-center"
        >
          <div className="text-2xl mb-1">{card.icon}</div>
          <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
          <div className="text-xs text-text-muted mt-1">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
