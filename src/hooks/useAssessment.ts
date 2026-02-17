'use client';

import { useEffect, useState } from 'react';
import { IS_DEMO_MODE } from '@/lib/constants';
import type { AssessmentResult } from '@/types/assessment';

export function useAssessment() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (IS_DEMO_MODE) {
        setResult(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/assessment');
        if (res.ok) {
          const data = await res.json();
          setResult(data.result || null);
        }
      } catch {
        // Silently fail
      }
      setLoading(false);
    };
    fetchAssessment();
  }, []);

  return { result, loading, isCompleted: result !== null };
}
