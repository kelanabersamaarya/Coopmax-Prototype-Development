"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, Plus } from "lucide-react";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import NumericCell from "@/components/anggota/NumericCell";
import BillingStatusBadge from "@/components/anggota/BillingStatusBadge";
import PenaltyDetailDialog, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialog";
import PenaltyDetailDialogReadOnly from "@/components/anggota/PenaltyDetailDialogReadOnly";
import BillingTableHeader from "@/components/anggota/BillingTableHeader";
import { getBillingGridTemplateColumns } from "@/components/anggota/billing-table-layout";
import PenaltyAddReasonDialog from "@/components/anggota/PenaltyAddReasonDialog";
import {
  addPenaltyOverride,
  addedPenaltyItemId,
  getPenaltyAdds,
  getPenaltyCanceledItems,
  parseIdrLikeToNumber,
  seedPenaltyItemId,
} from "@/lib/penaltyOverridesStore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseIdrLike } from "@/components/anggota/anggota-money";
import type { BillingRow } from "@/domain/loans/types/billing";

export type { BillingRow } from "@/domain/loans/types/billing";

const PENALTY_ROWS = 3;

// Base penalty detail: 3 hari × 25.000 = 75.000
const PENALTY_DETAIL_DAYS = 3;
const PENALTY_PER_DAY = 25_000;

