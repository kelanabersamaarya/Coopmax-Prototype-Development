"use client";

import {
  ArrowLeft,
  Droplets,
  Landmark,
  Map,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

const defaultProviders = ["PLN Pospaid", "PLN Prepaid", "Non Tagihan Listrik"];

type ServiceVariant = "electricity" | "water" | "pbb" | "internet" | "finance";

function getServiceIcon(variant: ServiceVariant) {
  if (variant === "water") return Droplets;
  if (variant === "pbb") return Map;
  if (variant === "internet") return Wifi;
  if (variant === "finance") return Landmark;
  return Zap;
}

export default function NewMBankingElectricityProviderPage({
  onBack,
  onSelectProvider,
  title = "Listrik PLN",
  providers = defaultProviders,
  iconVariant = "electricity",
}: {
  onBack: () => void;
  onSelectProvider: (provider: string) => void;
  title?: string;
  providers?: string[];
  iconVariant?: ServiceVariant;
}) {
  const Icon = getServiceIcon(iconVariant);

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
            {title}
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] border-0 bg-white px-6 pb-[34px] pt-[24px]">
          <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
            Pilih Penyedia Layanan
          </div>

          <div className="mt-[18px] divide-y divide-[#EEF0F4]">
            {providers.map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => onSelectProvider(provider)}
                className="flex min-h-[68px] w-full items-center gap-4 py-[12px] text-left transition active:scale-[0.99]"
                aria-label={`Pilih ${provider}`}
              >
                <span
                  className={cn(
                    "grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full",
                    "bg-[#479DF4] text-white",
                  )}
                >
                  <Icon className="h-[23px] w-[23px] text-white" strokeWidth={2.6} />
                </span>

                <span className="min-w-0 flex-1 truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
                  {provider}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}