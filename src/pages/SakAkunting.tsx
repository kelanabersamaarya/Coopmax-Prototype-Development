import * as React from "react";
import AccountingSidebar, {
  type AccountingMenuItem,
} from "@/components/accounting/AccountingSidebar";
import AccountingContentPanel from "@/components/accounting/AccountingContentPanel";

export default function SakAkunting() {
  const [active, setActive] = React.useState<AccountingMenuItem>({
    groupId: "transaksi",
    groupLabel: "TRANSAKSI",
    itemLabel: "Dashboard",
  });

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <AccountingSidebar active={active} onChange={setActive} />
          <AccountingContentPanel active={active} />
        </div>
      </div>
    </div>
  );
}