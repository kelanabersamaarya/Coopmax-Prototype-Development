"use client";

import * as React from "react";
import { Check, Clock3 } from "lucide-react";
import { toast } from "sonner";
import eKolektorLogin from "@/assets/mobile/e-kolektor/login.svg";
import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import { cn } from "@/lib/utils";

export default function EKolektorMockup() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleLogin() {
    setLoggedIn(true);
    toast.success("Berhasil masuk", {
      description: "Halaman riwayat transaksi ditampilkan.",
    });
  }

  return (
    <MobileMockupFrame edgeToEdge>
      {!loggedIn ? (
        <div className="relative min-h-full bg-white">
          <img
            src={eKolektorLogin}
            alt="Halaman login E-Kolektor"
            className="pointer-events-none block min-h-full w-full bg-white object-cover"
            draggable={false}
          />

          <button
            type="button"
            onClick={handleLogin}
            className={cn(
              "absolute left-[9%] right-[9%] bottom-[7.2%] z-30 h-[56px]",
              "cursor-pointer rounded-full bg-transparent",
              "text-transparent outline-none",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/25",
            )}
            aria-label="Masuk"
            title="Masuk"
          >
            Masuk
          </button>
        </div>
      ) : (
        <div className="min-h-[980px] bg-white">
          <div className="flex h-[455px] items-end bg-white px-6 pb-8">
            <div className="w-full rounded-[6px] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.18)] ring-1 ring-slate-200">
              <div className="flex items-center gap-4 px-4 py-3">
                <span className="h-7 w-1.5 rounded-full bg-[#39b54a]" />
                <div className="min-w-0 flex-1 text-[15px] font-normal leading-snug text-[#7c7c7c]">
                  Total transaksi hari ini yang sudah tersinkron
                </div>
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#39b54a] text-white">
                  <Check className="h-8 w-8" strokeWidth={3} />
                </span>
              </div>
            </div>
          </div>

          <div className="min-h-[525px] rounded-tr-[48px] bg-[#f4f4f4] px-5 pt-10">
            <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-black">
              Riwayat Transaksi Hari Ini
            </h1>

            <div className="mt-14 rounded-[18px] bg-white px-5 py-5 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1c84c6]">
                  <Clock3 className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <div className="text-[15px] font-bold text-slate-900">
                    Belum ada transaksi baru
                  </div>
                  <div className="mt-1 text-[13px] leading-relaxed text-slate-500">
                    Transaksi yang diproses hari ini akan tampil pada daftar ini.
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLoggedIn(false)}
              className="mt-8 w-full rounded-[14px] bg-[#1c84c6] px-4 py-3 text-[15px] font-bold text-white shadow-sm"
            >
              Kembali ke Login
            </button>
          </div>
        </div>
      )}
    </MobileMockupFrame>
  );
}