'use client';

import { useState, useEffect } from 'react';
import { getAuthFromCookies } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { IS_DEMO_MODE } from '@/lib/constants';

/**
 * Calculate consecutive days streak from quest completion dates.
 * A streak counts backwards from today: if you completed at least one quest
 * today (or yesterday, to be lenient), and the day before that, etc.
 */
function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  // Get unique dates (YYYY-MM-DD) sorted descending
  const uniqueDays = Array.from(
    new Set(
      dates.map((d) => {
        const dt = new Date(d);
        return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
      })
    )
  ).sort((a, b) => b.localeCompare(a));

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  // Streak must start from today or yesterday
  const mostRecent = uniqueDays[0];
  if (mostRecent !== todayStr && mostRecent !== yesterdayStr) {
    return 0;
  }

  // Count consecutive days backwards
  let streak = 0;
  let checkDate = new Date(mostRecent + 'T00:00:00');

  for (const dayStr of uniqueDays) {
    const expected = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
    if (dayStr === expected) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (dayStr < expected) {
      // Gap found, stop counting
      break;
    }
  }

  return streak;
}

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      setStreak(3);
      setLoading(false);
      return;
    }

    const fetchStreak = async () => {
      const auth = getAuthFromCookies();
      if (!auth) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('quest_completions')
          .select('completed_at')
          .eq('user_id', auth.userId)
          .order('completed_at', { ascending: false });

        if (!error && data) {
          const dates = data.map((row) => row.completed_at);
          setStreak(calculateStreak(dates));
        }
      } catch {
        // Silently fail
      }

      setLoading(false);
    };

    fetchStreak();
  }, []);

  return { streak, loading };
}
