"use client";

import { useState } from "react";
import { OnboardingData } from "./types";
import { StepClaimLink } from "./steps/step-claim-link";
import { StepBasicInfo } from "./steps/step-basic-info";
import { StepPreview } from "./steps/step-preview";
import { StepSuccess } from "./steps/step-success";

const steps = [
  { id: "claim", component: StepClaimLink },
  { id: "info", component: StepBasicInfo },
  { id: "preview", component: StepPreview },
  { id: "success", component: StepSuccess },
];

export function OnboardingWizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    username: "",
    displayName: "",
    bio: "",
    themeColor: "orange",
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const CurrentStepComponent = steps[currentStepIndex].component;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Step {currentStepIndex + 1} of {steps.length}</span>
          <span>{steps[currentStepIndex].id.charAt(0).toUpperCase() + steps[currentStepIndex].id.slice(1)}</span>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <CurrentStepComponent
          data={data}
          updateData={updateData}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
