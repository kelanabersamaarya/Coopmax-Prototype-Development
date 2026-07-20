import * as React from "react";
import { ArrowLeft, Plus, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingPaymentMonthSelector from "@/components/mobile/new-mbanking/NewMBankingPaymentMonthSelector";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingDepositEmptyHistoryState from "@/components/mobile/new-mbanking/NewMBankingDepositEmptyHistoryState";
import NewMBankingDepositReceiptPage, {
  type NewMBankingDepositReceiptData,
} from "@/components/mobile/new-mbanking/NewMBankingDepositReceiptPage";

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
    <span className="relative grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
      <WalletCards className="h-[23px] w-[23px] text-white" strokeWidth={2.35} />
      <span className="absolute right-[5px] top-[5px] grid h-[14px] w-[14px] place-items-center rounded-full bg-[#1D4ED8] text-white">
        <Plus className="h-[9px] w-[9px] text-white" strokeWidth={3.2} />
      </span>
    </span>
  );
}

function DepositHistoryRow({
  item,
  onClick,
}: {
  item: DepositHistory;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start justify-between gap-4 py-[14px] text-left transition active:scale-[0.99]"
      aria-label={`Lihat bukti ${item.title}`}
      title="Lihat bukti setoran"
    >
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
    </button>
  );
}

function getDepositCollector(channel: string) {
  const normalized = channel.trim().toLowerCase();

  if (normalized.includes("virtual account")) {
    return "Kantor";
  }

  if (normalized.includes("mobile banking")) {
    return "Dinda Sudiati";
  }

  return "Gina Farida M.M.";
}

function buildReceiptData({
  item,
  accountName,
  productName,
}: {
  item: DepositHistory;
  accountName: string;
  productName: string;
}): NewMBankingDepositReceiptData {
  const subtitleParts = item.subtitle.split("•").map((part) => part.trim());
  const channel = subtitleParts[1] || "M-Banking";

  return {
    title: item.title,
    subtitle: item.subtitle,
    amount: item.amount,
    date: item.date,
    accountNo: item.accountNo,
    accountName,
    productName: subtitleParts[0] || productName,
    channel: getDepositCollector(channel),
    status: item.status,
  };
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
  const [selectedReceipt, setSelectedReceipt] =
    React.useState<NewMBankingDepositReceiptData | null>(null);

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

  if (selectedReceipt) {
    return (
      <NewMBankingDepositReceiptPage
        receipt={selectedReceipt}
        onBack={() => setSelectedReceipt(null)}
        onDone={() => setSelectedReceipt(null)}
      />
    );
  }

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
          <NewMBankingPaymentMonthSelector
            activeMonth={activeMonth}
            onChange={setActiveMonth}
          />

          {filteredHistories.length === 0 ? (
            <NewMBankingDepositEmptyHistoryState description="Belum ada setoran untuk rekening ini pada bulan yang dipilih." />
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
                      <DepositHistoryRow
                        key={item.id}
                        item={item}
                        onClick={() =>
                          setSelectedReceipt(
                            buildReceiptData({
                              item,
                              accountName,
                              productName,
                            }),
                          )
                        }
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          <div className="sr-only">
            {accountName} {productName}
          </div>
        </section>
      </main>
    </div>
  );
}