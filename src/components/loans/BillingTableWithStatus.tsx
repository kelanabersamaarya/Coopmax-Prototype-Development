"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import NumericCell from "@/components/anggota/NumericCell";
import BillingTableHeader from "@/components/anggota/BillingTableHeader";
import PenaltyDetailDialogReadOnly, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialogReadOnly";
import { Info } from "lucide-react";

export type BillingRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

type TagihanStatus = "Belum Dibayar" | "Dibayar Sebagian" | "Lunas";

function statusForIndex(i: number): TagihanStatus {
  const mod = i % 6;
  if (mod === 0 || mod === 1) return "Belum Dibayar";
  if (mod === 2 || mod === 3) return "Dibayar Sebagian";
  return "Lunas";
}

function StatusPill({ status }: { status: TagihanStatus }) {
  const cls =
    status === "Lunas"
      ? "bg-emerald-600 text-white ring-1 ring-emerald-600/20"
      : status === "Dibayar Sebagian"
        ? "bg-amber-500 text-white ring-1 ring-amber-500/20"
        : "bg-rose-600 text-white ring-1 ring-rose-600/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-2.5 py-1 text-[12px] font-semibold leading-none",
        cls,
      )}
    >
      {status}
    </span>
  );
}

const PENALTY_ROWS = 3;
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

function buildPenaltyDetailRows(dueDateDmy: string): PenaltyDetailRow[] {
  const due = parseDmyToDate(dueDateDmy) ?? new Date();
  return Array.from({ length: PENALTY_DETAIL_DAYS }).map((_v, i) => ({
    tanggalKeterlambatan: formatDmy(addDays(due, i + 1)),
    nominalDenda: formatIdrLike(PENALTY_PER_DAY),
  }));
}

function PenaltyInfoButton({ onClick }: { onClick: () => void }) {
  return (
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
      aria-label="Rincian denda"
      title="Rincian denda"
    >
      <Info className="h-3.5 w-3.5" />
    </button>
  );
}

function toIdr00(v: string) {
  const s = (v ?? "").trim();
  if (s === "" || s === "0" || s === "0,00" || s === "0.00") return "0,00";
  return s;
}

