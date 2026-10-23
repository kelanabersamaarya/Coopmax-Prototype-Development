import { useMemo, useState } from "react";
import { CheckSquare, Eye, GripVertical, Plus, SquarePen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "./JadwalBungaSimpanan.css";

const schedules = [
  { product: "tabungan", period: "Bulan Berikutnya", interestNext: "21-11-2026 20:00:00", adminNext: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "SIMPEDA - BANK BPD BALI", period: "Bulan Berikutnya", interestNext: "21-11-2026 03:00:00", adminNext: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "Simpanan Wajib", period: "Bulan Berlangsung", interestNext: "21-11-2026 20:00:00", adminNext: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "Simpanan Sukarela - Penampung Pendapatan Bunga", period: "Bulan Berlangsung", interestNext: "19-11-2026 00:00:00", adminNext: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "Simpanan Pokok", period: "Bulan Berlangsung", interestNext: "01-11-2026 03:00:00", adminNext: "21-11-2026 20:00:00", status: "Aktif" },
];

const products = ["Semua", ...new Set(schedules.map((item) => item.product))];
const periods = ["Semua", ...new Set(schedules.map((item) => item.period))];

function ScheduleForm({ editing, onCancel }: { editing: boolean; onCancel: () => void }) {
  return <div className="min-h-screen bg-[#f6f7fc] px-4 py-7 text-[#102a5c] md:px-10">
    <div className="flex items-baseline gap-2"><h1 className="text-[21px] font-bold text-[#00245f]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1><span>{editing ? "Ubah" : "Tambah"}</span></div>
    <Card className="mt-8 rounded-[22px] border-0 bg-white px-6 py-7 md:px-12">
      <div className="grid gap-4 md:grid-cols-[185px_minmax(0,1fr)] md:items-center">
        <label className="text-[13px]">Produk Simpanan<span className="text-red-600">*</span></label><select className="h-9 rounded border px-3"><option>{editing ? "tabungan" : "Pilih Produk Simpanan"}</option></select>
        <div className="my-2 border-t border-[#dce3ee] md:col-span-2" />
        <label className="text-[13px]">Proses Bunga Otomatis</label><span className="w-fit rounded-full bg-[#6047ff] px-4 py-1 text-xs font-semibold text-white">ON</span>
        <label className="text-[13px]">Jenis Transaksi Proses Bunga Otomatis</label><select className="h-9 rounded border px-3"><option>Transaksi Bunga Simpanan</option></select>
        <label className="text-[13px]">Periode Proses Bunga Otomatis</label><select className="h-9 rounded border px-3"><option>Bulan Berikutnya</option></select>
        <label className="text-[13px]">Tanggal Proses Bunga Otomatis</label><select className="h-9 rounded border px-3"><option>21</option></select>
        <div className="my-2 border-t border-[#dce3ee] md:col-span-2" />
        <label className="text-[13px]">Proses Biaya Admin Otomatis</label><span className="w-fit rounded-full bg-[#6047ff] px-4 py-1 text-xs font-semibold text-white">ON</span>
        <label className="text-[13px]">Jenis Transaksi Biaya Admin Otomatis</label><select className="h-9 rounded border px-3"><option>Transaksi Biaya Admin Simpanan</option></select>
        <label className="text-[13px]">Periode Proses Biaya Admin Otomatis</label><select className="h-9 rounded border px-3"><option>Bulan Berikutnya</option></select>
        <label className="text-[13px]">Tanggal Proses Biaya Admin Otomatis</label><select className="h-9 rounded border px-3"><option>21</option></select>
        <div className="my-2 border-t border-[#dce3ee] md:col-span-2" />
        <label className="text-[13px]">Urutan Pemrosesan</label><div className="rounded border bg-[#f8faff] p-2 text-sm"><div className="flex items-center gap-2"><GripVertical className="h-4 w-4" />1. Bunga Simpanan</div><div className="flex items-center gap-2"><GripVertical className="h-4 w-4" />2. Biaya Admin</div></div>
        <label className="text-[13px]">Waktu</label><select className="h-9 rounded border px-3"><option>20:00 - Malam</option></select>
        <label className="text-[13px]">Status</label><span className="w-fit rounded-full bg-[#18ad00] px-4 py-1 text-white">Aktif</span>
      </div>
      <div className="mt-6 flex justify-end gap-2"><Button onClick={onCancel} className="h-10 rounded-[7px] bg-[#8292ae] px-4 text-white hover:bg-[#8292ae]"><X className="h-[15px] w-[15px]" />Batal</Button><Button className="h-10 rounded-[7px] bg-[#18ad00] px-5 text-white"><CheckSquare className="h-[15px] w-[15px]" />Simpan</Button></div>
    </Card>
  </div>;
}

export default function JadwalBungaSimpanan() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [product, setProduct] = useState("Semua");
  const [period, setPeriod] = useState("Semua");
  const [interestSearch, setInterestSearch] = useState("");
  const [adminSearch, setAdminSearch] = useState("");
  const filtered = useMemo(() => schedules.filter((item) =>
    (product === "Semua" || item.product === product) &&
    (period === "Semua" || item.period === period) &&
    item.interestNext.toLowerCase().includes(interestSearch.toLowerCase()) &&
    item.adminNext.toLowerCase().includes(adminSearch.toLowerCase()),
  ), [product, period, interestSearch, adminSearch]);

  if (showForm) return <ScheduleForm editing={editing} onCancel={() => { setShowForm(false); setEditing(false); sessionStorage.removeItem("jadwal-bunga-edit"); }} />;

  return <div className="min-h-screen bg-[#f6f7fc] px-4 py-7 text-[#102a5c] md:px-10">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-baseline gap-2"><h1 className="text-[21px] font-bold text-[#00245f]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1><span>Daftar</span></div><Button onClick={() => { setEditing(false); setShowForm(true); }} className="h-9 w-fit gap-2 rounded-full bg-white px-4 text-[#38547c]"><Plus className="h-4 w-4" />Tambah</Button></div>
    <Card className="mt-6 rounded-[22px] border-0 bg-white px-5 py-5"><div className="mb-4 text-[13px]">Tampilkan <select className="h-6 rounded border px-1"><option>20</option><option>50</option><option>100</option></select> entri</div>
      <div className="overflow-x-auto"><table className="w-full min-w-[1200px] border-collapse text-left text-[12px]"><thead><tr className="h-9 border-b text-[#002b68]"><th className="px-2">No.</th><th className="bg-[#e9edf3] px-2">Produk</th><th className="px-2">Periode</th><th className="px-2">JADWAL BUNGA BERIKUTNYA</th><th className="px-2">JADWAL BIAYA ADMIN BERIKUTNYA</th><th className="px-2">Status</th><th className="px-2">Aksi</th></tr>
          <tr className="h-11 border-b"><th /><th className="px-2"><select value={product} onChange={(event) => setProduct(event.target.value)} className="h-8 w-full border px-3"><option>Semua</option>{products.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th><th className="px-2"><select value={period} onChange={(event) => setPeriod(event.target.value)} className="h-8 w-full border px-3"><option>Semua</option>{periods.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th><th className="px-2"><input value={interestSearch} onChange={(event) => setInterestSearch(event.target.value)} placeholder="Masukan Jadwal" className="h-8 w-full border px-3" /></th><th className="px-2"><input value={adminSearch} onChange={(event) => setAdminSearch(event.target.value)} placeholder="Masukan Jadwal" className="h-8 w-full border px-3" /></th><th /><th /></tr></thead>
          <tbody>{filtered.map((item, index) => <tr key={item.product} className="border-b"><td className="px-2 py-1.5">{index + 1}</td><td className="bg-[#f0f1f4] px-2 py-1.5 font-medium">{item.product}</td><td className="px-2 py-1.5">{item.period}</td><td className="px-2 py-1.5">{item.interestNext}</td><td className="px-2 py-1.5">{item.adminNext}</td><td className="px-2 py-1.5"><span className="rounded bg-[#12a900] px-1.5 py-0.5 text-white">{item.status}</span></td><td className="px-2 py-1.5"><div className="flex gap-2"><button type="button" aria-label="Lihat detail" onClick={() => { window.location.href = "/anggota/simpanan/jadwal-bunga-admin-otomatis/detail"; }}><Eye className="h-[18px] w-[18px] text-[#7d8da9]" /></button><button type="button" aria-label="Ubah jadwal" onClick={() => { setEditing(true); setShowForm(true); }}><SquarePen className="h-[18px] w-[18px] text-[#3568ed]" /></button><X className="h-[18px] w-[18px] rounded-full bg-[#df3043] p-0.5 text-white" /></div></td></tr>)}</tbody>
        </table></div>
    </Card>
  </div>;
}
