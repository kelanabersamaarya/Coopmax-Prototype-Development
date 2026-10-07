import type { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, CircleAlert, Eye, FileText, List, Pencil, Printer, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const infoRows = [
  ["ID", "N2600014"], ["NIP", "-"], ["Nama", "Djoko Manggolo"], ["Tanggal Lahir", "1956-11-10"],
  ["Kategori Nasabah", "Anggota"], ["Jenis Kelamin", "Laki - Laki"], ["Alamat", "Jalan"], ["Hubungan dengan Koperasi", "Calon Anggota"],
  ["Tanggal Daftar", "2026-09-11"], ["Tag", "-"], ["Unit", "-"],
];
const creditRows = [["Tanggal Realisasi", "-"], ["Besar Pinjaman / Plafond", "5.000.000,00"], ["Propisi", "0,00"], ["Administrasi", "0,00"], ["Biaya Asuransi", "0,00"], ["Jumlah Potongan", "0"], ["Penerimaan Bersih", "5.000.000,00"], ["Terbilang", "Lima Juta"], ["Dicairkan ke Rekening Tabungan", "-"]];

function DetailRows({ rows }: { rows: string[][] }) {
  return <div className="space-y-1.5">{rows.map(([label, value]) => <div key={label} className="grid grid-cols-[210px_14px_minmax(0,1fr)] gap-2 text-[13px] leading-6"><span className="text-[#7184a5]">{label}</span><span className="text-center text-[#7184a5]">:</span><span className="font-semibold text-[#17233b]">{value}</span></div>)}</div>;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="border-t border-slate-200 pt-5 text-[13px] font-extrabold uppercase tracking-wide text-[#17233b]">{children}</h2>;
}

export default function LoanApplicationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isMitraKarya = window.location.pathname.startsWith("/mitra-karya/");
  const listPath = isMitraKarya ? "/mitra-karya/pinjaman/pengajuan" : "/loans/applications";
  return <div className="min-h-screen bg-[#f6f7fc] px-3 py-6 text-[#08265a] sm:px-8 lg:px-11">
    <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-[22px] font-semibold">Pengajuan Pinjaman <span className="font-normal">Detail</span></h1><div className="flex flex-wrap gap-2"><Button className="rounded-full bg-white text-slate-600 shadow-sm hover:bg-violet-600 hover:text-white"><Save className="mr-2 h-4 w-4" />Perbarui Status</Button><Button className="rounded-full bg-white text-slate-600 shadow-sm hover:bg-violet-600 hover:text-white"><Printer className="mr-2 h-4 w-4" />Dokumen <ChevronDown className="ml-1 h-3 w-3" /></Button><Button className="rounded-full bg-white text-slate-600 shadow-sm hover:bg-violet-600 hover:text-white"><Pencil className="mr-2 h-4 w-4" />Ubah</Button><Button className="rounded-full bg-white text-slate-600 shadow-sm hover:bg-rose-600 hover:text-white"><Trash2 className="mr-2 h-4 w-4" />Hapus</Button><Button onClick={() => navigate(listPath)} className="rounded-full bg-white text-slate-600 shadow-sm hover:bg-violet-600 hover:text-white"><List className="mr-2 h-4 w-4" />Kembali ke Daftar</Button></div></div>
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-violet-200 bg-white px-5 py-3 shadow-sm"><CircleAlert className="h-8 w-8 shrink-0 text-violet-600" /><div className="flex-1"><p className="text-sm font-bold text-violet-700">Dapatkan Hasil Analisa Kredit Cepat dengan 5C ✨</p><p className="text-xs text-slate-600">Ingin mendapatkan analisa 5C dari pengajuan dan laporan kredit ini?</p></div><Button className="rounded-full bg-violet-600 text-white hover:bg-violet-700">Dapatkan Analisa 5C</Button></div>
    <main className="mt-6 rounded-[22px] bg-white p-5 shadow-sm sm:p-6 lg:p-7">
      <SectionTitle>Informasi Rekening</SectionTitle>
      <div className="mt-5 rounded-xl bg-[#1ba2b5] p-5 text-white"><p className="text-sm font-extrabold uppercase">Pinjaman Bulanan</p><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[["No. Rekening", "09260008"], ["Sektor Pinjaman", "Umum"], ["Tujuan Pinjaman", "-"], ["Kolektor", "Dinda Sudiati"], ["Tanggal Dibuat", "27 Sep 2026"], ["Tanggal Jatuh Tempo", "27 Sep 2027"], ["Tanggal Pinjaman Aktif", "27 Sep 2026"], ["Tanggal Pembayaran Setiap Bulan", "27"], ["Periode Waktu", "12 Bulan"], ["Metode Bunga Pinjaman", "Bunga Efektif"], ["Bunga Per Tahun (%)", "24,00 %"], ["Jumlah Pinjaman Diajukan", "5.000.000,00"], ["Jumlah Pinjaman Disetujui", "5.000.000,00"], ["Sisa Pinjaman", "5.000.000,00"], ["Total Harus Bayar", "-"], ["Status", "Disetujui"]].map(([label, value]) => <div key={label}><p className="text-xs text-white/80">{label}</p><p className="text-sm font-bold">{label === "Status" ? <span className="rounded bg-lime-500 px-1.5 py-0.5 text-white">{value}</span> : value}</p></div>)}</div></div>
      <div className="mt-8"><SectionTitle>Informasi Nasabah</SectionTitle><div className="mt-5 grid gap-x-12 gap-y-4 lg:grid-cols-2"><DetailRows rows={infoRows} /><DetailRows rows={[["Agama", "Islam"], ["Profesi", "SWASTA"], ["Jenis Identitas", "KTP"], ["No. Identitas", "373020088840006"], ["No. Telp/Handphone", "81284116604"], ["Alamat Email", "djoko.manggolo@gmail.com"]]} /></div><div className="mt-5 flex items-center gap-3 rounded-md bg-rose-100 px-4 py-3 text-xs font-semibold text-red-600"><CircleAlert className="h-5 w-5" />Belum Terverifikasi</div></div>
      <div className="mt-8"><SectionTitle>Informasi Kredit</SectionTitle><div className="mt-5"><DetailRows rows={creditRows} /></div></div>
      <div className="mt-8"><SectionTitle>Data Anggota Keluarga</SectionTitle><div className="mt-5 flex items-center gap-3 rounded-md bg-amber-100 px-4 py-4 text-xs font-semibold text-amber-800"><CircleAlert className="h-5 w-5 shrink-0" />Data nasabah belum terverifikasi. Silakan lakukan verifikasi nasabah untuk mendapatkan data anggota keluarga.</div></div>
      <div className="mt-8"><SectionTitle>Informasi Agunan</SectionTitle><div className="mt-5 max-w-[400px] overflow-hidden rounded-xl bg-[#1ba2b5] text-white"><div className="p-5"><p className="font-extrabold uppercase">Sepeda Motor</p><div className="mt-5 grid grid-cols-2 gap-4 text-xs"><div>Kode Agunan<p className="font-bold">SPD</p></div><div>Nominal Agunan<p className="font-bold">5.000.000,00</p></div><div>Pengakuan (%)<p className="font-bold">50,00%</p></div><div>Nominal Pengakuan<p className="font-bold">2.500.000,00</p></div></div></div><div className="border-t border-white/50 p-3"><Button className="w-full bg-white text-[#149bb4] hover:bg-slate-50"><Eye className="mr-2 h-4 w-4" />Detail Agunan</Button></div></div></div>
      <div className="mt-8"><SectionTitle>Informasi File</SectionTitle><div className="mt-4 flex items-center gap-2 text-sm text-slate-500"><FileText className="h-5 w-5" />Tidak ada file yang diupload</div></div>
      <div className="mt-8"><SectionTitle>Riwayat Perubahan Status</SectionTitle><table className="mt-4 w-full border-collapse text-left text-xs"><thead><tr className="border border-slate-300 text-[10px] uppercase text-slate-500"><th className="p-2">No.</th><th className="p-2">Status</th><th className="p-2">Tanggal</th><th className="p-2">Diubah Oleh</th><th className="p-2">Deskripsi</th></tr></thead><tbody>{[["1", "Disetujui", "27-09-2026", "Arya", ""], ["2", "Diajukan", "27-09-2026", "Arya", ""]].map((row) => <tr key={row[0]} className="border border-slate-200">{row.map((cell) => <td key={cell + row[0]} className="p-2">{cell}</td>)}</tr>)}</tbody></table></div>
    </main>
  </div>;
}
