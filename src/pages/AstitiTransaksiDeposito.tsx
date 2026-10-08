import * as React from "react";
import { ArrowUp, Percent, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDepositTransactions, type DepositTransaction } from "@/lib/depositTransactionsStore";

function Sort({ children, plain = false }: { children: React.ReactNode; plain?: boolean }) {
  return <div className="flex items-center justify-between gap-1"><span>{children}</span>{!plain && <span className="inline-flex shrink-0 flex-col leading-none"><ChevronUp className="h-3 w-3" /><ChevronDown className="h-3 w-3" /></span>}</div>;
}

function FilterInput({ placeholder }: { placeholder: string }) {
  return <Input placeholder={placeholder} className="h-8 rounded-md border-slate-300 px-2 text-[10px] font-normal placeholder:text-[10px] shadow-none" />;
}

function Action({ icon: Icon, children, onClick }: { icon: React.ElementType; children: React.ReactNode; onClick: () => void }) {
  return <Button variant="ghost" onClick={onClick} className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm hover:bg-violet-600 hover:text-white"><Icon className="mr-2 h-4 w-4" />{children}</Button>;
}

export default function AstitiTransaksiDeposito() {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const routePrefix = location.startsWith("/anggota/")
    ? "/anggota/simpanan-berjangka"
    : "/astiti-dana-lestari/simpanan-berjangka";
  const [pageSize, setPageSize] = React.useState("20");
  const [tanggal, setTanggal] = React.useState("13-09-2026");
  const [transactions, setTransactions] = React.useState<DepositTransaction[]>([]);

  React.useEffect(() => {
    const refresh = () => setTransactions(getDepositTransactions());
    refresh();
    window.addEventListener("deposit-transactions-updated", refresh);
    return () => window.removeEventListener("deposit-transactions-updated", refresh);
  }, []);

  return <div className="min-h-screen bg-[hsl(var(--app-bg))] px-3 py-6 md:px-5 md:py-8">
    <div className="flex flex-col items-stretch gap-3"><div className="flex items-baseline gap-2"><h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Transaksi Deposito</h1><span className="text-sm font-semibold text-slate-600">Daftar</span></div><div className="flex flex-wrap justify-end gap-2"><Action icon={Trash2} onClick={() => toast("Transaksi Terhapus")}>Transaksi Terhapus</Action><Action icon={Percent} onClick={() => toast("Bunga")}>Bunga</Action><Action icon={ArrowUp} onClick={() => navigate(`${routePrefix}/tarikan`)}>Penarikan Bunga</Action></div></div>
    <Card className="mt-5 min-h-[510px] rounded-3xl border-slate-200/70 bg-white p-4 shadow-sm md:p-5"><div className="flex items-center gap-2 pb-3 text-[13px] text-slate-800"><span>Tampilkan</span><Select value={pageSize} onValueChange={setPageSize}><SelectTrigger className="h-7 w-[68px] rounded-md border-slate-300 px-2 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select><span>entri</span></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[1050px] border-collapse text-[11px] text-[#173b70]"><thead><tr className="text-left text-[10px] font-bold uppercase tracking-wide text-[#123664]"><th className="w-[4%] px-1.5 py-1.5"><Sort plain>No.</Sort></th><th className="w-[11%] px-1.5 py-1.5"><Sort>No.<br />Transaksi</Sort></th><th className="w-[10%] px-1.5 py-1.5"><Sort>Rek.<br />Deposito</Sort></th><th className="w-[9%] px-1.5 py-1.5"><Sort>Rek.<br />Tabungan</Sort></th><th className="w-[9%] px-1.5 py-1.5"><Sort>ID Nasabah</Sort></th><th className="w-[12%] px-1.5 py-1.5"><Sort>Nama<br />Nasabah</Sort></th><th className="w-[10%] px-1.5 py-1.5"><Sort>Nama<br />Kolektor</Sort></th><th className="w-[10%] px-1.5 py-1.5"><Sort>Produk<br />Deposito</Sort></th><th className="w-[10%] bg-slate-100 px-1.5 py-1.5"><Sort>Tanggal</Sort></th><th className="w-[9%] px-1.5 py-1.5"><Sort>Jenis<br />Transaksi</Sort></th><th className="w-[6%] px-1.5 py-1.5"><Sort>Nominal</Sort></th></tr><tr className="border-b border-slate-200"><th />{["No. Transak","Rek. Depos","Rek. Tabung","ID Nasabah","Nama Nasabah","Nama Kolektor"].map((placeholder) => <th key={placeholder} className="px-1 py-1.5"><FilterInput placeholder={placeholder} /></th>)}<th className="px-1 py-1.5"><Select defaultValue="Semua"><SelectTrigger className="h-8 rounded-md border-slate-300 text-[10px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Semua">-- Semua</SelectItem><SelectItem value="SIJAKOP">SIJAKOP</SelectItem></SelectContent></Select></th><th className="bg-slate-100 px-1 py-1.5"><Input value={tanggal} onChange={(event) => setTanggal(event.target.value)} className="h-8 rounded-md border-slate-300 bg-white px-2 !text-[10px] !font-normal leading-none tracking-normal shadow-none" /></th><th className="px-1 py-1.5"><Select defaultValue="Semua"><SelectTrigger className="h-8 rounded-md border-slate-300 text-[10px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Semua">-- Semua</SelectItem><SelectItem value="Penarikan">Penarikan Bunga</SelectItem></SelectContent></Select></th><th className="px-1 py-1.5"><FilterInput placeholder="Nominal" /></th></tr></thead><tbody>{transactions.slice(0, Number(pageSize)).map((row) => <tr key={row.id} onClick={() => navigate(`${routePrefix}/transaksi/${encodeURIComponent(row.id)}`)} className="cursor-pointer border-b border-slate-200 hover:bg-blue-50"><td className="px-1.5 py-1.5">{row.no}</td><td className="px-1.5 py-1.5 text-blue-700">{row.id}</td><td className="px-1.5 py-1.5">{row.deposito}</td><td className="px-1.5 py-1.5">{row.tabungan}</td><td className="px-1.5 py-1.5">{row.nasabah}</td><td className="px-1.5 py-1.5 leading-tight">{row.nama}</td><td className="px-1.5 py-1.5">{row.kolektor}</td><td className="px-1.5 py-1.5">{row.produk}</td><td className="bg-slate-100 px-1.5 py-1.5">{row.tanggal}</td><td className="px-1.5 py-1.5 leading-tight">{row.jenis}</td><td className="whitespace-nowrap px-1.5 py-1.5 text-right text-red-500">{row.nominal}</td></tr>)}</tbody></table></div>
      <div className="flex flex-col items-start justify-between gap-4 pt-5 text-[13px] text-slate-800 md:flex-row md:items-center"><span>Menampilkan {transactions.length ? 1 : 0} sampai {Math.min(transactions.length, Number(pageSize))} dari {transactions.length} entri</span><div className="inline-flex overflow-hidden rounded-sm bg-slate-100"><button disabled className="h-8 px-3 text-slate-400">Sebelumnya</button><span className="grid h-8 w-8 place-items-center bg-violet-600 font-semibold text-white">1</span><button disabled className="h-8 px-3 text-slate-400">Selanjutnya</button></div></div>
    </Card></div>;
}
