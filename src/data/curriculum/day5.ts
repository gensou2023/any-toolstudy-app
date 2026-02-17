import { DayCurriculum } from '@/types';

export const day5: DayCurriculum = {
  dayId: 5,
  title: 'チーム活用と卒業',
  description: 'Cursorをチームで活用するためのベストプラクティスを学び、卒業チャレンジに挑戦しよう',
  emoji: '🎓',
  quests: [
    {
      id: 'day5-quest1',
      dayId: 5,
      title: '.cursorrulesを設定しよう',
      description: 'プロジェクト固有のAI指示を設定する.cursorrulesファイルを作成し、チーム全体の開発効率を向上させよう',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: 'all',
      steps: [
        {
          title: '.cursorrulesファイルの作成',
          content: 'プロジェクトのルートディレクトリに.cursorrulesファイルを新規作成する',
        },
        {
          title: 'プロジェクト固有のルール設定',
          content: 'コーディング規約、使用技術、命名規則などプロジェクト固有のルールを記述する',
        },
        {
          title: 'チームで共有する設定',
          content: '.cursorrulesをGitリポジトリに含めてチームメンバーと共有する方法を学ぶ',
        },
      ],
      challenge: '自分のプロジェクト用の.cursorrulesファイルを作成しよう',
      hints: [
        '使用言語、フレームワーク、コーディング規約を明記すると効果的',
        'チームの既存のコーディング規約をベースに作成すると統一性が保てる',
      ],
      checkQuestions: [
        {
          question: '.cursorrulesの目的は？',
          options: [
            'Cursorのテーマを変更する',
            'プロジェクト固有のAI指示を設定する',
            'ファイルのアクセス権限を管理する',
            'Gitのコミットルールを設定する',
          ],
          correctIndex: 1,
          explanation: '.cursorrulesはプロジェクト固有のAI指示を設定するファイルで、AIの応答をプロジェクトに最適化できます',
        },
      ],
    },
    {
      id: 'day5-quest2',
      dayId: 5,
      title: 'MCPを理解しよう',
      description: 'MCP（Model Context Protocol）の概要を理解し、AIに外部ツールを接続する仕組みを学ぼう',
      difficulty: 4,
      estimatedMinutes: 25,
      targetRoles: 'all',
      steps: [
        {
          title: 'MCP（Model Context Protocol）の概要',
          content: 'MCPとは何か、AIと外部ツールを接続するプロトコルの基本概念を学ぶ',
        },
        {
          title: '利用可能なMCPツール',
          content: 'データベース接続、API連携、ファイルシステムなど利用可能なMCPツールを確認する',
        },
        {
          title: '設定方法',
          content: 'CursorでMCPを設定する方法と、設定ファイルの書き方を学ぶ',
        },
        {
          title: 'ユースケースの理解',
          content: 'MCP活用の具体的なユースケースをAIと一緒に整理する',
        },
      ],
      challenge: 'MCPの概要と利点をチームメンバーに説明できるようになろう',
      hints: [
        'MCPは「AIに道具を持たせる」イメージで理解すると分かりやすい',
        '公式ドキュメントを参照しながらAIに質問すると理解が深まる',
      ],
      checkQuestions: [
        {
          question: 'MCPとは？',
          options: [
            'Multiple Cursor Panelの略で、複数カーソルの管理機能',
            'Model Context Protocolの略で、AIに外部ツールを接続する仕組み',
            'Main Code Processorの略で、コードの実行エンジン',
            'Managed Cloud Platformの略で、クラウドサービスの名前',
          ],
          correctIndex: 1,
          explanation: 'MCPはModel Context Protocolの略で、AIに外部ツールを接続する仕組みです。これによりAIがデータベースやAPIなど外部リソースにアクセスできるようになります',
        },
      ],
    },
    {
      id: 'day5-quest3',
      dayId: 5,
      title: 'チームのベストプラクティス',
      description: 'チーム開発でCursorを最大限活用するためのベストプラクティスを学び、ガイドラインを作成しよう',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: 'all',
      steps: [
        {
          title: 'チーム開発でのCursor活用法',
          content: 'ペアプログラミング、コード生成、ドキュメント作成などチームでの活用法を学ぶ',
        },
        {
          title: 'コードレビューへの活用',
          content: 'AIを使ったコードレビューの効率化方法と注意点を理解する',
        },
        {
          title: '知識共有',
          content: 'チーム内でプロンプトやベストプラクティスを共有する仕組みを構築する',
        },
        {
          title: 'ガイドラインの策定',
          content: 'チーム向けのCursor活用ガイドラインのドラフトを作成する',
        },
      ],
      challenge: 'チーム向けのCursor活用ガイドラインのドラフトを作成しよう',
      hints: [
        'チームメンバーのスキルレベルに合わせたガイドラインを意識しよう',
        'やるべきこと・やらないことを明確に分けると実用的なガイドラインになる',
      ],
      checkQuestions: [
        {
          question: 'チーム開発でCursorを活用する際に最も重要なことは？',
          options: [
            '全員が同じプロンプトを使うこと',
            'AIが生成したコードをそのまま本番に使うこと',
            'チーム共通のルールとベストプラクティスを共有すること',
            '最も高価なAIモデルを使うこと',
          ],
          correctIndex: 2,
          explanation: 'チーム共通のルールとベストプラクティスを共有することで、品質の統一とチーム全体の生産性向上が実現できます',
        },
      ],
    },
    {
      id: 'day5-quest4',
      dayId: 5,
      title: 'プロンプトライブラリを作ろう',
      description: 'よく使うプロンプトを収集・テンプレート化し、チームで共有できるプロンプトライブラリを作ろう',
      difficulty: 3,
      estimatedMinutes: 25,
      targetRoles: 'all',
      steps: [
        {
          title: 'よく使うプロンプトの収集',
          content: 'これまでの学習で効果的だったプロンプトを振り返り、リストアップする',
        },
        {
          title: 'テンプレート化',
          content: 'プロンプトを汎用的なテンプレートに変換し、変数部分を明示する',
        },
        {
          title: 'カテゴリ分類',
          content: 'コード生成、レビュー、ドキュメント作成などカテゴリ別に整理する',
        },
        {
          title: 'チームで共有',
          content: 'プロンプトライブラリを共有するための仕組み（Wiki、リポジトリ等）を決める',
        },
      ],
      challenge: '10個以上の実用的プロンプトテンプレートを作成しよう',
      hints: [
        '用途・場面ごとにプロンプトを分類すると使いやすいライブラリになる',
        'テンプレート内の変数部分を[プロジェクト名]のように明示すると再利用しやすい',
      ],
      checkQuestions: [
        {
          question: 'プロンプトライブラリを作る最大のメリットは？',
          options: [
            'AIの利用料金を削減できる',
            '毎回ゼロからプロンプトを考える手間を省き、品質を安定させられる',
            'AIの学習データを増やせる',
            'プロンプトを暗記する必要がなくなる',
          ],
          correctIndex: 1,
          explanation: 'テンプレート化されたプロンプトを再利用することで、効率的かつ安定した品質でAIを活用できます',
        },
      ],
    },
    {
      id: 'day5-quest5',
      dayId: 5,
      title: 'セキュリティとプライバシー',
      description: 'AI利用時のセキュリティリスクとプライバシーの注意点を理解し、安全な活用方法を身につけよう',
      difficulty: 3,
      estimatedMinutes: 15,
      targetRoles: 'all',
      steps: [
        {
          title: 'AI利用時のセキュリティ注意点',
          content: 'AIにコードを送信する際のセキュリティリスクと対策を理解する',
        },
        {
          title: '機密情報の取り扱い',
          content: 'APIキー、パスワード、個人情報などの機密情報をAIに渡さないルールを学ぶ',
        },
        {
          title: '社内ポリシー',
          content: 'AI利用に関する社内ポリシーの確認と遵守事項を整理する',
        },
      ],
      challenge: 'AI利用時のセキュリティチェックリストを作成しよう',
      hints: [
        '.envファイルや認証情報を含むコードをAIに渡さないよう注意しよう',
        '社内のセキュリティチームに確認すべき事項をリストアップしよう',
      ],
      checkQuestions: [
        {
          question: 'AIツール利用時に最も注意すべきセキュリティ事項は？',
          options: [
            'AIの回答速度が遅いこと',
            'AIにテーマを変更されること',
            '機密情報やAPIキーをAIに送信しないこと',
            'AIが使用する電力消費量',
          ],
          correctIndex: 2,
          explanation: 'APIキー、パスワード、個人情報などの機密情報をAIに送信しないことが最も重要なセキュリティ対策です',
        },
      ],
    },
    {
      id: 'day5-quest6',
      dayId: 5,
      title: '卒業チャレンジ',
      description: '5日間で学んだ全てのスキルを活用して、総合的な実践課題に挑戦しよう',
      difficulty: 5,
      estimatedMinutes: 30,
      targetRoles: 'all',
      steps: [
        {
          title: '課題の選定',
          content: '自分の業務で効率化したいタスクや作りたいものを1つ選ぶ',
        },
        {
          title: '計画の作成',
          content: 'AIと対話しながら実装計画を立て、必要なステップを整理する',
        },
        {
          title: '実装',
          content: 'これまで学んだChat、Cmd+K、Composer等の機能を駆使して実装する',
        },
        {
          title: 'レビューと改善',
          content: 'AIにレビューを依頼し、フィードバックをもとに改善する',
        },
        {
          title: '振り返りと共有',
          content: '5日間の学びを振り返り、学んだことと今後の活用計画をまとめる',
        },
      ],
      challenge: '学んだ全てのスキルを活用して、自分の業務を効率化するアイデアを実装しよう',
      hints: [
        'これまでのDay1〜Day4で学んだテクニックを組み合わせて使ってみよう',
        '完璧を目指さず、まずは動くものを作ることを優先しよう',
      ],
      checkQuestions: [
        {
          question: 'Cursorを最大限活用するために最も重要なことは？',
          options: [
            'できるだけ多くのショートカットを暗記する',
            '最新のAIモデルを常に使用する',
            '具体的なコンテキストを与えて明確な指示を出すこと',
            'AIの提案を全て受け入れること',
          ],
          correctIndex: 2,
          explanation: '具体的なコンテキストを与えて明確な指示を出すことで、AIはより正確で有用な回答を提供でき、開発効率が最大化されます',
        },
      ],
    },
  ],
};
