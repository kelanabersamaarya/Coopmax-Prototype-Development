import * as React from "react";
import { CheckSquare, Upload, X } from "lucide-react";
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
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[560px] rounded-2xl border-slate-200 bg-white p-0 shadow-2xl">
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
            <label
              htmlFor={`${inputId}-file`}
              className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 px-4 py-5 text-center transition hover:border-violet-400 hover:bg-violet-50"
            >
              <Upload className="h-6 w-6 text-violet-600" />
              <span className="mt-2 text-sm font-semibold text-slate-800">
                {file ? file.name : "Pilih file dokumen"}
              </span>
              <span className="mt-1 text-xs text-slate-500">PDF, JPG, atau PNG</span>
              <input
                id={`${inputId}-file`}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                className="sr-only"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                required
              />
            </label>
            {file ? (
              <button
                type="button"
                onClick={() => setFile(null)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                <X className="h-3.5 w-3.5" /> Hapus file
              </button>
            ) : null}
          </div>

          <div className="flex justify-end gap-1 border-t border-[#CDD4E0] pt-3">
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
