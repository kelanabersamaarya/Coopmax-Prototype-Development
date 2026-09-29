import { List, Pencil } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-[190px_1fr] gap-2 text-[13px] leading-8"><span className="text-[#7184a5]">{label}</span><span className="font-medium text-[#06255a]">: {value}</span></div>;
}

export default function MitraKaryaAnggotaDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isCandidate = location.pathname.startsWith("/mitra-karya/calon-anggota");
  const basePath = isCandidate ? "/mitra-karya/calon-anggota" : "/mitra-karya/anggota";
  const storageKey = isCandidate ? "mitra-karya-calon-anggota" : "mitra-karya-members";
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]").find((member: { id: string }) => member.id === id);
  const member = saved || { id: id || "A2600016", name: "Made Jaya" };
  const title = isCandidate ? "Calon Anggota" : "Anggota";

  return <div className="min-h-screen bg-[#f7f8fd] px-4 py-6 text-[#06255a] sm:px-8 lg:px-9">
    <h1 className="text-[21px] font-semibold">{title} <span className="font-normal">Detail</span></h1>
    <div className="mt-7 flex flex-wrap gap-2">
      <Button onClick={() => navigate(basePath)} className="rounded-full bg-white text-[#526b92] shadow-sm hover:bg-violet-600 hover:text-white"><List className="mr-2 h-4 w-4" />Kembali ke Daftar</Button>
      <Button onClick={() => navigate(`${basePath}/${member.id}/ubah`)} className="rounded-full bg-white text-[#526b92] shadow-sm hover:bg-violet-600 hover:text-white"><Pencil className="mr-2 h-4 w-4" />Ubah</Button>
    </div>
    <main className="mt-5 rounded-[20px] bg-white p-5 shadow-[0_4px_22px_rgba(49,65,105,0.06)] sm:p-6">
      <h2 className="text-[15px] font-bold uppercase">Informasi {title}</h2>
      <div className="mt-4 grid gap-x-12 lg:grid-cols-2">
        <div><InfoRow label="ID" value={member.id} /><InfoRow label="Nama" value={member.name} /><InfoRow label="Kategori Anggota" value={isCandidate ? "Calon Anggota" : "Anggota"} /><InfoRow label="Tanggal Daftar" value={member.registeredAt || ""} /><InfoRow label="Alamat" value={member.address || ""} /></div>
        <div><InfoRow label="No. Identitas" value={member.identity || ""} /><InfoRow label="No. Telp/Handphone" value={member.phone || ""} /><InfoRow label="Status" value="Aktif" /></div>
      </div>
    </main>
  </div>;
}
