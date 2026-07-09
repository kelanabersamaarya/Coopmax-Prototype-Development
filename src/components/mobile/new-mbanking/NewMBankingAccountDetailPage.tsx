import * as React from "react";
import {
  ArrowLeft,
  BatteryMedium,
  Banknote,
  Copy,
  Eye,
  EyeOff,
  Landmark,
  Send,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingDepositPage from "@/components/mobile/new-mbanking/NewMBankingDepositPage";
import NewMBankingInterbankTransferPage from "@/components/mobile/new-mbanking/NewMBankingInterbankTransferPage";

type TransactionItem = {
  id: string;
  type: "out" | "in";
  title: string;
  subtitle: string;
  amount: string;
};

type TransactionGroup = {
  date: string;
  items: TransactionItem[];
};

type TransferMode = "antar-rekening" | "antar-bank";

const monthChips = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const transactionGroups: TransactionGroup[] = [
  {
    date: "20 Juni 2026",
    items: [
      {
        id: "trx-1",
        type: "in",
        title: "Setoran",
        subtitle: "Simpanan Kaya • Teller Koperasi",
        amount: "+Rp. 500.000,00",
      },
      {
        id: "trx-2",
        type: "out",
        title: "Tarikan",
        subtitle: "Simpanan Kaya • Teller Koperasi",
        amount: "-Rp. 250.000,00",
      },
      {
        id: "trx-3",
        type: "out",
        title: "Transfer Keluar",
        subtitle: "Bank BCA • 8890123441",
        amount: "-Rp. 250.000,00",
      },
    ],
  },
  {
    date: "19 Juni 2026",
    items: [
      {
        id: "trx-4",
        type: "in",
        title: "Setoran",
        subtitle: "Simpanan Harian • Mobile Banking",
        amount: "+Rp. 300.000,00",
      },
      {
        id: "trx-5",
        type: "out",
        title: "Tarikan",
        subtitle: "Simpanan Kaya • ATM Koperasi",
        amount: "-Rp. 125.000,00",
      },
      {
        id: "trx-6",
        type: "out",
        title: "Transfer Keluar",
        subtitle: "Bank Mandiri • 7001234567",
        amount: "-Rp. 125.000,00",
      },
    ],
  },
];

function StatusBar() {
  return (
    <div className="flex h-[30px] shrink-0 items-center justify-between px-6 pt-2 text-black">
      <div className="text-[14px] font-bold leading-none tracking-[-0.02em]">
        11:30
      </div>

      <div className="flex items-center gap-[8px]">
        <div className="flex h-4 items-end gap-[2px]" aria-hidden="true">
          <span className="h-[5px] w-[3px] rounded-full bg-black" />
          <span className="h-[8px] w-[3px] rounded-full bg-black" />
          <span className="h-[11px] w-[3px] rounded-full bg-black" />
          <span className="h-[14px] w-[3px] rounded-full bg-black" />
        </div>
        <Wifi className="h-[17px] w-[17px] text-black" strokeWidth={2.6} />
        <BatteryMedium
          className="h-[19px] w-[19px] text-black"
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
  onClick,
  frameClassName,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  onClick?: () => void;
  frameClassName: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-w-0 flex-col items-center text-center transition active:scale-[0.97]"
      aria-label={label}
    >
      <span
        className={cn(
          "grid h-[64px] w-[64px] place-items-center rounded-[16px] text-white",
          "border-0 shadow-none ring-0 outline-none",
          frameClassName,
        )}
      >
        <Icon className="h-[31px] w-[31px] text-white" strokeWidth={2.35} />
      </span>

      <span className="mt-[9px] max-w-[94px] text-center text-[14px] font-normal leading-tight tracking-[-0.02em] text-black">
        {label}
      </span>
    </button>
  );
}

function CardInfo({
  label,
  value,
  copyable = false,
  children,
}: {
  label: string;
  value?: string;
  copyable?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] font-normal leading-none text-white/80">
        {label}
      </div>
      <div className="mt-[8px] flex items-center gap-2 text-[16px] font-bold leading-tight tracking-[-0.025em] text-white drop-shadow-[0_1px_1px_rgba(15,23,42,0.18)]">
        {children ?? <span>{value}</span>}
        {copyable ? (
          <button
            type="button"
            className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
            aria-label={`Salin ${label}`}
            title="Salin"
          >
            <Copy className="h-[14px] w-[14px]" strokeWidth={2.5} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function TransactionIcon({ type }: { type: TransactionItem["type"] }) {
  const isTransferOut = type === "out";
  const Icon = isTransferOut ? Send : Banknote;

  return (
    <span
      className={cn(
        "grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full",
        isTransferOut
          ? "bg-[#EAF3FF] text-[#2F80ED]"
          : "bg-[#EAF8EF] text-[#33AA00]",
      )}
    >
      <Icon className="h-[20px] w-[20px]" strokeWidth={2.6} />
    </span>
  );
}

function TransactionRow({ item }: { item: TransactionItem }) {
  const isIncome = item.type === "in";

  return (
    <div className="flex items-start justify-between gap-4 py-[14px]">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <TransactionIcon type={item.type} />

        <div className="min-w-0 pt-[2px]">
          <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
            {item.title}
          </div>
          <div className="mt-[5px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
            {item.subtitle}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-[2px] text-right">
        <div
          className={cn(
            "text-[14px] font-bold leading-tight tracking-[-0.02em]",
            isIncome ? "text-[#15965A]" : "text-[#D12C3B]",
          )}
        >
          {item.amount}
        </div>

        <div className="mt-[7px] inline-flex h-[22px] items-center rounded-full bg-[#E8F8EF] px-[10px] text-[11px] font-semibold leading-none text-[#15965A]">
          Berhasil
        </div>
      </div>
    </div>
  );
}

function TransactionGroupCard({ group }: { group: TransactionGroup }) {
  return (
    <section className="mt-[22px]">
      <div className="flex items-center gap-3">
        <div className="shrink-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
          {group.date}
        </div>
        <div className="h-px min-w-0 flex-1 bg-[#E5E7EB]" />
      </div>

      <div className="mt-[8px] divide-y divide-[#EEF0F4]">
        {group.items.map((item) => (
          <TransactionRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function NewMBankingAccountDetailPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [showBalance, setShowBalance] = React.useState(true);
  const [activeMonth, setActiveMonth] = React.useState("Jun");
  const [transferMode, setTransferMode] = React.useState<TransferMode | null>(null);
  const [showDeposit, setShowDeposit] = React.useState(false);

  if (showDeposit) {
    return <NewMBankingDepositPage onBack={() => setShowDeposit(false)} />;
  }

  if (transferMode) {
    return (
      <NewMBankingInterbankTransferPage
        title={
          transferMode === "antar-rekening"
            ? "Transfer Antar Rekening"
            : "Transfer Antar Bank"
        }
        onBack={() => setTransferMode(null)}
        onTransferDone={() => setTransferMode(null)}
      />
    );
  }

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <StatusBar />

        <header className="flex h-[58px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Rekening Simpanan
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="bg-[#F9F9F9] px-6 pb-[26px] pt-[10px]">
          <div
            className={cn(
              "relative overflow-hidden rounded-[24px] px-5 pb-5 pt-5 text-white",
              "bg-[linear-gradient(135deg,#4BA2F5_0%,#2563EB_46%,#7C3AED_100%)]",
              "ring-1 ring-white/25",
            )}
          >
            <div className="pointer-events-none absolute -right-[48px] -top-[44px] h-[144px] w-[144px] rounded-full bg-white/18" />
            <div className="pointer-events-none absolute right-[18px] top-[42px] h-[92px] w-[92px] rounded-full bg-cyan-200/18" />
            <div className="pointer-events-none absolute -bottom-[38px] right-[88px] h-[112px] w-[112px] rounded-full bg-violet-950/12" />
            <div className="pointer-events-none absolute -left-[34px] bottom-[22px] h-[94px] w-[94px] rounded-full bg-white/10" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(15,23,42,0.10))]" />

            <div className="relative z-10 grid gap-[23px]">
              <CardInfo label="Produk Simpanan" value="Simpanan Harian" />

              <CardInfo
                label="No. Rek. Simpanan"
                value="112233111"
                copyable
              />

              <CardInfo label="Nomor VA" value="88810 112233111" copyable />

              <CardInfo label="Saldo Simpanan">
                <span>{showBalance ? "Rp. 4.000.000,00" : "••••••••••"}</span>
                <button
                  type="button"
                  onClick={() => setShowBalance((value) => !value)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-white transition active:scale-[0.96]"
                  aria-label={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
                  title={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
                >
                  {showBalance ? (
                    <Eye className="h-[17px] w-[17px]" strokeWidth={2.4} />
                  ) : (
                    <EyeOff className="h-[17px] w-[17px]" strokeWidth={2.4} />
                  )}
                </button>
              </CardInfo>
            </div>
          </div>

          <div className="mt-[22px] grid grid-cols-3 justify-items-center gap-3">
            <QuickActionButton
              icon={Send}
              label="Transfer Antar Rekening"
              frameClassName="bg-[#18B7A1]"
              onClick={() => setTransferMode("antar-rekening")}
            />
            <QuickActionButton
              icon={Banknote}
              label="Setor"
              frameClassName="bg-[#479DF4]"
              onClick={() => setShowDeposit(true)}
            />
            <QuickActionButton
              icon={Landmark}
              label="Transfer Antar Bank"
              frameClassName="bg-[#F59E0B]"
              onClick={() => setTransferMode("antar-bank")}
            />
          </div>
        </section>

        <section className="relative bg-white px-6 pb-[34px] pt-[22px]">
          <div>
            <h2 className="text-[20px] font-bold leading-tight tracking-[-0.035em] text-black">
              Riwayat Transaksi
            </h2>

            <div className="mt-[18px] flex gap-[9px] overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {monthChips.map((month) => {
                const active = month === activeMonth;

                return (
                  <button
                    key={month}
                    type="button"
                    onClick={() => setActiveMonth(month)}
                    className={cn(
                      "h-[34px] shrink-0 rounded-full px-[17px]",
                      "text-[13px] font-semibold leading-none transition active:scale-[0.98]",
                      active
                        ? "bg-[#479DF4] text-white"
                        : "bg-[#F1F3F6] text-black",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {month}
                  </button>
                );
              })}
            </div>

            <div className="mt-[6px]">
              {transactionGroups.map((group) => (
                <TransactionGroupCard key={group.date} group={group} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}