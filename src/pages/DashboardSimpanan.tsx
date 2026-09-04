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
  { day: "01", core: 500, mbanking: 400 },
  { day: "02", core: 200000, mbanking: 100000 },
  { day: "03", core: 50000, mbanking: 400 },
  { day: "04", core: 600, mbanking: 500 },
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

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-6">
      <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">{title}</h2>
      <p className="mt-1 text-xs text-blue-700">{subtitle}</p>
      <div className="mt-5 h-[270px] w-full">{children}</div>
    </section>
  );
}

function SavingsBarChart({ data = chartData }: { data?: typeof chartData }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#0f172a" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#0f172a" }} axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey="core" fill="#5612cf" barSize={48} radius={[0, 0, 0, 0]} />
        <Bar dataKey="mbanking" fill="#09c3c7" barSize={48} radius={[0, 0, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function DashboardSimpanan() {
  return (
    <div className="min-h-screen overflow-x-auto bg-[#f5f7fc] px-3 py-6 md:px-6 md:py-7">
      <div className="mx-auto min-w-[1100px] max-w-[1500px]">
        <header className="mb-7 px-2 md:px-5">
          <h1 className="text-[21px] font-semibold text-[#00245e]">Hi, Arya!</h1>
          <p className="mt-1 text-base text-[#00245e]">Selamat datang kembali di KOPERASI COOPMAX</p>
        </header>

        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 md:p-6">
          <div className="text-4xl font-medium text-[#00245e]">187</div>
          <div className="text-sm font-medium text-violet-700">Rekening Aktif</div>
          <div className="mt-2 grid max-w-[500px] gap-1 text-[11px] text-[#7186b5]">
            {savingsProducts.map(([count, label]) => <div key={label}>{count} {label}</div>)}
          </div>
        </section>

        <div className="mt-4 grid gap-4">
          <ChartCard title="Transaksi Core Banking" subtitle="Bulan September 2026"><SavingsBarChart /></ChartCard>
          <ChartCard title="Transaksi MBanking" subtitle="Bulan September 2026"><SavingsBarChart data={chartData.map((item) => ({ ...item, core: 0, mbanking: 0 }))} /></ChartCard>
          <ChartCard title="Transaksi Total" subtitle="Bulan September 2026"><SavingsBarChart /></ChartCard>
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
