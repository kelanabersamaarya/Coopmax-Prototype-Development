import * as React from "react";

type OperationalDay = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";

const days: OperationalDay[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const cellClass = "border-r border-[#D7DEE9] px-4 py-4 last:border-r-0";
const headerClass = "border-r border-[#D7DEE9] px-4 py-3 font-bold last:border-r-0";

export function OperationalHistoryTable() {
  return <div className="border-b border-[#D7DEE9] p-2.5"><div className="overflow-x-auto rounded-[5px] border border-[#D7DEE9]"><table className="w-full min-w-[1000px] border-collapse text-left text-[12px] text-[#334155]"><thead className="text-[#17345f]"><tr><th className={headerClass}>No.</th><th className={headerClass}>User</th><th className={headerClass}>Tanggal dan Waktu Perubahan</th><th className={headerClass}>Jam Operasional Sebelum Perubahan Per Hari</th><th className={headerClass}>Jam Operasional Sesudah Perubahan Per Hari</th><th className={headerClass}>Alasan Perubahan</th></tr></thead><tbody>{days.map((day, index) => <tr key={day} className="border-t border-[#D7DEE9]"><td className={cellClass}>{index + 1}</td><td className={cellClass}>Admin</td><td className={cellClass}>11-09-2026 09:47:00</td><td className={cellClass}>{day}: 08:00 - 16:00</td><td className={cellClass}>{day}: 08:00 - 17:00</td><td className={cellClass}>Penyesuaian jam layanan operasional</td></tr>)}</tbody></table></div></div>;
}
