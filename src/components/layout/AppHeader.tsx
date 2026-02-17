'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getRoleById } from '@/data/roles';
import { getLevelForXP } from '@/lib/gamification';
import { useTheme } from '@/hooks/useTheme';

interface AppHeaderProps {
  nickname: string;
  role: string | null;
  xp?: number;
  streak?: number;
  onMenuToggle?: () => void;
  onLogout?: () => void;
}

export default function AppHeader({ nickname, role, xp = 0, streak = 0, onMenuToggle, onLogout }: AppHeaderProps) {
  const router = useRouter();
  const roleInfo = role ? getRoleById(role) : null;
  const level = getLevelForXP(xp);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface shadow-sm border-b border-border z-50">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Hamburger menu - mobile only */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
            onClick={onMenuToggle}
            aria-label="メニューを開く"
          >
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* App name */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xl font-bold text-text-primary hover:text-primary transition-colors"
          >
            <span className="text-2xl">&#x2694;&#xFE0F;</span>
            <span className="hidden sm:inline">Cursor道場</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak counter */}
          {streak > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">
              <span>🔥</span>
              <span>{streak}</span>
            </span>
          )}

          {/* Level badge */}
          {level && xp > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <span>{level.emoji}</span>
              <span>Lv.{level.level}</span>
            </span>
          )}

          {/* Role badge (clickable to change role) */}
          {roleInfo && (
            <button
              onClick={() => router.push('/select-role')}
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white cursor-pointer hover:opacity-80 transition-opacity ${roleInfo.color}`}
              title="コースを変更する"
            >
              <span>{roleInfo.emoji}</span>
              <span>{roleInfo.label}</span>
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
            aria-label={theme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替'}
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Nickname */}
          <span className="text-sm font-medium text-text-secondary">
            {nickname}
          </span>

          {/* Logout button */}
          <button
            className="px-3 py-1.5 text-sm rounded-lg text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all cursor-pointer"
            onClick={onLogout}
          >
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}
