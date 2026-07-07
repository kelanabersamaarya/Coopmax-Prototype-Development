import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingWelcomeItem({
  className,
  onNotificationClick,
  unreadCount = 2,
}: {
  className?: string;
  onNotificationClick?: () => void;
  unreadCount?: number;
}) {
  return (
    <section className={cn("mt-[22px]", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[14px] font-normal leading-none tracking-[-0.01em] text-white/85">
            Selamat Datang,
          </div>

          <div className="mt-[8px] text-[24px] font-bold leading-tight tracking-[-0.04em] text-white">
            Laura Patel
          </div>
        </div>

        <button
          type="button"
          onClick={onNotificationClick}
          className={cn(
            "relative inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[13px]",
            "bg-white/20 text-white ring-1 ring-white/25 backdrop-blur transition active:scale-[0.96]",
          )}
          aria-label="Notifikasi"
          title="Notifikasi"
        >
          <Bell className="h-[22px] w-[22px] text-white" strokeWidth={2.5} />

          {unreadCount > 0 ? (
            <span className="absolute -right-[4px] -top-[4px] inline-flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#EF135D] px-[5px] text-[10px] font-bold leading-none text-white ring-2 ring-white/40">
              {unreadCount}
            </span>
          ) : null}
        </button>
      </div>
    </section>
  );
}