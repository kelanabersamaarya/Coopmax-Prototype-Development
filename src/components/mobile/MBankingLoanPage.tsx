"use client";

import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function MBankingLoanPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
        </button>

        <h1 className="mt-6 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
          Pinjaman
        </h1>

        <button
          type="button"
          className={cn(
            "mt-12 block w-full overflow-hidden rounded-[22px] bg-[#004FC7] text-left",
            "shadow-[0_12px_26px_rgba(0,79,199,0.20)] transition active:scale-[0.99]",
          )}
        >
          <div className="relative h-[224px] overflow-hidden">
            <div className="relative z-20 px-7 pt-7 text-[20px] font-normal leading-none tracking-tight text-white">
              Pinjaman Bulanan
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[168px] overflow-hidden bg-[#86c7db]">
              <svg
                viewBox="0 0 390 180"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <rect width="390" height="180" fill="#82C9DE" />

                <path
                  d="M-24 173C22 113 61 94 103 125C139 153 177 145 216 106C258 64 312 61 416 113V180H-24V173Z"
                  fill="#5EA850"
                  opacity="0.92"
                />
                <path
                  d="M-12 146C34 103 76 88 116 116C151 141 189 136 222 101C267 52 330 52 418 91V180H-12V146Z"
                  fill="#2E7D46"
                  opacity="0.78"
                />
                <path
                  d="M252 0C264 46 295 76 341 80C375 82 397 99 411 128V0H252Z"
                  fill="#6E9DF0"
                  opacity="0.42"
                />

                <circle cx="318" cy="55" r="38" fill="#DDF3FB" opacity="0.86" />
                <circle cx="360" cy="65" r="33" fill="#DDF3FB" opacity="0.86" />
                <circle cx="343" cy="72" r="5" fill="#1A6B93" opacity="0.95" />
                <circle cx="378" cy="75" r="5" fill="#1A6B93" opacity="0.95" />
                <path
                  d="M347 96C356 102 367 102 376 95"
                  stroke="#1A6B93"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                <rect x="88" y="31" width="47" height="75" rx="10" fill="#F8CB42" />
                <rect x="90" y="31" width="43" height="27" rx="8" fill="#E84437" />
                <rect x="148" y="32" width="47" height="75" rx="10" fill="#F8CB42" />
                <rect x="150" y="32" width="43" height="27" rx="8" fill="#D8DDE8" />
                <rect x="208" y="31" width="47" height="75" rx="10" fill="#F8CB42" />
                <rect x="210" y="31" width="43" height="27" rx="8" fill="#E84437" />

                <rect x="102" y="70" width="34" height="60" rx="5" fill="#F8CB42" />
                <rect x="160" y="70" width="34" height="60" rx="5" fill="#F8CB42" />
                <rect x="219" y="70" width="34" height="60" rx="5" fill="#F8CB42" />

                <circle cx="181" cy="97" r="17" fill="#E5F3F7" />
                <path
                  d="M170 96C170 89 175 84 181 84C187 84 192 89 192 96V108H170V96Z"
                  stroke="#427A9A"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="162" y="104" width="38" height="37" rx="7" fill="#F9D34B" />
                <circle cx="181" cy="119" r="5" fill="#D54B31" />
                <rect x="178" y="121" width="6" height="12" rx="3" fill="#D54B31" />

                <path
                  d="M38 142C69 104 103 104 134 142C165 180 196 180 229 142C260 106 295 107 326 143C348 168 374 176 410 168V180H38V142Z"
                  fill="#78B445"
                  opacity="0.94"
                />
                <path
                  d="M-29 91C13 66 58 74 91 112C121 148 151 151 190 116C230 80 270 82 307 115C341 145 374 151 418 131V180H-29V91Z"
                  fill="#117FA6"
                  opacity="0.38"
                />

                <path
                  d="M18 118C48 82 82 80 110 113C135 143 163 146 192 118C230 82 266 80 296 113C323 143 351 148 386 130"
                  fill="none"
                  stroke="#2F8A93"
                  strokeWidth="20"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[#004FC7]/10" />
          </div>
        </button>
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}