import * as React from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DepositRow = { account: string; id: string; name: string; transaction: string; oldDue: string; newDue: string; oldBalance: string; newBalance: string };

const rows: DepositRow[] = [
  { account: "55250001", id: "A2300013", name: "Yulia Farida", transaction: "08-05-2026", oldDue: "08-05-2026", newDue: "08-05-2027", oldBalance: "100.000.000,00", newBalance: "100.000.000,00" },
  { account: "55230011", id: "A2300001", name: "Balijan Uwais", transaction: "24-07-2026", oldDue: "24-07-2026", newDue: "24-07-2027", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  { account: "55230011", id: "A2300001", name: "Balijan Uwais", transaction: "23-07-2024", oldDue: "24-07-2024", newDue: "24-07-2025", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  { account: "55230011", id: "A2300001", name: "Balijan Uwais", transaction: "23-07-2025", oldDue: "24-07-2025", newDue: "24-07-2026", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  { account: "55230010", id: "A2300024", name: "Jessica Uyainah S.Gz", transaction: "31-08-2026", oldDue: "31-08-2026", newDue: "31-08-2027", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  { account: "55230010", id: "A2300024", name: "Jessica Uyainah S.Gz", transaction: "30-08-2024", oldDue: "31-08-2024", newDue: "31-08-2025", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  { account: "55230010", id: "A2300024", name: "Jessica Uyainah S.Gz", transaction: "30-08-2025", oldDue: "31-08-2025", newDue: "31-08-2026", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  { account: "55230008", id: "A2300023", name: "Jamil Thamrin", transaction: "17-07-2025", oldDue: "18-07-2025", newDue: "18-07-2027", oldBalance: "50.000.000,00", newBalance: "50.000.000,00" },
  { account: "55230007", id: "A2300013", name: "Yulia Farida", transaction: "15-06-2026", oldDue: "16-06-2026", newDue: "16-06-2027", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  { account: "55230007", id: "A2300013", name: "Yulia Farida", transaction: "15-06-2024", oldDue: "16-06-2024", newDue: "16-06-2025", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  { account: "55230007", id: "A2300013", name: "Yulia Farida", transaction: "16-06-2026", oldDue: "16-06-2026", newDue: "16-06-2027", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  { account: "55230006", id: "A2300024", name: "Jessica Uyainah S.Gz", transaction: "15-06-2025", oldDue: "16-06-2025", newDue: "16-06-2026", oldBalance: "1.000.000,00", newBalance: "1.000.000,00" },
  { account: "55230006", id: "A2300024", name: "Jessica Uyainah S.Gz", transaction: "15-06-2024", oldDue: "16-06-2024", newDue: "16-06-2025", oldBalance: "1.000.000,00", newBalance: "1.000.000,00" },
  { account: "55230006", id: "A2300024", name: "Jessica Uyainah S.Gz", transaction: "16-06-2026", oldDue: "16-06-2026", newDue: "16-06-2027", oldBalance: "1.000.000,00", newBalance: "1.000.000,00" },
  { account: "55230001", id: "A2300008", name: "Jelita Padmasari", transaction: "06-06-2024", oldDue: "07-06-2024", newDue: "07-06-2025", oldBalance: "20.000.000,00", newBalance: "20.000.000,00" },
  { account: "55230001", id: "A2300008", name: "Jelita Padmasari", transaction: "07-06-2026", oldDue: "07-06-2026", newDue: "07-06-2027", oldBalance: "20.000.000,00", newBalance: "20.000.000,00" },
  { account: "55230001", id: "A2300008", name: "Jelita Padmasari", transaction: "06-06-2025", oldDue: "07-06-2025", newDue: "07-06-2026", oldBalance: "20.000.000,00", newBalance: "20.000.000,00" },
];

const columns = ["NO REKENING", "ID NASABAH", "NAMA NASABAH", "TGL TRANSAKSI", "JT LAMA", "JT BARU", "SALDO LAMA", "SALDO BARU"];
function SortIcon() { return <span className="inline-flex flex-col leading-[8px]"><ChevronUp className="h-3 w-3" /><ChevronDown className="h-3 w-3" /></span>; }
function Filter({ value, onChange, clear = false, placeholder = "" }: { value: string; onChange: (value: string) => void; clear?: boolean; placeholder?: string }) { return <div className="relative"><Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={`h-8 rounded-md border-slate-300 text-[12px] shadow-none ${clear ? "pr-8" : ""}`} />{clear && <button type="button" onClick={() => onChange("")} className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-r-md bg-[#7b8ca9] text-white"><X className="h-4 w-4" /></button>}</div>; }

export default function PerpanjanganDeposito() {
  const [size, setSize] = React.useState("20");
  const [filters, setFilters] = React.useState(["", "", "", "", "", "", "0,00", "0,00"]);
  const update = (index: number) => (value: string) => setFilters((current) => current.map((item, i) => i === index ? value : item));
  const values = (row: DepositRow) => [row.account, row.id, row.name, row.transaction, row.oldDue, row.newDue, row.oldBalance, row.newBalance];
  const filtered = rows.filter((row) => values(row).every((value, index) => !filters[index] || filters[index] === "0,00" || value.toLowerCase().includes(filters[index].toLowerCase())));
  const visible = filtered.slice(0, Number(size));

  return <div className="min-h-screen bg-[#f5f7fc] px-4 pb-8 pt-6 text-[#08285f] md:px-10 md:pt-8"><div className="flex items-baseline gap-2"><h1 className="text-xl font-semibold tracking-tight md:text-2xl">Perpanjangan Deposit</h1><span className="text-sm font-semibold text-slate-700">Daftar</span></div><Card className="mt-10 rounded-[22px] border-0 bg-white p-5 shadow-[0_10px_30px_rgba(40,70,120,0.04)]"><div className="flex items-center gap-1 text-[13px] text-[#17315d]">Tampilkan <Select value={size} onValueChange={setSize}><SelectTrigger className="h-7 w-[44px] rounded-none border-slate-400 px-1 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select> entri</div><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[980px] table-fixed border-collapse text-[12px] text-[#173b70]"><colgroup><col className="w-[5%]" /><col className="w-[14%]" /><col className="w-[10%]" /><col className="w-[14%]" /><col className="w-[12%]" /><col className="w-[11%]" /><col className="w-[11%]" /><col className="w-[13%]" /><col className="w-[13%]" /></colgroup><thead><tr className="border-b border-slate-300 text-left text-[12px] font-bold uppercase tracking-wide text-[#123664]"><th className="px-2 py-2">NO.</th>{columns.map((column, index) => <th key={column} className={`px-2 py-2 ${index === 0 ? "bg-[#e9edf3]" : ""}`}><span className="flex items-center justify-between gap-1">{column}<SortIcon /></span></th>)}</tr><tr className="border-b border-slate-300"><th />{columns.map((column, index) => <th key={column} className="px-1.5 py-2"><Filter value={filters[index]} onChange={update(index)} clear={index >= 3 && index <= 5} placeholder={index === 6 || index === 7 ? "0,00" : ""} /></th>)}</tr></thead><tbody>{visible.map((row, index) => <tr key={`${row.account}-${row.transaction}-${index}`} className="border-b border-[#cbd5e1] hover:bg-violet-50/50">{[String(index + 1), ...values(row)].map((value, cellIndex) => <td key={cellIndex} className={`px-2 py-1.5 ${cellIndex === 1 ? "font-medium text-blue-600" : ""} ${cellIndex >= 7 ? "text-right" : ""}`}>{value}</td>)}</tr>)}</tbody></table></div><div className="flex flex-col items-start justify-between gap-4 pt-5 text-[13px] text-slate-800 md:flex-row md:items-center"><span>Menampilkan {visible.length ? 1 : 0} sampai {visible.length} dari {filtered.length} entri (disaring dari 24 entri keseluruhan)</span><div className="inline-flex overflow-hidden rounded-sm bg-slate-100"><button disabled className="h-8 px-3 text-slate-400">Sebelumnya</button><span className="grid h-8 w-8 place-items-center bg-violet-600 font-semibold text-white">1</span><button disabled className="h-8 px-3 text-slate-400">Selanjutnya</button></div></div></Card></div>;
}
