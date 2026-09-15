import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, Cog, CreditCard, Clock3, Landmark, Users, UserRound, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OPERATIONAL_START_HOUR = 8;
const OPERATIONAL_END_HOUR = 16;

function OperationalTimeCounter() {
  const [isVisible, setIsVisible] = useState(true);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const opening = new Date(now);
      const closing = new Date(now);
      opening.setHours(OPERATIONAL_START_HOUR, 0, 0, 0);
      closing.setHours(OPERATIONAL_END_HOUR, 0, 0, 0);

      setRemainingSeconds(
        now >= opening && now < closing
          ? Math.floor((closing.getTime() - now.getTime()) / 1000)
          : 0,
      );
    };

    const interval = window.setInterval(updateCounter, 1000);
    updateCounter();
    return () => window.clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const isOpen = remainingSeconds > 0;
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;
  const displayTime = (value: number) => String(value).padStart(2, "0");

  return (
    <aside className="fixed right-3 top-3 z-30 w-[min(340px,calc(100vw-1.5rem))] rounded-[18px] bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.18)] sm:right-6 sm:top-6 sm:p-5">
      <button
        type="button"
        aria-label="Tutup informasi waktu operasional"
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-3 rounded-full p-1 text-slate-900 transition hover:bg-slate-100 sm:right-4 sm:top-4"
      >
        <X className="h-6 w-6" strokeWidth={2.2} />
      </button>

      <div className="flex min-w-0 items-center gap-3 pr-8 sm:gap-4 sm:pr-9">
        <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-[#2864e8] text-white sm:h-[76px] sm:w-[76px]">
          <Clock3 className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium leading-tight tracking-tight text-slate-950 sm:text-[17px]">Jam Operasional Koperasi</p>
          <p className="mt-1.5 whitespace-nowrap text-[27px] font-bold leading-none tracking-tight text-black sm:text-[31px]">08.00 - 16.00</p>
        </div>
      </div>

      <div className="mt-4 rounded-[8px] border border-slate-200 bg-[#f5f6f8] px-3.5 py-3.5 sm:mt-5 sm:px-4 sm:py-4">
        <p className="text-[15px] font-medium leading-snug tracking-tight text-slate-950 sm:text-[17px]">Sisa Waktu Operasional Koperasi</p>
        <div className="mt-3 flex items-center justify-around">
          {[
            [isOpen ? hours : 0, "Jam"],
            [isOpen ? minutes : 0, "Menit"],
            [isOpen ? seconds : 0, "Detik"],
          ].map(([value, label], index) => (
            <div key={label} className="flex flex-1 items-center justify-center gap-1.5 sm:gap-3">
              {index > 0 ? <span className="h-11 w-[2px] bg-slate-300 sm:h-16" /> : null}
              <div className="min-w-0 text-center">
                <p className="font-mono text-[30px] font-bold leading-none tracking-tight text-black sm:text-[38px]">{displayTime(value as number)}</p>
                <p className="mt-1.5 text-[13px] font-medium text-stone-500 sm:text-[15px]">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

const stats = [
  {
    label: "Nasabah",
    value: "75",
    details: ["0 Nasabah Tidak Aktif"],
    icon: Users,
    color: "bg-blue-600",
  },
  {
    label: "Rekening Tabungan",
    value: "201",
    details: ["0 Tabungan Tidak Aktif", "2 Tabungan Tutup"],
    icon: Landmark,
    color: "bg-cyan-600",
  },
  {
    label: "Deposito",
    value: "14",
    details: ["0 Deposito Tidak Aktif", "0 Deposito Tutup"],
    icon: BarChart3,
    color: "bg-violet-600",
  },
  {
    label: "Pinjaman",
    value: "26",
    details: [
      "6 Pinjaman Diajukan",
      "1 Pinjaman Ditolak",
      "13 Pinjaman Disetujui",
      "11 Pinjaman Lunas",
    ],
    icon: CreditCard,
    color: "bg-purple-700",
  },
  {
    label: "Pegawai",
    value: "13",
    details: [],
    icon: UserRound,
    color: "bg-pink-600",
  },
  {
    label: "Kolektor",
    value: "16",
    details: [],
    icon: Users,
    color: "bg-teal-500",
  },
];

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const Icon = stat.icon;

  return (
    <div className="min-h-[148px] rounded-xl bg-white p-5 shadow-[0_12px_32px_rgba(34,52,98,0.06)] ring-1 ring-slate-100 sm:p-5">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${stat.color}`}>
          <Icon className="h-6 w-6" strokeWidth={2.2} />
        </div>
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-[26px] font-bold leading-none tracking-tight text-[#082b67]">{stat.value}</span>
            <span className="text-sm font-bold text-[#102342]">{stat.label}</span>
          </div>
        </div>
      </div>
      {stat.details.length > 0 ? (
        <div className="mt-6 space-y-1 text-[12px] leading-tight text-slate-400">
          {stat.details.map((detail) => <div key={detail}>{detail}</div>)}
        </div>
      ) : null}
    </div>
  );
}

function DueCard({ count, title, total, closed }: { count: string; title: string; total: string; closed: string }) {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200/80">
      <div className="border-b border-slate-200 pb-3">
        <div className="text-[25px] font-bold leading-none text-[#082b67]">{count}</div>
        <div className="mt-1 text-sm font-bold text-[#16233a]">{title}</div>
      </div>
      <div className="mt-4 space-y-1 text-[13px] font-semibold">
        <div className="text-[#082b67]">{total} {title === "Tabungan" ? "Simpanan Program" : "SIJAKOP"}</div>
        <div className="text-lime-600">0 Diperpanjang</div>
        <div className="text-red-500">{closed} Ditutup</div>
        <div className="text-amber-500">{title === "Tabungan" ? "4" : "5"} Belum Di Proses</div>
      </div>
      <button type="button" className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-blue-600 hover:text-blue-800">
        Lihat Daftar Rekening <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function WideSummaryCard({ count, title, description, action }: { count: string; title: string; description?: string; action?: string }) {
  return (
    <div className="min-h-[190px] rounded-xl bg-white p-7 shadow-[0_12px_32px_rgba(34,52,98,0.06)] ring-1 ring-slate-100">
      <div className="text-[30px] font-bold leading-none text-[#082b67]">{count}</div>
      <div className="mt-2 text-base font-bold text-[#16233a]">{title}</div>
      {description ? <div className="mt-2 text-sm text-slate-500">{description}</div> : null}
      {action ? (
        <button type="button" className="mt-5 flex items-center gap-1 text-[13px] font-medium text-blue-600 hover:text-blue-800">
          {action} <ArrowRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-2rem)] bg-[#f7f8fc] px-4 py-7 text-[#102342] sm:px-7 sm:py-8 lg:px-9">
      <OperationalTimeCounter />
      <header className="mb-9 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold leading-tight text-[#082b67] sm:text-[24px]">Hi, Arya!</h1>
          <p className="mt-1 text-base text-[#082b67] sm:text-[17px]">Selamat datang kembali di KOPERASI COOPMAX</p>
        </div>
        <button type="button" onClick={() => navigate("/pengaturan-umum")} className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-3 text-xs text-slate-500 shadow-sm ring-1 ring-slate-100 hover:text-[#082b67]">
          <Cog className="h-3.5 w-3.5" /> Atur Tampilan
        </button>
      </header>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-[0_12px_32px_rgba(34,52,98,0.06)] ring-1 ring-slate-100 sm:p-6">
          <h2 className="mb-7 text-xl font-bold text-[#16233a]">JATUH TEMPO SAMPAI HARI INI</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <DueCard count="4" title="Tabungan" total="4" closed="0" />
            <DueCard count="5" title="Deposito" total="5" closed="0" />
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-[0_12px_32px_rgba(34,52,98,0.06)] ring-1 ring-slate-100 sm:p-6">
          <h2 className="mb-7 text-xl font-bold text-[#16233a]">JATUH TEMPO DALAM 7 HARI KEDEPAN</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <WideSummaryCard count="0 Rekening" title="Tabungan" />
            <WideSummaryCard count="0 Rekening" title="Deposito" />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-7 text-xl font-bold text-[#16233a]">BELUM PROSES BUNGA SAMPAI HARI INI</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <WideSummaryCard count="1" title="Rekening Tabungan" description="1 Bunga Rekening Simpanan Program" action="Klik untuk menuju halaman transaksi bunga" />
          <WideSummaryCard count="2" title="Rekening Deposito" description="2 Bunga Rekening SIJAKOP" action="Klik untuk menuju halaman transaksi bunga" />
        </div>
      </section>

      <section className="mt-12 pb-4">
        <h2 className="mb-7 text-xl font-bold text-[#16233a]">SUDAH PROSES BUNGA HARI INI</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <WideSummaryCard count="0" title="Rekening Tabungan" />
          <WideSummaryCard count="0" title="Rekening Deposito" />
        </div>
      </section>
    </main>
  );
}
