import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { onClose: () => void };

export default function MemberSaveSuccessModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-[528px] rounded-[7px] bg-white px-6 py-10 text-center shadow-[0_10px_35px_rgba(0,0,0,0.18)] sm:px-10">
        <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border-[5px] border-[#e1f1d9]">
          <Check className="h-14 w-14 stroke-[3] text-[#9ddc7b]" />
        </div>
        <h2 className="mt-8 text-[30px] font-bold tracking-[-0.02em] text-[#5a5a5a] sm:text-[32px]">Berhasil menambahkan data</h2>
        <Button type="button" onClick={onClose} className="mt-7 h-[55px] min-w-[104px] rounded-[7px] border-2 border-[#9fc8f1] bg-[#2f86d7] px-8 text-[18px] font-semibold text-white shadow-[0_0_0_2px_rgba(47,134,215,0.16)] hover:bg-[#2478c7]">OK</Button>
      </div>
    </div>
  );
}
