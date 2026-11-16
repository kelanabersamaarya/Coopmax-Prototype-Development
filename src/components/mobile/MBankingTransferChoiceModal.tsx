import { Landmark, UserRound, X } from "lucide-react";

export default function MBankingTransferChoiceModal({
  open,
  onClose,
  onInterAccount,
  onOtherBank,
}: {
  open: boolean;
  onClose: () => void;
  onInterAccount: () => void;
  onOtherBank: () => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[110] flex items-end bg-black/50" role="dialog" aria-modal="true" aria-label="Pilihan transfer">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup pilihan transfer"
        onClick={onClose}
      />

      <section className="relative z-10 w-full rounded-t-[30px] bg-white px-6 pb-5 pt-4 shadow-[0_-12px_30px_rgba(15,23,42,0.18)]">
        <div className="flex items-center justify-center">
          <span className="h-2 w-12 rounded-full bg-[#0758C9]" />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <h2 className="text-[24px] font-extrabold leading-tight text-[#263A73]">
            Transfer
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-[#A0A0A0] transition active:scale-95"
            aria-label="Tutup"
          >
            <X className="h-6 w-6" strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onInterAccount}
            className="flex min-h-[145px] flex-col items-center justify-center rounded-[22px] bg-[#E8E8E8] px-3 text-[#263A73] transition active:scale-[0.98]"
          >
            <UserRound className="h-[52px] w-[52px] text-[#0758C9]" strokeWidth={2.4} />
            <span className="mt-3 text-center text-[15px] font-extrabold leading-tight">
              Antar Rekening
            </span>
          </button>

          <button
            type="button"
            onClick={onOtherBank}
            className="flex min-h-[145px] flex-col items-center justify-center rounded-[22px] bg-[#E8E8E8] px-3 text-[#263A73] transition active:scale-[0.98]"
          >
            <Landmark className="h-[52px] w-[52px] text-[#0758C9]" strokeWidth={2.4} />
            <span className="mt-3 text-center text-[15px] font-extrabold leading-tight">
              Ke Bank Lain
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
