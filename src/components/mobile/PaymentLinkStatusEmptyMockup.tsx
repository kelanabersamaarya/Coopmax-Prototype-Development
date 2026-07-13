"use client";

import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
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
        <div className="h-full min-h-full bg-white">
          <div className="sr-only">
            Status Pembayaran Payment Link: {status}
          </div>
        </div>
      )}
    </MobileMockupFrame>
  );
}