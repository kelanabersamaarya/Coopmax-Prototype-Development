import { useEffect, useRef, useState } from "react";
import { AlignLeft, Bold, CheckSquare, ChevronLeft, ChevronRight, Code2, Eraser, HelpCircle, Image, Link, List, ListOrdered, Maximize, Plus, Table2, Trash2, Underline, Video, WandSparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const toolbarButtons = [
  { label: "Format", icon: WandSparkles, dropdown: true },
  { label: "Tebal", icon: Bold },
  { label: "Garis bawah", icon: Underline },
  { label: "Hapus format", icon: Eraser },
  { label: "Warna teks", icon: WandSparkles, accent: true, dropdown: true },
  { label: "Daftar", icon: List },
  { label: "Daftar bernomor", icon: ListOrdered },
  { label: "Rata kiri", icon: AlignLeft, dropdown: true },
  { label: "Tabel", icon: Table2, dropdown: true },
  { label: "Tautan", icon: Link },
  { label: "Gambar", icon: Image },
  { label: "Video", icon: Video },
  { label: "Layar penuh", icon: Maximize },
  { label: "Kode", icon: Code2 },
  { label: "Bantuan", icon: HelpCircle },
];

const toolbarGroups = [[0], [1, 2, 3], [4], [5, 6, 7], [8], [9, 10, 11], [12, 13, 14]];

const calendarDays = [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

function DateCalendar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(2026);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(year, month, 1));

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return (
    <div ref={calendarRef} className="relative">
      <Input
        value={value}
        placeholder="mm/dd/yyyy"
        onFocus={() => setOpen(true)}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 rounded border-[#c7d3e4] px-2 text-[13px] text-[#8494a8] shadow-none focus-visible:ring-1 focus-visible:ring-blue-400"
      />
      {open && <div className="absolute left-0 top-9 z-20 w-[308px] rounded border border-[#cbd2dc] bg-white p-2.5 shadow-lg">
        <div className="mb-2 flex h-7 items-center justify-between rounded bg-[#eeeeee] px-1 text-[#142b50]">
          <button type="button" onClick={() => setMonth((current) => current === 0 ? 11 : current - 1)} className="flex h-6 w-6 items-center justify-center rounded bg-[#3d3d3d] text-white"><ChevronLeft className="h-3.5 w-3.5" /></button>
          <select value={month} onChange={(event) => setMonth(Number(event.target.value))} className="h-6 bg-white px-1 text-[13px] font-medium outline-none">{Array.from({ length: 12 }, (_, index) => <option key={index} value={index}>{new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(2026, index, 1))}</option>)}</select>
          <select value={year} onChange={(event) => setYear(Number(event.target.value))} className="h-6 bg-white px-1 text-[13px] font-medium outline-none"><option>2026</option><option>2027</option></select>
          <button type="button" onClick={() => setMonth((current) => current === 11 ? 0 : current + 1)} className="flex h-6 w-6 items-center justify-center rounded bg-[#3d3d3d] text-white"><ChevronRight className="h-3.5 w-3.5" /></button>
        </div>
        <div className="grid grid-cols-7 text-center text-[12px] font-bold text-[#405273]">{["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((day) => <span key={day} className="py-1">{day}</span>)}</div>
        <div className="grid grid-cols-7 gap-px bg-white">{calendarDays.map((day, index) => <button key={`${month}-${year}-${index}`} type="button" disabled={!day} onClick={() => { if (day) { onChange(`${String(month + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`); setOpen(false); } }} className={`h-8 text-[12px] ${day === 25 ? "bg-[#fffef0] text-[#6f5cff]" : day ? "bg-[#f0f1f2] text-[#18345c] hover:bg-[#dce7f8]" : "bg-white"}`}>{day}</button>)}</div>
      </div>}
    </div>
  );
}

export default function MBankingBannerCreate() {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [content, setContent] = useState("");
  const [bannerDate, setBannerDate] = useState("");
  const [bannerImages, setBannerImages] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [expiryDate, setExpiryDate] = useState("");

  return (
    <div className="min-h-screen bg-[#f4f6fc] px-4 py-6 text-[#062c63] md:px-8 md:py-8">
      <h1 className="px-1 text-[22px] font-semibold tracking-tight">Banner <span className="text-[16px] font-normal">Tambah</span></h1>

      <section className="mt-8 rounded-[22px] bg-white px-5 py-7 shadow-[0_5px_24px_rgba(58,77,126,0.04)] md:px-12 md:py-8">
        <div className="grid gap-x-8 gap-y-2 md:grid-cols-[170px_minmax(0,1fr)]">
          <label htmlFor="banner-name" className="pt-1 text-[13px]">Nama Banner<span className="text-red-600">*</span></label>
          <Input id="banner-name" className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-400" />

          <label htmlFor="banner-date" className="pt-1 text-[13px]">Tanggal Banner<span className="text-red-600">*</span></label>
          <DateCalendar value={bannerDate} onChange={setBannerDate} />

          <label htmlFor="banner-expiry" className="pt-1 text-[13px]">Tanggal Kadaluarsa</label>
          <DateCalendar value={expiryDate} onChange={setExpiryDate} />

          <label className="pt-1 text-[13px]">Konten<span className="text-red-600">*</span></label>
          <div className="overflow-hidden rounded border border-[#c7d3e4]">
            <div className="flex h-[52px] flex-nowrap items-center gap-1 overflow-hidden border-b border-[#d4d4d4] bg-[#f5f5f5] px-1.5 py-1">
              {toolbarGroups.map((group, groupIndex) => (
                <div key={groupIndex} className={`flex shrink-0 overflow-hidden rounded-[9px] border border-[#d6dce5] bg-white ${groupIndex === 5 ? "min-w-[76px]" : ""}`}>
                  {group.map((index) => {
                    const { label, icon: Icon, accent, dropdown } = toolbarButtons[index];
                    return (
                      <button key={label} type="button" aria-label={label} className={`flex h-[40px] shrink-0 items-center justify-center gap-1 border-r border-[#d6dce5] px-1 text-[#16385d] last:border-r-0 hover:bg-[#fafafa] ${groupIndex === 5 ? "min-w-[38px] px-0" : "min-w-[42px]"}`}>
                        {index === 14 ? <span className="text-[27px] font-bold leading-none text-[#16385d]">?</span> : <Icon className={index === 1 ? "h-[17px] w-[17px] text-[#16385d]" : index === 2 ? "h-[17px] w-[17px] text-[#16385d]" : index === 3 ? "h-[18px] w-[18px] rotate-[15deg] text-[#16385d]" : index === 9 ? "h-[17px] w-[17px] rotate-[45deg] text-[#16385d]" : index === 11 ? "h-[18px] w-[18px] -scale-x-100 fill-[#16385d] text-[#16385d]" : accent ? "h-[15px] w-[15px] rounded-sm bg-yellow-300 p-0.5 text-black" : "h-[17px] w-[17px]"} strokeWidth={index === 1 || index === 2 ? 3 : index === 3 ? 2.4 : index === 5 || index === 6 || index === 7 ? 2.6 : index === 9 ? 3 : 2} />}
                        {dropdown && index === 8 ? <><span className="text-[10px] leading-none">▼</span><span className="text-[10px] leading-none">▼</span></> : dropdown && <span className="text-[9px] leading-none">⌄</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              aria-label="Konten banner"
              className="h-[135px] w-full resize-none border-0 bg-white p-3 text-[13px] text-[#1d3858] outline-none"
            />
            <div className="h-2 border-t border-[#d4d4d4] bg-[#f5f5f5]" />
          </div>

          <label className="pt-1 text-[13px]">Status<span className="text-red-600">*</span></label>
          <button type="button" aria-pressed={active} onClick={() => setActive((value) => !value)} className={`flex h-[26px] w-[62px] items-center rounded-full p-1 text-[10px] font-bold text-white transition-colors ${active ? "bg-[#5b42f5]" : "bg-[#9f91ef]"}`}>
            {active ? <><span className="pl-1">ON</span><span className="ml-auto h-[18px] w-[18px] rounded-full bg-white" /></> : <><span className="h-[18px] w-[18px] rounded-full bg-white" /><span className="ml-auto pr-1">OFF</span></>}
          </button>
        </div>

        <div className="mt-9 flex items-center justify-between gap-4">
          <h2 className="text-[21px] font-medium">Gambar Banner <span className="text-[16px]">Daftar</span></h2>
          <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(event) => setBannerImages(Array.from(event.target.files ?? []))} />
          <Button type="button" onClick={() => imageInputRef.current?.click()} className="h-8 rounded-md bg-[#3768f5] px-4 text-[13px] font-medium text-white hover:bg-[#2e58d8]"><Plus className="mr-1 h-4 w-4" />Tambah Gambar</Button>
        </div>
        {bannerImages.length > 0 && <div className="mt-3 border-t border-[#d5ddeb] pt-2"><div className="flex items-start gap-4"><div className="flex flex-wrap gap-4">{bannerImages.map((file) => <img key={`${file.name}-${file.lastModified}`} src={URL.createObjectURL(file)} alt={file.name} className="h-[130px] w-[104px] object-cover" />)}</div><button type="button" aria-label="Hapus gambar" onClick={() => setBannerImages([])} className="mt-[48px] ml-auto mr-[180px] flex h-8 w-11 items-center justify-center rounded-md bg-[#df3048] text-white hover:bg-[#c62239]"><Trash2 className="h-4 w-4" /></button></div></div>}

        <div className="mt-10 flex justify-end gap-1">
          <Button type="button" onClick={() => navigate("/mobile/mbanking-banners")} className="h-10 rounded-md bg-[#8494af] px-5 text-[13px] font-semibold text-white hover:bg-[#6f7f9a]"><X className="mr-1 h-3 w-3" />Batalkan</Button>
          <Button type="button" className="h-10 rounded-md bg-[#31b900] px-5 text-[13px] font-semibold text-white hover:bg-[#279b00]"><CheckSquare className="mr-1 h-4 w-4" strokeWidth={3} />Simpan</Button>
        </div>
      </section>
    </div>
  );
}
