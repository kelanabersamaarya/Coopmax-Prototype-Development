import * as React from "react";
import { ArrowLeft, Eye, History } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorBillListPage from "@/components/mobile/EKolektorBillListPage";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingLoanInstallmentHistoryPage from "@/components/mobile/new-mbanking/NewMBankingLoanInstallmentHistoryPage";

export type NewMBankingLoanInstallmentAccount = {
  id: string;
  productName: string;
  accountNo: string;
  totalLoan: string;
  remainingLoan: string;
  dueDate: string;
  gracePeriod: string;
  disbursementDate: string;
  tenor: string;
  installmentNo: string;
  installmentBill: {
    totalPay: string;
    installmentNo: string;
    principal: string;
    interest: string;
    principalDebt: string;
    interestDebt: string;
    penalty: string;
    remainingLoan: string;
  };
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-[8px]">
      <div className="min-w-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#203064]">
        {label}
      </div>
      <div className="max-w-[180px] text-right text-[14px] font-normal leading-tight tracking-[-0.01em] text-black">
        {value}
      </div>
    </div>
  );
}

function BillInfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[7px]">
      <div className="min-w-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#203064]">
        {label}
      </div>
      <div
        className={cn(
          "max-w-[170px] text-right leading-tight tracking-[-0.01em]",
          highlight
            ? "text-[16px] font-bold text-black"
            : "text-[14px] font-normal text-black",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-[#203064]">
        {children}
      </h2>
      <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />
    </div>
  );
}

export default function NewMBankingLoanInstallmentDetailPage({
  account,
  onBack,
}: {
  account: NewMBankingLoanInstallmentAccount;
  onBack: () => void;
}) {
  const [showBillList, setShowBillList] = React.useState(false);
  const [showHistory, setShowHistory] = React.useState(false);

  if (showBillList) {
    return (
      <EKolektorBillListPage
        accountNo={account.accountNo}
        showSpecialNextBillInfo={false}
        singleBillWithNextInfo
        onBack={() => setShowBillList(false)}
      />
    );
  }

  if (showHistory) {
    return (
      <NewMBankingLoanInstallmentHistoryPage
        accountNo={account.accountNo}
        onBack={() => setShowHistory(false)}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
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
            Detail Pinjaman
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[118px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]">
          <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#14B8A6_0%,#0F766E_52%,#115E59_100%)] px-5 py-5 text-white">
            <div className="pointer-events-none absolute -right-[42px] -top-[42px] h-[136px] w-[136px] rounded-full bg-white/16" />
            <div className="pointer-events-none absolute right-[48px] top-[58px] h-[64px] w-[64px] rounded-full bg-emerald-200/16" />
            <div className="pointer-events-none absolute -bottom-[36px] left-[72px] h-[96px] w-[96px] rounded-full bg-teal-950/12" />

            <div className="relative z-10">
              <div className="text-[12px] font-normal leading-none text-white/78">
                Produk Pinjaman
              </div>
              <div className="mt-[8px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-white">
                {account.productName}
              </div>
              <div className="mt-[8px] text-[14px] font-normal leading-tight text-white/85">
                {account.accountNo}
              </div>
            </div>
          </div>

          <div className="mt-[14px] grid grid-cols-2 gap-[10px]">
            <button
              type="button"
              onClick={() => setShowBillList(true)}
              className={cn(
                "h-[46px] rounded-[10px] bg-[#479DF4]",
                "text-[12px] font-semibold leading-none text-white",
                "transition active:scale-[0.98]",
              )}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Eye className="h-[17px] w-[17px]" strokeWidth={2.6} />
                Lihat Tagihan
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowHistory(true)}
              className={cn(
                "h-[46px] rounded-[10px] border-2 border-[#479DF4] bg-white",
                "text-[12px] font-semibold leading-none text-[#479DF4]",
                "transition active:scale-[0.98]",
              )}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <History className="h-[17px] w-[17px]" strokeWidth={2.6} />
                Riwayat Angsuran
              </span>
            </button>
          </div>

          <section className="mt-[26px]">
            <SectionTitle>Informasi Pinjaman</SectionTitle>

            <div className="mt-[12px]">
              <InfoRow label="No Pinjaman" value={account.accountNo} />
              <InfoRow label="Produk Pinjaman" value={account.productName} />
              <InfoRow label="Grace Period" value={account.gracePeriod} />
              <InfoRow label="Tanggal Pencairan" value={account.disbursementDate} />
              <InfoRow label="Jangka Waktu" value={account.tenor} />
              <InfoRow label="Tagihan Ke" value={account.installmentNo} />
              <InfoRow label="Jatuh Tempo Tagihan" value={account.dueDate} />
              <InfoRow label="Jumlah Pinjaman" value={account.totalLoan} />
              <InfoRow label="Sisa Pinjaman" value={account.remainingLoan} />
            </div>
          </section>

          <section className="mt-[28px]">
            <SectionTitle>Tagihan Angsuran</SectionTitle>

            <div className="mt-[14px] rounded-[24px] bg-white px-5 py-5 shadow-[0_4px_14px_rgba(15,23,42,0.14)] ring-1 ring-slate-100">
              <BillInfoRow
                label="Angsuran Ke"
                value={account.installmentBill.installmentNo}
              />
              <BillInfoRow label="Pokok" value={account.installmentBill.principal} />
              <BillInfoRow label="Bunga" value={account.installmentBill.interest} />
              <BillInfoRow
                label="Hutang Pokok"
                value={account.installmentBill.principalDebt}
              />
              <BillInfoRow
                label="Hutang Bunga"
                value={account.installmentBill.interestDebt}
              />
              <BillInfoRow label="Denda" value={account.installmentBill.penalty} />

              <div className="my-[8px] h-px w-full bg-[#E7E7E7]" />

              <BillInfoRow
                label="Total Bayar"
                value={account.installmentBill.totalPay}
                highlight
              />
            </div>
          </section>
        </section>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[12px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Bayar Angsuran
        </button>
      </div>
    </div>
  );
}