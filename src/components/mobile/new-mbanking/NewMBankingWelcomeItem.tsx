import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingWelcomeItem({
  className,
}: {
  className?: string;
}) {
  return (
    <section className={cn("mt-[32px]", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[14px] font-normal leading-none tracking-[-0.01em] text-[#8F8F8F]">
            Selamat Datang,
          </div>

          <div className="mt-[8px] text-[24px] font-bold leading-tight tracking-[-0.04em] text-black">
            Laura Patel
          </div>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[13px]",
            "bg-white text-black ring-1 ring-slate-100 transition active:scale-[0.96]",
          )}
          aria-label="Notifikasi"
          title="Notifikasi"
        >
          <Bell className="h-[22px] w-[22px] text-black" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}