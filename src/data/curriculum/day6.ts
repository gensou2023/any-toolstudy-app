import { DayCurriculum } from '@/types';

export const day6: DayCurriculum = {
  dayId: 6,
  title: 'HTML/CSS基礎 — Webページの仕組み',
  description: 'HTMLとCSSの基本を学び、Webページがどのように作られているかを理解しよう',
  emoji: '🌐',
  quests: [
    {
      id: 'day6-intern-quest1',
      dayId: 6,
      title: 'HTMLタグ入門',
      description: 'HTMLの基本タグを学び、Webページの骨組みを作れるようになろう',
      difficulty: 1,
      estimatedMinutes: 15,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'HTMLとは何かを知る',
          content: 'CursorのAIチャットで「HTMLとは何ですか？初心者向けに教えて」と聞いてみよう',
        },
        {
          title: '基本タグを学ぶ',
          content: 'html, head, body, h1〜h6, p, a, img などの基本タグの役割を理解する',
        },
        {
          title: 'HTMLファイルを作成する',
          content: 'Cursorで index.html ファイルを作成し、基本的なHTML構造を書いてみよう',
        },
        {
          title: 'ブラウザで確認する',
          content: '作成したHTMLファイルをブラウザで開いて表示を確認しよう',
        },
      ],
      challenge: '自己紹介ページのHTMLを作成し、見出し・段落・リンク・画像タグを使ってみよう',
      hints: [
        'AIに「HTMLの基本テンプレートを作って」と頼むと雛形がもらえる',
        'タグは<開始タグ>内容</終了タグ>の形式で書く',
      ],
      checkQuestions: [
        {
          question: 'HTMLで見出しを表すタグはどれ？',
          options: ['<p>', '<h1>', '<a>', '<div>'],
          correctIndex: 1,
          explanation: '<h1>〜<h6>タグは見出しを表します。数字が小さいほど大きい見出しです',
        },
      ],
    },
    {
      id: 'day6-intern-quest2',
      dayId: 6,
      title: 'CSSスタイリング入門',
      description: 'CSSを使ってHTMLページに色やレイアウトを追加する方法を学ぼう',
      difficulty: 1,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'CSSの基本を知る',
          content: 'AIに「CSSとは何ですか？HTMLとの関係を教えて」と聞いてみよう',
        },
        {
          title: 'CSSの書き方を学ぶ',
          content: 'セレクタ、プロパティ、値の書き方を理解する。例: h1 { color: blue; }',
        },
        {
          title: 'スタイルを適用する',
          content: 'HTMLファイルに<style>タグでCSSを追加し、文字色や背景色を変えてみよう',
        },
        {
          title: 'よく使うプロパティを試す',
          content: 'color, background-color, font-size, margin, padding を使ってみよう',
        },
      ],
      challenge: '自己紹介ページにCSSを追加して、色・フォントサイズ・余白を設定しよう',
      hints: [
        'AIに「このHTMLをおしゃれにするCSSを書いて」と頼んでみよう',
        'DevToolsで要素を選択するとCSSをリアルタイムで変更できる',
      ],
      checkQuestions: [
        {
          question: 'CSSで文字色を変えるプロパティは？',
          options: ['font-size', 'background-color', 'color', 'margin'],
          correctIndex: 2,
          explanation: 'color プロパティで文字色を変更できます',
        },
      ],
    },
    {
      id: 'day6-intern-quest3',
      dayId: 6,
      title: 'レスポンシブデザイン入門',
      description: 'スマートフォンでもPCでもきれいに表示されるページの作り方を学ぼう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'レスポンシブデザインとは',
          content: 'AIに「レスポンシブデザインとは何ですか？なぜ必要ですか？」と聞いてみよう',
        },
        {
          title: 'viewportメタタグを追加する',
          content: 'HTMLのheadに<meta name="viewport">タグを追加する',
        },
        {
          title: 'メディアクエリを学ぶ',
          content: '@media (max-width: 768px) { } の書き方を学び、スマホ用スタイルを追加する',
        },
        {
          title: 'DevToolsで確認する',
          content: 'ブラウザの開発者ツールでスマートフォン表示をシミュレートして確認しよう',
        },
      ],
      challenge: '自己紹介ページをスマートフォンでも見やすく調整しよう',
      hints: [
        'AIに「このCSSをレスポンシブ対応にして」と依頼すると修正案をもらえる',
        'Chrome DevToolsのデバイスモードで表示を確認できる',
      ],
      checkQuestions: [
        {
          question: 'レスポンシブデザインで使うCSS機能は？',
          options: ['アニメーション', 'メディアクエリ', 'フォント', 'カラーパレット'],
          correctIndex: 1,
          explanation: 'メディアクエリ（@media）を使って画面サイズに応じたスタイルを適用します',
        },
      ],
    },
    {
      id: 'day6-intern-quest4',
      dayId: 6,
      title: 'CursorでWebページコーディング',
      description: 'Cursorの AI機能をフル活用してWebページを効率よくコーディングしよう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'AIにページ全体を依頼する',
          content: 'AIに「カフェのメニューページをHTML/CSSで作って」のように具体的にお願いしてみよう',
        },
        {
          title: '生成されたコードを理解する',
          content: 'AIが生成したHTMLとCSSを読み、各部分の役割をAIに質問しよう',
        },
        {
          title: '自分でカスタマイズする',
          content: 'AIのコードを修正して自分の好みにカスタマイズしよう',
        },
        {
          title: 'Cmd+K でインライン編集',
          content: 'コードを選択してCmd+Kで「この部分をもっとおしゃれに」などインライン編集を試そう',
        },
      ],
      challenge: 'AIと協力してオリジナルのWebページを1ページ完成させよう',
      hints: [
        '具体的な要望（色、レイアウト、内容）を伝えるほど良い結果が得られる',
        'Cmd+L でAIチャット、Cmd+K でインライン編集を使い分けよう',
      ],
      checkQuestions: [
        {
          question: 'CursorでWebコーディングを効率化するコツは？',
          options: [
            'すべて手動で書く',
            'AIに全部任せて中身を見ない',
            'AIに生成を依頼し、結果を理解してカスタマイズする',
            'テンプレートだけ使う',
          ],
          correctIndex: 2,
          explanation: 'AIに生成してもらったコードを理解し、自分でカスタマイズすることで効率よく学べます',
        },
      ],
    },
  ],
};
