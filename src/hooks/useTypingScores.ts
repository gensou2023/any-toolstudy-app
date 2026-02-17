'use client';

import { useCallback } from 'react';

export function useTypingScores() {
  const saveScore = useCallback(async (data: {
    mode: string;
    score: number;
    maxCombo: number;
    accuracy: number;
    wpm: number;
  }) => {
    try {
      await fetch('/api/typing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // Silently fail
    }
  }, []);

  return { saveScore };
}
