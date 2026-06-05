import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import MBankingLoginForm from "@/components/mobile/MBankingLoginForm";

export default function MobileMBanking() {
  return (
    <div className="h-full min-h-0 overflow-hidden bg-[hsl(var(--app-bg))]">
      <div className="h-full min-h-0 w-full overflow-hidden px-2 py-0 md:px-3">
        <MobileMockupFrame edgeToEdge>
          <MBankingLoginForm />
        </MobileMockupFrame>
      </div>
    </div>
  );
}