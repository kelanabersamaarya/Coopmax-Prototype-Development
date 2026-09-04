"use client";

import * as React from "react";
import { ChevronDown, ScanLine, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SearchMode = "semua" | "rekening" | "anggota" | "nama";

export default function EKolektorSearchBar({
  className,
}: {
  className?: string;
}) {
  const [query, setQuery] = React.useState("");
  const [searchMode, setSearchMode] = React.useState<SearchMode>("semua");

  const placeholder =
    searchMode === "rekening"
      ? "No. Rekening"
      : searchMode === "anggota"
        ? "No. Anggota"
        : searchMode === "nama"
          ? "Nama Anggota"
          : "Cari nasabah atau rekening";

  return (
    <div className={cn("flex w-full items-center gap-[14px]", className)}>
      <div className="flex h-[41px] min-w-0 flex-1 items-center rounded-[9px] bg-[#F1F1F1] px-[13px]">
        <label className="relative flex h-[27px] shrink-0 items-center rounded-[7px] bg-white/80 px-2 shadow-[0_1px_3px_rgba(35,48,90,0.08)]">
          <span className="sr-only">Jenis pencarian</span>
          <select
            value={searchMode}
            onChange={(event) => setSearchMode(event.target.value as SearchMode)}
            className="h-full max-w-[74px] cursor-pointer appearance-none bg-transparent pr-4 text-[10px] font-semibold text-[#004FC7] outline-none"
            aria-label="Jenis pencarian"
          >
            <option value="semua">Semua</option>
            <option value="rekening">No. Rekening</option>
            <option value="anggota">No. Anggota</option>
            <option value="nama">Nama Anggota</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 h-3 w-3 text-[#004FC7]" />
        </label>

        <Search
          className="ml-[10px] h-[22px] w-[22px] shrink-0 text-[#8D8D8D]"
          strokeWidth={2.4}
        />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          aria-label="Cari nasabah"
          className={cn(
            "ml-[10px] min-w-0 flex-1 bg-transparent",
            "text-[12px] font-normal text-[#4B4B4B]",
            "placeholder:text-[12px] placeholder:font-normal placeholder:text-[#B8B8B8]",
            "outline-none",
          )}
        />
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
