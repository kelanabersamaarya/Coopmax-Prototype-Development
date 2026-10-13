import * as React from "react";
import { CheckSquare, Eye, FileImage, FileUp, Trash2, X } from "lucide-react";
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
  const [file, setFile] = React.useState<File | null>(null);
  const inputId = React.useId();

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSpkNumber("");
      setFile(null);
    }
    onOpenChange(nextOpen);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!spkNumber.trim() || !file) return;

    toast.success("Dokumen perjanjian pinjaman berhasil disimpan", {
      description: `${file.name} • SPK ${spkNumber.trim()}`,
    });
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[560px] overflow-hidden rounded-2xl border-slate-200 bg-white p-0 shadow-2xl">
        <DialogHeader className="border-b border-[#CDD4E0] px-6 py-3">
          <DialogTitle className="text-lg font-bold text-slate-900">
            Dokumen Perjanjian Pinjaman
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
          <div className="space-y-2">
            <Label htmlFor={`${inputId}-spk`} className="text-sm font-semibold text-slate-800">
              Nomor SPK <span className="text-rose-600">*</span>
            </Label>
            <Input
              id={`${inputId}-spk`}
              value={spkNumber}
              onChange={(event) => setSpkNumber(event.target.value)}
              placeholder="Masukkan nomor SPK"
              required
              className="h-11 rounded-xl border-slate-200 bg-slate-50/60 focus-visible:ring-violet-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${inputId}-file`} className="text-sm font-semibold text-slate-800">
              Dokumen Pinjaman <span className="text-rose-600">*</span>
            </Label>
            <div className="rounded-[10px] border border-dashed border-[#C6D1E2] px-4 py-6 text-center">
              <FileImage className="mx-auto h-10 w-10 text-slate-900" strokeWidth={1.8} />
              <div className="mt-3 text-sm font-semibold text-slate-900">
                {file ? file.name : "Dokumen Perjanjian Pinjaman"}
              </div>
              <p className="mx-auto mt-3 max-w-[470px] text-xs text-slate-900">
                Unggah dokumen perjanjian pinjaman. Pastikan dokumen terlihat jelas untuk melengkapi data pinjaman
              </p>
              <p className="mt-2 text-xs text-[#8492AA]">PDF, JPG, JPEG, PNG. Maksimal 1MB.</p>
              <label
                htmlFor={`${inputId}-file`}
                className="mt-4 inline-flex h-8 cursor-pointer items-center rounded-[4px] bg-[#3767F5] px-3 text-xs font-semibold text-white transition hover:bg-[#2D55D6]"
              >
                <FileUp className="mr-1.5 h-3.5 w-3.5" />
                Unggah Dokumen Pinjaman
              </label>
              <input
                id={`${inputId}-file`}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                className="sr-only"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                required
              />
            </div>
            {file ? (
              <div className="flex min-w-0 items-center gap-2 rounded-[4px] border border-[#D7E0ED] bg-white p-3">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#EEF3FF] text-[#3767F5]">
                  <FileImage className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1 rounded-[3px] border border-[#B9CBE4] bg-[#EAF1FC] px-3 py-2 text-left text-xs text-[#456080]">
                  <span className="block truncate">{file.name}</span>
                </div>
                <Button
                  type="button"
                  onClick={() => toast(`Pratinjau ${file.name}`)}
                  className="h-8 shrink-0 rounded-[3px] bg-[#3767F5] px-2 text-[11px] font-semibold text-white hover:bg-[#2D55D6]"
                >
                  <Eye className="mr-1 h-3.5 w-3.5" />
                  Pratinjau
                </Button>
                <Button
                  type="button"
                  onClick={() => setFile(null)}
                  className="h-8 shrink-0 rounded-[3px] bg-[#E3262E] px-2 text-[11px] font-semibold text-white hover:bg-[#C91F27]"
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  Hapus
                </Button>
              </div>
            ) : null}
          </div>

          <div className="-mx-6 flex justify-end gap-1 border-t border-[#CDD4E0] px-6 pt-3">
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="h-7 w-[90px] rounded-[3px] bg-[#8b9bb8] px-1 text-xs font-bold text-white hover:bg-[#788aa8]"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Batalkan
            </Button>
            <Button
              type="submit"
              className="h-7 w-[90px] rounded-[3px] bg-[#16b600] px-1 text-xs font-bold text-white hover:bg-[#119d00]"
            >
              <CheckSquare className="mr-1 h-3.5 w-3.5" />
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
