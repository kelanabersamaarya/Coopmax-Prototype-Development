import { toast } from "sonner";
import LoanAccountDetailHeader from "@/components/loans/LoanAccountDetailHeader";
import LoanAccountDetailSections from "@/components/loans/LoanAccountDetailSections";

export default function LoanAccountDetailView({
  accountNo,
  onBack,
  showBillingSection = true,
}: {
  accountNo: string;
  onBack: () => void;
  showBillingSection?: boolean;
}) {
  return (
    <>
      <LoanAccountDetailHeader
        accountNo={accountNo}
        onBack={onBack}
        onAction={(label) =>
          toast(`${label} (prototype)`, {
            description: `Rekening: ${accountNo}`,
          })
        }
      />

      <LoanAccountDetailSections
        accountNo={accountNo}
        showBillingSection={showBillingSection}
        meta={{
          skemaTagihan: "Tagihan Sesuai Jadwal Angsuran",
          satuanGracePeriod: "Bulan",
          durasiGracePeriod: "3",
        }}
      />
    </>
  );
}
