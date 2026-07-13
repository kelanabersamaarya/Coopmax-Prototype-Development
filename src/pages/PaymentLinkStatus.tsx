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
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Status Pembayaran Payment Link
          </h1>
          <div className="text-base font-semibold text-slate-600">Djoinpay</div>
        </div>

        <div className="mt-6 grid items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
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