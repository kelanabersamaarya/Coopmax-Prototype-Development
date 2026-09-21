import * as React from "react";
import { X } from "lucide-react";
import { formatOperationalDateTime } from "@/lib/operational-date-time";

type SpecialAccessUser = {
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  start: string;
  end: string;
  reason: string;
};

type Props = {
  users: SpecialAccessUser[];
  onDelete: (user: SpecialAccessUser) => void;
};

const rowsPerPage = 20;

export function OperationalSpecialAccessTable({ users, onDelete }: Props) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalUsers = users.length;
  const totalPages = Math.max(1, Math.ceil(totalUsers / rowsPerPage));
  const firstUser = totalUsers === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const lastUser = Math.min(currentPage * rowsPerPage, totalUsers);
  const visibleUsers = users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  React.useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  return (
    <div className="border-b border-[#D7DEE9] p-2.5">
      <div className="overflow-x-auto rounded-[5px] border border-[#D1DCEB]">
        <table className="w-full min-w-[1260px] table-fixed border-collapse text-left text-[12px] text-[#003477]">
          <colgroup><col className="w-[5%]" /><col className="w-[17%]" /><col className="w-[18%]" /><col className="w-[18%]" /><col className="w-[20%]" /><col className="w-[14%]" /><col className="w-[8%]" /></colgroup>
          <thead><tr className="h-[44px] border-b border-[#D1DCEB] bg-white">{["NO.", "USER DENGAN AKSES KHUSUS", "TANGGAL DAN WAKTU MULAI AKSES KHUSUS", "TANGGAL DAN WAKTU SELESAI AKSES KHUSUS", "ALASAN PEMBERIAN AKSES KHUSUS", "AKSI", "STATUS"].map((heading) => <th key={heading} className="border-r border-[#D1DCEB] px-3 py-3 font-bold last:border-r-0">{heading}</th>)}</tr></thead>
          <tbody>{visibleUsers.length === 0 ? <tr className="border-t border-[#D1DCEB]"><td colSpan={7} className="px-3 py-8 text-center text-[#64748b]">Belum ada akses khusus operasional</td></tr> : visibleUsers.map((user, index) => { const rowNumber = (currentPage - 1) * rowsPerPage + index + 1; const expired = rowNumber === 3; return <tr key={`${user.name}-${rowNumber}`} className="h-[58px] border-b border-[#D1DCEB] last:border-b-0"><td className="border-r border-[#D1DCEB] px-3 py-3">{rowNumber}</td><td className="border-r border-[#D1DCEB] px-3 py-3">{user.name}</td><td className="border-r border-[#D1DCEB] px-3 py-3">{formatOperationalDateTime(user.startDate, user.start)}</td><td className="border-r border-[#D1DCEB] px-3 py-3">{formatOperationalDateTime(user.endDate, user.end)}</td><td className="border-r border-[#D1DCEB] px-3 py-3">{user.reason}</td><td className="border-r border-[#D1DCEB] px-3 py-3"><button type="button" onClick={() => onDelete(user)} disabled={expired} className="inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-[5px] bg-[#dc3545] px-3 text-[12px] font-bold text-white hover:bg-[#bb2d3b] disabled:cursor-not-allowed disabled:bg-[#c96b73] disabled:text-white disabled:hover:bg-[#c96b73]"><X className="h-3.5 w-3.5" />Batalkan Akses</button></td><td className="px-3 py-3"><span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${expired ? "bg-[#fce7e7] text-[#c53030]" : "bg-[#e8f7e5] text-[#278b18]"}`}>{expired ? "Kedaluwarsa" : "Aktif"}</span></td></tr>; })}</tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 px-1 pt-3 text-[12px] text-[#17233d] sm:flex-row sm:items-center sm:justify-between">
        <span>Menampilkan {firstUser} sampai {lastUser} dari {totalUsers} entri</span>
        <nav aria-label="Pagination akses khusus operasional" className="flex items-center justify-end gap-1">
          <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="h-8 rounded-[2px] bg-[#e9edf3] px-3 text-[#9eabc0] transition-colors hover:bg-[#dfe5ee] disabled:cursor-not-allowed disabled:opacity-80">Sebelumnya</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} type="button" aria-current={currentPage === page ? "page" : undefined} onClick={() => setCurrentPage(page)} className={currentPage === page ? "h-8 min-w-8 rounded-[2px] bg-[#5543f5] px-2.5 font-semibold text-white" : "h-8 min-w-8 rounded-[2px] bg-[#e9edf3] px-2.5 text-[#17233d] transition-colors hover:bg-[#dfe5ee]"}>{page}</button>)}
          <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} className="h-8 rounded-[2px] bg-[#e9edf3] px-3 text-[#17233d] transition-colors hover:bg-[#dfe5ee] disabled:text-[#9eabc0]">Selanjutnya</button>
        </nav>
      </div>
    </div>
  );
}
