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

type SimpananCard = {
  id: string;
  productName: string;
  accountNo: string;
  vaNumber: string;
  balance: string;
};

type PinjamanCard = {
  id: string;
  productName: string;
  accountNo: string;
  totalLoan: string;
  remainingLoan: string;
};

type DepositoCard = {
  id: string;
  productName: string;
  accountNo: string;
  amount: string;
  interestRate: string;
};

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

const simpananCards: SimpananCard[] = [
  {
    id: "simpanan-1",
    productName: "Simpanan Harian",
    accountNo: "112233111",
    vaNumber: "88810 112233111",
    balance: "Rp. 4.000.000,00",
  },
  {
    id: "simpanan-2",
    productName: "Simpanan Sukarela",
    accountNo: "4260029",
    vaNumber: "88810 4260029",
    balance: "Rp. 2.750.000,00",
  },
  {
    id: "simpanan-3",
    productName: "Simpanan Mapan",
    accountNo: "112233222",
    vaNumber: "88810 112233222",
    balance: "Rp. 20.000.000,00",
  },
];

const pinjamanCards: PinjamanCard[] = [
  {
    id: "pinjaman-1",
    productName: "Pinjaman Billing",
    accountNo: "SMG260004",
    totalLoan: "Rp. 12.000.000,00",
    remainingLoan: "Rp. 10.000.000,00",
  },
  {
    id: "pinjaman-2",
    productName: "Pinjaman Billing",
    accountNo: "12260006",
    totalLoan: "Rp. 12.000.000,00",
    remainingLoan: "Rp. 10.553.571,00",
  },
  {
    id: "pinjaman-3",
    productName: "Pinjaman Harian",
    accountNo: "072260001",
    totalLoan: "Rp. 22.000.000,00",
    remainingLoan: "Rp. 22.000.000,00",
  },
];

const depositoCards: DepositoCard[] = [
  {
    id: "deposito-1",
    productName: "Deposito Berjangka",
    accountNo: "DEP112233",
    amount: "Rp. 5.000.000,00",
    interestRate: "6,00%",
  },
  {
    id: "deposito-2",
    productName: "Deposito 6 Bulan",
    accountNo: "DEP445566",
    amount: "Rp. 10.000.000,00",
    interestRate: "5,50%",
  },
  {
    id: "deposito-3",
    productName: "Deposito 12 Bulan",
    accountNo: "DEP778899",
    amount: "Rp. 15.000.000,00",
    interestRate: "6,25%",
  },
];

const accountCardStyles: Record<
  AccountTabId,
  {
    background: string;
    glowOne: string;
    glowTwo: string;
    glowThree: string;
  }
> = {
  simpanan: {
    background:
      "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_52%,#1D4ED8_100%)]",
    glowOne: "bg-white/16",
    glowTwo: "bg-cyan-200/18",
    glowThree: "bg-blue-950/10",
  },
  pinjaman: {
    background:
      "bg-[linear-gradient(135deg,#14B8A6_0%,#0F766E_55%,#115E59_100%)]",
    glowOne: "bg-white/18",
    glowTwo: "bg-emerald-200/18",
    glowThree: "bg-teal-950/14",
  },
  deposito: {
    background:
      "bg-[linear-gradient(135deg,#F59E0B_0%,#EA580C_54%,#C2410C_100%)]",
    glowOne: "bg-white/18",
    glowTwo: "bg-amber-100/22",
    glowThree: "bg-orange-950/14",
  },
};

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
      <div className="text-[11px] font-normal leading-none text-white/78">
        {label}
      </div>
      <div className="mt-[7px] flex min-w-0 items-center gap-2 text-[16px] font-bold leading-tight tracking-[-0.025em] text-white drop-shadow-[0_1px_1px_rgba(15,23,42,0.18)]">
        {children}
      </div>
    </div>
  );
}

function maskValue() {
  return "••••••••••";
}

