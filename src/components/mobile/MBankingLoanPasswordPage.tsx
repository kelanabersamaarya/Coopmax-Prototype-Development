"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import MBankingNumericKeyboard from "@/components/mobile/MBankingNumericKeyboard";

export default function MBankingLoanPasswordPage({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = React.useState("");

  function submit() {
    if (!password.trim()) {
      toast("Password wajib diisi", {
        description: "Masukkan password terlebih dahulu untuk melihat detail pinjaman.",
      });
      return;
    }

    toast.success("Password terverifikasi (prototype)");
    onSuccess();
  }

  function addNumber(value: string) {
    setPassword((current) => (current.length >= 6 ? current : `${current}${value}`));
  }

  function backspace() {
    setPassword((current) => current.slice(0, -1));
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="flex min-h-0 flex-1 flex-col bg-white">
        <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <header className="shrink-0 bg-white px-6 pb-5 pt-8">
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.98]"
              aria-label="Kembali"
              title="Kembali"
            >
              <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
            </button>

            <h1 className="mt-6 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
              Password
            </h1>
          </header>

          <main className="bg-white px-6 pb-8 pt-3">
            <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#203064]">
              Masukkan Password
            </div>
            <div className="mt-2 text-[14px] font-normal leading-relaxed text-[#9B9B9B]">
              Silakan masukkan password untuk melanjutkan melihat informasi pinjaman.
            </div>

            <div className="mt-9 flex justify-center">
              <div className="flex items-center gap-3">
                {Array.from({ length: 6 }).map((_, index) => {
                  const filled = index < password.length;

                  return (
                    <span
                      key={index}
                      className={cn(
                        "h-[14px] w-[14px] rounded-full border-2 transition",
                        filled
                          ? "border-[#004FC7] bg-[#004FC7]"
                          : "border-[#D8DDEB] bg-white",
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </main>
        </div>

        <MBankingNumericKeyboard
          onNumberPress={addNumber}
          onBackspace={backspace}
          onSubmit={submit}
          submitDisabled={password.length === 0}
        />
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}