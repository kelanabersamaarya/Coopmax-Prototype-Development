import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void };

export function OperationalSuccessDialog({ open, onOpenChange, onConfirm }: Props) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent overlayClassName="z-[10000] bg-black/90" className="[&>button]:hidden z-[10001] max-w-[544px] rounded-[6px] bg-white p-0 text-center shadow-xl"><div className="px-6 pb-4 pt-10"><div className="mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-full border-[4px] border-[#dcefd4] text-[#91d376]"><Check className="h-14 w-14" strokeWidth={3} /></div><h3 className="mt-8 text-[26px] font-semibold leading-tight text-[#5a5a5a]">Berhasil menambahkan data</h3><div className="mt-8 flex justify-center"><button type="button" onClick={onConfirm} className="min-w-[112px] rounded-[6px] border-[3px] border-[#c8dced] bg-[#3189d8] px-7 py-2.5 text-[17px] font-semibold text-white shadow-sm">OK</button></div></div></DialogContent></Dialog>;
}
