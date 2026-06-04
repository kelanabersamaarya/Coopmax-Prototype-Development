import EKolektorMockup from "@/components/mobile/EKolektorMockup";

export default function MobileEKolektor() {
  return (
    <div className="h-full min-h-0 overflow-hidden bg-[hsl(var(--app-bg))]">
      <div className="h-full min-h-0 w-full overflow-hidden px-2 py-0 md:px-3">
        <EKolektorMockup />
      </div>
    </div>
  );
}