# Cursor道場 — 開発セッション作業記録

**日時**: 2026年2月16日
**開発者**: Claude Code (Claude Opus 4.6) + arumamurata
**プロジェクト**: `/Users/arumamurata/cursor-dojo`

---

## セッション概要

エニセンス社内でのCursor IDE学習用Webアプリ「Cursor道場」を、計画立案からフル実装まで1セッションで完了。最終的に68個のTypeScriptファイル、ビルドエラー0でフィニッシュ。

---

## 作業フロー

### Phase 0: 企画・計画立案

- ユーザーからの要件ヒアリングに基づき、詳細な実装計画を策定
- 技術スタック選定: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Supabase
- 5日間のカリキュラム設計 (56+クエスト、5職種ロール別)
- DB設計 (4テーブル: users, quest_completions, badges, feedbacks)
- 認証フロー設計 (共通パスワード + ニックネーム + cookie)
- 計画はplanファイルに記録 → ユーザー承認後に実装開始

### Phase 1: プロジェクト初期化

- `create-next-app` で Next.js 16 プロジェクト作成
- Supabase クライアントライブラリ (`@supabase/supabase-js`) 追加
- `js-cookie` + 型定義追加
- `.env.local` / `.env.example` 作成
- `supabase/migrations/001_initial_schema.sql` 作成 (4テーブル + RLSポリシー)

### Phase 2: 型定義・定数

- `src/types/index.ts` — 全型定義 (RoleId, User, Quest, DayCurriculum, Badge, etc.)
- `src/lib/constants.ts` — アプリ定数
- `src/lib/supabase.ts` — Supabaseクライアント

### Phase 3: 認証システム

- `src/lib/auth.ts` — Cookie操作 (base64 JSON encode/decode)
- `src/middleware.ts` — ルート保護 (未認証→/login, デモモード対応)
- `src/app/api/auth/login/route.ts` — POST ログインAPI
- `src/app/login/page.tsx` + `src/components/auth/LoginForm.tsx`

### Phase 4: UIコンポーネント (並列実行)

以下を並列エージェントで一括作成:
- `Button` — 4バリアント (primary, secondary, outline, ghost) + 3サイズ
- `Card` — 共通カードコンテナ (後にstyle prop追加)
- `Modal` — アニメーション付きモーダル
- `ProgressBar` — パーセンテージ表示付きプログレスバー
- `StarRating` — 5段階星評価 (クリック対応)
- `ExpandableSection` — 折り畳みセクション (アニメーション付き)
- `Toast` — トースト通知 (成功/エラー/警告)
- `Confetti` — Confetti演出

### Phase 5: ロール選択・進捗システム (並列実行)

- `src/data/roles.ts` — 5職種定義 (emoji, color, description)
- `src/app/select-role/page.tsx` + `src/components/auth/RoleSelector.tsx`
- `src/hooks/useAuth.ts` — 認証状態管理
- `src/hooks/useRole.ts` — ロール管理
- `src/hooks/useProgress.ts` — クエスト完了管理
- `src/hooks/useBadges.ts` — バッジ管理
- `src/lib/progress.ts` — 進捗計算ロジック (ロール別フィルタリング、Day解放判定)

### Phase 6: レイアウト・ダッシュボード (並列実行)

- `src/components/layout/AppHeader.tsx` — ヘッダー (ロールバッジ、ニックネーム)
- `src/components/layout/AppLayout.tsx` — 全体レイアウト
- `src/components/layout/Sidebar.tsx` — サイドバー (Day進捗表示)
- `src/components/layout/MobileNav.tsx` — モバイルボトムナビ
- `src/components/dashboard/WelcomeHero.tsx` — ウェルカムセクション
- `src/components/dashboard/OverallProgress.tsx` — 全体進捗
- `src/components/dashboard/DayCard.tsx` — Day別カード
- `src/components/dashboard/RecentActivity.tsx` — 最近のアクティビティ
- `src/app/dashboard/page.tsx` — ダッシュボードページ

### Phase 7: カリキュラムデータ (3並列エージェント)

56以上のクエストを3つのエージェントで並列作成:
- **7a**: `day1.ts` (6クエスト) + `day2.ts` (6クエスト)
- **7b**: `day3.ts` (28クエスト — 5ロール x 5-6クエスト)
- **7c**: `day4.ts` (15クエスト — 5ロール x 3クエスト) + `day5.ts` (6クエスト)
- `src/data/curriculum/index.ts` — 統合エクスポート

各クエストには以下を含む:
- タイトル、説明、難易度 (1-5)、所要時間
- 詳細ステップ (steps)
- チャレンジ課題 (challenge)
- ヒント (hints)
- 確認クイズ (checkQuestions)

### Phase 8: クエストページ

- `src/app/day/[dayId]/page.tsx` — Day概要ページ
- `src/app/day/[dayId]/quest/[questId]/page.tsx` — クエスト詳細ページ
- 7つのクエストコンポーネント:
  - `QuestHeader` — タイトル、難易度、所要時間
  - `QuestSteps` — ステップバイステップ手順
  - `QuestChallenge` — チャレンジ課題
  - `QuestHints` — 折り畳みヒント
  - `QuestCheckQuestions` — 確認クイズ
  - `QuestCompleteButton` — 完了ボタン
  - `QuestNavigation` — 前後クエストナビゲーション

