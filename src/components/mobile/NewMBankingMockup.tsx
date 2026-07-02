"use client";

import * as React from "react";
import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import MBankingHome from "@/components/mobile/MBankingHome";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import NewMBankingLoginPage from "@/components/mobile/new-mbanking/NewMBankingLoginPage";
import NewMBankingOnboarding from "@/components/mobile/new-mbanking/NewMBankingOnboarding";
import NewMBankingRegisterPage from "@/components/mobile/new-mbanking/NewMBankingRegisterPage";
import NewMBankingSplashScreen from "@/components/mobile/new-mbanking/NewMBankingSplashScreen";

type NewMBankingScreen = "splash" | "onboarding" | "login" | "register" | "home";

export default function NewMBankingMockup() {
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
        <MBankingHome
          transactions={transactions}
          onTransactionSaved={addTransaction}
          onLogout={() => setScreen("login")}
        />
      );
    }

    if (screen === "register") {
      return (
        <NewMBankingRegisterPage
          onBack={() => setScreen("onboarding")}
          onRegisterSuccess={() => setScreen("login")}
        />
      );
    }

    if (screen === "login") {
      return (
        <NewMBankingLoginPage
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

  return <MobileMockupFrame edgeToEdge>{renderScreen()}</MobileMockupFrame>;
}