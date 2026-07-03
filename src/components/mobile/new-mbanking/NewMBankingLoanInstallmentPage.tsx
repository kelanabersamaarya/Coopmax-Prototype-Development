import * as React from "react";
import { ArrowLeft, Banknote, CalendarDays, Copy, HandCoins } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingLoanInstallmentTabs, {
  type LoanInstallmentTab,
} from "@/components/mobile/new-mbanking/NewMBankingLoanInstallmentTabs";

type LoanAccount = {
  id: string;
  productName: string;
  accountNo: string;
  totalLoan: string;
  remainingLoan: string;
  installmentAmount: string;
  dueDate: string;
  installmentNo: string;
  status: "Belum Dibayar" | "Lunas";
};

type InstallmentHistory = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  status: "Berhasil";
};

const loanAccounts: LoanAccount[] = [
  {
    id: "loan-1",
    productName: "Pinjaman Billing",
    accountNo: "SMG260004",
    totalLoan: "Rp. 12.000.000,00",
    remainingLoan: "Rp. 10.000.000,00",
    installmentAmount: "Rp. 991.666,00",
    dueDate: "25-01-2026",
    installmentNo: "Angsuran Ke-1",
    status: "Belum Dibayar",
  },
  {
    id: "loan-2",
    productName: "Pinjaman Billing",
    accountNo: "12260006",
    totalLoan: "Rp. 12.000.000,00",
    remainingLoan: "Rp. 10.553.571,00",
    installmentAmount: "Rp. 991.666,00",
    dueDate: "16-03-2027",
    installmentNo: "Angsuran Ke-1",
    status: "Belum Dibayar",
  },
  {
    id: "loan-3",
    productName: "Pinjaman Harian",
    accountNo: "072260001",
    totalLoan: "Rp. 22.000.000,00",
    remainingLoan: "Rp. 22.000.000,00",
    installmentAmount: "Rp. 916.667,00",
    dueDate: "30-09-2026",
    installmentNo: "Angsuran Ke-1",
    status: "Belum Dibayar",
  },
  {
    id: "loan-4",
    productName: "Pinjaman Bulanan",
    accountNo: "210260001",
    totalLoan: "Rp. 20.000.000,00",
    remainingLoan: "Rp. 20.000.000,00",
    installmentAmount: "Rp. 1.233.400,00",
    dueDate: "27-06-2026",
    installmentNo: "Angsuran Ke-1",
    status: "Belum Dibayar",
  },
];

const installmentHistories: InstallmentHistory[] = [
  {
    id: "history-1",
    title: "Angsuran Pinjaman",
    subtitle: "SMG260004 • Angsuran Ke-1",
    amount: "-Rp. 991.666,00",
    date: "20 Juni 2026",
    status: "Berhasil",
  },
  {
    id: "history-2",
    title: "Angsuran Pinjaman",
    subtitle: "12260006 • Angsuran Ke-1",
    amount: "-Rp. 991.666,00",
    date: "18 Juni 2026",
    status: "Berhasil",
  },
];

function LoanInfoBlock({
  label,
  value,
  withCopy = false,
}: {
  label: string;
  value: string;
  withCopy?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-normal leading-none text-white/75">
        {label}
      </div>
      <div className="mt-[7px] flex min-w-0 items-center gap-2 text-[14px] font-semibold leading-tight text-white">
        <span className="truncate">{value}</span>
        {withCopy ? (
          <Copy className="h-[13px] w-[13px] shrink-0" strokeWidth={2.4} />
        ) : null}
      </div>
    </div>
  );
}

