# Cursor道場 — CLAUDE.md

エニセンス社内向け Cursor IDE 学習Webアプリ。

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript (strict)
- **Styling**: Tailwind CSS v4 (`globals.css` 内の `@theme inline` で定義、`tailwind.config` なし)
- **DB / Auth**: Supabase (PostgreSQL + Auth)
- **Package Manager**: npm
- **Font**: Noto Sans JP + Geist Sans + Geist Mono
- **チャート**: recharts
- **外部連携**: Slack Webhook, Notion API, canvas-confetti

## Commands

```bash
npm run dev      # 開発サーバー起動 (localhost:3000)
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # ESLint 実行
```

## Project Structure

```
src/
├── app/                    # Next.js App Router ページ & API
│   ├── api/
│   │   ├── analytics/      # アナリティクス集計API
│   │   ├── auth/           # login, register, email-login
│   │   ├── assessment/     # スキルアセスメント
│   │   ├── feedback/       # フィードバック + ダッシュボード
│   │   └── typing/         # タイピングゲームスコア
│   ├── analytics/          # アナリティクスダッシュボード
│   ├── assessment/         # アセスメントページ
│   ├── dashboard/          # メインダッシュボード
│   ├── day/[dayId]/        # Day概要 + quest/[questId]
│   ├── typing/             # タイピングゲーム
│   ├── feedback/           # フィードバックダッシュボード
│   ├── badges/             # バッジコレクション
│   ├── ranking/            # ランキング
│   ├── intern/             # インターン専用ページ (badges, ranking)
│   └── login/              # ログイン・登録
├── components/
│   ├── analytics/          # アナリティクスチャート (recharts, 12種)
│   ├── assessment/         # アセスメントUI
│   ├── auth/               # 認証関連 (LoginTabs, EmailRegisterForm, ProfileSetupInline)
│   ├── badges/             # バッジ表示
│   ├── dashboard/          # DayCard, WelcomeHero, OverallProgress 等
│   ├── feedback/           # FeedbackDashboard, FeedbackUserCard 等
│   ├── gamification/       # XPBar, StreakCounter, NinjaMascot 等
│   ├── layout/             # AppLayout, AppHeader, Sidebar, MobileNav
│   ├── quest/              # QuestSteps, QuestChallenge, QuestHints 等
│   ├── typing/             # TypingGame, TypingInput, ComboDisplay 等
│   └── ui/                 # Button, Card, Modal, ProgressBar, Toast 等
├── data/
│   ├── curriculum/         # day1.ts〜day10.ts (56+ クエスト)
│   ├── assessment-questions.ts
│   ├── badges.ts           # 17バッジ定義
│   ├── roles.ts            # 6ロール定義
│   ├── skill-unlock-map.ts
│   ├── tool-links.ts
│   └── typing-words.ts    # 福岡名産品 + IT用語
├── hooks/                  # useAuth, useProgress, useRole, useAssessment, useAnalytics 等 (全11フック)
├── lib/                    # auth, progress, gamification, analytics-helpers, supabase, slack, notion, romaji-map
├── middleware.ts           # ルート保護 (認証 + デモモード)
└── types/
    ├── index.ts            # User, Quest, Feedback, FeedbackWithUser 等
    ├── assessment.ts       # AssessmentQuestion, SkillLevel 等
    └── analytics.ts        # AnalyticsResponse, UsageData, TypingStatsData 等
```

## Database Schema (Supabase)

7テーブル。全テーブル RLS 有効 (`allow all` ポリシー)。

| テーブル | 主要カラム | 備考 |
|---------|-----------|------|
| `users` | id, nickname, role, email?, auth_id?, skill_level? | メインユーザー |
| `quest_completions` | user_id, quest_id | UNIQUE(user_id, quest_id) |
| `badges` | user_id, badge_id | UNIQUE(user_id, badge_id) |
| `feedbacks` | user_id, quest_id?, rating?, comment?, type | quest_id/rating は nullable |
| `assessment_results` | user_id (UNIQUE), answers (JSONB), skill_level, total_score | |
| `day_unlock_overrides` | user_id, day_id, reason | UNIQUE(user_id, day_id) |
| `typing_scores` | user_id, mode, score, max_combo, accuracy, wpm | mode: '30s'/'60s'/'90s' |

マイグレーション: `supabase/migrations/001_initial_schema.sql` 〜 `006_fix_feedbacks_schema.sql`

## Environment Variables

```bash
AUTH_PASSWORD=              # 共通パスワード（クイックログイン用）
NEXT_PUBLIC_SUPABASE_URL=   # Supabase プロジェクトURL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anon key
SLACK_WEBHOOK_URL=          # Slack通知用 Webhook URL
NEXT_PUBLIC_DEMO_MODE=false # true でSupabase不要のデモモード

# 任意（未設定でもスキップ）
NOTION_API_KEY=             # Notion フィードバック保存用
NOTION_FEEDBACK_DB_ID=      # Notion DB ID
```

## Authentication

- **クイックログイン**: 共通パスワード + ニックネーム → `users` テーブル upsert → cookie
- **メールログイン**: Supabase Auth (`signInWithPassword`) → `users` テーブル lookup → cookie
- **Cookie**: `cursor-dojo-auth` = base64(JSON `{userId, nickname}`)
- **Middleware**: cookie 存在チェック。デモモードでは認証スキップ
- **公開パス**: `/login`, `/api/auth/*`

