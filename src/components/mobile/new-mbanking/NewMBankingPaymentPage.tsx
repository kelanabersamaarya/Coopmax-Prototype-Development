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
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

type PaymentTab = "saved" | "history";

const paymentCategories = [
  {
    label: "Listrik",
    icon: Bolt,
  },
  {
    label: "Air",
    icon: Droplets,
  },
  {
    label: "Internet",
    icon: Wifi,
  },
  {
    label: "BPJS Kesehatan",
    icon: HeartPulse,
  },
  {
    label: "Pulsa Pascabayar",
    icon: Smartphone,
  },
  {
    label: "PBB",
    icon: Map,
  },
  {
    label: "TV",
    icon: Monitor,
  },
  {
    label: "Finance",
    icon: Landmark,
  },
  {
    label: "E-Commerce",
    icon: ShoppingCart,
  },
];

const savedPayments = [
  {
    id: "xl-postpaid",
    name: "XL Pascabayar",
    info: "Pulsa Pascabayar - 0819987262",
  },
];

export default function NewMBankingPaymentPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<PaymentTab>("saved");
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
                  <span className="grid h-[64px] w-[64px] place-items-center rounded-[18px] border border-[#D8D8D8] bg-white text-[#479DF4] shadow-none">
                    <Icon
                      className="h-[31px] w-[31px] text-[#479DF4]"
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
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex min-h-[72px] items-center justify-between gap-4 py-[12px]"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-[#EEF0F4] text-[#111827]">
                        <Smartphone
                          className="h-[27px] w-[27px] text-[#111827]"
                          strokeWidth={2.25}
                        />
                      </span>

                      <div className="min-w-0">
                        <div className="truncate text-[18px] font-bold leading-tight tracking-[-0.025em] text-black">
                          {item.name}
                        </div>
                        <div className="mt-[5px] truncate text-[13px] font-normal leading-tight text-[#8F8F8F]">
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
                      className="grid h-[48px] w-[48px] shrink-0 place-items-center rounded-[10px] bg-[#FCE4E7] text-[#DC3545] transition active:scale-[0.96]"
                      aria-label={`Hapus ${item.name}`}
                      title="Hapus"
                    >
                      <Trash2
                        className="h-[24px] w-[24px] text-[#DC3545]"
                        strokeWidth={2.7}
                      />
                    </button>
                  </div>
                ))
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
            <div className="py-[44px] text-center">
              <div className="text-[15px] font-bold text-black">
                Belum Ada Riwayat Pembayaran
              </div>
              <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
                Riwayat transaksi pembayaran akan muncul di sini.
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}