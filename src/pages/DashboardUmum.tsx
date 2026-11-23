import {
  ArrowRight,
  BriefcaseBusiness,
  CircleUserRound,
  Coins,
  Settings,
  UsersRound,
  WalletCards,
} from "lucide-react";

const summaryCards = [
  { value: "91", label: "Nasabah", icon: UsersRound, color: "bg-[#3867ff]", details: ["0 Nasabah Tidak Aktif"] },
  { value: "267", label: "Rekening Tabungan", icon: WalletCards, color: "bg-[#16a9bd]", details: ["2 Tabungan Tidak Aktif", "3 Tabungan Tutup"] },
  { value: "31", label: "Deposito", icon: Coins, color: "bg-[#5d45f5]", details: ["1 Deposito Tidak Aktif", "6 Deposito Tutup"] },
  { value: "60", label: "Pinjaman", icon: BriefcaseBusiness, color: "bg-[#7044c8]", details: ["8 Pinjaman Diajukan", "1 Pinjaman Ditolak", "12 Pinjaman Disetujui", "25 Pinjaman Lunas"] },
  { value: "18", label: "Pegawai", icon: CircleUserRound, color: "bg-[#f00072]", details: [] },
  { value: "10", label: "Kolektor", icon: UsersRound, color: "bg-[#08c5c9]", details: [] },
];

function SummaryCard({ value, label, icon: Icon, color, details }: (typeof summaryCards)[number]) {
  return (
    <article className="min-h-[148px] rounded-xl bg-white p-5 shadow-[0_12px_35px_rgba(30,51,95,0.06)]">
      <div className="flex items-start gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${color}`}>
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <div>
          <div className="text-[27px] font-bold leading-none text-[#062a61]">{value}</div>
          <div className="mt-1 text-[13px] font-bold text-[#071b38]">{label}</div>
        </div>
      </div>
      <div className="mt-6 space-y-1 text-[12px] leading-tight text-[#8090ac]">
        {details.map((detail) => <div key={detail}>{detail}</div>)}
      </div>
    </article>
  );
}

function DueCard({ count, label, lines }: { count: string; label: string; lines: string[] }) {
  return (
    <article className="rounded-xl border border-[#e7eaf1] bg-white p-3">
      <div className="text-[25px] font-bold leading-none text-[#062a61]">{count}</div>
      <div className="mt-1 text-[13px] font-bold text-[#071b38]">{label}</div>
      <div className="my-3 border-t border-[#e6e8ee]" />
      <div className="space-y-1 text-[12px] leading-tight">
        <div className="font-bold text-[#062a61]">{lines[0]}</div>
        <div className="text-[#49b900]">0 Diperpanjang</div>
        <div className="text-[#f00032]">0 Ditutup</div>
        <div className="text-[#ffae00]">4 Belum Di Proses</div>
      </div>
      <button type="button" className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-[#2861ff] hover:text-[#1746ce]">
        Lihat Daftar Rekening <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
}

function DeadlineSection() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-[0_12px_35px_rgba(30,51,95,0.06)] md:p-5">
      <h2 className="text-[20px] font-bold uppercase text-[#182b47]">Jatuh Tempo Sampai Hari Ini</h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <DueCard count="4" label="Tabungan" lines={["4 Simpanan Program"]} />
        <DueCard count="4" label="Deposito" lines={["4 SIJAKOP"]} />
      </div>
    </section>
  );
}

function SimpleDueSection() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-[0_12px_35px_rgba(30,51,95,0.06)]">
      <h2 className="text-[20px] font-bold uppercase text-[#182b47]">Jatuh Tempo Dalam 7 Hari Kedepan</h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {["Tabungan", "Deposito"].map((label) => (
          <div key={label} className="rounded-xl border border-[#e7eaf1] p-3">
            <div className="text-[25px] font-bold leading-none text-[#062a61]">0 Rekening</div>
            <div className="mt-1 text-[13px] font-bold text-[#071b38]">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InterestSection({ processed = false }: { processed?: boolean }) {
  return (
    <section>
      <h2 className="mb-7 text-[20px] font-bold uppercase text-[#182b47]">{processed ? "Sudah Proses Bunga Hari Ini" : "Belum Proses Bunga Sampai Hari Ini"}</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <article className="min-h-[214px] rounded-xl bg-white p-7 shadow-[0_12px_35px_rgba(30,51,95,0.06)]">
          <div className="text-[30px] font-bold leading-none text-[#062a61]">{processed ? "0" : "7"}</div>
          <div className="mt-1 text-[15px] font-bold text-[#071b38]">Rekening Tabungan</div>
          {!processed && <div className="mt-2 space-y-1 text-[13px] text-[#74849e]"><div>5 Bunga Rekening Simpanan Program</div><div>1 Bunga Rekening Simpanan Program Pensiun</div><div>1 Bunga Rekening Simpanan Program Hari Tua Plus</div></div>}
          {!processed && <button type="button" className="mt-5 flex items-center gap-1 text-[13px] text-[#2861ff]">Klik untuk menuju halaman transaksi bunga <ArrowRight className="h-4 w-4" /></button>}
        </article>
        <article className="min-h-[214px] rounded-xl bg-white p-7 shadow-[0_12px_35px_rgba(30,51,95,0.06)]">
          <div className="text-[30px] font-bold leading-none text-[#062a61]">{processed ? "0" : "14"}</div>
          <div className="mt-1 text-[15px] font-bold text-[#071b38]">Rekening Deposito</div>
          {!processed && <div className="mt-2 space-y-1 text-[13px] text-[#74849e]"><div>13 Bunga Rekening SIJAKOP</div><div>1 Bunga Rekening SIJAKOP BERHADIAH</div></div>}
          {!processed && <button type="button" className="mt-5 flex items-center gap-1 text-[13px] text-[#2861ff]">Klik untuk menuju halaman transaksi bunga <ArrowRight className="h-4 w-4" /></button>}
        </article>
      </div>
    </section>
  );
}

export default function DashboardUmum() {
  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-7 text-[#071b38] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-9 flex items-start justify-between gap-4">
          <div><h1 className="text-[21px] font-semibold text-[#00245e]">Hi, Arya Dharma!</h1><p className="mt-1 text-base text-[#00245e]">Selamat datang kembali di KOPERASI COOPMAX</p></div>
          <button type="button" className="hidden items-center gap-1.5 rounded-full bg-white px-5 py-3 text-[13px] text-[#536783] shadow-sm sm:flex"><Settings className="h-4 w-4" /> Atur Tampilan</button>
        </header>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{summaryCards.map((card) => <SummaryCard key={card.label} {...card} />)}</div>
        <div className="mt-5 grid gap-5 xl:grid-cols-2"><DeadlineSection /><SimpleDueSection /></div>
        <div className="mt-12"><InterestSection /></div>
        <div className="mt-12 pb-4"><InterestSection processed /></div>
      </div>
    </main>
  );
}
