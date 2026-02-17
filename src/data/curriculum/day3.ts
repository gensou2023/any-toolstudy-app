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
          content: '新しいファイルを作成し（**Cmd+N**）、以下の情報を箇条書きで整理する:\n- コンポーネントの目的（例: 「商品カードの表示」）\n- 受け取るPropsの一覧（例: `title`, `price`, `imageUrl`, `onAddToCart`）\n- 見た目のイメージ（幅、色、レイアウト方向）\n- 使用するスタイリング手法（Tailwind CSS / CSS Modules）',
        },
        {
          title: 'AIにProps設計を依頼する',
          content: '**Cmd+L**（チャット）を開き、以下のプロンプトで依頼する:\n`以下の要件でReactコンポーネントのPropsインターフェースをTypeScriptで設計して。目的: 商品カード表示。必要なProps: title(string), price(number), imageUrl(string), onAddToCart(関数)。optionalなPropsも提案して`\n生成された型定義を確認し、過不足があれば追加で指示する',
        },
        {
          title: 'JSXの生成を依頼する',
          content: 'チャットで続けて以下を依頼する:\n`このPropsインターフェースを使ったJSXを生成して。関数コンポーネント形式で、アクセシビリティ（alt属性、aria-label等）も考慮して`\nAIが生成したJSXの構造を確認し、**Cmd+I**（Composer）で直接ファイルに反映する',
        },
        {
          title: 'スタイリングを追加する',
          content: '**Cmd+K**でコード内のJSX部分を選択し、以下のように指示する:\n`このコンポーネントにTailwind CSSでスタイルを追加して。カード型レイアウト、ホバー時にshadow-lg、画像はobject-cover`\n適用後、ブラウザで表示を確認する',
        },
        {
          title: 'コードを確認して調整する',
          content: '以下のチェックリストで最終確認する:\n- TypeScriptの型エラーがないか（エディタの赤波線を確認）\n- Propsのデフォルト値が適切か\n- 不要なimport文がないか\n- コンポーネント名がPascalCaseになっているか\n問題があれば**Cmd+K**で該当箇所を選択して修正を依頼する',
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
          content: '以下のようなFlexboxレイアウトが崩れたコードを作成する（またはプロジェクト内の問題箇所を見つける）:\n- `display: flex`なのに子要素が縦並びになっている\n- `overflow: hidden`で要素が見切れている\n- `z-index`が効かず要素が重なっている\n**Cmd+N**で新規HTMLファイルを作り、意図的に崩れたレイアウトを再現してもよい',
        },
        {
          title: 'AIにレイアウト解析を依頼する',
          content: '崩れたCSSコードを選択し、**Cmd+L**（チャット）で以下のように依頼する:\n`このCSSレイアウトが意図通りに表示されない。期待: 3カラム横並び、実際: 縦に積まれる。問題点を分析して原因と修正方法を教えて`\n**ポイント**: 「期待する表示」と「実際の表示」の両方を伝えると精度が上がる',
        },
        {
          title: '修正案を適用する',
          content: 'AIの提案をもとに**Cmd+K**で該当箇所を選択し修正を適用する。ブラウザの**DevTools**（**F12**）で以下を確認:\n- Elements → Computed で適用されているCSSプロパティ\n- Flexboxインスペクター（Chrome DevTools）でレイアウトの方向・配置\n- 修正前後のスクリーンショットを見比べる',
        },
        {
          title: 'レスポンシブ対応を確認する',
          content: '**Cmd+L**で以下を依頼する:\n`このレイアウトをレスポンシブ対応させて。ブレイクポイント: 768px以下で1カラム、1024px以下で2カラム`\nDevToolsの**デバイスツールバー**（**Cmd+Shift+M**）でモバイル・タブレット表示を確認する',
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
          content: 'ブラウザの**DevTools** → **Network**タブでAPIレスポンスを確認し、JSONをコピーする。または以下のようなサンプルJSONを用意する:\n`{ "id": 1, "name": "田中太郎", "email": "tanaka@example.com", "role": "admin", "createdAt": "2024-01-01T00:00:00Z" }`',
        },
        {
          title: 'AIに型定義を生成させる',
          content: '**Cmd+L**（チャット）にJSONを貼り付け、以下のように依頼する:\n`このJSONレスポンスからTypeScriptのinterfaceを生成して。nullの可能性があるフィールドはoptionalに、日付はDate型ではなくstring型にして`\n生成された型のフィールド名と型が実際のAPIレスポンスと一致しているか確認する',
        },
        {
          title: 'ジェネリクスの活用を依頼する',
          content: 'チャットで続けて以下を依頼する:\n`APIレスポンスの共通ラッパー型をジェネリクスで作って。形式: { data: T, meta: { total: number, page: number } }`\nAIが生成した`ApiResponse<T>`のような汎用型を確認し、具体的な使用例（`ApiResponse<User[]>`等）も生成させる',
        },
        {
          title: 'ユニオン型とリテラル型を活用する',
          content: 'チャットで以下を依頼する:\n`roleフィールドを "admin" | "editor" | "viewer" のユニオン型に、statusを "active" | "inactive" | "pending" のリテラル型にして`\n型の制約が正しく効くことを確認する（存在しない値を代入するとエラーになるか）',
        },
        {
          title: '型定義ファイルを整理する',
          content: '**Cmd+I**（Composer）で以下を依頼する:\n`生成した型定義をsrc/types/ディレクトリに整理して。api.tsにAPIレスポンス型、user.tsにユーザー関連型を分けて配置して`\n完了後の確認:\n- import文が正しいか\n- 既存の型定義と重複がないか\n- `export`が付いているか',
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
          content: 'プロジェクト内のコンポーネントを1つ選ぶ（例: `Button.tsx`や`UserCard.tsx`）。選ぶ基準:\n- Props を受け取って表示を変えるコンポーネント\n- クリックイベントなどのインタラクションがあるもの\n同じディレクトリに`ComponentName.test.tsx`ファイルを**Cmd+N**で新規作成する',
        },
        {
          title: 'AIにテストコードの生成を依頼する',
          content: 'コンポーネントのコードを選択し、**Cmd+L**（チャット）で以下のように依頼する:\n`このReactコンポーネントのテストをJest + React Testing Libraryで書いて。以下を含めて: 1. 正常なPropsでレンダリングできること 2. 各Propsが正しく表示に反映されること 3. クリックイベントが発火すること`\nAIが生成したテストのimport文がプロジェクトの構成と合っているか確認する',
        },
        {
          title: 'テストケースを確認・追加する',
          content: '生成されたテストを確認し、チャットで追加依頼する:\n`エッジケースのテストも追加して: 1. Propsが空/undefinedの場合 2. 長いテキストが渡された場合 3. 連続クリックした場合`\n各テストケースに`describe`と`it`で分かりやすい説明が付いているか確認する',
        },
        {
          title: 'テストを実行する',
          content: 'ターミナル（**Ctrl+`**）で以下を実行する:\n`npm test -- --watchAll=false`\n確認項目:\n- すべてのテストがPASS（緑）になっているか\n- テスト名が何をテストしているか分かりやすいか\n- 失敗した場合はエラーメッセージをチャットに貼り付けてAIに修正を依頼する',
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
          content: '以下の基準でリファクタリング対象を探す:\n- 100行以上の長いコンポーネント\n- 1つのコンポーネント内に`useState`が5個以上ある\n- `useEffect`の中で複数の無関係な処理をしている\n**Cmd+P**でファイルを検索し、行数が多いコンポーネントを開く',
        },
        {
          title: 'AIに改善提案を依頼する',
          content: 'コンポーネント全体を選択し、**Cmd+L**（チャット）で依頼する:\n`このコンポーネントの問題点を以下の観点で分析して: 1. 単一責任の原則に違反している箇所 2. 再利用できるロジック 3. 不要な再レンダリングの原因 4. 命名の改善点`\nAIの提案を優先度順に確認する',
        },
        {
          title: 'カスタムフックの抽出を依頼する',
          content: 'チャットで続けて依頼する:\n`このコンポーネントのデータ取得ロジックをカスタムフック（useXxx）に抽出して。フックは以下を返す形式にして: { data, isLoading, error, refetch }`\n**Cmd+I**（Composer）で新しいフックファイル`src/hooks/useXxx.ts`の作成を依頼し、コンポーネント側のimportも更新させる',
        },
        {
          title: 'コンポーネントの分割を行う',
          content: '**Cmd+I**（Composer）で以下のように依頼する:\n`このコンポーネントを以下の単位で分割して: ヘッダー部分→XxxHeader, リスト表示部分→XxxList, フォーム部分→XxxForm。各コンポーネントに必要なPropsも定義して`\n分割後に各ファイルが正しくimportされているか確認する',
        },
        {
          title: 'リファクタリング結果を確認する',
          content: '以下のチェックリストで確認する:\n- ブラウザでリファクタリング前と同じ動作をするか\n- TypeScriptの型エラーがないか（`npm run build`で確認）\n- 各コンポーネントが50行以内に収まっているか\n- カスタムフックが他のコンポーネントでも再利用可能か',
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
          content: '**React DevTools**のProfilerタブを開き（ブラウザ拡張機能）、以下の手順で確認する:\n- 「Record」ボタンを押してから画面を操作し、「Stop」で記録終了\n- Flamegraphで各コンポーネントのレンダリング時間を確認\n- 黄色・赤色のコンポーネント（レンダリングが遅い）を特定する\n**Settings** → **Highlight updates**をオンにすると、再レンダリングされた要素が緑枠で表示される',
        },
        {
          title: 'AIにパフォーマンスレビューを依頼する',
          content: '問題のあるコンポーネントを選択し、**Cmd+L**（チャット）で依頼する:\n`このコンポーネントのパフォーマンス問題を分析して。特に: 1. 不要な再レンダリングの原因 2. 重い計算処理 3. 大きなリストのレンダリング。React DevToolsでこのコンポーネントが毎回再レンダリングされている`',
        },
        {
          title: 'memo化の提案を適用する',
          content: 'AIの提案に基づき、**Cmd+K**で該当コードを選択して最適化を適用する:\n- `React.memo`: Props が変わらないのに再レンダリングされるコンポーネントに適用\n- `useMemo`: 重い計算結果のキャッシュ（例: フィルタリング、ソート処理）\n- `useCallback`: 子コンポーネントに渡すイベントハンドラの安定化\n**注意**: すべてに適用するのではなく、Profilerで効果を確認できた箇所のみに適用する',
        },
        {
          title: 'コード分割を検討する',
          content: '**Cmd+L**で以下を依頼する:\n`このページで初期表示に不要なコンポーネント（モーダル、タブの非アクティブパネル等）をReact.lazyで動的インポートに変更して。Suspenseのfallbackも設定して`\n適用例: `const HeavyChart = lazy(() => import("./HeavyChart"))`',
        },
        {
          title: '最適化結果を計測する',
          content: '再度**React DevTools Profiler**で計測し、以下を比較する:\n- レンダリング回数が減ったか\n- 各コンポーネントのレンダリング時間（ms）が短くなったか\n- 不要な再レンダリング（Highlight updates）が減ったか\n改善が見られない場合はAIに追加の最適化手法を相談する',
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
          content: '**Cmd+N**で新規ファイルを作成し、以下を箇条書きで整理する:\n- リソース一覧（例: `users`, `products`, `orders`）\n- 各リソースに必要な操作（CRUD: 作成・取得・更新・削除）\n- 認証の要否（公開API / 認証必須）\n- ページネーションの必要性',
        },
        {
          title: 'AIにエンドポイント設計を依頼する',
          content: '**Cmd+L**（チャット）で以下のプロンプトを入力する:\n`ユーザー管理のREST APIエンドポイントを設計して。以下を含めて: 一覧取得(GET /api/users)、詳細取得(GET /api/users/:id)、作成(POST)、更新(PUT)、削除(DELETE)。各エンドポイントのURLパス、HTTPメソッド、概要を表形式で出力して`',
        },
        {
          title: 'リクエスト・レスポンス定義を作成する',
          content: 'チャットで続けて依頼する:\n`各エンドポイントのリクエストボディとレスポンスのJSON形式を定義して。例: POST /api/users のリクエスト: { name: string, email: string }、レスポンス: { id: number, name: string, email: string, createdAt: string }`\nHTTPステータスコード（`200`, `201`, `400`, `404`等）も含めさせる',
        },
        {
          title: 'エラーレスポンスを定義する',
          content: 'チャットで以下を依頼する:\n`各エンドポイントで発生し得るエラーレスポンスを定義して。統一フォーマット: { error: { code: string, message: string, details?: object } }。含めるエラー: バリデーションエラー(400)、認証エラー(401)、リソース未発見(404)、サーバーエラー(500)`',
        },
        {
          title: 'API仕様書としてまとめる',
          content: '**Cmd+I**（Composer）で以下を依頼する:\n`ここまでの設計内容をOpenAPI 3.0（YAML形式）のファイルにまとめて。api-spec.yamlとして出力して`\n完了後の確認:\n- すべてのエンドポイントが記載されているか\n- リクエスト・レスポンスのスキーマが正しいか\n- Swagger Editorに貼り付けてプレビューできるか',
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
          content: '**Cmd+N**で新規ファイルを作成し、以下の形式でエンティティを整理する:\n- `users`: 名前、メール、パスワードハッシュ、ロール\n- `products`: 名前、価格、説明、カテゴリID、在庫数\n- `orders`: ユーザーID、合計金額、ステータス、注文日\n- `categories`: 名前、親カテゴリID\nエンティティ間の関係（1対多、多対多）も書き出す',
        },
        {
          title: 'AIにテーブル設計を依頼する',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`ECサイト向けのPostgreSQLテーブル設計をして。エンティティ: users, products, orders, order_items, categories。各テーブルのカラム定義（名前、型、制約）を含めて。created_at, updated_atも全テーブルに追加して`',
        },
        {
          title: 'リレーションを確認する',
          content: 'AIが設計した外部キーを確認し、以下の観点でチェックする:\n- `orders.user_id` → `users.id` の外部キー制約があるか\n- `order_items`が`orders`と`products`の中間テーブルになっているか\n- `ON DELETE`の挙動（CASCADE / SET NULL）が適切か\n問題があれば`このリレーションを修正して: ...`とチャットで指示する',
        },
        {
          title: 'インデックス設計を依頼する',
          content: 'チャットで以下を依頼する:\n`以下のクエリパターンに基づいてインデックスを設計して: 1. ユーザーのメールアドレス検索 2. カテゴリ別の商品一覧 3. ユーザー別の注文履歴（日付降順） 4. 商品名のあいまい検索`\n各インデックスの`CREATE INDEX`文を確認する',
        },
        {
          title: 'マイグレーションファイルを生成する',
          content: '**Cmd+I**（Composer）で以下を依頼する:\n`この設計のマイグレーションSQLファイルを生成して。CREATE TABLE文、外部キー制約、インデックス作成を含めて。ファイル名: 001_create_tables.sql`\n完了後の確認:\n- SQLの文法エラーがないか\n- テーブルの作成順序が外部キー依存を考慮しているか\n- `IF NOT EXISTS`が付いているか',
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
          content: '以下のカテゴリでAPIのエラーパターンを整理する:\n- **バリデーション**: 必須フィールド欠落、型不正、範囲外の値\n- **認証・認可**: トークン未送信、トークン期限切れ、権限不足\n- **リソース**: 存在しないID、重複データ\n- **サーバー**: DB接続エラー、外部API障害、タイムアウト',
        },
        {
          title: 'AIにエラーハンドリングの実装を依頼する',
          content: '**Cmd+L**（チャット）で以下を依頼する:\n`Express.jsのエラーハンドリングミドルウェアを作って。以下のエラーを処理: 1. ValidationError → 400 2. AuthenticationError → 401 3. ForbiddenError → 403 4. NotFoundError → 404 5. その他 → 500。本番環境ではスタックトレースを返さないようにして`',
        },
        {
          title: 'カスタムエラークラスを作成する',
          content: 'チャットで続けて依頼する:\n`上記のエラーに対応するカスタムエラークラスをTypeScriptで作って。基底クラスAppErrorを継承し、各クラスがstatusCodeとcodeプロパティを持つ形式で`\n生成されたクラスを`src/errors/`ディレクトリに保存する',
        },
        {
          title: 'エラーレスポンスの統一フォーマットを定義する',
          content: '**Cmd+K**でミドルウェアのコードを選択し、以下を指示する:\n`エラーレスポンスを以下の統一フォーマットにして: { success: false, error: { code: "VALIDATION_ERROR", message: "入力値が不正です", details: [...] } }`\n完了後、実際にAPIを叩いて各エラーレスポンスの形式が統一されているか確認する',
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
          content: 'プロジェクト内のAPIエンドポイントを1つ選ぶ（例: `POST /api/users`）。選ぶ際の基準:\n- CRUD操作を含むエンドポイント\n- バリデーションロジックがあるもの\n- 外部サービスとの連携があるもの\n対象ファイルを**Cmd+P**で開いておく',
        },
        {
          title: 'AIにユニットテストを生成させる',
          content: 'エンドポイントのコードを選択し、**Cmd+L**（チャット）で依頼する:\n`このAPIエンドポイントのユニットテストをJest + supertestで書いて。以下のケースを含めて: 1. 正常な入力で201が返ること 2. 必須フィールド欠落で400が返ること 3. 重複データで409が返ること。DBはモックを使って`',
        },
        {
          title: '統合テストを生成させる',
          content: 'チャットで続けて依頼する:\n`同じエンドポイントの統合テストも書いて。テスト用DBに実際に接続し、以下を確認: 1. データが正しくINSERTされること 2. 重複チェックが動作すること 3. テスト終了後にデータがクリーンアップされること`',
        },
        {
          title: 'モックの設計を確認する',
          content: 'AIが生成したモックを以下の観点でチェックする:\n- DB接続モックが実際のクエリと一致しているか\n- 外部APIモックのレスポンス形式が正しいか\n- モックの`jest.fn()`に適切な戻り値が設定されているか\n問題があれば**Cmd+L**で`このモックのDB返却値を修正して: ...`と指示する',
        },
        {
          title: 'テストを実行して結果を確認する',
          content: 'ターミナル（**Ctrl+`**）で以下を実行する:\n`npm test -- --verbose`\n確認項目:\n- すべてのテストがPASSになっているか\n- テストカバレッジが80%以上か（`npm test -- --coverage`で確認）\n- 失敗したテストがあればエラーログをチャットに貼り付けて修正を依頼する',
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
          content: '以下の優先度でセキュリティレビュー対象を選択する:\n- **最優先**: 認証・認可ロジック（ログイン、トークン検証）\n- **高**: データベースクエリ（SQL組み立て箇所）\n- **高**: ユーザー入力をそのまま使っている箇所\n- **中**: ファイルアップロード処理\n**Cmd+P**で該当ファイルを開き、コード全体を把握する',
        },
        {
          title: 'AIにセキュリティレビューを依頼する',
          content: 'コードを選択し、**Cmd+L**（チャット）で以下のように依頼する:\n`このコードをOWASP Top 10の観点でセキュリティレビューして。特に以下をチェック: 1. SQLインジェクション 2. XSS（クロスサイトスクリプティング） 3. 認証バイパス 4. 機密情報の露出 5. CSRF。問題箇所を行番号付きで指摘して`',
        },
        {
          title: '脆弱性の修正を依頼する',
          content: 'AIが指摘した各脆弱性について、**Cmd+K**で該当コードを選択し修正を依頼する:\n`この箇所のSQLインジェクション脆弱性を修正して。プリペアドステートメント/パラメータ化クエリを使って`\n修正内容を確認し、以下をチェック:\n- ユーザー入力が直接SQLに結合されていないか\n- エスケープ処理が適切か\n- エラーメッセージに内部情報が露出していないか',
        },
        {
          title: 'セキュリティベストプラクティスを確認する',
          content: '**Cmd+L**で以下を依頼する:\n`このプロジェクトに適用すべきセキュリティ対策をチェックリスト形式で作って。含めるべき項目: HTTPS強制、CORS設定、レート制限、入力バリデーション、パスワードハッシュ化（bcrypt）、JWT有効期限、セキュリティヘッダー（helmet）`\nチェックリストをもとに未対応の項目を洗い出す',
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
          content: 'ドキュメント化する対象を決める:\n- APIエンドポイント（ルートファイル一式）\n- 共通ユーティリティ関数\n- データモデル / 型定義\n**Cmd+P**で対象ファイルを開き、関数・クラスの一覧を把握する',
        },
        {
          title: 'APIドキュメントを生成する',
          content: 'APIのルートファイルを選択し、**Cmd+L**（チャット）で依頼する:\n`このAPIエンドポイントのドキュメントをOpenAPI 3.0形式で生成して。各エンドポイントに以下を含めて: summary、description、parameters、requestBody、responses（200, 400, 401, 500）、リクエスト/レスポンスのサンプル値`',
        },
        {
          title: 'コードコメントを追加する',
          content: '関数やクラスを含むファイルを開き、**Cmd+K**で全体を選択して依頼する:\n`このコードにTSDocコメントを追加して。各関数に@param, @returns, @throws, @exampleを含めて`\n追加後の確認:\n- 説明が実際の処理と一致しているか\n- `@example`のコードが実行可能か\n- 型情報と`@param`の型が一致しているか',
        },
        {
          title: 'READMEを生成する',
          content: '**Cmd+I**（Composer）で以下を依頼する:\n`このプロジェクトのREADME.mdを生成して。以下のセクションを含めて: 1. プロジェクト概要 2. 必要な環境（Node.jsバージョン等） 3. セットアップ手順（git clone→npm install→環境変数設定→起動） 4. API一覧表 5. 環境変数の説明（.env.exampleの内容） 6. テストの実行方法`\n生成後、手順通りにセットアップできるか実際に確認する',
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
          content: '**Cmd+N**で新規ファイルを作成し、LPに必要なセクションを箇条書きで整理する:\n- `<header>`: ロゴ + ナビゲーション\n- `<section>` ヒーロー: キャッチコピー + CTA ボタン\n- `<section>` 特徴: 3カラムの特徴紹介\n- `<section>` 実績: 数字で見る実績（顧客数、導入企業数等）\n- `<section>` CTA: お問い合わせフォーム\n- `<footer>`: コピーライト + SNSリンク',
        },
        {
          title: 'AIにHTML構造を生成させる',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`ランディングページのセマンティックHTMLを生成して。構成: header(ロゴ+ナビ)、hero section(見出し+サブテキスト+CTAボタン)、features section(3カラム)、footer。HTML5のセマンティックタグ(header, nav, main, section, footer)を使って`',
        },
        {
          title: 'セマンティックHTMLを確認する',
          content: '生成されたHTMLを以下のチェックリストで確認する:\n- `<header>`内に`<nav>`があるか\n- `<main>`タグでメインコンテンツが囲まれているか\n- 各セクションに`<section>`と見出し（`<h2>`）があるか\n- `<div>`の乱用がないか（意味のある要素はセマンティックタグを使う）\n問題があれば**Cmd+K**で選択して修正を指示する',
        },
        {
          title: 'アクセシビリティ対応を依頼する',
          content: '**Cmd+K**でHTML全体を選択し、以下を指示する:\n`以下のアクセシビリティ対応を追加して: 1. 画像にalt属性 2. ボタンにaria-label 3. ナビゲーションにaria-label="メインナビゲーション" 4. フォーム要素にlabel 5. lang="ja"属性 6. 見出しの階層が正しいか（h1→h2→h3の順）`',
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
          content: '作りたいアニメーションを具体的に書き出す:\n- **transition**: ホバー時の色変化、フォーカス時の枠線変化\n- **keyframes**: ローディングスピナー、フェードイン、スライドイン\n- **スクロール連動**: スクロールで要素がふわっと表示\n動きの方向（上→下、左→右）、速さ（0.3s〜1s）、イージング（ease-out等）もメモする',
        },
        {
          title: 'AIにtransitionアニメーションを依頼する',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`ボタンのホバーアニメーションをCSSで3パターン作って: 1. 背景色が0.3sでスムーズに変化 2. ボタンが少し浮き上がる(translateY + box-shadow) 3. 下線が左から右にスライドイン。それぞれtransitionプロパティを使って`\n各パターンをブラウザで確認する',
        },
        {
          title: 'keyframesアニメーションを生成する',
          content: 'チャットで続けて依頼する:\n`@keyframesを使ったローディングスピナーを3パターン作って: 1. 円が回転(rotate) 2. 3つのドットが順番に弾む(bounce) 3. パルス（拡大縮小+透明度変化）。animation-durationは1s、infinite loopで`\n生成されたCSSをファイルに適用し、表示を確認する',
        },
        {
          title: 'アニメーションを組み合わせる',
          content: '**Cmd+L**で以下を依頼する:\n`ページロード時に以下のアニメーションを順番に発火させて: 1. ヘッダーが上からスライドイン(0s) 2. ヒーローテキストがフェードイン(0.3s遅延) 3. CTAボタンがスケールアップ(0.6s遅延)。animation-delayを使って`\n全体の流れがスムーズか確認する',
        },
        {
          title: 'パフォーマンスを最適化する',
          content: '**Cmd+K**でアニメーションCSSを選択し、以下を指示する:\n`このアニメーションをGPU加速が効くプロパティのみに修正して。使ってよいプロパティ: transform, opacity。使わない: width, height, margin, top, left`\nDevToolsの**Performance**タブでアニメーション中のフレームレートが60fpsに近いか確認する',
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
          content: '以下のブレイクポイントをCSS変数またはメディアクエリで定義する:\n- **モバイル**: 〜768px（1カラム、ハンバーガーメニュー）\n- **タブレット**: 769〜1024px（2カラム）\n- **デスクトップ**: 1025px〜（3カラム、サイドナビ表示）\nモバイルファーストのため、基本スタイルはモバイル用、`@media (min-width: 769px)`で拡張する',
        },
        {
          title: 'AIにモバイルファーストのCSSを生成させる',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`モバイルファーストで3カラムレイアウトのレスポンシブCSSを作って。仕様: モバイル(1カラム/縦並び)、タブレット(2カラム/grid)、デスクトップ(3カラム/grid)。カラム間のgapは16px、各カラムにpadding: 16pxのカードを配置`',
        },
        {
          title: 'Flexbox/Gridの使い分けを確認する',
          content: '生成されたCSSを以下の基準でチェックする:\n- **Grid**: 2次元レイアウト（行と列の両方を制御）→ カード一覧、ダッシュボード\n- **Flexbox**: 1次元レイアウト（横並びまたは縦並び）→ ナビゲーション、ボタングループ\n不適切な使い方があれば**Cmd+K**で選択し、`このレイアウトをGridからFlexboxに変更して`と指示する',
        },
        {
          title: '画像のレスポンシブ対応を追加する',
          content: 'チャットで以下を依頼する:\n`画像のレスポンシブ対応を追加して。以下を実装: 1. <picture>要素でWebP/JPEG切り替え 2. srcset属性で解像度別画像(1x, 2x) 3. CSSでmax-width: 100%とheight: auto 4. loading="lazy"で遅延読み込み`',
        },
        {
          title: '各デバイスで表示を確認する',
          content: 'ブラウザの**DevTools**（**F12**）→ **デバイスツールバー**（**Cmd+Shift+M**）で以下を確認する:\n- iPhone SE（375px）: 1カラムで要素が重なっていないか\n- iPad（768px）: 2カラムで余白が適切か\n- デスクトップ（1280px）: 3カラムで均等に並んでいるか\n- 各サイズでフォントが読みやすいか',
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
          content: '以下のテンプレートに沿ってデザインを文章で記述する:\n- **レイアウト**: 「ヘッダー固定、2カラム（左サイドバー240px + メインコンテンツ）」\n- **カラー**: 「メイン: #3B82F6、背景: #F9FAFB、テキスト: #111827」\n- **タイポグラフィ**: 「見出し: 24px/bold、本文: 16px/regular、行間: 1.6」\n- **余白**: 「セクション間: 64px、カード内padding: 24px、要素間: 16px」\n- **角丸/影**: 「カード角丸: 8px、ボタン角丸: 4px、カード影: shadow-md」',
        },
        {
          title: 'AIにコードを生成させる',
          content: '**Cmd+L**（チャット）にデザインの記述を貼り付け、以下のように依頼する:\n`このデザイン仕様をHTMLとCSSで実装して。CSSはカスタムプロパティ（変数）を使って色やサイズを管理して。BEMやutility-firstなどの命名規則は[Tailwind CSS/BEM]で`\n生成されたコードを新規ファイルに保存する',
        },
        {
          title: '生成結果をプレビューする',
          content: '生成されたHTMLファイルをブラウザで開き（**ターミナル**で`open index.html`）、以下を確認する:\n- レイアウト構造が指定通りか\n- 色が正しいか（DevToolsのカラーピッカーで確認）\n- 余白が指定したサイズに近いか（DevToolsでComputed値を確認）',
        },
        {
          title: 'フィードバックして修正する',
          content: 'イメージと異なる箇所を具体的な数値で指示する。**Cmd+L**で:\n`以下を修正して: 1. ヘッダーの高さを64pxから80pxに 2. カード間のgapを16pxから24pxに 3. CTAボタンの角丸を4pxから9999px（完全な丸角）に 4. フッターの背景色を#F9FAFBから#1F2937に変更`\n修正ごとにブラウザで確認する',
        },
        {
          title: 'コードを最適化する',
          content: '**Cmd+K**でCSS全体を選択し、以下を依頼する:\n`このCSSを最適化して: 1. 重複するプロパティを統合 2. ショートハンド記法に変換（margin, padding, border等） 3. 未使用のセレクタを削除 4. カスタムプロパティの命名を統一`\n最適化前後でブラウザ表示が変わっていないか確認する',
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
          content: 'プロジェクトで使うアイコンを一覧にする:\n- **ナビゲーション**: ホーム、戻る、メニュー（ハンバーガー）、閉じる（×）\n- **アクション**: 検索、追加（+）、編集（ペン）、削除（ゴミ箱）\n- **ステータス**: チェックマーク、警告、情報、エラー\n共通仕様: `viewBox="0 0 24 24"`, `stroke-width="2"`, `fill="none"`',
        },
        {
          title: 'AIにSVGアイコンを生成させる',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`以下の仕様でSVGアイコンを作って: アイコン名: ホーム、viewBox: 0 0 24 24、スタイル: line(stroke)ベース、stroke-width: 2、色: currentColor。シンプルで視認性の高いデザインで`\n生成されたSVGをブラウザで表示して確認する',
        },
        {
          title: 'スタイルをカスタマイズする',
          content: '**Cmd+K**で生成されたSVGを選択し、以下を指示する:\n`このSVGを修正: 1. stroke="currentColor"に統一 2. stroke-linecap="round" stroke-linejoin="round"を追加 3. fill="none"に統一 4. widthとheight属性を削除（CSSで制御するため）`\n`currentColor`を使うことで、CSSの`color`プロパティでアイコンの色を制御できる',
        },
        {
          title: 'SVGを最適化する',
          content: '**Cmd+L**で以下を依頼する:\n`このSVGを最適化して: 1. 不要な属性（xmlns以外のnamespace等）を削除 2. 数値の小数点以下を2桁に丸める 3. 冗長なパスを簡略化 4. 空のグループ要素を削除`\n最適化前後のファイルサイズを比較し、表示が変わっていないか確認する',
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
          content: '以下のテンプレートでプロジェクトの雰囲気を整理する:\n- **業種/用途**: コーポレートサイト / ECサイト / ポートフォリオ\n- **雰囲気**: 信頼感 / カジュアル / ナチュラル / モダン\n- **キーカラー**: ブランドカラーがあれば記載（例: `#3B82F6`）\n- **参考サイト**: イメージに近いサイト名やURL',
        },
        {
          title: 'AIにカラーパレットを生成させる',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`ブルー系のコーポレートサイト用カラーパレットを生成して。以下の5色を含めて: 1. Primary（メインカラー） 2. Secondary（アクセントカラー） 3. Background（背景色） 4. Text（文字色） 5. Border（境界線色）。各色のHEXコードとRGB値を出力して`',
        },
        {
          title: 'CSS変数に変換する',
          content: 'チャットで続けて依頼する:\n`このカラーパレットをCSSカスタムプロパティに変換して。:root内に定義し、以下の命名規則で: --color-primary, --color-secondary, --color-bg, --color-text, --color-border。使用例のCSSも一緒に出力して`\n生成されたCSSを`globals.css`または`variables.css`に追加する',
        },
        {
          title: 'ダークモード対応を追加する',
          content: '**Cmd+L**で以下を依頼する:\n`ダークモード用のカラーパレットも生成して。ライトモードの各色に対応するダーク用の色を定義し、以下のCSSで切り替えて:\n@media (prefers-color-scheme: dark) { :root { --color-bg: #1F2937; ... } }\nコントラスト比がWCAG AA基準（4.5:1以上）を満たすか確認して`',
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
          content: '**Cmd+N**で新規ファイルを作成し、以下のテンプレートで基本情報を整理する:\n- **背景**: なぜこの企画が必要か（現状の課題）\n- **目的**: 何を実現したいか（定量目標があれば記載）\n- **ターゲット**: 誰に向けた施策か（ペルソナ像）\n- **スコープ**: 今回やること / やらないこと\n- **期間**: いつまでに実現するか',
        },
        {
          title: 'AIに企画書の構成を提案させる',
          content: '**Cmd+L**（チャット）にまとめた概要を貼り付け、以下のように依頼する:\n`この情報を基に企画書の目次構成を提案して。読者は経営層。以下のセクションを含めて: エグゼクティブサマリー、背景と課題、解決策、期待効果（KPI付き）、スケジュール、予算概算、リスクと対策`',
        },
        {
          title: '各セクションの内容を生成する',
          content: '構成の各セクションについて、チャットで1つずつ依頼する:\n`「課題分析」セクションの内容を書いて。現状のデータや数字を[ここに実データを挿入]として、具体的な課題を3つ挙げて`\n**ポイント**: AIの出力をそのまま使わず、実際のデータや社内用語に置き換える',
        },
        {
          title: '競合分析を追加する',
          content: 'チャットで以下を依頼する:\n`以下の競合サービスとの比較表を作って: [競合A], [競合B], [競合C]。比較軸: 機能、価格、ターゲット層、強み/弱み。表形式（Markdown）で出力して`\n**注意**: AIの競合情報は不正確な場合があるため、公式サイトで事実確認する',
        },
        {
          title: '最終的な企画書に仕上げる',
          content: '以下のチェックリストで最終確認する:\n- 数字やデータが実際の値か（AIが推測した値が混ざっていないか）\n- 社内用語が正しく使われているか\n- 結論（推奨アクション）が明確か\n- 次のアクション（誰が何をいつまでに）が記載されているか\n**Cmd+L**で`この企画書全体を経営層の視点でレビューして、改善点を指摘して`と依頼する',
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
          content: '**Cmd+N**で新規ファイルを作成し、以下を記載する:\n- **プロジェクト名**: 正式名称\n- **目的**: 何を解決するWebアプリか\n- **スコープ**: Phase1で実装する範囲\n- **主要機能**: ユーザーストーリー形式で3〜5個（「〇〇として△△したい、なぜなら□□だから」）\n- **技術スタック**: 使用予定のフレームワーク・インフラ',
        },
        {
          title: 'AIに要件定義のフォーマットを提案させる',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`Webアプリの要件定義書テンプレートを作って。以下のセクションを含めて: 1. プロジェクト概要 2. 用語定義 3. 機能要件（優先度付き） 4. 非機能要件 5. 画面一覧 6. API一覧 7. データモデル 8. 制約事項 9. 前提条件`',
        },
        {
          title: '機能要件を洗い出す',
          content: 'チャットで以下を依頼する:\n`ECサイトの機能要件を優先度（Must/Should/Could）付きで洗い出して。カテゴリ: ユーザー管理、商品管理、カート、注文、決済、管理画面。各機能にID（FR-001等）を振って`\n洗い出した機能をプロジェクトのスコープに合わせて取捨選択する',
        },
        {
          title: '非機能要件を定義する',
          content: 'チャットで以下を依頼する:\n`以下のカテゴリで非機能要件を定義して: 1. パフォーマンス（応答時間3秒以内等） 2. セキュリティ（OWASP Top 10対策等） 3. 可用性（稼働率99.9%等） 4. スケーラビリティ（同時接続数等） 5. 保守性（ログ出力要件等）。各要件にID（NFR-001等）を振って`',
        },
        {
          title: '要件定義書を完成させる',
          content: '以下のチェックリストで最終確認する:\n- 全機能要件にID・優先度・受け入れ条件が記載されているか\n- 非機能要件に具体的な数値基準があるか\n- 画面一覧と画面遷移が整合しているか\n- 技術スタックとの整合性に問題がないか\n**Cmd+L**で`この要件定義書に漏れている項目がないかチェックして`と依頼する',
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
          content: '会議中に取ったメモを用意する（完璧でなくてOK）。メモの例:\n`・新機能の優先度について→田中: ログイン機能を先に、佐藤: ダッシュボードが先では？→結論: ログイン優先\n・リリース日: 3月末→4月中旬に延期の可能性\n・次回MTG: 来週火曜 14:00`',
        },
        {
          title: 'AIに議事録形式に整理させる',
          content: '**Cmd+L**（チャット）にメモを貼り付け、以下のように依頼する:\n`このメモを議事録形式に整理して。以下のフォーマットで: 1. 会議名 2. 日時 3. 参加者 4. 議題一覧 5. 各議題の討議内容と決定事項 6. アクションアイテム（担当者・期限付き） 7. 次回会議の予定`',
        },
        {
          title: 'アクションアイテムを抽出する',
          content: 'チャットで続けて依頼する:\n`議事録からアクションアイテムを表形式で抽出して。列: No., タスク内容, 担当者, 期限, ステータス(未着手)。期限が不明な場合は「要確認」と記載して`\n抽出されたアイテムが会議の決定事項と整合しているか確認する',
        },
        {
          title: '最終確認と共有',
          content: '以下のチェックリストで確認してから共有する:\n- 参加者名が正しいか（AIが勝手に追加・変更していないか）\n- 決定事項が実際の会議内容と一致しているか\n- AIが「推測」で追加した内容がないか\n- 機密情報が含まれていないか\n**重要**: AIは文脈から内容を補完することがあるため、事実確認は必須',
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
          content: '**Cmd+L**（チャット）に以下の情報を入力する:\n`以下のプロジェクトの計画を立てたい:\n・目標: [ECサイトのリニューアル]\n・期間: 3ヶ月（4月〜6月）\n・チーム: PM1名、FE2名、BE2名、デザイナー1名\n・主要マイルストーン: 要件定義→設計→開発→テスト→リリース`',
        },
        {
          title: 'WBSを作成する',
          content: 'チャットで以下を依頼する:\n`このプロジェクトのWBS（Work Breakdown Structure）を作成して。レベル3まで分解して。フォーマット: 1. フェーズ > 1.1 タスクグループ > 1.1.1 具体的タスク。各タスクに見積もり工数（人日）も付けて`\n工数の合計がチームのキャパシティと合っているか確認する',
        },
        {
          title: 'スケジュールを作成する',
          content: 'チャットで続けて依頼する:\n`WBSをもとにMarkdownの表形式でスケジュールを作成して。列: タスク名, 担当, 開始日, 終了日, 前提タスク。週単位の粒度で。バッファ（各フェーズの末尾に1週間）も含めて`\nタスクの依存関係（前提タスクが完了しないと始められないもの）が正しいか確認する',
        },
        {
          title: 'リスク管理表を作成する',
          content: 'チャットで以下を依頼する:\n`このプロジェクトのリスク管理表を作って。表形式で以下を含めて: リスク名, 発生確率(高/中/低), 影響度(高/中/低), 対策（予防策と発生時の対応）, 担当者。最低5つのリスクを洗い出して`',
        },
        {
          title: '計画書としてまとめる',
          content: '**Cmd+I**（Composer）で以下を依頼する:\n`ここまでの内容をプロジェクト計画書としてMarkdownファイルにまとめて。セクション: 1. プロジェクト概要 2. 体制 3. WBS 4. スケジュール 5. リスク管理 6. コミュニケーション計画（会議体と頻度）`\n完成した計画書をチームメンバーにレビューしてもらう',
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
          content: '以下から1つ選ぶ（または自分のプロジェクトに関連するトピック）:\n- **API**: システム間のデータ連携の仕組み\n- **クラウド**: AWS/GCPなどのインフラ\n- **セキュリティ**: 認証・暗号化・脆弱性対策\n- **CI/CD**: 自動テスト・自動デプロイ\n説明する相手（経営層 / クライアント / 営業チーム）も決めておく',
        },
        {
          title: 'AIに非技術者向けの説明を生成させる',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`APIとは何かを、技術知識のない経営者向けに説明する資料を作って。以下の条件で: 1. レストランの注文に例えて説明 2. 専門用語には必ず（）で簡単な説明を付ける 3. 「なぜ自社に必要か」のセクションを含める 4. A4で2ページ以内に収まる量で`',
        },
        {
          title: '図解用のテキストを生成させる',
          content: 'チャットで続けて依頼する:\n`この説明に使える図解を3つ提案して。各図解について: 1. 図のタイトル 2. 図に含める要素（矢印、ラベル等）をテキストで記述 3. どのスライドで使うか。PowerPointやFigmaで作れるシンプルな構成で`',
        },
        {
          title: 'FAQ を追加する',
          content: 'チャットで以下を依頼する:\n`この技術について、非技術者から想定される質問と回答を5つ作って。例: 「費用はどのくらいかかるの？」「セキュリティは大丈夫？」「導入にどのくらい時間がかかる？」。回答は専門用語を使わず2〜3文で`\n回答内容が自社の状況と合っているか確認し、必要に応じて修正する',
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
      targetRoles: ['non-engineer'],
      steps: [
        {
          title: 'メールのシーンを設定する',
          content: '以下から作成するメールのシーンを選ぶ:\n- **お礼**: 打ち合わせ後のフォローアップ\n- **依頼**: 資料送付のお願い、スケジュール調整\n- **謝罪**: 納期遅延のお詫び\n- **提案**: 新サービスの紹介\n宛先（社内上司 / 取引先 / 新規顧客）も決めておく',
        },
        {
          title: 'AIにメール文面を生成させる',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`取引先への打ち合わせお礼メールを作成して。条件: 1. 宛先: 株式会社○○ 田中様 2. 内容: 本日の打ち合わせのお礼と次回アクションの確認 3. トーン: 丁寧だが堅すぎない 4. 件名も含めて 5. 署名欄は[自分の名前]で`',
        },
        {
          title: '別のシーンのメールも作成する',
          content: 'チャットで続けて以下のパターンも依頼する:\n`納期延長をお願いするメールを作って。条件: 理由は開発の技術的課題、延期期間は2週間、代替案（中間報告の実施）を提示`\nさらに:\n`新規サービスを提案するメールを作って。条件: 初回メール、相手は面識なし、3行以内で興味を引く導入文`',
        },
        {
          title: 'トーンを調整する',
          content: '生成されたメールのトーンを調整する。**Cmd+L**で:\n`このメールをもう少しカジュアルにして。「お世話になっております」を「いつもありがとうございます」に変えて`\nまたは:\n`このメールをよりフォーマルにして。社外の役員向けの敬語レベルで`\n最終的に自分の言葉に近いか確認してから送信する',
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
      targetRoles: ['non-engineer'],
      steps: [
        {
          title: 'プレゼンの目的と対象者を決める',
          content: '以下のテンプレートで整理する:\n- **テーマ**: 会社紹介 / サービス提案 / 月次報告\n- **目的**: 何を伝えたいか（1文で）\n- **対象者**: 社内経営層 / クライアント / 新入社員\n- **持ち時間**: 10分 / 30分 / 60分\n- **キーメッセージ**: プレゼン後に覚えてほしいこと（1つ）',
        },
        {
          title: 'AIにアウトラインを作成させる',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`会社紹介プレゼンのアウトライン（10枚構成/10分）を作って。以下を含めて: 1. タイトルスライド 2. 会社概要 3. ミッション/ビジョン 4. 事業内容 5-6. 主要サービス 7. 実績/数字 8. チーム紹介 9. 今後の展望 10. お問い合わせ。各スライドに見出しとサブテキストを付けて`',
        },
        {
          title: '各スライドの内容を生成する',
          content: 'アウトラインの各スライドについて、チャットで依頼する:\n`スライド4「事業内容」の内容を作って。条件: 1. 見出し1つ 2. 箇条書き3点（各20文字以内） 3. 図やグラフの提案（何を可視化すべきか） 4. 強調すべきキーワード`\nスライドの情報量が多すぎないか確認する（1スライド=1メッセージが理想）',
        },
        {
          title: 'トークスクリプトを生成する',
          content: 'チャットで以下を依頼する:\n`各スライドの説明用トークスクリプトを作って。条件: 1. 1スライド1分で話せる量（150〜200文字） 2. 「このスライドでは〜」で始めない自然な話し方 3. 聴衆に問いかけるフレーズを各スライドに1つ入れて`\nスクリプトを声に出して読み、時間内に収まるか確認する',
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
      targetRoles: ['non-engineer'],
      steps: [
        {
          title: '整理したいデータを準備する',
          content: '以下のようなデータを用意する（メールやチャットからコピーでOK）:\n`田中太郎 営業部 03-1234-5678\n佐藤花子 マーケティング部 03-2345-6789\n鈴木一郎 営業部 03-3456-7890`\nまたは売上データ、アンケート結果など、整理が必要なデータを集める',
        },
        {
          title: 'AIにCSV形式への変換を依頼する',
          content: '**Cmd+L**（チャット）にデータを貼り付け、以下のように依頼する:\n`このデータをCSV形式に変換して。条件: 1. ヘッダー行を追加（名前,部署,電話番号） 2. 全角数字は半角に統一 3. 電話番号はハイフン付きで統一 4. 文字コードはUTF-8で`',
        },
        {
          title: 'データのクレンジングを依頼する',
          content: 'チャットで続けて依頼する:\n`このCSVデータをクレンジングして: 1. 重複行を削除 2. 部署名の表記ゆれを統一（例: 営業部/営業課→営業部） 3. 空欄のセルを「未入力」に置換 4. 修正した箇所を一覧で教えて`\n修正内容が正しいか確認する',
        },
        {
          title: '簡単な集計を依頼する',
          content: 'チャットで以下を依頼する:\n`このデータで以下の集計をCSV形式で出力して: 1. 部署別の人数 2. 最も人数が多い部署 3. データの総件数`\nまたは売上データの場合:\n`月別の売上合計と前月比（%）をCSV形式で出力して`\nExcelに貼り付けて使う場合は`タブ区切りで出力して`と指定する',
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
      targetRoles: ['non-engineer'],
      steps: [
        {
          title: 'ページの内容を考える',
          content: '以下のテンプレートで掲載内容を整理する:\n- **ページの目的**: 部署紹介 / イベント告知 / マニュアル\n- **掲載内容**: 部署名、メンバー一覧（名前+役職）、主な業務内容、連絡先\n- **デザインイメージ**: シンプル / カラフル / コーポレート\n- **参考**: イメージに近いWebページがあればメモ',
        },
        {
          title: 'AIにHTMLページの生成を依頼する',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`部署紹介ページをHTMLで作って。条件: 1. CSSも含めた1つのHTMLファイル 2. 部署名「マーケティング部」 3. メンバー紹介（名前+役職を3名分）  4. 主な業務内容を箇条書きで 5. 連絡先セクション 6. シンプルで見やすいデザイン 7. 背景色は白、メインカラーは青系`',
        },
        {
          title: '内容をカスタマイズする',
          content: '見た目を調整したい箇所をAIに伝える。**Cmd+L**で:\n`以下を修正して: 1. 見出しの色を#2563EBに変えて 2. メンバー紹介をカード形式（横並び）にして 3. 写真を配置するプレースホルダー（グレーの四角）を追加して 4. フッターにコピーライトを追加して`\nHTMLの知識がなくても、見た目の言葉で指示すればOK',
        },
        {
          title: 'ブラウザでプレビューする',
          content: '生成されたHTMLをファイルに保存し（**Cmd+S**）、以下の方法でプレビューする:\n- ファイルを右クリック → 「ブラウザで開く」\n- またはターミナルで`open index.html`（Mac）\n表示を確認し、気になる点をメモする',
        },
        {
          title: '修正を繰り返す',
          content: '気になる点を1つずつAIに伝えて修正する。指示の例:\n- `文字が小さいので本文のフォントサイズを16pxにして`\n- `メンバーカードの間隔をもう少し広くして`\n- `スマートフォンでも見やすいようにレスポンシブ対応して`\n2〜3回の修正で完成を目指す。完璧でなくてもまずは公開することが大事',
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
      targetRoles: ['non-engineer'],
      steps: [
        {
          title: 'レポートの目的と種類を決める',
          content: '以下から作成するレポートを選ぶ:\n- **月次業務報告**: 今月の成果、課題、来月の計画\n- **売上分析**: 売上推移、商品別内訳、前年比\n- **プロジェクト進捗**: 完了タスク、遅延状況、リスク\n対象読者（直属の上司 / 経営層 / チーム全体）も決めておく',
        },
        {
          title: 'AIにテンプレートを生成させる',
          content: '**Cmd+L**（チャット）で以下のように依頼する:\n`月次業務レポートのテンプレートをMarkdown形式で作って。以下のセクションを含めて: 1. レポート概要（対象期間・作成者） 2. サマリー（3行以内） 3. 今月の成果（KPI実績） 4. 課題と対策 5. 来月の計画 6. 特記事項。各セクションに記入例も付けて`',
        },
        {
          title: 'データからレポート文を生成する',
          content: '実データをチャットに貼り付け、以下のように依頼する:\n`以下のデータを基にレポートの本文を作成して: [売上: 1月 500万円, 2月 480万円, 3月 620万円]。前月比と3ヶ月のトレンドを分析して、ポジティブな点と改善が必要な点を分けて記述して`\n**注意**: 数値が正しく反映されているか必ず確認する',
        },
        {
          title: 'サマリーと改善提案を追加する',
          content: 'チャットで以下を依頼する:\n`このレポートに以下を追加して: 1. エグゼクティブサマリー（3行以内で要点を凝縮） 2. 来月への改善提案（具体的なアクション3つ、各提案に期待効果を付記）`\n最終確認:\n- 数値データが正確か\n- 提案が実行可能か\n- 読者にとって分かりやすい構成か',
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
