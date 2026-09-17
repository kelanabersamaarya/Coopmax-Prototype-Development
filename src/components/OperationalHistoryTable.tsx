import * as React from "react";

type OperationalDay = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";

const days: OperationalDay[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const rowsPerPage = 20;
const cellClass = "border-r border-[#D7DEE9] px-4 py-4 last:border-r-0";
const headerClass = "border-r border-[#D7DEE9] px-4 py-3 font-bold last:border-r-0";

export function OperationalHistoryTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalEntries = days.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const firstEntry = totalEntries === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const lastEntry = Math.min(currentPage * rowsPerPage, totalEntries);
  const visibleDays = days.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return <div className="border-b border-[#D7DEE9] p-2.5">
    <div className="overflow-x-auto rounded-[5px] border border-[#D7DEE9]">
      <table className="w-full min-w-[1000px] border-collapse text-left text-[12px] text-[#334155]">
        <thead className="text-[#17345f]"><tr><th className={headerClass}>No.</th><th className={headerClass}>User</th><th className={headerClass}>Tanggal dan Waktu Perubahan</th><th className={headerClass}>Jam Operasional Sebelum Perubahan Per Hari</th><th className={headerClass}>Jam Operasional Sesudah Perubahan Per Hari</th><th className={headerClass}>Alasan Perubahan</th></tr></thead>
        <tbody>{visibleDays.map((day, index) => <tr key={day} className="border-t border-[#D7DEE9]"><td className={cellClass}>{(currentPage - 1) * rowsPerPage + index + 1}</td><td className={cellClass}>Admin</td><td className={cellClass}>11-09-2026 09:47:00</td><td className={cellClass}>{day}: 08:00 - 16:00</td><td className={cellClass}>{day}: 08:00 - 17:00</td><td className={cellClass}>Penyesuaian jam layanan operasional</td></tr>)}</tbody>
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
