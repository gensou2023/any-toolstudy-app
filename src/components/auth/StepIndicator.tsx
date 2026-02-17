'use client';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            i < currentStep
              ? 'bg-primary scale-100'
              : i === currentStep
                ? 'bg-primary scale-125'
                : 'bg-surface-hover scale-100'
          }`}
        />
      ))}
    </div>
  );
}
