'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
import type { UsageData } from '@/types/analytics';

interface UsageSectionProps {
  data: UsageData;
}

const PIE_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

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

export default function UsageSection({ data }: UsageSectionProps) {
  const dauData = data.dailyActiveUsers.map((d) => ({
    ...d,
    date: d.date.slice(5), // MM-DD
  }));

  const wauData = data.weeklyActiveUsers.map((d) => ({
    ...d,
    week: d.week.replace(/^\d{4}-/, ''),
  }));

  const growthData = data.userGrowth.map((d) => ({
    ...d,
    date: d.date.slice(5),
  }));

  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <span>🔥</span> 利用状況
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DAU */}
        <ChartCard title="DAU推移（過去30日）">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={dauData}>
              <defs>
                <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" name="DAU" stroke="#6366f1" fill="url(#dauGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* WAU */}
        <ChartCard title="WAU推移（過去12週）">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={wauData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="WAU" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* User Growth */}
        <ChartCard title="ユーザー登録推移">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--color-text-muted)" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cumulative" name="累計" stroke="#10b981" fill="url(#growthGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Role Distribution */}
        <ChartCard title="ロール分布">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.roleDistribution}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="70%"
                paddingAngle={2}
                label={({ name, value }: { name?: string; value?: number }) => `${name} (${value})`}
              >
                {data.roleDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
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
