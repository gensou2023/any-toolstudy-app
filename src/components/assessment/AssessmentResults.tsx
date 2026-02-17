'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { triggerCelebration } from '@/components/ui/Confetti';
import { skillLevelLabels } from '@/data/assessment-questions';
import type { SkillLevel } from '@/types/assessment';

interface AssessmentResultsProps {
  skillLevel: SkillLevel;
  totalScore: number;
  maxScore: number;
}

export default function AssessmentResults({
  skillLevel,
  totalScore,
  maxScore,
}: AssessmentResultsProps) {
  const router = useRouter();
  const levelInfo = skillLevelLabels[skillLevel];

  useEffect(() => {
    triggerCelebration();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-slide-up">
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">{levelInfo.emoji}</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          あなたのスキルレベル
        </h2>
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary text-xl font-bold mb-4">
          {levelInfo.label}
        </div>
        <p className="text-text-secondary max-w-md">
          {levelInfo.description}
        </p>
      </div>

      {/* Score breakdown */}
      <div className="w-full max-w-sm mb-8">
        <div className="bg-surface rounded-xl border border-border p-6">
          <div className="text-center mb-4">
            <span className="text-3xl font-bold text-primary">{totalScore}</span>
            <span className="text-text-muted text-lg"> / {maxScore}</span>
          </div>
          <div className="h-3 bg-surface-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${(totalScore / maxScore) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-text-muted">
            <span>初心者</span>
            <span>中級者</span>
            <span>上級者</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push('/dashboard')}
        className="py-3 px-8 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
      >
        ダッシュボードへ
      </button>
    </div>
  );
}
