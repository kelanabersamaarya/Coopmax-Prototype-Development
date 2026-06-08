import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BranchProductRow = {
  id: string;
  cabang: string;
  produkPinjaman: string;
  status: "Aktif" | "Nonaktif";
};

const seedRows: BranchProductRow[] = [
  {
    id: "1",
    cabang: "Kantor Pusat",
    produkPinjaman: "Pinjaman Billing",
    status: "Aktif",
  },
  {
    id: "2",
    cabang: "Ubud",
    produkPinjaman: "Pinjaman Bulanan 9",
    status: "Aktif",
  },
  {
    id: "3",
    cabang: "Gianyar",
    produkPinjaman: "Pinjaman Harian",
    status: "Aktif",
  },
];

function StatusBadge({ status }: { status: BranchProductRow["status"] }) {
  return (
    <Badge
      className={cn(
        "rounded-[5px] px-2.5 py-1 text-[11px] font-semibold leading-none",
        status === "Aktif"
          ? "bg-emerald-600 text-white hover:bg-emerald-600"
          : "bg-rose-600 text-white hover:bg-rose-600",
      )}
    >
      {status}
    </Badge>
  );
}

export default function LoanProductsCabang() {
  const rows = React.useMemo(() => seedRows, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Produk Pinjaman Cabang
          </h1>
          <div className="text-sm font-semibold text-slate-500">Daftar</div>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="overflow-hidden rounded-[5px] bg-white ring-1 ring-slate-200">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[720px] border-collapse">
                <thead className="bg-white">
                  <tr className="border-b border-slate-300/70 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                    <th className="w-[70px] px-3 py-3">No.</th>
                    <th className="px-3 py-3">Cabang</th>
                    <th className="px-3 py-3">Produk Pinjaman</th>
                    <th className="w-[140px] px-3 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={cn(
                        "border-b border-slate-200 text-[13px]",
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                      )}
                    >
                      <td className="px-3 py-3 text-slate-900 tabular-nums">
                        {index + 1}
                      </td>
                      <td className="px-3 py-3 font-medium text-slate-900">
                        {row.cabang}
                      </td>
                      <td className="px-3 py-3 text-slate-900">
                        {row.produkPinjaman}
                      </td>
                      <td className="px-3 py-3">
                        <StatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}