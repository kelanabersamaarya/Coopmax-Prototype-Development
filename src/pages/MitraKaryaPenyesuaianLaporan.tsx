import * as React from "react";
import { PlusSquare, Eye, Pencil, X, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Report = {
  basis: string;
  title: string;
  total: "Tampilkan" | "Tidak";
  signature: "Tampilkan" | "Tidak";
  main: "Tampilkan" | "Tidak";
};

const reports: Report[] = [
  ["Laporan Rekening Tabungan", "Tes Laporan"],
  ["Laporan Rekening Tabungan", "Laporan Rekening Tabungan (Informasi NIK)"],
  ["Laporan Rekening Tabungan", "Laporan Rekening Tabungan"],
  ["Laporan Anggota", "Laporan Anggota jk"],
  ["Laporan Anggota", "Laporan Anggota"],
  ["Laporan Transaksi Pinjaman", "Laporan Transaksi Pinjaman (Kolektor)"],
  ["Laporan Rekening Pinjaman", "Laporan Rekening Pinjaman + Agunan (New)"],
  ["Laporan Rekening Pinjaman", "Laporan Rekening Pinjaman - Nilai Taksasi"],
  ["Laporan Rekening Pinjaman", "Test Laporan Rekening Pinjaman - Administrasi Pinjaman Anggota"],
  ["Laporan Rekening Pinjaman", "Test Laporan Rekening Pinjaman - Sektor Pinjaman"],
  ["Laporan Rekening Pinjaman", "Laporan Rekening Pinjaman - sektor pinjaman"],
  ["Laporan Rekening Pinjaman", "Laporan Rekening Pinjaman - Basis Laporan"],
  ["Laporan Rekening Pinjaman", "Laporan Rekening Pinjaman Jatuh Tempo"],
  ["Laporan Rekening Pinjaman", "Laporan Rekening Pinjaman & Agunan"],
  ["Laporan Rekening Pinjaman", "Laporan Rekening Pinjaman - RA"],
  ["Laporan Rekening Deposito", "Tes Laporan Deposito"],
  ["Laporan Rekening Deposito", "Laporan SIJAKOP"],
  ["Laporan Rekening Deposito", "Laporan Transaksi Deposito (Informasi NIK)"],
].map(([basis, title]) => ({ basis, title, total: "Tampilkan", signature: "Tampilkan", main: "Tidak" }));

const selectClass = "h-8 rounded-[4px] border-slate-300 bg-white text-[13px] text-slate-700 shadow-none focus:ring-0";

function SortLabel({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-2"><span>{children}</span><span className="flex flex-col leading-none"><ChevronUp className="h-3 w-3" /><ChevronDown className="-mt-1 h-3 w-3" /></span></div>;
}

function StatusBadge({ value }: { value: Report["total"] }) {
  return <span className={cn("inline-flex rounded-[3px] px-1.5 py-1 text-[10px] font-bold leading-none text-white", value === "Tampilkan" ? "bg-[#28a900]" : "bg-[#e8324b]")}>{value}</span>;
}

export default function MitraKaryaPenyesuaianLaporan() {
  const [basis, setBasis] = React.useState("Semua");
  const [title, setTitle] = React.useState("");
  const [total, setTotal] = React.useState("Semua");
  const [signature, setSignature] = React.useState("Semua");
  const [main, setMain] = React.useState("Semua");

  const filtered = reports.filter((report) =>
    (basis === "Semua" || report.basis === basis) &&
    (!title || report.title.toLowerCase().includes(title.toLowerCase())) &&
    (total === "Semua" || report.total === total) &&
    (signature === "Semua" || report.signature === signature) &&
    (main === "Semua" || report.main === main),
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))] px-1 py-7 md:px-4 md:py-8">
      <div className="flex items-center justify-between px-5">
        <h1 className="text-[22px] font-medium text-[#002060]"><strong>Penyesuaian Laporan</strong> <span className="text-[16px]">Daftar</span></h1>
        <button type="button" className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[14px] text-[#52658a] shadow-sm transition hover:text-violet-600 hover:shadow-md"><PlusSquare className="h-[18px] w-[18px] text-[#52658a]" strokeWidth={2.5} />Tambah</button>
      </div>

      <Card className="mt-8 rounded-[22px] border-0 bg-white p-5 shadow-sm md:p-5">
        <div className="mb-3 flex items-center gap-1 text-[13px] text-[#002060]">Tampilkan
          <Select defaultValue="20"><SelectTrigger className="ml-1 h-7 w-[44px] rounded-none border-[#8994a5] px-1 text-[13px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="20">20</SelectItem><SelectItem value="10">10</SelectItem></SelectContent></Select>
          entri
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-[12px] text-[#002060] [&_tbody_td:nth-child(2)]:bg-[#e9edf2]">
            <thead>
              <tr className="bg-white text-[12px] font-bold uppercase tracking-wide">
                <th className="w-[70px] px-2 py-2 text-left">No.</th>
                <th className="w-[280px] bg-[#e9edf2] px-2 py-2 text-left"><SortLabel>Basis Laporan</SortLabel></th>
                <th className="w-[280px] px-2 py-2 text-left"><SortLabel>Judul Laporan</SortLabel></th>
                <th className="w-[145px] px-2 py-2 text-left"><SortLabel>Total Laporan</SortLabel></th>
                <th className="w-[145px] px-2 py-2 text-left"><SortLabel>Tanda Tangan</SortLabel></th>
                <th className="w-[145px] px-2 py-2 text-left"><SortLabel>Laporan Utama</SortLabel></th>
                <th className="px-2 py-2 text-left">Aksi</th>
              </tr>
              <tr className="border-b border-slate-300">
                <th />
                <th className="bg-white px-2 py-2"><Select value={basis} onValueChange={setBasis}><SelectTrigger className={selectClass}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Semua">-- Semua --</SelectItem>{[...new Set(reports.map((r) => r.basis))].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></th>
                <th className="px-2 py-2"><Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-8 rounded-[4px] border-slate-300 text-[13px] shadow-none focus-visible:ring-0" /></th>
                {[[total, setTotal], [signature, setSignature], [main, setMain]].map(([value, setter], index) => <th className="px-2 py-2" key={index}><Select value={value as string} onValueChange={setter as (value: string) => void}><SelectTrigger className={selectClass}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Semua">-- Semua --</SelectItem><SelectItem value="Tampilkan">Tampilkan</SelectItem><SelectItem value="Tidak">Tidak</SelectItem></SelectContent></Select></th>)}
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((report, index) => <tr className="border-b border-slate-300" key={`${report.title}-${index}`}><td className="px-2 py-2">{index + 1}</td><td className="px-2 py-2">{report.basis}</td><td className="px-2 py-2 leading-tight">{report.title}</td><td className="px-2 py-2"><StatusBadge value={report.total} /></td><td className="px-2 py-2"><StatusBadge value={report.signature} /></td><td className="px-2 py-2"><StatusBadge value={report.main} /></td><td className="px-2 py-2"><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-amber-500" /><Eye className="h-4 w-4 text-slate-500" /><Pencil className="h-4 w-4 text-blue-500" /><X className="h-4 w-4 rounded-full bg-[#e8324b] p-0.5 text-white" /></div></td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex flex-col gap-3 text-[13px] text-[#002060] md:flex-row md:items-center md:justify-between"><span>Menampilkan {filtered.length ? 1 : 0} sampai {filtered.length} dari {filtered.length} entri</span><div className="flex items-center gap-1"><button className="h-8 rounded-l bg-slate-100 px-3 text-slate-300">Sebelumnya</button><button className="h-8 w-8 bg-[#5843f5] text-white">1</button><button className="h-8 rounded-r bg-slate-100 px-3 text-slate-300">Selanjutnya</button></div></div>
      </Card>
    </div>
  );
}
