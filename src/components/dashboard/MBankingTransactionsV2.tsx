import * as React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type TransactionType = "all" | "transfer" | "topUp" | "pembelianPpob" | "angsuran" | "iuran";

type TransactionRow = {
  day: string;
  transfer: number;
  topUp: number;
  pembelianPpob: number;
  angsuran: number;
  iuran: number;
};

const transactionTypes: Array<{ value: TransactionType; label: string; color: string }> = [
  { value: "all", label: "Semua jenis transaksi", color: "#5612cf" },
  { value: "transfer", label: "Transfer antar nasabah", color: "#5612cf" },
  { value: "topUp", label: "Transfer In / Top Up", color: "#09c3c7" },
  { value: "pembelianPpob", label: "Pembelian & Pembayaran PPOB", color: "#1687ef" },
  { value: "angsuran", label: "Pembayaran Angsuran", color: "#48b900" },
  { value: "iuran", label: "Pembayaran Iuran", color: "#f59e0b" },
];

const transactionData: TransactionRow[] = [
  { day: "01", transfer: 720, topUp: 580, pembelianPpob: 420, angsuran: 360, iuran: 250 },
  { day: "02", transfer: 900, topUp: 750, pembelianPpob: 620, angsuran: 520, iuran: 400 },
  { day: "03", transfer: 550, topUp: 480, pembelianPpob: 500, angsuran: 420, iuran: 300 },
  { day: "04", transfer: 1000, topUp: 840, pembelianPpob: 720, angsuran: 600, iuran: 480 },
  { day: "05", transfer: 780, topUp: 620, pembelianPpob: 550, angsuran: 470, iuran: 360 },
  { day: "06", transfer: 950, topUp: 700, pembelianPpob: 660, angsuran: 560, iuran: 440 },
  { day: "07", transfer: 680, topUp: 560, pembelianPpob: 460, angsuran: 390, iuran: 320 },
  { day: "08", transfer: 860, topUp: 730, pembelianPpob: 610, angsuran: 510, iuran: 380 },
  { day: "09", transfer: 760, topUp: 640, pembelianPpob: 580, angsuran: 450, iuran: 350 },
  { day: "10", transfer: 920, topUp: 780, pembelianPpob: 690, angsuran: 570, iuran: 420 },
  { day: "11", transfer: 640, topUp: 520, pembelianPpob: 430, angsuran: 360, iuran: 280 },
  { day: "12", transfer: 880, topUp: 720, pembelianPpob: 630, angsuran: 520, iuran: 400 },
  { day: "13", transfer: 820, topUp: 660, pembelianPpob: 590, angsuran: 480, iuran: 370 },
  { day: "14", transfer: 700, topUp: 580, pembelianPpob: 510, angsuran: 410, iuran: 310 },
  { day: "15", transfer: 980, topUp: 820, pembelianPpob: 740, angsuran: 620, iuran: 460 },
];

function formatDate(date: Date | undefined) {
  if (!date) return "Pilih tanggal";
  return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function DateFilter({ label, value, onChange }: { label: string; value?: Date; onChange: (date?: Date) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="h-10 min-w-[170px] justify-between rounded-lg border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-none hover:bg-slate-50">
          <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-violet-700" />{value ? formatDate(value) : label}</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-xl border-slate-200 p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

export default function MBankingTransactionsV2() {
  const [type, setType] = React.useState<TransactionType>("all");
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));
  const selectedType = transactionTypes.find((item) => item.value === type) ?? transactionTypes[0];
  const chartData = React.useMemo(() => {
    const startDay = startDate?.getFullYear() === 2026 && startDate.getMonth() === 8 ? startDate.getDate() : 1;
    const endDay = endDate?.getFullYear() === 2026 && endDate.getMonth() === 8 ? endDate.getDate() : 31;
    const filteredData = transactionData.filter((item) => Number(item.day) >= startDay && Number(item.day) <= endDay);
    const categories = type === "all" ? transactionTypes.slice(1) : transactionTypes.filter((item) => item.value === type);

    return categories.map((category) => ({
      category: category.label,
      color: category.color,
      value: filteredData.reduce((sum, item) => sum + item[category.value], 0),
    }));
  }, [endDate, startDate, type]);

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">Transaksi MBanking V2</h2>
          <p className="mt-1 text-xs text-blue-700">Analisis transaksi berdasarkan jenis transaksi MBanking</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DateFilter label="Tanggal mulai" value={startDate} onChange={setStartDate} />
          <span className="text-xs text-slate-400">sampai</span>
          <DateFilter label="Tanggal akhir" value={endDate} onChange={setEndDate} />
          <select aria-label="Jenis transaksi MBanking" value={type} onChange={(event) => setType(event.target.value as TransactionType)} className="h-10 min-w-[220px] rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-violet-500">
            {transactionTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 h-[310px] w-full">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500"><span>Grafik {selectedType.label}</span><span>{formatDate(startDate)} — {formatDate(endDate)}</span></div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-12} height={58} interval={0} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip
              formatter={(value: number) => [`${value.toLocaleString("id-ID")} transaksi`, "Jumlah"]}
              labelFormatter={(label) => String(label)}
            />
            <Bar dataKey="value" name="Jumlah transaksi" radius={[5, 5, 0, 0]} maxBarSize={52}>
              {chartData.map((item) => <Cell key={item.category} fill={item.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
