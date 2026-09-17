import * as React from "react";
import { AlertCircle, CalendarDays, CheckCircle2, CheckSquare, ChevronDown, ChevronRight, Clock3, Pencil, Plus, User, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type OperationalDay = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
type OperationalStatus = "belum-diatur" | "waktu-operasional";
type Schedule = { start: string; end: string };

const days: OperationalDay[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const initialSpecialAccessUsers = [
  { name: "Budi Santoso", status: "Waktu Operasional", date: "12 Juni 2024", start: "08:00", end: "15:00" },
];
const times = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
const initialSchedule: Record<OperationalDay, Schedule> = {
  Senin: { start: "08:00", end: "16:00" }, Selasa: { start: "08:00", end: "16:00" }, Rabu: { start: "08:00", end: "16:00" },
  Kamis: { start: "08:00", end: "16:00" }, Jumat: { start: "08:00", end: "16:00" }, Sabtu: { start: "08:00", end: "13:00" }, Minggu: { start: "08:00", end: "13:00" },
};
const initialStatus = days.reduce((result, day) => ({ ...result, [day]: "belum-diatur" }), {} as Record<OperationalDay, OperationalStatus>);
const storageKey = "obs-operasional-harian";

function loadStoredSettings() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return { status: initialStatus, schedule: initialSchedule };
    const parsed = JSON.parse(stored) as { status?: Record<OperationalDay, OperationalStatus>; schedule?: Record<OperationalDay, Schedule> };
    return { status: { ...initialStatus, ...parsed.status }, schedule: { ...initialSchedule, ...parsed.schedule } };
  } catch {
    return { status: initialStatus, schedule: initialSchedule };
  }
}

function TimeSelect({ value, placeholder, onChange }: { value: string; placeholder: string; onChange: (value: string) => void }) {
  return <div className="relative"><select value={value} onChange={(event) => onChange(event.target.value)} className={cn("h-9 w-full appearance-none rounded-[6px] border border-slate-300 bg-white px-3 pr-9 text-[13px] outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200", value ? "text-black" : "text-slate-400")}><option value="" disabled>{placeholder}</option>{times.map((time) => <option key={time} className="text-black">{time}</option>)}</select><Clock3 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /></div>;
}

