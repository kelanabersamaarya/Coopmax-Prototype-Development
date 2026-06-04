"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckSquare, ChevronLeft, ChevronRight, X } from "lucide-react";
import BillingTableView2, {
  type BillingRow,
} from "@/components/anggota/BillingTableView2";
import { toast } from "sonner";

const seedRows: BillingRow[] = [
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-02-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-03-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-04-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-05-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-06-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-07-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-08-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-09-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
];

const seedRowsFor12260002: BillingRow[] = [
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "0,00",
    tagihanBunga: "83.333",
    sisaPokok: "0,00",
    sisaBunga: "26.389",
  },
];

type PaymentMethod =
  | "Pembayaran Reguler"
  | "Pembayaran Penurunan Baki Debet"
  | "Pembayaran Khusus"
  | "Pelunasan";

export type DaftarTagihanSavedTotals = {
  pokok: string;
  bunga: string;
  denda: string;
  total: string;
};

const PENALTY_ROWS = 3;
const PENALTY_AMOUNT = 75000;

function parseIdrLike(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;

  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);

  return Number.isFinite(n) ? n : 0;
}

function formatIdr0(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculateSelectedTotals({
  rows,
  selected,
  includePenalty,
  penaltyIndexOffset,
  forceAll,
}: {
  rows: BillingRow[];
  selected: boolean[];
  includePenalty: boolean;
  penaltyIndexOffset: number;
  forceAll: boolean;
}): DaftarTagihanSavedTotals {
  let pokok = 0;
  let bunga = 0;
  let denda = 0;

  rows.forEach((row, idx) => {
    const checked = forceAll || selected[idx] === true;
    if (!checked) return;

    pokok += parseIdrLike(row.tagihanPokok);
    bunga += parseIdrLike(row.tagihanBunga);

    const globalIdx = penaltyIndexOffset + idx;
    if (includePenalty && globalIdx < PENALTY_ROWS) {
      denda += PENALTY_AMOUNT;
    }
  });

  return {
    pokok: formatIdr0(pokok),
    bunga: formatIdr0(bunga),
    denda: formatIdr0(denda),
    total: formatIdr0(pokok + bunga + denda),
  };
}

function NextBillInfoBannerLikeReference() {
  return (
    <div className="rounded-[5px] border border-slate-200 bg-white px-4 py-4">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
          <span className="text-base font-extrabold">i</span>
        </span>

        <div className="min-w-0 text-sm font-medium text-slate-900">
          Tagihan berikutnya akan diterbitkan pada{" "}
          <span className="font-extrabold text-[#3366FF]">20 April 2025</span>{" "}
          dan jatuh tempo pada{" "}
          <span className="font-extrabold text-[#3366FF]">5 Mei 2025</span>.
        </div>
      </div>
    </div>
  );
}

export default function DaftarTagihanDialog({
  open,
  onOpenChange,
  paymentMethod = "Pembayaran Reguler",
  accountNo,
  contextKey,
  onSaveTotals,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  paymentMethod?: PaymentMethod;
  accountNo?: string;
  contextKey?: string;
  onSaveTotals?: (totals: DaftarTagihanSavedTotals) => void;
}) {
  const isBakiDebet = paymentMethod === "Pembayaran Penurunan Baki Debet";
  const isPelunasan = paymentMethod === "Pelunasan";

  const normalizedAccountNo = (accountNo ?? "").trim();
  const isSecondNasabah = normalizedAccountNo === "12260002";
  const isThirdNasabah = normalizedAccountNo === "12260001";

  const useSecondStyle = isSecondNasabah || isThirdNasabah;
  const lockChecklistForSecondStyle = useSecondStyle;

  const rowsAll = React.useMemo(
    () => (useSecondStyle ? seedRowsFor12260002 : seedRows),
    [useSecondStyle],
  );

  const [pageSize] = React.useState<number>(6);
  const [page, setPage] = React.useState(1);

  const pageCount = Math.max(1, Math.ceil(rowsAll.length / pageSize));

  const rows = React.useMemo(() => {
    if (useSecondStyle) return rowsAll;
    const start = (page - 1) * pageSize;
    return rowsAll.slice(start, start + pageSize);
  }, [page, pageSize, rowsAll, useSecondStyle]);

  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rows.map(() => false),
  );

  React.useEffect(() => {
    if (!open) return;
    setPage(1);
  }, [open]);

  React.useEffect(() => {
    if (lockChecklistForSecondStyle) {
      setSelected(rows.map(() => true));
      return;
    }

    setSelected(rows.map(() => (isBakiDebet || isPelunasan ? true : false)));
  }, [isBakiDebet, isPelunasan, lockChecklistForSecondStyle, rows]);

  const showingStart = rowsAll.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rowsAll.length, page * pageSize);

  const footerH = 78;
  const actionBtnBase = cn(
    "inline-flex items-center justify-center gap-1.5",
    "rounded-[6px] px-3",
    "text-[12px] font-bold tracking-tight text-white",
    "focus:outline-none focus-visible:ring-4",
    "w-full h-10 sm:w-[120px] sm:h-[32px]",
  );
  const iconCls = "h-4 w-4";

  const pagerBtn = (disabled: boolean) =>
    cn(
      "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold",
      "bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm transition",
      disabled ? "opacity-60 pointer-events-none" : "hover:bg-slate-50",
    );

  const hideSelection = isBakiDebet || isPelunasan;
  const showPenaltyColumn = !isBakiDebet;
  const isLocked = isBakiDebet || isPelunasan;
  const showGraceHighlight = page === 1;
  const title = useSecondStyle ? "INFORMASI TAGIHAN DAN DENDA" : "Daftar Tagihan";

  function saveSelectedTotals() {
    const forceAll = hideSelection || useSecondStyle;
    const count = forceAll ? rows.length : selected.filter(Boolean).length;

    if (!forceAll && count === 0) {
      toast("Pilih minimal 1 tagihan", {
        description: "Centang tagihan yang ingin dibayar sebelum menyimpan.",
      });
      return;
    }

    const totals = calculateSelectedTotals({
      rows,
      selected,
      includePenalty: showPenaltyColumn,
      penaltyIndexOffset: useSecondStyle ? 0 : (page - 1) * pageSize,
      forceAll,
    });

    onSaveTotals?.(totals);

    toast.success("Daftar tagihan disimpan", {
      description: `${count} tagihan dipilih. Total: ${totals.total}`,
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[1100px]",
          "max-w-[1100px]",
          "max-h-[85vh]",
          "overflow-hidden",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              {title}
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          <div
            className="overflow-auto px-5 py-5 sm:px-6"
            style={{ maxHeight: `calc(85vh - 64px - 1px - ${footerH}px)` }}
          >
            {useSecondStyle ? (
              <div>
                <NextBillInfoBannerLikeReference />

                <div className="mt-4">
                  <div
                    className={cn(
                      "[&_.bg-white.px-3.py-3]:!py-1.5",
                      "[&_.px-4.py-4]:!py-2",
                    )}
                  >
                    <BillingTableView2
                      rows={rows}
                      selected={selected}
                      setSelected={setSelected}
                      isLocked={lockChecklistForSecondStyle}
                      showNextBillInfo={false}
                      showGraceInfo={true}
                      highlightGraceBlock={true}
                      keepGraceShellWithoutInfo={false}
                      hideSelection={false}
                      showPenaltyColumn={true}
                      penaltyContentEnabled={true}
                      disableRowRings={true}
                      disableRowActiveRing={true}
                      penaltyIndexOffset={0}
                      className="mt-0"
                      contextKey={contextKey}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "[&_.bg-white.px-3.py-3]:!py-1.5",
                    "[&_.px-4.py-4]:!py-2",
                  )}
                >
                  <BillingTableView2
                    rows={rows}
                    selected={selected}
                    setSelected={setSelected}
                    isLocked={isLocked}
                    showNextBillInfo={false}
                    showGraceInfo={page === 1}
                    highlightGraceBlock={page === 1}
                    keepGraceShellWithoutInfo={false}
                    hideSelection={hideSelection}
                    showPenaltyColumn={showPenaltyColumn}
                    disableRowRings={hideSelection}
                    disableRowActiveRing={hideSelection}
                    penaltyIndexOffset={(page - 1) * pageSize}
                    className="mt-0"
                    contextKey={contextKey}
                  />
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-[14px] text-slate-900">
                    Menampilkan {showingStart} sampai {showingEnd} dari{" "}
                    {rowsAll.length} entri
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={pagerBtn(page <= 1)}
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <ChevronLeft className="h-5 w-5 text-slate-500" />
                      Sebelumnya
                    </button>

                    <div className="inline-flex h-11 min-w-11 items-center justify-center rounded-2xl bg-violet-600 px-5 text-[14px] font-extrabold text-white">
                      {page}
                    </div>

                    <button
                      type="button"
                      className={pagerBtn(page >= pageCount)}
                      disabled={page >= pageCount}
                      onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    >
                      Selanjutnya
                      <ChevronRight className="h-5 w-5 text-slate-500" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              {useSecondStyle ? (
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    actionBtnBase,
                    "bg-[#77839A] ring-1 ring-[#77839A]/25 transition hover:bg-[#6b768c]",
                    "focus-visible:ring-[#77839A]/25",
                  )}
                >
                  <X className={iconCls} strokeWidth={3} />
                  Tutup
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      actionBtnBase,
                      "bg-[#77839A] ring-1 ring-[#77839A]/25 transition hover:bg-[#6b768c]",
                      "focus-visible:ring-[#77839A]/25",
                    )}
                  >
                    <X className={iconCls} strokeWidth={3} />
                    Batalkan
                  </button>

                  <button
                    type="button"
                    onClick={saveSelectedTotals}
                    className={cn(
                      actionBtnBase,
                      "bg-[#2fb300] ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]",
                      "focus-visible:ring-[#2fb300]/25",
                    )}
                  >
                    <CheckSquare className={iconCls} strokeWidth={3} />
                    Simpan
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="sr-only">{showGraceHighlight ? "grace" : "nograce"}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}