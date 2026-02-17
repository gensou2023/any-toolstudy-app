'use client';

interface TypingTimerProps {
  timeLeft: number;
  totalTime: number;
}

export default function TypingTimer({ timeLeft, totalTime }: TypingTimerProps) {
  const progress = timeLeft / totalTime;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const isWarning = timeLeft <= 5;
  const strokeColor = isWarning ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : '#6366f1';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="88" height="88" className="-rotate-90">
        {/* Background circle */}
        <circle
          cx="44" cy="44" r={radius}
          fill="none"
          stroke="currentColor"
          className="text-surface-hover"
          strokeWidth="6"
        />
        {/* Progress circle */}
        <circle
          cx="44" cy="44" r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <span className={`absolute text-xl font-bold ${
        isWarning ? 'text-danger animate-pulse' : 'text-text-primary'
      }`}>
        {timeLeft}
      </span>
    </div>
  );
}
