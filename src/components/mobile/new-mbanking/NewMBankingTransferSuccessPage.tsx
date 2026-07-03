import * as React from "react";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

const transferSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

export default function NewMBankingTransferSuccessPage({
  recipientAccountNo,
  nominal,
  description,
  onDone,
}: {
  recipientAccountNo: string;
  nominal: string;
  description: string;
  onDone: () => void;
}) {
  const [saved, setSaved] = React.useState(false);

  const displayedRecipientAccount = recipientAccountNo.trim() || "22111122333";
  const displayedNominal = nominal.trim() || "50.000,00";
  const displayedDescription = description.trim() || "Bayar UKT";

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
            Transfer antar bank Anda telah berhasil diproses.
          </p>

          <div className="mt-[26px] w-full rounded-[18px] bg-[#F6F8FB] px-5 py-5">
            <div className="text-[12px] font-normal text-[#828282]">
              Nominal Transaksi
            </div>
            <div className="mt-[8px] text-[22px] font-bold leading-tight text-black">
              Rp. {displayedNominal}
            </div>
          </div>

          <div className="mt-[12px] text-[12px] font-normal leading-relaxed text-[#828282]">
            30 Juni 2026, 22:15 WIB
          </div>
          <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
            Ref ID : TRF221112222
          </div>

          <div className="mt-[18px] w-full text-left">
            <NewMBankingSourceFundGradientCard
              account={transferSourceFund}
              showChevron={false}
              showBalance={false}
              sectionLabel="Sumber Dana"
              className="min-h-[98px] shadow-none"
            />
          </div>

          <div className="mt-[12px] flex h-[68px] w-[302px] max-w-full items-center gap-[12px] rounded-[15px] border border-[#D8D8D8] bg-white px-[18px] text-left">
            <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#479DF4] text-white shadow-sm">
              <Send className="h-[20px] w-[20px] text-white" strokeWidth={2.6} />
            </span>

            <div className="min-w-0">
              <div className="text-[12px] font-normal leading-none text-[#828282]">
                Tujuan
              </div>
              <div className="mt-[8px] truncate text-[14px] font-normal leading-none text-black">
                Suyatna • {displayedRecipientAccount}
              </div>
            </div>
          </div>

          <div className="mt-[12px] w-[302px] max-w-full rounded-[15px] border border-[#D8D8D8] bg-white px-[18px] py-[14px] text-left">
            <div className="text-[12px] font-normal leading-none text-[#828282]">
              Deskripsi
            </div>
            <div className="mt-[8px] break-words text-[14px] font-normal leading-snug text-black">
              {displayedDescription}
            </div>
          </div>

          <div className="mt-[30px] grid w-full grid-cols-1 gap-[10px]">
            <button
              type="button"
              onClick={() => setSaved(true)}
              className={cn(
                "h-[46px] rounded-[10px] border-2 bg-white",
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
                "h-[46px] rounded-[10px] bg-[#479DF4]",
                "text-[12px] font-normal leading-none text-white",
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