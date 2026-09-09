import * as React from "react";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MitraKaryaPendaftaranAnggota() {
  const [name, setName] = React.useState("");
  const [identityNumber, setIdentityNumber] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Pendaftaran anggota disimpan (prototype)", {
      description: `${name || "Data anggota"} siap diproses.`,
    });
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] rounded-[5px] bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur md:p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
          <UserPlus className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Pendaftaran Anggota</h1>
          <p className="text-sm text-slate-600">Tambahkan data calon anggota Koperasi Mitra Karya.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 grid max-w-2xl gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Nama Anggota
          <Input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Masukkan nama anggota" className="h-10 rounded-xl" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Nomor Identitas
          <Input required value={identityNumber} onChange={(event) => setIdentityNumber(event.target.value)} placeholder="Masukkan nomor identitas" className="h-10 rounded-xl" />
        </label>
        <div className="flex justify-end">
          <Button type="submit" className="rounded-xl bg-violet-600 px-5 text-white hover:bg-violet-700">Simpan Pendaftaran</Button>
        </div>
      </form>
    </div>
  );
}
