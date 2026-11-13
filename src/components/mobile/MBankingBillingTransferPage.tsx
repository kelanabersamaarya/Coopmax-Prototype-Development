import * as React from "react";
import { ArrowLeft, ScanLine } from "lucide-react";

export default function MBankingBillingTransferPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<"new" | "saved">("new");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [saveRecipient, setSaveRecipient] = React.useState(false);

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white text-[#182d58]">
      <header className="relative shrink-0 overflow-hidden bg-[#084bc8] px-6 pb-14 pt-5 text-white sm:px-8 sm:pb-16">
        <div className="pointer-events-none absolute -right-16 -top-20 h-36 w-64 rotate-[28deg] rounded-[50%] bg-[#4c7fe0]/80 sm:h-44 sm:w-72" />
        <div className="pointer-events-none absolute -right-24 top-8 h-44 w-44 rounded-full bg-[#2e69d6] sm:h-52 sm:w-52" />
        <div className="pointer-events-none absolute right-2 -top-12 h-28 w-28 rounded-full bg-[#5385e2]/70" />

        <button
          type="button"
          onClick={onBack}
          className="relative z-10 -ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition active:scale-95 sm:h-10 sm:w-10"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.1} />
        </button>
        <h1 className="relative z-10 mt-4 text-[21px] font-bold leading-tight tracking-[-0.035em] sm:mt-5 sm:text-[24px]">
          Transfer Antar Rekening
        </h1>
      </header>

      <main className="relative z-10 -mt-px min-h-0 flex-1 overflow-y-auto rounded-t-[30px] bg-white px-6 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:rounded-t-[36px] sm:px-8 sm:pt-7">
        <div className="flex items-center gap-4 text-[15px] font-bold leading-none sm:gap-6 sm:text-[18px]">
          <button
            type="button"
            onClick={() => setActiveTab("new")}
            className={`shrink-0 rounded-full px-4 py-2.5 transition sm:px-5 sm:py-3 ${
              activeTab === "new"
                ? "bg-[#084bc8] text-white"
                : "px-0 text-[#0747ad]"
            }`}
          >
            Input Baru
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`whitespace-nowrap transition ${
              activeTab === "saved" ? "text-[#084bc8]" : "text-[#0747ad]"
            }`}
          >
            Daftar Tersimpan
          </button>
        </div>

        {activeTab === "new" ? (
          <section className="mt-6 sm:mt-7">
            <label htmlFor="billing-transfer-account" className="block text-[16px] leading-tight text-[#858585] sm:text-[18px]">
              No. Rekening
            </label>
            <div className="mt-2.5 flex items-center gap-2.5 sm:mt-3 sm:gap-3">
              <input
                id="billing-transfer-account"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="Masukkan rekening tujuan"
                className="h-[54px] min-w-0 flex-1 rounded-[12px] bg-[#f1f1f1] px-3.5 text-[14px] text-[#3b3b3b] outline-none placeholder:text-[#8b8b8b] focus:ring-2 focus:ring-[#0b51c9] sm:h-[62px] sm:px-4 sm:text-[16px]"
              />
              <button
                type="button"
                className="shrink-0 text-[#0649b7] transition active:scale-95"
                aria-label="Scan nomor rekening"
              >
                <ScanLine className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.8} />
              </button>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[15px] leading-tight sm:mt-6 sm:items-center sm:gap-3 sm:text-[17px]">
              <input
                type="checkbox"
                checked={saveRecipient}
                onChange={(event) => setSaveRecipient(event.target.checked)}
                className="sr-only"
              />
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-[9px] border-2 border-[#0a50ba] text-lg leading-none text-white sm:h-8 sm:w-8 ${saveRecipient ? "bg-[#0a50ba]" : "bg-white"}`}>
                {saveRecipient ? "✓" : null}
              </span>
              <span className="max-w-[250px]">Tambah Ke Daftar Tersimpan</span>
            </label>
          </section>
        ) : (
          <section className="mt-6 rounded-2xl bg-[#f5f5f5] px-4 py-4 text-[13px] text-[#777] sm:text-[15px]">
            Belum ada rekening tersimpan.
          </section>
        )}
      </main>

      <footer className="shrink-0 bg-white px-6 pb-4 pt-2 sm:px-8 sm:pb-5">
        <button
          type="button"
          onClick={() => {
            if (activeTab === "new" && accountNumber) setAccountNumber("");
          }}
          className="h-12 w-full rounded-full bg-[#084bc8] text-[16px] text-white transition active:scale-[0.99] sm:h-14 sm:text-[18px]"
        >
          Lanjutkan
        </button>
      </footer>
    </div>
  );
}
