"use client";

export default function EKolektorLoginHeader({
  appName = "Sakti Kolektor",
  subtitle = "Solusi Sakti",
}: {
  appName?: string;
  subtitle?: string;
}) {
  return (
    <div className="relative h-[230px] shrink-0 overflow-hidden bg-[#0754c9]">
      <div className="relative z-20 h-full overflow-hidden bg-[#0754c9] px-6 pt-4 text-white">
        <div className="flex h-5 items-center justify-between">
          <div className="text-[15px] font-bold leading-none tracking-tight">
            9:41
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[2px]">
              <span className="block h-[4px] w-[3px] rounded-full bg-white/80" />
              <span className="block h-[7px] w-[3px] rounded-full bg-white/85" />
              <span className="block h-[10px] w-[3px] rounded-full bg-white/90" />
              <span className="block h-[13px] w-[3px] rounded-full bg-white" />
            </div>

            <div className="h-[10px] w-[19px] rounded-[3px] border border-white/90 p-[1px]">
              <div className="h-full w-[13px] rounded-[2px] bg-white" />
            </div>
          </div>
        </div>

        <div className="relative mt-8 flex items-center gap-8">
          <div className="h-[82px] w-[82px] shrink-0 rounded-full bg-white shadow-sm" />

          <div className="min-w-0">
            <div className="text-[24px] font-extrabold leading-none tracking-tight text-white">
              {appName}
            </div>
            <div className="mt-2 whitespace-nowrap text-[20px] font-bold leading-none tracking-tight text-white">
              {subtitle}
            </div>
          </div>
        </div>

        <div className="absolute -right-12 -top-10 h-[170px] w-[170px] rounded-full bg-white/10" />
        <div className="absolute -right-6 top-[46px] h-[110px] w-[150px] rotate-[-20deg] rounded-[70px] bg-white/14" />
      </div>
    </div>
  );
}