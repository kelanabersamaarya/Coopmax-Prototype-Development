import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

type LoanApplicationRow = {
  id: string;
  tanggal: string;
  nasabah: string;
  produk: string;
  nominal: string;
  status: "Draft" | "Diajukan" | "Ditolak" | "Disetujui";
};

const seed: LoanApplicationRow[] = [
  {
    id: "APP-260001",
    tanggal: "13-04-2026",
    nasabah: "N2500010 - Gaby",
    produk: "Pinjaman Billing",
    nominal: "10.000.000",
    status: "Draft",
  },
  {
    id: "APP-260002",
    tanggal: "12-04-2026",
    nasabah: "N2500011 - Nyoman Ariana",
    produk: "Pinjaman Koperasi",
    nominal: "5.000.000",
    status: "Diajukan",
  },
];

function StatusBadge({ status }: { status: LoanApplicationRow["status"] }) {
  const map: Record<
    LoanApplicationRow["status"],
    { className: string; label: string }
  > = {
    Draft: {
      className: "bg-slate-200 text-slate-800 hover:bg-slate-200",
      label: "Draft",
    },
    Diajukan: {
      className: "bg-blue-600 text-white hover:bg-blue-600",
      label: "Diajukan",
    },
    Ditolak: {
      className: "bg-rose-600 text-white hover:bg-rose-600",
      label: "Ditolak",
    },
    Disetujui: {
      className: "bg-emerald-600 text-white hover:bg-emerald-600",
      label: "Disetujui",
    },
  };

  const v = map[status];
  return <Badge className={`rounded-full ${v.className}`}>{v.label}</Badge>;
}

export default function LoanApplications() {
  const rows = React.useMemo(() => seed, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Daftar Pengajuan Pinjaman
              </h1>
              <div className="text-sm font-semibold text-slate-500">Daftar</div>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Kelola daftar pengajuan pinjaman. Tampilan daftar mengikuti pola
              halaman lain dengan tabel yang ringkas.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800 hover:bg-slate-50"
          >
            <Link to="/loans/applications/new">
              <Plus className="mr-2 h-4 w-4" />
              Tambah
            </Link>
          </Button>
        </div>

        <Separator className="my-6 bg-slate-200/70" />

        <Card className="overflow-hidden rounded-3xl border-slate-200/70 bg-white/85 shadow-sm backdrop-blur">
          <div className="overflow-auto">
            <table className="w-full min-w-[740px] border-collapse">
              <thead className="bg-slate-50">
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  <th className="w-[160px] px-5 py-4">ID</th>
                  <th className="w-[140px] px-5 py-4">Tanggal</th>
                  <th className="min-w-[260px] px-5 py-4">Nasabah</th>
                  <th className="min-w-[220px] px-5 py-4">Produk</th>
                  <th className="w-[160px] px-5 py-4">Nominal</th>
                  <th className="w-[140px] px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100 text-sm">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {r.id}
                    </td>
                    <td className="px-5 py-4 text-slate-700">{r.tanggal}</td>
                    <td className="px-5 py-4 text-slate-800">{r.nasabah}</td>
                    <td className="px-5 py-4 text-slate-800">{r.produk}</td>
                    <td className="px-5 py-4 text-slate-800">{r.nominal}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}