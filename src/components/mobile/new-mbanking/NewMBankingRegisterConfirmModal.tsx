import { CheckCircle2 } from "lucide-react";
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
      <div className="w-full overflow-hidden rounded-[24px] bg-white px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]">
        <div className="overflow-hidden rounded-[15px] bg-[#EAF4FF]">
          <div className="relative h-[188px] bg-[#DDEEFF]">
            <div className="absolute -left-10 top-0 h-[210px] w-[210px] rounded-full bg-[#BFE2FF]" />
            <div className="absolute -right-8 bottom-0 h-[150px] w-[190px] rounded-tl-[80px] bg-[#479DF4]" />

            <div className="absolute left-[70px] top-[32px] h-[112px] w-[106px] rounded-t-[44px] bg-[#F2F5FA] shadow-sm">
              <div className="absolute left-1/2 top-[18px] h-[30px] w-[30px] -translate-x-1/2 rounded-full bg-[#D7DEE9]" />
              <div className="absolute bottom-0 left-[-18px] h-[70px] w-[142px] rounded-t-[36px] bg-[#E8EEF6]" />
              <div className="absolute right-[-28px] top-[70px] h-[54px] w-[82px] rotate-[-18deg] rounded-full bg-[#DCE6F2]" />
              <div className="absolute left-[-42px] top-[94px] h-[15px] w-[76px] rotate-[15deg] rounded-full bg-[#F0C5A8]" />
            </div>

            <div className="absolute left-[45px] bottom-[30px] h-[36px] w-[54px] rotate-[-10deg] rounded-[8px] bg-[#1F2A44] shadow-md" />

            <div className="absolute inset-x-0 bottom-0 h-[40px] rounded-t-[18px] bg-[#479DF4]" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF8FC] text-[#479DF4]">
            <CheckCircle2 className="h-6 w-6" strokeWidth={2.6} />
          </div>

          <div className="mt-4 text-[18px] font-bold leading-tight text-black">
            Konfirmasi Pendaftaran
          </div>

          <div className="mx-auto mt-2 max-w-[310px] text-[13px] font-normal leading-relaxed text-[#828282]">
            Pastikan data akun M-Banking sudah benar sebelum melanjutkan proses
            pendaftaran.
          </div>
        </div>

        <div className="mt-6 grid gap-[14px]">
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