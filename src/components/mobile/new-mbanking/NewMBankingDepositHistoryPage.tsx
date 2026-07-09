import * as React from "react";
import { ArrowLeft, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingPaymentMonthSelector from "@/components/mobile/new-mbanking/NewMBankingPaymentMonthSelector";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

type DepositHistory = {
  id: string;
  accountNo: string;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  month: string;
  status: string;
};

const depositHistories: DepositHistory[] = [
  {
    id: "history-1",
    accountNo: "11122333311",
    title: "Setoran",
    subtitle: "Simpanan Kaya • Virtual Account",
    amount: "+Rp. 500.000,00",
    date: "20 Juni 2026",
    month: "Jun",
    status: "Berhasil",
  },
  {
    id: "history-2",
    accountNo: "11122333311",
    title: "Setoran",
    subtitle: "Simpanan Kaya • Teller Koperasi",
    amount: "+Rp. 100.000,00",
    date: "18 Juni 2026",
    month: "Jun",
    status: "Berhasil",
  },
  {
    id: "history-3",
    accountNo: "11122333311",
    title: "Setoran",
    subtitle: "Simpanan Kaya • Virtual Account",
    amount: "+Rp. 250.000,00",
    date: "24 Mei 2026",
    month: "Mei",
    status: "Berhasil",
  },
  {
    id: "history-4",
    accountNo: "4260029",
    title: "Setoran",
    subtitle: "Simpanan Sukarela • Mobile Banking",
    amount: "+Rp. 100.000,00",
    date: "20 Juni 2026",
    month: "Jun",
    status: "Berhasil",
  },
];

function HistoryIcon() {
  return (
    <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
      <Banknote className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
    </span>
  );
}

function DepositHistoryRow({ item }: { item: DepositHistory }) {
  return (
    <div className="flex items-start justify-between gap-4 py-[14px]">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <HistoryIcon />

        <div className="min-w-0 pt-[2px]">
          <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
            {item.title}
          </div>
          <div className="mt-[6px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
            {item.subtitle}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-[2px] text-right">
        <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#00965A]">
          {item.amount}
        </div>

        <div className="mt-[9px] inline-flex h-[24px] items-center rounded-full bg-[#E8F8EF] px-[11px] text-[11px] font-semibold leading-none text-[#15965A]">
          {item.status}
        </div>
      </div>
    </div>
  );
}

function EmptyDepositHistory() {
  return (
    <div className="mt-[42px] rounded-[22px] bg-[#F8FAFC] px-5 py-8 text-center">
      <div className="text-[15px] font-bold text-black">
        Tidak Ada Riwayat Setoran
      </div>
      <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
        Belum ada setoran untuk rekening ini pada bulan yang dipilih.
      </div>
    </div>
  );
}

export default function NewMBankingDepositHistoryPage({
  accountNo,
  accountName,
  productName,
  onBack,
}: {
  accountNo: string;
  accountName: string;
  productName: string;
  onBack: () => void;
}) {
  const [activeMonth, setActiveMonth] = React.useState("Jun");

  const filteredHistories = React.useMemo(() => {
    return depositHistories.filter(
      (item) => item.accountNo === accountNo && item.month === activeMonth,
    );
  }, [accountNo, activeMonth]);

  const grouped = React.useMemo(() => {
    return filteredHistories.reduce<Record<string, DepositHistory[]>>((acc, item) => {
      acc[item.date] = [...(acc[item.date] ?? []), item];
      return acc;
    }, {});
  }, [filteredHistories]);

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
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

          <h1 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Riwayat Setoran
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]">
          <div className="rounded-[18px] bg-[#F8FAFC] px-4 py-4 ring-1 ring-[#E5E7EB]">
            <div className="text-[12px] font-normal leading-none text-[#8F8F8F]">
              Rekening
            </div>
            <div className="mt-[8px] text-[15px] font-bold leading-tight text-black">
              {accountName}
            </div>
            <div className="mt-[6px] text-[12px] font-normal leading-tight text-[#8F8F8F]">
              {accountNo} • {productName}
            </div>
          </div>

          <NewMBankingPaymentMonthSelector
            activeMonth={activeMonth}
            onChange={setActiveMonth}
            className="mt-[18px]"
          />

          {filteredHistories.length === 0 ? (
            <EmptyDepositHistory />
          ) : (
            <div className="mt-[22px]">
              {Object.entries(grouped).map(([date, items]) => (
                <section key={date}>
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
                      {date}
                    </div>
                    <div className="h-px min-w-0 flex-1 bg-[#E5E7EB]" />
                  </div>

                  <div className="mt-[8px] divide-y divide-[#EEF0F4]">
                    {items.map((item) => (
                      <DepositHistoryRow key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}