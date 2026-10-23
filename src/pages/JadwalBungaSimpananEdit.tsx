import { useState } from "react";
import { Check, ChevronDown, GripVertical, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SavingsTogglePill from "@/components/savings/products/SavingsTogglePill";

const productOptions = ["Pilih Produk Simpanan", "Tabungan Simpanan Utama", "Simpanan Sukarela"];
const transactionOptions = ["Pilih Jenis Transaksi", "Transaksi Bunga Simpanan", "Transaksi Biaya Admin Simpanan"];
const periodOptions = ["Pilih Periode Proses", "Bulan Berikutnya", "Bulan Berlangsung"];
const dateOptions = ["Pilih Tanggal Proses", "01", "21", "Akhir Bulan"];
const timeOptions = ["Pilih Waktu Proses", "03:00", "20:00"];

function SelectField({ options }: { options: string[] }) {
  return <div className="relative"><select defaultValue={options[0]} className="h-10 w-full appearance-none rounded-[4px] border border-[#b8c8df] bg-white px-3 text-[13px] font-normal text-[#536b91] outline-none focus:border-[#635bff]">{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#7b8ba5]" /></div>;
}

function ProcessSection({ title, children, enabled, onToggle }: { title: string; children: React.ReactNode; enabled: boolean; onToggle: (value: boolean) => void }) {
  return <section className="border-b border-[#d8e1ef] py-5 last:border-b-0"><div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-start"><label className="pt-2 text-[13px] font-normal leading-5 text-[#003b83]">{title}</label><div className="min-w-0"><SavingsTogglePill checked={enabled} onChange={onToggle} />{enabled && <div className="process-fields mt-3 grid w-full gap-3 md:pl-0">{children}</div>}</div></div></section>;
}

export default function JadwalBungaSimpananEdit() {
  const navigate = useNavigate();
  const [interestEnabled, setInterestEnabled] = useState(false);
  const [adminEnabled, setAdminEnabled] = useState(false);
  const [mobileEnabled, setMobileEnabled] = useState(false);
  const [mainOnly, setMainOnly] = useState(false);
  const [status, setStatus] = useState(false);

  return <main className="min-h-screen bg-[#f5f7fe] px-4 py-8 text-[#003b83] md:px-10 lg:px-12">
    <header className="mb-8 flex items-baseline gap-2"><h1 className="text-[21px] font-bold text-[#002b68]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1><span className="text-[14px]">Tambah</span></header>
    <form onSubmit={(event) => { event.preventDefault(); navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis"); }} className="rounded-[22px] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(20,50,100,0.06)] md:px-12 md:py-7">
      <div className="grid gap-5 border-b border-[#d8e1ef] pb-5 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Produk Simpanan<span className="text-red-500">*</span></label><SelectField options={productOptions} /></div>
      <ProcessSection title="Proses Bunga Otomatis" enabled={interestEnabled} onToggle={setInterestEnabled}><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Jenis Transaksi Proses Bunga Otomatis<span className="text-red-500">*</span></label><SelectField options={transactionOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Periode Proses Bunga Otomatis<span className="text-red-500">*</span></label><SelectField options={periodOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Tanggal Proses Bunga Otomatis<span className="text-red-500">*</span></label><SelectField options={dateOptions} /></div></ProcessSection>
      <ProcessSection title="Proses Biaya Admin Otomatis" enabled={adminEnabled} onToggle={setAdminEnabled}><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Jenis Transaksi Biaya Admin Otomatis<span className="text-red-500">*</span></label><SelectField options={transactionOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Periode Proses Biaya Admin Otomatis<span className="text-red-500">*</span></label><SelectField options={periodOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Tanggal Proses Biaya Admin Otomatis<span className="text-red-500">*</span></label><SelectField options={dateOptions} /></div></ProcessSection>
      <ProcessSection title="Proses Biaya Admin M-Banking Otomatis" enabled={mobileEnabled} onToggle={setMobileEnabled}><div className="flex items-center gap-4"><label className="w-[180px] text-[13px]">Hanya Tabungan Utama</label><SavingsTogglePill checked={mainOnly} onChange={setMainOnly} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Jenis Transaksi Biaya Admin M-Banking Otomatis<span className="text-red-500">*</span></label><SelectField options={transactionOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Periode Proses Biaya Admin M-Banking Otomatis<span className="text-red-500">*</span></label><SelectField options={periodOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Tanggal Proses Biaya Admin M-Banking Otomatis<span className="text-red-500">*</span></label><SelectField options={dateOptions} /></div></ProcessSection>
      <div className="grid gap-3 border-b border-[#d8e1ef] py-5 md:grid-cols-[180px_1fr] md:items-start"><label className="pt-2 text-[13px]">Urutan Pemrosesan<span className="text-red-500">*</span></label><div className="rounded-[9px] border border-[#d0dceb] bg-[#f8faff] p-2">{["Bunga Simpanan", "Biaya Admin", "Admin M-Banking"].map((item, index) => <div key={item} className="mb-2 flex h-11 items-center gap-2 rounded-[7px] border border-[#d0dceb] bg-white px-2 text-[13px] last:mb-0"><GripVertical className="h-4 w-4 text-[#91a1bb]" /><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#635bff] font-bold text-white">{index + 1}</span>{item}</div>)}</div></div>
      <div className="grid gap-3 py-5 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Waktu<span className="text-red-500">*</span></label><SelectField options={timeOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Status</label><SavingsTogglePill checked={status} onChange={setStatus} /></div>
      <div className="mt-8 flex justify-end gap-2"><button type="button" onClick={() => navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis")} className="inline-flex h-10 items-center gap-2 rounded-[7px] bg-[#8397b8] px-5 text-[13px] text-white"><List className="h-4 w-4" />Kembali</button><button type="submit" className="inline-flex h-10 items-center gap-2 rounded-[7px] bg-[#12a900] px-5 text-[13px] font-medium text-white"><Check className="h-4 w-4" />Simpan</button></div>
    </form>
  </main>;
}
