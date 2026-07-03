import * as React from "react";
import {
  ArrowLeft,
  Banknote,
  Filter,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingTransactionFilterPage from "@/components/mobile/new-mbanking/NewMBankingTransactionFilterPage";

type TransactionItem = {
  id: string;
  type: "out" | "in";
  title: string;
  subtitle: string;
  amount: string;
};

type TransactionGroup = {
  date: string;
  items: TransactionItem[];
};

const transactionGroups: TransactionGroup[] = [
  {
    date: "20 Juni 2026",
    items: [
      {
        id: "trx-1",
        type: "out",
        title: "Transfer Keluar",
        subtitle: "Bank BCA • 8890123441",
        amount: "-Rp. 250.000,00",
      },
      {
        id: "trx-2",
        type: "in",
        title: "Setoran",
        subtitle: "Simpanan Kaya • Teller Koperasi",
        amount: "+Rp. 500.000,00",
      },
    ],
  },
  {
    date: "19 Juni 2026",
    items: [
      {
        id: "trx-3",
        type: "out",
        title: "Transfer Keluar",
        subtitle: "Bank Mandiri • 7001234567",
        amount: "-Rp. 125.000,00",
      },
      {
        id: "trx-4",
        type: "in",
        title: "Setoran",
        subtitle: "Simpanan Harian • Mobile Banking",
        amount: "+Rp. 300.000,00",
      },
    ],
  },
];

const monthChips = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function TransactionIcon({ type }: { type: TransactionItem["type"] }) {
  const isTransferOut = type === "out";
  const Icon = isTransferOut ? Send : Banknote;

  return (
    <span
      className={cn(
        "grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full",
        isTransferOut
          ? "bg-[#EAF3FF] text-[#2F80ED]"
          : "bg-[#EAF8EF] text-[#33AA00]",
      )}
    >
      <Icon className="h-[20px] w-[20px]" strokeWidth={2.6} />
    </span>
  );
}

function TransactionRow({ item }: { item: TransactionItem }) {
  const isIncome = item.type === "in";

  return (
    <div className="flex items-start justify-between gap-4 py-[14px]">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <TransactionIcon type={item.type} />

        <div className="min-w-0 pt-[2px]">
          <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
            {item.title}
          </div>
          <div className="mt-[5px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
            {item.subtitle}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-[2px] text-right">
        <div
          className={cn(
            "text-[14px] font-bold leading-tight tracking-[-0.02em]",
            isIncome ? "text-[#15965A]" : "text-[#D12C3B]",
          )}
        >
          {item.amount}
        </div>

        <div className="mt-[7px] inline-flex h-[22px] items-center rounded-full bg-[#E8F8EF] px-[10px] text-[11px] font-semibold leading-none text-[#15965A]">
          Berhasil
        </div>
      </div>
    </div>
  );
}

function TransactionGroupCard({ group }: { group: TransactionGroup }) {
  return (
    <section className="mt-[22px]">
      <div className="flex items-center gap-3">
        <div className="shrink-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
          {group.date}
        </div>
        <div className="h-px min-w-0 flex-1 bg-[#E5E7EB]" />
      </div>

      <div className="mt-[8px] divide-y divide-[#EEF0F4]">
        {group.items.map((item) => (
          <TransactionRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function NewMBankingHistoryPage({
  onBack,
  onHomeClick,
  onPortfolioClick,
  onQrisClick,
}: {
  onBack: () => void;
  onHomeClick: () => void;
  onPortfolioClick: () => void;
  onQrisClick: () => void;
}) {
  const [activeMonth, setActiveMonth] = React.useState("Jun");
  const [showFilterPage, setShowFilterPage] = React.useState(false);

  if (showFilterPage) {
    return (
      <NewMBankingTransactionFilterPage
        onBack={() => setShowFilterPage(false)}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="min-w-0 flex-1 truncate text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Riwayat Transaksi
          </h1>

          <button
            type="button"
            onClick={() => setShowFilterPage(true)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Filter riwayat transaksi"
            title="Filter"
          >
            <Filter className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-white pb-[150px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="bg-white px-6 pb-[34px] pt-[22px]">
          <div className="flex gap-[9px] overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {monthChips.map((month) => {
              const active = month === activeMonth;

              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => setActiveMonth(month)}
                  className={cn(
                    "h-[34px] shrink-0 rounded-full px-[17px]",
                    "text-[13px] font-semibold leading-none transition active:scale-[0.98]",
                    active
                      ? "bg-[#479DF4] text-white"
                      : "bg-[#F1F3F6] text-black",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {month}
                </button>
              );
            })}
          </div>

          <div className="mt-[6px]">
            {transactionGroups.map((group) => (
              <TransactionGroupCard key={group.date} group={group} />
            ))}
          </div>
        </section>
      </main>

      <NewMBankingHomeMenuSection
        activeTab="history"
        onHomeClick={onHomeClick}
        onPortfolioClick={onPortfolioClick}
        onQrisClick={onQrisClick}
      />
    </div>
  );
}