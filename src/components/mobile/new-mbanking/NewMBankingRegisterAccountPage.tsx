import * as React from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NewMBankingRegisterAccountPageProps = {
  onBack: () => void;
  onSubmitSuccess: () => void;
};

export default function NewMBankingRegisterAccountPage({
  onBack,
  onSubmitSuccess,
}: NewMBankingRegisterAccountPageProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim()) {
      toast("Username wajib diisi", {
        description: "Silakan isi username terlebih dahulu.",
      });
      return;
    }

    if (!password.trim()) {
      toast("Kata sandi wajib diisi", {
        description: "Silakan isi kata sandi terlebih dahulu.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast("Konfirmasi kata sandi tidak sesuai", {
        description: "Pastikan kata sandi dan konfirmasi kata sandi sama.",
      });
      return;
    }

    toast.success("Pendaftaran berhasil", {
      description: "Akun M-Banking berhasil dibuat di prototype.",
    });

    onSubmitSuccess();
  }

  const fieldClassName = cn(
    "h-[67px] w-full rounded-[14px] border border-[#CDD4E0] bg-white px-[29px]",
    "text-[20px] font-normal text-black shadow-none",
    "placeholder:text-[20px] placeholder:font-normal placeholder:text-[#828282]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const passwordFieldClassName = cn(fieldClassName, "pr-[58px]");

  const labelClassName =
    "text-[22px] font-bold leading-none tracking-[-0.025em] text-[#2E2E2E]";

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="relative h-[420px] shrink-0 overflow-hidden bg-[#F9F9F9] px-6 pt-8">
        <div className="flex h-10 items-center gap-3">
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

        <div className="mt-[20px] text-center">
          <div className="mx-auto mb-[18px] flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EEF6FF]">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#479DF4] text-white">
              <LockKeyhole className="h-[42px] w-[42px]" strokeWidth={2.6} />
            </div>
          </div>

          <h2 className="text-[16px] font-bold leading-tight text-black">
            Informasi Akun M-Banking
          </h2>

          <p className="mx-auto mt-[10px] max-w-[345px] text-[12px] font-normal leading-[1.35] text-[#828282]">
            Untuk melakukan pendaftaran, mohon melengkapi informasi akun
            dibawah ini, pastikan data yang anda masukan sesuai
          </p>

          <div className="mt-[20px] h-[14px] w-full overflow-hidden rounded-full bg-[#D8D8D8]">
            <div className="h-full w-full rounded-full bg-[#479DF4]" />
          </div>

          <div className="mt-[10px] text-[10px] font-normal leading-none text-black">
            Langkah 2 dari 2
          </div>
        </div>

        <div className="sr-only">
          <UserRound />
        </div>
      </div>

      <div className="relative z-10 -mt-[68px] flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-white px-0 pb-[15px] pt-[30px]">
        <form onSubmit={submit} className="flex min-h-full flex-col">
          <div className="grid gap-[33px]">
            <div className="grid gap-[14px]">
              <label className={cn(labelClassName, "px-0")}>
                Username<span className="text-[#EF135D]">*</span>
              </label>
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={fieldClassName}
                placeholder="Masukkan Username Anda"
                autoComplete="username"
              />
            </div>

            <div className="grid gap-[14px]">
              <label className={labelClassName}>
                Kata Sandi<span className="text-[#EF135D]">*</span>
              </label>

              <div className="relative">
                <Input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  className={passwordFieldClassName}
                  placeholder="Masukkan Kata Sandi Anda"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-[17px] top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-black transition active:scale-[0.98]"
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                  title={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  {showPassword ? (
                    <Eye className="h-[30px] w-[30px]" strokeWidth={2.8} />
                  ) : (
                    <EyeOff className="h-[30px] w-[30px]" strokeWidth={2.8} />
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-[14px]">
              <label className={labelClassName}>
                Konfirmasi Kata Sandi<span className="text-[#EF135D]">*</span>
              </label>

              <div className="relative">
                <Input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  className={passwordFieldClassName}
                  placeholder="Masukkan Konfirmasi Kata Sandi Anda"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  className="absolute right-[17px] top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-black transition active:scale-[0.98]"
                  aria-label={
                    showConfirmPassword
                      ? "Sembunyikan konfirmasi kata sandi"
                      : "Tampilkan konfirmasi kata sandi"
                  }
                  title={
                    showConfirmPassword
                      ? "Sembunyikan konfirmasi kata sandi"
                      : "Tampilkan konfirmasi kata sandi"
                  }
                >
                  {showConfirmPassword ? (
                    <Eye className="h-[30px] w-[30px]" strokeWidth={2.8} />
                  ) : (
                    <EyeOff className="h-[30px] w-[30px]" strokeWidth={2.8} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-[10px] px-1 pt-8">
            <button
              type="button"
              onClick={onBack}
              className={cn(
                "h-[76px] rounded-[10px] border-2 border-[#479DF4] bg-white",
                "text-[20px] font-normal leading-none text-[#479DF4]",
                "transition active:scale-[0.98]",
              )}
            >
              Kembali
            </button>

            <button
              type="submit"
              className={cn(
                "h-[76px] rounded-[10px] bg-[#479DF4]",
                "text-[20px] font-normal leading-none text-white",
                "transition active:scale-[0.98]",
              )}
            >
              Daftar Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}