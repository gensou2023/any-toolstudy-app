'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { assessmentQuestions, calculateSkillLevel } from '@/data/assessment-questions';
import AssessmentQuestion from '@/components/assessment/AssessmentQuestion';
import AssessmentResults from '@/components/assessment/AssessmentResults';
import { triggerConfetti } from '@/components/ui/Confetti';

export default function AssessmentPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const currentQuestion = assessmentQuestions[currentIndex];

  const handleAnswer = useCallback(async (optionIndex: number) => {
    if (!currentQuestion) return;

    // Fire confetti on answer
    triggerConfetti({ particleCount: 30, spread: 50 });

    const newAnswers = { ...answers, [currentQuestion.id]: optionIndex };
    setAnswers(newAnswers);

    // Wait for confetti animation
    await new Promise(resolve => setTimeout(resolve, 500));

    if (currentIndex < assessmentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // All questions answered - submit
      setIsSubmitting(true);

      let score = 0;
      for (const question of assessmentQuestions) {
        const idx = newAnswers[question.id];
        if (typeof idx === 'number' && question.options[idx]) {
          score += question.options[idx].score;
        }
      }

      const level = calculateSkillLevel(score);
      setTotalScore(score);
      setSkillLevel(level);

      try {
        await fetch('/api/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        });
      } catch {
        // Continue even if save fails
      }

      setIsComplete(true);
      setIsSubmitting(false);
    }
  }, [currentQuestion, currentIndex, answers]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete || isSubmitting) return;
      const key = parseInt(e.key);
      if (key >= 1 && key <= currentQuestion?.options.length) {
        handleAnswer(key - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, isComplete, isSubmitting, handleAnswer]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-text-secondary">結果を計算中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {isComplete ? (
        <AssessmentResults
          skillLevel={skillLevel}
          totalScore={totalScore}
          maxScore={assessmentQuestions.length * 3}
        />
      ) : (
        currentQuestion && (
          <AssessmentQuestion
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={assessmentQuestions.length}
            onAnswer={handleAnswer}
          />
        )
      )}
    </div>
  );
}
