'use client';

import { useState, useEffect } from 'react';
import { getAuthFromCookies } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { IS_DEMO_MODE } from '@/lib/constants';
import type { RoleId } from '@/types';

export function useRole() {
  const [role, setRoleState] = useState<RoleId | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      setRoleState('frontend-engineer');
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      const auth = getAuthFromCookies();
      if (!auth) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', auth.userId)
        .single();

      if (!error && data?.role) {
        setRoleState(data.role as RoleId);
      }

      setLoading(false);
    };

    fetchRole();
  }, []);

  const setRole = async (newRole: RoleId) => {
    if (IS_DEMO_MODE) {
      setRoleState(newRole);
      return;
    }

    const auth = getAuthFromCookies();
    if (!auth) return;

    const { error } = await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', auth.userId);

    if (!error) {
      setRoleState(newRole);
    }
  };

  return { role, loading, setRole };
}
