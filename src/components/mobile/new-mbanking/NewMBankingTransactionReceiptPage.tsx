import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingReceiptBrand from "@/components/mobile/new-mbanking/NewMBankingReceiptBrand";

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
    <div className="flex items-start justify-between gap-4 py-[10px]">
      <div className="min-w-0 text-left text-[14px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div
        className={cn(
          "max-w-[178px] text-right text-[14px] leading-tight text-black",
          strong ? "font-bold" : "font-normal",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function NewMBankingTransactionReceiptPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] text-black">
      <header className="flex h-[82px] shrink-0 items-center gap-3 px-[31px] pt-[18px]">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-black transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
        </button>

        <h1 className="text-[16px] font-bold leading-tight text-black">
          Bukti Transaksi
        </h1>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-6 pb-[30px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-[30px] bg-white px-[22px] pb-[28px] pt-[32px] shadow-sm">
          <NewMBankingReceiptBrand />

          <div className="mt-[42px] rounded-[24px] bg-[#F6F8FB] px-5 py-6 text-center">
            <div className="text-[12px] font-normal leading-none text-[#828282]">
              Nominal Transaksi
            </div>
            <div className="mt-[10px] text-[28px] font-bold leading-tight text-black">
              Rp. 50.000,00
            </div>
          </div>

          <div className="mt-[18px] text-center">
            <div className="text-[12px] font-normal leading-relaxed text-[#828282]">
              30 Juni 2026, 22:15 WIB
            </div>
            <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
              Ref ID : 112221111222
            </div>
          </div>

          <div className="mt-[30px]">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[14px] font-normal leading-tight text-[#8F8F8F]">
                Nama Acquirer
              </div>
              <div className="text-right text-[14px] font-normal leading-tight text-black">
                Djoin
              </div>
            </div>
          </div>

          <div className="mt-[24px]">
            <div className="text-left text-[16px] font-bold leading-tight text-black">
              Detail Transaksi
            </div>
            <div className="mt-[10px] h-px w-full bg-[#D8D8D8]" />

            <div className="mt-[8px]">
              <DetailRow label="Customer PAN" value="11222333344" />
              <DetailRow label="Nama Merchant" value="Mini Mart" />
              <DetailRow label="Merchant PAN" value="2211122223333" />
              <DetailRow label="Lokasi" value="Bali, Indonesia" />
              <DetailRow label="Sumber Dana" value="Simpanan Kaya - 112233111" />
              <DetailRow label="Status" value="Berhasil" strong />
            </div>
          </div>

          <div className="mt-[24px] rounded-[18px] border border-[#D8D8D8] bg-white px-4 py-4">
            <div className="text-left text-[12px] font-normal leading-relaxed text-[#828282]">
              Simpan bukti transaksi ini sebagai referensi pembayaran QRIS Anda.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}