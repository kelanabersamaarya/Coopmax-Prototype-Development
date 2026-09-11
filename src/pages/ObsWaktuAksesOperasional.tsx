import * as React from "react";
import { CheckSquare, Clock3, X } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  operationalHoursBefore: string;
  operationalHoursAfter: string;
  excludedUsersBefore: string;
  excludedUsersAfter: string;
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
    operationalHoursBefore: "08:00 - 16:00",
    operationalHoursAfter: "08:00 - 17:00",
    excludedUsersBefore: "Admin",
    excludedUsersAfter: "Admin, Manager Operasional",
  },
  {
    id: 2,
    user: "Manager Operasional",
    operationalHoursBefore: "07:30 - 16:00",
    operationalHoursAfter: "08:00 - 16:00",
    excludedUsersBefore: "Admin, Supervisor",
    excludedUsersAfter: "Admin",
  },
  {
    id: 3,
    user: "Admin",
    operationalHoursBefore: "08:00 - 15:30",
    operationalHoursAfter: "07:30 - 16:00",
    excludedUsersBefore: "Admin, Manager Operasional",
    excludedUsersAfter: "Admin, Supervisor",
  },
];

const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, "0");
  const minute = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

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
  const [startTime, setStartTime] = React.useState("08:00");
  const [endTime, setEndTime] = React.useState("16:00");
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>(["admin"]);

  function toggleUser(id: string) {
    setSelectedUsers((current) =>
      current.includes(id)
        ? current.filter((userId) => userId !== id)
        : [...current, id],
    );
  }

  function saveAccessSettings() {
    toast.success("Pengaturan waktu akses tersimpan", {
      description: `Operasional aktif pukul ${startTime} sampai ${endTime}.`,
    });
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

              <div className="grid min-h-[66px] items-center gap-3 border-b border-[#D7DEE9] px-4 py-4 text-[12px] md:grid-cols-[minmax(0,1fr)_390px] md:px-5 md:py-2">
                <span className="font-normal text-black">Waktu Mulai Operasional</span>
                <TimeSelect value={startTime} onChange={setStartTime} />
              </div>

              <div className="grid min-h-[66px] items-center gap-3 border-b border-[#D7DEE9] px-4 py-4 text-[12px] md:grid-cols-[minmax(0,1fr)_390px] md:px-5 md:py-2">
                <span className="font-normal text-black">Waktu Selesai Operasional</span>
                <TimeSelect value={endTime} onChange={setEndTime} />
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
                      ) : null}
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
        ) : (
          <div className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
            <div className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white">
              <div className="flex min-h-[69px] items-center gap-4 border-b border-[#D7DEE9] bg-[#F7F8FC] px-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white">
                  <Clock3 className="h-5 w-5" />
                </span>
                <h2 className="text-[15px] font-bold text-black">Riwayat Perubahan</h2>
              </div>
              <div className="overflow-x-auto rounded-[4px] border border-[#C9D3E3] bg-white">
                <table className="w-full min-w-[900px] border-collapse text-left text-[11px]">
                  <thead>
                    <tr className="border border-[#C9D3E3] bg-white text-[9px] uppercase leading-tight tracking-[0.1em] text-[#61728c]">
                      <th className="whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5 font-semibold">No.</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Jam Operasional Sebelum Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">Jam Operasional Sesudah Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User yang Dikecualikan Sebelum Perubahan</th>
                      <th className="border border-[#C9D3E3] px-2 py-1.5 font-semibold">User yang Dikecualikan Sesudah Perubahan</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#17345f]">
                    {changeHistory.map((change) => (
                      <tr key={change.id} className="border border-[#C9D3E3] bg-white hover:bg-[#FAFBFF]">
                        <td className="whitespace-nowrap border border-[#C9D3E3] px-2 py-1.5">{change.id}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5 font-medium">{change.user}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5">{change.operationalHoursBefore}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5">{change.operationalHoursAfter}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5">{change.excludedUsersBefore}</td>
                        <td className="border border-[#C9D3E3] px-2 py-1.5">{change.excludedUsersAfter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
