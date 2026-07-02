import * as React from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    toast.success("Registrasi berhasil", {
      description: "Silakan masuk menggunakan akun yang baru dibuat.",
    });

    onRegisterSuccess();
  }

  const inputClassName = cn(
    "h-[50px] rounded-[1.05rem] border-0 bg-[#F4F8FC] px-12 text-[14px] font-semibold text-[#102A43] shadow-none",
    "placeholder:text-[#9FB3C8] focus-visible:ring-4 focus-visible:ring-[#18B7A1]/18 focus-visible:ring-offset-0",
  );

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-[#102A43]">
      <div className="relative bg-[#0B63CE] px-7 pb-9 pt-8 text-white">
        <div className="absolute -right-14 -top-12 h-48 w-48 rounded-full bg-white/12" />
        <div className="absolute bottom-4 right-12 h-16 w-16 rounded-[1.35rem] bg-[#18B7A1]/35 rotate-12" />

        <button
          type="button"
          onClick={onBack}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/14 text-white backdrop-blur transition hover:bg-white/22 active:scale-95"
          aria-label="Kembali ke login"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div className="relative z-10 mt-7">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/75">
            Buat akun
          </p>
          <h1 className="mt-3 max-w-[300px] text-[32px] font-black leading-[1.02] tracking-[-0.052em]">
            Daftar New Mbanking
          </h1>
          <p className="mt-4 max-w-[285px] text-[14px] font-medium leading-relaxed text-white/78">
            Lengkapi data singkat untuk mengaktifkan akses prototype mobile banking.
          </p>
        </div>
      </div>

      <div className="-mt-6 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-t-[2rem] bg-white px-7 pb-7 pt-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <form onSubmit={submit} className="grid gap-3.5">
          <div className="relative">
            <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#18B7A1]" />
            <Input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className={inputClassName}
              placeholder="Nama lengkap"
              autoComplete="name"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#18B7A1]" />
            <Input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputClassName}
              placeholder="Nomor HP"
              autoComplete="tel"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#18B7A1]" />
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className={inputClassName}
              placeholder="Email"
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#18B7A1]" />
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
              className={cn(inputClassName, "pr-12")}
              placeholder="Kata sandi"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[0.95rem] text-[#627D98] transition hover:bg-[#E6F0FA]"
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <Button
            type="submit"
            className="mt-3 h-[52px] rounded-[1.1rem] bg-[#18B7A1] text-[15px] font-extrabold text-white shadow-[0_16px_32px_rgba(24,183,161,0.26)] transition hover:bg-[#129F8C] active:translate-y-px"
          >
            Daftar
          </Button>
        </form>

        <div className="mt-5 rounded-[1.25rem] bg-[#EEF6FF] p-4 text-[12px] font-semibold leading-relaxed text-[#486581]">
          Data ini hanya digunakan untuk simulasi prototype dan tidak dikirim ke backend.
        </div>

        <p className="mt-auto pt-5 text-center text-[13px] font-semibold text-[#627D98]">
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={onBack}
            className="font-extrabold text-[#0B63CE] transition hover:text-[#074EA4]"
          >
            Masuk
          </button>
        </p>
      </div>
    </div>
  );
}