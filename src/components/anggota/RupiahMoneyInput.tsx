"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function onlyDigits(s: string) {
  return (s ?? "").replace(/[^\d]/g, "");
}

function formatRibuanFromDigits(digits: string) {
  const cleaned = onlyDigits(digits);
  if (cleaned === "") return "";
  // jangan Number() agar aman untuk angka panjang, cukup format string
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Heuristic caret keeper:
 * - hitung jumlah digit di kiri caret pada raw input
 * - setelah diformat, letakkan caret setelah jumlah digit yang sama
 */
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

/**
 * RupiahMoneyInput (separator only):
 * - user ketik angka
 * - otomatis tambah pemisah ribuan "."
 * - tidak auto menambahkan ",00" dan tidak auto mengisi "0" ketika kosong
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
    const digits = onlyDigits(value);
    return formatRibuanFromDigits(digits);
  }, [value]);

  React.useLayoutEffect(() => {
    const meta = lastSelectionRef.current;
    const el = inputRef.current;
    if (!meta || !el) return;

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
      onChange={(e) => {
        const raw = e.target.value ?? "";
        const caret = e.target.selectionStart ?? raw.length;

        // jumlah digit di kiri caret (raw)
        const rawLeft = raw.slice(0, caret);
        const digitsLeft = onlyDigits(rawLeft).length;
        lastSelectionRef.current = { digitsLeft };

        const digits = onlyDigits(raw);
        onChange(formatRibuanFromDigits(digits));
      }}
    />
  );
}