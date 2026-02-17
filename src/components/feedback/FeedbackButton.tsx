'use client';

import { useState } from 'react';
import FeedbackModal from '@/components/feedback/FeedbackModal';

interface FeedbackButtonProps {
  questId: string;
  questTitle: string;
}

export default function FeedbackButton({ questId, questTitle }: FeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
          text-text-secondary bg-surface hover:bg-surface-hover
          border border-border rounded-lg transition-all duration-200
          hover:text-primary hover:border-primary-light cursor-pointer"
      >
        📝 フィードバック
      </button>

      <FeedbackModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        questId={questId}
        questTitle={questTitle}
      />
    </>
  );
}
