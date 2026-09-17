import * as React from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

type OperationalDay = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
type OperationalStatus = "belum-diatur" | "waktu-operasional" | "operasional-tutup";
type Schedule = { start: string; end: string };

type Props = {
  days: OperationalDay[];
  status: Record<OperationalDay, OperationalStatus>;
  schedule: Record<OperationalDay, Schedule>;
  onEdit: (day: OperationalDay) => void;
};

export function OperationalScheduleTable({ days, status, schedule, onEdit }: Props) {
  return <div className="border-b border-[#D7DEE9] p-2.5">
    <div className="overflow-x-auto rounded-[5px] border border-[#D7DEE9]">
      <table className="w-full min-w-[820px] table-fixed border-collapse text-left text-[12px] text-[#17345f]">
        <colgroup><col className="w-[14%]" /><col className="w-[25%]" /><col className="w-[20%]" /><col className="w-[21%]" /><col className="w-[20%]" /></colgroup>
        <thead className="bg-[#F7F8FC]"><tr><th className="border-r border-[#D7DEE9] px-3 py-3 font-bold">Hari</th><th className="border-r border-[#D7DEE9] px-3 py-3 font-bold">Status Operasional</th><th className="border-r border-[#D7DEE9] px-3 py-3 font-bold">Waktu Mulai</th><th className="border-r border-[#D7DEE9] px-3 py-3 font-bold">Waktu Selesai</th><th className="px-3 py-3 font-bold">Aksi</th></tr></thead>
        <tbody>{days.map((day) => { const configured = status[day] === "waktu-operasional"; const closed = status[day] === "operasional-tutup"; return <tr key={day} className="border-t border-[#D7DEE9]"><td className="border-r border-[#D7DEE9] px-3 py-3 font-semibold">{day}</td><td className="border-r border-[#D7DEE9] px-3 py-3"><span className={cn("inline-flex rounded-full px-2 py-1 font-semibold", configured ? "bg-[#E8F8E5] text-[#278b18]" : "bg-slate-200 text-slate-500")}>{configured ? "Waktu Operasional" : closed ? "Operasional Tutup" : "Belum Diatur"}</span></td><td className="border-r border-[#D7DEE9] px-3 py-3">{configured ? schedule[day].start : "-"}</td><td className="border-r border-[#D7DEE9] px-3 py-3">{configured ? schedule[day].end : "-"}</td><td className="px-3 py-3"><button type="button" onClick={() => onEdit(day)} className="inline-flex h-7 items-center gap-1 rounded-[5px] bg-[#4169f5] px-2.5 font-semibold text-white hover:bg-[#3157d8]"><Pencil className="h-3 w-3" />{configured || closed ? "Ubah" : "Atur"}</button></td></tr>; })}</tbody>
      </table>
    </div>
  </div>;
}
