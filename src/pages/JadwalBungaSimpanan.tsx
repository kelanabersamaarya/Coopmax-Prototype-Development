import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, CircleX, Eye, Pencil, Plus, Save, Undo2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const savingsProducts = [
  "Simpanan Sukarela - Penampung Pendapatan Bunga",
  "Simpanan Pokok",
  "Simpanan Wajib",
  "Simpanan Program",
  "tabungan",
  "Mandiri Tabungan Rupiah- Bank Mandiri",
  "TabunganKu - Bank BPD Bali",
  "SIMPEDA - BANK BPD BALI",
];

const schedules = [
  { product: "tabungan", period: "Bulan Berikutnya", next: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "SIMPEDA - BANK BPD BALI", period: "Bulan Berikutnya", next: "21-11-2026 03:00:00", status: "Aktif" },
  { product: "Simpanan Wajib", period: "Bulan Berlangsung", next: "21-11-2026 20:00:00", status: "Aktif" },
  { product: "Simpanan Sukarela - Penampung Pendapatan Bunga", period: "Bulan Berlangsung", next: "19-11-2026 00:00:00", status: "Aktif" },
  { product: "Simpanan Pokok", period: "Bulan Berlangsung", next: "01-11-2026 03:00:00", status: "Aktif" },
];

function ProductDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filteredProducts = savingsProducts.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="flex h-8 w-full items-center justify-between rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-left text-[13px] text-black outline-none">
        {value ? <><X className="h-3 w-3 shrink-0 text-[#ef3340]" onClick={(event) => { event.stopPropagation(); setValue(""); }} /><span className="min-w-0 flex-1 truncate pl-2 text-black">{value}</span></> : <span className="flex-1 text-[#6980a4]">Pilih Produk Simpanan</span>}
        <ChevronDown className="h-4 w-4 shrink-0 text-[#6d7d96]" />
      </button>
      {open && <div className="absolute left-0 top-10 z-20 w-full rounded-[3px] border border-[#cbd4e2] bg-white p-1 shadow-[0_4px_12px_rgba(25,44,80,0.16)]">
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="" className="mb-1 h-8 w-full rounded-[3px] border-2 border-[#1c1c1c] px-2 text-[13px] text-black outline-none" />
        <div role="listbox" className="max-h-[210px] overflow-y-auto">
          {filteredProducts.map((item) => <button type="button" role="option" aria-selected={value === item} key={item} onClick={() => { setValue(item); setOpen(false); setQuery(""); }} className="flex w-full items-center justify-between px-2 py-1.5 text-left text-[13px] text-[#002b68] hover:bg-[#5942f5] hover:text-white"><span>{item}</span></button>)}
          {!filteredProducts.length && <div className="px-2 py-3 text-[13px] text-[#6980a4]">Produk tidak ditemukan</div>}
        </div>
      </div>}
    </div>
  );
}

function PeriodDropdown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = ["Bulan Berlangsung", "Bulan Berikutnya"];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="flex h-8 w-full items-center justify-between rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-left text-[13px] outline-none">
        {value ? <><X className="h-3 w-3 shrink-0 text-[#ef3340]" onClick={(event) => { event.stopPropagation(); setValue(""); }} /><span className="flex-1 pl-2 text-black">{value}</span></> : <span className="flex-1 text-[#6980a4]">Pilih Periode Proses</span>}
        <ChevronDown className="h-4 w-4 shrink-0 text-[#6d7d96]" />
      </button>
      {open && <div className="absolute left-0 top-10 z-20 w-full rounded-[3px] border border-[#cbd4e2] bg-white p-1 shadow-[0_4px_12px_rgba(25,44,80,0.16)]">
        <input autoFocus className="mb-1 h-8 w-full rounded-[3px] border-2 border-[#1c1c1c] px-2 text-[13px] text-black outline-none" />
        <div role="listbox">
          {options.map((item) => <button type="button" role="option" key={item} onClick={() => { setValue(item); setOpen(false); }} className="flex w-full px-2 py-1.5 text-left text-[13px] text-[#002b68] hover:bg-[#5942f5] hover:text-white">{item}</button>)}
        </div>
      </div>}
    </div>
  );
}

