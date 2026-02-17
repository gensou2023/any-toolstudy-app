'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
} from 'recharts';
import ChartCard from './ChartCard';
import type { FeedbackTrendsData } from '@/types/analytics';

interface FeedbackTrendsSectionProps {
  data: FeedbackTrendsData;
}

const RATING_COLORS: Record<number, string> = {
  1: '#ef4444',
  2: '#f97316',
  3: '#eab308',
  4: '#22c55e',
  5: '#10b981',
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="text-text-muted mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-text-primary font-medium">{p.name}: {typeof p.value === 'number' ? Math.round(p.value * 10) / 10 : p.value}</p>
      ))}
    </div>
  );
}

export default function FeedbackTrendsSection({ data }: FeedbackTrendsSectionProps) {
  // Rating distribution as horizontal bar chart
  const ratingData = [5, 4, 3, 2, 1].map((r) => ({
    rating: `${r}★`,
    count: data.ratingDistribution[r] ?? 0,
    star: r,
  }));

  const weeklyData = data.weeklyVolume.map((d) => ({
    ...d,
    week: d.week.replace(/^\d{4}-/, ''),
  }));

  const trendData = data.averageRatingTrend
    .filter((d) => d.avgRating > 0)
    .map((d) => ({
      ...d,
      week: d.week.replace(/^\d{4}-/, ''),
    }));

  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <span>📝</span> フィードバック傾向
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Rating Distribution */}
        <ChartCard title="評価分布">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratingData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <YAxis type="category" dataKey="rating" width={40} tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="件数" radius={[0, 4, 4, 0]}>
                {ratingData.map((entry, i) => (
                  <Cell key={i} fill={RATING_COLORS[entry.star]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Weekly Volume */}
        <ChartCard title="週別投稿数">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="questCount" name="クエスト" stackId="a" fill="#6366f1" />
              <Bar dataKey="generalCount" name="一般" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Average Rating Trend */}
        <ChartCard title="平均評価推移">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <YAxis domain={[1, 5]} tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={4.0} stroke="#10b981" strokeDasharray="3 3" label={{ value: '目標 4.0', fill: '#10b981', fontSize: 11 }} />
              <Line type="monotone" dataKey="avgRating" name="平均評価" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Quest Satisfaction Table */}
        <ChartCard title="クエスト満足度ランキング">
          <div className="overflow-y-auto max-h-[250px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted font-medium">クエスト</th>
                  <th className="text-right py-2 text-text-muted font-medium w-16">評価</th>
                  <th className="text-right py-2 text-text-muted font-medium w-12">件数</th>
                </tr>
              </thead>
              <tbody>
                {data.questSatisfaction.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-text-muted">データなし</td>
                  </tr>
                ) : (
                  data.questSatisfaction.map((q, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 text-text-primary truncate max-w-[200px]">{q.questTitle}</td>
                      <td className="py-2 text-right font-medium text-primary">{q.avgRating}</td>
                      <td className="py-2 text-right text-text-secondary">{q.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </section>
  );
}
