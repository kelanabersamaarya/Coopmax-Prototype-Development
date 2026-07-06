import * as React from "react";
import NewMBankingLoginDetailPage from "@/components/mobile/new-mbanking/NewMBankingLoginDetailPage";
import NewMBankingLoginIdentityStep from "@/components/mobile/new-mbanking/NewMBankingLoginIdentityStep";
import NewMBankingLoginPasswordStep from "@/components/mobile/new-mbanking/NewMBankingLoginPasswordStep";
import NewMBankingScanPage from "@/components/mobile/new-mbanking/NewMBankingScanPage";

type NewMBankingLoginPageProps = {
  onBack: () => void;
  onLogin: () => void;
  onRegister: () => void;
};

type LoginStep = "identity" | "password" | "detail" | "scan";

export default function NewMBankingLoginPage({
  onBack,
  onLogin,
  onRegister,
}: NewMBankingLoginPageProps) {
  const [step, setStep] = React.useState<LoginStep>("identity");
  const [identity, setIdentity] = React.useState("");
  const [password, setPassword] = React.useState("");

  function goToDetail() {
    setStep("detail");
  }

  function submitLogin() {
    onLogin();
  }

  if (step === "scan") {
    return <NewMBankingScanPage onBack={() => setStep("identity")} />;
  }

  if (step === "detail") {
    return (
      <NewMBankingLoginDetailPage
        onBack={() => setStep("identity")}
        onLogin={submitLogin}
      />
    );
  }

  if (step === "password") {
    return (
      <NewMBankingLoginPasswordStep
        username={identity}
        password={password}
        onPasswordChange={setPassword}
        onBack={() => setStep("identity")}
        onSubmit={submitLogin}
      />
    );
  }

  return (
    <NewMBankingLoginIdentityStep
      value={identity}
      onChange={setIdentity}
      onBack={onBack}
      onNext={goToDetail}
      onRegister={onRegister}
      onScan={() => setStep("scan")}
    />
  );
}