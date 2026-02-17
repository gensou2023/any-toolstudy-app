'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { useProgress } from '@/hooks/useProgress';
import { curriculum } from '@/data/curriculum';
import {
  getOverallProgress,
  isDayUnlocked,
  getCompletedCountForDay,
  getTotalQuestsForRole,
} from '@/lib/progress';
import { TOTAL_DAYS, IS_DEMO_MODE } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { calculateTotalXP, getLevelForXP, getXPForDifficulty } from '@/lib/gamification';
import { useStreak } from '@/hooks/useStreak';
import AppLayout from '@/components/layout/AppLayout';
import WelcomeHero from '@/components/dashboard/WelcomeHero';
import OverallProgress from '@/components/dashboard/OverallProgress';
import DayCard from '@/components/dashboard/DayCard';
import RecentActivity from '@/components/dashboard/RecentActivity';

// Hardcoded day info for days that don't have curriculum data yet
const dayInfoFallback = [
  { dayId: 1, title: 'Cursorの世界へようこそ', emoji: '🚀' },
  { dayId: 2, title: 'AIと上手に会話する', emoji: '💬' },
  { dayId: 3, title: '実践コーディング', emoji: '💻' },
  { dayId: 4, title: 'チーム開発の極意', emoji: '🤝' },
  { dayId: 5, title: '総合演習 & 卒業', emoji: '🎓' },
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
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

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

  // Streak comes from useStreak() hook

  // Calculate daily completions (quests completed today)
  const dailyCompleted = (() => {
    if (isLoading) return 0;
    const today = new Date().toDateString();
    // In demo mode, use a fixed number
    if (IS_DEMO_MODE) return 2;
    // For real mode, count from recent activities
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

  // Determine current day (first non-completed, unlocked day)
  const currentDay = (() => {
    if (isLoading) return 1;
    for (let i = 1; i <= TOTAL_DAYS; i++) {
      if (!isDayUnlocked(i, completions, curriculum, role)) continue;
      const { completed, total } = getCompletedCountForDay(
        i,
        completions,
        curriculum,
        role
      );
      if (total === 0 || completed < total) return i;
    }
    return TOTAL_DAYS;
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
          />
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
          />
        )}

        {/* Day Cards */}
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4">
            カリキュラム
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
              {dayInfoFallback.map((dayInfo, index) => {
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
                  role
                );

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
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {!activitiesLoading && (
          <RecentActivity activities={recentActivities} />
        )}
      </div>
    </AppLayout>
  );
}
