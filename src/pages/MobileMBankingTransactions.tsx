import * as React from "react";
import { RefreshCw, X } from "lucide-react";
import { toast } from "sonner";

const transactions = [
  { no: 1, transactionNo: "PRT/030926/0003", type: "Transaksi Setoran Simpanan", date: "14-08-2025" },
  { no: 2, transactionNo: "PRT/030926/0003", type: "Bayar Angsuran", date: "14-08-2025" },
  { no: 3, transactionNo: "PRT/030926/0003", type: "Pembukaan Rekening Simpanan", date: "14-08-2025" },
  { no: 4, transactionNo: "PRT/030926/0003", type: "Transaksi PPOB", date: "14-08-2025" },
  { no: 5, transactionNo: "PRT/030926/0003", type: "Transaksi PPOB", date: "14-08-2025" },
];

export default function MobileMBankingTransactions() {
  const [transactionFilter, setTransactionFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.transactionNo.toLowerCase().includes(transactionFilter.toLowerCase()) &&
    transaction.type.toLowerCase().includes(typeFilter.toLowerCase()) &&
    transaction.date.includes(dateFilter),
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Sinkronisasi Transaksi MBanking</h1>
          <div className="text-base font-semibold text-slate-600">Daftar</div>
        </div>
        <div className="mt-3 flex justify-end">
          <button type="button" onClick={() => toast("Sinkronisasi transaksi MBanking berhasil")} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50">
            <RefreshCw className="h-4 w-4" /> Sinkronisasi Transaksi
          </button>
        </div>
        <div className="mt-10 rounded-3xl bg-white p-4 shadow-sm md:p-5">
          <div className="mb-5 flex items-center gap-2 text-xs text-slate-800">
            <span>Tampilkan</span>
            <select className="h-8 rounded border border-slate-300 bg-white px-2 text-xs" defaultValue="20"><option value="20">20</option><option value="50">50</option><option value="100">100</option></select>
            <span>Entri</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-xs text-slate-900">
              <thead>
                <tr className="border-b border-slate-200 text-left font-extrabold uppercase"><th className="w-10 px-1 pb-2">No.</th><th className="w-[34%] px-2 pb-2">No. Transaksi</th><th className="w-[38%] px-2 pb-2">Jenis Transaksi</th><th className="px-2 pb-2">Tanggal Transaksi</th></tr>
                <tr className="border-b border-slate-200"><th className="px-1 pb-2" /><th className="px-2 pb-2"><input value={transactionFilter} onChange={(event) => setTransactionFilter(event.target.value)} className="h-8 w-full rounded border border-slate-300 px-2 text-xs font-normal outline-none focus:border-violet-500" /></th><th className="px-2 pb-2"><input value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="h-8 w-full rounded border border-slate-300 px-2 text-xs font-normal outline-none focus:border-violet-500" /></th><th className="px-2 pb-2"><div className="flex"><input value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="h-8 w-full rounded-l border border-slate-300 px-2 text-xs font-normal outline-none focus:border-violet-500" /><button type="button" onClick={() => setDateFilter("")} aria-label="Hapus filter tanggal" className="inline-flex h-8 w-8 items-center justify-center rounded-r bg-slate-500 text-white transition hover:bg-slate-600"><X className="h-4 w-4" /></button></div></th></tr>
              </thead>
              <tbody>{filteredTransactions.map((transaction) => <tr key={transaction.no} className="border-b border-slate-200"><td className="px-1 py-3">{transaction.no}</td><td className="bg-slate-50 px-2 py-3 font-medium text-blue-600">{transaction.transactionNo}</td><td className="px-2 py-3">{transaction.type}</td><td className="px-2 py-3">{transaction.date}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-5 flex flex-col gap-3 text-xs text-slate-900 sm:flex-row sm:items-center sm:justify-between"><span>Menampilkan 1 sampai {filteredTransactions.length} dari 12 entri</span><div className="flex items-center gap-1"><button type="button" disabled className="rounded bg-slate-100 px-3 py-2 text-slate-300">Sebelumnya</button><button type="button" className="rounded bg-violet-600 px-3 py-2 text-white">1</button><button type="button" disabled className="rounded bg-slate-100 px-3 py-2 text-slate-300">Selanjutnya</button></div></div>
        </div>
      </div>
    </div>
  );
}
