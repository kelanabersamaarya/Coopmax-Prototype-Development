import { Banknote, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type HistoryItem = {
  id: string;
  type: "in" | "out";
  title: string;
  subtitle: string;
  amount: string;
};

const monthChips = ["Apr", "Mei", "Jun"];

const historyItems: HistoryItem[] = [
  {
    id: "setoran",
    type: "in",
    title: "Setoran",
    subtitle: "Simpanan Kaya • Teller",
    amount: "+Rp. 500.000",
  },
  {
    id: "transfer",
    type: "out",
    title: "Transfer Keluar",
    subtitle: "Bank BCA • 8890123441",
    amount: "-Rp. 250.000",
  },
];

function HistoryIcon({ type }: { type: HistoryItem["type"] }) {
  const isIncome = type === "in";
  const Icon = isIncome ? Banknote : Send;

  return (
    <span
      className={cn(
        "grid h-[29px] w-[29px] shrink-0 place-items-center rounded-full",
        isIncome
          ? "bg-[#EAF8EF] text-[#33AA00]"
          : "bg-[#EAF3FF] text-[#2F80ED]",
      )}
    >
      <Icon className="h-[13px] w-[13px]" strokeWidth={2.7} />
    </span>
  );
}

function HistoryRow({ item }: { item: HistoryItem }) {
  const isIncome = item.type === "in";

  return (
    <div className="flex items-start justify-between gap-[8px] py-[9px]">
      <div className="flex min-w-0 flex-1 items-start gap-[8px]">
        <HistoryIcon type={item.type} />

        <div className="min-w-0 pt-[1px]">
          <div className="truncate text-[9.5px] font-bold leading-tight tracking-[-0.02em] text-black">
            {item.title}
          </div>
          <div className="mt-[3px] truncate text-[7.5px] font-normal leading-tight text-[#8F8F8F]">
            {item.subtitle}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-[1px] text-right">
        <div
          className={cn(
            "text-[8.5px] font-bold leading-tight tracking-[-0.02em]",
            isIncome ? "text-[#15965A]" : "text-[#D12C3B]",
          )}
        >
          {item.amount}
        </div>

        <div className="mt-[5px] inline-flex h-[17px] items-center rounded-full bg-[#E8F8EF] px-[7px] text-[7px] font-bold leading-none text-[#15965A]">
          Berhasil
        </div>
      </div>
    </div>
  );
}

export default function NewMBankingOnboardingSavingsHistoryMock() {
  return (
    <div className="mt-[15px]">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] font-extrabold leading-tight tracking-[-0.02em] text-[#203064]">
          Riwayat Transaksi
        </div>
        <div className="text-[8px] font-normal leading-none text-[#479DF4]">
          Lihat Semua
        </div>
      </div>

      <div className="mt-[9px] flex gap-[5px] overflow-hidden">
        {monthChips.map((month) => {
          const active = month === "Jun";

          return (
            <span
              key={month}
              className={cn(
                "inline-flex h-[21px] shrink-0 items-center rounded-full px-[9px]",
                "text-[8px] font-semibold leading-none",
                active ? "bg-[#479DF4] text-white" : "bg-[#F1F3F6] text-black",
              )}
            >
              {month}
            </span>
          );
        })}
      </div>

      <div className="mt-[11px]">
        <div className="flex items-center gap-[8px]">
          <div className="shrink-0 text-[8.5px] font-extrabold leading-none tracking-[-0.02em] text-black">
            20 Juni 2026
          </div>
          <div className="h-px min-w-0 flex-1 bg-[#E5E7EB]" />
        </div>

        <div className="mt-[4px] divide-y divide-[#EEF0F4]">
          {historyItems.map((item) => (
            <HistoryRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}