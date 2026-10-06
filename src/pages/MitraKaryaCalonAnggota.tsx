import * as React from "react";
import { ChevronDown, ChevronUp, SquarePlus, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Candidate = { id: string; name: string; registeredAt: string; identity: string; phone: string; address: string; verified: boolean };
const candidates: Candidate[] = [
  { id: "CA2600012", name: "M. Johan Pakpahan, Sipma", registeredAt: "08-09-2026", identity: "3201032308680002", phone: "8118989897", address: "Jl. Kp. Cikaret", verified: false },
  { id: "CA2600011", name: "Neri Susilawati", registeredAt: "07-09-2026", identity: "367136511820001", phone: "81291326769", address: "Jl. Inpres IV No.16 RT.002 RW.09", verified: false },
];
const inputClass = "h-8 rounded-[5px] border-slate-300 bg-white text-[12px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-400";
const headers = ["ID", "Nama", "Tgl Daftar", "No. Identitas", "No. Telp/Handphone", "Alamat", "Status Verifikasi KTP", "Status"];

export default function MitraKaryaCalonAnggota() {
  const navigate = useNavigate();
  const location = useLocation();
  const billingArea = location.pathname.startsWith("/anggota");
  const [query, setQuery] = React.useState("");
  const [verification, setVerification] = React.useState("semua");
  const [pageSize, setPageSize] = React.useState("20");
  const [page, setPage] = React.useState(1);
  const [saved, setSaved] = React.useState<Candidate[]>([]);
  React.useEffect(() => { try { setSaved(JSON.parse(localStorage.getItem("mitra-karya-calon-anggota") || "[]")); } catch { setSaved([]); } }, []);
  const all = [...saved, ...candidates.filter((item) => !saved.some((savedItem) => savedItem.id === item.id))];
  const filtered = all.filter((item) => { const search = query.trim().toLowerCase(); const matchesSearch = !search || [item.id, item.name, item.identity, item.phone, item.address].join(" ").toLowerCase().includes(search); const matchesVerification = verification === "semua" || (verification === "terverifikasi" ? item.verified : !item.verified); return matchesSearch && matchesVerification; });
  const totalPages = Math.max(1, Math.ceil(filtered.length / Number(pageSize)));
  const visible = filtered.slice((page - 1) * Number(pageSize), page * Number(pageSize));
  React.useEffect(() => setPage(1), [query, verification, pageSize]);
  return <div className="min-h-[calc(100vh-3rem)] px-3 py-4 text-[#08265a] sm:px-6 sm:py-7">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><h1 className="text-[21px] font-semibold tracking-tight">Calon Anggota <span className="font-normal">Daftar</span></h1><Button onClick={() => navigate(billingArea ? "/anggota/calon-anggota/pendaftaran" : "/mitra-karya/calon-anggota/pendaftaran")} className="h-10 self-start rounded-full bg-white px-5 text-[13px] font-medium text-[#34527d] shadow-[0_3px_14px_rgba(50,70,110,0.08)] hover:bg-blue-50 sm:self-auto"><SquarePlus className="mr-2 h-[17px] w-[17px]" strokeWidth={1.8} />Tambah</Button></div>
    <section className="mt-5 overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_4px_22px_rgba(49,65,105,0.06)] sm:p-5"><div className="mb-4 flex items-center gap-2 text-[13px] text-slate-700">Tampilkan <Select value={pageSize} onValueChange={setPageSize}><SelectTrigger className="h-7 w-[46px] rounded-[5px] border-slate-300 px-2 text-[12px] shadow-none"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent></Select> entri</div>
      <div className="overflow-x-auto pb-2"><table className="w-full min-w-[1060px] border-collapse text-left text-[12px]"><thead><tr className="text-[12px] font-bold uppercase text-[#092961]"><th className="w-14 px-3 pb-2">No.</th>{headers.map((header) => <th key={header} className="px-3 pb-2"><span className="flex items-center justify-between gap-2">{header}<span className="inline-flex shrink-0 flex-col"><ChevronUp className="h-3.5 w-3.5" strokeWidth={3}/><ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={3}/></span></span></th>)}</tr><tr className="border-b border-slate-300"><th />{headers.map((header, index) => <th key={header} className="px-3 pb-2">{index === 6 ? <Select value={verification} onValueChange={setVerification}><SelectTrigger className={cn(inputClass, "w-full px-2")}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="semua">-- Semua --</SelectItem><SelectItem value="terverifikasi">Terverifikasi</SelectItem><SelectItem value="belum">Belum Terverifikasi</SelectItem></SelectContent></Select> : <Input value={index < 2 ? query : ""} onChange={index < 2 ? (event) => setQuery(event.target.value) : undefined} className={inputClass}/>}</th>)}</tr></thead><tbody>{visible.map((item, index) => <tr key={item.id} onClick={() => navigate(`/mitra-karya/calon-anggota/${item.id}`)} className="cursor-pointer border-b border-slate-300 hover:bg-blue-50/40"><td className="px-3 py-2.5">{(page - 1) * Number(pageSize) + index + 1}</td><td className="px-3 py-2.5 text-[#155eef]">{item.id}</td><td className="px-3 py-2.5">{item.name}</td><td className="bg-[#f1f3f7] px-3 py-2.5">{item.registeredAt}</td><td className="px-3 py-2.5">{item.identity}</td><td className="px-3 py-2.5">{item.phone}</td><td className="px-3 py-2.5 uppercase">{item.address}</td><td className="px-3 py-2.5"><span className="inline-flex items-center gap-1.5 rounded-[5px] bg-red-100 px-2 py-1 text-[9px] font-medium text-red-700"><span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white"><X className="h-3 w-3" strokeWidth={3}/></span>{item.verified ? "TERVERIFIKASI" : "BELUM TERVERIFIKASI"}</span></td><td className="px-3 py-2.5"><span className="rounded-[5px] bg-green-600 px-1.5 py-1 text-[10px] font-bold text-white">Aktif</span></td></tr>)}{!visible.length && <tr><td colSpan={9} className="py-10 text-center text-slate-500">Data calon anggota tidak ditemukan.</td></tr>}</tbody></table></div>
      <div className="mt-3 flex flex-col gap-3 pt-3 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Menampilkan {filtered.length ? (page - 1) * Number(pageSize) + 1 : 0} sampai {Math.min(page * Number(pageSize), filtered.length)} dari {filtered.length} entri</span><div className="flex items-center gap-1"><button disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="h-8 rounded-[5px] bg-slate-100 px-3 disabled:text-slate-300">Sebelumnya</button>{Array.from({length: totalPages}, (_, index) => index + 1).map((value) => <button key={value} onClick={() => setPage(value)} className={cn("h-8 min-w-8 rounded-[5px] px-2", page === value ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700")}>{value}</button>)}<button disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="h-8 rounded-[5px] bg-slate-100 px-3 disabled:text-slate-300">Selanjutnya</button></div></div>
    </section></div>;
}
