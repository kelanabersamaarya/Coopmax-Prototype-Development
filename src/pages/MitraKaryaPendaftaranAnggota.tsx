import * as React from "react";
import { Check, FileText, FileUp, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fieldClass = "h-8 rounded-[5px] border-[#c8d2e3] bg-white text-[13px] text-[#536b91] shadow-none";

function readFileAsDataUrl(file: File | null): Promise<string | null> {
  if (!file) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function FileCard({ title, file, onChange }: { title: string; file: File | null; onChange: (file: File | null) => void }) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!file || !file.type.startsWith("image/")) { setPreviewUrl(null); return; }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return <div className="rounded-[14px] border border-[#d5ddeb] bg-white p-5 text-[#002060]"><h3 className="text-[16px] font-semibold">{title}</h3><div className="mt-5 rounded-[9px] border border-dashed border-[#c8d2e3] p-6"><div className="flex min-h-[180px] flex-col items-center justify-center text-center">{file ? <div className="w-full rounded-[9px] border border-[#d5ddeb] bg-[#f8faff] p-3 text-left"><div className="flex items-center gap-3">{previewUrl ? <img src={previewUrl} alt={`Preview ${title}`} className="h-20 w-24 rounded-[5px] object-cover" /> : <div className="flex h-20 w-24 items-center justify-center rounded-[5px] bg-white"><FileText className="h-8 w-8 text-[#3567f5]" /></div>}<div className="min-w-0 flex-1"><p className="truncate text-[12px] font-semibold">{file.name}</p><p className="text-[11px] text-[#7890b2]">{file.type || "File"}</p><button type="button" onClick={() => onChange(null)} className="mt-2 rounded-[4px] bg-red-500 px-3 py-1 text-[11px] text-white">Hapus</button></div></div></div> : <><FileUp className="mb-2 h-7 w-7 text-black" /><p className="text-[14px] font-semibold text-black">{title}</p><p className="mt-2 text-[12px] text-black">Unggah file untuk melengkapi data anggota.</p></>}{!file && <label className="mt-3 inline-flex h-[30px] cursor-pointer items-center gap-1 rounded-[4px] bg-[#3567f5] px-3 text-[12px] font-medium text-white"><FileUp className="h-4 w-4" />Unggah File<input type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" className="hidden" onChange={(event) => { const selected = event.target.files?.[0] ?? null; if (selected && selected.size > 1024 * 1024) { toast.error("Ukuran file maksimal 1 MB"); event.currentTarget.value = ""; return; } onChange(selected); }} /></label>}</div></div></div>;
}

export default function MitraKaryaPendaftaranAnggota() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ktpFile, setKtpFile] = React.useState<File | null>(null);
  const [supportingFile, setSupportingFile] = React.useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  async function confirmSave() {
    const members = JSON.parse(localStorage.getItem("mitra-karya-members") || "[]");
    const [ktpDataUrl, supportingDataUrl] = await Promise.all([readFileAsDataUrl(ktpFile), readFileAsDataUrl(supportingFile)]);
    const member = { id: id || "A2600016", name: "Anggota Baru", ktpFile: ktpFile ? { name: ktpFile.name, type: ktpFile.type, dataUrl: ktpDataUrl } : null, supportingFile: supportingFile ? { name: supportingFile.name, type: supportingFile.type, dataUrl: supportingDataUrl } : null };
    localStorage.setItem("mitra-karya-members", JSON.stringify([member, ...members.filter((item: { id: string }) => item.id !== member.id)]));
    setShowConfirmation(false);
    setShowSuccess(true);
  }

  return <div className="min-h-screen px-3 py-5 text-[#002060] sm:px-6 md:px-8"><h1 className="text-[22px] font-semibold">Anggota <span className="font-normal">Tambah</span></h1><form onSubmit={(event) => { event.preventDefault(); setShowConfirmation(true); }} className="mt-8 rounded-[20px] bg-white px-5 py-7 shadow-sm sm:px-8"><label className="text-[13px] font-medium">Nama Anggota<Input className={fieldClass} defaultValue="Anggota Baru" /></label><div className="mt-8 grid grid-cols-1 gap-5"><FileCard title="Upload KTP" file={ktpFile} onChange={setKtpFile} /><FileCard title="Upload File Pendukung" file={supportingFile} onChange={setSupportingFile} /></div><div className="mt-8 flex justify-end gap-2"><Button type="button" onClick={() => navigate("/mitra-karya/anggota")} className="bg-[#7d8eaa]"><X className="mr-1 h-3 w-3" />Batalkan</Button><Button type="submit" className="bg-[#2db900]"><Check className="mr-1.5 h-4 w-4" />Simpan</Button></div></form>{showConfirmation && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-5"><div className="rounded-[6px] bg-white px-6 py-10 text-center shadow-2xl"><h2 className="text-[25px] font-semibold">Yakin untuk menyimpan data?</h2><div className="mt-8 flex justify-center gap-2"><Button type="button" onClick={confirmSave}>Yes</Button><Button type="button" onClick={() => setShowConfirmation(false)} variant="secondary">Cancel</Button></div></div></div>}{showSuccess && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-5"><div className="rounded-[6px] bg-white px-6 py-10 text-center"><h2 className="text-[25px] font-semibold">Berhasil menyimpan data</h2><Button type="button" onClick={() => navigate(`/mitra-karya/anggota/${id || "A2600016"}`)} className="mt-8">OK</Button></div></div>}</div>;
}
