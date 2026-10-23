import { X } from "lucide-react";
import type { MonitoringRow } from "@/pages/MonitoringBungaSimpanan";
import "./MonitoringTables.css";

type MonitoringDetailModalProps = {
  row: MonitoringRow;
  onClose: () => void;
};

export function MonitoringDetailModal({ row, onClose }: MonitoringDetailModalProps) {
  return (
    <div className="monitoring-table fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#101828]/75 p-2 pt-5 md:p-5" role="dialog" aria-modal="true" aria-labelledby="monitoring-detail-title">
      <div className="w-full max-w-[1176px] overflow-hidden rounded-[18px] bg-white text-[#26334a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#d7deea] px-6 py-5">
          <h2 id="monitoring-detail-title" className="text-[19px] font-bold">Detail Monitoring Bunga Simpanan</h2>
          <button type="button" onClick={onClose} aria-label="Tutup modal" className="text-[#7b7b7b] transition-colors hover:text-[#26334a]"><X className="h-6 w-6 stroke-[3]" /></button>
        </div>
        <div className="overflow-x-auto px-6 py-6">
          <div className="mb-7 flex items-center gap-1 text-[13px]">Tampilkan <select className="h-7 rounded border border-[#68778f] px-1" defaultValue="10"><option>10</option><option>20</option></select> entri</div>
          <table className="w-full min-w-[1140px] table-fixed border-collapse text-left text-[12px] text-[#263b61] [&_thead_th]:!text-left">
            <colgroup><col className="w-[5%]" /><col className="w-[12%]" /><col className="w-[13%]" /><col className="w-[12%]" /><col className="w-[14%]" /><col className="w-[14%]" /><col className="w-[14%]" /><col className="w-[8%]" /><col className="w-[8%]" /></colgroup>
            <thead className="[&>tr:first-child>th]:!text-left">
              <tr className="h-12 border-b border-[#c7d1e2] text-left text-[12px] font-semibold uppercase leading-[1.05] tracking-[0.03em] text-[#24324a]">
                <th className="px-1"><div className="line-clamp-4 text-left">No.</div></th><th className="px-1"><div className="line-clamp-4 text-left">Tanggal<br />Transaksi</div></th><th className="px-1"><div className="line-clamp-4 text-left">Nama Produk</div></th><th className="px-1"><div className="line-clamp-4 text-left">Periode Bunga</div></th><th className="px-1"><div className="line-clamp-4 text-left">Persentase<br />Proses Bunga</div></th><th className="px-1"><div className="line-clamp-4 text-left">Jumlah Rekening<br />Diproses</div></th><th className="px-1"><div className="line-clamp-4 text-left">Jumlah Rekening<br />Harus Diproses</div></th><th className="px-1"><div className="line-clamp-4 text-left">Total Nominal<br />Diproses</div></th><th className="px-1"><div className="line-clamp-4 text-left">Total Nominal<br />Harus Diproses</div></th>
              </tr>
              <tr className="h-12 border-b border-[#c7d1e2]"><th className="bg-[#edf0f5] px-3 text-center">⌃</th><th className="px-2"><div className="flex overflow-hidden rounded-[5px] border border-[#c5d0e1]"><input className="h-8 w-full min-w-0 border-0 px-2 outline-none" /><button type="button" className="h-8 w-7 shrink-0 bg-[#8192b0] text-white"><X className="mx-auto h-4 w-4" /></button></div></th><th className="px-2"><input className="h-8 w-full rounded-[5px] border border-[#c5d0e1] px-2" defaultValue={row.product} /></th><th className="px-2"><input className="h-8 w-full rounded-[5px] border border-[#c5d0e1] px-2" defaultValue={row.period} /></th><th /><th className="px-2"><input className="h-8 w-full rounded-[5px] border border-[#c5d0e1] px-2" /></th><th className="px-2"><input className="h-8 w-full rounded-[5px] border border-[#c5d0e1] px-2" /></th><th className="px-2"><input placeholder="0,00" className="h-8 w-full rounded-[5px] border border-[#c5d0e1] px-2" /></th><th className="px-2"><input placeholder="0,00" className="h-8 w-full rounded-[5px] border border-[#c5d0e1] px-2" /></th></tr>
            </thead>
            <tbody><tr className="border-b border-[#d6deea]"><td className="px-1 py-2">1</td><td className="px-1 py-2">{row.date}</td><td className="px-1 py-2">{row.product}</td><td className="px-1 py-2">{row.period}</td><td className="px-1 py-2"><div className="flex h-4 max-w-[124px] items-center justify-center rounded-[3px] bg-[#19ad00] text-[8px] font-bold text-white">{row.percentage.toFixed(0)} %</div></td><td className="px-1 py-2 text-right">{row.processed}</td><td className="px-1 py-2 text-right">{row.shouldProcess}</td><td className="px-1 py-2 text-right">{row.processedNominal}</td><td className="px-1 py-2 text-right">{row.shouldNominal}</td></tr></tbody>
          </table>
          <div className="mt-5 flex items-center justify-between text-[13px]"><span>Menampilkan 1 sampai 1 dari 1 entri</span><div className="flex gap-1"><button type="button" className="h-8 bg-[#c9c5c5] px-3 text-xs text-[#514b4b]">Sebelumnya</button><button type="button" className="h-8 bg-[#c9c5c5] px-3 text-xs text-[#514b4b]">Selanjutnya</button></div></div>
        </div>
        <div className="flex justify-end border-t border-[#d7deea] px-4 py-4"><button type="button" onClick={onClose} className="flex h-8 items-center gap-1 rounded-[5px] bg-[#8192b0] px-4 text-xs font-semibold text-white hover:bg-[#6f809e]"><X className="h-4 w-4" />Tutup</button></div>
      </div>
    </div>
  );
}
