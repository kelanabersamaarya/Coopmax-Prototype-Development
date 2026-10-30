"use client";

import {
  CreditCard,
  Landmark,
  Plus,
  ReceiptText,
  Send,
  ShoppingBag,
  Store,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";

function DepositIcon({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex ${className ?? ""}`}>
      <WalletCards className="h-[30px] w-[30px]" strokeWidth={2.2} />
      <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-white text-[#254FCB]">
        <Plus className="h-3 w-3" strokeWidth={3} />
      </span>
    </span>
  );
}

const actions = [
  {
    label: "Rekening Saya",
    icon: CreditCard,
  },
  {
    label: "Transfer",
    icon: Send,
  },
  {
    label: "Bayar",
    icon: ReceiptText,
  },
  {
    label: "Beli",
    icon: ShoppingBag,
  },
  {
    label: "Keanggotaan",
    icon: UsersRound,
  },
  {
    label: "Iuran Simpanan",
    icon: Landmark,
  },
  {
    label: "E-Commerce",
    icon: Store,
  },
  {
    label: "Setor Dana",
    icon: WalletCards,
  },
];

export default function MBankingQuickActions({
  onAccountInfoClick,
  onTopUpClick,
}: {
  onAccountInfoClick?: () => void;
  onTopUpClick?: () => void;
}) {
  return (
    <section className="px-6 pt-5">
      <div className="grid grid-cols-4 gap-x-1 gap-y-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                if (action.label === "Rekening Saya") {
                  onAccountInfoClick?.();
                  return;
                }

                if (action.label === "Setor Dana") {
                  onTopUpClick?.();
                  return;
                }

                toast(`${action.label} (prototype)`, {
                  description: "Menu ini belum dihubungkan.",
                });
              }}
              className="flex min-w-0 flex-col items-center gap-2 rounded-[14px] px-0 py-2 transition active:scale-[0.98]"
            >
              <span className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#004FC7] text-white">
                {action.label === "Setor Dana" ? <DepositIcon /> : <Icon className="h-[26px] w-[26px] text-white" strokeWidth={2.5} />}
              </span>

              <span className="max-w-full whitespace-nowrap text-center text-[12px] font-semibold leading-tight text-[#23305A]">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}