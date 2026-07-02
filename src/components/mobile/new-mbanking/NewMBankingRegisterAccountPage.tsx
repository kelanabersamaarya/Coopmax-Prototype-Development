import * as React from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import NewMBankingRegisterConfirmModal from "@/components/mobile/new-mbanking/NewMBankingRegisterConfirmModal";
import NewMBankingRegisterSuccessPage from "@/components/mobile/new-mbanking/NewMBankingRegisterSuccessPage";

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
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [showSuccessPage, setShowSuccessPage] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmOpen(true);
  }

  function confirmRegistration() {
    setConfirmOpen(false);
    setShowSuccessPage(true);
  }

  if (showSuccessPage) {
    return <NewMBankingRegisterSuccessPage onContinue={onSubmitSuccess} />;
  }

  const fieldClassName = cn(
    "h-[41px] w-full rounded-[9px] border border-[#CDD4E0] bg-white px-4",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#828282]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const passwordFieldClassName = cn(fieldClassName, "pr-[48px]");

  const labelClassName = "text-[14px] font-bold leading-none text-black";

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <NewMBankingRegisterConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmRegistration}
      />

      <div className="relative h-[420px] shrink-0 overflow-hidden bg-[#4ba2f5] px-6 pt-8">
        <div className="pointer-events-none absolute -left-[118px] -top-[190px] h-[400px] w-[400px] rounded-full bg-[#f56ac8]" />
        <div className="pointer-events-none absolute -left-[48px] -top-[215px] h-[300px] w-[300px] rounded-full bg-[#f044bd]" />

        <div className="pointer-events-none absolute -right-[90px] -top-[64px] h-[205px] w-[205px] rounded-full bg-[#8fc2f3]" />
        <div className="pointer-events-none absolute right-[-10px] top-[-25px] h-[104px] w-[104px] rounded-full bg-[#459cf0]" />

        <div className="pointer-events-none absolute -bottom-[194px] right-[-174px] h-[400px] w-[400px] rounded-full bg-[#8bdcec]" />
        <div className="pointer-events-none absolute -bottom-[171px] right-[-92px] h-[296px] w-[296px] rounded-full bg-[#65d0e8]" />

        <div className="pointer-events-none absolute -bottom-[112px] -left-[62px] h-[212px] w-[212px] rounded-full bg-[#a143ef]" />
        <div className="pointer-events-none absolute -bottom-[74px] -left-[31px] h-[126px] w-[126px] rounded-full bg-[#8c16ea]" />

        <div className="pointer-events-none absolute inset-0 bg-white/12" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.68))]" />

        <div className="relative z-10 flex h-10 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-white backdrop-blur transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
          </button>

          <h1 className="text-[16px] font-bold leading-tight text-white">
            Daftar
          </h1>
        </div>

        <div className="relative z-10 mt-[20px] text-center">
          <div className="mx-auto mb-[18px] flex h-[110px] w-[110px] items-center justify-center rounded-full bg-white/80 shadow-[0_12px_32px_rgba(15,23,42,0.16)] ring-1 ring-white">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#479DF4] text-white shadow-[0_10px_22px_rgba(71,157,244,0.28)]">
              <LockKeyhole className="h-[42px] w-[42px]" strokeWidth={2.6} />
            </div>
          </div>

          <h2 className="text-[16px] font-bold leading-tight text-white">
            Informasi Akun M-Banking
          </h2>

          <p className="mx-auto mt-[10px] max-w-[345px] text-[12px] font-normal leading-[1.35] text-white/86">
            Untuk melakukan pendaftaran, mohon melengkapi informasi akun
            dibawah ini, pastikan data yang anda masukan sesuai
          </p>

          <div className="mt-[20px] h-[14px] w-full overflow-hidden rounded-full bg-white/35 ring-1 ring-white/45">
            <div className="h-full w-full rounded-full bg-white" />
          </div>

          <div className="mt-[10px] text-[10px] font-normal leading-none text-white/90">
            Langkah 2 dari 2
          </div>
        </div>

        <div className="sr-only">
          <UserRound />
        </div>
      </div>

      <div className="relative z-10 -mt-[68px] flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-white px-6 pb-[30px] pt-[30px] shadow-[0_-14px_34px_rgba(15,23,42,0.08)]">
        <form
          onSubmit={submit}
          className="mx-auto flex min-h-full w-[345px] max-w-full flex-col justify-between"
        >
          <div className="grid gap-[15px]">
            <div className="grid gap-[9px]">
              <label className={labelClassName}>
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

            <div className="grid gap-[9px]">
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
                  className="absolute right-[6px] top-1/2 inline-flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full text-black transition active:scale-[0.98]"
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
                    <Eye className="h-[22px] w-[22px]" strokeWidth={2.8} />
                  ) : (
                    <EyeOff className="h-[22px] w-[22px]" strokeWidth={2.8} />
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-[9px]">
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
                  className="absolute right-[6px] top-1/2 inline-flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full text-black transition active:scale-[0.98]"
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
                    <Eye className="h-[22px] w-[22px]" strokeWidth={2.8} />
                  ) : (
                    <EyeOff className="h-[22px] w-[22px]" strokeWidth={2.8} />
                  )}
                </button>
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
              Daftar Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}