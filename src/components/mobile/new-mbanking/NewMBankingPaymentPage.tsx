import * as React from "react";
import {
  ArrowLeft,
  Bolt,
  Droplets,
  HeartPulse,
  Landmark,
  Map,
  Monitor,
  ShoppingCart,
  Smartphone,
  Trash2,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingPaymentHistoryList from "@/components/mobile/new-mbanking/NewMBankingPaymentHistoryList";
import NewMBankingPaymentMonthSelector from "@/components/mobile/new-mbanking/NewMBankingPaymentMonthSelector";

type PaymentTab = "saved" | "history";

const paymentCategories = [
  {
    label: "Listrik",
    icon: Zap,
    frameClassName: "bg-[#F59E0B]",
  },
  {
    label: "Air",
    icon: Droplets,
    frameClassName: "bg-[#06B6D4]",
  },
  {
    label: "Internet",
    icon: Wifi,
    frameClassName: "bg-[#2563EB]",
  },
  {
    label: "BPJS Kesehatan",
    icon: HeartPulse,
    frameClassName: "bg-[#22C55E]",
  },
  {
    label: "Pulsa Pascabayar",
    icon: Smartphone,
    frameClassName: "bg-[#479DF4]",
  },
  {
    label: "PBB",
    icon: Map,
    frameClassName: "bg-[#8B5CF6]",
  },
  {
    label: "TV",
    icon: Monitor,
    frameClassName: "bg-[#14B8A6]",
  },
  {
    label: "Finance",
    icon: Landmark,
    frameClassName: "bg-[#3B82F6]",
  },
  {
    label: "E-Commerce",
    icon: ShoppingCart,
    frameClassName: "bg-[#EF4444]",
  },
];

const savedPayments = [
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

function getSavedPaymentIcon(item: { name: string; info: string }) {
  const text = `${item.name} ${item.info}`.toLowerCase();

  if (text.includes("pln") || text.includes("listrik")) return Zap;
  if (text.includes("internet") || text.includes("indihome")) return Wifi;
  if (text.includes("bpjs") || text.includes("kesehatan")) return HeartPulse;
  if (text.includes("pulsa") || text.includes("pascabayar") || text.includes("xl")) {
    return Smartphone;
  }

  return Bolt;
}

export default function NewMBankingPaymentPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<PaymentTab>("saved");
  const [activeMonth, setActiveMonth] = React.useState("Jun");
  const [items, setItems] = React.useState(savedPayments);

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

        <div className="h-px w-full bg-[#D8D8D8]" />

        <section className="min-h-[calc(100%-270px)] rounded-t-[24px] bg-white px-6 pb-[34px] pt-[22px]">
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
            <div className="mt-[22px] divide-y divide-[#EEF0F4]">
              {items.length > 0 ? (
                items.map((item) => {
                  const Icon = getSavedPaymentIcon(item);

                  return (
                    <div
                      key={item.id}
                      className="flex min-h-[64px] items-center justify-between gap-4 py-[10px]"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
                          <Icon
                            className="h-[23px] w-[23px] text-white"
                            strokeWidth={2.35}
                          />
                        </span>

                        <div className="min-w-0">
                          <div className="truncate text-[14px] font-bold leading-tight tracking-[-0.015em] text-black">
                            {item.name}
                          </div>
                          <div className="mt-[4px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
                            {item.info}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setItems((current) =>
                            current.filter((savedItem) => savedItem.id !== item.id),
                          )
                        }
                        className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[8px] bg-[#FCE4E7] text-[#DC3545] transition active:scale-[0.96]"
                        aria-label={`Hapus ${item.name}`}
                        title="Hapus"
                      >
                        <Trash2
                          className="h-[16px] w-[16px] text-[#DC3545]"
                          strokeWidth={2.7}
                        />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="py-[44px] text-center">
                  <div className="text-[15px] font-bold text-black">
                    Belum Ada Pembayaran Tersimpan
                  </div>
                  <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
                    Pilih kategori pembayaran untuk menyimpan tagihan favorit.
                  </div>
                </div>
              )}
            </div>
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