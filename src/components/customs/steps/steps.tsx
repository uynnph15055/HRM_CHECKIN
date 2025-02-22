import IconCheck from '@/assets/icons/ic-primary_shape.svg';
import React from 'react';

interface StepProps {
  questionSteps?: boolean;
  currentStep: number;
  onChangeCurrentStep?: (step: number) => void;
  steps: {
    title?: string;
    children?: React.ReactNode;
    label?: string;
    color?: boolean;
  }[];
}

const Step = ({ currentStep, steps, questionSteps, onChangeCurrentStep }: StepProps) => {
  return (
    <div className='step'>
      <div className='w-full relative bg-[#ffffff] rounded-md'>
        <div className='p-3 md:p-6 hidden lg:block'>
          <div className='mb-4 '>
            {steps[currentStep - 1]?.label && <h2 className='text-2xl font-bold'>{steps[currentStep - 1].label}</h2>}
          </div>
          <ol className='flex justify-between items-center w-full text-sm font-medium pt-5'>
            {steps.map((step, index) => {
              const isCurrent = currentStep === index + 1;
              let isCompleted = false;
              if (questionSteps) {
                if (step.color) {
                  isCompleted = true;
                }
              } else {
                isCompleted = currentStep > index + 1 || (currentStep === index + 1 && index === steps.length - 1);
              }

              return (
                <li
                  key={index}
                  onClick={() => questionSteps && onChangeCurrentStep?.(index + 1)}
                  className={`relative  text-center flex-1 items-center ${questionSteps ? 'cursor-pointer' : ''}`}
                >
                  <div className='w-full relative'>
                    <div
                      className={`w-6 h-6 flex  items-center justify-center rounded-full text-[#FFFFFF] ${
                        isCurrent ? 'bg-[#366AE2] ' : isCompleted ? 'bg-[#22C55E]' : 'bg-[#637381]   '
                      }`}
                      style={{ margin: 'auto' }}
                    >
                      {isCurrent || !isCompleted ? (
                        <span className='text-sm'>{index + 1}</span>
                      ) : (
                        <img src={IconCheck} alt='icon' />
                      )}
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        className={` h-[1px] bg-[#637381] opacity-20`}
                        style={{
                          position: 'absolute',
                          left: 'calc(50% + 12px + 11.5px)',
                          width: 'calc(100% - 24px - 23px)',
                          top: '50%',
                        }}
                      ></div>
                    )}
                  </div>
                  <span
                    className={`mt-4 text-center font-semibold text-[14px] ${
                      isCompleted ? 'text-[#212B36]' : 'text-[#919EAB]'
                    } inline-block`}
                  >
                    {step.title}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div className='mt-6 content'>
        {steps[currentStep - 1]?.children && <div>{steps[currentStep - 1].children}</div>}
      </div>
    </div>
  );
};

export default Step;
