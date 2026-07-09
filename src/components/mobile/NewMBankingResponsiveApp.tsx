"use client";

import * as React from "react";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import NewMBankingGlobalNumericKeyboard from "@/components/mobile/new-mbanking/NewMBankingGlobalNumericKeyboard";
import NewMBankingHome from "@/components/mobile/new-mbanking/NewMBankingHome";
import NewMBankingLoginPage from "@/components/mobile/new-mbanking/NewMBankingLoginPage";
import NewMBankingOnboarding from "@/components/mobile/new-mbanking/NewMBankingOnboarding";
import NewMBankingRegisterAccountPage from "@/components/mobile/new-mbanking/NewMBankingRegisterAccountPage";
import NewMBankingRegisterPage from "@/components/mobile/new-mbanking/NewMBankingRegisterPage";
import NewMBankingSplashScreen from "@/components/mobile/new-mbanking/NewMBankingSplashScreen";

type NewMBankingScreen =
  | "splash"
  | "onboarding"
  | "login"
  | "register"
  | "register-account"
  | "home";

export default function NewMBankingResponsiveApp() {
  const [screen, setScreen] = React.useState<NewMBankingScreen>("splash");
  const [transactions, setTransactions] = React.useState<
    MBankingTransactionHistoryEntry[]
  >([]);

  React.useEffect(() => {
    if (screen !== "splash") return;

    const timer = window.setTimeout(() => {
      setScreen("onboarding");
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [screen]);

  function addTransaction(transaction: MBankingTransactionHistoryEntry) {
    setTransactions((current) => {
      if (current.some((item) => item.id === transaction.id)) return current;
      return [transaction, ...current];
    });
  }

  function renderScreen() {
    if (screen === "home") {
      return (
        <NewMBankingHome
          transactions={transactions}
          onTransactionSaved={addTransaction}
          onLogout={() => setScreen("login")}
          onReturnToOnboarding={() => setScreen("onboarding")}
        />
      );
    }

    if (screen === "register-account") {
      return (
        <NewMBankingRegisterAccountPage
          onBack={() => setScreen("register")}
          onSubmitSuccess={() => setScreen("login")}
        />
      );
    }

    if (screen === "register") {
      return (
        <NewMBankingRegisterPage
          onBack={() => setScreen("onboarding")}
          onRegisterSuccess={() => setScreen("register-account")}
        />
      );
    }

    if (screen === "login") {
      return (
        <NewMBankingLoginPage
          onBack={() => setScreen("onboarding")}
          onLogin={() => setScreen("home")}
          onRegister={() => setScreen("register")}
        />
      );
    }

    if (screen === "onboarding") {
      return (
        <NewMBankingOnboarding
          onLogin={() => setScreen("login")}
          onRegister={() => setScreen("register")}
        />
      );
    }

    return <NewMBankingSplashScreen />;
  }

  return (
    <div
      data-mobile-screen="true"
      className="h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-white"
    >
      <NewMBankingGlobalNumericKeyboard />
      {renderScreen()}
    </div>
  );
}