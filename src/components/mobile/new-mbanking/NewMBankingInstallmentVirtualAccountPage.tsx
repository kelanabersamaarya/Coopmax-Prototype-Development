import type { ReactNode } from "react";
import { ArrowLeft, Copy, HandCoins } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingDepositInstructionsCard from "@/components/mobile/new-mbanking/NewMBankingDepositInstructionsCard";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
        {children}
      </div>
      <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />
    </div>
  );
}

function DetailRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-[7px]">
      <div className="text-[14px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div
        className={cn(
          "text-right font-bold leading-tight text-black",
          strong ? "text-[18px] tracking-[-0.02em]" : "text-[14px]",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function LoanDestinationCard({
  productName,
  accountNo,
}: {
  productName: string;
  accountNo: string;
}) {
  return (
    <div
      className={cn(
        "relative mt-[18px] min-h-[104px] overflow-hidden rounded-[15px]",
        "bg-[linear-gradient(135deg,#14B8A6_0%,#0F766E_55%,#115E59_100%)]",
        "px-[18px] py-[13px] text-white",
      )}
    >
      <div className="pointer-events-none absolute -right-[42px] -top-[40px] h-[128px] w-[128px] rounded-full bg-white/16" />
      <div className="pointer-events-none absolute right-[50px] top-[54px] h-[58px] w-[58px] rounded-full bg-emerald-200/16" />
      <div className="pointer-events-none absolute -bottom-[34px] left-[72px] h-[92px] w-[92px] rounded-full bg-teal-950/12" />

      <div className="relative z-10 flex h-full min-h-[78px] items-center gap-[13px]">
        <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-white/20 text-white shadow-none ring-1 ring-white/20">
          <HandCoins className="h-[22px] w-[22px] text-white" strokeWidth={2.6} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[18px] font-bold leading-tight tracking-[-0.025em] text-white">
            {productName}
          </div>

          <div className="mt-[8px] flex min-w-0 items-center gap-2">
            <span className="truncate text-[14px] font-normal leading-none text-white/88">
              {accountNo}
            </span>

            <button
              type="button"
              className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
              aria-label="Salin nomor pinjaman"
              title="Salin nomor pinjaman"
            >
              <Copy className="h-[14px] w-[14px]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewMBankingInstallmentVirtualAccountPage({
  productName,
  accountNo,
  installmentNo,
  principal,
  interest,
  penalty,
  totalPay,
  onBack,
  onDone,
}: {
  productName: string;
  accountNo: string;
  installmentNo: string;
  principal: string;
  interest: string;
  penalty: string;
  totalPay: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const virtualAccount = `88820 ${accountNo.replace(/[^\d]/g, "") || "112233111"}`;

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <header className="flex h-[62px] items-center gap-3 px-6 pt-[8px]">
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
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-0 pt-[24px]">
          <div>
            <SectionTitle>Pinjaman Tujuan</SectionTitle>
            <LoanDestinationCard productName={productName} accountNo={accountNo} />
          </div>

          <section className="mt-[30px]">
            <SectionTitle>Nomor Virtual Account</SectionTitle>

            <div className="mt-[18px] flex min-h-[64px] items-center justify-between gap-4 rounded-[16px] bg-[#F1F3F6] px-4 py-3">
              <div className="min-w-0 truncate text-[20px] font-bold leading-tight tracking-[-0.02em] text-black">
                {virtualAccount}
              </div>

              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-bold leading-none text-[#479DF4] transition active:scale-[0.98]"
              >
                <Copy className="h-[17px] w-[17px]" strokeWidth={2.5} />
                Salin
              </button>
            </div>
          </section>

          <section className="mt-[30px]">
            <SectionTitle>Detail Pembayaran</SectionTitle>

            <div className="mt-[12px]">
              <DetailRow label="Angsuran Ke" value={installmentNo} />
              <DetailRow label="Pokok" value={principal} />
              <DetailRow label="Bunga" value={interest} />
              <DetailRow label="Denda" value={penalty} />

              <div className="my-[10px] border-t border-dashed border-[#D8D8D8]" />

              <DetailRow label="Total Pembayaran" value={totalPay} strong />
            </div>
          </section>

          <section className="mt-[30px]">
            <SectionTitle>Cara Melakukan Pembayaran</SectionTitle>

            <div className="mt-[18px]">
              <NewMBankingDepositInstructionsCard />
            </div>
          </section>

          <div className="sticky bottom-0 z-20 -mx-6 mt-[30px] bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
            <button
              type="button"
              onClick={onDone}
              className={cn(
                "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
                "text-[14px] font-semibold leading-none text-white",
                "transition active:scale-[0.98]",
              )}
            >
              Selesai
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}