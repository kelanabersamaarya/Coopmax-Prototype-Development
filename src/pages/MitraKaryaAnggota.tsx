import * as React from "react";
import { ChevronDown, ChevronUp, SquarePlus, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Member = {
  id: string;
  name: string;
  registeredAt: string;
  identity: string;
  phone: string;
  address: string;
  verified: boolean;
};

const members: Member[] = [
  { id: "A2600012", name: "M. Johan Pakpahan, Sipma", registeredAt: "08-09-2026", identity: "3201032308680002", phone: "8118989897", address: "Jl. Kp. Cikaret", verified: false },
  { id: "A2600011", name: "Neri Susilawati", registeredAt: "07-09-2026", identity: "367136511820001", phone: "81291326769", address: "Jl. Inpres IV No.16 RT.002 RW.09", verified: false },
  { id: "A2600010", name: "Sinergi Sukses Sentosa", registeredAt: "07-09-2026", identity: "5122345678900", phone: "812345678902", address: "Jl", verified: false },
  { id: "A2600009", name: "Sumber Rejeki", registeredAt: "03-09-2026", identity: "5122345678900", phone: "812345678901", address: "Jl", verified: false },
  { id: "A2600008", name: "ardina yanti", registeredAt: "28-08-2026", identity: "1222222333332222", phone: "819998762522", address: "Jakarta", verified: false },
  { id: "A2600007", name: "bmt al fath ikmi", registeredAt: "14-08-2026", identity: "512234567890", phone: "812345678900", address: "Jl", verified: false },
];

const inputClass = "h-8 rounded-[5px] border-slate-300 bg-white text-[12px] shadow-none focus-visible:ring-1 focus-visible:ring-blue-400";

export default function MitraKaryaAnggota() {
  const navigate = useNavigate();
  const location = useLocation();
  const billingArea = location.pathname.startsWith("/anggota");
  const [query, setQuery] = React.useState("");
  const [verification, setVerification] = React.useState("semua");
  const [pageSize, setPageSize] = React.useState("20");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [savedMembers, setSavedMembers] = React.useState<Member[]>([]);

  React.useEffect(() => {
    const storedMembers = localStorage.getItem("mitra-karya-members");
    if (storedMembers) setSavedMembers(JSON.parse(storedMembers));
  }, []);

  const allMembers = [...savedMembers, ...members.filter((member) => !savedMembers.some((savedMember) => savedMember.id === member.id))];
  const filteredMembers = allMembers.filter((member) => {
    const search = query.trim().toLowerCase();
    const matchesSearch = !search || [member.id, member.name, member.identity, member.phone, member.address].join(" ").toLowerCase().includes(search);
    const matchesVerification = verification === "semua" || (verification === "terverifikasi" ? member.verified : !member.verified);
    return matchesSearch && matchesVerification;
  });

  function showAddMember() {
    navigate(billingArea ? "/anggota/pendaftaran" : "/mitra-karya/anggota/pendaftaran");
  }

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / Number(pageSize)));
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * Number(pageSize), currentPage * Number(pageSize));

  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, verification, pageSize]);

  return (
    <div className="min-h-[calc(100vh-3rem)] px-3 py-4 text-[#08265a] sm:px-6 sm:py-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[21px] font-semibold tracking-tight">Anggota <span className="font-normal">Daftar</span></h1>
        <Button onClick={showAddMember} className="h-10 self-start rounded-full bg-white px-5 text-[13px] font-medium text-[#34527d] shadow-[0_3px_14px_rgba(50,70,110,0.08)] hover:bg-blue-50 sm:self-auto">
          <SquarePlus className="mr-2 h-[17px] w-[17px]" strokeWidth={1.8} /> Tambah
        </Button>
      </div>

      <section className="mt-5 overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_4px_22px_rgba(49,65,105,0.06)] sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-1.5 text-[13px] text-slate-700">
            Tampilkan
            <Select value={pageSize} onValueChange={setPageSize}>
              <SelectTrigger className="h-7 w-[46px] rounded-[5px] border-slate-300 px-2 text-[12px] shadow-none"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent>
            </Select>
            entri
          </label>
        </div>

        <div className="overflow-x-auto pb-2">
          <table className="w-full min-w-[1060px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="text-[12px] font-bold uppercase text-[#092961]">
                <th className="w-14 px-3 pb-2">No.</th>
                <th className="w-[115px] px-3 pb-2"><span className="flex items-center justify-between gap-2">ID <span className="inline-flex shrink-0 flex-col text-[#082f60]"><ChevronUp className="h-3.5 w-3.5" strokeWidth={3} /><ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={3} /></span></span></th>
                <th className="w-[175px] px-3 pb-2"><span className="flex items-center justify-between gap-2">Nama <span className="inline-flex shrink-0 flex-col text-[#082f60]"><ChevronUp className="h-3.5 w-3.5" strokeWidth={3} /><ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={3} /></span></span></th>
                <th className="w-[125px] bg-[#eef1f6] px-3 pb-2"><span className="flex items-center justify-between gap-2">Tgl Daftar <span className="inline-flex shrink-0 flex-col text-[#082f60]"><ChevronUp className="h-3.5 w-3.5" strokeWidth={3} /><ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={3} /></span></span></th>
                <th className="w-[150px] px-3 pb-2"><span className="flex items-center justify-between gap-2">No. Identitas <span className="inline-flex shrink-0 flex-col text-[#082f60]"><ChevronUp className="h-3.5 w-3.5" strokeWidth={3} /><ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={3} /></span></span></th>
                <th className="w-[175px] px-3 pb-2"><span className="flex items-center justify-between gap-2">No. Telp/Handphone <span className="inline-flex shrink-0 flex-col text-[#082f60]"><ChevronUp className="h-3.5 w-3.5" strokeWidth={3} /><ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={3} /></span></span></th>
                <th className="w-[165px] px-3 pb-2"><span className="flex items-center justify-between gap-2">Alamat <span className="inline-flex shrink-0 flex-col text-[#082f60]"><ChevronUp className="h-3.5 w-3.5" strokeWidth={3} /><ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={3} /></span></span></th>
                <th className="w-[155px] px-3 pb-2"><span className="flex items-center justify-between gap-2">Status Verifikasi KTP <span className="inline-flex shrink-0 flex-col text-[#082f60]"><ChevronUp className="h-3.5 w-3.5" strokeWidth={3} /><ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={3} /></span></span></th>
                <th className="w-[95px] px-3 pb-2"><span className="flex items-center justify-between gap-2">Status <span className="inline-flex shrink-0 flex-col text-[#082f60]"><ChevronUp className="h-3.5 w-3.5" strokeWidth={3} /><ChevronDown className="-mt-1 h-3.5 w-3.5" strokeWidth={3} /></span></span></th>
              </tr>
              <tr className="border-b border-slate-300">
                {["", "", "", "", "", "", ""].map((_, index) => <th key={index} className="px-3 pb-2"><Input value={index === 1 || index === 2 ? query : ""} onChange={index === 1 || index === 2 ? (event) => setQuery(event.target.value) : undefined} className={inputClass} /></th>)}
                <th className="px-3 pb-2"><Select value={verification} onValueChange={setVerification}><SelectTrigger className={cn(inputClass, "w-full px-2")}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="semua">-- Semua --</SelectItem><SelectItem value="terverifikasi">Terverifikasi</SelectItem><SelectItem value="belum">Belum Terverifikasi</SelectItem></SelectContent></Select></th>
                <th className="px-3 pb-2"><Select defaultValue="semua"><SelectTrigger className={cn(inputClass, "w-full px-2")}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="semua">-- Semua --</SelectItem><SelectItem value="aktif">Aktif</SelectItem></SelectContent></Select></th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member, index) => <tr key={member.id} onClick={() => navigate(`${billingArea ? "/anggota" : "/mitra-karya/anggota"}/${member.id}`)} className="cursor-pointer border-b border-slate-300 text-[#08265a] hover:bg-blue-50/40">
                <td className="px-3 py-2.5">{index + 1}</td><td className="px-3 py-2.5 text-[#155eef]">{member.id}</td><td className="px-3 py-2.5 capitalize">{member.name}</td><td className="bg-[#f1f3f7] px-3 py-2.5">{member.registeredAt}</td><td className="px-3 py-2.5">{member.identity}</td><td className="px-3 py-2.5">{member.phone}</td><td className="px-3 py-2.5 uppercase">{member.address}</td><td className="px-3 py-2.5"><span className="inline-flex items-center gap-1.5 rounded-[5px] bg-red-100 px-2 py-1 text-[9px] font-medium text-red-700"><span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-white"><X className="h-3 w-3" strokeWidth={3} /></span>{member.verified ? "TERVERIFIKASI" : "BELUM TERVERIFIKASI"}</span></td><td className="px-3 py-2.5"><span className="rounded-[5px] bg-green-600 px-1.5 py-1 text-[10px] font-bold text-white">Aktif</span></td>
              </tr>)}
              {filteredMembers.length === 0 && <tr><td colSpan={9} className="py-10 text-center text-slate-500">Data anggota tidak ditemukan.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-col gap-3 pt-3 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Menampilkan {filteredMembers.length ? (currentPage - 1) * Number(pageSize) + 1 : 0} sampai {Math.min(currentPage * Number(pageSize), filteredMembers.length)} dari {filteredMembers.length} entri</span>
          <div className="flex items-center gap-1">
            <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="h-8 rounded-[5px] bg-slate-100 px-3 text-slate-300 disabled:cursor-not-allowed">Sebelumnya</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} type="button" onClick={() => setCurrentPage(page)} className={cn("h-8 min-w-8 rounded-[5px] px-2", currentPage === page ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700")}>{page}</button>)}
            <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="h-8 rounded-[5px] bg-slate-100 px-3 text-slate-700 disabled:cursor-not-allowed disabled:text-slate-300">Selanjutnya</button>
          </div>
        </div>
      </section>
    </div>
  );
}
