"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PaginationControls({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  if (pageCount <= 1) return null;

  const disabledPrev = page <= 1;
  const disabledNext = page >= pageCount;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={cn(
          "inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold",
          "bg-slate-100 text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-200",
          disabledPrev ? "opacity-60 pointer-events-none" : "",
        )}
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={disabledPrev}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Sebelumnya
      </button>

      <div className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-violet-600 px-4 text-sm font-extrabold text-white">
        {page}
      </div>

      <button
        type="button"
        className={cn(
          "inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold",
          "bg-slate-100 text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-200",
          disabledNext ? "opacity-60 pointer-events-none" : "",
        )}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
        disabled={disabledNext}
      >
        Selanjutnya
        <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  );
}