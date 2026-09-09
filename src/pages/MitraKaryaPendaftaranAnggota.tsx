import * as React from "react";
import { ArrowLeft, Check, ChevronDown, FileText, FileUp, RefreshCw, Search, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const fieldClass = "h-8 rounded-[5px] border-[#c8d2e3] bg-white text-[13px] text-[#536b91] shadow-none focus-visible:ring-1 focus-visible:ring-violet-400";
const selectClass = "h-8 rounded-[5px] border-[#c8d2e3] bg-white text-[13px] text-[#7890b2] shadow-none focus:ring-0";
function Label({ children, required = false }: { children: React.ReactNode; required?: boolean }) { return <label className="text-[13px] font-medium text-[#002060]">{children}{required && <span className="text-red-500">*</span>}</label>; }
function Row({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) { return <div className="grid gap-2 md:grid-cols-[190px_minmax(0,1fr)] md:items-start"><Label required={required}>{label}</Label><div className="min-w-0">{children}</div></div>; }
function SelectField({ placeholder, children }: { placeholder: string; children: React.ReactNode }) { return <Select><SelectTrigger className={selectClass}><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{children}</SelectContent></Select>; }

function FileCard({ file, onChange, required = false }: { file: File | null; onChange: (file: File | null) => void; required?: boolean }) {
  const previewUrl = React.useMemo(() => file?.type.startsWith("image/") ? URL.createObjectURL(file) : null, [file]);
  React.useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  const input = <input type="file" required={required} accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" className="hidden" onChange={(event) => onChange(event.target.files?.[0] ?? null)} />;
  return <div className="rounded-[14px] border border-[#d5ddeb] bg-white p-5 text-[#002060]">
    <div><h3 className="text-[16px] font-semibold">{required ? "Upload KTP" : "Upload File Pendukung"}{required && <span className="ml-1 text-red-500">*</span>}</h3></div>
    {file ? <div className="mt-5 overflow-hidden rounded-[9px] border border-[#d5ddeb] bg-white p-3"><div className="flex items-center gap-3"><div className="h-16 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">{previewUrl ? <img src={previewUrl} alt="Preview dokumen" className="h-full w-full object-cover" /> : <FileText className="mx-auto mt-5 h-7 w-7 text-[#7890b2]" />}</div><div className="min-w-0"><p className="truncate text-[13px] font-medium text-[#002060]">{file.name}</p><p className="mt-1 text-[11px] text-[#7890b2]">Preview file berhasil dimuat</p></div></div><label className="mt-3 block cursor-pointer text-center text-[12px] font-semibold text-violet-600 hover:text-violet-700">Ganti file{input}</label></div> : <label className="mt-5 flex min-h-[128px] cursor-pointer flex-col items-center justify-center rounded-[9px] border border-dashed border-[#c8d2e3] bg-white px-4 py-5 text-center transition hover:border-violet-400 hover:bg-violet-50"><FileUp className="mb-2 h-6 w-6 text-[#7890b2]" /><span className="text-[15px] font-semibold text-[#536b91]"><span className="text-violet-600">Klik untuk upload</span> atau tarik file ke sini</span><span className="mt-1 text-[12px] text-[#7890b2]">JPG, PNG, atau PDF, maks 5 MB</span>{input}</label>}
  </div>;
}

export default function MitraKaryaPendaftaranAnggota() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"general" | "upload">("general");
  const [ktpFile, setKtpFile] = React.useState<File | null>(null);
  const [supportingFile, setSupportingFile] = React.useState<File | null>(null);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); toast.success("Data anggota berhasil disimpan", { description: name || "Anggota baru siap diproses." }); }
  return <div className="min-h-screen px-3 py-5 text-[#002060] sm:px-6 md:px-8">
    <div className="flex items-center gap-2"><button type="button" onClick={() => navigate("/mitra-karya/anggota")} className="text-[#536b91] hover:text-violet-600"><ArrowLeft className="h-4 w-4" /></button><h1 className="text-[22px] font-semibold">Anggota <span className="font-normal">Tambah</span></h1></div>
    <div className="mt-8 flex items-center gap-3 text-[13px]"><button type="button" onClick={() => setActiveTab("general")} className={`rounded-full px-4 py-3 ${activeTab === "general" ? "bg-violet-600 text-white" : "text-[#536b91] hover:bg-violet-50"}`}>General Information</button><button type="button" onClick={() => setActiveTab("upload")} className={`rounded-full px-4 py-3 ${activeTab === "upload" ? "bg-violet-600 text-white" : "text-[#536b91] hover:bg-violet-50"}`}>Upload File</button></div>
    <form onSubmit={handleSubmit} className="mt-10 rounded-[20px] bg-white px-5 py-7 shadow-[0_4px_20px_rgba(45,68,110,0.04)] sm:px-8 md:px-12">
      {activeTab === "general" ? <>
        <div className="grid gap-[10px]">
          <Row label="ID Anggota" required><div className="flex"><Input defaultValue="A2600016" readOnly className={`${fieldClass} rounded-r-none bg-[#e4e9f1]`} /><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2"><RefreshCw className="h-4 w-4" /></Button></div></Row>
          <Row label="ID Nasabah"><div className="flex"><Input defaultValue="N2600020" readOnly className={`${fieldClass} rounded-r-none bg-[#e4e9f1]`} /><Button type="button" className="h-8 rounded-none bg-[#7d8eaa] px-2"><Search className="h-4 w-4" /></Button><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2"><RefreshCw className="h-4 w-4" /></Button></div></Row>
          <Row label="Tanggal Daftar" required><Input defaultValue="09-09-2026" className={fieldClass} /></Row><Row label="NIP"><Input className={fieldClass} /></Row>
          <Row label="NIK" required><div className="flex gap-2"><Input placeholder="Masukan NIK" className={fieldClass} /><Button type="button" className="h-8 bg-violet-600"><Sparkles className="mr-1 h-3.5 w-3.5" />Verifikasi KTP</Button></div></Row><Row label="Nama" required><Input value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} /></Row>
          <Row label="Kategori" required><SelectField placeholder="Pilih Kategori Anggota"><SelectItem value="anggota">Anggota</SelectItem><SelectItem value="calon">Calon Anggota</SelectItem></SelectField></Row><Row label="Jenis Kelamin" required><div className="flex gap-5 text-[13px]"><label><input type="radio" name="gender" defaultChecked /> Perempuan</label><label><input type="radio" name="gender" /> Laki - Laki</label></div></Row>
          <Row label="Tempat Lahir" required><Input className={fieldClass} /></Row><Row label="Tanggal Lahir" required><Input placeholder="dd-mm-yyyy" className={fieldClass} /></Row><Row label="Pekerjaan" required><SelectField placeholder="Pilih Pekerjaan"><SelectItem value="pegawai">Pegawai</SelectItem></SelectField></Row><Row label="Agama" required><SelectField placeholder="Pilih Agama"><SelectItem value="islam">Islam</SelectItem></SelectField></Row><Row label="Status Pernikahan" required><SelectField placeholder="Pilih Status Pernikahan"><SelectItem value="menikah">Menikah</SelectItem></SelectField></Row><Row label="Jenis Identitas" required><SelectField placeholder="Pilih Jenis Identitas"><SelectItem value="ktp">KTP</SelectItem></SelectField></Row><Row label="No. Identitas" required><Input className={fieldClass} /></Row>
          <Row label="No. Telp/Handphone (+62)" required><div className="flex"><span className="inline-flex h-8 items-center rounded-l-[5px] border border-r-0 border-[#c8d2e3] bg-[#e4e9f1] px-3 text-[13px] text-[#7890b2]">+62</span><Input placeholder="Contoh. 81123456789" className={`${fieldClass} rounded-l-none`} /></div></Row><Row label="Nama Gadis Ibu Kandung" required><Input className={fieldClass} /></Row><Row label="Nama ahli waris" required><Input className={fieldClass} /></Row><Row label="Email"><Input className={fieldClass} /></Row><Row label="Wilayah"><SelectField placeholder="Pilih Wilayah"><SelectItem value="wilayah-1">Wilayah 1</SelectItem></SelectField></Row><Row label="Alamat Domisili" required><Textarea className="min-h-[48px]" /></Row><Row label="Alamat KTP" required><Textarea className="min-h-[48px]" /></Row><Row label="Tag"><Input className={fieldClass} /></Row><Row label="Unit Anggota"><SelectField placeholder="Pilih Unit Anggota"><SelectItem value="unit-1">Unit Anggota 1</SelectItem></SelectField></Row><Row label="Status" required><Switch defaultChecked className="data-[state=checked]:bg-violet-600" /></Row>
        </div><h2 className="mt-10 text-[22px] font-semibold">Tabungan <span className="font-normal">Tambah</span></h2><div className="mt-7 grid gap-[10px]"><Row label="No Rekening" required><Input defaultValue="P001260017" readOnly className={fieldClass} /></Row><Row label="Simpanan Pokok"><Input defaultValue="200.000,00" className={fieldClass} /></Row><Row label="No Rekening" required><Input defaultValue="P002260016" readOnly className={fieldClass} /></Row><Row label="Simpanan Wajib"><Input defaultValue="50.000,00" className={fieldClass} /></Row><Row label="Kolektor" required><SelectField placeholder="Pilih Kolektor"><SelectItem value="kolektor-1">Kolektor 1</SelectItem></SelectField></Row></div>
      </> : <div className="grid grid-cols-1 gap-5"><FileCard file={ktpFile} onChange={setKtpFile} required /><FileCard file={supportingFile} onChange={setSupportingFile} /></div>}
      <div className="mt-10 flex justify-end gap-1"><Button type="button" onClick={() => navigate("/mitra-karya/anggota")} className="bg-[#7d8eaa]"><X className="mr-1 h-3 w-3" />Batalkan</Button><Button type="submit" className="bg-green-600"><Check className="mr-1 h-3 w-3" />Simpan</Button><Button type="button" className="bg-green-700 px-3"><ChevronDown className="h-4 w-4" /></Button></div>
    </form>
  </div>;
}
