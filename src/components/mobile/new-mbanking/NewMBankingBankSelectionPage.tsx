import * as React from "react";
import { ArrowLeft, Building2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

const banks = [
  "Bank Negara Indonesia",
  "Bank Central Asia",
  "Bank Mandiri",
  "Bank Rakyat Indonesia",
  "Bank Tabungan Negara",
  "Bank CIMB Niaga",
  "Bank Danamon",
  "Bank Permata",
];

export default function NewMBankingBankSelectionPage({
  onBack,
  onSelectBank,
}: {
  onBack: () => void;
  onSelectBank: (bank: string) => void;
}) {
  const [query, setQuery] = React.useState("");

  const filteredBanks = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return banks;

    return banks.filter((bank) => bank.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-white">
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
            Pilih Bank
          </h1>
        </header>

        <div className="h-px w-full bg-[#EEF0F4]" />
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-[34px] pt-[22px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-[#8F8F8F]"
            strokeWidth={2.5}
          />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari Bank Penerima"
            className={cn(
              "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-white pl-[44px] pr-4",
              "text-[14px] font-normal text-black shadow-none outline-none",
              "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
              "focus:border-[#479DF4]",
            )}
          />
        </div>

        <section className="mt-[22px] rounded-[22px] bg-white">
          {filteredBanks.map((bank) => (
            <button
              key={bank}
              type="button"
              onClick={() => onSelectBank(bank)}
              className="flex w-full items-center gap-3 border-b border-[#EEF0F4] py-[15px] text-left last:border-b-0 transition active:scale-[0.99]"
            >
              <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#F1F3F6] text-[#53657D]">
                <Building2 className="h-[21px] w-[21px]" strokeWidth={2.45} />
              </span>

              <span className="min-w-0 flex-1 truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
                {bank}
              </span>
            </button>
          ))}

          {filteredBanks.length === 0 ? (
            <div className="py-10 text-center text-[13px] font-normal text-[#8F8F8F]">
              Bank tidak ditemukan.
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}