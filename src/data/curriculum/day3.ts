import { DayCurriculum } from '@/types';

export const day3: DayCurriculum = {
  dayId: 3,
  title: '職種別スキルアップ',
  description: '各職種に特化したスキルを磨こう',
  emoji: '🎯',
  quests: [
    // ========================================
    // Frontend Engineer Quests
    // ========================================
    {
      id: 'day3-fe-quest1',
      dayId: 3,
      title: 'Reactコンポーネント生成',
      description: 'AIを活用してReactコンポーネントを効率的に生成する方法を学びます。Props設計からスタイリングまで一気に作成しましょう。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['frontend-engineer'],
      steps: [
        {
          title: 'コンポーネントの要件を整理する',
          content: '作りたいコンポーネントの目的、受け取るProps、見た目のイメージをテキストで整理する',
        },
        {
          title: 'AIにProps設計を依頼する',
          content: 'チャットで「以下の要件でReactコンポーネントのPropsインターフェースを設計して」と依頼し、型定義を生成させる',
        },
        {
          title: 'JSXの生成を依頼する',
          content: '生成されたPropsに基づいて「このPropsを使ったJSXを生成して」と続けて依頼する',
        },
        {
          title: 'スタイリングを追加する',
          content: 'AIに「このコンポーネントにTailwind CSS / CSS Modulesでスタイルを追加して」と依頼する',
        },
        {
          title: 'コードを確認して調整する',
          content: '生成されたコードをレビューし、不要な部分を削除・修正してファイルに保存する',
        },
      ],
      challenge: 'AIを使って再利用可能なButtonコンポーネントをTypeScriptで作成しよう',
      hints: [
        'コンポーネントの用途やバリエーション（primary, secondary等）を具体的に指示すると良い結果が得られる',
        'AIに「Storybookのストーリーも一緒に作って」と追加依頼すると、使用例も一緒に生成できる',
      ],
      checkQuestions: [
        {
          question: 'Reactコンポーネントのベストプラクティスは？',
          options: [
            'すべてのPropsをany型にする',
            'Propsの型定義を明確にする',
            'クラスコンポーネントのみ使う',
            'グローバル変数でデータを管理する',
          ],
          correctIndex: 1,
          explanation: 'TypeScriptでPropsの型定義を明確にすることで、型安全性が向上し、コンポーネントの使い方が分かりやすくなります',
        },
      ],
    },
    {
      id: 'day3-fe-quest2',
      dayId: 3,
      title: 'CSSデバッグ',
      description: 'レイアウト崩れやスタイルの問題をAIの力で素早く解決する方法を身につけましょう。',
      difficulty: 3,
      estimatedMinutes: 15,
      targetRoles: ['frontend-engineer'],
      steps: [
        {
          title: '問題のあるレイアウトを用意する',
          content: '意図的にFlexboxやGridのレイアウトが崩れたHTMLとCSSを作成する',
        },
        {
          title: 'AIにレイアウト解析を依頼する',
          content: '崩れたCSSコードをチャットに貼り付け、「このレイアウトの問題点を分析して」と依頼する',
        },
        {
          title: '修正案を適用する',
          content: 'AIが提案した修正コードを適用し、ブラウザで表示を確認する',
        },
        {
          title: 'レスポンシブ対応を確認する',
          content: 'AIに「このレイアウトをレスポンシブ対応させて」と依頼し、メディアクエリの追加を確認する',
        },
      ],
      challenge: '意図的にレイアウトを崩し、AIの助けで修正しよう',
      hints: [
        'DevToolsで要素を検証した結果も一緒にAIに共有すると、より正確な回答が得られる',
        '「期待する表示」と「実際の表示」の両方をAIに説明すると修正が早い',
      ],
      checkQuestions: [
        {
          question: 'CSSの問題をAIに相談する時のコツは？',
          options: [
            '「CSSが壊れた」とだけ伝える',
            'スクリーンショットや具体的なCSSコードを共有する',
            'ブラウザ名だけ伝える',
            'HTML全体を送る必要はない',
          ],
          correctIndex: 1,
          explanation: '具体的なCSSコードや再現手順、スクリーンショットを共有することで、AIはより正確に問題を特定できます',
        },
      ],
    },
    {
      id: 'day3-fe-quest3',
      dayId: 3,
      title: 'TypeScript型定義',
      description: 'AIを使ってTypeScriptのインターフェースや型を効率的に生成する方法を学びます。ジェネリクスやユニオン型も活用しましょう。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['frontend-engineer'],
      steps: [
        {
          title: 'APIレスポンスのサンプルを用意する',
          content: 'ブラウザのDevToolsやAPIクライアントで実際のJSONレスポンスをコピーする',
        },
        {
          title: 'AIに型定義を生成させる',
          content: 'JSONデータをチャットに貼り付け、「このJSONからTypeScriptのインターフェースを生成して」と依頼する',
        },
        {
          title: 'ジェネリクスの活用を依頼する',
          content: 'AIに「APIレスポンスの共通パターンをジェネリクスで表現して」と依頼し、再利用可能な型を作成する',
        },
        {
          title: 'ユニオン型とリテラル型を活用する',
          content: 'ステータスや種別などの列挙値にユニオン型を適用するようAIに依頼する',
        },
        {
          title: '型定義ファイルを整理する',
          content: '生成された型定義をtypes/ディレクトリに整理して保存する',
        },
      ],
      challenge: 'APIレスポンスの型定義をAIに生成させよう',
      hints: [
        'JSONサンプルデータを渡すと、AIは正確な型を推論してくれる',
        'optionalなフィールドがある場合は「nullの可能性があるフィールドも考慮して」と伝えるとよい',
      ],
      checkQuestions: [
        {
          question: 'TypeScriptの型をAIに作ってもらう時は？',
          options: [
            '型名だけ伝えればよい',
            'JSONサンプルデータを渡す',
            'JavaScriptのコードを渡す',
            '何も渡さなくてよい',
          ],
          correctIndex: 1,
          explanation: '実際のJSONサンプルデータを渡すことで、AIはフィールド名・型・ネスト構造を正確に把握して型定義を生成できます',
        },
      ],
    },
    {
      id: 'day3-fe-quest4',
      dayId: 3,
      title: 'テスト自動生成',
      description: 'Jest / React Testing Libraryのテストコードをを活用して自動生成する方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['frontend-engineer'],
      steps: [
        {
          title: 'テスト対象のコンポーネントを選ぶ',
          content: 'プロジェクト内の既存コンポーネントを1つ選んで、テストファイルを作成する準備をする',
        },
        {
          title: 'AIにテストコードの生成を依頼する',
          content: 'コンポーネントのコードをチャットに貼り付け、「このコンポーネントのJest / React Testing Libraryテストを書いて」と依頼する',
        },
        {
          title: 'テストケースを確認・追加する',
          content: '生成されたテストを確認し、「エッジケースのテストも追加して」と依頼する',
        },
        {
          title: 'テストを実行する',
          content: 'ターミナルでnpm testを実行し、テストが正しく動作することを確認する',
        },
      ],
      challenge: '既存コンポーネントのテストをAIで自動生成しよう',
      hints: [
        'テスト対象のコンポーネントだけでなく、依存するPropsの型情報もAIに渡すとより正確なテストが生成される',
        'AIに「カバレッジ100%を目指して」と依頼すると、網羅的なテストが得られる',
      ],
      checkQuestions: [
        {
          question: 'AIでテストを生成する際に最も重要なことは？',
          options: [
            'テスト対象のコードをAIに渡すこと',
            'テストフレームワークの名前だけ伝えること',
            'テストファイル名を指定すること',
            'テスト数を最初に決めること',
          ],
          correctIndex: 0,
          explanation: 'テスト対象のソースコードとその依存関係をAIに渡すことで、適切なテストケースを生成できます',
        },
      ],
    },
    {
      id: 'day3-fe-quest5',
      dayId: 3,
      title: 'リファクタリング',
      description: '複雑になったコンポーネントをAIの力で整理・改善する方法を学びます。カスタムフックの抽出や状態管理の最適化に取り組みましょう。',
      difficulty: 4,
      estimatedMinutes: 20,
      targetRoles: ['frontend-engineer'],
      steps: [
        {
          title: 'リファクタリング対象を特定する',
          content: '100行以上の長いコンポーネントや、複数の責務を持つコンポーネントを選ぶ',
        },
        {
          title: 'AIに改善提案を依頼する',
          content: 'コードをチャットに貼り付け、「このコンポーネントのリファクタリング提案をして」と依頼する',
        },
        {
          title: 'カスタムフックの抽出を依頼する',
          content: 'AIに「ロジック部分をカスタムフックに抽出して」と依頼し、関心の分離を行う',
        },
        {
          title: 'コンポーネントの分割を行う',
          content: 'AIの提案に従って、大きなコンポーネントを小さなサブコンポーネントに分割する',
        },
        {
          title: 'リファクタリング結果を確認する',
          content: '分割後のコードが正しく動作することをブラウザで確認し、テストも実行する',
        },
      ],
      challenge: '100行以上のコンポーネントをAIと協力してリファクタリングしよう',
      hints: [
        'まずAIに「このコードの問題点を列挙して」と聞くと、改善すべきポイントが明確になる',
        'リファクタリングは段階的に行い、各ステップで動作確認するのがベストプラクティス',
      ],
      checkQuestions: [
        {
          question: 'Reactコンポーネントのリファクタリングで効果的な手法は？',
          options: [
            'すべてのstateをグローバルに移動する',
            'カスタムフックを使ってロジックを分離する',
            'コンポーネントを1つのファイルにまとめる',
            'TypeScriptをやめてJavaScriptに戻す',
          ],
          correctIndex: 1,
          explanation: 'カスタムフックを使うことで、UIとロジックを分離し、再利用性とテスタビリティが向上します',
        },
      ],
    },
    {
      id: 'day3-fe-quest6',
      dayId: 3,
      title: 'パフォーマンス最適化',
      description: 'React.memo、useMemo、useCallbackなどを活用し、AIの力でパフォーマンスを改善する方法を学びます。',
      difficulty: 4,
      estimatedMinutes: 20,
      targetRoles: ['frontend-engineer'],
      steps: [
        {
          title: 'パフォーマンス問題を確認する',
          content: 'React DevToolsのProfilerで不要な再レンダリングが起きている箇所を特定する',
        },
        {
          title: 'AIにパフォーマンスレビューを依頼する',
          content: 'コンポーネントのコードを貼り付け、「パフォーマンスの問題点を分析して」と依頼する',
        },
        {
          title: 'memo化の提案を適用する',
          content: 'AIが提案するReact.memo、useMemo、useCallbackの適用箇所を確認し、コードに反映する',
        },
        {
          title: 'コード分割を検討する',
          content: 'AIに「このコンポーネントにlazy loadingを適用する方法を教えて」と依頼し、動的インポートを活用する',
        },
        {
          title: '最適化結果を計測する',
          content: '再度Profilerで計測し、レンダリング回数やレンダリング時間が改善されたか確認する',
        },
      ],
      challenge: 'AIにパフォーマンスレビューを依頼し、最適化を実施しよう',
      hints: [
        'React DevToolsのHighlight updatesをオンにすると、不要な再レンダリングが視覚的に確認できる',
        'useMemoやuseCallbackの乱用は逆効果になることもある。AIに「本当に必要か」も聞いてみよう',
      ],
      checkQuestions: [
        {
          question: 'Reactのパフォーマンス最適化で正しいのは？',
          options: [
            'すべてのコンポーネントにReact.memoを付ける',
            '必要な箇所を特定してから最適化する',
            'useStateを使わないようにする',
            'CSSアニメーションをすべて削除する',
          ],
          correctIndex: 1,
          explanation: '闇雲にmemo化するのではなく、Profilerで問題箇所を特定してから最適化することが重要です',
        },
      ],
    },

    // ========================================
    // Backend Engineer Quests
    // ========================================
    {
      id: 'day3-be-quest1',
      dayId: 3,
      title: 'API設計',
      description: 'REST APIの設計をAIに支援してもらう方法を学びます。エンドポイント設計からリクエスト/レスポンス定義まで一貫して作成しましょう。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['backend-engineer'],
      steps: [
        {
          title: 'API の要件を整理する',
          content: '必要なリソース（ユーザー、商品、注文など）と操作（CRUD）を洗い出す',
        },
        {
          title: 'AIにエンドポイント設計を依頼する',
          content: 'チャットで「ユーザー管理のREST APIエンドポイントを設計して」と依頼し、URLパスとHTTPメソッドの一覧を生成させる',
        },
        {
          title: 'リクエスト・レスポンス定義を作成する',
          content: 'AIに各エンドポイントのリクエストボディとレスポンスのJSON形式を定義させる',
        },
        {
          title: 'エラーレスポンスを定義する',
          content: 'AIに「各エンドポイントで発生し得るエラーレスポンスも定義して」と依頼する',
        },
        {
          title: 'API仕様書としてまとめる',
          content: '生成された内容をOpenAPI（Swagger）形式でまとめるようAIに依頼する',
        },
      ],
      challenge: 'ユーザー管理APIの設計書をAIと作成しよう',
      hints: [
        'REST APIの命名規則（複数形のリソース名、ケバブケースなど）をAIに守らせるよう指示する',
        'ページネーション、フィルタリング、ソートのパラメータ設計もAIに依頼できる',
      ],
      checkQuestions: [
        {
          question: 'REST APIの設計でAIを活用する際のポイントは？',
          options: [
            'エンドポイントのURL だけ決めれば十分',
            '要件を明確にしてリクエスト・レスポンス形式まで定義させる',
            'HTTPメソッドはGETだけ使えばよい',
            'エラーレスポンスは不要',
          ],
          correctIndex: 1,
          explanation: '要件を明確に伝え、エンドポイント・リクエスト・レスポンス・エラーまで一貫して定義することで、実装しやすいAPI設計書が作成できます',
        },
      ],
    },
    {
      id: 'day3-be-quest2',
      dayId: 3,
      title: 'DBスキーマ設計',
      description: 'データベースのテーブル設計をAIに支援してもらい、リレーション設計やマイグレーションファイルの生成まで行います。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['backend-engineer'],
      steps: [
        {
          title: '必要なエンティティを洗い出す',
          content: 'システムに必要なデータ（ユーザー、商品、注文、カテゴリなど）をリストアップする',
        },
        {
          title: 'AIにテーブル設計を依頼する',
          content: 'エンティティの一覧をAIに渡し、「ECサイト向けのテーブル設計をして」と依頼する',
        },
        {
          title: 'リレーションを確認する',
          content: 'AIが設計した外部キーやリレーションシップが適切か確認し、必要に応じて修正を依頼する',
        },
        {
          title: 'インデックス設計を依頼する',
          content: 'AIに「よく使うクエリパターンに基づいてインデックスを設計して」と依頼する',
        },
        {
          title: 'マイグレーションファイルを生成する',
          content: 'AIに「この設計のマイグレーションファイルを生成して」と依頼し、SQL またはORM形式で出力させる',
        },
      ],
      challenge: 'ECサイトのDBスキーマをAIに設計させよう',
      hints: [
        'ER図のテキスト表現（Mermaid記法など）もAIに出力させると、全体像が把握しやすい',
        '正規化のレベルや、パフォーマンスのためのデノーマライゼーションの判断もAIに相談できる',
      ],
      checkQuestions: [
        {
          question: 'DBスキーマ設計をAIに依頼する際に大切なことは？',
          options: [
            'テーブル名だけ伝えればよい',
            'すべてのカラムをTEXT型にする',
            'エンティティ間の関係性と業務要件を明確に伝える',
            'インデックスは後から考えればよい',
          ],
          correctIndex: 2,
          explanation: 'エンティティ間の関係性や業務要件を明確に伝えることで、適切なリレーションやカラム定義を含むスキーマが設計されます',
        },
      ],
    },
    {
      id: 'day3-be-quest3',
      dayId: 3,
      title: 'エラーハンドリング',
      description: '適切なエラー処理パターンをAIに生成させ、堅牢なAPIを構築する方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 15,
      targetRoles: ['backend-engineer'],
      steps: [
        {
          title: 'エラーパターンを洗い出す',
          content: 'APIで発生しうるエラー（バリデーションエラー、認証エラー、DB接続エラー等）をリストアップする',
        },
        {
          title: 'AIにエラーハンドリングの実装を依頼する',
          content: 'エラーパターンを伝え、「これらのエラーを適切に処理するミドルウェアを作って」と依頼する',
        },
        {
          title: 'カスタムエラークラスを作成する',
          content: 'AIに「HTTPステータスコードと対応するカスタムエラークラスを設計して」と依頼する',
        },
        {
          title: 'エラーレスポンスの統一フォーマットを定義する',
          content: 'AIに「統一されたエラーレスポンスのJSON形式を設計して」と依頼し、コードに適用する',
        },
      ],
      challenge: 'APIエンドポイントに適切なエラーハンドリングを追加しよう',
      hints: [
        '本番環境ではスタックトレースを返さないようにする設計もAIに相談できる',
        'バリデーションライブラリ（Zod、Joi等）との連携方法もAIに聞くと効率的',
      ],
      checkQuestions: [
        {
          question: 'APIのエラーハンドリングで重要な原則は？',
          options: [
            'すべてのエラーを500で返す',
            'エラーメッセージにスタックトレースを含める',
            '適切なHTTPステータスコードと統一されたエラーフォーマットを使う',
            'エラーが起きたらサーバーを再起動する',
          ],
          correctIndex: 2,
          explanation: '適切なHTTPステータスコード（400, 401, 404, 500等）と統一されたエラーレスポンス形式を使うことで、クライアント側が適切にエラーを処理できます',
        },
      ],
    },
    {
      id: 'day3-be-quest4',
      dayId: 3,
      title: 'テスト生成',
      description: 'APIエンドポイントのユニットテスト・統合テストをAIで自動生成する方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['backend-engineer'],
      steps: [
        {
          title: 'テスト対象のAPIエンドポイントを選ぶ',
          content: 'プロジェクト内の既存APIエンドポイント（コントローラーやルートハンドラー）を1つ選ぶ',
        },
        {
          title: 'AIにユニットテストを生成させる',
          content: 'エンドポイントのコードを貼り付け、「このAPIのユニットテストを書いて」と依頼する',
        },
        {
          title: '統合テストを生成させる',
          content: 'AIに「同じエンドポイントの統合テスト（DBアクセスを含む）も書いて」と依頼する',
        },
        {
          title: 'モックの設計を確認する',
          content: 'AIが生成したモック（DB接続、外部API等）が適切か確認し、必要に応じて修正を依頼する',
        },
        {
          title: 'テストを実行して結果を確認する',
          content: 'ターミナルでテストを実行し、すべてのテストがパスすることを確認する',
        },
      ],
      challenge: 'APIエンドポイントのテストをAIで生成しよう',
      hints: [
        'テスト対象のコードだけでなく、依存するサービスやリポジトリのインターフェースもAIに渡すと正確なモックが生成される',
        '異常系テスト（不正入力、認証エラー等）も含めるようAIに指示するとカバレッジが上がる',
      ],
      checkQuestions: [
        {
          question: 'APIテストの自動生成で気をつけるべきことは？',
          options: [
            '正常系のテストだけ生成すればよい',
            'モックは使わずに本番DBに接続する',
            '正常系と異常系の両方を含め、モックが適切か確認する',
            'テスト実行せずにコミットしてよい',
          ],
          correctIndex: 2,
          explanation: '正常系・異常系の両方のテストケースを生成し、モックの設計が適切かレビューすることで、信頼性の高いテストスイートが構築できます',
        },
      ],
    },
    {
      id: 'day3-be-quest5',
      dayId: 3,
      title: 'セキュリティレビュー',
      description: 'AIにセキュリティ観点でコードレビューを依頼し、脆弱性の早期発見と対策を学びます。',
      difficulty: 4,
      estimatedMinutes: 20,
      targetRoles: ['backend-engineer'],
      steps: [
        {
          title: 'レビュー対象のコードを選ぶ',
          content: '認証・認可、データベースアクセス、ユーザー入力処理を含むコードを選択する',
        },
        {
          title: 'AIにセキュリティレビューを依頼する',
          content: 'コードを貼り付け、「このコードのセキュリティ上の問題点を指摘して」と依頼する',
        },
        {
          title: '脆弱性の修正を依頼する',
          content: 'AIが指摘した脆弱性について「修正コードを提示して」と依頼し、修正内容を確認する',
        },
        {
          title: 'セキュリティベストプラクティスを確認する',
          content: 'AIに「このプロジェクト全体で適用すべきセキュリティベストプラクティスをリストアップして」と依頼する',
        },
      ],
      challenge: '既存コードのセキュリティ問題をAIに指摘させよう',
      hints: [
        'OWASP Top 10の観点でレビューするようAIに指示すると、網羅的なチェックができる',
        'SQLインジェクション、XSS、CSRF等の具体的な攻撃手法名をAIに伝えると、的確な指摘が得られる',
      ],
      checkQuestions: [
        {
          question: 'AIにセキュリティレビューを依頼する際のベストプラクティスは？',
          options: [
            'コード全体を一度に送る',
            '「問題ないか確認して」とだけ伝える',
            'OWASP Top 10などの基準を指定して具体的にレビューを依頼する',
            'フロントエンドのコードだけレビューすればよい',
          ],
          correctIndex: 2,
          explanation: 'OWASP Top 10など具体的なセキュリティ基準を指定することで、AIは体系的かつ網羅的にコードの脆弱性をチェックできます',
        },
      ],
    },
    {
      id: 'day3-be-quest6',
      dayId: 3,
      title: 'ドキュメント自動生成',
      description: 'APIドキュメントやコードコメント、READMEをAIで自動生成する方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 15,
      targetRoles: ['backend-engineer'],
      steps: [
        {
          title: 'ドキュメント対象のコードを準備する',
          content: 'ドキュメント化したいAPIエンドポイントやモジュールのコードを用意する',
        },
        {
          title: 'APIドキュメントを生成する',
          content: 'AIに「このAPIのドキュメントをOpenAPI形式で生成して」と依頼する',
        },
        {
          title: 'コードコメントを追加する',
          content: 'AIに「このコードにJSDoc / TSDocコメントを追加して」と依頼し、関数やクラスの説明を自動生成する',
        },
        {
          title: 'READMEを生成する',
          content: 'AIに「このプロジェクトのREADME.mdを生成して。セットアップ手順、API一覧、環境変数の説明を含めて」と依頼する',
        },
      ],
      challenge: 'プロジェクトのAPIドキュメントをAIで自動生成しよう',
      hints: [
        '既存のドキュメントがある場合は、そのフォーマットに合わせるようAIに指示する',
        'リクエスト/レスポンスのサンプルも含めるようAIに依頼すると、実用的なドキュメントになる',
      ],
      checkQuestions: [
        {
          question: 'AIでドキュメントを生成する際の利点は？',
          options: [
            'ドキュメントが不要になる',
            'コードと一貫性のあるドキュメントを素早く作成できる',
            'ドキュメントを二度と更新しなくてよい',
            'コードの品質が自動的に上がる',
          ],
          correctIndex: 1,
          explanation: 'AIを使うことで、実際のコードに基づいた一貫性のあるドキュメントを短時間で生成できます。ただし、コード変更時の更新は引き続き必要です',
        },
      ],
    },

    // ========================================
    // Web Designer Quests
    // ========================================
    {
      id: 'day3-wd-quest1',
      dayId: 3,
      title: 'HTMLテンプレート',
      description: 'AIを活用してセマンティックなHTML構造を効率的に生成する方法を学びます。',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['web-designer'],
      steps: [
        {
          title: 'ページの構成を考える',
          content: 'ランディングページに必要なセクション（ヘッダー、ヒーロー、特徴、CTA、フッター等）を決める',
        },
        {
          title: 'AIにHTML構造を生成させる',
          content: 'チャットで「ランディングページのセマンティックなHTML構造を作って」と依頼する',
        },
        {
          title: 'セマンティックHTMLを確認する',
          content: 'header, nav, main, section, article, footer等のセマンティックタグが適切に使われているか確認する',
        },
        {
          title: 'アクセシビリティ対応を依頼する',
          content: 'AIに「ARIA属性やalt属性など、アクセシビリティに配慮した属性を追加して」と依頼する',
        },
      ],
      challenge: 'ランディングページのHTMLテンプレートをAIで作成しよう',
      hints: [
        'セクションごとに分けてAIに依頼すると、より詳細なHTMLが生成される',
        '参考にしたいサイトのURLや構成を伝えると、イメージに近いHTMLが生成される',
      ],
      checkQuestions: [
        {
          question: 'セマンティックHTMLの利点は？',
          options: [
            '見た目が自動的にきれいになる',
            'SEOとアクセシビリティが向上する',
            'CSSが不要になる',
            'JavaScriptの実行速度が上がる',
          ],
          correctIndex: 1,
          explanation: 'セマンティックHTMLを使うことで、検索エンジンやスクリーンリーダーがコンテンツの意味を正しく理解でき、SEOとアクセシビリティが向上します',
        },
      ],
    },
    {
      id: 'day3-wd-quest2',
      dayId: 3,
      title: 'CSSアニメーション',
      description: 'transition や keyframes を使ったCSSアニメーションをAIに生成させ、インタラクティブなUIを作成しましょう。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['web-designer'],
      steps: [
        {
          title: 'アニメーションのイメージを考える',
          content: 'どんなアニメーション（フェードイン、スライド、回転等）を作りたいか具体的にイメージする',
        },
        {
          title: 'AIにtransitionアニメーションを依頼する',
          content: '「ボタンのホバー時にスムーズに色が変わるtransitionを作って」とAIに依頼する',
        },
        {
          title: 'keyframesアニメーションを生成する',
          content: 'AIに「ローディングスピナーのkeyframesアニメーションを3パターン作って」と依頼する',
        },
        {
          title: 'アニメーションを組み合わせる',
          content: '複数のアニメーションを組み合わせて、ページ全体のアニメーション体験を設計する',
        },
        {
          title: 'パフォーマンスを最適化する',
          content: 'AIに「GPU加速が効くプロパティだけを使ったアニメーションに修正して」と依頼する',
        },
      ],
      challenge: 'ボタンのホバーアニメーションをAIで3パターン作成しよう',
      hints: [
        'transform と opacity はGPU加速が効くため、パフォーマンスが良い',
        'アニメーションの具体的な動き（方向、速さ、イージング）を言葉で説明するとAIが正確に生成できる',
      ],
      checkQuestions: [
        {
          question: 'CSSアニメーションでパフォーマンスが良いプロパティは？',
          options: [
            'width と height',
            'margin と padding',
            'transform と opacity',
            'top と left',
          ],
          correctIndex: 2,
          explanation: 'transformとopacityはGPUアクセラレーションが利用でき、他のプロパティに比べてパフォーマンスが優れています',
        },
      ],
    },
    {
      id: 'day3-wd-quest3',
      dayId: 3,
      title: 'レスポンシブ実装',
      description: 'メディアクエリやFlexbox/Gridを活用したレスポンシブデザインをAIで実装する方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['web-designer'],
      steps: [
        {
          title: 'ブレイクポイントを決める',
          content: 'モバイル（〜768px）、タブレット（769〜1024px）、デスクトップ（1025px〜）のブレイクポイントを設定する',
        },
        {
          title: 'AIにモバイルファーストのCSSを生成させる',
          content: '「モバイルファーストで3カラムレイアウトのレスポンシブCSSを作って」とAIに依頼する',
        },
        {
          title: 'Flexbox/Gridの使い分けを確認する',
          content: 'AIが生成したCSS でFlexboxとGridが適切に使い分けられているか確認する',
        },
        {
          title: '画像のレスポンシブ対応を追加する',
          content: 'AIに「画像をレスポンシブ対応（picture要素やsrcset）させて」と依頼する',
        },
        {
          title: '各デバイスで表示を確認する',
          content: 'ブラウザのDevToolsでモバイル・タブレット・デスクトップの表示を確認する',
        },
      ],
      challenge: '3カラムレイアウトをレスポンシブ対応させよう',
      hints: [
        'モバイルファーストで書くと、メディアクエリがmin-widthベースになり、シンプルになる',
        'AIに「clampやmin/max関数を使ったfluid typographyも追加して」と依頼すると、さらに洗練されたレスポンシブデザインになる',
      ],
      checkQuestions: [
        {
          question: 'モバイルファーストのレスポンシブデザインとは？',
          options: [
            'デスクトップ向けを先に作り、モバイルに縮小する',
            'モバイル向けの基本スタイルを書き、画面が大きくなるに従ってスタイルを追加する',
            'モバイル専用のサイトを別に作る',
            'すべてのデバイスで同じ表示にする',
          ],
          correctIndex: 1,
          explanation: 'モバイルファーストでは、まずモバイル向けの基本スタイルを定義し、min-widthメディアクエリで段階的にスタイルを追加します',
        },
      ],
    },
    {
      id: 'day3-wd-quest4',
      dayId: 3,
      title: 'デザイン→コード変換',
      description: 'デザインの説明文からAIにHTMLとCSSのコードを生成させる方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['web-designer'],
      steps: [
        {
          title: 'デザインを言語化する',
          content: '作りたいUIのデザインを具体的に文章で説明する（色、レイアウト、余白、フォント等）',
        },
        {
          title: 'AIにコードを生成させる',
          content: 'デザインの説明をAIに伝え、「このデザインをHTML とCSSで実装して」と依頼する',
        },
        {
          title: '生成結果をプレビューする',
          content: '生成されたコードをブラウザで表示し、イメージとの差異を確認する',
        },
        {
          title: 'フィードバックして修正する',
          content: '差異がある部分をAIに具体的に伝え、「ここの余白をもう少し広く」等の修正を依頼する',
        },
        {
          title: 'コードを最適化する',
          content: 'AIに「このCSSを整理して、重複を削除して」と依頼し、最終的なコードをきれいにする',
        },
      ],
      challenge: 'デザインの説明文からAIでHTMLとCSSを生成しよう',
      hints: [
        '具体的な数値（余白は16px、角丸は8px等）を含めると、よりイメージに近い結果が得られる',
        '参考になるサイトやUIライブラリのコンポーネント名を伝えると、AIの理解が早くなる',
      ],
      checkQuestions: [
        {
          question: 'デザインをAIにコード変換してもらう際のコツは？',
          options: [
            '「おしゃれにして」とだけ伝える',
            '色・レイアウト・余白・フォントなどを具体的に説明する',
            'スクリーンショットだけ送ればよい',
            'CSSフレームワーク名だけ伝える',
          ],
          correctIndex: 1,
          explanation: 'デザインの詳細（色コード、余白の数値、フォントサイズ、レイアウト構造等）を具体的に伝えることで、イメージに近いコードが生成されます',
        },
      ],
    },
    {
      id: 'day3-wd-quest5',
      dayId: 3,
      title: 'SVGアイコン',
      description: 'AIを活用してカスタムSVGアイコンを生成し、最適化する方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 15,
      targetRoles: ['web-designer'],
      steps: [
        {
          title: '必要なアイコンをリストアップする',
          content: 'プロジェクトで必要なアイコン（ホーム、検索、メニュー、閉じる、設定等）を洗い出す',
        },
        {
          title: 'AIにSVGアイコンを生成させる',
          content: 'AIに「シンプルなホームアイコンをSVGで作って。24x24のviewBoxで」と依頼する',
        },
        {
          title: 'スタイルをカスタマイズする',
          content: 'AIに「stroke-width を2に、角を丸く、currentColorを使って色を変更可能にして」と依頼する',
        },
        {
          title: 'SVGを最適化する',
          content: 'AIに「このSVGを最適化して不要な属性を削除して」と依頼し、ファイルサイズを削減する',
        },
      ],
      challenge: '5つのカスタムSVGアイコンをAIで生成しよう',
      hints: [
        'viewBoxを統一すると、プロジェクト全体でアイコンの一貫性が保てる',
        'currentColorを使うと、CSSのcolorプロパティでSVGの色を変更できて便利',
      ],
      checkQuestions: [
        {
          question: 'SVGアイコンでcurrentColorを使う利点は？',
          options: [
            'ファイルサイズが大きくなる',
            'CSSのcolorプロパティでアイコンの色を制御できる',
            'アニメーションが自動的につく',
            'ブラウザ対応が広がる',
          ],
          correctIndex: 1,
          explanation: 'currentColorを使うことで、親要素のCSSのcolorプロパティに連動してSVGの色が変わり、テーマ変更やホバー時の色変更が容易になります',
        },
      ],
    },
    {
      id: 'day3-wd-quest6',
      dayId: 3,
      title: 'カラーパレット生成',
      description: 'AIを使ってプロジェクト用のカラーパレットを生成し、CSS変数として活用する方法を学びます。',
      difficulty: 2,
      estimatedMinutes: 15,
      targetRoles: ['web-designer'],
      steps: [
        {
          title: 'プロジェクトのイメージを伝える',
          content: 'プロジェクトの雰囲気（コーポレート、カジュアル、ナチュラル等）やキーカラーをAIに伝える',
        },
        {
          title: 'AIにカラーパレットを生成させる',
          content: '「ブルー系のコーポレートサイト用カラーパレットを5色で生成して」とAIに依頼する',
        },
        {
          title: 'CSS変数に変換する',
          content: 'AIに「このカラーパレットをCSS カスタムプロパティ（変数）に変換して」と依頼する',
        },
        {
          title: 'ダークモード対応を追加する',
          content: 'AIに「ダークモード用のカラーパレットも生成して、prefers-color-schemeで切り替えるCSSを書いて」と依頼する',
        },
      ],
      challenge: 'プロジェクト用のカラーパレットをAIで生成しよう',
      hints: [
        'アクセシビリティのコントラスト比（WCAG AA基準の4.5:1以上）もAIに確認させると実用的',
        '既存のブランドカラーがある場合は、それをベースに展開するよう依頼する',
      ],
      checkQuestions: [
        {
          question: 'CSSカスタムプロパティ（変数）を使う利点は？',
          options: [
            'ブラウザの読み込み速度が速くなる',
            'カラーを一箇所で管理でき、テーマの一括変更が容易になる',
            'CSSファイルが自動的に圧縮される',
            'JavaScriptが不要になる',
          ],
          correctIndex: 1,
          explanation: 'CSSカスタムプロパティを使うことで、カラーを一元管理でき、ダークモード切替やブランドカラーの変更が簡単に行えます',
        },
      ],
    },

    // ========================================
    // Director Quests
    // ========================================
    {
      id: 'day3-dir-quest1',
      dayId: 3,
      title: '企画書ドラフト',
      description: 'AIを使って新機能やプロジェクトの企画書ドラフトを効率的に作成する方法を学びます。',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['director'],
      steps: [
        {
          title: '企画の概要をまとめる',
          content: '企画の背景、目的、ターゲットユーザーなど基本情報を箇条書きでまとめる',
        },
        {
          title: 'AIに企画書の構成を提案させる',
          content: 'まとめた概要をAIに渡し、「この情報を基に企画書の目次構成を提案して」と依頼する',
        },
        {
          title: '各セクションの内容を生成する',
          content: '構成に従って、AIに各セクション（課題分析、解決策、期待効果等）の内容を生成させる',
        },
        {
          title: '競合分析を追加する',
          content: 'AIに「類似サービスとの比較表を作って」と依頼し、競合優位性をまとめる',
        },
        {
          title: '最終的な企画書に仕上げる',
          content: '生成された内容をレビュー・修正し、自分の言葉で最終調整を行う',
        },
      ],
      challenge: '新機能の企画書ドラフトをAIで作成しよう',
      hints: [
        'まずはキーワードレベルでアイデアを伝え、AIに膨らませてもらうと効率的',
        '「経営層向けに」「エンジニア向けに」等、読者を指定するとトーンが適切になる',
      ],
      checkQuestions: [
        {
          question: 'AIで企画書を作成する際に大切なことは？',
          options: [
            'AIの出力をそのまま使う',
            'できるだけ情報を伏せて依頼する',
            '背景・目的・ターゲットを明確にしてからAIに依頼する',
            '企画書の長さだけ指定すればよい',
          ],
          correctIndex: 2,
          explanation: '背景・目的・ターゲットを明確にすることで、AIは的確な内容を生成できます。最終的には自分の言葉でレビュー・修正することが重要です',
        },
      ],
    },
    {
      id: 'day3-dir-quest2',
      dayId: 3,
      title: '要件定義書',
      description: 'AIを活用してWebアプリの要件定義書を効率的に作成する方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 25,
      targetRoles: ['director'],
      steps: [
        {
          title: 'プロジェクトの概要を整理する',
          content: 'プロジェクトの目的、スコープ、主要機能をテキストでまとめる',
        },
        {
          title: 'AIに要件定義のフォーマットを提案させる',
          content: 'AIに「Webアプリの要件定義書テンプレートを作って」と依頼し、標準的なフォーマットを取得する',
        },
        {
          title: '機能要件を洗い出す',
          content: 'AIに「ECサイトの機能要件を優先度付きで洗い出して」等、具体的なドメインで機能要件を生成させる',
        },
        {
          title: '非機能要件を定義する',
          content: 'AIに「パフォーマンス、セキュリティ、可用性の非機能要件も追加して」と依頼する',
        },
        {
          title: '要件定義書を完成させる',
          content: '生成された内容をレビューし、プロジェクト固有の情報を追記して完成させる',
        },
      ],
      challenge: 'Webアプリの要件定義書をAIと作成しよう',
      hints: [
        'ユーザーストーリー形式（〇〇として△△したい、なぜなら□□だから）で機能を整理するとAIが理解しやすい',
        '画面遷移図やワイヤーフレームの説明も含めると、より実用的な要件定義書になる',
      ],
      checkQuestions: [
        {
          question: '要件定義書に含めるべき重要な要素は？',
          options: [
            '機能要件だけで十分',
            'プログラミング言語の指定だけ',
            '機能要件と非機能要件の両方',
            'デザインの色指定のみ',
          ],
          correctIndex: 2,
          explanation: '要件定義書には機能要件（何ができるか）と非機能要件（パフォーマンス、セキュリティ、可用性等）の両方を含めることが重要です',
        },
      ],
    },
    {
      id: 'day3-dir-quest3',
      dayId: 3,
      title: '議事録整理',
      description: '会議のメモやラフな記録をAIの力で整理された議事録に変換する方法を学びます。',
      difficulty: 2,
      estimatedMinutes: 15,
      targetRoles: ['director'],
      steps: [
        {
          title: '会議メモを用意する',
          content: '会議中に取った箇条書きメモやラフなノートを準備する',
        },
        {
          title: 'AIに議事録形式に整理させる',
          content: 'メモをAIに貼り付け、「このメモを議事録形式に整理して。日時、参加者、議題、決定事項、TODO を含めて」と依頼する',
        },
        {
          title: 'アクションアイテムを抽出する',
          content: 'AIに「議事録からアクションアイテムを抽出して、担当者と期限も明確にして」と依頼する',
        },
        {
          title: '最終確認と共有',
          content: '生成された議事録をレビューし、事実と異なる点がないか確認して共有する',
        },
      ],
      challenge: 'サンプルの議事メモをAIで議事録に整理しよう',
      hints: [
        '会議中のメモは完璧でなくてもよい。キーワードレベルでもAIが文脈を理解して整理してくれる',
        '「社内共有用のフォーマットで」「クライアント共有用のフォーマットで」等、用途を指定すると適切な表現になる',
      ],
      checkQuestions: [
        {
          question: 'AIで議事録を作成する際の注意点は？',
          options: [
            'AIの出力をそのまま共有してよい',
            '事実と異なる内容がないか必ず確認する',
            '箇条書きメモは使えない',
            '参加者名は不要',
          ],
          correctIndex: 1,
          explanation: 'AIは文脈から内容を補完する場合があるため、事実と異なる内容が含まれていないか必ず確認してから共有することが重要です',
        },
      ],
    },
    {
      id: 'day3-dir-quest4',
      dayId: 3,
      title: 'プロジェクト計画',
      description: 'WBS、スケジュール、リソース計画をAIに支援してもらい、プロジェクト計画を立てる方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['director'],
      steps: [
        {
          title: 'プロジェクトの全体像を伝える',
          content: 'プロジェクトの目標、期間、チーム構成、主要マイルストーンをAIに伝える',
        },
        {
          title: 'WBSを作成する',
          content: 'AIに「3ヶ月のWebアプリ開発プロジェクトのWBSを作成して」と依頼する',
        },
        {
          title: 'スケジュールを作成する',
          content: 'AIに「WBSを基にガントチャート形式のスケジュールを作成して」と依頼する',
        },
        {
          title: 'リスク管理表を作成する',
          content: 'AIに「このプロジェクトで想定されるリスクと対策をリストアップして」と依頼する',
        },
        {
          title: '計画書としてまとめる',
          content: 'すべての情報を統合し、プロジェクト計画書として整理する',
        },
      ],
      challenge: '3ヶ月のプロジェクト計画をAIで作成しよう',
      hints: [
        '過去のプロジェクトの情報（期間、問題点等）をAIに共有すると、より現実的な計画が立てられる',
        'バッファ（予備時間）の設定もAIに相談すると、適切な見積もりが得られる',
      ],
      checkQuestions: [
        {
          question: 'プロジェクト計画でWBSを作る目的は？',
          options: [
            'プログラミング言語を決めるため',
            '作業を細分化して見積もりと管理を容易にするため',
            'デザインを決めるため',
            'チームメンバーを減らすため',
          ],
          correctIndex: 1,
          explanation: 'WBS（Work Breakdown Structure）は作業を細分化することで、見積もりの精度を上げ、進捗管理を容易にするための手法です',
        },
      ],
    },
    {
      id: 'day3-dir-quest5',
      dayId: 3,
      title: '技術説明資料',
      description: '技術的な内容を非技術者向けに分かりやすく翻訳する資料をAIで作成する方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 20,
      targetRoles: ['director'],
      steps: [
        {
          title: '説明したい技術トピックを決める',
          content: 'クライアントや経営層に説明したい技術トピック（API、クラウド、セキュリティ等）を選ぶ',
        },
        {
          title: 'AIに非技術者向けの説明を生成させる',
          content: 'AIに「APIとは何かを、技術知識のない経営者向けにたとえ話を使って説明する資料を作って」と依頼する',
        },
        {
          title: '図解用のテキストを生成させる',
          content: 'AIに「この説明に使える図解の構成案を作って」と依頼し、ビジュアル資料の素案を作る',
        },
        {
          title: 'FAQ を追加する',
          content: 'AIに「非技術者から想定される質問と回答を5つ作って」と依頼し、FAQ セクションを追加する',
        },
      ],
      challenge: 'APIとは何かを非技術者向けに説明する資料をAIで作成しよう',
      hints: [
        '「小学生にも分かるように」「レストランの注文に例えて」等、具体的な表現レベルを指定すると分かりやすい資料になる',
        '専門用語にはすべて（）で簡単な説明を付けるようAIに指示する',
      ],
      checkQuestions: [
        {
          question: '技術的な内容を非技術者に説明するコツは？',
          options: [
            '専門用語をそのまま使う',
            '詳細な技術仕様をすべて説明する',
            '身近な例え話を使って概念を伝える',
            '説明を省略して結論だけ伝える',
          ],
          correctIndex: 2,
          explanation: '身近な例え話やビジュアルを活用することで、技術的な概念を分かりやすく伝えることができます',
        },
      ],
    },

    // ========================================
    // Non-Engineer Quests
    // ========================================
    {
      id: 'day3-ne-quest1',
      dayId: 3,
      title: 'ビジネスメール',
      description: 'AIを使ってビジネスシーン別のメールテンプレートを効率的に作成する方法を学びます。',
      difficulty: 2,
      estimatedMinutes: 15,
      targetRoles: ['non-engineer', 'student-intern'],
      steps: [
        {
          title: 'メールのシーンを設定する',
          content: '作成したいメールのシーン（お礼、依頼、謝罪、提案等）を決める',
        },
        {
          title: 'AIにメール文面を生成させる',
          content: 'AIに「取引先への打ち合わせのお礼メールを作成して。丁寧すぎず、かつビジネスライクなトーンで」と依頼する',
        },
        {
          title: '別のシーンのメールも作成する',
          content: 'AIに「納期延長をお願いするメール」「新規提案のメール」等、複数パターンを作成させる',
        },
        {
          title: 'トーンを調整する',
          content: '「もう少しカジュアルに」「もっとフォーマルに」等、AIにトーンの調整を依頼する',
        },
      ],
      challenge: '3つの異なるシーンのビジネスメールをAIで作成しよう',
      hints: [
        '宛先（社内/社外、上司/部下/取引先）を明確にすると、適切な敬語レベルのメールが生成される',
        'メールの要点を箇条書きで伝えると、AIが適切な文章構成にしてくれる',
      ],
      checkQuestions: [
        {
          question: 'AIでビジネスメールを作成する際のポイントは？',
          options: [
            'AIが生成した文面をそのまま送る',
            '宛先、目的、トーンを明確に指定して生成させる',
            'すべて英語で作成させる',
            'メールの件名は不要',
          ],
          correctIndex: 1,
          explanation: '宛先（社内/社外）、目的（依頼/報告/謝罪等）、トーン（フォーマル/カジュアル）を明確に指定することで、適切なメール文面が生成されます',
        },
      ],
    },
    {
      id: 'day3-ne-quest2',
      dayId: 3,
      title: 'プレゼン資料',
      description: 'AIを使ってプレゼンテーションのアウトラインやスライド内容を効率的に作成する方法を学びます。',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['non-engineer', 'student-intern'],
      steps: [
        {
          title: 'プレゼンの目的と対象者を決める',
          content: 'プレゼンのテーマ、目的、対象者（社内/クライアント）、持ち時間を整理する',
        },
        {
          title: 'AIにアウトラインを作成させる',
          content: 'AIに「会社紹介プレゼンのアウトライン（10枚構成）を作って」と依頼する',
        },
        {
          title: '各スライドの内容を生成する',
          content: 'アウトラインの各スライドについて、AIに「このスライドの見出しと箇条書き3点を作って」と依頼する',
        },
        {
          title: 'トークスクリプトを生成する',
          content: 'AIに「各スライドの説明用トークスクリプトを作って。1スライド1分で話せる量で」と依頼する',
        },
      ],
      challenge: '会社紹介プレゼンのアウトラインをAIで作成しよう',
      hints: [
        'プレゼンの結論やキーメッセージを先に伝えると、AIがそれに沿った構成を作ってくれる',
        '「各スライドには図やグラフの提案も入れて」と依頼すると、ビジュアル面の参考にもなる',
      ],
      checkQuestions: [
        {
          question: 'プレゼン資料をAIで作る際に最初にすべきことは？',
          options: [
            'スライドのデザインを決める',
            'アニメーションを設定する',
            '目的・対象者・キーメッセージを明確にする',
            'スライド枚数を100枚に設定する',
          ],
          correctIndex: 2,
          explanation: '目的・対象者・キーメッセージを最初に明確にすることで、AIが適切な構成と内容のプレゼン資料を生成できます',
        },
      ],
    },
    {
      id: 'day3-ne-quest3',
      dayId: 3,
      title: 'データ整理CSV',
      description: 'AIを使ってデータの変換、CSVフォーマットへの整理、簡単な集計を行う方法を学びます。',
      difficulty: 2,
      estimatedMinutes: 15,
      targetRoles: ['non-engineer', 'student-intern'],
      steps: [
        {
          title: '整理したいデータを準備する',
          content: 'テキストやメール本文から数値データ、名簿データなど整理したい情報を集める',
        },
        {
          title: 'AIにCSV形式への変換を依頼する',
          content: 'データをAIに貼り付け、「このデータをCSV形式に変換して。ヘッダー行も付けて」と依頼する',
        },
        {
          title: 'データのクレンジングを依頼する',
          content: 'AIに「重複データの削除、表記ゆれの統一、欠損値の確認をして」と依頼する',
        },
        {
          title: '簡単な集計を依頼する',
          content: 'AIに「部署別の人数集計」「月別の売上合計」等の集計結果をCSVで出力させる',
        },
      ],
      challenge: 'サンプルデータをAIでCSV形式に整理しよう',
      hints: [
        'Excelに貼り付けることを想定して「タブ区切り」で出力させることもできる',
        '日付や金額のフォーマットを統一するようAIに指示すると、後の処理が楽になる',
      ],
      checkQuestions: [
        {
          question: 'AIでデータ整理を行う際のメリットは？',
          options: [
            'データが自動的に正確になる',
            '手作業では時間がかかるフォーマット変換や集計を素早く行える',
            'Excelが不要になる',
            'データベースが自動構築される',
          ],
          correctIndex: 1,
          explanation: 'AIを使うことで、手作業では時間がかかるフォーマット変換、表記ゆれの統一、集計作業を効率的に行うことができます',
        },
      ],
    },
    {
      id: 'day3-ne-quest4',
      dayId: 3,
      title: '簡単なWebページ',
      description: 'プログラミング経験がなくても、AIの力で簡単なHTMLページを作成する方法を学びます。',
      difficulty: 3,
      estimatedMinutes: 25,
      targetRoles: ['non-engineer', 'student-intern'],
      steps: [
        {
          title: 'ページの内容を考える',
          content: '作りたいページの目的（部署紹介、イベント告知等）と掲載内容を整理する',
        },
        {
          title: 'AIにHTMLページの生成を依頼する',
          content: 'AIに「部署紹介ページを作って。部署名、メンバー紹介、主な業務を含めて。CSSも含めた1つのHTMLファイルで」と依頼する',
        },
        {
          title: '内容をカスタマイズする',
          content: 'AIに「見出しの色を青に変えて」「写真を配置する場所を追加して」等の修正を依頼する',
        },
        {
          title: 'ブラウザでプレビューする',
          content: '生成されたHTMLファイルを保存し、ブラウザで開いて表示を確認する',
        },
        {
          title: '修正を繰り返す',
          content: '気になる点をAIに伝えて修正を繰り返し、満足のいくページに仕上げる',
        },
      ],
      challenge: '自分の部署紹介ページをAIで作成しよう',
      hints: [
        'HTMLの知識がなくても「ここの文字を大きくして」「背景色を薄いグレーにして」等、見た目で指示すれば修正できる',
        'CSSとHTMLを1つのファイルにまとめるよう依頼すると、ファイル管理がシンプルになる',
      ],
      checkQuestions: [
        {
          question: 'AIでWebページを作成する利点は？',
          options: [
            'プログラミング知識が不要で、要望を伝えるだけでページが作れる',
            'サーバーが自動的に用意される',
            'SEO対策が自動で行われる',
            'ドメインが自動取得される',
          ],
          correctIndex: 0,
          explanation: 'AIを使えば、プログラミング知識がなくても「こんなページが欲しい」と要望を伝えるだけで、HTMLとCSSのコードを生成してもらえます',
        },
      ],
    },
    {
      id: 'day3-ne-quest5',
      dayId: 3,
      title: 'レポート作成',
      description: '月次レポートや分析レポートの構成と内容をAIに提案させ、効率的にレポートを作成する方法を学びます。',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['non-engineer', 'student-intern'],
      steps: [
        {
          title: 'レポートの目的と種類を決める',
          content: '作成するレポートの種類（月次業務報告、売上分析、プロジェクト進捗等）と対象読者を決める',
        },
        {
          title: 'AIにテンプレートを生成させる',
          content: 'AIに「月次業務レポートのテンプレートを作って。セクション構成と各項目の説明を含めて」と依頼する',
        },
        {
          title: 'データからレポート文を生成する',
          content: '実際のデータや数値をAIに渡し、「このデータを基にレポートの本文を作成して」と依頼する',
        },
        {
          title: 'サマリーと改善提案を追加する',
          content: 'AIに「レポートのエグゼクティブサマリーと来月への改善提案を追加して」と依頼する',
        },
      ],
      challenge: '月次業務レポートのテンプレートをAIで作成しよう',
      hints: [
        '過去のレポートがある場合は、そのフォーマットに合わせるようAIに指示する',
        '数値データをAIに渡す際は、比較対象（前月比、前年比）も一緒に伝えると分析が充実する',
      ],
      checkQuestions: [
        {
          question: 'AIでレポートを作成する際に重要なことは？',
          options: [
            '数値データは不要で、感想だけ書けばよい',
            'AIの生成結果をそのまま提出する',
            '目的と対象読者を明確にし、データに基づいた内容にする',
            'できるだけ長く書く',
          ],
          correctIndex: 2,
          explanation: 'レポートの目的と対象読者を明確にし、実際のデータに基づいた内容をAIに生成させることで、質の高いレポートが作成できます',
        },
      ],
    },
  ],
};
