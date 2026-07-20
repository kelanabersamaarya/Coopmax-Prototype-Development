import * as React from "react";
import { ReceiptText } from "lucide-react";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";
import ProfileMemberDuesTabs, {
  type MemberDuesTab,
} from "@/components/mobile/new-mbanking/profile/ProfileMemberDuesTabs";
import ProfileMemberSavingsCards from "@/components/mobile/new-mbanking/profile/ProfileMemberSavingsCards";
import ProfileMandatorySavingsDepositPage from "@/components/mobile/new-mbanking/profile/ProfileMandatorySavingsDepositPage";
import ProfileTermSavingsDepositPage from "@/components/mobile/new-mbanking/profile/ProfileTermSavingsDepositPage";

type DueHistoryItem = {
  title: string;
  period: string;
  amount: string;
  paidAt: string;
  method: string;
};

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
    title: "Simpanan Berjangka",
    period: "Keanggotaan",
    amount: "Rp. 100.000,00",
    paidAt: "01 April 2026",
    method: "Teller Koperasi",
  },
];

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
  const [showMandatoryDepositPage, setShowMandatoryDepositPage] =
    React.useState(false);
  const [showTermDepositPage, setShowTermDepositPage] = React.useState(false);

  if (showMandatoryDepositPage) {
    return (
      <ProfileMandatorySavingsDepositPage
        onBack={() => setShowMandatoryDepositPage(false)}
      />
    );
  }

  if (showTermDepositPage) {
    return (
      <ProfileTermSavingsDepositPage
        onBack={() => setShowTermDepositPage(false)}
      />
    );
  }

  return (
    <ProfileSubPageShell title="Iuran Simpanan" onBack={onBack}>
      <ProfileMemberDuesTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dues" ? (
        <div className="mt-[18px]">
          <ProfileMemberSavingsCards
            onMandatorySavingsClick={() => setShowMandatoryDepositPage(true)}
            onTermSavingsClick={() => setShowTermDepositPage(true)}
          />
        </div>
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