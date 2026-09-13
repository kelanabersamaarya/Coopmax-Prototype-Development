import {
  Check,
  ExternalLink,
  List,
  Printer,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const DetailRow = ({
  label,
  value,
  accent = false,
  children,
}: {
  label: string;
  value?: string;
  accent?: boolean;
  children?: ReactNode;
}) => (
  <div className="grid grid-cols-[minmax(150px,185px)_1fr] gap-2 text-[13px] leading-8 sm:grid-cols-[200px_1fr]">
    <span className="text-[#7186a8]">{label}</span>
    <span className={accent ? "font-medium text-[#245be9]" : "text-[#14284b]"}>
      : {children ?? value}
    </span>
  </div>
);

const ExternalValue = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-1 text-[#245be9]">
    {children}
    <ExternalLink className="h-[15px] w-[15px] stroke-[2.5]" />
  </span>
);

const InfoCell = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[12px] text-white/75">{label}</p>
    <p className="text-[14px] font-bold leading-5">{value}</p>
  </div>
);

export default function AstitiTransaksiTabunganDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fc] px-4 pb-6 pt-5 text-[#08285f] md:px-8 md:pt-6 lg:px-10">
      <div className="flex flex-col gap-4 px-1 sm:px-2 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-[21px] font-semibold tracking-[-0.02em]">
          Transaksi Tabungan <span className="font-normal">Detail</span>
        </h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#5d7092]">
          <Button variant="ghost" className="h-9 rounded-[5px] px-2.5 text-[13px] font-normal hover:bg-white">
            <Check className="mr-2 h-[18px] w-[18px] stroke-[3]" />
            Koreksi
          </Button>
          <Button variant="ghost" className="h-9 rounded-[5px] px-2.5 text-[13px] font-normal hover:bg-white">
            <Printer className="mr-2 h-[18px] w-[18px]" />
            Kwitansi
          </Button>
          <Button variant="ghost" className="h-9 rounded-[5px] px-2.5 text-[13px] font-normal hover:bg-white">
            <Printer className="mr-2 h-[18px] w-[18px]" />
            Kwitansi Kas
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/astiti-dana-lestari/simpanan/transaksi")}
            className="h-9 rounded-[5px] px-2.5 text-[13px] font-normal hover:bg-white"
          >
            <List className="mr-2 h-[18px] w-[18px] stroke-[2.5]" />
            Kembali ke Daftar
          </Button>
          <Button variant="ghost" className="h-9 rounded-[5px] px-2.5 text-[13px] font-normal hover:bg-white">
            <Trash2 className="mr-2 h-[18px] w-[18px]" />
            Hapus
          </Button>
        </div>
      </div>

      <main className="mt-6 rounded-[20px] bg-white px-5 py-7 shadow-[0_12px_35px_rgba(40,70,120,0.04)] md:mt-7 md:px-8 lg:px-5 lg:py-7">
        <section>
          <h2 className="mb-5 text-[14px] font-bold uppercase text-[#092c62]">Informasi Tabungan</h2>
          <div className="rounded-[11px] bg-[#7140c5] px-5 py-4 text-white shadow-[0_14px_30px_rgba(102,62,184,0.14)] md:px-5 md:py-4">
            <p className="mb-3 text-[13px] font-bold uppercase">Simpanan Sukarela</p>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCell label="Kode Tabungan" value="SK01260009 ↗" />
              <InfoCell label="Kolektor" value="sinergi_kolektor" />
              <InfoCell label="Tanggal Dibuat" value="07 Sep 2026" />
              <InfoCell label="Bunga Per Tahun (%)" value="2.000 %" />
              <InfoCell label="Saldo" value="110.000,00" />
              <div>
                <p className="text-[12px] text-white/75">Tabungan Berjangka</p>
                <span className="inline-block rounded-[3px] bg-[#e93455] px-5 text-[12px] font-bold leading-[21px]">Tidak</span>
              </div>
              <div>
                <p className="text-[12px] text-white/75">Status</p>
                <span className="inline-block rounded-[3px] bg-[#4bc800] px-5 text-[12px] font-bold leading-[21px]">Ya</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 border-t border-[#dfe3e9] pt-3">
          <h2 className="mb-4 text-[14px] font-bold uppercase text-[#092c62]">Informasi Nasabah</h2>
          <div className="grid gap-x-12 lg:grid-cols-2">
            <div>
              <DetailRow label="ID" accent><ExternalValue>A2600010</ExternalValue></DetailRow>
              <DetailRow label="NIP" value="" />
              <DetailRow label="Nama" value="Sinergi Sukses Sentosa" />
              <DetailRow label="Tanggal Lahir" value="1996-09-01" />
              <DetailRow label="Kategori Nasabah" value="Anggota" />
              <DetailRow label="Jenis Kelamin" value="Laki - Laki" />
              <DetailRow label="Alamat" value="JL" />
              <DetailRow label="Hubungan dengan Koperasi" value="Anggota" />
              <DetailRow label="Tanggal Daftar" value="2026-09-07" />
              <DetailRow label="Tag" value="" />
              <DetailRow label="Unit" value="" />
              <DetailRow label="Status Verifikasi KTP">
                <span className="inline-flex items-center gap-2 rounded-[4px] bg-[#ffe5e5] px-4 py-1 text-[13px] font-medium text-red-600"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">×</span>BELUM TERVERIFIKASI</span>
              </DetailRow>
              <DetailRow label="Status"><span className="rounded-[3px] bg-[#4bc800] px-1.5 py-0.5 text-[12px] font-bold text-white">Aktif</span></DetailRow>
            </div>
            <div>
              <DetailRow label="Agama" value="Islam" />
              <DetailRow label="Profesi" value="SWASTA" />
              <DetailRow label="Jenis Identitas" value="KTP" />
              <DetailRow label="No. Identitas" value="5122345678900" />
              <DetailRow label="No. Telp/Handphone" value="812345678902" />
              <DetailRow label="Alamat Email" value="" />
            </div>
          </div>
        </section>

        <section className="mt-7 border-t border-[#dfe3e9] pt-3">
          <h2 className="mb-4 text-[14px] font-bold uppercase text-[#092c62]">Informasi Transaksi</h2>
          <div className="grid gap-x-12 lg:grid-cols-2">
            <div>
              <DetailRow label="No. Transaksi" value="STR/130926/0002" />
              <DetailRow label="Tanggal Transaksi" value="13-09-2026" />
              <DetailRow label="Jenis Transaksi" value="Transaksi Setoran Simpanan" />
              <DetailRow label="Saldo Awal" value="60.000,00" />
              <DetailRow label="Tanggal Dibuat" value="13-09-2026 14:54:31" />
              <DetailRow label="Waktu Transaksi" value="14:54:31" />
            </div>
            <div>
              <DetailRow label="Jumlah Transaksi"><span className="text-[#39b500]">+ 50.000,00</span></DetailRow>
              <DetailRow label="Saldo Akhir" value="110.000,00" />
              <DetailRow label="Deskripsi" value="-" />
              <DetailRow label="Keterangan" value="Tambah tabungan" />
              <DetailRow label="Dibuat Oleh" value="Arya" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
