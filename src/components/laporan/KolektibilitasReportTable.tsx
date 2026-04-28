"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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
};

function formatIdr2(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatIdr0(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function ChevronSortIcon() {
  return (
    <span className="ml-2 inline-flex flex-col leading-none text-slate-500">
      <svg width="10" height="10" viewBox="0 0 24 24" className="-mb-0.5">
        <path
          d="M7 14l5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg width="10" height="10" viewBox="0 0 24 24">
        <path
          d="M7 10l5-5 5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function HeadCell({
  children,
  sortable = true,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  return (
    <th
      className={cn(
        "border-b border-slate-300 bg-white px-3 py-3 align-middle",
        "text-[12px] font-extrabold uppercase tracking-wide text-slate-900",
        align === "center"
          ? "text-center"
          : align === "right"
            ? "text-right"
            : "text-left",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1",
          align === "center"
            ? "justify-center"
            : align === "right"
              ? "justify-end"
              : "justify-start",
        )}
      >
        <span className="leading-tight">{children}</span>
        {sortable ? <ChevronSortIcon /> : null}
      </div>
    </th>
  );
}

function BodyCell({
  children,
  align = "left",
  className,
  title,
}: {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  title?: string;
}) {
  return (
    <td
      title={title}
      className={cn(
        "border-b border-slate-200 px-3 py-3 align-top",
        "text-[13px] font-medium text-slate-900",
        align === "center"
          ? "text-center"
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

  const btnBase =
    "h-10 px-4 text-[13px] font-semibold transition disabled:text-slate-400";

  return (
    <div className={cn("inline-flex items-center overflow-hidden border border-slate-300", className)}>
      <button
        type="button"
        className={cn(btnBase, "bg-slate-100 text-slate-700 hover:bg-slate-200")}
        disabled={disabledPrev}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

      <div className="grid h-10 min-w-10 place-items-center bg-violet-600 px-4 text-[13px] font-extrabold text-white">
        {page}
      </div>

      <button
        type="button"
        className={cn(btnBase, "bg-slate-100 text-slate-700 hover:bg-slate-200")}
        disabled={disabledNext}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}

type KolektibilitasLabel = "Macet" | "Lancar" | "Diragukan" | "Kurang Lancar";

function deriveKolektibilitas(r: KolektibilitasRow): KolektibilitasLabel {
  if (r.tunggakanBln >= 4) return "Macet";
  if (r.tunggakanBln === 3) return "Diragukan";
  if (r.tunggakanBln === 2) return "Kurang Lancar";
  return "Lancar";
}

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

  // Prototype: pakai rows langsung (seperti sebelumnya)
  const paged = React.useMemo(() => rows, [rows]);

  const showingStart =
    totalEntriesResolved === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(totalEntriesResolved, page * pageSize);

  const totals = React.useMemo(() => {
    return paged.reduce(
      (acc, r) => {
        const plafon = r.pinjamanSldPokok + 1500000;
        const sisaPinjaman = Math.max(0, r.pinjamanSldPokok - r.tunggakanNilai);

        acc.plafon += plafon;
        acc.sisa += sisaPinjaman;

        // contoh: hutang dihitung dari tunggakan (seperti sebelumnya)
        acc.hutangPokok += Math.max(0, Math.round(r.tunggakanNilai * 0.35));
        acc.hutangBunga += Math.max(0, Math.round(r.tunggakanNilai * 0.15));
        return acc;
      },
      { plafon: 0, sisa: 0, hutangPokok: 0, hutangBunga: 0 },
    );
  }, [paged]);

  const totalRowCell =
    "border-t border-slate-900 px-3 py-3 text-[13px] font-bold text-slate-900 bg-white";

  return (
    <div className={cn("mt-6", className)}>
      <div className="overflow-hidden rounded-[2px] border border-slate-300 bg-white">
        <div className="safe-x-scroll">
          <table className="w-full min-w-[1180px] border-collapse bg-white">
            <thead>
              <tr>
                <HeadCell sortable={false} className="w-[70px]">
                  NO.
                </HeadCell>

                <HeadCell className="w-[180px]">
                  <span className="block leading-tight">
                    NAMA
                    <br />
                    NASABAH
                  </span>
                </HeadCell>

                <HeadCell className="w-[140px]">STATUS</HeadCell>

                <HeadCell className="w-[160px]">
                  <span className="block leading-tight">
                    KODE
                    <br />
                    PINJAMAN
                  </span>
                </HeadCell>

                <HeadCell className="w-[160px]">
                  <span className="block leading-tight">
                    TANGGAL
                    <br />
                    PINJAMAN
                  </span>
                </HeadCell>

                <HeadCell className="w-[170px]">
                  <span className="block leading-tight">
                    TANGGAL
                    <br />
                    JATUH
                    <br />
                    TEMPO
                  </span>
                </HeadCell>

                <HeadCell className="w-[170px]">
                  <span className="block leading-tight">
                    JENIS
                    <br />
                    PINJAMAN
                  </span>
                </HeadCell>

                <HeadCell align="right" className="w-[170px]">
                  PLAFON
                </HeadCell>

                <HeadCell align="right" className="w-[170px]">
                  <span className="block leading-tight">
                    SISA
                    <br />
                    PINJAMAN
                  </span>
                </HeadCell>

                <HeadCell align="right" className="w-[130px]">
                  <span className="block leading-tight">
                    HUTANG
                    <br />
                    POKOK
                  </span>
                </HeadCell>

                <HeadCell align="right" className="w-[130px]">
                  <span className="block leading-tight">
                    HUTANG
                    <br />
                    BUNGA
                  </span>
                </HeadCell>

                <HeadCell className="w-[170px]">
                  <span className="block leading-tight">
                    TIPE
                    <br />
                    KOLEKTIBILITAS
                  </span>
                </HeadCell>
              </tr>
            </thead>

            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="px-4 py-10 text-center text-[13px] font-medium text-slate-600"
                  >
                    Tidak ada data laporan.
                  </td>
                </tr>
              ) : (
                paged.map((r, idx) => {
                  const kolek = deriveKolektibilitas(r);

                  // mapping sederhana agar mirip contoh
                  const status = idx % 5 === 0 ? "Non Anggota" : "Anggota";
                  const kodePinjaman = r.noNsb.replace(/^N/, "SMG");
                  const tanggalPinjaman = r.dari;
                  const tanggalJatuhTempo = r.sampai;
                  const jenisPinjaman = "Pinjaman Bulanan 9";

                  const plafon = r.pinjamanSldPokok + 1500000;
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
                    <tr
                      key={`${r.noNsb}-${idx}`}
                      className={cn(idx % 2 === 0 ? "bg-slate-50/60" : "bg-white")}
                    >
                      <BodyCell className="w-[70px]">{idx + 1}</BodyCell>
                      <BodyCell className="w-[180px]">
                        <div className="leading-snug">{r.nama}</div>
                      </BodyCell>
                      <BodyCell className="w-[140px]">{status}</BodyCell>
                      <BodyCell className="w-[160px]">{kodePinjaman}</BodyCell>
                      <BodyCell className="w-[160px]">{tanggalPinjaman}</BodyCell>
                      <BodyCell className="w-[170px]">{tanggalJatuhTempo}</BodyCell>
                      <BodyCell className="w-[170px]">
                        <div className="leading-snug">
                          Pinjaman
                          <br />
                          Bulanan 9
                        </div>
                      </BodyCell>

                      <BodyCell align="right" className="w-[170px]">
                        {formatIdr2(plafon)}
                      </BodyCell>

                      <BodyCell align="right" className="w-[170px]">
                        {formatIdr2(sisaPinjaman)}
                      </BodyCell>

                      <BodyCell align="right" className="w-[130px]">
                        {formatIdr2(hutangPokok)}
                      </BodyCell>

                      <BodyCell align="right" className="w-[130px]">
                        {formatIdr2(hutangBunga)}
                      </BodyCell>

                      <BodyCell className="w-[170px]">{kolek === "Lancar" ? "-" : kolek}</BodyCell>
                    </tr>
                  );
                })
              )}

              {paged.length > 0 ? (
                <>
                  <tr>
                    <td className={totalRowCell} colSpan={7}>
                      Total per Halaman
                    </td>
                    <td className={cn(totalRowCell, "text-right tabular-nums")}>
                      {formatIdr0(totals.plafon)}
                      {",00"}
                    </td>
                    <td className={cn(totalRowCell, "text-right tabular-nums")}>
                      {formatIdr0(totals.sisa)}
                      {",00"}
                    </td>
                    <td className={cn(totalRowCell, "text-right tabular-nums")}>
                      {formatIdr0(totals.hutangPokok)}
                      {",00"}
                    </td>
                    <td className={cn(totalRowCell, "text-right tabular-nums")}>
                      {formatIdr0(totals.hutangBunga)}
                      {",00"}
                    </td>
                    <td className={totalRowCell} />
                  </tr>

                  <tr>
                    <td className={cn(totalRowCell, "border-t border-slate-900")} colSpan={7}>
                      Total
                    </td>
                    <td className={cn(totalRowCell, "text-right tabular-nums")}>
                      {formatIdr0(totals.plafon)}
                      {",00"}
                    </td>
                    <td className={cn(totalRowCell, "text-right tabular-nums")}>
                      {formatIdr0(totals.sisa)}
                      {",00"}
                    </td>
                    <td className={cn(totalRowCell, "text-right tabular-nums")}>
                      {formatIdr0(totals.hutangPokok)}
                      {",00"}
                    </td>
                    <td className={cn(totalRowCell, "text-right tabular-nums")}>
                      {formatIdr0(totals.hutangBunga)}
                      {",00"}
                    </td>
                    <td className={totalRowCell} />
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="text-[13px] font-medium text-slate-700">
            Menampilkan {showingStart} sampai {showingEnd} dari {totalEntriesResolved} entri
          </div>

          <PaginationLikeExample page={page} pageCount={pageCount} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}