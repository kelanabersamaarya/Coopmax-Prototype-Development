import { cn } from "@/lib/utils";
import type { TabId } from "./loan-account-edit-types";

function TabPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-full px-5 text-sm font-semibold transition",
        active
          ? "bg-violet-600 text-white shadow-sm"
          : "bg-transparent text-slate-600 hover:bg-white/60",
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}

export default function LoanAccountEditTabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { id: TabId; label: string }[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((t) => (
        <TabPill
          key={t.id}
          label={t.label}
          active={activeTab === t.id}
          onClick={() => onTabChange(t.id)}
        />
      ))}
    </div>
  );
}
