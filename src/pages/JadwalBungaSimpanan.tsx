import { useMemo, useState } from "react";
import { CircleX, Eye, Pencil, Plus, Save, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const schedules = [
  { product: "tabungan", period: "Bulan Berikutnya", next: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "SIMPEDA - BANK BPD BALI", period: "Bulan Berikutnya", next: "21-11-2026 03:00:00", status: "Aktif" },
  { product: "Simpanan Wajib", period: "Bulan Berlangsung", next: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "Simpanan Sukarela - Penampung Pendapatan Bunga", period: "Bulan Berlangsung", next: "19-11-2026 00:00:00", status: "Aktif" },
  { product: "Simpanan Pokok", period: "Bulan Berlangsung", next: "01-11-2026 03:00:00", status: "Aktif" },
];

function AddScheduleForm({ onBack }: { onBack: () => void }) {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="min-h-screen bg-[#f6f7fc] px-4 py-7 text-[#102a5c] md:px-10 md:py-8">
      <div className="flex items-baseline gap-2">
        <h1 className="text-[21px] font-medium tracking-[-0.02em] text-[#00245f] md:text-[22px]">Jadwal Bunga Simpanan Otomatis</h1>
        <span className="text-[15px] text-[#173b70]">Tambah</span>
      </div>
      <Card className="mt-8 rounded-[22px] border-0 bg-white px-6 py-7 shadow-[0_2px_12px_rgba(39,67,116,0.025)] md:px-12 md:py-8">
        <div className="grid gap-3 md:grid-cols-[185px_minmax(0,1fr)] md:items-center md:gap-x-2">
          <label htmlFor="product" className="text-[13px] text-[#002b68]">Produk Simpanan<span className="text-red-600">*</span></label>
          <select id="product" className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px] text-[#6980a4] outline-none"><option>Pilih Produk Simpanan</option>{schedules.map((item) => <option key={item.product}>{item.product}</option>)}</select>
          <label htmlFor="period" className="text-[13px] text-[#002b68]">Periode<span className="text-red-600">*</span></label>
          <select id="period" className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px] text-[#6980a4] outline-none"><option>Pilih Periode Proses</option><option>Bulan Berlangsung</option><option>Bulan Berikutnya</option></select>
          <label htmlFor="time" className="text-[13px] text-[#002b68]">Waktu<span className="text-red-600">*</span></label>
          <select id="time" className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px] text-[#6980a4] outline-none"><option>Pilih Waktu Proses</option><option>00:00</option><option>03:00</option><option>20:00</option></select>
          <label htmlFor="transaction" className="text-[13px] text-[#002b68]">Jenis Transaksi<span className="text-red-600">*</span></label>
          <select id="transaction" className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px] text-[#6980a4] outline-none"><option>Pilih Jenis Transaksi</option><option>Bunga</option><option>Admin</option></select>
          <span className="text-[13px] text-[#002b68]">Status</span>
          <button
            type="button"
            role="switch"
            aria-checked={isActive}
            onClick={() => setIsActive((active) => !active)}
            className={`inline-flex w-fit items-center gap-2 rounded-full py-1 pl-3 pr-1 text-[11px] font-semibold text-white transition-colors ${isActive ? "bg-[#6047f5]" : "bg-[#8292ae]"}`}
          >
            <span>{isActive ? "ON" : "OFF"}</span>
            <span className={`h-5 w-5 rounded-full bg-white transition-transform ${isActive ? "translate-x-0" : "-translate-x-5"}`} />
          </button>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" onClick={onBack} className="h-10 rounded-[7px] bg-[#8292ae] px-4 text-[14px] text-white hover:bg-[#71829f]"><Undo2 className="h-3.5 w-3.5" />Kembali</Button>
          <Button type="button" className="h-10 rounded-[7px] bg-[#18ad00] px-5 text-[14px] text-white hover:bg-[#139600]"><Save className="h-3.5 w-3.5" />Simpan</Button>
        </div>
      </Card>
    </div>
  );
}

export default function JadwalBungaSimpanan() {
  const [showAdd, setShowAdd] = useState(false);
  const [product, setProduct] = useState("Semua");
  const [period, setPeriod] = useState("Semua");
  const [nextSchedule, setNextSchedule] = useState("");
  const [status, setStatus] = useState("Semua");
  const products = useMemo(() => ["Semua", ...new Set(schedules.map((item) => item.product))], []);
  const periods = useMemo(() => ["Semua", ...new Set(schedules.map((item) => item.period))], []);
  const filteredSchedules = schedules.filter((item) => (product === "Semua" || item.product === product) && (period === "Semua" || item.period === period) && (status === "Semua" || item.status === status) && item.next.toLowerCase().includes(nextSchedule.toLowerCase()));

  if (showAdd) return <AddScheduleForm onBack={() => setShowAdd(false)} />;

  return (
    <div className="min-h-screen bg-[#f6f7fc] px-4 py-7 text-[#102a5c] md:px-10 md:py-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-baseline gap-2"><h1 className="text-[21px] font-medium tracking-[-0.02em] text-[#00245f] md:text-[22px]">Jadwal Bunga Simpanan dan Admin Otomatis</h1><span className="text-[15px] text-[#173b70]">Daftar</span></div><Button onClick={() => setShowAdd(true)} className="h-9 w-fit gap-2 rounded-full bg-white px-4 text-[14px] font-normal text-[#38547c] shadow-[0_5px_18px_rgba(38,70,125,0.08)] hover:bg-white"><Plus className="h-4 w-4 text-[#5071a5]" strokeWidth={2.5} />Tambah</Button></div>
      <Card className="mt-6 rounded-[22px] border-0 bg-white px-5 py-5 shadow-[0_2px_12px_rgba(39,67,116,0.025)] md:px-5"><div className="mb-4 flex items-center gap-1 text-[13px] text-[#163765]">Tampilkan <select className="h-6 rounded border border-[#8494ad] bg-white px-1 text-[13px]" defaultValue="20"><option>20</option><option>50</option><option>100</option></select> entri</div><div className="overflow-x-auto"><table className="w-full min-w-[920px] border-collapse text-left text-[12px] text-[#173765]"><thead><tr className="h-9 border-b border-[#c7d1e2] text-[12px] font-semibold uppercase tracking-[0.03em] text-[#002b68]"><th className="w-[60px] px-2">No.</th><th className="w-[245px] bg-[#e9edf3] px-2">Produk</th><th className="w-[245px] px-2">Periode</th><th className="w-[365px] px-2">Jadwal Bunga Berikutnya</th><th className="w-[180px] px-2">Status</th><th className="w-[115px] px-2">Aksi</th></tr><tr className="h-11 border-b border-[#c7d1e2]"><th /><th className="px-2"><select value={product} onChange={(event) => setProduct(event.target.value)} className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px]"><option>Semua</option>{products.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th><th className="px-2"><select value={period} onChange={(event) => setPeriod(event.target.value)} className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px]"><option>Semua</option>{periods.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th><th className="px-2"><input value={nextSchedule} onChange={(event) => setNextSchedule(event.target.value)} placeholder="Masukan Jadwal" className="h-8 w-full rounded-[5px] border border-[#ccd5e4] px-3 text-[13px]" /></th><th className="px-2"><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px]"><option>Semua</option><option>Aktif</option><option>Nonaktif</option></select></th><th /></tr></thead><tbody>{filteredSchedules.map((item, index) => <tr key={item.product} className="border-b border-[#edf0f5]"><td className="px-2 py-1.5">{index + 1}</td><td className="bg-[#f0f1f4] px-2 py-1.5 font-medium">{item.product}</td><td className="px-2 py-1.5">{item.period}</td><td className="px-2 py-1.5">{item.next}</td><td className="px-2 py-1.5"><span className="rounded bg-[#12a900] px-1.5 py-0.5 text-[11px] font-semibold text-white">{item.status}</span></td><td className="px-2 py-1.5"><div className="flex items-center gap-2 text-[#3e6fd9]"><button type="button"><Eye className="h-4 w-4" /></button><button type="button"><Pencil className="h-4 w-4" /></button><button type="button" className="text-[#e82d4f]"><CircleX className="h-4 w-4 fill-[#e82d4f] text-white" /></button></div></td></tr>)}</tbody></table></div><div className="mt-4 flex flex-col gap-3 text-[13px] sm:flex-row sm:items-center sm:justify-between"><span>Menampilkan {filteredSchedules.length ? 1 : 0} sampai {filteredSchedules.length} dari {filteredSchedules.length} entri</span><div className="flex items-center justify-end gap-1"><Button variant="ghost" className="h-8 rounded-none bg-[#edf0f5] px-3 text-[12px] text-[#bdc6d4]">Sebelumnya</Button><Button className="h-8 rounded-none bg-[#6047f5] px-3 text-[13px] text-white hover:bg-[#6047f5]">1</Button><Button variant="ghost" className="h-8 rounded-none bg-[#edf0f5] px-3 text-[12px] text-[#bdc6d4]">Selanjutnya</Button></div></div></Card>
    </div>
  );
}
