import * as React from "react";
import {
  Banknote,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AccountTabId = "simpanan" | "pinjaman" | "deposito";

const tabs: Array<{
  id: AccountTabId;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}> = [
  {
    id: "simpanan",
    label: "Simpanan",
    icon: CreditCard,
  },
  {
    id: "pinjaman",
    label: "Pinjaman",
    icon: Banknote,
  },
  {
    id: "deposito",
    label: "Deposito",
    icon: TrendingUp,
  },
];

function CopyButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
      aria-label={label}
      title={label}
    >
      <Copy className="h-[14px] w-[14px]" strokeWidth={2.5} />
    </button>
  );
}

function AccountInfo({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-normal leading-none text-white/70">
        {label}
      </div>
      <div className="mt-[7px] flex min-w-0 items-center gap-2 text-[16px] font-bold leading-tight tracking-[-0.025em] text-white">
        {children}
      </div>
    </div>
  );
}

function AccountCardContent({
  activeTab,
  showBalance,
  onSavingsDetailClick,
}: {
  activeTab: AccountTabId;
  showBalance: boolean;
  onSavingsDetailClick?: () => void;
}) {
  if (activeTab === "pinjaman") {
    return (
      <>
        <div className="flex items-start justify-between gap-4">
          <AccountInfo label="Pinjaman Billing">
            <span className="truncate">SMG260004</span>
            <CopyButton label="Salin nomor pinjaman" />
          </AccountInfo>

          <button
            type="button"
            className="shrink-0 rounded-full bg-white/95 px-[14px] py-[9px] text-[12px] font-normal leading-none text-[#479DF4] transition active:scale-[0.98]"
          >
            Lihat Detail
          </button>
        </div>

        <div className="mt-[24px]">
          <AccountInfo label="Total Pinjaman">
            <span className="text-[16px] tracking-[-0.025em]">
              {showBalance ? "Rp. 12.000.000,00" : "••••••••••"}
            </span>
          </AccountInfo>
        </div>

        <div className="mt-[24px]">
          <AccountInfo label="Sisa Pinjaman">
            <span className="text-[16px] tracking-[-0.025em]">
              {showBalance ? "Rp. 10.000.000,00" : "••••••••••"}
            </span>
          </AccountInfo>
        </div>
      </>
    );
  }

  if (activeTab === "deposito") {
    return (
      <>
        <div className="flex items-start justify-between gap-4">
          <AccountInfo label="Deposito Berjangka">
            <span className="truncate">DEP112233</span>
            <CopyButton label="Salin nomor deposito" />
          </AccountInfo>

          <button
            type="button"
            className="shrink-0 rounded-full bg-white/95 px-[14px] py-[9px] text-[12px] font-normal leading-none text-[#479DF4] transition active:scale-[0.98]"
          >
            Lihat Detail
          </button>
        </div>

        <div className="mt-[24px]">
          <AccountInfo label="Nominal Deposito">
            <span className="text-[16px] tracking-[-0.025em]">
              {showBalance ? "Rp. 5.000.000,00" : "••••••••••"}
            </span>
          </AccountInfo>
        </div>

        <div className="mt-[24px]">
          <AccountInfo label="Bunga per Tahun">
            <span className="text-[16px] tracking-[-0.025em]">
              {showBalance ? "6,00%" : "••••••"}
            </span>
          </AccountInfo>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <AccountInfo label="Simpanan Harian">
          <span className="truncate">112233111</span>
          <CopyButton label="Salin nomor rekening" />
        </AccountInfo>

        <button
          type="button"
          onClick={onSavingsDetailClick}
          className="shrink-0 rounded-full bg-white/95 px-[14px] py-[9px] text-[12px] font-normal leading-none text-[#479DF4] transition active:scale-[0.98]"
        >
          Lihat Detail
        </button>
      </div>

      <div className="mt-[24px]">
        <AccountInfo label="Nomor VA">
          <span className="truncate">88810 112233111</span>
          <CopyButton label="Salin nomor VA" />
        </AccountInfo>
      </div>

      <div className="mt-[24px]">
        <AccountInfo label="Saldo Simpanan">
          <span className="text-[16px] tracking-[-0.025em]">
            {showBalance ? "Rp. 4.000.000,00" : "••••••••••"}
          </span>
        </AccountInfo>
      </div>
    </>
  );
}

export default function NewMBankingAccountsSection({
  className,
  onSavingsDetailClick,
}: {
  className?: string;
  onSavingsDetailClick?: () => void;
}) {
  const [showBalance, setShowBalance] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<AccountTabId>("simpanan");

  return (
    <section
      className={cn(
        "mx-[-8px] mt-[24px] rounded-[24px] border border-[#D9D9D9] p-[16px]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[18px] font-bold leading-tight tracking-[-0.035em] text-[#111827]">
          Rekening Anda
        </h2>

        <button
          type="button"
          onClick={() => setShowBalance((value) => !value)}
          className="inline-flex items-center gap-[6px] rounded-full text-[13px] font-normal leading-none text-[#479DF4] transition active:scale-[0.98]"
          aria-label={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
          title={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
        >
          Saldo
          {showBalance ? (
            <Eye className="h-[17px] w-[17px]" strokeWidth={2.4} />
          ) : (
            <EyeOff className="h-[17px] w-[17px]" strokeWidth={2.4} />
          )}
        </button>
      </div>

      <div className="mt-[18px]">
        <div className="grid grid-cols-3 items-end gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="relative flex min-w-0 flex-col items-center pb-[12px] transition active:scale-[0.98]"
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className={cn(
                    "flex items-center justify-center gap-[6px]",
                    isActive ? "text-[#479DF4]" : "text-[#8F8F8F]",
                  )}
                >
                  <Icon className="h-[19px] w-[19px]" strokeWidth={2.5} />
                  <span className="truncate text-[13px] font-normal leading-none">
                    {tab.label}
                  </span>
                </div>

                {isActive ? (
                  <span className="absolute bottom-0 left-1/2 h-[3px] w-[42px] -translate-x-1/2 rounded-full bg-[#479DF4]" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="h-px w-full bg-[#E5E7EB]" />
      </div>

      <div className="relative mt-[18px] overflow-hidden rounded-[24px] bg-[#479DF4] px-5 pb-5 pt-5 text-white">
        <div className="pointer-events-none absolute -right-[46px] -top-[42px] h-[142px] w-[142px] rounded-full bg-white/12" />
        <div className="pointer-events-none absolute right-[28px] top-[54px] h-[72px] w-[72px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-[34px] right-[84px] h-[96px] w-[96px] rounded-full bg-white/8" />

        <div className="relative z-10">
          <AccountCardContent
            activeTab={activeTab}
            showBalance={showBalance}
            onSavingsDetailClick={onSavingsDetailClick}
          />
        </div>
      </div>

      <div className="mt-[14px] flex items-center justify-center gap-[7px]">
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            className={cn(
              "rounded-full transition-all",
              item === 0
                ? "h-[8px] w-[22px] bg-[#111827]"
                : "h-[8px] w-[8px] bg-[#D8D8D8]",
            )}
          />
        ))}
      </div>
    </section>
  );
}