"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronDown,
  Clock3,
  FileText,
  Percent,
  Printer,
  RotateCcw,
  Sparkles,
  TimerReset,
  Wrench,
  Pencil,
  List,
  BadgePercent,
  ArrowLeft,
} from "lucide-react";
import LoanPemutihanDialog from "@/components/loans/LoanPemutihanDialog";
import LoanTransactionHistoryDialog from "@/components/loans/LoanTransactionHistoryDialog";
import { useNavigate } from "react-router-dom";

type ActionPillProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  withCaret?: boolean;
  className?: string;
};

function ActionPill({
  icon: Icon,
  label,
  onClick,
  withCaret,
  className,
}: ActionPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold",
        "bg-white text-slate-700 transition hover:bg-slate-50",
        "border-0 ring-0 shadow-none",
        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        className,
      )}
    >
      <Icon className="h-4.5 w-4.5 text-slate-500" />
      <span className="whitespace-nowrap">{label}</span>
      {withCaret ? <ChevronDown className="h-4 w-4 text-slate-400" /> : null}
    </button>
  );
}

export default function LoanAccountDetailHeader({
  accountNo,
  onBack,
  onAction,
}: {
  accountNo: string;
  onBack: () => void;
  onAction: (label: string) => void;
}) {
  const navigate = useNavigate();
  const [pemutihanOpen, setPemutihanOpen] = React.useState(false);
  const [txHistoryOpen, setTxHistoryOpen] = React.useState(false);

  return (
    <>
      <LoanPemutihanDialog
        open={pemutihanOpen}
        onOpenChange={setPemutihanOpen}
        accountNo={accountNo}
      />

      <LoanTransactionHistoryDialog
        open={txHistoryOpen}
        onOpenChange={setTxHistoryOpen}
        accountNo={accountNo}
      />

      <div className="rounded-3xl border-0 bg-transparent p-0 shadow-none">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <div className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              Rekening Pinjaman
            </div>
            <div className="text-sm font-semibold text-slate-600">Detail</div>
          </div>

          <div className="sr-only">{accountNo}</div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={onBack}
            className={cn(
              "h-10 rounded-full bg-white px-4 text-slate-800 hover:bg-slate-50",
              "border-0 ring-0 shadow-none",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar
          </Button>

          <ActionPill
            icon={Calendar}
            label="Perpanjangan Pinjaman"
            onClick={() => onAction("Perpanjangan Pinjaman")}
          />
          <ActionPill
            icon={Printer}
            label="Cetak"
            withCaret
            onClick={() => onAction("Cetak")}
          />
          <ActionPill
            icon={FileText}
            label="Dokumen"
            withCaret
            onClick={() => onAction("Dokumen")}
          />
          <ActionPill
            icon={Clock3}
            label="Riwayat Angsuran"
            onClick={() => setTxHistoryOpen(true)}
          />
          <ActionPill
            icon={Wrench}
            label="Pemutihan Pinjaman"
            onClick={() => setPemutihanOpen(true)}
          />
          <ActionPill
            icon={TimerReset}
            label="Riwayat Transaksi Autodebet"
            onClick={() => onAction("Riwayat Transaksi Autodebet")}
          />

          <ActionPill
            icon={Pencil}
            label="Ubah"
            onClick={() =>
              navigate(`/loans/accounts/${encodeURIComponent(accountNo)}/edit`, {
                state: { fromLoanAccountDetail: true, selectedAccountNo: accountNo },
              })
            }
          />
          <ActionPill
            icon={Pencil}
            label="Ubah Hutang"
            onClick={() => onAction("Ubah Hutang")}
          />
          <ActionPill
            icon={Calendar}
            label="Ubah Jatuh Tempo"
            onClick={() => onAction("Ubah Jatuh Tempo")}
          />
          <ActionPill
            icon={Percent}
            label="Ubah Bunga"
            onClick={() => onAction("Ubah Bunga")}
          />
          <ActionPill
            icon={RotateCcw}
            label="Simulasi Tunggakan"
            onClick={() => onAction("Simulasi Tunggakan")}
          />
          <ActionPill icon={List} label="Simulasi" onClick={() => onAction("Simulasi")} />

          <Button
            onClick={() => onAction("Dapatkan Analisa 5C")}
            className={cn(
              "h-10 rounded-full px-4",
              "bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-2))]",
              "border-0 ring-0 shadow-none",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Dapatkan Analisa 5C
            <BadgePercent className="ml-2 h-4 w-4 opacity-90" />
          </Button>
        </div>
      </div>
    </>
  );
}