import * as React from "react";
import { formatOperationalHistoryDateTime } from "@/lib/operational-date-time";

export type OperationalHistoryEntry = {
  user: string;
  changedAt: string;
  before: string;
  after: string;
  reason: string;
};

type Props = { entries: OperationalHistoryEntry[] };
const rowsPerPage = 20;
const cellClass = "border-r border-[#D7DEE9] px-3 py-3 align-top break-words last:border-r-0";
const headerClass = "border-r border-[#D7DEE9] px-3 py-3 align-top font-bold uppercase leading-5 last:border-r-0";

export function OperationalHistoryTable({ entries }: Props) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalEntries = entries.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const firstEntry = totalEntries === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const lastEntry = Math.min(currentPage * rowsPerPage, totalEntries);
  const visibleEntries = entries.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return <div className="border-b border-[#D7DEE9] p-2.5">
    <div className="overflow-x-auto rounded-[5px] border border-[#D7DEE9]">
      <table className="w-full min-w-[960px] table-fixed border-collapse text-left text-[12px] text-[#334155]">
        <colgroup><col className="w-[6%]" /><col className="w-[12%]" /><col className="w-[17%]" /><col className="w-[22%]" /><col className="w-[22%]" /><col className="w-[21%]" /></colgroup>
        <thead className="text-[#17345f]"><tr><th className={headerClass}>No.</th><th className={headerClass}>User</th><th className={headerClass}>Tanggal dan Waktu Perubahan</th><th className={headerClass}>Jam Operasional Sebelum Perubahan Per Hari</th><th className={headerClass}>Jam Operasional Sesudah Perubahan Per Hari</th><th className={headerClass}>Alasan Perubahan</th></tr></thead>
        <tbody>{visibleEntries.length === 0 ? <tr className="border-t border-[#D7DEE9]"><td colSpan={6} className="px-3 py-8 text-center text-[#64748b]">Belum ada riwayat perubahan</td></tr> : visibleEntries.map((entry, index) => <tr key={`${entry.changedAt}-${index}`} className="border-t border-[#D7DEE9]"><td className={cellClass}>{(currentPage - 1) * rowsPerPage + index + 1}</td><td className={cellClass}>{entry.user}</td><td className={cellClass}>{formatOperationalHistoryDateTime(entry.changedAt)}</td><td className={cellClass}>{entry.before}</td><td className={cellClass}>{entry.after}</td><td className={cellClass}>{entry.reason || "-"}</td></tr>)}</tbody>
      </table>
    </div>
    <div className="flex flex-col gap-3 px-1 pt-3 text-[12px] text-[#17233d] sm:flex-row sm:items-center sm:justify-between">
      <span>Menampilkan {firstEntry} sampai {lastEntry} dari {totalEntries} entri</span>
      <nav aria-label="Pagination riwayat perubahan" className="flex items-center justify-end gap-1">
        <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="h-8 rounded-[2px] bg-[#e9edf3] px-3 text-[#9eabc0] transition-colors hover:bg-[#dfe5ee] disabled:cursor-not-allowed disabled:opacity-80">Sebelumnya</button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} type="button" aria-current={currentPage === page ? "page" : undefined} onClick={() => setCurrentPage(page)} className={currentPage === page ? "h-8 min-w-8 rounded-[2px] bg-[#5543f5] px-2.5 font-semibold text-white" : "h-8 min-w-8 rounded-[2px] bg-[#e9edf3] px-2.5 text-[#17233d] transition-colors hover:bg-[#dfe5ee]"}>{page}</button>)}
        <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} className="h-8 rounded-[2px] bg-[#e9edf3] px-3 text-[#17233d] transition-colors hover:bg-[#dfe5ee] disabled:cursor-not-allowed disabled:text-[#9eabc0]">Selanjutnya</button>
      </nav>
    </div>
  </div>;
}
