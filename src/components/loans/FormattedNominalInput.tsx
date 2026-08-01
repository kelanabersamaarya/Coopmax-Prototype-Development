"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function onlyDigits(value: string) {
  return (value ?? "").replace(/[^\d]/g, "");
}

function formatThousands(digits: string) {
  const cleaned = onlyDigits(digits);
  if (!cleaned) return "";

  const normalized = cleaned.replace(/^0+(?=\d)/, "");
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function splitDecimalLike(value: string) {
  const raw = (value ?? "").trim();
  const commaIndex = raw.indexOf(",");

  if (commaIndex < 0) {
    return {
      integerPart: raw,
      decimalPart: "",
      hasDecimal: false,
    };
  }

  return {
    integerPart: raw.slice(0, commaIndex),
    decimalPart: raw.slice(commaIndex + 1).replace(/[^\d]/g, "").slice(0, 2),
    hasDecimal: true,
  };
}

function formatDisplayValue(value: string) {
  const raw = (value ?? "").trim();
  if (!raw) return "0,00";

  const { integerPart, decimalPart, hasDecimal } = splitDecimalLike(raw);
  const formattedInteger = formatThousands(integerPart);

  if (!formattedInteger && !hasDecimal) return "0,00";

  return `${formattedInteger || "0"},${decimalPart.padEnd(2, "0")}`;
}

function caretFromDigitsCount(formatted: string, digitsToLeft: number) {
  if (digitsToLeft <= 0) return 0;

  const commaIndex = formatted.indexOf(",");
  const integerEnd = commaIndex >= 0 ? commaIndex : formatted.length;

  let seen = 0;
  for (let i = 0; i < integerEnd; i++) {
    if (/\d/.test(formatted[i] ?? "")) {
      seen += 1;
      if (seen >= digitsToLeft) return i + 1;
    }
  }

  return integerEnd;
}

export default function FormattedNominalInput({
  value,
  onChange,
  className,
  disabled = false,
  placeholder = "0,00",
  inputMode = "decimal",
  readOnly = false,
  selectOnFocus = false,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  readOnly?: boolean;
  selectOnFocus?: boolean;
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const caretDigitsRef = React.useRef<number | null>(null);

  const displayValue = React.useMemo(() => formatDisplayValue(value), [value]);

  React.useLayoutEffect(() => {
    const digitsToLeft = caretDigitsRef.current;
    const input = inputRef.current;

    if (digitsToLeft === null || !input) return;

    const nextPos = caretFromDigitsCount(displayValue, digitsToLeft);
    input.setSelectionRange(nextPos, nextPos);
    caretDigitsRef.current = null;
  }, [displayValue]);

  return (
    <input
      ref={inputRef}
      value={displayValue}
      onFocus={(event) => {
        if (selectOnFocus || event.currentTarget.value === "0,00") {
          event.currentTarget.select();
        }
      }}
      onChange={(event) => {
        const raw = event.target.value ?? "";
        const caret = event.target.selectionStart ?? raw.length;
        const rawBeforeCaret = raw.slice(0, caret).split(",")[0] ?? "";
        caretDigitsRef.current = onlyDigits(rawBeforeCaret).length;

        const { integerPart, decimalPart, hasDecimal } = splitDecimalLike(raw);
        const formattedInteger = formatThousands(integerPart);

        if (!formattedInteger && !hasDecimal) {
          onChange("0,00");
          return;
        }

        onChange(`${formattedInteger || "0"},${decimalPart.padEnd(2, "0")}`);
      }}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      inputMode={inputMode}
      className={cn(
        "h-[30px] w-full rounded-[5px] border border-slate-300 bg-white px-3",
        "text-left text-[14px] font-medium text-slate-900 shadow-none",
        "placeholder:text-[#64748B]",
        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        disabled ? "pointer-events-none opacity-60" : "",
        className,
      )}
    />
  );
}