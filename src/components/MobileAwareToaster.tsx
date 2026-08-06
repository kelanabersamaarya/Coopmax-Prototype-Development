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
import LoanProductAutodebetScheduleSection from "@/components/loans/products/LoanProductAutodebetScheduleSection";
import LoanInterestAdjustmentHoverStyle from "@/components/loans/LoanInterestAdjustmentHoverStyle";
import LoanInterestAccountCardStyle from "@/components/loans/LoanInterestAccountCardStyle";
import LoanDebtAdjustmentHistoryTriggerFix from "@/components/loans/LoanDebtAdjustmentHistoryTriggerFix";
import LoanInterestSummaryReasonSection from "@/components/loans/LoanInterestSummaryReasonSection";
import AutodebetScheduleStatusSync from "@/components/savings/AutodebetScheduleStatusSync";
import InterestAdjustmentBillingMarkers from "@/components/anggota/InterestAdjustmentBillingMarkers";
import MemberReportFilterPlaceholderStyle from "@/components/mitra-karya/MemberReportFilterPlaceholderStyle";
import KtpReportStatusSync from "@/components/mitra-karya/KtpReportStatusSync";
import MitraKaryaKtpPreviewModal from "@/components/mitra-karya/MitraKaryaKtpPreviewModal";
import KtpUploadDeleteEnhancer from "@/components/mitra-karya/KtpUploadDeleteEnhancer";
import LoanDebtUnsupportedAlertText from "@/components/loans/LoanDebtUnsupportedAlertText";
import LoanExtensionAccountInfoLayout from "@/components/loans/LoanExtensionAccountInfoLayout";
import LoanExtensionAccountInfoToggle from "@/components/loans/LoanExtensionAccountInfoToggle";
import LoanExtensionStepTwoSummarySync from "@/components/loans/LoanExtensionStepTwoSummarySync";
import LoanDebtBillingInterestColumns from "@/components/loans/LoanDebtBillingInterestColumns";

export default function MobileAwareToaster() {
  const location = useLocation();
  const isMobilePrototype = location.pathname.startsWith("/mobile");
  const isNewMBankingArea = location.pathname.startsWith("/mobile/new-mbanking");
  const isObsArea =
    location.pathname.startsWith("/obs-samudra-harta") ||
    location.pathname.startsWith("/obs-web");
  const isSakEpCabangArea = location.pathname.startsWith("/sak-ep-cabang");
  const isMemberTransaction = location.pathname === "/anggota/transaksi";

  const shouldHideToaster =
    (isMobilePrototype && !isNewMBankingArea) ||
    isObsArea ||
    isSakEpCabangArea;

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
      <LoanDebtUnsupportedAlertText />

      <MemberReportFilterPlaceholderStyle />
      <KtpReportStatusSync />
      <MitraKaryaKtpPreviewModal />
      <KtpUploadDeleteEnhancer />

      <LoanInterestPercentInputFix />
      <LoanInterestChangeSuccessGate />
      <LoanInterestWizardCancelButton />
      <LoanInterestAdjustmentHoverStyle />
      <LoanInterestAccountCardStyle />
      <LoanInterestSummaryReasonSection />
      <LoanDebtChangeSaveGate />
      <LoanDebtAdjustmentHistoryTriggerFix />
      <LoanDebtBillingInterestColumns />
      <LoanProductTermsSection />
      <LoanProductAutodebetScheduleSection />
      <AutodebetScheduleStatusSync />
      <LoanExtensionAccountInfoLayout />
      <LoanExtensionAccountInfoToggle />
      <LoanExtensionStepTwoSummarySync />

      {isMemberTransaction ? <InterestAdjustmentBillingMarkers /> : null}

      {shouldHideToaster ? null : (
        <Sonner
          position="top-right"
          offset={{ top: 20, right: 32, left: 16, bottom: 16 }}
        />
      )}
    </>
  );
}