import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

export function OperationalWarningDialog({ open, onOpenChange }: Props) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="[&>button]:hidden max-w-[560px] rounded-[6px] bg-white p-0 text-center shadow-xl"><div className="px-6 pb-6 pt-9"><div className="mx-auto flex h-[78px] w-[78px] items-center justify-center rounded-full border-[4px] border-[#f7c79f] text-[42px] font-semibold leading-none text-[#f4b477]">!</div><h3 className="mt-6 text-[25px] font-semibold leading-tight text-[#4a607c]">Tidak Dapat Menyimpan Data</h3><p className="mx-auto mt-5 max-w-[455px] text-[15px] leading-6 text-[#53657d]">Akses khusus hanya dapat diberikan untuk durasi maksimal 24 jam. Silakan atur ulang tanggal dan waktu akses agar tidak melebihi batas yang ditentukan.</p><button type="button" onClick={() => onOpenChange(false)} className="mt-7 min-w-[104px] rounded-[6px] bg-[#3189d8] px-7 py-2.5 text-[16px] font-semibold text-white shadow-sm">OK</button></div></DialogContent></Dialog>;
}
