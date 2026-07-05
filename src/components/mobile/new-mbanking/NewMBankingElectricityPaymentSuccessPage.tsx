import * as React from "react";
import {
  Check,
  Download,
  Droplets,
  HeartPulse,
  Landmark,
  Map,
  Monitor,
  Smartphone,
  UserPlus,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingInScreenToast from "@/components/mobile/new-mbanking/NewMBankingInScreenToast";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import NewMBankingSuccessActionTile from "@/components/mobile/new-mbanking/NewMBankingSuccessActionTile";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

type ServiceVariant =
  | "electricity"
  | "water"
  | "pbb"
  | "internet"
  | "finance"
  | "tv"
  | "bpjs"
  | "postpaid-phone"
  | "data-package";

function getServiceIcon(variant: ServiceVariant) {
  if (variant === "water") return Droplets;
  if (variant === "pbb") return Map;
  if (variant === "internet") return Wifi;
  if (variant === "finance") return Landmark;
  if (variant === "tv") return Monitor;
  if (variant === "bpjs") return HeartPulse;
  if (variant === "postpaid-phone" || variant === "data-package") return Smartphone;
  return Zap;
}

function getSuccessText(variant: ServiceVariant) {
  if (variant === "water") return "Pembayaran tagihan air Anda telah berhasil diproses.";
  if (variant === "pbb") return "Pembayaran Pajak Bumi dan Bangunan Anda telah berhasil diproses.";
  if (variant === "internet") return "Pembayaran tagihan internet Anda telah berhasil diproses.";
  if (variant === "finance") return "Pembayaran cicilan finance Anda telah berhasil diproses.";
  if (variant === "tv") return "Pembayaran tagihan TV Anda telah berhasil diproses.";
  if (variant === "bpjs") return "Pembayaran BPJS Kesehatan Anda telah berhasil diproses.";
  if (variant === "data-package") return "Pembelian paket data Anda telah berhasil diproses.";
  if (variant === "postpaid-phone") return "Pembelian pulsa Anda telah berhasil diproses.";
  return "Pembayaran tagihan listrik Anda telah berhasil diproses.";
}

function getReferencePrefix(variant: ServiceVariant) {
  if (variant === "water") return "AIR";
  if (variant === "pbb") return "PBB";
  if (variant === "internet") return "NET";
  if (variant === "finance") return "FIN";
  if (variant === "tv") return "TV";
  if (variant === "bpjs") return "BPJS";
  if (variant === "data-package") return "DATA";
  if (variant === "postpaid-phone") return "PULSA";
  return "PLN";
}

function getCustomerNumberLabel(variant: ServiceVariant) {
  return variant === "postpaid-phone" || variant === "data-package"
    ? "No. Handphone"
    : "No. Pelanggan";
}

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
    <div className="flex items-start justify-between gap-4 py-[6px]">
      <div className="min-w-0 text-[13px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div
        className={cn(
          "max-w-[180px] text-right leading-tight text-black",
          strong ? "text-[14px] font-bold" : "text-[13px] font-normal",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function NewMBankingElectricityPaymentSuccessPage({
  providerName,
  customerName,
  customerNo,
  amount,
  adminFee,
  totalTransaction,
  sourceFund,
  onDone,
  serviceVariant = "electricity",
  bpjsMonths = "1 Bulan",
  recipientAlreadySaved = false,
  onSaveRecipient,
}: {
  providerName: string;
  customerName: string;
  customerNo: string;
  amount: string;
  adminFee: string;
  totalTransaction: string;
  sourceFund: SourceFundAccount;
  onDone: () => void;
  serviceVariant?: ServiceVariant;
  bpjsMonths?: string;
  recipientAlreadySaved?: boolean;
  onSaveRecipient?: () => void;
}) {
  const [toastMessage, setToastMessage] = React.useState("");
  const [recipientSaved, setRecipientSaved] = React.useState(recipientAlreadySaved);
  const Icon = getServiceIcon(serviceVariant);
  const successText = getSuccessText(serviceVariant);
  const showCustomerName =
    serviceVariant !== "postpaid-phone" && serviceVariant !== "data-package";

  React.useEffect(() => {
    setRecipientSaved(recipientAlreadySaved);
  }, [recipientAlreadySaved]);

  function showToast(message: string) {
    setToastMessage("");
    window.setTimeout(() => setToastMessage(message), 0);
  }

  function saveRecipient() {
    if (recipientSaved) return;

    onSaveRecipient?.();
    setRecipientSaved(true);
    showToast("Penerima Berhasil Tersimpan");
  }

  function saveProof() {
    showToast("Bukti Transaksi Berhasil Tersimpan");
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] px-5 text-black">
      <NewMBankingInScreenToast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      <main className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-h-full items-center justify-center py-[26px]">
          <section className="flex w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white px-6 py-7 text-center shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
            <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#EAF8EF]">
              <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#33AA00] text-white">
                <Check className="h-[42px] w-[42px]" strokeWidth={3.8} />
              </div>
            </div>

            <h1 className="mt-[20px] max-w-[300px] text-[18px] font-bold leading-[1.25] tracking-[-0.025em] text-black">
              Berhasil Melakukan Pembayaran
            </h1>

            <p className="mt-[10px] max-w-[305px] text-[13px] font-normal leading-[1.4] tracking-[-0.01em] text-[#828282]">
              {successText}
            </p>

            <div className="mt-[18px] w-full rounded-[18px] bg-[#F6F8FB] px-5 py-5">
              <div className="text-[12px] font-normal text-[#828282]">
                Total Transaksi
              </div>
              <div className="mt-[8px] text-[22px] font-bold leading-tight text-black">
                {totalTransaction}
              </div>
            </div>

            <div className="mt-[10px] text-[12px] font-normal leading-relaxed text-[#828282]">
              30 Juni 2026, 22:15 WIB
            </div>
            <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
              Ref ID : {getReferencePrefix(serviceVariant)}221112222
            </div>

            <div className="mt-[18px] grid w-full grid-cols-2 items-start justify-items-center gap-[22px]">
              <NewMBankingSuccessActionTile
                label="Bukti Transaksi"
                icon={Download}
                onClick={saveProof}
              />

              <NewMBankingSuccessActionTile
                label="Simpan Penerima"
                icon={UserPlus}
                onClick={saveRecipient}
                disabled={recipientSaved}
              />
            </div>

            <div className="mt-[18px] flex min-h-[68px] w-[302px] max-w-full items-center gap-[12px] rounded-[15px] border border-[#D8D8D8] bg-white px-[18px] text-left">
              <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#479DF4] text-white shadow-sm">
                <Icon className="h-[20px] w-[20px] text-white" strokeWidth={2.6} />
              </span>

              <div className="min-w-0">
                <div className="text-[12px] font-normal leading-none text-[#828282]">
                  Penyedia
                </div>
                <div className="mt-[8px] truncate text-[14px] font-normal leading-none text-black">
                  {providerName}
                </div>
              </div>
            </div>

            <div className="mt-[12px] w-[302px] max-w-full rounded-[15px] border border-[#D8D8D8] bg-white px-[18px] py-[10px] text-left">
              {showCustomerName ? (
                <DetailRow label="Nama Pelanggan" value={customerName} />
              ) : null}
              <DetailRow
                label={getCustomerNumberLabel(serviceVariant)}
                value={customerNo}
              />
              {serviceVariant === "bpjs" ? (
                <DetailRow label="Jumlah Bulan" value={bpjsMonths} />
              ) : null}
              <DetailRow label="Nominal Tagihan" value={amount} />
              <DetailRow label="Biaya Admin" value={adminFee} />

              <div className="my-[8px] border-t border-dashed border-[#D8D8D8]" />

              <DetailRow
                label="Total Transaksi"
                value={totalTransaction}
                strong
              />
            </div>

            <div className="mt-[12px] w-full text-left">
              <NewMBankingSourceFundGradientCard
                account={sourceFund}
                showChevron={false}
                showBalance={false}
                sectionLabel="Sumber Dana"
                className="min-h-[98px] shadow-none"
              />
            </div>

            <div className="mt-[22px] grid w-full grid-cols-1 gap-[8px]">
              <button
                type="button"
                onClick={onDone}
                className={cn(
                  "h-[42px] rounded-[10px] bg-[#479DF4]",
                  "text-[12px] font-normal leading-none text-white",
                  "transition active:scale-[0.98]",
                )}
              >
                Selesai
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}