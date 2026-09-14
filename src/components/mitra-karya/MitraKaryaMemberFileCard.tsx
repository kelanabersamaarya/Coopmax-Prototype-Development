import * as React from "react";
import { AlertTriangle, CheckCircle2, Contact, FileText, FileUp } from "lucide-react";
import { toast } from "sonner";

type Props = {
  title: string;
  file: File | null;
  onChange: (file: File | null) => void;
};

export default function MitraKaryaMemberFileCard({ title, file, onChange }: Props) {
  const isKtp = title === "Upload KTP";
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState(file?.name ?? "");

  React.useEffect(() => {
    setFileName(file?.name ?? "");
  }, [file]);

  React.useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const input = (
    <input
      type="file"
      accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
      className="hidden"
      onChange={(event) => {
        const selected = event.target.files?.[0] ?? null;
        if (selected && selected.size > 1024 * 1024) {
          toast.error("Ukuran file maksimal 1 MB");
          event.currentTarget.value = "";
          return;
        }
        onChange(selected);
      }}
    />
  );

  const renameFile = (name: string) => {
    setFileName(name);
    if (file && name.trim()) {
      onChange(new File([file], name.trim(), { type: file.type, lastModified: file.lastModified }));
    }
  };

  const filePreview = (alt: string) => (
    <div className="relative w-full rounded-[9px] border border-[#d5ddeb] bg-[#f8faff] p-4 pt-5 text-left">
      <button
        type="button"
        onClick={() => onChange(null)}
        className="absolute right-3 top-3 rounded-[5px] bg-red-500 px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-red-600"
      >
        Hapus
      </button>
      <div className="flex flex-col items-center">
        {previewUrl ? (
          <img src={previewUrl} alt={alt} className="h-36 w-56 rounded-[7px] border border-[#c8d2e3] object-contain sm:h-44 sm:w-72" />
        ) : (
          <FileText className="h-20 w-20 text-[#3567f5]" />
        )}
        <label className="mt-3 w-full text-left text-[11px] font-semibold text-[#536b91]">
          Nama file KTP
          <input
            type="text"
            value={fileName}
            onChange={(event) => renameFile(event.target.value)}
            className="mt-1 h-9 w-full rounded-[5px] border border-[#c8d2e3] bg-white px-3 text-[12px] font-normal text-[#002060] outline-none transition focus:border-[#3567f5] focus:ring-2 focus:ring-[#3567f5]/15"
          />
        </label>
      </div>
    </div>
  );

  return (
    <div className="rounded-[14px] border border-[#d5ddeb] bg-white p-5 text-[#002060]">
      <h3 className="text-[16px] font-semibold">{title}</h3>
      {isKtp ? (
        <>
          <div className="mt-4 grid items-stretch gap-5 lg:grid-cols-2">
            <div className="rounded-[9px] border border-[#e6eaf0] p-3">
              <p className="text-[13px] font-semibold">Contoh Foto KTP</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div><div className="mb-1 flex items-center gap-1 text-[11px]"><CheckCircle2 className="h-3.5 w-3.5 text-green-600" />Contoh foto KTP yang benar</div><div className="flex min-h-[180px] items-center justify-center rounded-[7px] border border-dashed border-green-500"><img src="/image 4.png" alt="Contoh foto KTP yang benar" className="max-h-[180px] w-full object-contain" /></div></div>
                <div><div className="mb-1 flex items-center gap-1 text-[11px]"><AlertTriangle className="h-3.5 w-3.5 text-red-500" />Contoh foto KTP yang salah</div><div className="flex min-h-[180px] items-center justify-center rounded-[7px] border border-dashed border-red-400"><img src="/imagektpblur.png" alt="Contoh foto KTP yang salah" className="max-h-[180px] w-full object-contain blur-[2px]" /></div></div>
              </div>
            </div>
            <div className="flex min-h-[266px] flex-col items-center justify-center rounded-[9px] border border-dashed border-[#c8d2e3] px-4 py-5 text-center">
              {file ? filePreview("Preview KTP") : <><Contact className="mb-2 h-8 w-8 text-black" /><p className="text-[12px] text-black">Unggah foto KTP Nasabah. Pastikan terlihat jelas untuk validasi identitas.</p><p className="mt-2 text-[12px] text-[#7b7b7b]">JPG, JPEG, PNG. Maksimal 1 MB.</p><label className="mt-3 inline-flex h-[30px] cursor-pointer items-center gap-1 rounded-[4px] bg-[#3567f5] px-3 text-[12px] font-medium text-white"><FileUp className="h-4 w-4" />Unggah KTP{input}</label></>}
            </div>
          </div>
          <div className="mt-4 rounded-[9px] border border-[#f1d28a] bg-[#fff7dd] p-3 text-[11px] text-[#4d3b13]"><p className="flex items-center gap-1 font-semibold"><AlertTriangle className="h-3.5 w-3.5" />Perhatikan Foto KTP yang Anda Unggah</p><ol className="mt-2 list-decimal pl-5"><li>KTP harus identitas asli untuk validasi identitas.</li><li>Informasi dalam KTP harus terlihat jelas.</li><li>Pastikan KTP tidak buram dan background foto polos.</li><li>Format file JPG, JPEG, PNG, atau PDF.</li><li>Maksimal ukuran file 1 MB.</li></ol></div>
        </>
      ) : (
        <div className="mt-5 rounded-[9px] border border-dashed border-[#c8d2e3] p-6"><div className="flex min-h-[180px] flex-col items-center justify-center text-center">{file ? filePreview("Preview file pendukung") : <><FileUp className="mb-2 h-7 w-7 text-black" /><p className="text-[14px] font-semibold text-black">File Pendukung</p><p className="mt-2 text-[12px] text-black">Unggah file pendukung untuk melengkapi data anggota.</p><label className="mt-3 inline-flex h-[30px] cursor-pointer items-center gap-1 rounded-[4px] bg-[#3567f5] px-3 text-[12px] font-medium text-white"><FileUp className="h-4 w-4" />Unggah File{input}</label></>}</div></div>
      )}
    </div>
  );
}
