"use client";

import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorGracePeriodInfoCard from "@/components/mobile/EKolektorGracePeriodInfoCard";

const billGroups = [
  [
    {
      label: "Jatuh Tempo",
      value: "25-01-2026",
    },
    {
      label: "Tagihan Pokok",
      value: "833.333",
    },
    {
      label: "Tagihan Bunga",
      value: "83.333",
    },
    {
      label: "Tagihan Denda",
      value: "75.000",
    },
    {
      label: "Total Tagihan",
      value: "991.666",
    },
  ],
  [
    {
      label: "Jatuh Tempo",
      value: "25-02-2026",
    },
    {
      label: "Tagihan Pokok",
      value: "833.333",
    },
    {
      label: "Tagihan Bunga",
      value: "83.333",
    },
    {
      label: "Tagihan Denda",
      value: "75.000",
    },
    {
      label: "Total Tagihan",
      value: "991.666",
    },
  ],
  [
    {
      label: "Jatuh Tempo",
      value: "25-03-2026",
    },
    {
      label: "Tagihan Pokok",
      value: "833.333",
    },
    {
      label: "Tagihan Bunga",
      value: "83.333",
    },
    {
      label: "Tagihan Denda",
      value: "75.000",
    },
    {
      label: "Total Tagihan",
      value: "991.666",
    },
  ],
  [
    {
      label: "Jatuh Tempo",
      value: "25-04-2026",
    },
    {
      label: "Tagihan Pokok",
      value: "833.333",
    },
    {
      label: "Tagihan Bunga",
      value: "83.333",
    },
    {
      label: "Tagihan Denda",
      value: "75.000",
    },
    {
      label: "Total Tagihan",
      value: "991.666",
    },
  ],
  [
    {
      label: "Jatuh Tempo",
      value: "25-05-2026",
    },
    {
      label: "Tagihan Pokok",
      value: "833.333",
    },
    {
      label: "Tagihan Bunga",
      value: "83.333",
    },
    {
      label: "Tagihan Denda",
      value: "75.000",
    },
    {
      label: "Total Tagihan",
      value: "991.666",
    },
  ],
];

function BillInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#E8E8E8] py-[12px] last:border-b-0">
      <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
        {label}
      </div>
      <div className="text-right text-[14px] font-extrabold leading-tight tracking-tight text-[#23305A]">
        {value}
      </div>
    </div>
  );
}

export default function EKolektorBillListPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[116px] overflow-hidden bg-[#004FC7] px-6 pt-[42px] text-white">
          <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
          <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-[25px] font-extrabold leading-none tracking-tight text-white">
                Daftar Tagihan
              </h1>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="shrink-0 rounded-full px-1 text-[14px] font-semibold leading-none text-[#BFD3F5] transition active:scale-[0.98]"
            >
              Batal
            </button>
          </div>
        </header>

        <main className="relative z-10 -mt-[30px] min-h-[calc(100%-86px)] rounded-t-[30px] bg-white px-6 pb-8 pt-7">
          <EKolektorGracePeriodInfoCard />

          <div className="grid gap-4">
            {billGroups.map((billItems) => (
              <div
                key={billItems[0].value}
                className="rounded-[12px] border-[1.5px] border-[#8E8E8E] bg-white px-[14px] py-[8px]"
              >
                {billItems.map((item) => (
                  <BillInfoRow
                    key={`${billItems[0].value}-${item.label}`}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            ))}
          </div>
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}