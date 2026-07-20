import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const accounts = [
  {
    title: "Simpanan Pokok",
    accountNo: "SPK-2600006",
    balance: "Rp. 100.000,00",
    status: "Aktif",
    tone: "blue",
  },
  {
    title: "Simpanan Wajib",
    accountNo: "SWJ-2600006",
    balance: "Rp. 50.000,00",
    status: "Aktif",
    tone: "green",
  },
] as const;

function MemberSavingsCard({
  title,
  accountNo,
  balance,
  status,
  tone,
}: {
  title: string;
  accountNo: string;
  balance: string;
  status: string;
  tone: "blue" | "green";
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[20px] px-4 py-4 text-white",
        tone === "green"
          ? "bg-[linear-gradient(135deg,#18B7A1_0%,#0F766E_58%,#115E59_100%)]"
          : "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_54%,#7C3AED_100%)]",
      )}
    >
      <div className="pointer-events-none absolute -right-[36px] -top-[36px] h-[116px] w-[116px] rounded-full bg-white/16" />
      <div className="pointer-events-none absolute right-[42px] top-[54px] h-[54px] w-[54px] rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-[34px] left-[64px] h-[88px] w-[88px] rounded-full bg-black/10" />

      <div className="relative z-10">
        <div className="flex items-start justify-end">
          <span className="inline-flex h-[26px] shrink-0 items-center gap-1.5 rounded-full bg-white px-3 text-[11px] font-bold leading-none text-[#15965A] ring-1 ring-white/70">
            {status}
            <Check className="h-[13px] w-[13px] text-[#15965A]" strokeWidth={3} />
          </span>
        </div>

        <div className="mt-[18px]">
          <div className="text-[12px] font-normal leading-none text-white/78">
            Jenis Rekening
          </div>
          <div className="mt-[7px] text-[18px] font-bold leading-tight tracking-[-0.03em] text-white">
            {title}
          </div>
        </div>

        <div className="mt-[18px]">
          <div className="text-[12px] font-normal leading-none text-white/78">
            No. Rekening
          </div>
          <div className="mt-[7px] flex min-w-0 items-center gap-2 text-[14px] font-semibold leading-tight text-white">
            <span className="truncate">{accountNo}</span>
            <button
              type="button"
              className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
              aria-label={`Salin rekening ${title}`}
              title="Salin"
            >
              <Copy className="h-[14px] w-[14px]" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="mt-[18px]">
          <div className="text-[12px] font-normal leading-none text-white/78">
            Saldo
          </div>
          <div className="mt-[7px] text-[16px] font-bold leading-tight tracking-[-0.025em] text-white">
            {balance}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProfileMemberSavingsCards() {
  return (
    <div className="grid gap-[12px]">
      {accounts.map((account) => (
        <MemberSavingsCard
          key={account.title}
          title={account.title}
          accountNo={account.accountNo}
          balance={account.balance}
          status={account.status}
          tone={account.tone}
        />
      ))}
    </div>
  );
}