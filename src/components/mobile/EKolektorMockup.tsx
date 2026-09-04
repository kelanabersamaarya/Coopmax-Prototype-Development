"use client";

import * as React from "react";
import { Fingerprint } from "lucide-react";
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [showBiometricPrompt, setShowBiometricPrompt] = React.useState(false);
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
        <div className="relative h-full min-h-0">
          <EKolektorLoginForm
            onLogin={() => {
              setLoggedIn(true);
              setShowBiometricPrompt(false);
              setScreen("home");
            }}
          />
          {showBiometricPrompt && (
            <div className="absolute inset-0 z-40 flex items-end bg-[#10234A]/30">
              <button
                type="button"
                aria-label="Tutup opsi login biometrik"
                onClick={() => setShowBiometricPrompt(false)}
                className="absolute inset-0 cursor-default"
              />
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="login-biometric-prompt-title"
                className="relative w-full rounded-t-[24px] bg-white px-6 pb-7 pt-6 text-center shadow-[0_-8px_24px_rgba(32,48,100,0.16)]"
              >
                <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-[#D8E2F2]" />
                <div className="mx-auto grid h-[68px] w-[68px] place-items-center rounded-full bg-[#EAF2FF] text-[#004FC7]">
                  <Fingerprint className="h-[40px] w-[40px]" strokeWidth={1.7} />
                </div>
                <h2 id="login-biometric-prompt-title" className="mt-4 text-[19px] font-extrabold leading-tight text-[#203064]">
                  Login dengan Biometrik
                </h2>
                <p className="mx-auto mt-2 max-w-[300px] text-[14px] leading-relaxed text-[#777F91]">
                  Gunakan sidik jari atau wajah untuk login dengan cepat dan aman.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowBiometricPrompt(false);
                    setLoggedIn(true);
                    setScreen("home");
                  }}
                  className="mt-5 h-[45px] w-full rounded-[9px] bg-[#004FC7] text-[14px] font-semibold text-white shadow-[0_3px_8px_rgba(0,79,199,0.22)] transition active:scale-[0.99]"
                >
                  Login dengan Biometrik
                </button>
                <button
                  type="button"
                  onClick={() => setShowBiometricPrompt(false)}
                  className="mt-4 text-[14px] font-semibold text-[#004FC7] transition active:scale-[0.98]"
                >
                  Batal
                </button>
              </section>
            </div>
          )}
        </div>
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
            setShowBiometricPrompt(true);
          }}
          onOpenTransactions={() => setScreen("transactions")}
        />
      )}
    </MobileMockupFrame>
  );
}