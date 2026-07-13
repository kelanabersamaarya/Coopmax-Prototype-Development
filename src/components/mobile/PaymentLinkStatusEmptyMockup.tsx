"use client";

import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import PaymentLinkExpiredStatusScreen from "@/components/mobile/PaymentLinkExpiredStatusScreen";
import PaymentLinkFailedStatusScreen from "@/components/mobile/PaymentLinkFailedStatusScreen";
import PaymentLinkSuccessStatusScreen from "@/components/mobile/PaymentLinkSuccessStatusScreen";
import type { PaymentLinkMobileStatus } from "@/components/mobile/PaymentLinkStatusSelector";

export default function PaymentLinkStatusEmptyMockup({
  status,
}: {
  status: PaymentLinkMobileStatus;
}) {
  return (
    <MobileMockupFrame edgeToEdge>
      {status === "berhasil" ? (
        <PaymentLinkSuccessStatusScreen />
      ) : status === "gagal" ? (
        <PaymentLinkFailedStatusScreen />
      ) : (
        <PaymentLinkExpiredStatusScreen />
      )}
    </MobileMockupFrame>
  );
}