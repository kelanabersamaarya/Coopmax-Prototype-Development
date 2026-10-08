import * as React from "react";
import { ChevronUp, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Row = { account: string; id: string; name: string; transaction: string; oldDue: string; newDue: string; oldBalance: string; newBalance: string };
const rows: Row[] = [
  { account: "09230004", id: "A2400002", name: "Zulfa Yunita Nasyidah S.Ked", transaction: "14-01-2024", oldDue: "06-09-2024", newDue: "06-09-2025", oldBalance: "100.000,00", newBalance: "100.000,00" },
  { account: "09230002", id: "A2300020", name: "Mala Unjani Yolanda S.IP", transaction: "31-08-2023", oldDue: "16-06-2024", newDue: "16-06-2025", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
];
const fields = ["NO REKENING", "ID NASABAH", "NAMA NASABAH", "TGL TRANSAKSI", "JT LAMA", "JT BARU", "SISA PINJAMAN LAMA", "SISA PINJAMAN BARU"];

function Filter({ value, onChange, clear = false }: { value: string; onChange: (v: string) => void; clear?: boolean }) {
  return <div className="relative"><Input value={value} onChange={(e) => onChange(e.target.value)} className={`h-8 rounded-md border-slate-300 text-[12px] shadow-none ${clear ? "pr-8" : ""}`} />{clear && <button type="button" onClick={() => onChange("")} className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-r-md bg-[#7b8ca9] text-white"><X className="h-4 w-4" /></button>}</div>;
}
function SortIcon() { return <span className="inline-flex flex-col leading-[8px]"><ChevronUp className="h-3 w-3" /><ChevronDown className="h-3 w-3" /></span>; }

export default function PerpanjanganSimpanan() {
  const [size, setSize] = React.useState("20");
  const [filters, setFilters] = React.useState(["", "", "", "", "", "", "0,00", "0,00"]);
  const update = (index: number) => (value: string) => setFilters((current) => current.map((item, i) => (i === index ? value : item)));
  const filtered = rows.filter((row) => [row.account, row.id, row.name, row.transaction, row.oldDue, row.newDue, row.oldBalance, row.newBalance].every((value, i) => !filters[i] || filters[i] === "0,00" || value.toLowerCase().includes(filters[i].toLowerCase())));
  const visible = filtered.slice(0, Number(size));
  const values = (row: Row) => [row.account, row.id, row.name, row.transaction, row.oldDue, row.newDue, row.oldBalance, row.newBalance];

  return <div className="min-h-screen bg-[#f5f7fc] px-4 pb-8 pt-6 text-[#08285f] md:px-10 md:pt-8">
    <div className="flex items-baseline gap-2"><h1 className="text-xl font-semibold tracking-tight md:text-2xl">Perpanjangan Tabungan</h1><span className="text-sm font-semibold text-slate-700">Daftar</span></div>
    <Card className="mt-10 min-h-[515px] rounded-[22px] border-0 bg-white p-5 shadow-[0_10px_30px_rgba(40,70,120,0.04)]">
      <div className="flex items-center gap-1 text-[13px] text-[#17315d]">Tampilkan <Select value={size} onValueChange={setSize}><SelectTrigger className="h-7 w-[44px] rounded-none border-slate-400 px-1 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select> entri</div>
      <div className="mt-3 overflow-hidden"><table className="w-full table-fixed border-collapse text-[12px] text-[#173b70]"><colgroup><col className="w-[5%]" /><col className="w-[12%]" /><col className="w-[11%]" /><col className="w-[16%]" /><col className="w-[11%]" /><col className="w-[11%]" /><col className="w-[11%]" /><col className="w-[13%]" /><col className="w-[10%]" /></colgroup><thead><tr className="border-b border-slate-300"><th className="px-2 py-2 text-left text-[12px] font-bold uppercase text-[#123664]">NO.</th>{fields.map((field, index) => <th key={field} className={`px-1.5 py-2 text-left text-[12px] font-bold uppercase tracking-wide text-[#123664] ${index === 0 ? "bg-[#e9edf3]" : ""}`}><span className="flex items-center justify-between gap-1 leading-[1.05]">{field}<SortIcon /></span></th>)}</tr><tr className="border-b border-slate-300"><th />{fields.map((field, index) => <th key={field} className="px-1.5 py-2"><Filter value={filters[index]} onChange={update(index)} clear={index >= 3 && index <= 5} /></th>)}</tr></thead><tbody>{visible.map((row, index) => <tr key={row.account} className="border-b border-[#cbd5e1] hover:bg-violet-50/50">{[String(index + 1), ...values(row)].map((value, cellIndex) => <td key={cellIndex} className={`break-words px-1.5 py-1.5 ${cellIndex === 1 ? "font-medium text-blue-600" : ""} ${cellIndex >= 7 ? "text-right" : ""}`}>{value}</td>)}</tr>)}</tbody></table></div>
      <div className="flex flex-col items-start justify-between gap-4 pt-5 text-[13px] text-slate-800 md:flex-row md:items-center"><span>Menampilkan {visible.length ? 1 : 0} sampai {visible.length} dari {filtered.length} entri (disaring dari 24 entri keseluruhan)</span><div className="inline-flex overflow-hidden rounded-sm bg-slate-100"><button disabled className="h-8 px-3 text-slate-400">Sebelumnya</button><span className="grid h-8 w-8 place-items-center bg-violet-600 font-semibold text-white">1</span><button disabled className="h-8 px-3 text-slate-400">Selanjutnya</button></div></div>
    </Card>
  </div>;
}
