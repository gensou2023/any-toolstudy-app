'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { useProgress } from '@/hooks/useProgress';
import { useToolLinks } from '@/hooks/useToolLinks';
import { useUnlockOverrides } from '@/hooks/useUnlockOverrides';
import { useAssessment } from '@/hooks/useAssessment';
import { curriculum } from '@/data/curriculum';
import {
  getOverallProgress,
  isDayUnlocked,
  getCompletedCountForDay,
  getTotalQuestsForRole,
} from '@/lib/progress';
import { getTotalDays, IS_DEMO_MODE } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { calculateTotalXP, getLevelForXP, getXPForDifficulty } from '@/lib/gamification';
import { useStreak } from '@/hooks/useStreak';
import AppLayout from '@/components/layout/AppLayout';
import WelcomeHero from '@/components/dashboard/WelcomeHero';
import OverallProgress from '@/components/dashboard/OverallProgress';
import DayCard from '@/components/dashboard/DayCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DashboardFeedbackForm from '@/components/feedback/DashboardFeedbackForm';
import ToolLinksEditor from '@/components/dashboard/ToolLinksEditor';
import Link from 'next/link';

// Hardcoded day info for days that don't have curriculum data yet
const dayInfoFallback = [
  { dayId: 1, title: 'Cursorの世界へようこそ', emoji: '🚀' },
  { dayId: 2, title: 'AIと上手に会話する', emoji: '💬' },
  { dayId: 3, title: '実践コーディング', emoji: '💻' },
  { dayId: 4, title: 'チーム開発の極意', emoji: '🤝' },
  { dayId: 5, title: '総合演習 & 卒業', emoji: '🎓' },
  { dayId: 6, title: 'HTML/CSS基礎', emoji: '🌐' },
  { dayId: 7, title: 'JavaScript基礎', emoji: '⚡' },
  { dayId: 8, title: 'Git入門', emoji: '🔀' },
  { dayId: 9, title: 'AIツール活用', emoji: '🤖' },
  { dayId: 10, title: 'ビジネスツール & 卒業', emoji: '🎯' },
];


interface RecentActivityItem {
  questTitle: string;
  completedAt: string;
  xpGained?: number;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();
  const { completions, loading: progressLoading } = useProgress();
  const { streak } = useStreak();
  const { toolLinks, updateToolLinks, resetToolLinks } = useToolLinks();
  const { overrides } = useUnlockOverrides();
  const { isCompleted: assessmentCompleted } = useAssessment();
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [isToolLinksEditorOpen, setIsToolLinksEditorOpen] = useState(false);

  const isIntern = role === 'student-intern';
  const totalDays = getTotalDays(role);