### Phase 9: バッジ・フィードバック

- `src/data/badges.ts` — 12種バッジ定義
- `src/lib/badges.ts` — バッジ付与ロジック
- バッジコンポーネント: `BadgeCard`, `BadgeGrid`, `BadgeUnlockModal`
- `src/app/badges/page.tsx` — バッジコレクションページ
- フィードバック: `FeedbackButton`, `FeedbackModal`
- `src/app/api/feedback/route.ts` — フィードバックAPI
- `src/lib/slack.ts` — Slack Webhook通知

### Phase 10: ランキング・仕上げ

- `src/app/ranking/page.tsx` — チームランキングページ

---

## 追加機能実装

### デモモード追加

ユーザーがローカルでUI確認したいとの要望に対応。

- `NEXT_PUBLIC_DEMO_MODE=true` 環境変数でSupabase不要モードに切替
- `middleware.ts` でデモ時は認証スキップ
- 4つのフック全て (useAuth, useRole, useProgress, useBadges) にデモデータ追加
- ダッシュボード、ランキングにデモ用モックデータ追加
- デモユーザー: 「デモユーザー」/ フロントエンドエンジニア / Day1-2の一部完了済み

### Duolingo風ゲーミフィケーション

ユーザーから「Duolingoのようなエッセンスや楽しさを追加してほしい」との要望。

**新規作成 (8ファイル)**:
- `src/lib/gamification.ts` — XPシステム (難易度別: 10-100 XP)、10段階レベル (入門者→Cursorマスター)
- `src/components/gamification/XPBar.tsx` — シマー付きXP進捗バー
- `src/components/gamification/StreakCounter.tsx` — 炎アニメーション付きストリーク
- `src/components/gamification/DailyGoal.tsx` — SVG円形プログレスリング
- `src/components/gamification/XPGainPopup.tsx` — "+XX XP" フロートアニメーション
- `src/components/gamification/LevelUpModal.tsx` — レベルアップ祝福 + Confetti
- `src/components/gamification/NinjaMascot.tsx` — 5ムード忍者マスコット
- `src/components/gamification/index.ts` — バレルエクスポート

**既存ファイル更新 (10ファイル)**:
- `WelcomeHero` — マスコット、ストリーク、XP、レベルバッジ、日替わり励ましメッセージ
- `OverallProgress` — XPバー、デイリーゴールリング
- `DayCard` — XP報酬表示、staggerアニメーション、カードホバーエフェクト
- `RecentActivity` — 各アクティビティXP表示、眠り忍者の空状態
- `AppHeader` — レベルバッジ、炎カウンター
- `AppLayout` — XP計算して子コンポーネントへ渡す
- `QuestCompleteButton` — XP獲得ポップアップ + レベルアップ検出・モーダル
- `Card` — style prop追加
- `dashboard/page.tsx` — XP/レベル/ストリーク/デイリーゴール計算
- `day/[dayId]/quest/[questId]/page.tsx` — difficulty/currentXPをQuestCompleteButtonへ渡す

**CSS アニメーション (globals.css)**:
- 10以上のkeyframe: bounceIn, floatUp, pulseGlow, shimmer, fireFlicker, celebrate, sparkle, slideUp, popIn, gentleFloat, wiggle
- ユーティリティクラス: `.animate-*`, `.stagger-children`, `.xp-bar-shimmer`, `.golden-glow`, `.card-lift`
- テーマカラー追加: xp-gold, streak-orange, streak-red

---

## ビルド結果

```
✓ Compiled successfully in 3.4s
✓ Generating static pages (11/11)
TypeScript errors: 0
Total files: 68 (.ts/.tsx)
```

---

## 残タスク・今後の対応

| 項目 | 状態 | メモ |
|------|------|------|
| GitHubリポジトリ作成 | 未対応 | ユーザーが手動で設定 |
| Supabase プロジェクト作成 | 未対応 | ユーザーが手動で設定、SQLは `supabase/migrations/` に用意済み |
| Vercel デプロイ | 未対応 | ユーザーが手動で設定 |
| Slack Webhook設定 | 未対応 | `SLACK_WEBHOOK_URL` 環境変数を設定するだけ |
| 実際のストリーク計算 | 仮実装 | デモ=3、本番=0 (バックエンドでのログイン日数追跡が必要) |
| FeedbackModal統合 | 一部 | クエスト詳細ページはalert()のプレースホルダー |
| テスト | 未作成 | 必要に応じてJest/Vitest追加 |

---

## 技術的な注意点

1. **Tailwind CSS v4**: `tailwind.config.ts` ではなく `globals.css` 内の `@theme inline {}` でテーマ変数を定義
2. **Next.js 16**: `middleware.ts` に非推奨警告あり (→ proxy への移行推奨) が動作に問題なし
3. **デモモード**: `NEXT_PUBLIC_DEMO_MODE=true` でSupabase完全バイパス。本番では `false` に変更必須
4. **認証**: セキュリティはベーシック (共通パスワード + base64 cookie)。社内限定利用を前提とした設計
5. **XPシステム**: 難易度1=10XP, 2=20XP, 3=35XP, 4=50XP, 5=100XP。レベル10 (Cursorマスター) は1500XP必要
