import * as React from "react";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

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
    <div className="flex items-start justify-between gap-4 py-[6px]">
      <div className="min-w-0 text-[13px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div
        className={cn(
          "max-w-[180px] text-right leading-tight text-black",
          strong ? "text-[14px] font-bold" : "text-[13px] font-normal",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function NewMBankingElectricityPaymentSuccessPage({
  providerName,
  customerName,
  customerNo,
  amount,
  adminFee,
  totalTransaction,
  sourceFund,
  onDone,
}: {
  providerName: string;
  customerName: string;
  customerNo: string;
  amount: string;
  adminFee: string;
  totalTransaction: string;
  sourceFund: SourceFundAccount;
  onDone: () => void;
}) {
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] px-5 text-black">
      <main className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-h-full items-center justify-center py-[26px]">
          <section className="flex w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white px-6 py-7 text-center shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
            <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#EAF8EF]">
              <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#33AA00] text-white">
                <Check className="h-[42px] w-[42px]" strokeWidth={3.8} />
              </div>
            </div>

            <h1 className="mt-[20px] max-w-[300px] text-[18px] font-bold leading-[1.25] tracking-[-0.025em] text-black">
              Berhasil Melakukan Pembayaran
            </h1>

            <p className="mt-[10px] max-w-[305px] text-[13px] font-normal leading-[1.4] tracking-[-0.01em] text-[#828282]">
              Pembayaran tagihan listrik Anda telah berhasil diproses.
            </p>

            <div className="mt-[18px] w-full rounded-[18px] bg-[#F6F8FB] px-5 py-5">
              <div className="text-[12px] font-normal text-[#828282]">
                Total Transaksi
              </div>
              <div className="mt-[8px] text-[22px] font-bold leading-tight text-black">
                {totalTransaction}
              </div>
            </div>

            <div className="mt-[10px] text-[12px] font-normal leading-relaxed text-[#828282]">
              30 Juni 2026, 22:15 WIB
            </div>
            <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
              Ref ID : PLN221112222
            </div>

            <div className="mt-[18px] flex min-h-[68px] w-[302px] max-w-full items-center gap-[12px] rounded-[15px] border border-[#D8D8D8] bg-white px-[18px] text-left">
              <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#479DF4] text-white shadow-sm">
                <Zap className="h-[20px] w-[20px] text-white" strokeWidth={2.6} />
              </span>

              <div className="min-w-0">
                <div className="text-[12px] font-normal leading-none text-[#828282]">
                  Penyedia
                </div>
                <div className="mt-[8px] truncate text-[14px] font-normal leading-none text-black">
                  {providerName}
                </div>
              </div>
            </div>

            <div className="mt-[12px] w-[302px] max-w-full rounded-[15px] border border-[#D8D8D8] bg-white px-[18px] py-[10px] text-left">
              <DetailRow label="Nama Pelanggan" value={customerName} />
              <DetailRow label="No. Pelanggan" value={customerNo} />
              <DetailRow label="Nominal Tagihan" value={amount} />
              <DetailRow label="Biaya Admin" value={adminFee} />

              <div className="my-[8px] border-t border-dashed border-[#D8D8D8]" />

              <DetailRow
                label="Total Transaksi"
                value={totalTransaction}
                strong
              />
            </div>

            <div className="mt-[12px] w-full text-left">
              <NewMBankingSourceFundGradientCard
                account={sourceFund}
                showChevron={false}
                showBalance={false}
                sectionLabel="Sumber Dana"
                className="min-h-[98px] shadow-none"
              />
            </div>

            <div className="mt-[22px] grid w-full grid-cols-1 gap-[8px]">
              <button
                type="button"
                onClick={() => setSaved(true)}
                className={cn(
                  "h-[42px] rounded-[10px] border-2 bg-white",
                  saved
                    ? "border-[#33AA00] text-[#33AA00]"
                    : "border-[#479DF4] text-[#479DF4]",
                  "text-[12px] font-normal leading-none transition active:scale-[0.98]",
                )}
              >
                {saved ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Check className="h-4 w-4" strokeWidth={3} />
                    Bukti Tersimpan
                  </span>
                ) : (
                  "Simpan Bukti Transaksi"
                )}
              </button>

              <button
                type="button"
                onClick={onDone}
                className={cn(
                  "h-[42px] rounded-[10px] bg-[#479DF4]",
                  "text-[12px] font-normal leading-none text-white",
                  "transition active:scale-[0.98]",
                )}
              >
                Selesai
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}