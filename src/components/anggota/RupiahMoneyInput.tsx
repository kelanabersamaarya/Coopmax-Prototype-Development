"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function onlyDigits(s: string) {
  return (s ?? "").replace(/[^\d]/g, "");
}

function formatRibuanFromDigits(digits: string) {
  const cleaned = onlyDigits(digits);
  if (cleaned === "") return "";
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function caretFromDigitsCount(formatted: string, digitsToLeft: number) {
  if (digitsToLeft <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i] ?? "")) {
      seen++;
      if (seen >= digitsToLeft) return i + 1;
    }
  }
  return formatted.length;
}

function isZeroComma00(v: string) {
  return (v ?? "").trim() === "0,00";
}

/**
 * RupiahMoneyInput:
 * - Default tampil "0,00"
 * - Saat user mengetik angka: otomatis titik ribuan (contoh 50000 -> 50.000)
 * - Jika user mengosongkan: kembali ke "0,00"
 *
 * Catatan: komponen ini sengaja tidak mempertahankan desimal (",00") saat user mengetik,
 * karena request hanya ingin auto titik ribuan/jutaan; namun default tetap "0,00".
 */
export default function RupiahMoneyInput({
  value,
  onChange,
  className,
  disabled,
  placeholder,
  "aria-label": ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  "aria-label"?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const lastSelectionRef = React.useRef<{ digitsLeft: number } | null>(null);

  const displayValue = React.useMemo(() => {
    // keep default "0,00" visible as-is
    if (isZeroComma00(value)) return "0,00";

    const digits = onlyDigits(value);
    if (digits === "") return "0,00";

    // drop leading zeros to avoid "000" visual
    const normalizedDigits = digits.replace(/^0+(?=\d)/, "");
    const formatted = formatRibuanFromDigits(normalizedDigits);
    return formatted === "" ? "0,00" : formatted;
  }, [value]);

  React.useLayoutEffect(() => {
    const meta = lastSelectionRef.current;
    const el = inputRef.current;
    if (!meta || !el) return;

    // If currently showing default, place caret at start
    if (displayValue === "0,00") {
      try {
        el.setSelectionRange(0, 0);
      } catch {
        // ignore
      }
      lastSelectionRef.current = null;
      return;
    }

    const nextPos = caretFromDigitsCount(displayValue, meta.digitsLeft);
    const pos = clamp(nextPos, 0, displayValue.length);
    try {
      el.setSelectionRange(pos, pos);
    } catch {
      // ignore
    }
    lastSelectionRef.current = null;
  }, [displayValue]);

  return (
    <input
      ref={inputRef}
      value={displayValue}
      disabled={disabled}
      placeholder={placeholder}
      aria-label={ariaLabel}
      inputMode="numeric"
      className={cn(
        "h-[30px] w-full rounded-[5px] border border-slate-200 bg-white px-3",
        "text-[14px] font-medium text-slate-900 shadow-sm",
        "focus-visible:ring-0 focus-visible:ring-offset-0",
        className,
      )}
      onFocus={(e) => {
        // Kalau default "0,00", select semua biar tinggal ketik angka langsung
        if ((e.currentTarget.value ?? "") === "0,00") {
          requestAnimationFrame(() => {
            try {
              e.currentTarget.setSelectionRange(0, 4);
            } catch {
              // ignore
            }
          });
        }
      }}
      onChange={(e) => {
        const raw = e.target.value ?? "";
        const caret = e.target.selectionStart ?? raw.length;

        const rawLeft = raw.slice(0, caret);
        const digitsLeft = onlyDigits(rawLeft).length;
        lastSelectionRef.current = { digitsLeft };

        const digits = onlyDigits(raw);

        if (digits === "") {
          onChange("0,00");
          return;
        }

        const normalizedDigits = digits.replace(/^0+(?=\d)/, "");
        const formatted = formatRibuanFromDigits(normalizedDigits);

        onChange(formatted === "" ? "0,00" : formatted);
      }}
    />
  );
}