## Key Concepts

### ロールシステム (6ロール)
`frontend-engineer`, `backend-engineer`, `web-designer`, `director`, `non-engineer`, `student-intern`

- `student-intern` は Day 1-2 + Day 6-10 のカリキュラム
- その他のロールは Day 1-5

### Day解放ロジック (`src/lib/progress.ts`)
- 前のDayの完了率が 50% 以上 (`DAY_UNLOCK_THRESHOLD`) で次のDay解放
- `day_unlock_overrides` テーブルにある Day は無条件解放（アセスメント結果による）
- Day 1 は常に解放

### XP / レベルシステム (`src/lib/gamification.ts`)
- 難易度別 XP: 1→10, 2→20, 3→35, 4→50, 5→100
- 10段階レベル: 入門者(0) → Cursorマスター(1500XP)

### デモモード
`NEXT_PUBLIC_DEMO_MODE=true` で全 Supabase 操作をモックデータに置換。各 hook (`useAuth`, `useProgress` 等) が内部で分岐。

### アナリティクス (`/analytics`)
- 全ユーザーがアクセス可能な利用状況ダッシュボード
- API (`/api/analytics`) が `users`, `quest_completions`, `typing_scores`, `feedbacks`, `assessment_results` を並列クエリ
- DAU/WAU は `quest_completions.completed_at` + `typing_scores.played_at` + `feedbacks.created_at` から算出
- recharts で12種のチャート（Area/Bar/Pie/Line）
- デモモードではモックデータを返却

### タイピングゲーム (`src/lib/romaji-map.ts`)
- ひらがな reading をローマ字入力で判定
- 複数入力パターン対応 (例: し → shi / si)
- っ (促音) → 次の子音を2回入力
- コンボ倍率: `floor(combo/10)+1`、最大 5x

## Coding Conventions

- コンポーネント: `export default function ComponentName()` (named default export)
- Hooks: `src/hooks/use*.ts`、全フックがデモモード分岐を持つ
- API: `src/app/api/**/route.ts`、Next.js Route Handler
- 型定義: `src/types/index.ts` に集約（アセスメント関連は `assessment.ts`、アナリティクスは `analytics.ts`）
- UI言語: **全て日本語** (ラベル、メッセージ、カリキュラム内容)
- CSS: Tailwind ユーティリティクラス + `globals.css` のカスタムアニメーション
- パスエイリアス: `@/` → `src/`

## Development Rules

過去のセッションの振り返り (KPT) から得た開発ルール。**必ず守ること。**

### 1. セッション開始時の環境確認

機能実装やバグ修正に入る前に、以下を確認する:

```
- [ ] `NEXT_PUBLIC_DEMO_MODE` の値 (.env.local) — false であること
- [ ] dev サーバーが起動しているか
- [ ] 現在の git ブランチと未コミット変更
```

デモモードが `true` のまま「動かない」と悩んだ前例あり。環境確認は30秒、デバッグは30分。

### 2. DB スキーマ変更時の必須手順

API で INSERT/UPDATE するテーブルに変更がある場合:

1. **既存マイグレーションを全て読む** (`supabase/migrations/*.sql`)
2. **NOT NULL / CHECK / UNIQUE 制約を洗い出す**
3. **API が送る値と制約の整合性を確認** — nullable なフィールドに NOT NULL 制約がないか
4. 不整合があれば **API より先にマイグレーションを書く**

> 教訓: `feedbacks` テーブルの NOT NULL 制約を見落とし、API 完成後にスキーマ修正が必要になった

### 3. マイグレーション SQL の書き方

- Supabase SQL Editor に貼る際、`--` コメントが構文エラーになる場合がある
- **マイグレーションファイルにはコメントを書いてよい**が、ユーザーに貼り付け用 SQL を渡す際は**コメントを除去**する
- ファイル名は `NNN_<description>.sql` の連番

### 4. 新機能に hook を追加する場合

- `src/hooks/use*.ts` に配置
- **デモモード分岐を必ず実装する** — `IS_DEMO_MODE` が `true` の場合はモックデータを返す
- 既存フック (`useAuth`, `useProgress`, `useRole`, `useBadges` 等) のパターンに従う

### 5. 実装後の確認チェックリスト

`npm run build` だけでは不十分。以下も確認する:

```
- [ ] npm run build — エラー 0
- [ ] 主要フローの手動テスト（該当機能を実際にブラウザで操作）
- [ ] 外部連携の動作確認（Slack 通知、Supabase 書き込み）
- [ ] デモモード ON/OFF 両方で動作すること
```

### 6. CLAUDE.md とセッションログの更新タイミング

- **機能実装が一段落したら即座に更新する**（セッション終盤まで待たない）
- 長時間セッションではコンテキスト圧縮が起きるため、早めにドキュメント化しておくことで引き継ぎミスを防ぐ
- セッションログは `docs/session-logs/YYYY-MM-DD.md`

### 7. 計画駆動の開発

- 3つ以上の機能を同時に実装する場合は、**依存関係を明示した計画を先に書く**
- 計画ファイルは `.claude/plans/` に保存される
- 依存関係のない機能は並列で実装してよい

## Notes

- Notion連携は `NOTION_API_KEY` と `NOTION_FEEDBACK_DB_ID` が未設定だとスキップされる（エラーにはならない）
- `middleware.ts` に Next.js 16 の非推奨警告あり（動作に問題なし）
