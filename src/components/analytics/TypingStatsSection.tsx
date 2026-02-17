'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import ChartCard from './ChartCard';
import type { TypingStatsData } from '@/types/analytics';

interface TypingStatsSectionProps {
  data: TypingStatsData;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="text-text-muted mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-text-primary font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

export default function TypingStatsSection({ data }: TypingStatsSectionProps) {
  const dailyData = data.dailyPlays.map((d) => ({
    ...d,
    date: d.date.slice(5),
  }));

  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <span>⌨️</span> タイピング統計
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Mode Average */}
        <ChartCard title="モード別平均スコア / WPM">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.averageByMode}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="mode" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="avgScore" name="平均スコア" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgWPM" name="平均WPM" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* WPM Distribution */}
        <ChartCard title="WPM分布">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.wpmDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="プレイ数" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Daily Plays */}
      <ChartCard title="デイリープレイ数（過去30日）">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={dailyData}>
            <defs>
              <linearGradient id="typingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
            <YAxis tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="count" name="プレイ数" stroke="#6366f1" fill="url(#typingGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </section>
  );
}
