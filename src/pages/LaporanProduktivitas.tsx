import * as React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FileSpreadsheet, FileText, Printer, Search } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Row = {
  no: number;
  kolektor: string;
  jumlahNasabah: number;
  totalPencairan: string;
  totalAngsuran: string;
  transaksi: number;
  produktivitas: string;
};

const seedRows: Row[] = [
  {
    no: 1,
    kolektor: "Gina Farida M.M.",
    jumlahNasabah: 42,
    totalPencairan: "126.000.000,00",
    totalAngsuran: "84.500.000,00",
    transaksi: 118,
    produktivitas: "Sangat Baik",
  },
  {
    no: 2,
    kolektor: "Dinda Sudiati",
    jumlahNasabah: 35,
    totalPencairan: "98.500.000,00",
    totalAngsuran: "61.250.000,00",
    transaksi: 92,
    produktivitas: "Baik",
  },
  {
    no: 3,
    kolektor: "Kolektor A",
    jumlahNasabah: 28,
    totalPencairan: "72.000.000,00",
    totalAngsuran: "43.750.000,00",
    transaksi: 76,
    produktivitas: "Cukup",
  },
];

function ActionPill({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full bg-white px-4",
        "text-[13px] font-normal text-slate-700",
        "ring-1 ring-slate-200 shadow-sm transition hover:bg-slate-50",
      )}
    >
      <Icon className="h-4 w-4 text-slate-500" />
      {label}
    </button>
  );
}

function StatusBadge({ value }: { value: string }) {
  const cls =
    value === "Sangat Baik"
      ? "bg-emerald-600 text-white"
      : value === "Baik"
        ? "bg-blue-600 text-white"
        : "bg-amber-500 text-white";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-2.5 py-1",
        "text-[12px] font-semibold leading-none",
        cls,
      )}
    >
      {value}
    </span>
  );
}

export default function LaporanProduktivitas() {
  const [kolektor, setKolektor] = React.useState("-- Semua --");
  const [bulan, setBulan] = React.useState("Mei");
  const [tahun, setTahun] = React.useState("2026");
  const [showReport, setShowReport] = React.useState(false);

  const rows = React.useMemo(() => {
    if (kolektor === "-- Semua --") return seedRows;
    return seedRows.filter((row) => row.kolektor === kolektor);
  }, [kolektor]);

  const inputCls =
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] font-normal shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0";

  const selectTriggerCls =
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] font-normal shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0";

  const th =
    "border-b border-slate-300 px-3 py-3 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900";
  const td = "border-b border-slate-200 px-3 py-2.5 text-[13px] text-slate-900";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Produktivitas
          </h1>

          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
            <ActionPill
              icon={FileSpreadsheet}
              label="Export Excel"
              onClick={() => toast("Export Excel (prototype)")}
            />
            <ActionPill
              icon={FileText}
              label="Export PDF"
              onClick={() => toast("Export PDF (prototype)")}
            />
            <ActionPill
              icon={Printer}
              label="Cetak"
              onClick={() => toast("Cetak (prototype)")}
            />
          </div>
        </div>

        <Card className="mt-5 rounded-3xl border-0 bg-transparent p-0 shadow-none">
          <div className="w-full max-w-[760px]">
            <div className="grid gap-[15px]">
              <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div className="text-[13px] font-normal text-slate-900">
                  Kolektor
                </div>
                <div className="w-full md:max-w-[440px]">
                  <Select value={kolektor} onValueChange={setKolektor}>
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px] border-slate-200">
                      <SelectItem value="-- Semua --">-- Semua --</SelectItem>
                      <SelectItem value="Gina Farida M.M.">
                        Gina Farida M.M.
                      </SelectItem>
                      <SelectItem value="Dinda Sudiati">Dinda Sudiati</SelectItem>
                      <SelectItem value="Kolektor A">Kolektor A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div className="text-[13px] font-normal text-slate-900">
                  Periode
                </div>
                <div className="grid w-full gap-2 md:max-w-[440px] md:grid-cols-2">
                  <Select value={bulan} onValueChange={setBulan}>
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px] border-slate-200">
                      {[
                        "Januari",
                        "Februari",
                        "Maret",
                        "April",
                        "Mei",
                        "Juni",
                        "Juli",
                        "Agustus",
                        "September",
                        "Oktober",
                        "November",
                        "Desember",
                      ].map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    className={inputCls}
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div />
                <div className="flex w-full justify-end md:max-w-[440px]">
                  <button
                    type="button"
                    onClick={() => setShowReport(true)}
                    className={cn(
                      "inline-flex h-[30px] w-[61px] items-center justify-center gap-1.5 rounded-[5px]",
                      "bg-[#3BB001] text-[13px] font-normal text-white",
                      "ring-1 ring-[#3BB001]/25 transition hover:bg-[#349d01]",
                    )}
                  >
                    <Search className="h-3.5 w-3.5" />
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {showReport ? (
          <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
            <div className="mb-4 text-[13px] font-semibold text-slate-700">
              Periode: {bulan} {tahun}
            </div>

            <div className="overflow-hidden rounded-[5px] ring-1 ring-slate-200">
              <div className="safe-x-scroll bg-white">
                <table className="w-full min-w-[980px] border-collapse">
                  <thead className="bg-white">
                    <tr>
                      <th className={cn(th, "w-[70px]")}>No.</th>
                      <th className={cn(th, "w-[220px]")}>Kolektor</th>
                      <th className={cn(th, "w-[150px] text-right")}>
                        Jumlah Nasabah
                      </th>
                      <th className={cn(th, "w-[180px] text-right")}>
                        Total Pencairan
                      </th>
                      <th className={cn(th, "w-[180px] text-right")}>
                        Total Angsuran
                      </th>
                      <th className={cn(th, "w-[140px] text-right")}>
                        Transaksi
                      </th>
                      <th className={cn(th, "w-[160px]")}>Produktivitas</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {rows.map((row) => (
                      <tr key={row.no}>
                        <td className={cn(td, "tabular-nums")}>{row.no}</td>
                        <td className={cn(td, "font-semibold")}>{row.kolektor}</td>
                        <td className={cn(td, "text-right tabular-nums")}>
                          {row.jumlahNasabah}
                        </td>
                        <td className={cn(td, "text-right tabular-nums")}>
                          {row.totalPencairan}
                        </td>
                        <td className={cn(td, "text-right tabular-nums")}>
                          {row.totalAngsuran}
                        </td>
                        <td className={cn(td, "text-right tabular-nums")}>
                          {row.transaksi}
                        </td>
                        <td className={td}>
                          <StatusBadge value={row.produktivitas} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 text-[14px] text-slate-900">
              Menampilkan 1 sampai {rows.length} dari {rows.length} entri
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}