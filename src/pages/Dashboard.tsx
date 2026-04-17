import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ChevronRight, ReceiptText, UsersRound } from "lucide-react";

function DevMenuCard({
  title,
  subtitle,
  icon: Icon,
  onClick,
  accent = "violet",
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  accent?: "violet" | "sky" | "emerald";
}) {
  const accentMap: Record<string, { bg: string; ring: string; text: string }> = {
    violet: {
      bg: "bg-violet-100",
      ring: "ring-violet-200",
      text: "text-violet-700",
    },
    sky: { bg: "bg-sky-100", ring: "ring-sky-200", text: "text-sky-700" },
    emerald: {
      bg: "bg-emerald-100",
      ring: "ring-emerald-200",
      text: "text-emerald-700",
    },
  };

  const a = accentMap[accent];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full text-left",
        "rounded-3xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-200/70 backdrop-blur",
        "transition hover:bg-white",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1",
              a.bg,
              a.ring,
            )}
          >
            <Icon className={cn("h-6 w-6", a.text)} />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-extrabold tracking-tight text-slate-900">
              {title}
            </div>
            <div className="mt-1 text-xs leading-relaxed text-slate-600">
              {subtitle}
            </div>

            <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
              Buka modul <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
          Prototype
        </span>
      </div>
    </button>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-2rem)] overflow-hidden rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur md:p-6">
      <div className="rounded-3xl bg-slate-50/70 p-4 ring-1 ring-slate-200 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold tracking-tight text-slate-900">
              Menu Pengembangan
            </div>
            <div className="mt-1 text-xs text-slate-600">
              Shortcut modul yang sedang dikembangkan untuk prototype UI.
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
              Internal
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <DevMenuCard
            title="Pinjaman Billing"
            subtitle="Alur pinjaman dengan penjadwalan billing & pembayaran angsuran."
            icon={ReceiptText}
            accent="sky"
            onClick={() =>
              toast("Pinjaman Billing (prototype)", {
                description: "Shortcut ini masih menu pengembangan.",
              })
            }
          />

          <DevMenuCard
            title="Pinjaman Tanggung Renteng"
            subtitle="Skema kelompok (TR) untuk pengajuan, monitoring, dan pembayaran."
            icon={UsersRound}
            accent="violet"
            onClick={() =>
              toast("Pinjaman Tanggung Renteng (prototype)", {
                description: "Shortcut ini masih menu pengembangan.",
              })
            }
          />
        </div>
      </div>
    </div>
  );
}