import * as React from "react";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  RotateCcw,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

const sourceFundOptions = [
  "Semua Sumber Dana",
  "Simpanan Kaya - 112233111",
  "Simpanan Sukarela - 4260029",
  "Simpanan Mapan - 112233222",
];

const transactionMethods = [
  "Semua",
  "Transfer",
  "Setoran",
  "QRIS",
  "Pembayaran",
  "Angsuran",
];

export default function NewMBankingTransactionFilterPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [sourceFund, setSourceFund] = React.useState("Semua Sumber Dana");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [method, setMethod] = React.useState("Semua");

  function resetFilters() {
    setSourceFund("Semua Sumber Dana");
    setStartDate("");
    setEndDate("");
    setMethod("Semua");
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

              <div className="relative mt-[16px]">
                <select
                  value={sourceFund}
                  onChange={(event) => setSourceFund(event.target.value)}
                  className={cn(
                    "h-[46px] w-full appearance-none rounded-[12px] border border-[#CDD4E0] bg-white px-4 pr-11",
                    "text-[14px] font-normal text-black shadow-none outline-none",
                    "focus:border-[#479DF4]",
                  )}
                >
                  {sourceFundOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-[#8F8F8F]"
                  strokeWidth={2.6}
                />
              </div>
            </section>

            <section>
              <div className="text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
                Periode Transaksi
              </div>
              <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

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
            </section>

            <section>
              <div className="text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
                Metode Transaksi
              </div>
              <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

              <div className="mt-[16px] flex flex-wrap gap-[10px]">
                {transactionMethods.map((item) => {
                  const active = method === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMethod(item)}
                      className={cn(
                        "h-[38px] rounded-full px-[16px] text-[13px] font-semibold leading-none transition active:scale-[0.98]",
                        active
                          ? "bg-[#479DF4] text-white"
                          : "bg-[#F1F3F6] text-black",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item}
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