function RowShell({
  children,
  active,
  disableActiveRing = false,
  disableRowRings = false,
  density = "default",
  compact = false,
}: {
  children: React.ReactNode;
  active: boolean;
  disableActiveRing?: boolean;
  disableRowRings?: boolean;
  density?: "default" | "roomy";
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-white px-0",
        compact ? "py-1.5" : density === "roomy" ? "py-4" : "py-3",
      )}
    >
      <div
        className={cn(
          "rounded-[5px] bg-white",
          !disableRowRings && active && !disableActiveRing
            ? "ring-2 ring-slate-900/5"
            : "",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function NextBillInfoBanner() {
  return (
    <div className="rounded-[5px] border border-slate-200 bg-white px-4 py-4">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
          <span className="text-base font-extrabold">i</span>
        </span>

        <div className="min-w-0 text-sm font-medium text-slate-900">
          Tagihan berikutnya akan diterbitkan pada{" "}
          <span className="font-extrabold text-[#3366FF]">20 Agustus 2026</span>{" "}
          dan jatuh tempo pada{" "}
          <span className="font-extrabold text-[#3366FF]">25 Agustus 2026</span>.
        </div>
      </div>
    </div>
  );
}

function formatDmy(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function parseDmyToDate(value: string): Date | undefined {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec((value ?? "").trim());
  if (!m) return undefined;
  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);
  const d = new Date(yyyy, mm - 1, dd);
  if (
    d.getFullYear() !== yyyy ||
    d.getMonth() !== mm - 1 ||
    d.getDate() !== dd
  ) {
    return undefined;
  }
  return d;
}

function formatRupiahValue(n: number) {
  const s = Math.round(n).toString();
  return `${s.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},00`;
}

function buildPenaltyDetailRows(dueDateDmy: string) {
  const due = parseDmyToDate(dueDateDmy) ?? new Date();

  const rows: PenaltyDetailRow[] = Array.from({ length: PENALTY_DETAIL_DAYS }).map(
    (_v, i) => ({
      tanggalKeterlambatan: formatDmy(addDays(due, i + 1)),
      nominalDenda: formatRupiahValue(PENALTY_PER_DAY),
    }),
  );

  return rows;
}

function PenaltyIconButton({
  onClick,
  icon = "eye",
  className,
}: {
  onClick: () => void;
  icon?: "eye" | "plus";
  className?: string;
}) {
  const IconComp = icon === "plus" ? Plus : Eye;

  const label = icon === "plus" ? "Tambah Denda" : "Lihat Detail Denda";

  return (
    <Tooltip delayDuration={120}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
          className={cn(
            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
            "bg-[#2563eb] text-white ring-2 ring-[#2563eb]/15",
            "transition hover:bg-[#1d4ed8]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563eb]/20",
            className,
          )}
          aria-label={label}
        >
          <IconComp className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>

      <TooltipContent className="rounded-xl border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-800 shadow-xl">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

function formatRupiah(v: string | number) {
  return formatRupiahValue(parseIdrLike(v));
}

function buildSeedPenaltyDates(dueDateDmy: string) {
  const due = parseDmyToDate(dueDateDmy) ?? new Date();
  return Array.from({ length: PENALTY_DETAIL_DAYS }).map((_, i) =>
    formatDmy(addDays(due, i + 1)),
  );
}

export default function BillingTableView2({
  rows,
  selected,
  setSelected,
  isLocked = false,
  showNextBillInfo = true,
  showGraceInfo = true,
  highlightGraceBlock = false,
  keepGraceShellWithoutInfo = false,
  hideSelection = false,
  showPenaltyColumn = false,
  showStatusColumn = false,
  statusBadgeVariant = "default",
  penaltyContentEnabled = true,
  penaltyIndexOffset = 0,
  penaltyDialogVariant = "default",
  tone = "default",
  disableRowActiveRing = false,
  disableRowRings = false,
  hideRowDividers = false,
  rowDensity = "default",
  className,
  contextKey,
  grandTotalRows,
  showPageTotal = false,
  tableFooter,
  layout = "default",
}: {
  rows: BillingRow[];
  selected: boolean[];
  setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
  isLocked?: boolean;
  showNextBillInfo?: boolean;
  showGraceInfo?: boolean;
  highlightGraceBlock?: boolean;
  keepGraceShellWithoutInfo?: boolean;
  hideSelection?: boolean;
  showPenaltyColumn?: boolean;
  showStatusColumn?: boolean;
  statusBadgeVariant?: "default" | "nasabah-2";
  penaltyContentEnabled?: boolean;
  penaltyIndexOffset?: number;
  penaltyDialogVariant?: "default" | "read-only";
  tone?: "default" | "khusus";
  disableRowActiveRing?: boolean;
  disableRowRings?: boolean;
  hideRowDividers?: boolean;
  rowDensity?: "default" | "roomy";
  className?: string;
  contextKey?: string;
  grandTotalRows?: BillingRow[];
  showPageTotal?: boolean;
  tableFooter?: React.ReactNode;
  layout?: "default" | "loan-dialog";
}) {
  const [penaltyOpen, setPenaltyOpen] = React.useState(false);
  const [penaltyRows, setPenaltyRows] = React.useState<PenaltyDetailRow[]>([]);
  const [penaltyContext, setPenaltyContext] = React.useState<{
    dueDateDmy: string;
    rowIndexGlobal: number;
  } | null>(null);

  const [addOpen, setAddOpen] = React.useState(false);
  const [addTarget, setAddTarget] = React.useState<{
    dueDateDmy: string;
    rowIndexGlobal: number;
  } | null>(null);

  const [refreshTick, setRefreshTick] = React.useState(0);
  const currentUserName = "Arya Dharma";

  const colCount = (hideSelection
    ? showPenaltyColumn
      ? 8
      : 7
    : showPenaltyColumn
      ? 9
      : 8) + (showStatusColumn ? 1 : 0);

  React.useEffect(() => {
    if (selected.length === rows.length) return;
    setSelected((prev) => rows.map((_, idx) => prev[idx] ?? false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length]);

  React.useEffect(() => {
    const refresh = () => setRefreshTick((tick) => tick + 1);
    window.addEventListener("penalty-overrides-changed", refresh);
    return () => window.removeEventListener("penalty-overrides-changed", refresh);
  }, []);

  const graceCount = highlightGraceBlock ? Math.min(2, rows.length) : 0;
  const graceRows = graceCount > 0 ? rows.slice(0, graceCount) : [];
  const afterGraceRows = graceCount > 0 ? rows.slice(graceCount) : rows;

  const gridTemplateColumns = getBillingGridTemplateColumns({
    hideSelection,
    showPenaltyColumn,
    showStatusColumn,
    layout,
  });

  const isCompact = hideSelection;

  const effectiveDensity: "default" | "roomy" = hideSelection
    ? "default"
    : rowDensity;

  const cellY = isCompact
    ? "py-1.5"
    : effectiveDensity === "roomy"
      ? "py-6"
      : "py-2.5";
  const rowShellDensity: "default" | "roomy" = hideSelection
    ? "default"
    : effectiveDensity;

  const dateTextClass =
    "text-left text-[12px] font-normal text-slate-900 tabular-nums whitespace-nowrap";

  const numberTextClassBase =
    "text-right text-[12px] font-normal text-slate-900 tabular-nums whitespace-nowrap num-sans-tabular";

  const numberTextClass =
    tone === "khusus" ? numberTextClassBase : numberTextClassBase;

  const canPersist = !!contextKey && penaltyContentEnabled;

  function openPenaltyDetailForRow(rowIndexGlobal: number, dueDateDmy: string) {
    setPenaltyRows(
      rowIndexGlobal >= PENALTY_ROWS ? [] : buildPenaltyDetailRows(dueDateDmy),
    );
    setPenaltyContext({ dueDateDmy, rowIndexGlobal });
    setPenaltyOpen(true);
  }

  function openAddPenalty(dueDateDmy: string, rowIndexGlobal: number) {
    setAddTarget({ dueDateDmy, rowIndexGlobal });
    setAddOpen(true);
  }

  function RightNum({ value }: { value: string }) {
    return <NumericCell align="right">{value}</NumericCell>;
  }

  function getAddsForRow(globalIdx: number, dueDateDmy: string) {
    if (!contextKey) return [];
    return getPenaltyAdds(contextKey).filter(
      (a) =>
        Number(a.rowIndexGlobal) === Number(globalIdx) &&
        a.dueDateDmy === dueDateDmy,
    );
  }

  function hasActiveManualPenaltyForRow(globalIdx: number, dueDateDmy: string) {
    if (globalIdx < PENALTY_ROWS) return false;
    if (!canPersist) return false;

    const adds = getAddsForRow(globalIdx, dueDateDmy);
    if (adds.length === 0) return false;

    const canceledItems = getPenaltyCanceledItems(contextKey!);

    return adds.some((a) => {
      const pid = addedPenaltyItemId(a.id);
      const isCanceled = canceledItems.some(
        (c) =>
          c.dueDateDmy === dueDateDmy &&
          c.rowIndexGlobal === globalIdx &&
          c.penaltyItemId === pid,
      );
      return !isCanceled;
    });
  }

  function penaltyValueForRow(
    globalIdx: number,
    dueDateDmy: string,
    localIdx: number,
  ) {
    if (!canPersist) {
      if (localIdx < 3) return { total: 0, hasAdded: false };
      return { total: 0, hasAdded: false };
    }

    const rowAdds = getAddsForRow(globalIdx, dueDateDmy);
    const canceledItems = getPenaltyCanceledItems(contextKey!);
    const addedActiveTotal = rowAdds.reduce((sum, add) => {
      const itemId = addedPenaltyItemId(add.id);
      const canceled = canceledItems.some(
        (item) =>
          item.dueDateDmy === dueDateDmy &&
          Number(item.rowIndexGlobal) === Number(globalIdx) &&
          item.penaltyItemId === itemId,
      );
      return sum + (canceled ? 0 : parseIdrLikeToNumber(add.amountIdrLike));
    }, 0);

    const seedActiveTotal = localIdx < 3
      ? buildSeedPenaltyDates(dueDateDmy).reduce((sum, date) => {
          const itemId = seedPenaltyItemId(date);
          const canceled = canceledItems.some(
            (item) =>
              Number(item.rowIndexGlobal) === Number(globalIdx) &&
              item.penaltyItemId === itemId,
          );
          return sum + (canceled ? 0 : PENALTY_PER_DAY);
        }, 0)
      : 0;

    return {
      total: seedActiveTotal + addedActiveTotal,
      hasAdded: addedActiveTotal > 0,
    };
  }

  function PenaltyCell({
    globalIdx,
    localIdx,
    dueDateDmy,
  }: {
    globalIdx: number;
    localIdx: number;
    dueDateDmy: string;
  }) {
    if (localIdx < PENALTY_ROWS) {
      const { total } = penaltyValueForRow(globalIdx, dueDateDmy, localIdx);
      return (
        <>
          <div className={cn("pr-1 pl-4", cellY, numberTextClass)}>
            <span className="block text-right tabular-nums whitespace-nowrap num-sans-tabular">
              {formatRupiah(total)}
            </span>
          </div>
          <div className={cn("flex items-center justify-start pl-0 pr-0", cellY)}>
            <PenaltyIconButton
              icon="eye"
              onClick={() => openPenaltyDetailForRow(globalIdx, dueDateDmy)}
            />
          </div>
        </>
      );
    }

    if (localIdx >= PENALTY_ROWS) {
      const { total } = penaltyValueForRow(globalIdx, dueDateDmy, localIdx);
      const hasManualActive = hasActiveManualPenaltyForRow(globalIdx, dueDateDmy);

      return (
        <>
          <div className={cn("pr-1 pl-4", cellY, numberTextClass)}>
            <span className="block text-right tabular-nums whitespace-nowrap num-sans-tabular">
              {hasManualActive && total > 0 ? formatRupiah(total) : "0,00"}
            </span>
          </div>
          <div className={cn("flex items-center justify-start pl-0 pr-0", cellY)}>
            <PenaltyIconButton
              icon={hasManualActive ? "eye" : "plus"}
              onClick={() =>
                hasManualActive
                  ? openPenaltyDetailForRow(globalIdx, dueDateDmy)
                  : openAddPenalty(dueDateDmy, globalIdx)
              }
            />
          </div>
        </>
      );
    }

  }

  const rowDividerClass = hideRowDividers ? "" : "border-t border-[#CDD4E0]";

  function displayTagihanPokok(rowIndex: number, raw: string) {
    if (rowIndex === 2) return "0,00";
    if (graceCount > 0 && rowIndex < graceCount) return "0,00";
    return formatRupiah(raw);
  }

  function displaySisaPokok(rowIndex: number, raw: string) {
    if (rowIndex === 2) return "0,00";
    if (graceCount > 0 && rowIndex < graceCount) return "0,00";
    return formatRupiah(raw);
  }

  function displayTagihanBunga(rowIndex: number, raw: string) {
    return rowIndex === 2 ? "0,00" : formatRupiah(raw);
  }

  function displaySisaBunga(rowIndex: number, raw: string) {
    return rowIndex === 2 ? "0,00" : formatRupiah(raw);
  }

  function statusForRow(row: BillingRow, rowIndex: number) {
    if (rowIndex < 2) return "Lunas" as const;
    if (rowIndex === 3) return "Jatuh Tempo" as const;
    return row.statusTagihan === "Terlambat"
      ? "Belum Dibayar" as const
      : row.statusTagihan ?? "Belum Dibayar";
  }

  const renderGraceShell = highlightGraceBlock && graceRows.length > 0;
  const shouldShowGraceInfoRow =
    renderGraceShell && (showGraceInfo || keepGraceShellWithoutInfo);

  const checkboxCls = cn(
    "h-3.5 w-3.5 rounded-[4px] accent-blue-600",
    "border-0 bg-transparent shadow-none ring-0",
    "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const totalColPad = "px-[5px]";
  const dataCellClass = "px-[5px]";

  const grandRows = grandTotalRows ?? rows;

  function totalForField(
    sourceRows: BillingRow[],
    field: keyof BillingRow,
    indexOffset: number,
  ) {
    return sourceRows.reduce(
      (sum, row, index) => {
        const rowIndex = indexOffset + index;
        let value = row[field] ?? "0";

        if (field === "tagihanPokok") value = displayTagihanPokok(rowIndex, value);
        if (field === "tagihanBunga") value = displayTagihanBunga(rowIndex, value);
        if (field === "sisaPokok") value = displaySisaPokok(rowIndex, value);
        if (field === "sisaBunga") value = displaySisaBunga(rowIndex, value);

        return sum + parseIdrLike(value);
      },
      0,
    );
  }

  function totalForPenalty(sourceRows: BillingRow[], indexOffset: number) {
    return sourceRows.reduce(
      (sum, row, index) =>
        sum + penaltyValueForRow(indexOffset + index, row.jatuhTempo, index).total,
      0,
    );
  }

  const pageTotals = {
    totalBelumDibayar: totalForField(rows, "totalBelumDibayar", penaltyIndexOffset),
    tagihanPokok: totalForField(rows, "tagihanPokok", penaltyIndexOffset),
    tagihanBunga: totalForField(rows, "tagihanBunga", penaltyIndexOffset),
    sisaPokok: totalForField(rows, "sisaPokok", penaltyIndexOffset),
    sisaBunga: totalForField(rows, "sisaBunga", penaltyIndexOffset),
    denda: totalForPenalty(rows, penaltyIndexOffset),
  };

  const grandTotals = {
    totalBelumDibayar: totalForField(grandRows, "totalBelumDibayar", 0),
    tagihanPokok: totalForField(grandRows, "tagihanPokok", 0),
    tagihanBunga: totalForField(grandRows, "tagihanBunga", 0),
    sisaPokok: totalForField(grandRows, "sisaPokok", 0),
    sisaBunga: totalForField(grandRows, "sisaBunga", 0),
    denda: totalForPenalty(grandRows, 0),
  };

  function TotalRow({
    label,
    values,
  }: {
    label: string;
    values: {
      totalBelumDibayar: number;
      tagihanPokok: number;
      tagihanBunga: number;
      sisaPokok: number;
      sisaBunga: number;
      denda: number;
    };
  }) {
    const totalCellClass = "border-t border-[#CDD4E0] px-4 py-2 text-right text-[12px] font-bold tabular-nums text-slate-800";
    const penaltyTotalCellClass = "border-t border-[#CDD4E0] pr-1 pl-4 py-2 text-right text-[12px] font-bold tabular-nums text-slate-800";
    return (
      <tr className="bg-white">
        <td colSpan={hideSelection ? 1 : 2} className="border-t border-[#CDD4E0] px-4 py-2 text-left text-[12px] font-bold leading-tight text-slate-800">
          {label === "Total Tagihan per Halaman" ? (
            <>
              <span className="block whitespace-nowrap">Total</span>
              <span className="block whitespace-nowrap">Tagihan per</span>
              <span className="block whitespace-nowrap">Halaman</span>
            </>
          ) : (
            <>
              <span className="block whitespace-nowrap">Total</span>
              <span className="block whitespace-nowrap">Tagihan</span>
              <span className="block whitespace-nowrap">Keseluruhan</span>
            </>
          )}
        </td>
        <td className={totalCellClass}><span className="relative left-4 whitespace-nowrap">{formatRupiah(values.totalBelumDibayar)}</span></td>
        <td className="border-t border-[#CDD4E0] py-2 pl-4 pr-0 text-right text-[12px] font-bold tabular-nums text-slate-800"><span className="whitespace-nowrap">{formatRupiah(values.tagihanPokok)}</span></td>
        <td className={totalCellClass}><span className="relative left-4 whitespace-nowrap">{formatRupiah(values.tagihanBunga)}</span></td>
        <td className={totalCellClass}>{formatRupiah(values.sisaPokok)}</td>
        <td className={totalCellClass}>{formatRupiah(values.sisaBunga)}</td>
        {showPenaltyColumn ? <td className={penaltyTotalCellClass}>{formatRupiah(values.denda)}</td> : null}
        {showPenaltyColumn ? <td className="border-t border-[#CDD4E0] px-4 py-2" /> : null}
        {showStatusColumn ? <td className="border-t border-[#CDD4E0] px-4 py-2" /> : null}
      </tr>
    );
  }

  return (
    <div className={cn("mt-3", className)}>
      <PenaltyAddReasonDialog
        open={addOpen}
        onOpenChange={(v) => {
          setAddOpen(v);
          if (!v) setAddTarget(null);
        }}
        onConfirm={(reason, date, nominalDenda) => {
          if (!canPersist || !addTarget) return;

          addPenaltyOverride(contextKey!, {
            dueDateDmy: addTarget.dueDateDmy,
            rowIndexGlobal: addTarget.rowIndexGlobal,
            amountIdrLike: nominalDenda,
            reason,
            addDateDmy: date,
            by: currentUserName,
          });

          setRefreshTick((t) => t + 1);
        }}
      />

      {penaltyDialogVariant === "read-only" ? (
        <PenaltyDetailDialogReadOnly
          open={penaltyOpen}
          onOpenChange={setPenaltyOpen}
          rows={penaltyRows}
        />
      ) : (
        <PenaltyDetailDialog
          open={penaltyOpen}
          onOpenChange={setPenaltyOpen}
          rows={penaltyRows}
          contextKey={contextKey}
          dueDateDmy={penaltyContext?.dueDateDmy}
          rowIndexGlobal={penaltyContext?.rowIndexGlobal}
        />
      )}

      {showNextBillInfo ? <NextBillInfoBanner /> : null}

      <div
        className={cn(
          showNextBillInfo ? "mt-3" : "",
          "overflow-x-auto rounded-[5px] border border-[#CDD4E0] bg-white",
        )}
      >
        <table className="w-full min-w-[1000px] table-fixed border-separate border-spacing-0 text-[12px]">
          <colgroup>
            {!hideSelection ? <col className="w-[36px]" /> : null}
            <col className="w-[72px]" />
            <col className={layout === "loan-dialog" ? "w-[80px]" : "w-[100px]"} />
            <col className={layout === "loan-dialog" ? "w-[90px]" : "w-[96px]"} />
            <col className={layout === "loan-dialog" ? "w-[90px]" : "w-[96px]"} />
            <col className={layout === "loan-dialog" ? "w-[90px]" : "w-[100px]"} />
            <col className={layout === "loan-dialog" ? "w-[90px]" : "w-[100px]"} />
            {showPenaltyColumn ? <col className={layout === "loan-dialog" ? "w-[84px]" : "w-[100px]"} /> : null}
            {showPenaltyColumn ? <col className={layout === "loan-dialog" ? "w-[24px]" : "w-[28px]"} /> : null}
            {showStatusColumn ? <col className={layout === "loan-dialog" ? "w-[76px] min-w-[76px]" : "w-[105px] min-w-[105px]"} /> : null}
          </colgroup>
          <BillingTableHeader
            hideSelection={hideSelection}
            showPenaltyColumn={showPenaltyColumn}
            showActionColumn={showPenaltyColumn}
            showStatusColumn={showStatusColumn}
            layout={layout}
          />

          <tbody className="bg-white">
            {renderGraceShell ? (
              <>
                <tr className={cn(rowDividerClass)}>
                  <td colSpan={colCount} className="p-0">
                    <div className="bg-white p-0">
                      <div className="rounded-[5px] border-2 border-blue-600/70 bg-white">
                        {shouldShowGraceInfoRow ? (
                          <div className="p-1">
                            <table className="w-full border-collapse text-[12px]">
                              <tbody className="bg-white">
                                {showGraceInfo ? (
                                  <GracePeriodInfoRow colSpan={colCount} noBorder />
                                ) : null}
                              </tbody>
                            </table>
                          </div>
                        ) : null}

                        {graceRows.map((r, idx) => {
                          const rowIndex = idx;
                          const globalIdx = penaltyIndexOffset + rowIndex;

                          const active = false;

                          return (
                            <div
                              key={`${r.jatuhTempo}-grace-flat-${idx}`}
                              className={cn(idx === 0 ? "" : "border-t border-[#CDD4E0]")}
                            >
                              <RowShell
                                active={active}
                                disableActiveRing={disableRowActiveRing}
                                disableRowRings={disableRowRings}
                                density={rowShellDensity}
                                compact={isCompact}
                              >
                                <div
                                  className="grid items-center gap-0"
                                  style={{ gridTemplateColumns: gridTemplateColumns }}
                                >
                                  {!hideSelection ? (
                                    <div
                                      className={cn(
                                        "flex items-center justify-center px-4",
                                        cellY,
                                      )}
                                    >
                                      <input
                                        type="checkbox"
                                        aria-label="Pilih tagihan"
                                        checked={
                                          isLocked ? true : (selected[rowIndex] ?? false)
                                        }
                                        disabled={isLocked}
                                        onChange={(e) => {
                                          const next = e.target.checked;
                                          setSelected((prev) => {
                                            const copy = [...prev];
                                            copy[rowIndex] = next;
                                            return copy;
                                          });
                                        }}
                                        className={checkboxCls}
                                      />
                                    </div>
                                  ) : null}

                                  <div className={cn("px-4", cellY, dateTextClass)}>
                                    {r.jatuhTempo}
                                  </div>

                                  <div className={cn(totalColPad, cellY, numberTextClass)}>
                                    <RightNum value={formatRupiah(r.totalBelumDibayar)} />
                                  </div>

                                  <div className={cn("px-4", cellY, numberTextClass)}>
                                   <RightNum
                                     value={displayTagihanPokok(rowIndex, r.tagihanPokok)}
                                   />
                                 </div>

                                  <div className={cn("px-4", cellY, numberTextClass)}>
                                   <RightNum value={displayTagihanBunga(rowIndex, r.tagihanBunga)} />
                                 </div>

                                 <div className={cn("px-4", cellY, numberTextClass)}>
                                   <RightNum
                                     value={displaySisaPokok(rowIndex, r.sisaPokok)}
                                   />
                                 </div>

                                 <div className={cn("px-4", cellY, numberTextClass)}>
                                   <RightNum value={displaySisaBunga(rowIndex, r.sisaBunga)} />
                                 </div>

                                  {showPenaltyColumn ? (
                                    <PenaltyCell
                                      globalIdx={globalIdx}
                                      localIdx={rowIndex}
                                      dueDateDmy={r.jatuhTempo}
                                    />
                                  ) : null}

                                  {showStatusColumn ? (
                                    <div className={cn("px-[5px] text-left", cellY)}>
                                    <BillingStatusBadge
                                        status={statusForRow(r, rowIndex)}
                                        variant={statusBadgeVariant}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              </RowShell>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </td>
                </tr>

                {afterGraceRows.map((r, idx) => {
                  const rowIndex = graceCount + idx;
                  const globalIdx = penaltyIndexOffset + rowIndex;

                  const active = false;

                  return (
                    <tr key={`${r.jatuhTempo}-${rowIndex}`} className={cn(rowDividerClass)}>
                      <td colSpan={colCount} className={cn("p-0", rowDividerClass)}>
                        <RowShell
                          active={active}
                          disableActiveRing={disableRowActiveRing}
                          disableRowRings={disableRowRings}
                          density={rowShellDensity}
                          compact={isCompact}
                        >
                          <div
                            className="grid items-center gap-0"
                            style={{ gridTemplateColumns: gridTemplateColumns }}
                          >
                            {!hideSelection ? (
                              <div
                                className={cn(
                                  "flex items-center justify-center px-4",
                                  cellY,
                                )}
                              >
                                <input
                                  type="checkbox"
                                  aria-label="Pilih tagihan"
                                  checked={isLocked ? true : (selected[rowIndex] ?? false)}
                                  disabled={isLocked}
                                  onChange={(e) => {
                                    const next = e.target.checked;
                                    setSelected((prev) => {
                                      const copy = [...prev];
                                      copy[rowIndex] = next;
                                      return copy;
                                    });
                                  }}
                                  className={checkboxCls}
                                />
                              </div>
                            ) : null}

                            <div className={cn("px-4", cellY, dateTextClass)}>{r.jatuhTempo}</div>

                            <div className={cn(totalColPad, cellY, numberTextClass)}>
                              <RightNum value={formatRupiah(r.totalBelumDibayar)} />
                            </div>

                            <div className={cn(dataCellClass, cellY, numberTextClass)}>
                             <RightNum value={displayTagihanPokok(rowIndex, r.tagihanPokok)} />
                           </div>

                           <div className={cn("px-4", cellY, numberTextClass)}>
                             <RightNum value={displayTagihanBunga(rowIndex, r.tagihanBunga)} />
                           </div>

                           <div className={cn("px-4", cellY, numberTextClass)}>
                             <RightNum value={displaySisaPokok(rowIndex, r.sisaPokok)} />
                           </div>

                           <div className={cn("px-4", cellY, numberTextClass)}>
                             <RightNum value={displaySisaBunga(rowIndex, r.sisaBunga)} />
                           </div>

                            {showPenaltyColumn ? (
                              <PenaltyCell
                                globalIdx={globalIdx}
                                localIdx={rowIndex}
                                dueDateDmy={r.jatuhTempo}
                              />
                            ) : null}

                            {showStatusColumn ? (
                              <div className={cn("px-[5px] text-left", cellY)}>
                                <BillingStatusBadge
                                  status={statusForRow(r, rowIndex)}
                                  variant={statusBadgeVariant}
                                />
                              </div>
                            ) : null}
                          </div>
                        </RowShell>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                {showGraceInfo ? <GracePeriodInfoRow colSpan={colCount} /> : null}

                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={colCount}
                      className="px-4 py-10 text-center text-sm text-slate-600"
                    >
                      Tidak ada data.
                    </td>
                  </tr>
                ) : (
                  rows.map((r, idx) => {
                    const globalIdx = penaltyIndexOffset + idx;

                    const active = false;

                    return (
                      <tr key={`${r.jatuhTempo}-${idx}`} className={cn(rowDividerClass)}>
                        <td colSpan={colCount} className={cn("p-0", rowDividerClass)}>
                          <RowShell
                            active={active}
                            disableActiveRing={disableRowActiveRing}
                            disableRowRings={disableRowRings}
                            density={rowShellDensity}
                            compact={isCompact}
                          >
                            <div
                              className="grid items-center gap-0"
                              style={{ gridTemplateColumns: gridTemplateColumns }}
                            >
                              {!hideSelection ? (
                                <div className={cn("flex items-center justify-center px-4", cellY)}>
                                  <input
                                    type="checkbox"
                                    aria-label="Pilih tagihan"
                                    checked={isLocked ? true : (selected[idx] ?? false)}
                                    disabled={isLocked}
                                    onChange={(e) => {
                                      const next = e.target.checked;
                                      setSelected((prev) => {
                                        const copy = [...prev];
                                        copy[idx] = next;
                                        return copy;
                                      });
                                    }}
                                    className={checkboxCls}
                                  />
                                </div>
                              ) : null}

                              <div className={cn("px-4", cellY, dateTextClass)}>{r.jatuhTempo}</div>

                              <div className={cn(totalColPad, cellY, numberTextClass)}>
                                <RightNum value={formatRupiah(r.totalBelumDibayar)} />
                              </div>

                              <div className={cn("px-4", cellY, numberTextClass)}>
                                <RightNum value={formatRupiah(r.tagihanPokok)} />
                              </div>

                              <div className={cn("px-4", cellY, numberTextClass)}>
                                <RightNum value={formatRupiah(r.tagihanBunga)} />
                              </div>

                              <div className={cn("px-4", cellY, numberTextClass)}>
                                 <RightNum value={formatRupiah(r.sisaPokok)} />
                               </div>
 
                               <div className={cn("px-4", cellY, numberTextClass)}>
                                 <RightNum value={formatRupiah(r.sisaBunga)} />
                               </div>

                              {showPenaltyColumn ? (
                                <PenaltyCell
                                  globalIdx={globalIdx}
                                  localIdx={idx}
                                  dueDateDmy={r.jatuhTempo}
                                />
                              ) : null}

                              {showStatusColumn ? (
                                <div className={cn("px-[5px] text-left", cellY)}>
                                  <BillingStatusBadge
                                    status={statusForRow(r, idx)}
                                    variant={statusBadgeVariant}
                                  />
                                </div>
                              ) : null}
                            </div>
                          </RowShell>
                        </td>
                      </tr>
                    );
                  })
                )}
              </>
            )}
          </tbody>
          <tfoot>
            {showPageTotal ? (
              <TotalRow label="Total Tagihan per Halaman" values={pageTotals} />
            ) : null}
            <TotalRow label="Total Tagihan Keseluruhan" values={grandTotals} />
            {tableFooter ? (
              <tr>
                <td colSpan={colCount} className="border-t border-[#CDD4E0] px-4 py-3">
                  {tableFooter}
                </td>
              </tr>
            ) : null}
          </tfoot>
        </table>

        <div className="sr-only">
          <NumericCell>0,00</NumericCell>
          <span>{refreshTick}</span>
        </div>
      </div>
    </div>
  );
}