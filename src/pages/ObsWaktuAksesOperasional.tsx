import * as React from "react";
import { CheckSquare, Clock3, Pencil, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type OperationalDay = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
type OperationalStatus = "belum-diatur" | "waktu-operasional";
type Schedule = { start: string; end: string };

const days: OperationalDay[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const times = Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`);
const initialSchedule: Record<OperationalDay, Schedule> = {
  Senin: { start: "08:00", end: "16:00" }, Selasa: { start: "08:00", end: "16:00" }, Rabu: { start: "08:00", end: "16:00" }, Kamis: { start: "08:00", end: "16:00" }, Jumat: { start: "08:00", end: "16:00" }, Sabtu: { start: "08:00", end: "13:00" }, Minggu: { start: "08:00", end: "13:00" },
};
const initialStatus = days.reduce((result, day) => ({ ...result, [day]: "belum-diatur" }), {} as Record<OperationalDay, OperationalStatus>);

function TimeSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="relative"><select value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-full appearance-none rounded-[6px] border border-slate-300 bg-white px-3 pr-9 text-[13px] text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200">{times.map((time) => <option key={time}>{time}</option>)}</select><Clock3 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /></div>;
}

export default function ObsWaktuAksesOperasional() {
  const [status, setStatus] = React.useState(initialStatus);
  const [schedule, setSchedule] = React.useState(initialSchedule);
  const [editingDay, setEditingDay] = React.useState<OperationalDay | null>(null);
  const [editingStatus, setEditingStatus] = React.useState<OperationalStatus>("belum-diatur");
  const [editingSchedule, setEditingSchedule] = React.useState<Schedule>(initialSchedule.Senin);
  const [activeTab, setActiveTab] = React.useState<"settings" | "history">("settings");

  const openEditor = (day: OperationalDay) => { setEditingDay(day); setEditingStatus(status[day]); setEditingSchedule(schedule[day]); };
  const saveEditor = () => { if (!editingDay) return; setStatus((current) => ({ ...current, [editingDay]: editingStatus })); setSchedule((current) => ({ ...current, [editingDay]: editingSchedule })); setEditingDay(null); };

  return <div className="min-h-screen bg-[hsl(var(--app-bg))] px-2 py-6 md:px-3 md:py-8">
    <h1 className="text-[25px] font-extrabold leading-tight tracking-tight text-[#002060]">Waktu Operasional</h1>
    <div className="mt-8 flex gap-4 overflow-x-auto pb-1"><button type="button" onClick={() => setActiveTab("settings")} className={cn("h-[49px] rounded-full px-5 text-[12px] font-semibold", activeTab === "settings" ? "bg-[#635BFF] text-white" : "text-[#53657d]")}>Pengaturan Waktu Operasional</button><button type="button" onClick={() => setActiveTab("history")} className={cn("h-[49px] rounded-full px-5 text-[12px] font-semibold", activeTab === "history" ? "bg-[#635BFF] text-white" : "text-[#53657d]")}>Riwayat Perubahan</button></div>
    {activeTab === "settings" && <div className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]"><div className="overflow-hidden rounded-[5px] border border-[#D7DEE9]"><div className="flex min-h-[69px] items-center gap-4 border-b border-[#D7DEE9] bg-[#F7F8FC] px-5"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white"><Clock3 className="h-5 w-5" /></span><h2 className="text-[15px] font-bold text-black">Waktu Operasional Harian</h2></div><div className="grid gap-2 border-b border-[#D7DEE9] px-4 py-5 sm:grid-cols-2 lg:grid-cols-4 md:px-5">{days.map((day) => { const configured = status[day] === "waktu-operasional"; return <div key={day} className="rounded-[8px] border border-[#D7DEE9] bg-[#F8FAFD] px-3 py-2.5"><div className="flex items-center justify-between gap-2"><span className="text-[11px] font-semibold text-[#17345f]">{day}</span><span className={cn("rounded-full px-2 py-0.5 text-[9px] font-semibold", configured ? "bg-[#E8F8E5] text-[#278b18]" : "bg-slate-200 text-slate-500")}>{configured ? "Waktu Operasional" : "Belum Diatur"}</span></div>{configured && <p className="mt-2 text-[12px] font-medium text-slate-700">{schedule[day].start} <span className="text-slate-400">—</span> {schedule[day].end}</p>}<button type="button" onClick={() => openEditor(day)} className="mt-2 inline-flex h-7 items-center gap-1 rounded-[5px] bg-[#4169f5] px-2.5 text-[10px] font-semibold text-white hover:bg-[#3157d8]"><Pencil className="h-3 w-3" />{configured ? "Ubah Waktu Operasional" : "Atur Operasional"}</button></div>; })}</div></div></div>}
    {activeTab === "history" && <div className="mt-8 rounded-[5px] bg-white p-8 text-sm text-slate-500 shadow-sm ring-1 ring-[#E4E9F2]">Belum ada riwayat perubahan.</div>}
    <Dialog open={editingDay !== null} onOpenChange={(open) => !open && setEditingDay(null)}><DialogContent className="w-[calc(100vw-2rem)] max-w-[760px] rounded-[12px] border-slate-200 bg-white p-0 shadow-2xl"><div className="border-b border-[#D7DEE9] px-5 py-4"><h3 className="text-[16px] font-bold text-[#17345f]">Atur Waktu Operasional</h3></div>{editingDay && <><div className="grid gap-4 px-5 py-5"><div className="flex items-start gap-0 py-2.5"><span className="w-[200px] shrink-0 pt-1 text-[12px] text-black">Status operasional</span><RadioGroup value={editingStatus} onValueChange={(value: OperationalStatus) => setEditingStatus(value)} className="flex flex-row items-center gap-5"><label className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-[12px] text-slate-700"><RadioGroupItem value="belum-diatur" className="border-slate-400 text-[#5543f5]" />Belum Diatur</label><label className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-[12px] text-slate-700"><RadioGroupItem value="waktu-operasional" className="border-slate-400 text-[#5543f5]" />Waktu Operasional</label></RadioGroup></div>{editingStatus === "waktu-operasional" && <><div className="flex items-start gap-0"><label className="w-[200px] shrink-0 pt-2 text-[12px] text-black">Waktu Mulai Operasional</label><div className="min-w-0 flex-1"><TimeSelect value={editingSchedule.start} onChange={(value) => setEditingSchedule((current) => ({ ...current, start: value }))} /></div></div><div className="flex items-start gap-0"><label className="w-[200px] shrink-0 pt-2 text-[12px] text-black">Waktu Selesai Operasional</label><div className="min-w-0 flex-1"><TimeSelect value={editingSchedule.end} onChange={(value) => setEditingSchedule((current) => ({ ...current, end: value }))} /></div></div></>}</div><div className="flex justify-end gap-2 border-t border-[#D7DEE9] px-5 py-4"><button type="button" onClick={() => setEditingDay(null)} className="inline-flex h-[32px] w-[100px] items-center justify-center gap-1.5 rounded-[6px] bg-[#8291ad] text-[12px] font-semibold text-white"><X className="h-4 w-4" />Batalkan</button><button type="button" onClick={saveEditor} className="inline-flex h-[32px] w-[100px] items-center justify-center gap-1.5 rounded-[6px] bg-[#28b900] text-[12px] font-semibold text-white"><CheckSquare className="h-4 w-4" />Simpan</button></div></>}</DialogContent></Dialog>
  </div>;
}
