'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProgressBar from '@/components/ui/ProgressBar';

// Full day info for sidebar display
const dayItems = [
  { dayId: 1, title: 'Cursorの世界へようこそ', emoji: '🚀' },
  { dayId: 2, title: 'AIと上手に会話する', emoji: '💬' },
  { dayId: 3, title: '実践コーディング', emoji: '💻' },
  { dayId: 4, title: 'チーム開発の極意', emoji: '🤝' },
  { dayId: 5, title: '総合演習 & 卒業', emoji: '🎓' },
  { dayId: 6, title: 'HTML/CSS基礎', emoji: '🌐' },
  { dayId: 7, title: 'JavaScript基礎', emoji: '⚡' },
  { dayId: 8, title: 'Git入門', emoji: '🔀' },
  { dayId: 9, title: 'AIツール活用', emoji: '🤖' },
  { dayId: 10, title: 'ビジネスツール & 卒業', emoji: '🎯' },
];

interface SidebarProps {
  completions?: string[];
  dayProgress?: Record<number, { completed: number; total: number }>;
  unlockedDays?: number[];
  mobile?: boolean;
  role?: string | null;
}

export default function Sidebar({
  completions: _completions,
  dayProgress = {},
  unlockedDays = [1],
  mobile = false,
  role = null,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'ダッシュボード', emoji: '🏠' },
    { href: '/search', label: '検索', emoji: '🔍' },
    { href: '/typing', label: 'タイプ道場', emoji: '⌨️' },
    { href: '/analytics', label: 'アナリティクス', emoji: '📈' },
  ];

  // Adjust bottom nav items based on role
  const isIntern = role === 'student-intern';
  const bottomNavItems = [
    { href: isIntern ? '/intern/badges' : '/badges', label: 'バッジ', emoji: '🏅' },
    { href: isIntern ? '/intern/ranking' : '/ranking', label: 'ランキング', emoji: '🏆' },
    { href: '/feedback', label: 'フィードバック', emoji: '📝' },
    { href: '/select-role', label: 'コース変更', emoji: '🔄' },
  ];

  // Filter visible days based on role
  const visibleDays = isIntern
    ? dayItems.filter(d => d.dayId <= 2 || d.dayId >= 6)
    : dayItems.filter(d => d.dayId <= 5);

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className={`${mobile ? 'flex' : 'hidden md:flex'} flex-col w-64 ${mobile ? 'relative' : 'fixed left-0 top-16 bottom-0'} bg-surface border-r border-border overflow-y-auto`}>
      <nav className="flex-1 py-4">
        {/* Main navigation */}
        <div className="px-3 mb-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1
                ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary border-l-3 border-primary'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                }`}
            >
              <span className="text-lg">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Day navigation */}
        <div className="px-3 mt-4">
          <p className="px-3 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
            {isIntern ? 'インターンカリキュラム' : 'カリキュラム'}
          </p>
          {visibleDays.map((day) => {
            const isLocked = !unlockedDays.includes(day.dayId);
            const href = `/day/${day.dayId}`;
            const active = isActive(href);
            const progress = dayProgress[day.dayId];
            const progressPercent =
              progress && progress.total > 0
                ? Math.round((progress.completed / progress.total) * 100)
                : 0;

            if (isLocked) {
              return (
                <div
                  key={day.dayId}
                  className="flex flex-col px-3 py-2.5 rounded-lg text-sm mb-1 opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg grayscale">{day.emoji}</span>
                    <span className="text-text-muted flex-1">
                      Day {day.dayId}
                    </span>
                    <svg
                      className="w-4 h-4 text-text-muted"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={day.dayId}
                href={href}
                className={`flex flex-col px-3 py-2.5 rounded-lg text-sm mb-1 transition-all
                  ${
                    active
                      ? 'bg-primary/10 text-primary border-l-3 border-primary'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{day.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className="block font-medium">Day {day.dayId}</span>
                    <span className="block text-xs text-text-muted truncate">
                      {day.title}
                    </span>
                  </div>
                  {progressPercent === 100 && (
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {progress && progress.total > 0 && (
                  <div className="mt-1.5 ml-8">
                    <ProgressBar
                      value={progressPercent}
                      size="sm"
                      color={progressPercent === 100 ? 'accent' : 'primary'}
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom navigation */}
        <div className="px-3 mt-6">
          <div className="border-t border-border pt-4">
            {bottomNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1
                  ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary border-l-3 border-primary'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                  }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
