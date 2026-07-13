"use client";

import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import type { PaymentLinkMobileStatus } from "@/components/mobile/PaymentLinkStatusSelector";

export default function PaymentLinkStatusEmptyMockup({
  status,
}: {
  status: PaymentLinkMobileStatus;
}) {
  return (
    <MobileMockupFrame edgeToEdge>
      <div className="h-full min-h-full bg-white">
        <div className="sr-only">
          Status Pembayaran Payment Link: {status}
        </div>
      </div>
    </MobileMockupFrame>
  );
}