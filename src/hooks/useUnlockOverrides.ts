'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/lib/supabase';
import { IS_DEMO_MODE } from '@/lib/constants';

export function useUnlockOverrides() {
  const { user } = useAuth();
  const [overrides, setOverrides] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverrides = async () => {
      if (IS_DEMO_MODE) {
        setOverrides([]);
        setLoading(false);
        return;
      }

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('day_unlock_overrides')
          .select('day_id')
          .eq('user_id', user.userId);

        if (!error && data) {
          setOverrides(data.map(d => d.day_id));
        }
      } catch {
        // Silently fail
      }
      setLoading(false);
    };

    fetchOverrides();
  }, [user]);

  return { overrides, loading };
}
