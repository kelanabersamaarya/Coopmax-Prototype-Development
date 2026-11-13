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
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#084bc8] text-[#182d58]">
      <header className="relative shrink-0 overflow-hidden bg-[#084bc8] px-6 pb-10 pt-5 text-white sm:px-8 sm:pb-12">
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
        <h1 className="relative z-10 mt-3 text-[25px] font-bold leading-tight tracking-[-0.035em]">
          Transfer Antar Rekening
        </h1>
      </header>

      <main className="relative z-10 -mt-px min-h-0 flex-1 overflow-y-auto rounded-t-[20px] bg-white px-5 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:rounded-t-[20px] sm:px-7 sm:pt-6">
        <div className="flex items-center gap-2.5 text-[12px] font-bold leading-none sm:gap-4 sm:text-[14px]">
          <button
            type="button"
            onClick={() => setActiveTab("new")}
            className={`shrink-0 rounded-full px-2.5 py-1.5 transition sm:px-3.5 sm:py-2 ${
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
          <section className="mt-4 sm:mt-5">
            <label htmlFor="billing-transfer-account" className="block text-[12px] leading-tight text-[#858585] sm:text-[14px]">
              No. Rekening
            </label>
            <div className="mt-2 flex items-center gap-2 sm:mt-2.5 sm:gap-2.5">
              <input
                id="billing-transfer-account"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="Masukkan rekening tujuan"
                className="h-[42px] min-w-0 flex-1 rounded-[9px] bg-[#f1f1f1] px-2.5 text-[11px] text-[#3b3b3b] outline-none placeholder:text-[#8b8b8b] focus:ring-2 focus:ring-[#0b51c9] sm:h-[50px] sm:px-3 sm:text-[13px]"
              />
              <button
                type="button"
                className="shrink-0 text-[#0649b7] transition active:scale-95"
                aria-label="Scan nomor rekening"
              >
                <ScanLine className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.8} />
              </button>
            </div>

            <label className="mt-3.5 flex cursor-pointer items-start gap-1.5 text-[11px] leading-tight sm:mt-4 sm:items-center sm:gap-2 sm:text-[13px]">
              <input
                type="checkbox"
                checked={saveRecipient}
                onChange={(event) => setSaveRecipient(event.target.checked)}
                className="sr-only"
              />
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-[7px] border-2 border-[#0a50ba] text-sm leading-none text-white sm:h-6 sm:w-6 ${saveRecipient ? "bg-[#0a50ba]" : "bg-white"}`}>
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
          className="h-10 w-full rounded-full bg-[#084bc8] text-[14px] text-white transition active:scale-[0.99] sm:h-12 sm:text-[16px]"
        >
          Lanjutkan
        </button>
      </footer>
    </div>
  );
}
