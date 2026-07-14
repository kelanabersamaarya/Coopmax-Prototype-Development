"use client";

import * as React from "react";
import {
  ArrowLeft,
  BatteryMedium,
  CreditCard,
  History,
  Landmark,
  Smartphone,
  Trash2,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingPaymentMonthSelector from "@/components/mobile/new-mbanking/NewMBankingPaymentMonthSelector";
import NewMBankingSavedPaymentAccordion, {
  type SavedPaymentItem,
} from "@/components/mobile/new-mbanking/NewMBankingSavedPaymentAccordion";
import NewMBankingInScreenToast from "@/components/mobile/new-mbanking/NewMBankingInScreenToast";
import NewMBankingPulsaPurchasePage from "@/components/mobile/new-mbanking/NewMBankingPulsaPurchasePage";
import NewMBankingPaketDataPurchasePage from "@/components/mobile/new-mbanking/NewMBankingPaketDataPurchasePage";
import NewMBankingTokenPlnPurchasePage from "@/components/mobile/new-mbanking/NewMBankingTokenPlnPurchasePage";
import NewMBankingEWalletProviderPage, {
  type EWalletProvider,
} from "@/components/mobile/new-mbanking/NewMBankingEWalletProviderPage";
import NewMBankingEWalletTopUpPage from "@/components/mobile/new-mbanking/NewMBankingEWalletTopUpPage";
import {
  getNewMBankingSavedRecipients,
  removeNewMBankingSavedRecipient,
  savedRecipientToPaymentItem,
  saveNewMBankingRecipient,
  subscribeNewMBankingSavedRecipients,
} from "@/lib/newMBankingSavedRecipientsStore";

type PurchaseTab = "saved" | "history";

const purchaseCategories = [
  {
    label: "Pulsa",
    icon: Smartphone,
    frameClassName: "bg-[#479DF4]",
  },
  {
    label: "Paket Data",
    icon: Smartphone,
    frameClassName: "bg-[#2563EB]",
  },
  {
    label: "Token PLN",
    icon: Zap,
    frameClassName: "bg-[#F59E0B]",
  },
  {
    label: "E-Wallet",
    icon: Wallet,
    frameClassName: "bg-[#8B5CF6]",
  },
];

const savedPurchases: SavedPaymentItem[] = [
  {
    id: "pulsa-laura",
    name: "Pulsa Laura",
    info: "Pulsa - 0819987262",
  },
  {
    id: "data-laura",
    name: "Paket Data Utama",
    info: "Paket Data - 0819987262",
  },
  {
    id: "ovo-laura",
    name: "OVO Laura",
    info: "E-Wallet - 0819987262",
  },
];

const purchaseHistoryGroups = [
  {
    date: "20 Juni 2026",
    month: "Jun",
    items: [
      {
        id: "history-pulsa-1",
        title: "Pulsa Telkomsel",
        subtitle: "Pulsa • 0819987262",
        amount: "-Rp. 50.000,00",
        status: "Berhasil",
        type: "pulsa",
      },
      {
        id: "history-data-1",
        title: "Paket Data XL",
        subtitle: "Paket Data • 0819987262",
        amount: "-Rp. 75.000,00",
        status: "Berhasil",
        type: "data",
      },
    ],
  },
  {
    date: "19 Juni 2026",
    month: "Jun",
    items: [
      {
        id: "history-token-1",
        title: "Token PLN",
        subtitle: "Token PLN • 530000112233",
        amount: "-Rp. 100.000,00",
        status: "Berhasil",
        type: "token",
      },
      {
        id: "history-ewallet-1",
        title: "Top Up OVO",
        subtitle: "E-Wallet • 0819987262",
        amount: "-Rp. 150.000,00",
        status: "Berhasil",
        type: "ewallet",
      },
    ],
  },
  {
    date: "24 Mei 2026",
    month: "Mei",
    items: [
      {
        id: "history-ewallet-2",
        title: "Top Up DANA",
        subtitle: "E-Wallet • 081234567890",
        amount: "-Rp. 100.000,00",
        status: "Berhasil",
        type: "ewallet",
      },
    ],
  },
];

function PurchaseStatusBar() {
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

function getIconByType(type: string) {
  if (type === "pulsa") return Smartphone;
  if (type === "data") return Smartphone;
  if (type === "token") return Zap;
  if (type === "ewallet") return Wallet;
  return CreditCard;
}

function getIconClassByType(type: string) {
  if (type === "pulsa") return "bg-[#479DF4]";
  if (type === "data") return "bg-[#2563EB]";
  if (type === "token") return "bg-[#F59E0B]";
  if (type === "ewallet") return "bg-[#8B5CF6]";
  return "bg-[#64748B]";
}

function SavedPurchaseIcon({ type }: { type: string }) {
  const Icon = getIconByType(type);

  return (
    <span
      className={cn(
        "grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full text-white",
        getIconClassByType(type),
      )}
    >
      <Icon className="h-[22px] w-[22px] text-white" strokeWidth={2.5} />
    </span>
  );
}

function PurchaseHistoryRow({
  item,
}: {
  item: {
    title: string;
    subtitle: string;
    amount: string;
    status: string;
    type: string;
  };
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[14px]">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <SavedPurchaseIcon type={item.type} />

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
        <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#D12C3B]">
          {item.amount}
        </div>

        <div className="mt-[7px] inline-flex h-[22px] items-center rounded-full bg-[#E8F8EF] px-[10px] text-[11px] font-semibold leading-none text-[#15965A]">
          {item.status}
        </div>
      </div>
    </div>
  );
}

function PurchaseHistoryList({ activeMonth }: { activeMonth: string }) {
  const filteredGroups = purchaseHistoryGroups.filter(
    (group) => group.month === activeMonth,
  );

  if (filteredGroups.length === 0) {
    return (
      <div className="mt-[42px] rounded-[22px] bg-[#F8FAFC] px-5 py-8 text-center">
        <div className="text-[15px] font-bold text-black">
          Tidak Ada Riwayat Pembelian
        </div>
        <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
          Belum ada pembelian pada bulan yang dipilih.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[6px]">
      {filteredGroups.map((group) => (
        <section key={group.date} className="mt-[22px]">
          <div className="flex items-center gap-3">
            <div className="shrink-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
              {group.date}
            </div>
            <div className="h-px min-w-0 flex-1 bg-[#E5E7EB]" />
          </div>

          <div className="mt-[8px] divide-y divide-[#EEF0F4]">
            {group.items.map((item) => (
              <PurchaseHistoryRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function extractSavedNumber(info: string) {
  const parts = info.split("-");
  const candidate = parts[parts.length - 1]?.trim() ?? "";
  return candidate.replace(/[^\d]/g, "");
}

function getEWalletProviderFromSaved(item: SavedPaymentItem): EWalletProvider {
  const text = `${item.name} ${item.info}`.toLowerCase();

  if (item.providerName) {
    return {
      id: item.providerName.toLowerCase().replace(/\s+/g, "-"),
      name: item.providerName,
      description: `Top up saldo ${item.providerName}`,
      colorClassName: "bg-[#4C2A86]",
    };
  }

  if (text.includes("dana")) {
    return {
      id: "dana",
      name: "DANA",
      description: "Top up saldo DANA",
      colorClassName: "bg-[#118EEA]",
    };
  }

  if (text.includes("gopay")) {
    return {
      id: "gopay",
      name: "GoPay",
      description: "Top up saldo GoPay",
      colorClassName: "bg-[#00AA13]",
    };
  }

  if (text.includes("shopeepay")) {
    return {
      id: "shopeepay",
      name: "ShopeePay",
      description: "Top up saldo ShopeePay",
      colorClassName: "bg-[#EE4D2D]",
    };
  }

  if (text.includes("linkaja")) {
    return {
      id: "linkaja",
      name: "LinkAja",
      description: "Top up saldo LinkAja",
      colorClassName: "bg-[#E31E24]",
    };
  }

  return {
    id: "ovo",
    name: "OVO",
    description: "Top up saldo OVO",
    colorClassName: "bg-[#4C2A86]",
  };
}

function uniqueItems(items: SavedPaymentItem[]) {
  const seen = new Set<string>();
  const result: SavedPaymentItem[] = [];

  for (const item of items) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    result.push(item);
  }

  return result;
}

function markSavedPurchaseAsRecipient({
  item,
  providerName,
  customerNo,
  serviceVariant,
}: {
  item: SavedPaymentItem;
  providerName: string;
  customerNo: string;
  serviceVariant: string;
}) {
  if (!customerNo.trim()) return;

  saveNewMBankingRecipient({
    kind: "purchase",
    name: item.name,
    providerName,
    customerNo,
    numberLabel:
      serviceVariant === "token-pln"
        ? "No. Meter/ID Pelanggan"
        : "Nomor Handphone",
    serviceVariant,
  });
}

export default function NewMBankingPurchasePage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<PurchaseTab>("saved");
  const [activeMonth, setActiveMonth] = React.useState("Jun");
  const [seedItems, setSeedItems] = React.useState<SavedPaymentItem[]>(savedPurchases);
  const [savedRefreshTick, setSavedRefreshTick] = React.useState(0);
  const [toastMessage, setToastMessage] = React.useState("");
  const [showPulsaPage, setShowPulsaPage] = React.useState(false);
  const [showPaketDataPage, setShowPaketDataPage] = React.useState(false);
  const [showTokenPlnPage, setShowTokenPlnPage] = React.useState(false);
  const [showEWalletProviderPage, setShowEWalletProviderPage] =
    React.useState(false);
  const [selectedEWalletProvider, setSelectedEWalletProvider] =
    React.useState<EWalletProvider | null>(null);
  const [prefillPhoneNumber, setPrefillPhoneNumber] = React.useState("");
  const [prefillMeterNo, setPrefillMeterNo] = React.useState("");

  React.useEffect(() => {
    return subscribeNewMBankingSavedRecipients(() =>
      setSavedRefreshTick((current) => current + 1),
    );
  }, []);

  const items = React.useMemo(() => {
    const stored = getNewMBankingSavedRecipients("purchase").map(
      savedRecipientToPaymentItem,
    );

    return uniqueItems([...stored, ...seedItems]);
  }, [savedRefreshTick, seedItems]);

  function showToast(message: string) {
    setToastMessage("");
    window.setTimeout(() => setToastMessage(message), 0);
  }

  function resetSavedPrefill() {
    setPrefillPhoneNumber("");
    setPrefillMeterNo("");
  }

  function openSavedPurchase(item: SavedPaymentItem) {
    const info = item.info.toLowerCase();
    const number = item.customerNo ?? extractSavedNumber(item.info);
    const serviceVariant = item.serviceVariant ?? "";

    setShowPulsaPage(false);
    setShowPaketDataPage(false);
    setShowTokenPlnPage(false);
    setShowEWalletProviderPage(false);
    setSelectedEWalletProvider(null);

    if (serviceVariant === "data-package" || info.includes("paket data")) {
      markSavedPurchaseAsRecipient({
        item,
        providerName: item.providerName ?? "Paket Data XL",
        customerNo: number,
        serviceVariant: "data-package",
      });
      setPrefillPhoneNumber(number);
      setPrefillMeterNo("");
      setShowPaketDataPage(true);
      return;
    }

    if (serviceVariant === "token-pln" || info.includes("token")) {
      markSavedPurchaseAsRecipient({
        item,
        providerName: item.providerName ?? "Token PLN",
        customerNo: number,
        serviceVariant: "token-pln",
      });
      setPrefillMeterNo(number);
      setPrefillPhoneNumber("");
      setShowTokenPlnPage(true);
      return;
    }

    if (
      serviceVariant === "e-wallet" ||
      info.includes("e-wallet") ||
      info.includes("ewallet")
    ) {
      const provider = getEWalletProviderFromSaved(item);

      markSavedPurchaseAsRecipient({
        item,
        providerName: provider.name,
        customerNo: number,
        serviceVariant: "e-wallet",
      });
      setPrefillPhoneNumber(number);
      setPrefillMeterNo("");
      setSelectedEWalletProvider(provider);
      return;
    }

    if (serviceVariant === "postpaid-phone" || info.includes("pulsa")) {
      markSavedPurchaseAsRecipient({
        item,
        providerName: item.providerName ?? "Pulsa XL",
        customerNo: number,
        serviceVariant: "postpaid-phone",
      });
      setPrefillPhoneNumber(number);
      setPrefillMeterNo("");
      setShowPulsaPage(true);
      return;
    }

    showToast(`${item.name} berhasil dibuka`);
  }

  function deleteSavedPurchase(id: string) {
    if (id.includes("::")) {
      removeNewMBankingSavedRecipient(id);
      setSavedRefreshTick((current) => current + 1);
    } else {
      setSeedItems((current) => current.filter((item) => item.id !== id));
    }

    showToast("Pembelian tersimpan berhasil dihapus");
  }

  if (showPulsaPage) {
    return (
      <NewMBankingPulsaPurchasePage
        initialPhoneNumber={prefillPhoneNumber}
        onBack={() => {
          resetSavedPrefill();
          setSavedRefreshTick((current) => current + 1);
          setShowPulsaPage(false);
        }}
      />
    );
  }

  if (showPaketDataPage) {
    return (
      <NewMBankingPaketDataPurchasePage
        initialPhoneNumber={prefillPhoneNumber}
        onBack={() => {
          resetSavedPrefill();
          setSavedRefreshTick((current) => current + 1);
          setShowPaketDataPage(false);
        }}
      />
    );
  }

  if (showTokenPlnPage) {
    return (
      <NewMBankingTokenPlnPurchasePage
        initialMeterNo={prefillMeterNo}
        onBack={() => {
          resetSavedPrefill();
          setSavedRefreshTick((current) => current + 1);
          setShowTokenPlnPage(false);
        }}
      />
    );
  }

  if (selectedEWalletProvider) {
    return (
      <NewMBankingEWalletTopUpPage
        provider={selectedEWalletProvider}
        initialPhoneNumber={prefillPhoneNumber}
        onBack={() => {
          resetSavedPrefill();
          setSavedRefreshTick((current) => current + 1);
          setSelectedEWalletProvider(null);
        }}
      />
    );
  }

  if (showEWalletProviderPage) {
    return (
      <NewMBankingEWalletProviderPage
        onBack={() => setShowEWalletProviderPage(false)}
        onSelectProvider={(provider) => {
          resetSavedPrefill();
          setSelectedEWalletProvider(provider);
          setShowEWalletProviderPage(false);
        }}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <NewMBankingInScreenToast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      <div className="shrink-0 bg-[#F9F9F9]">
        <PurchaseStatusBar />

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
            Beli Berbagai Kebutuhan
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="bg-[#F9F9F9] px-6 pb-[28px] pt-[24px]">
          <div className="grid grid-cols-4 items-start gap-x-[18px] gap-y-[24px]">
            {purchaseCategories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.label}
                  type="button"
                  onClick={() => {
                    resetSavedPrefill();

                    if (category.label === "Pulsa") {
                      setShowPulsaPage(true);
                      return;
                    }

                    if (category.label === "Paket Data") {
                      setShowPaketDataPage(true);
                      return;
                    }

                    if (category.label === "Token PLN") {
                      setShowTokenPlnPage(true);
                      return;
                    }

                    if (category.label === "E-Wallet") {
                      setShowEWalletProviderPage(true);
                      return;
                    }

                    showToast(`${category.label} dipilih (prototype)`);
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

        <section className="min-h-[calc(100%-186px)] rounded-t-[30px] border-0 bg-white px-6 pb-[34px] pt-[22px]">
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
              onOpenItem={openSavedPurchase}
              onDeleteItem={deleteSavedPurchase}
            />
          ) : (
            <>
              <NewMBankingPaymentMonthSelector
                activeMonth={activeMonth}
                onChange={setActiveMonth}
                className="mt-[18px]"
              />
              <PurchaseHistoryList activeMonth={activeMonth} />
            </>
          )}
        </section>
      </main>

      <div className="sr-only">
        <History />
        <Landmark />
        <Trash2 />
        {savedRefreshTick}
      </div>
    </div>
  );
}