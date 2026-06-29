import * as React from "react";
import { CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AccountingSidebar, {
  type AccountingMenuItem,
} from "@/components/accounting/AccountingSidebar";
import AccountingCodeAccountsView from "@/components/accounting/AccountingCodeAccountsView";

export default function SakAkunting() {
  const [active, setActive] = React.useState<AccountingMenuItem>({
    groupId: "transaksi",
    groupLabel: "TRANSAKSI",
    itemLabel: "Dashboard",
  });

  const isKodeAkun =
    active.groupId === "pengaturan" && active.itemLabel === "Kode Akun";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="grid items-start gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <AccountingSidebar active={active} onChange={setActive} />

          <Card className="rounded-[5px] border-slate-200/70 bg-white p-5 shadow-sm md:p-6">
            {isKodeAkun ? (
              <>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-[21px] font-bold leading-tight text-black">
                    Akuntansi Pengaturan
                  </h1>
                </div>

                <AccountingCodeAccountsView />
              </>
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-[21px] font-bold leading-tight text-black">
                    Laporan
                  </h1>
                  <span className="text-[16px] font-normal leading-tight text-black">
                    Neraca Harian
                  </span>
                </div>

                <div className="mt-6 grid max-w-[420px] gap-3">
                  <label className="text-[14px] font-normal leading-tight text-[#002060]">
                    Tanggal
                  </label>

                  <div className="flex h-[30px] overflow-hidden rounded-[5px] border border-slate-300 bg-white">
                    <span className="inline-flex h-full w-[52px] items-center justify-center border-r border-slate-300 bg-slate-100 text-slate-500">
                      <CalendarDays className="h-5 w-5" strokeWidth={2.2} />
                    </span>

                    <Input
                      value="26/06/2026"
                      readOnly
                      className={cn(
                        "h-full min-w-0 flex-1 rounded-none border-0 bg-white px-3",
                        "text-[14px] font-normal text-[#334155] shadow-none",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                      )}
                    />
                  </div>

                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-[30px] w-fit items-center justify-center rounded-[5px] px-4",
                      "text-[13px] font-normal text-white",
                      "ring-1 ring-[#6F42C1]/25 transition hover:bg-[#643ab0]",
                    )}
                    style={{ backgroundColor: "#6F42C1" }}
                  >
                    Tampilkan Laporan
                  </button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}