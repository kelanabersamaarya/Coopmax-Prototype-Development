import type { ReactNode } from "react";
import { BatteryMedium, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingPhoneMockupShell({
  children,
  className,
  screenClassName,
}: {
  children: ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[374px] w-[210px] rounded-[36px] bg-[#111827] p-[8px]",
        "shadow-[0_30px_72px_rgba(15,23,42,0.28)] ring-1 ring-black/10",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-[8px] z-20 h-[17px] w-[76px] -translate-x-1/2 rounded-b-[14px] bg-[#111827]" />

      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[29px] bg-white",
          screenClassName,
        )}
      >
        <div className="flex h-[31px] items-center justify-between px-[15px] pt-[6px] text-black">
          <div className="text-[9px] font-bold leading-none">11:30</div>
          <div className="flex items-center gap-[4px]">
            <div className="flex h-[11px] items-end gap-[1px]" aria-hidden="true">
              <span className="h-[3px] w-[2px] rounded-full bg-black" />
              <span className="h-[6px] w-[2px] rounded-full bg-black" />
              <span className="h-[8px] w-[2px] rounded-full bg-black" />
              <span className="h-[10px] w-[2px] rounded-full bg-black" />
            </div>
            <Wifi className="h-[10px] w-[10px] text-black" strokeWidth={3} />
            <BatteryMedium
              className="h-[11px] w-[11px] text-black"
              strokeWidth={2.8}
            />
          </div>
        </div>

        <div className="h-[calc(100%-31px)] overflow-hidden">{children}</div>

        <div className="pointer-events-none absolute bottom-[7px] left-1/2 h-[3px] w-[64px] -translate-x-1/2 rounded-full bg-black/20" />
      </div>
    </div>
  );
}