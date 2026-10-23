import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, GripVertical, List, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SavingsTogglePill from "@/components/savings/products/SavingsTogglePill";

const productOptions = ["Simpanan Sukarela - Penampung Pendapatan Bunga", "Simpanan Pokok", "Simpanan Wajib", "Simpanan Program", "tabungan", "Mandiri Tabungan Rupiah- Bank Mandiri", "TabunganKu - Bank BPD Bali"];
const transactionOptions = ["Pilih Jenis Transaksi", "Transaksi Bunga Simpanan", "Transaksi Biaya Admin Simpanan"];
const periodOptions = ["Pilih Periode Proses", "Bulan Berikutnya", "Bulan Berlangsung"];
const interestPeriodOptions = ["Pilih Periode Proses", "Harian", "Bulan Berikutnya", "Bulan Berlangsung"];
const dateOptions = ["Pilih Tanggal Proses", ...Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, "0"))];
const timeOptions = ["Pilih Waktu Proses", "03:00", "20:00"];

function CustomSelect({ options, searchable = true }: { options: string[]; searchable?: boolean }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholder = options[0];
  const choices = options.slice(1);
  const filteredOptions = useMemo(() => choices.filter((option) => option.toLowerCase().includes(search.toLowerCase())), [choices, search]);

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return <div ref={containerRef} className="relative">
    <button type="button" onClick={() => setOpen((current) => !current)} className="relative flex h-10 w-full items-center justify-between rounded-[4px] border border-[#b8c8df] bg-white px-3 text-left text-[13px] font-normal text-[#536b91] outline-none focus:border-[#b8c8df] focus:ring-0"><span className={`truncate ${value ? "pl-7" : ""}`}>{value || placeholder}</span>{value && <span role="button" tabIndex={0} aria-label={`Hapus pilihan ${value}`} onClick={(event) => { event.stopPropagation(); setValue(""); setSearch(""); setOpen(false); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setValue(""); setSearch(""); setOpen(false); } }} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#f00000] hover:bg-[#fff0f0]" title="Hapus pilihan"><X className="h-4 w-4 stroke-[3]" /></span>}<ChevronDown className={`h-4 w-4 shrink-0 text-[#7b8ba5] transition-transform ${open ? "rotate-180" : ""}`} /></button>
    {open && <div className="absolute left-0 right-0 top-[43px] z-30 border border-[#c9d4e5] bg-white p-1 shadow-[0_4px_10px_rgba(25,50,90,0.12)]">{searchable && <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="" aria-label="Cari pilihan" className="mb-1 h-8 w-full rounded-[2px] border border-[#17243d] px-2 text-[13px] text-[#173b79] outline-none" />}<div className="max-h-[210px] overflow-y-auto">{filteredOptions.map((option) => <button type="button" key={option} onClick={() => { setValue(option); setOpen(false); setSearch(""); }} className="block w-full px-2 py-1.5 text-left text-[13px] text-[#003b83] hover:bg-[#635bff] hover:text-white">{option}</button>)}</div></div>}
  </div>;
}

