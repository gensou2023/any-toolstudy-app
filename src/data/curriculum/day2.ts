import { DayCurriculum } from '@/types';

export const day2: DayCurriculum = {
  dayId: 2,
  title: 'AIと上手に会話する',
  description: 'プロンプトの書き方からChat、Cmd+K、Composerまで、AIとの効果的なコミュニケーション方法を学ぼう',
  emoji: '💬',
  quests: [
    {
      id: 'day2-quest1',
      dayId: 2,
      title: '良いプロンプトの書き方',
      description: 'AIから質の高い回答を引き出すためのプロンプトエンジニアリングの基本を学ぼう',
      difficulty: 2,
      estimatedMinutes: 15,
      targetRoles: 'all',
      steps: [
        {
          title: '悪いプロンプトの例',
          content: '「コード書いて」のような曖昧な指示はAIも困る',
        },
        {
          title: '良いプロンプトの構造',
          content: '[コンテキスト] + [具体的な指示] + [出力形式]',
        },
        {
          title: '具体性を高める',
          content: '「Reactで、ユーザー名を表示するコンポーネントを作って。Propsでnameを受け取り、TypeScriptで書いて」',
        },
        {
          title: '制約を伝える',
          content: '使用する技術、スタイル、パフォーマンス要件を明記',
        },
        {
          title: '実践',
          content: '3つの異なるプロンプトを試して、回答の質を比較',
        },
      ],
      challenge: '同じ目的で「曖昧なプロンプト」と「具体的なプロンプト」を書き、回答の違いを比較しよう',
      hints: [
        '英語で質問すると精度が上がる場合もある',
        '前の会話のコンテキストを活用しよう',
      ],
      checkQuestions: [
        {
          question: '良いプロンプトに含めるべき要素は？',
          options: ['とにかく長く書く', 'コンテキスト・具体的指示・出力形式', '英語のみで書く', 'コードだけ貼る'],
          correctIndex: 1,
          explanation: 'コンテキスト、具体的な指示、期待する出力形式を含めると良い回答が得られます',
        },
      ],
    },
    {
      id: 'day2-quest2',
      dayId: 2,
      title: 'Chatパネルを使いこなす',
      description: 'Cursorのチャットパネルを活用してコードの質問、生成、適用の流れをマスターしよう',
      difficulty: 2,
      estimatedMinutes: 15,
      targetRoles: 'all',
      steps: [
        {
          title: '新しい会話を始める',
          content: 'チャットパネルで「+」ボタンで新規会話を作成',
        },
        {
          title: 'コードについて質問',
          content: 'ファイルを開いた状態で「このコードを説明して」と質問',
        },
        {
          title: 'コードを生成',
          content: '「ソートアルゴリズムをTypeScriptで実装して」などと依頼',
        },
        {
          title: '会話の履歴を活用',
          content: '前の回答を踏まえた追加質問をする',
        },
        {
          title: 'コードブロックの操作',
          content: '回答内のコードブロックをコピー、ファイルに挿入',
        },
      ],
      challenge: 'チャットでコードを生成し、実際にファイルに適用するまでの流れを3回実践しよう',
      hints: [
        'コードブロックの右上にコピーボタンがある',
        'Apply をクリックで直接ファイルに反映できる',
      ],
      checkQuestions: [
        {
          question: 'チャットパネルで新しい会話を始めるには？',
          options: ['Cmd+N', '「+」ボタンをクリック', 'チャットを閉じて再度開く', '設定でリセット'],
          correctIndex: 1,
          explanation: 'チャットパネルの「+」ボタンで新しい会話を開始できます',
        },
      ],
    },
    {
      id: 'day2-quest3',
      dayId: 2,
      title: 'Cmd+K インライン編集',
      description: 'Cmd+Kを使ったインライン編集で、コードを素早く修正・改善する方法を学ぼう',
      difficulty: 3,
      estimatedMinutes: 15,
      targetRoles: 'all',
      steps: [
        {
          title: 'Cmd+Kを開く',
          content: 'エディタ上でCmd+Kを押してインライン編集モードに入る',
        },
        {
          title: 'コードの修正指示',
          content: '選択したコードに対して「この関数をasync/awaitに書き換えて」等の指示',
        },
        {
          title: 'Diff確認',
          content: '提案された変更がdiff形式で表示されるので内容を確認',
        },
        {
          title: '承認/却下',
          content: 'Tab で承認、Escで却下',
        },
        {
          title: '範囲選択+Cmd+K',
          content: 'テキストを選択してからCmd+Kで、選択範囲のみを対象に編集',
        },
      ],
      challenge: '既存のコードをCmd+Kで3回以上改善してみよう',
      hints: [
        'コードを選択せずにCmd+Kすると、カーソル位置にコードを生成',
        '指示は日本語でOK',
      ],
      checkQuestions: [
        {
          question: 'Cmd+Kの提案を承認するキーは？',
          options: ['Enter', 'Tab', 'Space', 'Cmd+Enter'],
          correctIndex: 1,
          explanation: 'Tabキーで提案されたコード変更を承認します',
        },
      ],
    },
    {
      id: 'day2-quest4',
      dayId: 2,
      title: 'Composerで複数ファイル操作',
      description: 'Composerを使って複数ファイルにまたがる大規模な変更を効率的に行おう',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: 'all',
      steps: [
        {
          title: 'Composerを開く',
          content: 'Cmd+IでComposerパネルを開く',
        },
        {
          title: '複数ファイルの操作',
          content: '「ヘッダーコンポーネントとフッターコンポーネントを作成して」',
        },
        {
          title: 'ファイルの自動作成',
          content: 'Composerが複数ファイルを一度に作成・編集する様子を確認',
        },
        {
          title: '変更のレビュー',
          content: '提案された全変更を確認してから適用',
        },
        {
          title: '大規模な変更',
          content: '「このプロジェクトにダークモードを追加して」のような大きな変更を試す',
        },
      ],
      challenge: 'Composerを使って3つ以上のファイルにまたがる変更を実行しよう',
      hints: [
        'Composerはプロジェクト全体を理解している',
        '大きな変更は段階的に行うのがおすすめ',
      ],
      checkQuestions: [
        {
          question: 'Composerを開くショートカットは？',
          options: ['Cmd+K', 'Cmd+L', 'Cmd+I', 'Cmd+J'],
          correctIndex: 2,
          explanation: 'Cmd+I（Ctrl+I）でComposerを開きます',
        },
      ],
    },
    {
      id: 'day2-quest5',
      dayId: 2,
      title: 'コンテキストを渡す(@file, @folder)',
      description: '@記法を使ってAIにコンテキストを正確に伝え、より的確な回答を得よう',
      difficulty: 3,
      estimatedMinutes: 15,
      targetRoles: 'all',
      steps: [
        {
          title: '@fileの使い方',
          content: 'チャットで「@」を入力するとファイル参照が可能',
        },
        {
          title: '特定ファイルを参照',
          content: '「@index.ts このファイルのテストを書いて」',
        },
        {
          title: '@folderの使い方',
          content: '「@src/components このフォルダの構造を説明して」',
        },
        {
          title: '@webの使い方',
          content: '「@web Next.js App Routerのベストプラクティス」',
        },
        {
          title: '複数コンテキスト',
          content: '複数の@参照を組み合わせた高度な質問',
        },
      ],
      challenge: '@file と @folder を使って、プロジェクト構造を考慮した質問をしよう',
      hints: [
        '@と入力するとサジェストが表示される',
        '@docsでドキュメントを参照可能',
      ],
      checkQuestions: [
        {
          question: 'チャットでファイルを参照する方法は？',
          options: ['ファイルをドラッグ', '@ファイル名', '#ファイル名', '!ファイル名'],
          correctIndex: 1,
          explanation: '@に続けてファイル名を入力すると、そのファイルをコンテキストとして渡せます',
        },
      ],
    },
    {
      id: 'day2-quest6',
      dayId: 2,
      title: 'マークダウンドキュメントを作ろう',
      description: 'AIと協力してマークダウン形式のドキュメントを作成・編集する方法を学ぼう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: 'all',
      steps: [
        {
          title: 'マークダウンの基本',
          content: '見出し(#)、太字(**)、リスト(-)、コードブロック(```)',
        },
        {
          title: 'AIでドキュメント生成',
          content: '「チーム開発ガイドラインのマークダウンを作って」',
        },
        {
          title: 'プレビュー確認',
          content: 'マークダウンプレビュー（Cmd+Shift+V）で見た目を確認',
        },
        {
          title: 'テーブルの作成',
          content: 'AIに表形式のデータをマークダウンテーブルで作成させる',
        },
        {
          title: 'ドキュメントの改善',
          content: '生成されたドキュメントをCmd+Kで修正・改善',
        },
      ],
      challenge: '自分のチーム用のドキュメントをAIと協力して作成しよう',
      hints: [
        'マークダウンはREADME.mdなどでよく使われる',
        'Mermaid記法で図も書ける',
      ],
      checkQuestions: [
        {
          question: 'マークダウンをプレビューするショートカットは？',
          options: ['Cmd+P', 'Cmd+Shift+V', 'Cmd+Shift+P', 'Cmd+V'],
          correctIndex: 1,
          explanation: 'Cmd+Shift+V（Ctrl+Shift+V）でマークダウンのプレビューを表示できます',
        },
      ],
    },
  ],
};
