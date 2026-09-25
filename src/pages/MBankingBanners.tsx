import { Eye, Pencil, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const banners = [
  { name: "Selamat Hari Suci Galungan dan Kuningan", start: "24-09-2026", end: "24-09-2026", active: true },
  { name: "Selamat Hari Raya Nyepi", start: "24-09-2026", end: "30-09-2026", active: true },
  { name: "Selamat Hari Raya Galungan", start: "10-06-2025", end: "30-06-2025", active: false },
  { name: "Selamat Hari Raya", start: "01-10-2022", end: "14-10-2022", active: true },
  { name: "Promo Deposito Seru", start: "11-06-2025", end: "30-06-2025", active: true },
  { name: "Hari raya", start: "24-09-2026", end: "24-09-2026", active: true },
  { name: "Galungan", start: "24-09-2026", end: "30-09-2026", active: true },
];

const headerClass = "px-2.5 py-2 text-left text-[12px] font-bold uppercase tracking-wide text-[#102d58]";

export default function MBankingBanners() {
  return (
    <div className="min-h-screen bg-[#f4f6fc] px-4 py-6 text-[#102d58] md:px-8 md:py-8">
      <div className="flex items-center justify-between gap-4 px-1">
        <h1 className="text-[22px] font-semibold tracking-tight">
          Banner <span className="font-normal">Daftar</span>
        </h1>
        <Button className="h-10 rounded-full bg-white px-5 text-[13px] font-medium text-[#526784] shadow-sm hover:bg-slate-50">
          <Plus className="mr-2 h-4 w-4" />
          Tambah
        </Button>
      </div>

      <section className="mt-8 min-h-[515px] rounded-[22px] bg-white px-5 py-6 shadow-[0_5px_24px_rgba(58,77,126,0.04)] md:px-6">
        <div className="mb-4 flex items-center text-[13px] text-slate-800">
          Tampilkan
          <select className="mx-1 h-7 rounded border border-slate-300 bg-white px-1 text-[13px] text-slate-900">
            <option>20</option>
          </select>
          entri
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] table-fixed border-collapse text-[12px]">
            <colgroup>
              <col className="w-[5%]" />
              <col className="w-[27%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[8%]" />
            </colgroup>
            <thead>
              <tr className="bg-white">
                <th className={headerClass}>No.</th>
                <th className={cn(headerClass, "bg-[#eef0f4]")}>Nama Banner <span className="float-right">⌄</span></th>
                <th className={headerClass}>Tanggal Banner <span className="float-right">↕</span></th>
                <th className={headerClass}>Tanggal Kadaluarsa <span className="float-right">↕</span></th>
                <th className={headerClass}>Status <span className="float-right">↕</span></th>
                <th className={headerClass}>Aksi <span className="float-right">↕</span></th>
              </tr>
              <tr className="border-b border-slate-300">
                <th />
                <th className="px-2.5 py-2"><Input className="h-8 text-[12px]" /></th>
                <th className="px-2.5 py-2"><div className="flex h-8 overflow-hidden rounded border border-slate-300"><Input className="h-full min-w-0 flex-1 rounded-none border-0 text-[12px] shadow-none focus-visible:ring-0" /><button className="w-8 bg-[#8494af] text-white">×</button></div></th>
                <th className="px-2.5 py-2"><div className="flex h-8 overflow-hidden rounded border border-slate-300"><Input className="h-full min-w-0 flex-1 rounded-none border-0 text-[12px] shadow-none focus-visible:ring-0" /><button className="w-8 bg-[#8494af] text-white">×</button></div></th>
                <th className="px-2.5 py-2"><select className="h-8 w-full rounded border border-slate-300 bg-white px-2 text-[12px] text-slate-500"><option>-- Semua --</option></select></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr key={banner.name} className="border-b border-[#cbd5e1] text-[#123664]">
                  <td className="px-1 py-2">{index + 1}</td>
                  <td className="bg-[#f0f1f4] px-2.5 py-2">{banner.name}</td>
                  <td className="px-2.5 py-2">{banner.start}</td>
                  <td className="px-2.5 py-2">{banner.end}</td>
                  <td className="px-2.5 py-2"><span className={cn("rounded px-1.5 py-1 text-[10px] font-bold text-white", banner.active ? "bg-green-600" : "bg-red-500")}>{banner.active ? "Aktif" : "Tidak Aktif"}</span></td>
                  <td className="px-2.5 py-2"><div className="flex items-center gap-2 text-blue-600"><Eye className="h-4 w-4" /><Pencil className="h-4 w-4" /><X className="h-4 w-4 rounded-full fill-red-500 text-white" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-[13px] text-slate-700">
          <span>Menampilkan 1 sampai 7 dari 7 entri</span>
          <div className="flex items-center"><button className="bg-[#eef1f5] px-3 py-2 text-slate-300">Sebelumnya</button><button className="bg-violet-600 px-3 py-2 text-white">1</button><button className="bg-[#eef1f5] px-3 py-2 text-slate-300">Selanjutnya</button></div>
        </div>
      </section>
    </div>
  );
}
