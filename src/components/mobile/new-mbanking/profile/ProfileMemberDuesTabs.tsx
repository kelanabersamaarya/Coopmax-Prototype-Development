import { cn } from "@/lib/utils";

export type MemberDuesTab = "dues" | "history";

const tabs: Array<{ id: MemberDuesTab; label: string }> = [
  { id: "dues", label: "Iuran Simpanan" },
  { id: "history", label: "Riwayat Iuran" },
];

export default function ProfileMemberDuesTabs({
  activeTab,
  onChange,
  className,
}: {
  activeTab: MemberDuesTab;
  onChange: (tab: MemberDuesTab) => void;
  className?: string;
}) {
  return (
    <div className={cn("rounded-full bg-[#EEF0F4] p-[4px]", className)}>
      <div className="grid grid-cols-2 gap-[4px]">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "h-[40px] rounded-full text-[13px] font-bold leading-none transition active:scale-[0.98]",
                active
                  ? "bg-[#479DF4] text-white shadow-sm"
                  : "bg-transparent text-[#4B5563]",
              )}
              aria-current={active ? "page" : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}