export default function ObsWaktuAksesOperasional() {
  const storedSettings = React.useMemo(loadStoredSettings, []);
  const [status, setStatus] = React.useState(storedSettings.status);
  const [schedule, setSchedule] = React.useState(storedSettings.schedule);
  const [editingDay, setEditingDay] = React.useState<OperationalDay | null>(null);
  const [editingStatus, setEditingStatus] = React.useState<OperationalStatus>("belum-diatur");
  const [editingSchedule, setEditingSchedule] = React.useState<Schedule>(initialSchedule.Senin);
  const [editStep, setEditStep] = React.useState<1 | 2>(1);
  const [changeReason, setChangeReason] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"settings" | "history" | "special-access">("settings");
  const [specialAccessUsers, setSpecialAccessUsers] = React.useState(initialSpecialAccessUsers);
  const [addAccessOpen, setAddAccessOpen] = React.useState(false);
  const [newAccess, setNewAccess] = React.useState({ user: "", startDate: "", endDate: "", startTime: "", endTime: "" });
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  const isEditingConfigured = editingDay !== null && status[editingDay] === "waktu-operasional";

  const openEditor = (day: OperationalDay) => {
    setEditingDay(day);
    setEditingStatus(status[day]);
    setEditingSchedule(status[day] === "waktu-operasional" ? schedule[day] : { start: "", end: "" });
    setEditStep(1);
    setChangeReason("");
  };

  const closeEditor = () => {
    setEditingDay(null);
    setEditStep(1);
    setChangeReason("");
  };

  const saveEditor = () => {
    if (!editingDay) return;
    const nextStatus = { ...status, [editingDay]: editingStatus };
    const nextSchedule = { ...schedule, [editingDay]: editingSchedule };
    setStatus(nextStatus);
    setSchedule(nextSchedule);
    localStorage.setItem(storageKey, JSON.stringify({ status: nextStatus, schedule: nextSchedule }));
    setConfirmationOpen(false);
    closeEditor();
    setSuccessOpen(true);
  };

  const requestSave = () => setConfirmationOpen(true);

  const saveSpecialAccess = () => {
    if (!newAccess.user || !newAccess.startDate || !newAccess.endDate || !newAccess.startTime || !newAccess.endTime) return;
    setSpecialAccessUsers((current) => [...current, { name: newAccess.user, status: "Waktu Operasional", date: `${newAccess.startDate} - ${newAccess.endDate}`, start: newAccess.startTime, end: newAccess.endTime }]);
    setNewAccess({ user: "", startDate: "", endDate: "", startTime: "", endTime: "" });
    setAddAccessOpen(false);
  };
  const dateInputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});

  return <div className="min-h-screen bg-[hsl(var(--app-bg))] px-2 py-6 md:px-3 md:py-8">
    <h1 className="text-[25px] font-extrabold leading-tight tracking-tight text-[#002060]">Operasional Harian</h1>
    <div className="mt-8 flex gap-4 overflow-x-auto pb-1">
      <button type="button" onClick={() => setActiveTab("settings")} className={cn("h-[49px] rounded-full px-5 text-[12px] font-semibold", activeTab === "settings" ? "bg-[#635BFF] text-white" : "text-[#53657d]")}>Pengaturan Waktu Operasional</button>
      <button type="button" onClick={() => setActiveTab("history")} className={cn("h-[49px] rounded-full px-5 text-[12px] font-semibold", activeTab === "history" ? "bg-[#635BFF] text-white" : "text-[#53657d]")}>Riwayat Perubahan</button>
      <button type="button" onClick={() => setActiveTab("special-access")} className={cn("h-[49px] rounded-full px-5 text-[12px] font-semibold", activeTab === "special-access" ? "bg-[#635BFF] text-white" : "text-[#53657d]")}>Akses Khusus Operasional</button>
    </div>
    {activeTab === "settings" && <div className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]"><div className="overflow-hidden rounded-[5px] border border-[#D7DEE9]"><div className="flex min-h-[69px] items-center gap-4 border-b border-[#D7DEE9] bg-[#F7F8FC] px-5"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white"><Clock3 className="h-5 w-5" /></span><h2 className="text-[15px] font-bold text-black">Waktu Operasional Harian</h2></div><div className="grid gap-2 border-b border-[#D7DEE9] px-4 py-5 sm:grid-cols-2 lg:grid-cols-4 md:px-5">{days.map((day) => { const configured = status[day] === "waktu-operasional"; return <div key={day} className="flex h-full min-h-[104px] flex-col rounded-[8px] border border-[#D7DEE9] bg-[#F8FAFD] px-3 py-2.5"><div className="flex items-center justify-between gap-2"><span className="text-[14px] font-semibold text-[#17345f]">{day}</span><span className={cn("rounded-full px-2 py-0.5 text-[12px] font-semibold", configured ? "bg-[#E8F8E5] text-[#278b18]" : "bg-slate-200 text-slate-500")}>{configured ? "Waktu Operasional" : "Belum Diatur"}</span></div>{configured && <p className="mt-2 text-[12px] font-medium text-slate-700">{schedule[day].start} <span className="text-slate-400">—</span> {schedule[day].end}</p>}<button type="button" onClick={() => openEditor(day)} className="mt-auto inline-flex h-7 items-center gap-1 self-start rounded-[5px] bg-[#4169f5] px-2.5 text-[12px] font-semibold text-white hover:bg-[#3157d8]"><Pencil className="h-3 w-3" />{configured ? "Ubah Operasional Harian" : "Atur Operasional Harian"}</button></div>; })}</div></div></div>}
    {activeTab === "history" && <div className="mt-8 rounded-[5px] bg-white p-8 text-sm text-slate-500 shadow-sm ring-1 ring-[#E4E9F2]">Belum ada riwayat perubahan.</div>}
    {activeTab === "special-access" && <div className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]"><div className="overflow-hidden rounded-[5px] border border-[#D7DEE9]"><div className="flex min-h-[69px] items-center justify-between gap-4 border-b border-[#D7DEE9] bg-[#F7F8FC] px-5"><div className="flex items-center gap-4"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white"><User className="h-5 w-5" /></span><h2 className="text-[15px] font-bold text-black">Akses Khusus Operasional</h2></div><button type="button" onClick={() => setAddAccessOpen(true)} className="inline-flex h-9 items-center gap-1.5 rounded-[6px] bg-[#2864e8] px-4 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1f55ca]"><Plus className="h-4 w-4" />Tambah</button></div><div className="grid gap-2 border-b border-[#D7DEE9] px-4 py-5 sm:grid-cols-2 lg:grid-cols-4 md:px-5">{specialAccessUsers.map((user) => <div key={user.name} className="flex min-h-[132px] flex-col rounded-[8px] border border-[#D7DEE9] bg-[#F8FAFD] px-3 py-2.5"><div className="flex items-center justify-between gap-2"><span className="text-[14px] font-semibold text-[#17345f]">{user.name}</span><span className={cn("rounded-full px-2 py-0.5 text-[12px] font-semibold", user.status === "Waktu Operasional" ? "bg-[#E8F8E5] text-[#278b18]" : "bg-slate-200 text-slate-500")}>{user.status}</span></div>{user.status === "Waktu Operasional" && <p className="mt-2 text-[12px] font-medium text-slate-700">{user.date} · {user.start} <span className="text-slate-400">—</span> {user.end}</p>}{user.status === "Belum Diatur" && <p className="mt-2 text-[12px] font-medium text-slate-500">Tanggal belum diatur</p>}<button type="button" className="mt-auto inline-flex h-7 items-center gap-1 self-start rounded-[5px] bg-[#4169f5] px-2.5 text-[12px] font-semibold text-white hover:bg-[#3157d8]"><Pencil className="h-3 w-3" />{user.status === "Waktu Operasional" ? "Ubah Akses Operasional" : "Atur Akses Operasional"}</button></div>)}</div></div></div>}

    <Dialog open={addAccessOpen} onOpenChange={setAddAccessOpen}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[760px] rounded-[6px] border-slate-200 bg-white p-0 shadow-2xl">
        <div className="border-b border-[#D7DEE9] px-5 py-4"><h3 className="text-[16px] font-bold text-[#17345f]">Tambah Akses Khusus Operasional</h3></div>
        <div className="grid gap-4 px-5 py-7">
          <label className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><span className="text-[12px] font-medium text-black">User</span><div className="relative"><select value={newAccess.user} onChange={(event) => setNewAccess((current) => ({ ...current, user: event.target.value }))} className={cn("h-9 w-full appearance-none rounded-[6px] border border-slate-300 bg-white px-3 pr-9 text-[13px] outline-none focus:border-[#4169f5] focus:ring-2 focus:ring-blue-100", newAccess.user ? "text-black" : "text-slate-400")}><option value="" disabled>Pilih user</option>{["Siti Aminah", "Andi Wijaya", "Dewi Lestari", "Rina Kurnia", "Agus Pratama"].map((user) => <option key={user} value={user} className="text-black">{user}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /></div></label>
          {[{ key: "startDate", label: "Tanggal mulai operasional", placeholder: "Pilih Tanggal Mulai Operasional" }, { key: "endDate", label: "Tanggal selesai operasional", placeholder: "Pilih Tanggal Selesai Operasional" }].map((field) => <div key={field.key} className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><span className="text-[12px] font-medium text-black">{field.label}</span><div className="relative"><input ref={(element) => { dateInputRefs.current[field.key] = element; }} type="date" aria-label={field.placeholder} value={newAccess[field.key as keyof typeof newAccess]} onChange={(event) => setNewAccess((current) => ({ ...current, [field.key]: event.target.value }))} onClick={(event) => { event.currentTarget.showPicker?.(); }} className={cn("h-9 w-full cursor-pointer rounded-[6px] border border-slate-300 bg-white px-3 pr-9 text-[13px] outline-none focus:border-[#4169e5] focus:ring-2 focus:ring-blue-100 [&::-webkit-calendar-picker-indicator]:opacity-0", newAccess[field.key as keyof typeof newAccess] ? "text-black" : "text-transparent")} />{!newAccess[field.key as keyof typeof newAccess] && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-slate-400">{field.placeholder}</span>}<CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-700" /></div></div>)}
          <label className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><span className="text-[12px] font-medium text-black">Waktu mulai operasional</span><TimeSelect value={newAccess.startTime} placeholder="Pilih Waktu Mulai Operasional" onChange={(value) => setNewAccess((current) => ({ ...current, startTime: value }))} /></label>
          <label className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><span className="text-[12px] font-medium text-black">Waktu selesai operasional</span><TimeSelect value={newAccess.endTime} placeholder="Pilih Waktu Selesasi Operasional" onChange={(value) => setNewAccess((current) => ({ ...current, endTime: value }))} /></label>
        </div>
        <div className="flex justify-end gap-2 border-t border-[#D7DEE9] px-5 py-4"><button type="button" onClick={() => setAddAccessOpen(false)} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] bg-[#8291ad] px-4 text-[12px] font-semibold text-white"><X className="h-3.5 w-3.5" />Batalkan</button><button type="button" onClick={saveSpecialAccess} disabled={!newAccess.user || !newAccess.startDate || !newAccess.endDate || !newAccess.startTime || !newAccess.endTime} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] bg-[#20b900] px-5 text-[12px] font-semibold text-white hover:bg-[#19a000] disabled:cursor-not-allowed disabled:opacity-50"><CheckSquare className="h-3.5 w-3.5" />Simpan</button></div>
      </DialogContent>
    </Dialog>

    <Dialog open={editingDay !== null} onOpenChange={(open) => !open && closeEditor()}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[760px] rounded-[6px] border-slate-200 bg-white p-0 shadow-2xl">
        <div className="border-b border-[#D7DEE9] px-5 py-4"><h3 className="text-[16px] font-bold text-[#17345f]">{isEditingConfigured ? "Ubah Operasional Harian" : "Atur Operasional Harian"}</h3></div>
        {editingDay && <>
          {isEditingConfigured && <div className="flex items-start gap-3 border-b border-[#D7DEE9] px-5 py-4 text-[10px] font-semibold"><div className="flex w-[140px] shrink-0 flex-col items-center text-center"><span className={cn("flex h-9 w-9 items-center justify-center rounded-full text-[14px]", editStep === 1 ? "bg-[#2864e8] text-white" : "bg-[#eef2f7] text-[#63738c]")}>1</span><span className={cn("mt-2 whitespace-nowrap", editStep === 1 ? "text-[#17345f]" : "text-[#63738c]")}>Waktu Operasional</span></div><div className="mt-[18px] h-[2px] min-w-0 flex-1 bg-[#e4eaf2]" /><div className="flex w-[140px] shrink-0 flex-col items-center text-center"><span className={cn("flex h-9 w-9 items-center justify-center rounded-full text-[14px]", editStep === 2 ? "bg-[#2864e8] text-white" : "bg-[#eef2f7] text-[#63738c]")}>2</span><span className={cn("mt-2 whitespace-nowrap", editStep === 2 ? "text-[#17345f]" : "text-[#63738c]")}>Alasan Perubahan</span></div></div>}
          <div className="px-5 py-7">{!isEditingConfigured || editStep === 1 ? <div className="grid gap-5"><div className="flex items-start gap-0"><span className="w-[200px] shrink-0 pt-1 text-[12px] text-black">Status operasional</span><RadioGroup value={editingStatus} onValueChange={(value: OperationalStatus) => setEditingStatus(value)} className="flex flex-row items-center gap-5"><label className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-[12px] text-slate-700"><RadioGroupItem value="belum-diatur" className="border-slate-400 text-[#5543f5]" />Belum Diatur</label><label className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-[12px] text-slate-700"><RadioGroupItem value="waktu-operasional" className="border-slate-400 text-[#5543f5]" />Waktu Operasional</label></RadioGroup></div>{editingStatus === "waktu-operasional" && <><div className="flex items-start gap-0"><label className="w-[200px] shrink-0 pt-2 text-[12px] text-black">Waktu Mulai Operasional</label><div className="min-w-0 flex-1"><TimeSelect value={editingSchedule.start} placeholder="Pilih Waktu Mulai Operasional" onChange={(value) => setEditingSchedule((current) => ({ ...current, start: value }))} /></div></div><div className="flex items-start gap-0"><label className="w-[200px] shrink-0 pt-2 text-[12px] text-black">Waktu Selesai Operasional</label><div className="min-w-0 flex-1"><TimeSelect value={editingSchedule.end} placeholder="Pilih Waktu Selesasi Operasional" onChange={(value) => setEditingSchedule((current) => ({ ...current, end: value }))} /></div></div></>}</div> : <div className="flex items-start gap-0"><label htmlFor="change-reason" className="w-[200px] shrink-0 pt-2 text-[12px] text-black">Alasan Perubahan <span className="text-red-500">*</span></label><textarea id="change-reason" value={changeReason} onChange={(event) => setChangeReason(event.target.value)} placeholder="Masukkan alasan perubahan" className="min-h-[122px] min-w-0 flex-1 resize-y rounded-[6px] border border-slate-300 px-3 py-3 text-[13px] outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200" /></div>}</div>
          <div className="flex justify-end gap-2 border-t border-[#D7DEE9] px-5 py-4">{isEditingConfigured && editStep === 2 && <button type="button" onClick={() => setEditStep(1)} className="mr-auto inline-flex h-[33px] w-[104px] items-center justify-center rounded-[6px] border border-[#8291ad] text-[12px] font-semibold text-[#8291ad]">Kembali</button>}<button type="button" onClick={closeEditor} className="inline-flex h-[33px] w-[104px] items-center justify-center gap-1.5 rounded-[6px] bg-[#8291ad] text-[12px] font-semibold text-white"><X className="h-4 w-4" />Batalkan</button>{isEditingConfigured && editStep === 1 ? <button type="button" onClick={() => setEditStep(2)} className="inline-flex h-[33px] w-[116px] items-center justify-center gap-1.5 rounded-[6px] bg-[#4169f5] text-[12px] font-semibold text-white">Lanjutkan<ChevronRight className="h-4 w-4" /></button> : <button type="button" disabled={isEditingConfigured && !changeReason.trim()} onClick={requestSave} className="inline-flex h-[33px] w-[104px] items-center justify-center gap-1.5 rounded-[6px] bg-[#28b900] text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"><CheckSquare className="h-4 w-4" />Simpan</button>}</div>
        </>}
      </DialogContent>
    </Dialog>

    <Dialog open={confirmationOpen} onOpenChange={(open) => { setConfirmationOpen(open); }}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[412px] rounded-[6px] border-slate-200 bg-white p-0 shadow-2xl [&>button]:hidden">
              <div className="flex flex-col items-center px-5 py-10 text-center"><AlertCircle className="h-[72px] w-[72px] text-[#f6c39f]" strokeWidth={1.5} /><h3 className="mt-5 text-[22px] font-bold text-[#435270]">Yakin menyimpan perubahan?</h3><div className="mt-6 flex gap-2"><button type="button" onClick={saveEditor} className="inline-flex h-[47px] w-[84px] items-center justify-center rounded-[6px] bg-[#2f80ed] text-[14px] font-bold text-white">Yes</button><button type="button" onClick={() => setConfirmationOpen(false)} className="inline-flex h-[47px] w-[94px] items-center justify-center rounded-[6px] bg-[#8999b6] text-[14px] font-bold text-white">Cancel</button></div></div>
      </DialogContent>
    </Dialog>

    <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[474px] rounded-[6px] border-slate-200 bg-white p-0 shadow-2xl [&>button]:hidden">
              <div className="flex flex-col items-center px-5 py-8 text-center"><CheckCircle2 className="h-[92px] w-[92px] text-[#92d477]" strokeWidth={1.5} /><h3 className="mt-4 text-[22px] font-bold text-[#5b5b5b]">Berhasil Menyimpan Data</h3><button type="button" onClick={() => setSuccessOpen(false)} className="mt-6 inline-flex h-[53px] w-[110px] items-center justify-center rounded-[6px] bg-[#2874d4] text-[17px] font-bold text-white ring-2 ring-[#a8c8f1]">OK</button></div>
      </DialogContent>
    </Dialog>
  </div>;
}
