import * as React from "react";
import { ArrowLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

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
    <div className="flex h-full min-h-full flex-col bg-[#F9F9F9] text-black">
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <header className="flex h-[92px] shrink-0 items-center gap-3 px-[31px] pt-[22px]">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-black transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
        </button>

        <h1 className="text-[16px] font-bold leading-tight text-black">
          Pembayaran QRIS
        </h1>
      </header>

      <main className="flex min-h-0 flex-1 flex-col px-[31px] pb-[30px] pt-[18px]">
        <div>
          <div className="flex items-start gap-[12px]">
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#ECEEF1] text-black">
              <ShoppingCart
                className="h-[20px] w-[20px] text-black"
                strokeWidth={2.4}
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

          <div className="mt-[34px]">
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

          <div className="mt-[20px]">
            <div className="text-[14px] font-bold leading-tight text-[#2F3137]">
              Sumber Dana
            </div>

            <button
              type="button"
              onClick={() => setSourceFundOpen(true)}
              className={cn(
                "mt-[8px] flex h-[115px] w-full items-center justify-between gap-4 rounded-[15px]",
                "border border-[#D8D8D8] bg-white px-[26px] py-[16px] text-left",
                "transition active:scale-[0.99]",
              )}
            >
              <div className="min-w-0">
                <div className="text-[12px] font-normal leading-none text-[#2F3137]">
                  {sourceFund.productName}
                </div>
                <div className="mt-[6px] text-[16px] font-bold leading-none text-[#2F3137]">
                  {sourceFund.accountNo}
                </div>

                <div className="mt-[15px] text-[12px] font-normal leading-none text-[#2F3137]">
                  Saldo
                </div>
                <div className="mt-[6px] text-[16px] font-bold leading-none text-[#2F3137]">
                  {sourceFund.balance}
                </div>
              </div>

              <ChevronRight
                className="h-[28px] w-[28px] shrink-0 text-black"
                strokeWidth={2.8}
              />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinuePayment}
          className={cn(
            "mt-auto h-[46px] w-full rounded-[10px] bg-[#479DF4]",
            "text-[12px] font-normal leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan
        </button>
      </main>
    </div>
  );
}