'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAuthFromCookies } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { IS_DEMO_MODE } from '@/lib/constants';

// Demo mode: some badges pre-earned
const DEMO_BADGES = ['first-step', 'day1-complete'];

export function useBadges() {
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      setEarnedBadges(DEMO_BADGES);
      setLoading(false);
      return;
    }

    const fetchBadges = async () => {
      const auth = getAuthFromCookies();
      if (!auth) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('badges')
        .select('badge_id')
        .eq('user_id', auth.userId);

      if (!error && data) {
        setEarnedBadges(data.map((row) => row.badge_id));
      }

      setLoading(false);
    };

    fetchBadges();
  }, []);

  const earnBadge = async (badgeId: string): Promise<boolean> => {
    if (earnedBadges.includes(badgeId)) return false;

    if (IS_DEMO_MODE) {
      setEarnedBadges((prev) => [...prev, badgeId]);
      return true;
    }

    const auth = getAuthFromCookies();
    if (!auth) return false;

    const { error } = await supabase
      .from('badges')
      .upsert(
        {
          user_id: auth.userId,
          badge_id: badgeId,
          earned_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,badge_id' }
      );

    if (!error) {
      setEarnedBadges((prev) => [...prev, badgeId]);
      return true;
    }

    return false;
  };

  const hasBadge = useCallback(
    (badgeId: string) => {
      return earnedBadges.includes(badgeId);
    },
    [earnedBadges]
  );

  return { earnedBadges, loading, earnBadge, hasBadge };
}