function ClearableSelect({ id, placeholder, options, clearable = true }: { id: string; placeholder: string; options: string[]; clearable?: boolean }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="flex h-8 w-full items-center justify-between rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-left text-[13px] outline-none">
        {value && clearable ? <><span role="button" tabIndex={0} aria-label={`Hapus ${placeholder}`} onClick={(event) => { event.stopPropagation(); setValue(""); }} className="shrink-0 cursor-pointer text-[16px] leading-none text-[#ef3340]">×</span><span className="flex-1 truncate pl-2 text-black">{value}</span></> : <span className={`flex-1 truncate ${value ? "text-black" : "text-[#6980a4]"}`}>{value || placeholder}</span>}
        <ChevronDown className="h-4 w-4 shrink-0 text-[#6d7d96]" />
      </button>
      {open && <div className="absolute left-0 top-10 z-20 w-full rounded-[3px] border border-[#cbd4e2] bg-white p-1 shadow-[0_4px_12px_rgba(25,44,80,0.16)]">
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="mb-1 h-8 w-full rounded-[3px] border-2 border-[#1c1c1c] px-2 text-[13px] text-black outline-none" />
        <div role="listbox" className="max-h-[210px] overflow-y-auto">
          {filteredOptions.map((option) => <button type="button" role="option" key={option} onClick={() => { setValue(option); setOpen(false); setQuery(""); }} className="flex w-full px-2 py-1.5 text-left text-[13px] text-[#002b68] hover:bg-[#5942f5] hover:text-white">{option}</button>)}
          {!filteredOptions.length && <div className="px-2 py-3 text-[13px] text-[#6980a4]">Pilihan tidak ditemukan</div>}
        </div>
      </div>}
    </div>
  );
}

function ProcessToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="contents">
      <span className="text-[13px] text-[#002b68]">{label}</span>
      <button type="button" role="switch" aria-checked={checked} onClick={onChange} className={`inline-flex w-[62px] items-center rounded-full py-1 text-[10px] font-semibold text-white transition-colors ${checked ? "bg-[#6047ff]" : "bg-[#9b92ee]"}`}>
        <span className={`flex-1 text-center ${checked ? "order-1" : "order-2"}`}>{checked ? "ON" : "OFF"}</span>
        <span className={`h-5 w-5 shrink-0 rounded-full bg-white transition-transform ${checked ? "order-2 -translate-x-1" : "order-1 translate-x-1"}`} />
      </button>
    </div>
  );
}

