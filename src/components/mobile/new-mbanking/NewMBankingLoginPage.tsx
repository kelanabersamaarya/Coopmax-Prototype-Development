import * as React from "react";
import { Eye, EyeOff, Fingerprint, LockKeyhole, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import logoUrl from "@/assets/mobile/new-mbanking/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NewMBankingLoginPageProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function NewMBankingLoginPage({
  onLogin,
  onRegister,
}: NewMBankingLoginPageProps) {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    toast.success("Masuk berhasil", {
      description: "Selamat datang di New Mbanking prototype.",
    });

    onLogin();
  }

  const inputClassName = cn(
    "h-[52px] rounded-[1.1rem] border-0 bg-[#F4F8FC] px-12 text-[15px] font-semibold text-[#102A43] shadow-none",
    "placeholder:text-[#9FB3C8] focus-visible:ring-4 focus-visible:ring-[#0B63CE]/15 focus-visible:ring-offset-0",
  );

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#EEF6FF] text-[#102A43]">
      <div className="relative px-7 pb-8 pt-9">
        <div className="absolute -right-16 top-4 h-44 w-44 rounded-full bg-[#18B7A1]/18" />
        <div className="absolute left-6 top-24 h-16 w-16 rounded-[1.4rem] bg-white/55 rotate-12" />

        <div className="relative z-10 flex items-center justify-between">
          <img src={logoUrl} alt="New Mbanking" className="h-9 w-auto" />
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0B63CE] shadow-[0_12px_28px_rgba(11,99,206,0.12)]">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.4} />
          </div>
        </div>

        <div className="relative z-10 mt-10">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#18B7A1]">
            Selamat datang
          </p>
          <h1 className="mt-3 max-w-[290px] text-[34px] font-black leading-[1.02] tracking-[-0.055em] text-[#102A43]">
            Masuk ke akun New Mbanking Anda
          </h1>
          <p className="mt-4 max-w-[285px] text-[14px] font-medium leading-relaxed text-[#627D98]">
            Akses saldo, pinjaman, dan transaksi harian dengan keamanan berlapis.
          </p>
        </div>
      </div>

      <div className="relative z-20 flex min-h-0 flex-1 flex-col rounded-t-[2.3rem] bg-white px-7 pb-7 pt-7 shadow-[0_-18px_45px_rgba(16,42,67,0.08)]">
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2.5">
            <label className="text-[13px] font-extrabold text-[#486581]">
              Nomor HP / Username
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0B63CE]" />
              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className={inputClassName}
                placeholder="0812 3456 7890"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="grid gap-2.5">
            <div className="flex items-center justify-between gap-3">
              <label className="text-[13px] font-extrabold text-[#486581]">
                Kata sandi
              </label>
              <button
                type="button"
                className="text-[12px] font-bold text-[#0B63CE] transition hover:text-[#074EA4]"
              >
                Lupa?
              </button>
            </div>
            <div className="relative">
              <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0B63CE]" />
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                className={cn(inputClassName, "pr-12")}
                placeholder="Masukkan kata sandi"
                autoComplete="current-password"
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
          </div>

          <Button
            type="submit"
            className="mt-3 h-[52px] rounded-[1.1rem] bg-[#0B63CE] text-[15px] font-extrabold text-white shadow-[0_16px_32px_rgba(11,99,206,0.27)] transition hover:bg-[#0958B8] active:translate-y-px"
          >
            Masuk
          </Button>
        </form>

        <button
          type="button"
          className="mt-5 flex h-[52px] items-center justify-center gap-3 rounded-[1.1rem] border border-[#D9E2EC] bg-white text-[14px] font-extrabold text-[#102A43] transition hover:bg-[#F8FBFF] active:translate-y-px"
        >
          <Fingerprint className="h-5 w-5 text-[#18B7A1]" strokeWidth={2.4} />
          Masuk dengan biometrik
        </button>

        <div className="mt-auto pt-5 text-center">
          <p className="text-[13px] font-semibold text-[#627D98]">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={onRegister}
              className="font-extrabold text-[#0B63CE] transition hover:text-[#074EA4]"
            >
              Daftar sekarang
            </button>
          </p>
          <p className="mt-4 text-[10px] font-semibold leading-relaxed text-[#9FB3C8]">
            Dengan masuk, Anda menyetujui Syarat Ketentuan dan Kebijakan Privasi.
          </p>
        </div>
      </div>
    </div>
  );
}
