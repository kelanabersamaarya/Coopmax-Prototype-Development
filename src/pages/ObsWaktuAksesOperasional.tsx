import * as React from "react";
import { CheckSquare, ChevronDown, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";
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
    user: "Manager Operasional",
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
    user: "Supervisor",
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
    user: "Manager Operasional",
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

const defaultDailySchedule: DailySchedule = {
  Senin: { start: "08:00", end: "16:00" },
  Selasa: { start: "08:00", end: "16:00" },
  Rabu: { start: "08:00", end: "16:00" },
  Kamis: { start: "08:00", end: "16:00" },
  Jumat: { start: "08:00", end: "16:00" },
  Sabtu: { start: "08:00", end: "13:00" },
  Minggu: { start: "08:00", end: "13:00" },
};

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
  const [scheduleOpen, setScheduleOpen] = React.useState(false);
  const [changeReason, setChangeReason] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>(["admin"]);
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

              <div className="flex items-center justify-between gap-4 border-b border-[#D7DEE9] px-4 py-4 md:px-5">
                <div>
                  <span className="text-[12px] font-semibold text-black">Waktu Operasional Harian</span>
                  <p className="mt-1 text-[11px] text-slate-500">Jam operasional dapat disesuaikan untuk setiap hari.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setScheduleOpen(true)}
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[6px] bg-[#635BFF] px-3 text-[12px] font-semibold text-white transition hover:bg-[#5149df]"
                >
                  <Clock3 className="h-4 w-4" />
                  Atur Jadwal
                </button>
              </div>

              <div className="grid min-h-[86px] items-center gap-3 border-b border-[#D7DEE9] px-4 py-4 text-[12px] md:grid-cols-[minmax(0,1fr)_390px] md:px-5 md:py-2">
                <span className="font-normal text-black">
                  User yang dapat mengakses sistem di luar jam operasional
                </span>

                <div>
                  <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex min-h-9 w-full cursor-pointer items-center gap-1.5 rounded-[6px] border border-slate-300 bg-white px-2 py-1.5 shadow-none focus-within:ring-2 focus-within:ring-violet-200">
                      <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                        {selectedUsers.length === 0 ? (
                          <span className="px-1 text-[13px] text-slate-500">Pilih user</span>
                        ) : (
                          selectedUsers.map((id) => {
                            const user = accessUsers.find((item) => item.id === id);
                            if (!user) return null;

                            return (
                              <span
                                key={user.id}
                                className="inline-flex h-7 items-center gap-2 bg-[#5543f5] px-2.5 text-[12px] font-normal text-white"
                              >
                                <button
                                  type="button"
                                  aria-label={`Hapus ${user.name}`}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    toggleUser(user.id);
                                  }}
                                  className="text-[14px] font-semibold leading-none text-white/70 hover:text-white"
                                >
                                  ×
                                </button>
                                {user.name}
                              </span>
                            );
                          })
                        )}
                      </div>
                      {selectedUsers.length > 0 ? (
                        <button
                          type="button"
                          aria-label="Hapus semua user"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedUsers([]);
                          }}
                          className="ml-auto shrink-0 px-2 text-slate-900 hover:text-violet-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      ) : (
                        <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-slate-500" />
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] rounded-none border-slate-200 bg-white p-1.5 shadow-lg">
                    {accessUsers.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => toggleUser(user.id)}
                        className="flex min-h-9 w-full items-center bg-white px-2.5 py-2 text-left text-[13px] font-normal text-slate-900 transition hover:bg-[#2563eb] hover:text-white"
                      >
                        {user.name}
                      </button>
                    ))}
                  </PopoverContent>
                  </Popover>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Pilih satu atau beberapa user yang tetap diizinkan masuk ke sistem.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={saveAccessSettings}
                className="inline-flex h-7 w-[90px] items-center justify-center gap-1.5 rounded-[6px] border border-[#2fb300] bg-[#2fb300] px-2 text-[11px] font-bold tracking-tight text-white shadow-sm transition hover:bg-[#279800] focus:outline-none focus:ring-4 focus:ring-[#2fb300]/25"
              >
                <CheckSquare className="h-4 w-4" strokeWidth={3} />
                Simpan
              </button>
            </div>
          </div>

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
                      </tr>
                    </thead>
                    <tbody>
                      {operationalDays.map((day) => (
                        <tr key={day} className="bg-white">
                          <td className="border-b border-[#D7DEE9] px-3 py-2 font-medium text-black">{day}</td>
                          <td className="border-b border-[#D7DEE9] px-3 py-2"><TimeSelect value={dailySchedule[day].start} onChange={(value) => setDailySchedule((current) => ({ ...current, [day]: { ...current[day], start: value } }))} /></td>
                          <td className="border-b border-[#D7DEE9] px-3 py-2"><TimeSelect value={dailySchedule[day].end} onChange={(value) => setDailySchedule((current) => ({ ...current, [day]: { ...current[day], end: value } }))} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <label htmlFor="change-reason" className="text-[12px] font-semibold text-black">Alasan Perubahan Jam Operasional</label>
                  <textarea
                    id="change-reason"
                    value={changeReason}
                    onChange={(event) => setChangeReason(event.target.value)}
                    placeholder="Masukkan alasan perubahan jam operasional"
                    className="mt-2 min-h-[88px] w-full resize-y rounded-[6px] border border-slate-300 bg-white px-3 py-2 text-[13px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 border-t border-[#D7DEE9] px-5 py-4 sm:px-6">
                <button type="button" onClick={() => setScheduleOpen(false)} className="h-9 rounded-[6px] border border-slate-300 bg-white px-4 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-50">Batal</button>
                <button type="button" onClick={() => setScheduleOpen(false)} className="h-9 rounded-[6px] bg-[#2fb300] px-4 text-[12px] font-bold text-white transition hover:bg-[#279800]">Simpan Jadwal</button>
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
                      <th className="whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5 font-semibold">No.</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Tanggal dan Waktu Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Jam Operasional Sebelum Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Jam Operasional Sesudah Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User yang Dikecualikan Sebelum Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User yang Dikecualikan Sesudah Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Alasan Perubahan</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#17345f]">
                    {visibleHistory.map((change) => (
                      <tr key={change.id} className="border border-[#C9D3E3] bg-white hover:bg-[#FAFBFF]">
                        <td className="whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5">{change.id}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5 font-medium">{change.user}</td>
                        <td className="whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5">{change.changedAt}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5">{change.operationalHoursBefore}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5">{change.operationalHoursAfter}</td>
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
