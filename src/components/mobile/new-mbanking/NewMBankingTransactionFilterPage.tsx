import * as React from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  RotateCcw,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

const sourceFundOptions = [
  "Simpanan Kaya - 112233111",
  "Simpanan Sukarela - 4260029",
  "Simpanan Mapan - 112233222",
];

const periodOptions = [
  "Hari Ini",
  "7 Hari Terakhir",
  "30 Hari Terakhir",
  "3 Bulan Terakhir",
  "Pilih Tanggal",
] as const;

const transactionMethods = [
  "Transfer",
  "Setoran",
  "QRIS",
  "Pembayaran",
  "Pembelian",
  "Angsuran",
];

type PeriodOption = (typeof periodOptions)[number];

export default function NewMBankingTransactionFilterPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [sourceFunds, setSourceFunds] = React.useState<string[]>([]);
  const [period, setPeriod] = React.useState<PeriodOption>("Hari Ini");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [methods, setMethods] = React.useState<string[]>([]);

  function resetFilters() {
    setSourceFunds([]);
    setPeriod("Hari Ini");
    setStartDate("");
    setEndDate("");
    setMethods([]);
  }

  function toggleSourceFund(sourceFund: string) {
    setSourceFunds((current) =>
      current.includes(sourceFund)
        ? current.filter((item) => item !== sourceFund)
        : [...current, sourceFund],
    );
  }

  function toggleMethod(method: string) {
    setMethods((current) =>
      current.includes(method)
        ? current.filter((item) => item !== method)
        : [...current, method],
    );
  }

  function choosePeriod(nextPeriod: PeriodOption) {
    setPeriod(nextPeriod);

    if (nextPeriod !== "Pilih Tanggal") {
      setStartDate("");
      setEndDate("");
    }
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

          <h1 className="min-w-0 flex-1 truncate text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Filter Transaksi
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[118px] pt-[24px]">
          <div className="grid gap-[26px]">
            <section>
              <div className="text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
                Sumber Dana
              </div>
              <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

              <div className="mt-[16px] grid grid-cols-1 gap-[10px]">
                {sourceFundOptions.map((item) => {
                  const checked = sourceFunds.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleSourceFund(item)}
                      className={cn(
                        "flex min-h-[48px] w-full items-center gap-3 rounded-[12px] border px-4 py-3 text-left transition active:scale-[0.99]",
                        checked
                          ? "border-[#479DF4] bg-[#EEF6FF]"
                          : "border-[#CDD4E0] bg-white",
                      )}
                      aria-pressed={checked}
                    >
                      <span
                        className={cn(
                          "inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] border transition",
                          checked
                            ? "border-[#479DF4] bg-[#479DF4] text-white"
                            : "border-[#CDD4E0] bg-white text-transparent",
                        )}
                      >
                        <Check className="h-[15px] w-[15px]" strokeWidth={3} />
                      </span>

                      <span className="min-w-0 flex-1 text-[14px] font-normal leading-tight text-black">
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
                Periode Transaksi
              </div>
              <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

              <div className="mt-[16px] grid grid-cols-1 gap-[10px]">
                {periodOptions.map((item) => {
                  const checked = period === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => choosePeriod(item)}
                      className={cn(
                        "flex min-h-[48px] w-full items-center gap-3 rounded-[12px] border px-4 py-3 text-left transition active:scale-[0.99]",
                        checked
                          ? "border-[#479DF4] bg-[#EEF6FF]"
                          : "border-[#CDD4E0] bg-white",
                      )}
                      aria-pressed={checked}
                    >
                      <span
                        className={cn(
                          "inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border transition",
                          checked
                            ? "border-[#479DF4] bg-[#479DF4]"
                            : "border-[#CDD4E0] bg-white",
                        )}
                      >
                        <span
                          className={cn(
                            "h-[8px] w-[8px] rounded-full bg-white transition",
                            checked ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </span>

                      <span className="min-w-0 flex-1 text-[14px] font-normal leading-tight text-black">
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>

              {period === "Pilih Tanggal" ? (
                <div className="mt-[16px] grid grid-cols-2 gap-[10px]">
                  <div>
                    <label className="text-[12px] font-normal leading-none text-[#8F8F8F]">
                      Tanggal Awal
                    </label>
                    <div className="relative mt-[8px]">
                      <input
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        placeholder="DD-MM-YYYY"
                        inputMode="numeric"
                        className={cn(
                          "h-[46px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-3 pr-9",
                          "text-[13px] font-normal text-black shadow-none outline-none",
                          "placeholder:text-[13px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                          "focus:border-[#479DF4]",
                        )}
                      />
                      <CalendarDays
                        className="pointer-events-none absolute right-3 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#8F8F8F]"
                        strokeWidth={2.4}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] font-normal leading-none text-[#8F8F8F]">
                      Tanggal Akhir
                    </label>
                    <div className="relative mt-[8px]">
                      <input
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        placeholder="DD-MM-YYYY"
                        inputMode="numeric"
                        className={cn(
                          "h-[46px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-3 pr-9",
                          "text-[13px] font-normal text-black shadow-none outline-none",
                          "placeholder:text-[13px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                          "focus:border-[#479DF4]",
                        )}
                      />
                      <CalendarDays
                        className="pointer-events-none absolute right-3 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#8F8F8F]"
                        strokeWidth={2.4}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </section>

            <section>
              <div className="text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
                Metode Transaksi
              </div>
              <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

              <div className="mt-[16px] grid grid-cols-1 gap-[10px]">
                {transactionMethods.map((item) => {
                  const checked = methods.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleMethod(item)}
                      className={cn(
                        "flex min-h-[48px] w-full items-center gap-3 rounded-[12px] border px-4 py-3 text-left transition active:scale-[0.99]",
                        checked
                          ? "border-[#479DF4] bg-[#EEF6FF]"
                          : "border-[#CDD4E0] bg-white",
                      )}
                      aria-pressed={checked}
                    >
                      <span
                        className={cn(
                          "inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] border transition",
                          checked
                            ? "border-[#479DF4] bg-[#479DF4] text-white"
                            : "border-[#CDD4E0] bg-white text-transparent",
                        )}
                      >
                        <Check className="h-[15px] w-[15px]" strokeWidth={3} />
                      </span>

                      <span className="min-w-0 flex-1 text-[14px] font-normal leading-tight text-black">
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </section>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-2 gap-[10px]">
          <button
            type="button"
            onClick={resetFilters}
            className={cn(
              "h-[52px] rounded-[8px] border border-[#D8D8D8] bg-white",
              "text-[14px] font-semibold leading-none text-[#828282]",
              "transition active:scale-[0.98]",
            )}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <RotateCcw className="h-[18px] w-[18px]" strokeWidth={2.5} />
              Reset
            </span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className={cn(
              "h-[52px] rounded-[8px] bg-[#479DF4]",
              "text-[14px] font-semibold leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Search className="h-[18px] w-[18px]" strokeWidth={2.5} />
              Terapkan
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}