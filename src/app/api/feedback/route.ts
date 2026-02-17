import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendSlackNotification, formatFeedbackMessage } from '@/lib/slack';
import { saveToNotion } from '@/lib/notion';
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

    const { questId, questTitle, rating, comment, type = 'general' } = await request.json();

    // For quest feedback, questId and questTitle are required
    if (type === 'quest' && (!questId || !questTitle)) {
      return NextResponse.json(
        { error: 'クエストフィードバックにはquestIdとquestTitleが必要です' },
        { status: 400 }
      );
    }

    // Comment is required for general feedback; rating is required for quest feedback
    if (type === 'general' && !comment) {
      return NextResponse.json(
        { error: 'コメントを入力してください' },
        { status: 400 }
      );
    }

    if (type === 'quest' && (!rating || rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: '評価が不正です' },
        { status: 400 }
      );
    }

    // Demo mode: return mock success without writing to Supabase
    if (IS_DEMO_MODE) {
      return NextResponse.json({
        success: true,
        feedback: {
          id: `demo-${Date.now()}`,
          user_id: authData.userId,
          nickname: authData.nickname,
          quest_id: questId || null,
          quest_title: questTitle || null,
          rating: rating || null,
          comment: comment || null,
          type,
          created_at: new Date().toISOString(),
        },
      });
    }

    const { data, error } = await supabase
      .from('feedbacks')
      .insert({
        user_id: authData.userId,
        quest_id: questId || null,
        quest_title: questTitle || null,
        rating: rating || null,
        comment: comment || null,
        type,
      })
      .select()
      .single();

    if (error) {
      console.error('[Feedback] Supabase error:', error);
      return NextResponse.json(
        { error: 'フィードバックの保存に失敗しました' },
        { status: 500 }
      );
    }

    // Send Slack notification (non-blocking)
    sendSlackNotification(
      formatFeedbackMessage(authData.nickname, questTitle || null, rating || null, comment, type)
    ).catch((err) => console.error('[Slack] Error:', err));

    // Save to Notion (non-blocking)
    saveToNotion({
      nickname: authData.nickname,
      type,
      questTitle: questTitle || null,
      rating: rating || null,
      comment: comment || null,
    }).catch((err) => console.error('[Notion] Error:', err));

    return NextResponse.json({ success: true, feedback: data });
  } catch (error) {
    console.error('[Feedback] Error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get(COOKIE_NAME);
    if (!authCookie?.value) {
      return NextResponse.json({ error: '未認証です' }, { status: 401 });
    }

    // Demo mode returns mock data
    if (IS_DEMO_MODE) {
      const mockFeedbacks = [
        {
          id: 'mock-1',
          user_id: 'demo-user-001',
          nickname: 'デモユーザー',
          quest_id: null,
          quest_title: null,
          rating: null,
          comment: 'ダッシュボードの使い勝手が良いです！',
          type: 'general',
          created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        },
        {
          id: 'mock-2',
          user_id: 'demo-user-002',
          nickname: '田中太郎',
          quest_id: 'day1-quest1',
          quest_title: 'Cursorをインストールしよう',
          rating: 5,
          comment: 'とても分かりやすかったです',
          type: 'quest',
          created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        },
        {
          id: 'mock-3',
          user_id: 'demo-user-003',
          nickname: '鈴木花子',
          quest_id: null,
          quest_title: null,
          rating: null,
          comment: 'もっと実践的なクエストが欲しいです',
          type: 'general',
          created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        },
        {
          id: 'mock-4',
          user_id: 'demo-user-001',
          nickname: 'デモユーザー',
          quest_id: 'day2-quest1',
          quest_title: '良いプロンプトの書き方',
          rating: 4,
          comment: 'プロンプトの基礎が学べました',
          type: 'quest',
          created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        },
      ];
      return NextResponse.json({ feedbacks: mockFeedbacks });
    }

    // Fetch all feedbacks (from all users) ordered by most recent
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('[Feedback] Supabase GET error:', error);
      return NextResponse.json(
        { error: 'フィードバックの取得に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({ feedbacks: data || [] });
  } catch (error) {
    console.error('[Feedback] GET Error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
