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
      <div className="flex h-[58px] min-w-0 flex-1 items-center rounded-[15px] bg-[#F1F1F1] px-[18px]">
        <Search className="h-[30px] w-[30px] shrink-0 text-[#8D8D8D]" strokeWidth={2.4} />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rekening Simpanan atau Pinjaman"
          className={cn(
            "ml-[18px] min-w-0 flex-1 bg-transparent",
            "text-[16px] font-normal text-[#4B4B4B]",
            "placeholder:text-[16px] placeholder:font-normal placeholder:text-[#8D8D8D]",
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
          "grid h-[58px] w-[58px] shrink-0 place-items-center rounded-[15px]",
          "bg-[#28B6DD] text-white shadow-sm transition active:scale-[0.98]",
        )}
        aria-label="Scan rekening"
        title="Scan rekening"
      >
        <ScanLine className="h-[34px] w-[34px]" strokeWidth={2.5} />
      </button>
    </div>
  );
}