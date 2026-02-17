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
  questTitle: string,
  rating: number,
  comment: string | null
): SlackMessage {
  const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);

  return {
    text: `📝 新しいフィードバック: ${questTitle}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📝 新しいフィードバック',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*ユーザー:*\n${nickname}`,
          },
          {
            type: 'mrkdwn',
            text: `*クエスト:*\n${questTitle}`,
          },
          {
            type: 'mrkdwn',
            text: `*評価:*\n${stars}`,
          },
          {
            type: 'mrkdwn',
            text: `*コメント:*\n${comment || '（なし）'}`,
          },
        ],
      },
    ],
  };
}
