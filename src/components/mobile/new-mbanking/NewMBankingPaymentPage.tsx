"use client";

import * as React from "react";
import {
  ArrowLeft,
  Droplets,
  HeartPulse,
  Landmark,
  Map,
  Monitor,
  ShoppingCart,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingPaymentHistoryList from "@/components/mobile/new-mbanking/NewMBankingPaymentHistoryList";
import NewMBankingPaymentMonthSelector from "@/components/mobile/new-mbanking/NewMBankingPaymentMonthSelector";
import NewMBankingElectricityProviderPage from "@/components/mobile/new-mbanking/NewMBankingElectricityProviderPage";
import NewMBankingElectricityCustomerPage from "@/components/mobile/new-mbanking/NewMBankingElectricityCustomerPage";
import NewMBankingSavedPaymentAccordion, {
  type SavedPaymentItem,
} from "@/components/mobile/new-mbanking/NewMBankingSavedPaymentAccordion";

type PaymentTab = "saved" | "history";
type ServiceVariant =
  | "electricity"
  | "water"
  | "pbb"
  | "internet"
  | "finance"
  | "tv"
  | "bpjs"
  | "postpaid-phone";

const serviceConfigs: Record<
  ServiceVariant,
  {
    title: string;
    providers: string[];
    iconVariant: ServiceVariant;
  }
> = {
  electricity: {
    title: "Listrik PLN",
    providers: ["PLN Pospaid", "PLN Prepaid", "Non Tagihan Listrik"],
    iconVariant: "electricity",
  },
  water: {
    title: "Air",
    providers: ["PDAM Kota", "Air Bersih", "PAM Daerah"],
    iconVariant: "water",
  },
  pbb: {
    title: "PBB",
    providers: ["PBB Kota", "PBB Kabupaten", "PBB Provinsi"],
    iconVariant: "pbb",
  },
  internet: {
    title: "Internet",
    providers: ["IndiHome", "Biznet", "First Media"],
    iconVariant: "internet",
  },
  finance: {
    title: "Finance",
    providers: ["Adira Finance", "FIFGROUP", "BCA Finance"],
    iconVariant: "finance",
  },
  tv: {
    title: "TV",
    providers: ["Transvision", "IndiHome TV", "MNC Vision"],
    iconVariant: "tv",
  },
  bpjs: {
    title: "BPJS Kesehatan",
    providers: ["BPJS Kesehatan"],
    iconVariant: "bpjs",
  },
  "postpaid-phone": {
    title: "Pulsa Pascabayar",
    providers: ["Telkomsel Pascabayar", "XL Pascabayar", "Indosat Pascabayar"],
    iconVariant: "postpaid-phone",
  },
};

const paymentCategories = [
  {
    label: "Listrik",
    icon: Zap,
    frameClassName: "bg-[#F59E0B]",
    service: "electricity" as ServiceVariant,
  },
  {
    label: "Air",
    icon: Droplets,
    frameClassName: "bg-[#06B6D4]",
    service: "water" as ServiceVariant,
  },
  {
    label: "Internet",
    icon: Wifi,
    frameClassName: "bg-[#2563EB]",
    service: "internet" as ServiceVariant,
  },
  {
    label: "BPJS Kesehatan",
    icon: HeartPulse,
    frameClassName: "bg-[#22C55E]",
    service: "bpjs" as ServiceVariant,
  },
  {
    label: "Pulsa Pascabayar",
    icon: Smartphone,
    frameClassName: "bg-[#479DF4]",
    service: "postpaid-phone" as ServiceVariant,
  },
  {
    label: "PBB",
    icon: Map,
    frameClassName: "bg-[#8B5CF6]",
    service: "pbb" as ServiceVariant,
  },
  {
    label: "TV",
    icon: Monitor,
    frameClassName: "bg-[#14B8A6]",
    service: "tv" as ServiceVariant,
  },
  {
    label: "Finance",
    icon: Landmark,
    frameClassName: "bg-[#3B82F6]",
    service: "finance" as ServiceVariant,
  },
  {
    label: "E-Commerce",
    icon: ShoppingCart,
    frameClassName: "bg-[#EF4444]",
  },
];

const savedPayments: SavedPaymentItem[] = [
  {
    id: "xl-postpaid",
    name: "XL Pascabayar",
    info: "Pulsa Pascabayar - 0819987262",
  },
  {
    id: "pln-home",
    name: "PLN Rumah",
    info: "Listrik - 530000112233",
  },
  {
    id: "pdam-home",
    name: "PDAM Rumah",
    info: "Air - 78200112233",
  },
  {
    id: "pbb-home",
    name: "PBB Rumah",
    info: "PBB - 5101010011223344",
  },
  {
    id: "indihome",
    name: "IndiHome",
    info: "Internet - 122334455667",
  },
  {
    id: "tv-home",
    name: "Transvision Rumah",
    info: "TV - 8800112233",
  },
  {
    id: "adira-finance",
    name: "Adira Finance",
    info: "Finance - 90011223344",
  },
  {
    id: "bpjs-family",
    name: "BPJS Keluarga",
    info: "BPJS Kesehatan - 0001234567890",
  },
];

function getSavedPaymentService(item: SavedPaymentItem) {
  const text = `${item.name} ${item.info}`.toLowerCase();

  if (text.includes("pln") || text.includes("listrik")) return "electricity";
  if (text.includes("pdam") || text.includes("air")) return "water";
  if (text.includes("pbb")) return "pbb";
  if (text.includes("internet") || text.includes("indihome")) return "internet";
  if (text.includes("tv") || text.includes("transvision")) return "tv";
  if (text.includes("finance") || text.includes("adira")) return "finance";
  if (text.includes("bpjs") || text.includes("kesehatan")) return "bpjs";
  if (text.includes("pulsa") || text.includes("pascabayar") || text.includes("xl")) {
    return "postpaid-phone";
  }

  return null;
}

export default function NewMBankingPaymentPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<PaymentTab>("saved");
  const [activeMonth, setActiveMonth] = React.useState("Jun");
  const [items, setItems] = React.useState<SavedPaymentItem[]>(savedPayments);
  const [activeService, setActiveService] = React.useState<ServiceVariant | null>(
    null,
  );
  const [selectedProvider, setSelectedProvider] = React.useState<string | null>(
    null,
  );

  function returnToPaymentHome() {
    setActiveService(null);
    setSelectedProvider(null);
    setActiveTab("saved");
  }

  function openService(service: ServiceVariant, provider?: string) {
    setActiveService(service);
    setSelectedProvider(provider ?? null);
  }

  function openSavedPayment(item: SavedPaymentItem) {
    const service = getSavedPaymentService(item);
    if (service) {
      openService(service, item.name);
    }
  }

  if (activeService && selectedProvider) {
    const config = serviceConfigs[activeService];

    return (
      <NewMBankingElectricityCustomerPage
        title={config.title}
        providerName={selectedProvider}
        serviceVariant={activeService}
        onBack={() => setSelectedProvider(null)}
        onDone={returnToPaymentHome}
      />
    );
  }

  if (activeService) {
    const config = serviceConfigs[activeService];

    return (
      <NewMBankingElectricityProviderPage
        title={config.title}
        providers={config.providers}
        iconVariant={config.iconVariant}
        onBack={() => setActiveService(null)}
        onSelectProvider={(provider) => setSelectedProvider(provider)}
      />
    );
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
            Bayar
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="bg-[#F9F9F9] px-6 pb-[28px] pt-[24px]">
          <div className="grid grid-cols-4 items-start gap-x-[18px] gap-y-[24px]">
            {paymentCategories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.label}
                  type="button"
                  onClick={() => {
                    if (category.service) {
                      openService(category.service);
                    }
                  }}
                  className="flex min-w-0 flex-col items-center text-center transition active:scale-[0.97]"
                  aria-label={category.label}
                >
                  <span
                    className={cn(
                      "grid h-[64px] w-[64px] place-items-center rounded-[18px]",
                      "border-0 text-white shadow-none ring-0 outline-none",
                      category.frameClassName,
                    )}
                  >
                    <Icon
                      className="h-[31px] w-[31px] text-white"
                      strokeWidth={2.25}
                    />
                  </span>

                  <span className="mt-[9px] max-w-[76px] text-center text-[12px] font-normal leading-[1.18] tracking-[-0.01em] text-black">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="min-h-[calc(100%-270px)] rounded-t-[30px] border-0 bg-white px-6 pb-[34px] pt-[22px]">
          <div className="rounded-full bg-[#F1F3F6] p-[4px]">
            <div className="grid grid-cols-2 gap-[4px]">
              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={cn(
                  "h-[42px] rounded-full text-[14px] font-normal leading-none transition active:scale-[0.98]",
                  activeTab === "saved"
                    ? "bg-[#479DF4] text-white shadow-sm"
                    : "bg-transparent text-[#6B7280]",
                )}
                aria-current={activeTab === "saved" ? "page" : undefined}
              >
                Tersimpan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={cn(
                  "h-[42px] rounded-full text-[14px] font-normal leading-none transition active:scale-[0.98]",
                  activeTab === "history"
                    ? "bg-[#479DF4] text-white shadow-sm"
                    : "bg-transparent text-[#6B7280]",
                )}
                aria-current={activeTab === "history" ? "page" : undefined}
              >
                Riwayat
              </button>
            </div>
          </div>

          {activeTab === "saved" ? (
            <NewMBankingSavedPaymentAccordion
              items={items}
              onOpenItem={openSavedPayment}
              onDeleteItem={(id) =>
                setItems((current) => current.filter((item) => item.id !== id))
              }
            />
          ) : (
            <>
              <NewMBankingPaymentMonthSelector
                activeMonth={activeMonth}
                onChange={setActiveMonth}
                className="mt-[18px]"
              />
              <NewMBankingPaymentHistoryList activeMonth={activeMonth} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}