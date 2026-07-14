"use client";

import * as React from "react";
import {
  ArrowLeft,
  Droplets,
  HeartPulse,
  Landmark,
  Map,
  Monitor,
  QrCode,
  ShoppingCart,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingPaymentHistoryList, {
  type PaymentHistoryReceiptData,
} from "@/components/mobile/new-mbanking/NewMBankingPaymentHistoryList";
import NewMBankingPaymentMonthSelector from "@/components/mobile/new-mbanking/NewMBankingPaymentMonthSelector";
import NewMBankingElectricityProviderPage from "@/components/mobile/new-mbanking/NewMBankingElectricityProviderPage";
import NewMBankingElectricityCustomerPage from "@/components/mobile/new-mbanking/NewMBankingElectricityCustomerPage";
import NewMBankingSavedPaymentAccordion, {
  type SavedPaymentItem,
} from "@/components/mobile/new-mbanking/NewMBankingSavedPaymentAccordion";
import NewMBankingInScreenToast from "@/components/mobile/new-mbanking/NewMBankingInScreenToast";
import NewMBankingScanPage from "@/components/mobile/new-mbanking/NewMBankingScanPage";
import NewMBankingPaymentPurchaseReceiptPage from "@/components/mobile/new-mbanking/NewMBankingPaymentPurchaseReceiptPage";
import {
  getNewMBankingSavedRecipients,
  isNewMBankingRecipientSaved,
  removeNewMBankingSavedRecipient,
  savedRecipientToPaymentItem,
  subscribeNewMBankingSavedRecipients,
} from "@/lib/newMBankingSavedRecipientsStore";

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

type PaymentCategory = {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  frameClassName: string;
  providers: string[];
  serviceVariant: ServiceVariant;
};

const paymentCategories: PaymentCategory[] = [
  {
    label: "Listrik",
    icon: Zap,
    frameClassName: "bg-[#F59E0B]",
    providers: ["PLN Postpaid", "PLN Prepaid", "Non Tagihan Listrik"],
    serviceVariant: "electricity",
  },
  {
    label: "Air",
    icon: Droplets,
    frameClassName: "bg-[#06B6D4]",
    providers: ["PDAM Kota Denpasar", "PDAM Kabupaten Gianyar"],
    serviceVariant: "water",
  },
  {
    label: "Internet",
    icon: Wifi,
    frameClassName: "bg-[#2563EB]",
    providers: ["IndiHome", "Biznet", "First Media"],
    serviceVariant: "internet",
  },
  {
    label: "BPJS Kesehatan",
    icon: HeartPulse,
    frameClassName: "bg-[#22C55E]",
    providers: ["BPJS Kesehatan"],
    serviceVariant: "bpjs",
  },
  {
    label: "Pulsa Pascabayar",
    icon: Smartphone,
    frameClassName: "bg-[#479DF4]",
    providers: ["XL Pascabayar", "Telkomsel Halo", "Indosat Pascabayar"],
    serviceVariant: "postpaid-phone",
  },
  {
    label: "PBB",
    icon: Map,
    frameClassName: "bg-[#8B5CF6]",
    providers: ["PBB Kota Denpasar", "PBB Kabupaten Gianyar"],
    serviceVariant: "pbb",
  },
  {
    label: "TV",
    icon: Monitor,
    frameClassName: "bg-[#14B8A6]",
    providers: ["Transvision", "MNC Vision", "K-Vision"],
    serviceVariant: "tv",
  },
  {
    label: "Finance",
    icon: Landmark,
    frameClassName: "bg-[#3B82F6]",
    providers: ["Adira Finance", "FIFGROUP", "BCA Finance"],
    serviceVariant: "finance",
  },
  {
    label: "QRIS",
    icon: QrCode,
    frameClassName: "bg-[#8B5CF6]",
    providers: [],
    serviceVariant: "finance",
  },
  {
    label: "E-Commerce",
    icon: ShoppingCart,
    frameClassName: "bg-[#EF4444]",
    providers: ["Tokopedia", "Shopee", "Bukalapak"],
    serviceVariant: "finance",
  },
];

const savedPaymentsSeed: SavedPaymentItem[] = [
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
    id: "indihome",
    name: "IndiHome",
    info: "Internet - 122334455667",
  },
  {
    id: "bpjs-family",
    name: "BPJS Keluarga",
    info: "BPJS Kesehatan - 0001234567890",
  },
];

