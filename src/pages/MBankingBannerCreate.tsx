import { useState } from "react";
import { AlignLeft, Bold, Code2, HelpCircle, Image, Link, List, ListOrdered, Maximize, Plus, Save, Strikethrough, Table2, Underline, Video, WandSparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const toolbarButtons = [
  { label: "Format", icon: WandSparkles, dropdown: true },
  { label: "Tebal", icon: Bold },
  { label: "Garis bawah", icon: Underline },
  { label: "Coret", icon: Strikethrough },
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

export default function MBankingBannerCreate() {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [content, setContent] = useState("");

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
            <div className="flex h-[52px] flex-nowrap items-center overflow-hidden border-b border-[#d4d4d4] bg-[#f5f5f5] px-1.5 py-1">
              {toolbarButtons.map(({ label, icon: Icon, accent, dropdown }, index) => (
                <button key={label} type="button" aria-label={label} className={`flex h-[40px] shrink-0 items-center justify-center gap-1 text-[#16385d] hover:bg-[#fafafa] ${index === 0 ? "mr-1 min-w-[72px] rounded-md border border-[#cfd7e2] bg-white px-3" : index === 1 ? "min-w-[52px] rounded-l-[11px] border border-[#d6dce5] bg-white px-2" : index === 2 ? "min-w-[52px] border-y border-r border-[#d6dce5] bg-white px-2" : index === 3 ? "min-w-[72px] rounded-r-[11px] border-y border-r border-[#d6dce5] bg-white px-2" : index === 4 ? "min-w-[58px] rounded-[10px] border border-[#d6dce5] bg-white px-1.5" : index === 5 ? "min-w-[52px] rounded-l-[11px] border border-[#d6dce5] bg-white px-2" : index === 6 ? "min-w-[52px] border-y border-r border-[#d6dce5] bg-white px-2" : index === 7 ? "min-w-[92px] rounded-r-[11px] border-y border-r border-[#d6dce5] bg-white px-2" : index === 8 ? "min-w-[92px] rounded-[11px] border border-[#d6dce5] bg-white px-2" : index === 9 ? "min-w-[52px] rounded-l-[11px] border border-[#d6dce5] bg-white px-2" : index === 10 ? "min-w-[52px] border-y border-r border-[#d6dce5] bg-white px-2" : index === 11 ? "min-w-[52px] rounded-r-[11px] border-y border-r border-[#d6dce5] bg-white px-2" : "min-w-[42px] border-r border-[#d6dce5] px-2"}`}>
                  <Icon className={accent ? "h-[17px] w-[17px] rounded-sm bg-yellow-300 p-0.5 text-black" : "h-[17px] w-[17px]"} strokeWidth={2} />
                  {dropdown && <span className="text-[10px] leading-none">⌄</span>}
                </button>
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
