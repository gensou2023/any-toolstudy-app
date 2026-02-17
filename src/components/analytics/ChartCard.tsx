'use client';

import { ReactNode } from 'react';
import Card from '@/components/ui/Card';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <Card className={className}>
      <h3 className="text-sm font-semibold text-text-secondary mb-4">{title}</h3>
      {children}
    </Card>
  );
}
