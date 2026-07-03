import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export type NewMBankingRecipientInfo = {
  name: string;
  accountNo: string;
};

export default function NewMBankingRecipientInfoCard({
  recipient,
  className,
}: {
  recipient: NewMBankingRecipientInfo;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[15px] border border-[#E5E7EB] bg-white px-4 py-4",
        "shadow-none",
        className,
      )}
    >
      <div className="text-[14px] font-bold leading-none text-black">
        Rekening Tujuan
      </div>

      <div className="mt-[14px] flex items-center gap-[12px]">
        <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
          <UserRound className="h-[23px] w-[23px] text-white" strokeWidth={2.45} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
            {recipient.name}
          </div>
          <div className="mt-[6px] truncate text-[13px] font-normal leading-tight text-[#8F8F8F]">
            {recipient.accountNo}
          </div>
        </div>
      </div>
    </div>
  );
}