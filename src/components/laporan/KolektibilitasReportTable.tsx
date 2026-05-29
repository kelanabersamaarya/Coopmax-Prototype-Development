"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import SortableHeaderLabel from "@/components/laporan/SortableHeaderLabel";

export type KolektibilitasRow = {
  no: number;
  noNsb: string;
  nama: string;
  alamat: string;
  aoId: string;
  jangkaWaktuBln: number;
  dari: string;
  sampai: string;
  pinjamanSldPokok: number;
  pinjamanBng: number;
  angsuranPerBln: number;
  angsuranSdhHr: number;
  tunggakanBln: number;
  tunggakanNilai: number;
  tunggakan1_30: number;
  tunggakan31_60: number;
  tunggakan61_90: number;
  tunggakan90p: number;

  cabangKd?: string;
  cabangKet?: string;
};

function formatIdr0(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

type Align = "left" | "center" | "right";

function Th({
  children,
  className,
  align = "left",
  noRightBorder = false,
  leftBorder = false,
}: {
  children: React.ReactNode;
  className?: string;
  align?: Align;
  noRightBorder?: boolean;
  leftBorder?: boolean;
}) {
  return (
    <th
      className={cn(
        "border-b border-t border-slate-300 bg-white px-2 py-2.5 align-middle",
        leftBorder ? "border-l border-slate-300" : "",
        noRightBorder ? "" : "border-r border-slate-300",
        "text-[12px] font-extrabold uppercase tracking-wide text-slate-900",
        "leading-[1.05]",
        align === "center"
          ? "text-center"
          : align === "right"
            ? "text-right"
            : "text-left",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className,
  align = "left",
  title,
  noRightBorder = false,
  leftBorder = false,
}: {
  children: React.ReactNode;
  className?: string;
  align?: Align;
  title?: string;
  noRightBorder?: boolean;
  leftBorder?: boolean;
}) {
  return (
    <td
      title={title}
      className={cn(
        "border-b border-slate-200 px-2 py-2 align-top",
        leftBorder ? "border-l border-slate-200" : "",
        noRightBorder ? "" : "border-r border-slate-200",
        "text-[13px] font-medium text-slate-900",
        align === "center"
          ? "text-left"
          : align === "right"
            ? "text-right tabular-nums"
            : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

function PaginationLikeExample({
  page,
  pageCount,
  onPage,
  className,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
  className?: string;
}) {
  const disabledPrev = page <= 1;
  const disabledNext = page >= pageCount;

  const navBtn = (disabled: boolean) =>
    cn(
      "h-10 px-4 text-[12px] font-semibold",
      "bg-slate-100 text-slate-500",
      disabled ? "opacity-60 pointer-events-none" : "hover:bg-slate-200",
    );

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <button
        type="button"
        className={cn("rounded-none", navBtn(disabledPrev))}
        disabled={disabledPrev}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

      <div className="inline-flex h-10 min-w-10 items-center justify-center bg-violet-600 px-4 text-[12px] font-extrabold text-white">
        {page}
      </div>

      <button
        type="button"
        className={cn("rounded-none", navBtn(disabledNext))}
        disabled={disabledNext}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}

const colW = {
  no: "w-[60px]",
  noNsb: "w-[125px]",
  nama: "w-[180px]",
  status: "w-[110px]",
  tanggalPinjaman: "w-[130px]",
  tanggalJatuhTempo: "w-[140px]",
  jenisPinjaman: "w-[180px]",
  plafon: "w-[150px]",
  sisaPinjaman: "w-[160px]",
  hutangPokok: "w-[150px]",
  hutangBunga: "w-[150px]",
  kolektibilitas: "w-[150px]",
};

type KolektibilitasLabel = "Macet" | "Lancar" | "Diragukan" | "Kurang Lancar";

function deriveKolektibilitas(r: KolektibilitasRow): KolektibilitasLabel {
  if (r.tunggakanBln >= 4) return "Macet";
  if (r.tunggakanBln === 3) return "Diragukan";
  if (r.tunggakanBln === 2) return "Kurang Lancar";
  return "Lancar";
}

function Wrap2Lines({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-normal leading-[1.05]">{children}</div>;
}

type Totals = {
  plafon: number;
  sisa: number;
  hutangPokok: number;
  hutangBunga: number;
};

function TotalRow({
  label,
  totals,
}: {
  label: string;
  totals: Totals;
}) {
  const totalRowText =
    "border-b border-slate-200 border-r border-slate-200 last:border-r-0 px-2 py-2.5 text-[13px] font-extrabold text-slate-900";
  const totalRowNumber =
    "border-b border-slate-200 border-r border-slate-200 last:border-r-0 px-2 py-2.5 text-right text-[13px] font-extrabold tabular-nums text-slate-900";

  const MERGE_COLS_BEFORE_TOTALS = 7;

  return (
    <tr className="border-t border-black bg-white">
      <td
        className={cn(totalRowText, "whitespace-nowrap", "border-l border-slate-200")}
        colSpan={MERGE_COLS_BEFORE_TOTALS}
      >
        {label}
      </td>

      <td className={totalRowNumber}>{formatIdr0(totals.plafon)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.sisa)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.hutangPokok)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.hutangBunga)}</td>
      <td className={cn(totalRowText, "border-r-0")} />
    </tr>
  );
}

const TOTAL_COLS = 12;

export default function KolektibilitasReportTable({
  rows,
  pageSize = 20,
  page: controlledPage = 1,
  totalEntries,
  className,
}: {
  rows: KolektibilitasRow[];
  pageSize?: number;
  page?: number;
  totalEntries?: number;
  className?: string;
}) {
  const [page, setPage] = React.useState<number>(controlledPage);

  React.useEffect(() => {
    setPage(controlledPage);
  }, [controlledPage]);

  const totalEntriesResolved = totalEntries ?? rows.length;
  const pageCount = Math.max(1, Math.ceil(totalEntriesResolved / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, rows.length, totalEntriesResolved]);

  const paged = React.useMemo(() => rows, [rows]);

  const showingStart =
    totalEntriesResolved === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(totalEntriesResolved, page * pageSize);

  const totals = React.useMemo<Totals>(() => {
    return paged.reduce(
      (acc, r) => {
        const plafon = Math.max(0, r.pinjamanSldPokok + r.tunggakanNilai);

        acc.plafon += plafon;
        acc.sisa += Math.max(0, r.pinjamanSldPokok - r.tunggakanNilai);
        acc.hutangPokok += Math.max(0, Math.round(r.tunggakanNilai * 0.35));
        acc.hutangBunga += Math.max(0, Math.round(r.tunggakanNilai * 0.15));

        return acc;
      },
      {
        plafon: 0,
        sisa: 0,
        hutangPokok: 0,
        hutangBunga: 0,
      },
    );
  }, [paged]);

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-slate-200/70">
        <div className={cn("safe-x-scroll", "border-b border-slate-300 bg-white")}>
          <table className="min-w-[1585px] w-full border-collapse bg-white border-l border-slate-300 border-r border-slate-300">
            <thead className="bg-white">
              <tr className="bg-white">
                <Th className={colW.no} align="left" leftBorder>
                  NO.
                </Th>

                <Th className={colW.noNsb} align="left">
                  <SortableHeaderLabel lines={["NO.", "REKENING"]} align="left" />
                </Th>

                <Th className={colW.nama} align="left">
                  <SortableHeaderLabel lines={["NAMA", "NASABAH"]} align="left" />
                </Th>

                <Th className={colW.status} align="left">
                  STATUS
                </Th>

                <Th className={colW.tanggalPinjaman} align="left">
                  <SortableHeaderLabel lines={["TANGGAL", "PINJAMAN"]} align="left" />
                </Th>

                <Th className={colW.tanggalJatuhTempo} align="left">
                  <SortableHeaderLabel
                    lines={["TANGGAL", "JATUH TEMPO"]}
                    align="left"
                  />
                </Th>

                <Th className={colW.jenisPinjaman} align="left">
                  JENIS PINJAMAN
                </Th>

                <Th className={colW.plafon} align="left">
                  PLAFON
                </Th>

                <Th className={colW.sisaPinjaman} align="left">
                  <SortableHeaderLabel lines={["SISA PINJAMAN"]} align="left" />
                </Th>

                <Th className={colW.hutangPokok} align="left">
                  HUTANG POKOK
                </Th>

                <Th className={colW.hutangBunga} align="left">
                  HUTANG BUNGA
                </Th>

                <Th
                  className={cn(colW.kolektibilitas, "whitespace-nowrap")}
                  align="left"
                  noRightBorder
                >
                  KOLEKTIBLILITAS
                </Th>
              </tr>
            </thead>

            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={TOTAL_COLS}
                    className="px-4 py-10 text-center text-[12px] text-slate-600"
                  >
                    Tidak ada data laporan.
                  </td>
                </tr>
              ) : (
                paged.map((r, idx) => {
                  const kolek = deriveKolektibilitas(r);

                  const status = idx % 5 === 0 ? "Calon" : "Anggota";
                  const tanggalPinjaman = r.dari;
                  const tanggalJatuhTempo = r.sampai;
                  const jenisPinjaman =
                    idx % 2 === 0 ? "Pinjaman Bulanan 9" : "Pinjaman Harian";

                  const plafon = Math.max(0, r.pinjamanSldPokok + r.tunggakanNilai);
                  const sisaPinjaman = Math.max(
                    0,
                    r.pinjamanSldPokok - r.tunggakanNilai,
                  );
                  const hutangPokok = Math.max(
                    0,
                    Math.round(r.tunggakanNilai * 0.35),
                  );
                  const hutangBunga = Math.max(
                    0,
                    Math.round(r.tunggakanNilai * 0.15),
                  );

                  return (
                    <tr key={`${r.noNsb}-${idx}`} className="bg-white">
                      <Td className={colW.no} align="left" leftBorder>
                        {r.no}
                      </Td>

                      <Td
                        className={cn(colW.noNsb, "whitespace-nowrap")}
                        align="left"
                      >
                        {r.noNsb}
                      </Td>

                      <Td className={cn(colW.nama, "whitespace-nowrap")} align="left">
                        {r.nama}
                      </Td>

                      <Td
                        className={cn(colW.status, "whitespace-nowrap")}
                        align="left"
                      >
                        {status}
                      </Td>

                      <Td
                        className={cn(colW.tanggalPinjaman, "whitespace-nowrap")}
                        align="left"
                      >
                        {tanggalPinjaman}
                      </Td>

                      <Td
                        className={cn(colW.tanggalJatuhTempo, "whitespace-nowrap")}
                        align="left"
                      >
                        {tanggalJatuhTempo}
                      </Td>

                      <Td className={cn(colW.jenisPinjaman)} align="left">
                        <Wrap2Lines>
                          Pinjaman
                          <br />
                          {jenisPinjaman}
                        </Wrap2Lines>
                      </Td>

                      <Td className={colW.plafon} align="right">
                        {formatIdr0(plafon)}
                      </Td>

                      <Td className={colW.sisaPinjaman} align="right">
                        {formatIdr0(sisaPinjaman)}
                      </Td>

                      <Td className={colW.hutangPokok} align="right">
                        {formatIdr0(hutangPokok)}
                      </Td>

                      <Td className={colW.hutangBunga} align="right">
                        {formatIdr0(hutangBunga)}
                      </Td>

                      <Td
                        className={cn(colW.kolektibilitas, "whitespace-nowrap")}
                        align="left"
                        noRightBorder
                      >
                        {kolek}
                      </Td>
                    </tr>
                  );
                })
              )}

              {paged.length > 0 ? (
                <>
                  <TotalRow label="Total per Halaman" totals={totals} />
                  <TotalRow label="Total" totals={totals} />
                </>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-[12px] text-slate-700">
            Menampilkan {showingStart} sampai {showingEnd} dari {totalEntriesResolved} entri
          </div>

          <PaginationLikeExample page={page} pageCount={pageCount} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}