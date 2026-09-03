import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: { number: string; title: string }[];
  onStepClick?: (stepIndex: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <div className="w-full border-b border-[#1A1E23] pb-6 mb-8">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCurrent = currentStep === stepNum;
          const isDone = currentStep > stepNum;

          return (
            <button
              key={step.number}
              type="button"
              disabled={!isDone && !isCurrent}
              onClick={() => onStepClick && isDone && onStepClick(stepNum)}
              className={`text-left transition-all p-2 sm:p-3 border select-none ${
                isCurrent
                  ? 'border-[#F3F3F0] bg-[#14171A]'
                  : isDone
                  ? 'border-[#2A2F36] bg-[#0A0C0E] hover:border-[#383D45] cursor-pointer'
                  : 'border-[#14171A] bg-transparent opacity-40 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-[#8E9399] tracking-widest">
                  {step.number}
                </span>
                {isDone && <Check size={12} className="text-emerald-400" />}
              </div>
              <p
                className={`font-mono text-[11px] sm:text-xs uppercase tracking-wider truncate ${
                  isCurrent ? 'text-[#F3F3F0] font-medium' : isDone ? 'text-[#C5C9D0]' : 'text-[#6B7280]'
                }`}
              >
                {step.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
