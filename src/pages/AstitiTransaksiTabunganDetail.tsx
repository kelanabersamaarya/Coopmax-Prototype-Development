import { ArrowLeft, List, Printer, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DetailRow = ({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) => (
  <div className="grid grid-cols-[185px_1fr] gap-2 text-[13px] leading-6">
    <span className="text-[#7186a8]">{label}</span>
    <span className={accent ? "font-semibold text-[#0b4dd8]" : "text-[#172b50]"}>: {value}</span>
  </div>
);

export default function AstitiTransaksiTabunganDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fc] px-4 py-5 text-[#08285f] md:px-10 lg:px-12">
      <div className="flex flex-col justify-between gap-4 px-2 md:flex-row md:items-center">
        <h1 className="text-[22px] font-semibold tracking-tight">Transaksi Tabungan <span className="font-normal">Detail</span></h1>
        <div className="flex flex-wrap items-center gap-2 text-[#617597]">
          <Button variant="ghost" className="rounded-[5px] text-[13px] hover:bg-white"><Printer className="mr-2 h-4 w-4" />Kwitansi</Button>
          <Button variant="ghost" className="rounded-[5px] text-[13px] hover:bg-white"><Printer className="mr-2 h-4 w-4" />Kwitansi Kas</Button>
          <Button variant="ghost" onClick={() => navigate("/astiti-dana-lestari/simpanan/transaksi")} className="rounded-[5px] text-[13px] hover:bg-white"><List className="mr-2 h-4 w-4" />Kembali ke Daftar</Button>
          <Button variant="ghost" className="rounded-[5px] text-[13px] text-[#617597] hover:bg-white"><Trash2 className="mr-2 h-4 w-4" />Hapus</Button>
        </div>
      </div>

      <main className="mt-8 rounded-[22px] bg-white px-5 py-7 shadow-[0_12px_35px_rgba(40,70,120,0.04)] md:px-8 lg:px-10">
        <section>
          <h2 className="mb-5 text-[14px] font-bold uppercase text-[#092c62]">Informasi Rekening</h2>
          <div className="rounded-[12px] bg-[#1da3b7] px-5 py-5 text-white md:px-6">
            <div className="mb-5 text-[13px] font-bold uppercase">Simpanan Sukarela</div>
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-[12px] text-white/80">Rek. Tabungan</p><p className="font-bold">SK01260009</p></div>
              <div><p className="text-[12px] text-white/80">Produk Tabungan</p><p className="font-bold">Simpanan Sukarela</p></div>
              <div><p className="text-[12px] text-white/80">Kolektor</p><p className="font-bold">Purwanto Santoso</p></div>
              <div><p className="text-[12px] text-white/80">Saldo Akhir</p><p className="font-bold">60.000,00</p></div>
              <div><p className="text-[12px] text-white/80">Tanggal Daftar</p><p className="font-bold">07 Sep 2026</p></div>
              <div><p className="text-[12px] text-white/80">Tanggal Transaksi</p><p className="font-bold">13 Sep 2026</p></div>
              <div><p className="text-[12px] text-white/80">Jenis Transaksi</p><p className="font-bold">Transaksi Setoran</p></div>
              <div><p className="text-[12px] text-white/80">Status</p><span className="inline-block rounded-[3px] bg-[#54b900] px-2 text-[12px] font-bold">Berhasil</span></div>
            </div>
          </div>
        </section>

        <section className="mt-8 border-t border-slate-200 pt-5">
          <h2 className="mb-5 text-[14px] font-bold uppercase text-[#092c62]">Informasi Nasabah</h2>
          <div className="grid gap-x-12 gap-y-1 lg:grid-cols-2">
            <div><DetailRow label="ID Nasabah" value="A2600010" accent /><DetailRow label="Nama" value="Sinergi Sukses Sentosa" /><DetailRow label="Kategori Nasabah" value="Anggota" /><DetailRow label="No. Identitas" value="-" /><DetailRow label="Alamat" value="-" /></div>
            <div><DetailRow label="Jenis Identitas" value="-" /><DetailRow label="No. Telp/Handphone" value="-" /><DetailRow label="Tanggal Daftar" value="07-09-2026" /><DetailRow label="Status" value="Aktif" /></div>
          </div>
        </section>

        <section className="mt-8 border-t border-slate-200 pt-5">
          <h2 className="mb-5 text-[14px] font-bold uppercase text-[#092c62]">Informasi Transaksi</h2>
          <div className="grid gap-x-12 gap-y-1 lg:grid-cols-2">
            <div><DetailRow label="No. Transaksi" value="BA/130926/0002" accent /><DetailRow label="Rek. Tabungan" value="SK01260009" /><DetailRow label="Kolektor" value="Purwanto Santoso" /><DetailRow label="Tanggal Transaksi" value="13-09-2026" /><DetailRow label="Jenis Transaksi" value="Transaksi Setoran" /><DetailRow label="Nominal" value="60.000,00" /></div>
            <div><DetailRow label="Saldo Awal" value="0,00" /><DetailRow label="Saldo Akhir" value="60.000,00" /><DetailRow label="Keterangan" value="-" /><DetailRow label="Nomor Seri Transaksi" value="-" /><DetailRow label="Dibuat Oleh" value="Arya" /><DetailRow label="Waktu Transaksi" value="13-09-2026 15:18:06" /></div>
          </div>
        </section>
      </main>
    </div>
  );
}
