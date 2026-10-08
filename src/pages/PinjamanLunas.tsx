import * as React from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type LoanRow = { account: string; customer: string; product: string; date: string };
const rows: LoanRow[] = [
  { account: "09260012", customer: "Jaya Kumara", product: "Pinjaman bulanan", date: "02-10-2026" },
  { account: "09260009", customer: "Andika Wijaya", product: "Pinjaman bulanan", date: "02-10-2026" },
  { account: "09260011", customer: "M.JOHAN PAKPAHAN, SIPMA", product: "Pinjaman bulanan", date: "02-10-2026" },
  { account: "09260010", customer: "Surya Pratama", product: "Pinjaman bulanan", date: "02-10-2026" },
  { account: "pem250001", customer: "Rika Wastuti", product: "pinjaman emas", date: "23-07-2026" },
  { account: "SMG260001", customer: "ardina", product: "Simpanan Multiguna", date: "23-07-2026" },
  { account: "09250001", customer: "Pangeran Sirait", product: "Pinjaman bulanan", date: "18-06-2025" },
  { account: "pem240001", customer: "Yulia Farida", product: "pinjaman emas", date: "18-06-2025" },
  { account: "klp02.6250001", customer: "Pangeran Sirait", product: "Kredit Mikro BRI", date: "06-03-2025" },
  { account: "SMG240003", customer: "Pangeran Sirait", product: "Simpanan Multiguna", date: "26-02-2025" },
  { account: "09240009", customer: "Adika Situmorang", product: "Pinjaman bulanan", date: "29-05-2024" },
  { account: "09230006", customer: "Zulfa Yunita Nasyidah S.Ked", product: "Pinjaman bulanan", date: "28-05-2024" },
  { account: "09240012", customer: "Pangeran Sirait", product: "Pinjaman bulanan", date: "28-05-2024" },
  { account: "09240011", customer: "Fathonah Wastuti", product: "Pinjaman bulanan", date: "21-05-2024" },
  { account: "09230007", customer: "Jamil Thamrin", product: "Pinjaman bulanan", date: "03-04-2024" },
];
const products = ["-- Semua --", ...new Set(rows.map((row) => row.product))];
function SortIcon() { return <span className="inline-flex flex-col leading-[8px]"><ChevronUp className="h-3 w-3" /><ChevronDown className="h-3 w-3" /></span>; }

export default function PinjamanLunas() {
  const [size, setSize] = React.useState("20");
  const [account, setAccount] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [product, setProduct] = React.useState("-- Semua --");
  const [date, setDate] = React.useState("");
  const filtered = rows.filter((row) => row.account.toLowerCase().includes(account.toLowerCase()) && row.customer.toLowerCase().includes(customer.toLowerCase()) && (product === "-- Semua --" || row.product === product) && row.date.includes(date));
  const visible = filtered.slice(0, Number(size));
  const dateFilter = <div className="relative"><Input value={date} onChange={(event) => setDate(event.target.value)} className="h-8 rounded-md border-slate-300 pr-8 text-[12px] shadow-none" /><button type="button" onClick={() => setDate("")} className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-r-md bg-[#7b8ca9] text-white"><X className="h-4 w-4" /></button></div>;

  return <div className="min-h-screen bg-[#f5f7fc] px-4 pb-8 pt-6 text-[#08285f] md:px-10 md:pt-8"><div className="flex items-baseline gap-2"><h1 className="text-xl font-semibold tracking-tight md:text-2xl">Pinjaman Lunas</h1><span className="text-sm font-semibold text-slate-700">Daftar</span></div><Card className="mt-10 rounded-[22px] border-0 bg-white p-5 shadow-[0_10px_30px_rgba(40,70,120,0.04)]"><div className="flex items-center gap-1 text-[13px] text-[#17315d]">Tampilkan <Select value={size} onValueChange={setSize}><SelectTrigger className="h-7 w-[44px] rounded-none border-slate-400 px-1 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select> entri</div><div className="mt-3 overflow-hidden"><table className="w-full table-fixed border-collapse text-[12px] text-[#173b70]"><colgroup><col className="w-[6%]" /><col className="w-[24%]" /><col className="w-[24%]" /><col className="w-[24%]" /><col className="w-[22%]" /></colgroup><thead><tr className="border-b border-slate-300"><th className="px-2 py-2 text-left font-bold uppercase">NO.</th><th className="px-2 py-2 text-left font-bold uppercase"><span className="flex justify-between">NO. REKENING<SortIcon /></span></th><th className="px-2 py-2 text-left font-bold uppercase"><span className="flex justify-between">NASABAH<SortIcon /></span></th><th className="px-2 py-2 text-left font-bold uppercase"><span className="flex justify-between">PRODUK PINJAMAN<SortIcon /></span></th><th className="bg-[#e9edf3] px-2 py-2 text-left font-bold uppercase"><span className="flex justify-between">TANGGAL<SortIcon /></span></th></tr><tr className="border-b border-slate-300"><th /><th className="px-2 py-2"><Input value={account} onChange={(event) => setAccount(event.target.value)} className="h-8 rounded-md border-slate-300 text-[12px] shadow-none" /></th><th className="px-2 py-2"><Input value={customer} onChange={(event) => setCustomer(event.target.value)} className="h-8 rounded-md border-slate-300 text-[12px] shadow-none" /></th><th className="px-2 py-2"><Select value={product} onValueChange={setProduct}><SelectTrigger className="h-8 rounded-md border-slate-300 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent>{products.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></th><th className="px-2 py-2">{dateFilter}</th></tr></thead><tbody>{visible.map((row, index) => <tr key={row.account} className="border-b border-[#cbd5e1] hover:bg-violet-50/50"><td className="px-2 py-1">{index + 1}</td><td className="px-2 py-1 font-medium text-blue-600">{row.account}</td><td className="px-2 py-1">{row.customer}</td><td className="px-2 py-1">{row.product}</td><td className="bg-[#f0f2f6] px-2 py-1">{row.date}</td></tr>)}</tbody></table></div><div className="flex flex-col items-start justify-between gap-4 pt-5 text-[13px] text-slate-800 md:flex-row md:items-center"><span>Menampilkan 1 sampai {visible.length} dari {filtered.length} entri</span><div className="inline-flex overflow-hidden rounded-sm bg-slate-100"><button disabled className="h-8 px-3 text-slate-400">Sebelumnya</button><span className="grid h-8 w-8 place-items-center bg-violet-600 font-semibold text-white">1</span><button disabled className="h-8 px-3 text-slate-400">Selanjutnya</button></div></div></Card></div>;
}
