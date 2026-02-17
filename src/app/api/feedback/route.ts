import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendSlackNotification, formatFeedbackMessage } from '@/lib/slack';
import { COOKIE_NAME } from '@/lib/constants';

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

    const { questId, questTitle, rating, comment } = await request.json();

    if (!questId || !questTitle || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: '入力が不正です' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('feedbacks')
      .insert({
        user_id: authData.userId,
        quest_id: questId,
        quest_title: questTitle,
        rating,
        comment: comment || null,
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
      formatFeedbackMessage(authData.nickname, questTitle, rating, comment)
    ).catch((err) => console.error('[Slack] Error:', err));

    return NextResponse.json({ success: true, feedback: data });
  } catch (error) {
    console.error('[Feedback] Error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
