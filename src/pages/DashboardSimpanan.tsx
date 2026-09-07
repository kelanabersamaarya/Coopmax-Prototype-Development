import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const savingsProducts = [
  ["56", "Simpanan Sukarela"],
  ["46", "Simpanan Pokok"],
  ["45", "Simpanan Wajib"],
  ["5", "Simpanan Program"],
  ["9", "tabungan"],
  ["1", "Mandiri Tabungan Rupiah- Bank Mandiri"],
  ["1", "TabunganKu – Bank BPD Bali"],
  ["2", "Tabungan BRI simp edes"],
  ["1", "SIMPEDA – BANK BPD BALI"],
  ["1", "Tabungan BritAma"],
  ["1", "Tahapan BCA"],
  ["1", "SIBAPA – BANK BPD BALI"],
  ["1", "Tabungan BRI Junio"],
  ["1", "Tabunganku-BNI"],
  ["1", "SIMPANAN LPD – BANK BPD BALI"],
  ["1", "Tabungan haji BRI"],
  ["1", "TabunganKu- Bank Mandiri"],
  ["1", "THT Bali Dwipa – Bank BPD Bali"],
  ["1", "Tabungan Simpel -BANK BPD BALI"],
  ["1", "BNITaplus"],
  ["1", "Tahapan Xpresi BCA"],
  ["1", "BNITaplus Bisnis"],
  ["1", "Mandiri Tabungan Payroll - Bank Mandiri"],
  ["1", "Mandiri Tabungan Now - Bank Mandiri"],
  ["1", "Tapres BCA"],
  ["1", "BNI Giro Perorangan"],
  ["1", "Mandiri Tabungan Simpanan Pelajar- Bank Mandiri"],
  ["1", "TabunganKu"],
  ["1", "Simpanan Asuransi"],
  ["1", "Simpanan Berjangka Test"],
];

const chartData = [
  { day: "01", core: 500, mbanking: 400, info: 900 },
  { day: "02", core: 200000, mbanking: 100000, info: 300000 },
  { day: "03", core: 50000, mbanking: 400, info: 50400 },
  { day: "04", core: 600, mbanking: 500, info: 1100 },
  { day: "05", core: 500, mbanking: 500 },
  { day: "06", core: 400, mbanking: 450 },
  { day: "07", core: 300, mbanking: 350 },
  { day: "08", core: 450, mbanking: 350 },
  { day: "09", core: 350, mbanking: 450 },
  { day: "10", core: 550, mbanking: 500 },
  { day: "11", core: 400, mbanking: 300 },
  { day: "12", core: 600, mbanking: 550 },
  { day: "13", core: 500, mbanking: 450 },
  { day: "14", core: 450, mbanking: 350 },
  { day: "15", core: 700, mbanking: 600 },
  { day: "16", core: 400, mbanking: 300 },
  { day: "17", core: 350, mbanking: 250 },
  { day: "18", core: 500, mbanking: 400 },
  { day: "19", core: 550, mbanking: 450 },
  { day: "20", core: 450, mbanking: 350 },
  { day: "21", core: 600, mbanking: 500 },
  { day: "22", core: 500, mbanking: 400 },
  { day: "23", core: 400, mbanking: 300 },
  { day: "24", core: 650, mbanking: 550 },
  { day: "25", core: 450, mbanking: 350 },
  { day: "26", core: 500, mbanking: 400 },
  { day: "27", core: 550, mbanking: 450 },
  { day: "28", core: 400, mbanking: 300 },
  { day: "29", core: 600, mbanking: 500 },
  { day: "30", core: 500, mbanking: 400 },
];

const coreChartData = chartData.map((item) => ({
  day: item.day,
  setoran: item.core,
  tarikan: item.mbanking,
}));

const totalChartData = chartData.map((item, index) => ({
  day: item.day,
  setoran: item.core + [220, 360, 280, 420, 300, 380][index % 6],
  tarikan: item.mbanking + [140, 240, 180, 300, 210, 260][index % 6],
}));

const mbankingData = chartData.map((item, index) => ({
  day: item.day,
  transfer: [0.72, 0.9, 0.55, 1, 0.78, 0.95][index % 6],
  topUp: [0.58, 0.75, 0.48, 0.84, 0.62, 0.7][index % 6],
  pembelianPpob: [0.42, 0.62, 0.5, 0.72, 0.55, 0.66][index % 6],
  angsuran: [0.36, 0.52, 0.42, 0.6, 0.47, 0.56][index % 6],
  iuran: [0.25, 0.4, 0.3, 0.48, 0.36, 0.44][index % 6],
}));

