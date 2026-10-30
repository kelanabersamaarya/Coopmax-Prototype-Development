"use client";

import * as React from "react";
import MBankingLoanPasswordPage from "@/components/mobile/MBankingLoanPasswordPage";
import MBankingTransactionEmptyState from "@/components/mobile/MBankingTransactionEmptyState";
import {
  ArrowLeft,
  ChevronDown,
  CircleCheck,
  Copy,
  Info,
  Landmark,
  MoreVertical,
  Plus,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";

type SavingsAccount = {
  id: string;
  productName: string;
  accountNo: string;
};

const savingsAccounts: SavingsAccount[] = [
  { id: "sukarela-1", productName: "Simpanan Sukarela", accountNo: "4260054" },
  { id: "sukarela-2", productName: "Simpanan Sukarela", accountNo: "4260055" },
  { id: "sukarela-3", productName: "Simpanan Sukarela", accountNo: "4260056" },
  { id: "sukarela-4", productName: "Simpanan Sukarela", accountNo: "4260057" },
];

const transactions = [
  {
    title: "Refund Transaksi Transfer",
    amount: "+Rp. 50,000.00",
    date: "16 Okt 2026 17:01:46",
    description: "Refund Transfer Bank Lain, Transfer ke FIRA DIYANKA - 1122334455 - -",
  },
  {
    title: "Transaksi Refund Admin Transfer",
    amount: "+Rp. 10,000.00",
    date: "16 Okt 2026 17:01:46",
    description: "Biaya Admin Refund Transfer Bank Lain, Transfer ke FIRA DIYANKA",
  },
  {
    title: "Setoran Simpanan",
    amount: "+Rp. 500,000.00",
    date: "12 Okt 2026 09:30:12",
    description: "Setoran simpanan melalui teller koperasi",
  },
];

function SavingsCard({ account, onClick, staticVaNumber, staticVaBank }: { account: SavingsAccount; onClick: () => void; staticVaNumber?: string; staticVaBank?: string }) {
  const hasStaticVa = Boolean(staticVaNumber);
  return (
    <button type="button" onClick={onClick} className="block w-full text-left transition active:scale-[0.99]" aria-label={`Buka rekening ${account.accountNo}`}>
      <div className={`relative overflow-hidden rounded-[14px] bg-[#004FC7] px-5 py-5 text-white ${hasStaticVa ? "h-[177px]" : "h-[147px]"}`}>
        <div className="pointer-events-none absolute -right-[36px] -top-[48px] h-[120px] w-[120px] rounded-full bg-white/12" />
        <div className="pointer-events-none absolute right-[22px] -top-[62px] h-[112px] w-[112px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute right-[72px] top-[18px] h-[44px] w-[44px] rounded-full bg-white/8" />
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[16px] font-normal leading-tight tracking-tight">{account.productName}</div>
            <span className="shrink-0 text-[12px] font-normal leading-none">Detail &gt;</span>
          </div>
          <div className="mt-auto">
            <div className="text-[10px] font-normal leading-none text-[#678DD8]">No Rekening</div>
            <div className="mt-2 flex items-center gap-2 text-[12px] font-normal leading-none">
              <span>{account.accountNo}</span>
              <Copy className="h-[15px] w-[15px]" strokeWidth={2.4} />
            </div>
            {hasStaticVa && (
              <div className="mt-4">
                <div className="text-[10px] font-normal leading-none text-[#678DD8]">Nomor Virtual Account {staticVaBank ?? ""}</div>
                <div className="mt-2 flex items-center gap-2 text-[14px] font-normal leading-none">
                  <span>{staticVaNumber}</span>
                  <Copy className="h-[15px] w-[15px]" strokeWidth={2.4} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function DetailSavingsCard({ accountNo, staticVaNumber, staticVaBank }: { accountNo: string; staticVaNumber?: string; staticVaBank?: string }) {
  const hasStaticVa = Boolean(staticVaNumber);

  return (
    <section className={`relative overflow-hidden rounded-[14px] bg-[#004FC7] px-5 py-5 text-white ${hasStaticVa ? "h-[177px]" : "h-[147px]"}`}>
      <div className="pointer-events-none absolute -right-[36px] -top-[48px] h-[120px] w-[120px] rounded-full bg-white/12" />
      <div className="pointer-events-none absolute right-[22px] -top-[62px] h-[112px] w-[112px] rounded-full bg-white/10" />
      <div className="pointer-events-none absolute right-[72px] top-[18px] h-[44px] w-[44px] rounded-full bg-white/8" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-[16px] font-normal leading-tight tracking-tight">Luna Thompson</div>
          <div className="mt-2 flex items-center gap-2 text-[12px] font-normal leading-none">
            <span>{accountNo}</span>
            {hasStaticVa && <Copy className="h-[15px] w-[15px]" strokeWidth={2.4} />}
          </div>
          {hasStaticVa && (
            <div className="mt-4">
              <div className="text-[10px] font-normal leading-none text-[#678DD8]">Nomor Virtual Account {staticVaBank ?? ""}</div>
              <div className="mt-2 flex items-center gap-2 text-[16px] font-normal leading-none">
                <span>{staticVaNumber}</span>
                <Copy className="h-[15px] w-[15px]" strokeWidth={2.4} />
              </div>
            </div>
          )}
        </div>
        <div className="shrink-0 pt-0.5 text-right text-[12px] font-normal leading-tight">Simpanan Sukarela</div>
      </div>
      <div className="absolute bottom-5 left-5 z-10">
        <div className="text-[10px] font-normal leading-none text-[#678DD8]">Saldo</div>
        <div className="mt-2 text-[16px] font-normal leading-tight tracking-[-0.025em]">Rp 998,617,479.17</div>
      </div>
    </section>
  );
}

function DateSelector({ date }: { date: string }) {
  return (
    <button type="button" className="flex h-[62px] flex-1 items-center justify-between gap-2 px-4 text-left text-[14px] font-semibold text-[#26365F]" aria-label={`Pilih tanggal ${date}`}>
      <span>{date}</span>
      <ChevronDown className="h-5 w-5 shrink-0 text-black" strokeWidth={2.4} />
    </button>
  );
}

function TransactionItem({ title, amount, date, description }: (typeof transactions)[number]) {
  return (
    <article className="rounded-[14px] bg-white px-5 py-5 shadow-[0_2px_7px_rgba(15,23,42,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="max-w-[58%] text-[16px] font-extrabold leading-tight text-[#26365F]">{title}</h3>
        <div className="shrink-0 text-right text-[16px] font-bold leading-tight text-[#4BB567]">{amount}</div>
      </div>
      <div className="mt-4 text-[13px] font-semibold leading-tight text-[#777777]">{date}</div>
      <p className="mt-3 text-[14px] leading-tight text-[#26365F]">{description}</p>
    </article>
  );
}

function StaticVaOnboarding({ onBack, onContinue, onUseDynamic }: { onBack: () => void; onContinue: () => void; onUseDynamic: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-[#26365F]">
      <main className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]" aria-label="Kembali">
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>

        <div className="mt-8 flex justify-center">
          <div className="relative grid h-[190px] w-[190px] place-items-center rounded-[44px] bg-[#EAF4FF]">
            <div className="absolute -right-3 top-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#004FC7] text-white">
              <Landmark className="h-7 w-7" strokeWidth={2.2} />
            </div>
            <div className="relative grid h-[106px] w-[128px] place-items-center rounded-2xl bg-[#004FC7] text-white shadow-[0_12px_24px_rgba(0,79,199,0.18)]">
              <WalletCards className="h-12 w-12" strokeWidth={1.8} />
              <span className="absolute -bottom-3 -right-3 grid h-10 w-10 place-items-center rounded-full bg-[#4BB567] text-white">
                <CircleCheck className="h-6 w-6" strokeWidth={2.5} />
              </span>
            </div>
            <div className="absolute -bottom-3 -left-3 grid h-12 w-12 place-items-center rounded-2xl bg-[#479DF4] text-white">
              <ShieldCheck className="h-6 w-6" strokeWidth={2.2} />
            </div>
          </div>
        </div>

        <div className="mt-9 text-center">
          <h1 className="text-[24px] font-extrabold leading-tight text-[#203064]">Transfer dari Bank Lain Menggunakan VA Tetap</h1>
          <p className="mx-auto mt-4 max-w-[310px] text-[14px] leading-relaxed text-[#68738A]">
            Gunakan Virtual Account Tetap untuk transfer dari bank lain ke rekening simpanan dengan lebih mudah dan praktis.
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          <div className="flex gap-3 rounded-2xl bg-[#F5F9FF] p-4">
            <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#4BB567]" strokeWidth={2.5} />
            <p className="text-[13px] leading-relaxed text-[#44516B]">Virtual Account Tetap memiliki nomor rekening tetap yang dapat digunakan berulang kali.</p>
          </div>
          <div className="flex gap-3 rounded-2xl bg-[#F5F9FF] p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#004FC7]" strokeWidth={2.3} />
            <p className="text-[13px] leading-relaxed text-[#44516B]">Pembayaran akan teridentifikasi otomatis dan saldo masuk dengan aman.</p>
          </div>
        </div>
      </main>

      <footer className="shrink-0 bg-white px-6 pb-8 pt-3">
        <div className="grid gap-3">
          <button type="button" onClick={onContinue} className="h-12 rounded-[14px] bg-[#004FC7] px-5 text-[14px] font-bold text-white transition active:scale-[0.98]">Lanjutkan Dengan Virtual Account Tetap</button>
          <button type="button" onClick={onUseDynamic} className="h-12 rounded-[14px] border-2 border-[#004FC7] px-5 text-[14px] font-bold text-[#004FC7] transition active:scale-[0.98]">Gunakan Virtual Account Sekali Pakai</button>
        </div>
      </footer>
    </div>
  );
}

const vaBanks = [
  { id: "mandiri", name: "Bank Mandiri", logo: "mandiri", color: "#006B5B" },
  { id: "bri", name: "BRI", logo: "BRI", color: "#00529B" },
  { id: "bni", name: "BNI", logo: "BNI", color: "#F58220" },
];

function StaticVaBankSelection({ onBack, onContinue, isReplacing = false }: { onBack: () => void; onContinue: (bankName: string) => void; isReplacing?: boolean }) {
  const [selectedBank, setSelectedBank] = React.useState<string | null>(null);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-[#26365F]">
      <main className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]" aria-label="Kembali">
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>
        <div className="mt-8">
          <h1 className="text-[26px] font-extrabold leading-tight text-[#203064]">Pilih Bank</h1>
        </div>
        {isReplacing && (
          <div className="mt-5 flex gap-3 rounded-[14px] bg-[#EAF3FF] p-3.5 text-[#31517F]">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#004FC7]" strokeWidth={2.4} />
            <p className="text-[13px] leading-relaxed">Virtual Account Tetap yang sudah dibuat sebelumnya akan dinonaktifkan dan diganti dengan Virtual Account Tetap baru.</p>
          </div>
        )}
        <div className={`${isReplacing ? "mt-6" : "mt-8"} grid gap-3`}>
          {vaBanks.map((bank) => (
            <button
              key={bank.id}
              type="button"
              onClick={() => setSelectedBank(bank.id)}
              className={`flex min-h-[76px] items-center gap-4 rounded-2xl border-2 px-4 text-left transition active:scale-[0.99] ${selectedBank === bank.id ? "border-[#004FC7] bg-[#F1F7FF]" : "border-[#E4EAF2] bg-white"}`}
              aria-pressed={selectedBank === bank.id}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F3F7FC] text-[12px] font-extrabold uppercase" style={{ color: bank.color }}>
                {bank.logo}
              </span>
              <span className="flex-1 text-[15px] font-semibold text-[#26365F]">{bank.name}</span>
              <span className={`grid h-6 w-6 place-items-center rounded-full border-2 ${selectedBank === bank.id ? "border-[#004FC7] bg-[#004FC7]" : "border-[#C8D1DE]"}`}>
                {selectedBank === bank.id && <CircleCheck className="h-5 w-5 text-white" strokeWidth={2.8} />}
              </span>
            </button>
          ))}
        </div>
      </main>
      <footer className="shrink-0 bg-white px-6 pb-8 pt-3">
        <div className="grid gap-3">
          <button type="button" onClick={() => selectedBank && onContinue(vaBanks.find((bank) => bank.id === selectedBank)?.name ?? "")} disabled={!selectedBank} className="h-12 w-full rounded-[14px] bg-[#004FC7] px-5 text-[14px] font-bold text-white transition enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#B8CBE8]">Lanjutkan</button>
          <button type="button" onClick={onBack} className="h-12 w-full rounded-[14px] border-2 border-[#D1D5DB] bg-white px-5 text-[14px] font-bold text-[#6B7280] transition active:scale-[0.98]">Batal</button>
        </div>
      </footer>
    </div>
  );
}

function StaticVaPreview({ accountNo, bankName, onBack, onCancel, onSave }: { accountNo: string; bankName: string; onBack: () => void; onCancel: () => void; onSave: (bankName: string) => void }) {
  const virtualAccount = `8808 ${accountNo.slice(0, 4)} ${accountNo.slice(4).padStart(4, "0")}`;
  const [showSaveConfirmation, setShowSaveConfirmation] = React.useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = React.useState(false);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white text-[#26365F]">
      <main className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]" aria-label="Kembali">
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>
        <div className="mt-8">
          <h1 className="text-[26px] font-extrabold leading-tight text-[#203064]">Pratinjau Nomor Virtual Account</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Pastikan informasi Virtual Account sudah sesuai sebelum disimpan.</p>
        </div>
        <section className="mt-8 rounded-[22px] bg-[#004FC7] p-5 text-white">
          <div className="text-[12px] text-blue-100">Bank</div>
          <div className="mt-1 text-[20px] font-extrabold">{bankName}</div>
          <div className="mt-7 text-[12px] text-blue-100">Nomor Virtual Account {bankName}</div>
          <div className="mt-1 text-[25px] font-extrabold tracking-[0.08em]">{virtualAccount}</div>
        </section>
      </main>
      <footer className="shrink-0 bg-white px-6 pb-8 pt-3">
        <div className="grid gap-3">
          <button type="button" onClick={() => setShowSaveConfirmation(true)} className="h-12 w-full rounded-[14px] bg-[#004FC7] px-5 text-[14px] font-bold text-white transition active:scale-[0.98]">Simpan</button>
          <button type="button" onClick={onCancel} className="h-12 w-full rounded-[14px] border-2 border-[#D1D5DB] bg-white px-5 text-[14px] font-bold text-[#6B7280] transition active:scale-[0.98]">Batal</button>
        </div>
      </footer>
      {showSaveConfirmation && (
        <div className="absolute inset-0 z-20 flex items-end bg-[#172554]/35 px-4 pb-6" role="presentation">
          <div className="w-full rounded-[24px] bg-white p-6 text-[#26365F] shadow-[0_8px_30px_rgba(15,23,42,0.2)]" role="dialog" aria-modal="true" aria-labelledby="save-va-title">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-[#D9E0EA]" />
            <h2 id="save-va-title" className="mt-5 text-[20px] font-extrabold text-[#203064]">Simpan Virtual Account Tetap?</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Virtual Account Tetap dari {bankName} akan disimpan ke rekening Simpanan Anda.</p>
            <div className="mt-6 grid gap-3">
              <button type="button" onClick={() => { setShowSaveConfirmation(false); setShowSaveSuccess(true); }} className="h-12 rounded-[14px] bg-[#004FC7] text-[14px] font-bold text-white transition active:scale-[0.98]">Ya, Simpan</button>
              <button type="button" onClick={() => setShowSaveConfirmation(false)} className="h-12 rounded-[14px] border-2 border-[#D1D5DB] bg-white text-[14px] font-bold text-[#6B7280] transition active:scale-[0.98]">Batal</button>
            </div>
          </div>
        </div>
      )}
      {showSaveSuccess && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#172554]/35 px-4" role="presentation">
          <div className="w-full rounded-[24px] bg-white p-6 text-center text-[#26365F] shadow-[0_8px_30px_rgba(15,23,42,0.2)]" role="dialog" aria-modal="true" aria-labelledby="preview-save-success-title">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#E8F8EC] text-[#4BB567]"><CircleCheck className="h-8 w-8" strokeWidth={2.5} /></div>
            <h2 id="preview-save-success-title" className="mt-5 text-[20px] font-extrabold text-[#203064]">Virtual Account Tetap Berhasil Disimpan</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Virtual Account Tetap telah berhasil disimpan ke rekening Simpanan Anda.</p>
            <button type="button" onClick={() => { setShowSaveSuccess(false); onSave(); }} className="mt-6 h-12 w-full rounded-[14px] bg-[#004FC7] text-[14px] font-bold text-white transition active:scale-[0.98]">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

function DynamicTransferReview({ accountNo, bankName, amount, onBack }: { accountNo: string; bankName: string; amount: string; onBack: () => void }) {
  const [openMethod, setOpenMethod] = React.useState("");
  const [remainingSeconds, setRemainingSeconds] = React.useState(5 * 60 * 60 + 51 * 60 + 13);
  const formattedAmount = Number(amount || 0).toLocaleString("id-ID");

  React.useEffect(() => {
    const timer = window.setInterval(() => setRemainingSeconds((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const timerHours = Math.floor(remainingSeconds / 3600);
  const timerMinutes = Math.floor((remainingSeconds % 3600) / 60);
  const timerSeconds = remainingSeconds % 60;
  const timerText = `${String(timerHours).padStart(2, "0")} : ${String(timerMinutes).padStart(2, "0")} : ${String(timerSeconds).padStart(2, "0")}`;
  const adminFee = 8500;
  const total = Number(amount || 0) + adminFee;
  const virtualAccount = `${bankName === "BCA" ? "5301" : bankName === "Bank Mandiri" ? "8808" : bankName === "BRI" ? "0021" : "8810"}${accountNo.replace(/\D/g, "").padStart(8, "0")}`;
  const methods = [
    { name: "m-banking", steps: ["Masukkan Kartu ATM Mandiri & PIN", "Pilih menu Transaksi Lainnya > Transfer > ke Rekening", "Pilih Virtual Account dan masukkan nomor VA di atas", "Masukkan nominal sesuai total transaksi", "Periksa detail penerima lalu konfirmasi pembayaran"] },
    { name: "Internet Banking", steps: ["Login ke internet banking bank Anda", "Pilih menu Transfer atau Virtual Account", "Masukkan nomor Virtual Account di atas", "Pastikan nominal dan penerima sudah sesuai", "Konfirmasi transaksi dan simpan bukti pembayaran"] },
    { name: "ATM", steps: ["Masukkan kartu dan PIN ATM", "Pilih menu Transfer > Virtual Account", "Masukkan nomor Virtual Account di atas", "Periksa detail transaksi", "Konfirmasi dan simpan struk pembayaran"] },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#004FC7] text-[#26365F] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="relative overflow-hidden px-6 pb-8 pt-6 text-white">
        <div className="pointer-events-none absolute -right-5 -top-16 h-[150px] w-[150px] rounded-full bg-white/10" />
        <button type="button" onClick={onBack} className="relative z-10 -ml-2 inline-flex h-10 w-10 items-center justify-center text-white" aria-label="Kembali"><ArrowLeft className="h-8 w-8" strokeWidth={2.3} /></button>
        <h1 className="relative z-10 mt-4 text-[26px] font-extrabold text-white">Review</h1>
      </header>
      <main className="bg-[#004FC7] px-4 pb-8 pt-2">
        <div className="mx-auto max-w-[380px] rounded-[20px] bg-white px-4 pb-6 pt-5 shadow-[0_4px_18px_rgba(15,23,42,0.12)]">
          <div className="relative pr-24">
            <p className="text-[14px] font-semibold text-[#B2B2B2]">Lakukan Pembayaran Sebelum</p>
            <p className="mt-3 text-[14px] font-extrabold text-[#333333]">12 Feb 2024, 10:20 WITA</p>
            <span className="absolute right-0 top-1 rounded-full bg-[#FFE3E5] px-3 py-2 text-[12px] font-extrabold tracking-[0.08em] text-[#FF3344]">{timerText}</span>
          </div>
          <div className="my-4 border-t border-[#E5E5E5]" />
          <div className="flex items-center gap-3"><div className="grid h-12 w-16 place-items-center rounded-xl bg-[#F1F1F1] text-[14px] font-extrabold text-[#0A4DA2]">{bankName}</div><div><p className="font-extrabold text-[#333333]">{bankName} VA</p><p className="text-[12px] text-[#555555]">Luna Thompson</p></div></div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F1F1F1] px-4 py-4"><span className="text-[17px] font-extrabold tracking-wide text-[#222222]">{virtualAccount}</span><button type="button" onClick={() => navigator.clipboard?.writeText(virtualAccount)} className="font-extrabold text-[#0057CE]">Salin</button></div>
          <h2 className="mt-5 text-[16px] font-extrabold text-[#263D78]">Detail Transaksi</h2>
          <div className="mt-3 rounded-[14px] bg-[#F5F5F5] p-4"><p className="text-[14px] font-semibold text-[#A0A0A0]">Ke Rekening</p><p className="mt-1 text-[16px] font-extrabold text-[#263D78]">{accountNo} - Luna Thompson</p><p className="mt-1 text-[16px] font-extrabold text-black">Simpanan Sukarela</p><div className="mt-5 -mx-4 -mb-4 rounded-[12px] border border-[#E3E3E3] bg-white p-4"><div className="flex justify-between text-[14px]"><span className="font-semibold text-[#999999]">Nominal</span><span className="font-extrabold">Rp{formattedAmount}</span></div><div className="mt-4 flex justify-between text-[14px]"><span className="font-semibold text-[#999999]">Biaya Admin</span><span className="font-extrabold">Rp{adminFee.toLocaleString("id-ID")}</span></div><div className="my-4 border-t border-dashed border-[#BDBDBD]" /><div className="font-extrabold">Total</div><div className="mt-3 flex justify-between rounded-xl bg-[#F1F1F1] px-3 py-3"><span className="font-extrabold">Rp {total.toLocaleString("id-ID")}</span><button type="button" onClick={() => navigator.clipboard?.writeText(String(total))} className="font-extrabold text-[#0057CE]">Salin</button></div><p className="mt-3 text-[10px] text-[#999999]">Pastikan anda memasukkan nominal sesuai dengan jumlah transfer</p></div></div>
          <section className="mt-6"><h2 className="text-[17px] font-extrabold text-[#263D78]">Cara Melakukan Pembayaran</h2><div className="mt-4 overflow-hidden rounded-[14px] border border-[#E1E1E1]">{methods.map((method, index) => <div key={method.name} className={index ? "border-t border-[#E8E8E8]" : ""}><button type="button" onClick={() => setOpenMethod(openMethod === method.name ? "" : method.name)} className="flex min-h-[56px] w-full items-center justify-between px-4 text-left font-bold text-[#333333]"><span>{method.name}</span><ChevronDown className={`h-5 w-5 text-black transition-transform ${openMethod === method.name ? "rotate-180" : ""}`} /></button>{openMethod === method.name && <ol className="list-decimal space-y-3 px-9 pb-5 text-[12px] leading-relaxed text-[#4A4A4A]">{method.steps.map((step) => <li key={step}>{step}</li>)}</ol>}</div>)}</div></section>
        </div>
      </main>
    </div>
  );
}

function TransferInstructions() {
  const [openMethod, setOpenMethod] = React.useState("");

  const methods = [
    {
      name: "M-Banking",
      steps: [
        "Buka aplikasi mobile banking atau e-wallet pilihan Anda.",
        "Pilih menu Transfer atau Virtual Account.",
        "Masukkan nomor Virtual Account 111222334455.",
        "Pastikan nama penerima sudah sesuai",
        "Masukkan nominal setoran sesuai total transaksi.",
        "Periksa kembali detail transaksi sebelum melanjutkan.",
        "Konfirmasi pembayaran dan simpan bukti transaksi.",
      ],
    },
    {
      name: "Internet Banking",
      steps: [
        "Masuk ke internet banking bank Anda.",
        "Pilih menu Transfer atau Pembayaran Virtual Account.",
        "Masukkan nomor Virtual Account yang tersedia.",
        "Pastikan detail penerima dan nominal sudah benar.",
        "Konfirmasi transaksi dan simpan bukti pembayaran.",
      ],
    },
    {
      name: "ATM",
      steps: [
        "Masukkan kartu dan PIN ATM Anda.",
        "Pilih menu Transfer atau Virtual Account.",
        "Masukkan nomor Virtual Account.",
        "Pastikan informasi penerima dan nominal transaksi sudah sesuai.",
        "Selesaikan pembayaran dan simpan struk transaksi.",
      ],
    },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-[16px] font-extrabold text-[#203064]">Cara Melakukan Transfer</h2>
      <div className="mt-5 overflow-hidden rounded-[14px] border border-[#E1E1E1] bg-white">
        {methods.map((method, index) => {
          const isOpen = openMethod === method.name;
          return (
            <div key={method.name} className={index > 0 ? "border-t border-[#E8E8E8]" : ""}>
              <button
                type="button"
                onClick={() => setOpenMethod(isOpen ? "" : method.name)}
                className="flex min-h-[58px] w-full items-center justify-between px-4 text-left text-[16px] font-bold text-[#333333]"
                aria-expanded={isOpen}
              >
                <span>{method.name}</span>
                <ChevronDown className={`h-5 w-5 text-black transition-transform ${isOpen ? "rotate-180" : ""}`} strokeWidth={2.3} />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 pt-1">
                  <ol className="list-decimal space-y-3 pl-5 text-[13px] leading-relaxed text-[#4A4A4A]">
                    {method.steps.map((step) => <li key={step} className="pl-1">{step}</li>)}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DynamicVaPage({ accountNo, onBack }: { accountNo: string; onBack: () => void }) {
  const [amount, setAmount] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"create" | "history">("create");
  const [showBankSelection, setShowBankSelection] = React.useState(false);
  const [reviewBank, setReviewBank] = React.useState("");
  const presets = ["10.000", "50.000", "100.000", "250.000", "500.000"];

  const addAmount = (value: string) => {
    setAmount((current) => `${current}${value}`.replace(/^0+(?=\d)/, ""));
  };

  if (reviewBank) {
    return <DynamicTransferReview accountNo={accountNo} bankName={reviewBank} amount={amount} onBack={() => setReviewBank("")} />;
  }

  if (showBankSelection) {
    return <TransferBankSelectionPage accountNo={accountNo} amount={amount} onBack={() => setShowBankSelection(false)} onContinue={(bankName) => { setShowBankSelection(false); setReviewBank(bankName); }} />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7] text-[#26365F]">
      <header className="relative shrink-0 overflow-hidden px-5 pb-6 pt-6 text-white">
        <div className="pointer-events-none absolute -right-4 -top-14 h-[130px] w-[130px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute right-16 -top-16 h-[130px] w-[130px] rounded-full bg-white/10" />
        <button type="button" onClick={onBack} className="relative z-10 -ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-white" aria-label="Kembali">
          <ArrowLeft className="h-8 w-8" strokeWidth={2.2} />
        </button>
        <h1 className="relative z-10 mt-5 text-[23px] font-extrabold leading-tight text-white">Transfer dari Bank Lain</h1>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto rounded-t-[24px] bg-white px-5 pb-8 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 border-b border-transparent text-[16px] font-extrabold text-[#004FC7]">
          <button type="button" onClick={() => setActiveTab("create")} className={`rounded-full px-4 py-2 ${activeTab === "create" ? "bg-[#004FC7] text-white" : "text-[#004FC7]"}`}>Buat VA Baru</button>
          <button type="button" onClick={() => setActiveTab("history")} className={`rounded-full px-4 py-2 ${activeTab === "history" ? "bg-[#004FC7] text-white" : "text-[#004FC7]"}`}>Riwayat VA</button>
        </div>
        {activeTab === "history" ? (
          <div className="mt-6">
            <label className="block text-[17px] text-[#777777]">Daftar Virtual Account</label>
            <input type="search" placeholder="Cari bank atau nomor virtual account..." className="mt-2 h-14 w-full rounded-[12px] bg-[#F1F1F1] px-4 text-[15px] text-[#26365F] outline-none placeholder:text-[#888888]" aria-label="Cari bank atau nomor virtual account" />
            <MBankingTransactionEmptyState title="Tidak Ada Riwayat Virtual Account" className="mt-12" />
          </div>
        ) : (
          <>
        <label className="mt-6 block text-[17px] text-[#777777]">Ke Rekening</label>
        <div className="mt-2 flex items-center justify-between rounded-[12px] bg-[#F1F1F1] px-4 py-3.5 text-[15px] text-[#26365F]">
          <span>{accountNo} - Luna Thompson</span>
          <span className="flex items-center gap-3 text-[#888888]" aria-hidden="true">
            <X className="h-4 w-4" strokeWidth={2} />
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
        <div className="mt-6 text-[17px] text-[#777777]">Saldo Rekening</div>
        <div className="mt-2 text-[20px] font-extrabold text-[#26365F]">Rp. 998.617.479,17</div>
        <div className="mt-6 text-[17px] text-[#777777]">Nominal</div>
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {presets.map((preset) => <button key={preset} type="button" onClick={() => setAmount(preset.replace(/\./g, ""))} className="shrink-0 rounded-full border-2 border-[#C8C8C8] px-3.5 py-1.5 text-[16px] font-extrabold text-[#004FC7]">{preset}</button>)}
        </div>
        <div className="mt-4 flex items-center rounded-[12px] bg-[#F1F1F1] px-4 py-3.5 text-[16px] text-[#26365F]">
          <span>Rp.</span>
          <input value={amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} onChange={(event) => setAmount(event.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Masukkan Nominal Transfer" className="ml-4 min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#888888]" aria-label="Nominal Transfer" />
        </div>
          </>
        )}
      </main>
      {activeTab === "create" && (
        <footer className="shrink-0 bg-white px-5 pb-6 pt-3">
          <button type="button" onClick={() => setShowBankSelection(true)} disabled={!amount} className="h-11 w-full rounded-full bg-[#004FC7] text-[14px] font-semibold text-white disabled:bg-[#AFC4E8]">Lanjutkan</button>
        </footer>
      )}
    </div>
  );
}

function TransferBankSelectionPage({ accountNo, amount, onBack, onContinue }: { accountNo: string; amount: string; onBack: () => void; onContinue: (bankName: string) => void }) {
  const [selectedBank, setSelectedBank] = React.useState("");
  const [bankModalOpen, setBankModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const banks = ["Bank Mandiri", "BRI", "BNI"];
  const filteredBanks = banks.filter((bank) => bank.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7] text-[#26365F]">
      <header className="relative shrink-0 overflow-hidden px-5 pb-6 pt-6 text-white">
        <div className="pointer-events-none absolute -right-4 -top-14 h-[130px] w-[130px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute right-16 -top-16 h-[130px] w-[130px] rounded-full bg-white/10" />
        <button type="button" onClick={onBack} className="relative z-10 -ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-white" aria-label="Kembali">
          <ArrowLeft className="h-8 w-8" strokeWidth={2.2} />
        </button>
        <h1 className="relative z-10 mt-5 text-[23px] font-extrabold leading-tight text-white">Pilih Metode Transfer</h1>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto rounded-t-[24px] bg-white px-5 pb-8 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="rounded-[12px] bg-[#F1F1F1] px-4 py-4">
          <div className="text-[15px] font-semibold text-[#999999]">Ke Rekening</div>
          <div className="mt-1.5 text-[17px] font-extrabold text-[#26365F]">{accountNo} - Luna Thompson</div>
          <div className="mt-1.5 text-[17px] font-extrabold text-black">Rp. {amount.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".")}</div>
        </section>
        <h2 className="mt-6 text-[18px] font-extrabold text-[#26365F]">Metode Transfer</h2>
        <button type="button" onClick={() => setBankModalOpen(true)} className="mt-3 flex w-full items-center justify-between rounded-[12px] border border-[#E5E5E5] px-4 py-3.5 text-left" aria-label="Pilih bank">
          <span><span className="block text-[14px] font-semibold text-[#999999]">Virtual Account Bank</span><span className="mt-1 block text-[17px] font-extrabold text-[#004FC7]">{selectedBank || "Pilih Bank"}</span></span>
          <span className={`grid h-5 w-5 place-items-center rounded-full border-2 border-[#004FC7] ${selectedBank ? "bg-[#004FC7]" : "bg-white"}`}><span className="h-2 w-2 rounded-full bg-white" /></span>
        </button>
      </main>
      <footer className="shrink-0 bg-white px-5 pb-6 pt-3">
        <button type="button" onClick={() => selectedBank && onContinue(selectedBank)} disabled={!selectedBank} className="h-10 w-full rounded-full bg-[#004FC7] text-[13px] font-semibold text-white disabled:bg-[#AFC4E8]">Lanjutkan</button>
      </footer>
      {bankModalOpen && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/55" role="dialog" aria-modal="true" aria-label="Pilih Metode Transfer">
          <div className="max-h-[72%] w-full rounded-t-[24px] bg-white px-4 pb-8 pt-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-extrabold text-[#26365F]">Pilih Metode Transfer</h2>
              <button type="button" onClick={() => setBankModalOpen(false)} className="text-2xl text-[#68738A]" aria-label="Tutup">×</button>
            </div>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari..." className="mt-5 h-14 w-full rounded-[12px] bg-[#F1F1F1] px-4 text-[16px] text-[#26365F] outline-none placeholder:text-[#888888]" aria-label="Cari bank" />
            <div className="mt-4 grid gap-2 overflow-y-auto">
              {filteredBanks.length ? filteredBanks.map((bank) => (
                <button key={bank} type="button" onClick={() => { setSelectedBank(bank); setBankModalOpen(false); }} className="rounded-[12px] border border-[#E5E5E5] px-4 py-3 text-left text-[16px] font-semibold text-[#26365F]">{bank}</button>
              )) : <p className="py-8 text-center text-[16px] text-[#26365F]">No data found</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TransferMethodOptions({ onGenerateDynamic, onDelete, optionsRef, showOptions, onToggleOptions, onCreateNew, onCloseOptions, virtualAccount }: { onGenerateDynamic: () => void; onDelete: () => void; optionsRef: React.RefObject<HTMLDivElement>; showOptions: boolean; onToggleOptions: () => void; onCreateNew: () => void; onCloseOptions: () => void; virtualAccount: string }) {
  const [openMethod, setOpenMethod] = React.useState("");

  const toggleMethod = (method: string) => {
    setOpenMethod((current) => (current === method ? "" : method));
  };

  return (
    <div className="mt-7 overflow-hidden rounded-[14px] border border-[#E1E1E1] bg-white">
      <div>
        <button type="button" onClick={() => toggleMethod("static")} className="flex min-h-[58px] w-full items-center justify-between px-4 text-left text-[16px] font-bold text-[#333333]" aria-expanded={openMethod === "static"}>
          <span>Virtual Account Tetap</span>
          <ChevronDown className={`h-5 w-5 text-black transition-transform ${openMethod === "static" ? "rotate-180" : ""}`} strokeWidth={2.3} />
        </button>
        {openMethod === "static" && (
          <div className="border-t border-[#E8E8E8] px-4 pb-5 pt-4">
            <div className="flex gap-3 rounded-[14px] bg-[#EAF3FF] p-3.5 text-[#31517F]">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#004FC7]" strokeWidth={2.4} />
              <p className="text-[13px] leading-relaxed">Virtual Account Tetap adalah nomor Virtual Account tetap yang dapat digunakan berulang kali untuk melakukan transfer ke rekening Simpanan Anda.</p>
            </div>
            <section className="relative mt-5 rounded-[22px] bg-[#004FC7] p-5 text-white">
              <div ref={optionsRef} className="absolute right-3 top-3 z-10">
                <button type="button" onClick={onToggleOptions} className="grid h-9 w-9 place-items-center rounded-full text-white" aria-label="Opsi Virtual Account Tetap" aria-expanded={showOptions}>
                  <MoreVertical className="h-5 w-5" strokeWidth={2.5} />
                </button>
                {showOptions && <div className="absolute right-0 top-10 z-20 w-48 rounded-[14px] bg-white p-1.5 text-[#26365F] shadow-[0_8px_24px_rgba(15,23,42,0.2)]"><button type="button" onClick={() => { onCloseOptions(); onCreateNew(); }} className="w-full rounded-[10px] px-3 py-3 text-left text-[13px] font-semibold hover:bg-[#F3F7FF]">Ubah Virtual Account Tetap</button><button type="button" onClick={() => { onCloseOptions(); onDelete(); }} className="w-full rounded-[10px] px-3 py-3 text-left text-[13px] font-semibold hover:bg-[#F3F7FF]">Hapus Virtual Account Tetap</button></div>}
              </div>
              <div className="text-[12px] text-blue-100">Bank</div>
              <div className="mt-1 text-[20px] font-extrabold">BNI</div>
              <div className="mt-6 text-[12px] text-blue-100">Nomor Virtual Account {bankName ?? ""}</div>
              <div className="mt-2 flex items-center gap-3 text-[22px] font-extrabold tracking-[0.06em]">
                <span>{virtualAccount}</span>
                <Copy className="h-5 w-5 shrink-0" strokeWidth={2.3} />
              </div>
            </section>
            <TransferInstructions />
          </div>
        )}
      </div>
      <div className="border-t border-[#E8E8E8]">
        <button type="button" onClick={() => toggleMethod("dynamic")} className="flex min-h-[58px] w-full items-center justify-between px-4 text-left text-[16px] font-bold text-[#333333]" aria-expanded={openMethod === "dynamic"}>
          <span>Virtual Account Sekali Pakai</span>
          <ChevronDown className={`h-5 w-5 text-black transition-transform ${openMethod === "dynamic" ? "rotate-180" : ""}`} strokeWidth={2.3} />
        </button>
        {openMethod === "dynamic" && (
          <div className="border-t border-[#E8E8E8] px-4 pb-5 pt-4">
            <div className="flex gap-3 rounded-[14px] bg-[#EAF3FF] p-3.5 text-[#31517F]">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#004FC7]" strokeWidth={2.4} />
              <p className="text-[13px] leading-relaxed">Virtual Account Sekali Pakai adalah nomor Virtual Account yang dibuat khusus untuk satu transaksi dan memiliki masa berlaku tertentu.</p>
            </div>
            <button type="button" onClick={onGenerateDynamic} className="mt-5 h-12 w-full rounded-[14px] bg-[#004FC7] px-5 text-[14px] font-bold text-white transition active:scale-[0.98]">Buat Virtual Account Sekali Pakai</button>
          </div>
        )}
      </div>
    </div>
  );
}

function StaticVaTransferGuide({ onBack, onCreateNew, onGenerateDynamic, onDelete, accountNo, virtualAccount, bankName }: { onBack: () => void; onCreateNew: () => void; onGenerateDynamic: () => void; onDelete: () => void; accountNo: string; virtualAccount: string; bankName?: string }) {
  const [showOptions, setShowOptions] = React.useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = React.useState(false);
  const optionsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showOptions) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showOptions]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7] text-[#26365F]">
      <header className="relative z-40 shrink-0 overflow-visible px-6 pb-8 pt-8 text-white">
        <div className="pointer-events-none absolute -right-2 -top-16 h-[148px] w-[148px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute right-12 -top-20 h-[154px] w-[154px] rounded-full bg-white/8" />
        <div className="relative z-10 flex items-center">
          <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.96]" aria-label="Kembali">
            <ArrowLeft className="h-7 w-7" strokeWidth={2.4} />
          </button>
        </div>
        <h1 className="relative z-0 mt-3 text-[26px] font-extrabold leading-tight text-white">Transfer dari Bank Lain</h1>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto rounded-t-[24px] bg-white px-6 pb-8 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <TransferMethodOptions optionsRef={optionsRef} showOptions={showOptions} onToggleOptions={() => setShowOptions((open) => !open)} onCreateNew={onCreateNew} onDelete={() => setShowDeleteConfirmation(true)} onCloseOptions={() => setShowOptions(false)} onGenerateDynamic={onGenerateDynamic} virtualAccount={virtualAccount} />
      </main>
      {showDeleteConfirmation && (
        <div className="absolute inset-0 z-50 flex items-end bg-[#172554]/35 px-4 pb-6">
          <div className="w-full rounded-[24px] bg-white p-6 text-[#26365F] shadow-[0_8px_30px_rgba(15,23,42,0.2)]">
            <h2 className="text-[20px] font-extrabold text-[#203064]">Hapus Virtual Account Tetap?</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Virtual Account Tetap akan dihapus dari rekening Simpanan Anda dan tidak dapat digunakan kembali.</p>
            <div className="mt-6 grid gap-3">
              <button type="button" onClick={() => { setShowDeleteConfirmation(false); setShowDeleteSuccess(true); }} className="h-12 rounded-[14px] bg-[#004FC7] text-[14px] font-bold text-white">Ya, Hapus</button>
              <button type="button" onClick={() => setShowDeleteConfirmation(false)} className="h-12 rounded-[14px] border-2 border-[#D1D5DB] bg-white text-[14px] font-bold text-[#6B7280]">Batal</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#172554]/35 px-4">
          <div className="w-full rounded-[24px] bg-white p-6 text-center text-[#26365F] shadow-[0_8px_30px_rgba(15,23,42,0.2)]">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#E8F8EC] text-[#4BB567]"><CircleCheck className="h-8 w-8" strokeWidth={2.5} /></div>
            <h2 className="mt-5 text-[20px] font-extrabold text-[#203064]">Virtual Account Tetap Berhasil Dihapus</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Virtual Account Tetap telah berhasil dihapus dari rekening Simpanan Anda.</p>
            <button type="button" onClick={() => { setShowDeleteSuccess(false); onDelete(); }} className="mt-6 h-12 w-full rounded-[14px] bg-[#004FC7] text-[14px] font-bold text-white">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SavingsDetailPage({ accountNo, staticVaNumber, staticVaBank: savedStaticVaBank, onBack, onStaticVaSaved, onStaticVaDeleted }: { accountNo: string; staticVaNumber?: string; staticVaBank?: string; onBack: () => void; onStaticVaSaved: (bankName: string) => void; onStaticVaDeleted: () => void }) {
  const [showVaOnboarding, setShowVaOnboarding] = React.useState(false);
  const [showBankSelection, setShowBankSelection] = React.useState(false);
  const [showTransferGuide, setShowTransferGuide] = React.useState(false);
  const [showDynamicVa, setShowDynamicVa] = React.useState(false);
  const [dynamicVaFromOnboarding, setDynamicVaFromOnboarding] = React.useState(false);
  const [selectedBankName, setSelectedBankName] = React.useState<string | null>(null);
  const [staticVaCreated, setStaticVaCreated] = React.useState(Boolean(staticVaNumber));
  const [staticVaBank, setStaticVaBank] = React.useState<string | undefined>(savedStaticVaBank);
  const currentStaticVaNumber = staticVaCreated ? (staticVaNumber ?? getStaticVaNumber(accountNo)) : undefined;

  if (showDynamicVa) {
    return <DynamicVaPage accountNo={accountNo} onBack={() => { setShowDynamicVa(false); if (dynamicVaFromOnboarding) { setShowVaOnboarding(true); setDynamicVaFromOnboarding(false); } }} />;
  }

  if (showTransferGuide) {
    return <StaticVaTransferGuide accountNo={accountNo} bankName={staticVaBank} virtualAccount={currentStaticVaNumber ?? getStaticVaNumber(accountNo)} onBack={() => setShowTransferGuide(false)} onGenerateDynamic={() => setShowDynamicVa(true)} onCreateNew={() => { setShowTransferGuide(false); setShowBankSelection(true); }} onDelete={() => { setShowTransferGuide(false); setStaticVaCreated(false); onStaticVaDeleted(); }} />;
  }

  if (selectedBankName) {
    return <StaticVaPreview
      accountNo={accountNo}
      bankName={selectedBankName}
      onBack={() => { setSelectedBankName(null); setShowBankSelection(true); }}
      onCancel={() => { setSelectedBankName(null); setShowTransferGuide(true); }}
      onSave={() => {
        setShowVaOnboarding(false);
        setShowBankSelection(false);
        setSelectedBankName(null);
        setStaticVaCreated(true);
        setStaticVaBank(selectedBankName);
        onStaticVaSaved(selectedBankName);
      }}
    />;
  }

  if (showBankSelection) {
    return <StaticVaBankSelection isReplacing={staticVaCreated} onBack={() => { setShowBankSelection(false); if (staticVaCreated) { setShowTransferGuide(true); } else { setShowVaOnboarding(true); } }} onContinue={(bankName) => { setShowBankSelection(false); setSelectedBankName(bankName); }} />;
  }

  if (showVaOnboarding) {
    return <StaticVaOnboarding onBack={() => setShowVaOnboarding(false)} onContinue={() => setShowBankSelection(true)} onUseDynamic={() => { setDynamicVaFromOnboarding(true); setShowVaOnboarding(false); setShowDynamicVa(true); }} />;
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white text-black">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-10 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]" aria-label="Kembali" title="Kembali">
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>
        <h1 className="mt-5 text-[25px] font-extrabold leading-none tracking-[-0.04em] text-[#004FC7]">Simpanan</h1>
        <div className="mt-7"><DetailSavingsCard accountNo={accountNo} staticVaNumber={currentStaticVaNumber} staticVaBank={staticVaBank} /></div>
        <button type="button" onClick={() => staticVaCreated ? setShowTransferGuide(true) : setShowVaOnboarding(true)} className="mt-6 flex flex-col items-center text-[#26365F] transition active:scale-[0.98]" aria-label="Tambah saldo">
          <span className="grid h-[64px] w-[64px] place-items-center rounded-[16px] bg-[#004FC7] text-white"><Plus className="h-8 w-8" strokeWidth={2.3} /></span>
          <span className="mt-2 text-[14px] font-semibold leading-tight">Tambah Saldo</span>
        </button>
        <div className="mt-10 flex divide-x-2 divide-[#D0D0D0] overflow-hidden rounded-[14px] bg-[#F1F1F1]"><DateSelector date="28 Sep 2026" /><DateSelector date="28 Okt 2026" /></div>
        <section className="-mx-6 mt-7 rounded-t-[28px] bg-[#F3F3F3] px-6 pb-12 pt-7">
          <h2 className="text-[22px] font-extrabold leading-tight text-black">Riwayat Transaksi</h2>
          <div className="mt-6 grid gap-4">{transactions.map((transaction) => <TransactionItem key={transaction.title} {...transaction} />)}</div>
        </section>
      </main>
    </div>
  );
}

const staticVaStorageKey = "mbanking-savings-static-va-records";
const staticVaAccountStoragePrefix = "mbanking-savings-static-va-account-";
const staticVaBankStoragePrefix = "mbanking-savings-static-va-bank-";

function getStaticVaNumber(accountNo: string) {
  return `8808 ${accountNo.slice(0, 4)} ${accountNo.slice(4).padStart(4, "0")}`;
}

function readStaticVaBanks(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const banks: Record<string, string> = {};
  for (const account of savingsAccounts) {
    const bankName = window.localStorage.getItem(`${staticVaBankStoragePrefix}${account.accountNo}`);
    if (bankName) banks[account.accountNo] = bankName;
  }
  return banks;
}

function readStaticVaAccounts(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const accounts: Record<string, string> = {};
  for (const account of savingsAccounts) {
    const savedVa = window.localStorage.getItem(`${staticVaAccountStoragePrefix}${account.accountNo}`);
    if (savedVa) accounts[account.accountNo] = savedVa;
  }

  const savedRecords = window.localStorage.getItem(staticVaStorageKey);
  if (savedRecords) {
    try {
      const parsedRecords = JSON.parse(savedRecords);
      if (parsedRecords && typeof parsedRecords === "object" && !Array.isArray(parsedRecords)) {
        for (const [accountNo, vaNumber] of Object.entries(parsedRecords)) {
          if (!accounts[accountNo] && typeof vaNumber === "string") accounts[accountNo] = vaNumber;
        }
      } else if (Array.isArray(parsedRecords)) {
        for (const accountNo of parsedRecords) {
          if (!accounts[accountNo]) accounts[accountNo] = getStaticVaNumber(accountNo);
        }
      }
    } catch {
      return accounts;
    }
  }

  const previousAccount = window.localStorage.getItem("mbanking-savings-static-va-account");
  if (previousAccount && !accounts[previousAccount]) accounts[previousAccount] = getStaticVaNumber(previousAccount);
  if (window.localStorage.getItem("mbanking-savings-static-va-4260054") === "true" && !accounts["4260054"]) {
    accounts["4260054"] = getStaticVaNumber("4260054");
  }
  return accounts;
}

function writeStaticVaAccount(accountNo: string, bankName: string) {
  const vaNumber = getStaticVaNumber(accountNo);
  window.localStorage.setItem(`${staticVaAccountStoragePrefix}${accountNo}`, vaNumber);
  window.localStorage.setItem(`${staticVaBankStoragePrefix}${accountNo}`, bankName);
  const nextAccounts = { ...readStaticVaAccounts(), [accountNo]: vaNumber };
  window.localStorage.setItem(staticVaStorageKey, JSON.stringify(nextAccounts));
  return nextAccounts;
}

function removeStaticVaAccount(accountNo: string) {
  window.localStorage.removeItem(`${staticVaAccountStoragePrefix}${accountNo}`);
  window.localStorage.removeItem(`${staticVaBankStoragePrefix}${accountNo}`);
  const nextAccounts = readStaticVaAccounts();
  delete nextAccounts[accountNo];
  window.localStorage.setItem(staticVaStorageKey, JSON.stringify(nextAccounts));
  return nextAccounts;
}

export default function MBankingSavingsPage({ onBack }: { onBack: () => void }) {
  const [selectedAccount, setSelectedAccount] = React.useState<string | null>(null);
  const [pinAccount, setPinAccount] = React.useState<string | null>(null);
  const [staticVaAccounts, setStaticVaAccounts] = React.useState<Record<string, string>>(readStaticVaAccounts);
  const [staticVaBanks, setStaticVaBanks] = React.useState<Record<string, string>>(readStaticVaBanks);

  const handleStaticVaSaved = (accountNo: string, bankName: string) => {
    setStaticVaAccounts(writeStaticVaAccount(accountNo, bankName));
    setStaticVaBanks((banks) => ({ ...banks, [accountNo]: bankName }));
  };

  const handleStaticVaDeleted = (accountNo: string) => {
    setStaticVaAccounts(removeStaticVaAccount(accountNo));
    setStaticVaBanks((banks) => {
      const nextBanks = { ...banks };
      delete nextBanks[accountNo];
      return nextBanks;
    });
  };

  if (pinAccount) {
    return (
      <MBankingLoanPasswordPage
        onBack={() => setPinAccount(null)}
        onSuccess={() => {
          setSelectedAccount(pinAccount);
          setPinAccount(null);
        }}
      />
    );
  }

  if (selectedAccount) return <SavingsDetailPage accountNo={selectedAccount} staticVaNumber={staticVaAccounts[selectedAccount]} staticVaBank={staticVaBanks[selectedAccount]} onBack={() => setSelectedAccount(null)} onStaticVaSaved={(bankName) => handleStaticVaSaved(selectedAccount, bankName)} onStaticVaDeleted={() => handleStaticVaDeleted(selectedAccount)} />;
  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-black">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-10 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="flex flex-col items-start">
          <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]" aria-label="Kembali" title="Kembali"><ArrowLeft className="h-8 w-8" strokeWidth={2.4} /></button>
          <h1 className="mt-5 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">Simpanan</h1>
        </header>
        <section className="mt-7 grid gap-4">{savingsAccounts.map((account) => <SavingsCard key={account.id} account={account} staticVaNumber={staticVaAccounts[account.accountNo]} staticVaBank={staticVaBanks[account.accountNo]} onClick={() => setPinAccount(account.accountNo)} />)}</section>
      </main>
    </div>
  );
}
