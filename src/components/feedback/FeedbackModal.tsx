'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  questId: string;
  questTitle: string;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  questId,
  questTitle,
}: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('評価を選択してください');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questId,
          questTitle,
          rating,
          comment: comment.trim() || null,
        }),
      });

      if (!res.ok) {
        throw new Error('送信に失敗しました');
      }

      setSubmitted(true);
    } catch {
      setError('送信に失敗しました。もう一度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setRating(0);
    setComment('');
    setSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="📝 フィードバック">
      {submitted ? (
        /* Success state */
        <div className="text-center py-6">
          <span className="text-5xl block mb-4">🎉</span>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            フィードバックありがとうございます！
          </h3>
          <p className="text-text-secondary text-sm mb-6">
            今後の改善に活用させていただきます。
          </p>
          <Button variant="primary" onClick={handleClose}>
            閉じる
          </Button>
        </div>
      ) : (
        /* Feedback form */
        <div>
          {/* Quest title */}
          <div className="mb-4">
            <p className="text-sm text-text-muted mb-1">対象クエスト</p>
            <p className="font-medium text-text-primary">{questTitle}</p>
          </div>

          {/* Star rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              評価 <span className="text-danger">*</span>
            </label>
            <StarRating value={rating} onChange={setRating} size="lg" />
            {rating > 0 && (
              <p className="text-xs text-text-muted mt-1">
                {rating === 1 && '改善が必要'}
                {rating === 2 && 'もう少し'}
                {rating === 3 && 'ふつう'}
                {rating === 4 && '良い'}
                {rating === 5 && 'とても良い！'}
              </p>
            )}
          </div>

          {/* Comment textarea */}
          <div className="mb-4">
            <label
              htmlFor="feedback-comment"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              コメント（任意）
            </label>
            <textarea
              id="feedback-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="改善点や感想があれば教えてください..."
              rows={4}
              className="w-full px-3 py-2 text-sm text-text-primary bg-background
                border border-border rounded-lg resize-none
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                placeholder:text-text-muted transition-colors"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-danger mb-4">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={handleClose}>
              キャンセル
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={submitting}
              disabled={rating === 0}
            >
              送信する
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
