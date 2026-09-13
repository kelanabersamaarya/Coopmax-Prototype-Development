import * as React from "react";
import { FileText, List, Printer, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function Action({ icon: Icon, children, onClick }: { icon: React.ElementType; children: React.ReactNode; onClick: () => void }) {
  return <Button variant="ghost" onClick={onClick} className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm hover:bg-violet-600 hover:text-white"><Icon className="mr-2 h-4 w-4" />{children}</Button>;
}

function DetailRow({ label, value, valueClass = "" }: { label: string; value: React.ReactNode; valueClass?: string }) {
  return <div className="grid grid-cols-[minmax(150px,205px)_14px_minmax(0,1fr)] gap-1 py-1 text-[13px] leading-7"><span className="text-[#7186a8]">{label}</span><span>:</span><span className={`font-medium text-[#14284b] ${valueClass}`}>{value}</span></div>;
}

export default function AstitiTransaksiDepositoDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f8fd] px-3 pb-8 pt-6 text-[#08285f] md:px-9 md:pt-8">
      <div className="px-1">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Transaksi Deposito <span className="text-sm font-semibold">Detail</span></h1>
        <div className="mt-4 flex flex-wrap justify-start gap-2"><Action icon={Printer} onClick={() => {}}>Kwitansi</Action><Action icon={Printer} onClick={() => {}}>Kwitansi Kas</Action><Action icon={List} onClick={() => navigate("/astiti-dana-lestari/simpanan-berjangka/transaksi")}>Kembali ke Daftar</Action><Action icon={Trash2} onClick={() => {}}>Hapus</Action></div>
      </div>
      <Card className="mt-5 rounded-3xl border-0 bg-white p-5 shadow-sm md:p-6">
        <section><h2 className="text-[14px] font-bold uppercase text-[#102d58]">Informasi Deposito</h2><div className="mt-5 rounded-[10px] bg-[#5745f6] p-5 text-white"><p className="font-bold">SIJAKOP</p><div className="mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4"><div><span className="text-white/75">Rek. Deposito</span><br /><b>55230003 ↗</b></div><div><span className="text-white/75">Rek. Tabungan</span><br /><b>-</b></div><div><span className="text-white/75">Kolektor</span><br /><b>Dinda Sudiati</b></div><div><span className="text-white/75">Tanggal Dibuat</span><br /><b>16 Jun 2023</b></div><div><span className="text-white/75">Tanggal Jatuh Tempo</span><br /><b>16 Jun 2024</b></div><div><span className="text-white/75">Periode Waktu</span><br /><b>12 Bulan</b></div><div><span className="text-white/75">Bunga Per Tahun (%)</span><br /><b>10.00 %</b></div><div><span className="text-white/75">Saldo</span><br /><b>1.000.000,00</b></div><div><span className="text-white/75">Saldo Bunga</span><br /><b>0.00</b></div><div><span className="text-white/75">Status</span><br /><span className="rounded bg-lime-500 px-1.5 py-0.5 text-xs font-semibold">Aktif</span></div></div></div></section>
        <section className="mt-8 border-t border-slate-200 pt-4"><h2 className="text-[14px] font-bold uppercase text-[#102d58]">Informasi Nasabah</h2><div className="mt-4 grid gap-x-12 lg:grid-cols-2"><div><DetailRow label="ID" value={<span className="text-blue-600">A2400002 ↗</span>} /><DetailRow label="NIP" value="" /><DetailRow label="Nama" value="Zulfa Yunita Nasyidah S.Ked" /><DetailRow label="Tanggal Lahir" value="1996-12-06" /><DetailRow label="Kategori Nasabah" value="Anggota" /><DetailRow label="Jenis Kelamin" value="Perempuan" /><DetailRow label="Alamat" value="Jalan Dewata No.19,Sidakarya Denpasar Selatan" /><DetailRow label="Hubungan dengan Koperasi" value="Anggota" /><DetailRow label="Tanggal Daftar" value="2024-04-17" /><DetailRow label="Tag" value="" /><DetailRow label="Unit" value="" /><DetailRow label="Status Verifikasi KTP" value={<span className="inline-flex rounded bg-red-100 px-3 py-1 text-red-600">⊗ BELUM TERVERIFIKASI</span>} /><DetailRow label="Status" value={<span className="rounded bg-green-600 px-1.5 py-0.5 text-xs text-white">Aktif</span>} /></div><div><DetailRow label="Agama" value="Hindu" /><DetailRow label="Profesi" value="SWASTA" /><DetailRow label="Jenis Identitas" value="KTP" /><DetailRow label="No. Identitas" value="7201355205027565" /><DetailRow label="No. Telp/Handphone" value="(+62) 723 9635 3903" /><DetailRow label="Alamat Email" value="dayuayseng@gmail.com" /></div></div></section>
        <section className="mt-8 border-t border-slate-200 pt-4"><h2 className="text-[14px] font-bold uppercase text-[#102d58]">Informasi Transaksi</h2><div className="mt-4 grid gap-x-12 lg:grid-cols-2"><div><DetailRow label="No Transaksi" value="PBD/130926/0001" /><DetailRow label="Rek. Tabungan" value="-" /><DetailRow label="Kolektor" value="-" /><DetailRow label="Tanggal Transaksi" value="13-09-2026" /><DetailRow label="Jenis Transaksi" value="Penarikan Bunga SIJAKOP" /><DetailRow label="Jumlah Transaksi" value="- 16.600,00" valueClass="text-red-500" /><DetailRow label="Tanggal Dibuat" value="13-09-2026 16:24:02" /><DetailRow label="Waktu Transaksi" value="16:24:02" /></div><div><DetailRow label="Saldo Awal" value="16.600,00" /><DetailRow label="Saldo Akhir" value="0,00" /><DetailRow label="Di Transfer ke Rekening" value="-" /><DetailRow label="Deskripsi" value="-" /><DetailRow label="Catatan" value="penarikan bunga sijakop" /><DetailRow label="Dibuat Oleh" value="Arya" /></div></div></section>
      </Card>
    </div>
  );
}
