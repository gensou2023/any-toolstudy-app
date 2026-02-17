import type { QuestStep } from '@/types';
import StepContent from './StepContent';

interface QuestStepsProps {
  steps: QuestStep[];
}

export default function QuestSteps({ steps }: QuestStepsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-text-primary mb-6">
        ステップ
      </h2>

      <div className="relative">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Vertical connecting line */}
              {!isLast && (
                <div
                  className="absolute left-5 top-10 w-0.5 bg-border"
                  style={{ bottom: 0 }}
                />
              )}

              {/* Step number circle */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              {/* Step content */}
              <div className="flex-1 pt-1.5">
                <h3 className="font-bold text-text-primary mb-1">
                  {step.title}
                </h3>
                <div>
                  <StepContent content={step.content} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
