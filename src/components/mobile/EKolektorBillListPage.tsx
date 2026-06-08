"use client";

import * as React from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorGracePeriodInfoCard from "@/components/mobile/EKolektorGracePeriodInfoCard";
import EKolektorNextBillInfoCard from "@/components/mobile/EKolektorNextBillInfoCard";

type BillGroup = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
  tagihanDenda: string;
};

const billGroups: BillGroup[] = [
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
    tagihanDenda: "75.000",
  },
  {
    jatuhTempo: "25-02-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
    tagihanDenda: "75.000",
  },
  {
    jatuhTempo: "25-03-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
    tagihanDenda: "75.000",
  },
  {
    jatuhTempo: "25-04-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
    tagihanDenda: "0,00",
  },
  {
    jatuhTempo: "25-05-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
    tagihanDenda: "0,00",
  },
  {
    jatuhTempo: "25-06-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
    tagihanDenda: "0,00",
  },
  {
    jatuhTempo: "25-07-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
    tagihanDenda: "0,00",
  },
  {
    jatuhTempo: "25-08-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
    tagihanDenda: "0,00",
  },
  {
    jatuhTempo: "25-09-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
    tagihanDenda: "0,00",
  },
];

function BillAmountBlock({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
        {label}
      </div>
      <div className="mt-[5px] text-[14px] font-extrabold leading-tight tracking-tight text-black">
        {value}
      </div>
    </div>
  );
}

function BillCard({ bill }: { bill: BillGroup }) {
  return (
    <div className="rounded-[24px] bg-white px-6 py-5 shadow-[0_4px_14px_rgba(15,23,42,0.20)] ring-1 ring-slate-100">
      <div className="grid grid-cols-2 gap-x-5">
        <div className="min-w-0">
          <BillAmountBlock label="Jatuh Tempo" value={bill.jatuhTempo} />

          <div className="mt-[12px] grid gap-[12px]">
            <BillAmountBlock label="Tagihan Pokok" value={bill.tagihanPokok} />
            <BillAmountBlock label="Sisa Tagihan Pokok" value={bill.sisaPokok} />
            <BillAmountBlock label="Tagihan Denda" value={bill.tagihanDenda} />
          </div>
        </div>

        <div className="min-w-0 text-right">
          <BillAmountBlock
            label="Total Tagihan Belum Dibayar"
            value={bill.totalBelumDibayar}
            align="right"
          />

          <div className="mt-[12px] grid gap-[12px]">
            <BillAmountBlock
              label="Tagihan Bunga"
              value={bill.tagihanBunga}
              align="right"
            />
            <BillAmountBlock
              label="Sisa Tagihan Bunga"
              value={bill.sisaBunga}
              align="right"
            />
          </div>
        </div>
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

  const navButtonClass = (disabled: boolean) =>
    cn(
      "inline-flex h-[44px] flex-1 items-center justify-center gap-1 rounded-[14px] px-3",
      "bg-[#F4F7FB] text-[12px] font-extrabold tracking-tight text-[#53657D]",
      "ring-1 ring-[#E5ECF4] transition active:scale-[0.98]",
      disabled
        ? "text-[#A7B1C2]"
        : "hover:bg-[#EEF3F8] hover:text-[#203064]",
    );

  return (
    <div className="shrink-0 bg-white px-3 py-3 shadow-[0_-8px_18px_rgba(15,23,42,0.08)]">
      <div className="flex w-full items-center justify-between gap-2">
        <button
          type="button"
          disabled={prevDisabled}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className={navButtonClass(prevDisabled)}
        >
          <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={3} />
          <span className="truncate">Sebelumnya</span>
        </button>

        <div className="inline-flex h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-[14px] bg-[#004FC7] px-4 text-[15px] font-extrabold text-white shadow-sm">
          {page}
        </div>

        <button
          type="button"
          disabled={nextDisabled}
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          className={navButtonClass(nextDisabled)}
        >
          <span className="truncate">Selanjutnya</span>
          <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

export default function EKolektorBillListPage({
  accountNo,
  onBack,
  showSpecialNextBillInfo = true,
  singleBillWithNextInfo = false,
}: {
  accountNo?: string;
  onBack: () => void;
  showSpecialNextBillInfo?: boolean;
  singleBillWithNextInfo?: boolean;
}) {
  const pageSize = 5;
  const [page, setPage] = React.useState(1);

  const shouldShowSingleBillWithNextInfo =
    singleBillWithNextInfo ||
    (showSpecialNextBillInfo &&
      (accountNo === "7260175" || accountNo === "SMG260004"));

  const billsForAccount = React.useMemo(() => {
    if (shouldShowSingleBillWithNextInfo) {
      return billGroups.slice(0, 1);
    }

    return billGroups;
  }, [shouldShowSingleBillWithNextInfo]);

  const pageCount = Math.max(1, Math.ceil(billsForAccount.length / pageSize));

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const pagedBillGroups = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return billsForAccount.slice(start, start + pageSize);
  }, [billsForAccount, page]);

  const gracePeriodBills = page === 1 ? pagedBillGroups.slice(0, 3) : [];
  const regularBills = page === 1 ? pagedBillGroups.slice(3) : pagedBillGroups;

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[154px] overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
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

        <main className="relative z-10 -mt-[14px] min-h-[calc(100%-140px)] rounded-t-[30px] bg-[#F2F2F2] px-6 pb-8 pt-7">
          {gracePeriodBills.length > 0 ? (
            <>
              {shouldShowSingleBillWithNextInfo ? <EKolektorNextBillInfoCard /> : null}

              <div className="rounded-[28px] border-2 border-[#004FC7] p-3">
                <EKolektorGracePeriodInfoCard />

                <div className="grid gap-4">
                  {gracePeriodBills.map((bill) => (
                    <BillCard key={bill.jatuhTempo} bill={bill} />
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {regularBills.length > 0 ? (
            <div className={cn("grid gap-4", gracePeriodBills.length > 0 ? "mt-4" : "")}>
              {regularBills.map((bill) => (
                <BillCard key={bill.jatuhTempo} bill={bill} />
              ))}
            </div>
          ) : null}
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