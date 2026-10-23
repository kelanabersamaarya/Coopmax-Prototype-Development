import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fieldGroups = [
  {
    title: "KONFIGURASI PROSES BUNGA OTOMATIS",
    fields: [
      ["Proses Bunga Otomatis", "ON"],
      ["Jenis Transaksi Proses Bunga Otomatis", "Transaksi Bunga Simpanan"],
      ["Periode Proses Bunga Otomatis", "Bulan Berlangsung"],
      ["Tanggal Proses Bunga Otomatis", "15"],
    ],
  },
  {
    title: "KONFIGURASI PROSES BIAYA ADMIN OTOMATIS",
    fields: [
      ["Proses Biaya Admin Otomatis", "ON"],
      ["Jenis Transaksi Biaya Admin Otomatis", "Transaksi Biaya Admin Simpanan"],
      ["Periode Proses Biaya Admin Otomatis", "Bulan Berikutnya"],
      ["Tanggal Proses Biaya Admin Otomatis", "20"],
    ],
  },
  {
    title: "KONFIGURASI PROSES BIAYA ADMIN M-BANKING OTOMATIS",
    fields: [
      ["Proses Biaya Admin M-Banking Otomatis", "ON"],
      ["Hanya Tabungan Utama", "ON"],
      ["Jenis Transaksi Biaya Admin M-Banking Otomatis", "Transaksi Biaya Admin M-Banking"],
      ["Periode Proses Biaya Admin M-Banking Otomatis", "Bulan Berlangsung"],
      ["Tanggal Proses Biaya Admin M-Banking Otomatis", "25"],
    ],
  },
];

function StatusValue({ value }: { value: string }) {
  return <span className={`inline-flex rounded-[5px] px-2.5 py-1 text-xs font-bold ${value === "ON" ? "bg-[#21ad05] text-white" : "text-[#17243d]"}`}>{value}</span>;
}

export default function JadwalBungaSimpananDetail() {
  const navigate = useNavigate();
  return <main className="min-h-screen bg-[#f4f6fd] px-2 py-8 text-[#17243d] md:px-3 lg:px-4">
    <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-baseline gap-2"><h1 className="text-[25px] font-bold text-[#071f55]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1><span className="text-[16px]">Detail</span></div>
      <div className="flex flex-wrap items-center gap-7 text-[13px] font-semibold text-[#243c61]">
        <button type="button" onClick={() => navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis")} className="flex items-center gap-2"><ArrowLeft className="h-5 w-5" />Kembali ke Daftar</button>
        <button type="button" onClick={() => navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis")} className="flex items-center gap-2"><Pencil className="h-5 w-5" />Ubah</button>
        <button type="button" className="flex items-center gap-2"><Trash2 className="h-5 w-5" />Hapus</button>
      </div>
    </header>
    <section className="mt-8 w-full rounded-[22px] border border-[#e1e7f0] bg-white p-5 shadow-[0_2px_7px_rgba(34,55,90,0.04)] md:p-7">
      <div className="grid gap-7 md:grid-cols-2"><div><p className="text-xs text-[#697892]">Produk Simpanan</p><p className="mt-1 font-bold">tabungan</p></div><div><p className="text-xs text-[#697892]">Status</p><StatusValue value="Aktif" /></div><div><p className="text-xs text-[#697892]">Jadwal Bunga Berikutnya</p><p className="mt-1 font-bold">21-11-2026 20:00:00</p></div><div><p className="text-xs text-[#697892]">Periode</p><p className="mt-1 font-bold">Bulan Berikutnya</p></div></div>
      {fieldGroups.map((group) => <div key={group.title} className="mt-8 overflow-hidden rounded-[7px] border border-[#dce3ee]"><div className="border-b border-[#dce3ee] bg-[#f7f9fd] px-5 py-4 text-[15px] font-bold text-[#17243d]">{group.title}</div><div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2 lg:grid-cols-4">{group.fields.map(([label, value]) => <div key={label}><p className="text-xs text-[#697892]">{label}</p><div className="mt-1 font-bold"><StatusValue value={value} /></div></div>)}</div></div>)}
      <div className="mt-8 overflow-hidden rounded-[7px] border border-[#dce3ee]"><div className="border-b border-[#dce3ee] bg-[#f7f9fd] px-5 py-4 text-[15px] font-bold">KONFIGURASI PEMROSESAN</div><div className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-xs text-[#697892]">Urutan Pemrosesan</p><p className="mt-1 font-bold">Bunga Simpanan → Biaya Admin → Admin M-Banking</p></div><div><p className="text-xs text-[#697892]">Waktu</p><p className="mt-1 font-bold">20:00 - Malam</p></div><div><p className="text-xs text-[#697892]">Status</p><StatusValue value="Aktif" /></div></div></div>
    </section>
  </main>;
}
