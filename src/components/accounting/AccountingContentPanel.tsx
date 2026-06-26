"use client";

import { Calculator, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AccountingMenuItem } from "@/components/accounting/AccountingSidebar";
import AccountingDashboardLanding from "@/components/accounting/AccountingDashboardLanding";

export default function AccountingContentPanel({
  active,
}: {
  active: AccountingMenuItem;
}) {
  const isDashboard =
    active.groupId === "transaksi" && active.itemLabel === "Dashboard";

  if (isDashboard) {
    return <AccountingDashboardLanding />;
  }

  return (
    <Card className="min-h-[520px] rounded-[5px] border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="inline-flex items-center rounded-[5px] bg-violet-50 px-3 py-1 text-[12px] font-extrabold uppercase tracking-wide text-violet-700 ring-1 ring-violet-200">
            {active.groupLabel}
          </div>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
            {active.itemLabel}
          </h2>

          <p className="mt-2 max-w-2xl text-[14px] font-medium leading-relaxed text-slate-600">
            Halaman Akunting untuk menu {active.groupLabel.toLowerCase()} —{" "}
            {active.itemLabel} sudah siap sebagai area kerja.
          </p>
        </div>

        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[5px] bg-slate-100 text-slate-700 ring-1 ring-slate-200">
          <Calculator className="h-6 w-6" />
        </span>
      </div>

      <div className="mt-7 rounded-[5px] border border-dashed border-slate-300 bg-slate-50 p-6">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-white text-violet-700 ring-1 ring-slate-200">
            <FileText className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <div className="text-[15px] font-extrabold tracking-tight text-slate-900">
              Konten {active.itemLabel}
            </div>
            <div className="mt-1 text-[13px] font-medium leading-relaxed text-slate-600">
              Bagian ini dapat diisi dengan form, tabel, atau laporan akunting
              sesuai kebutuhan berikutnya.
            </div>
          </div>
        </div>
      </div>

      <div className={cn("mt-6 grid gap-3", "sm:grid-cols-2 lg:grid-cols-3")}>
        {["Status", "Periode", "Cabang"].map((label) => (
          <div
            key={label}
            className="rounded-[5px] bg-white p-4 ring-1 ring-slate-200"
          >
            <div className="text-[12px] font-semibold text-slate-500">
              {label}
            </div>
            <div className="mt-1 text-[14px] font-extrabold text-slate-900">
              Prototype
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}