function getInitialCustomerNo(providerName: string) {
  if (providerName.toLowerCase().includes("xl")) return "0819987262";
  if (providerName.toLowerCase().includes("pln")) return "530000112233";
  if (providerName.toLowerCase().includes("indihome")) return "122334455667";
  if (providerName.toLowerCase().includes("bpjs")) return "0001234567890";
  return "";
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

export default function NewMBankingPaymentPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<PaymentTab>("saved");
  const [activeMonth, setActiveMonth] = React.useState("Jun");
  const [selectedCategory, setSelectedCategory] =
    React.useState<PaymentCategory | null>(null);
  const [selectedProvider, setSelectedProvider] = React.useState<string | null>(
    null,
  );
  const [initialCustomerNo, setInitialCustomerNo] = React.useState("");
  const [seedPayments, setSeedPayments] =
    React.useState<SavedPaymentItem[]>(savedPaymentsSeed);
  const [savedRefreshTick, setSavedRefreshTick] = React.useState(0);
  const [toastMessage, setToastMessage] = React.useState("");
  const [showQrisFlow, setShowQrisFlow] = React.useState(false);
  const [selectedReceipt, setSelectedReceipt] =
    React.useState<PaymentHistoryReceiptData | null>(null);

  React.useEffect(() => {
    return subscribeNewMBankingSavedRecipients(() =>
      setSavedRefreshTick((current) => current + 1),
    );
  }, []);

  const savedPayments = React.useMemo(() => {
    const stored = getNewMBankingSavedRecipients("payment").map(
      savedRecipientToPaymentItem,
    );

    return uniqueItems([...stored, ...seedPayments]);
  }, [savedRefreshTick, seedPayments, selectedCategory, selectedProvider]);

  function showToast(message: string) {
    setToastMessage("");
    window.setTimeout(() => setToastMessage(message), 0);
  }

  function openCategory(category: PaymentCategory) {
    if (category.label === "QRIS") {
      setShowQrisFlow(true);
      return;
    }

    setInitialCustomerNo("");
    setSelectedProvider(null);
    setSelectedCategory(category);
  }

  function openSavedPayment(payment: SavedPaymentItem) {
    if (payment.providerName && payment.serviceVariant && payment.customerNo) {
      const matchedCategory = paymentCategories.find(
        (category) => category.serviceVariant === payment.serviceVariant,
      );

      if (!matchedCategory) return;

      setSelectedCategory(matchedCategory);
      setSelectedProvider(payment.providerName);
      setInitialCustomerNo(payment.customerNo);
      return;
    }

    const info = payment.info.toLowerCase();

    const matchedCategory =
      info.includes("pulsa")
        ? paymentCategories.find((category) => category.label === "Pulsa Pascabayar")
        : info.includes("listrik")
          ? paymentCategories.find((category) => category.label === "Listrik")
          : info.includes("internet")
            ? paymentCategories.find((category) => category.label === "Internet")
            : info.includes("bpjs")
              ? paymentCategories.find((category) => category.label === "BPJS Kesehatan")
              : null;

    if (!matchedCategory) return;

    const providerName = payment.name.includes("PLN")
      ? "PLN Postpaid"
      : payment.name.includes("IndiHome")
        ? "IndiHome"
        : payment.name.includes("BPJS")
          ? "BPJS Kesehatan"
          : payment.name;

    setSelectedCategory(matchedCategory);
    setSelectedProvider(providerName);
    setInitialCustomerNo(getInitialCustomerNo(providerName));
  }

  function deleteSavedPayment(id: string) {
    if (id.includes("::")) {
      removeNewMBankingSavedRecipient(id);
      setSavedRefreshTick((current) => current + 1);
    } else {
      setSeedPayments((current) => current.filter((item) => item.id !== id));
    }

    showToast("Pembayaran tersimpan berhasil dihapus");
  }

  if (selectedReceipt) {
    return (
      <NewMBankingPaymentPurchaseReceiptPage
        providerName={selectedReceipt.providerName}
        customerName={selectedReceipt.customerName}
        customerNo={selectedReceipt.customerNo}
        amount={selectedReceipt.amount}
        adminFee={selectedReceipt.adminFee}
        totalTransaction={selectedReceipt.totalTransaction}
        sourceFund={selectedReceipt.sourceFund}
        serviceVariant={selectedReceipt.serviceVariant}
        bpjsMonths={selectedReceipt.bpjsMonths}
        onBack={() => setSelectedReceipt(null)}
        onDone={() => setSelectedReceipt(null)}
      />
    );
  }

  if (showQrisFlow) {
    return <NewMBankingScanPage onBack={() => setShowQrisFlow(false)} />;
  }

  if (selectedProvider && selectedCategory) {
    return (
      <NewMBankingElectricityCustomerPage
        providerName={selectedProvider}
        title={selectedCategory.label}
        serviceVariant={selectedCategory.serviceVariant}
        initialCustomerNo={initialCustomerNo}
        isRecipientSaved={({ providerName, customerNo, serviceVariant }) =>
          isNewMBankingRecipientSaved({
            kind: "payment",
            providerName,
            customerNo,
            serviceVariant,
          })
        }
        onBack={() => setSelectedProvider(null)}
        onDone={() => {
          setSavedRefreshTick((current) => current + 1);
          setSelectedProvider(null);
          setSelectedCategory(null);
        }}
      />
    );
  }

  if (selectedCategory) {
    return (
      <NewMBankingElectricityProviderPage
        title={selectedCategory.label}
        providers={selectedCategory.providers}
        iconVariant={selectedCategory.serviceVariant}
        onBack={() => setSelectedCategory(null)}
        onSelectProvider={(provider) => {
          setInitialCustomerNo("");
          setSelectedProvider(provider);
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
            Bayar Berbagai Kebutuhan
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
                  onClick={() => openCategory(category)}
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
              items={savedPayments}
              onOpenItem={openSavedPayment}
              onDeleteItem={deleteSavedPayment}
            />
          ) : (
            <>
              <NewMBankingPaymentMonthSelector
                activeMonth={activeMonth}
                onChange={setActiveMonth}
                className="mt-[18px]"
              />
              <NewMBankingPaymentHistoryList
                activeMonth={activeMonth}
                onOpenReceipt={setSelectedReceipt}
              />
            </>
          )}
        </section>
      </main>

      <div className="sr-only">{savedRefreshTick}</div>
    </div>
  );
}