import { DayCurriculum } from '@/types';

export const day7: DayCurriculum = {
  dayId: 7,
  title: 'JavaScript基礎 — 動きをつけよう',
  description: 'JavaScriptの基本を学び、Webページに動きやインタラクションを追加しよう',
  emoji: '⚡',
  quests: [
    {
      id: 'day7-intern-quest1',
      dayId: 7,
      title: '変数と関数を学ぼう',
      description: 'JavaScriptの変数宣言と関数の基本を理解しよう',
      difficulty: 1,
      estimatedMinutes: 15,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'JavaScriptとは何かを知る',
          content: 'AIに「JavaScriptとは何ですか？Webでどんな役割がありますか？」と聞いてみよう',
        },
        {
          title: '変数を宣言する',
          content: 'let, const を使って変数を宣言し、console.logで表示してみよう',
        },
        {
          title: '関数を作る',
          content: 'function キーワードやアロー関数で簡単な関数を定義してみよう',
        },
        {
          title: 'HTMLファイルに組み込む',
          content: '<script>タグを使ってHTMLファイルにJavaScriptを追加しよう',
        },
      ],
      challenge: '名前を受け取って挨拶を返す関数を作り、ブラウザのコンソールに表示しよう',
      hints: [
        'AIに「JavaScriptの変数の使い方をサンプルコード付きで教えて」と聞いてみよう',
        'ブラウザのDevTools → Consoleタブでconsole.logの結果を確認できる',
      ],
      checkQuestions: [
        {
          question: 'JavaScriptで再代入できない変数を宣言するキーワードは？',
          options: ['var', 'let', 'const', 'function'],
          correctIndex: 2,
          explanation: 'constで宣言した変数は再代入できません。変更しない値にはconstを使います',
        },
      ],
    },
    {
      id: 'day7-intern-quest2',
      dayId: 7,
      title: 'DOM操作に挑戦',
      description: 'JavaScriptでHTMLの要素を操作する方法を学ぼう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'DOMとは何かを知る',
          content: 'AIに「DOMとは何ですか？初心者向けに教えて」と聞いてみよう',
        },
        {
          title: '要素を取得する',
          content: 'document.getElementById や document.querySelector を使って要素を取得しよう',
        },
        {
          title: 'テキストを変更する',
          content: 'element.textContent や element.innerHTML を使って表示テキストを変更しよう',
        },
        {
          title: 'スタイルを動的に変更する',
          content: 'element.style を使って色やサイズをJavaScriptから変更してみよう',
        },
      ],
      challenge: 'ボタンを押すとページのテキストや色が変わる仕組みを作ってみよう',
      hints: [
        'AIに「ボタンクリックでテキストが変わるHTMLとJavaScriptのサンプルを作って」と頼もう',
        'querySelectorAll で複数の要素を一度に取得できる',
      ],
      checkQuestions: [
        {
          question: 'HTMLの要素をJavaScriptで取得するメソッドは？',
          options: ['console.log()', 'alert()', 'document.getElementById()', 'window.open()'],
          correctIndex: 2,
          explanation: 'document.getElementById() でHTML要素をIDを指定して取得できます',
        },
      ],
    },
    {
      id: 'day7-intern-quest3',
      dayId: 7,
      title: 'イベント処理を学ぼう',
      description: 'クリックや入力などのユーザー操作に反応するプログラムを書こう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'イベントとは何かを知る',
          content: 'AIに「JavaScriptのイベントとは何ですか？どんな種類がありますか？」と聞こう',
        },
        {
          title: 'クリックイベントを設定する',
          content: 'addEventListener("click", ...) でボタンクリック時の処理を書こう',
        },
        {
          title: '入力イベントを処理する',
          content: 'テキスト入力フィールドの値をリアルタイムに取得して表示しよう',
        },
        {
          title: 'インタラクティブな機能を作る',
          content: 'カウンターやTodoリストなど、イベントを組み合わせた機能を作ろう',
        },
      ],
      challenge: 'クリックで数字が増えるカウンターアプリを作ってみよう',
      hints: [
        'AIに「クリックカウンターのHTMLとJavaScriptを作って」と頼んでみよう',
        'addEventListener は要素に対してイベントの種類と処理関数を指定する',
      ],
      checkQuestions: [
        {
          question: 'ボタンクリック時に処理を実行するにはどうする？',
          options: [
            'console.log()を使う',
            'addEventListener("click", 関数)を使う',
            'document.write()を使う',
            'alert()を使う',
          ],
          correctIndex: 1,
          explanation: 'addEventListener で"click"イベントに関数を登録すると、クリック時に実行されます',
        },
      ],
    },
    {
      id: 'day7-intern-quest4',
      dayId: 7,
      title: 'AIにJavaScriptを相談しよう',
      description: 'JavaScriptのコードをAIに相談して効率よくプログラミングする方法を学ぼう',
      difficulty: 2,
      estimatedMinutes: 15,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'エラーをAIに相談する',
          content: 'わざとエラーを出して、エラーメッセージをAIに貼り付けて解決策を聞こう',
        },
        {
          title: 'コードの改善を依頼する',
          content: '書いたコードをAIに見せて「もっと良い書き方はありますか？」と聞こう',
        },
        {
          title: '新しい機能をAIに作ってもらう',
          content: '「このページにダークモード切替ボタンを追加して」のように機能を依頼しよう',
        },
        {
          title: 'コードを理解する',
          content: 'AIが生成したコードの意味を一行ずつAIに説明してもらおう',
        },
      ],
      challenge: 'AIと協力してインタラクティブなWebページ機能を追加しよう',
      hints: [
        'エラーメッセージはそのままコピーしてAIに貼り付けると解決が早い',
        '「このコードを初心者向けに解説して」と頼むと理解が深まる',
      ],
      checkQuestions: [
        {
          question: 'JavaScriptのエラーをAIに相談する際のコツは？',
          options: [
            '「動きません」とだけ伝える',
            'エラーメッセージとコードを一緒に共有する',
            'ファイル名だけ伝える',
            'スクリーンショットだけ送る',
          ],
          correctIndex: 1,
          explanation: 'エラーメッセージと関連するコードを共有することで、AIが正確に原因を特定できます',
        },
      ],
    },
  ],
};
