import { Landmark, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingTransferTypeModal({
  open,
  onClose,
  onChooseInternal,
  onChooseInterbank,
}: {
  open: boolean;
  onClose: () => void;
  onChooseInternal: () => void;
  onChooseInterbank: () => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[120] flex items-end justify-center bg-black/35 px-5 pb-5">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup pilihan transfer"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-[360px] overflow-hidden rounded-[8px] bg-white",
          "px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.24)]",
          "ring-1 ring-black/5",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
              Pilih Jenis Transfer
            </h2>
            <p className="mt-2 text-[12px] font-normal leading-relaxed text-[#828282]">
              Silakan pilih tujuan transfer yang ingin Anda lakukan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="mt-6 grid gap-[12px]">
          <button
            type="button"
            onClick={onChooseInternal}
            className={cn(
              "flex min-h-[72px] w-full items-center gap-4 rounded-[14px] border border-[#D8D8D8]",
              "bg-white px-4 py-3 text-left transition active:scale-[0.99]",
            )}
          >
            <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[14px] bg-[#18B7A1] text-white">
              <Send className="h-[24px] w-[24px] text-white" strokeWidth={2.5} />
            </span>

            <span className="min-w-0">
              <span className="block text-[14px] font-bold leading-tight text-black">
                Transfer Antar Rekening
              </span>
              <span className="mt-1 block text-[12px] font-normal leading-snug text-[#8F8F8F]">
                Transfer ke sesama rekening koperasi.
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={onChooseInterbank}
            className={cn(
              "flex min-h-[72px] w-full items-center gap-4 rounded-[14px] border border-[#D8D8D8]",
              "bg-white px-4 py-3 text-left transition active:scale-[0.99]",
            )}
          >
            <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[14px] bg-[#F59E0B] text-white">
              <Landmark className="h-[24px] w-[24px] text-white" strokeWidth={2.5} />
            </span>

            <span className="min-w-0">
              <span className="block text-[14px] font-bold leading-tight text-black">
                Transfer Antar Bank
              </span>
              <span className="mt-1 block text-[12px] font-normal leading-snug text-[#8F8F8F]">
                Transfer ke rekening bank lain.
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}