"use client";

import * as React from "react";
import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import MBankingLoginForm from "@/components/mobile/MBankingLoginForm";
import MBankingHome from "@/components/mobile/MBankingHome";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

export default function MBankingMockup() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [transactions, setTransactions] = React.useState<
    MBankingTransactionHistoryEntry[]
  >([]);

  function addTransaction(transaction: MBankingTransactionHistoryEntry) {
    setTransactions((current) => {
      if (current.some((item) => item.id === transaction.id)) return current;
      return [transaction, ...current];
    });
  }

  return (
    <MobileMockupFrame edgeToEdge>
      {loggedIn ? (
        <MBankingHome
          transactions={transactions}
          onTransactionSaved={addTransaction}
          onLogout={() => setLoggedIn(false)}
        />
      ) : (
        <MBankingLoginForm onLogin={() => setLoggedIn(true)} />
      )}
    </MobileMockupFrame>
  );
}