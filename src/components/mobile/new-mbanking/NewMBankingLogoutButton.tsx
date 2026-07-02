import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingLogoutButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-[44px] w-[44px] items-center justify-center rounded-[13px]",
        "bg-white/20 text-white ring-1 ring-white/25 backdrop-blur",
        "transition active:scale-[0.96]",
      )}
      aria-label="Logout"
      title="Logout"
    >
      <LogOut className="h-[22px] w-[22px] text-white" strokeWidth={2.5} />
    </button>
  );
}