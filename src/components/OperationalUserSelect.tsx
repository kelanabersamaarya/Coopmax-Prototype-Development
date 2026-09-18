import { ChevronDown } from "lucide-react";
import * as React from "react";

type Props = { value: string; onChange: (value: string) => void };
const options = ["Siti Aminah", "Andi Wijaya", "Dewi Lestari"];

export function OperationalUserSelect({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return <div ref={containerRef} className="relative">
    <button type="button" onClick={() => setOpen((current) => !current)} className="flex h-10 w-full items-center justify-between rounded-[8px] border border-[#d8e2ef] bg-white px-3 text-left text-[13px] text-black outline-none transition focus:outline-none focus:ring-0">
      <span className={value ? "text-black" : "text-slate-400"}>{value || "Pilih user"}</span><ChevronDown className={`h-4 w-4 text-slate-700 transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
    {open && <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-[8px] border border-[#d8e2ef] bg-white p-1 shadow-xl">
      <button type="button" onClick={() => { onChange(""); setOpen(false); }} className="w-full rounded-[6px] bg-[#246bd1] px-3 py-2 text-left text-[13px] font-semibold text-white">Pilih user</button>
      {options.map((option) => <button key={option} type="button" onClick={() => { onChange(option); setOpen(false); }} className="w-full rounded-[6px] px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#eef4ff]">{option}</button>)}
    </div>}
  </div>;
}
