import { Client } from '@notionhq/client';

interface FeedbackData {
  nickname: string;
  type: 'quest' | 'general';
  questTitle: string | null;
  rating: number | null;
  comment: string | null;
}

export async function saveToNotion(feedback: FeedbackData): Promise<boolean> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_FEEDBACK_DB_ID;

  if (!apiKey || !databaseId) {
    console.log('[Notion] API key or DB ID not configured, skipping');
    return false;
  }

  try {
    const notion = new Client({ auth: apiKey });

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        ユーザー名: {
          title: [{ text: { content: feedback.nickname } }],
        },
        種別: {
          select: {
            name: feedback.type === 'general' ? '一般' : 'クエスト',
          },
        },
        クエスト名: {
          rich_text: [{ text: { content: feedback.questTitle || '' } }],
        },
        評価: {
          number: feedback.rating,
        },
        コメント: {
          rich_text: [{ text: { content: feedback.comment || '' } }],
        },
        日時: {
          date: { start: new Date().toISOString() },
        },
      },
    });

    return true;
  } catch (error) {
    console.error('[Notion] Error saving feedback:', error);
    return false;
  }
}
