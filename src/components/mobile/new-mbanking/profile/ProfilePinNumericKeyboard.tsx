"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, Delete } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProfilePinFieldKey = "old" | "new" | "confirm";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function ProfilePinNumericKeyboard({
  activeField,
  values,
  onChange,
  onClose,
}: {
  activeField: ProfilePinFieldKey | null;
  values: Record<ProfilePinFieldKey, string>;
  onChange: (field: ProfilePinFieldKey, value: string) => void;
  onClose: () => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!activeField) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
  }, [activeField]);

  if (!activeField || !mobileScreen) return null;

  const currentValue = values[activeField] ?? "";

  function addDigit(digit: string) {
    if (currentValue.length >= 6) return;
    onChange(activeField!, `${currentValue}${digit}`.slice(0, 6));
  }

  function removeDigit() {
    onChange(activeField!, currentValue.slice(0, -1));
  }

  return createPortal(
    <div
      data-profile-pin-keyboard="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[170]"
    >
      <div className="pointer-events-auto absolute inset-x-0 bottom-[calc(100%+10px)] z-10 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "h-[44px] w-full rounded-[12px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Selesai
        </button>
      </div>

      <div
        className={cn(
          "pointer-events-auto w-full rounded-t-[20px] bg-[#F2F3F6] px-4 pb-4 pt-3",
          "animate-in slide-in-from-bottom-4 fade-in-0 duration-200",
        )}
      >
        <div className="grid grid-cols-3 gap-2.5">
          {keys.map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => addDigit(digit)}
              className={cn(
                "h-[52px] rounded-[12px] bg-white",
                "text-[24px] font-bold leading-none text-black",
                "shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]",
              )}
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "flex h-[52px] items-center justify-center rounded-[12px] bg-white",
              "text-[#33AA00] shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]",
            )}
            aria-label="Sembunyikan keyboard"
            title="Sembunyikan keyboard"
          >
            <Check className="h-[25px] w-[25px]" strokeWidth={3.2} />
          </button>

          <button
            type="button"
            onClick={() => addDigit("0")}
            className={cn(
              "h-[52px] rounded-[12px] bg-white",
              "text-[24px] font-bold leading-none text-black",
              "shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]",
            )}
          >
            0
          </button>

          <button
            type="button"
            onClick={removeDigit}
            className={cn(
              "flex h-[52px] items-center justify-center rounded-[12px] bg-white",
              "shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]",
            )}
            aria-label="Hapus angka"
            title="Hapus"
          >
            <Delete className="h-[23px] w-[23px] text-black" strokeWidth={2.7} />
          </button>
        </div>
      </div>
    </div>,
    mobileScreen,
  );
}