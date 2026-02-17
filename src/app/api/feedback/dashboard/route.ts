import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { COOKIE_NAME, IS_DEMO_MODE } from '@/lib/constants';
import { curriculum } from '@/data/curriculum';
import { calculateTotalXP, getLevelForXP } from '@/lib/gamification';
import { getOverallProgress } from '@/lib/progress';

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get(COOKIE_NAME);
    if (!authCookie?.value) {
      return NextResponse.json({ error: '未認証です' }, { status: 401 });
    }

    if (IS_DEMO_MODE) {
      return NextResponse.json({
        feedbacks: [
          {
            id: 'mock-1', user_id: 'demo-user-001', nickname: 'デモユーザー',
            quest_id: null, quest_title: null, rating: null,
            comment: 'ダッシュボードの使い勝手が良いです！', type: 'general',
            created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            user_nickname: 'デモユーザー', user_role: 'frontend-engineer',
            user_level: 3, user_xp: 100, user_progress: 35,
          },
          {
            id: 'mock-2', user_id: 'demo-user-002', nickname: '田中太郎',
            quest_id: 'day1-quest1', quest_title: 'Cursorをインストールしよう',
            rating: 5, comment: 'とても分かりやすかったです', type: 'quest',
            created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
            user_nickname: '田中太郎', user_role: 'backend-engineer',
            user_level: 5, user_xp: 280, user_progress: 60,
          },
          {
            id: 'mock-3', user_id: 'demo-user-003', nickname: '鈴木花子',
            quest_id: null, quest_title: null, rating: null,
            comment: 'もっと実践的なクエストが欲しいです', type: 'general',
            created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
            user_nickname: '鈴木花子', user_role: 'web-designer',
            user_level: 2, user_xp: 50, user_progress: 15,
          },
          {
            id: 'mock-4', user_id: 'demo-user-001', nickname: 'デモユーザー',
            quest_id: 'day2-quest1', quest_title: '良いプロンプトの書き方',
            rating: 4, comment: 'プロンプトの基礎が学べました', type: 'quest',
            created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
            user_nickname: 'デモユーザー', user_role: 'frontend-engineer',
            user_level: 3, user_xp: 100, user_progress: 35,
          },
        ],
        stats: {
          totalCount: 4,
          averageRating: 4.5,
          uniqueUsers: 3,
          thisWeekCount: 4,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 1 },
        },
      });
    }

    // Fetch feedbacks with user info via JOIN
    const { data: feedbacks, error: fbError } = await supabase
      .from('feedbacks')
      .select('*, users!inner(id, nickname, role)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (fbError) {
      console.error('[FeedbackDashboard] Supabase error:', fbError);
      return NextResponse.json({ error: 'フィードバックの取得に失敗しました' }, { status: 500 });
    }

    // Get all quest completions for the users who gave feedback
    const userIds = [...new Set((feedbacks || []).map((fb: Record<string, unknown>) => fb.user_id as string))];

    const userProgressMap: Record<string, { xp: number; level: number; progress: number }> = {};

    if (userIds.length > 0) {
      const { data: completions } = await supabase
        .from('quest_completions')
        .select('user_id, quest_id')
        .in('user_id', userIds);

      // Group completions by user
      const completionsByUser: Record<string, string[]> = {};
      for (const c of completions || []) {
        if (!completionsByUser[c.user_id]) completionsByUser[c.user_id] = [];
        completionsByUser[c.user_id].push(c.quest_id);
      }

      // Calculate XP, level, progress for each user
      for (const userId of userIds) {
        const userCompletions = completionsByUser[userId] || [];
        const xp = calculateTotalXP(userCompletions, curriculum);
        const levelInfo = getLevelForXP(xp);
        const progress = Math.round(getOverallProgress(userCompletions, curriculum, null) * 100);
        userProgressMap[userId] = { xp, level: levelInfo.level, progress };
      }
    }

    // Enrich feedbacks with user progress data
    const enrichedFeedbacks = (feedbacks || []).map((fb: Record<string, unknown>) => {
      const user = fb.users as Record<string, unknown>;
      const progressInfo = userProgressMap[fb.user_id as string] || { xp: 0, level: 1, progress: 0 };
      return {
        id: fb.id,
        user_id: fb.user_id,
        quest_id: fb.quest_id,
        quest_title: fb.quest_title,
        rating: fb.rating,
        comment: fb.comment,
        type: fb.type,
        created_at: fb.created_at,
        user_nickname: user?.nickname || '匿名',
        user_role: user?.role || null,
        user_level: progressInfo.level,
        user_xp: progressInfo.xp,
        user_progress: progressInfo.progress,
      };
    });

    // Calculate stats
    const ratedFeedbacks = enrichedFeedbacks.filter((fb: Record<string, unknown>) => fb.rating != null);
    const avgRating = ratedFeedbacks.length > 0
      ? ratedFeedbacks.reduce((sum: number, fb: Record<string, unknown>) => sum + (fb.rating as number), 0) / ratedFeedbacks.length
      : 0;

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thisWeekCount = enrichedFeedbacks.filter(
      (fb: Record<string, unknown>) => new Date(fb.created_at as string) >= oneWeekAgo
    ).length;

    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const fb of ratedFeedbacks) {
      const r = fb.rating as number;
      ratingDistribution[r] = (ratingDistribution[r] || 0) + 1;
    }

    return NextResponse.json({
      feedbacks: enrichedFeedbacks,
      stats: {
        totalCount: enrichedFeedbacks.length,
        averageRating: Math.round(avgRating * 10) / 10,
        uniqueUsers: userIds.length,
        thisWeekCount,
        ratingDistribution,
      },
    });
  } catch (error) {
    console.error('[FeedbackDashboard] Error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
