export interface ToolLink {
  name: string;
  url: string;
  emoji: string;
  description: string;
}

export const DEFAULT_TOOL_LINKS: ToolLink[] = [
  { name: 'ChatGPT', url: 'https://chat.openai.com', emoji: '💬', description: 'AIチャットで質問・相談' },
  { name: 'Gemini', url: 'https://gemini.google.com', emoji: '✨', description: 'Google AIで検索・分析' },
  { name: 'NotebookLM', url: 'https://notebooklm.google.com', emoji: '📓', description: '資料の分析・要約' },
  { name: 'Notion', url: 'https://www.notion.so', emoji: '📝', description: 'ドキュメント・タスク管理' },
  { name: 'Slack', url: 'https://slack.com', emoji: '💼', description: 'チームコミュニケーション' },
  { name: 'Backlog', url: 'https://backlog.com', emoji: '📋', description: 'プロジェクト管理' },
];
