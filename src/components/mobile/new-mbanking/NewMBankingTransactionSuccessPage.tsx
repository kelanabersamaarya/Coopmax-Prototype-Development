import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingTransactionSuccessPage({
  onDone,
}: {
  onDone: () => void;
}) {
  return (
    <div className="flex h-full min-h-full flex-col bg-[#F9F9F9] px-6 py-[30px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center">
        <section className="flex w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white px-7 py-9 text-center shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EEF6FF]">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#479FFE] text-white">
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

          <div className="mt-[18px] flex h-[68px] w-[302px] max-w-full flex-col justify-center rounded-[15px] border border-[#D8D8D8] bg-white px-[18px] text-left">
            <div className="text-[12px] font-normal leading-none text-[#828282]">
              Sumber Dana
            </div>
            <div className="mt-[8px] text-[14px] font-normal leading-none text-black">
              Simpanan Kaya - 112233111
            </div>
          </div>

          <div className="mt-[12px] flex h-[68px] w-[302px] max-w-full flex-col justify-center rounded-[15px] border border-[#D8D8D8] bg-white px-[18px] text-left">
            <div className="text-[12px] font-normal leading-none text-[#828282]">
              Penerima
            </div>
            <div className="mt-[8px] text-[14px] font-normal leading-none text-black">
              Mini Mart
            </div>
          </div>

          <button
            type="button"
            onClick={onDone}
            className={cn(
              "mt-[30px] h-[46px] w-full rounded-[10px] bg-[#479DF4]",
              "text-[12px] font-normal leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Selesai
          </button>
        </section>
      </main>
    </div>
  );
}