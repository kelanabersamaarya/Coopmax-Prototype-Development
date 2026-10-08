import * as React from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ClosedAccount = {
  accountNo: string;
  customer: string;
  product: string;
  closedAt: string;
};

const rows: ClosedAccount[] = [
  { accountNo: "P002260021", customer: "Jaya Kumara", product: "Simpanan Wajib", closedAt: "02-10-2026" },
  { accountNo: "P001260021", customer: "Jaya Kumara", product: "Simpanan Pokok", closedAt: "02-10-2026" },
  { accountNo: "SK01260015", customer: "Jaya Kumara", product: "Simpanan Sukarela", closedAt: "02-10-2026" },
  { accountNo: "SK01260014", customer: "M.JOHAN PAKPAHAN, SIPMA", product: "Simpanan Sukarela", closedAt: "02-10-2026" },
  { accountNo: "P002260012", customer: "M.JOHAN PAKPAHAN, SIPMA", product: "Simpanan Wajib", closedAt: "02-10-2026" },
  { accountNo: "P001260012", customer: "M.JOHAN PAKPAHAN, SIPMA", product: "Simpanan Pokok", closedAt: "02-10-2026" },
  { accountNo: "SK01260013", customer: "Surya Pratama", product: "Simpanan Sukarela", closedAt: "02-10-2026" },
  { accountNo: "P002260020", customer: "Surya Pratama", product: "Simpanan Wajib", closedAt: "02-10-2026" },
  { accountNo: "P001260020", customer: "Surya Pratama", product: "Simpanan Pokok", closedAt: "02-10-2026" },
  { accountNo: "P002260019", customer: "Andika Wijaya", product: "Simpanan Wajib", closedAt: "02-10-2026" },
  { accountNo: "1111260007", customer: "Andika Wijaya", product: "tabungan", closedAt: "02-10-2026" },
  { accountNo: "P001260019", customer: "Andika Wijaya", product: "Simpanan Pokok", closedAt: "02-10-2026" },
  { accountNo: "P001260005", customer: "arca", product: "Simpanan Pokok", closedAt: "02-10-2026" },
  { accountNo: "1111260003", customer: "arca", product: "tabungan", closedAt: "02-10-2026" },
  { accountNo: "P002260005", customer: "arca", product: "Simpanan Wajib", closedAt: "02-10-2026" },
  { accountNo: "P002260016", customer: "Demo M-Banking", product: "Simpanan Wajib", closedAt: "02-10-2026" },
  { accountNo: "P001260016", customer: "Demo M-Banking", product: "Simpanan Pokok", closedAt: "02-10-2026" },
  { accountNo: "SK01260011", customer: "Demo M-Banking", product: "Simpanan Sukarela", closedAt: "02-10-2026" },
  { accountNo: "P002260003", customer: "arya", product: "Simpanan Wajib", closedAt: "02-10-2026" },
  { accountNo: "P001260003", customer: "arya", product: "Simpanan Pokok", closedAt: "02-10-2026" },
];

function SortLabel({ children, plain = false }: { children: React.ReactNode; plain?: boolean }) {
  return <span className="flex items-center justify-between gap-2">{children}{!plain && <span className="inline-flex flex-col leading-none"><ChevronUp className="h-3 w-3" /><ChevronDown className="h-3 w-3" /></span>}</span>;
}

