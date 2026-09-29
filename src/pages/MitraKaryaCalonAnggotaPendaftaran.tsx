import * as React from "react";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function MitraKaryaCalonAnggotaPendaftaran() {
  const navigate = useNavigate();
  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const items = JSON.parse(localStorage.getItem("mitra-karya-calon-anggota") || "[]");
    const item = { id: `CA${Date.now().toString().slice(-7)}`, name: form.get("name") || "Calon Anggota Baru", registeredAt: form.get("registeredAt") || "", identity: form.get("identity") || "", phone: form.get("phone") || "", address: form.get("address") || "", verified: false };
    localStorage.setItem("mitra-karya-calon-anggota", JSON.stringify([item, ...items]));
    navigate("/mitra-karya/calon-anggota");
  }
  return <div className="min-h-screen px-3 py-5 text-[#002060] sm:px-8"><h1 className="text-[22px] font-semibold">Calon Anggota <span className="font-normal">Tambah</span></h1><form onSubmit={save} className="mt-8 max-w-3xl space-y-4 rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(45,68,110,0.06)]"><label className="block text-sm font-medium">Nama<Input name="name" required className="mt-1" /></label><label className="block text-sm font-medium">Tanggal Daftar<Input name="registeredAt" placeholder="11-09-2026" required className="mt-1" /></label><label className="block text-sm font-medium">No. Identitas<Input name="identity" required className="mt-1" /></label><label className="block text-sm font-medium">No. Telp/Handphone<Input name="phone" required className="mt-1" /></label><label className="block text-sm font-medium">Alamat<Textarea name="address" className="mt-1" /></label><div className="flex justify-end gap-2 pt-4"><Button type="button" onClick={() => navigate("/mitra-karya/calon-anggota")} className="bg-[#7d8eaa]"><X className="mr-1 h-4 w-4" />Batalkan</Button><Button type="submit" className="bg-[#2db900]"><Check className="mr-1 h-4 w-4" />Simpan</Button></div></form></div>;
}
