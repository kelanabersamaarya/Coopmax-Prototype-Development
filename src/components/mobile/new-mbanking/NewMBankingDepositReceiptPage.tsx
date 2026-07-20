import * as React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingReceiptBrand from "@/components/mobile/new-mbanking/NewMBankingReceiptBrand";

export type NewMBankingDepositReceiptData = {
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  accountNo: string;
  accountName: string;
  productName: string;
  channel: string;
  status: string;
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

function normalizeAmount(value: string) {
  return value.replace(/^[+-]/, "").trim();
}

function parseIdrLike(value: string) {
  const digits = (value ?? "").replace(/[^\d]/g, "");
  const parsed = Number(digits);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return `Rp. ${Math.round(value).toLocaleString("id-ID")},00`;
}

export default function NewMBankingDepositReceiptPage({
  receipt,
  onBack,
  onDone,
}: {
  receipt: NewMBankingDepositReceiptData;
  onBack: () => void;
  onDone: () => void;
}) {
  const [saved, setSaved] = React.useState(false);
  const amount = normalizeAmount(receipt.amount);
  const saldoAwal = 3_500_000;
  const saldoAkhir = saldoAwal + parseIdrLike(amount);

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
          Bukti Setoran
        </h1>
      </header>

      <main className="px-6 pb-[30px]">
        <section className="min-h-full rounded-[30px] bg-white px-[22px] pb-[28px] pt-[32px] shadow-sm">
          <NewMBankingReceiptBrand />

          <div className="mt-[42px] rounded-[24px] bg-[#F6F8FB] px-5 py-6 text-center">
            <div className="text-[12px] font-normal leading-none text-[#828282]">
              Nominal Setoran
            </div>
            <div className="mt-[10px] text-[28px] font-bold leading-tight text-black">
              {amount}
            </div>
          </div>

          <div className="mt-[18px] text-center">
            <div className="text-[12px] font-normal leading-relaxed text-[#828282]">
              {receipt.date}, 10:24 WIB
            </div>
            <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
              Ref ID : SETOR221112222
            </div>
          </div>

          <InfoSection title="Rekening Tujuan">
            <div className="py-[7px]">
              <div className="text-[14px] font-normal leading-tight text-black">
                {receipt.accountName}
              </div>
              <div className="mt-[7px] text-[14px] font-normal leading-tight text-[#8F8F8F]">
                {receipt.productName} - {receipt.accountNo}
              </div>
            </div>
          </InfoSection>

          <InfoSection title="Detail Setoran">
            <DetailRow label="Jenis Transaksi" value={receipt.title} />
            <DetailRow label="Keterangan" value={receipt.subtitle} />
            <DetailRow label="Channel" value={receipt.channel} />
            <DetailRow label="Saldo Awal" value={formatIdr(saldoAwal)} />
            <DetailRow label="Nominal Setoran" value={amount.replace("Rp. ", "")} />
            <DetailRow label="Biaya Admin" value="0,00" />
            <DetailRow label="Status" value={receipt.status} />

            <div className="my-[8px] border-t border-dashed border-[#D8D8D8]" />

            <DetailRow label="Total" value={amount.replace("Rp. ", "")} />
            <DetailRow label="Saldo Akhir" value={formatIdr(saldoAkhir)} />
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
                "Simpan Bukti Setoran"
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