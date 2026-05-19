import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Landmark, ArrowRight, Activity, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

function StatPill({
  icon: Icon,
  label,
  value,
  tone = "sky",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "sky" | "emerald" | "violet";
}) {
  const toneMap: Record<string, { bg: string; ring: string; text: string }> = {
    sky: { bg: "bg-sky-50", ring: "ring-sky-200", text: "text-sky-700" },
    emerald: {
      bg: "bg-emerald-50",
      ring: "ring-emerald-200",
      text: "text-emerald-700",
    },
    violet: {
      bg: "bg-violet-50",
      ring: "ring-violet-200",
      text: "text-violet-700",
    },
  };

  const t = toneMap[tone];

  return (
    <div
      className={cn(
        "rounded-2xl bg-white/80 p-4 shadow-sm ring-1 backdrop-blur",
        t.ring,
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1", t.bg, t.ring)}>
          <Icon className={cn("h-5 w-5", t.text)} />
        </div>
        <div className="min-w-0">
          <div className="text-[12px] font-semibold text-slate-600">{label}</div>
          <div className="mt-1 text-[18px] font-extrabold tracking-tight text-slate-900">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ObsSamudraHarta() {
  return (
    <div className="min-h-[calc(100vh-2rem)] overflow-hidden rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur md:p-6">
      <div className="flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 backdrop-blur">
          <Landmark className="h-3.5 w-3.5 text-emerald-600" />
          OBS Samudra Harta
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Dashboard OBS
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Halaman prototype untuk modul OBS. Sidebar mengikuti layout yang sama seperti
          modul Pinjaman Billing.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatPill icon={Activity} label="Status Sistem" value="Normal" tone="emerald" />
        <StatPill icon={BarChart3} label="Antrian Proses" value="0" tone="sky" />
        <StatPill icon={Landmark} label="Unit Terpantau" value="3" tone="violet" />
      </div>

      <Card className="mt-4 rounded-3xl border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Quick actions (prototype)
            </div>
            <div className="mt-1 text-xs text-slate-600">
              Aksi berikut masih berupa toast.
            </div>
          </div>

          <Button
            onClick={() =>
              toast("Mulai monitoring (prototype)", {
                description: "Fitur monitoring belum dihubungkan.",
              })
            }
            className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Mulai Monitoring
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}