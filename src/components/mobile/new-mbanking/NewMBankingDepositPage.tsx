import * as React from "react";
import { ArrowLeft, Copy, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

const quickAmounts = [
  "Rp. 5.000",
  "Rp. 10.000",
  "Rp. 20.000",
  "Rp. 50.000",
  "Rp. 100.000",
  "Rp. 150.000",
  "Rp. 200.000",
  "Rp. 250.000",
  "Rp. 500.000",
  "Rp. 1.000.000",
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
        {children}
      </div>
      <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />
    </div>
  );
}

function DestinationAccountCard() {
  return (
    <div
      className={cn(
        "relative mt-[18px] min-h-[128px] overflow-hidden rounded-[15px]",
        "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_50%,#7C3AED_100%)]",
        "px-[18px] py-[16px] text-white",
        "shadow-[0_12px_26px_rgba(37,99,235,0.22)] ring-1 ring-white/25",
      )}
    >
      <div className="pointer-events-none absolute -right-[42px] -top-[40px] h-[128px] w-[128px] rounded-full bg-white/16" />
      <div className="pointer-events-none absolute right-[50px] top-[54px] h-[58px] w-[58px] rounded-full bg-cyan-200/16" />
      <div className="pointer-events-none absolute -bottom-[34px] left-[72px] h-[92px] w-[92px] rounded-full bg-violet-950/12" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(15,23,42,0.12))]" />

      <div className="relative z-10 flex h-full min-h-[96px] items-center gap-[13px]">
        <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#18B7A1] text-white shadow-sm ring-1 ring-white/20">
          <UserRound className="h-[24px] w-[24px] text-white" strokeWidth={2.6} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[18px] font-bold leading-tight tracking-[-0.025em] text-white">
            Arya
          </div>

          <div className="mt-[10px] flex min-w-0 items-center gap-2">
            <span className="truncate text-[14px] font-normal leading-none text-white/88">
              11122333311 - Simpanan Kaya
            </span>

            <button
              type="button"
              className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
              aria-label="Salin nomor rekening"
              title="Salin nomor rekening"
            >
              <Copy className="h-[14px] w-[14px]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewMBankingDepositPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [selectedAmount, setSelectedAmount] = React.useState("");
  const [customAmount, setCustomAmount] = React.useState("");

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
            Setoran
          </h1>
        </header>

        <div className="h-px w-full bg-[#EEF0F4]" />
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-[118px] pt-[24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section>
          <SectionTitle>Rekening Tujuan</SectionTitle>
          <DestinationAccountCard />
        </section>

        <section className="mt-[34px]">
          <SectionTitle>Nominal Setoran</SectionTitle>

          <div className="mt-[18px] grid grid-cols-2 gap-x-[18px] gap-y-[15px]">
            {quickAmounts.map((amount) => {
              const isSelected = selectedAmount === amount;

              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={cn(
                    "h-[58px] rounded-[8px] border bg-white px-3 text-center",
                    "text-[17px] font-bold leading-none tracking-[-0.02em]",
                    "transition active:scale-[0.98]",
                    isSelected
                      ? "border-[#479DF4] bg-[#EEF6FF] text-[#2563EB]"
                      : "border-[#D8D8D8] text-black",
                  )}
                >
                  {amount}
                </button>
              );
            })}
          </div>

          <input
            value={customAmount}
            onChange={(event) => {
              setCustomAmount(event.target.value);
              setSelectedAmount("");
            }}
            placeholder="Masukkan Nominal Setoran"
            inputMode="numeric"
            className={cn(
              "mt-[20px] h-[46px] w-full rounded-[10px] border border-[#CDD4E0] bg-white px-4",
              "text-[14px] font-normal text-black shadow-none outline-none",
              "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
              "focus:border-[#479DF4]",
            )}
          />
        </section>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          className={cn(
            "h-[52px] w-full rounded-full bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}