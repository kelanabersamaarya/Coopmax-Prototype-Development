"use client";

import * as React from "react";
import {
  ArrowLeft,
  ChevronDown,
  CircleCheck,
  Copy,
  Landmark,
  Plus,
  ShieldCheck,
  WalletCards,
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

function SavingsCard({ account, onClick, hasStaticVa }: { account: SavingsAccount; onClick: () => void; hasStaticVa: boolean }) {
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
                <div className="text-[10px] font-normal leading-none text-[#678DD8]">No Static VA</div>
                <div className="mt-2 flex items-center gap-2 text-[14px] font-normal leading-none">
                  <span>88084260540</span>
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

function DetailSavingsCard({ accountNo, hasStaticVa }: { accountNo: string; hasStaticVa: boolean }) {
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
              <div className="text-[10px] font-normal leading-none text-[#678DD8]">No Static VA</div>
              <div className="mt-2 flex items-center gap-2 text-[12px] font-normal leading-none">
                <span>88084260540</span>
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

function StaticVaOnboarding({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
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
          <h1 className="text-[24px] font-extrabold leading-tight text-[#203064]">Tambah Saldo dengan VA</h1>
          <p className="mx-auto mt-4 max-w-[310px] text-[14px] leading-relaxed text-[#68738A]">
            Gunakan Virtual Account untuk menambahkan saldo ke rekening simpanan Anda dengan mudah dan aman.
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          <div className="flex gap-3 rounded-2xl bg-[#F5F9FF] p-4">
            <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#4BB567]" strokeWidth={2.5} />
            <p className="text-[13px] leading-relaxed text-[#44516B]">Static VA memiliki nomor rekening tetap yang dapat digunakan berulang kali.</p>
          </div>
          <div className="flex gap-3 rounded-2xl bg-[#F5F9FF] p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#004FC7]" strokeWidth={2.3} />
            <p className="text-[13px] leading-relaxed text-[#44516B]">Pembayaran akan teridentifikasi otomatis dan saldo masuk dengan aman.</p>
          </div>
        </div>
      </main>

      <footer className="shrink-0 bg-white px-6 pb-8 pt-3">
        <div className="grid gap-3">
          <button type="button" onClick={onContinue} className="h-12 rounded-[14px] bg-[#004FC7] px-5 text-[14px] font-bold text-white transition active:scale-[0.98]">Lanjutkan Dengan Static VA</button>
          <button type="button" className="h-12 rounded-[14px] border-2 border-[#004FC7] px-5 text-[14px] font-bold text-[#004FC7] transition active:scale-[0.98]">Gunakan VA Dinamis</button>
        </div>
      </footer>
    </div>
  );
}

const vaBanks = [
  { id: "bca", name: "BCA", logo: "BCA", color: "#0A4DA2" },
  { id: "mandiri", name: "Bank Mandiri", logo: "mandiri", color: "#006B5B" },
  { id: "bri", name: "BRI", logo: "BRI", color: "#00529B" },
  { id: "bni", name: "BNI", logo: "BNI", color: "#F58220" },
];

function StaticVaBankSelection({ onBack, onContinue }: { onBack: () => void; onContinue: (bankName: string) => void }) {
  const [selectedBank, setSelectedBank] = React.useState<string | null>(null);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-[#26365F]">
      <main className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]" aria-label="Kembali">
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>
        <div className="mt-8">
          <h1 className="text-[26px] font-extrabold leading-tight text-[#203064]">Pilih Bank</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Pilih bank yang ingin digunakan untuk membuat Static Virtual Account.</p>
        </div>
        <div className="mt-8 grid gap-3">
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
        <button type="button" onClick={() => selectedBank && onContinue(vaBanks.find((bank) => bank.id === selectedBank)?.name ?? "")} disabled={!selectedBank} className="h-12 w-full rounded-[14px] bg-[#004FC7] px-5 text-[14px] font-bold text-white transition enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#B8CBE8]">Lanjutkan</button>
      </footer>
    </div>
  );
}

function StaticVaPreview({ bankName, onBack, onSave }: { bankName: string; onBack: () => void; onSave: () => void }) {
  const [showSaveConfirmation, setShowSaveConfirmation] = React.useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = React.useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-[#26365F]">
      <main className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]" aria-label="Kembali">
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>
        <div className="mt-8">
          <h1 className="text-[26px] font-extrabold leading-tight text-[#203064]">Preview Static VA</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Pastikan informasi Virtual Account sudah sesuai sebelum disimpan.</p>
        </div>
        <section className="mt-8 rounded-[22px] bg-[#004FC7] p-5 text-white">
          <div className="text-[12px] text-blue-100">Bank</div>
          <div className="mt-1 text-[20px] font-extrabold">{bankName}</div>
          <div className="mt-7 text-[12px] text-blue-100">Nomor Virtual Account</div>
          <div className="mt-1 text-[25px] font-extrabold tracking-[0.08em]">8808 4260 0540</div>
        </section>
        <div className="mt-5 rounded-2xl bg-[#F5F9FF] p-4">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#004FC7]" strokeWidth={2.3} />
            <p className="text-[13px] leading-relaxed text-[#44516B]">Gunakan nomor VA ini untuk melakukan setoran ke rekening Simpanan Anda.</p>
          </div>
        </div>
      </main>
      <footer className="shrink-0 bg-white px-6 pb-8 pt-3">
        <div className="grid gap-3">
          <button type="button" onClick={() => setShowSaveConfirmation(true)} className="h-12 w-full rounded-[14px] bg-[#004FC7] px-5 text-[14px] font-bold text-white transition active:scale-[0.98]">Simpan</button>
          <button type="button" onClick={onBack} className="h-12 w-full rounded-[14px] border-2 border-[#D1D5DB] bg-white px-5 text-[14px] font-bold text-[#6B7280] transition active:scale-[0.98]">Batal</button>
        </div>
      </footer>
      {showSaveConfirmation && (
        <div className="absolute inset-0 z-20 flex items-end bg-[#172554]/35 px-4 pb-6" role="presentation">
          <div className="w-full rounded-[24px] bg-white p-6 text-[#26365F] shadow-[0_8px_30px_rgba(15,23,42,0.2)]" role="dialog" aria-modal="true" aria-labelledby="save-va-title">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-[#D9E0EA]" />
            <h2 id="save-va-title" className="mt-5 text-[20px] font-extrabold text-[#203064]">Simpan Static VA?</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Static VA dari {bankName} akan disimpan ke rekening Simpanan Anda.</p>
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
            <h2 id="preview-save-success-title" className="mt-5 text-[20px] font-extrabold text-[#203064]">Static VA Berhasil Disimpan</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Static VA telah berhasil disimpan ke rekening Simpanan Anda.</p>
            <button type="button" onClick={() => { setShowSaveSuccess(false); onSave(); }} className="mt-6 h-12 w-full rounded-[14px] bg-[#004FC7] text-[14px] font-bold text-white transition active:scale-[0.98]">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SavingsDetailPage({ accountNo, hasStaticVa, onBack, onStaticVaSaved }: { accountNo: string; hasStaticVa: boolean; onBack: () => void; onStaticVaSaved: () => void }) {
  const [showVaOnboarding, setShowVaOnboarding] = React.useState(false);
  const [showBankSelection, setShowBankSelection] = React.useState(false);
  const [selectedBankName, setSelectedBankName] = React.useState<string | null>(null);
  const [showSaveSuccess, setShowSaveSuccess] = React.useState(false);
  const [staticVaCreated, setStaticVaCreated] = React.useState(hasStaticVa);

  if (selectedBankName) {
    return <StaticVaPreview bankName={selectedBankName} onBack={() => setSelectedBankName(null)} onSave={() => { setSelectedBankName(null); setStaticVaCreated(true); setShowSaveSuccess(true); }} />;
  }

  if (showBankSelection) {
    return <StaticVaBankSelection onBack={() => setShowBankSelection(false)} onContinue={(bankName) => { setShowBankSelection(false); setSelectedBankName(bankName); }} />;
  }

  if (showVaOnboarding) {
    return <StaticVaOnboarding onBack={() => setShowVaOnboarding(false)} onContinue={() => setShowBankSelection(true)} />;
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white text-black">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-10 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]" aria-label="Kembali" title="Kembali">
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>
        <h1 className="mt-5 text-[28px] font-extrabold leading-none tracking-[-0.04em] text-[#004FC7]">Simpanan</h1>
        <div className="mt-7"><DetailSavingsCard accountNo={accountNo} hasStaticVa={staticVaCreated} /></div>
        <button type="button" onClick={() => setShowVaOnboarding(true)} className="mt-6 flex flex-col items-center text-[#26365F] transition active:scale-[0.98]" aria-label="Tambah saldo">
          <span className="grid h-[64px] w-[64px] place-items-center rounded-[16px] bg-[#004FC7] text-white"><Plus className="h-8 w-8" strokeWidth={2.3} /></span>
          <span className="mt-2 text-[14px] font-semibold leading-tight">Tambah Saldo</span>
        </button>
        <div className="mt-10 flex divide-x-2 divide-[#D0D0D0] overflow-hidden rounded-[14px] bg-[#F1F1F1]"><DateSelector date="28 Sep 2026" /><DateSelector date="28 Okt 2026" /></div>
        <section className="-mx-6 mt-7 rounded-t-[28px] bg-[#F3F3F3] px-6 pb-12 pt-7">
          <h2 className="text-[22px] font-extrabold leading-tight text-black">Riwayat Transaksi</h2>
          <div className="mt-6 grid gap-4">{transactions.map((transaction) => <TransactionItem key={transaction.title} {...transaction} />)}</div>
        </section>
      </main>
      {showSaveSuccess && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#172554]/35 px-6">
          <div className="w-full rounded-[24px] bg-white p-6 text-center text-[#26365F] shadow-[0_8px_30px_rgba(15,23,42,0.2)]" role="dialog" aria-modal="true" aria-labelledby="save-success-title">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#E8F8EC] text-[#4BB567]"><CircleCheck className="h-8 w-8" strokeWidth={2.5} /></div>
            <h2 id="save-success-title" className="mt-5 text-[20px] font-extrabold text-[#203064]">Static VA Berhasil Disimpan</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Static VA telah berhasil disimpan ke rekening Simpanan Anda.</p>
            <button type="button" onClick={() => { setShowSaveSuccess(false); onStaticVaSaved(); }} className="mt-6 h-12 w-full rounded-[14px] bg-[#004FC7] text-[14px] font-bold text-white transition active:scale-[0.98]">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

const staticVaStorageKey = "mbanking-savings-static-va-4260054";

export default function MBankingSavingsPage({ onBack }: { onBack: () => void }) {
  const [selectedAccount, setSelectedAccount] = React.useState<string | null>(null);
  const [hasStaticVa, setHasStaticVa] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(staticVaStorageKey) === "true";
  });

  const handleStaticVaSaved = () => {
    setHasStaticVa(true);
    window.localStorage.setItem(staticVaStorageKey, "true");
  };

  if (selectedAccount) return <SavingsDetailPage accountNo={selectedAccount} hasStaticVa={selectedAccount === "4260054" && hasStaticVa} onBack={() => setSelectedAccount(null)} onStaticVaSaved={handleStaticVaSaved} />;
  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-black">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-10 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="flex flex-col items-start">
          <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]" aria-label="Kembali" title="Kembali"><ArrowLeft className="h-8 w-8" strokeWidth={2.4} /></button>
          <h1 className="mt-5 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">Simpanan</h1>
        </header>
        <section className="mt-7 grid gap-4">{savingsAccounts.map((account) => <SavingsCard key={account.id} account={account} hasStaticVa={account.accountNo === "4260054" && hasStaticVa} onClick={() => setSelectedAccount(account.accountNo)} />)}</section>
      </main>
    </div>
  );
}
