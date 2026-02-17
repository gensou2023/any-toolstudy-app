'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { useProgress } from '@/hooks/useProgress';
import { curriculum } from '@/data/curriculum';
import { isDayUnlocked, getCompletedCountForDay } from '@/lib/progress';
import { TOTAL_DAYS } from '@/lib/constants';
import { calculateTotalXP } from '@/lib/gamification';
import { useStreak } from '@/hooks/useStreak';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, loading: authLoading, logout } = useAuth();
  const { role, loading: roleLoading } = useRole();
  const { completions, loading: progressLoading } = useProgress();
  const { streak } = useStreak();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate unlocked days
  const [unlockedDays, setUnlockedDays] = useState<number[]>([1]);
  const [dayProgress, setDayProgress] = useState<
    Record<number, { completed: number; total: number }>
  >({});

  useEffect(() => {
    if (!progressLoading && !roleLoading) {
      // Calculate which days are unlocked
      const unlocked: number[] = [];
      const progress: Record<number, { completed: number; total: number }> = {};

      for (let i = 1; i <= TOTAL_DAYS; i++) {
        if (isDayUnlocked(i, completions, curriculum, role)) {
          unlocked.push(i);
        }
        const dayCount = getCompletedCountForDay(i, completions, curriculum, role);
        progress[i] = dayCount;
      }

      setUnlockedDays(unlocked);
      setDayProgress(progress);
    }
  }, [completions, role, progressLoading, roleLoading]);

  // Calculate XP for the header
  const xp = !progressLoading ? calculateTotalXP(completions, curriculum) : 0;

  // Loading state
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-text-muted">読み込み中...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show nothing (middleware should redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader
        nickname={user.nickname}
        role={role}
        xp={xp}
        streak={streak}
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onLogout={logout}
      />

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-16 bottom-0 w-64 bg-surface shadow-xl overflow-y-auto">
            <Sidebar
              completions={completions}
              dayProgress={dayProgress}
              unlockedDays={unlockedDays}
              role={role}
              mobile
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <Sidebar
        completions={completions}
        dayProgress={dayProgress}
        unlockedDays={unlockedDays}
        role={role}
      />

      {/* Main content */}
      <main className="pt-16 md:pl-64 pb-20 md:pb-6">
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <MobileNav role={role} />
    </div>
  );
}
