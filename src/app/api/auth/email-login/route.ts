import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { COOKIE_NAME } from '@/lib/constants';
import type { AuthCookie } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードを入力してください' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Sign in with Supabase Auth
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: 'メールアドレスまたはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // Find user by email in our users table
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', trimmedEmail)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 }
      );
    }

    // Update last_active_at
    await supabase
      .from('users')
      .update({ last_active_at: new Date().toISOString() })
      .eq('id', user.id);

    // Set auth cookie
    const cookieData: AuthCookie = {
      userId: user.id,
      nickname: user.nickname,
    };
    const encodedCookie = Buffer.from(JSON.stringify(cookieData)).toString('base64');

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        nickname: user.nickname,
        role: user.role,
      },
    });

    response.cookies.set(COOKIE_NAME, encodedCookie, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[EmailLogin] Error:', error);
    return NextResponse.json(
      { error: 'ログインに失敗しました' },
      { status: 500 }
    );
  }
}
