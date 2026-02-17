interface SlackMessage {
  text: string;
  blocks?: Record<string, unknown>[];
}

export async function sendSlackNotification(message: SlackMessage): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log('[Slack] Webhook URL not configured, skipping notification');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error('[Slack] Failed to send notification:', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Slack] Error sending notification:', error);
    return false;
  }
}

export function formatFeedbackMessage(
  nickname: string,
  questTitle: string | null,
  rating: number | null,
  comment: string | null,
  type: 'quest' | 'general' = 'general'
): SlackMessage {
  const isGeneral = type === 'general';
  const title = isGeneral ? '一般フィードバック' : questTitle || 'クエスト';
  const stars = rating ? '⭐'.repeat(rating) + '☆'.repeat(5 - rating) : '（なし）';

  const fields = [
    {
      type: 'mrkdwn',
      text: `*ユーザー:*\n${nickname}`,
    },
    {
      type: 'mrkdwn',
      text: `*種別:*\n${isGeneral ? '💬 一般' : '📖 クエスト'}`,
    },
  ];

  if (!isGeneral && questTitle) {
    fields.push({
      type: 'mrkdwn',
      text: `*クエスト:*\n${questTitle}`,
    });
  }

  if (rating) {
    fields.push({
      type: 'mrkdwn',
      text: `*評価:*\n${stars}`,
    });
  }

  fields.push({
    type: 'mrkdwn',
    text: `*コメント:*\n${comment || '（なし）'}`,
  });

  return {
    text: `📝 新しいフィードバック: ${title}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `📝 新しいフィードバック（${isGeneral ? '一般' : 'クエスト'}）`,
        },
      },
      {
        type: 'section',
        fields,
      },
    ],
  };
}
