import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type NewMBankingLoginDetailPageProps = {
  onBack: () => void;
};

export default function NewMBankingLoginDetailPage({
  onBack,
}: NewMBankingLoginDetailPageProps) {
  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="relative h-full min-h-full overflow-hidden bg-[#F7FAFF]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,#EC3BBE_0_24%,transparent_25%),radial-gradient(circle_at_92%_5%,#479DF4_0_12%,transparent_13%)]" />

        <div className="absolute inset-x-0 top-[64px] h-[390px] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_42%,#cbd5e1_43%,#f1f5f9_100%)]" />
          <div className="absolute left-[-40px] top-[110px] h-[170px] w-[310px] rotate-[-18deg] rounded-[28px] bg-slate-900/10" />
          <div className="absolute right-[-35px] top-[70px] h-[260px] w-[190px] rotate-[14deg] rounded-[34px] bg-[#93C5FD]/45" />
          <div className="absolute bottom-[30px] left-[36px] h-[46px] w-[178px] rounded-[12px] bg-white/70 shadow-sm" />
          <div className="absolute bottom-[70px] right-[52px] h-[54px] w-[132px] rounded-[14px] bg-white/80 shadow-sm" />
        </div>

        <div className="relative z-10 flex h-full min-h-full flex-col px-6 pb-[34px] pt-[32px]">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/75 text-black backdrop-blur transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
          </button>

          <div className="mt-auto rounded-[24px] bg-white/92 px-6 py-6 shadow-[0_16px_45px_rgba(15,23,42,0.12)] ring-1 ring-white/70 backdrop-blur">
            <div className="text-[20px] font-bold leading-tight tracking-[-0.035em] text-black">
              Halaman Baru
            </div>
            <div className="mt-3 text-[14px] font-normal leading-relaxed text-[#828282]">
              Detail halaman ini siap dilanjutkan sesuai arahan berikutnya.
            </div>

            <button
              type="button"
              onClick={onBack}
              className={cn(
                "mt-6 h-[46px] w-full rounded-[10px] bg-[#479DF4]",
                "text-[12px] font-normal leading-none text-white",
                "transition active:scale-[0.98]",
              )}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}