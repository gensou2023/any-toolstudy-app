'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { roles } from '@/data/roles';
import { APP_NAME } from '@/lib/constants';
import type { RoleId } from '@/types';

export default function SelectRolePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { setRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedRole) return;

    setIsSubmitting(true);
    try {
      await setRole(selectedRole);
      router.push('/dashboard');
    } catch {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">&#x2694;&#xFE0F;</div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {APP_NAME}
          </h1>
          {user && (
            <p className="text-lg text-text-secondary">
              {user.nickname}さん、ようこそ！
            </p>
          )}
        </div>

        {/* Role Selection Card */}
        <div className="bg-surface rounded-2xl shadow-lg border border-border p-8">
          <h2 className="text-xl font-bold text-text-primary text-center mb-6">
            あなたの職種を選んでください
          </h2>

          {/* Role Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`
                    relative flex flex-col items-center text-center p-6 rounded-xl border-2
                    transition-all duration-200 cursor-pointer
                    ${
                      isSelected
                        ? 'border-primary bg-primary/5 scale-[1.02] shadow-md'
                        : 'border-border bg-surface hover:border-primary-light hover:bg-surface-hover hover:scale-[1.01]'
                    }
                  `}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Emoji */}
                  <span className="text-4xl mb-3">{role.emoji}</span>

                  {/* Label */}
                  <span className="text-base font-semibold text-text-primary mb-1">
                    {role.label}
                  </span>

                  {/* Description */}
                  <span className="text-sm text-text-secondary leading-relaxed">
                    {role.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              disabled={!selectedRole || isSubmitting}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
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
                  設定中...
                </span>
              ) : (
                '次へ進む'
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted text-xs mt-6">
          職種に応じて最適なクエストが表示されます
        </p>
      </div>
    </div>
  );
}