const growthData = [
  { month: "Maret", sukarela: 1, pokok: 2, wajib: 2, program: 1 },
  { month: "April", sukarela: 2, pokok: 2, wajib: 1, program: 1 },
  { month: "Mei", sukarela: 1, pokok: 1, wajib: 2, program: 1 },
  { month: "Juni", sukarela: 2, pokok: 1, wajib: 1, program: 2 },
  { month: "Juli", sukarela: 1, pokok: 2, wajib: 2, program: 1 },
  { month: "September", sukarela: 2, pokok: 2, wajib: 1, program: 1 },
];

const topMembers = [
  ["Edison Empluk Nugroho", "Rp 99.999.991.010.000,00", "Rp 0,00", "Rp 0,00", "Rp 0,00"],
  ["Indah Maria Yuliarti S.Sos", "Rp 4.006.953.381,43", "Rp 200.000,00", "Rp 50.000,00", "Rp 0,00"],
  ["Rahmi Melani", "Rp 1.001.010.000,00", "Rp 0,00", "Rp 0,00", "Rp 0,00"],
  ["Titih Elvina Nasiyah", "Rp 972.212.576,23", "Rp 300.000,00", "Rp 50.000,00", "Rp 0,00"],
  ["arya", "Rp 499.635.000,01", "Rp 200.000,00", "Rp 50.000,00", "Rp 100.000,00"],
  ["ardina", "Rp 50.360.000,00", "Rp 200.000,00", "Rp 100.000,00", "Rp 500.000,00"],
];

function DashboardSummaryCard({
  value,
  label,
  items,
}: {
  value: string;
  label: string;
  items: string[][];
}) {
  return (
    <section className="w-[620px] shrink-0 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-6">
      <div className="text-4xl font-medium text-[#00245e]">{value}</div>
      <div className="text-sm font-medium text-violet-700">{label}</div>
      <div className="mt-2 grid max-w-[560px] gap-1 text-[11px] text-[#7186b5]">
        {items.map(([count, itemLabel]) => (
          <div key={`${count}-${itemLabel}`}>{count} {itemLabel}</div>
        ))}
      </div>
    </section>
  );
}

function ChartCard({ title, subtitle, children, contentClassName = "" }: { title: string; subtitle: string; children: React.ReactNode; contentClassName?: string }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-6">
      <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">{title}</h2>
      <p className="mt-1 text-xs text-blue-700">{subtitle}</p>
      <div className={`mt-3 h-[340px] w-full overflow-visible ${contentClassName}`}>{children}</div>
    </section>
  );
}

