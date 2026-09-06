import * as React from "react";
import { CalendarDays } from "lucide-react";
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

function DateFilter({ value, onChange }: { value?: Date; onChange: (date?: Date) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="h-[52px] min-w-[205px] justify-between rounded-[4px] border-[#c6d2e3] bg-white px-5 text-base font-normal text-[#173d75] shadow-none hover:bg-slate-50">
          <span>{value ? value.toLocaleDateString("id-ID", { month: "long", year: "numeric" }) : "Pilih bulan"}</span>
          <CalendarDays className="h-[18px] w-[18px] text-black" strokeWidth={2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-xl border-slate-200 p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

export default function MBankingTransactionsV2() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));
  const startDate = new Date(2026, 8, 1);
  const endDate = selectedDate;
  const chartData = React.useMemo(() => {
    const startDay = startDate?.getFullYear() === 2026 && startDate.getMonth() === 8 ? startDate.getDate() : 1;
    const endDay = endDate?.getFullYear() === 2026 && endDate.getMonth() === 8 ? endDate.getDate() : 31;
    const filteredData = transactionData.filter((item) => Number(item.day) >= startDay && Number(item.day) <= endDay);
    const categories = transactionTypes.slice(1);

    return categories.map((category) => ({
      category: category.label,
      color: category.color,
      total: filteredData.reduce((sum, item) => sum + item[category.value as keyof TransactionRow] as number, 0),
    }));
  }, [endDate]);
  const maxValue = Math.max(...chartData.map((item) => item.total), 1);
  const normalizedChartData = chartData.map((item) => ({
    ...item,
    value: item.total / maxValue,
  }));
  const axisTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">TRANSAKSI MBANKING V2</h2>
        <div className="flex justify-start">
          <DateFilter value={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>

      <div className="mt-4 h-[310px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={normalizedChartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeWidth={1} vertical={false} />
          <XAxis dataKey="category" tick={{ fontSize: 10 }} height={42} interval={0} axisLine={false} tickLine={false} />
          <YAxis ticks={axisTicks} domain={[0, 1]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => String(value).replace("0.", "0,")} />
            <Tooltip
              formatter={(value: number, name: string, item) => [`${Number(item.payload.total).toLocaleString("id-ID")} transaksi`, "Jumlah"]}
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
