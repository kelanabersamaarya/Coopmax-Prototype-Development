import {
  CircleDollarSign,
  HandCoins,
  Plus,
  Send,
  ShoppingBasket,
  UserRound,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { label: "Setor", icon: WalletCards, withPlus: true },
  { label: "Transfer", icon: Send },
  { label: "Bayar Angsuran", icon: CircleDollarSign },
  { label: "Keanggotan", icon: UserRound },
  { label: "Bayar", icon: HandCoins },
  { label: "Beli", icon: ShoppingBasket },
];

export default function NewMBankingQuickActionGrid({
  className,
}: {
  className?: string;
}) {
  return (
    <section className={cn("mt-[24px]", className)}>
      <div className="grid grid-cols-4 justify-items-start gap-x-[18px] gap-y-[22px]">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              className="flex min-w-0 flex-col items-center transition active:scale-[0.97]"
              aria-label={action.label}
            >
              <span
                className={cn(
                  "relative grid h-[64px] w-[64px] place-items-center rounded-[18px]",
                  "bg-[#EEF4FF] text-[#3B82F6]",
                )}
              >
                <Icon className="h-[38px] w-[38px]" strokeWidth={2.15} />

                {action.withPlus ? (
                  <span className="absolute right-[11px] top-[11px] grid h-[17px] w-[17px] place-items-center rounded-full bg-[#3B82F6] text-white">
                    <Plus className="h-[11px] w-[11px]" strokeWidth={3} />
                  </span>
                ) : null}
              </span>

              <span className="mt-[8px] max-w-[72px] text-center text-[12px] font-normal leading-[1.15] tracking-[-0.01em] text-[#111827]">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}