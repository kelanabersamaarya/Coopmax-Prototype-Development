import * as React from "react";
import { CheckSquare, ChevronDown, ChevronRight, Clock3, Pencil, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoanProductSaveSuccessModal from "@/components/loans/products/LoanProductSaveSuccessModal";
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
    <div className="min-w-[145px]">
      {operationalDays.map((day, index) => (
        <div
          key={day}
          className={cn(
            "flex min-h-[28px] items-center gap-2 whitespace-nowrap py-1",
            index < operationalDays.length - 1 && "border-b border-[#E1E7F0]",
          )}
        >
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
  const [editStep, setEditStep] = React.useState<1 | 2>(1);
  const [dayChangeReason, setDayChangeReason] = React.useState("");
  const [dayConfirmOpen, setDayConfirmOpen] = React.useState(false);
  const [daySuccessOpen, setDaySuccessOpen] = React.useState(false);
  const [changeReason, setChangeReason] = React.useState("");
  const [historyPage, setHistoryPage] = React.useState(1);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const historyPageSize = 5;
  const dailyHistory = changeHistory.flatMap((change) =>
    operationalDays.map((day) => ({ change, day })),
  );
  const historyPageCount = Math.ceil(dailyHistory.length / historyPageSize);
  const visibleHistory = dailyHistory.slice(
    (historyPage - 1) * historyPageSize,
    historyPage * historyPageSize,
  );

  function saveAccessSettings() {
    setConfirmOpen(true);
  }

  function confirmSaveAccessSettings() {
    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  function finishSaveAccessSettings() {
    setSuccessOpen(false);
    setScheduleOpen(false);
    setEditingDay(null);
    setEditStep(1);
    setDayChangeReason("");
    setActiveTab("Pengaturan Waktu Operasional");
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
                  Waktu Operasional Harian
                </h2>
              </div>

              <div className="border-b border-[#D7DEE9] px-4 py-5 md:px-5">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
                          setEditStep(1);
                          setEditingDay(day);
                        }}
                        className="mt-2 inline-flex h-7 items-center gap-1 rounded-[5px] bg-[#4169f5] px-2.5 text-[10px] font-semibold text-white transition hover:bg-[#3157d8]"
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
                    <div className="mt-4 -mx-5 border-t border-[#D7DEE9] pt-4">
                    <div className="flex items-start px-5 text-[10px] font-semibold">
                      <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                        <span className={cn("flex h-9 w-9 items-center justify-center rounded-full text-[14px]", editStep === 1 ? "bg-[#2864e8] text-white" : "bg-[#eef2f7] text-[#63738c]")}>1</span>
                        <span className={cn("mt-2", editStep === 1 ? "text-[#17345f]" : "text-[#63738c]")}>Waktu Operasional</span>
                      </div>
                      <div className="mt-[18px] h-[2px] flex-1 bg-[#e4eaf2]" />
                      <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                        <span className={cn("flex h-9 w-9 items-center justify-center rounded-full text-[14px]", editStep === 2 ? "bg-[#2864e8] text-white" : "bg-[#eef2f7] text-[#63738c]")}>2</span>
                        <span className={cn("mt-2", editStep === 2 ? "text-[#17345f]" : "text-[#63738c]")}>Alasan Perubahan</span>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="grid gap-4 px-5 py-5">
                    {editStep === 1 ? (
                      <>
                    <div className="flex items-start gap-0 py-2.5">
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
                      <label className="w-[200px] shrink-0 pt-2 text-[12px] font-normal leading-tight text-black">Waktu Mulai Operasional</label>
                      <div className="min-w-0 flex-1"><TimeSelect value={dailySchedule[editingDay].start} onChange={(value) => setDailySchedule((current) => ({ ...current, [editingDay]: { ...current[editingDay], start: value } }))} /></div>
                    </div>
                    <div className="flex items-start gap-0">
                      <label className="w-[200px] shrink-0 pt-2 text-[12px] font-normal leading-tight text-black">Waktu Selesai Operasional</label>
                      <div className="min-w-0 flex-1"><TimeSelect value={dailySchedule[editingDay].end} onChange={(value) => setDailySchedule((current) => ({ ...current, [editingDay]: { ...current[editingDay], end: value } }))} /></div>
                    </div>
                      </>
                    ) : (
                      <div className="flex items-start gap-0">
                        <label htmlFor="day-change-reason" className="w-[200px] shrink-0 pt-2 text-[12px] font-normal leading-tight text-black">Alasan Perubahan <span className="text-red-500">*</span></label>
                        <textarea
                          id="day-change-reason"
                          required
                          value={dayChangeReason}
                          onChange={(event) => setDayChangeReason(event.target.value)}
                          placeholder="Masukkan alasan perubahan"
                          className="min-h-[120px] min-w-0 flex-1 resize-y rounded-[6px] border border-slate-300 bg-white px-3 py-2 text-[13px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 border-t border-[#D7DEE9] px-5 py-4">
                    {editStep === 2 ? (
                      <button type="button" onClick={() => setEditStep(1)} className="mr-auto inline-flex h-[32px] w-[100px] items-center justify-center rounded-[6px] border border-[#8291ad] bg-transparent px-2 text-[12px] font-semibold text-[#8291ad] transition hover:bg-slate-50">Kembali</button>
                    ) : null}
                    <button type="button" onClick={() => setEditingDay(null)} className="inline-flex h-[32px] w-[100px] items-center justify-center gap-1.5 rounded-[6px] bg-[#8291ad] px-2 text-[12px] font-semibold text-white transition hover:bg-[#71819d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8291ad]/40"><X className="h-[16px] w-[16px]" strokeWidth={4} />Batalkan</button>
                    {editStep === 1 ? (
                      <button type="button" onClick={() => setEditStep(2)} className="inline-flex h-[32px] min-w-[112px] items-center justify-center gap-1.5 rounded-[6px] bg-[#4169f5] px-3 text-[12px] font-semibold text-white transition hover:bg-[#3157d8]">Lanjutkan<ChevronRight className="h-4 w-4" /></button>
                    ) : (
                      <button type="button" disabled={!dayChangeReason.trim()} onClick={() => setDayConfirmOpen(true)} className="inline-flex h-[32px] w-[100px] items-center justify-center gap-1.5 rounded-[6px] bg-[#28b900] px-2 text-[12px] font-semibold text-white transition hover:bg-[#20a000] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28b900]/40"><CheckSquare className="h-[16px] w-[16px]" strokeWidth={3} />Simpan</button>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={dayConfirmOpen} onOpenChange={setDayConfirmOpen}>
            <DialogContent className="h-[260px] w-[calc(100vw-2rem)] max-w-[400px] rounded-[8px] border-slate-200 bg-white p-0 shadow-2xl [&>button]:hidden">
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mx-auto grid h-[68px] w-[68px] place-items-center rounded-full border-4 border-[#f7c8a6] text-[40px] font-light leading-none text-[#f2b98f]">!</div>
                <h3 className="mt-5 text-[22px] font-extrabold leading-tight text-[#3b4863]">Yakin menyimpan perubahan?</h3>
                <div className="mt-6 flex justify-center gap-2">
                  <button type="button" onClick={() => { setDayConfirmOpen(false); setDaySuccessOpen(true); }} className="h-[44px] min-w-[80px] rounded-[6px] bg-[#2f80ed] px-5 text-[14px] font-semibold text-white transition hover:bg-[#266ed0]">Yes</button>
                  <button type="button" onClick={() => { setDayConfirmOpen(false); setEditingDay(editingDay); setEditStep(2); }} className="h-[44px] min-w-[90px] rounded-[6px] bg-[#8291ad] px-5 text-[14px] font-semibold text-white transition hover:bg-[#71819d]">Cancel</button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <LoanProductSaveSuccessModal
            open={daySuccessOpen}
            onOpenChange={setDaySuccessOpen}
            onOk={() => {
              setDaySuccessOpen(false);
              setEditingDay(null);
              setEditStep(1);
              setDayChangeReason("");
            }}
            message="Berhasil Menyimpan Data"
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
            <DialogContent className="h-[260px] w-[calc(100vw-2rem)] max-w-[400px] rounded-[8px] border-slate-200 bg-white p-0 shadow-2xl [&>button]:hidden">
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mx-auto grid h-[68px] w-[68px] place-items-center rounded-full border-4 border-[#f7c8a6] text-[40px] font-light leading-none text-[#f2b98f]">!</div>
                <div className="mt-5 text-[22px] font-extrabold leading-tight text-[#3b4863]">
                  Yakin Menyimpan Perubahan?
                </div>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={confirmSaveAccessSettings}
                    className="h-[44px] w-[80px] rounded-[6px] bg-[#2f80ed] text-[14px] font-semibold text-white transition hover:bg-[#266ed0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f80ed]/25"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmOpen(false)}
                    className="h-[44px] w-[90px] rounded-[6px] bg-[#8291ad] text-[14px] font-semibold text-white transition hover:bg-[#71819d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8291ad]/25"
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
            message="Berhasil Menyimpan Data"
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
                      <th className="w-[90px] border border-[#C9D3E3] px-2 py-1.5 font-semibold">User</th>
                      <th className="w-[135px] border border-[#C9D3E3] px-2 py-1.5 font-semibold">Tanggal dan Waktu Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Jam Operasional Sebelum Perubahan per Hari</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Jam Operasional Sesudah Perubahan per Hari</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User yang Dikecualikan Sebelum Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User yang Dikecualikan Sesudah Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Alasan Perubahan</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12px] text-[#17345f]">
                    {visibleHistory.map(({ change, day }, index) => (
                        <tr key={`${change.id}-${day}`} className="border border-[#C9D3E3] bg-white hover:bg-[#FAFBFF]">
                          <td className="w-[42px] whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5">{(historyPage - 1) * historyPageSize + index + 1}</td>
                          <td className="w-[90px] border border-[#C9D3E3] px-2 py-1.5 font-medium">{change.user}</td>
                          <td className="w-[135px] whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5">{change.changedAt}</td>
                          <td className="border border-[#C9D3E3] px-2 py-1.5 whitespace-nowrap"><span className="font-medium text-[#61728c]">{day}:</span> {change.operationalHoursBefore}</td>
                          <td className="border border-[#C9D3E3] px-2 py-1.5 whitespace-nowrap"><span className="font-medium text-[#61728c]">{day}:</span> {change.operationalHoursAfter}</td>
                          <td className="border border-[#C9D3E3] px-2 py-1.5">{change.excludedUsersBefore}</td>
                          <td className="border border-[#C9D3E3] px-2 py-1.5">{change.excludedUsersAfter}</td>
                          <td className="border border-[#C9D3E3] px-2 py-1.5">{change.reason}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-3 border-t border-[#D7DEE9] px-4 py-3 text-[11px] text-[#61728c] sm:flex-row sm:items-center sm:justify-between">
                <span>Menampilkan {(historyPage - 1) * historyPageSize + 1}-{Math.min(historyPage * historyPageSize, dailyHistory.length)} dari {dailyHistory.length} data</span>
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <button
                    type="button"
                    aria-label="Halaman sebelumnya"
                    disabled={historyPage === 1}
                    onClick={() => setHistoryPage((page) => Math.max(1, page - 1))}
                    className="inline-flex h-8 min-w-[120px] items-center justify-center rounded-[3px] bg-[#e9edf3] px-3 text-[14px] font-medium text-[#c5cedb] transition hover:bg-[#dde4ed] disabled:cursor-not-allowed disabled:opacity-100"
                  >
                    Sebelumnya
                  </button>
                  {Array.from({ length: historyPageCount > 6 ? 5 : historyPageCount }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      aria-label={`Halaman ${page}`}
                      aria-current={historyPage === page ? "page" : undefined}
                      onClick={() => setHistoryPage(page)}
                      className={cn(
                        "inline-flex h-8 min-w-[30px] items-center justify-center rounded-[2px] px-2 text-[14px] font-medium transition",
                        historyPage === page
                          ? "bg-[#5a46f5] text-white"
                          : "bg-[#e1e6ed] text-[#26364c] hover:bg-[#d5dce6]",
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  {historyPageCount > 6 ? (
                    <>
                      <span className="inline-flex h-8 min-w-[30px] items-center justify-center text-[14px] text-[#26364c]">...</span>
                      <button
                        type="button"
                        aria-label={`Halaman ${historyPageCount}`}
                        aria-current={historyPage === historyPageCount ? "page" : undefined}
                        onClick={() => setHistoryPage(historyPageCount)}
                        className={cn(
                          "inline-flex h-8 min-w-[40px] items-center justify-center rounded-[2px] px-2 text-[14px] font-medium transition",
                          historyPage === historyPageCount ? "bg-[#5a46f5] text-white" : "bg-[#e1e6ed] text-[#26364c] hover:bg-[#d5dce6]",
                        )}
                      >
                        {historyPageCount}
                      </button>
                    </>
                  ) : null}
                  <button
                    type="button"
                    aria-label="Halaman berikutnya"
                    disabled={historyPage === historyPageCount}
                    onClick={() => setHistoryPage((page) => Math.min(historyPageCount, page + 1))}
                    className="inline-flex h-8 min-w-[120px] items-center justify-center rounded-[3px] bg-[#e1e6ed] px-3 text-[14px] font-medium text-[#26364c] transition hover:bg-[#d5dce6] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Selanjutnya
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
