import * as React from "react";
import { Check, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import NewMBankingTransactionReceiptPage from "@/components/mobile/new-mbanking/NewMBankingTransactionReceiptPage";

const successSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

export default function NewMBankingTransactionSuccessPage({
  onDone,
}: {
  onDone: () => void;
}) {
  const [showReceipt, setShowReceipt] = React.useState(false);

  if (showReceipt) {
    return (
      <NewMBankingTransactionReceiptPage
        onBack={() => setShowReceipt(false)}
        onDone={onDone}
      />
    );
  }

  return (
    <div className="flex h-full min-h-full flex-col bg-[#F9F9F9] px-6 py-[30px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center">
        <section className="flex w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white px-7 py-9 text-center shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EAF8EF]">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#33AA00] text-white">
              <Check className="h-[54px] w-[54px]" strokeWidth={3.8} />
            </div>
          </div>

          <h1 className="mt-[30px] max-w-[300px] text-[18px] font-bold leading-[1.25] tracking-[-0.025em] text-black">
            Berhasil Melakukan Transaksi
          </h1>

          <p className="mt-[18px] max-w-[305px] text-[14px] font-normal leading-[1.45] tracking-[-0.01em] text-[#828282]">
            Pembayaran QRIS Anda telah berhasil diproses.
          </p>

          <div className="mt-[26px] w-full rounded-[18px] bg-[#F6F8FB] px-5 py-5">
            <div className="text-[12px] font-normal text-[#828282]">
              Nominal Transaksi
            </div>
            <div className="mt-[8px] text-[22px] font-bold leading-tight text-black">
              Rp. 50.000,00
            </div>
          </div>

          <div className="mt-[12px] text-[12px] font-normal leading-relaxed text-[#828282]">
            30 Juni 2026, 22:15 WIB
          </div>
          <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
            Ref ID : 112221111222
          </div>

          <div className="mt-[18px] w-full text-left">
            <NewMBankingSourceFundGradientCard
              account={successSourceFund}
              showChevron={false}
              showBalance={false}
              sectionLabel="Sumber Dana"
              className="min-h-[98px] shadow-none"
            />
          </div>

          <div className="mt-[12px] flex h-[68px] w-[302px] max-w-full items-center gap-[12px] rounded-[15px] border border-[#D8D8D8] bg-white px-[18px] text-left">
            <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-sm">
              <ShoppingCart
                className="h-[20px] w-[20px] text-white"
                strokeWidth={2.6}
              />
            </span>

            <div className="min-w-0">
              <div className="text-[12px] font-normal leading-none text-[#828282]">
                Penerima
              </div>
              <div className="mt-[8px] truncate text-[14px] font-normal leading-none text-black">
                Mini Mart
              </div>
            </div>
          </div>

          <div className="mt-[30px] grid w-full grid-cols-1 gap-[10px]">
            <button
              type="button"
              onClick={onDone}
              className={cn(
                "h-[46px] rounded-[10px] bg-[#479DF4]",
                "text-[12px] font-normal leading-none text-white",
                "transition active:scale-[0.98]",
              )}
            >
              Selesai
            </button>

            <button
              type="button"
              onClick={() => setShowReceipt(true)}
              className={cn(
                "h-[46px] rounded-[10px] border-2 border-[#479DF4] bg-white",
                "text-[12px] font-normal leading-none text-[#479DF4]",
                "transition active:scale-[0.98]",
              )}
            >
              Lihat Bukti Transaksi
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}