import * as React from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

function SectionDivider() {
  return <div className="my-[10px] h-px w-full bg-[#D8D8D8]" />;
}

export default function NewMBankingQrisFixedAmountPage({
  onBack,
  onContinuePayment,
}: {
  onBack: () => void;
  onContinuePayment: () => void;
}) {
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);

  return (
    <div className="relative flex h-full min-h-full flex-col bg-[#F9F9F9] text-black">
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <header className="relative shrink-0 overflow-hidden rounded-b-[20px] bg-[#004FC7] px-5 pb-9 pt-5 text-white">
        <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
        <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute right-[20px] top-[42px] h-[58px] w-[58px] rounded-full bg-white/8" />
        <div className="relative z-10 flex flex-col items-start">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={2.7} />
          </button>
          <h1 className="mt-3 text-[25px] font-extrabold leading-none tracking-tight text-white">
            Pembayaran QRIS
          </h1>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col px-6 pb-[112px] pt-[18px]">
        <div>
          <div className="flex items-start gap-[12px]">
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#084BC8] text-white">
              <ShoppingCart
                className="h-[20px] w-[20px] text-white"
                strokeWidth={2.6}
              />
            </div>

            <div className="min-w-0">
              <div className="text-[18px] font-bold leading-tight text-black">
                Mini Mart
              </div>
              <div className="mt-[6px] text-[12px] font-normal leading-relaxed text-[#828282]">
                Bali, Indonesia
              </div>
              <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
                Merchant PAN : 2211122223333
              </div>
            </div>
          </div>

          <SectionDivider />

          <div>
            <label className="text-[14px] font-bold leading-tight text-[#2F3137]">
              Nominal Pembayaran<span className="text-[#EF135D]">*</span>
            </label>

            <input
              value="Rp. 50.000,00"
              readOnly
              aria-readonly="true"
              className={cn(
                "mt-[8px] h-[41px] w-[345px] max-w-full rounded-[9px] border border-[#CDD4E0] bg-[#D9D9D9] px-4",
                "cursor-not-allowed text-[14px] font-normal text-black shadow-none outline-none",
              )}
            />

            <div className="mt-[8px] text-[12px] font-normal leading-relaxed text-[#828282]">
              Pastikan nominal yang akan memotong saldo Anda sudah sesuai
            </div>
          </div>

          <SectionDivider />

          <div>
            <div className="text-[14px] font-bold leading-tight text-[#2F3137]">
              Sumber Dana
            </div>

            <div className="mt-[8px]">
              <NewMBankingSourceFundGradientCard
                account={sourceFund}
                onClick={() => setSourceFundOpen(true)}
              />
            </div>
          </div>
        </div>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={onContinuePayment}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}