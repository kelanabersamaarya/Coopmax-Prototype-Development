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
        "relative h-[584px] w-[328px] rounded-[60px] bg-[#111827] p-[12px]",
        "shadow-[0_36px_88px_rgba(15,23,42,0.32)] ring-1 ring-black/10",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-[12px] z-20 h-[25px] w-[112px] -translate-x-1/2 rounded-b-[21px] bg-[#111827]" />

      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[48px] bg-white",
          screenClassName,
        )}
      >
        <div className="flex h-[46px] items-center justify-between px-[22px] pt-[10px] text-black">
          <div className="text-[12px] font-bold leading-none">11:30</div>
          <div className="flex items-center gap-[6px]">
            <div className="flex h-[14px] items-end gap-[1.5px]" aria-hidden="true">
              <span className="h-[4px] w-[2.5px] rounded-full bg-black" />
              <span className="h-[7px] w-[2.5px] rounded-full bg-black" />
              <span className="h-[10px] w-[2.5px] rounded-full bg-black" />
              <span className="h-[13px] w-[2.5px] rounded-full bg-black" />
            </div>
            <Wifi className="h-[13px] w-[13px] text-black" strokeWidth={3} />
            <BatteryMedium
              className="h-[14px] w-[14px] text-black"
              strokeWidth={2.8}
            />
          </div>
        </div>

        <div className="h-[calc(100%-46px)] overflow-hidden">{children}</div>

        <div className="pointer-events-none absolute bottom-[10px] left-1/2 h-[4px] w-[96px] -translate-x-1/2 rounded-full bg-black/20" />
      </div>
    </div>
  );
}