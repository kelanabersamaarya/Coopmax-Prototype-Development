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
    <div className="relative flex h-full min-h-full flex-col bg-[#0758C9] text-black">
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <header className="flex h-[128px] shrink-0 flex-col items-start px-[31px] pt-[18px] text-white">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-white transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[25px] w-[25px]" strokeWidth={2.7} />
        </button>

        <h1 className="mt-[12px] text-[25px] font-bold leading-tight text-white">
          Pembayaran QRIS
        </h1>
      </header>

      <main className="flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-white px-6 pb-[26px] pt-[20px]">
        <div>
          <div className="rounded-[12px] border border-[#D8D8D8] bg-white px-4 py-4">
            <div className="flex items-start gap-[12px]">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#0758C9] text-white shadow-sm">
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
          </div>

          <SectionDivider />

          <div>
            <label className="text-[14px] font-bold leading-tight text-[#2F3137]">
              Nominal Pembayaran<span className="text-[#EF135D]">*</span>
            </label>

            <div className="mt-[8px] flex h-[41px] w-[345px] max-w-full items-center rounded-[9px] border border-[#CDD4E0] bg-[#D9D9D9] px-4 select-none text-[14px] font-normal text-black">
              Rp. 50.000,00
            </div>

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

        <div className="mt-auto pt-[14px]">
          <button
            type="button"
            onClick={onContinuePayment}
            className={cn(
              "h-[52px] w-full rounded-[8px] bg-[#0758C9]",
              "text-[14px] font-bold leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Lanjutkan
          </button>
        </div>
      </main>
    </div>
  );
}