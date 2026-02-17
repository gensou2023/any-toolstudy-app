'use client';

import { useEffect, useState } from 'react';

interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  max_combo: number;
  accuracy: number;
  wpm: number;
  played_at: string;
}

interface TypingLeaderboardProps {
  mode: string;
}

export default function TypingLeaderboard({ mode }: TypingLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`/api/typing?mode=${mode}`);
        if (res.ok) {
          const data = await res.json();
          setEntries(data.leaderboard || []);
        }
      } catch {
        // Silently fail
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, [mode]);

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-surface rounded-lg border border-border animate-pulse" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        <div className="text-3xl mb-2">🏆</div>
        <p className="text-sm">まだスコアがありません</p>
        <p className="text-xs">最初のプレイヤーになろう！</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, idx) => (
        <div
          key={entry.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
            idx < 3
              ? 'bg-primary/5 border-primary/20'
              : 'bg-surface border-border'
          }`}
        >
          <span className={`text-lg font-bold w-8 text-center ${
            idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-orange-600' : 'text-text-muted'
          }`}>
            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`}
          </span>
          <div className="flex-1 min-w-0">
            <span className="font-medium text-text-primary text-sm">{entry.nickname}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span>{entry.max_combo}combo</span>
            <span>{Number(entry.accuracy).toFixed(0)}%</span>
          </div>
          <span className="font-bold text-primary text-lg">{entry.score}</span>
        </div>
      ))}
    </div>
  );
}
