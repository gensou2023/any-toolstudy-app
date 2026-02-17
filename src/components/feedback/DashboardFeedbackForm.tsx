'use client';

import { useState } from 'react';

export default function DashboardFeedbackForm() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'general',
          comment: comment.trim(),
          rating,
        }),
      });

      if (res.ok) {
        setComment('');
        setRating(null);
        setToast('ありがとうございます！フィードバックを送信しました');
        setTimeout(() => setToast(null), 3000);
      } else {
        setToast('送信に失敗しました。もう一度お試しください');
        setTimeout(() => setToast(null), 3000);
      }
    } catch {
      setToast('送信に失敗しました');
      setTimeout(() => setToast(null), 3000);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <h3 className="text-base font-bold text-text-primary mb-1">
        💬 フィードバック
      </h3>
      <p className="text-sm text-text-muted mb-4">
        改善リクエストや感想をお聞かせください
      </p>

      <form onSubmit={handleSubmit}>
        {/* Optional star rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-sm text-text-secondary mr-2">評価（任意）:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(rating === star ? null : star)}
              className="text-xl cursor-pointer transition-transform hover:scale-110"
            >
              {rating && rating >= star ? '⭐' : '☆'}
            </button>
          ))}
        </div>

        {/* Comment textarea */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="ご意見・ご要望をお書きください..."
          rows={3}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />

        {/* Submit button */}
        <div className="flex items-center justify-between mt-3">
          <button
            type="submit"
            disabled={!comment.trim() || isSubmitting}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </button>
        </div>
      </form>

      {/* Toast notification */}
      {toast && (
        <div className="mt-3 px-3 py-2 bg-accent/10 text-accent text-sm rounded-lg animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