function AccountCardShell({
  activeTab,
  children,
}: {
  activeTab: AccountTabId;
  children: React.ReactNode;
}) {
  const cardStyle = accountCardStyles[activeTab];

  return (
    <div
      className={cn(
        "relative min-h-[205px] w-full shrink-0 snap-start overflow-hidden rounded-[24px] px-5 pb-5 pt-5 text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)]",
        cardStyle.background,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-[46px] -top-[42px] h-[142px] w-[142px] rounded-full",
          cardStyle.glowOne,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute right-[28px] top-[54px] h-[72px] w-[72px] rounded-full",
          cardStyle.glowTwo,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute -bottom-[34px] right-[84px] h-[96px] w-[96px] rounded-full",
          cardStyle.glowThree,
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(15,23,42,0.12))]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SimpananCardContent({
  card,
  showBalance,
  onSavingsDetailClick,
}: {
  card: SimpananCard;
  showBalance: boolean;
  onSavingsDetailClick?: () => void;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <AccountInfo label={card.productName}>
          <span className="truncate">{card.accountNo}</span>
          <CopyButton label="Salin nomor rekening" />
        </AccountInfo>

        <button
          type="button"
          onClick={onSavingsDetailClick}
          className="shrink-0 rounded-full bg-white/95 px-[14px] py-[9px] text-[12px] font-normal leading-none text-[#2563EB] shadow-sm transition active:scale-[0.98]"
        >
          Lihat Detail
        </button>
      </div>

      <div className="mt-[22px]">
        <AccountInfo label="Nomor VA">
          <span className="truncate">{card.vaNumber}</span>
          <CopyButton label="Salin nomor VA" />
        </AccountInfo>
      </div>

      <div className="mt-[22px]">
        <AccountInfo label="Saldo Simpanan">
          <span className="text-[16px] tracking-[-0.025em]">
            {showBalance ? card.balance : maskValue()}
          </span>
        </AccountInfo>
      </div>
    </>
  );
}

function PinjamanCardContent({
  card,
  showBalance,
  onLoanDetailClick,
}: {
  card: PinjamanCard;
  showBalance: boolean;
  onLoanDetailClick?: () => void;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <AccountInfo label={card.productName}>
          <span className="truncate">{card.accountNo}</span>
          <CopyButton label="Salin nomor pinjaman" />
        </AccountInfo>

        <button
          type="button"
          onClick={onLoanDetailClick}
          className="shrink-0 rounded-full bg-white/95 px-[14px] py-[9px] text-[12px] font-normal leading-none text-[#0F766E] shadow-sm transition active:scale-[0.98]"
        >
          Lihat Detail
        </button>
      </div>

      <div className="mt-[22px]">
        <AccountInfo label="Total Pinjaman">
          <span className="text-[16px] tracking-[-0.025em]">
            {showBalance ? card.totalLoan : maskValue()}
          </span>
        </AccountInfo>
      </div>

      <div className="mt-[22px]">
        <AccountInfo label="Sisa Pinjaman">
          <span className="text-[16px] tracking-[-0.025em]">
            {showBalance ? card.remainingLoan : maskValue()}
          </span>
        </AccountInfo>
      </div>
    </>
  );
}

function DepositoCardContent({
  card,
  showBalance,
  onToggleBalance,
  onDepositDetailClick,
}: {
  card: DepositoCard;
  showBalance: boolean;
  onToggleBalance: () => void;
  onDepositDetailClick?: () => void;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] font-normal leading-none text-white/78">
            Produk Deposito
          </div>
          <div className="mt-[7px] truncate text-[16px] font-bold leading-tight tracking-[-0.025em] text-white drop-shadow-[0_1px_1px_rgba(15,23,42,0.18)]">
            {card.productName}
          </div>
        </div>

        <button
          type="button"
          onClick={onDepositDetailClick}
          className="shrink-0 rounded-full bg-white/95 px-[14px] py-[9px] text-[12px] font-normal leading-none text-[#C2410C] shadow-sm transition active:scale-[0.98]"
        >
          Lihat Detail
        </button>
      </div>

      <div className="mt-[22px]">
        <AccountInfo label="Nomor Rekening Deposito">
          <span className="truncate">{card.accountNo}</span>
          <CopyButton label="Salin nomor rekening deposito" />
        </AccountInfo>
      </div>

      <div className="mt-[22px]">
        <AccountInfo label="Nominal Deposito">
          <span className="text-[16px] tracking-[-0.025em]">
            {showBalance ? card.amount : maskValue()}
          </span>
          <button
            type="button"
            onClick={onToggleBalance}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
            aria-label={
              showBalance
                ? "Sembunyikan nominal deposito"
                : "Tampilkan nominal deposito"
            }
            title={
              showBalance
                ? "Sembunyikan nominal deposito"
                : "Tampilkan nominal deposito"
            }
          >
            {showBalance ? (
              <Eye className="h-[16px] w-[16px]" strokeWidth={2.4} />
            ) : (
              <EyeOff className="h-[16px] w-[16px]" strokeWidth={2.4} />
            )}
          </button>
        </AccountInfo>
      </div>

      <div className="sr-only">{card.interestRate}</div>
    </>
  );
}

export default function NewMBankingAccountsSection({
  className,
  onSavingsDetailClick,
  onLoanDetailClick,
  onDepositDetailClick,
}: {
  className?: string;
  onSavingsDetailClick?: () => void;
  onLoanDetailClick?: () => void;
  onDepositDetailClick?: () => void;
}) {
  const [showBalance, setShowBalance] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<AccountTabId>("simpanan");
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const cards = React.useMemo(() => {
    if (activeTab === "pinjaman") return pinjamanCards;
    if (activeTab === "deposito") return depositoCards;
    return simpananCards;
  }, [activeTab]);

  React.useEffect(() => {
    setActiveCardIndex(0);
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeTab]);

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.firstElementChild as HTMLElement | null;
    if (!firstCard) return;

    const gap = 12;
    const step = firstCard.offsetWidth + gap;
    const nextIndex = Math.round(container.scrollLeft / step);
    setActiveCardIndex(Math.min(Math.max(0, nextIndex), cards.length - 1));
  }

  function goToCard(index: number) {
    const container = scrollRef.current;
    const firstCard = container?.firstElementChild as HTMLElement | null;
    if (!container || !firstCard) return;

    const gap = 12;
    const step = firstCard.offsetWidth + gap;
    container.scrollTo({ left: index * step, behavior: "smooth" });
    setActiveCardIndex(index);
  }

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

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="mt-[18px] flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {activeTab === "simpanan"
          ? simpananCards.map((card) => (
              <AccountCardShell key={card.id} activeTab={activeTab}>
                <SimpananCardContent
                  card={card}
                  showBalance={showBalance}
                  onSavingsDetailClick={onSavingsDetailClick}
                />
              </AccountCardShell>
            ))
          : null}

        {activeTab === "pinjaman"
          ? pinjamanCards.map((card) => (
              <AccountCardShell key={card.id} activeTab={activeTab}>
                <PinjamanCardContent
                  card={card}
                  showBalance={showBalance}
                  onLoanDetailClick={onLoanDetailClick}
                />
              </AccountCardShell>
            ))
          : null}

        {activeTab === "deposito"
          ? depositoCards.map((card) => (
              <AccountCardShell key={card.id} activeTab={activeTab}>
                <DepositoCardContent
                  card={card}
                  showBalance={showBalance}
                  onToggleBalance={() => setShowBalance((value) => !value)}
                  onDepositDetailClick={onDepositDetailClick}
                />
              </AccountCardShell>
            ))
          : null}
      </div>

      <div className="mt-[14px] flex items-center justify-center gap-[7px]">
        {cards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => goToCard(index)}
            className={cn(
              "rounded-full transition-all",
              index === activeCardIndex
                ? "h-[8px] w-[22px] bg-[#479DF4]"
                : "h-[8px] w-[8px] bg-[#D8D8D8]",
            )}
            aria-label={`Lihat card ${index + 1}`}
            aria-current={index === activeCardIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}