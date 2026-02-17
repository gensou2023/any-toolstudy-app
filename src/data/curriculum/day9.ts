import { DayCurriculum } from '@/types';

export const day9: DayCurriculum = {
  dayId: 9,
  title: 'AIツール活用 — ChatGPT/Gemini/NotebookLM',
  description: '様々なAIツールの使い方と使い分けを学び、業務に活かせるスキルを身につけよう',
  emoji: '🤖',
  quests: [
    {
      id: 'day9-intern-quest1',
      dayId: 9,
      title: 'ChatGPTプロンプト術',
      description: 'ChatGPTを使いこなすためのプロンプトの書き方を学ぼう',
      difficulty: 1,
      estimatedMinutes: 15,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'ChatGPTの基本を知る',
          content: 'ChatGPTにアクセスし、基本的な使い方（質問の入力、会話の継続）を確認しよう',
        },
        {
          title: '具体的な質問をする',
          content: '漠然とした質問と具体的な質問の違いを体験しよう。「マーケティングとは？」vs「BtoB SaaSのマーケティング手法を5つ教えて」',
        },
        {
          title: '役割を指定する',
          content: '「あなたはプロのライターです」のように役割を与えて、出力の質の変化を確認しよう',
        },
        {
          title: '出力形式を指定する',
          content: '「表形式で」「箇条書きで」「500文字以内で」のように出力形式を制御しよう',
        },
      ],
      challenge: '3つの異なるプロンプトテクニックを使い、同じテーマで回答の違いを比較しよう',
      hints: [
        '「〜として」で役割を指定、「〜形式で」で出力を制御するのが基本テクニック',
        'AIに「この質問をもっと良いプロンプトに改善して」と聞くのも有効',
      ],
      checkQuestions: [
        {
          question: 'ChatGPTでより良い回答を得るためのコツは？',
          options: [
            'できるだけ短い質問をする',
            '質問を繰り返し送る',
            '具体的な条件や出力形式を指定する',
            '英語で質問する',
          ],
          correctIndex: 2,
          explanation: '具体的な条件（役割、制約、出力形式）を指定することで、AIはより適切な回答を生成できます',
        },
      ],
    },
    {
      id: 'day9-intern-quest2',
      dayId: 9,
      title: 'Geminiとの比較体験',
      description: 'Google Gemini を使い、ChatGPTとの違いや得意分野を比較しよう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'Geminiにアクセスする',
          content: 'gemini.google.com にアクセスし、Googleアカウントでログインしよう',
        },
        {
          title: '同じ質問を両方に聞く',
          content: '同じ質問をChatGPTとGeminiの両方に投げて、回答の違いを比較しよう',
        },
        {
          title: 'Geminiの特徴を体験する',
          content: 'Geminiの得意分野（最新情報の検索、Google連携）を試してみよう',
        },
        {
          title: '使い分けのポイントを整理する',
          content: 'どんな場面でChatGPTとGeminiを使い分けるか、自分なりの基準をまとめよう',
        },
      ],
      challenge: '5つの異なるタスクでChatGPTとGeminiの回答を比較し、得意分野をまとめよう',
      hints: [
        'Geminiは最新の情報検索やGoogle Workspaceとの連携が得意',
        'ChatGPTはコード生成や長文の構成が得意な傾向がある',
      ],
      checkQuestions: [
        {
          question: 'AIツールを使い分ける際に重要なのは？',
          options: [
            '1つのAIだけ使う',
            'タスクの種類に応じて得意なAIを選ぶ',
            '常に最新のAIを使う',
            'AIは使わない',
          ],
          correctIndex: 1,
          explanation: 'AIツールにはそれぞれ得意分野があるため、タスクに応じて使い分けることで効率が上がります',
        },
      ],
    },
    {
      id: 'day9-intern-quest3',
      dayId: 9,
      title: 'NotebookLM活用',
      description: 'Google NotebookLMを使って資料を効率よく分析・要約する方法を学ぼう',
      difficulty: 2,
      estimatedMinutes: 20,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'NotebookLMとは何かを知る',
          content: 'NotebookLMにアクセスし、資料（PDF等）をアップロードして使う方法を確認しよう',
        },
        {
          title: '資料をアップロードする',
          content: 'サンプルのPDFやWebページのURLをNotebookLMに追加しよう',
        },
        {
          title: '資料に質問する',
          content: 'アップロードした資料の内容について質問し、AIが資料に基づいて回答することを確認しよう',
        },
        {
          title: '要約とノートを作成する',
          content: 'NotebookLMの要約機能やノート生成機能を使って、資料のポイントをまとめよう',
        },
      ],
      challenge: '1つの資料をNotebookLMにアップロードし、5つの質問に基づいた要約を作成しよう',
      hints: [
        'NotebookLMは資料に基づいた回答に特化しているため、出典が明確で信頼性が高い',
        '複数の資料を同時にアップロードして横断的に質問もできる',
      ],
      checkQuestions: [
        {
          question: 'NotebookLMの特徴として正しいのは？',
          options: [
            'インターネット全体を検索する',
            'アップロードした資料に基づいて回答する',
            'コードの生成が得意',
            'リアルタイム翻訳ができる',
          ],
          correctIndex: 1,
          explanation: 'NotebookLMはアップロードした資料をソースとして使い、その内容に基づいた回答を生成します',
        },
      ],
    },
    {
      id: 'day9-intern-quest4',
      dayId: 9,
      title: 'AIツール使い分けガイド',
      description: '学んだAIツールの特徴を整理し、場面に応じた使い分けガイドを作ろう',
      difficulty: 2,
      estimatedMinutes: 15,
      targetRoles: ['student-intern'],
      steps: [
        {
          title: 'ツール一覧を整理する',
          content: 'Cursor、ChatGPT、Gemini、NotebookLMの特徴を比較表にまとめよう',
        },
        {
          title: '業務シーン別の最適ツールを考える',
          content: 'メール作成、資料要約、コーディング、リサーチなどの場面で最適なツールを選定しよう',
        },
        {
          title: 'ガイド資料を作成する',
          content: 'AIを使って「AIツール使い分けガイド」のドキュメントを作成しよう',
        },
        {
          title: '他の人に共有する',
          content: '作成したガイドを分かりやすくまとめ、チームに共有できる形式に整えよう',
        },
      ],
      challenge: '4つのAIツールの使い分けガイドを作成し、5つ以上の業務シーンでの推奨ツールをまとめよう',
      hints: [
        'AIに「各ツールの比較表を作って」と依頼すると効率よくまとまる',
        '実際に使った経験を元にした具体例を入れると説得力が増す',
      ],
      checkQuestions: [
        {
          question: 'AIツールの使い分けで最も重要なのは？',
          options: [
            '最も高価なツールを選ぶ',
            'タスクの種類に応じて最適なツールを選ぶ',
            '1つのツールだけを極める',
            '常に最新のツールに乗り換える',
          ],
          correctIndex: 1,
          explanation: '各AIツールには得意分野があるため、タスクの種類に応じて最適なツールを選ぶことが重要です',
        },
      ],
    },
  ],
};
