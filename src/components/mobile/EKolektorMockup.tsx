"use client";

import * as React from "react";
import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import EKolektorHome from "@/components/mobile/EKolektorHome";
import EKolektorLoginForm from "@/components/mobile/EKolektorLoginForm";
import EKolektorTransactions from "@/components/mobile/EKolektorTransactions";
import type { EKolektorTodayTransaction } from "@/components/mobile/e-kolektor-types";
import {
  getEKolektorTransactions,
  saveEKolektorTransactions,
} from "@/lib/eKolektorTransactionsStore";

type EKolektorScreen = "home" | "transactions";

export default function EKolektorMockup() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [screen, setScreen] = React.useState<EKolektorScreen>("home");
  const [transactions, setTransactions] = React.useState<
    EKolektorTodayTransaction[]
  >(() => getEKolektorTransactions());

  React.useEffect(() => {
    saveEKolektorTransactions(transactions);
  }, [transactions]);

  function addTransaction(transaction: EKolektorTodayTransaction) {
    setTransactions((current) => {
      if (current.some((item) => item.id === transaction.id)) return current;
      return [transaction, ...current];
    });
  }

  if (!loggedIn) {
    return (
      <MobileMockupFrame edgeToEdge>
        <EKolektorLoginForm
          onLogin={() => {
            setLoggedIn(true);
            setScreen("home");
          }}
        />
      </MobileMockupFrame>
    );
  }

  return (
    <MobileMockupFrame edgeToEdge>
      {screen === "transactions" ? (
        <EKolektorTransactions
          onBackHome={() => setScreen("home")}
          onTransactionSaved={addTransaction}
        />
      ) : (
        <EKolektorHome
          transactions={transactions}
          onLogout={() => {
            setLoggedIn(false);
            setScreen("home");
          }}
          onOpenTransactions={() => setScreen("transactions")}
        />
      )}
    </MobileMockupFrame>
  );
}