export default function TutupRekening() {
  const [pageSize, setPageSize] = React.useState("20");
  const [accountFilter, setAccountFilter] = React.useState("");
  const [customerFilter, setCustomerFilter] = React.useState("");
  const [productFilter, setProductFilter] = React.useState("Semua");
  const [dateFilter, setDateFilter] = React.useState("");
  const filtered = rows.filter((row) => row.accountNo.toLowerCase().includes(accountFilter.toLowerCase()) && row.customer.toLowerCase().includes(customerFilter.toLowerCase()) && (productFilter === "Semua" || row.product === productFilter) && row.closedAt.includes(dateFilter));
  const visible = filtered.slice(0, Number(pageSize));

  return <div className="min-h-screen bg-[#f5f7fc] px-4 pb-8 pt-6 text-[#08285f] md:px-10 md:pt-8">
    <div className="flex items-baseline gap-2"><h1 className="text-xl font-semibold tracking-tight md:text-2xl">Tutup Rekening</h1><span className="text-sm font-semibold text-slate-700">Daftar</span></div>
    <Card className="mt-10 rounded-[22px] border-0 bg-white p-5 shadow-[0_10px_30px_rgba(40,70,120,0.04)] md:p-5">
      <div className="flex items-center gap-1 text-[13px] text-[#17315d]">Tampilkan <Select value={pageSize} onValueChange={setPageSize}><SelectTrigger className="h-7 w-[68px] rounded-none border-slate-400 px-1 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select> entri</div>
      <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-[12px] text-[#173b70]"><thead><tr className="border-b border-slate-300 text-left text-[12px] font-bold uppercase tracking-wide text-[#123664]"><th className="w-[6%] px-2 py-2"><SortLabel plain>No.</SortLabel></th><th className="w-[23%] px-2 py-2"><SortLabel>No. Rekening</SortLabel></th><th className="w-[36%] px-2 py-2"><SortLabel>Nasabah</SortLabel></th><th className="w-[19%] px-2 py-2"><SortLabel>Produk Tabungan</SortLabel></th><th className="w-[16%] px-2 py-2"><SortLabel>Tanggal Tutup</SortLabel></th></tr><tr className="border-b border-slate-300"><th /><th className="px-2 py-2"><Input value={accountFilter} onChange={(event) => setAccountFilter(event.target.value)} className="h-8 rounded-md border-slate-300 text-[12px] shadow-none" /></th><th className="px-2 py-2"><Input value={customerFilter} onChange={(event) => setCustomerFilter(event.target.value)} className="h-8 rounded-md border-slate-300 text-[12px] shadow-none" /></th><th className="px-2 py-2"><Select value={productFilter} onValueChange={setProductFilter}><SelectTrigger className="h-8 rounded-md border-slate-300 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Semua">-- Semua --</SelectItem><SelectItem value="Simpanan Wajib">Simpanan Wajib</SelectItem><SelectItem value="Simpanan Pokok">Simpanan Pokok</SelectItem><SelectItem value="Simpanan Sukarela">Simpanan Sukarela</SelectItem><SelectItem value="tabungan">tabungan</SelectItem></SelectContent></Select></th><th className="px-2 py-2"><div className="relative"><Input value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="h-8 rounded-md border-slate-300 pr-8 text-[12px] shadow-none" /><button type="button" onClick={() => setDateFilter("")} className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-r-md bg-[#7b8ca9] text-white"><X className="h-4 w-4" /></button></div></th></tr></thead><tbody>{visible.map((row, index) => <tr key={`${row.accountNo}-${index}`} className="border-b border-[#cbd5e1]"><td className="px-2 py-1.5">{index + 1}</td><td className="px-2 py-1.5 font-medium text-blue-600">{row.accountNo}</td><td className="px-2 py-1.5">{row.customer}</td><td className="px-2 py-1.5">{row.product}</td><td className="px-2 py-1.5">{row.closedAt}</td></tr>)}</tbody></table></div>
      <div className="flex flex-col items-start justify-between gap-4 pt-5 text-[13px] text-slate-800 md:flex-row md:items-center"><span>Menampilkan {visible.length ? 1 : 0} sampai {visible.length} dari {filtered.length} entri</span><div className="inline-flex overflow-hidden rounded-sm bg-slate-100"><button disabled className="h-8 px-3 text-slate-400">Sebelumnya</button><span className="grid h-8 w-8 place-items-center bg-violet-600 font-semibold text-white">1</span><button disabled className="h-8 px-3 text-slate-400">Selanjutnya</button></div></div>
    </Card>
  </div>;
}
