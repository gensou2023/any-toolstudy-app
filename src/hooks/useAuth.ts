'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthFromCookies, clearAuthCookie } from '@/lib/auth';
import { IS_DEMO_MODE } from '@/lib/constants';
import type { AuthCookie } from '@/types';

const DEMO_USER: AuthCookie = {
  userId: 'demo-user-001',
  nickname: 'デモユーザー',
};

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthCookie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      setUser(DEMO_USER);
      setLoading(false);
      return;
    }

    const auth = getAuthFromCookies();
    setUser(auth);
    setLoading(false);
  }, []);

  const logout = () => {
    if (IS_DEMO_MODE) {
      router.push('/login');
      return;
    }
    clearAuthCookie();
    setUser(null);
    router.push('/login');
  };

  return { user, loading, logout };
}
