import * as React from "react";
import { Check, Download, Landmark, Send, UserPlus, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSuccessActionTile from "@/components/mobile/new-mbanking/NewMBankingSuccessActionTile";
import {
  isNewMBankingTransferRecipientSaved,
  saveNewMBankingTransferRecipient,
  type NewMBankingTransferRecipientKind,
} from "@/lib/newMBankingTransferRecipientsStore";

export default function NewMBankingTransferSuccessPage({
  recipientName = "Suyatna",
  recipientAccountNo,
  recipientBankName,
  nominal,
  description,
  canSaveRecipient = false,
  onDone,
}: {
  recipientName?: string;
  recipientAccountNo: string;
  recipientBankName?: string;
  nominal: string;
  description: string;
  canSaveRecipient?: boolean;
  onDone: () => void;
}) {
  const [proofSaved, setProofSaved] = React.useState(false);
  const recipientKind: NewMBankingTransferRecipientKind = recipientBankName
    ? "interbank"
    : "internal";

  const alreadySaved = isNewMBankingTransferRecipientSaved({
    kind: recipientKind,
    bank: recipientBankName,
    accountNo: recipientAccountNo,
  });

  const [recipientSaved, setRecipientSaved] = React.useState(alreadySaved);

  const displayedRecipientAccount = recipientAccountNo.trim() || "22111122333";
  const displayedRecipientSubtitle = recipientBankName?.trim()
    ? `${recipientName} • ${recipientBankName} • ${displayedRecipientAccount}`
    : `${recipientName} • ${displayedRecipientAccount}`;
  const displayedNominal = nominal.trim() || "50.000,00";
  const displayedDescription = description.trim() || "Bayar UKT";

  const isInterbankTransfer = !!recipientBankName?.trim();
  const DestinationIcon = isInterbankTransfer ? Landmark : Send;
  const destinationIconClassName = isInterbankTransfer
    ? "bg-[#F59E0B]"
    : "bg-[#18B7A1]";

  const saveRecipientDisabled = !canSaveRecipient || recipientSaved;

  function saveRecipient() {
    if (saveRecipientDisabled) return;

    saveNewMBankingTransferRecipient({
      kind: recipientKind,
      name: recipientName,
      bank: recipientBankName,
      accountNo: displayedRecipientAccount,
    });

    setRecipientSaved(true);
  }

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] px-5 py-[18px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center">
        <section className="flex w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white px-6 py-6 text-center shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
          <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#EAF8EF]">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#33AA00] text-white">
              <Check className="h-[38px] w-[38px]" strokeWidth={3.8} />
            </div>
          </div>

          <h1 className="mt-[16px] max-w-[300px] text-[17px] font-bold leading-[1.2] tracking-[-0.025em] text-black">
            Berhasil Melakukan Transaksi
          </h1>

          <p className="mt-[8px] max-w-[305px] text-[12px] font-normal leading-[1.35] tracking-[-0.01em] text-[#828282]">
            Transfer Anda telah berhasil diproses.
          </p>

          <div className="mt-[14px] w-full rounded-[16px] bg-[#F6F8FB] px-4 py-3">
            <div className="text-[11px] font-normal text-[#828282]">
              Nominal Transaksi
            </div>
            <div className="mt-[5px] text-[20px] font-bold leading-tight text-black">
              Rp. {displayedNominal}
            </div>
          </div>

          <div className="mt-[8px] text-[11px] font-normal leading-relaxed text-[#828282]">
            30 Juni 2026, 22:15 WIB
          </div>
          <div className="mt-[2px] text-[11px] font-normal leading-relaxed text-[#828282]">
            Ref ID : TRF221112222
          </div>

          <div className="mt-[18px] grid w-full grid-cols-2 items-start justify-items-center gap-[22px]">
            <NewMBankingSuccessActionTile
              label="Bukti Transaksi"
              icon={Download}
              onClick={() => setProofSaved(true)}
              active={proofSaved}
            />

            <NewMBankingSuccessActionTile
              label="Simpan Penerima"
              icon={UserPlus}
              onClick={saveRecipient}
              disabled={saveRecipientDisabled}
            />
          </div>

          <div className="relative mt-[18px] flex min-h-[58px] w-[302px] max-w-full items-center gap-[10px] overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_50%,#7C3AED_100%)] px-[14px] py-[10px] text-left text-white">
            <div className="pointer-events-none absolute -right-[30px] -top-[28px] h-[88px] w-[88px] rounded-full bg-white/16" />
            <div className="pointer-events-none absolute right-[48px] top-[32px] h-[40px] w-[40px] rounded-full bg-cyan-200/16" />

            <span className="relative z-10 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white/20 text-white shadow-sm">
              <WalletCards
                className="h-[18px] w-[18px] text-white"
                strokeWidth={2.6}
              />
            </span>

            <div className="relative z-10 min-w-0">
              <div className="text-[11px] font-normal leading-none text-white/82">
                Sumber Dana
              </div>
              <div className="mt-[6px] truncate text-[13px] font-normal leading-none text-white">
                Simpanan Kaya
              </div>
              <div className="mt-[5px] truncate text-[13px] font-normal leading-none text-white/82">
                112233111
              </div>
            </div>
          </div>

          <div className="mt-[15px] flex min-h-[58px] w-[302px] max-w-full items-center gap-[10px] rounded-[14px] border border-[#D8D8D8] bg-white px-[14px] py-[10px] text-left">
            <span
              className={cn(
                "flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-white shadow-sm",
                destinationIconClassName,
              )}
            >
              <DestinationIcon
                className="h-[18px] w-[18px] text-white"
                strokeWidth={2.6}
              />
            </span>

            <div className="min-w-0">
              <div className="text-[11px] font-normal leading-none text-[#828282]">
                Tujuan
              </div>
              <div className="mt-[6px] truncate text-[13px] font-normal leading-none text-black">
                {displayedRecipientSubtitle}
              </div>
            </div>
          </div>

          <div className="mt-[15px] w-[302px] max-w-full rounded-[14px] border border-[#D8D8D8] bg-white px-[14px] py-[10px] text-left">
            <div className="text-[11px] font-normal leading-none text-[#828282]">
              Deskripsi
            </div>
            <div className="mt-[6px] line-clamp-2 break-words text-[13px] font-normal leading-snug text-black">
              {displayedDescription}
            </div>
          </div>

          <div className="mt-[20px] grid w-full grid-cols-1 gap-[8px]">
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
      </main>
    </div>
  );
}