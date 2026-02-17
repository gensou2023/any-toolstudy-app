'use client';

import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsHeader from './AnalyticsHeader';
import StatsSummaryCards from './StatsSummaryCards';
import UsageSection from './UsageSection';
import LearningProgressSection from './LearningProgressSection';
import TypingStatsSection from './TypingStatsSection';
import FeedbackTrendsSection from './FeedbackTrendsSection';
import AnalyticsEmptyState from './AnalyticsEmptyState';

export default function AnalyticsDashboard() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-text-muted mt-3">データを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-4xl mb-3">⚠️</span>
        <p className="text-text-primary font-medium mb-1">データの取得に失敗しました</p>
        <p className="text-text-secondary text-sm">{error}</p>
      </div>
    );
  }

  if (!data) {
    return <AnalyticsEmptyState />;
  }

  const isEmpty =
    data.summary.totalUsers === 0 &&
    data.summary.totalCompletions === 0 &&
    data.summary.totalTypingPlays === 0;

  if (isEmpty) {
    return (
      <>
        <AnalyticsHeader />
        <AnalyticsEmptyState />
      </>
    );
  }

  return (
    <>
      <AnalyticsHeader />
      <StatsSummaryCards summary={data.summary} />
      <UsageSection data={data.usage} />
      <LearningProgressSection data={data.learningProgress} />
      <TypingStatsSection data={data.typingStats} />
      <FeedbackTrendsSection data={data.feedbackTrends} />
    </>
  );
}
