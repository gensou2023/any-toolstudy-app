'use client';

import { useCallback } from 'react';

/**
 * Dynamically imports canvas-confetti and fires a confetti burst.
 * Safe to call on client side only. Returns a promise that resolves
 * when the confetti animation begins.
 */
export async function triggerConfetti(options?: {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
}) {
  const confettiModule = await import('canvas-confetti');
  const confetti = confettiModule.default;

  confetti({
    particleCount: options?.particleCount ?? 100,
    spread: options?.spread ?? 70,
    origin: {
      x: options?.origin?.x ?? 0.5,
      y: options?.origin?.y ?? 0.6,
    },
    colors: [
      '#6366f1', // primary
      '#f59e0b', // secondary
      '#10b981', // accent
      '#818cf8', // primary-light
      '#fbbf24', // secondary-light
      '#34d399', // accent-light
    ],
  });
}

/**
 * Fires a more elaborate celebration confetti effect with
 * multiple bursts from different angles.
 */
export async function triggerCelebration() {
  const confettiModule = await import('canvas-confetti');
  const confetti = confettiModule.default;

  const colors = ['#6366f1', '#f59e0b', '#10b981', '#818cf8', '#fbbf24', '#34d399'];

  // Fire from the left
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.65 },
    colors,
  });

  // Fire from the right
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.65 },
    colors,
  });

  // Center burst after a slight delay
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors,
    });
  }, 150);
}

/**
 * React hook that returns stable confetti trigger functions.
 * Use this inside components to fire confetti on user actions.
 *
 * @example
 * const { fireConfetti, fireCelebration } = useConfetti();
 * <button onClick={fireConfetti}>Celebrate!</button>
 */
export function useConfetti() {
  const fireConfetti = useCallback(
    (options?: {
      particleCount?: number;
      spread?: number;
      origin?: { x?: number; y?: number };
    }) => {
      triggerConfetti(options);
    },
    []
  );

  const fireCelebration = useCallback(() => {
    triggerCelebration();
  }, []);

  return { fireConfetti, fireCelebration };
}
