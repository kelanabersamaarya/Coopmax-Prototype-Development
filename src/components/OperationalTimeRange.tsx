import { Clock3 } from "lucide-react";
import { RequiredLabel } from "./OperationalAccessFields";

const times = Array.from({ length: 48 }, (_, index) => `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`);

type Props = { start: string; end: string; onStartChange: (value: string) => void; onEndChange: (value: string) => void };

export function OperationalTimeRange({ start, end, onStartChange, onEndChange }: Props) {
  return <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center"><RequiredLabel>Jam operasional</RequiredLabel><div className="flex items-center gap-2"><TimeField label="Pilih Waktu Mulai Operasional" value={start} onChange={onStartChange} /><span className="text-[13px] text-[#17345f]">-</span><TimeField label="Pilih Waktu Selesai Operasional" value={end} onChange={onEndChange} /></div></div>;
}

function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <div className="relative min-w-0 flex-1"><Clock3 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" /><select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} className={`h-9 w-full appearance-none rounded-[6px] border bg-white py-1 pl-3 pr-9 text-[13px] ${value ? "text-slate-900" : "text-slate-400"}`}><option value="">{label}</option>{times.map((time) => <option key={time}>{time}</option>)}</select></div>;
}
