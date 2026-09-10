import * as React from "react";
import { AlertTriangle, ArrowLeft, Check, CheckCircle2, ChevronDown, Contact, FileText, FileUp, RefreshCw, Search, Trash2, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const fieldClass = "h-8 rounded-[5px] border-[#c8d2e3] bg-white text-[13px] text-[#536b91] shadow-none focus-visible:ring-1 focus-visible:ring-violet-400";
const selectClass = "h-8 rounded-[5px] border-[#c8d2e3] bg-white text-[13px] text-[#536b91] shadow-none focus:ring-0 [&>span]:text-[#536b91] [&>span[data-placeholder]]:text-[#7890b2]";
function Label({ children, required = false }: { children: React.ReactNode; required?: boolean }) { return <label className="text-[13px] font-medium text-[#002060]">{children}{required && <span className="text-red-500">*</span>}</label>; }
function Row({ label, required, children, note }: { label: string; required?: boolean; children: React.ReactNode; note?: string }) { return <div className="grid gap-2 md:grid-cols-[190px_minmax(0,1fr)] md:items-start"><Label required={required}>{label}</Label><div className="min-w-0">{children}{note && <p className="mt-1 text-[11px] text-[#7890b2]">{note}</p>}</div></div>; }
function SelectField({ placeholder, children, defaultValue, name = placeholder }: { placeholder: string; children: React.ReactNode; defaultValue?: string; name?: string }) {
  const [value, setValue] = React.useState(defaultValue ?? "");
  return <><Select value={value} onValueChange={setValue}><SelectTrigger className={selectClass}><SelectValue className="text-[#536b91] data-[placeholder]:text-[#7890b2]" placeholder={placeholder} /></SelectTrigger><SelectContent>{children}</SelectContent></Select><input type="hidden" name={name} value={value} /></>;
}
function GeneralInformation({ name = "", onNameChange = () => {}, isEdit = name !== "" }: { name?: string; onNameChange?: (name: string) => void; isEdit?: boolean } = {}) {
  return <>
    <div className="grid gap-[10px]">
      <Row label="ID Anggota" required><div className="flex"><Input defaultValue="A2600016" readOnly className={`${fieldClass} rounded-r-none bg-[#e1e6ef]`} /><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2"><RefreshCw className="h-4 w-4" /></Button></div></Row>
      <Row label="ID Nasabah"><div className="flex"><Input defaultValue="N2600020" readOnly className={`${fieldClass} rounded-r-none bg-[#e1e6ef]`} /><Button type="button" className="h-8 rounded-none bg-[#7d8eaa] px-2"><Search className="h-4 w-4" /></Button><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2"><RefreshCw className="h-4 w-4" /></Button></div></Row>
      <Row label="Tanggal Daftar" required><Input name="registeredAt" defaultValue="09-09-2026" className={fieldClass} /></Row>
      <Row label="NIP" note="Nomor induk pegawai bersifat optional atau tidak wajib diisi"><Input defaultValue={isEdit ? "0000" : undefined} className={fieldClass} /></Row>
      <Row label="NIK" required><div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_272px]"><Input defaultValue={isEdit ? "1802070711050001" : undefined} placeholder="Masukan NIK" className={fieldClass} /><Button type="button" className="h-8 bg-violet-600 text-[12px] hover:bg-violet-600">◉ Verifikasi KTP ✨</Button></div></Row>
      <Row label="Nama" required><Input name="name" value={name} onChange={(event) => onNameChange(event.target.value)} className={fieldClass} /></Row>
      <Row label="Kategori" required><SelectField name="category" placeholder="Pilih Kategori Anggota" defaultValue={isEdit ? "anggota" : undefined}><SelectItem value="anggota">Anggota</SelectItem><SelectItem value="calon">Calon Anggota</SelectItem></SelectField></Row>
      <Row label="Jenis Kelamin" required><div className="flex gap-5 text-[13px]"><label><input type="radio" name="gender" value="perempuan" defaultChecked className="mr-1 accent-blue-600" />Perempuan</label><label><input type="radio" name="gender" value="laki-laki" className="mr-1 accent-blue-600" />Laki - Laki</label></div></Row>
            <Row label="Tempat Lahir" required><Input name="birthPlace" defaultValue={isEdit ? "Tabanan" : undefined} className={fieldClass} /></Row>
      <Row label="Tanggal Lahir" required><Input name="birthDate" defaultValue={isEdit ? "08-09-2026" : undefined} placeholder="dd-mm-yyyy" className={fieldClass} /></Row>
      <Row label="Pekerjaan" required><SelectField name="occupation" placeholder="Pilih Pekerjaan" defaultValue={isEdit ? "pegawai" : undefined}><SelectItem value="pegawai">PNS</SelectItem><SelectItem value="wiraswasta">Wiraswasta</SelectItem></SelectField></Row>
            <Row label="Agama" required><SelectField name="religion" placeholder="Pilih Agama" defaultValue={isEdit ? "protestan" : undefined}><SelectItem value="islam">Islam</SelectItem><SelectItem value="kristen">Kristen</SelectItem><SelectItem value="protestan">Protestan</SelectItem><SelectItem value="katolik">Katolik</SelectItem></SelectField></Row>
            <Row label="Status Pernikahan" required><SelectField name="maritalStatus" placeholder="Pilih Status Pernikahan" defaultValue={isEdit ? "menikah" : undefined}><SelectItem value="belum-menikah">Belum Menikah</SelectItem><SelectItem value="menikah">Kawin</SelectItem></SelectField></Row>
            <Row label="Jenis Identitas" required><SelectField name="identityType" placeholder="Pilih Jenis Identitas" defaultValue={isEdit ? "sim" : undefined}><SelectItem value="ktp">KTP</SelectItem><SelectItem value="sim">SIM A</SelectItem></SelectField></Row>
      <Row label="No. Identitas" required><Input name="identity" defaultValue={isEdit ? "1802070711050001" : undefined} className={fieldClass} /></Row>
      <Row label="No. Telp/Handphone (+62)" required><div className="flex"><span className="flex h-8 shrink-0 items-center whitespace-nowrap rounded-l-[5px] border border-r-0 border-[#c8d2e3] bg-[#e1e6ef] px-3 text-[13px] text-[#536b91]">+62</span><Input name="phone" defaultValue={isEdit ? "81236641121" : undefined} placeholder="Contoh. 81123456789" className={`${fieldClass} min-w-0 rounded-l-none`} /></div></Row>
      <Row label="Nama Gadis Ibu Kandung" required><Input defaultValue={isEdit ? "NI WAYAN PEDEK" : undefined} className={fieldClass} /></Row>
      <Row label="Nama ahli waris" required><Input defaultValue={isEdit ? "Rama Adinata" : undefined} className={fieldClass} /></Row>
      <Row label="Email"><Input placeholder="Contoh. example@email.com" className={fieldClass} /></Row>
      <Row label="Wilayah"><SelectField name="region" placeholder="Pilih Wilayah"><SelectItem value="jakarta-barat">Jakarta Barat</SelectItem><SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem></SelectField></Row>
      <Row label="Alamat Domisili" required><Textarea name="address" defaultValue={isEdit ? "Tabanan" : undefined} className="min-h-[48px]" /></Row>
      <Row label="Alamat KTP" required><Textarea name="identityAddress" defaultValue={isEdit ? "Tabanan" : undefined} className="min-h-[48px]" /></Row>
      <Row label="Tag"><Input placeholder="Pilih tag" className={fieldClass} /></Row>
      <Row label="Unit Anggota"><SelectField name="memberUnit" placeholder="Pilih Unit Anggota"><SelectItem value="unit-1">Unit Anggota 1</SelectItem><SelectItem value="unit-2">Unit Anggota 2</SelectItem></SelectField></Row>
      <Row label="Status" required><Switch defaultChecked className="data-[state=checked]:bg-violet-600" /></Row>
    </div>
    <h2 className="mt-10 text-[22px] font-semibold">Tabungan <span className="font-normal">{isEdit ? "Ubah" : "Tambah"}</span></h2>
    <div className="mt-7 grid gap-[10px]">
      <Row label="No Rekening" required><div className="flex"><Input defaultValue="P001260017" readOnly className={`${fieldClass} rounded-r-none bg-[#e1e6ef]`} /><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2"><RefreshCw className="h-4 w-4" /></Button></div></Row>
      <Row label="Simpanan Pokok"><Input defaultValue="200.000,00" className={fieldClass} /></Row>
      <Row label="No Rekening" required><div className="flex"><Input defaultValue="P002260016" readOnly className={`${fieldClass} rounded-r-none bg-[#e1e6ef]`} /><Button type="button" className="h-8 rounded-l-none bg-[#7d8eaa] px-2"><RefreshCw className="h-4 w-4" /></Button></div></Row>
      <Row label="Simpanan Wajib"><Input defaultValue="50.000,00" className={fieldClass} /></Row>
      <Row label="Kolektor" required><SelectField name="collector" placeholder="Pilih Kolektor"><SelectItem value="kolektor-1">Kolektor 1</SelectItem><SelectItem value="kolektor-2">Kolektor 2</SelectItem></SelectField></Row>
    </div>
  </>;
}
function FileCard({ file, onChange, required = false, existingFile }: { file: File | null; onChange: (file: File | null) => void; required?: boolean; existingFile?: { name: string; type: string; dataUrl?: string } | null }) {
  const previewUrl = React.useMemo(() => file instanceof Blob && file.type.startsWith("image/") ? URL.createObjectURL(file) : existingFile?.dataUrl && existingFile.type.startsWith("image/") ? existingFile.dataUrl : null, [file, existingFile]);
  const [fileName, setFileName] = React.useState(file?.name ?? existingFile?.name ?? "");
  React.useEffect(() => setFileName(file?.name ?? existingFile?.name ?? ""), [file, existingFile]);
  React.useEffect(() => () => { if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  const input = <input type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" className="hidden" onChange={(event) => { const selectedFile = event.target.files?.[0] ?? null; if (selectedFile && selectedFile.size > 1024 * 1024) { toast.error("Ukuran file maksimal 1 MB"); event.currentTarget.value = ""; onChange(null); return; } onChange(selectedFile); }} />;
  const activeFile = file || existingFile;
  const uploadField = activeFile ? <div className="relative flex h-full min-h-[180px] items-center justify-center overflow-hidden rounded-[9px] border border-dashed border-[#c8d2e3] bg-white p-3"><button type="button" onClick={() => onChange(null)} className="absolute right-3 top-3 inline-flex h-[30px] items-center gap-1.5 rounded-[4px] bg-red-500 px-3 text-[13px] font-medium text-white hover:bg-red-600"><Trash2 className="h-4 w-4" />Hapus</button><div className="flex w-full flex-col items-center gap-3"><div className="flex min-h-0 w-full flex-1 items-center justify-center">{previewUrl ? <img src={previewUrl} alt="Preview dokumen" className="max-h-full max-w-full object-contain" /> : <FileText className="h-8 w-8 text-[#7890b2]" />}</div><Input value={fileName} onChange={(event) => setFileName(event.target.value)} aria-label="Nama file" className="h-7 w-full text-[12px]" /></div></div> : <div className="flex h-full min-h-[180px] flex-col items-center justify-center rounded-[9px] border border-dashed border-[#c8d2e3] bg-white px-4 py-5 text-center">{required ? <Contact className="mb-2 h-8 w-8 text-black" /> : <FileUp className="mb-2 h-7 w-7 text-[#7890b2]" />}<h4 className="text-[14px] font-semibold text-black">{required ? "Foto KTP" : "File Pendukung"}</h4><p className="mt-2 text-[12px] text-black">{required ? "Unggah foto KTP Nasabah. Pastikan terlihat jelas untuk validasi identitas." : "Unggah file pendukung untuk melengkapi data Nasabah."}</p><p className="mt-1 text-[12px] text-[#7b7b7b]">JPG, JPEG, PNG. Maksimal 1 MB.</p><label className="mt-3 inline-flex h-[30px] w-[112px] cursor-pointer items-center justify-center gap-1 rounded-[4px] bg-[#3567f5] text-[12px] font-medium text-white transition hover:bg-[#3567f5]"><FileUp className="h-4 w-4" />{required ? "Unggah KTP" : "Unggah File"}{input}</label></div>;
  return <div className="rounded-[14px] border border-[#d5ddeb] bg-white p-5 text-[#002060]"><h3 className="text-[16px] font-semibold">{required ? "Upload KTP" : "Upload File Pendukung"}{required && <span className="ml-1 text-red-500">*</span>}</h3>{required ? <><div className="mt-4 grid items-stretch gap-5 lg:grid-cols-2"><div className="rounded-[9px] border border-[#e6eaf0] bg-white p-3"><p className="text-[13px] font-semibold">Contoh Foto KTP</p><div className="mt-3 grid grid-cols-2 gap-3"><div><div className="mb-1 flex items-center gap-1 text-[11px]"><CheckCircle2 className="h-3.5 w-3.5 text-green-600" />Contoh foto KTP yang benar</div><div className="flex min-h-[180px] items-center justify-center overflow-hidden rounded-[7px] border border-dashed border-green-500 bg-white"><img src="/image 4.png" alt="Contoh foto KTP yang benar" className="max-h-[180px] w-full object-contain" /></div></div><div><div className="mb-1 flex items-center gap-1 text-[11px]"><AlertTriangle className="h-3.5 w-3.5 text-red-500" />Contoh foto KTP yang salah</div><div className="flex min-h-[180px] items-center justify-center overflow-hidden rounded-[7px] border border-dashed border-red-400 bg-white"><img src="/imagektpblur.png" alt="Contoh foto KTP yang salah" className="max-h-[180px] w-full object-contain blur-[2px]" /></div></div></div></div><div className="h-full">{uploadField}</div></div><div className="mt-4 rounded-[9px] border border-[#f1d28a] bg-[#fff7dd] p-3 text-[11px] text-[#4d3b13]"><p className="flex items-center gap-1 font-semibold"><AlertTriangle className="h-3.5 w-3.5" />Perhatikan Foto KTP yang Anda Unggah</p><ol className="mt-2 list-decimal space-y-0.5 pl-5"><li>KTP harus identitas asli untuk validasi identitas.</li><li>Informasi dalam KTP harus terlihat dengan jelas.</li><li>Pastikan KTP tidak buram dan background foto polos.</li><li>Format file JPG, JPEG, PNG, atau PDF.</li><li>Maksimal ukuran file 1 MB.</li></ol></div></> : <div className="mt-5">{uploadField}</div>}</div>;
}
export default function MitraKaryaPendaftaranAnggota() {
  const navigate = useNavigate();
  const { id: editId } = useParams();
  const isEdit = Boolean(editId);
  const existingMember = React.useMemo(() => {
    const savedMember = JSON.parse(localStorage.getItem("mitra-karya-members") || "[]").find((member: { id: string }) => member.id === editId);
    if (savedMember || !isEdit) return savedMember;
    return {
      id: editId,
      name: "Made Jaya",
      ktpFile: { name: "ktp-a2600016.png", type: "image/png", dataUrl: "/imagektpblur.png" },
      supportingFile: { name: "dokumen-pendukung-a2600016.pdf", type: "application/pdf" },
    };
  }, [editId, isEdit]);
  const [name, setName] = React.useState(existingMember?.name ?? "");
  const ktpExisting = isEdit ? existingMember?.ktpFile : null;
  const supportingExisting = isEdit ? existingMember?.supportingFile : null;
  const [activeTab, setActiveTab] = React.useState<"general" | "upload">("general");
  const [ktpFile, setKtpFile] = React.useState<File | null>(null);
  const [supportingFile, setSupportingFile] = React.useState<File | null>(null);
  const [showKtpAlert, setShowKtpAlert] = React.useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = React.useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submittedName = formData.get("name");
    if (typeof submittedName === "string") setName(submittedName);
    if (!ktpFile && !ktpExisting) {
      setShowKtpAlert(true);
      return;
    }
    setShowSaveConfirmation(true);
  }

  async function confirmSave() {
    const readFile = (file: File | null) => file ? new Promise<{ name: string; type: string; dataUrl: string }>((resolve) => { const reader = new FileReader(); reader.onload = () => resolve({ name: file.name, type: file.type, dataUrl: String(reader.result) }); reader.readAsDataURL(file); }) : Promise.resolve(null);
    const [ktpFileData, supportingFileData] = await Promise.all([readFile(ktpFile), readFile(supportingFile)]);
    const form = document.querySelector("form");
    const formData = form ? new FormData(form) : new FormData();
    const newMember = {
      id: editId || "A2600016",
      name: name.trim() || "Anggota Baru",
      registeredAt: String(formData.get("registeredAt") || "09-09-2026"),
      identity: String(formData.get("identity") || "-"),
      phone: String(formData.get("phone") || "-"),
      address: String(formData.get("address") || formData.get("identityAddress") || "-"),
      identityAddress: String(formData.get("identityAddress") || "-"),
      birthPlace: String(formData.get("birthPlace") || "-"),
      birthDate: String(formData.get("birthDate") || "-"),
      gender: String(formData.get("gender") || "perempuan"),
      category: String(formData.get("category") || "anggota"),
      occupation: String(formData.get("occupation") || "-"),
      religion: String(formData.get("religion") || "-"),
      maritalStatus: String(formData.get("maritalStatus") || "-"),
      identityType: String(formData.get("identityType") || "-"),
      region: String(formData.get("region") || "-"),
      memberUnit: String(formData.get("memberUnit") || "-"),
      collector: String(formData.get("collector") || "-"),
      verified: false,
      ktpFile: ktpFileData || ktpExisting,
      supportingFile: supportingFileData || supportingExisting,
    };
    const savedMembers = JSON.parse(localStorage.getItem("mitra-karya-members") || "[]");
    localStorage.setItem("mitra-karya-members", JSON.stringify([newMember, ...savedMembers.filter((member: { id: string }) => member.id !== newMember.id)]));
    setShowSaveConfirmation(false);
    setShowSaveSuccess(true);
  }

  return <>
    <div className="min-h-screen px-3 py-5 text-[#002060] sm:px-6 md:px-8">
      <div className="flex items-center gap-2"><button type="button" onClick={() => navigate("/mitra-karya/anggota")} className="text-[#536b91] hover:text-violet-600"><ArrowLeft className="h-4 w-4" /></button><h1 className="text-[22px] font-semibold">Anggota <span className="font-normal">{isEdit ? "Ubah" : "Tambah"}</span></h1></div>
      <div className="mt-8 flex items-center gap-3 text-[13px]"><button type="button" onClick={() => setActiveTab("general")} className={`rounded-full px-4 py-3 ${activeTab === "general" ? "bg-violet-600 text-white" : "text-[#536b91] hover:bg-violet-50"}`}>General Information</button><button type="button" onClick={() => setActiveTab("upload")} className={`rounded-full px-4 py-3 ${activeTab === "upload" ? "bg-violet-600 text-white" : "text-[#536b91] hover:bg-violet-50"}`}>Upload File</button></div>
      <form onSubmit={handleSubmit} className="mt-10 rounded-[20px] bg-white px-5 py-7 shadow-[0_4px_20px_rgba(45,68,110,0.04)] sm:px-8 md:px-12">{activeTab === "general" ? <GeneralInformation name={name} onNameChange={setName} isEdit={isEdit} /> : <div className="grid grid-cols-1 gap-5"><FileCard file={ktpFile} existingFile={ktpExisting} onChange={setKtpFile} required /><FileCard file={supportingFile} existingFile={supportingExisting} onChange={setSupportingFile} /></div>}<div className="mt-10 flex justify-end gap-1"><Button type="button" onClick={() => navigate("/mitra-karya/anggota")} className="h-8 rounded-[5px] bg-[#7d8eaa] px-3 text-[13px]"><X className="mr-1 h-3 w-3" />Batalkan</Button><div className="flex h-8 w-fit overflow-hidden rounded-[5px]"><Button type="submit" className="h-8 rounded-none bg-[#2db900] px-3 text-[13px] hover:bg-[#28a800]"><Check className="mr-1.5 h-4 w-4" />Simpan</Button><Button type="button" className="h-8 rounded-none border-l border-[#57c834] bg-[#187900] px-3 hover:bg-[#156600]"><ChevronDown className="h-4 w-4" /></Button></div></div></form>
    </div>
    {showKtpAlert && <div role="dialog" aria-modal="true" aria-labelledby="ktp-alert-title" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-5"><div className="w-full max-w-[528px] rounded-[6px] bg-white px-6 py-10 text-center shadow-2xl"><div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full border-4 border-[#ffd0a8] text-[56px] font-light leading-none text-[#ffbd8a]">!</div><h2 id="ktp-alert-title" className="mt-8 text-[30px] font-semibold text-[#45556b]">Foto KTP Belum Diunggah</h2><p className="mt-2 text-[18px] text-[#45556b]">Silakan unggah foto KTP pada tab upload file</p><Button type="button" onClick={() => setShowKtpAlert(false)} className="mt-5 h-[54px] min-w-[104px] rounded-[7px] border-2 border-white bg-[#3185d4] text-[17px] font-medium shadow-[0_0_0_2px_#9fc9ec] hover:bg-[#2878c4]">OK</Button></div></div>}
    {showSaveConfirmation && <div role="dialog" aria-modal="true" aria-labelledby="save-confirmation-title" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-5"><div className="w-full max-w-[528px] rounded-[6px] bg-white px-6 py-10 text-center shadow-2xl"><div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full border-4 border-[#ffd0a8] text-[56px] font-light leading-none text-[#ffbd8a]">!</div><h2 id="save-confirmation-title" className="mt-8 text-[30px] font-semibold text-[#45556b]">Yakin untuk menyimpan data ?</h2><div className="mt-8 flex justify-center gap-2"><Button type="button" onClick={confirmSave} className="h-[48px] min-w-[104px] rounded-[7px] border-2 border-white bg-[#3185d4] text-[16px] font-semibold shadow-[0_0_0_2px_#9fc9ec] hover:bg-[#2878c4]">Yes</Button><Button type="button" onClick={() => setShowSaveConfirmation(false)} className="h-[48px] min-w-[126px] rounded-[5px] bg-[#ababab] text-[16px] font-semibold hover:bg-[#999999]">Cancel</Button></div></div></div>}
    {showSaveSuccess && <div role="dialog" aria-modal="true" aria-labelledby="save-success-title" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-5"><div className="w-full max-w-[528px] rounded-[6px] bg-white px-6 py-10 text-center shadow-2xl"><div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full border-4 border-[#e0f3d5] text-[#9cdb78]"><Check className="h-14 w-14" strokeWidth={2.5} /></div><h2 id="save-success-title" className="mt-8 text-[30px] font-semibold text-[#5b5b5b]">Berhasil menambahkan data</h2><Button type="button" onClick={() => navigate("/mitra-karya/anggota")} className="mt-8 h-[54px] min-w-[104px] rounded-[7px] border-2 border-white bg-[#3185d4] text-[17px] font-medium shadow-[0_0_0_2px_#9fc9ec] hover:bg-[#2878c4]">OK</Button></div></div>}
  </>;
}
