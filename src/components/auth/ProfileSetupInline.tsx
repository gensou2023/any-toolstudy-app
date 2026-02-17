'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { roles } from '@/data/roles';
import { supabase } from '@/lib/supabase';
import { IS_DEMO_MODE } from '@/lib/constants';
import { setAuthCookie } from '@/lib/auth';
import type { RoleId } from '@/types';
import StepIndicator from './StepIndicator';

interface ProfileSetupInlineProps {
  userId: string;
  initialNickname: string;
}

export default function ProfileSetupInline({ userId, initialNickname }: ProfileSetupInlineProps) {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0: nickname, 1: role
  const [nickname, setNickname] = useState(initialNickname);
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const handleNicknameNext = async () => {
    const trimmed = nickname.trim();
    if (trimmed.length < 1 || trimmed.length > 20) {
      setError('ニックネームは1〜20文字で入力してください');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      if (!IS_DEMO_MODE) {
        const { error: updateError } = await supabase
          .from('users')
          .update({ nickname: trimmed })
          .eq('id', userId);

        if (updateError) {
          setError('ニックネームの更新に失敗しました');
          setIsLoading(false);
          return;
        }
      }

      // Update the auth cookie with the new nickname
      setAuthCookie({ userId, nickname: trimmed });

      setSlideDirection('left');
      setStep(1);
    } catch {
      setError('エラーが発生しました');
    }
    setIsLoading(false);
  };

  const handleRoleSelect = async (roleId: RoleId) => {
    setSelectedRole(roleId);
    setIsLoading(true);

    try {
      if (!IS_DEMO_MODE) {
        await supabase
          .from('users')
          .update({ role: roleId })
          .eq('id', userId);
      }

      // Small delay for visual feedback
      setTimeout(() => {
        router.push('/assessment');
      }, 500);
    } catch {
      setError('ロールの設定に失敗しました');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-xl font-bold text-text-primary">登録完了！</h2>
        <p className="text-sm text-text-secondary mt-1">
          プロフィールを設定しましょう
        </p>
      </div>

      <StepIndicator totalSteps={2} currentStep={step} />

      <div className="bg-surface rounded-2xl shadow-lg border border-border p-8 overflow-hidden">
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            transform: step === 0 ? 'translateX(0)' : 'translateX(-100%)',
            opacity: step === 0 ? 1 : 0,
            position: step === 0 ? 'relative' : 'absolute',
            pointerEvents: step === 0 ? 'auto' : 'none',
          }}
        >
          {/* Step 1: Nickname */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              ニックネームを決めよう
            </h3>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="例: タロウ"
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              onKeyDown={(e) => e.key === 'Enter' && handleNicknameNext()}
            />
            {error && step === 0 && (
              <p className="text-danger text-sm mt-2">{error}</p>
            )}
            <button
              onClick={handleNicknameNext}
              disabled={isLoading || !nickname.trim()}
              className="w-full mt-4 py-3 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? '更新中...' : '次へ'}
            </button>
          </div>
        </div>

        {step === 1 && (
          <div
            className="animate-slide-up"
          >
            {/* Step 2: Role selection */}
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              コースを選ぼう
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  disabled={isLoading}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                    selectedRole === role.id
                      ? 'border-primary bg-primary/10 ring-2 ring-primary'
                      : 'border-border hover:border-primary/30 hover:bg-primary/5'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="text-2xl">{role.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary text-sm">{role.label}</p>
                    <p className="text-xs text-text-muted truncate">{role.description}</p>
                  </div>
                </button>
              ))}
            </div>
            {error && step === 1 && (
              <p className="text-danger text-sm mt-2">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
