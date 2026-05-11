"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function onlyDigits(s: string) {
  return (s ?? "").replace(/[^\d]/g, "");
}

function formatRupiahWith00FromDigits(digits: string) {
  const cleaned = onlyDigits(digits);
  const n = cleaned === "" ? 0 : Number(cleaned);
  const intStr = Number.isFinite(n) ? String(Math.trunc(n)) : "0";
  const withThousands = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withThousands},00`;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Heuristic caret keeper:
 * - we count how many digits are to the left of caret in the raw input
 * - after formatting, we place caret after the same amount of digits
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

  // Normalize incoming value to our format (safe)
  const displayValue = React.useMemo(() => {
    const digits = onlyDigits(value);
    return formatRupiahWith00FromDigits(digits);
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

        // count digits left of caret in raw string
        const rawLeft = raw.slice(0, caret);
        const digitsLeft = onlyDigits(rawLeft).length;
        lastSelectionRef.current = { digitsLeft };

        const digits = onlyDigits(raw);
        onChange(formatRupiahWith00FromDigits(digits));
      }}
      onFocus={(e) => {
        // place caret before ",00" on focus (nice UX)
        const pos = Math.max(0, (e.target.value ?? "").length - 3);
        requestAnimationFrame(() => {
          try {
            e.target.setSelectionRange(pos, pos);
          } catch {
            // ignore
          }
        });
      }}
      onKeyDown={(e) => {
        // prevent editing the fixed ",00" part
        const el = e.currentTarget;
        const len = el.value.length;
        const selStart = el.selectionStart ?? 0;
        const selEnd = el.selectionEnd ?? 0;
        const fixedStart = Math.max(0, len - 3); // ",00"

        const isMod = e.ctrlKey || e.metaKey || e.altKey;
        if (isMod) return;

        const key = e.key;

        // allow navigation keys
        if (
          key === "ArrowLeft" ||
          key === "ArrowRight" ||
          key === "ArrowUp" ||
          key === "ArrowDown" ||
          key === "Tab" ||
          key === "Home" ||
          key === "End"
        ) {
          return;
        }

        // if selection touches the fixed tail, snap it to before tail
        if (selEnd > fixedStart) {
          // allow delete/backspace but we'll reformat anyway
          return;
        }

        // prevent typing inside fixed tail
        if (selStart >= fixedStart && key.length === 1) {
          e.preventDefault();
        }
      }}
    />
  );
}