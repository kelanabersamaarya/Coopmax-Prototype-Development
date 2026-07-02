import { cn } from "@/lib/utils";

type NewMBankingRegisterConfirmModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function NewMBankingRegisterConfirmModal({
  open,
  onCancel,
  onConfirm,
}: NewMBankingRegisterConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[120] flex items-end bg-black/35 px-5 pb-5">
      <div className="w-full overflow-hidden rounded-[24px] bg-white px-5 pb-6 pt-7 shadow-[0_20px_55px_rgba(15,23,42,0.28)]">
        <div className="text-center">
          <div className="text-[18px] font-bold leading-tight text-black">
            Konfirmasi Pendaftaran
          </div>

          <div className="mx-auto mt-3 max-w-[310px] text-[13px] font-normal leading-relaxed text-[#828282]">
            Pastikan data akun M-Banking sudah benar sebelum melanjutkan proses
            pendaftaran.
          </div>
        </div>

        <div className="mt-7 grid gap-[14px]">
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "h-[56px] w-full rounded-[14px] bg-[#479DF4]",
              "text-[15px] font-semibold text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Ya, Daftar Sekarang
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "h-[56px] w-full rounded-[14px] border border-[#D8D8D8] bg-white",
              "text-[15px] font-semibold text-[#828282]",
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