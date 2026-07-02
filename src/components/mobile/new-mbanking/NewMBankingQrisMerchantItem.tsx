import { ShoppingCart } from "lucide-react";

export default function NewMBankingQrisMerchantItem() {
  return (
    <section className="px-[31px] pt-[18px]">
      <div className="flex items-start gap-[12px]">
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#479DF4] text-white">
          <ShoppingCart className="h-[20px] w-[20px]" strokeWidth={2.4} />
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
    </section>
  );
}