import * as React from "react";
import PaymentLinkDesktopStatusCard from "@/components/payment-link/PaymentLinkDesktopStatusCard";
import PaymentLinkDesktopStatusSelector from "@/components/payment-link/PaymentLinkDesktopStatusSelector";
import type { PaymentLinkDesktopStatus } from "@/components/payment-link/payment-link-status-types";

export default function PaymentLinkStatus() {
  const [status, setStatus] =
    React.useState<PaymentLinkDesktopStatus>("berhasil");

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="grid gap-4">
          <PaymentLinkDesktopStatusSelector
            value={status}
            onChange={setStatus}
          />
          <PaymentLinkDesktopStatusCard status={status} />
        </div>
      </div>
    </div>
  );
}