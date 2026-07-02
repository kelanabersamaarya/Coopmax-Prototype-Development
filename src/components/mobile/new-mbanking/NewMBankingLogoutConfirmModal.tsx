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
    <div className="absolute inset-0 z-[120] flex items-center justify-center bg-black/35 px-6">
      <div className="w-full max-w-[315px] rounded-[18px] bg-white px-6 pb-6 pt-7 text-center shadow-[0_18px_45px_rgba(15,23,42,0.25)]">
        <div className="mx-auto flex h-[86px] w-[86px] items-center justify-center rounded-full border-[3px] border-[#F2B48C] bg-white">
          <span className="text-[50px] font-semibold leading-none text-[#F2B48C]">
            !
          </span>
        </div>

        <div className="mt-6 text-[20px] font-semibold leading-tight tracking-tight text-black">
          Yakin untuk keluar?
        </div>

        <div className="mt-3 text-[14px] font-normal leading-relaxed text-[#7A7A7A]">
          Apakah yakin keluar dari aplikasi
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "h-[42px] rounded-[8px]",
              "bg-[#828282] text-[14px] font-semibold text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onExit}
            className={cn(
              "h-[42px] rounded-[8px]",
              "bg-[#EF135D] text-[14px] font-semibold text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}