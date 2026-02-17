'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTypingScores } from '@/hooks/useTypingScores';
import AppLayout from '@/components/layout/AppLayout';
import TypingGame from '@/components/typing/TypingGame';
import TypingLeaderboard from '@/components/typing/TypingLeaderboard';

type GameMode = '30s' | '60s' | '90s';
type GameState = 'menu' | 'playing';

export default function TypingPage() {
  const { loading: authLoading } = useAuth();
  const { saveScore } = useTypingScores();
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedMode, setSelectedMode] = useState<GameMode>('60s');
  const [leaderboardMode, setLeaderboardMode] = useState<GameMode>('60s');

  const handleScoreSave = useCallback((data: { score: number; maxCombo: number; accuracy: number; wpm: number }) => {
    saveScore({ mode: selectedMode, ...data });
  }, [selectedMode, saveScore]);

  if (authLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </AppLayout>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-background p-4">
        <TypingGame
          mode={selectedMode}
          onBackToMenu={() => setGameState('menu')}
          onScoreSave={handleScoreSave}
        />
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-3">⌨️</div>
          <h1 className="text-3xl font-bold text-text-primary">
            福岡タイプ道場
          </h1>
          <p className="text-text-secondary mt-2">
            福岡の名産品＋IT用語でタイピングスキルを鍛えよう！
          </p>
        </div>

        {/* Mode selection */}
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-text-primary mb-3 text-center">
            モードを選択
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {(['30s', '60s', '90s'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`py-4 px-4 rounded-xl border-2 font-bold text-lg transition-all cursor-pointer ${
                  selectedMode === mode
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-surface text-text-secondary hover:border-primary/30'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setGameState('playing')}
            className="w-full mt-6 py-4 px-6 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            スタート！
          </button>
        </div>

        {/* Leaderboard */}
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-text-primary mb-3">
            🏆 リーダーボード
          </h2>
          <div className="flex gap-1 mb-4">
            {(['30s', '60s', '90s'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setLeaderboardMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  leaderboardMode === mode
                    ? 'bg-primary text-white'
                    : 'bg-surface-hover text-text-secondary hover:text-text-primary'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <TypingLeaderboard mode={leaderboardMode} />
        </div>
      </div>
    </AppLayout>
  );
}
