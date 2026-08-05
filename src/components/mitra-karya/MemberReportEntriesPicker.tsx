import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MemberReportEntriesPicker({
  className,
}: {
  className?: string;
}) {
  const [entryCount, setEntryCount] = React.useState("20");

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-[12px] font-normal text-black",
        className,
      )}
    >
      <span>Tampilkan</span>

      <span className="relative">
        <select
          value={entryCount}
          onChange={(event) => setEntryCount(event.target.value)}
          className="h-[30px] min-w-[58px] appearance-none rounded-[4px] border border-slate-600 py-0 pl-2 pr-7 text-[12px] font-normal text-black outline-none"
          aria-label="Jumlah entri yang ditampilkan"
        >
          {[10, 20, 50, 100].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>

        <ChevronDown
          className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-black"
          strokeWidth={2.5}
        />
      </span>

      <span>entri</span>
    </label>
  );
}