'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import LoginTabs from '@/components/auth/LoginTabs';
import EmailLoginForm from '@/components/auth/EmailLoginForm';
import EmailRegisterForm from '@/components/auth/EmailRegisterForm';
import ProfileSetupInline from '@/components/auth/ProfileSetupInline';

type Mode = 'login' | 'profile-setup';
type TabId = 'quick' | 'email' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [activeTab, setActiveTab] = useState<TabId>('quick');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Profile setup state
  const [registeredUserId, setRegisteredUserId] = useState('');
  const [registeredNickname, setRegisteredNickname] = useState('');

  const handleQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, nickname }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'ログインに失敗しました');
        setIsLoading(false);
        return;
      }

      if (data.user.role) {
        router.push('/dashboard');
      } else {
        router.push('/select-role');
      }
    } catch {
      setError('ネットワークエラーが発生しました');
      setIsLoading(false);
    }
  };

  const handleRegisterSuccess = (user: { id: string; nickname: string; role: string | null; needsProfile: boolean }) => {
    setRegisteredUserId(user.id);
    setRegisteredNickname(user.nickname);
    setMode('profile-setup');
  };

  // Profile setup view
  if (mode === 'profile-setup') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <ProfileSetupInline
          userId={registeredUserId}
          initialNickname={registeredNickname}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">&#x2694;&#xFE0F;</div>
          <h1 className="text-3xl font-bold text-text-primary">{APP_NAME}</h1>
          <p className="mt-2 text-text-secondary">
            AIペアプログラミングの技を磨こう
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface rounded-2xl shadow-lg border border-border p-8">
          <LoginTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Quick Login Tab */}
          {activeTab === 'quick' && (
            <form onSubmit={handleQuickLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="nickname"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  ニックネーム
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="例: タロウ"
                  maxLength={20}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  パスワード
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="共有パスワードを入力"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>

              {error && activeTab === 'quick' && (
                <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    ログイン中...
                  </span>
                ) : (
                  '道場に入る'
                )}
              </button>
            </form>
          )}

          {/* Email Login Tab */}
          {activeTab === 'email' && <EmailLoginForm />}

          {/* Register Tab */}
          {activeTab === 'register' && <EmailRegisterForm onSuccess={handleRegisterSuccess} />}
        </div>

        {/* Demo credentials */}
        <div className="mt-6 bg-surface border border-border rounded-xl p-4">
          <p className="text-xs font-semibold text-text-secondary mb-2">
            🎮 デモ用ログイン情報
          </p>
          <div className="space-y-1 text-xs text-text-muted">
            <p>ニックネーム: <span className="font-mono text-text-primary">TenJin</span></p>
            <p>パスワード: <span className="font-mono text-text-primary">cursor-dojo-2024</span></p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted text-xs mt-4">
          Cursor AI を活用した開発スキルを身につけるための5日間プログラム
        </p>
      </div>
    </div>
  );
}
