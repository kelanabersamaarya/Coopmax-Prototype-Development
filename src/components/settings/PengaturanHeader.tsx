"use client";

import { cn } from "@/lib/utils";

const tabs = [
  "Sinkronisasi",
  "Simpanan",
  "Pinjaman",
  "Mobile",
  "Pengaturan Tambahan",
];

export default function PengaturanHeader({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-baseline gap-1">
        <h1 className="text-[25px] font-extrabold leading-tight tracking-tight text-[#002060]">
          Pengaturan
        </h1>
        <span className="text-[20px] font-normal leading-tight tracking-tight text-[#002060]">
          Daftar
        </span>
      </div>

      <div className="mt-8 overflow-x-auto">
        <div className="flex min-w-max items-center gap-8 pb-1 pl-1 md:gap-9">
          {tabs.map((tab) => {
            const active = tab === "Pinjaman";

            return (
              <button
                key={tab}
                type="button"
                className={cn(
                  "h-[49px] rounded-full px-5 text-[12px] font-semibold transition",
                  active
                    ? "bg-[#635BFF] text-white"
                    : "bg-transparent text-[#53657d] hover:bg-white/70 hover:text-[#002060]",
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}