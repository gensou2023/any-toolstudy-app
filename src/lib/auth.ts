import Cookies from 'js-cookie';
import { COOKIE_NAME } from './constants';
import type { AuthCookie } from '@/types';

export function encodeAuthCookie(data: AuthCookie): string {
  return btoa(JSON.stringify(data));
}

export function decodeAuthCookie(value: string): AuthCookie | null {
  try {
    const decoded = JSON.parse(atob(value));
    if (decoded.userId && decoded.nickname) {
      return decoded as AuthCookie;
    }
    return null;
  } catch {
    return null;
  }
}

export function getAuthFromCookies(): AuthCookie | null {
  const value = Cookies.get(COOKIE_NAME);
  if (!value) return null;
  return decodeAuthCookie(value);
}

export function setAuthCookie(data: AuthCookie): void {
  const encoded = encodeAuthCookie(data);
  Cookies.set(COOKIE_NAME, encoded, { expires: 7 });
}

export function clearAuthCookie(): void {
  Cookies.remove(COOKIE_NAME);
}
