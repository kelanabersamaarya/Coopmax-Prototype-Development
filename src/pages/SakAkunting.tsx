import * as React from "react";
import { Card } from "@/components/ui/card";
import AccountingSidebar, {
  type AccountingMenuItem,
} from "@/components/accounting/AccountingSidebar";

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

          <Card className="min-h-[560px] rounded-[5px] border-slate-200/70 bg-white p-5 shadow-sm md:p-6">
            <div className="flex items-baseline gap-2">
              <h1 className="text-[21px] font-bold leading-tight text-black">
                Laporan
              </h1>
              <span className="text-[16px] font-normal leading-tight text-black">
                Neraca Harian
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}