function SavingsBarChart({
  data = chartData,
  variant = "core",
}: {
  data?: Array<Record<string, string | number>>;
  variant?: "core" | "mbanking" | "total";
}) {
  const keys = variant === "mbanking"
    ? [
        ["transfer", "#5612cf"],
        ["topUp", "#09c3c7"],
        ["pembelianPpob", "#1687ef"],
        ["angsuran", "#48b900"],
        ["iuran", "#f59e0b"],
      ]
    : variant === "total" || variant === "core"
      ? [["setoran", "#5612cf"], ["tarikan", "#09c3c7"]]
      : [["core", "#5612cf"], ["mbanking", "#09c3c7"]];
  const maxValue = variant === "core"
    ? 200000
    : variant === "mbanking"
      ? 1
      : Math.max(...data.flatMap((item) => keys.map(([key]) => Number(item[key]) || 0)), 1);
  const axisLabels = variant === "core" || variant === "total"
    ? [200000, 150000, 100000, 50000, 0]
    : variant === "mbanking"
      ? [1, 0.75, 0.5, 0.25, 0]
      : [];
  const labelMap: Record<string, string> = {
    transfer: "Transfer antar nasabah",
    topUp: "Transfer In / Top Up",
    pembelianPpob: "Pembelian & Pembayaran PPOB",
    angsuran: "Pembayaran Angsuran",
    iuran: "Pembayaran Iuran Simpanan Wajib & Program",
    core: "Core Banking",
    mbanking: "MBanking",
    setoran: "Setoran",
    tarikan: "Tarikan",
  };
  const formatMbankingValue = (value: unknown) =>
    (Number(value || 0) * 1_000_000).toLocaleString("id-ID");

  return (
    <div className="h-full w-full overflow-visible">
      <div className="relative h-[290px] w-full pt-4">
        {[0, 25, 50, 75, 100].map((level, index) => (
          <div key={level} className="absolute left-12 right-0 border-t border-slate-200" style={{ bottom: `${level}%` }}>
            {axisLabels[index] !== undefined && (
              <span
                className={`absolute left-[-37px] top-0 whitespace-nowrap text-[11px] leading-none text-slate-900 ${
                  index === 0 ? "-translate-y-1/2" : index === 4 ? "-translate-y-1/2" : "-translate-y-1/2"
                }`}
              >
                {axisLabels[4 - index].toLocaleString("id-ID")}
              </span>
            )}
          </div>
        ))}
        <div className="absolute bottom-0 left-12 top-0 z-0 grid w-[calc(100%-3rem)] grid-cols-[repeat(30,minmax(0,1fr))] items-end">
          {data.map((item) => (
            <div key={String(item.day)} className="group relative z-10 flex h-full min-w-0 items-end justify-center gap-0.5 hover:z-[100]">
              {keys.map(([key, color]) => {
                const value = Number(item[key]) || 0;
                return <div key={key} className="w-2 shrink-0 rounded-t-sm" style={{ height: `${Math.max((value / maxValue) * 100, value > 0 ? 1.5 : 0)}%`, backgroundColor: color }} />;
              })}
              {(variant === "total" || variant === "core") ? (
                <div
                  className="pointer-events-none absolute left-1/2 z-[200] hidden -translate-x-1/2 whitespace-nowrap bg-white px-3 py-2 text-[14px] leading-7 shadow-sm ring-1 ring-slate-200 group-hover:block"
                  style={{ top: "8px" }}
                >
                  <div className="text-[#5612cf]">setoran : {Number(item.setoran).toLocaleString("id-ID")}</div>
                  <div className="text-[#09c3c7]">tarikan : {Number(item.tarikan).toLocaleString("id-ID")}</div>
                </div>
              ) : (
                <div
                  className="pointer-events-none absolute left-1/2 z-[200] hidden -translate-x-1/2 whitespace-nowrap bg-white px-3 py-2 text-[14px] leading-7 shadow-sm ring-1 ring-slate-200 group-hover:block"
                  style={{ top: "8px" }}
                >
                  <div className="text-[#5612cf]">Transfer antar nasabah : {formatMbankingValue(item.transfer)}</div>
                  <div className="text-[#09c3c7]">Transfer In / Top Up : {formatMbankingValue(item.topUp)}</div>
                  <div className="text-[#1687ef]">Pembelian & Pembayaran PPOB : {formatMbankingValue(item.pembelianPpob)}</div>
                  <div className="text-[#48b900]">Pembayaran Angsuran : {formatMbankingValue(item.angsuran)}</div>
                  <div className="text-[#f59e0b]">Iuran Simpanan Wajib & Program : {formatMbankingValue(item.iuran)}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="ml-12 mt-1 grid w-[calc(100%-3rem)] grid-cols-[repeat(30,minmax(0,1fr))] text-center text-[11px] text-slate-900">
        {data.map((item) => <span key={String(item.day)}>{item.day}</span>)}
      </div>
    </div>
  );
}

export default function DashboardSimpanan() {
  return (
    <div className="min-h-screen overflow-x-auto bg-[#f5f7fc] px-3 py-6 md:px-6 md:py-7">
      <div className="mx-auto min-w-[2200px] max-w-[2200px]">
        <header className="mb-7 px-2 md:px-5">
          <h1 className="text-[21px] font-semibold text-[#00245e]">Hi, Arya!</h1>
          <p className="mt-1 text-base text-[#00245e]">Selamat datang kembali di KOPERASI COOPMAX</p>
        </header>

        <div className="flex min-w-0 gap-4 pb-2">
          <DashboardSummaryCard
            value="187"
            label="Rekening Aktif"
            items={savingsProducts}
          />
          <DashboardSummaryCard
            value="0"
            label="Rekening Diblokir"
            items={savingsProducts.map(([_, label]) => ["0", label])}
          />
          <DashboardSummaryCard
            value="2"
            label="Rekening Ditutup"
            items={savingsProducts.map(([_, label], index) => [index < 1 ? "2" : "0", label])}
          />
          <DashboardSummaryCard
            value="Rp 100.006,7 Milyar"
            label="Nominal Tabungan"
            items={[
              ["100.006,7 Milyar", "Simpanan Sukarela"],
              ["16,6 Juta", "Simpanan Pokok"],
              ["4,4 Juta", "Simpanan Wajib"],
              ["10,4 Juta", "Simpanan Program"],
              ["6,2 Juta", "tabungan"],
              ["500,000", "Mandiri Tabungan Rupiah- Bank Mandiri"],
              ["20,000", "TabunganKu – Bank BPD Bali"],
              ["150,000", "Tabungan BRI simp edes"],
              ["50,000", "SIMPEDA – BANK BPD BALI"],
              ["100,000", "Tabungan BritAma"],
              ["500,000", "Tahapan BCA"],
              ["50,000", "SIBAPA – BANK BPD BALI"],
              ["500,000", "Tabungan BRI Junio"],
              ["200,000", "Tabunganku-BNI"],
              ["50,000", "SIMPANAN LPD – BANK BPD BALI"],
              ["100,000", "Tabungan haji BRI"],
              ["20,000", "TabunganKu- Bank Mandiri"],
              ["50,000", "THT Bali Dwipa – Bank BPD Bali"],
              ["5.000", "Tabungan Simpel -BANK BPD BALI"],
              ["250,000", "BNITaplus"],
              ["200.000", "Tahapan Xpresi BCA"],
              ["1,0 Juta", "BNITaplus Bisnis"],
              ["10,000", "Mandiri Tabungan Payroll - Bank Mandiri"],
              ["100,000", "Mandiri Tabungan Now - Bank Mandiri"],
              ["5,0 Juta", "Tapres BCA"],
              ["500,000", "BNI Giro Perorangan"],
              ["165,000", "Mandiri Tabungan Simpanan Pelajar- Bank Mandiri"],
              ["1,0 Juta", "TabunganKu"],
              ["100,000", "Simpanan Asuransi"],
              ["50,000", "Simpanan Berjangka Test"],
            ]}
          />
        </div>

        <div className="mt-4 grid gap-2">
          <ChartCard title="Transaksi Core Banking" subtitle="Bulan September 2026" contentClassName="mt-6"><SavingsBarChart data={coreChartData} variant="core" /></ChartCard>
          <ChartCard title="Transaksi MBanking" subtitle="Bulan September 2026" contentClassName="mt-0 h-[370px]">
            <SavingsBarChart data={mbankingData} variant="mbanking" />
          </ChartCard>
          <ChartCard title="Transaksi Total" subtitle="Bulan September 2026" contentClassName="mt-6"><SavingsBarChart data={totalChartData} variant="total" /></ChartCard>
          <ChartCard title="Pertumbuhan Tabungan" subtitle="Bulan Maret 2026 - Bulan September 2026">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip />
                <Bar dataKey="sukarela" fill="#5612cf" barSize={12} /><Bar dataKey="pokok" fill="#0fc5c9" barSize={12} /><Bar dataKey="wajib" fill="#1687ef" barSize={12} /><Bar dataKey="program" fill="#48b900" barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <section className="mt-4 overflow-hidden rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-6">
          <h2 className="text-sm font-extrabold uppercase text-slate-900">10 Tabungan dengan Saldo Terbanyak September 2026</h2>
          <p className="mt-1 text-xs text-[#7186b5]">Tabungan dari tiap produk tabung</p>
          <div className="mt-4">
            <table className="w-full border-collapse text-xs text-[#173d75]"><thead><tr className="border-b border-[#b9c8df] text-left text-[10px] uppercase tracking-wide"><th className="py-2">Nasabah</th><th>Simpanan Sukarela</th><th>Simpanan Pokok</th><th>Simpanan Wajib</th><th>Simpanan Program</th></tr></thead><tbody>{topMembers.map((row) => <tr key={row[0]} className="border-b border-[#d5deeb]"><td className="py-1">{row[0]}</td>{row.slice(1).map((value) => <td key={value} className="whitespace-nowrap py-1">{value}</td>)}</tr>)}</tbody></table>
          </div>
          <button type="button" className="mt-5 border-t border-slate-200 pt-4 text-xs text-[#7186b5]">Lihat semua rekening tabungan</button>
        </section>

        <section className="mt-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-6">
          <h2 className="text-sm font-extrabold uppercase text-slate-900">Transaksi Kolektor September 2026</h2>
          <p className="mt-1 text-xs text-[#7186b5]">Transaksi Tabungan dari kolektor</p>
          <table className="mt-5 w-full border-collapse text-xs text-[#173d75]"><thead><tr className="border-b border-[#b9c8df] text-left text-[10px] uppercase"><th className="py-2">Nama Kolektor</th><th>Jumlah Transaksi</th></tr></thead><tbody>{[["Dinda Sudjati", 3], ["Gina Farida M.M.", 1], ["cusr_kolektor", 3]].map(([name, count]) => <tr key={String(name)} className="border-b border-[#d5deeb]"><td className="py-3">{name}</td><td>{count}</td></tr>)}</tbody></table>
          <button type="button" className="mt-5 border-t border-slate-200 pt-4 text-xs text-[#7186b5]">Lihat semua transaksi Tabungan dari kolektor</button>
        </section>
      </div>
    </div>
  );
}
