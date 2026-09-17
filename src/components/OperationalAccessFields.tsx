import { Clock3 } from "lucide-react";

const times = Array.from({ length: 48 }, (_, index) => `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`);

export function RequiredLabel({ children }: { children: string }) {
  return <span className="text-[12px]">{children} <span className="text-red-500">*</span></span>;
}

export function AccessDateField({ label, date, time, onDateChange, onTimeChange }: { label: string; date: string; time: string; onDateChange: (value: string) => void; onTimeChange: (value: string) => void }) {
  const isStart = label.startsWith("Mulai");
  return <div className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-center"><RequiredLabel>{label}</RequiredLabel><div className="grid gap-2 sm:grid-cols-2"><input type="date" value={date} onChange={(event) => onDateChange(event.target.value)} aria-label={isStart ? "Pilih Tanggal Mulai Operasional" : "Pilih Tanggal Selesai Operasional"} className="h-9 rounded-[6px] border px-3 text-[13px] text-slate-400" /><div className="relative"><Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><select value={time} onChange={(event) => onTimeChange(event.target.value)} aria-label={isStart ? "Pilih Jam Mulai Operasional" : "Pilih Jam Selesai Operasional"} className="h-9 w-full appearance-none rounded-[6px] border py-1 pl-9 pr-3 text-[13px] text-slate-400"><option value="">{isStart ? "Pilih Jam Mulai Operasional" : "Pilih Jam Selesai Operasional"}</option>{times.map((item) => <option key={item}>{item}</option>)}</select></div></div></div>;
}
