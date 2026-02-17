import { DayCurriculum } from '@/types';

export const day10: DayCurriculum = {
  dayId: 10,
  title: 'ビジネスツール & 卒業',
  description: 'Notion・Slack・Backlogの活用法を学び、インターンプログラムの総仕上げをしよう',
  emoji: '🎯',
  quests: [
    {
      id: 'day10-intern-quest1',
      dayId: 10,
      title: 'Notion基礎',
      description: 'Notionを使ったドキュメント作成やタスク管理の基本を学ぼう',
      difficulty: 1,
      estimatedMinutes: 15,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'Notionとは何かを知る',
          content: 'AIに「Notionとは何ですか？どんなことに使えますか？」と聞こう',
        },
        {
          title: 'ページを作成する',
          content: 'Notionで新しいページを作成し、見出し・テキスト・チェックリストを追加しよう',
        },
        {
          title: 'データベースを体験する',
          content: 'テーブルビューでタスク管理用のデータベースを作成してみよう',
        },
        {
          title: 'テンプレートを活用する',
          content: 'AIに「Notionの議事録テンプレートを作って」と依頼し、テンプレートを作成しよう',
        },
      ],
      challenge: 'Notionで自分のインターン学習記録ページを作成しよう',
      hints: [
        'Notionの「/」コマンドでブロックタイプを素早く追加できる',
        'AIに「Notionの便利な使い方を5つ教えて」と聞くと活用の幅が広がる',
      ],
      checkQuestions: [
        {
          question: 'Notionの特徴として正しいのは？',
          options: [
            'コーディング専用ツール',
            'ドキュメント・タスク管理・データベースを統合したツール',
            'メール専用ツール',
            'デザイン専用ツール',
          ],
          correctIndex: 1,
          explanation: 'Notionはドキュメント作成、タスク管理、データベースなどを1つのツールで統合的に扱えるオールインワンワークスペースです',
        },
      ],
    },
    {
      id: 'day10-intern-quest2',
      dayId: 10,
      title: 'Slack活用術',
      description: 'Slackを使ったビジネスコミュニケーションの基本とコツを学ぼう',
      difficulty: 1,
      estimatedMinutes: 15,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'Slackの基本を知る',
          content: 'AIに「Slackの基本的な使い方とビジネスでのマナーを教えて」と聞こう',
        },
        {
          title: 'チャンネルの使い分けを学ぶ',
          content: 'パブリック・プライベートチャンネル、DMの使い分けを理解しよう',
        },
        {
          title: 'メッセージの書き方を学ぶ',
          content: 'メンション（@）、スレッド、リアクションの使い方を練習しよう',
        },
        {
          title: '効率的な使い方を覚える',
          content: 'ブックマーク、ピン留め、リマインダーなど便利機能を試そう',
        },
      ],
      challenge: 'Slackでの報告・連絡・相談のテンプレートメッセージをAIで3パターン作成しよう',
      hints: [
        'AIに「Slackでの報告メッセージのテンプレートを作って」と頼もう',
        'スレッドを使うと会話が整理されて他の人の迷惑にならない',
      ],
      checkQuestions: [
        {
          question: 'Slackで特定の人に通知を送るには？',
          options: ['DMを送る', '@メンションを使う', 'チャンネルを作る', 'メールを送る'],
          correctIndex: 1,
          explanation: '@ユーザー名 でメンションすると、その人に通知が届きます',
        },
      ],
    },
    {
      id: 'day10-intern-quest3',
      dayId: 10,
      title: 'Backlogタスク管理',
      description: 'Backlogを使ったプロジェクト管理・タスク管理の基本を学ぼう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'Backlogとは何かを知る',
          content: 'AIに「Backlogとは何ですか？どんな場面で使いますか？」と聞こう',
        },
        {
          title: '課題を作成する',
          content: '課題（タスク）の作成方法を学び、件名・詳細・担当者・期限を設定しよう',
        },
        {
          title: '課題のステータスを管理する',
          content: '未対応→処理中→完了 のステータス変更を体験しよう',
        },
        {
          title: 'ガントチャートを確認する',
          content: '複数の課題を作成し、ガントチャートでスケジュールを可視化しよう',
        },
      ],
      challenge: 'サンプルプロジェクトの課題を5つ作成し、ステータスを管理しよう',
      hints: [
        'AIに「プロジェクト管理の課題テンプレートを作って」と依頼すると効率的',
        '課題には優先度・カテゴリ・マイルストーンの設定もできる',
      ],
      checkQuestions: [
        {
          question: 'Backlogでタスクの進捗を管理する方法は？',
          options: [
            'メールで報告する',
            '課題のステータスを変更する',
            'Excelに記録する',
            '口頭で伝える',
          ],
          correctIndex: 1,
          explanation: 'Backlogでは課題のステータス（未対応→処理中→完了）を変更することで進捗を管理します',
        },
      ],
    },
    {
      id: 'day10-intern-quest4',
      dayId: 10,
      title: '総合演習 — ツール連携',
      description: '学んだツールを組み合わせて実際の業務フローを体験しよう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: '業務フローを設計する',
          content: 'AIに「インターン生の1日の業務フローをNotion/Slack/Backlog/Cursorを使って設計して」と依頼しよう',
        },
        {
          title: 'Notionで日報テンプレートを作る',
          content: 'Notionで日報テンプレートを作成し、その日の成果をまとめよう',
        },
        {
          title: 'Backlogでタスクを管理する',
          content: '今週のタスクをBacklogの課題として登録し、ステータスを更新しよう',
        },
        {
          title: 'Slackで報告する',
          content: 'Notionの日報リンクとBacklogの進捗をSlackで報告しよう',
        },
      ],
      challenge: 'Notion・Slack・Backlogを連携させた1日の業務フローを完成させよう',
      hints: [
        '各ツールのリンクを共有することで情報を横断的につなげられる',
        'AIに「業務効率化のためのツール連携のコツ」を聞いてみよう',
      ],
      checkQuestions: [
        {
          question: 'ビジネスツールを連携して使う利点は？',
          options: [
            'ツールの数が増えて大変になる',
            '情報が分散して見つけにくくなる',
            '情報の一元管理と業務フローの効率化ができる',
            'ツールの学習コストが減る',
          ],
          correctIndex: 2,
          explanation: '各ツールの強みを活かして連携させることで、情報の一元管理と業務フローの効率化が実現できます',
        },
      ],
    },
    {
      id: 'day10-intern-quest5',
      dayId: 10,
      title: '卒業制作 — 学びの集大成',
      description: 'インターンプログラムで学んだすべてを活かして、卒業プレゼンを作成しよう',
      difficulty: 3,
      estimatedMinutes: 30,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: '学びを振り返る',
          content: 'Day 1〜10で学んだ内容を振り返り、特に印象に残ったことをリストアップしよう',
        },
        {
          title: '卒業プレゼンの構成を作る',
          content: 'AIに「インターンの学びをまとめるプレゼンの構成を提案して」と依頼し、アウトラインを作ろう',
        },
        {
          title: '成果物を整理する',
          content: 'これまで作成したWebページ、ドキュメント、GitHubリポジトリなどを整理しよう',
        },
        {
          title: 'プレゼン資料を完成させる',
          content: 'AIの力を借りてプレゼン資料を仕上げ、発表の準備をしよう',
        },
        {
          title: '今後の目標を設定する',
          content: 'インターン後にさらに学びたいこと、チャレンジしたいことを3つ書き出そう',
        },
      ],
      challenge: 'インターンの学びと成果をまとめた卒業プレゼン資料を完成させよう',
      hints: [
        'Before/After（学ぶ前と後の自分の変化）を入れると印象的なプレゼンになる',
        'AIに「プレゼンのトークスクリプトも作って」と依頼すると発表準備が楽になる',
      ],
      checkQuestions: [
        {
          question: 'インターンの学びを効果的にまとめるコツは？',
          options: [
            '全ての内容を詳細に書く',
            '技術用語をできるだけ多く使う',
            '具体的な成果と成長ポイントに焦点を当てる',
            'できるだけ短くまとめる',
          ],
          correctIndex: 2,
          explanation: '具体的な成果（作ったもの）と成長ポイント（できるようになったこと）に焦点を当てると、効果的なプレゼンになります',
        },
      ],
    },
  ],
};
