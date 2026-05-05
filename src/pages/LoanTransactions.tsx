import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  ArrowDownToLine,
  Users,
  Trash2,
  Tag,
  Percent,
  ArrowUp,
  Banknote,
} from "lucide-react";

type Action = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
};

function ActionPill({
  label,
  icon: Icon,
  onClick,
  className,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full bg-white/80 px-4",
        "text-[14px] font-medium text-slate-700",
        "ring-1 ring-slate-200/70 shadow-sm backdrop-blur",
        "transition hover:bg-white",
        className,
      )}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-200">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

export default function LoanTransactions() {
  const actionsRow1: Action[] = [
    {
      label: "Import Pembayaran Angsuran",
      icon: ArrowDownToLine,
      onClick: () =>
        toast("Import Pembayaran Angsuran (prototype)", {
          description: "Fitur import belum dihubungkan.",
        }),
    },
    {
      label: "Transaksi dari Kolektor",
      icon: Users,
      onClick: () =>
        toast("Transaksi dari Kolektor (prototype)", {
          description: "Fitur ini belum dihubungkan.",
        }),
    },
    {
      label: "Transaksi Terhapus",
      icon: Trash2,
      onClick: () =>
        toast("Transaksi Terhapus (prototype)", {
          description: "Fitur ini belum dihubungkan.",
        }),
    },
    {
      label: "Biaya Admin RC",
      icon: Tag,
      onClick: () =>
        toast("Biaya Admin RC (prototype)", {
          description: "Fitur ini belum dihubungkan.",
        }),
    },
    {
      label: "Bunga RC",
      icon: Percent,
      onClick: () =>
        toast("Bunga RC (prototype)", {
          description: "Fitur ini belum dihubungkan.",
        }),
    },
    {
      label: "Penarikan RC",
      icon: ArrowUp,
      onClick: () =>
        toast("Penarikan RC (prototype)", {
          description: "Fitur ini belum dihubungkan.",
        }),
    },
  ];

  const actionsRow2: Action[] = [
    {
      label: "Pembayaran Angsuran",
      icon: Banknote,
      onClick: () =>
        toast("Pembayaran Angsuran (prototype)", {
          description: "Akan diarahkan ke form pembayaran bila sudah dibuat.",
        }),
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Transaksi Pinjaman
          </h1>
          <div className="text-base font-semibold text-slate-600">Daftar</div>
        </div>

        <div className="mt-6 rounded-3xl bg-white/40 p-4 ring-1 ring-slate-200/60 backdrop-blur md:p-5">
          <div className="flex flex-wrap items-center gap-3">
            {actionsRow1.map((a) => (
              <ActionPill
                key={a.label}
                label={a.label}
                icon={a.icon}
                onClick={a.onClick}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {actionsRow2.map((a) => (
              <ActionPill
                key={a.label}
                label={a.label}
                icon={a.icon}
                onClick={a.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}