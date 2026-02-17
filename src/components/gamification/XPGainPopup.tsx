'use client';

import { useEffect } from 'react';

interface XPGainPopupProps {
  xp: number;
  show: boolean;
  onDone: () => void;
}

export default function XPGainPopup({ xp, show, onDone }: XPGainPopupProps) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onDone();
    }, 2000);

    return () => clearTimeout(timer);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
      <div className="xp-popup" aria-live="polite">
        <div className="xp-popup-inner">
          <span className="text-lg" role="img" aria-label="Sparkle">
            ✨
          </span>
          <span className="text-xl font-extrabold xp-popup-text">+{xp} XP</span>
          <span className="text-lg" role="img" aria-label="Sparkle">
            ✨
          </span>
        </div>
      </div>

      <style jsx>{`
        .xp-popup {
          animation: xpPopupIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
            xpPopupOut 0.5s ease-in 1.5s forwards;
        }
        .xp-popup-inner {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          box-shadow:
            0 4px 20px rgba(245, 158, 11, 0.4),
            0 0 40px rgba(245, 158, 11, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
        }
        .xp-popup-text {
          color: #1e293b;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        @keyframes xpPopupIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(20px);
          }
          50% {
            opacity: 1;
            transform: scale(1.15) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(-30px);
          }
        }
        @keyframes xpPopupOut {
          0% {
            opacity: 1;
            transform: scale(1) translateY(-30px);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) translateY(-60px);
          }
        }
      `}</style>
    </div>
  );
}
