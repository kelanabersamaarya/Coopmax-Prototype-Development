import { useMemo, useState } from "react";
import { CircleX, Eye, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const schedules = [
  { product: "tabungan", period: "Bulan Berikutnya", next: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "SIMPEDA - BANK BPD BALI", period: "Bulan Berikutnya", next: "21-11-2026 03:00:00", status: "Aktif" },
  { product: "Simpanan Wajib", period: "Bulan Berlangsung", next: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "Simpanan Sukarela - Penampung Pendapatan Bunga", period: "Bulan Berlangsung", next: "19-11-2026 00:00:00", status: "Aktif" },
  { product: "Simpanan Pokok", period: "Bulan Berlangsung", next: "01-11-2026 03:00:00", status: "Aktif" },
];

export default function JadwalBungaSimpanan() {
  const [product, setProduct] = useState("Semua");
  const [period, setPeriod] = useState("Semua");
  const [nextSchedule, setNextSchedule] = useState("");
  const [status, setStatus] = useState("Semua");

  const products = useMemo(() => ["Semua", ...new Set(schedules.map((item) => item.product))], []);
  const periods = useMemo(() => ["Semua", ...new Set(schedules.map((item) => item.period))], []);

  const filteredSchedules = schedules.filter((item) => {
    const matchesProduct = product === "Semua" || item.product === product;
    const matchesPeriod = period === "Semua" || item.period === period;
    const matchesStatus = status === "Semua" || item.status === status;
    const matchesNext = item.next.toLowerCase().includes(nextSchedule.toLowerCase());
    return matchesProduct && matchesPeriod && matchesStatus && matchesNext;
  });

  return (
    <div className="min-h-screen bg-[#f6f7fc] px-4 py-7 text-[#102a5c] md:px-10 md:py-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-2">
          <h1 className="text-[21px] font-medium tracking-[-0.02em] text-[#00245f] md:text-[22px]">
            Jadwal Bunga Simpanan dan Admin Otomatis
          </h1>
          <span className="text-[15px] text-[#173b70]">Daftar</span>
        </div>
        <Button className="h-9 w-fit gap-2 rounded-full bg-white px-4 text-[14px] font-normal text-[#38547c] shadow-[0_5px_18px_rgba(38,70,125,0.08)] hover:bg-white">
          <Plus className="h-4 w-4 text-[#5071a5]" strokeWidth={2.5} />
          Tambah
        </Button>
      </div>

      <Card className="mt-6 rounded-[22px] border-0 bg-white px-5 py-5 shadow-[0_2px_12px_rgba(39,67,116,0.025)] md:px-5">
        <div className="mb-4 flex items-center gap-1 text-[13px] text-[#163765]">
          <span>Tampilkan</span>
          <select className="h-6 rounded border border-[#8494ad] bg-white px-1 text-[13px] text-[#163765] outline-none" defaultValue="20">
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>entri</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse text-left text-[12px] text-[#173765]">
            <thead>
              <tr className="h-9 border-b border-[#c7d1e2] text-[12px] font-semibold uppercase tracking-[0.03em] text-[#002b68]">
                <th className="w-[60px] px-2">No.</th>
                <th className="w-[245px] bg-[#e9edf3] px-2">Produk <span className="float-right text-[#173d71]">⌄</span></th>
                <th className="w-[245px] px-2">Periode <span className="float-right">⌃</span></th>
                <th className="w-[365px] px-2">Jadwal Bunga Berikutnya <span className="float-right">⌃</span></th>
                <th className="w-[180px] px-2">Status</th>
                <th className="w-[115px] px-2">Aksi</th>
              </tr>
              <tr className="h-11 border-b border-[#c7d1e2]">
                <th />
                <th className="px-2"><select value={product} onChange={(event) => setProduct(event.target.value)} className="h-8 w-full rounded-md border border-[#ccd5e4] bg-white px-3 text-[13px] font-normal normal-case text-[#476185] outline-none"><option>Semua</option>{products.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th>
                <th className="px-2"><select value={period} onChange={(event) => setPeriod(event.target.value)} className="h-8 w-full rounded-md border border-[#ccd5e4] bg-white px-3 text-[13px] font-normal normal-case text-[#476185] outline-none"><option>Semua</option>{periods.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th>
                <th className="px-2"><input value={nextSchedule} onChange={(event) => setNextSchedule(event.target.value)} placeholder="Masukan Jadwal" className="h-8 w-full rounded-md border border-[#ccd5e4] px-3 text-[13px] font-normal normal-case text-[#476185] outline-none placeholder:text-[#6980a4] focus:border-[#617ee8]" /></th>
                <th className="px-2"><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-8 w-full rounded-md border border-[#ccd5e4] bg-white px-3 text-[13px] font-normal normal-case text-[#476185] outline-none"><option>Semua</option><option>Aktif</option><option>Nonaktif</option></select></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((item, index) => (
                <tr key={item.product} className="min-h-8 border-b border-[#edf0f5]">
                  <td className="px-2 py-1.5 align-middle">{index + 1}</td>
                  <td className="bg-[#f0f1f4] px-2 py-1.5 align-middle font-medium">{item.product}</td>
                  <td className="px-2 py-1.5 align-middle">{item.period}</td>
                  <td className="px-2 py-1.5 align-middle">{item.next}</td>
                  <td className="px-2 py-1.5 align-middle"><span className="rounded bg-[#12a900] px-1.5 py-0.5 text-[11px] font-semibold text-white">{item.status}</span></td>
                  <td className="px-2 py-1.5 align-middle"><div className="flex items-center gap-2 text-[#3e6fd9]"><button type="button" aria-label={`Lihat ${item.product}`}><Eye className="h-4 w-4" /></button><button type="button" aria-label={`Ubah ${item.product}`}><Pencil className="h-4 w-4" /></button><button type="button" aria-label={`Hapus ${item.product}`} className="text-[#e82d4f]"><CircleX className="h-4 w-4 fill-[#e82d4f] text-white" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-[13px] text-[#173765] sm:flex-row sm:items-center sm:justify-between">
          <span>Menampilkan {filteredSchedules.length ? 1 : 0} sampai {filteredSchedules.length} dari {filteredSchedules.length} entri</span>
          <div className="flex items-center justify-end gap-1"><Button variant="ghost" className="h-8 rounded-none bg-[#edf0f5] px-3 text-[12px] text-[#bdc6d4]">Sebelumnya</Button><Button className="h-8 rounded-none bg-[#6047f5] px-3 text-[13px] text-white hover:bg-[#6047f5]">1</Button><Button variant="ghost" className="h-8 rounded-none bg-[#edf0f5] px-3 text-[12px] text-[#bdc6d4]">Selanjutnya</Button></div>
        </div>
      </Card>
    </div>
  );
}
