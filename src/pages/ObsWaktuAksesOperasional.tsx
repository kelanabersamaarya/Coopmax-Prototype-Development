import * as React from "react";
import { CheckSquare, ChevronDown, ChevronLeft, ChevronRight, Clock3, Pencil, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoanProductSaveSuccessModal from "@/components/loans/products/LoanProductSaveSuccessModal";
import { showSolidSuccess } from "@/utils/solid-toast";
import { cn } from "@/lib/utils";

type AccessTab = "Pengaturan Waktu Operasional" | "Riwayat Perubahan";

type AccessUser = {
  id: string;
  name: string;
  role: string;
};

type ChangeHistory = {
  id: number;
  user: string;
  changedAt: string;
  operationalHoursBefore: string;
  operationalHoursAfter: string;
  excludedUsersBefore: string;
  excludedUsersAfter: string;
  reason: string;
};

const tabs: AccessTab[] = [
  "Pengaturan Waktu Operasional",
  "Riwayat Perubahan",
];

const accessUsers: AccessUser[] = [
  { id: "admin", name: "Admin", role: "Administrator" },
  { id: "manager", name: "Manager Operasional", role: "Manager" },
  { id: "supervisor", name: "Supervisor", role: "Supervisor" },
];

const changeHistory: ChangeHistory[] = [
  {
    id: 1,
    user: "Admin",
    changedAt: "11-09-2026 09:47:00",
    operationalHoursBefore: "08:00 - 16:00",
    operationalHoursAfter: "08:00 - 17:00",
    excludedUsersBefore: "Admin",
    excludedUsersAfter: "Admin, Manager Operasional",
    reason: "Penyesuaian jam layanan operasional",
  },
  {
    id: 2,
    user: "Admin",
    changedAt: "10-09-2026 16:40:00",
    operationalHoursBefore: "07:30 - 16:00",
    operationalHoursAfter: "08:00 - 16:00",
    excludedUsersBefore: "Admin, Supervisor",
    excludedUsersAfter: "Admin",
    reason: "Mengikuti perubahan jadwal kerja cabang",
  },
  {
    id: 3,
    user: "Admin",
    changedAt: "09-09-2026 08:05:00",
    operationalHoursBefore: "08:00 - 15:30",
    operationalHoursAfter: "07:30 - 16:00",
    excludedUsersBefore: "Admin, Manager Operasional",
    excludedUsersAfter: "Admin, Supervisor",
    reason: "Penyesuaian waktu layanan pagi",
  },
  {
    id: 4,
    user: "Admin",
    changedAt: "08-09-2026 15:20:00",
    operationalHoursBefore: "08:00 - 16:00",
    operationalHoursAfter: "08:00 - 15:30",
    excludedUsersBefore: "Admin",
    excludedUsersAfter: "Admin, Supervisor",
    reason: "Evaluasi kebutuhan operasional harian",
  },
  {
    id: 5,
    user: "Admin",
    changedAt: "05-09-2026 08:15:00",
    operationalHoursBefore: "07:30 - 16:00",
    operationalHoursAfter: "08:00 - 16:00",
    excludedUsersBefore: "Admin, Supervisor",
    excludedUsersAfter: "Admin",
    reason: "Standarisasi jam operasional koperasi",
  },
  {
    id: 6,
    user: "Admin",
    changedAt: "01-09-2026 07:45:00",
    operationalHoursBefore: "07:00 - 15:30",
    operationalHoursAfter: "07:30 - 16:00",
    excludedUsersBefore: "Admin",
    excludedUsersAfter: "Admin, Manager Operasional",
    reason: "Penyesuaian dengan jam layanan anggota",
  },
];

const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, "0");
  const minute = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

const operationalDays = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
] as const;

type OperationalDay = (typeof operationalDays)[number];
type DailySchedule = Record<OperationalDay, { start: string; end: string }>;
type DailyStatus = Record<OperationalDay, boolean>;

const defaultDailySchedule: DailySchedule = {
  Senin: { start: "08:00", end: "16:00" },
  Selasa: { start: "08:00", end: "16:00" },
  Rabu: { start: "08:00", end: "16:00" },
  Kamis: { start: "08:00", end: "16:00" },
  Jumat: { start: "08:00", end: "16:00" },
  Sabtu: { start: "08:00", end: "13:00" },
  Minggu: { start: "08:00", end: "13:00" },
};

