import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { COOKIE_NAME, IS_DEMO_MODE } from '@/lib/constants';
import { assessmentQuestions, calculateSkillLevel } from '@/data/assessment-questions';
import { getUnlockedDaysForSkill } from '@/data/skill-unlock-map';

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

    const { answers } = await request.json();

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: '回答データが不正です' }, { status: 400 });
    }

    // Calculate total score
    let totalScore = 0;
    for (const question of assessmentQuestions) {
      const answerIndex = answers[question.id];
      if (typeof answerIndex === 'number' && question.options[answerIndex]) {
        totalScore += question.options[answerIndex].score;
      }
    }

    const skillLevel = calculateSkillLevel(totalScore);

    if (IS_DEMO_MODE) {
      return NextResponse.json({
        success: true,
        result: {
          id: `demo-${Date.now()}`,
          user_id: authData.userId,
          answers,
          skill_level: skillLevel,
          total_score: totalScore,
          completed_at: new Date().toISOString(),
        },
      });
    }

    // Save assessment result
    const { data, error } = await supabase
      .from('assessment_results')
      .upsert({
        user_id: authData.userId,
        answers,
        skill_level: skillLevel,
        total_score: totalScore,
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      console.error('[Assessment] Save error:', error);
      return NextResponse.json({ error: 'アセスメントの保存に失敗しました' }, { status: 500 });
    }

    // Update user's skill_level
    await supabase
      .from('users')
      .update({ skill_level: skillLevel })
      .eq('id', authData.userId);

    // Get user's role for unlock calculation
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', authData.userId)
      .single();

    const role = userData?.role || null;

    // Insert day unlock overrides based on skill level
    const unlockedDays = getUnlockedDaysForSkill(skillLevel, role);
    if (unlockedDays.length > 0) {
      const overrides = unlockedDays.map(dayId => ({
        user_id: authData.userId,
        day_id: dayId,
        reason: 'assessment',
      }));

      await supabase
        .from('day_unlock_overrides')
        .upsert(overrides, { onConflict: 'user_id,day_id' });
    }

    return NextResponse.json({ success: true, result: data });
  } catch (error) {
    console.error('[Assessment] Error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
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

    if (IS_DEMO_MODE) {
      return NextResponse.json({ result: null });
    }

    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', authData.userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('[Assessment] GET error:', error);
      return NextResponse.json({ error: 'アセスメントの取得に失敗しました' }, { status: 500 });
    }

    return NextResponse.json({ result: data || null });
  } catch (error) {
    console.error('[Assessment] GET Error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
