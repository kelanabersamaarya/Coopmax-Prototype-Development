import * as React from "react";
import { CheckSquare } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";
import ProfileMandatorySavingsInfoCard from "@/components/mobile/new-mbanking/profile/ProfileMandatorySavingsInfoCard";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-[8px]">
      <label className="text-[14px] font-bold leading-none text-black">
        {label}
      </label>

      <input
        value={value}
        readOnly
        aria-readonly="true"
        className={cn(
          "h-[44px] w-full cursor-not-allowed rounded-[12px] border border-[#CDD4E0]",
          "bg-[#F1F3F6] px-4 text-[14px] font-normal text-black shadow-none outline-none",
        )}
      />
    </div>
  );
}

export default function ProfileMandatorySavingsDepositPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [keterangan, setKeterangan] = React.useState("");
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);

  function submit() {
    toast.success("Setoran Simpanan Wajib berhasil (prototype)", {
      description: "Nominal setoran Rp. 50.000,00",
    });
    onBack();
  }

  return (
    <ProfileSubPageShell
      title="Penyetoran Simpanan Wajib"
      onBack={onBack}
      className="flex min-h-full flex-col"
    >
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <div className="grid gap-[18px]">
        <ReadOnlyField label="Periode" value="Juli 2026" />

        <ProfileMandatorySavingsInfoCard
          label="Sumber Dana"
          title={sourceFund.productName}
          subtitle={sourceFund.accountNo}
          balanceLabel="Saldo"
          balance={sourceFund.balance}
          actionLabel="Pilih sumber dana"
          onAction={() => setSourceFundOpen(true)}
          tone="blue"
        />

        <ProfileMandatorySavingsInfoCard
          label="Tujuan Iuran"
          title="Simpanan Wajib"
          subtitle="SWJ-2600006"
          balanceLabel="Saldo Simpanan Wajib"
          balance="Rp. 100.000,00"
          tone="green"
        />

        <ReadOnlyField label="Nominal Setoran" value="Rp. 50.000,00" />

        <div className="grid gap-[8px]">
          <label className="text-[14px] font-bold leading-none text-black">
            Keterangan
          </label>

          <textarea
            value={keterangan}
            onChange={(event) => setKeterangan(event.target.value)}
            placeholder="Masukkan keterangan"
            className={cn(
              "min-h-[132px] w-full resize-none rounded-[12px] border border-[#CDD4E0]",
              "bg-white px-4 py-3 text-[14px] font-normal text-black shadow-none outline-none",
              "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
              "focus:border-[#479DF4]",
            )}
          />
        </div>
      </div>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={submit}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          <span className="inline-flex items-center justify-center gap-2">
            <CheckSquare className="h-4 w-4" strokeWidth={3} />
            Setor Iuran
          </span>
        </button>
      </div>
    </ProfileSubPageShell>
  );
}