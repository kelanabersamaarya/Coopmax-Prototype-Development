"use client";

import { ArrowLeft, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

export type EWalletProvider = {
  id: string;
  name: string;
  description: string;
  colorClassName: string;
};

const eWalletProviders: EWalletProvider[] = [
  {
    id: "dana",
    name: "DANA",
    description: "Top up saldo DANA",
    colorClassName: "bg-[#8B5CF6]",
  },
  {
    id: "gopay",
    name: "GoPay",
    description: "Top up saldo GoPay",
    colorClassName: "bg-[#8B5CF6]",
  },
  {
    id: "ovo",
    name: "OVO",
    description: "Top up saldo OVO",
    colorClassName: "bg-[#8B5CF6]",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    description: "Top up saldo ShopeePay",
    colorClassName: "bg-[#8B5CF6]",
  },
  {
    id: "linkaja",
    name: "LinkAja",
    description: "Top up saldo LinkAja",
    colorClassName: "bg-[#8B5CF6]",
  },
];

export default function NewMBankingEWalletProviderPage({
  onBack,
  onSelectProvider,
}: {
  onBack: () => void;
  onSelectProvider: (provider: EWalletProvider) => void;
}) {
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
            E-Wallet
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]">
          <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
            Pilih Provider E-Wallet
          </div>

          <div className="mt-[18px] divide-y divide-[#EEF0F4]">
            {eWalletProviders.map((provider) => (
              <button
                key={provider.id}
                type="button"
                onClick={() => onSelectProvider(provider)}
                className="flex min-h-[72px] w-full items-center gap-4 py-[12px] text-left transition active:scale-[0.99]"
                aria-label={`Pilih ${provider.name}`}
              >
                <span
                  className={cn(
                    "grid h-[48px] w-[48px] shrink-0 place-items-center rounded-full text-white",
                    provider.colorClassName,
                  )}
                >
                  <Wallet className="h-[24px] w-[24px] text-white" strokeWidth={2.6} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
                    {provider.name}
                  </span>
                  <span className="mt-[5px] block truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
                    {provider.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}