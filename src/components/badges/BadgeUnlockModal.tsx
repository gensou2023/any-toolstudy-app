'use client';

import type { Badge } from '@/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface BadgeUnlockModalProps {
  badge: Badge | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BadgeUnlockModal({ badge, isOpen, onClose }: BadgeUnlockModalProps) {
  if (!badge) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center py-4">
        {/* Confetti-style decorative elements */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-secondary/10 animate-ping" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-secondary/20 animate-pulse" />
          </div>
          <span className="relative text-7xl block animate-[bounceIn_600ms_ease-out]">
            {badge.icon}
          </span>
        </div>

        {/* Celebration particles */}
        <div className="flex justify-center gap-2 mb-4 text-2xl animate-[fadeInUp_400ms_ease-out]">
          <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🎉</span>
          <span className="animate-bounce" style={{ animationDelay: '100ms' }}>✨</span>
          <span className="animate-bounce" style={{ animationDelay: '200ms' }}>🎊</span>
        </div>

        {/* Congratulations text */}
        <h2 className="text-2xl font-bold text-secondary mb-2 animate-[fadeInUp_500ms_ease-out]">
          おめでとう！
        </h2>

        {/* Badge name */}
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {badge.name}
        </h3>

        {/* Badge description */}
        <p className="text-text-secondary mb-1">
          バッジを獲得しました！
        </p>
        <p className="text-sm text-text-muted mb-6">
          {badge.description}
        </p>

        {/* Close button */}
        <Button variant="secondary" size="lg" onClick={onClose}>
          やったね！
        </Button>
      </div>

      <style jsx>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Modal>
  );
}
