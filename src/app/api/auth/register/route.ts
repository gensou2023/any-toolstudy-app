import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { COOKIE_NAME } from '@/lib/constants';
import type { AuthCookie } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { email, password, nickname } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードを入力してください' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'パスワードは6文字以上で入力してください' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedNickname = (nickname || '').trim();

    // Check if email already exists in users table
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', trimmedEmail)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 409 }
      );
    }

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
    });

    if (authError) {
      console.error('[Register] Auth error:', authError);
      return NextResponse.json(
        { error: authError.message || '登録に失敗しました' },
        { status: 400 }
      );
    }

    // Create user record in our users table
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        nickname: trimmedNickname || trimmedEmail.split('@')[0],
        email: trimmedEmail,
        auth_id: authData.user?.id || null,
        role: null,
        last_active_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      console.error('[Register] User create error:', createError);
      return NextResponse.json(
        { error: 'ユーザーの作成に失敗しました' },
        { status: 500 }
      );
    }

    // Set auth cookie
    const cookieData: AuthCookie = {
      userId: newUser.id,
      nickname: newUser.nickname,
    };
    const encodedCookie = Buffer.from(JSON.stringify(cookieData)).toString('base64');

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        nickname: newUser.nickname,
        role: newUser.role,
        needsProfile: true,
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
    console.error('[Register] Error:', error);
    return NextResponse.json(
      { error: '登録に失敗しました' },
      { status: 500 }
    );
  }
}
