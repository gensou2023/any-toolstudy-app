'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import ChartCard from './ChartCard';
import ProgressBar from '@/components/ui/ProgressBar';
import type { LearningProgressData } from '@/types/analytics';

interface LearningProgressSectionProps {
  data: LearningProgressData;
}

const PROGRESS_COLORS = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#10b981', '#6366f1'];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="text-text-muted mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-text-primary font-medium">{p.name}: {p.value}</p>
      ))}
    </div>
  );
}

export default function LearningProgressSection({ data }: LearningProgressSectionProps) {
  const avgPercent = Math.round(data.averageProgress * 100);

  // Find the lowest completion rate for highlighting
  const minRate = Math.min(...data.dayCompletionRates.map((d) => d.completionRate));

  const dayData = data.dayCompletionRates.map((d) => ({
    name: `${d.emoji} Day${d.dayId}`,
    完了率: Math.round(d.completionRate * 100),
    isBottleneck: d.completionRate === minRate && d.completionRate < 0.5,
  }));

  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <span>📚</span> 学習進捗
      </h2>

      {/* Average progress bar */}
      <div className="mb-6 p-4 bg-surface rounded-xl border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">全体平均進捗</span>
          <span className="text-sm font-bold text-primary">{avgPercent}%</span>
        </div>
        <ProgressBar value={avgPercent} size="md" color="primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Day Completion Rates */}
        <ChartCard title="Day別完了率">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dayData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" unit="%" />
              <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="完了率" radius={[0, 4, 4, 0]}>
                {dayData.map((entry, i) => (
                  <Cell key={i} fill={entry.isBottleneck ? '#ef4444' : '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Progress Distribution */}
        <ChartCard title="進捗分布">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.progressDistribution}
                dataKey="count"
                nameKey="bucket"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                paddingAngle={2}
                label={({ name, value }: { name?: string; value?: number }) => value && value > 0 ? `${name} (${value})` : ''}
              >
                {data.progressDistribution.map((_, i) => (
                  <Cell key={i} fill={PROGRESS_COLORS[i % PROGRESS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}
