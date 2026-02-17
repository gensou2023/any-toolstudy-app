import Cookies from 'js-cookie';
import { COOKIE_NAME } from './constants';
import type { AuthCookie } from '@/types';

// UTF-8 safe base64 encode/decode
function utf8ToBase64(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary);
}

function base64ToUtf8(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function encodeAuthCookie(data: AuthCookie): string {
  return utf8ToBase64(JSON.stringify(data));
}

export function decodeAuthCookie(value: string): AuthCookie | null {
  try {
    const decoded = JSON.parse(base64ToUtf8(value));
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
