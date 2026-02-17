'use client';

type MascotMood = 'happy' | 'excited' | 'thinking' | 'sleeping' | 'cheering';
type MascotSize = 'sm' | 'md' | 'lg';

interface NinjaMascotProps {
  mood?: MascotMood;
  size?: MascotSize;
}

const moodConfig: Record<MascotMood, { emoji: string; accent: string; accessory: string }> = {
  happy: { emoji: '🥷', accent: '✨', accessory: '' },
  excited: { emoji: '🥷', accent: '✨', accessory: '💫' },
  thinking: { emoji: '🤔', accent: '', accessory: '' },
  sleeping: { emoji: '😴', accent: '', accessory: '' },
  cheering: { emoji: '🥷', accent: '🎉', accessory: '🎊' },
};

const sizeConfig: Record<MascotSize, { container: string; emoji: string; accent: string }> = {
  sm: { container: 'w-12 h-12', emoji: 'text-2xl', accent: 'text-sm' },
  md: { container: 'w-20 h-20', emoji: 'text-4xl', accent: 'text-lg' },
  lg: { container: 'w-28 h-28', emoji: 'text-6xl', accent: 'text-2xl' },
};

export default function NinjaMascot({ mood = 'happy', size = 'md' }: NinjaMascotProps) {
  const moodData = moodConfig[mood];
  const sizeData = sizeConfig[size];

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeData.container}`}>
      {/* Background glow */}
      <div
        className={`absolute inset-0 rounded-full mascot-bg-${mood}`}
        aria-hidden="true"
      />

      {/* Main emoji */}
      <span
        className={`relative ${sizeData.emoji} leading-none mascot-emoji-${mood}`}
        role="img"
        aria-label={`Ninja mascot feeling ${mood}`}
      >
        {moodData.emoji}
      </span>

      {/* Accent decoration */}
      {moodData.accent && (
        <span
          className={`absolute -top-1 -right-1 ${sizeData.accent} leading-none mascot-accent-${mood}`}
          aria-hidden="true"
        >
          {moodData.accent}
        </span>
      )}

      {/* Secondary accessory */}
      {moodData.accessory && (
        <span
          className={`absolute -bottom-1 -right-2 ${sizeData.accent} leading-none mascot-accessory-${mood}`}
          aria-hidden="true"
        >
          {moodData.accessory}
        </span>
      )}

      {/* Thinking dots */}
      {mood === 'thinking' && (
        <div className="absolute -top-2 -right-3 flex gap-0.5" aria-hidden="true">
          <span className="thinking-dot" style={{ animationDelay: '0s' }}>.</span>
          <span className="thinking-dot" style={{ animationDelay: '0.3s' }}>.</span>
          <span className="thinking-dot" style={{ animationDelay: '0.6s' }}>.</span>
        </div>
      )}

      {/* Sleeping zzz */}
      {mood === 'sleeping' && (
        <div className="absolute -top-1 -right-3" aria-hidden="true">
          <span className="sleeping-z text-xs font-bold text-text-muted" style={{ animationDelay: '0s' }}>z</span>
          <span className="sleeping-z text-sm font-bold text-text-muted" style={{ animationDelay: '0.5s' }}>z</span>
          <span className="sleeping-z text-base font-bold text-text-muted" style={{ animationDelay: '1s' }}>Z</span>
        </div>
      )}

      <style jsx>{`
        /* Background glows */
        .mascot-bg-happy {
          background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        }
        .mascot-bg-excited {
          background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
          animation: bgPulse 1.5s ease-in-out infinite;
        }
        .mascot-bg-thinking {
          background: radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%);
        }
        .mascot-bg-sleeping {
          background: radial-gradient(circle, rgba(148, 163, 184, 0.1) 0%, transparent 70%);
        }
        .mascot-bg-cheering {
          background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
          animation: bgPulse 1s ease-in-out infinite;
        }

        /* Emoji animations by mood */
        .mascot-emoji-happy {
          animation: gentleBob 3s ease-in-out infinite;
        }
        .mascot-emoji-excited {
          animation: excitedBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
        .mascot-emoji-thinking {
          animation: thinkTilt 3s ease-in-out infinite;
        }
        .mascot-emoji-sleeping {
          animation: sleepBreathe 3s ease-in-out infinite;
        }
        .mascot-emoji-cheering {
          animation: cheerJump 1s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }

        /* Accent animations */
        .mascot-accent-happy {
          animation: sparkleRotate 2s linear infinite;
        }
        .mascot-accent-excited {
          animation: sparkleRotate 1s linear infinite;
        }
        .mascot-accent-cheering {
          animation: partyPop 1.2s ease-in-out infinite;
        }

        /* Accessory animations */
        .mascot-accessory-excited {
          animation: floatUp 2s ease-in-out infinite;
        }
        .mascot-accessory-cheering {
          animation: partyPop 1.2s ease-in-out infinite 0.3s;
        }

        /* Thinking dots */
        .thinking-dot {
          display: inline-block;
          font-size: 18px;
          font-weight: 900;
          color: var(--color-text-muted);
          animation: dotFloat 1.2s ease-in-out infinite;
        }

        /* Sleeping z */
        .sleeping-z {
          display: inline-block;
          position: absolute;
          animation: zFloat 2s ease-in-out infinite;
        }

        @keyframes bgPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes gentleBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes excitedBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.05); }
        }
        @keyframes thinkTilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        @keyframes sleepBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes cheerJump {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(-5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes sparkleRotate {
          0% { transform: rotate(0deg) scale(1); opacity: 0.8; }
          50% { transform: rotate(180deg) scale(1.2); opacity: 1; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.8; }
        }
        @keyframes partyPop {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(-10deg); }
          75% { transform: scale(1.2) rotate(10deg); }
        }
        @keyframes dotFloat {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-4px); }
        }
        @keyframes zFloat {
          0% { opacity: 0; transform: translate(0, 0) scale(0.8); }
          50% { opacity: 1; transform: translate(4px, -8px) scale(1); }
          100% { opacity: 0; transform: translate(8px, -16px) scale(0.6); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-5px) rotate(10deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
