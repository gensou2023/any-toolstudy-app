import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { curriculum } from '@/data/curriculum';
import {
  toDateString,
  toWeekString,
  getPastDays,
  getPastWeeks,
  buildDailyActiveMap,
  buildWeeklyActiveMap,
  wpmBucket,
  progressBucket,
} from '@/lib/analytics-helpers';
import type { AnalyticsResponse } from '@/types/analytics';

const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

function generateDemoData(): AnalyticsResponse {
  const past30 = getPastDays(30);
  const past12w = getPastWeeks(12);

  return {
    summary: {
      totalUsers: 42,
      activeUsersToday: 12,
      activeUsersThisWeek: 28,
      totalCompletions: 186,
      totalTypingPlays: 324,
      averageRating: 4.2,
    },
    usage: {
      dailyActiveUsers: past30.map((date, i) => ({
        date,
        count: Math.floor(5 + Math.random() * 15 + Math.sin(i / 3) * 5),
      })),
      weeklyActiveUsers: past12w.map((week) => ({
        week,
        count: Math.floor(15 + Math.random() * 20),
      })),
      userGrowth: past30.map((date, i) => ({
        date,
        cumulative: 10 + i + Math.floor(Math.random() * 3),
      })),
      roleDistribution: [
        { role: 'フロントエンド', count: 12 },
        { role: 'バックエンド', count: 8 },
        { role: 'デザイナー', count: 6 },
        { role: 'ディレクター', count: 5 },
        { role: '非エンジニア', count: 4 },
        { role: 'インターン', count: 7 },
      ],
    },
    learningProgress: {
      dayCompletionRates: curriculum.slice(0, 5).map((day) => ({
        dayId: day.dayId,
        title: day.title,
        emoji: day.emoji,
        completionRate: Math.random() * 0.8 + 0.1,
        startedCount: Math.floor(20 + Math.random() * 20),
        completedCount: Math.floor(5 + Math.random() * 15),
      })),
      averageProgress: 0.38,
      progressDistribution: [
        { bucket: '0%', count: 5 },
        { bucket: '1-25%', count: 8 },
        { bucket: '26-50%', count: 12 },
        { bucket: '51-75%', count: 9 },
        { bucket: '76-99%', count: 5 },
        { bucket: '100%', count: 3 },
      ],
    },
    typingStats: {
      totalPlays: 324,
      playsByMode: [
        { mode: '30s', count: 145 },
        { mode: '60s', count: 120 },
        { mode: '90s', count: 59 },
      ],
      averageByMode: [
        { mode: '30s', avgScore: 1250, avgWPM: 85, avgAccuracy: 92 },
        { mode: '60s', avgScore: 2100, avgWPM: 78, avgAccuracy: 89 },
        { mode: '90s', avgScore: 2800, avgWPM: 72, avgAccuracy: 87 },
      ],
      wpmDistribution: [
        { range: '0-49', count: 15 },
        { range: '50-99', count: 120 },
        { range: '100-149', count: 95 },
        { range: '150-199', count: 60 },
        { range: '200-249', count: 25 },
        { range: '250+', count: 9 },
      ],
      dailyPlays: past30.map((date) => ({
        date,
        count: Math.floor(3 + Math.random() * 15),
      })),
    },
    feedbackTrends: {
      ratingDistribution: { 1: 2, 2: 5, 3: 12, 4: 25, 5: 18 },
      weeklyVolume: past12w.map((week) => ({
        week,
        questCount: Math.floor(3 + Math.random() * 8),
        generalCount: Math.floor(1 + Math.random() * 4),
      })),
      averageRatingTrend: past12w.map((week) => ({
        week,
        avgRating: 3.5 + Math.random() * 1.2,
      })),
      questSatisfaction: [
        { questTitle: 'Cursorをインストールしよう', avgRating: 4.5, count: 15 },
        { questTitle: 'AIと会話してみよう', avgRating: 4.3, count: 12 },
        { questTitle: 'コード生成に挑戦', avgRating: 3.8, count: 10 },
        { questTitle: 'チーム開発シミュレーション', avgRating: 4.1, count: 8 },
        { questTitle: '総合演習', avgRating: 4.6, count: 6 },
      ],
    },
  };
}

