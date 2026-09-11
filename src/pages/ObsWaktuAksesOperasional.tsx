import * as React from "react";
import { Clock3, History } from "lucide-react";
import { cn } from "@/lib/utils";

type AccessTab = "Pengaturan Waktu Akses" | "Riwayat Perubahan";

const tabs: Array<{ value: AccessTab; icon: typeof Clock3 }> = [
  { value: "Pengaturan Waktu Akses", icon: Clock3 },
  { value: "Riwayat Perubahan", icon: History },
];

export default function ObsWaktuAksesOperasional() {
  const [activeTab, setActiveTab] = React.useState<AccessTab>(
    "Pengaturan Waktu Akses",
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-1">
          <h1 className="text-[25px] font-extrabold leading-tight tracking-tight text-[#002060]">
            Waktu Akses Operasional
          </h1>
        </div>

        <div className="mt-8 overflow-x-auto">
          <div className="flex min-w-max items-center gap-4 pb-1 pl-1 md:gap-6">
            {tabs.map(({ value, icon: Icon }) => {
              const active = value === activeTab;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveTab(value)}
                  className={cn(
                    "inline-flex h-[49px] items-center gap-2 rounded-full px-5 text-[12px] font-semibold transition",
                    active
                      ? "bg-[#635BFF] text-white"
                      : "bg-transparent text-[#53657d] hover:text-[#002060]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-[5px] border border-[#D7DEE9] bg-white p-6 shadow-sm">
          {activeTab === "Pengaturan Waktu Akses" ? (
            <div>
              <h2 className="text-[15px] font-bold text-black">
                Pengaturan Waktu Akses
              </h2>
              <p className="mt-2 text-[12px] text-slate-600">
                Atur waktu akses operasional untuk modul Kebutuhan Koperasi Samudra Harta.
              </p>
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
