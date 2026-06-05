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
    toast.success("PIN terverifikasi (prototype)");
    onSuccess();
  }

  function addNumber(value: string) {
    setPassword((current) => (current.length >= 6 ? current : `${current}${value}`));
  }

  function backspace() {
    setPassword((current) => current.slice(0, -1));
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="flex min-h-0 flex-1 flex-col bg-[#004FC7]">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#004FC7]">
          <header className="shrink-0 bg-[#004FC7] px-6 pb-5 pt-8">
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
              aria-label="Kembali"
              title="Kembali"
            >
              <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
            </button>

            <h1 className="mt-6 text-[25px] font-extrabold leading-none tracking-tight text-white">
              Masukkan PIN Anda
            </h1>
          </header>

          <main className="grid min-h-0 flex-1 place-items-center bg-[#004FC7] px-6 pb-10 pt-4">
            <div className="flex items-center justify-center gap-3">
              {Array.from({ length: 6 }).map((_, index) => {
                const filled = index < password.length;

                return (
                  <span
                    key={index}
                    className={cn(
                      "h-[14px] w-[14px] rounded-full border-2 transition",
                      filled
                        ? "border-white bg-white"
                        : "border-white/55 bg-transparent",
                    )}
                  />
                );
              })}
            </div>
          </main>
        </div>

        <MBankingNumericKeyboard
          onNumberPress={addNumber}
          onBackspace={backspace}
          onSubmit={submit}
          submitDisabled={false}
        />
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}