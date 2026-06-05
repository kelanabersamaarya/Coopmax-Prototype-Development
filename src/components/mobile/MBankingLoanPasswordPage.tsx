"use client";

import * as React from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function MBankingLoanPasswordPage({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim()) {
      toast("Password wajib diisi", {
        description: "Masukkan password terlebih dahulu untuk melihat detail pinjaman.",
      });
      return;
    }

    toast.success("Password terverifikasi (prototype)");
    onSuccess();
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[116px] shrink-0 overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
          <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
          <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-[20px] top-[42px] h-[58px] w-[58px] rounded-full bg-white/8" />

          <div className="relative z-10 flex items-start gap-4">
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
              aria-label="Kembali"
              title="Kembali"
            >
              <ArrowLeft className="h-[26px] w-[26px]" strokeWidth={2.7} />
            </button>

            <h1 className="pt-1 text-[25px] font-extrabold leading-none tracking-tight text-white">
              Password
            </h1>
          </div>
        </header>

        <main className="relative z-10 -mt-[30px] min-h-[calc(100%-86px)] rounded-t-[30px] bg-white px-6 pb-8 pt-8">
          <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Masukkan Password
          </div>
          <div className="mt-2 text-[14px] font-normal leading-relaxed text-[#9B9B9B]">
            Silakan masukkan password untuk melanjutkan melihat informasi pinjaman.
          </div>

          <form onSubmit={submit} className="mt-8 grid gap-5">
            <div className="grid gap-2">
              <label className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
                Password
              </label>

              <div className="relative">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Password"
                  className={cn(
                    "h-[45px] w-full rounded-[9px] border-0 bg-[#F2F2F2] px-4 pr-12",
                    "text-[14px] font-normal text-black shadow-none",
                    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9A9A]",
                    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                  )}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[9px] text-[#7B7B7B] transition hover:bg-black/5"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={cn(
                "mt-2 h-[43px] w-full rounded-[9px]",
                "bg-[#004FC7] text-[14px] font-semibold text-white",
                "shadow-[0_3px_8px_rgba(0,79,199,0.22)]",
                "transition hover:bg-[#0046B3] active:translate-y-px",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
              )}
            >
              Lanjutkan
            </button>
          </form>
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}