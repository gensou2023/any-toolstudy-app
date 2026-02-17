'use client';

import { useEffect, useState } from 'react';

type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  size?: ProgressSize;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

const sizeStyles: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function ProgressBar({
  value,
  size = 'md',
  color = 'primary',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  useEffect(() => {
    // Trigger animation on mount and value change
    const timer = requestAnimationFrame(() => {
      setAnimatedValue(clampedValue);
    });
    return () => cancelAnimationFrame(timer);
  }, [clampedValue]);

  // Map color prop to Tailwind bg class
  const colorClass = `bg-${color}`;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-text-secondary">Progress</span>
          <span className="text-xs font-semibold text-text-primary">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}
      <div
        className={`w-full ${sizeStyles[size]} bg-surface-hover rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${sizeStyles[size]} ${colorClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${animatedValue}%` }}
        />
      </div>
    </div>
  );
}
