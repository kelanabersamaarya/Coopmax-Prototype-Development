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
      <header className="relative shrink-0 overflow-hidden bg-[#084bc8] px-[35px] pb-[76px] pt-[27px] text-white">
        <div className="pointer-events-none absolute -right-[53px] -top-[91px] h-[165px] w-[310px] rotate-[28deg] rounded-[50%] bg-[#4c7fe0]/80" />
        <div className="pointer-events-none absolute -right-[101px] top-[35px] h-[194px] w-[194px] rounded-full bg-[#2e69d6]" />
        <div className="pointer-events-none absolute right-[7px] top-[-55px] h-[128px] w-[128px] rounded-full bg-[#5385e2]/70" />

        <button
          type="button"
          onClick={onBack}
          className="relative z-10 -ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-95"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-[34px] w-[34px]" strokeWidth={2.1} />
        </button>
        <h1 className="relative z-10 mt-[27px] whitespace-nowrap text-[36px] font-bold leading-none tracking-[-0.04em]">
          Transfer Antar Rekening
        </h1>
      </header>

      <main className="relative z-10 -mt-[1px] min-h-0 flex-1 overflow-y-auto rounded-t-[38px] bg-white px-[35px] pt-[39px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-[70px] text-[27px] font-bold leading-none">
          <button
            type="button"
            onClick={() => setActiveTab("new")}
            className={`rounded-full px-[31px] py-[17px] transition ${
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
          <section className="mt-[36px]">
            <label htmlFor="billing-transfer-account" className="block text-[27px] leading-none text-[#858585]">
              No. Rekening
            </label>
            <div className="mt-[19px] flex items-center gap-[15px]">
              <input
                id="billing-transfer-account"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="Masukkan rekening tujuan"
                className="h-[93px] min-w-0 flex-1 rounded-[16px] bg-[#f1f1f1] px-[20px] text-[24px] text-[#3b3b3b] outline-none placeholder:text-[#8b8b8b] focus:ring-2 focus:ring-[#0b51c9]"
              />
              <button
                type="button"
                className="shrink-0 text-[#0649b7] transition active:scale-95"
                aria-label="Scan nomor rekening"
              >
                <ScanLine className="h-[63px] w-[63px]" strokeWidth={1.8} />
              </button>
            </div>

            <label className="mt-[31px] flex cursor-pointer items-center gap-[20px] text-[27px] leading-none">
              <input
                type="checkbox"
                checked={saveRecipient}
                onChange={(event) => setSaveRecipient(event.target.checked)}
                className="peer sr-only"
              />
              <span className={`grid h-[50px] w-[50px] shrink-0 place-items-center rounded-[16px] border-[2px] border-[#0a50ba] text-[30px] leading-none text-white ${saveRecipient ? "bg-[#0a50ba]" : "bg-white"}`}>
                {saveRecipient ? "✓" : null}
              </span>
              <span>Tambah Ke Daftar Tersimpan</span>
            </label>
          </section>
        ) : (
          <section className="mt-[42px] rounded-[18px] bg-[#f5f5f5] px-5 py-6 text-[21px] text-[#777]">
            Belum ada rekening tersimpan.
          </section>
        )}
      </main>

      <footer className="shrink-0 bg-white px-[35px] pb-[26px] pt-[16px]">
        <button
          type="button"
          onClick={() => {
            if (activeTab === "new" && accountNumber) setAccountNumber("");
          }}
          className="h-[70px] w-full rounded-full bg-[#084bc8] text-[25px] text-white transition active:scale-[0.99]"
        >
          Lanjutkan
        </button>
      </footer>
    </div>
  );
}
