import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; title?: string };

export function OperationalConfirmDialog({ open, onOpenChange, onConfirm, title = "Yakin untuk menyimpan data ?" }: Props) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent overlayClassName="z-[10000] bg-black/90" className="[&>button]:hidden z-[10001] max-w-[528px] rounded-[6px] bg-white p-0 text-center shadow-xl"><div className="px-6 pb-5 pt-10"><div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#f7c79f] text-[50px] font-semibold leading-none text-[#f4b477]">!</div><h3 className="mt-8 text-[30px] font-semibold leading-tight text-[#4a607c]">{title}</h3><div className="mt-8 flex justify-center gap-2"><button type="button" onClick={onConfirm} className="min-w-[104px] rounded-[6px] border-[3px] border-[#c8dced] bg-[#3189d8] px-7 py-2.5 text-[17px] font-semibold text-white shadow-sm">Yes</button><button type="button" onClick={() => onOpenChange(false)} className="min-w-[126px] rounded-[6px] bg-[#a9a9a9] px-7 py-2.5 text-[17px] font-semibold text-white">Cancel</button></div></div></DialogContent></Dialog>;
}
