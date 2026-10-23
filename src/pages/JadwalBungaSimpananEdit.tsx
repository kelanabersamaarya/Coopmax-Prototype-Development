import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function JadwalBungaSimpananEdit() {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [period, setPeriod] = useState("Bulan Berikutnya");
  const [interestSchedule, setInterestSchedule] = useState("");
  const [adminSchedule, setAdminSchedule] = useState("");
  const [mobileAdminSchedule, setMobileAdminSchedule] = useState("");

  return (
    <main className="min-h-screen bg-[#f6f7fc] px-4 py-7 text-[#102a5c] md:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-2">
          <h1 className="text-[21px] font-bold text-[#00245f]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1>
          <span>Tambah</span>
        </div>
        <Button type="button" onClick={() => navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis")} className="w-fit gap-2 rounded-full bg-white text-[#38547c]">
          <ArrowLeft className="h-4 w-4" />Kembali
        </Button>
      </header>

      <Card className="mt-6 rounded-[22px] border-0 bg-white p-5 md:p-7">
        <form onSubmit={(event) => { event.preventDefault(); navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis"); }} className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-[13px] font-normal text-[#6b7280]">Produk
            <input required value={product} onChange={(event) => setProduct(event.target.value)} placeholder="Masukkan produk" className="h-9 rounded-[5px] border border-[#c8d3e5] px-3 font-normal text-[#6b7280] outline-none focus:border-[#38547c]" />
          </label>
          <label className="grid gap-2 text-[13px] font-normal text-[#6b7280]">Periode
            <select value={period} onChange={(event) => setPeriod(event.target.value)} className="h-9 rounded-[5px] border border-[#c8d3e5] bg-white px-3 font-normal text-[#6b7280] outline-none focus:border-[#38547c]"><option>Bulan Berikutnya</option><option>Bulan Berlangsung</option></select>
          </label>
          <label className="grid gap-2 text-[13px] font-normal text-[#6b7280]">Jadwal Bunga Berikutnya
            <input required value={interestSchedule} onChange={(event) => setInterestSchedule(event.target.value)} placeholder="Masukkan jadwal" className="h-9 rounded-[5px] border border-[#c8d3e5] px-3 font-normal text-[#6b7280] outline-none focus:border-[#38547c]" />
          </label>
          <label className="grid gap-2 text-[13px] font-normal text-[#6b7280]">Jadwal Biaya Admin Berikutnya
            <input required value={adminSchedule} onChange={(event) => setAdminSchedule(event.target.value)} placeholder="Masukkan jadwal" className="h-9 rounded-[5px] border border-[#c8d3e5] px-3 font-normal text-[#6b7280] outline-none focus:border-[#38547c]" />
          </label>
          <label className="grid gap-2 text-[13px] font-normal text-[#6b7280] md:col-span-2">Jadwal Biaya Admin M-Banking Berikutnya
            <input required value={mobileAdminSchedule} onChange={(event) => setMobileAdminSchedule(event.target.value)} placeholder="Masukkan jadwal" className="h-9 rounded-[5px] border border-[#c8d3e5] px-3 font-normal text-[#6b7280] outline-none focus:border-[#38547c]" />
          </label>
          <div className="flex gap-3 md:col-span-2"><Button type="submit" className="gap-2 rounded-full bg-[#38547c] text-white"><Save className="h-4 w-4" />Simpan</Button><Button type="button" onClick={() => navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis")} className="rounded-full bg-white text-[#38547c]">Batal</Button></div>
        </form>
      </Card>
    </main>
  );
}