function LoanAccountCard({ account }: { account: LoanAccount }) {
  return (
    <button
      type="button"
      className="block w-full text-left transition active:scale-[0.99]"
      aria-label={`Pilih ${account.productName} ${account.accountNo}`}
    >
      <div
        className={cn(
          "relative min-h-[224px] overflow-hidden rounded-[20px]",
          "bg-[linear-gradient(135deg,#14B8A6_0%,#0F766E_52%,#115E59_100%)]",
          "px-5 py-5 text-white shadow-[0_12px_28px_rgba(20,184,166,0.18)]",
        )}
      >
        <div className="pointer-events-none absolute -right-[42px] -top-[42px] h-[136px] w-[136px] rounded-full bg-white/16" />
        <div className="pointer-events-none absolute right-[48px] top-[58px] h-[64px] w-[64px] rounded-full bg-emerald-200/16" />
        <div className="pointer-events-none absolute -bottom-[36px] left-[72px] h-[96px] w-[96px] rounded-full bg-teal-950/12" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(15,23,42,0.12))]" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[12px] font-normal leading-none text-white/78">
                Produk Pinjaman
              </div>
              <div className="mt-[8px] truncate text-[18px] font-bold leading-tight tracking-[-0.03em] text-white">
                {account.productName}
              </div>
            </div>

            <span
              className={cn(
                "shrink-0 rounded-full px-[12px] py-[8px]",
                "text-[11px] font-semibold leading-none shadow-sm",
                account.status === "Belum Dibayar"
                  ? "bg-white text-[#0F766E]"
                  : "bg-[#E8F8EF] text-[#15965A]",
              )}
            >
              {account.status}
            </span>
          </div>

          <div className="mt-[18px] grid grid-cols-2 gap-x-4 gap-y-[18px]">
            <LoanInfoBlock
              label="No. Pinjaman"
              value={account.accountNo}
              withCopy
            />
            <LoanInfoBlock label="Angsuran" value={account.installmentNo} />
            <LoanInfoBlock label="Total Pinjaman" value={account.totalLoan} />
            <LoanInfoBlock label="Sisa Pinjaman" value={account.remainingLoan} />
            <LoanInfoBlock
              label="Jatuh Tempo"
              value={account.dueDate}
            />
            <LoanInfoBlock
              label="Total Bayar"
              value={account.installmentAmount}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

function HistoryIcon() {
  return (
    <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#EAF3FF] text-[#2563EB]">
      <HandCoins className="h-[22px] w-[22px]" strokeWidth={2.6} />
    </span>
  );
}

function InstallmentHistoryRow({ item }: { item: InstallmentHistory }) {
  return (
    <div className="flex items-start justify-between gap-4 py-[14px]">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <HistoryIcon />

        <div className="min-w-0 pt-[2px]">
          <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
            {item.title}
          </div>
          <div className="mt-[6px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
            {item.subtitle}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-[2px] text-right">
        <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#D12C3B]">
          {item.amount}
        </div>

        <div className="mt-[9px] inline-flex h-[24px] items-center rounded-full bg-[#E8F8EF] px-[11px] text-[11px] font-semibold leading-none text-[#15965A]">
          {item.status}
        </div>
      </div>
    </div>
  );
}

function InstallmentHistoryList() {
  return (
    <div className="mt-[22px]">
      <section>
        <div className="flex items-center gap-3">
          <div className="shrink-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
            Juni 2026
          </div>
          <div className="h-px min-w-0 flex-1 bg-[#E5E7EB]" />
        </div>

        <div className="mt-[8px] divide-y divide-[#EEF0F4]">
          {installmentHistories.map((item) => (
            <InstallmentHistoryRow key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function EmptyHistory() {
  return (
    <div className="mt-[42px] rounded-[22px] bg-[#F8FAFC] px-5 py-8 text-center">
      <div className="text-[15px] font-bold text-black">
        Tidak Ada Riwayat Angsuran
      </div>
      <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
        Riwayat pembayaran angsuran akan muncul setelah transaksi berhasil.
      </div>
    </div>
  );
}

export default function NewMBankingLoanInstallmentPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] =
    React.useState<LoanInstallmentTab>("rekening");

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
            Bayar Angsuran
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]">
          <NewMBankingLoanInstallmentTabs
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === "rekening" ? (
            <div className="mt-[22px] grid gap-[14px]">
              {loanAccounts.map((account) => (
                <LoanAccountCard key={account.id} account={account} />
              ))}
            </div>
          ) : installmentHistories.length > 0 ? (
            <InstallmentHistoryList />
          ) : (
            <EmptyHistory />
          )}
        </section>
      </main>

      <div className="sr-only">
        <Banknote />
        <CalendarDays />
      </div>
    </div>
  );
}