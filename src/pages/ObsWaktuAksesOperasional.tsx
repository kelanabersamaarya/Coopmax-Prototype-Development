import * as React from "react";
import { AlertCircle, CheckSquare, Clock3, History, Plus, User, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { OperationalSpecialAccessTable } from "@/components/OperationalSpecialAccessTable";
import { OperationalScheduleTable } from "@/components/OperationalScheduleTable";
import { OperationalHistoryTable, type OperationalHistoryEntry } from "@/components/OperationalHistoryTable";
import { AccessDateField, RequiredLabel } from "@/components/OperationalAccessFields";
import { OperationalUserSelect } from "@/components/OperationalUserSelect";
import { OperationalTimeRange } from "@/components/OperationalTimeRange";
import { OperationalConfirmDialog } from "@/components/OperationalConfirmDialog";
import { OperationalSuccessDialog } from "@/components/OperationalSuccessDialog";
import { OperationalWarningDialog } from "@/components/OperationalWarningDialog";

type Day = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
type Status = "belum-diatur" | "waktu-operasional" | "operasional-tutup";
type UserAccess = { name: string; status: string; startDate: string; endDate: string; start: string; end: string; reason: string };
type AccessForm = Omit<UserAccess, "status"> & { user: string };
const days: Day[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const defaultSchedule = Object.fromEntries(days.map((day) => [day, { start: "08:00", end: day === "Sabtu" || day === "Minggu" ? "13:00" : "16:00" }])) as Record<Day, { start: string; end: string }>;
const emptyForm: AccessForm = { user: "", startDate: "", endDate: "", start: "", end: "", reason: "" };
const scheduleStorageKey = "obs-operasional-schedule";
const statusStorageKey = "obs-operasional-status";
const historyStorageKey = "obs-operasional-history";
const usersStorageKey = "obs-operasional-special-access-users";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : fallback;
  } catch {
    return fallback;
  }
}

