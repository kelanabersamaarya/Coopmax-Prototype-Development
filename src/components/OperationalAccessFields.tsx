import { CalendarDays, Clock3 } from "lucide-react";
import * as React from "react";

const times = Array.from({ length: 48 }, (_, index) => `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`);

export function RequiredLabel({ children }: { children: string }) {
  return <span className="text-[12px]">{children} <span className="text-red-500">*</span></span>;
}

function OperationalTimeSelect({ value, placeholder, onChange }: { value: string; placeholder: string; onChange: (value: string) => void }) {
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
    <button type="button" onClick={() => setOpen((current) => !current)} className={`flex h-10 w-full items-center justify-between rounded-[8px] border border-[#d8e2ef] bg-white py-1 pl-3 pr-3 text-left text-[13px] outline-none transition focus:outline-none focus:ring-0 ${value ? "text-slate-900" : "text-slate-400"}`}>
      <span>{value || placeholder}</span>
      <Clock3 className="h-4 w-4 shrink-0 text-slate-700" />
    </button>
    {open && <div className="absolute left-0 top-[calc(100%+4px)] z-[60] max-h-[232px] w-full overflow-y-auto rounded-[8px] border border-[#d8e2ef] bg-white p-1 shadow-xl [scrollbar-color:#8f8f8f_transparent] [scrollbar-width:auto]">
      {times.map((item) => <button key={item} type="button" onClick={() => { onChange(item); setOpen(false); }} className={`block w-full rounded-[5px] px-3 py-2 text-left text-[13px] transition ${value === item ? "bg-[#246bd1] font-semibold text-white" : "text-slate-900 hover:bg-[#eef4ff]"}`}>{item}</button>)}
    </div>}
  </div>;
}

export function AccessDateField({ label, date, time, onDateChange, onTimeChange }: { label: string; date: string; time: string; onDateChange: (value: string) => void; onTimeChange: (value: string) => void }) {
  const isStart = label.startsWith("Mulai");
  const datePlaceholder = isStart ? "Pilih Tanggal Mulai Operasional" : "Pilih Tanggal Selesai Operasional";
  const timePlaceholder = isStart ? "Pilih Jam Mulai Operasional" : "Pilih Jam Selesai Operasional";
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  return <div className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><RequiredLabel>{label}</RequiredLabel><div className="grid gap-2 sm:grid-cols-2"><div className="relative"><input ref={dateInputRef} type="date" value={date} onChange={(event) => onDateChange(event.target.value)} aria-label={datePlaceholder} className={`h-10 w-full rounded-[8px] border border-[#d8e2ef] bg-white px-3 pr-10 text-[13px] outline-none focus:[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:opacity-0 ${date ? "text-slate-900" : "text-slate-400"}`} /><button type="button" aria-label={datePlaceholder} onClick={() => dateInputRef.current?.showPicker()} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 transition hover:text-[#4169f5]"><CalendarDays className="h-4 w-4" /></button><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white pr-1 text-[13px] text-slate-400">{date ? "" : datePlaceholder}</span></div><OperationalTimeSelect value={time} placeholder={timePlaceholder} onChange={onTimeChange} /></div></div>;
}
