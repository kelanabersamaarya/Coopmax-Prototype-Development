import * as React from "react";
import { Plus, ChevronsUpDown, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AstitiRekeningTabunganDetail from "@/pages/AstitiRekeningTabunganDetail";

type AccountRow = {
  accountNo: string;
  registeredAt: string;
  product: string;
  customerId: string;
  customerName: string;
  balance: string;
};

const rows: AccountRow[] = [
  { accountNo: "P001260014", registeredAt: "11-09-2026", product: "Simpanan Pokok", customerId: "A2600014", customerName: "Djoko Manggolo", balance: "200.000,00" },
  { accountNo: "P002260014", registeredAt: "11-09-2026", product: "Simpanan Wajib", customerId: "A2600014", customerName: "Djoko Manggolo", balance: "50.000,00" },
  { accountNo: "P001260013", registeredAt: "10-09-2026", product: "Simpanan Pokok", customerId: "A2600013", customerName: "Neri Susilawati", balance: "250.000,00" },
  { accountNo: "P002260013", registeredAt: "10-09-2026", product: "Simpanan Wajib", customerId: "A2600013", customerName: "Neri Susilawati", balance: "50.000,00" },
  { accountNo: "11111260006", registeredAt: "10-09-2026", product: "tabungan", customerId: "A2600013", customerName: "Neri Susilawati", balance: "500.000,00" },
  { accountNo: "P002260012", registeredAt: "08-09-2026", product: "Simpanan Wajib", customerId: "A2600012", customerName: "M.JOHAN PAKPAHAN, SIPMA", balance: "50.000,00" },
  { accountNo: "P001260012", registeredAt: "08-09-2026", product: "Simpanan Pokok", customerId: "A2600012", customerName: "M.JOHAN PAKPAHAN, SIPMA", balance: "100.000,00" },
  { accountNo: "P001260011", registeredAt: "07-09-2026", product: "Simpanan Pokok", customerId: "A2600011", customerName: "Neri Susilawati", balance: "150.000,00" },
  { accountNo: "P002260011", registeredAt: "07-09-2026", product: "Simpanan Wajib", customerId: "A2600011", customerName: "Neri Susilawati", balance: "50.000,00" },
  { accountNo: "SK01260009", registeredAt: "07-09-2026", product: "Simpanan Sukarela", customerId: "A2600010", customerName: "Sinergi Sukses Sentosa", balance: "110.000,00" },
  { accountNo: "P001260010", registeredAt: "07-09-2026", product: "Simpanan Pokok", customerId: "A2600010", customerName: "Sinergi Sukses Sentosa", balance: "200.000,00" },
  { accountNo: "P002260010", registeredAt: "07-09-2026", product: "Simpanan Wajib", customerId: "A2600010", customerName: "Sinergi Sukses Sentosa", balance: "50.000,00" },
  { accountNo: "SK01260008", registeredAt: "03-09-2026", product: "Simpanan Sukarela", customerId: "A2600009", customerName: "Sumber Rejeki", balance: "10.000,00" },
  { accountNo: "P001260009", registeredAt: "03-09-2026", product: "Simpanan Pokok", customerId: "A2600009", customerName: "Sumber Rejeki", balance: "200.000,00" },
  { accountNo: "P002260009", registeredAt: "03-09-2026", product: "Simpanan Wajib", customerId: "A2600009", customerName: "Sumber Rejeki", balance: "50.000,00" },
  { accountNo: "P001260008", registeredAt: "28-08-2026", product: "Simpanan Pokok", customerId: "A2600008", customerName: "ardina yanti", balance: "200.000,00" },
  { accountNo: "P002260008", registeredAt: "28-08-2026", product: "Simpanan Wajib", customerId: "A2600008", customerName: "ardina yanti", balance: "50.000,00" },
  { accountNo: "11111260005", registeredAt: "28-08-2026", product: "tabungan", customerId: "A2600008", customerName: "ardina yanti", balance: "1.000.000,00" },
  { accountNo: "SK01260007", registeredAt: "14-08-2026", product: "Simpanan Sukarela", customerId: "A2600007", customerName: "bmt al fath ikmi", balance: "160.000,00" },
  { accountNo: "P001260007", registeredAt: "14-08-2026", product: "Simpanan Pokok", customerId: "A2600007", customerName: "bmt al fath ikmi", balance: "200.000,00" },
];

const headers = ["NO. REKENING", "TANGGAL DAFTAR", "PRODUK TABUNGAN", "ID NASABAH", "NASABAH", "SALDO", "STATUS"];

export default function AstitiRekeningTabungan() {
  const [selectedAccount, setSelectedAccount] = React.useState<AccountRow | null>(null);
  const [search, setSearch] = React.useState("");
  const [registeredAt, setRegisteredAt] = React.useState("");
  const [product, setProduct] = React.useState("Semua");
  const [status, setStatus] = React.useState("Semua");

  if (selectedAccount) {
    return (
      <AstitiRekeningTabunganDetail
        account={selectedAccount}
        onBack={() => setSelectedAccount(null)}
      />
    );
  }

  const filtered = rows.filter((row) => {
    const query = search.toLowerCase();
    const dateQuery = registeredAt.toLowerCase();
    return (!query || Object.values(row).some((value) => value.toLowerCase().includes(query))) &&
      (!dateQuery || row.registeredAt.toLowerCase().includes(dateQuery)) &&
      (product === "Semua" || row.product === product);
  });

  return (
    <div className="min-h-screen bg-[#f5f7fc] px-4 py-5 text-[#08285f] md:px-8 lg:px-10">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[21px] font-semibold">Rekening Tabungan <span className="font-normal">Daftar</span></h1>
        <Button type="button" onClick={() => toast("Tambah Rekening Tabungan", { description: "Form tambah rekening tabungan belum tersedia." })} className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm hover:bg-slate-50"><Plus className="mr-2 h-4 w-4" />Tambah</Button>
      </div>

      <Card className="mt-6 overflow-hidden rounded-[20px] border-0 bg-white px-5 py-5 shadow-[0_4px_16px_rgba(53,75,120,0.03)] md:px-5">
        <div className="flex items-center gap-2 text-[13px] text-slate-800"><span>Tampilkan</span><select className="h-7 rounded border border-slate-300 bg-white px-1" defaultValue="20"><option>20</option><option>50</option><option>100</option></select><span>entri</span></div>
        <div className="mt-4 w-full overflow-hidden"><table className="w-full table-fixed border-collapse text-left text-[11px] text-[#0d2b60]">
          <colgroup><col className="w-[4%]" /><col className="w-[14%]" /><col className="w-[14%]" /><col className="w-[13%]" /><col className="w-[12%]" /><col className="w-[20%]" /><col className="w-[14%]" /><col className="w-[9%]" /></colgroup>
          <thead><tr className="border-b border-slate-300 text-[11px] font-bold uppercase"><th className="px-1.5 py-3">No.</th>{headers.map((header) => <th key={header} className="px-1.5 py-3"><span className="flex items-center justify-between gap-1">{header}<ChevronsUpDown className="h-3 w-3 shrink-0" /></span></th>)}</tr>
            <tr className="border-b border-slate-200"><th /><th className="px-1.5 py-2"><Input value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 px-2 text-[11px]" /></th><th className="px-1.5 py-2"><div className="flex h-8 w-full overflow-hidden rounded border border-slate-300 bg-white"><Input value={registeredAt} onChange={(e) => setRegisteredAt(e.target.value)} className="h-full min-w-0 flex-1 rounded-none border-0 px-2 text-[11px] shadow-none focus-visible:ring-0" /><button type="button" onClick={() => setRegisteredAt("")} aria-label="Hapus filter tanggal daftar" className="flex w-9 shrink-0 items-center justify-center bg-[#7c8ca9] text-white transition hover:bg-[#697b9b]"><X className="h-5 w-5 stroke-[3]" /></button></div></th><th className="px-1.5 py-2"><select value={product} onChange={(e) => setProduct(e.target.value)} className="h-8 w-full rounded border border-slate-300 bg-white px-1 text-[11px]"><option>Semua</option>{[...new Set(rows.map((row) => row.product))].map((item) => <option key={item}>{item}</option>)}</select></th><th className="px-1.5 py-2"><Input className="h-8 px-2 text-[11px]" /></th><th className="px-1.5 py-2"><Input className="h-8 px-2 text-[11px]" /></th><th className="px-1.5 py-2"><Input placeholder="0,00" className="h-8 px-2 text-[11px]" /></th><th className="px-1.5 py-2"><select value={status} onChange={(e) => setStatus(e.target.value)} className="h-8 w-full rounded border border-slate-300 bg-white px-1 text-[11px]"><option>Semua</option><option>Aktif</option></select></th></tr>
          </thead>
          <tbody>{filtered.map((row, index) => <tr key={row.accountNo} onClick={() => setSelectedAccount(row)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedAccount(row); } }} role="link" tabIndex={0} className="cursor-pointer border-b border-slate-200 hover:bg-violet-50"><td className="px-1.5 py-1.5">{index + 1}</td><td className="truncate px-1.5 py-1.5 font-medium text-blue-600">{row.accountNo}</td><td className="bg-[#f1f3f7] px-1.5 py-1.5">{row.registeredAt}</td><td className="truncate px-1.5 py-1.5">{row.product}</td><td className="truncate px-1.5 py-1.5">{row.customerId}</td><td className="truncate px-1.5 py-1.5">{row.customerName}</td><td className="truncate px-1.5 py-1.5 text-right">{row.balance}</td><td className="px-1.5 py-1.5"><span className="rounded-[3px] bg-[#42bd00] px-1.5 py-0.5 text-[10px] font-bold text-white">Aktif</span></td></tr>)}</tbody>
        </table></div>
        <div className="mt-4 flex items-center justify-between text-[13px]"><span>Menampilkan 1 sampai {filtered.length} dari 199 entri (disaring dari 201 entri keseluruhan)</span><div className="flex gap-1"><Button variant="ghost" disabled className="h-8 rounded-none bg-slate-100 text-slate-300">Sebelumnya</Button>{[1, 2, 3, 4, 5].map((page) => <Button key={page} variant="ghost" className={cn("h-8 w-8 rounded-none bg-slate-200 p-0", page === 1 && "bg-violet-600 text-white")}>{page}</Button>)}<span className="px-2 py-1">...</span><Button variant="ghost" className="h-8 rounded-none bg-slate-200">10</Button><Button variant="ghost" className="h-8 rounded-none bg-slate-200">Selanjutnya</Button></div></div>
      </Card>
    </div>
  );
}
