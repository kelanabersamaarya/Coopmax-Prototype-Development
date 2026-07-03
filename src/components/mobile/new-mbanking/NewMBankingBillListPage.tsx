import * as React from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Info, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import BillingTableWithStatus, {
  type BillingRow,
} from "@/components/loans/BillingTableWithStatus";

const billRows: BillingRow[] = [
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "0,00",
    tagihanBunga: "83.333",
    sisaPokok: "0,00",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-02-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "0,00",
    tagihanBunga: "83.333",
    sisaPokok: "0,00",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-03-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "0,00",
    tagihanBunga: "83.333",
    sisaPokok: "0,00",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-04-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-05-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-06-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-07-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-08-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-09-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-10-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-11-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-12-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
];

function InfoCard({
  title,
  description,
  accent = "blue",
}: {
  title: string;
  description: string;
  accent?: "blue" | "green";
}) {
  return (
    <div
      className={cn(
        "rounded-[18px] px-4 py-4",
        accent === "green" ? "bg-[#EAF8EF]" : "bg-[#EEF6FF]",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full text-white",
            accent === "green" ? "bg-[#33AA00]" : "bg-[#479DF4]",
          )}
        >
          <Info className="h-[18px] w-[18px]" strokeWidth={2.6} />
        </span>

        <div className="min-w-0">
          <div className="text-[14px] font-bold leading-tight text-black">
            {title}
          </div>
          <div className="mt-[6px] text-[12px] font-normal leading-relaxed text-[#5F6B7A]">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

function PaginationBar({
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
    <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <button
          type="button"
          disabled={prevDisabled}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className={cn(
            "inline-flex h-[46px] items-center justify-center gap-1 rounded-[10px]",
            "border border-[#D8D8D8] bg-white px-3 text-[12px] font-semibold",
            prevDisabled ? "text-[#B0B0B0]" : "text-[#53657D]",
            "transition active:scale-[0.98]",
          )}
        >
          <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={2.8} />
          <span className="truncate">Sebelumnya</span>
        </button>

        <div className="grid h-[46px] min-w-[46px] place-items-center rounded-[10px] bg-[#479DF4] px-4 text-[14px] font-bold text-white">
          {page}
        </div>

        <button
          type="button"
          disabled={nextDisabled}
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          className={cn(
            "inline-flex h-[46px] items-center justify-center gap-1 rounded-[10px]",
            "border border-[#D8D8D8] bg-white px-3 text-[12px] font-semibold",
            nextDisabled ? "text-[#B0B0B0]" : "text-[#53657D]",
            "transition active:scale-[0.98]",
          )}
        >
          <span className="truncate">Selanjutnya</span>
          <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.8} />
        </button>
      </div>
    </div>
  );
}

export default function NewMBankingBillListPage({
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
  const pageSize = 9;
  const [page, setPage] = React.useState(1);

  const isSpecialAccount = accountNo === "12260006" || accountNo === "072260001";

  const shouldShowThreeBillsWithNextInfo =
    singleBillWithNextInfo || (showSpecialNextBillInfo && isSpecialAccount);

  const rowsForAccount = React.useMemo(() => {
    if (shouldShowThreeBillsWithNextInfo) {
      return billRows.slice(0, 3);
    }

    return billRows;
  }, [shouldShowThreeBillsWithNextInfo]);

  const pageCount = Math.max(1, Math.ceil(rowsForAccount.length / pageSize));
  const showPagination = pageCount > 1 || shouldShowThreeBillsWithNextInfo;

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const pagedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rowsForAccount.slice(start, start + pageSize);
  }, [page, rowsForAccount]);

  const showGraceHighlight = page === 1;

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
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
            Daftar Tagihan
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[118px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-4 pb-[34px] pt-[24px]">
          <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#14B8A6_0%,#0F766E_52%,#115E59_100%)] px-5 py-5 text-white">
            <div className="pointer-events-none absolute -right-[42px] -top-[42px] h-[136px] w-[136px] rounded-full bg-white/16" />
            <div className="pointer-events-none absolute right-[48px] top-[58px] h-[64px] w-[64px] rounded-full bg-emerald-200/16" />
            <div className="pointer-events-none absolute -bottom-[36px] left-[72px] h-[96px] w-[96px] rounded-full bg-teal-950/12" />

            <div className="relative z-10 flex items-center gap-3">
              <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[14px] bg-white/18 text-white">
                <ReceiptText className="h-[23px] w-[23px]" strokeWidth={2.5} />
              </span>

              <div className="min-w-0">
                <div className="text-[12px] font-normal leading-none text-white/78">
                  No. Pinjaman
                </div>
                <div className="mt-[8px] truncate text-[18px] font-bold leading-tight text-white">
                  {accountNo || "SMG260004"}
                </div>
              </div>
            </div>
          </div>

          {shouldShowThreeBillsWithNextInfo ? (
            <div className="mt-[12px]">
              <InfoCard
                title="Tagihan Berikutnya"
                description="Tagihan berikutnya akan diterbitkan pada 20 April 2025 dan jatuh tempo pada 5 Mei 2025."
                accent="green"
              />
            </div>
          ) : null}

          <div className="mt-[18px] rounded-[15px] border border-[#CDD4E0] bg-white p-2 shadow-sm">
            <div className="max-w-full overflow-hidden">
              <BillingTableWithStatus
                rows={pagedRows}
                showGraceHighlight={showGraceHighlight}
                showGraceInfo={false}
                penaltyIndexOffset={(page - 1) * pageSize}
                showPenaltyDetailAction={false}
                className="mt-0"
              />
            </div>
          </div>
        </section>
      </main>

      {showPagination ? (
        <PaginationBar page={page} pageCount={pageCount} onPageChange={setPage} />
      ) : null}
    </div>
  );
}