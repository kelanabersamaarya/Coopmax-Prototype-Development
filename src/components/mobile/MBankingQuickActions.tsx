"use client";

import {
  CreditCard,
  Landmark,
  ReceiptText,
  Send,
  ShoppingBag,
  Store,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";

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
];

export default function MBankingQuickActions() {
  return (
    <section className="px-6 pt-5">
      <div className="grid grid-cols-4 gap-x-3 gap-y-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={() =>
                toast(`${action.label} (prototype)`, {
                  description: "Menu ini belum dihubungkan.",
                })
              }
              className="flex min-w-0 flex-col items-center gap-2 rounded-[14px] px-1 py-2 transition active:scale-[0.98]"
            >
              <span className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-[#004FC7] text-white">
                <Icon className="h-[24px] w-[24px] text-white" strokeWidth={2.5} />
              </span>

              <span className="max-w-full text-center text-[10.5px] font-semibold leading-tight text-[#23305A]">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}