const ROLE_LABELS: Record<string, string> = {
  'frontend-engineer': 'フロントエンド',
  'backend-engineer': 'バックエンド',
  'web-designer': 'デザイナー',
  'director': 'ディレクター',
  'non-engineer': '非エンジニア',
  'student-intern': 'インターン',
};

export async function GET() {
  if (IS_DEMO_MODE) {
    return NextResponse.json(generateDemoData());
  }

  try {
    const [usersRes, completionsRes, typingRes, feedbacksRes, assessmentRes] = await Promise.all([
      supabase.from('users').select('id, role, created_at, last_active_at'),
      supabase.from('quest_completions').select('user_id, quest_id, completed_at'),
      supabase.from('typing_scores').select('user_id, mode, score, wpm, accuracy, played_at'),
      supabase.from('feedbacks').select('user_id, quest_id, quest_title, rating, type, created_at'),
      supabase.from('assessment_results').select('user_id, skill_level, total_score'),
    ]);

    const users = usersRes.data ?? [];
    const completions = completionsRes.data ?? [];
    const typingScores = typingRes.data ?? [];
    const feedbacks = feedbacksRes.data ?? [];
    const _assessments = assessmentRes.data ?? [];

    // --- Build activity maps for DAU/WAU ---
    const allActivities: { userId: string; timestamp: string }[] = [];
    for (const c of completions) {
      if (c.completed_at) allActivities.push({ userId: c.user_id, timestamp: c.completed_at });
    }
    for (const t of typingScores) {
      if (t.played_at) allActivities.push({ userId: t.user_id, timestamp: t.played_at });
    }
    for (const f of feedbacks) {
      if (f.created_at) allActivities.push({ userId: f.user_id, timestamp: f.created_at });
    }

    const dailyMap = buildDailyActiveMap(allActivities);
    const weeklyMap = buildWeeklyActiveMap(dailyMap);

    const todayStr = toDateString(new Date());
    const thisWeekStr = toWeekString(new Date());

    // --- Summary ---
    const ratingsWithValue = feedbacks.filter((f) => f.rating != null);
    const avgRating =
      ratingsWithValue.length > 0
        ? ratingsWithValue.reduce((s, f) => s + f.rating, 0) / ratingsWithValue.length
        : 0;

    const summary = {
      totalUsers: users.length,
      activeUsersToday: dailyMap.get(todayStr)?.size ?? 0,
      activeUsersThisWeek: weeklyMap.get(thisWeekStr)?.size ?? 0,
      totalCompletions: completions.length,
      totalTypingPlays: typingScores.length,
      averageRating: Math.round(avgRating * 10) / 10,
    };

    // --- Usage ---
    const past30 = getPastDays(30);
    const past12w = getPastWeeks(12);

    const dailyActiveUsers = past30.map((date) => ({
      date,
      count: dailyMap.get(date)?.size ?? 0,
    }));

    const weeklyActiveUsers = past12w.map((week) => ({
      week,
      count: weeklyMap.get(week)?.size ?? 0,
    }));

    // User growth (cumulative registrations)
    const sortedUsers = [...users].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    const growthMap = new Map<string, number>();
    let cumulative = 0;
    for (const u of sortedUsers) {
      const d = toDateString(new Date(u.created_at));
      cumulative++;
      growthMap.set(d, cumulative);
    }
    let lastCum = 0;
    const userGrowth = past30.map((date) => {
      if (growthMap.has(date)) lastCum = growthMap.get(date)!;
      else if (lastCum === 0) {
        // Find the cumulative count just before this date
        for (const [d, c] of growthMap) {
          if (d <= date) lastCum = c;
        }
      }
      return { date, cumulative: lastCum };
    });

    // Role distribution
    const roleCounts = new Map<string, number>();
    for (const u of users) {
      const label = ROLE_LABELS[u.role] ?? '未設定';
      roleCounts.set(label, (roleCounts.get(label) ?? 0) + 1);
    }
    const roleDistribution = Array.from(roleCounts, ([role, count]) => ({ role, count }));

    // --- Learning Progress ---
    // Per-user quest completion count
    const userQuestSets = new Map<string, Set<string>>();
    for (const c of completions) {
      if (!userQuestSets.has(c.user_id)) userQuestSets.set(c.user_id, new Set());
      userQuestSets.get(c.user_id)!.add(c.quest_id);
    }

    // Day completion rates
    const allQuestIds = curriculum.flatMap((d) => d.quests.map((q) => q.id));
    const totalQuestsCount = allQuestIds.length;

    const dayCompletionRates = curriculum.map((day) => {
      const dayQuestIds = day.quests.map((q) => q.id);
      const usersStarted = new Set<string>();
      const usersCompleted = new Set<string>();

      for (const [uid, questSet] of userQuestSets) {
        const completedInDay = dayQuestIds.filter((qid) => questSet.has(qid)).length;
        if (completedInDay > 0) usersStarted.add(uid);
        if (completedInDay === dayQuestIds.length) usersCompleted.add(uid);
      }

      return {
        dayId: day.dayId,
        title: day.title,
        emoji: day.emoji,
        completionRate: usersStarted.size > 0 ? usersCompleted.size / usersStarted.size : 0,
        startedCount: usersStarted.size,
        completedCount: usersCompleted.size,
      };
    });

    // Average progress & distribution
    const progressValues: number[] = [];
    for (const [, questSet] of userQuestSets) {
      const pct = totalQuestsCount > 0 ? questSet.size / totalQuestsCount : 0;
      progressValues.push(pct);
    }
    // Include users with 0 completions
    const usersWithNoCompletions = users.length - userQuestSets.size;
    for (let i = 0; i < usersWithNoCompletions; i++) {
      progressValues.push(0);
    }

    const averageProgress =
      progressValues.length > 0
        ? progressValues.reduce((s, v) => s + v, 0) / progressValues.length
        : 0;

    const bucketCounts = new Map<string, number>();
    for (const pct of progressValues) {
      const b = progressBucket(Math.round(pct * 100));
      bucketCounts.set(b, (bucketCounts.get(b) ?? 0) + 1);
    }
    const bucketOrder = ['0%', '1-25%', '26-50%', '51-75%', '76-99%', '100%'];
    const progressDistribution = bucketOrder.map((bucket) => ({
      bucket,
      count: bucketCounts.get(bucket) ?? 0,
    }));

    // --- Typing Stats ---
    const playsByModeMap = new Map<string, number>();
    const modeScores = new Map<string, { totalScore: number; totalWPM: number; totalAcc: number; count: number }>();

    for (const t of typingScores) {
      playsByModeMap.set(t.mode, (playsByModeMap.get(t.mode) ?? 0) + 1);
      if (!modeScores.has(t.mode)) {
        modeScores.set(t.mode, { totalScore: 0, totalWPM: 0, totalAcc: 0, count: 0 });
      }
      const m = modeScores.get(t.mode)!;
      m.totalScore += t.score ?? 0;
      m.totalWPM += t.wpm ?? 0;
      m.totalAcc += t.accuracy ?? 0;
      m.count++;
    }

    const playsByMode = Array.from(playsByModeMap, ([mode, count]) => ({ mode, count }));
    const averageByMode = Array.from(modeScores, ([mode, s]) => ({
      mode,
      avgScore: Math.round(s.totalScore / s.count),
      avgWPM: Math.round(s.totalWPM / s.count),
      avgAccuracy: Math.round(s.totalAcc / s.count),
    }));

    // WPM distribution
    const wpmCounts = new Map<string, number>();
    for (const t of typingScores) {
      if (t.wpm != null) {
        const b = wpmBucket(t.wpm);
        wpmCounts.set(b, (wpmCounts.get(b) ?? 0) + 1);
      }
    }
    const wpmOrder = ['0-49', '50-99', '100-149', '150-199', '200-249', '250+'];
    const wpmDistribution = wpmOrder.map((range) => ({
      range,
      count: wpmCounts.get(range) ?? 0,
    }));

    // Daily plays
    const dailyPlayMap = new Map<string, number>();
    for (const t of typingScores) {
      if (t.played_at) {
        const d = toDateString(new Date(t.played_at));
        dailyPlayMap.set(d, (dailyPlayMap.get(d) ?? 0) + 1);
      }
    }
    const dailyPlays = past30.map((date) => ({
      date,
      count: dailyPlayMap.get(date) ?? 0,
    }));

    // --- Feedback Trends ---
    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const f of feedbacks) {
      if (f.rating != null && f.rating >= 1 && f.rating <= 5) {
        ratingDistribution[f.rating]++;
      }
    }

    // Weekly volume
    const weeklyFBMap = new Map<string, { quest: number; general: number }>();
    for (const f of feedbacks) {
      if (f.created_at) {
        const w = toWeekString(new Date(f.created_at));
        if (!weeklyFBMap.has(w)) weeklyFBMap.set(w, { quest: 0, general: 0 });
        const entry = weeklyFBMap.get(w)!;
        if (f.type === 'quest') entry.quest++;
        else entry.general++;
      }
    }
    const weeklyVolume = past12w.map((week) => ({
      week,
      questCount: weeklyFBMap.get(week)?.quest ?? 0,
      generalCount: weeklyFBMap.get(week)?.general ?? 0,
    }));

    // Average rating trend
    const weeklyRatings = new Map<string, { total: number; count: number }>();
    for (const f of feedbacks) {
      if (f.rating != null && f.created_at) {
        const w = toWeekString(new Date(f.created_at));
        if (!weeklyRatings.has(w)) weeklyRatings.set(w, { total: 0, count: 0 });
        const entry = weeklyRatings.get(w)!;
        entry.total += f.rating;
        entry.count++;
      }
    }
    const averageRatingTrend = past12w.map((week) => {
      const entry = weeklyRatings.get(week);
      return {
        week,
        avgRating: entry ? Math.round((entry.total / entry.count) * 10) / 10 : 0,
      };
    });

    // Quest satisfaction
    const questRatings = new Map<string, { total: number; count: number }>();
    for (const f of feedbacks) {
      if (f.rating != null && f.quest_title) {
        if (!questRatings.has(f.quest_title)) questRatings.set(f.quest_title, { total: 0, count: 0 });
        const entry = questRatings.get(f.quest_title)!;
        entry.total += f.rating;
        entry.count++;
      }
    }
    const questSatisfaction = Array.from(questRatings, ([questTitle, entry]) => ({
      questTitle,
      avgRating: Math.round((entry.total / entry.count) * 10) / 10,
      count: entry.count,
    }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const response: AnalyticsResponse = {
      summary,
      usage: { dailyActiveUsers, weeklyActiveUsers, userGrowth, roleDistribution },
      learningProgress: { dayCompletionRates, averageProgress, progressDistribution },
      typingStats: { totalPlays: typingScores.length, playsByMode, averageByMode, wpmDistribution, dailyPlays },
      feedbackTrends: { ratingDistribution, weeklyVolume, averageRatingTrend, questSatisfaction },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Analytics] Error:', error);
    return NextResponse.json({ error: 'アナリティクスデータの取得に失敗しました' }, { status: 500 });
  }
}
