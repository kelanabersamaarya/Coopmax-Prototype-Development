import * as React from "react";
import { Check, Clock3 } from "lucide-react";
import { RequiredLabel } from "./OperationalAccessFields";

const times = Array.from({ length: 48 }, (_, index) => `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`);

type Props = { start: string; end: string; onStartChange: (value: string) => void; onEndChange: (value: string) => void };

export function OperationalTimeRange({ start, end, onStartChange, onEndChange }: Props) {
  return <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center"><RequiredLabel>Jam operasional</RequiredLabel><div className="flex items-center gap-2"><TimeField label="Pilih Waktu Mulai Operasional" value={start} onChange={onStartChange} /><span className="text-[13px] text-[#17345f]">-</span><TimeField label="Pilih Waktu Selesai Operasional" value={end} onChange={onEndChange} /></div></div>;
}

function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const fieldRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (fieldRef.current && !fieldRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  return <div ref={fieldRef} className="relative min-w-0 flex-1">
    <button type="button" aria-label={label} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)} className={`flex h-9 w-full items-center justify-between rounded-[6px] border bg-white py-1 pl-3 pr-2 text-left text-[13px] shadow-sm transition-colors hover:border-[#93b4df] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] ${value ? "text-slate-900" : "text-slate-400"}`}>
      <span className="truncate">{value || label}</span>
      <Clock3 className="h-4 w-4 shrink-0 text-slate-700" />
    </button>
    {open && <div role="listbox" aria-label={label} className="absolute left-0 right-0 z-30 mt-1 max-h-56 overflow-y-auto rounded-[8px] border border-[#d7e0ed] bg-white p-1.5 shadow-[0_10px_25px_rgba(30,64,110,0.18)]">
      {times.map((time) => <button key={time} type="button" role="option" aria-selected={value === time} onClick={() => { onChange(time); setOpen(false); }} className={`flex w-full items-center justify-between rounded-[5px] px-3 py-2 text-left text-[13px] text-black transition-colors hover:bg-[#eef5ff] ${value === time ? "bg-[#2f78d5] font-semibold text-white hover:bg-[#2f78d5]" : ""}`}>{time}{value === time && <Check className="h-4 w-4" />}</button>)}
    </div>}
  </div>;
}
