import { List, SquarePen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./JadwalBungaSimpananDetail.css";

const fieldGroups = [
  {
    title: "KONFIGURASI PROSES BUNGA OTOMATIS",
    fields: [
      ["Jenis Transaksi Proses Bunga Otomatis", "Transaksi Bunga Simpanan"],
      ["Periode Proses Bunga Otomatis", "Bulan Berikutnya"],
      ["Tanggal Proses Bunga Otomatis", "21"],
      ["Jadwal Proses Bunga Otomatis Berikutnya", "21-11-2026 20:00:00"],
    ],
  },
  {
    title: "KONFIGURASI PROSES BIAYA ADMIN OTOMATIS",
    fields: [
      ["Jenis Transaksi Biaya Admin Otomatis", "Transaksi Biaya Admin Simpanan"],
      ["Periode Proses Biaya Admin Otomatis", "Bulan Berikutnya"],
      ["Tanggal Proses Biaya Admin Otomatis", "21"],
      ["Jadwal Proses Biaya Admin Otomatis Berikutnya", "21-11-2026 20:00:00"],
    ],
  },
  {
    title: "KONFIGURASI PROSES BIAYA ADMIN M-BANKING OTOMATIS",
    fields: [
      ["Jenis Transaksi Biaya Admin M-Banking Otomatis", "Transaksi Biaya Admin M-Banking"],
      ["Periode Proses Biaya Admin M-Banking Otomatis", "Bulan Berikutnya"],
      ["Tanggal Proses Biaya Admin M-Banking Otomatis", "21"],
      ["Jadwal Proses Biaya Admin M-Banking Otomatis Berikutnya", "21-11-2026 20:00:00"],
    ],
  },
];

function StatusValue({ value }: { value: string }) {
  return <span className="text-left text-[14px] font-bold text-[#17243d]">{value}</span>;
}

export default function JadwalBungaSimpananDetail() {
  const navigate = useNavigate();
  return <main className="min-h-screen bg-[#f4f6fd] px-2 py-8 text-[#17243d] md:px-3 lg:px-4">
    <header className="flex flex-col gap-4">
      <div className="flex items-baseline gap-2"><h1 className="text-[25px] font-bold text-[#071f55]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1><span className="text-[16px]">Detail</span></div>
      <div className="flex w-full justify-end">
        <div className="flex flex-wrap items-center gap-8 text-[16px] font-normal text-[#506587]">
          <button type="button" onClick={() => navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis")} className="flex items-center gap-3"><List className="h-5 w-5 stroke-[3]" />Daftar</button>
          <button type="button" onClick={() => navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis")} className="flex items-center gap-3"><SquarePen className="h-5 w-5 stroke-[2.5]" />Ubah</button>
          <button type="button" className="flex items-center gap-3"><Trash className="h-5 w-5 stroke-[#506587]" />Hapus</button>
        </div>
      </div>
    </header>
    <section className="mt-8 w-full rounded-[22px] border border-[#e1e7f0] bg-white px-5 pb-5 pt-2 shadow-[0_2px_7px_rgba(34,55,90,0.04)] md:px-7 md:pb-7 md:pt-2">
      {fieldGroups.map((group) => <div key={group.title} className="mt-8 overflow-hidden rounded-[7px] border border-[#dce3ee]"><div className="border-b border-[#dce3ee] bg-[#f7f9fd] px-5 py-4 text-left text-[15px] font-bold text-[#17243d]">{group.title}</div><div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2 lg:grid-cols-4">{group.fields.map(([label, value]) => <div key={label} className="text-left"><p className="text-left text-[14px] text-[#697892]">{label}</p><div className="mt-1 text-left"><StatusValue value={value} /></div></div>)}</div></div>)}
      <div className="mt-8 overflow-hidden rounded-[7px] border border-[#dce3ee]"><div className="border-b border-[#dce3ee] bg-[#f7f9fd] px-5 py-4 text-left text-[15px] font-bold">KONFIGURASI PEMROSESAN</div><div className="grid gap-6 p-5 text-left sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-left text-[14px] text-[#697892]">Produk Tabungan</p><p className="mt-1 text-left text-[14px] font-bold">Tabungan Simpanan Utama</p></div><div><p className="text-left text-[14px] text-[#697892]">Urutan Pemrosesan</p><p className="mt-1 text-left text-[14px] font-bold">Bunga Simpanan → Biaya Admin → Admin M-Banking</p></div><div><p className="text-left text-[14px] text-[#697892]">Waktu</p><p className="mt-1 text-left text-[14px] font-bold">20:00 - Malam</p></div><div><p className="text-left text-[14px] text-[#697892]">Status</p><div className="mt-1 text-left"><span className="inline-flex rounded-[8px] bg-[#18ad00] px-3.5 py-1.5 text-[14px] font-bold leading-none text-white">Aktif</span></div></div></div></div>
    </section>
  </main>;
}
