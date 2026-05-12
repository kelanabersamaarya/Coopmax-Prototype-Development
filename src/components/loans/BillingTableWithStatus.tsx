"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import NumericCell from "@/components/anggota/NumericCell";
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

  // ✅ Full width + center => semua baris mulai dari titik yang sama dan terlihat lurus
  return (
    <span
      className={cn(
        "block w-full",
        "rounded-[5px] px-2.5 py-1",
        "text-center text-[12px] font-semibold leading-[1.05]",
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

function RightNum({ value }: { value: string }) {
  return (
    <NumericCell align="right" className="w-full">
      {toIdr00(value)}
    </NumericCell>
  );
}

const STATUS_COL_W = 140;

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
        "px-4 py-3 text-[13px] font-medium text-slate-900",
        align === "right" ? "text-right tabular-nums whitespace-nowrap" : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

function TrShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tr className={cn("border-t border-slate-200", className)}>{children}</tr>;
}

function StatusTd({ status }: { status: TagihanStatus }) {
  // ✅ padding kiri/kanan konsisten untuk semua baris
  return (
    <td style={{ width: STATUS_COL_W }} className="px-3 py-3">
      <StatusPill status={status} />
    </td>
  );
}

function InnerTable({
  rows,
  startGlobalIndex,
  showGraceInfoRow,
  colCount,
  onOpenPenalty,
}: {
  rows: BillingRow[];
  startGlobalIndex: number;
  showGraceInfoRow: boolean;
  colCount: number;
  onOpenPenalty: (due: string) => void;
}) {
  return (
    <table className="w-full border-collapse text-[13px]">
      <tbody className="bg-white">
        {showGraceInfoRow ? <GracePeriodInfoRow colSpan={colCount} noBorder /> : null}

        {rows.map((r, idx) => {
          const globalIdx = startGlobalIndex + idx;
          const status = statusForIndex(globalIdx);
          const showPenalty = globalIdx < PENALTY_ROWS;

          return (
            <tr
              key={`${r.jatuhTempo}-${globalIdx}`}
              className={cn(
                idx === 0 && showGraceInfoRow
                  ? "border-t border-slate-200"
                  : idx === 0
                    ? ""
                    : "border-t border-slate-200",
              )}
            >
              <Td className="w-[110px] font-semibold tabular-nums whitespace-nowrap">
                {r.jatuhTempo}
              </Td>

              <Td className="w-[128px]" align="right">
                <RightNum value={r.totalBelumDibayar} />
              </Td>

              <Td className="w-[130px]" align="right">
                <RightNum value={r.tagihanPokok} />
              </Td>

              <Td className="w-[120px]" align="right">
                <RightNum value={r.tagihanBunga} />
              </Td>

              <Td className="w-[140px] pr-6" align="right">
                <RightNum value={r.sisaPokok} />
              </Td>

              <Td className="w-[140px] pr-6" align="right">
                <RightNum value={r.sisaBunga} />
              </Td>

              <Td className="w-[130px] pr-1" align="right">
                {showPenalty ? (
                  <div className="flex items-center justify-end gap-2">
                    <span className="num-sans-tabular">
                      {formatIdrLike(PENALTY_AMOUNT)}
                    </span>
                    <PenaltyInfoButton onClick={() => onOpenPenalty(r.jatuhTempo)} />
                  </div>
                ) : null}
              </Td>

              <StatusTd status={status} />
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

  const colCount = 8;

  const graceCount = showGraceHighlight ? Math.min(2, rows.length) : 0;
  const graceRows = graceCount > 0 ? rows.slice(0, graceCount) : [];
  const afterGraceRows = graceCount > 0 ? rows.slice(graceCount) : rows;

  function openPenalty(dueDateDmy: string) {
    setPenaltyRows(buildPenaltyDetailRows(dueDateDmy));
    setPenaltyOpen(true);
  }

  const thBase =
    "px-4 py-3 text-left text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700";
  const thRight =
    "px-4 py-3 text-right text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700";

  return (
    <div className={cn("mt-3", className)}>
      <PenaltyDetailDialogReadOnly
        open={penaltyOpen}
        onOpenChange={setPenaltyOpen}
        rows={penaltyRows}
      />

      <div className="overflow-hidden rounded-[5px] border border-slate-200 bg-white">
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-white">
            <tr className="border-b border-slate-200">
              <th className={cn(thBase, "w-[110px]")}>
                Jatuh
                <br />
                Tempo
              </th>

              <th className={cn(thRight, "w-[128px]")}>
                Total Tagihan
                <br />
                Belum Dibayar
              </th>

              <th className={cn(thRight, "w-[130px]")}>
                Tagihan
                <br />
                Pokok
              </th>

              <th className={cn(thRight, "w-[120px]")}>
                Tagihan
                <br />
                Bunga
              </th>

              <th className={cn(thRight, "w-[140px]")}>
                Sisa Tagihan
                <br />
                Pokok
              </th>

              <th className={cn(thRight, "w-[140px]")}>
                Sisa Tagihan
                <br />
                Bunga
              </th>

              <th className={cn(thRight, "w-[130px]")}>
                Tagihan
                <br />
                Denda
              </th>

              <th className={cn(thBase)} style={{ width: STATUS_COL_W }}>
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
                <TrShell>
                  <td colSpan={colCount} className="p-0">
                    <div className="bg-white p-2">
                      <div className="overflow-hidden rounded-[5px] border-2 border-blue-600/70 bg-white">
                        <InnerTable
                          rows={graceRows}
                          startGlobalIndex={penaltyIndexOffset}
                          showGraceInfoRow={true}
                          colCount={colCount}
                          onOpenPenalty={openPenalty}
                        />
                      </div>
                    </div>
                  </td>
                </TrShell>

                {afterGraceRows.map((r, idx) => {
                  const rowIndex = graceCount + idx;
                  const globalIdx = penaltyIndexOffset + rowIndex;
                  const status = statusForIndex(globalIdx);
                  const showPenalty = globalIdx < PENALTY_ROWS;

                  return (
                    <TrShell key={`${r.jatuhTempo}-${rowIndex}`}>
                      <Td className="w-[110px] font-semibold tabular-nums whitespace-nowrap">
                        {r.jatuhTempo}
                      </Td>

                      <Td className="w-[128px]" align="right">
                        <RightNum value={r.totalBelumDibayar} />
                      </Td>

                      <Td className="w-[130px]" align="right">
                        <RightNum value={r.tagihanPokok} />
                      </Td>

                      <Td className="w-[120px]" align="right">
                        <RightNum value={r.tagihanBunga} />
                      </Td>

                      <Td className="w-[140px] pr-6" align="right">
                        <RightNum value={r.sisaPokok} />
                      </Td>

                      <Td className="w-[140px] pr-6" align="right">
                        <RightNum value={r.sisaBunga} />
                      </Td>

                      <Td className="w-[130px] pr-1" align="right">
                        {showPenalty ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="num-sans-tabular">
                              {formatIdrLike(PENALTY_AMOUNT)}
                            </span>
                            <PenaltyInfoButton onClick={() => openPenalty(r.jatuhTempo)} />
                          </div>
                        ) : null}
                      </Td>

                      <StatusTd status={status} />
                    </TrShell>
                  );
                })}
              </>
            ) : (
              <>
                <GracePeriodInfoRow colSpan={colCount} />

                {rows.map((r, idx) => {
                  const globalIdx = penaltyIndexOffset + idx;
                  const status = statusForIndex(globalIdx);
                  const showPenalty = globalIdx < PENALTY_ROWS;

                  return (
                    <TrShell key={`${r.jatuhTempo}-${idx}`}>
                      <Td className="w-[110px] font-semibold tabular-nums whitespace-nowrap">
                        {r.jatuhTempo}
                      </Td>

                      <Td className="w-[128px]" align="right">
                        <RightNum value={r.totalBelumDibayar} />
                      </Td>

                      <Td className="w-[130px]" align="right">
                        <RightNum value={r.tagihanPokok} />
                      </Td>

                      <Td className="w-[120px]" align="right">
                        <RightNum value={r.tagihanBunga} />
                      </Td>

                      <Td className="w-[140px] pr-6" align="right">
                        <RightNum value={r.sisaPokok} />
                      </Td>

                      <Td className="w-[140px] pr-6" align="right">
                        <RightNum value={r.sisaBunga} />
                      </Td>

                      <Td className="w-[130px] pr-1" align="right">
                        {showPenalty ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="num-sans-tabular">
                              {formatIdrLike(PENALTY_AMOUNT)}
                            </span>
                            <PenaltyInfoButton onClick={() => openPenalty(r.jatuhTempo)} />
                          </div>
                        ) : null}
                      </Td>

                      <StatusTd status={status} />
                    </TrShell>
                  );
                })}
              </>
            )}
          </tbody>
        </table>

        <div className="sr-only">
          <RightNum value="0,00" />
        </div>
      </div>
    </div>
  );
}