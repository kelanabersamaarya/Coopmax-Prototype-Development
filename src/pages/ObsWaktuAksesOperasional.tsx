import * as React from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
                <p className="mt-1 text-[12px] text-slate-600">
                  Pilih satu atau beberapa user yang tetap diizinkan masuk ke sistem.
                </p>

                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {accessUsers.map((user) => (
                    <label
                      key={user.id}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-violet-300 hover:bg-violet-50/50"
                    >
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleUser(user.id)}
                      />
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold text-slate-900">
                          {user.name}
                        </span>
                        <span className="block text-[11px] text-slate-500">
                          {user.role}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
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
