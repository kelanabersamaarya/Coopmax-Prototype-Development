import * as React from "react";
import { Check, CheckSquare, Eye, File, FileUp, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoanAgreementDocumentDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [spkNumber, setSpkNumber] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const inputId = React.useId();

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSpkNumber("");
      setFiles([]);
    }
    onOpenChange(nextOpen);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!spkNumber.trim() || files.length === 0) return;
    setConfirmOpen(true);
  }

  function handleConfirmSave() {
    toast.success("Dokumen perjanjian pinjaman berhasil disimpan", {
      description: `${files.length} dokumen • ${spkNumber.trim()}`,
    });
    setConfirmOpen(false);
    handleOpenChange(false);
    setSuccessOpen(true);
  }

  function handlePreview(file: File) {
    const previewUrl = URL.createObjectURL(file);
    const previewWindow = window.open(previewUrl, "_blank", "noopener,noreferrer");

    if (!previewWindow) {
      URL.revokeObjectURL(previewUrl);
      return;
    }

    window.setTimeout(() => URL.revokeObjectURL(previewUrl), 60_000);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[560px] overflow-hidden rounded-2xl border-slate-200 bg-white p-0 shadow-2xl">
        <DialogHeader className="border-b border-[#CDD4E0] px-6 py-3">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Dokumen Perjanjian Pinjaman
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-5 pt-1">
          <div className="space-y-2">
            <Label htmlFor={`${inputId}-spk`} className="text-sm font-semibold text-slate-800">
              Nomor Perjanjian Pinjaman <span className="text-rose-600">*</span>
            </Label>
            <Input
              id={`${inputId}-spk`}
              value={spkNumber}
              onChange={(event) => setSpkNumber(event.target.value)}
              placeholder="Masukkan nomor perjanjian pinjaman"
              required
              className="h-11 rounded-[5px] border-slate-200 bg-slate-50/60 focus-visible:ring-violet-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${inputId}-file`} className="text-sm font-semibold text-slate-800">
              Dokumen Pinjaman <span className="text-rose-600">*</span>
            </Label>
            <div className="rounded-[5px] border border-dashed border-[#C6D1E2] px-4 py-6 text-center">
              <File className="mx-auto h-10 w-10 text-slate-900" strokeWidth={1.8} />
              <div className="mt-3 text-sm font-semibold text-slate-900">
                Dokumen Perjanjian Pinjaman
              </div>
              <p className="mx-auto mt-3 max-w-[470px] text-xs text-slate-900">
                Unggah dokumen perjanjian pinjaman. Pastikan dokumen terlihat jelas untuk melengkapi data pinjaman
              </p>
              <p className="mt-2 text-xs text-[#8492AA]">PDF, JPG, JPEG, PNG. Maksimal 1MB.</p>
              <label
                htmlFor={`${inputId}-file`}
                className="mt-4 inline-flex h-8 cursor-pointer items-center rounded-[4px] bg-[#3767F5] px-3 text-xs font-semibold text-white"
              >
                <FileUp className="mr-1.5 h-3.5 w-3.5" />
                Unggah Dokumen Pinjaman
              </label>
              <input
                id={`${inputId}-file`}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                className="sr-only"
                onChange={(event) => {
                  const selectedFiles = Array.from(event.target.files ?? []);
                  if (selectedFiles.length > 0) {
                    setFiles((current) => [...current, ...selectedFiles]);
                  }
                  event.target.value = "";
                }}
                multiple
                required={files.length === 0}
              />
            </div>
            {files.length > 0 ? (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={`${file.name}-${file.lastModified}-${index}`} className="flex min-w-0 items-start gap-2 rounded-[4px] border border-[#D7E0ED] bg-white p-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#EEF3FF] text-[#3767F5]">
                      <File className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-1 px-1 py-2 text-left text-xs text-[#456080]">
                      <span className="block break-words whitespace-normal">{file.name}</span>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handlePreview(file)}
                      className="h-8 shrink-0 self-center rounded-[3px] bg-[#3767F5] px-2 text-[11px] font-semibold text-white hover:bg-[#2D55D6]"
                    >
                      <Eye className="mr-1 h-3.5 w-3.5" />
                      Pratinjau
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))}
                      className="h-8 shrink-0 self-center rounded-[3px] bg-[#E3262E] px-2 text-[11px] font-semibold text-white hover:bg-[#C91F27]"
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Hapus
                    </Button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="-mx-6 flex justify-end gap-1 border-t border-[#CDD4E0] px-6 pt-3">
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="h-7 w-[90px] rounded-[3px] bg-[#8b9bb8] px-1 text-xs font-bold text-white hover:bg-[#8b9bb8] active:bg-[#8b9bb8]"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Batalkan
            </Button>
            <Button
              type="submit"
              className="h-7 w-[90px] rounded-[3px] bg-[#16b600] px-1 text-xs font-bold text-white hover:bg-[#16b600] active:bg-[#16b600]"
            >
              <CheckSquare className="mr-1 h-3.5 w-3.5" />
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="[&>button]:hidden w-[calc(100vw-1.5rem)] max-w-[530px] rounded-[5px] border-slate-200 bg-white px-6 py-6 text-center shadow-2xl">
          <div className="mx-auto grid h-[82px] w-[82px] place-items-center rounded-full border-[4px] border-[#f7c8a6] text-[#f2b98f]">
            <span className="text-[48px] font-light leading-none">!</span>
          </div>
          <DialogTitle className="mt-5 text-[28px] font-extrabold leading-tight text-[#3b4863]">
            Yakin untuk menyimpan data ?
          </DialogTitle>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              type="button"
              onClick={handleConfirmSave}
              className="h-12 w-[98px] rounded-[5px] bg-[#3380e8] text-base font-semibold text-white hover:bg-[#3380e8]"
            >
              Yes
            </Button>
            <Button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="h-12 w-[126px] rounded-[5px] bg-[#aaa] text-base font-semibold text-white hover:bg-[#aaa]"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="[&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden w-[calc(100vw-1.5rem)] max-w-[530px] rounded-[5px] border-slate-200 bg-white px-6 py-7 text-center shadow-2xl">
          <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#dff0d5] text-[#9bd879]">
            <Check className="h-14 w-14" strokeWidth={2.5} />
          </div>
          <DialogTitle className="mt-7 text-[28px] font-extrabold leading-tight text-[#5a5a5a]">
            Berhasil menyimpan data
          </DialogTitle>
          <Button
            type="button"
            onClick={() => setSuccessOpen(false)}
            className="mx-auto mt-7 h-12 w-[104px] rounded-[5px] bg-[#3380e8] text-base font-semibold text-white hover:bg-[#3380e8]"
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
