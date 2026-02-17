import { DayCurriculum } from '@/types';

export const day8: DayCurriculum = {
  dayId: 8,
  title: 'Git入門 — バージョン管理を学ぶ',
  description: 'Gitの基本操作を学び、コードの変更履歴を管理する方法を身につけよう',
  emoji: '🔀',
  quests: [
    {
      id: 'day8-intern-quest1',
      dayId: 8,
      title: 'Git init / add / commit',
      description: 'Gitの基本3ステップを学び、コードの変更を記録する方法を覚えよう',
      difficulty: 1,
      estimatedMinutes: 15,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'Gitとは何かを知る',
          content: 'AIに「Gitとは何ですか？なぜ使うのですか？初心者向けに教えて」と聞こう',
        },
        {
          title: 'git init でリポジトリを作成',
          content: 'ターミナルで練習用フォルダに移動し、git init でGitリポジトリを初期化しよう',
        },
        {
          title: 'git add でステージング',
          content: 'ファイルを作成し、git add でステージングエリアに追加しよう',
        },
        {
          title: 'git commit で変更を記録',
          content: 'git commit -m "最初のコミット" でコミットを作成しよう',
        },
      ],
      challenge: 'ファイルを3つ作成し、それぞれ別のコミットとして記録しよう',
      hints: [
        'git status で現在の状態を確認できる',
        'AIに「git addとcommitの違いを教えて」と聞くと理解が深まる',
      ],
      checkQuestions: [
        {
          question: 'Gitで変更を記録（保存）するコマンドは？',
          options: ['git add', 'git commit', 'git push', 'git init'],
          correctIndex: 1,
          explanation: 'git commit で変更をリポジトリに記録します。git add はその前にファイルをステージングするコマンドです',
        },
      ],
    },
    {
      id: 'day8-intern-quest2',
      dayId: 8,
      title: 'ブランチを使おう',
      description: 'ブランチを作って並行作業する方法を学ぼう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'ブランチとは何かを知る',
          content: 'AIに「Gitのブランチとは何ですか？なぜ使うのですか？」と聞こう',
        },
        {
          title: 'ブランチを作成する',
          content: 'git branch feature-1 でブランチを作り、git checkout feature-1 で切り替えよう',
        },
        {
          title: 'ブランチで作業する',
          content: 'ブランチ上でファイルを変更し、コミットしよう',
        },
        {
          title: 'mainブランチにマージする',
          content: 'git checkout main に戻り、git merge feature-1 でマージしよう',
        },
      ],
      challenge: '2つのブランチを作り、それぞれで変更してmainにマージしよう',
      hints: [
        'git branch で現在のブランチ一覧を確認できる',
        'AIに「ブランチの使い方を図で説明して」と頼むとイメージしやすい',
      ],
      checkQuestions: [
        {
          question: 'Gitで新しいブランチに切り替えるコマンドは？',
          options: ['git branch', 'git checkout', 'git merge', 'git commit'],
          correctIndex: 1,
          explanation: 'git checkout ブランチ名 で指定したブランチに切り替えます（git switch も同様に使えます）',
        },
      ],
    },
    {
      id: 'day8-intern-quest3',
      dayId: 8,
      title: 'GitHub連携',
      description: 'GitHubにリポジトリを作り、コードをリモートにアップロードしよう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'GitHubとは何かを知る',
          content: 'AIに「GitHubとは何ですか？Gitとの違いは？」と聞こう',
        },
        {
          title: 'GitHubアカウントを作る',
          content: 'github.com にアクセスしてアカウントを作成しよう（既にある場合はスキップ）',
        },
        {
          title: 'リモートリポジトリを作成する',
          content: 'GitHubで新しいリポジトリを作成し、URLをコピーしよう',
        },
        {
          title: 'git pushでアップロードする',
          content: 'git remote add origin URL → git push -u origin main でコードをアップロードしよう',
        },
      ],
      challenge: '練習用リポジトリをGitHubにアップロードして公開しよう',
      hints: [
        'SSH鍵の設定が必要な場合はAIに「GitHub SSH設定の手順」を聞こう',
        'READMEファイルを追加するとリポジトリの説明が表示される',
      ],
      checkQuestions: [
        {
          question: 'ローカルのコミットをGitHubに送信するコマンドは？',
          options: ['git commit', 'git add', 'git push', 'git pull'],
          correctIndex: 2,
          explanation: 'git push でローカルのコミットをリモートリポジトリ（GitHub）に送信します',
        },
      ],
    },
    {
      id: 'day8-intern-quest4',
      dayId: 8,
      title: 'CursorでGit操作',
      description: 'CursorのUI上からGit操作を行う方法を学ぼう',
      difficulty: 2,
      estimatedMinutes: 15,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'ソースコントロールパネルを開く',
          content: 'Cursorの左サイドバーでGitアイコンをクリックし、ソースコントロールパネルを開こう',
        },
        {
          title: 'GUIでステージング・コミット',
          content: 'ファイルの「+」ボタンでステージング、メッセージ入力でコミットしよう',
        },
        {
          title: '変更差分を確認する',
          content: '変更ファイルをクリックして差分（diff）を確認しよう',
        },
        {
          title: 'AIにコミットメッセージを提案してもらう',
          content: 'AIに「この変更に適切なコミットメッセージを提案して」と聞こう',
        },
      ],
      challenge: 'CursorのGUI操作だけで変更をステージング→コミット→確認まで行おう',
      hints: [
        'Ctrl+Shift+G でソースコントロールパネルをすぐ開ける',
        'コミットメッセージは何を変えたかを簡潔に書くのがコツ',
      ],
      checkQuestions: [
        {
          question: 'CursorでGitのソースコントロールパネルを開くショートカットは？',
          options: ['Cmd+L', 'Ctrl+Shift+G', 'Cmd+P', 'Cmd+K'],
          correctIndex: 1,
          explanation: 'Ctrl+Shift+G でソースコントロール（Git）パネルを開くことができます',
        },
      ],
    },
  ],
};
