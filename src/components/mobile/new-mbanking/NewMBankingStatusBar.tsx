import { BatteryMedium, Wifi } from "lucide-react";

export default function NewMBankingStatusBar() {
  return (
    <div className="flex h-[30px] shrink-0 items-center justify-between px-6 pt-2 text-black">
      <div className="text-[14px] font-bold leading-none tracking-[-0.02em]">
        11:30
      </div>

      <div className="flex items-center gap-[8px]">
        <div className="flex h-4 items-end gap-[2px]" aria-hidden="true">
          <span className="h-[5px] w-[3px] rounded-full bg-black" />
          <span className="h-[8px] w-[3px] rounded-full bg-black" />
          <span className="h-[11px] w-[3px] rounded-full bg-black" />
          <span className="h-[14px] w-[3px] rounded-full bg-black" />
        </div>
        <Wifi className="h-[17px] w-[17px] text-black" strokeWidth={2.6} />
        <BatteryMedium
          className="h-[19px] w-[19px] text-black"
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
}