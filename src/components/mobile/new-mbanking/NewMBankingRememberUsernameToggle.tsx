import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingRememberUsernameToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "flex min-h-[54px] w-full items-center gap-3 rounded-[14px] border px-4 py-3 text-left",
        "transition active:scale-[0.99]",
        checked
          ? "border-[#BFE0FF] bg-[#EEF6FF]"
          : "border-[#E5E7EB] bg-white",
      )}
      aria-pressed={checked}
      aria-label="Simpan Username"
    >
      <span
        className={cn(
          "inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[8px] border-2 transition",
          checked
            ? "border-[#479DF4] bg-[#479DF4] text-white"
            : "border-[#CDD4E0] bg-white text-transparent",
        )}
      >
        <Check className="h-[16px] w-[16px]" strokeWidth={3.2} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-bold leading-tight text-black">
          Simpan Username
        </span>
        <span className="mt-[4px] block text-[11px] font-normal leading-snug text-[#8F8F8F]">
          Username akan otomatis terisi saat masuk berikutnya.
        </span>
      </span>
    </button>
  );
}