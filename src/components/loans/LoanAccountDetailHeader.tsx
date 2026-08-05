"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  BadgePercent,
  Banknote,
  Calendar,
  ChevronDown,
  Clock3,
  Eraser,
  List,
  Pencil,
  Percent,
  Printer,
  RotateCcw,
  Sparkles,
  TimerReset,
  X,
} from "lucide-react";
import LoanDebtChangeWizard from "@/components/loans/LoanDebtChangeWizard";
import LoanExtensionWizard from "@/components/loans/LoanExtensionWizard";
import LoanInterestChangeWizard from "@/components/loans/LoanInterestChangeWizard";
import LoanPemutihanDialog from "@/components/loans/LoanPemutihanDialog";
import LoanTransactionHistoryDialog from "@/components/loans/LoanTransactionHistoryDialog";

const UNSUPPORTED_INTEREST_CHANGE_ACCOUNT = "klpk04.07260001";

type AlertAction = "extension" | "debt" | "interest";

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
        "inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50",
        "border-0 shadow-none ring-0 focus:outline-none focus-visible:ring-0",
        className,
      )}
    >
      <Icon className="h-4.5 w-4.5 text-slate-500" />
      <span className="whitespace-nowrap">{label}</span>
      {withCaret ? <ChevronDown className="h-4 w-4 text-slate-400" /> : null}
    </button>
  );
}

function getUnsupportedMessage(action: AlertAction) {
  if (action === "extension") {
    return "Perpanjangan pinjaman tidak dapat dilakukan pada rekening pinjaman karena produk pinjaman yang digunakan tidak mendukung perpanjangan pinjaman";
  }

  if (action === "debt") {
    return "Perubahan nominal bunga tidak dapat dilakukan pada rekening pinjaman karena produk pinjaman yang digunakan tidak mendukung perubahan nominal bunga";
  }

  return "Perubahan suku bunga tidak dapat dilakukan pada rekening pinjaman karena produk pinjaman yang digunakan tidak mendukung perubahan suku bunga";
}

function UnsupportedChangeDialog({
  open,
  action,
  onOpenChange,
}: {
  open: boolean;
  action: AlertAction;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.5rem)] max-w-[530px] overflow-hidden rounded-[5px]",
          "border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-11">
          <div className="grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6] bg-white">
            <span className="text-[54px] font-light leading-none text-[#f2b98f]">
              !
            </span>
          </div>

          <h2 className="mt-7 max-w-[440px] text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Perubahan tidak dapat dilakukan
          </h2>

          <p className="mt-4 max-w-[440px] text-[17px] font-normal leading-relaxed text-[#3b4863]">
            {getUnsupportedMessage(action)}
          </p>

          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-6 h-[54px] w-[104px] rounded-[5px] bg-[#3380e8] text-[16px] font-semibold text-white ring-2 ring-[#3380e8]/25 transition hover:bg-[#266ed0]"
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
  const [alertAction, setAlertAction] = React.useState<AlertAction | null>(null);
  const [pemutihanOpen, setPemutihanOpen] = React.useState(false);
  const [txHistoryOpen, setTxHistoryOpen] = React.useState(false);
  const [interestWizardOpen, setInterestWizardOpen] = React.useState(false);
  const [debtWizardOpen, setDebtWizardOpen] = React.useState(false);
  const [extensionWizardOpen, setExtensionWizardOpen] = React.useState(false);

  const isUnsupportedAccount =
    accountNo.trim().toLowerCase() ===
    UNSUPPORTED_INTEREST_CHANGE_ACCOUNT.toLowerCase();

  function handleUnsupportedOr(
    actionType: AlertAction,
    action: () => void,
  ) {
    if (isUnsupportedAccount) {
      setAlertAction(actionType);
      return;
    }

    action();
  }

  return (
    <>
      <UnsupportedChangeDialog
        open={alertAction !== null}
        action={alertAction ?? "interest"}
        onOpenChange={(open) => {
          if (!open) setAlertAction(null);
        }}
      />

      {pemutihanOpen ? (
        <LoanPemutihanDialog
          open={pemutihanOpen}
          onOpenChange={setPemutihanOpen}
          accountNo={accountNo}
        />
      ) : null}

      {txHistoryOpen ? (
        <LoanTransactionHistoryDialog
          open={txHistoryOpen}
          onOpenChange={setTxHistoryOpen}
          accountNo={accountNo}
        />
      ) : null}

      {interestWizardOpen ? (
        <LoanInterestChangeWizard
          open={interestWizardOpen}
          onOpenChange={setInterestWizardOpen}
          accountNo={accountNo}
        />
      ) : null}

      {debtWizardOpen ? (
        <LoanDebtChangeWizard
          open={debtWizardOpen}
          onOpenChange={setDebtWizardOpen}
          accountNo={accountNo}
        />
      ) : null}

      {extensionWizardOpen ? (
        <LoanExtensionWizard
          open={extensionWizardOpen}
          onOpenChange={setExtensionWizardOpen}
          accountNo={accountNo}
        />
      ) : null}

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

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <ActionPill
            icon={Calendar}
            label="Perpanjangan Pinjaman"
            onClick={() =>
              handleUnsupportedOr("extension", () =>
                setExtensionWizardOpen(true),
              )
            }
          />

          <ActionPill
            icon={Printer}
            label="Cetak"
            withCaret
            onClick={() => onAction("Cetak")}
          />

          <ActionPill
            icon={Printer}
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
            icon={Eraser}
            label="Pemutihan Pinjaman"
            onClick={() => setPemutihanOpen(true)}
          />

          <ActionPill
            icon={Calendar}
            label="Riwayat Transaksi Autodebet"
            onClick={() => onAction("Riwayat Transaksi Autodebet")}
          />

          <ActionPill
            icon={Pencil}
            label="Ubah"
            onClick={() =>
              navigate(`/loans/accounts/${encodeURIComponent(accountNo)}/edit`, {
                state: {
                  fromLoanAccountDetail: true,
                  selectedAccountNo: accountNo,
                },
              })
            }
          />

          <ActionPill
            icon={Banknote}
            label="Ubah Bunga"
            onClick={() =>
              handleUnsupportedOr("debt", () => setDebtWizardOpen(true))
            }
          />

          <ActionPill
            icon={Percent}
            label="Ubah Suku Bunga"
            onClick={() =>
              handleUnsupportedOr("interest", () =>
                setInterestWizardOpen(true),
              )
            }
          />

          <ActionPill
            icon={Printer}
            label="Simulasi Tunggakan"
            onClick={() => onAction("Simulasi Tunggakan")}
          />

          <Button
            variant="outline"
            onClick={onBack}
            className="h-10 rounded-full border-0 bg-white px-4 text-slate-800 shadow-none ring-0 hover:bg-slate-50 focus-visible:ring-0"
          >
            <List className="mr-2 h-4 w-4" />
            Kembali ke Daftar
          </Button>

          <ActionPill
            icon={List}
            label="Simulasi"
            onClick={() => onAction("Simulasi")}
          />

          <Button
            onClick={() => onAction("Dapatkan Analisa 5C")}
            className="h-10 rounded-full border-0 bg-[hsl(var(--app-accent))] px-4 text-white shadow-none ring-0 hover:bg-[hsl(var(--app-accent-2))] focus-visible:ring-0"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Dapatkan Analisa 5C
            <BadgePercent className="ml-2 h-4 w-4 opacity-90" />
          </Button>

          <div className="sr-only">
            <TimerReset />
            <RotateCcw />
            <X />
          </div>
        </div>
      </div>
    </>
  );
}