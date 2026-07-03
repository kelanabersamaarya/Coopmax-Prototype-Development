import * as React from "react";
import { ArrowLeft, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingDepositPage from "@/components/mobile/new-mbanking/NewMBankingDepositPage";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

type SavingsAccount = {
  id: string;
  productName: string;
  accountNo: string;
  balance: string;
  vaNumber: string;
};

const savingsAccounts: SavingsAccount[] = [
  {
    id: "simpanan-kaya",
    productName: "Simpanan Kaya",
    accountNo: "112233111",
    balance: "Rp. 4.000.000,00",
    vaNumber: "88810 112233111",
  },
  {
    id: "simpanan-sukarela",
    productName: "Simpanan Sukarela",
    accountNo: "4260029",
    balance: "Rp. 2.750.000,00",
    vaNumber: "88810 4260029",
  },
  {
    id: "simpanan-mapan",
    productName: "Simpanan Mapan",
    accountNo: "112233222",
    balance: "Rp. 20.000.000,00",
    vaNumber: "88810 112233222",
  },
];

function SavingsInfoBlock({
  label,
  value,
  withCopy = false,
}: {
  label: string;
  value: string;
  withCopy?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-normal leading-none text-white/75">
        {label}
      </div>
      <div className="mt-[7px] flex min-w-0 items-center gap-2 text-[14px] font-semibold leading-tight text-white">
        <span className="truncate">{value}</span>
        {withCopy ? (
          <Copy className="h-[13px] w-[13px] shrink-0" strokeWidth={2.4} />
        ) : null}
      </div>
    </div>
  );
}

function SavingsAccountCard({
  account,
  onClick,
}: {
  account: SavingsAccount;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left transition active:scale-[0.99]"
      aria-label={`Pilih ${account.productName}`}
    >
      <div
        className={cn(
          "relative min-h-[190px] overflow-hidden rounded-[20px]",
          "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_50%,#7C3AED_100%)]",
          "px-5 py-5 text-white shadow-[0_12px_28px_rgba(37,99,235,0.20)]",
        )}
      >
        <div className="pointer-events-none absolute -right-[42px] -top-[42px] h-[136px] w-[136px] rounded-full bg-white/16" />
        <div className="pointer-events-none absolute right-[48px] top-[58px] h-[64px] w-[64px] rounded-full bg-cyan-200/16" />
        <div className="pointer-events-none absolute -bottom-[36px] left-[72px] h-[96px] w-[96px] rounded-full bg-violet-950/12" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(15,23,42,0.12))]" />

        <div className="relative z-10 grid gap-[18px]">
          <div>
            <div className="text-[12px] font-normal leading-none text-white/78">
              Produk Simpanan
            </div>
            <div className="mt-[8px] truncate text-[18px] font-bold leading-tight tracking-[-0.03em] text-white">
              {account.productName}
            </div>
          </div>

          <SavingsInfoBlock
            label="No. Rekening"
            value={account.accountNo}
            withCopy
          />

          <SavingsInfoBlock label="Saldo" value={account.balance} />

          <SavingsInfoBlock
            label="Nomor Virtual Account"
            value={account.vaNumber}
            withCopy
          />
        </div>
      </div>
    </button>
  );
}

export default function NewMBankingDepositAccountsPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [selectedAccount, setSelectedAccount] =
    React.useState<SavingsAccount | null>(null);

  if (selectedAccount) {
    return <NewMBankingDepositPage onBack={() => setSelectedAccount(null)} />;
  }

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
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
            Setoran
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]">
          <div>
            <h2 className="text-[20px] font-bold leading-tight tracking-[-0.035em] text-black">
              Pilih Rekening Simpanan
            </h2>
            <p className="mt-[8px] text-[13px] font-normal leading-relaxed text-[#8F8F8F]">
              Pilih salah satu rekening simpanan untuk melanjutkan proses setoran.
            </p>
          </div>

          <div className="mt-[22px] grid gap-[14px]">
            {savingsAccounts.map((account) => (
              <SavingsAccountCard
                key={account.id}
                account={account}
                onClick={() => setSelectedAccount(account)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}