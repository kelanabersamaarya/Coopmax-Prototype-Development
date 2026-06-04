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
import LoanTransactionsTable from "@/components/loans/LoanTransactionsTable";
import LoanTransactionsDetailHeader from "@/components/loans/LoanTransactionsDetailHeader";
import LoanTransactionDetailCard from "@/components/loans/LoanTransactionDetailCard";
import { useNavigate, useLocation } from "react-router-dom";

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
        "inline-flex h-11 items-center gap-2 rounded-full bg-white px-4",
        "text-[14px] font-medium text-slate-700",
        "ring-1 ring-slate-200 shadow-sm",
        "transition hover:bg-slate-50",
        className,
      )}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center text-slate-600">
        <Icon className="h-5 w-5" />
      </span>

      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

export default function LoanTransactions() {
  const navigate = useNavigate();
  const location = useLocation();

  const [detailTransactionNo, setDetailTransactionNo] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const st = (location.state ?? null) as { openDetailTransactionNo?: string } | null;
    if (st?.openDetailTransactionNo) {
      setDetailTransactionNo(st.openDetailTransactionNo);
      // bersihkan state agar tidak kebuka lagi saat refresh/back
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  const actions: Action[] = [
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
    {
      label: "Pembayaran Angsuran V2",
      icon: Banknote,
      onClick: () => navigate("/loans/transactions/installment-payment-v2"),
    },
  ];

  if (detailTransactionNo) {
    return (
      <div className="min-h-screen bg-[hsl(var(--app-bg))]">
        <div className="w-full px-2 py-6 md:px-3 md:py-8">
          <LoanTransactionsDetailHeader
            accountNo={detailTransactionNo}
            onBack={() => setDetailTransactionNo(null)}
          />

          <LoanTransactionDetailCard
            transactionNo={detailTransactionNo}
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Transaksi Pinjaman
          </h1>
          <div className="text-base font-semibold text-slate-600">Daftar</div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            {actions.map((a) => (
              <ActionPill
                key={a.label}
                label={a.label}
                icon={a.icon}
                onClick={a.onClick}
              />
            ))}
          </div>

          <LoanTransactionsTable
            onPickTransaction={(trxNo) => setDetailTransactionNo(trxNo)}
          />
        </div>
      </div>
    </div>
  );
}