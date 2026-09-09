import * as React from "react";
import { ArrowLeft, Check, ChevronDown, RefreshCw, Search, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const fieldClass = "h-8 rounded-[5px] border-[#c8d2e3] bg-white text-[13px] text-[#536b91] shadow-none focus-visible:ring-1 focus-visible:ring-violet-400";
const selectClass = "h-8 rounded-[5px] border-[#c8d2e3] bg-white text-[13px] text-[#7890b2] shadow-none focus:ring-0";

function Label({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return <label className="text-[13px] font-medium text-[#002060]">{children}{required ? <span className="text-red-500">*</span> : null}</label>;
}

function Row({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <div className="grid gap-2 md:grid-cols-[190px_minmax(0,1fr)] md:items-start"><Label required={required}>{label}</Label><div className="min-w-0">{children}</div></div>;
}

function SelectField({ placeholder, children }: { placeholder: string; children: React.ReactNode }) {
  return <Select><SelectTrigger className={selectClass}><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{children}</SelectContent></Select>;
}

export default function MitraKaryaPendaftaranAnggota() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Data anggota berhasil disimpan", { description: name || "Anggota baru siap diproses." });
  }

  return (
    <div className="min-h-screen px-3 py-5 text-[#002060] sm:px-6 md:px-8">
      <div className="flex items-center gap-2"><button type="button" onClick={() => navigate("/mitra-karya/anggota")} className="text-[#536b91] hover:text-violet-600"><ArrowLeft className="h-4 w-4" /></button><h1 className="text-[22px] font-semibold">Anggota <span className="font-normal">Tambah</span></h1></div>
      <div className="mt-8 flex items-center gap-10 border-b border-transparent text-[13px]"><span className="rounded-full bg-violet-600 px-4 py-3 text-white">General Information</span><span className="text-[#536b91]">Upload File</span></div>

      <form onSubmit={handleSubmit} className="mt-10 rounded-[20px] bg-white px-5 py-7 shadow-[0_4px_20px_rgba(45,68,110,0.04)] sm:px-8 md:px-12">
        <div className="grid gap-[10px]">
          <Row label="ID Anggota" required><div className="flex"><Input defaultValue="A2600016" readOnly className={`${fieldClass} rounded-r-none bg-[#e4e9f1]`} /><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2 hover:bg-[#6c7d99]"><RefreshCw className="h-4 w-4" /></Button></div></Row>
          <Row label="ID Nasabah"><div className="flex"><Input defaultValue="N2600020" readOnly className={`${fieldClass} rounded-r-none bg-[#e4e9f1]`} /><Button type="button" className="h-8 rounded-none bg-[#7d8eaa] px-2 hover:bg-[#6c7d99]"><Search className="h-4 w-4" /></Button><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2 hover:bg-[#6c7d99]"><RefreshCw className="h-4 w-4" /></Button></div></Row>
          <Row label="Tanggal Daftar" required><Input defaultValue="09-09-2026" className={fieldClass} /></Row>
          <Row label="NIP"><div><Input className={fieldClass} /><p className="mt-1 text-[11px] text-[#7890b2]">Nomor induk pegawai bersifat optional atau tidak wajib diisi</p></div></Row>
          <Row label="NIK" required><div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_272px]"><Input placeholder="Masukan NIK" className={fieldClass} /><Button type="button" className="h-8 rounded-[5px] bg-violet-600 text-[12px] text-white hover:bg-violet-700"><Sparkles className="mr-1 h-3.5 w-3.5" /> Verifikasi KTP</Button></div></Row>
          <Row label="Nama" required><Input value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} /></Row>
          <Row label="Kategori" required><SelectField placeholder="Pilih Kategori Anggota"><SelectItem value="anggota">Anggota</SelectItem><SelectItem value="calon">Calon Anggota</SelectItem></SelectField></Row>
          <Row label="Jenis Kelamin" required><div className="flex h-8 items-center gap-5 text-[13px]"><label className="flex items-center gap-1.5"><input type="radio" name="gender" defaultChecked className="accent-blue-600" /> Perempuan</label><label className="flex items-center gap-1.5"><input type="radio" name="gender" className="accent-blue-600" /> Laki - Laki</label></div></Row>
          <Row label="Tempat Lahir" required><Input className={fieldClass} /></Row>
          <Row label="Tanggal Lahir" required><Input placeholder="dd-mm-yyyy" className={fieldClass} /></Row>
          <Row label="Pekerjaan" required><SelectField placeholder="Pilih Pekerjaan"><SelectItem value="pegawai">Pegawai</SelectItem><SelectItem value="swasta">Karyawan Swasta</SelectItem></SelectField></Row>
          <Row label="Agama" required><SelectField placeholder="Pilih Agama"><SelectItem value="islam">Islam</SelectItem><SelectItem value="kristen">Kristen</SelectItem></SelectField></Row>
          <Row label="Status Pernikahan" required><SelectField placeholder="Pilih Status Pernikahan"><SelectItem value="menikah">Menikah</SelectItem><SelectItem value="belum">Belum Menikah</SelectItem></SelectField></Row>
          <Row label="Jenis Identitas" required><SelectField placeholder="Pilih Jenis Identitas"><SelectItem value="ktp">KTP</SelectItem><SelectItem value="sim">SIM</SelectItem></SelectField></Row>
          <Row label="No. Identitas" required><Input className={fieldClass} /></Row>
          <Row label="No. Telp/Handphone (+62)" required><div className="flex"><span className="inline-flex h-8 items-center rounded-l-[5px] border border-r-0 border-[#c8d2e3] bg-[#e4e9f1] px-3 text-[13px] text-[#7890b2]">+62</span><Input placeholder="Contoh. 81123456789" className={`${fieldClass} rounded-l-none`} /></div></Row>
          <Row label="Nama Gadis Ibu Kandung" required><Input className={fieldClass} /></Row>
          <Row label="Nama ahli waris" required><Input className={fieldClass} /></Row>
          <Row label="Email"><Input placeholder="Contoh. example@email.com" className={fieldClass} /></Row>
          <Row label="Wilayah"><SelectField placeholder="Pilih Wilayah"><SelectItem value="wilayah-1">Wilayah 1</SelectItem><SelectItem value="wilayah-2">Wilayah 2</SelectItem></SelectField></Row>
          <Row label="Alamat Domisili" required><Textarea className="min-h-[48px] rounded-[5px] border-[#c8d2e3] text-[13px] shadow-none focus-visible:ring-1 focus-visible:ring-violet-400" /></Row>
          <Row label="Alamat KTP" required><Textarea className="min-h-[48px] rounded-[5px] border-[#c8d2e3] text-[13px] shadow-none focus-visible:ring-1 focus-visible:ring-violet-400" /></Row>
          <Row label="Tag"><Input placeholder="Pilih tag" className={fieldClass} /></Row>
          <Row label="Unit Anggota"><SelectField placeholder="Pilih Unit Anggota"><SelectItem value="unit-1">Unit Anggota 1</SelectItem></SelectField></Row>
          <Row label="Status" required><Switch defaultChecked className="data-[state=checked]:bg-violet-600" /></Row>
        </div>

        <h2 className="mt-10 text-[22px] font-semibold">Tabungan <span className="font-normal">Tambah</span></h2>
        <div className="mt-7 grid gap-[10px]">
          <Row label="No Rekening" required><div className="flex"><Input defaultValue="P001260017" readOnly className={`${fieldClass} rounded-r-none bg-[#e4e9f1]`} /><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2 hover:bg-[#6c7d99]"><RefreshCw className="h-4 w-4" /></Button></div></Row>
          <Row label="Simpanan Pokok"><Input defaultValue="200.000,00" className={fieldClass} /></Row>
          <Row label="No Rekening" required><div className="flex"><Input defaultValue="P002260016" readOnly className={`${fieldClass} rounded-r-none bg-[#e4e9f1]`} /><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2 hover:bg-[#6c7d99]"><RefreshCw className="h-4 w-4" /></Button></div></Row>
          <Row label="Simpanan Wajib"><Input defaultValue="50.000,00" className={fieldClass} /></Row>
          <Row label="Kolektor" required><SelectField placeholder="Pilih Kolektor"><SelectItem value="kolektor-1">Kolektor 1</SelectItem></SelectField></Row>
        </div>
        <div className="mt-10 flex justify-end gap-1"><Button type="button" onClick={() => navigate("/mitra-karya/anggota")} className="rounded-[5px] bg-[#7d8eaa] text-white hover:bg-[#6c7d99]"><X className="mr-1 h-3 w-3" /> Batalkan</Button><Button type="submit" className="rounded-[5px] bg-green-600 text-white hover:bg-green-700"><Check className="mr-1 h-3 w-3" /> Simpan</Button><Button type="button" className="rounded-[5px] bg-green-700 px-3 text-white hover:bg-green-800"><ChevronDown className="h-4 w-4" /></Button></div>
      </form>
    </div>
  );
}
