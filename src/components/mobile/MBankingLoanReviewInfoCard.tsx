"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import MBankingAccountPickerSheet from "@/components/mobile/MBankingAccountPickerSheet";
import MBankingLoanPasswordPage from "@/components/mobile/MBankingLoanPasswordPage";
import MBankingPaymentResultPage from "@/components/mobile/MBankingPaymentResultPage";

const summaryRows = [
  {
    label: "Sisa Pinjaman",
    value: "Rp.10.000.000,00",
  },
  {
    label: "Pokok",
    value: "Rp.208.333,33",
  },
  {
    label: "Bunga",
    value: "Rp.200.000,00",
  },
  {
    label: "Hutang Bunga",
    value: "Rp.0,00",
  },
  {
    label: "Denda",
    value: "Rp.0,00",
  },
  {
    label: "Total Bayar",
    value: "Rp.408.333,33",
  },
];

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-3">
      <div className="text-[14px] font-normal leading-tight tracking-tight text-black">
        {label}
      </div>
      <div className="text-right text-[14px] font-normal leading-tight tracking-tight text-black">
        {value}
      </div>
    </div>
  );
}

export default function MBankingLoanReviewInfoCard({
  onPaymentDone,
}: {
  onPaymentDone: () => void;
}) {
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const [showPasswordInput, setShowPasswordInput] = React.useState(false);
  const [showPaymentResult, setShowPaymentResult] = React.useState(false);

  const hasSelectedAccount = selectedAccount.trim().length > 0;

  if (showPaymentResult) {
    return (
      <div className="absolute inset-0 z-[95] bg-white">
        <MBankingPaymentResultPage
          account={selectedAccount}
          onBack={onPaymentDone}
        />
      </div>
    );
  }

  if (showPasswordInput) {
    return (
      <div className="absolute inset-0 z-[95] bg-white">
        <MBankingLoanPasswordPage
          onBack={() => setShowPasswordInput(false)}
          onSuccess={() => {
            setShowPasswordInput(false);
            setShowPaymentResult(true);
          }}
        />
      </div>
    );
  }

  return (
    <>
      <MBankingAccountPickerSheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={setSelectedAccount}
      />

      <section className="mt-8 overflow-hidden rounded-[26px] bg-white px-6 pb-7 pt-8 shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[14px] font-normal leading-none tracking-tight text-black">
            Angsuran Pinjaman
          </div>
          <div className="text-[14px] font-normal leading-none tracking-tight text-black">
            Ke-1
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-[#E7E7E7]" />

        <div className="mt-6 grid gap-4">
          {summaryRows.map((row) => (
            <SummaryRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>

        <div className="mt-6 h-px w-full bg-[#E7E7E7]" />

        <div className="mt-6">
          <div className="text-[14px] font-normal leading-none tracking-tight text-[#8F8F8F]">
            No Rekening
          </div>

          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className={cn(
              "mt-3 flex h-[40px] w-full items-center justify-between gap-3 rounded-[13px]",
              "bg-[#F1F1F1] px-4 text-left transition active:scale-[0.99]",
            )}
            aria-label="Pilih nomor rekening"
            title="Pilih nomor rekening"
          >
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-[14px] font-normal leading-none tracking-tight",
                hasSelectedAccount ? "text-[#273B74]" : "text-[#8F8F8F]",
              )}
            >
              {hasSelectedAccount ? selectedAccount : "Pilih Rekening"}
            </span>

            {hasSelectedAccount ? (
              <span
                role="button"
                tabIndex={-1}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setSelectedAccount("");
                }}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#8D8D8D]"
                aria-label="Hapus rekening"
                title="Hapus rekening"
              >
                <X className="h-[22px] w-[22px]" strokeWidth={2.4} />
              </span>
            ) : null}

            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#8D8D8D]">
              <ChevronDown className="h-[20px] w-[20px]" strokeWidth={2.8} />
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!hasSelectedAccount) {
              toast("Rekening wajib dipilih", {
                description: "Silakan pilih rekening terlebih dahulu.",
              });
              return;
            }

            setShowPasswordInput(true);
          }}
          className={cn(
            "mt-7 h-[40px] w-full rounded-full",
            "bg-[#0A4BD8] text-[14px] font-normal text-white",
            "shadow-[0_5px_14px_rgba(10,75,216,0.22)]",
            "transition hover:bg-[#0844C3] active:translate-y-px",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A4BD8]/25",
          )}
        >
          Bayar
        </button>
      </section>
    </>
  );
}