"use client";

import * as React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import LoanDebtChangeSaveGate from "@/components/loans/LoanDebtChangeSaveGate";
import LoanInterestPercentInputFix from "@/components/loans/LoanInterestPercentInputFix";
import LoanInterestChangeSuccessGate from "@/components/loans/LoanInterestChangeSuccessGate";
import LoanInterestWizardCancelButton from "@/components/loans/LoanInterestWizardCancelButton";
import LoanProductTermsSection from "@/components/loans/products/LoanProductTermsSection";

export default function MobileAwareToaster() {
  const location = useLocation();
  const isMobilePrototype = location.pathname.startsWith("/mobile");
  const isNewMBankingArea = location.pathname.startsWith("/mobile/new-mbanking");
  const isObsArea =
    location.pathname.startsWith("/obs-samudra-harta") ||
    location.pathname.startsWith("/obs-web");
  const isSakEpCabangArea = location.pathname.startsWith("/sak-ep-cabang");

  const shouldHideToaster =
    (isMobilePrototype && !isNewMBankingArea) || isObsArea || isSakEpCabangArea;

  React.useEffect(() => {
    if (!shouldHideToaster) return;

    toast.dismiss();

    const intervalId = window.setInterval(() => {
      toast.dismiss();
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [shouldHideToaster]);

  return (
    <>
      <LoanInterestPercentInputFix />
      <LoanInterestChangeSuccessGate />
      <LoanInterestWizardCancelButton />
      <LoanDebtChangeSaveGate />
      <LoanProductTermsSection />
      {shouldHideToaster ? null : (
        <Sonner
          position="top-right"
          offset={{ top: 20, right: 32, left: 16, bottom: 16 }}
        />
      )}
    </>
  );
}