import * as React from "react";
import { CheckSquare, Clock3, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type AccessTab = "Pengaturan Waktu Akses" | "Riwayat Perubahan";

type AccessUser = {
  id: string;
  name: string;
  role: string;
};

const tabs: AccessTab[] = [
  "Pengaturan Waktu Akses",
  "Riwayat Perubahan",
];

const accessUsers: AccessUser[] = [
  { id: "admin", name: "Admin", role: "Administrator" },
  { id: "manager", name: "Manager Operasional", role: "Manager" },
  { id: "supervisor", name: "Supervisor", role: "Supervisor" },
];

export default function ObsWaktuAksesOperasional() {
  const [activeTab, setActiveTab] = React.useState<AccessTab>(
    "Pengaturan Waktu Akses",
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
          Waktu Akses Operasional
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

        {activeTab === "Pengaturan Waktu Akses" ? (
          <div className="mt-8 rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
            <div className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white">
              <div className="flex min-h-[69px] items-center gap-4 border-b border-[#D7DEE9] bg-[#F7F8FC] px-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4169f5] text-white">
                  <Clock3 className="h-5 w-5" />
                </span>
                <h2 className="text-[15px] font-bold text-black">
                  Pengaturan Waktu Akses
                </h2>
              </div>

            <div className="grid min-h-[66px] items-center gap-3 border-b border-[#D7DEE9] px-4 py-4 text-[12px] md:grid-cols-[minmax(0,1fr)_390px] md:px-5 md:py-2">
              <span className="font-normal text-black">Waktu Mulai Operasional</span>
              <Input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="h-9 rounded-[6px] border-slate-300 text-[13px] font-normal shadow-none focus-visible:ring-0"
              />
            </div>

            <div className="grid min-h-[66px] items-center gap-3 border-b border-[#D7DEE9] px-4 py-4 text-[12px] md:grid-cols-[minmax(0,1fr)_390px] md:px-5 md:py-2">
              <span className="font-normal text-black">Waktu Selesai Operasional</span>
              <Input
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="h-9 rounded-[6px] border-slate-300 text-[13px] font-normal shadow-none focus-visible:ring-0"
              />
            </div>

            <div className="grid min-h-[86px] items-center gap-3 border-b border-[#D7DEE9] px-4 py-4 text-[12px] md:grid-cols-[minmax(0,1fr)_390px] md:px-5 md:py-2">
              <div>
                <span className="font-normal text-black">
                  User yang dapat mengakses sistem di luar jam operasional
                </span>
                <p className="mt-1 text-[11px] text-slate-500">
                  Pilih satu atau beberapa user yang tetap diizinkan masuk ke sistem.
                </p>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex min-h-9 w-full cursor-pointer items-center gap-1.5 rounded-[6px] border border-slate-300 bg-white px-2 py-1.5 shadow-none focus-within:ring-2 focus-within:ring-violet-200">
                    <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                      {selectedUsers.length === 0 ? (
                        <span className="px-1 text-[13px] text-slate-500">
                          Pilih user
                        </span>
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
                        onClick={() => setSelectedUsers([])}
                        className="ml-auto shrink-0 px-2 text-slate-900 hover:text-violet-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] rounded-none border-slate-200 bg-white p-1.5 shadow-lg">
                  <div>
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
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={saveAccessSettings}
              className="inline-flex h-[62px] items-center justify-center gap-2 rounded-[15px] border-2 border-[#8bd66b] bg-[#20bd00] px-9 text-[20px] font-bold text-white shadow-sm transition hover:bg-[#1baa00] focus:outline-none focus:ring-4 focus:ring-[#20bd00]/25"
            >
              <CheckSquare className="h-8 w-8" strokeWidth={3} />
              Simpan
            </button>
          </div>
        </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white shadow-sm">
            <div className="flex min-h-[69px] items-center border-b border-[#D7DEE9] bg-[#F7F8FC] px-5">
              <h2 className="text-[15px] font-bold text-black">Riwayat Perubahan</h2>
            </div>
            <div className="px-5 py-6 text-[12px] text-slate-600">
              Riwayat perubahan waktu akses operasional akan ditampilkan di sini.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
