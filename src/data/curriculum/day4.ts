import { DayCurriculum } from '@/types';

export const day4: DayCurriculum = {
  dayId: 4,
  title: '実践プロジェクト',
  description: 'ロールに合わせた実践的なプロジェクトに挑戦し、AIとの協働スキルを磨こう',
  emoji: '🔨',
  quests: [
    // ========== Frontend Engineer ==========
    {
      id: 'day4-fe-quest1',
      dayId: 4,
      title: 'Todoアプリを作ろう',
      description: 'AIと協力してTodoアプリを一から構築し、フロントエンド開発の実践力を身につけよう',
      difficulty: 4,
      estimatedMinutes: 30,
      targetRoles: ['frontend-engineer'],
      steps: [
        {
          title: 'プロジェクトの設計',
          content: 'AIにTodoアプリの要件を伝え、コンポーネント構成を一緒に設計する',
        },
        {
          title: 'コンポーネントの作成',
          content: 'AIと対話しながらTodoList、TodoItem、AddTodoフォームを作成',
        },
        {
          title: '状態管理の実装',
          content: 'useStateやuseReducerを使ったTodoの追加・削除・完了切替を実装',
        },
        {
          title: 'スタイリング',
          content: 'CSSやTailwindを使って見た目を整え、レスポンシブ対応する',
        },
        {
          title: '動作確認とリファクタリング',
          content: '完成したアプリを動作確認し、AIにコード改善を提案してもらう',
        },
      ],
      challenge: 'AIと協力して、追加・削除・完了機能付きのTodoアプリを完成させよう',
      hints: [
        'まず要件を明確にしてからAIに伝えると、質の高いコードが生成される',
        'コンポーネントを小さく分けて一つずつ作っていくと管理しやすい',
      ],
      checkQuestions: [
        {
          question: 'AIと一緒にアプリを開発する際に最も重要なことは？',
          options: [
            '全てのコードをAIに一度に生成させる',
            '要件を明確にして段階的に開発を進める',
            'AIの提案をそのまま使う',
            'できるだけ多くの機能を一度に実装する',
          ],
          correctIndex: 1,
          explanation: '要件を明確にして段階的に進めることで、AIからより正確で管理しやすいコードが得られます',
        },
      ],
    },
    {
      id: 'day4-fe-quest2',
      dayId: 4,
      title: 'ダッシュボードを作ろう',
      description: 'データ可視化ダッシュボードをAIと一緒に構築し、実践的なUI開発を体験しよう',
      difficulty: 4,
      estimatedMinutes: 30,
      targetRoles: ['frontend-engineer'],
      steps: [
        {
          title: 'ダッシュボードの設計',
          content: '表示するデータとレイアウトをAIと一緒に設計する',
        },
        {
          title: 'グリッドレイアウトの構築',
          content: 'CSS GridやFlexboxを使ってカードベースのレイアウトを作成',
        },
        {
          title: 'チャートの実装',
          content: 'AIにChart.jsやRechartsを使ったグラフコンポーネントの作成を依頼',
        },
        {
          title: 'データ表示カードの作成',
          content: 'KPI表示カードやステータスカードをコンポーネント化',
        },
        {
          title: 'レスポンシブ対応',
          content: 'モバイル・タブレット・デスクトップに対応したレイアウト調整',
        },
      ],
      challenge: '3種類以上のデータ可視化コンポーネントを含むダッシュボードを構築しよう',
      hints: [
        'モックデータを先に準備してから、表示部分を実装すると効率的',
        'AIにチャートライブラリの使い方を聞きながら進めよう',
      ],
      checkQuestions: [
        {
          question: 'ダッシュボード開発でAIを活用する最も効果的な場面は？',
          options: [
            'デザインの配色選び',
            'チャートライブラリの設定コード生成',
            'ブラウザの選択',
            'ドメイン名の決定',
          ],
          correctIndex: 1,
          explanation: 'チャートライブラリは設定が複雑なため、AIにコード生成を依頼すると大幅に時間を短縮できます',
        },
      ],
    },
    {
      id: 'day4-fe-quest3',
      dayId: 4,
      title: 'リファクタリング実践',
      description: '既存の品質が低いコードをAIと一緒に分析・改善し、リファクタリングスキルを磨こう',
      difficulty: 4,
      estimatedMinutes: 25,
      targetRoles: ['frontend-engineer'],
      steps: [
        {
          title: '問題のあるコードを確認',
          content: 'サンプルの悪いコードを読み、問題点を自分で考える',
        },
        {
          title: 'AIに分析を依頼',
          content: 'コードをAIに渡して問題点と改善案を提案してもらう',
        },
        {
          title: 'リファクタリングの実施',
          content: 'AIの提案をもとに、コードの構造・命名・責務分離を改善',
        },
        {
          title: '改善結果のレビュー',
          content: '改善後のコードをAIにレビューしてもらい、追加の改善点を確認',
        },
      ],
      challenge: '少なくとも3つの問題点を特定し、AIと一緒にコードを改善しよう',
      hints: [
        '「このコードの問題点を指摘して」とAIに聞くと具体的な改善案が得られる',
        'リファクタリングは一度に大きく変えず、小さなステップで進めよう',
      ],
      checkQuestions: [
        {
          question: 'リファクタリングでAIを活用する際のベストプラクティスは？',
          options: [
            'AIに全て任せて自分は確認しない',
            '問題点を自分で考えてからAIに相談する',
            'コード全体を一度に書き換える',
            'AIの提案は全て無視する',
          ],
          correctIndex: 1,
          explanation: 'まず自分で問題点を考えることで理解が深まり、AIの提案もより効果的に活用できます',
        },
      ],
    },
    // ========== Backend Engineer ==========
    {
      id: 'day4-be-quest1',
      dayId: 4,
      title: 'REST API構築',
      description: 'CRUD操作が可能なREST APIをAIと一緒に構築し、バックエンド開発を実践しよう',
      difficulty: 4,
      estimatedMinutes: 30,
      targetRoles: ['backend-engineer'],
      steps: [
        {
          title: 'APIの設計',
          content: 'エンドポイント、リクエスト/レスポンス形式をAIと設計する',
        },
        {
          title: 'プロジェクトのセットアップ',
          content: 'Express/FastAPIなどのフレームワークでプロジェクトを初期化',
        },
        {
          title: 'CRUDエンドポイントの実装',
          content: 'Create、Read、Update、Deleteの各エンドポイントを実装',
        },
        {
          title: 'バリデーションの追加',
          content: 'リクエストデータのバリデーションとエラーハンドリングを実装',
        },
        {
          title: 'テストと動作確認',
          content: 'curlやPostmanでAPIの動作を確認し、問題があればAIに修正を依頼',
        },
      ],
      challenge: '完全なCRUD操作が可能なREST APIを構築し、全エンドポイントの動作を確認しよう',
      hints: [
        'AIにOpenAPI仕様を生成してもらうとAPI設計が明確になる',
        'エラーハンドリングのパターンもAIに提案してもらおう',
      ],
      checkQuestions: [
        {
          question: 'REST APIのCRUDに対応するHTTPメソッドの組み合わせとして正しいのは？',
          options: [
            'GET, POST, PUT, DELETE',
            'READ, WRITE, UPDATE, REMOVE',
            'FETCH, SEND, CHANGE, DROP',
            'SELECT, INSERT, MODIFY, ERASE',
          ],
          correctIndex: 0,
          explanation: 'RESTfulなCRUD操作はGET（Read）、POST（Create）、PUT（Update）、DELETE（Delete）に対応します',
        },
      ],
    },
    {
      id: 'day4-be-quest2',
      dayId: 4,
      title: '認証システム',
      description: 'JWT認証をAIと一緒に実装し、セキュアなAPI構築のスキルを身につけよう',
      difficulty: 4,
      estimatedMinutes: 30,
      targetRoles: ['backend-engineer'],
      steps: [
        {
          title: '認証フローの設計',
          content: 'ユーザー登録・ログイン・トークン検証のフローをAIと設計する',
        },
        {
          title: 'ユーザー登録の実装',
          content: 'パスワードハッシュ化を含むユーザー登録エンドポイントを作成',
        },
        {
          title: 'ログイン・トークン発行',
          content: 'JWTトークンの生成とログインエンドポイントを実装',
        },
        {
          title: '認証ミドルウェアの作成',
          content: 'トークン検証を行うミドルウェアを作成し、保護ルートに適用',
        },
        {
          title: 'セキュリティの確認',
          content: 'AIにセキュリティ上の懸念点をレビューしてもらう',
        },
      ],
      challenge: 'JWT認証付きのAPIを構築し、認証済み/未認証のリクエストで異なる結果を確認しよう',
      hints: [
        'セキュリティに関する実装はAIの提案を鵜呑みにせず、必ずレビューしよう',
        'トークンの有効期限やリフレッシュトークンについてもAIに聞いてみよう',
      ],
      checkQuestions: [
        {
          question: 'JWTの構成要素として正しいのは？',
          options: [
            'ユーザー名、パスワード、トークン',
            'ヘッダー、ペイロード、署名',
            '公開鍵、秘密鍵、証明書',
            'セッションID、クッキー、キャッシュ',
          ],
          correctIndex: 1,
          explanation: 'JWTはヘッダー（Header）、ペイロード（Payload）、署名（Signature）の3つの部分で構成されます',
        },
      ],
    },
    {
      id: 'day4-be-quest3',
      dayId: 4,
      title: 'バッチ処理',
      description: 'データ処理スクリプトをAIと一緒に作成し、自動化スキルを向上させよう',
      difficulty: 4,
      estimatedMinutes: 25,
      targetRoles: ['backend-engineer'],
      steps: [
        {
          title: '処理要件の定義',
          content: 'バッチ処理で行いたいデータ変換や集計の要件を明確にする',
        },
        {
          title: 'スクリプトの作成',
          content: 'AIにデータ読み込み・変換・出力のスクリプトを生成してもらう',
        },
        {
          title: 'エラーハンドリング',
          content: '不正データや例外への対処を実装する',
        },
        {
          title: 'ログ出力の追加',
          content: '処理の進捗や結果をログに記録する機能を追加',
        },
      ],
      challenge: 'CSVデータを読み込み、変換して別形式で出力するバッチ処理を作成しよう',
      hints: [
        '処理の要件を具体的にAIに伝えるとより実用的なスクリプトが生成される',
        'テストデータを準備してから実装を始めると効率的',
      ],
      checkQuestions: [
        {
          question: 'バッチ処理の設計でAIに最初に伝えるべきことは？',
          options: [
            '使用するプログラミング言語',
            '入力データの形式と期待する出力',
            'サーバーのスペック',
            '実行するスケジュール',
          ],
          correctIndex: 1,
          explanation: '入力と出力を明確にすることで、AIはより的確な処理ロジックを提案できます',
        },
      ],
    },
    // ========== Web Designer ==========
    {
      id: 'day4-wd-quest1',
      dayId: 4,
      title: 'LP制作',
      description: 'ランディングページをAIと一緒にフルコーディングし、デザイン実装力を磨こう',
      difficulty: 3,
      estimatedMinutes: 30,
      targetRoles: ['web-designer'],
      steps: [
        {
          title: 'LPの構成を設計',
          content: 'ヒーロー、特徴、CTA等のセクション構成をAIと一緒に決める',
        },
        {
          title: 'HTMLマークアップ',
          content: 'セマンティックなHTML構造をAIに生成してもらう',
        },
        {
          title: 'CSSスタイリング',
          content: 'AIと協力してビジュアルデザインを実装する',
        },
        {
          title: 'レスポンシブ対応',
          content: 'モバイルファーストでレスポンシブデザインを実装',
        },
        {
          title: 'アニメーション追加',
          content: 'スクロールアニメーションやホバーエフェクトを追加',
        },
      ],
      challenge: 'ヒーロー・特徴・CTAセクションを含むLPを完成させよう',
      hints: [
        '参考にしたいデザインのURLやイメージをAIに伝えると具体的なコードが得られる',
        'セクションごとに分けて実装すると管理しやすい',
      ],
      checkQuestions: [
        {
          question: 'LP制作でAIを活用する効果的な方法は？',
          options: [
            'デザインを全てAIに任せる',
            'セクションごとに要件を伝えてコードを生成する',
            'AIは使わず手動で全て書く',
            '他のLPをそのままコピーする',
          ],
          correctIndex: 1,
          explanation: 'セクションごとに要件を伝えることで、意図に沿った質の高いコードが得られます',
        },
      ],
    },
    {
      id: 'day4-wd-quest2',
      dayId: 4,
      title: 'ポートフォリオ',
      description: 'ポートフォリオサイトをAIと一緒に構築し、自分の作品を魅力的に見せよう',
      difficulty: 3,
      estimatedMinutes: 30,
      targetRoles: ['web-designer'],
      steps: [
        {
          title: 'ポートフォリオの設計',
          content: '掲載する作品とサイト構成をAIと一緒に計画する',
        },
        {
          title: 'トップページの作成',
          content: '自己紹介とスキルセットを含むトップページを実装',
        },
        {
          title: '作品一覧ページ',
          content: 'ギャラリー形式の作品一覧をAIと一緒にコーディング',
        },
        {
          title: 'コンタクトページ',
          content: 'お問い合わせフォームを含むコンタクトページを作成',
        },
        {
          title: '仕上げとブラッシュアップ',
          content: 'AIにデザインのフィードバックをもらい最終調整',
        },
      ],
      challenge: '3ページ以上のポートフォリオサイトを構築しよう',
      hints: [
        '好きなポートフォリオサイトの特徴をAIに伝えると参考になるコードが得られる',
        'まずシンプルに作って徐々にブラッシュアップするのがコツ',
      ],
      checkQuestions: [
        {
          question: 'ポートフォリオサイト制作でAIに依頼すると効率的なのは？',
          options: [
            'ポートフォリオの内容・実績の作成',
            'レスポンシブ対応のCSSグリッドレイアウト',
            '作品の撮影と画像編集',
            'ドメインの取得と設定',
          ],
          correctIndex: 1,
          explanation: 'CSSレイアウトのコーディングはAIが得意な領域で、大幅な時間短縮が可能です',
        },
      ],
    },
    {
      id: 'day4-wd-quest3',
      dayId: 4,
      title: 'メールテンプレート',
      description: 'HTMLメールテンプレートをAIと一緒に作成し、クロスクライアント対応を学ぼう',
      difficulty: 3,
      estimatedMinutes: 25,
      targetRoles: ['web-designer'],
      steps: [
        {
          title: 'テンプレートの設計',
          content: 'メールの用途（ニュースレター等）とレイアウトを決める',
        },
        {
          title: 'テーブルレイアウトの構築',
          content: 'メールクライアント互換のテーブルベースHTMLをAIに生成してもらう',
        },
        {
          title: 'インラインCSSの適用',
          content: 'メールクライアント対応のためインラインスタイルを適用',
        },
        {
          title: 'レスポンシブ対応',
          content: 'モバイルメールクライアントでの表示に対応する',
        },
      ],
      challenge: 'PC・モバイル両対応のHTMLメールテンプレートを完成させよう',
      hints: [
        '「メールクライアント互換」とAIに伝えるとテーブルレイアウトのコードを生成してくれる',
        'OutlookやGmail等の各クライアントの制約をAIに聞いてみよう',
      ],
      checkQuestions: [
        {
          question: 'HTMLメールでテーブルレイアウトが使われる理由は？',
          options: [
            'テーブルの方がデザインが美しいから',
            '多くのメールクライアントで安定して表示されるから',
            'テーブルの方がコードが短いから',
            'HTMLの仕様で決められているから',
          ],
          correctIndex: 1,
          explanation: 'メールクライアントによってCSS対応が異なるため、テーブルレイアウトが最も安定して表示されます',
        },
      ],
    },
    // ========== Director ==========
    {
      id: 'day4-dir-quest1',
      dayId: 4,
      title: '新規事業提案書',
      description: 'AIを活用して新規事業の提案書を作成し、ビジネス文書作成スキルを磨こう',
      difficulty: 3,
      estimatedMinutes: 30,
      targetRoles: ['director'],
      steps: [
        {
          title: 'アイデアの整理',
          content: '事業アイデアをAIとブレインストーミングし、方向性を固める',
        },
        {
          title: '市場分析',
          content: 'AIに市場規模やターゲット顧客の分析フレームワークを提案してもらう',
        },
        {
          title: '提案書の構成作成',
          content: 'エグゼクティブサマリー、課題、解決策、収益モデルの構成を作成',
        },
        {
          title: '各セクションの執筆',
          content: 'AIと対話しながら各セクションの内容を充実させる',
        },
        {
          title: 'レビューと推敲',
          content: 'AIに提案書全体のレビューとフィードバックを依頼する',
        },
      ],
      challenge: '市場分析・課題・解決策・収益モデルを含む事業提案書を完成させよう',
      hints: [
        'AIに「経営者が知りたいポイント」を聞いてから構成を考えると説得力が増す',
        '数値やデータは自分で確認・調整することが重要',
      ],
      checkQuestions: [
        {
          question: 'AI活用で事業提案書を作成する際の注意点は？',
          options: [
            'AIが生成した数値データをそのまま使う',
            'AIの出力を検証し、自社の状況に合わせて調整する',
            '提案書の全内容をAIに任せる',
            'AIは使わず全て手動で書く',
          ],
          correctIndex: 1,
          explanation: 'AIの出力は参考情報として活用し、実際のデータや自社の状況に合わせて調整することが重要です',
        },
      ],
    },
    {
      id: 'day4-dir-quest2',
      dayId: 4,
      title: '競合分析レポート',
      description: 'AIを活用して競合調査レポートを効率的に作成しよう',
      difficulty: 3,
      estimatedMinutes: 25,
      targetRoles: ['director'],
      steps: [
        {
          title: '分析対象の選定',
          content: '競合企業・サービスのリストをAIと一緒に整理する',
        },
        {
          title: '分析フレームワークの設定',
          content: 'SWOT分析や4P分析などのフレームワークをAIに提案してもらう',
        },
        {
          title: '比較表の作成',
          content: '機能・価格・ターゲット等の比較表をAIと作成する',
        },
        {
          title: 'レポートの取りまとめ',
          content: '分析結果をもとに示唆と推奨アクションをまとめる',
        },
      ],
      challenge: '3社以上の競合を分析し、比較表と示唆を含むレポートを作成しよう',
      hints: [
        'AIに分析フレームワークの使い分けを聞くと適切な手法を選べる',
        '公開情報をもとに分析し、AIの推測に頼りすぎないようにしよう',
      ],
      checkQuestions: [
        {
          question: '競合分析でAIを活用する最も効果的な場面は？',
          options: [
            '競合の売上データの正確な取得',
            '分析フレームワークの選定と比較表のフォーマット作成',
            '競合の内部情報の調査',
            '競合企業の株価予測',
          ],
          correctIndex: 1,
          explanation: 'AIはフレームワークの提案やフォーマット作成が得意で、分析の構造化を効率的にサポートします',
        },
      ],
    },
    {
      id: 'day4-dir-quest3',
      dayId: 4,
      title: '運用ルールブック',
      description: 'チーム運用ルールの文書をAIと一緒に作成し、チームの生産性向上を目指そう',
      difficulty: 3,
      estimatedMinutes: 25,
      targetRoles: ['director'],
      steps: [
        {
          title: 'ルールの洗い出し',
          content: 'チーム運用に必要なルール項目をAIとブレインストーミング',
        },
        {
          title: '文書構成の設計',
          content: '目的、適用範囲、各ルールの詳細を含む構成を決める',
        },
        {
          title: '各ルールの記述',
          content: 'AIと協力して各ルールを具体的かつ分かりやすく記述する',
        },
        {
          title: 'レビューと改善',
          content: 'AIに文書全体の一貫性と分かりやすさをチェックしてもらう',
        },
      ],
      challenge: 'コミュニケーション・タスク管理・会議ルールを含む運用ルールブックを作成しよう',
      hints: [
        '既存のルールブックのテンプレートをAIに提案してもらうと効率的',
        'ルールは具体的なアクションレベルで記述すると実効性が高まる',
      ],
      checkQuestions: [
        {
          question: '運用ルールブック作成でAIの活用が最も適している工程は？',
          options: [
            'チームメンバーとの合意形成',
            '文書の構成・テンプレート作成と表現のブラッシュアップ',
            'ルールの適用と運用',
            'チームの人間関係の調整',
          ],
          correctIndex: 1,
          explanation: 'AIは文書の構成提案やテンプレート作成、表現の改善に優れており、効率的にルールブックを作成できます',
        },
      ],
    },
    // ========== Non-Engineer ==========
    {
      id: 'day4-ne-quest1',
      dayId: 4,
      title: '社内Wiki記事',
      description: 'AIを活用してWiki記事を効率的に作成し、ナレッジ共有を推進しよう',
      difficulty: 2,
      estimatedMinutes: 25,
      targetRoles: ['non-engineer', 'student-intern'],
      steps: [
        {
          title: 'トピックの選定',
          content: '社内で共有すべき知識やノウハウのトピックを決める',
        },
        {
          title: '構成の作成',
          content: 'AIに記事の構成（見出し・セクション）を提案してもらう',
        },
        {
          title: '本文の執筆',
          content: 'AIと対話しながら各セクションの内容を充実させる',
        },
        {
          title: '図表の追加指示',
          content: '必要な図表やスクリーンショットの挿入箇所を整理する',
        },
      ],
      challenge: '業務手順やノウハウをまとめたWiki記事を1本完成させよう',
      hints: [
        '読者のレベルをAIに伝えると適切な説明の粒度で書いてくれる',
        '「初心者にも分かるように」と指示すると丁寧な説明が得られる',
      ],
      checkQuestions: [
        {
          question: 'Wiki記事作成でAIを効果的に使うコツは？',
          options: [
            '全ての内容をAIに丸投げする',
            '読者の前提知識レベルを指定して執筆を依頼する',
            '既存の記事をそのままコピーする',
            '専門用語を多用して書いてもらう',
          ],
          correctIndex: 1,
          explanation: '読者のレベルを指定することで、AIは適切な説明の粒度と用語選びで記事を作成できます',
        },
      ],
    },
    {
      id: 'day4-ne-quest2',
      dayId: 4,
      title: 'FAQ整備',
      description: 'よくある質問集をAIと一緒に作成し、問い合わせ対応を効率化しよう',
      difficulty: 2,
      estimatedMinutes: 25,
      targetRoles: ['non-engineer', 'student-intern'],
      steps: [
        {
          title: '質問の収集',
          content: 'よくある質問をリストアップし、カテゴリ分けする',
        },
        {
          title: '回答の作成',
          content: 'AIに各質問への回答案を生成してもらう',
        },
        {
          title: '回答の精査',
          content: 'AI生成の回答を実際の業務に合わせて調整・修正する',
        },
        {
          title: 'フォーマットの統一',
          content: 'AIに全体のフォーマットを統一してもらい、読みやすく整形する',
        },
      ],
      challenge: '10件以上のQ&Aを含むFAQ文書を完成させよう',
      hints: [
        '実際に受けた質問をベースにすると実用的なFAQになる',
        'カテゴリごとにまとめると検索しやすいFAQになる',
      ],
      checkQuestions: [
        {
          question: 'FAQ作成でAIが最も役立つ場面は？',
          options: [
            '社内の機密情報を回答に含める',
            '質問に対する回答のドラフト作成と表現の統一',
            'FAQページのサーバー管理',
            '顧客の個人情報の整理',
          ],
          correctIndex: 1,
          explanation: 'AIは回答のドラフト作成と文体・フォーマットの統一に優れており、FAQ作成を大幅に効率化できます',
        },
      ],
    },
    {
      id: 'day4-ne-quest3',
      dayId: 4,
      title: '自動化スクリプト',
      description: '簡単な自動化スクリプトをAIと一緒に作成し、日常業務の効率化を体験しよう',
      difficulty: 3,
      estimatedMinutes: 30,
      targetRoles: ['non-engineer', 'student-intern'],
      steps: [
        {
          title: '自動化したい作業の特定',
          content: '日常業務で繰り返し行っている作業を洗い出す',
        },
        {
          title: 'AIに要件を説明',
          content: '自動化したい作業の手順をAIに詳しく説明する',
        },
        {
          title: 'スクリプトの生成',
          content: 'AIにスクリプトを生成してもらい、各行の意味を教えてもらう',
        },
        {
          title: '実行と動作確認',
          content: 'スクリプトを実行して期待通りに動くか確認する',
        },
        {
          title: 'カスタマイズ',
          content: '自分の業務に合わせてスクリプトを調整する',
        },
      ],
      challenge: '日常業務の1つを自動化するスクリプトを作成し、実際に動かしてみよう',
      hints: [
        'まずは簡単な作業（ファイル名変更、テキスト整形等）から始めよう',
        'AIに「プログラミング未経験者向けに説明して」と伝えると分かりやすい解説が得られる',
      ],
      checkQuestions: [
        {
          question: 'プログラミング未経験者がAIで自動化する際のコツは？',
          options: [
            '最初から複雑な自動化に挑戦する',
            'スクリプトの内容を理解せずに実行する',
            '簡単な作業から始め、AIに各行の説明を求める',
            'エラーが出たら諦める',
          ],
          correctIndex: 2,
          explanation: '簡単な作業から始め、AIに丁寧な説明を求めることで、安全に自動化スキルを身につけられます',
        },
      ],
    },
  ],
};
