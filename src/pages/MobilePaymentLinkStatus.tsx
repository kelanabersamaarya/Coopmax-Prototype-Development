import * as React from "react";
import PaymentLinkStatusEmptyMockup from "@/components/mobile/PaymentLinkStatusEmptyMockup";
import PaymentLinkStatusSelector, {
  type PaymentLinkMobileStatus,
} from "@/components/mobile/PaymentLinkStatusSelector";

export default function MobilePaymentLinkStatus() {
  const [status, setStatus] =
    React.useState<PaymentLinkMobileStatus>("berhasil");

  return (
    <div className="h-full min-h-0 overflow-hidden bg-[hsl(var(--app-bg))]">
      <div className="grid h-full min-h-0 w-full gap-3 overflow-hidden px-0 py-0 md:grid-cols-[240px_minmax(0,1fr)] md:px-3">
        <aside className="hidden min-h-0 overflow-auto py-3 md:block">
          <PaymentLinkStatusSelector value={status} onChange={setStatus} />
        </aside>

        <div className="h-full min-h-0 overflow-hidden">
          <PaymentLinkStatusEmptyMockup status={status} />
        </div>
      </div>
    </div>
  );
}