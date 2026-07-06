import { useIsMobile } from "@/hooks/use-mobile";
import NewMBankingMockup from "@/components/mobile/NewMBankingMockup";
import NewMBankingResponsiveApp from "@/components/mobile/NewMBankingResponsiveApp";

export default function NewMBanking() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-white">
        <NewMBankingResponsiveApp />
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 overflow-hidden bg-[hsl(var(--app-bg))]">
      <div className="h-full min-h-0 w-full overflow-hidden px-2 py-0 md:px-3">
        <NewMBankingMockup />
      </div>
    </div>
  );
}