'use client';

import Link from 'next/link';
import { getRoleById } from '@/data/roles';
import { getLevelForXP } from '@/lib/gamification';

interface AppHeaderProps {
  nickname: string;
  role: string | null;
  xp?: number;
  streak?: number;
  onMenuToggle?: () => void;
  onLogout?: () => void;
}

export default function AppHeader({ nickname, role, xp = 0, streak = 0, onMenuToggle, onLogout }: AppHeaderProps) {
  const roleInfo = role ? getRoleById(role) : null;
  const level = getLevelForXP(xp);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm border-b border-border z-50">
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

          {/* Role badge */}
          {roleInfo && (
            <span
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white ${roleInfo.color}`}
            >
              <span>{roleInfo.emoji}</span>
              <span>{roleInfo.label}</span>
            </span>
          )}

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