export default function BillingTableWithStatus({
  rows,
  showGraceHighlight,
  penaltyIndexOffset = 0,
  className,
}: {
  rows: BillingRow[];
  showGraceHighlight: boolean;
  penaltyIndexOffset?: number;
  className?: string;
}) {
  const [penaltyOpen, setPenaltyOpen] = React.useState(false);
  const [penaltyRows, setPenaltyRows] = React.useState<PenaltyDetailRow[]>([]);

  const showPenaltyColumn = true;
  const hideSelection = true;

  // +1 kolom untuk STATUS
  const colCount = (hideSelection ? 6 : 7) + (showPenaltyColumn ? 1 : 0) + 1;

  const graceCount = showGraceHighlight ? Math.min(2, rows.length) : 0;
  const graceRows = graceCount > 0 ? rows.slice(0, graceCount) : [];
  const afterGraceRows = graceCount > 0 ? rows.slice(graceCount) : rows;

  const rowDivider = "border-t border-slate-200";

  function openPenalty(dueDateDmy: string) {
    setPenaltyRows(buildPenaltyDetailRows(dueDateDmy));
    setPenaltyOpen(true);
  }

  function StatusCell({ status }: { status: TagihanStatus }) {
    return (
      <div className="px-4 py-2.5">
        <StatusPill status={status} />
      </div>
    );
  }

  function PenaltyCell({
    globalIdx,
    dueDateDmy,
  }: {
    globalIdx: number;
    dueDateDmy: string;
  }) {
    const shouldShow = globalIdx < PENALTY_ROWS;

    return (
      <td className="px-4 py-2.5 text-right text-[13px] font-medium text-slate-900 tabular-nums whitespace-nowrap">
        {shouldShow ? (
          <div className="flex items-center justify-end gap-2">
            <span className="num-sans-tabular">{formatIdrLike(PENALTY_AMOUNT)}</span>
            <PenaltyInfoButton onClick={() => openPenalty(dueDateDmy)} />
          </div>
        ) : null}
      </td>
    );
  }

  function RightNum({ value }: { value: string }) {
    return (
      <NumericCell align="right" className="w-full">
        {toIdr00(value)}
      </NumericCell>
    );
  }

  // mimic BillingTableView2 "RowShell" padding (compact)
  function RowShell({ children }: { children: React.ReactNode }) {
    return (
      <div className="bg-white px-3 py-1.5">
        <div className="rounded-[5px] bg-white">{children}</div>
      </div>
    );
  }

  function RowContent({
    r,
    localIdx,
    globalIdx,
  }: {
    r: BillingRow;
    localIdx: number;
    globalIdx: number;
  }) {
    const status = statusForIndex(globalIdx);

    return (
      <RowShell>
        <div className="grid items-center [grid-template-columns:minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,0.95fr)_190px]">
          {/* jatuh tempo */}
          <div className="px-4 py-2.5 text-[13px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
            {r.jatuhTempo}
          </div>

          {/* total belum dibayar */}
          <div className="px-4 py-2.5 text-right text-[13px] font-medium text-slate-900 tabular-nums whitespace-nowrap">
            <RightNum value={r.totalBelumDibayar} />
          </div>

          {/* tagihan pokok */}
          <div className="px-4 py-2.5 text-right text-[13px] font-medium text-slate-900 tabular-nums whitespace-nowrap">
            <RightNum value={r.tagihanPokok} />
          </div>

          {/* tagihan bunga */}
          <div className="px-4 py-2.5 text-right text-[13px] font-medium text-slate-900 tabular-nums whitespace-nowrap">
            <RightNum value={r.tagihanBunga} />
          </div>

          {/* sisa pokok */}
          <div className="px-4 py-2.5 pr-6 text-right text-[13px] font-medium text-slate-900 tabular-nums whitespace-nowrap">
            <RightNum value={r.sisaPokok} />
          </div>

          {/* sisa bunga */}
          <div className="px-4 py-2.5 pr-6 text-right text-[13px] font-medium text-slate-900 tabular-nums whitespace-nowrap">
            <RightNum value={r.sisaBunga} />
          </div>

          {/* denda */}
          <div className="px-4 py-2.5 pr-1 text-right text-[13px] font-medium text-slate-900 tabular-nums whitespace-nowrap">
            {globalIdx < PENALTY_ROWS ? (
              <div className="flex items-center justify-end gap-2">
                <span className="num-sans-tabular">{formatIdrLike(PENALTY_AMOUNT)}</span>
                <PenaltyInfoButton onClick={() => openPenalty(r.jatuhTempo)} />
              </div>
            ) : null}
          </div>

          {/* status */}
          <StatusCell status={status} />
        </div>

        {/* keep localIdx used in case you want later */}
        <div className="sr-only">{localIdx}</div>
      </RowShell>
    );
  }

  return (
    <div className={cn("mt-3", className)}>
      <PenaltyDetailDialogReadOnly
        open={penaltyOpen}
        onOpenChange={setPenaltyOpen}
        rows={penaltyRows}
      />

      <div className="overflow-hidden rounded-[5px] border border-slate-200 bg-white">
        <table className="w-full border-collapse text-[13px]">
          <BillingTableHeader
            hideSelection={true}
            showPenaltyColumn={true}
            className={cn(
              // inject one extra header cell for status via CSS grid is hard,
              // so we render a second header row for STATUS in a safe way.
              "",
            )}
          />

          <thead className="bg-white">
            <tr className="border-b border-slate-200">
              <th colSpan={7} className="p-0">
                <div className="sr-only">header-spacer</div>
              </th>
              <th className="px-4 py-3 text-left text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700">
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
                {/* Grace wrapper block */}
                <tr className={rowDivider}>
                  <td colSpan={colCount} className="p-0">
                    <div className="bg-white p-0">
                      <div className="overflow-hidden rounded-[5px] border-2 border-blue-600/70 bg-white">
                        <div className="p-1">
                          <table className="w-full border-collapse text-[13px]">
                            <tbody className="bg-white">
                              <GracePeriodInfoRow colSpan={colCount} noBorder />
                            </tbody>
                          </table>
                        </div>

                        {graceRows.map((r, idx) => (
                          <div
                            key={`grace-${r.jatuhTempo}-${idx}`}
                            className={cn(idx === 0 ? "" : "border-t border-slate-200")}
                          >
                            <RowContent
                              r={r}
                              localIdx={idx}
                              globalIdx={penaltyIndexOffset + idx}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>

                {afterGraceRows.map((r, idx) => {
                  const rowIndex = graceCount + idx;
                  const globalIdx = penaltyIndexOffset + rowIndex;

                  return (
                    <tr key={`${r.jatuhTempo}-${rowIndex}`} className={rowDivider}>
                      <td colSpan={colCount} className="p-0">
                        <RowContent r={r} localIdx={rowIndex} globalIdx={globalIdx} />
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                <GracePeriodInfoRow colSpan={colCount} />

                {rows.map((r, idx) => (
                  <tr key={`${r.jatuhTempo}-${idx}`} className={rowDivider}>
                    <td colSpan={colCount} className="p-0">
                      <RowContent
                        r={r}
                        localIdx={idx}
                        globalIdx={penaltyIndexOffset + idx}
                      />
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>

        <div className="sr-only">
          <PenaltyCell globalIdx={0} dueDateDmy="01-01-2026" />
        </div>
      </div>
    </div>
  );
}