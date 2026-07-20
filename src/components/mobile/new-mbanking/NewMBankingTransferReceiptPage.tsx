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

function normalizeAmount(amount: string) {
  const trimmed = amount.trim() || "50.000,00";
  return trimmed.startsWith("Rp.") ? trimmed : `Rp. ${trimmed}`;
}

export default function NewMBankingTransferReceiptPage({
  recipientName,
  recipientAccountNo,
  recipientBankName,
  nominal,
  description,
  onBack,
  onDone,
}: {
  recipientName: string;
  recipientAccountNo: string;
  recipientBankName?: string;
  nominal: string;
  description: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const [saved, setSaved] = React.useState(false);
  const isIncomingFromBank = description
    .trim()
    .toLowerCase()
    .includes("transfer masuk dari bank lain");

  const transferType = isIncomingFromBank
    ? "Transfer Masuk dari Bank Lain"
    : recipientBankName
      ? "Transfer Antar Bank"
      : "Transfer Antar Rekening";

  const displayNominal = normalizeAmount(nominal);
  const displayDescription = description.trim() || "-";

  const sourceName = isIncomingFromBank ? recipientName : "Laura Patel";
  const sourceInfo = isIncomingFromBank
    ? `${recipientBankName ?? "Bank Lain"} - ${recipientAccountNo}`
    : "Simpanan Kaya - 112233111";

  const receiverName = isIncomingFromBank ? "Laura Patel" : recipientName;
  const receiverInfo = isIncomingFromBank
    ? "Simpanan Kaya - 112233111"
    : recipientBankName
      ? `${recipientBankName} - ${recipientAccountNo}`
      : recipientAccountNo;

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
              {displayNominal}
            </div>
          </div>

          <div className="mt-[18px] text-center">
            <div className="text-[12px] font-normal leading-relaxed text-[#828282]">
              30 Juni 2026, 22:15 WIB
            </div>
            <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
              Ref ID : TRF221112222
            </div>
          </div>

          <InfoSection title="Sumber Dana">
            <div className="py-[7px]">
              <div className="text-[14px] font-normal leading-tight text-black">
                {sourceName}
              </div>
              <div className="mt-[7px] text-[14px] font-normal leading-tight text-[#8F8F8F]">
                {sourceInfo}
              </div>
            </div>
          </InfoSection>

          <InfoSection title="Penerima">
            <div className="py-[7px]">
              <div className="text-[14px] font-normal leading-tight text-black">
                {receiverName}
              </div>
              <div className="mt-[7px] text-[14px] font-normal leading-tight text-[#8F8F8F]">
                {receiverInfo}
              </div>
            </div>
          </InfoSection>

          <InfoSection title="Detail Transfer">
            <DetailRow label="Tipe Transaksi" value={transferType} />
            <DetailRow label="Deskripsi" value={displayDescription} />
            <DetailRow label="Nominal" value={displayNominal.replace("Rp. ", "")} />
            <DetailRow
              label="Biaya Admin"
              value={isIncomingFromBank || !recipientBankName ? "0,00" : "2.500,00"}
            />
            <DetailRow
              label="Total"
              value={
                isIncomingFromBank || !recipientBankName
                  ? displayNominal.replace("Rp. ", "")
                  : "52.500,00"
              }
            />
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