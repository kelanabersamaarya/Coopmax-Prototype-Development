import * as React from "react";
import { CalendarDays, CheckCircle2, CheckSquare, ChevronDown, Clock3, Pencil, Plus, User, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { OperationalSpecialAccessTable } from "@/components/OperationalSpecialAccessTable";
import { OperationalScheduleTable } from "@/components/OperationalScheduleTable";
import { OperationalHistoryTable } from "@/components/OperationalHistoryTable";
import "@/styles/obs-operasional-table.css";
import "@/styles/obs-operasional-required.css";
import "@/styles/obs-add-access-simplified.css";

type Day = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
type Status = "belum-diatur" | "waktu-operasional" | "operasional-tutup";
type UserAccess = { name: string; status: string; date: string; start: string; end: string };
const days: Day[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const schedule = Object.fromEntries(days.map((day) => [day, { start: "08:00", end: day === "Sabtu" || day === "Minggu" ? "13:00" : "16:00" }])) as Record<Day, { start: string; end: string }>;
const status = Object.fromEntries(days.map((day) => [day, "belum-diatur"])) as Record<Day, Status>;
const times = Array.from({ length: 24 }, (_, index) => `${String(index).padStart(2, "0")}:00`);

export default function ObsWaktuAksesOperasional() {
  const [activeTab, setActiveTab] = React.useState<"settings" | "special-access" | "history">("settings");
  const [operationalTab, setOperationalTab] = React.useState<"daily" | "history">("daily");
  const [users, setUsers] = React.useState<UserAccess[]>([{ name: "Budi Santoso", status: "Waktu Operasional", date: "12 Juni 2024", start: "08:00", end: "15:00" }, { name: "Siti Aminah", status: "Waktu Operasional", date: "12 Juni 2024", start: "08:00", end: "15:00" }]);
  const [addOpen, setAddOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [newAccess, setNewAccess] = React.useState({ user: "", startDate: "", endDate: "", startTime: "", endTime: "", reason: "" });
  const canSave = Object.values(newAccess).every(Boolean);
  const addUser = () => { if (!canSave) return; setUsers((current) => [...current, { name: newAccess.user, status: "Waktu Operasional", date: newAccess.startDate, start: newAccess.startTime, end: newAccess.endTime }]); setAddOpen(false); setNewAccess({ user: "", startDate: "", endDate: "", startTime: "", endTime: "", reason: "" }); setSuccessOpen(true); };
  const deleteUser = (user: UserAccess) => setUsers((current) => current.filter((item) => item !== user));

  return <div className="obs-operasional-page min-h-screen bg-[hsl(var(--app-bg))] px-2 py-6 md:px-3 md:py-8">
    <h1 className="text-[25px] font-extrabold leading-tight tracking-tight text-[#002060]">Operasional Harian</h1>
    <div className="mt-8 flex items-center gap-5 overflow-x-auto pb-1">
      {[ ["settings", "Pengaturan Waktu Operasional"], ["special-access", "Akses Khusus Operasional"], ["history", "Riwayat Perubahan"] ].map(([key, label]) => <button key={key} type="button" onClick={() => setActiveTab(key as typeof activeTab)} className={cn("h-[49px] shrink-0 rounded-full px-5 text-[12px] font-semibold", activeTab === key ? "bg-[#635BFF] text-white" : "text-[#53657d]")}>{label}</button>)}
    </div>
    {activeTab === "settings" && <section className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]"><div className="overflow-hidden rounded-[5px] border border-[#D7DEE9]"><header className="flex min-h-[69px] items-center gap-4 border-b border-[#D7DEE9] bg-[#F7F8FC] px-5"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white"><Clock3 className="h-5 w-5" /></span><h2 className="text-[15px] font-bold text-black">Pengaturan Waktu Operasional</h2></header><div className="flex items-center gap-5 px-4"><button type="button" onClick={() => setOperationalTab("daily")} className={cn("my-2 rounded-full px-5 py-2 text-[13px] font-semibold", operationalTab === "daily" ? "bg-[#635BFF] text-white" : "text-[#53657d]")}>Waktu operasional harian</button><button type="button" onClick={() => setOperationalTab("history")} className={cn("my-2 rounded-full px-5 py-2 text-[13px] font-semibold", operationalTab === "history" ? "bg-[#635BFF] text-white" : "text-[#53657d]")}>Riwayat perubahan</button></div>{operationalTab === "daily" ? <OperationalScheduleTable days={days} status={status} schedule={schedule} onEdit={() => undefined} /> : <OperationalHistoryTable />}</div></section>}
    {activeTab === "special-access" && <section className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]"><div className="overflow-hidden rounded-[5px] border border-[#D7DEE9]"><header className="flex min-h-[69px] items-center justify-between gap-4 border-b border-[#D7DEE9] bg-[#F7F8FC] px-5"><div className="flex items-center gap-4"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white"><User className="h-5 w-5" /></span><h2 className="text-[15px] font-bold text-black">Akses Khusus Operasional</h2></div><button type="button" onClick={() => setAddOpen(true)} className="inline-flex h-9 items-center gap-1.5 rounded-[6px] bg-[#2864e8] px-4 text-[13px] font-semibold text-white"><Plus className="h-4 w-4" />Tambah</button></header><OperationalSpecialAccessTable users={users} onDelete={deleteUser} /></div></section>}
    {activeTab === "history" && <section className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]"><div className="overflow-hidden rounded-[5px] border border-[#D7DEE9]"><OperationalHistoryTable /></div></section>}
    <Dialog open={addOpen} onOpenChange={setAddOpen}><DialogContent className="w-[calc(100vw-2rem)] max-w-[760px] rounded-[6px] bg-white p-0"><div className="border-b border-[#D7DEE9] px-5 py-4"><h3 className="text-[16px] font-bold text-[#17345f]">Tambah Akses Khusus Operasional</h3></div><div className="grid gap-4 px-5 py-7"><label className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><span className="text-[12px]">User *</span><select value={newAccess.user} onChange={(e) => setNewAccess({ ...newAccess, user: e.target.value })} className="h-9 rounded-[6px] border px-3 text-[13px]"><option value="">Pilih user</option>{["Siti Aminah", "Andi Wijaya", "Dewi Lestari"].map((user) => <option key={user}>{user}</option>)}</select></label><DateField label="Mulai operasional" value={newAccess.startDate} onChange={(value) => setNewAccess({ ...newAccess, startDate: value })} /><DateField label="Selesai operasional" value={newAccess.endDate} onChange={(value) => setNewAccess({ ...newAccess, endDate: value })} /><label className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-start"><span className="text-[12px]">Alasan Pemberian Akses *</span><textarea value={newAccess.reason} onChange={(e) => setNewAccess({ ...newAccess, reason: e.target.value })} className="min-h-[122px] rounded-[6px] border px-3 py-3 text-[13px]" placeholder="Masukkan alasan pemberian akses" /></label></div><div className="flex justify-end gap-2 border-t px-5 py-4"><button type="button" onClick={() => setAddOpen(false)} className="rounded-[6px] bg-[#8291ad] px-4 py-2 text-[12px] font-semibold text-white"><X className="mr-1 inline h-3.5 w-3.5" />Batalkan</button><button type="button" onClick={addUser} disabled={!canSave} className="rounded-[6px] bg-[#20b900] px-5 py-2 text-[12px] font-semibold text-white disabled:opacity-50"><CheckSquare className="mr-1 inline h-3.5 w-3.5" />Simpan</button></div></DialogContent></Dialog>
    <Dialog open={successOpen} onOpenChange={setSuccessOpen}><DialogContent className="max-w-[474px] text-center"><CheckCircle2 className="mx-auto h-20 w-20 text-[#92d477]" /><h3 className="mt-4 text-xl font-bold">Berhasil Menyimpan Data</h3><button type="button" onClick={() => setSuccessOpen(false)} className="mt-5 rounded-[6px] bg-[#2874d4] px-8 py-3 font-bold text-white">OK</button></DialogContent></Dialog>
  </div>;
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <div className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><span className="text-[12px]">{label} *</span><div className="grid gap-2 sm:grid-cols-2"><input type="date" value={value} onChange={(e) => onChange(e.target.value)} className="h-9 rounded-[6px] border px-3 text-[13px]" /><select className="h-9 rounded-[6px] border px-3 text-[13px]" defaultValue=""><option value="">Pilih waktu</option>{times.map((time) => <option key={time}>{time}</option>)}</select></div></div>; }
