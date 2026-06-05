"use client";

import { Delete } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MBankingNumericKeyboard({
  onNumberPress,
  onBackspace,
  onSubmit,
  submitDisabled = false,
}: {
  onNumberPress: (value: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
}) {
  const keyClassName = cn(
    "flex h-[48px] items-center justify-center rounded-[14px]",
    "text-[30px] font-extrabold leading-none tracking-tight text-[#1f2f63]",
    "transition active:scale-[0.94] active:bg-slate-100",
  );

  return (
    <div className="rounded-t-[14px] bg-white px-5 pb-6 pt-5">
      <div className="mx-auto grid max-w-[320px] grid-cols-3 gap-x-[34px] gap-y-[4px]">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => onNumberPress(number)}
            className={keyClassName}
            aria-label={`Angka ${number}`}
          >
            {number}
          </button>
        ))}

        <div />

        <button
          type="button"
          onClick={() => onNumberPress("0")}
          className={keyClassName}
          aria-label="Angka 0"
        >
          0
        </button>

        <button
          type="button"
          onClick={onBackspace}
          className="flex h-[48px] items-center justify-center rounded-[14px] transition active:scale-[0.94] active:bg-slate-100"
          aria-label="Hapus"
          title="Hapus"
        >
          <span className="inline-flex h-[21px] w-[28px] items-center justify-center rounded-[5px] bg-[#004FC7] text-white">
            <Delete className="h-[17px] w-[17px]" strokeWidth={3} />
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitDisabled}
        className={cn(
          "mt-[18px] h-[34px] w-full rounded-full",
          "bg-[#82A2E9] text-[12px] font-normal text-[#1f2f63]",
          "transition active:scale-[0.99]",
          submitDisabled ? "opacity-70" : "hover:bg-[#7899e2]",
        )}
      >
        Selanjutnya
      </button>
    </div>
  );
}