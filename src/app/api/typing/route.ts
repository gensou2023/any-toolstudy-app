import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { COOKIE_NAME, IS_DEMO_MODE } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const authCookie = request.cookies.get(COOKIE_NAME);
    if (!authCookie?.value) {
      return NextResponse.json({ error: '未認証です' }, { status: 401 });
    }

    let authData;
    try {
      authData = JSON.parse(Buffer.from(authCookie.value, 'base64').toString());
    } catch {
      return NextResponse.json({ error: '認証情報が無効です' }, { status: 401 });
    }

    const { mode, score, maxCombo, accuracy, wpm } = await request.json();

    if (!mode || !['30s', '60s', '90s'].includes(mode)) {
      return NextResponse.json({ error: '無効なモードです' }, { status: 400 });
    }

    if (IS_DEMO_MODE) {
      return NextResponse.json({
        success: true,
        score: {
          id: `demo-${Date.now()}`,
          user_id: authData.userId,
          mode,
          score,
          max_combo: maxCombo,
          accuracy,
          wpm,
          played_at: new Date().toISOString(),
        },
      });
    }

    const { data, error } = await supabase
      .from('typing_scores')
      .insert({
        user_id: authData.userId,
        mode,
        score,
        max_combo: maxCombo,
        accuracy: Math.round(accuracy * 100) / 100,
        wpm: Math.round(wpm * 10) / 10,
      })
      .select()
      .single();

    if (error) {
      console.error('[Typing] Save error:', error);
      return NextResponse.json({ error: 'スコアの保存に失敗しました' }, { status: 500 });
    }

    return NextResponse.json({ success: true, score: data });
  } catch (error) {
    console.error('[Typing] Error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get(COOKIE_NAME);
    if (!authCookie?.value) {
      return NextResponse.json({ error: '未認証です' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || '60s';

    if (IS_DEMO_MODE) {
      return NextResponse.json({
        leaderboard: [
          { id: 'demo-1', nickname: '太郎', score: 350, max_combo: 25, accuracy: 95.5, wpm: 65.2, played_at: new Date().toISOString() },
          { id: 'demo-2', nickname: '花子', score: 280, max_combo: 18, accuracy: 92.3, wpm: 55.1, played_at: new Date().toISOString() },
          { id: 'demo-3', nickname: 'デモユーザー', score: 200, max_combo: 12, accuracy: 88.7, wpm: 42.3, played_at: new Date().toISOString() },
        ],
      });
    }

    // Get top 20 scores for the mode, with user nicknames
    const { data, error } = await supabase
      .from('typing_scores')
      .select('id, score, max_combo, accuracy, wpm, played_at, users!inner(nickname)')
      .eq('mode', mode)
      .order('score', { ascending: false })
      .limit(20);

    if (error) {
      console.error('[Typing] Leaderboard error:', error);
      return NextResponse.json({ error: 'リーダーボードの取得に失敗しました' }, { status: 500 });
    }

    const leaderboard = (data || []).map((entry: Record<string, unknown>) => {
      const user = entry.users as Record<string, unknown>;
      return {
        id: entry.id,
        nickname: user?.nickname || '匿名',
        score: entry.score,
        max_combo: entry.max_combo,
        accuracy: entry.accuracy,
        wpm: entry.wpm,
        played_at: entry.played_at,
      };
    });

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('[Typing] GET Error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
