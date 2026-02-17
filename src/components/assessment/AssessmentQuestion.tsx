'use client';

import type { AssessmentQuestion as QuestionType } from '@/types/assessment';

interface AssessmentQuestionProps {
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (optionIndex: number) => void;
}

export default function AssessmentQuestion({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: AssessmentQuestionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Progress bar */}
      <div className="w-full max-w-lg mb-8">
        <div className="h-1 bg-surface-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
        <p className="text-xs text-text-muted mt-2 text-center">
          {currentIndex + 1} / {totalQuestions}
        </p>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <div className="text-7xl mb-6 animate-bounce-in">{question.emoji}</div>
        <h2 className="text-xl md:text-2xl font-bold text-text-primary max-w-lg">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="w-full max-w-md space-y-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx)}
            className="w-full p-4 rounded-xl border border-border bg-surface hover:border-primary hover:bg-primary/5 text-left transition-all duration-200 group cursor-pointer"
          >
            <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
