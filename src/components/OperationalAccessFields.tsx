import { CalendarDays, Clock3 } from "lucide-react";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

const times = Array.from({ length: 48 }, (_, index) => `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`);

function parseDate(value: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function RequiredLabel({ children }: { children: string }) {
  return <span className="text-[12px]">{children} <span className="text-red-500">*</span></span>;
}

function OperationalDateSelect({ value, placeholder, onChange }: { value: string; placeholder: string; onChange: (value: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const selectedDate = parseDate(value);

  React.useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return <div ref={containerRef} className="relative">
    <button type="button" onClick={() => setOpen((current) => !current)} className={`flex h-10 w-full items-center justify-between rounded-[8px] border border-[#d8e2ef] bg-white px-3 text-left text-[13px] outline-none transition focus:outline-none focus:ring-0 ${value ? "text-slate-900" : "text-slate-400"}`}>
      <span>{value ? value.split("-").reverse().join("/") : placeholder}</span>
      <CalendarDays className="h-4 w-4 shrink-0 text-black" />
    </button>
    {open && <div className="absolute left-0 top-[calc(100%+4px)] z-[70] w-full overflow-hidden rounded-[10px] border border-[#d8e2ef] bg-white p-2 shadow-xl">
      <Calendar mode="single" selected={selectedDate} onSelect={(date) => { if (date) { onChange(formatDate(date)); setOpen(false); } }} defaultMonth={selectedDate || new Date()} initialFocus showOutsideDays className="w-full p-1" classNames={{ month: "w-full space-y-3", month_caption: "flex h-9 items-center justify-center text-sm font-bold text-slate-900", caption_label: "text-sm font-bold", nav: "flex items-center gap-1", button_previous: "absolute left-1 top-1 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-[#246bd1] hover:text-white", button_next: "absolute right-1 top-1 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-[#246bd1] hover:text-white", month_grid: "w-full border-collapse", weekdays: "grid grid-cols-7", weekday: "w-auto rounded-md text-center text-[11px] font-semibold text-slate-500", week: "mt-1 grid w-full grid-cols-7", day: "flex h-9 w-auto items-center justify-center p-0 text-center text-[13px]", day_button: "h-9 w-9 rounded-md p-0 font-normal hover:bg-[#246bd1] hover:text-white", selected: "bg-[#246bd1] text-white hover:bg-[#246bd1] hover:text-white", today: "border border-[#246bd1] text-[#246bd1]", outside: "text-slate-300", hidden: "invisible" }} />
      <div className="flex justify-between border-t border-[#eef1f6] px-2 pt-2 text-[12px]"><button type="button" onClick={() => { onChange(""); setOpen(false); }} className="font-semibold text-[#246bd1] hover:text-[#174e9b]">Clear</button><button type="button" onClick={() => { onChange(formatDate(new Date())); setOpen(false); }} className="font-semibold text-[#246bd1] hover:text-[#174e9b]">Today</button></div>
    </div>}
  </div>;
}

function OperationalTimeSelect({ value, placeholder, onChange }: { value: string; placeholder: string; onChange: (value: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { if (!open) return; const handleOutsideClick = (event: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false); }; document.addEventListener("mousedown", handleOutsideClick); return () => document.removeEventListener("mousedown", handleOutsideClick); }, [open]);
  return <div ref={containerRef} className="relative"><button type="button" onClick={() => setOpen((current) => !current)} className={`flex h-10 w-full items-center justify-between rounded-[8px] border border-[#d8e2ef] bg-white py-1 pl-3 pr-3 text-left text-[13px] outline-none transition focus:outline-none focus:ring-0 ${value ? "text-slate-900" : "text-slate-400"}`}><span>{value || placeholder}</span><Clock3 className="h-4 w-4 shrink-0 text-slate-700" /></button>{open && <div className="absolute left-0 top-[calc(100%+4px)] z-[60] max-h-[232px] w-full overflow-y-auto rounded-[8px] border border-[#d8e2ef] bg-white p-1 shadow-xl [scrollbar-color:#8f8f8f_transparent] [scrollbar-width:auto]">{times.map((item) => <button key={item} type="button" onClick={() => { onChange(item); setOpen(false); }} className={`block w-full rounded-[5px] px-3 py-2 text-left text-[13px] transition ${value === item ? "bg-[#246bd1] font-semibold text-white" : "text-slate-900 hover:bg-[#246bd1] hover:text-white"}`}>{item}</button>)}</div>}</div>;
}

export function AccessDateField({ label, date, time, onDateChange, onTimeChange }: { label: string; date: string; time: string; onDateChange: (value: string) => void; onTimeChange: (value: string) => void }) {
  const isStart = label.startsWith("Mulai");
  const datePlaceholder = isStart ? "Pilih Tanggal Mulai Operasional" : "Pilih Tanggal Selesai Operasional";
  const timePlaceholder = isStart ? "Pilih Jam Mulai Operasional" : "Pilih Jam Selesai Operasional";
  return <div className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><RequiredLabel>{label}</RequiredLabel><div className="grid gap-2 sm:grid-cols-2"><OperationalDateSelect value={date} placeholder={datePlaceholder} onChange={onDateChange} /><OperationalTimeSelect value={time} placeholder={timePlaceholder} onChange={onTimeChange} /></div></div>;
}
