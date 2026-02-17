'use client';

import { ReactNode, MouseEventHandler, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  padding?: boolean;
  style?: CSSProperties;
}

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
  padding = true,
  style,
}: CardProps) {
  return (
    <div
      style={style}
      className={`bg-surface rounded-xl border border-border
        ${padding ? 'p-6' : ''}
        ${hover ? 'hover:shadow-lg hover:border-primary-light hover:-translate-y-0.5 transition-all duration-200' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
