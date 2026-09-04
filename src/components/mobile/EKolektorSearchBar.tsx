"use client";

import * as React from "react";
import { Check, ChevronDown, ScanLine, Search, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SearchMode = "semua" | "rekening" | "anggota" | "nama";

const searchOptions: Array<{ value: SearchMode; label: string }> = [
  { value: "semua", label: "Semua" },
  { value: "rekening", label: "No. Rekening" },
  { value: "anggota", label: "No. Anggota" },
  { value: "nama", label: "Nama Anggota" },
];

export default function EKolektorSearchBar({
  className,
  onSearch,
}: {
  className?: string;
  onSearch?: (query: string, mode: SearchMode) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [searchMode, setSearchMode] = React.useState<SearchMode>("semua");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const placeholder =
    searchMode === "rekening"
      ? "No. Rekening"
      : searchMode === "anggota"
        ? "No. Anggota"
        : searchMode === "nama"
          ? "Nama Anggota"
          : "Cari nasabah atau rekening";
  const selectedLabel = searchOptions.find((option) => option.value === searchMode)?.label;

  return (
    <div className={cn("flex w-full items-center gap-[14px]", className)}>
      <div
        className={cn(
          "flex h-[41px] min-w-0 flex-1 items-center rounded-[9px] border bg-[#F1F1F1] px-[13px] transition-colors",
          isFocused || query.length > 0 ? "border-[#004FC7]" : "border-transparent",
        )}
      >
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-[27px] min-w-[76px] items-center justify-between gap-1 rounded-[7px] bg-white px-2 text-[12px] font-semibold text-black shadow-[0_1px_3px_rgba(35,48,90,0.08)] outline-none transition active:scale-[0.98]"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className="truncate">{selectedLabel}</span>
            <ChevronDown className={cn("h-3 w-3 shrink-0 text-black transition-transform", isOpen && "rotate-180")} />
          </button>

          {isOpen ? (
            <div
              role="listbox"
              aria-label="Jenis pencarian"
              className="absolute left-0 top-[31px] z-50 w-[126px] overflow-hidden rounded-[7px] border border-[#D8E2F2] bg-white p-1 shadow-[0_6px_16px_rgba(35,48,90,0.16)]"
            >
              {searchOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={searchMode === option.value}
                  onClick={() => {
                    setSearchMode(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex h-[30px] w-full items-center justify-between rounded-[5px] px-2 text-left text-[12px] font-medium text-black transition",
                    searchMode === option.value
                      ? "bg-[#EAF2FF]"
                      : "hover:bg-[#F3F7FD]",
                  )}
                >
                  <span>{option.label}</span>
                  {searchMode === option.value ? <Check className="h-3 w-3" /> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSearch?.(query.trim(), searchMode);
          }}
          placeholder={placeholder}
          aria-label="Cari nasabah"
          className={cn(
            "ml-[10px] min-w-0 flex-1 bg-transparent",
            "text-[12px] font-normal text-[#4B4B4B]",
            "placeholder:text-[12px] placeholder:font-normal placeholder:text-[#B8B8B8]",
            "outline-none",
          )}
        />

        {query.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch?.("", searchMode);
            }}
            className="ml-[10px] grid h-[22px] w-[22px] shrink-0 place-items-center text-[#8D8D8D]"
            aria-label="Hapus pencarian"
            title="Hapus pencarian"
          >
            <X className="h-[20px] w-[20px]" strokeWidth={2.4} />
          </button>
        ) : (
          <Search
            className="ml-[10px] h-[22px] w-[22px] shrink-0 text-[#8D8D8D]"
            strokeWidth={2.4}
          />
        )}
      </div>

      <button
        type="button"
        onClick={() =>
          toast("Scan rekening (prototype)", {
            description: "Fitur scan belum dihubungkan.",
          })
        }
        className={cn(
          "grid h-[41px] w-[41px] shrink-0 place-items-center rounded-[9px]",
          "bg-[#004FC7] text-white shadow-sm transition active:scale-[0.98]",
        )}
        aria-label="Scan rekening"
        title="Scan rekening"
      >
        <ScanLine className="h-[24px] w-[24px]" strokeWidth={2.5} />
      </button>
    </div>
  );
}
