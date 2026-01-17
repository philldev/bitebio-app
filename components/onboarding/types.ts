export interface OnboardingData {
  username: string;
  displayName: string;
  bio: string;
  themeColor?: string;
}

export interface OnboardingStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}
