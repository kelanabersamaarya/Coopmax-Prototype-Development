import * as React from "react";

type OperationalDay = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";

const days: OperationalDay[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

export function OperationalHistoryTable() {
  return <div className="border-b border-[#D7DEE9] p-2.5"><div className="overflow-x-auto rounded-[5px] border border-[#D7DEE9]"><table className="w-full min-w-[1000px] text-left text-[12px] text-[#334155]"><thead className="text-[#17345f]"><tr><th className="px-4 py-3 font-bold">No.</th><th className="px-4 py-3 font-bold">User</th><th className="px-4 py-3 font-bold">Tanggal dan Waktu Perubahan</th><th className="px-4 py-3 font-bold">Jam Operasional Sebelum Perubahan Per Hari</th><th className="px-4 py-3 font-bold">Jam Operasional Sesudah Perubahan Per Hari</th><th className="px-4 py-3 font-bold">Alasan Perubahan</th></tr></thead><tbody>{days.map((day, index) => <tr key={day} className="border-t border-[#D7DEE9]"><td className="px-4 py-4">{index + 1}</td><td className="px-4 py-4">Admin</td><td className="px-4 py-4">11-09-2026 09:47:00</td><td className="px-4 py-4">{day}: 08:00 - 16:00</td><td className="px-4 py-4">{day}: 08:00 - 17:00</td><td className="px-4 py-4">Penyesuaian jam layanan operasional</td></tr>)}</tbody></table></div></div>;
}
