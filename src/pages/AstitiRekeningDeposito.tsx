import * as React from "react";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import DepositAccountDetail from "@/components/savings/DepositAccountDetail";

type DepositRow = {
  no: number;
  rekening: string;
  tanggal: string;
  produk: string;
  idNasabah: string;
  nama: string;
  saldo: string;
  bunga: string;
  bungaTahun: string;
  status: "Aktif";
};

const rows: DepositRow[] = [
  { no: 1, rekening: "55260001", tanggal: "29-01-2026", produk: "SIJAKOP", idNasabah: "N2400028", nama: "Rahmi Melani", saldo: "20.000.000,00", bunga: "0,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 2, rekening: "55250001", tanggal: "08-05-2025", produk: "SIJAKOP", idNasabah: "A2300013", nama: "Yulia Farida", saldo: "100.000.000,00", bunga: "0,00", bungaTahun: "12.00", status: "Aktif" },
  { no: 3, rekening: "55240001", tanggal: "13-05-2024", produk: "SIJAKOP", idNasabah: "N2400029", nama: "Pangeran Sirait", saldo: "100.000.000,00", bunga: "0,00", bungaTahun: "4.80", status: "Aktif" },
  { no: 4, rekening: "55230011", tanggal: "24-07-2023", produk: "SIJAKOP", idNasabah: "A2300001", nama: "Balijan Uwais", saldo: "10.000.000,00", bunga: "0,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 5, rekening: "55230010", tanggal: "31-08-2023", produk: "SIJAKOP", idNasabah: "A2300024", nama: "Jessica Uyainah S.Gz", saldo: "10.000.000,00", bunga: "0,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 6, rekening: "55230009", tanggal: "31-08-2023", produk: "SIJAKOP", idNasabah: "A2300022", nama: "Vanya Rahmawati", saldo: "10.000.000,00", bunga: "0,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 7, rekening: "55230008", tanggal: "18-07-2023", produk: "SIJAKOP", idNasabah: "A2300023", nama: "Jamil Thamrin", saldo: "50.000.000,00", bunga: "0,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 8, rekening: "55230007", tanggal: "16-06-2023", produk: "SIJAKOP", idNasabah: "A2300013", nama: "Yulia Farida", saldo: "10.000.000,00", bunga: "0,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 9, rekening: "55230006", tanggal: "16-06-2023", produk: "SIJAKOP", idNasabah: "A2300024", nama: "Jessica Uyainah S.Gz", saldo: "1.000.000,00", bunga: "0,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 10, rekening: "55230005", tanggal: "16-06-2023", produk: "SIJAKOP", idNasabah: "A2300018", nama: "Ciaobella Usada S.Farm", saldo: "10.000.000,00", bunga: "0,00", bungaTahun: "9.00", status: "Aktif" },
  { no: 11, rekening: "55230004", tanggal: "16-06-2023", produk: "SIJAKOP", idNasabah: "A2300013", nama: "Yulia Farida", saldo: "100.000,00", bunga: "0,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 12, rekening: "55230003", tanggal: "16-06-2023", produk: "SIJAKOP", idNasabah: "A2400002", nama: "Zulfa Yunita Nasyidah S.Ked", saldo: "1.000.000,00", bunga: "16.600,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 13, rekening: "55230002", tanggal: "16-06-2023", produk: "SIJAKOP", idNasabah: "A2300022", nama: "Vanya Rahmawati", saldo: "1.000.000.000,00", bunga: "0,00", bungaTahun: "10.00", status: "Aktif" },
  { no: 14, rekening: "55230001", tanggal: "07-06-2023", produk: "SIJAKOP", idNasabah: "A2300008", nama: "Jelita Padmasari", saldo: "20.000.000,00", bunga: "333.200,00", bungaTahun: "10.00", status: "Aktif" },
];

function SortLabel({ children, sortable = true }: { children: React.ReactNode; sortable?: boolean }) {
  return <div className="flex items-center justify-between gap-2"><span>{children}</span>{sortable && <span className="inline-flex flex-col leading-none"><ChevronUp className="h-3 w-3" /><ChevronDown className="h-3 w-3" /></span>}</div>;
}

export default function AstitiRekeningDeposito() {
  const [selectedAccount, setSelectedAccount] = React.useState<DepositRow | null>(null);
  const [pageSize, setPageSize] = React.useState("20");

  React.useEffect(() => {
    const handleAccountClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const account = rows.find((item) => item.rekening === target.textContent?.trim());
      if (account) setSelectedAccount(account);
    };
    document.addEventListener("click", handleAccountClick);
    return () => document.removeEventListener("click", handleAccountClick);
  }, []);
  const [filters, setFilters] = React.useState({ rekening: "", tanggal: "", produk: "Semua", idNasabah: "", nama: "", saldo: "", saldoBunga: "", bungaTahun: "", status: "Semua" });
  const setFilter = (key: keyof typeof filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const filtered = rows.filter((row) =>
    row.rekening.includes(filters.rekening) && row.tanggal.includes(filters.tanggal) &&
    (filters.produk === "Semua" || row.produk === filters.produk) && row.idNasabah.toLowerCase().includes(filters.idNasabah.toLowerCase()) &&
    row.nama.toLowerCase().includes(filters.nama.toLowerCase()) && row.saldo.includes(filters.saldo) && row.bunga.includes(filters.saldoBunga) && row.bungaTahun.includes(filters.bungaTahun) &&
    (filters.status === "Semua" || row.status === filters.status),
  );

  const input = (key: keyof typeof filters, placeholder = "") => <Input value={filters[key]} onChange={(e) => setFilter(key, e.target.value)} placeholder={placeholder} className="h-8 rounded-md border-slate-300 text-[12px] shadow-none" />;
  const select = (key: keyof typeof filters, options: string[]) => <Select value={filters[key]} onValueChange={(value) => setFilter(key, value)}><SelectTrigger className="h-8 rounded-md border-slate-300 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option === "Semua" ? "-- Semua" : option}</SelectItem>)}</SelectContent></Select>;
  const th = "px-2 py-2.5";
  const td = "px-2 py-2";

  if (selectedAccount) {
    return <DepositAccountDetail account={selectedAccount} onBack={() => setSelectedAccount(null)} />;
  }

  return <div className="min-h-screen bg-[hsl(var(--app-bg))] px-2 py-6 md:px-3 md:py-8">
    <div className="flex items-center justify-between gap-4"><div className="flex items-baseline gap-2"><h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Rekening Deposito</h1><span className="text-sm font-semibold text-slate-600">Daftar</span></div><Button onClick={() => toast.success("Tambah rekening deposito", { description: "Form penambahan rekening siap digunakan." })} className="h-10 rounded-full bg-white px-5 text-sm font-medium text-slate-700 shadow-sm hover:bg-violet-50"><Plus className="mr-2 h-4 w-4 text-violet-700" />Tambah</Button></div>
    <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white p-4 shadow-sm md:p-5"><div className="flex items-center gap-2 pb-3 text-[13px] text-slate-800"><span>Tampilkan</span><Select value={pageSize} onValueChange={setPageSize}><SelectTrigger className="h-7 w-[68px] rounded-md border-slate-300 px-2 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select><span>entri</span></div>
      <div className="overflow-hidden"><table className="w-full table-fixed border-collapse text-[12px] text-[#173b70]"><thead><tr className="bg-white text-left text-[12px] font-bold uppercase tracking-wide text-[#123664]"><th className={cn(th, "w-[5%]")}><SortLabel sortable={false}>No.</SortLabel></th><th className={cn(th, "w-[10%]")}><SortLabel>No. Rekening</SortLabel></th><th className={cn(th, "w-[10%]")}><SortLabel>Tanggal<br />Daftar</SortLabel></th><th className={cn(th, "w-[10%]")}><SortLabel>Produk<br />Deposito</SortLabel></th><th className={cn(th, "w-[10%]")}><SortLabel>ID. Nasabah</SortLabel></th><th className={cn(th, "w-[16%] whitespace-nowrap")}><SortLabel>Nama Nasabah</SortLabel></th><th className={cn(th, "w-[13%]")}><SortLabel>Saldo<br />Deposito</SortLabel></th><th className={cn(th, "w-[10%]")}><SortLabel>Saldo Bunga</SortLabel></th><th className={cn(th, "w-[11%]")}><SortLabel>Bunga Per<br />Tahun (%)</SortLabel></th><th className={cn(th, "w-[5%]")}><SortLabel>Status</SortLabel></th></tr><tr className="border-b border-slate-200 bg-white"><th /><th className="px-1 py-1.5">{input("rekening")}</th><th className="px-1 py-1.5"><div className="relative">{input("tanggal")}<button type="button" onClick={() => setFilter("tanggal", "")} className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-r-md bg-slate-500 text-white"><X className="h-4 w-4" /></button></div></th><th className="px-1 py-1.5">{select("produk", ["Semua", "SIJAKOP"])}</th><th className="px-1 py-1.5">{input("idNasabah")}</th><th className="px-1 py-1.5">{input("nama")}</th><th className="px-1 py-1.5">{input("saldo", ",")}</th><th className="px-1 py-1.5">{input("saldoBunga", ",")}</th><th className="px-1 py-1.5">{input("bungaTahun")}</th><th className="px-1 py-1.5">{select("status", ["Semua", "Aktif"])}</th></tr></thead><tbody>{filtered.slice(0, Number(pageSize)).map((row, index) => <tr key={row.rekening} className="border-b border-slate-300/80 bg-white"><td className={td}>{index + 1}</td><td className={cn(td, "font-medium text-blue-700")}>{row.rekening}</td><td className={td}>{row.tanggal}</td><td className={td}>{row.produk}</td><td className={td}>{row.idNasabah}</td><td className={cn(td, "truncate whitespace-nowrap")}>{row.nama}</td><td className={cn(td, "truncate text-right tabular-nums")}>{row.saldo}</td><td className={cn(td, "truncate text-right tabular-nums")}>{row.bunga}</td><td className={cn(td, "tabular-nums")}>{row.bungaTahun}</td><td className={cn(td, "whitespace-nowrap")}><Badge className="rounded-[3px] bg-green-600 px-1.5 py-0.5 text-[10px] font-bold text-white hover:bg-green-600">{row.status}</Badge></td></tr>)}</tbody></table></div>
      <div className="flex flex-col items-start justify-between gap-4 pt-4 text-[13px] text-slate-800 md:flex-row md:items-center"><span>Menampilkan {filtered.length ? 1 : 0} sampai {Math.min(filtered.length, Number(pageSize))} dari {filtered.length} entri</span><div className="inline-flex overflow-hidden rounded-sm bg-slate-100"><button disabled className="h-8 px-3 text-slate-400">Sebelumnya</button><span className="grid h-8 w-8 place-items-center bg-violet-600 font-semibold text-white">1</span><button disabled className="h-8 px-3 text-slate-400">Selanjutnya</button></div></div>
    </Card></div>;
}
