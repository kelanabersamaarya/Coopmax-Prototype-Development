import * as React from "react";
import { AlertTriangle, CheckCircle2, Contact, FileText, FileUp } from "lucide-react";
import { toast } from "sonner";

export default function MitraKaryaMemberFileCard({ title, file, onChange }: { title: string; file: File | null; onChange: (file: File | null) => void }) {
  const isKtp = title === "Upload KTP";
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const input = <input type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" className="hidden" onChange={(event) => {
    const selected = event.target.files?.[0] ?? null;
    if (selected && selected.size > 1024 * 1024) {
      toast.error("Ukuran file maksimal 1 MB");
      event.currentTarget.value = "";
      return;
    }
    onChange(selected);
  }} />;

  return <div className="rounded-[14px] border border-[#d5ddeb] bg-white p-5 text-[#002060]">
    <h3 className="text-[16px] font-semibold">{title}</h3>
    {isKtp ? <>
      <div className="mt-4 grid items-stretch gap-5 lg:grid-cols-2">
        <div className="rounded-[9px] border border-[#e6eaf0] p-3">
          <p className="text-[13px] font-semibold">Contoh Foto KTP</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div><div className="mb-1 flex items-center gap-1 text-[11px]"><CheckCircle2 className="h-3.5 w-3.5 text-green-600" />Contoh foto KTP yang benar</div><div className="flex min-h-[180px] items-center justify-center rounded-[7px] border border-dashed border-green-500"><img src="/image 4.png" alt="Contoh foto KTP yang benar" className="max-h-[180px] w-full object-contain" /></div></div>
            <div><div className="mb-1 flex items-center gap-1 text-[11px]"><AlertTriangle className="h-3.5 w-3.5 text-red-500" />Contoh foto KTP yang salah</div><div className="flex min-h-[180px] items-center justify-center rounded-[7px] border border-dashed border-red-400"><img src="/imagektpblur.png" alt="Contoh foto KTP yang salah" className="max-h-[180px] w-full object-contain blur-[2px]" /></div></div>
          </div>
        </div>
        <div className="flex min-h-[266px] flex-col items-center justify-center rounded-[9px] border border-dashed border-[#c8d2e3] px-4 py-5 text-center">
          {file ? <div className="w-full rounded-[9px] border border-[#d5ddeb] bg-[#f8faff] p-3 text-left"><div className="flex items-center gap-3">{previewUrl ? <img src={previewUrl} alt="Preview KTP" className="h-20 w-24 rounded-[5px] object-cover" /> : <FileText className="h-10 w-10 text-[#3567f5]" />}<div className="min-w-0 flex-1"><p className="truncate text-[12px] font-semibold">{file.name}</p><button type="button" onClick={() => onChange(null)} className="mt-2 rounded-[4px] bg-red-500 px-3 py-1 text-[11px] text-white">Hapus</button></div></div></div> : <><Contact className="mb-2 h-8 w-8 text-black" /><p className="text-[12px] text-black">Unggah foto KTP Nasabah. Pastikan terlihat jelas untuk validasi identitas.</p><p className="mt-2 text-[12px] text-[#7b7b7b]">JPG, JPEG, PNG. Maksimal 1 MB.</p><label className="mt-3 inline-flex h-[30px] cursor-pointer items-center gap-1 rounded-[4px] bg-[#3567f5] px-3 text-[12px] font-medium text-white"><FileUp className="h-4 w-4" />Unggah KTP{input}</label></>}
        </div>
      </div>
      <div className="mt-4 rounded-[9px] border border-[#f1d28a] bg-[#fff7dd] p-3 text-[11px] text-[#4d3b13]"><p className="flex items-center gap-1 font-semibold"><AlertTriangle className="h-3.5 w-3.5" />Perhatikan Foto KTP yang Anda Unggah</p><ol className="mt-2 list-decimal pl-5"><li>KTP harus identitas asli untuk validasi identitas.</li><li>Informasi dalam KTP harus terlihat jelas.</li><li>Pastikan KTP tidak buram dan background foto polos.</li><li>Format file JPG, JPEG, PNG, atau PDF.</li><li>Maksimal ukuran file 1 MB.</li></ol></div>
    </> : <div className="mt-5 rounded-[9px] border border-dashed border-[#c8d2e3] p-6"><div className="flex min-h-[180px] flex-col items-center justify-center text-center">{file ? <div className="w-full rounded-[9px] border border-[#d5ddeb] bg-[#f8faff] p-3 text-left"><div className="flex items-center gap-3">{previewUrl ? <img src={previewUrl} alt="Preview file pendukung" className="h-20 w-24 rounded-[5px] object-cover" /> : <FileText className="h-10 w-10 text-[#3567f5]" />}<div className="min-w-0 flex-1"><p className="truncate text-[12px] font-semibold">{file.name}</p><button type="button" onClick={() => onChange(null)} className="mt-2 rounded-[4px] bg-red-500 px-3 py-1 text-[11px] text-white">Hapus</button></div></div></div> : <><FileUp className="mb-2 h-7 w-7 text-black" /><p className="text-[14px] font-semibold text-black">File Pendukung</p><p className="mt-2 text-[12px] text-black">Unggah file pendukung untuk melengkapi data anggota.</p><label className="mt-3 inline-flex h-[30px] cursor-pointer items-center gap-1 rounded-[4px] bg-[#3567f5] px-3 text-[12px] font-medium text-white"><FileUp className="h-4 w-4" />Unggah File{input}</label></>}</div></div>}
  </div>;
}