function ProcessSection({ title, children, enabled, onToggle }: { title: string; children: ReactNode; enabled: boolean; onToggle: (value: boolean) => void }) {
  return <section className="border-b border-[#d8e1ef] py-5 last:border-b-0"><div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-start"><label className="pt-2 text-[13px] font-normal leading-5 text-[#003b83]">{title}</label><div className="min-w-0"><SavingsTogglePill checked={enabled} onChange={onToggle} />{enabled && <div className="process-fields mt-3 grid w-full gap-3 md:-ml-[193px] md:w-[calc(100%+193px)]">{children}</div>}</div></div></section>;
}

export default function JadwalBungaSimpananEdit() {
  const navigate = useNavigate();
  const [interestEnabled, setInterestEnabled] = useState(false);
  const [adminEnabled, setAdminEnabled] = useState(false);
  const [mobileEnabled, setMobileEnabled] = useState(false);
  const [mainOnly, setMainOnly] = useState(false);
  const [status, setStatus] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(["Bunga Simpanan", "Biaya Admin", "Admin M-Banking"]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveProcessingItem = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    setProcessingOrder((current) => {
      const next = [...current];
      const [draggedItem] = next.splice(draggedIndex, 1);
      next.splice(targetIndex, 0, draggedItem);
      return next;
    });
    setDraggedIndex(null);
  };

  return <main className="min-h-screen bg-[#f5f7fe] px-4 py-8 text-[#003b83] md:px-10 lg:px-12">
    <header className="mb-8 flex items-baseline gap-2"><h1 className="text-[21px] font-bold text-[#002b68]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1><span className="text-[14px]">Tambah</span></header>
    <form onSubmit={(event) => { event.preventDefault(); navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis"); }} className="rounded-[22px] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(20,50,100,0.06)] md:px-12 md:py-7">
      <div className="grid gap-5 border-b border-[#d8e1ef] pb-5 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Produk Simpanan<span className="text-red-500">*</span></label><CustomSelect options={["Pilih Produk Simpanan", ...productOptions]} searchable /></div>
      <ProcessSection title="Proses Bunga Otomatis" enabled={interestEnabled} onToggle={setInterestEnabled}><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Jenis Transaksi Proses Bunga Otomatis<span className="text-red-500">*</span></label><CustomSelect options={transactionOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Periode Proses Bunga Otomatis<span className="text-red-500">*</span></label><CustomSelect options={interestPeriodOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Tanggal Proses Bunga Otomatis<span className="text-red-500">*</span></label><CustomSelect options={dateOptions} /></div></ProcessSection>
      <ProcessSection title="Proses Biaya Admin Otomatis" enabled={adminEnabled} onToggle={setAdminEnabled}><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Jenis Transaksi Biaya Admin Otomatis<span className="text-red-500">*</span></label><CustomSelect options={transactionOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Periode Proses Biaya Admin Otomatis<span className="text-red-500">*</span></label><CustomSelect options={periodOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Tanggal Proses Biaya Admin Otomatis<span className="text-red-500">*</span></label><CustomSelect options={dateOptions} /></div></ProcessSection>
      <ProcessSection title="Proses Biaya Admin M-Banking Otomatis" enabled={mobileEnabled} onToggle={setMobileEnabled}><div className="flex items-center gap-4"><label className="w-[180px] text-[13px]">Hanya Tabungan Utama</label><SavingsTogglePill checked={mainOnly} onChange={setMainOnly} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Jenis Transaksi Biaya Admin M-Banking Otomatis<span className="text-red-500">*</span></label><CustomSelect options={transactionOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Periode Proses Biaya Admin M-Banking Otomatis<span className="text-red-500">*</span></label><CustomSelect options={periodOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Tanggal Proses Biaya Admin M-Banking Otomatis<span className="text-red-500">*</span></label><CustomSelect options={dateOptions} /></div></ProcessSection>
      <div className="space-y-5 py-5"><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-start"><label className="pt-2 text-[13px]">Urutan Pemrosesan<span className="text-red-500">*</span></label><div className="rounded-[9px] border border-[#d0dceb] bg-[#f8faff] p-2">{processingOrder.map((item, index) => <div key={item} draggable onDragStart={() => setDraggedIndex(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => moveProcessingItem(index)} onDragEnd={() => setDraggedIndex(null)} className={`mb-2 flex h-11 cursor-grab items-center gap-2 rounded-[7px] border border-[#d0dceb] bg-white px-2 text-[13px] last:mb-0 active:cursor-grabbing ${draggedIndex === index ? "opacity-50" : ""}`}><GripVertical className="h-4 w-4 shrink-0 text-[#91a1bb]" /><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#635bff] font-bold text-white">{index + 1}</span>{item}</div>)}</div></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Waktu<span className="text-red-500">*</span></label><CustomSelect options={timeOptions} /></div><div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center"><label className="text-[13px]">Status</label><SavingsTogglePill checked={status} onChange={setStatus} /></div></div>
      <div className="mt-8 flex justify-end gap-2"><button type="button" onClick={() => navigate("/anggota/simpanan/jadwal-bunga-admin-otomatis")} className="inline-flex h-10 items-center gap-2 rounded-[7px] bg-[#8397b8] px-5 text-[13px] text-white"><List className="h-4 w-4" />Kembali</button><button type="submit" className="inline-flex h-10 items-center gap-2 rounded-[7px] bg-[#12a900] px-5 text-[13px] font-medium text-white"><Check className="h-4 w-4" />Simpan</button></div>
    </form>
  </main>;
}
