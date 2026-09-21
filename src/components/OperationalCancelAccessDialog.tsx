import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  reason: string;
  onReasonChange: (reason: string) => void;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function OperationalCancelAccessDialog({ open, reason, onReasonChange, onOpenChange, onConfirm }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="[&>button]:hidden w-[calc(100vw-2rem)] max-w-[760px] rounded-[6px] bg-white p-0 text-[#17345f] shadow-xl">
        <div className="flex items-center justify-between border-b border-[#D7DEE9] px-5 py-4">
          <h3 className="text-[16px] font-bold">Pembatalan Akses Khusus Operasional</h3>
          <button type="button" onClick={() => onOpenChange(false)} aria-label="Tutup modal" className="text-[#53657d] hover:text-[#17345f]"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-5 py-7">
          <label className="grid gap-2 sm:grid-cols-[210px_1fr] sm:items-start">
            <span className="text-[12px] font-medium">Alasan Pembatalan Akses <span className="text-red-500">*</span></span>
            <textarea value={reason} onChange={(event) => onReasonChange(event.target.value)} required className="min-h-[122px] rounded-[6px] border border-[#D1DCEB] px-3 py-3 text-[13px] outline-none focus:border-[#4169f5]" placeholder="Masukkan alasan pembatalan akses" />
          </label>
        </div>
        <div className="flex justify-end gap-2 border-t border-[#D7DEE9] px-5 py-4">
          <button type="button" onClick={() => onOpenChange(false)} className="rounded-[6px] bg-[#8291ad] px-4 py-2 text-[12px] font-semibold text-white"><X className="mr-1 inline h-3.5 w-3.5" />Batalkan</button>
          <button type="button" onClick={onConfirm} disabled={!reason.trim()} className="rounded-[6px] bg-[#20b900] px-5 py-2 text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Simpan</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
