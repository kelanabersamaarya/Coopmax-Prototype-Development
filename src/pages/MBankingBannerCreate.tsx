import { useState } from "react";
import { AlignLeft, Bold, HelpCircle, Image, Italic, Link, List, ListOrdered, Maximize, Plus, Save, Strikethrough, Table2, Underline, Video, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const toolbarButtons = [
  { label: "Format", icon: Italic },
  { label: "Tebal", icon: Bold },
  { label: "Garis bawah", icon: Underline },
  { label: "Coret", icon: Strikethrough },
  { label: "Daftar", icon: List },
  { label: "Daftar bernomor", icon: ListOrdered },
  { label: "Rata kiri", icon: AlignLeft },
  { label: "Tabel", icon: Table2 },
  { label: "Tautan", icon: Link },
  { label: "Gambar", icon: Image },
  { label: "Video", icon: Video },
  { label: "Layar penuh", icon: Maximize },
  { label: "Kode", icon: Italic },
  { label: "Bantuan", icon: HelpCircle },
];

export default function MBankingBannerCreate() {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);

  return (
    <div className="min-h-screen bg-[#f4f6fc] px-4 py-6 text-[#062c63] md:px-8 md:py-8">
      <h1 className="px-1 text-[22px] font-semibold tracking-tight">Banner <span className="text-[16px] font-normal">Tambah</span></h1>

      <section className="mt-8 rounded-[22px] bg-white px-5 py-7 shadow-[0_5px_24px_rgba(58,77,126,0.04)] md:px-12 md:py-8">
        <div className="grid gap-x-8 gap-y-2 md:grid-cols-[170px_minmax(0,1fr)]">
          <label htmlFor="banner-name" className="pt-1 text-[13px]">Nama Banner<span className="text-red-600">*</span></label>
          <Input id="banner-name" className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-400" />

          <label htmlFor="banner-date" className="pt-1 text-[13px]">Tanggal Banner<span className="text-red-600">*</span></label>
          <Input id="banner-date" placeholder="dd-mm-yyyy" className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none placeholder:text-[#8494af] focus-visible:ring-1 focus-visible:ring-blue-400" />

          <label htmlFor="banner-expiry" className="pt-1 text-[13px]">Tanggal Kadaluarsa</label>
          <Input id="banner-expiry" placeholder="dd-mm-yyyy" className="h-8 rounded border-[#c7d3e4] text-[13px] shadow-none placeholder:text-[#8494af] focus-visible:ring-1 focus-visible:ring-blue-400" />

          <label className="pt-1 text-[13px]">Konten<span className="text-red-600">*</span></label>
          <div className="overflow-hidden rounded border border-[#c7d3e4]">
            <div className="flex flex-wrap border-b border-[#d4d4d4] bg-[#f5f5f5] p-1">
              {toolbarButtons.map(({ label, icon: Icon }, index) => (
                <button key={label} type="button" aria-label={label} className={`flex h-9 min-w-[40px] items-center justify-center gap-1 border-r border-[#d6dce5] px-2 text-[#1d3858] hover:bg-white ${index === 0 ? "rounded-l-md" : ""}`}>
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                  {(index === 0 || index === 6 || index === 7) && <span className="text-[10px]">⌄</span>}
                </button>
              ))}
            </div>
            <div className="h-[135px] bg-white" />
            <div className="h-2 border-t border-[#d4d4d4] bg-[#f5f5f5]" />
          </div>

          <label className="pt-1 text-[13px]">Status<span className="text-red-600">*</span></label>
          <button type="button" aria-pressed={active} onClick={() => setActive((value) => !value)} className={`flex h-[26px] w-[62px] items-center rounded-full p-1 text-[10px] font-bold text-white transition-colors ${active ? "bg-[#5b42f5]" : "bg-[#9aa7ba]"}`}>
            <span className="pl-1">{active ? "ON" : "OFF"}</span><span className="ml-auto h-[18px] w-[18px] rounded-full bg-white" />
          </button>
        </div>

        <div className="mt-9 flex items-center justify-between gap-4">
          <h2 className="text-[21px] font-medium">Gambar Banner <span className="text-[16px]">Daftar</span></h2>
          <Button type="button" className="h-8 rounded-md bg-[#3768f5] px-4 text-[13px] font-medium text-white hover:bg-[#2e58d8]"><Plus className="mr-1 h-4 w-4" />Tambah Gambar</Button>
        </div>

        <div className="mt-10 flex justify-end gap-1">
          <Button type="button" onClick={() => navigate("/mobile/mbanking-banners")} className="h-10 rounded-md bg-[#8494af] px-5 text-[13px] font-semibold text-white hover:bg-[#6f7f9a]"><X className="mr-1 h-3 w-3" />Batalkan</Button>
          <Button type="button" className="h-10 rounded-md bg-[#31b900] px-5 text-[13px] font-semibold text-white hover:bg-[#279b00]"><Save className="mr-1 h-3 w-3" />Simpan</Button>
        </div>
      </section>
    </div>
  );
}
