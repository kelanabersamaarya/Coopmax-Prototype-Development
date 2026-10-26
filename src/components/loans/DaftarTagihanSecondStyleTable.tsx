"use client";

import * as React from "react";
import { Eye, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import NumericCell from "@/components/anggota/NumericCell";
import BillingStatusBadge from "@/components/anggota/BillingStatusBadge";
import type { BillingStatus } from "@/domain/loans/types/billing";
import BillingTableHeader from "@/components/anggota/BillingTableHeader";
import PenaltyAddReasonDialog from "@/components/anggota/PenaltyAddReasonDialog";
import PenaltyDetailDialog, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  addPenaltyOverride,
  addedPenaltyItemId,
  getPenaltyAdds,
  getPenaltyCanceledItems,
  parseIdrLikeToNumber,
} from "@/lib/penaltyOverridesStore";

export type DaftarTagihanSecondStyleRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
  statusTagihan?: BillingStatus;
};

const PENALTY_AMOUNT = 75000;
const PENALTY_DETAIL_DAYS = 3;
const PENALTY_PER_DAY = 25000;
const BASE_PENALTY_ROWS = 2;

function formatIdrLike(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

function formatDmy(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = String(date.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function buildPenaltyDetailRows(dueDateDmy: string): PenaltyDetailRow[] {
  const due = parseDmyToDate(dueDateDmy) ?? new Date();

  return Array.from({ length: PENALTY_DETAIL_DAYS }).map((_v, i) => ({
    tanggalKeterlambatan: formatDmy(addDays(due, i + 1)),
    nominalDenda: formatIdrLike(PENALTY_PER_DAY),
  }));
}

function TableColumns() {
  return (
    <colgroup>
      <col className="w-[10%]" />
      <col className="w-[7%]" />
      <col className="w-[12%]" />
      <col className="w-[11%]" />
      <col className="w-[14%]" />
      <col className="w-[14%]" />
      <col className="w-[8%]" />
      <col className="w-[5%]" />
      <col className="w-[12%]" />
    </colgroup>
  );
}

function RightNum({ value }: { value: string }) {
  return (
    <NumericCell align="right" className="w-full whitespace-nowrap">
      {value}
    </NumericCell>
  );
}

function PenaltyIconButton({
  icon,
  label,
  onClick,
}: {
  icon: "plus" | "eye";
  label: string;
  onClick: () => void;
}) {
  const Icon = icon === "plus" ? Plus : Eye;

  return (
    <Tooltip delayDuration={120}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onClick();
          }}
          className={cn(
            "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
            "bg-[#2563eb] text-white ring-2 ring-[#2563eb]/15",
            "transition hover:bg-[#1d4ed8]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563eb]/20",
          )}
          aria-label={label}
          title={label}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>

      <TooltipContent className="rounded-xl border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-800 shadow-xl">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

function RowCells({
  row,
  rowIndex,
  contextKey,
  refreshTick,
  onOpenAdd,
  onOpenDetail,
}: {
  row: DaftarTagihanSecondStyleRow;
  rowIndex: number;
  contextKey?: string;
  refreshTick: number;
  onOpenAdd: (rowIndex: number, dueDateDmy: string) => void;
  onOpenDetail: (rowIndex: number, dueDateDmy: string) => void;
}) {
  const manualPenaltyTotal = React.useMemo(() => {
    if (!contextKey) return 0;

    const adds = getPenaltyAdds(contextKey).filter(
      (item) =>
        item.dueDateDmy === row.jatuhTempo && item.rowIndexGlobal === rowIndex,
    );

    const canceledItems = getPenaltyCanceledItems(contextKey);

    return adds.reduce((sum, item) => {
      const itemId = addedPenaltyItemId(item.id);
      const canceled = canceledItems.some(
        (cancel) =>
          cancel.dueDateDmy === row.jatuhTempo &&
          cancel.rowIndexGlobal === rowIndex &&
          cancel.penaltyItemId === itemId,
      );

      if (canceled) return sum;
      return sum + parseIdrLikeToNumber(item.amountIdrLike);
    }, 0);
  }, [contextKey, refreshTick, row.jatuhTempo, rowIndex]);

  const hasBasePenalty = rowIndex < BASE_PENALTY_ROWS;
  const hasManualPenalty = manualPenaltyTotal > 0;
  const penaltyTotal = hasBasePenalty ? PENALTY_AMOUNT : manualPenaltyTotal;
  const status: BillingStatus =
    rowIndex < 2
      ? "Lunas"
      : rowIndex === 3
        ? "Jatuh Tempo"
        : rowIndex === 2
          ? "Dibayar Sebagian"
          : row.statusTagihan === "Terlambat"
            ? "Belum Dibayar"
            : row.statusTagihan ?? "Belum Dibayar";

  return (
    <>
      <td className="px-3 py-3 text-left text-[13px] font-normal tabular-nums text-slate-900">
        <span className="whitespace-nowrap">{row.jatuhTempo}</span>
      </td>
      <td className="px-3 py-3 text-right text-[13px] font-normal text-slate-900">
        <RightNum value={row.totalBelumDibayar} />
      </td>
      <td className="px-3 py-3 text-right text-[13px] font-normal text-slate-900">
        <RightNum value={hasBasePenalty ? "0,00" : row.tagihanPokok} />
      </td>
      <td className="px-3 py-3 text-right text-[13px] font-normal text-slate-900">
        <RightNum value={row.tagihanBunga} />
      </td>
      <td className="px-3 py-3 text-right text-[13px] font-normal text-slate-900">
        <RightNum value={hasBasePenalty ? "0,00" : row.sisaPokok} />
      </td>
      <td className="px-3 py-3 text-right text-[13px] font-normal text-slate-900">
        <RightNum value={row.sisaBunga} />
      </td>
      <td className="px-3 py-3 text-right text-[13px] font-normal text-slate-900">
        <span className="whitespace-nowrap tabular-nums">
          {penaltyTotal > 0 ? formatIdrLike(penaltyTotal) : "0,00"}
        </span>
      </td>
      <td className="px-2 py-3 text-center">
        {hasBasePenalty || hasManualPenalty ? (
          <PenaltyIconButton
            icon="eye"
            label="Lihat Detail Denda"
            onClick={() => onOpenDetail(rowIndex, row.jatuhTempo)}
          />
        ) : (
          <PenaltyIconButton
            icon="plus"
            label="Tambah Denda"
            onClick={() => onOpenAdd(rowIndex, row.jatuhTempo)}
          />
        )}
      </td>
      <td className="px-3 py-3 text-left text-[13px] text-slate-900 whitespace-nowrap">
        <BillingStatusBadge status={status} />
      </td>
    </>
  );
}

export default function DaftarTagihanSecondStyleTable({
  rows,
  contextKey,
  className,
}: {
  rows: DaftarTagihanSecondStyleRow[];
  contextKey?: string;
  className?: string;
}) {
  const [addOpen, setAddOpen] = React.useState(false);
  const [addTarget, setAddTarget] = React.useState<{
    rowIndex: number;
    dueDateDmy: string;
  } | null>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [detailRows, setDetailRows] = React.useState<PenaltyDetailRow[]>([]);
  const [detailContext, setDetailContext] = React.useState<{
    rowIndex: number;
    dueDateDmy: string;
  } | null>(null);
  const [localAdds, setLocalAdds] = React.useState<
    Record<string, Array<{ amountIdrLike: string; addDateDmy: string; reason: string }>>
  >({});
  const [refreshTick, setRefreshTick] = React.useState(0);

  function openAdd(rowIndex: number, dueDateDmy: string) {
    setAddTarget({ rowIndex, dueDateDmy });
    setAddOpen(true);
  }

  function openDetail(rowIndex: number, dueDateDmy: string) {
    setDetailContext({ rowIndex, dueDateDmy });
    setDetailRows(
      rowIndex < BASE_PENALTY_ROWS ? buildPenaltyDetailRows(dueDateDmy) : [],
    );
    setDetailOpen(true);
  }

  function handleDetailOpenChange(open: boolean) {
    setDetailOpen(open);
    if (!open) {
      setRefreshTick((value) => value + 1);
      setDetailContext(null);
      setDetailRows([]);
    }
  }

  const colCount = 8;
  const graceRows = rows.slice(0, 2);
  const restRows = rows.slice(2);

  return (
    <div className={cn("mt-0", className)}>
      <PenaltyAddReasonDialog
        open={addOpen}
        onOpenChange={(open) => {
          setAddOpen(open);
          if (!open) setAddTarget(null);
        }}
        onConfirm={(reason, date, nominalDenda) => {
          if (!addTarget) return;
          if (contextKey) {
            addPenaltyOverride(contextKey, {
              dueDateDmy: addTarget.dueDateDmy,
              rowIndexGlobal: addTarget.rowIndex,
              amountIdrLike: nominalDenda,
              reason,
              addDateDmy: date,
              by: "Arya Dharma",
            });
          } else {
            const key = `${addTarget.rowIndex}-${addTarget.dueDateDmy}`;
            setLocalAdds((current) => ({
              ...current,
              [key]: [
                ...(current[key] ?? []),
                { amountIdrLike: nominalDenda, addDateDmy: date, reason },
              ],
            }));
          }
          setRefreshTick((value) => value + 1);
        }}
      />

      <PenaltyDetailDialog
        open={detailOpen}
        onOpenChange={handleDetailOpenChange}
        rows={detailRows}
        contextKey={contextKey}
        dueDateDmy={detailContext?.dueDateDmy}
        rowIndexGlobal={detailContext?.rowIndex}
      />

      <div className="overflow-hidden rounded-[10px] border border-slate-200 bg-white">
        <table className="w-full table-fixed border-collapse text-[13px]">
          <TableColumns />
          <BillingTableHeader
            hideSelection
            showPenaltyColumn
            showActionColumn
            showStatusColumn
          />
          <tbody className="bg-white">
            {graceRows.length > 0 ? (
              <tr className="border-t border-slate-200">
                <td colSpan={colCount} className="p-0">
                  <div className="bg-white p-0">
                    <div className="overflow-hidden rounded-[8px] border-2 border-blue-600/70 bg-white">
                      <div className="p-1">
                        <table className="w-full table-fixed border-collapse text-[13px]">
                          <TableColumns />
                          <tbody>
                            <GracePeriodInfoRow colSpan={colCount} noBorder />
                          </tbody>
                        </table>
                      </div>
                      <table className="w-full table-fixed border-collapse text-[13px]">
                        <TableColumns />
                        <tbody className="bg-white">
                          {graceRows.map((row, index) => (
                            <tr
                              key={`grace-${row.jatuhTempo}-${index}`}
                              className={index === 0 ? "" : "border-t border-slate-200"}
                            >
                              <RowCells
                                row={row}
                                rowIndex={index}
                                contextKey={contextKey}
                                refreshTick={refreshTick}
                                onOpenAdd={openAdd}
                                onOpenDetail={openDetail}
                              />
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
            ) : null}
            {restRows.map((row, index) => {
              const rowIndex = index + graceRows.length;
              return (
                <tr
                  key={`${row.jatuhTempo}-${rowIndex}`}
                  className="border-t border-slate-200"
                >
                  <RowCells
                    row={row}
                    rowIndex={rowIndex}
                    contextKey={contextKey}
                    refreshTick={refreshTick}
                    onOpenAdd={openAdd}
                    onOpenDetail={openDetail}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="sr-only">
          {Object.keys(localAdds).length}
          {refreshTick}
        </div>
      </div>
    </div>
  );
}
