"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

function formatIdr0(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatFloat2(n: number) {
  return (Number.isFinite(n) ? n : 0).toFixed(2);
}

function Th({
  children,
  className,
  colSpan,
  rowSpan,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  align?: "left" | "center" | "right";
}) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(
        "border border-slate-300/70 bg-white px-3 py-3 align-middle",
        "text-[12px] font-extrabold uppercase tracking-wide text-slate-900",
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
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <td
      className={cn(
        "border border-slate-200/70 px-3 py-2.5 align-top",
        "text-[14px] font-normal text-slate-900",
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

function Pagination({
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
  if (pageCount <= 1) return null;

  return (
    <div className={cn("flex items-center justify-end gap-2", className)}>
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-100 px-4 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        <ChevronLeft className="h-4 w-4" />
        Sebelumnya
      </button>

      <div className="inline-flex h-10 min-w-10 items-center justify-center rounded-md bg-violet-600 px-4 text-sm font-extrabold text-white ring-1 ring-violet-600/30">
        {page}
      </div>

      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-100 px-4 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:opacity-50"
        disabled={page === pageCount}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

const colW = {
  no: "w-[60px]",
  noNsb: "w-[120px]", // sedikit lebih lebar supaya 1 baris
  nama: "w-[220px]", // diperbesar
  alamat: "w-[170px]", // diperkecil
  aoId: "w-[90px]",
  jwBln: "w-[70px]",
  jwDari: "w-[130px]",
  jwSampai: "w-[130px]",
  pinPokok: "w-[130px]",
  pinBng: "w-[90px]",
  angPerBln: "w-[130px]",
  angSdhHr: "w-[90px]",
  tBln: "w-[70px]",
  tNilai: "w-[130px]",
  t1_30: "w-[90px]",
  t31_60: "w-[90px]",
  t61_90: "w-[90px]",
  t90p: "w-[90px]",
};

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

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, rows.length]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, pageSize, rows]);

  const totalEntriesResolved = totalEntries ?? rows.length;
  const showingStart =
    totalEntriesResolved === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(totalEntriesResolved, page * pageSize);

  const totalsPage = React.useMemo(() => {
    return paged.reduce(
      (acc, r) => {
        acc.pokok += r.pinjamanSldPokok;
        acc.nilai += r.tunggakanNilai;
        return acc;
      },
      { pokok: 0, nilai: 0 },
    );
  }, [paged]);

  // Prototype total global: sementara samakan dengan total per halaman.
  const totalsAll = totalsPage;

  const totalRowLabelClass =
    "border border-slate-200/70 px-3 py-3 text-[14px] font-normal text-slate-900";
  const totalRowNumberClass =
    "border border-slate-200/70 px-3 py-3 text-right text-[14px] font-normal tabular-nums text-slate-900";

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-slate-200/70">
        <div
          className={cn("safe-x-scroll", "rounded-none border border-slate-300/70")}
        >
          <table className="min-w-[1640px] w-full border-collapse bg-white">
            <thead className="bg-white">
              <tr>
                <Th rowSpan={2} className={colW.no}>
                  No.
                </Th>
                <Th rowSpan={2} className={colW.noNsb}>
                  No.Nsb
                </Th>
                <Th rowSpan={2} className={colW.nama}>
                  Nama
                </Th>
                <Th rowSpan={2} className={colW.alamat}>
                  Alamat
                </Th>
                <Th rowSpan={2} className={colW.aoId}>
                  AO ID
                </Th>

                <Th colSpan={3} align="center">
                  Jangka Waktu
                </Th>
                <Th colSpan={2} align="center">
                  Pinjaman
                </Th>
                <Th colSpan={2} align="center">
                  Angsuran
                </Th>
                <Th colSpan={6} align="center">
                  Tunggakan
                </Th>
              </tr>

              <tr>
                <Th className={colW.jwBln} align="center">
                  Bln
                </Th>
                <Th className={colW.jwDari} align="center">
                  Dari tgl.
                </Th>
                <Th className={colW.jwSampai} align="center">
                  s/d tgl.
                </Th>

                <Th className={colW.pinPokok} align="right">
                  Sld. Pokok
                </Th>
                <Th className={colW.pinBng} align="right">
                  Bng
                </Th>

                <Th className={colW.angPerBln} align="right">
                  Per bln
                </Th>
                <Th className={colW.angSdhHr} align="right">
                  Sdh/Hr
                </Th>

                <Th className={colW.tBln} align="center">
                  Bln
                </Th>
                <Th className={colW.tNilai} align="right">
                  Nilai
                </Th>
                <Th className={colW.t1_30} align="right">
                  1-30 Hr
                </Th>
                <Th className={colW.t31_60} align="right">
                  31-60 Hr
                </Th>
                <Th className={colW.t61_90} align="right">
                  61-90 Hr
                </Th>
                <Th className={colW.t90p} align="right">
                  > 90 Hr
                </Th>
              </tr>
            </thead>

            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={18}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data laporan.
                  </td>
                </tr>
              ) : (
                paged.map((r, idx) => (
                  <tr
                    key={`${r.noNsb}-${idx}`}
                    className={cn(idx % 2 === 0 ? "bg-slate-50/40" : "bg-white")}
                  >
                    <Td className={colW.no} align="center">
                      {r.no}
                    </Td>

                    <Td className={cn(colW.noNsb, "whitespace-nowrap")}>
                      {r.noNsb}
                    </Td>

                    <Td className={cn(colW.nama, "whitespace-nowrap")}>
                      {r.nama}
                    </Td>

                    <Td className={cn(colW.alamat, "truncate")} title={r.alamat}>
                      {r.alamat}
                    </Td>

                    <Td className={colW.aoId} align="center">
                      {r.aoId}
                    </Td>

                    <Td className={colW.jwBln} align="center">
                      {r.jangkaWaktuBln}
                    </Td>
                    <Td className={colW.jwDari} align="center">
                      {r.dari}
                    </Td>
                    <Td className={colW.jwSampai} align="center">
                      {r.sampai}
                    </Td>

                    <Td className={colW.pinPokok} align="right">
                      {formatIdr0(r.pinjamanSldPokok)}
                    </Td>
                    <Td className={colW.pinBng} align="right">
                      {formatFloat2(r.pinjamanBng)}
                    </Td>

                    <Td className={colW.angPerBln} align="right">
                      {formatIdr0(r.angsuranPerBln)}
                    </Td>
                    <Td className={colW.angSdhHr} align="right">
                      {formatFloat2(r.angsuranSdhHr)}
                    </Td>

                    <Td className={colW.tBln} align="center">
                      {r.tunggakanBln}
                    </Td>
                    <Td className={colW.tNilai} align="right">
                      {formatIdr0(r.tunggakanNilai)}
                    </Td>
                    <Td className={colW.t1_30} align="right">
                      {formatIdr0(r.tunggakan1_30)}
                    </Td>
                    <Td className={colW.t31_60} align="right">
                      {formatIdr0(r.tunggakan31_60)}
                    </Td>
                    <Td className={colW.t61_90} align="right">
                      {formatIdr0(r.tunggakan61_90)}
                    </Td>
                    <Td className={colW.t90p} align="right">
                      {formatIdr0(r.tunggakan90p)}
                    </Td>
                  </tr>
                ))
              )}

              {/* TOTAL PER HALAMAN — tidak bold */}
              {paged.length > 0 ? (
                <tr className="border-t border-black">
                  <td colSpan={8} className={totalRowLabelClass}>
                    Total per Halaman
                  </td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.pokok)}
                  </td>
                  <td className="border border-slate-200/70 px-3 py-3" />
                  <td colSpan={3} className="border border-slate-200/70 px-3 py-3" />
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.nilai)}
                  </td>
                  <td colSpan={4} className="border border-slate-200/70 px-3 py-3" />
                </tr>
              ) : null}

              {/* TOTAL — tidak bold */}
              {paged.length > 0 ? (
                <tr className="border-t border-black">
                  <td colSpan={8} className={totalRowLabelClass}>
                    Total
                  </td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsAll.pokok)}
                  </td>
                  <td className="border border-slate-200/70 px-3 py-3" />
                  <td colSpan={3} className="border border-slate-200/70 px-3 py-3" />
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsAll.nilai)}
                  </td>
                  <td colSpan={4} className="border border-slate-200/70 px-3 py-3" />
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-700">
            Menampilkan {showingStart} sampai {showingEnd} dari{" "}
            {totalEntriesResolved} entri
          </div>

          <Pagination page={page} pageCount={pageCount} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}