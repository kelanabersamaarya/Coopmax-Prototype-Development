import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarSectionProps = {
  active: boolean;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
};

export function SidebarSection({ active, label, icon: Icon, children, className }: SidebarSectionProps) {
  const [open, setOpen] = React.useState(active);

  React.useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return (
    <div className={cn("rounded-2xl bg-white", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left transition",
          active ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200" : "bg-white text-slate-900 hover:bg-slate-50",
        )}
        aria-expanded={open}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">{label}</span>
        <ChevronDown className={cn("h-4.5 w-4.5 text-slate-400 transition", open ? "rotate-180" : "rotate-0")} />
      </button>
      <div className={cn("grid overflow-hidden transition-[grid-template-rows,opacity] duration-200", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  );
}
