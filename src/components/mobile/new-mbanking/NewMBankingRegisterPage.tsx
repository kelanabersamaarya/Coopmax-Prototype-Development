import * as React from "react";
import { ArrowLeft, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NewMBankingRegisterPageProps = {
  onBack: () => void;
  onRegisterSuccess: () => void;
};

export default function NewMBankingRegisterPage({
  onBack,
}: NewMBankingRegisterPageProps) {
  const [noAnggota, setNoAnggota] = React.useState("");
  const [namaLengkap, setNamaLengkap] = React.useState("");
  const [noHandphone, setNoHandphone] = React.useState("");
  const [email, setEmail] = React.useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    toast.success("Informasi keanggotaan tersimpan", {
      description: "Data halaman pertama berhasil disimpan di prototype.",
    });
  }

  const fieldClassName = cn(
    "h-[41px] w-[345px] max-w-full rounded-[9px] border-0 bg-[#F2F2F2] px-4",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#828282]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const labelClassName = "text-[14px] font-bold leading-none text-black";

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="relative h-[420px] shrink-0 overflow-hidden bg-[#F9F9F9]">
        <div className="absolute left-5 top-8 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 w-10 items-center justify-center bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
          </button>

          <h1 className="text-[16px] font-bold leading-tight text-black">
            Daftar
          </h1>
        </div>

        <div className="absolute inset-x-0 bottom-[36px] px-6 text-center">
          <div className="mx-auto mb-[18px] flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EEF6FF]">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#479DF4] text-white">
              <UserRound className="h-[43px] w-[43px]" strokeWidth={2.6} />
            </div>
          </div>

          <h2 className="text-[16px] font-bold leading-tight text-black">
            Informasi Keanggotaan
          </h2>

          <p className="mx-auto mt-[10px] max-w-[345px] text-[12px] font-normal leading-[1.35] text-[#828282]">
            Untuk melakukan pendaftaran, mohon melengkapi informasi keanggotaan
            dibawah ini, pastikan data yang anda masukan sesuai
          </p>

          <div className="mt-[20px] h-[14px] w-full overflow-hidden rounded-full bg-[#D8D8D8]">
            <div className="h-full w-1/2 rounded-full bg-[#479DF4]" />
          </div>

          <div className="mt-[10px] text-[16px] font-normal leading-none text-black">
            Langkah 1 dari 2
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-[24px] flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-white px-6 pb-7 pt-[42px]">
        <form onSubmit={submit} className="mt-[24px] grid gap-[15px]">
          <div className="grid gap-[9px]">
            <label className={labelClassName}>No. Anggota</label>
            <Input
              value={noAnggota}
              onChange={(event) => setNoAnggota(event.target.value)}
              className={fieldClassName}
              placeholder="Masukkan No. Anggota"
            />
          </div>

          <div className="grid gap-[9px]">
            <label className={labelClassName}>Nama Lengkap</label>
            <Input
              value={namaLengkap}
              onChange={(event) => setNamaLengkap(event.target.value)}
              className={fieldClassName}
              placeholder="Masukkan Nama Lengkap"
              autoComplete="name"
            />
          </div>

          <div className="grid gap-[9px]">
            <label className={labelClassName}>No. Handphone</label>
            <Input
              value={noHandphone}
              onChange={(event) => setNoHandphone(event.target.value)}
              className={fieldClassName}
              placeholder="Masukkan No. Handphone"
              inputMode="tel"
              autoComplete="tel"
            />
          </div>

          <div className="grid gap-[9px]">
            <label className={labelClassName}>Email</label>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className={fieldClassName}
              placeholder="Masukkan Email"
              inputMode="email"
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            className={cn(
              "mt-[10px] h-[46px] w-[345px] max-w-full rounded-[10px] bg-[#479DF4]",
              "text-[12px] font-normal leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Selanjutnya
          </button>
        </form>
      </div>
    </div>
  );
}