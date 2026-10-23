import { useMemo, useState } from "react";
import { Eye, Plus, SquarePen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "./JadwalBungaSimpanan.css";

const schedules = [
  { product: "tabungan", period: "Bulan Berikutnya", interestNext: "21-11-2026 20:00:00", adminNext: "21-11-2026 20:00:00", mobileAdminNext: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "SIMPEDA - BANK BPD BALI", period: "Bulan Berikutnya", interestNext: "21-11-2026 03:00:00", adminNext: "21-11-2026 20:00:00", mobileAdminNext: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "Simpanan Wajib", period: "Bulan Berlangsung", interestNext: "21-11-2026 20:00:00", adminNext: "21-11-2026 20:00:00", mobileAdminNext: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "Simpanan Sukarela - Penampung Pendapatan Bunga", period: "Bulan Berlangsung", interestNext: "19-11-2026 00:00:00", adminNext: "21-11-2026 20:00:00", mobileAdminNext: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "Simpanan Pokok", period: "Bulan Berlangsung", interestNext: "01-11-2026 03:00:00", adminNext: "21-11-2026 20:00:00", mobileAdminNext: "21-11-2026 20:00:00", status: "Aktif" },
];

const products = ["Semua", ...new Set(schedules.map((item) => item.product))];
const periods = ["Semua", ...new Set(schedules.map((item) => item.period))];

export default function JadwalBungaSimpanan() {
  const [product, setProduct] = useState("Semua");
  const [period, setPeriod] = useState("Semua");
  const [interestSearch, setInterestSearch] = useState("");
  const [adminSearch, setAdminSearch] = useState("");
  const [mobileAdminSearch, setMobileAdminSearch] = useState("");
  const [status, setStatus] = useState("Semua");
  const filtered = useMemo(() => schedules.filter((item) => (product === "Semua" || item.product === product) && (period === "Semua" || item.period === period) && (status === "Semua" || item.status === status) && item.interestNext.toLowerCase().includes(interestSearch.toLowerCase()) && item.adminNext.toLowerCase().includes(adminSearch.toLowerCase()) && item.mobileAdminNext.toLowerCase().includes(mobileAdminSearch.toLowerCase())), [product, period, status, interestSearch, adminSearch, mobileAdminSearch]);

  return <div className="min-h-screen bg-[#f6f7fc] px-4 py-7 text-[#102a5c] md:px-10">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-baseline gap-2"><h1 className="text-[21px] font-bold text-[#00245f]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1><span>Daftar</span></div><Button className="h-9 w-fit gap-2 rounded-full bg-white px-4 text-[#38547c]"><Plus className="h-4 w-4" />Tambah</Button></div>
    <Card className="mt-6 rounded-[22px] border-0 bg-white px-5 py-5"><div className="mb-4 text-[13px]">Tampilkan <select className="h-6 rounded border px-1"><option>20</option><option>50</option><option>100</option></select> entri</div>
      <div className="overflow-x-auto"><table className="w-full min-w-[1350px] border-collapse text-left text-[12px]"><thead><tr className="h-9 border-b text-[#002b68]"><th className="px-2">No.</th><th className="bg-[#e9edf3] px-2">Produk</th><th className="px-2">Periode</th><th className="px-2">JADWAL BUNGA<br />BERIKUTNYA</th><th className="px-2">JADWAL BIAYA<br />ADMIN BERIKUTNYA</th><th className="px-2">JADWAL BIAYA ADMIN<br />M-BANKING BERIKUTNYA</th><th className="px-2">Status</th><th className="px-2">Aksi</th></tr>
        <tr className="h-11 border-b"><th /><th className="px-2"><select value={product} onChange={(event) => setProduct(event.target.value)} className="h-8 w-full border px-3"><option>Semua</option>{products.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th><th className="px-2"><select value={period} onChange={(event) => setPeriod(event.target.value)} className="h-8 w-full border px-3"><option>Semua</option>{periods.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th><th className="px-2"><input value={interestSearch} onChange={(event) => setInterestSearch(event.target.value)} placeholder="Masukan Jadwal" className="h-8 w-full border px-3" /></th><th className="px-2"><input value={adminSearch} onChange={(event) => setAdminSearch(event.target.value)} placeholder="Masukan Jadwal" className="h-8 w-full border px-3" /></th><th className="px-2"><input value={mobileAdminSearch} onChange={(event) => setMobileAdminSearch(event.target.value)} placeholder="Masukan Jadwal" className="h-8 w-full border px-3" /></th><th className="px-2"><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-8 w-full rounded border border-[#8795a9] bg-white px-2 text-[#506587]"><option>Semua</option><option>Tidak Aktif</option><option>Aktif</option></select></th><th /></tr></thead>
        <tbody>{filtered.map((item, index) => <tr key={item.product} className="border-b"><td className="px-2 py-1.5"><span className="cell-text">{index + 1}</span></td><td className="bg-[#f0f1f4] px-2 py-1.5 font-medium"><span className="cell-text">{item.product}</span></td><td className="px-2 py-1.5"><span className="cell-text">{item.period}</span></td><td className="px-2 py-1.5"><span className="cell-text">{item.interestNext}</span></td><td className="px-2 py-1.5"><span className="cell-text">{item.adminNext}</span></td><td className="px-2 py-1.5"><span className="cell-text">{item.mobileAdminNext}</span></td><td className="px-2 py-1.5"><span className="rounded bg-[#12a900] px-1.5 py-0.5 text-white">{item.status}</span></td><td className="px-2 py-1.5"><div className="flex gap-2"><Eye className="h-[18px] w-[18px] text-[#7d8da9]" /><SquarePen className="h-[18px] w-[18px] text-[#3568ed]" /><X className="h-[18px] w-[18px] rounded-full bg-[#df3043] p-0.5 text-white" /></div></td></tr>)}</tbody>
      </table></div>
    </Card>
  </div>;
}
