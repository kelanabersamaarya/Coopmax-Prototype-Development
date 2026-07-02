import NewMBankingOnboardingIntro from "@/components/mobile/new-mbanking/NewMBankingOnboardingIntro";

type NewMBankingOnboardingProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function NewMBankingOnboarding({
  onLogin,
  onRegister,
}: NewMBankingOnboardingProps) {
  return (
    <NewMBankingOnboardingIntro
      onLogin={onLogin}
      onRegister={onRegister}
    />
  );
}