export default function ObsWaktuAksesOperasional() {
  const [activeTab, setActiveTab] = React.useState<"settings" | "special-access" | "history">("settings");
  const [schedule, setSchedule] = React.useState<Record<Day, { start: string; end: string }>>(() => readStorage(scheduleStorageKey, defaultSchedule));
  const [status, setStatus] = React.useState<Record<Day, Status>>(() => readStorage(statusStorageKey, Object.fromEntries(days.map((day) => [day, "belum-diatur"])) as Record<Day, Status>));
  const [history, setHistory] = React.useState<OperationalHistoryEntry[]>(() => readStorage(historyStorageKey, []));
  const [editDay, setEditDay] = React.useState<Day | null>(null);
  const [editStart, setEditStart] = React.useState("");
  const [editEnd, setEditEnd] = React.useState("");
  const [editReason, setEditReason] = React.useState("");
  const [editStatus, setEditStatus] = React.useState<Status>("belum-diatur");
  const [editRequiresReason, setEditRequiresReason] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [scheduleSuccessOpen, setScheduleSuccessOpen] = React.useState(false);
  const [users, setUsers] = React.useState<UserAccess[]>(() => readStorage(usersStorageKey, [
    { name: "Budi Santoso", status: "Waktu Operasional", startDate: "12 Juni 2024", endDate: "12 Juni 2024", start: "08:00", end: "15:00", reason: "Kebutuhan operasional" },
    { name: "Siti Aminah", status: "Waktu Operasional", startDate: "12 Juni 2024", endDate: "12 Juni 2024", start: "08:00", end: "15:00", reason: "Kebutuhan operasional" },
  ]));
  const [addOpen, setAddOpen] = React.useState(false);
  const [addConfirmOpen, setAddConfirmOpen] = React.useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState<UserAccess | null>(null);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [durationWarningOpen, setDurationWarningOpen] = React.useState(false);
  const [newAccess, setNewAccess] = React.useState<AccessForm>(emptyForm);
  const canSave = Object.values(newAccess).every(Boolean);
  const showOperationalFields = editStatus === "waktu-operasional";

  React.useEffect(() => { localStorage.setItem(scheduleStorageKey, JSON.stringify(schedule)); }, [schedule]);
  React.useEffect(() => { localStorage.setItem(statusStorageKey, JSON.stringify(status)); }, [status]);
  React.useEffect(() => { localStorage.setItem(historyStorageKey, JSON.stringify(history)); }, [history]);
  React.useEffect(() => { localStorage.setItem(usersStorageKey, JSON.stringify(users)); }, [users]);

  const openEdit = (day: Day) => {
    const existingSchedule = status[day] !== "belum-diatur";
    setEditDay(day);
    setEditStart(existingSchedule ? schedule[day].start : "");
    setEditEnd(existingSchedule ? schedule[day].end : "");
    setEditStatus(status[day]);
    setEditReason("");
    setEditRequiresReason(existingSchedule);
    setEditOpen(true);
  };

  const saveSchedule = () => {
    if (!editDay || (editStatus === "waktu-operasional" && (!editStart || !editEnd)) || (editRequiresReason && !editReason.trim())) return;
    const before = status[editDay] === "waktu-operasional" ? `${editDay}: ${schedule[editDay].start} - ${schedule[editDay].end}` : `${editDay}: ${status[editDay]}`;
    const after = editStatus === "waktu-operasional" ? `${editDay}: ${editStart} - ${editEnd}` : `${editDay}: ${editStatus}`;
    setHistory((current) => [{ user: "Admin", changedAt: new Date().toLocaleString("id-ID"), before, after, reason: editReason }, ...current]);
    setSchedule((current) => ({ ...current, [editDay]: { start: editStart, end: editEnd } }));
    setStatus((current) => ({ ...current, [editDay]: editStatus }));
    setConfirmOpen(false);
    setEditOpen(false);
    setScheduleSuccessOpen(true);
  };

  const requestScheduleSave = () => {
    if (editDay && (editStatus !== "waktu-operasional" || (editStart && editEnd)) && (!editRequiresReason || editReason.trim())) setConfirmOpen(true);
  };

  const requestAdd = () => {
    if (!canSave) return;
    const start = new Date(`${newAccess.startDate}T${newAccess.start}`);
    const end = new Date(`${newAccess.endDate}T${newAccess.end}`);
    if (end.getTime() - start.getTime() > 24 * 60 * 60 * 1000) {
      setDurationWarningOpen(true);
      return;
    }
    setAddConfirmOpen(true);
  };
  const requestDelete = (user: UserAccess) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };
  const deleteUser = () => {
    if (!userToDelete) return;
    setUsers((current) => current.filter((item) => item !== userToDelete));
    setUserToDelete(null);
    setDeleteConfirmOpen(false);
    setDeleteSuccessOpen(true);
  };
  const addUser = () => {
    if (!canSave) return;
    setUsers((current) => [...current, { name: newAccess.user, status: "Waktu Operasional", startDate: newAccess.startDate, endDate: newAccess.endDate, start: newAccess.start, end: newAccess.end, reason: newAccess.reason }]);
    setAddConfirmOpen(false);
    setAddOpen(false);
    setNewAccess(emptyForm);
    setSuccessOpen(true);
  };
  const update = (key: keyof AccessForm, value: string) => setNewAccess((current) => ({ ...current, [key]: value }));

  return <div className="obs-operasional-page min-h-screen bg-[hsl(var(--app-bg))] px-2 py-6 md:px-3 md:py-8">
    <h1 className="text-[25px] font-extrabold tracking-tight text-[#002060]">Operasional Harian</h1>
    <div className="mt-8 flex gap-5 overflow-x-auto pb-1">{([["settings", "Waktu Operasional"], ["special-access", "Akses Khusus Operasional"], ["history", "Riwayat Perubahan"]] as const).map(([key, label]) => <button key={key} type="button" onClick={() => setActiveTab(key)} className={cn("h-[49px] shrink-0 rounded-full px-5 text-[12px] font-semibold", activeTab === key ? "bg-[#635BFF] text-white" : "text-[#53657d] hover:text-[#635BFF]")}>{label}</button>)}</div>
    {activeTab === "settings" && <Panel icon={<Clock3 />} title="Pengaturan Waktu Operasional"><OperationalScheduleTable days={days} status={status} schedule={schedule} onEdit={openEdit} /></Panel>}
    {activeTab === "special-access" && <Panel icon={<User />} title="Akses Khusus Operasional" action={<button type="button" onClick={() => setAddOpen(true)} className="inline-flex h-9 items-center gap-1.5 rounded-[6px] bg-[#2864e8] px-4 text-[13px] font-semibold text-white"><Plus className="h-4 w-4" />Tambah</button>} topContent={<div className="mb-2.5 flex items-start gap-3 rounded-[8px] border border-[#8bb8f2] bg-[#eef6ff] px-4 py-3.5 text-[#17345f]"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#2864e8]" /><div><h3 className="text-[16px] font-bold leading-5">Akses Khusus di Luar Jam Operasional</h3><p className="mt-1.5 text-[13px] leading-5">Di luar jam operasional yang berlaku, anda dapat memberikan izin akses khusus kepada pengguna atau user tertentu yang membutuhkan. Pengguna atau user yang menerima akses khusus dapat melakukan aktivitas sistem di luar rentang waktu operasional yang telah ditentukan</p></div></div>}><OperationalSpecialAccessTable users={users} onDelete={requestDelete} /></Panel>}
    {activeTab === "history" && <Panel icon={<History />} title="Riwayat Perubahan"><OperationalHistoryTable entries={history} /></Panel>}

    <Dialog open={editOpen} onOpenChange={setEditOpen}><DialogContent className="w-[calc(100vw-2rem)] max-w-[760px] rounded-[6px] bg-white p-0"><ModalTitle text={editRequiresReason ? "Ubah Waktu Operasional" : "Tambah Waktu Operasional"} /><div className="grid gap-5 px-5 py-7">
      <div className="operational-status-fieldset" role="group" aria-label="Status operasional"><div className="operational-status-label text-[12px]">Status operasional <span className="text-red-500">*</span></div><div className="operational-status-options"><StatusRadio label="Belum diatur" value="belum-diatur" selected={editStatus} onChange={setEditStatus} /><StatusRadio label="Waktu Operasional" value="waktu-operasional" selected={editStatus} onChange={setEditStatus} /><StatusRadio label="Operasional Tutup" value="operasional-tutup" selected={editStatus} onChange={setEditStatus} /></div></div>
      {showOperationalFields && <OperationalTimeRange start={editStart} end={editEnd} onStartChange={setEditStart} onEndChange={setEditEnd} />}
      {editRequiresReason && <label className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-start"><RequiredLabel>Alasan perubahan</RequiredLabel><textarea value={editReason} onChange={(event) => setEditReason(event.target.value)} required className="min-h-[100px] rounded-[6px] border px-3 py-3 text-[13px]" placeholder="Masukkan alasan perubahan" /></label>}
    </div><Footer cancel={() => setEditOpen(false)} save={requestScheduleSave} disabled={(showOperationalFields && (!editStart || !editEnd)) || (editRequiresReason && !editReason.trim())} /></DialogContent></Dialog>
    <OperationalConfirmDialog open={confirmOpen} onOpenChange={setConfirmOpen} onConfirm={saveSchedule} />
    <OperationalSuccessDialog open={scheduleSuccessOpen} onOpenChange={setScheduleSuccessOpen} title="Berhasil menyimpan data" />
    <Dialog open={addOpen} onOpenChange={(open) => { setAddOpen(open); setNewAccess(emptyForm); }}><DialogContent className="w-[calc(100vw-2rem)] max-w-[760px] rounded-[6px] bg-white p-0"><ModalTitle text="Tambah Akses Khusus Operasional" /><div className="grid gap-4 px-5 py-7"><label className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><RequiredLabel>User</RequiredLabel><OperationalUserSelect value={newAccess.user} onChange={(value) => update("user", value)} /></label><AccessDateField label="Mulai operasional" date={newAccess.startDate} time={newAccess.start} onDateChange={(v) => update("startDate", v)} onTimeChange={(v) => update("start", v)} /><AccessDateField label="Selesai operasional" date={newAccess.endDate} time={newAccess.end} onDateChange={(v) => update("endDate", v)} onTimeChange={(v) => update("end", v)} /><label className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-start"><RequiredLabel>Alasan Pemberian Akses</RequiredLabel><textarea value={newAccess.reason} onChange={(e) => update("reason", e.target.value)} className="min-h-[122px] rounded-[6px] border px-3 py-3 text-[13px]" placeholder="Masukkan alasan pemberian akses" /></label></div><Footer cancel={() => { setNewAccess(emptyForm); setAddOpen(false); }} save={requestAdd} disabled={!canSave} /></DialogContent></Dialog>
    <OperationalWarningDialog open={durationWarningOpen} onOpenChange={setDurationWarningOpen} />
    <OperationalConfirmDialog open={addConfirmOpen} onOpenChange={setAddConfirmOpen} onConfirm={addUser} />
    <OperationalConfirmDialog open={deleteConfirmOpen} onOpenChange={(open) => { setDeleteConfirmOpen(open); if (!open) setUserToDelete(null); }} onConfirm={deleteUser} title="Yakin untuk menghapus data?" />
    <OperationalSuccessDialog open={deleteSuccessOpen} onOpenChange={setDeleteSuccessOpen} title="Berhasil Menghapus Data" />
    <OperationalSuccessDialog open={successOpen} onOpenChange={setSuccessOpen} title="Berhasil menambahkan data" />
  </div>;
}

function Panel({ icon, title, action, topContent, children }: { icon: React.ReactNode; title: string; action?: React.ReactNode; topContent?: React.ReactNode; children: React.ReactNode }) { return <section className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm"><>{topContent && <div>{topContent}</div>}<div className="overflow-hidden rounded-[5px] border border-[#D7DEE9]"><header className="flex min-h-[69px] items-center justify-between gap-4 border-b bg-[#F7F8FC] px-5"><div className="flex items-center gap-4"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white">{React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}</span><h2 className="text-[15px] font-bold text-black">{title}</h2></div>{action}</header>{children}</div></></section>; }
function ModalTitle({ text }: { text: string }) { return <div className="border-b border-[#D7DEE9] px-5 py-4"><h3 className="text-[16px] font-bold text-[#17345f]">{text}</h3></div>; }
function Footer({ cancel, save, disabled }: { cancel: () => void; save: () => void; disabled: boolean }) { return <div className="flex justify-end gap-2 border-t px-5 py-4"><button type="button" onClick={cancel} className="rounded-[6px] bg-[#8291ad] px-4 py-2 text-[12px] font-semibold text-white"><X className="mr-1 inline h-3.5 w-3.5" />Batalkan</button><button type="button" onClick={save} disabled={disabled} className="rounded-[6px] bg-[#20b900] px-5 py-2 text-[12px] font-semibold text-white disabled:opacity-50"><CheckSquare className="mr-1 inline h-3.5 w-3.5" />Simpan</button></div>; }
function StatusRadio({ label, value, selected, onChange }: { label: string; value: Status; selected: Status; onChange: (value: Status) => void }) { return <label className="flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap text-[13px] text-[#17345f]"><input type="radio" name="operational-status" value={value} checked={selected === value} onChange={() => onChange(value)} aria-label={label} className="h-4 w-4 accent-[#4169f5]" />{label}</label>; }
function TimeSelect({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { const times = Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`); return <label className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center"><RequiredLabel>{label}</RequiredLabel><select value={value} onChange={(e) => onChange(e.target.value)} className="h-9 rounded-[6px] border px-3 text-[13px]"><option value="">Pilih waktu</option>{times.map((time) => <option key={time}>{time}</option>)}</select></label>; }
