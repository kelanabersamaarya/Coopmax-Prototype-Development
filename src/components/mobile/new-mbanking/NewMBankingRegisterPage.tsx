import * as React from "react";
import { ArrowLeft, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NewMBankingRegisterPageProps = {
  onBack: () => void;
  onRegisterSuccess: () => void;
};

export default function NewMBankingRegisterPage({
  onBack,
  onRegisterSuccess,
}: NewMBankingRegisterPageProps) {
  const [noRekeningUtama, setNoRekeningUtama] = React.useState("");
  const [noIdentitas, setNoIdentitas] = React.useState("");
  const [nomorTelepon, setNomorTelepon] = React.useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onRegisterSuccess();
  }

  const fieldClassName = cn(
    "h-[41px] w-full rounded-[9px] border border-[#CDD4E0] bg-[#FFFFFF] px-4",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#828282]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const labelClassName = "text-[14px] font-bold leading-none text-black";

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="relative h-[420px] shrink-0 overflow-hidden bg-[linear-gradient(145deg,#EAF5FF_0%,#F8FBFF_48%,#F7F3FF_100%)] px-6 pt-8">
        <div className="pointer-events-none absolute -right-[76px] top-[28px] h-[178px] w-[178px] rounded-full bg-[#479DF4]/12" />
        <div className="pointer-events-none absolute -left-[80px] top-[118px] h-[176px] w-[176px] rounded-full bg-[#A143EF]/10" />
        <div className="pointer-events-none absolute bottom-[38px] right-[32px] h-[86px] w-[86px] rounded-full bg-[#65D0E8]/16" />

        <div className="relative z-10 flex h-10 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="-ml-1 inline-flex h-10 w-10 items-center justify-center bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
          </button>

          <h1 className="text-[16px] font-bold leading-tight text-black">
            Daftar
          </h1>
        </div>

        <div className="relative z-10 mt-[20px] text-center">
          <div className="mx-auto mb-[18px] flex h-[110px] w-[110px] items-center justify-center rounded-full bg-white/80 shadow-sm ring-1 ring-white">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#479DF4] text-white shadow-[0_10px_22px_rgba(71,157,244,0.22)]">
              <UserRound className="h-[43px] w-[43px]" strokeWidth={2.6} />
            </div>
          </div>

          <h2 className="text-[16px] font-bold leading-tight text-black">
            Informasi Keanggotaan
          </h2>

          <p className="mx-auto mt-[10px] max-w-[345px] text-[12px] font-normal leading-[1.35] text-[#6B7280]">
            Untuk melakukan pendaftaran, mohon melengkapi informasi keanggotaan
            dibawah ini, pastikan data yang anda masukan sesuai
          </p>

          <div className="mt-[20px] h-[14px] w-full overflow-hidden rounded-full bg-white/80 ring-1 ring-[#D8D8D8]/80">
            <div className="h-full w-1/2 rounded-full bg-[#479DF4]" />
          </div>

          <div className="mt-[10px] text-[10px] font-normal leading-none text-black">
            Langkah 1 dari 2
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-[68px] flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-white px-6 pb-[30px] pt-[30px] shadow-[0_-14px_34px_rgba(15,23,42,0.06)]">
        <form
          onSubmit={submit}
          className="mx-auto flex min-h-full w-[345px] max-w-full flex-col justify-between"
        >
          <div className="grid gap-[15px]">
            <div className="grid gap-[9px]">
              <label className={labelClassName}>
                No. Rekening Utama<span className="text-[#EF135D]">*</span>
              </label>
              <Input
                value={noRekeningUtama}
                onChange={(event) => setNoRekeningUtama(event.target.value)}
                className={fieldClassName}
                placeholder="Masukkan No. Rekening Utama"
                inputMode="numeric"
              />
            </div>

            <div className="grid gap-[9px]">
              <label className={labelClassName}>
                No. Identitas<span className="text-[#EF135D]">*</span>
              </label>
              <Input
                value={noIdentitas}
                onChange={(event) => setNoIdentitas(event.target.value)}
                className={fieldClassName}
                placeholder="Masukkan No. Identitas"
                inputMode="numeric"
              />
            </div>

            <div className="grid gap-[9px]">
              <label className={labelClassName}>
                Nomor Telepon<span className="text-[#EF135D]">*</span>
              </label>

              <div className="grid grid-cols-[74px_minmax(0,1fr)] gap-[9px]">
                <div className="flex h-[41px] items-center justify-center gap-[7px] rounded-[9px] border border-[#CDD4E0] bg-white">
                  <span className="relative h-[26px] w-[26px] overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-slate-100">
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-[#EF1B2D]" />
                    <span className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />
                  </span>
                  <span className="text-[14px] font-normal leading-none text-[#111827]">
                    +62
                  </span>
                </div>

                <Input
                  value={nomorTelepon}
                  onChange={(event) => setNomorTelepon(event.target.value)}
                  className={fieldClassName}
                  placeholder="Contoh : 819997225252"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[10px]">
            <button
              type="button"
              onClick={onBack}
              className={cn(
                "h-[46px] rounded-[10px] border-2 border-[#479DF4] bg-white",
                "text-[12px] font-normal leading-none text-[#479DF4]",
                "transition active:scale-[0.98]",
              )}
            >
              Kembali
            </button>

            <button
              type="submit"
              className={cn(
                "h-[46px] rounded-[10px] bg-[#479DF4]",
                "text-[12px] font-normal leading-none text-white",
                "transition active:scale-[0.98]",
              )}
            >
              Lanjut
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}