import * as React from "react";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

export default function NewMBankingQrisMerchantItem() {
  const [nominal, setNominal] = React.useState("");
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);

  return (
    <section className="px-[31px] pt-[18px]">
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <div className="flex items-start gap-[12px]">
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#ECEEF1] text-black">
          <ShoppingCart className="h-[20px] w-[20px] text-black" strokeWidth={2.4} />
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
          value={nominal}
          onChange={(event) => setNominal(event.target.value)}
          placeholder="Masukkan Nominal Pembayaran"
          inputMode="decimal"
          className={cn(
            "mt-[5px] h-[41px] w-[345px] max-w-full rounded-[9px] border border-[#CDD4E0] bg-white px-4",
            "text-[14px] font-normal text-black shadow-none outline-none",
            "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
            "focus:border-[#479DF4]",
          )}
        />

        <div className="mt-[5px] text-[12px] font-normal leading-relaxed text-[#828282]">
          Pastikan nominal yang akan memotong saldo Anda sudah sesuai
        </div>
      </div>

      <div className="mt-[28px]">
        <div className="text-[14px] font-bold leading-tight text-[#2F3137]">
          Sumber Dana
        </div>

        <button
          type="button"
          onClick={() => setSourceFundOpen(true)}
          className={cn(
            "mt-[5px] flex h-[115px] w-full items-center justify-between gap-4 rounded-[15px]",
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

          <ChevronRight className="h-[28px] w-[28px] shrink-0 text-black" strokeWidth={2.8} />
        </button>
      </div>
    </section>
  );
}