  // Fetch recent quest completions
  useEffect(() => {
    const fetchRecentActivities = async () => {
      if (IS_DEMO_MODE) {
        // Demo mock data with XP
        const demoActivities: RecentActivityItem[] = [
          { questTitle: 'Cursorをインストールしよう', completedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), xpGained: 20 },
          { questTitle: '画面を探検しよう', completedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), xpGained: 25 },
          { questTitle: 'AIに初めて話しかけよう', completedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), xpGained: 35 },
          { questTitle: 'ファイルを作ってみよう', completedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), xpGained: 20 },
        ];
        setRecentActivities(demoActivities);
        setActivitiesLoading(false);
        return;
      }

      if (!user) {
        setActivitiesLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('quest_completions')
          .select('quest_id, completed_at')
          .eq('user_id', user.userId)
          .order('completed_at', { ascending: false })
          .limit(5);

        if (!error && data) {
          const activities: RecentActivityItem[] = data.map((row) => {
            let questTitle = row.quest_id;
            let xpGained = 20; // default
            for (const day of curriculum) {
              const quest = day.quests.find((q) => q.id === row.quest_id);
              if (quest) {
                questTitle = quest.title;
                xpGained = getXPForDifficulty(quest.difficulty);
                break;
              }
            }
            return {
              questTitle,
              completedAt: row.completed_at,
              xpGained,
            };
          });
          setRecentActivities(activities);
        }
      } catch {
        // Silently fail
      }

      setActivitiesLoading(false);
    };

    if (!authLoading) {
      fetchRecentActivities();
    }
  }, [user, authLoading]);

  const isLoading = authLoading || roleLoading || progressLoading;

  // Calculate progress data
  const overallPercent = isLoading
    ? 0
    : Math.round(getOverallProgress(completions, curriculum, role) * 100);
  const totalQuests = isLoading ? 0 : getTotalQuestsForRole(curriculum, role);
  const completedCount = isLoading
    ? 0
    : completions.filter((id) =>
        curriculum.some((day) =>
          day.quests.some(
            (q) =>
              q.id === id &&
              (q.targetRoles === 'all' || (role && q.targetRoles.includes(role)))
          )
        )
      ).length;

  // Calculate XP and level
  const totalXP = isLoading ? 0 : calculateTotalXP(completions, curriculum);
  const currentLevel = getLevelForXP(totalXP);

  // Calculate daily completions (quests completed today)
  const dailyCompleted = (() => {
    if (isLoading) return 0;
    const today = new Date().toDateString();
    if (IS_DEMO_MODE) return 2;
    return recentActivities.filter((a) => {
      return new Date(a.completedAt).toDateString() === today;
    }).length;
  })();

  // Calculate XP available per day
  const getXPForDay = (dayId: number): number => {
    const curriculumDay = curriculum.find((d) => d.dayId === dayId);
    if (!curriculumDay) return 0;
    return curriculumDay.quests.reduce((sum, q) => {
      if (q.targetRoles === 'all' || (role && q.targetRoles.includes(role))) {
        return sum + getXPForDifficulty(q.difficulty);
      }
      return sum;
    }, 0);
  };

  // Filter visible days based on role
  const visibleDayInfo = isIntern
    ? dayInfoFallback.filter(d => d.dayId <= 2 || d.dayId >= 6)
    : dayInfoFallback.filter(d => d.dayId <= 5);

  // Determine current day (first non-completed, unlocked day)
  const currentDay = (() => {
    if (isLoading) return 1;
    for (let i = 1; i <= totalDays; i++) {
      if (!isDayUnlocked(i, completions, curriculum, role, overrides)) continue;
      const { completed, total } = getCompletedCountForDay(
        i,
        completions,
        curriculum,
        role
      );
      if (total === 0 || completed < total) return i;
    }
    return totalDays;
  })();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Hero */}
        {user && (
          <WelcomeHero
            nickname={user.nickname}
            progressPercent={overallPercent}
            xp={totalXP}
            streak={streak}
            level={currentLevel}
            isIntern={isIntern}
          />
        )}

        {/* Assessment prompt for users who haven't completed it */}
        {!isLoading && !assessmentCompleted && role && (
          <Link
            href="/assessment"
            className="block bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20 p-5 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎯</span>
              <div>
                <h3 className="font-bold text-text-primary">スキルアセスメントを受けよう！</h3>
                <p className="text-sm text-text-secondary mt-0.5">
                  あなたのスキルレベルに合わせてカリキュラムをカスタマイズします
                </p>
              </div>
              <svg className="w-6 h-6 text-primary ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        )}

        {/* Overall Progress */}
        {!isLoading && (
          <OverallProgress
            completedCount={completedCount}
            totalCount={totalQuests}
            currentDay={currentDay}
            xp={totalXP}
            dailyCompleted={dailyCompleted}
            dailyGoal={3}
            isIntern={isIntern}
          />
        )}

        {/* Mini Game Card */}
        <Link
          href="/typing"
          className="block bg-surface rounded-xl border border-border p-5 hover:border-primary/30 hover:bg-primary/5 transition-all group"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl group-hover:scale-110 transition-transform">⌨️</span>
            <div>
              <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">
                福岡タイプ道場
              </h3>
              <p className="text-sm text-text-secondary mt-0.5">
                福岡名産品＋IT用語でタイピングスキルを鍛えよう！
              </p>
            </div>
            <svg className="w-6 h-6 text-text-muted group-hover:text-primary ml-auto flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Day Cards */}
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4">
            {isIntern ? 'インターンカリキュラム（全7日間）' : 'カリキュラム'}
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-surface rounded-xl border border-border animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
              {visibleDayInfo.map((dayInfo, index) => {
                const curriculumDay = curriculum.find(
                  (d) => d.dayId === dayInfo.dayId
                );
                const { completed, total } = getCompletedCountForDay(
                  dayInfo.dayId,
                  completions,
                  curriculum,
                  role
                );
                const locked = !isDayUnlocked(
                  dayInfo.dayId,
                  completions,
                  curriculum,
                  role,
                  overrides
                );

                const isOverrideUnlocked = overrides.includes(dayInfo.dayId);

                // Category label for intern days
                const categoryLabel = isIntern
                  ? dayInfo.dayId <= 2
                    ? '基礎'
                    : dayInfo.dayId <= 8
                      ? '応用'
                      : '実践'
                  : undefined;

                return (
                  <DayCard
                    key={dayInfo.dayId}
                    dayId={dayInfo.dayId}
                    title={curriculumDay?.title ?? dayInfo.title}
                    emoji={curriculumDay?.emoji ?? dayInfo.emoji}
                    completed={completed}
                    total={total}
                    isLocked={locked}
                    isCurrent={dayInfo.dayId === currentDay}
                    xpAvailable={getXPForDay(dayInfo.dayId)}
                    index={index}
                    categoryLabel={categoryLabel}
                    isSkippable={isOverrideUnlocked}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Tool Links Section (Intern only) */}
        {isIntern && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text-primary">
                ツールリンク集
              </h2>
              <button
                onClick={() => setIsToolLinksEditorOpen(true)}
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors cursor-pointer"
                aria-label="ツールリンクを編集"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {toolLinks.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <span className="text-2xl">{tool.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-text-primary group-hover:text-primary transition-colors text-sm">
                      {tool.name}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {tool.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <ToolLinksEditor
              isOpen={isToolLinksEditorOpen}
              onClose={() => setIsToolLinksEditorOpen(false)}
              toolLinks={toolLinks}
              onSave={updateToolLinks}
              onReset={resetToolLinks}
            />
          </div>
        )}

        {/* Recent Activity */}
        {!activitiesLoading && (
          <RecentActivity activities={recentActivities} />
        )}

        {/* Feedback Form */}
        <DashboardFeedbackForm />
      </div>
    </AppLayout>
  );
}
