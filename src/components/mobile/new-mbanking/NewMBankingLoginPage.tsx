import * as React from "react";
import { toast } from "sonner";
import NewMBankingLoginIdentityStep from "@/components/mobile/new-mbanking/NewMBankingLoginIdentityStep";
import NewMBankingLoginPasswordStep from "@/components/mobile/new-mbanking/NewMBankingLoginPasswordStep";

type NewMBankingLoginPageProps = {
  onLogin: () => void;
  onRegister: () => void;
};

type LoginStep = "identity" | "password";

export default function NewMBankingLoginPage({
  onLogin,
  onRegister,
}: NewMBankingLoginPageProps) {
  const [step, setStep] = React.useState<LoginStep>("identity");
  const [identity, setIdentity] = React.useState("");
  const [password, setPassword] = React.useState("");

  function goToPassword() {
    setStep("password");
  }

  function submitLogin() {
    toast.success("Masuk berhasil", {
      description: "Selamat datang di New Mbanking prototype.",
    });

    onLogin();
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
      onBack={onRegister}
      onNext={goToPassword}
      onRegister={onRegister}
    />
  );
}