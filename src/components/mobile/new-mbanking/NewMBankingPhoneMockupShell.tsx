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
        "relative h-[334px] w-[188px] rounded-[32px] bg-[#111827] p-[7px]",
        "shadow-[0_24px_60px_rgba(15,23,42,0.24)] ring-1 ring-black/10",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-[7px] z-20 h-[15px] w-[68px] -translate-x-1/2 rounded-b-[12px] bg-[#111827]" />

      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[26px] bg-white",
          screenClassName,
        )}
      >
        <div className="flex h-[28px] items-center justify-between px-[13px] pt-[5px] text-black">
          <div className="text-[8px] font-bold leading-none">11:30</div>
          <div className="flex items-center gap-[4px]">
            <div className="flex h-[10px] items-end gap-[1px]" aria-hidden="true">
              <span className="h-[3px] w-[2px] rounded-full bg-black" />
              <span className="h-[5px] w-[2px] rounded-full bg-black" />
              <span className="h-[7px] w-[2px] rounded-full bg-black" />
              <span className="h-[9px] w-[2px] rounded-full bg-black" />
            </div>
            <Wifi className="h-[9px] w-[9px] text-black" strokeWidth={3} />
            <BatteryMedium
              className="h-[10px] w-[10px] text-black"
              strokeWidth={2.8}
            />
          </div>
        </div>

        <div className="h-[calc(100%-28px)] overflow-hidden">{children}</div>

        <div className="pointer-events-none absolute bottom-[6px] left-1/2 h-[3px] w-[58px] -translate-x-1/2 rounded-full bg-black/20" />
      </div>
    </div>
  );
}