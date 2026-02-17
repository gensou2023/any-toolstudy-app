'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomWords, type TypingWord } from '@/data/typing-words';
import { getDefaultRomaji } from '@/lib/romaji-map';
import { initTypingState, processKeyPress, getDisplayRomaji, type TypingState } from './TypingInput';
import TypingTimer from './TypingTimer';
import ComboDisplay from './ComboDisplay';
import TypingResults from './TypingResults';

interface TypingGameProps {
  mode: '30s' | '60s' | '90s';
  onBackToMenu: () => void;
  onScoreSave: (data: { score: number; maxCombo: number; accuracy: number; wpm: number }) => void;
}

const MODE_SECONDS: Record<string, number> = { '30s': 30, '60s': 60, '90s': 90 };

export default function TypingGame({ mode, onBackToMenu, onScoreSave }: TypingGameProps) {
  const totalTime = MODE_SECONDS[mode];
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Word queue
  const [words, setWords] = useState<TypingWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typingState, setTypingState] = useState<TypingState | null>(null);

  // Stats
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(0);
  const [totalKeys, setTotalKeys] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize words
  useEffect(() => {
    const w = getRandomWords(50);
    setWords(w);
    if (w.length > 0) {
      setTypingState(initTypingState(w[0].reading));
    }
  }, []);

  // Start game on first keypress
  const startGame = useCallback(() => {
    if (isPlaying || isFinished) return;
    setIsPlaying(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsFinished(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isPlaying, isFinished]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Calculate multiplier
  const getMultiplier = (c: number) => Math.min(Math.floor(c / 10) + 1, 5);

  // Handle keydown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished || !typingState) return;

      // Ignore modifier keys
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      e.preventDefault();

      if (!isPlaying) startGame();

      const key = e.key.toLowerCase();
      const { result, newState } = processKeyPress(typingState, key);

      setTotalKeys(prev => prev + 1);

      if (result === 'correct') {
        setCorrectKeys(prev => prev + 1);
        setCombo(prev => {
          const newCombo = prev + 1;
          setMaxCombo(mc => Math.max(mc, newCombo));
          return newCombo;
        });
        // Score: 1 point per correct key * multiplier
        const mult = getMultiplier(combo);
        setScore(prev => prev + mult);
        setTypingState(newState);
      } else if (result === 'complete') {
        setCorrectKeys(prev => prev + 1);
        setCombo(prev => {
          const newCombo = prev + 1;
          setMaxCombo(mc => Math.max(mc, newCombo));
          return newCombo;
        });
        // Word complete bonus
        const mult = getMultiplier(combo);
        setScore(prev => prev + 10 * mult);

        // Move to next word
        const nextIndex = currentWordIndex + 1;
        if (nextIndex < words.length) {
          setCurrentWordIndex(nextIndex);
          setTypingState(initTypingState(words[nextIndex].reading));
        } else {
          // Ran out of words, generate more
          const newWords = getRandomWords(50);
          setWords(prev => [...prev, ...newWords]);
          setCurrentWordIndex(nextIndex);
          setTypingState(initTypingState(newWords[0].reading));
        }
      } else {
        // Wrong key
        setCombo(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typingState, isPlaying, isFinished, combo, currentWordIndex, words, startGame]);

  // Save score when finished
  useEffect(() => {
    if (isFinished) {
      const accuracy = totalKeys > 0 ? (correctKeys / totalKeys) * 100 : 0;
      const elapsedMinutes = totalTime / 60;
      const wpm = correctKeys / 5 / elapsedMinutes;

      onScoreSave({ score, maxCombo, accuracy, wpm });
    }
  }, [isFinished, score, maxCombo, correctKeys, totalKeys, totalTime, onScoreSave]);

  if (isFinished) {
    const accuracy = totalKeys > 0 ? (correctKeys / totalKeys) * 100 : 0;
    const elapsedMinutes = totalTime / 60;
    const wpm = correctKeys / 5 / elapsedMinutes;

    return (
      <TypingResults
        score={score}
        maxCombo={maxCombo}
        accuracy={accuracy}
        wpm={wpm}
        mode={mode}
        onPlayAgain={() => {
          // Reset everything
          const w = getRandomWords(50);
          setWords(w);
          setCurrentWordIndex(0);
          setTypingState(initTypingState(w[0].reading));
          setTimeLeft(totalTime);
          setScore(0);
          setCombo(0);
          setMaxCombo(0);
          setCorrectKeys(0);
          setTotalKeys(0);
          setIsFinished(false);
          setIsPlaying(false);
        }}
        onBackToMenu={onBackToMenu}
      />
    );
  }

  const currentWord = words[currentWordIndex];
  const displayRomaji = typingState ? getDisplayRomaji(typingState) : { typed: '', remaining: '' };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Timer & Score */}
      <div className="flex items-center justify-between w-full max-w-lg mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{score}</div>
          <div className="text-xs text-text-muted">スコア</div>
        </div>
        <TypingTimer timeLeft={timeLeft} totalTime={totalTime} />
        <ComboDisplay combo={combo} multiplier={getMultiplier(combo)} />
      </div>

      {!isPlaying && (
        <p className="text-text-muted text-sm mb-4 animate-pulse">
          タイピングを開始するとタイマーが始まります
        </p>
      )}

      {/* Current word */}
      {currentWord && (
        <div className="text-center mb-8 w-full max-w-lg">
          <div className="bg-surface rounded-2xl border border-border p-8">
            {/* Word display */}
            <div className="text-3xl font-bold text-text-primary mb-2">
              {currentWord.word}
            </div>
            <div className="text-lg text-text-muted mb-4">
              {currentWord.reading}
            </div>
            <p className="text-sm text-text-secondary mb-6">
              {currentWord.description}
            </p>

            {/* Romaji input display */}
            <div className="text-2xl font-mono tracking-wider">
              <span className="text-primary">{displayRomaji.typed}</span>
              <span className="text-text-muted">{displayRomaji.remaining}</span>
            </div>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div className="flex items-center gap-6 text-sm text-text-muted">
        <span>正確率: {totalKeys > 0 ? ((correctKeys / totalKeys) * 100).toFixed(0) : '100'}%</span>
        <span>単語: {currentWordIndex}</span>
      </div>
    </div>
  );
}
