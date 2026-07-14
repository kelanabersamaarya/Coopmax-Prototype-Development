import {
  CircleDollarSign,
  HandCoins,
  Plus,
  Send,
  ShoppingBasket,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    id: "deposit",
    label: "Setor Dana",
    icon: WalletCards,
    withPlus: true,
    frameClassName: "bg-[#479DF4]",
    plusClassName: "bg-[#1D4ED8]",
  },
  {
    id: "transfer",
    label: "Transfer",
    icon: Send,
    frameClassName: "bg-[#18B7A1]",
  },
  {
    id: "installment",
    label: "Bayar Angsuran",
    icon: CircleDollarSign,
    frameClassName: "bg-[#F59E0B]",
  },
  {
    id: "payment",
    label: "Bayar Berbagai Kebutuhan",
    icon: HandCoins,
    frameClassName: "bg-[#EF4444]",
  },
  {
    id: "purchase",
    label: "Beli Berbagai Kebutuhan",
    icon: ShoppingBasket,
    frameClassName: "bg-[#06B6D4]",
  },
];

export default function NewMBankingQuickActionGrid({
  className,
  onDepositClick,
  onTransferClick,
  onInstallmentClick,
  onPaymentClick,
  onPurchaseClick,
}: {
  className?: string;
  onDepositClick?: () => void;
  onTransferClick?: () => void;
  onInstallmentClick?: () => void;
  onPaymentClick?: () => void;
  onPurchaseClick?: () => void;
}) {
  return (
    <section className={cn("mt-[24px]", className)}>
      <div className="grid grid-cols-4 justify-items-center gap-x-[18px] gap-y-[22px]">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              type="button"
              onClick={() => {
                if (action.id === "deposit") {
                  onDepositClick?.();
                  return;
                }

                if (action.id === "transfer") {
                  onTransferClick?.();
                  return;
                }

                if (action.id === "installment") {
                  onInstallmentClick?.();
                  return;
                }

                if (action.id === "payment") {
                  onPaymentClick?.();
                  return;
                }

                if (action.id === "purchase") {
                  onPurchaseClick?.();
                }
              }}
              className="flex min-w-0 flex-col items-center transition active:scale-[0.97]"
              aria-label={action.label}
            >
              <span
                className={cn(
                  "relative grid h-[64px] w-[64px] place-items-center rounded-[18px]",
                  "border-0 text-white shadow-none ring-0 outline-none",
                  action.frameClassName,
                )}
              >
                <Icon className="h-[38px] w-[38px] text-white" strokeWidth={2.15} />

                {action.withPlus ? (
                  <span
                    className={cn(
                      "absolute right-[11px] top-[11px] grid h-[17px] w-[17px] place-items-center rounded-full text-white",
                      "border-0 ring-0 outline-none",
                      action.plusClassName,
                    )}
                  >
                    <Plus className="h-[11px] w-[11px] text-white" strokeWidth={3} />
                  </span>
                ) : null}
              </span>

              <span className="mt-[8px] max-w-[88px] text-center text-[12px] font-normal leading-[1.15] tracking-[-0.01em] text-[#111827]">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}