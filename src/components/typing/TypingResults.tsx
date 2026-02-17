'use client';

import { useEffect } from 'react';
import { triggerCelebration } from '@/components/ui/Confetti';

interface TypingResultsProps {
  score: number;
  maxCombo: number;
  accuracy: number;
  wpm: number;
  mode: string;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

function getGrade(score: number): { grade: string; color: string; emoji: string } {
  if (score >= 300) return { grade: 'S', color: 'text-yellow-500', emoji: '👑' };
  if (score >= 200) return { grade: 'A', color: 'text-primary', emoji: '🌟' };
  if (score >= 120) return { grade: 'B', color: 'text-accent', emoji: '🎯' };
  if (score >= 60) return { grade: 'C', color: 'text-secondary', emoji: '👍' };
  return { grade: 'D', color: 'text-text-muted', emoji: '💪' };
}

export default function TypingResults({
  score,
  maxCombo,
  accuracy,
  wpm,
  mode,
  onPlayAgain,
  onBackToMenu,
}: TypingResultsProps) {
  const gradeInfo = getGrade(score);

  useEffect(() => {
    if (score >= 120) {
      triggerCelebration();
    }
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-slide-up">
      {/* Grade */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-2">{gradeInfo.emoji}</div>
        <div className={`text-8xl font-black ${gradeInfo.color}`}>
          {gradeInfo.grade}
        </div>
        <p className="text-text-muted text-sm mt-2">{mode} モード</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{score}</div>
          <div className="text-xs text-text-muted">スコア</div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-secondary">{maxCombo}</div>
          <div className="text-xs text-text-muted">最大コンボ</div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-accent">{accuracy.toFixed(1)}%</div>
          <div className="text-xs text-text-muted">正確率</div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-text-primary">{wpm.toFixed(1)}</div>
          <div className="text-xs text-text-muted">WPM</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onPlayAgain}
          className="py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
        >
          もう一度
        </button>
        <button
          onClick={onBackToMenu}
          className="py-3 px-6 bg-surface hover:bg-surface-hover text-text-primary font-semibold rounded-xl border border-border transition-all cursor-pointer"
        >
          メニューに戻る
        </button>
      </div>
    </div>
  );
}
