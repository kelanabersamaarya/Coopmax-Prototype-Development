import * as React from "react";
import { ArrowLeft, Banknote, Copy, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingPaymentMonthSelector from "@/components/mobile/new-mbanking/NewMBankingPaymentMonthSelector";

const depositoInfo = [
  { label: "Nomor Rekening Deposito", value: "DEP112233" },
  { label: "Produk Deposito", value: "Deposito Koperasi" },
  { label: "Nominal Deposito", value: "Rp. 5.000.000,00" },
  { label: "Bunga per Tahun", value: "6,00%" },
  { label: "Saldo Bunga", value: "Rp. 600.000,00" },
  { label: "Periode Waktu", value: "12 Bulan" },
  { label: "Tanggal Pembukaan", value: "30-06-2026" },
  { label: "Tanggal Jatuh Tempo", value: "30-06-2027" },
  { label: "Rekening Penampung", value: "112233111" },
];

type DepositHistoryItem = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  status: string;
};

type DepositHistoryGroup = {
  date: string;
  month: string;
  items: DepositHistoryItem[];
};

const historyGroups: DepositHistoryGroup[] = [
  {
    date: "30 Juni 2026",
    month: "Jun",
    items: [
      {
        id: "deposit-open",
        title: "Pembukaan Deposito",
        subtitle: "Deposito Koperasi • DEP112233",
        amount: "Rp. 5.000.000,00",
        status: "Berhasil",
      },
    ],
  },
  {
    date: "30 Juli 2026",
    month: "Jul",
    items: [
      {
        id: "deposit-interest",
        title: "Bunga Deposito",
        subtitle: "Deposito Koperasi • Bunga Bulanan",
        amount: "Rp. 25.000,00",
        status: "Terjadwal",
      },
    ],
  },
];

function DepositHistoryIcon() {
  return (
    <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#EAF8EF] text-[#33AA00]">
      <Banknote className="h-[20px] w-[20px]" strokeWidth={2.6} />
    </span>
  );
}

function DepositHistoryRow({ item }: { item: DepositHistoryItem }) {
  const isScheduled = item.status === "Terjadwal";

  return (
    <div className="flex items-start justify-between gap-4 py-[14px]">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <DepositHistoryIcon />

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
        <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#15965A]">
          {item.amount}
        </div>

        <div
          className={cn(
            "mt-[7px] inline-flex h-[22px] items-center rounded-full px-[10px]",
            "text-[11px] font-semibold leading-none",
            isScheduled
              ? "bg-[#EEF6FF] text-[#2563EB]"
              : "bg-[#E8F8EF] text-[#15965A]",
          )}
        >
          {item.status}
        </div>
      </div>
    </div>
  );
}

function DepositHistoryGroupCard({ group }: { group: DepositHistoryGroup }) {
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
          <DepositHistoryRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function EmptyDepositHistory() {
  return (
    <div className="mt-[42px] rounded-[22px] bg-[#F8FAFC] px-5 py-8 text-center">
      <div className="text-[15px] font-bold text-black">
        Tidak Ada Riwayat Deposito
      </div>
      <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
        Belum ada riwayat deposito pada bulan yang dipilih.
      </div>
    </div>
  );
}

export default function NewMBankingDepositDetailPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeMonth, setActiveMonth] = React.useState("Jun");

  const filteredHistoryGroups = React.useMemo(() => {
    return historyGroups.filter((group) => group.month === activeMonth);
  }, [activeMonth]);

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
            Informasi Rekening Deposito
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pt-[24px]">
          <article
            className={cn(
              "relative overflow-hidden rounded-[24px] px-5 py-5 text-white",
              "bg-[linear-gradient(135deg,#F59E0B_0%,#EA580C_54%,#C2410C_100%)]",
              "shadow-[0_12px_28px_rgba(234,88,12,0.18)]",
            )}
          >
            <div className="pointer-events-none absolute -right-[42px] -top-[42px] h-[136px] w-[136px] rounded-full bg-white/16" />
            <div className="pointer-events-none absolute right-[48px] top-[58px] h-[64px] w-[64px] rounded-full bg-amber-100/18" />
            <div className="pointer-events-none absolute -bottom-[36px] left-[72px] h-[96px] w-[96px] rounded-full bg-orange-950/12" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[12px] font-normal leading-none text-white/78">
                    Produk Deposito
                  </div>
                  <div className="mt-[8px] text-[16px] font-bold leading-tight tracking-[-0.03em] text-white">
                    Deposito Koperasi
                  </div>
                </div>

                <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[14px] bg-white/18 text-white ring-1 ring-white/20">
                  <TrendingUp className="h-[24px] w-[24px]" strokeWidth={2.6} />
                </span>
              </div>

              <div className="mt-[24px] grid gap-[18px]">
                <div>
                  <div className="text-[12px] font-normal leading-none text-white/78">
                    Nomor Rekening Deposito
                  </div>
                  <div className="mt-[8px] flex items-center gap-2 text-[18px] font-bold leading-tight tracking-[-0.03em] text-white">
                    <span>DEP112233</span>
                    <Copy className="h-[15px] w-[15px]" strokeWidth={2.4} />
                  </div>
                </div>

                <div>
                  <div className="text-[12px] font-normal leading-none text-white/78">
                    Nominal Deposito
                  </div>
                  <div className="mt-[8px] text-[24px] font-bold leading-tight tracking-[-0.04em] text-white">
                    Rp. 5.000.000,00
                  </div>
                </div>
              </div>
            </div>
          </article>

          <section className="mt-[26px]">
            <div className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-[#203064]">
              Informasi Rekening Deposito
            </div>
            <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

            <div className="mt-[12px] grid gap-[2px]">
              {depositoInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-4 py-[8px]"
                >
                  <div className="min-w-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#203064]">
                    {item.label}
                  </div>
                  <div className="max-w-[180px] text-right text-[14px] font-normal leading-tight tracking-[-0.01em] text-black">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="-mx-6 mt-[28px] min-h-[520px] bg-white px-6 pb-[34px] pt-[24px]">
            <div className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-[#203064]">
              Riwayat Deposito
            </div>
            <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

            <NewMBankingPaymentMonthSelector
              activeMonth={activeMonth}
              onChange={setActiveMonth}
              className="mt-[18px]"
            />

            <div className="mt-[6px]">
              {filteredHistoryGroups.length > 0 ? (
                filteredHistoryGroups.map((group) => (
                  <DepositHistoryGroupCard key={group.date} group={group} />
                ))
              ) : (
                <EmptyDepositHistory />
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}