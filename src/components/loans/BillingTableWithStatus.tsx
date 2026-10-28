"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import BillingStatusBadge from "@/components/anggota/BillingStatusBadge";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import NumericCell from "@/components/anggota/NumericCell";
import PenaltyDetailDialogReadOnly, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialogReadOnly";
import { Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type BillingRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
  statusTagihan?: "Belum Dibayar" | "Lunas" | "Jatuh Tempo" | "Terlambat" | "Dibayar Sebagian";
};

const PENALTY_ROWS = 4;
const PENALTY_AMOUNT = 75000;
const PENALTY_DETAIL_DAYS = 3;
const PENALTY_PER_DAY = 25000;

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

function formatIdrLike(n: number) {
  const s = Math.round(Number.isFinite(n) ? n : 0).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseIdrLike(value: string) {
  const normalized = (value ?? "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildPenaltyDetailRows(dueDateDmy: string): PenaltyDetailRow[] {
  const due = parseDmyToDate(dueDateDmy) ?? new Date();

  return Array.from({ length: PENALTY_DETAIL_DAYS }).map((_v, i) => ({
    tanggalKeterlambatan: formatDmy(addDays(due, i + 1)),
    nominalDenda: formatIdrLike(PENALTY_PER_DAY),
  }));
}

function PenaltyInfoButton({ onClick }: { onClick: () => void }) {
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
          )}
          aria-label="Lihat Detail Denda"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>

      <TooltipContent
        portalled
        side="left"
        align="center"
        sideOffset={10}
        collisionPadding={16}
        className={cn(
          "z-[9999] rounded-[14px] border-slate-200 bg-white px-4 py-2.5 shadow-lg",
          "whitespace-nowrap text-[14px] font-semibold text-slate-900",
        )}
      >
        Lihat Detail Denda
      </TooltipContent>
    </Tooltip>
  );
}

function toIdr00(v: string) {
  const s = (v ?? "").trim();
  if (s === "" || s === "0" || s === "0,00" || s === "0.00") return "0,00";
  return s;
}

function RightNum({ value }: { value: string }) {
  return (
    <NumericCell align="right" className="w-full">
      {toIdr00(value)}
    </NumericCell>
  );
}

function TotalRow({
  label,
  values,
  dendaClassName,
  layout,
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
  dendaClassName?: string;
  layout?: "default" | "loan-dialog" | "mobile";
}) {
  const mobileLayout = layout === "mobile";
  const cellClass = "border-t border-slate-200 px-4 py-2 text-right text-[13px] font-bold tabular-nums text-slate-800 whitespace-nowrap";
  return (
    <tr className="bg-white">
      <td className="border-t border-slate-200 px-4 py-2 text-left text-[13px] font-bold leading-tight text-slate-800">
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
      <td className={cellClass}>
<span className="relative left-4"><NumericCell align="right" className="w-full">
  {formatIdrLike(values.totalBelumDibayar)}
</NumericCell></span>
</td>
<td className="border-t border-slate-200 py-2 pl-4 pr-0 text-right text-[13px] font-bold tabular-nums text-slate-800 whitespace-nowrap">
<span className="whitespace-nowrap">{formatIdrLike(values.tagihanPokok)}</span>
</td>
<td className={cellClass}>
<span className="relative left-4 whitespace-nowrap">{formatIdrLike(values.tagihanBunga)}</span>
</td>
<td className={cellClass}>
<span>{formatIdrLike(values.sisaPokok)}</span>
</td>
<td className={cellClass}>
<span>{formatIdrLike(values.sisaBunga)}</span>
</td>
<td className={cn(cellClass, "whitespace-nowrap", dendaClassName)}>
{formatIdrLike(values.denda)}
</td>
      <td className="border-t border-slate-200 px-4 py-2" />
    </tr>
  );
}

function Td({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
}) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-[13px] font-normal text-slate-900",
        "border-b-0",
        align === "right"
          ? "text-right tabular-nums whitespace-nowrap"
          : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

const thBase =
  "border-b-0 px-3 py-3 text-left text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700";
const thRight =
  "border-b-0 px-3 py-3 text-left text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700";
const alignedPenaltyCellClass = "w-[112px] pr-[17px]";