const defaultDailyStatus: DailyStatus = {
  Senin: true,
  Selasa: true,
  Rabu: true,
  Kamis: true,
  Jumat: true,
  Sabtu: true,
  Minggu: true,
};

function HistorySchedule({ value }: { value: string }) {
  return (
    <div className="min-w-[125px] space-y-1">
      {operationalDays.map((day) => (
        <div key={day} className="flex gap-2 whitespace-nowrap">
          <span className="font-medium text-[#61728c]">{day}:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}

function TimeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full appearance-none rounded-[6px] border border-slate-300 bg-white px-3 pr-10 text-[13px] font-normal text-slate-900 shadow-none outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
      >
        {timeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <Clock3 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

export default function ObsWaktuAksesOperasional() {
  const [activeTab, setActiveTab] = React.useState<AccessTab>(
    "Pengaturan Waktu Operasional",
  );
  const [dailySchedule, setDailySchedule] = React.useState<DailySchedule>(defaultDailySchedule);
  const [dailyStatus, setDailyStatus] = React.useState<DailyStatus>(defaultDailyStatus);
  const [scheduleOpen, setScheduleOpen] = React.useState(false);
  const [editingDay, setEditingDay] = React.useState<OperationalDay | null>(null);
  const [dayChangeReason, setDayChangeReason] = React.useState("");
  const [dayUserDropdown, setDayUserDropdown] = React.useState<"access" | "default" | null>(null);
  const [dayConfirmOpen, setDayConfirmOpen] = React.useState(false);
  const [daySuccessOpen, setDaySuccessOpen] = React.useState(false);
  const [changeReason, setChangeReason] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>(["admin"]);
  const [defaultAccessUsers, setDefaultAccessUsers] = React.useState<string[]>(["supervisor"]);
  const [historyPage, setHistoryPage] = React.useState(1);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const historyPageSize = 3;
  const historyPageCount = Math.ceil(changeHistory.length / historyPageSize);
  const visibleHistory = changeHistory.slice(
    (historyPage - 1) * historyPageSize,
    historyPage * historyPageSize,
  );

  function toggleUser(id: string) {
    setSelectedUsers((current) =>
      current.includes(id)
        ? current.filter((userId) => userId !== id)
        : [...current, id],
    );
  }

  function saveAccessSettings() {
    setConfirmOpen(true);
  }

  function confirmSaveAccessSettings() {
    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  function finishSaveAccessSettings() {
    setSuccessOpen(false);
    showSolidSuccess("Berhasil Menyimpan Waktu Operasional");
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <h1 className="text-[25px] font-extrabold leading-tight tracking-tight text-[#002060]">
          Waktu Operasional
        </h1>

        <div className="mt-8 overflow-x-auto">
          <div className="flex min-w-max items-center gap-4 pb-1 pl-1 md:gap-6">
            {tabs.map((value) => {
              const active = value === activeTab;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveTab(value)}
                  className={cn(
                    "inline-flex h-[49px] items-center rounded-full px-5 text-[12px] font-semibold transition",
                    active
                      ? "bg-[#635BFF] text-white"
                      : "bg-transparent text-[#53657d] hover:text-[#002060]",
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "Pengaturan Waktu Operasional" ? (
          <>
            <div className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
              <div className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white">
              <div className="flex min-h-[69px] items-center gap-4 border-b border-[#D7DEE9] bg-[#F7F8FC] px-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white">
                  <Clock3 className="h-5 w-5" />
                </span>
                <h2 className="text-[15px] font-bold text-black">
                  Pengaturan Waktu Operasional
                </h2>
              </div>

              <div className="border-b border-[#D7DEE9] px-4 py-5 md:px-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <span className="text-[12px] font-semibold text-[#17345f]">Waktu Operasional Harian</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScheduleOpen(true)}
                    className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-[7px] bg-[#635BFF] px-3 text-[12px] font-semibold text-white transition hover:bg-[#5149df]"
                  >
                    <Pencil className="h-4 w-4" />
                    Ubah Waktu Operasional Harian
                  </button>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {operationalDays.map((day) => (
                    <div key={day} className="rounded-[8px] border border-[#D7DEE9] bg-[#F8FAFD] px-3 py-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-[#17345f]">{day}</span>
                        <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-semibold", dailyStatus[day] ? "bg-[#E8F8E5] text-[#278b18]" : "bg-slate-200 text-slate-500")}>
                          {dailyStatus[day] ? "Aktif" : "Nonaktif"}
                        </span>
                      </div>
                      <p className="mt-2 text-[12px] font-medium text-slate-700">
                        {dailySchedule[day].start} <span className="text-slate-400">—</span> {dailySchedule[day].end}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setDayChangeReason("");
                          setEditingDay(day);
                        }}
                        className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#635BFF] hover:text-[#5149df]"
                      >
                        <Pencil className="h-3 w-3" />
                        Ubah
                      </button>
                    </div>
                  ))}
                </div>
              </div>

          </div>
          </div>

          <Dialog open={editingDay !== null} onOpenChange={(open) => !open && setEditingDay(null)}>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-[760px] rounded-[12px] border-slate-200 bg-white p-0 shadow-2xl">
              {editingDay && (
                <>
                  <div className="border-b border-[#D7DEE9] px-5 py-4">
                    <h3 className="text-[16px] font-bold text-[#17345f]">Ubah Operasional Harian</h3>
                  </div>
                  <div className="grid gap-4 px-5 py-5">
                    <div className="flex items-start gap-0">
                      <label className="w-[200px] shrink-0 pt-2 text-[12px] font-normal leading-tight text-black">Waktu Mulai Operasional</label>
                      <div className="min-w-0 flex-1"><TimeSelect value={dailySchedule[editingDay].start} onChange={(value) => setDailySchedule((current) => ({ ...current, [editingDay]: { ...current[editingDay], start: value } }))} /></div>
                    </div>
                    <div className="flex items-start gap-0">
                      <label className="w-[200px] shrink-0 pt-2 text-[12px] font-normal leading-tight text-black">Waktu Selesai Operasional</label>
                      <div className="min-w-0 flex-1"><TimeSelect value={dailySchedule[editingDay].end} onChange={(value) => setDailySchedule((current) => ({ ...current, [editingDay]: { ...current[editingDay], end: value } }))} /></div>
                    </div>
                    <div className="flex items-start gap-0">
                      <label className="w-[200px] shrink-0 pt-2 text-[12px] font-normal leading-tight text-black">User yang dapat mengakses<br />sistem di luar jam operasional</label>
                      <div className="relative min-w-0 flex-1">
                        <div className="flex min-h-9 cursor-pointer items-center gap-1.5 rounded-[6px] border border-slate-300 bg-white px-2 py-1.5" onClick={() => setDayUserDropdown(dayUserDropdown === "access" ? null : "access")}>
                          <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                            {selectedUsers.length === 0 ? <span className="px-1 text-[13px] text-slate-500">Pilih user</span> : selectedUsers.map((id) => {
                              const user = accessUsers.find((item) => item.id === id);
                              return user ? <span key={user.id} className="inline-flex h-7 items-center gap-2 bg-[#5543f5] px-2.5 text-[12px] font-normal text-white"><button type="button" onClick={(event) => { event.stopPropagation(); toggleUser(user.id); }} className="font-bold">×</button>{user.name}</span> : null;
                            })}
                          </div>
                          <X className="h-4 w-4 shrink-0 text-slate-900" />
                        </div>
                        {dayUserDropdown === "access" && <div className="absolute z-20 mt-1 w-full rounded-[6px] border border-slate-200 bg-white p-1.5 shadow-lg">
                          {accessUsers.map((user) => <button key={user.id} type="button" onClick={() => { toggleUser(user.id); setDayUserDropdown(null); }} className="flex w-full px-2.5 py-2 text-left text-[12px] text-slate-800 hover:bg-[#F1F4FA]">{user.name}</button>)}
                        </div>}
                      </div>
                    </div>
                    <div className="flex items-start gap-0">
                      <label className="w-[200px] shrink-0 pt-2 text-[12px] font-normal leading-tight text-black">User default yang dapat mengakses<br />di luar jam operasional</label>
                      <div className="relative min-w-0 flex-1">
                        <div className="flex min-h-9 cursor-pointer items-center gap-1.5 rounded-[6px] border border-slate-300 bg-white px-2 py-1.5" onClick={() => setDayUserDropdown(dayUserDropdown === "default" ? null : "default")}>
                          <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                            {defaultAccessUsers.length === 0 ? <span className="px-1 text-[13px] text-slate-500">Pilih user default</span> : defaultAccessUsers.map((id) => {
                              const user = accessUsers.find((item) => item.id === id);
                              return user ? <span key={user.id} className="inline-flex h-7 items-center gap-2 bg-[#5543f5] px-2.5 text-[12px] font-normal text-white"><button type="button" onClick={(event) => { event.stopPropagation(); setDefaultAccessUsers((current) => current.filter((userId) => userId !== user.id)); }} className="font-bold">×</button>{user.name}</span> : null;
                            })}
                          </div>
                          <X className="h-4 w-4 shrink-0 text-slate-900" />
                        </div>
                        {dayUserDropdown === "default" && <div className="absolute z-20 mt-1 w-full rounded-[6px] border border-slate-200 bg-white p-1.5 shadow-lg">
                          {accessUsers.map((user) => <button key={user.id} type="button" onClick={() => { setDefaultAccessUsers((current) => current.includes(user.id) ? current.filter((userId) => userId !== user.id) : [...current, user.id]); setDayUserDropdown(null); }} className="flex w-full px-2.5 py-2 text-left text-[12px] text-slate-800 hover:bg-[#F1F4FA]">{user.name}</button>)}
                        </div>}
                      </div>
                    </div>
                    <div className="flex items-start gap-0 px-3 py-2.5">
                      <span className="w-[200px] shrink-0 pt-1 text-[12px] font-normal text-black">Status operasional</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={dailyStatus[editingDay]}
                        aria-label={`${dailyStatus[editingDay] ? "Nonaktifkan" : "Aktifkan"} operasional ${editingDay}`}
                        onClick={() => setDailyStatus((current) => ({ ...current, [editingDay]: !current[editingDay] }))}
                        className={cn("relative inline-flex h-5 w-9 items-center rounded-full transition-colors", dailyStatus[editingDay] ? "bg-[#5543f5]" : "bg-slate-300")}
                      >
                        <span className={cn("inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform", dailyStatus[editingDay] ? "translate-x-4" : "translate-x-0.5")} />
                      </button>
                    </div>
                    <div className="flex items-start gap-0">
                      <label htmlFor="day-change-reason" className="w-[200px] shrink-0 pt-2 text-[12px] font-normal leading-tight text-black">Alasan Perubahan</label>
                      <textarea
                        id="day-change-reason"
                        value={dayChangeReason}
                        onChange={(event) => setDayChangeReason(event.target.value)}
                        placeholder="Masukkan alasan perubahan"
                        className="min-h-[76px] min-w-0 flex-1 resize-y rounded-[6px] border border-slate-300 bg-white px-3 py-2 text-[13px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 border-t border-[#D7DEE9] px-5 py-4">
                    <button type="button" onClick={() => { setDayUserDropdown(null); setEditingDay(null); }} className="inline-flex h-[32px] w-[100px] items-center justify-center gap-1.5 rounded-[6px] bg-[#8291ad] px-2 text-[12px] font-semibold text-white transition hover:bg-[#71819d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8291ad]/40"><X className="h-[16px] w-[16px]" strokeWidth={4} />Batalkan</button>
                    <button type="button" onClick={() => { setDayUserDropdown(null); setEditingDay(null); setDayConfirmOpen(true); }} className="inline-flex h-[32px] w-[100px] items-center justify-center gap-1.5 rounded-[6px] bg-[#28b900] px-2 text-[12px] font-semibold text-white transition hover:bg-[#20a000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28b900]/40"><CheckSquare className="h-[16px] w-[16px]" strokeWidth={3} />Simpan</button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={dayConfirmOpen} onOpenChange={setDayConfirmOpen}>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-[528px] rounded-[8px] border-slate-200 bg-white p-0 shadow-2xl [&>button]:hidden">
              <div className="px-8 pb-6 pt-8 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-4 border-[#f7c8a6] text-[38px] font-light text-[#f2b98f]">!</div>
                <h3 className="mt-5 text-[22px] font-extrabold text-[#3b4863]">Yakin menyimpan perubahan?</h3>
                <div className="mt-6 flex justify-center gap-2">
                  <button type="button" onClick={() => { setDayConfirmOpen(false); setDaySuccessOpen(true); }} className="h-10 rounded-[6px] bg-[#2f80ed] px-5 text-[13px] font-semibold text-white">Yes</button>
                  <button type="button" onClick={() => setDayConfirmOpen(false)} className="h-10 rounded-[6px] bg-[#8291ad] px-5 text-[13px] font-semibold text-white">Cancel</button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <LoanProductSaveSuccessModal
            open={daySuccessOpen}
            onOpenChange={setDaySuccessOpen}
            onOk={() => { setDaySuccessOpen(false); showSolidSuccess("Berhasil Menyimpan Perubahan Operasional"); }}
            message="Berhasil Menyimpan Perubahan Operasional"
          />

          <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-[760px] rounded-[12px] border-slate-200 bg-white p-0 shadow-2xl">
              <div className="border-b border-[#D7DEE9] bg-white px-5 py-4 sm:px-6">
                <h3 className="text-[16px] font-bold text-[#17345f]">Atur Waktu Operasional Harian</h3>
              </div>
              <div className="max-h-[65vh] overflow-y-auto px-5 py-4 sm:px-6">
                <div className="overflow-x-auto rounded-[6px] border border-[#D7DEE9]">
                  <table className="w-full min-w-[620px] text-left text-[12px]">
                    <thead className="bg-[#F7F8FC] text-[10px] uppercase tracking-[0.08em] text-[#61728c]">
                      <tr>
                        <th className="border-b border-[#D7DEE9] px-3 py-2 font-semibold">Hari</th>
                        <th className="border-b border-[#D7DEE9] px-3 py-2 font-semibold">Waktu Mulai Operasional</th>
                        <th className="border-b border-[#D7DEE9] px-3 py-2 font-semibold">Waktu Selesai Operasional</th>
                        <th className="border-b border-[#D7DEE9] px-3 py-2 text-center font-semibold">Aktif</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationalDays.map((day) => (
                        <tr key={day} className="bg-white">
                          <td className="border-b border-[#D7DEE9] px-3 py-2 font-medium text-black">{day}</td>
                          <td className="border-b border-[#D7DEE9] px-3 py-2"><TimeSelect value={dailySchedule[day].start} onChange={(value) => setDailySchedule((current) => ({ ...current, [day]: { ...current[day], start: value } }))} /></td>
                          <td className="border-b border-[#D7DEE9] px-3 py-2"><TimeSelect value={dailySchedule[day].end} onChange={(value) => setDailySchedule((current) => ({ ...current, [day]: { ...current[day], end: value } }))} /></td>
                          <td className="border-b border-[#D7DEE9] px-3 py-2 text-center">
                            <button
                              type="button"
                              role="switch"
                              aria-checked={dailyStatus[day]}
                              aria-label={`${dailyStatus[day] ? "Nonaktifkan" : "Aktifkan"} operasional ${day}`}
                              onClick={() => setDailyStatus((current) => ({ ...current, [day]: !current[day] }))}
                              className={cn("relative inline-flex h-5 w-9 items-center rounded-full transition-colors", dailyStatus[day] ? "bg-[#5543f5]" : "bg-slate-300")}
                            >
                              <span className={cn("inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform", dailyStatus[day] ? "translate-x-4" : "translate-x-0.5")} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-5 border-t border-[#D7DEE9] pt-4">
                <div className="flex items-center gap-3">
                  <label className="w-[180px] shrink-0 text-[12px] font-normal leading-tight text-black">User yang dapat mengakses sistem di luar jam operasional</label>
                  <Popover>
                      <PopoverTrigger asChild>
                        <div role="button" tabIndex={0} className="flex min-h-9 min-w-0 flex-1 items-center gap-1.5 rounded-[6px] border border-slate-300 bg-white px-2 py-1.5 text-left outline-none focus:ring-2 focus:ring-violet-200">
                          <span className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                            {selectedUsers.length > 0 ? selectedUsers.map((id) => {
                              const user = accessUsers.find((item) => item.id === id);
                              return user ? (
                                <span key={id} className="inline-flex items-center gap-2 rounded-none bg-[#5543f5] px-2.5 py-1.5 text-[11px] font-medium text-white">
                                  <button
                                    type="button"
                                    aria-label={`Hapus ${user.name}`}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      toggleUser(user.id);
                                    }}
                                    className="text-[12px] font-bold leading-none text-white hover:text-white/70"
                                  >
                                    ×
                                  </button>
                                  {user.name}
                                </span>
                              ) : null;
                            }) : <span className="px-1 text-[12px] text-slate-400">Pilih user</span>}
                          </span>
                          {selectedUsers.length > 0 ? <X className="h-4 w-4 shrink-0 text-slate-900" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] rounded-[6px] border-slate-200 bg-white p-1.5 shadow-lg">
                        {accessUsers.map((user) => (
                          <button key={user.id} type="button" onClick={() => toggleUser(user.id)} className="flex w-full items-center rounded-[4px] px-2.5 py-2 text-left text-[12px] text-slate-800 hover:bg-[#F1F4FA]">
                            {user.name}
                          </button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <label className="w-[180px] shrink-0 text-[12px] font-normal leading-tight text-black">User default yang dapat mengakses di luar jam operasional</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div role="button" tabIndex={0} className="flex min-h-9 min-w-0 flex-1 items-center gap-1.5 rounded-[6px] border border-slate-300 bg-white px-2 py-1.5 text-left outline-none focus:ring-2 focus:ring-violet-200">
                          <span className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                            {defaultAccessUsers.length > 0 ? defaultAccessUsers.map((id) => {
                              const user = accessUsers.find((item) => item.id === id);
                              return user ? (
                                <span key={id} className="inline-flex items-center gap-2 rounded-none bg-[#5543f5] px-2.5 py-1.5 text-[11px] font-medium text-white">
                                  <button
                                    type="button"
                                    aria-label={`Hapus ${user.name}`}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setDefaultAccessUsers((current) => current.filter((userId) => userId !== user.id));
                                    }}
                                    className="text-[12px] font-bold leading-none text-white hover:text-white/70"
                                  >
                                    ×
                                  </button>
                                  {user.name}
                                </span>
                              ) : null;
                            }) : <span className="px-1 text-[12px] text-slate-400">Pilih user default</span>}
                          </span>
                          {defaultAccessUsers.length > 0 ? <X className="h-4 w-4 shrink-0 text-slate-900" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] rounded-[6px] border-slate-200 bg-white p-1.5 shadow-lg">
                        {accessUsers.map((user) => (
                          <button key={user.id} type="button" onClick={() => setDefaultAccessUsers((current) => current.includes(user.id) ? current.filter((userId) => userId !== user.id) : [...current, user.id])} className="flex w-full items-center rounded-[4px] px-2.5 py-2 text-left text-[12px] text-slate-800 hover:bg-[#F1F4FA]">
                            {user.name}
                          </button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <label htmlFor="change-reason" className="w-[180px] shrink-0 pt-2 text-[12px] font-normal leading-tight text-black">Alasan Perubahan Jam Operasional</label>
                  <textarea
                    id="change-reason"
                    value={changeReason}
                    onChange={(event) => setChangeReason(event.target.value)}
                    placeholder="Masukkan alasan perubahan jam operasional"
                    className="min-h-[88px] min-w-0 flex-1 resize-y rounded-[6px] border border-slate-300 bg-white px-3 py-2 text-[13px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
                  />
                </div>
              </div>
              <div className="flex flex-col-reverse gap-3 border-t border-[#D7DEE9] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={() => setScheduleOpen(false)}
                  className="inline-flex h-[32px] w-[100px] items-center justify-center gap-1.5 rounded-[6px] bg-[#8291ad] px-2 text-[12px] font-semibold text-white transition hover:bg-[#71819d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8291ad]/40"
                >
                  <X className="h-[16px] w-[16px]" strokeWidth={4} />
                  Batalkan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setScheduleOpen(false);
                    setConfirmOpen(true);
                  }}
                  className="inline-flex h-[32px] w-[100px] items-center justify-center gap-1.5 rounded-[6px] bg-[#28b900] px-2 text-[12px] font-semibold text-white transition hover:bg-[#20a000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28b900]/40"
                >
                  <CheckSquare className="h-[16px] w-[16px]" strokeWidth={3} />
                  Simpan
                </button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-[528px] rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl [&>button]:hidden">
              <div className="px-8 pb-5 pt-10 text-center sm:px-10">
                <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6] bg-white">
                  <div className="text-[54px] font-light leading-none text-[#f2b98f]">!</div>
                </div>
                <div className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
                  <span>Yakin menyimpan waktu</span>
                  <br />
                  <span>operasional ?</span>
                </div>
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={confirmSaveAccessSettings}
                    className="h-[48px] w-[104px] rounded-[5px] bg-[#2f80ed] text-[16px] font-semibold text-white ring-2 ring-[#2f80ed]/35 transition hover:bg-[#266ed0] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2f80ed]/25"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmOpen(false)}
                    className="h-[48px] w-[126px] rounded-[5px] bg-[#a6a6a6] text-[16px] font-semibold text-white ring-2 ring-[#a6a6a6]/25 transition hover:bg-[#969696] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#a6a6a6]/25"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <LoanProductSaveSuccessModal
            open={successOpen}
            onOpenChange={setSuccessOpen}
            onOk={finishSaveAccessSettings}
            message="Berhasil Menyimpan Waktu Operasional"
          />
          </>
        ) : (
          <div className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
            <div className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white">
              <div className="flex min-h-[69px] items-center gap-4 bg-[#F7F8FC] px-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white">
                  <Clock3 className="h-5 w-5" />
                </span>
                <h2 className="text-[15px] font-bold text-black">Riwayat Perubahan</h2>
              </div>
              <div className="overflow-x-auto bg-white p-[5px]">
                <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left text-[11px]">
                  <thead>
                    <tr className="bg-white text-[9px] uppercase leading-tight tracking-[0.1em] text-[#61728c]">
                      <th className="w-[42px] whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5 font-semibold">No.</th>
                      <th className="w-[150px] border border-[#C9D3E3] px-2 py-1.5 font-semibold">User</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Tanggal dan Waktu Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Jam Operasional Sebelum Perubahan per Hari</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Jam Operasional Sesudah Perubahan per Hari</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User yang Dikecualikan Sebelum Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User yang Dikecualikan Sesudah Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Alasan Perubahan</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#17345f]">
                    {visibleHistory.map((change) => (
                      <tr key={change.id} className="border border-[#C9D3E3] bg-white hover:bg-[#FAFBFF]">
                        <td className="w-[42px] whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5">{change.id}</td>
                        <td className="w-[150px] border border-[#C9D3E3] px-2 py-1.5 font-medium">{change.user}</td>
                        <td className="whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5">{change.changedAt}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5 align-top"><HistorySchedule value={change.operationalHoursBefore} /></td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5 align-top"><HistorySchedule value={change.operationalHoursAfter} /></td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5">{change.excludedUsersBefore}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5">{change.excludedUsersAfter}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5">{change.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-3 border-t border-[#D7DEE9] px-4 py-3 text-[11px] text-[#61728c] sm:flex-row sm:items-center sm:justify-between">
                <span>Menampilkan {(historyPage - 1) * historyPageSize + 1}-{Math.min(historyPage * historyPageSize, changeHistory.length)} dari {changeHistory.length} riwayat</span>
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    aria-label="Halaman sebelumnya"
                    disabled={historyPage === 1}
                    onClick={() => setHistoryPage((page) => Math.max(1, page - 1))}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#C9D3E3] bg-white text-[#53657d] transition hover:bg-[#F1F4FA] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: historyPageCount }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      aria-label={`Halaman ${page}`}
                      aria-current={historyPage === page ? "page" : undefined}
                      onClick={() => setHistoryPage(page)}
                      className={cn(
                        "inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 font-semibold transition",
                        historyPage === page
                          ? "border-[#635BFF] bg-[#635BFF] text-white"
                          : "border-[#C9D3E3] bg-white text-[#53657d] hover:bg-[#F1F4FA]",
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-label="Halaman berikutnya"
                    disabled={historyPage === historyPageCount}
                    onClick={() => setHistoryPage((page) => Math.min(historyPageCount, page + 1))}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#C9D3E3] bg-white text-[#53657d] transition hover:bg-[#F1F4FA] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
