'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAuthFromCookies } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { IS_DEMO_MODE } from '@/lib/constants';

// Demo mode: some quests pre-completed to show progress UI
const DEMO_COMPLETIONS = [
  'day1-quest1',
  'day1-quest2',
  'day1-quest3',
  'day1-quest4',
  'day2-quest1',
  'day2-quest2',
];

export function useProgress() {
  const [completions, setCompletions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      setCompletions(DEMO_COMPLETIONS);
      setLoading(false);
      return;
    }

    const fetchCompletions = async () => {
      const auth = getAuthFromCookies();
      if (!auth) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('quest_completions')
        .select('quest_id')
        .eq('user_id', auth.userId);

      if (!error && data) {
        setCompletions(data.map((row) => row.quest_id));
      }

      setLoading(false);
    };

    fetchCompletions();
  }, []);

  const completeQuest = async (questId: string) => {
    if (completions.includes(questId)) return;

    if (IS_DEMO_MODE) {
      setCompletions((prev) => [...prev, questId]);
      return;
    }

    const auth = getAuthFromCookies();
    if (!auth) return;

    const { error } = await supabase
      .from('quest_completions')
      .insert({
        user_id: auth.userId,
        quest_id: questId,
      });

    if (!error) {
      setCompletions((prev) => [...prev, questId]);
    }
  };

  const isQuestCompleted = useCallback(
    (questId: string) => {
      return completions.includes(questId);
    },
    [completions]
  );

  const getDayProgress = useCallback(
    (dayId: number, totalQuests: number) => {
      if (totalQuests === 0) return 0;

      const dayPrefix = `day${dayId}-`;
      const completedCount = completions.filter((id) =>
        id.startsWith(dayPrefix)
      ).length;

      return completedCount / totalQuests;
    },
    [completions]
  );

  return { completions, loading, completeQuest, isQuestCompleted, getDayProgress };
}
