import * as React from "react";
import {
  ArrowDownToLine,
  ArrowUpToLine,
  CalendarDays,
  ChevronDown,
  ChevronsUpDown,
  Percent,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { getSavingsTransactions, type SavingsTransaction } from "@/lib/savingsTransactionsStore";

const actionItems = [
  { label: "Import Setoran", icon: ArrowDownToLine },
  { label: "Import Penarikan", icon: ArrowUpToLine },
  { label: "Transaksi dari Kolektor", icon: Users },
  { label: "Transaksi Terhapus", icon: Trash2 },
  { label: "Debet Setoran Bulanan ke Tabungan Berjangka", icon: CalendarDays },
  { label: "Debet Setoran ke Tabungan Wajib", icon: CalendarDays },
  { label: "Biaya Admin", icon: Tag },
  { label: "Bunga", icon: Percent },
  { label: "Setoran", icon: ArrowDownToLine },
  { label: "Tarikan", icon: ArrowUpToLine },
];

function FilterInput({ placeholder, className }: { placeholder?: string; className?: string }) {
  return <Input placeholder={placeholder} className={cn("h-9 rounded-[5px] border-slate-300 bg-white text-[12px] shadow-none", className)} />;
}

function SortableHeader({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 whitespace-nowrap", className)}>
      {label}
      <ChevronsUpDown className="h-3.5 w-3.5 shrink-0" />
    </span>
  );
}

export default function AstitiSimpananTransaksi() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState("20");
  const [date, setDate] = React.useState("13-09-2026");
  const [transactions, setTransactions] = React.useState<SavingsTransaction[]>(() => getSavingsTransactions());

  React.useEffect(() => {
    const refresh = () => setTransactions(getSavingsTransactions());
    window.addEventListener("savings-transactions-updated", refresh);
    return () => window.removeEventListener("savings-transactions-updated", refresh);
  }, []);

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-[hsl(var(--app-bg))] px-0 py-1 text-[#0c2a62] md:px-0">
      <div className="px-4 pb-5 pt-2 md:px-8 md:pt-2">
        <div className="flex items-center gap-2">
          <h1 className="text-[22px] font-semibold tracking-tight text-[#08285f]">Transaksi Tabungan</h1>
          <span className="text-[17px] font-medium text-[#08285f]">Daftar</span>
        </div>

        <div className="mt-7 flex max-w-[1220px] flex-wrap gap-2.5">
          {actionItems.map(({ label, icon: Icon, active }) => (
            <Button
              key={label}
              type="button"
              variant="ghost"
              onClick={() => {
                if (label === "Setoran") navigate("/astiti-dana-lestari/simpanan/setoran");
                if (label === "Tarikan") navigate("/astiti-dana-lestari/simpanan/tarikan");
              }}
              className={cn(
                "h-[42px] rounded-full bg-white px-4 text-[14px] font-normal text-[#526784] shadow-sm hover:bg-[#eef0ff]",
                active && "bg-[#eeebff] text-[#526784]",
              )}
            >
              <Icon className="mr-2 h-[18px] w-[18px] stroke-[2.5]" />
              {label}
            </Button>
          ))}
        </div>

        <section className="mt-5 min-h-[550px] overflow-hidden rounded-[20px] bg-white px-5 py-5 shadow-[0_4px_16px_rgba(53,75,120,0.03)] md:px-5">
          <div className="flex items-center gap-1 text-[13px] text-slate-800">
            <span>Tampilkan</span>
            <select value={pageSize} onChange={(event) => setPageSize(event.target.value)} className="h-7 rounded border border-slate-300 bg-white px-1 text-[13px] text-slate-800 outline-none">
              <option>10</option><option>20</option><option>50</option>
            </select>
            <span>entri</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[1120px] border-collapse text-left text-[12px] text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-[12px] font-bold uppercase tracking-wide text-[#102b5e]">
                  <th className="w-14 whitespace-nowrap px-2 py-3">NO.</th>
                  <th className="w-[150px] whitespace-nowrap px-2 py-3"><SortableHeader label="NO. TRANSAKSI" /></th>
                  <th className="w-[110px] whitespace-nowrap px-2 py-3"><SortableHeader label="NO. REKENING" /></th>
                  <th className="w-[120px] whitespace-nowrap px-2 py-3"><SortableHeader label="ID NASABAH" /></th>
                  <th className="w-[170px] whitespace-nowrap px-2 py-3"><SortableHeader label="NAMA NASABAH" /></th>
                  <th className="w-[150px] whitespace-nowrap px-2 py-3"><SortableHeader label="NAMA KOLEKTOR" /></th>
                  <th className="w-[130px] whitespace-nowrap px-2 py-3"><SortableHeader label="TABUNGAN" /></th>
                  <th className="w-[120px] whitespace-nowrap bg-[hsl(var(--app-bg))] px-2 py-3"><SortableHeader label="TANGGAL" /></th>
                  <th className="w-[145px] whitespace-nowrap px-2 py-3"><SortableHeader label="TRANSAKSI" /></th>
                  <th className="w-[110px] whitespace-nowrap px-2 py-3"><SortableHeader label="NOMINAL" /></th>
                </tr>
                <tr className="border-b border-slate-200">
                  <th />
                  <th className="px-2 py-3"><FilterInput /></th>
                  <th className="px-2 py-3"><FilterInput /></th>
                  <th className="px-2 py-3"><FilterInput /></th>
                  <th className="px-2 py-3"><FilterInput /></th>
                  <th className="px-2 py-3"><div className="relative"><FilterInput /><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500" /></div></th>
                  <th className="px-2 py-3"><div className="relative"><FilterInput placeholder="-- Semua" /><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500" /></div></th>
                  <th className="bg-[hsl(var(--app-bg))] px-2 py-3"><Input value={date} onChange={(event) => setDate(event.target.value)} className="h-9 rounded-[5px] border-slate-300 bg-white !px-2 !text-[10px] !font-normal leading-none tracking-normal" /></th>
                  <th className="px-2 py-3"><div className="relative"><FilterInput placeholder="-- Semua" /><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-slate-500" /></div></th>
                  <th className="px-2 py-3"><FilterInput placeholder="0,00" /></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => <tr key={transaction.id} className="cursor-pointer border-b border-slate-200 align-top transition-colors hover:bg-[#f8f7ff]" onClick={() => navigate("/astiti-dana-lestari/simpanan/transaksi/detail")}>
                  <td className="px-2 py-1.5 text-[13px]">{transaction.no}</td><td className="px-2 py-1.5 font-medium text-blue-600">{transaction.id}</td><td className="px-2 py-1.5">{transaction.rekening}</td><td className="px-2 py-1.5">{transaction.nasabah}</td><td className="px-2 py-1.5">{transaction.nama}</td><td className="px-2 py-1.5">{transaction.kolektor}</td><td className="px-2 py-1.5 leading-tight">{transaction.tabungan}</td><td className="bg-[hsl(var(--app-bg))] px-2 py-1.5">{transaction.tanggal}</td><td className="px-2 py-1.5 leading-tight">{transaction.jenis}</td><td className={cn("px-2 py-1.5 font-medium", transaction.nominal.startsWith("-") ? "text-red-500" : "text-lime-600")}>{transaction.nominal}</td>
                </tr>)}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 text-[13px] text-slate-800">
            <span>Menampilkan 1 sampai {transactions.length} dari {transactions.length} entri</span>
            <div className="flex gap-2">
              <Button variant="ghost" disabled className="h-9 rounded-none bg-[#f0f2f6] px-3 text-slate-300">Sebelumnya</Button>
              <Button variant="ghost" disabled className="h-9 rounded-none bg-[#f0f2f6] px-3 text-slate-300">Selanjutnya</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
