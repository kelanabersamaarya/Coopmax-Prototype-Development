import * as React from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
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

        <div className="mt-8 rounded-[5px] border border-[#D7DEE9] bg-white p-4 shadow-sm md:p-6">
          {activeTab === "Pengaturan Waktu Akses" ? (
            <div>
              <div className="grid gap-5 border-b border-[#D7DEE9] py-5 md:grid-cols-2">
                <label className="space-y-2 text-[12px] font-semibold text-slate-800">
                  <span>Waktu Mulai Operasional</span>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    className="h-10 rounded-[6px] border-slate-300 text-[13px] font-normal shadow-none focus-visible:ring-0"
                  />
                </label>

                <label className="space-y-2 text-[12px] font-semibold text-slate-800">
                  <span>Waktu Selesai Operasional</span>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                    className="h-10 rounded-[6px] border-slate-300 text-[13px] font-normal shadow-none focus-visible:ring-0"
                  />
                </label>
              </div>

              <div className="pt-5">
                <h3 className="text-[13px] font-bold text-slate-900">
                  User yang dapat mengakses sistem di luar jam operasional
                </h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="mt-4 flex h-10 w-full items-center justify-between rounded-[6px] border border-slate-300 bg-white px-3 text-left text-[13px] font-normal text-slate-800 shadow-none transition hover:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
                    >
                      <span className="truncate">
                        {selectedUsers.length === 0
                          ? "Pilih user"
                          : selectedUsers
                              .map(
                                (id) =>
                                  accessUsers.find((user) => user.id === id)?.name,
                              )
                              .filter(Boolean)
                              .join(", ")}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] rounded-none border-slate-200 bg-white p-1.5 shadow-lg">
                    <div>
                      {accessUsers.map((user) => {
                        const selected = selectedUsers.includes(user.id);

                        return (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => toggleUser(user.id)}
                            className={cn(
                              "flex min-h-9 w-full items-center px-2.5 py-2 text-left text-[13px] font-normal transition",
                              selected
                                ? "bg-[#2563eb] text-white"
                                : "bg-white text-slate-900 hover:bg-slate-100",
                            )}
                          >
                            {user.name}
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
                <p className="mt-2 text-[12px] text-slate-600">
                  Pilih satu atau beberapa user yang tetap diizinkan masuk ke sistem.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={saveAccessSettings}
                  className="inline-flex h-9 items-center justify-center rounded-[6px] bg-[#2fb300] px-4 text-[12px] font-bold text-white ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]"
                >
                  Simpan Pengaturan
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-[15px] font-bold text-black">
                Riwayat Perubahan
              </h2>
              <p className="mt-2 text-[12px] text-slate-600">
                Riwayat perubahan waktu akses operasional akan ditampilkan di sini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
