# Cursor道場 — 本番セットアップガイド

デモモードでUIを確認した後、本番環境として稼働させるための手順。

---

## 1. Supabase セットアップ

### 1.1 プロジェクト作成

1. https://supabase.com でアカウント作成 (無料プランでOK)
2. 「New Project」でプロジェクト作成
3. リージョン: `Northeast Asia (Tokyo)` 推奨
4. Database Password を設定 (安全な場所に保管)

### 1.2 テーブル作成

1. Supabase ダッシュボード → SQL Editor
2. `supabase/migrations/001_initial_schema.sql` の内容をコピー&ペースト
3. 「Run」で実行

作成されるテーブル:
- `users` — ユーザー (nickname, role)
- `quest_completions` — クエスト完了記録
- `badges` — バッジ取得記録
- `feedbacks` — フィードバック

### 1.3 API キー取得

1. Supabase ダッシュボード → Settings → API
2. 以下をメモ:
   - **Project URL**: `https://xxxx.supabase.co`
   - **anon (public) key**: `eyJhbGciOiJIUzI1NiIs...`

---

## 2. GitHub リポジトリ

```bash
cd /Users/arumamurata/cursor-dojo

# Git 初期化 (まだの場合)
git init
git add .
git commit -m "Initial commit: Cursor道場 v1.0"

# GitHub リポジトリ作成 & push
gh repo create cursor-dojo --private --source=. --push
```

> `.env.local` は `.gitignore` に含まれているのでpushされません。

---

## 3. Vercel デプロイ

### 3.1 Vercel にインポート

1. https://vercel.com にログイン
2. 「Add New...」→「Project」
3. GitHubリポジトリ `cursor-dojo` を選択
4. Framework: `Next.js` (自動検出)

### 3.2 環境変数設定

Vercel の Project Settings → Environment Variables で以下を設定:

| 変数名 | 値 | メモ |
|--------|-----|------|
| `AUTH_PASSWORD` | 社内で共有するパスワード | 全員がログイン時に使う |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Supabase anon key |
| `SLACK_WEBHOOK_URL` | `https://hooks.slack.com/...` | 後日設定可 |
| `NEXT_PUBLIC_DEMO_MODE` | `false` | **必ず false に** |

### 3.3 デプロイ

「Deploy」ボタンを押してデプロイ。以降は `main` ブランチへのpushで自動デプロイ。

---

## 4. Slack 通知設定 (任意)

フィードバック送信時にSlackチャンネルへ通知を送る機能。

### 4.1 Incoming Webhook 作成

1. https://api.slack.com/apps → 「Create New App」
2. 「From scratch」→ アプリ名: `Cursor道場通知`, ワークスペース選択
3. 「Incoming Webhooks」→ 「On」に切替
4. 「Add New Webhook to Workspace」→ 通知先チャンネル選択
5. 生成されたWebhook URL をコピー

### 4.2 環境変数に設定

Vercel の環境変数に `SLACK_WEBHOOK_URL` として設定。

通知される内容:
- クエスト名
- 評価 (星1-5)
- コメント
- ユーザー名

---

## 5. 運用

### 社内展開時

1. 共通パスワードを社内チャットで共有
2. Vercel の URL (例: `https://cursor-dojo.vercel.app`) を案内
3. 各自がニックネームでログイン → ロール選択 → 学習開始

### 進捗確認

- `/ranking` ページでチーム全体の進捗を確認
- Supabase ダッシュボードで直接データも確認可能

### データリセット (必要な場合)

```sql
-- 全データリセット (Supabase SQL Editor で実行)
TRUNCATE feedbacks, badges, quest_completions, users CASCADE;
```

---

## トラブルシューティング

| 症状 | 対処 |
|------|------|
| ログインできない | `AUTH_PASSWORD` 環境変数を確認 |
| データが保存されない | Supabase URL と anon key を確認。Supabase ダッシュボードでテーブル存在を確認 |
| ページが404 | Vercel の Build Logs を確認。`npm run build` がローカルで成功するか確認 |
| Slack通知が来ない | `SLACK_WEBHOOK_URL` を確認。Webhook が有効か Slack アプリ設定を確認 |
| デモモードのまま | `NEXT_PUBLIC_DEMO_MODE` が `false` になっているか確認 (Vercel で再デプロイ必要) |
