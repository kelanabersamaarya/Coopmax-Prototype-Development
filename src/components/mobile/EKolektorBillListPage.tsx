"use client";

import * as React from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
  [
    {
      label: "Jatuh Tempo",
      value: "25-06-2026",
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
      value: "25-07-2026",
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
      value: "25-08-2026",
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
      value: "25-09-2026",
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

function StickyPagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  return (
    <div className="shrink-0 bg-white px-6 py-3 shadow-[0_-8px_18px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={prevDisabled}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className={cn(
            "inline-flex h-[38px] items-center gap-1.5 rounded-full px-4",
            "text-[12px] font-semibold transition active:scale-[0.98]",
            prevDisabled
              ? "bg-[#F1F1F1] text-[#A5A5A5]"
              : "bg-[#004FC7] text-white",
          )}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.6} />
          Sebelumnya
        </button>

        <div className="inline-flex h-[38px] min-w-[38px] items-center justify-center rounded-full bg-[#004FC7] px-3 text-[13px] font-extrabold text-white">
          {page}
        </div>

        <button
          type="button"
          disabled={nextDisabled}
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          className={cn(
            "inline-flex h-[38px] items-center gap-1.5 rounded-full px-4",
            "text-[12px] font-semibold transition active:scale-[0.98]",
            nextDisabled
              ? "bg-[#F1F1F1] text-[#A5A5A5]"
              : "bg-[#004FC7] text-white",
          )}
        >
          Selanjutnya
          <ChevronRight className="h-4 w-4" strokeWidth={2.6} />
        </button>
      </div>
    </div>
  );
}

export default function EKolektorBillListPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const pageSize = 5;
  const [page, setPage] = React.useState(1);

  const pageCount = Math.max(1, Math.ceil(billGroups.length / pageSize));

  const pagedBillGroups = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return billGroups.slice(start, start + pageSize);
  }, [page]);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[136px] overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
          <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
          <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />

          <div className="relative z-10">
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
              aria-label="Kembali"
              title="Kembali"
            >
              <ArrowLeft className="h-[28px] w-[28px]" strokeWidth={2.7} />
            </button>

            <h1 className="mt-4 text-[25px] font-extrabold leading-none tracking-tight text-white">
              Daftar Tagihan
            </h1>
          </div>
        </header>

        <main className="relative z-10 -mt-[30px] min-h-[calc(100%-106px)] rounded-t-[30px] bg-white px-6 pb-8 pt-7">
          <EKolektorGracePeriodInfoCard />

          <div className="grid gap-4">
            {pagedBillGroups.map((billItems) => (
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

      <StickyPagination
        page={page}
        pageCount={pageCount}
        onPageChange={setPage}
      />

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}