# Cursor道場

エニセンス社内向け Cursor IDE 学習アプリ。全職種が「Cursorを全く知らない状態」から「日常業務で使えるレベル」まで5日間で学べるWebアプリケーション。

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js 16 (App Router, TypeScript) |
| スタイリング | Tailwind CSS v4 |
| データベース | Supabase (PostgreSQL) |
| デプロイ | Vercel |
| 認証 | 共通パスワード + ニックネーム (cookie) |

## 主な機能

- **5日間カリキュラム** — 56以上のクエスト (Day 1-2: 全員共通, Day 3-4: 職種別, Day 5: 全員共通)
- **5つのロール** — フロントエンド/バックエンドエンジニア、Webデザイナー、ディレクター、非エンジニア
- **ゲーミフィケーション** — XPシステム (10段階レベル)、ストリーク、デイリーゴール、忍者マスコット
- **バッジシステム** — 12種のバッジ + Confetti演出
- **フィードバック** — 5段階評価 + コメント → Supabase保存 + Slack通知
- **ランキング** — チーム全体の進捗可視化
- **Day解放ロジック** — 前のDayを50%以上完了で次のDayが解放
- **デモモード** — Supabase不要でUI確認可能
- **レスポンシブ** — モバイル対応 (ボトムナビゲーション)

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` を `.env.local` にコピーして値を設定:

```bash
cp .env.example .env.local
```

```env
# 認証パスワード (ログイン時に全員が使う共通パスワード)
AUTH_PASSWORD=your-shared-password

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# Slack Webhook (後日設定可)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx

# デモモード (true にするとSupabase不要でUI確認可能)
NEXT_PUBLIC_DEMO_MODE=true
```

### 3. Supabase セットアップ (本番利用時)

`supabase/migrations/001_initial_schema.sql` のSQLをSupabaseのSQL Editorで実行。

テーブル:
- `users` — ユーザー情報
- `quest_completions` — クエスト完了記録
- `badges` — バッジ取得記録
- `feedbacks` — フィードバック

### 4. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセス。

### 5. デモモードで確認

`.env.local` に `NEXT_PUBLIC_DEMO_MODE=true` を設定すると、Supabase接続なしでアプリ全体のUIを確認できます。デモユーザー「デモユーザー」として、フロントエンドエンジニアロールでDay1-2のクエストがいくつか完了済みの状態で表示されます。

## デプロイ (Vercel)

1. GitHubリポジトリを作成してpush
2. Vercelでリポジトリをインポート
3. 環境変数を設定 (`NEXT_PUBLIC_DEMO_MODE=false` に変更)
4. デプロイ

## ディレクトリ構成

```
src/
├── app/                    # Next.js App Router ページ
│   ├── api/                # API Routes (auth, feedback)
│   ├── badges/             # バッジコレクション
│   ├── dashboard/          # ダッシュボード
│   ├── day/[dayId]/        # Day一覧 & クエスト詳細
│   ├── login/              # ログイン
│   ├── ranking/            # チームランキング
│   └── select-role/        # ロール選択
├── components/
│   ├── auth/               # 認証関連 (LoginForm, RoleSelector)
│   ├── badges/             # バッジUI (BadgeCard, BadgeGrid, BadgeUnlockModal)
│   ├── dashboard/          # ダッシュボード (WelcomeHero, OverallProgress, DayCard, RecentActivity)
│   ├── feedback/           # フィードバック (FeedbackButton, FeedbackModal)
│   ├── gamification/       # ゲーミフィケーション (XPBar, StreakCounter, DailyGoal, XPGainPopup, LevelUpModal, NinjaMascot)
│   ├── layout/             # レイアウト (AppHeader, AppLayout, Sidebar, MobileNav)
│   ├── quest/              # クエスト (QuestHeader, QuestSteps, QuestChallenge, QuestHints, QuestCheckQuestions, QuestCompleteButton, QuestNavigation)
│   └── ui/                 # 共通UI (Button, Card, Modal, ProgressBar, StarRating, ExpandableSection, Toast, Confetti)
├── data/
│   ├── curriculum/         # 5日間のカリキュラムデータ (day1.ts ~ day5.ts)
│   ├── badges.ts           # 12種バッジ定義
│   └── roles.ts            # 5職種ロール定義
├── hooks/                  # カスタムフック (useAuth, useRole, useProgress, useBadges)
├── lib/                    # ユーティリティ (auth, supabase, slack, progress, badges, gamification, constants)
├── types/                  # TypeScript型定義
└── middleware.ts            # ルート保護
```

## ドキュメント

- `docs/SESSION_LOG.md` — 開発セッションの作業記録
- `docs/SETUP_GUIDE.md` — 本番セットアップガイド
