import * as React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingReceiptBrand from "@/components/mobile/new-mbanking/NewMBankingReceiptBrand";

export type NewMBankingHistoryReceiptData = {
  title: string;
  subtitle: string;
  amount: string;
  sourceFund: string;
  transactionType: string;
  date: string;
  status: string;
  detailRows: Array<{
    label: string;
    value: string;
  }>;
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[7px]">
      <div className="min-w-0 text-left text-[14px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div className="max-w-[190px] text-right text-[14px] font-normal leading-tight text-black">
        {value}
      </div>
    </div>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[24px]">
      <div className="text-left text-[16px] font-bold leading-tight text-black">
        {title}
      </div>
      <div className="mt-[10px] h-px w-full bg-[#D8D8D8]" />
      <div className="mt-[8px]">{children}</div>
    </div>
  );
}

function normalizeDisplayAmount(amount: string) {
  return amount.replace(/^[+-]/, "").trim();
}

export default function NewMBankingHistoryReceiptPage({
  receipt,
  onBack,
  onDone,
}: {
  receipt: NewMBankingHistoryReceiptData;
  onBack: () => void;
  onDone: () => void;
}) {
  const [saved, setSaved] = React.useState(false);
  const displayAmount = normalizeDisplayAmount(receipt.amount);

  return (
    <div className="h-full min-h-full overflow-y-auto bg-[#F9F9F9] text-black [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="flex h-[82px] items-center gap-3 px-[31px] pt-[18px]">
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

      <main className="px-6 pb-[30px]">
        <section className="min-h-full rounded-[30px] bg-white px-[22px] pb-[28px] pt-[32px] shadow-sm">
          <NewMBankingReceiptBrand />

          <div className="mt-[42px] rounded-[24px] bg-[#F6F8FB] px-5 py-6 text-center">
            <div className="text-[12px] font-normal leading-none text-[#828282]">
              Nominal Transaksi
            </div>
            <div className="mt-[10px] text-[28px] font-bold leading-tight text-black">
              {displayAmount}
            </div>
          </div>

          <div className="mt-[18px] text-center">
            <div className="text-[12px] font-normal leading-relaxed text-[#828282]">
              {receipt.date}
            </div>
            <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
              Ref ID : HIST221112222
            </div>
          </div>

          <InfoSection title="Sumber Dana">
            <div className="py-[7px]">
              <div className="text-[14px] font-normal leading-tight text-black">
                Laura Patel
              </div>
              <div className="mt-[7px] text-[14px] font-normal leading-tight text-[#8F8F8F]">
                {receipt.sourceFund}
              </div>
            </div>
          </InfoSection>

          <InfoSection title="Transaksi">
            <div className="py-[7px]">
              <div className="text-[14px] font-normal leading-tight text-black">
                {receipt.title}
              </div>
              <div className="mt-[7px] text-[14px] font-normal leading-tight text-[#8F8F8F]">
                {receipt.subtitle}
              </div>
            </div>
          </InfoSection>

          <InfoSection title="Detail Transaksi">
            <DetailRow label="Jenis Transaksi" value={receipt.transactionType} />
            {receipt.detailRows.map((row) => (
              <DetailRow key={row.label} label={row.label} value={row.value} />
            ))}
            <DetailRow label="Status" value={receipt.status} />

            <div className="my-[8px] border-t border-dashed border-[#D8D8D8]" />

            <DetailRow label="Total" value={displayAmount.replace("Rp. ", "")} />
          </InfoSection>

          <div className="mt-[30px] grid gap-[10px]">
            <button
              type="button"
              onClick={() => setSaved(true)}
              className={cn(
                "h-[46px] w-full rounded-[10px] border-2",
                saved
                  ? "border-[#33AA00] bg-white text-[#33AA00]"
                  : "border-[#479DF4] bg-white text-[#479DF4]",
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
                "h-[46px] w-full rounded-[10px] bg-[#479DF4]",
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