function AddScheduleForm({ onBack }: { onBack: () => void }) {
  const [isActive, setIsActive] = useState(true);
  const [processInterest, setProcessInterest] = useState(false);
  const [processAdmin, setProcessAdmin] = useState(false);
  const [processMobileAdmin, setProcessMobileAdmin] = useState(false);
  const [onlyMainSavings, setOnlyMainSavings] = useState(false);
  return (
    <div className="min-h-screen bg-[#f6f7fc] px-4 py-7 text-[#102a5c] md:px-10 md:py-8">
      <div className="flex items-baseline gap-2"><h1 className="text-[21px] font-medium tracking-[-0.02em] text-[#00245f] md:text-[22px]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1><span className="text-[15px] text-[#173b70]">Tambah</span></div>
      <Card className="mt-8 rounded-[22px] border-0 bg-white px-6 py-7 shadow-[0_2px_12px_rgba(39,67,116,0.025)] md:px-12 md:py-8">
        <div className="grid gap-3 md:grid-cols-[185px_minmax(0,1fr)] md:items-center md:gap-x-2">
          <label htmlFor="product" className="text-[13px] text-[#002b68]">Produk Simpanan<span className="text-red-600">*</span></label><ProductDropdown />
          <ProcessToggle label="Proses Bunga Otomatis" checked={processInterest} onChange={() => setProcessInterest((value) => !value)} />
          <ProcessToggle label="Proses Biaya Admin Otomatis" checked={processAdmin} onChange={() => setProcessAdmin((value) => !value)} />
          <ProcessToggle label="Proses Biaya Admin M-Banking Otomatis" checked={processMobileAdmin} onChange={() => setProcessMobileAdmin((value) => !value)} />
          {processMobileAdmin && <ProcessToggle label="Hanya Tabungan Utama" checked={onlyMainSavings} onChange={() => setOnlyMainSavings((value) => !value)} />}
          <label htmlFor="period" className="text-[13px] text-[#002b68]">Periode<span className="text-red-600">*</span></label><PeriodDropdown />
          <label htmlFor="date" className="text-[13px] text-[#002b68]">Tanggal<span className="text-red-600">*</span></label><ClearableSelect id="date" placeholder="Pilih Tanggal Proses" options={Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, "0"))} />
          <label htmlFor="time" className="text-[13px] text-[#002b68]">Waktu<span className="text-red-600">*</span></label><ClearableSelect id="time" placeholder="Pilih Waktu Proses" options={["03:00", "20:00"]} clearable={false} />
          {processInterest && <><label htmlFor="interest-transaction" className="text-[13px] text-[#002b68]">Jenis Transaksi Proses Bunga Otomatis<span className="text-red-600">*</span></label><ClearableSelect id="interest-transaction" placeholder="Pilih Jenis Transaksi Proses Bunga Otomatis" options={["Transaksi Setoran Simpanan", "Transaksi Bunga Simpanan"]} /></>}
          {processAdmin && <><label htmlFor="admin-transaction" className="text-[13px] text-[#002b68]">Jenis Transaksi Biaya Admin Otomatis<span className="text-red-600">*</span></label><ClearableSelect id="admin-transaction" placeholder="Pilih Jenis Transaksi Biaya Admin Otomatis" options={["Transaksi Biaya Admin Simpanan", "Transaksi Biaya Admin M-Banking"]} /></>}
          <span className="text-[13px] text-[#002b68]">Status</span><button type="button" role="switch" aria-checked={isActive} onClick={() => setIsActive((active) => !active)} className={`inline-flex w-[62px] items-center rounded-full py-1 text-[10px] font-semibold text-white transition-colors ${isActive ? "bg-[#6047ff]" : "bg-[#9b92ee]"}`}><span className={`flex-1 text-center ${isActive ? "order-1" : "order-2"}`}>{isActive ? "ON" : "OFF"}</span><span className={`h-5 w-5 shrink-0 rounded-full bg-white transition-transform ${isActive ? "order-2 -translate-x-1" : "order-1 translate-x-1"}`} /></button>
        </div>
        <div className="mt-6 flex justify-end gap-2"><Button type="button" onClick={onBack} className="h-10 rounded-[7px] bg-[#8292ae] px-4 text-[14px] text-white hover:bg-[#71829f]"><Undo2 className="h-3.5 w-3.5" />Kembali</Button><Button type="button" className="h-10 rounded-[7px] bg-[#18ad00] px-5 text-[14px] text-white hover:bg-[#139600]"><Save className="h-3.5 w-3.5" />Simpan</Button></div>
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
  return <div className="min-h-screen bg-[#f6f7fc] px-4 py-7 text-[#102a5c] md:px-10 md:py-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-baseline gap-2"><h1 className="text-[21px] font-medium tracking-[-0.02em] text-[#00245f] md:text-[22px]">Jadwal Bunga Simpanan dan Biaya Admin Otomatis</h1><span className="text-[15px] text-[#173b70]">Daftar</span></div><Button onClick={() => setShowAdd(true)} className="h-9 w-fit gap-2 rounded-full bg-white px-4 text-[14px] font-normal text-[#38547c] shadow-[0_5px_18px_rgba(38,70,125,0.08)] hover:bg-white"><Plus className="h-4 w-4 text-[#5071a5]" strokeWidth={2.5} />Tambah</Button></div><Card className="mt-6 rounded-[22px] border-0 bg-white px-5 py-5 shadow-[0_2px_12px_rgba(39,67,116,0.025)] md:px-5"><div className="mb-4 flex items-center gap-1 text-[13px] text-[#163765]">Tampilkan <select className="h-6 rounded border border-[#8494ad] bg-white px-1 text-[13px]" defaultValue="20"><option>20</option><option>50</option><option>100</option></select> entri</div><div className="overflow-x-auto"><table className="w-full min-w-[920px] border-collapse text-left text-[12px] text-[#173765]"><thead><tr className="h-9 border-b border-[#c7d1e2] text-[12px] font-semibold uppercase tracking-[0.03em] text-[#002b68]"><th className="w-[60px] px-2">No.</th><th className="w-[245px] bg-[#e9edf3] px-2">Produk</th><th className="w-[245px] px-2">Periode</th><th className="w-[365px] px-2">Jadwal Bunga Berikutnya</th><th className="w-[180px] px-2">Status</th><th className="w-[115px] px-2">Aksi</th></tr><tr className="h-11 border-b border-[#c7d1e2]"><th /><th className="px-2"><select value={product} onChange={(event) => setProduct(event.target.value)} className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px]"><option>Semua</option>{products.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th><th className="px-2"><select value={period} onChange={(event) => setPeriod(event.target.value)} className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px]"><option>Semua</option>{periods.slice(1).map((item) => <option key={item}>{item}</option>)}</select></th><th className="px-2"><input value={nextSchedule} onChange={(event) => setNextSchedule(event.target.value)} placeholder="Masukan Jadwal" className="h-8 w-full rounded-[5px] border border-[#ccd5e4] px-3 text-[13px]" /></th><th className="px-2"><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-8 w-full rounded-[5px] border border-[#ccd5e4] bg-white px-3 text-[13px]"><option>Semua</option><option>Aktif</option><option>Nonaktif</option></select></th><th /></tr></thead><tbody>{filteredSchedules.map((item, index) => <tr key={item.product} className="border-b border-[#edf0f5]"><td className="px-2 py-1.5">{index + 1}</td><td className="bg-[#f0f1f4] px-2 py-1.5 font-medium">{item.product}</td><td className="px-2 py-1.5">{item.period}</td><td className="px-2 py-1.5">{item.next}</td><td className="px-2 py-1.5"><span className="rounded bg-[#12a900] px-1.5 py-0.5 text-[11px] font-semibold text-white">{item.status}</span></td><td className="px-2 py-1.5"><div className="flex items-center gap-2 text-[#3e6fd9]"><button type="button"><Eye className="h-4 w-4" /></button><button type="button"><Pencil className="h-4 w-4" /></button><button type="button" className="text-[#e82d4f]"><CircleX className="h-4 w-4 fill-[#e82d4f] text-white" /></button></div></td></tr>)}</tbody></table></div><div className="mt-4 flex flex-col gap-3 text-[13px] sm:flex-row sm:items-center sm:justify-between"><span>Menampilkan {filteredSchedules.length ? 1 : 0} sampai {filteredSchedules.length} dari {filteredSchedules.length} entri</span><div className="flex items-center justify-end gap-1"><Button variant="ghost" className="h-8 rounded-none bg-[#edf0f5] px-3 text-[12px] text-[#bdc6d4]">Sebelumnya</Button><Button className="h-8 rounded-none bg-[#6047f5] px-3 text-[13px] text-white hover:bg-[#6047f5]">1</Button><Button variant="ghost" className="h-8 rounded-none bg-[#edf0f5] px-3 text-[12px] text-[#bdc6d4]">Selanjutnya</Button></div></div></Card></div>;
}
