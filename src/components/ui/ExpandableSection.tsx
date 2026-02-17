'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function ExpandableSection({
  title,
  children,
  defaultOpen = false,
  className = '',
}: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      // After the transition, set to auto so content can resize dynamically
      const timer = setTimeout(() => {
        setContentHeight(undefined);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // First set to the actual height, then to 0 on the next frame
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setContentHeight(0);
        });
      });
    }
  }, [isOpen]);

  return (
    <div className={`border border-border rounded-xl overflow-hidden ${className}`}>
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-surface-hover transition-colors duration-200 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-text-primary">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-text-muted transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        ref={contentRef}
        className="transition-[height] duration-300 ease-out overflow-hidden"
        style={{ height: contentHeight !== undefined ? `${contentHeight}px` : 'auto' }}
        aria-hidden={!isOpen}
      >
        <div className="px-4 py-3 border-t border-border">{children}</div>
      </div>
    </div>
  );
}
