import { cn } from "@/lib/utils";

export default function NewMBankingLogoutConfirmModal({
  open,
  onCancel,
  onExit,
}: {
  open: boolean;
  onCancel: () => void;
  onExit: () => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[120] flex items-end justify-center bg-black/35 px-5 pb-5">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi keluar"
        onClick={onCancel}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-[360px]",
          "rounded-[26px] bg-[#FAFAFA] px-6 pb-6 pt-7",
          "shadow-[0_20px_55px_rgba(15,23,42,0.24)]",
          "ring-1 ring-black/5",
        )}
      >
        <div className="text-left">
          <h2 className="text-[20px] font-bold leading-tight tracking-[-0.025em] text-[#111827]">
            Anda akan keluar dari aplikasi
          </h2>

          <p className="mt-2 max-w-[310px] text-[14px] font-normal leading-relaxed tracking-[-0.01em] text-[#7A7A7A]">
            Terimakasih sudah memakai M-Banking. Sampai jumpa lagi ya!
          </p>
        </div>

        <div className="mt-7 grid gap-3">
          <button
            type="button"
            onClick={onExit}
            className={cn(
              "h-[50px] w-full rounded-[8px]",
              "bg-[#479DF4] text-[14px] font-semibold text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Keluar
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "h-[50px] w-full rounded-[8px]",
              "border border-[#D8D8D8] bg-white",
              "text-[14px] font-semibold text-[#828282]",
              "transition active:scale-[0.98]",
            )}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}