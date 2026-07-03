import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingFilterAccordionSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 text-left transition active:scale-[0.99]"
        aria-expanded={open}
      >
        <span className="text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
          {title}
        </span>

        <ChevronDown
          className={cn(
            "h-[22px] w-[22px] shrink-0 text-black transition-transform duration-200",
            open ? "rotate-180" : "rotate-0",
          )}
          strokeWidth={2.6}
        />
      </button>

      <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </section>
  );
}