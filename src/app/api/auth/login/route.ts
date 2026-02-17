import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { COOKIE_NAME } from '@/lib/constants';
import type { AuthCookie } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { password, nickname } = await request.json();

    // Validate inputs
    if (!password || !nickname) {
      return NextResponse.json(
        { error: 'パスワードとニックネームを入力してください' },
        { status: 400 }
      );
    }

    // Validate password
    const authPassword = process.env.AUTH_PASSWORD || 'cursor-dojo-2024';
    if (password !== authPassword) {
      return NextResponse.json(
        { error: 'パスワードが正しくありません' },
        { status: 401 }
      );
    }

    // Trim nickname
    const trimmedNickname = nickname.trim();
    if (trimmedNickname.length < 1 || trimmedNickname.length > 20) {
      return NextResponse.json(
        { error: 'ニックネームは1〜20文字で入力してください' },
        { status: 400 }
      );
    }

    // Try to find existing user by nickname
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('nickname', trimmedNickname)
      .single();

    let user;

    if (existingUser) {
      // Update last_active_at
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({ last_active_at: new Date().toISOString() })
        .eq('id', existingUser.id)
        .select()
        .single();

      if (updateError) {
        user = existingUser;
      } else {
        user = updatedUser;
      }
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          nickname: trimmedNickname,
          role: null,
          last_active_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating user:', createError);
        return NextResponse.json(
          { error: 'ユーザーの作成に失敗しました' },
          { status: 500 }
        );
      }

      user = newUser;
    }

    // Create auth cookie data
    const authData: AuthCookie = {
      userId: user.id,
      nickname: user.nickname,
    };

    const encodedCookie = Buffer.from(JSON.stringify(authData)).toString('base64');

    // Build response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        nickname: user.nickname,
        role: user.role,
      },
    });

    // Set cookie
    response.cookies.set(COOKIE_NAME, encodedCookie, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'ログインに失敗しました' },
      { status: 500 }
    );
  }
}
