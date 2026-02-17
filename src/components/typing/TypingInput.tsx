'use client';

import { kanaToRomajiSegments, type RomajiSegment } from '@/lib/romaji-map';

export interface TypingState {
  segments: RomajiSegment[];
  currentSegmentIndex: number;
  currentCharIndex: number;
  chosenRomaji: (string | null)[]; // which romaji option was chosen for each segment
}

/**
 * Initialize a typing state for a given reading.
 */
export function initTypingState(reading: string): TypingState {
  const segments = kanaToRomajiSegments(reading);
  return {
    segments,
    currentSegmentIndex: 0,
    currentCharIndex: 0,
    chosenRomaji: segments.map(() => null),
  };
}

/**
 * Process a key press. Returns:
 * - 'correct': key matches
 * - 'wrong': key doesn't match any option
 * - 'complete': word is complete
 */
export function processKeyPress(
  state: TypingState,
  key: string
): { result: 'correct' | 'wrong' | 'complete'; newState: TypingState } {
  const { segments, currentSegmentIndex, currentCharIndex, chosenRomaji } = state;

  if (currentSegmentIndex >= segments.length) {
    return { result: 'complete', newState: state };
  }

  const segment = segments[currentSegmentIndex];
  const chosen = chosenRomaji[currentSegmentIndex];

  if (chosen) {
    // Already locked into a specific romaji option
    if (key === chosen[currentCharIndex]) {
      const nextCharIndex = currentCharIndex + 1;
      if (nextCharIndex >= chosen.length) {
        // Segment complete
        const nextSegIndex = currentSegmentIndex + 1;
        if (nextSegIndex >= segments.length) {
          return { result: 'complete', newState: { ...state, currentSegmentIndex: nextSegIndex, currentCharIndex: 0 } };
        }
        return {
          result: 'correct',
          newState: { ...state, currentSegmentIndex: nextSegIndex, currentCharIndex: 0 },
        };
      }
      return {
        result: 'correct',
        newState: { ...state, currentCharIndex: nextCharIndex },
      };
    }
    return { result: 'wrong', newState: state };
  }

  // Not locked in yet - check all options
  const matchingOptions = segment.romajiOptions.filter(opt => opt[currentCharIndex] === key);

  if (matchingOptions.length === 0) {
    return { result: 'wrong', newState: state };
  }

  // If only one option matches, or we've narrowed down, lock in
  const newChosenRomaji = [...chosenRomaji];
  if (matchingOptions.length === 1) {
    newChosenRomaji[currentSegmentIndex] = matchingOptions[0];
  } else {
    // Multiple matches - pick the first one that still matches
    newChosenRomaji[currentSegmentIndex] = matchingOptions[0];
  }

  const nextCharIndex = currentCharIndex + 1;
  const chosenOpt = newChosenRomaji[currentSegmentIndex]!;

  if (nextCharIndex >= chosenOpt.length) {
    // Segment complete
    const nextSegIndex = currentSegmentIndex + 1;
    if (nextSegIndex >= segments.length) {
      return {
        result: 'complete',
        newState: { ...state, chosenRomaji: newChosenRomaji, currentSegmentIndex: nextSegIndex, currentCharIndex: 0 },
      };
    }
    return {
      result: 'correct',
      newState: { ...state, chosenRomaji: newChosenRomaji, currentSegmentIndex: nextSegIndex, currentCharIndex: 0 },
    };
  }

  return {
    result: 'correct',
    newState: { ...state, chosenRomaji: newChosenRomaji, currentCharIndex: nextCharIndex },
  };
}

/**
 * Get the display romaji for the current state.
 * Returns { typed: string, remaining: string }.
 */
export function getDisplayRomaji(state: TypingState): { typed: string; remaining: string } {
  let typed = '';
  let remaining = '';

  for (let i = 0; i < state.segments.length; i++) {
    const seg = state.segments[i];
    const chosen = state.chosenRomaji[i] || seg.romajiOptions[0];

    if (i < state.currentSegmentIndex) {
      typed += chosen;
    } else if (i === state.currentSegmentIndex) {
      typed += chosen.substring(0, state.currentCharIndex);
      remaining += chosen.substring(state.currentCharIndex);
    } else {
      remaining += seg.romajiOptions[0];
    }
  }

  return { typed, remaining };
}