function InnerGraceTable({
  rows,
  startGlobalIndex,
  colCount,
  onOpenPenalty,
  showPenaltyDetailAction,
  statusColumnClass,
  statusColumnWidth,
  penaltyColumnClass,
  penaltyColumnWidth,
  tableMinWidthClass,
  layout,
}: {
  rows: BillingRow[];
  startGlobalIndex: number;
  colCount: number;
  onOpenPenalty: (due: string) => void;
  showPenaltyDetailAction: boolean;
  statusColumnClass: string;
  statusColumnWidth: string;
  penaltyColumnClass: string;
  penaltyColumnWidth: string;
  tableMinWidthClass: string;
  layout?: "default" | "loan-dialog" | "mobile";
}) {
  const dialogLayout = layout === "loan-dialog";
  const mobileLayout = layout === "mobile";
  return (
    <table className={cn(
      tableMinWidthClass,
      "w-full table-fixed border-collapse text-[13px] [&_tbody>tr]:border-b [&_tbody>tr]:border-slate-200",
    )}>
      <colgroup>
        <col className={dialogLayout ? "w-[72px]" : "w-[105px]"} />
        <col className={dialogLayout ? "w-[80px]" : mobileLayout ? "w-[120px]" : "w-[160px]"} />
        <col className={dialogLayout ? "w-[90px]" : "w-[125px]"} />
        <col className={dialogLayout ? "w-[90px]" : "w-[125px]"} />
        <col className={dialogLayout ? "w-[100px]" : "w-[145px]"} />
        <col className={dialogLayout ? "w-[100px]" : "w-[145px]"} />
        <col className={penaltyColumnWidth} />
        <col className={statusColumnWidth} />
      </colgroup>
      <tbody className="bg-white">
        <GracePeriodInfoRow colSpan={colCount} noBorder />

        {rows.map((r, idx) => {
          const globalIdx = startGlobalIndex + idx;
          const showPenalty = globalIdx < PENALTY_ROWS;

          return (
            <tr
              key={`${r.jatuhTempo}-${globalIdx}`}
              className="bg-white"
            >
              <Td className="tabular-nums whitespace-nowrap">
                {r.jatuhTempo}
              </Td>

              <Td align="right">
                <RightNum value={r.totalBelumDibayar} />
              </Td>

              <Td align="right">
                <RightNum value={r.tagihanPokok} />
              </Td>

              <Td align="right">
                <RightNum value={r.tagihanBunga} />
              </Td>

              <Td align="right">
                <RightNum value={r.sisaPokok} />
              </Td>

              <Td align="right">
                <RightNum value={r.sisaBunga} />
              </Td>

              <Td className={cn(penaltyColumnClass, "pr-4 translate-x-2")} align="right">
                <div className="flex items-center justify-end gap-2">
                  <span className="num-sans-tabular">
                    {showPenalty ? formatIdrLike(PENALTY_AMOUNT) : "0,00"}
                  </span>
                  {showPenalty && showPenaltyDetailAction ? (
                    <PenaltyInfoButton
                      onClick={() => onOpenPenalty(r.jatuhTempo)}
                    />
                  ) : null}
                </div>
              </Td>

              <Td className={cn(statusColumnClass, "px-4 whitespace-nowrap")}>
                <BillingStatusBadge status={r.statusTagihan ?? "Belum Dibayar"} />
              </Td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function BillingTableWithStatus({
  rows,
  showGraceHighlight,
  showGraceInfo = true,
  penaltyIndexOffset = 0,
  showPenaltyDetailAction = true,
  allRows,
  className,
  compactStatusColumn = false,
  layout = "default",
}: {
  rows: BillingRow[];
  showGraceHighlight: boolean;
  showGraceInfo?: boolean;
  penaltyIndexOffset?: number;
  showPenaltyDetailAction?: boolean;
  allRows?: BillingRow[];
  className?: string;
  compactStatusColumn?: boolean;
  layout?: "default" | "loan-dialog" | "mobile";
}) {
  const statusColumnClass = compactStatusColumn
    ? "w-[132px] min-w-[132px] max-w-[132px]"
    : "w-[76px] min-w-[76px] max-w-[76px]";
  const dialogLayout = layout === "loan-dialog";
  const mobileLayout = layout === "mobile";
  const statusColumnWidth = compactStatusColumn ? "w-[132px]" : "w-[76px]";
  const penaltyColumnClass = compactStatusColumn
    ? "w-[112px] min-w-[112px] max-w-[112px]"
    : "w-[84px] min-w-[84px] max-w-[84px]";
  const penaltyColumnWidth = compactStatusColumn ? "w-[112px]" : "w-[84px]";
  const tableMinWidthClass = compactStatusColumn
    ? "min-w-[1095px]"
    : dialogLayout
      ? "min-w-[1075px]"
      : mobileLayout
        ? "min-w-[1035px]"
        : "min-w-[1075px]";
  const [penaltyOpen, setPenaltyOpen] = React.useState(false);
  const [penaltyRows, setPenaltyRows] = React.useState<PenaltyDetailRow[]>([]);

  const colCount = 8;

  const pageTotals = rows.reduce(
    (totals, row, index) => {
      totals.totalBelumDibayar += parseIdrLike(row.totalBelumDibayar);
      totals.tagihanPokok += parseIdrLike(row.tagihanPokok);
      totals.tagihanBunga += parseIdrLike(row.tagihanBunga);
      totals.sisaPokok += parseIdrLike(row.sisaPokok);
      totals.sisaBunga += parseIdrLike(row.sisaBunga);
      totals.denda += penaltyIndexOffset + index < PENALTY_ROWS ? PENALTY_AMOUNT : 0;
      return totals;
    },
    { totalBelumDibayar: 0, tagihanPokok: 0, tagihanBunga: 0, sisaPokok: 0, sisaBunga: 0, denda: 0 },
  );

  const grandTotals = (allRows ?? rows).reduce(
    (totals, row, index) => {
      totals.totalBelumDibayar += parseIdrLike(row.totalBelumDibayar);
      totals.tagihanPokok += parseIdrLike(row.tagihanPokok);
      totals.tagihanBunga += parseIdrLike(row.tagihanBunga);
      totals.sisaPokok += parseIdrLike(row.sisaPokok);
      totals.sisaBunga += parseIdrLike(row.sisaBunga);
      totals.denda += index < PENALTY_ROWS ? PENALTY_AMOUNT : 0;
      return totals;
    },
    { totalBelumDibayar: 0, tagihanPokok: 0, tagihanBunga: 0, sisaPokok: 0, sisaBunga: 0, denda: 0 },
  );

  const graceCount = showGraceHighlight ? Math.min(2, rows.length) : 0;
  const graceRows = graceCount > 0 ? rows.slice(0, graceCount) : [];
  const afterGraceRows = graceCount > 0 ? rows.slice(graceCount) : rows;

  function openPenalty(dueDateDmy: string) {
    setPenaltyRows(buildPenaltyDetailRows(dueDateDmy));
    setPenaltyOpen(true);
  }

  return (
    <div className={cn("mt-0", className)}>
      <PenaltyDetailDialogReadOnly
        open={penaltyOpen}
        onOpenChange={setPenaltyOpen}
        rows={penaltyRows}
      />

      <div className="overflow-hidden rounded-[10px] border border-slate-200 bg-white">
        <div className="safe-x-scroll w-full">
          <table className={cn("w-full max-w-none table-fixed border-collapse text-[13px] [&_tbody>tr]:border-b [&_tbody>tr]:border-slate-200", tableMinWidthClass)}>
            <colgroup>
              <col className={dialogLayout ? "w-[72px]" : "w-[105px]"} />
              <col className={dialogLayout ? "w-[80px]" : mobileLayout ? "w-[120px]" : "w-[160px]"} />
              <col className={dialogLayout ? "w-[90px]" : "w-[125px]"} />
              <col className={dialogLayout ? "w-[90px]" : "w-[125px]"} />
              <col className={dialogLayout ? "w-[100px]" : "w-[145px]"} />
              <col className={dialogLayout ? "w-[100px]" : "w-[145px]"} />
              <col className={penaltyColumnWidth} />
              <col className={compactStatusColumn ? "w-[132px]" : "w-[76px]"} />
            </colgroup>
            <thead className="border-b border-slate-200 bg-white [&>tr>th]:border-b-0">
              <tr>
                <th className={thBase}>
                  <span className="inline-block translate-x-1">
                    Jatuh
                    <br />
                    Tempo
                  </span>
                </th>

                <th className={thRight}>
                  Total Tagihan
                  <br />
                  Belum Dibayar
                </th>

                <th className={thRight}>
                  Tagihan
                  <br />
                  Pokok
                </th>

                <th className={thRight}>
                  Tagihan
                  <br />
                  Bunga
                </th>

                <th className={thRight}>
                  Sisa Tagihan
                  <br />
                  Pokok
                </th>

                <th className={thRight}>
                  Sisa Tagihan
                  <br />
                  Bunga
                </th>

                <th className={cn(thRight, penaltyColumnClass)}>
                  Tagihan
                  <br />
                  Denda
                </th>

                <th className={cn(thBase, statusColumnClass)}>
                  Status
                  <br />
                  Tagihan
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={colCount}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              ) : showGraceHighlight && graceRows.length > 0 ? (
                <>
                  <tr className="border-t border-slate-200">
                    <td colSpan={colCount} className="p-0">
                      <div className="box-border w-full bg-white py-2 pl-0 pr-0">
                        <div className="box-border w-full overflow-hidden rounded-[10px] border-2 border-blue-600/70 bg-white">
                          <InnerGraceTable
                            rows={graceRows}
                            startGlobalIndex={penaltyIndexOffset}
                            colCount={colCount}
                            onOpenPenalty={openPenalty}
                            showPenaltyDetailAction={showPenaltyDetailAction}
                            statusColumnClass={statusColumnClass}
                            statusColumnWidth={statusColumnWidth}
                            penaltyColumnClass={penaltyColumnClass}
                            penaltyColumnWidth={penaltyColumnWidth}
                            tableMinWidthClass={tableMinWidthClass}
                            layout={layout}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>

                  {afterGraceRows.map((r, idx) => {
                    const rowIndex = graceCount + idx;
                    const globalIdx = penaltyIndexOffset + rowIndex;
                    const showPenalty = globalIdx < PENALTY_ROWS;

                    return (
                      <tr
                        key={`${r.jatuhTempo}-${rowIndex}`}
                        className="bg-white"
                      >
                        <Td className="tabular-nums whitespace-nowrap">
                          {r.jatuhTempo}
                        </Td>

                        <Td align="right">
                          <RightNum value={r.totalBelumDibayar} />
                        </Td>

                        <Td align="right">
                          <RightNum value={r.tagihanPokok} />
                        </Td>

                        <Td align="right">
                          <RightNum value={r.tagihanBunga} />
                        </Td>

                        <Td align="right">
                          <RightNum value={r.sisaPokok} />
                        </Td>

                        <Td align="right">
                          <RightNum value={r.sisaBunga} />
                        </Td>

                        <Td className={cn(penaltyColumnClass, "pr-4 translate-x-2")} align="right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="num-sans-tabular">
                              {showPenalty ? formatIdrLike(PENALTY_AMOUNT) : "0,00"}
                            </span>
                            {showPenalty && showPenaltyDetailAction ? (
                              <PenaltyInfoButton
                                onClick={() => openPenalty(r.jatuhTempo)}
                              />
                            ) : null}
                          </div>
                        </Td>

                        <Td className={cn(statusColumnClass, "whitespace-nowrap")}>
                          <BillingStatusBadge status={r.statusTagihan ?? "Belum Dibayar"} />
                        </Td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  {showGraceInfo ? <GracePeriodInfoRow colSpan={colCount} /> : null}

                  {rows.map((r, idx) => {
                    const globalIdx = penaltyIndexOffset + idx;
                    const showPenalty = globalIdx < PENALTY_ROWS;

                    return (
                      <tr
                        key={`regular-${r.jatuhTempo}-${idx}`}
                        className="bg-white"
                      >
                        <Td className="tabular-nums whitespace-nowrap">
                          {r.jatuhTempo}
                        </Td>

                        <Td align="right">
                          <RightNum value={r.totalBelumDibayar} />
                        </Td>

                        <Td align="right">
                          <RightNum value={r.tagihanPokok} />
                        </Td>

                        <Td align="right">
                          <RightNum value={r.tagihanBunga} />
                        </Td>

                        <Td align="right">
                          <RightNum value={r.sisaPokok} />
                        </Td>

                        <Td align="right">
                          <RightNum value={r.sisaBunga} />
                        </Td>

                        <Td className={cn(penaltyColumnClass, "pr-4 translate-x-2")} align="right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="num-sans-tabular">
                              {showPenalty ? formatIdrLike(PENALTY_AMOUNT) : "0,00"}
                            </span>
                            {showPenalty && showPenaltyDetailAction ? (
                              <PenaltyInfoButton
                                onClick={() => openPenalty(r.jatuhTempo)}
                              />
                            ) : null}
                          </div>
                        </Td>

                        <Td className={cn(statusColumnClass, "whitespace-nowrap")}>
                          <BillingStatusBadge status={r.statusTagihan ?? "Belum Dibayar"} />
                        </Td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
            <tfoot>
              <TotalRow
                label="Total Tagihan per Halaman"
                values={pageTotals}
                dendaClassName={compactStatusColumn ? "translate-x-3" : undefined}
                layout={layout}
              />
              <TotalRow
                label="Total Tagihan Keseluruhan"
                values={grandTotals}
                dendaClassName={compactStatusColumn ? "translate-x-3" : undefined}
                layout={layout}
              />
            </tfoot>
          </table>
        </div>

        <div className="sr-only">
          <RightNum value="0,00" />
        </div>
      </div>
    </div>
  );
}