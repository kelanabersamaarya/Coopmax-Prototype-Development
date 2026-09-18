import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
};

export function OperationalSuccessDialog({ open, onOpenChange, title }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="[&>button]:hidden max-w-[528px] rounded-[6px] bg-white p-0 text-center shadow-xl">
        <div className="px-6 pb-5 pt-10">
          <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#e1f1d9] text-[#92d477]">
            <Check className="h-[58px] w-[58px] stroke-[2.5]" />
          </div>
          <h3 className="mt-8 text-[30px] font-semibold leading-tight text-[#5b5b5b]">{title}</h3>
          <button type="button" onClick={() => onOpenChange(false)} className="mt-8 min-w-[104px] rounded-[6px] border-[3px] border-[#c8dced] bg-[#3189d8] px-7 py-2.5 text-[17px] font-semibold text-white shadow-sm">
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
