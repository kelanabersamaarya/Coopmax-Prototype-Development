import * as React from "react";
import { CheckCircle2, Clock3, ReceiptText, WalletCards } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";
import ProfileMemberDuesTabs, {
  type MemberDuesTab,
} from "@/components/mobile/new-mbanking/profile/ProfileMemberDuesTabs";

type DueItem = {
  title: string;
  period: string;
  amount: string;
  status: "Lunas" | "Belum Bayar";
};

type DueHistoryItem = {
  title: string;
  period: string;
  amount: string;
  paidAt: string;
  method: string;
};

const dues: DueItem[] = [
  {
    title: "Simpanan Wajib",
    period: "Juli 2026",
    amount: "Rp. 50.000,00",
    status: "Belum Bayar",
  },
  {
    title: "Simpanan Wajib",
    period: "Juni 2026",
    amount: "Rp. 50.000,00",
    status: "Lunas",
  },
  {
    title: "Simpanan Pokok",
    period: "Keanggotaan",
    amount: "Rp. 100.000,00",
    status: "Lunas",
  },
];

const dueHistories: DueHistoryItem[] = [
  {
    title: "Simpanan Wajib",
    period: "Juni 2026",
    amount: "Rp. 50.000,00",
    paidAt: "20 Juni 2026",
    method: "M-Banking",
  },
  {
    title: "Simpanan Wajib",
    period: "Mei 2026",
    amount: "Rp. 50.000,00",
    paidAt: "20 Mei 2026",
    method: "Teller Koperasi",
  },
  {
    title: "Simpanan Pokok",
    period: "Keanggotaan",
    amount: "Rp. 100.000,00",
    paidAt: "01 April 2026",
    method: "Teller Koperasi",
  },
];

function StatusBadge({ status }: { status: DueItem["status"] }) {
  const isPaid = status === "Lunas";
  const Icon = isPaid ? CheckCircle2 : Clock3;

  return (
    <span
      className={cn(
        "inline-flex h-[26px] items-center gap-1.5 rounded-full px-3",
        "text-[11px] font-bold leading-none",
        isPaid
          ? "bg-[#EAF8EF] text-[#15965A]"
          : "bg-[#FFF7E6] text-[#B45309]",
      )}
    >
      <Icon className="h-[13px] w-[13px]" strokeWidth={2.7} />
      {status}
    </span>
  );
}

function DueCard({ item }: { item: DueItem }) {
  const isPaid = item.status === "Lunas";

  return (
    <article className="rounded-[18px] bg-white px-4 py-4 shadow-sm ring-1 ring-[#EEF0F4]">
      <div className="flex items-start gap-3">
        <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
          <WalletCards className="h-[22px] w-[22px]" strokeWidth={2.6} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[15px] font-bold leading-tight text-black">
                {item.title}
              </div>
              <div className="mt-[6px] text-[12px] font-normal leading-none text-[#8F8F8F]">
                {item.period}
              </div>
            </div>

            <StatusBadge status={item.status} />
          </div>

          <div className="mt-[16px] flex items-center justify-between gap-4">
            <div className="text-[12px] font-normal text-[#8F8F8F]">
              Nominal
            </div>
            <div className="text-[15px] font-bold text-black">{item.amount}</div>
          </div>

          {!isPaid ? (
            <button
              type="button"
              onClick={() =>
                toast.success("Bayar Iuran Simpanan (prototype)", {
                  description: `${item.title} • ${item.period}`,
                })
              }
              className={cn(
                "mt-[16px] h-[42px] w-full rounded-[10px] bg-[#479DF4]",
                "text-[12px] font-semibold leading-none text-white",
                "transition active:scale-[0.98]",
              )}
            >
              Bayar Iuran
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function HistoryCard({ item }: { item: DueHistoryItem }) {
  return (
    <article className="rounded-[18px] bg-white px-4 py-4 shadow-sm ring-1 ring-[#EEF0F4]">
      <div className="flex items-start gap-3">
        <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#15965A] text-white">
          <ReceiptText className="h-[22px] w-[22px]" strokeWidth={2.6} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[15px] font-bold leading-tight text-black">
                {item.title}
              </div>
              <div className="mt-[6px] text-[12px] font-normal leading-none text-[#8F8F8F]">
                {item.period}
              </div>
            </div>

            <span className="inline-flex h-[26px] items-center rounded-full bg-[#EAF8EF] px-3 text-[11px] font-bold leading-none text-[#15965A]">
              Lunas
            </span>
          </div>

          <div className="mt-[16px] grid gap-[10px]">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[12px] font-normal text-[#8F8F8F]">
                Nominal
              </div>
              <div className="text-[14px] font-bold text-black">{item.amount}</div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-[12px] font-normal text-[#8F8F8F]">
                Tanggal Bayar
              </div>
              <div className="text-right text-[12px] font-semibold text-black">
                {item.paidAt}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-[12px] font-normal text-[#8F8F8F]">
                Metode
              </div>
              <div className="text-right text-[12px] font-semibold text-black">
                {item.method}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProfileMemberDuesPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = React.useState<MemberDuesTab>("dues");

  return (
    <ProfileSubPageShell title="Iuran Simpanan" onBack={onBack}>
      <ProfileMemberDuesTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dues" ? (
        <>
          <div className="mt-[18px] rounded-[22px] bg-[#EEF6FF] px-4 py-4 ring-1 ring-[#CFE4FF]">
            <div className="text-[15px] font-bold leading-tight text-black">
              Ringkasan Iuran
            </div>
            <div className="mt-[8px] text-[12px] font-normal leading-relaxed text-[#315E8F]">
              Pantau status iuran simpanan wajib dan simpanan pokok anggota Anda.
            </div>
          </div>

          <div className="mt-[18px] grid gap-[12px]">
            {dues.map((item) => (
              <DueCard key={`${item.title}-${item.period}`} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-[18px] grid gap-[12px]">
          {dueHistories.map((item) => (
            <HistoryCard key={`${item.title}-${item.period}`} item={item} />
          ))}
        </div>
      )}
    </ProfileSubPageShell>
  );
}