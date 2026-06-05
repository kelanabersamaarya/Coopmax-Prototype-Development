"use client";

import * as React from "react";
import { Eye, EyeOff, Lock, UserRound } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EKolektorLoginHeader from "@/components/mobile/EKolektorLoginHeader";

export default function EKolektorLoginForm({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberUsername, setRememberUsername] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim()) {
      toast("Username wajib diisi", {
        description: "Masukkan username terlebih dahulu.",
      });
      return;
    }

    if (!password.trim()) {
      toast("Password wajib diisi", {
        description: "Masukkan password terlebih dahulu.",
      });
      return;
    }

    if (rememberUsername) {
      localStorage.setItem("dyad.e-kolektor.username", username.trim());
    } else {
      localStorage.removeItem("dyad.e-kolektor.username");
    }

    onLogin();
  }

  React.useEffect(() => {
    const savedUsername = localStorage.getItem("dyad.e-kolektor.username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberUsername(true);
    }
  }, []);

  return (
    <div className="min-h-full bg-[#0754c9]">
      <div className="flex min-h-[980px] flex-col bg-[#0754c9]">
        <EKolektorLoginHeader />

        <div className="relative z-30 -mt-[30px] min-h-[814px] rounded-t-[30px] bg-white px-8 pb-10 pt-[64px]">
          <div>
            <h1 className="text-[30px] font-extrabold leading-tight tracking-tight text-black">
              Masuk
            </h1>
            <p className="mt-2 text-[14px] font-normal leading-relaxed text-[#8a8a8a]">
              Silakan masuk untuk membuka halaman e-Kolektor.
            </p>
          </div>

          <form onSubmit={submit} className="mt-9 grid gap-5">
            <label className="grid gap-2">
              <span className="text-[13px] font-semibold text-[#7c7c7c]">
                Username
              </span>
              <span className="relative block">
                <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className={cn(
                    "h-[52px] w-full rounded-[8px] border border-[#e2e8f0] bg-white pl-12 pr-4",
                    "text-[15px] font-semibold text-slate-900 shadow-sm",
                    "placeholder:text-[#b5b5b5]",
                    "focus:border-[#1c84c6] focus:outline-none",
                  )}
                  placeholder="Masukkan username"
                  autoComplete="username"
                />
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-[13px] font-semibold text-[#7c7c7c]">
                Password
              </span>
              <span className="relative block">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  className={cn(
                    "h-[52px] w-full rounded-[8px] border border-[#e2e8f0] bg-white pl-12 pr-12",
                    "text-[15px] font-semibold text-slate-900 shadow-sm",
                    "placeholder:text-[#b5b5b5]",
                    "focus:border-[#1c84c6] focus:outline-none",
                  )}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[8px] text-[#8a8a8a] transition hover:bg-slate-100"
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
              </span>
            </label>

            <label className="flex w-fit items-center gap-3 text-[14px] font-semibold text-[#777777]">
              <input
                type="checkbox"
                checked={rememberUsername}
                onChange={(event) => setRememberUsername(event.target.checked)}
                className="h-[18px] w-[18px] rounded-[4px] accent-[#1c84c6]"
              />
              Simpan Username
            </label>

            <button
              type="submit"
              className={cn(
                "mt-1 h-[46px] w-full rounded-[8px]",
                "bg-[#1c84c6] text-[15px] font-semibold text-white",
                "shadow-[0_2px_4px_rgba(28,132,198,0.22)]",
                "transition hover:bg-[#1877b3] active:translate-y-px",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1c84c6]/25",
              )}
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}