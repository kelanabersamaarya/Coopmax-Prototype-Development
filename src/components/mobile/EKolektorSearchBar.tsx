"use client";

import * as React from "react";
import { ScanLine, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function EKolektorSearchBar({
  className,
}: {
  className?: string;
}) {
  const [query, setQuery] = React.useState("");

  return (
    <div className={cn("flex w-full items-center gap-[14px]", className)}>
      <div className="flex h-[41px] min-w-0 flex-1 items-center rounded-[9px] bg-[#F1F1F1] px-[13px]">
        <Search
          className="h-[22px] w-[22px] shrink-0 text-[#8D8D8D]"
          strokeWidth={2.4}
        />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rekening Simpanan atau Pinjaman"
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