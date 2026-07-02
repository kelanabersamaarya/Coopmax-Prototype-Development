import * as React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingReceiptBrand from "@/components/mobile/new-mbanking/NewMBankingReceiptBrand";

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

export default function NewMBankingTransactionReceiptPage({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const [saved, setSaved] = React.useState(false);

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

          <InfoSection title="Sumber Dana">
            <div className="py-[7px]">
              <div className="text-[14px] font-normal leading-tight text-black">
                Arya Dharma
              </div>
              <div className="mt-[7px] text-[14px] font-normal leading-tight text-[#8F8F8F]">
                Simpanan Kaya - 1122334444
              </div>
            </div>
          </InfoSection>

          <InfoSection title="Penerima">
            <div className="py-[7px]">
              <div className="text-[14px] font-normal leading-tight text-black">
                QRIS Indomaret
              </div>
              <div className="mt-[7px] text-[14px] font-normal leading-tight text-[#8F8F8F]">
                Tangerang ID
              </div>
            </div>
          </InfoSection>

          <InfoSection title="Detail Pembayaran">
            <DetailRow label="Nominal" value="50.000,00" />
            <DetailRow label="Total" value="50.000,00" />
          </InfoSection>

          <InfoSection title="Detail Merchant">
            <DetailRow label="Merchant ID" value="11222333344" />
            <DetailRow label="Merchant PAN" value="11222333344" />
            <DetailRow label="Terminal ID" value="-" />
            <DetailRow label="Nama Acquirer" value="Djoin" />
          </InfoSection>

          <InfoSection title="Detail Transaksi">
            <DetailRow label="Customer PAN" value="11222333344" />
            <DetailRow label="Nama Issuer" value="Djoin" />
            <DetailRow label="Tipe Transaksi" value="QRIS" />
            <DetailRow label="Kode IRR" value="RCA221112222" />
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