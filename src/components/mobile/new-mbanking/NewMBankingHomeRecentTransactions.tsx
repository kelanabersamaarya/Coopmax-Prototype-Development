import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import { cn } from "@/lib/utils";

function EmptyHistory() {
  return (
    <div className="mt-[18px] rounded-[22px] bg-white px-5 py-7 text-center ring-1 ring-slate-100">
      <svg
        viewBox="0 0 160 120"
        fill="none"
        className="mx-auto h-[106px] w-[150px]"
        aria-hidden="true"
      >
        <path d="M34 50L57 32H124L142 50H34Z" fill="#A8A8A8" />
        <path d="M57 32H124L140 48H74L57 32Z" fill="#BDBDBD" />
        <path d="M55 48H125V100H55V48Z" fill="#B9B9B9" />
        <path d="M55 48L74 67H140L125 48H55Z" fill="#6F6F6F" />
        <circle cx="75" cy="74" r="3" fill="#203040" />
        <circle cx="101" cy="74" r="3" fill="#203040" />
        <path
          d="M77 91C82 84 95 84 100 91"
          stroke="#7A7A7A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <div className="mt-[10px] text-[14px] font-semibold leading-tight text-[#8F8F8F]">
        Belum Ada Riwayat Transaksi
      </div>
    </div>
  );
}

export default function NewMBankingHomeRecentTransactions({
  transactions = [],
  className,
}: {
  transactions?: MBankingTransactionHistoryEntry[];
  className?: string;
}) {
  return (
    <section className={cn("mt-[24px] pb-[34px]", className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[16px] font-bold leading-tight tracking-[-0.03em] text-black">
          Riwayat Transaksi
        </h2>

        <button
          type="button"
          className="text-[12px] font-normal leading-none text-[#479DF4] transition active:scale-[0.98]"
        >
          Lihat Semua
        </button>
      </div>

      {transactions.length === 0 ? (
        <EmptyHistory />
      ) : (
        <div className="mt-[16px] grid gap-[12px]">
          {transactions.slice(0, 3).map((transaction) => (
            <div
              key={transaction.id}
              className="rounded-[18px] bg-white px-4 py-4 ring-1 ring-slate-100"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-bold leading-tight text-black">
                    {transaction.title}
                  </div>
                  <div className="mt-[6px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
                    {transaction.accountNo}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-[13px] font-bold leading-tight text-[#33AA00]">
                    {transaction.amount}
                  </div>
                  <div className="mt-[6px] text-[11px] font-normal leading-tight text-[#8F8F8F]">
                    {transaction.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}