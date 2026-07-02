import {
  CreditCard,
  Landmark,
  ReceiptText,
  Send,
  ShoppingBag,
  Store,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { label: "Rekening", icon: CreditCard },
  { label: "Transfer", icon: Send },
  { label: "Bayar", icon: ReceiptText },
  { label: "Beli", icon: ShoppingBag },
  { label: "Anggota", icon: UsersRound },
  { label: "Iuran", icon: Landmark },
  { label: "Merchant", icon: Store },
];

export default function NewMBankingQuickActionGrid({
  className,
}: {
  className?: string;
}) {
  return (
    <section className={cn("mt-[22px]", className)}>
      <div className="grid grid-cols-4 gap-x-[10px] gap-y-[16px]">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              className="flex min-w-0 flex-col items-center rounded-[16px] transition active:scale-[0.97]"
              aria-label={action.label}
            >
              <span
                className={cn(
                  "grid h-[54px] w-[54px] place-items-center rounded-[16px]",
                  "bg-white text-[#479DF4] ring-1 ring-slate-100",
                )}
              >
                <Icon className="h-[25px] w-[25px]" strokeWidth={2.5} />
              </span>

              <span className="mt-[8px] max-w-full truncate text-center text-[11px] font-normal leading-none tracking-[-0.02em] text-black">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}