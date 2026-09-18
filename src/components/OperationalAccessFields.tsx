import { CalendarDays, ChevronDown, Clock3 } from "lucide-react";
import * as React from "react";

const times = Array.from({ length: 48 }, (_, index) => `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`);

export function RequiredLabel({ children }: { children: string }) {
  return <span className="text-[12px]">{children} <span className="text-red-500">*</span></span>;
}

export function AccessDateField({ label, date, time, onDateChange, onTimeChange }: { label: string; date: string; time: string; onDateChange: (value: string) => void; onTimeChange: (value: string) => void }) {
  const isStart = label.startsWith("Mulai");
  const datePlaceholder = isStart ? "Pilih Tanggal Mulai Operasional" : "Pilih Tanggal Selesai Operasional";
  const timePlaceholder = isStart ? "Pilih Jam Mulai Operasional" : "Pilih Jam Selesai Operasional";
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  return <div className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><RequiredLabel>{label}</RequiredLabel><div className="grid gap-2 sm:grid-cols-2"><div className="relative"><input ref={dateInputRef} type="date" value={date} onChange={(event) => onDateChange(event.target.value)} aria-label={datePlaceholder} className={`h-10 w-full rounded-[8px] border border-[#d8e2ef] bg-white px-3 pr-10 text-[13px] outline-none transition focus:border-[#4169f5] focus:ring-2 focus:ring-[#4169f5]/15 ${date ? "text-slate-900" : "text-slate-400"}`} /><button type="button" aria-label={datePlaceholder} onClick={() => dateInputRef.current?.showPicker()} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 transition hover:text-[#4169f5]"><CalendarDays className="h-4 w-4" /></button><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white pr-1 text-[13px] text-slate-400">{date ? "" : datePlaceholder}</span></div><div className="relative"><Clock3 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-700" /><select value={time} onChange={(event) => onTimeChange(event.target.value)} aria-label={timePlaceholder} className={`h-10 w-full appearance-none rounded-[8px] border border-[#d8e2ef] bg-white py-1 pl-3 pr-9 text-[13px] outline-none transition focus:border-[#4169f5] focus:ring-2 focus:ring-[#4169f5]/15 ${time ? "text-slate-900" : "text-slate-400"}`}><option value="">{timePlaceholder}</option>{times.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-9 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" /></div></div></div>;
}
