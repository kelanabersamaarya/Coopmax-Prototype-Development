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

  cabangKd?: string;
  cabangKet?: string;
};

function formatIdr0(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatFloat2(n: number) {
  return (Number.isFinite(n) ? n : 0).toFixed(2);
}

type Align = "left" | "center" | "right";

function Th({
  children,
  className,
  colSpan,
  rowSpan,
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  align?: Align;
}) {
  const isGroup = typeof colSpan === "number";

  // Hilangkan garis bawah khusus untuk header grup (colSpan) seperti "CABANG".
  // Header lainnya tetap punya garis bawah untuk pemisah header -> body.
  const bottomDivider = isGroup ? "" : "border-b border-slate-300";

  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(
        "bg-white px-3 py-2.5 align-middle",
        bottomDivider,
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
}: {
  children: React.ReactNode;
  className?: string;
  align?: Align;
  title?: string;
}) {
  return (
    <td
      title={title}
      className={cn(
        "border-b border-slate-200 px-3 py-2 align-top",
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
  noNsb: "w-[140px]",
  nama: "w-[220px]",
  status: "w-[140px]",
  alamat: "w-[170px]",
  tanggalPinjaman: "w-[150px]",
  tanggalJatuhTempo: "w-[170px]",
  jenisPinjaman: "w-[170px]",

  cabangKd: "w-[80px]",
  cabangKet: "w-[160px]",

  plafon: "w-[160px]",
  aoId: "w-[90px]",
  jwBln: "w-[70px]",
  jwDari: "w-[130px]",
  jwSampai: "w-[130px]",
  pinPokok: "w-[130px]",
  pinBng: "w-[90px]",
  angPerBln: "w-[130px]",
  angsuranSdhHr: "w-[90px]",
  tBln: "w-[90px]",
  tNilai: "w-[160px]",
  t1_30: "w-[140px]",
  t31_60: "w-[140px]",
  t61_90: "w-[140px]",
  t90p: "w-[140px]",
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

function BranchKetOneLine({ kd, ket }: { kd: string; ket: string }) {
  return (
    <div className="min-w-0">
      <div className="truncate text-[12px] font-medium text-slate-900">
        <span className="tabular-nums">{kd}</span>{" "}
        <span className="text-slate-800">{ket}</span>
      </div>
    </div>
  );
}

type Totals = {
  pokok: number;
  nilai: number;
  t1_30: number;
  t31_60: number;
  t61_90: number;
  t90p: number;
  sisa: number;
  hutangPokok: number;
  hutangBunga: number;
};

function TotalRowMergedToJangkaWaktu({
  label,
  totals,
}: {
  label: string;
  totals: Totals;
}) {
  const totalRowText =
    "border-b border-slate-200 px-3 py-2.5 text-[13px] font-extrabold text-slate-900";
  const totalRowNumber =
    "border-b border-slate-200 px-3 py-2.5 text-right text-[13px] font-extrabold tabular-nums text-slate-900";

  const MERGE_COLS_TO_JW_END = 15;

  return (
    <tr className="border-t border-black bg-white">
      <td
        className={cn(totalRowText, "whitespace-nowrap")}
        colSpan={MERGE_COLS_TO_JW_END}
      >
        {label}
      </td>

      <td className={totalRowNumber}>{formatIdr0(totals.pokok)}</td>
      <td className={totalRowText} />
      <td className={totalRowText} />
      <td className={totalRowText} />
      <td className={totalRowText} />
      <td className={totalRowNumber}>{formatIdr0(totals.nilai)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.t1_30)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.t31_60)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.t61_90)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.t90p)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.sisa)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.hutangPokok)}</td>
      <td className={totalRowNumber}>{formatIdr0(totals.hutangBunga)}</td>
      <td className={totalRowText} />
    </tr>
  );
}

const TOTAL_COLS = 29;

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
        acc.pokok += r.pinjamanSldPokok;

        acc.nilai += r.tunggakanNilai;
        acc.t1_30 += r.tunggakan1_30;
        acc.t31_60 += r.tunggakan31_60;
        acc.t61_90 += r.tunggakan61_90;
        acc.t90p += r.tunggakan90p;

        acc.sisa += Math.max(0, r.pinjamanSldPokok - r.tunggakanNilai);
        acc.hutangPokok += Math.max(0, Math.round(r.tunggakanNilai * 0.35));
        acc.hutangBunga += Math.max(0, Math.round(r.tunggakanNilai * 0.15));

        return acc;
      },
      {
        pokok: 0,
        nilai: 0,
        t1_30: 0,
        t31_60: 0,
        t61_90: 0,
        t90p: 0,
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
          <table className="min-w-[2930px] w-full border-collapse bg-white">
            <thead className="bg-white">
              <tr className="bg-white">
                <Th rowSpan={2} className={colW.no} align="left">
                  NO.
                </Th>
                <Th rowSpan={2} className={colW.noNsb} align="left">
                  NO.REKENING
                </Th>
                <Th rowSpan={2} className={colW.nama} align="left">
                  NAMA
                </Th>
                <Th rowSpan={2} className={colW.status} align="left">
                  STATUS
                </Th>
                <Th rowSpan={2} className={colW.alamat} align="left">
                  ALAMAT
                </Th>
                <Th rowSpan={2} className={colW.tanggalPinjaman} align="left">
                  TANGGAL PINJAMAN
                </Th>
                <Th rowSpan={2} className={colW.tanggalJatuhTempo} align="left">
                  TANGGAL JATUH TEMPO
                </Th>
                <Th rowSpan={2} className={colW.jenisPinjaman} align="left">
                  JENIS PINJAMAN
                </Th>

                <Th colSpan={2} align="center">
                  CABANG
                </Th>

                <Th rowSpan={2} className={colW.plafon} align="left">
                  PLAFON
                </Th>
                <Th rowSpan={2} className={colW.aoId} align="left">
                  AO ID
                </Th>

                <Th colSpan={3} align="center">
                  JANGKA WAKTU
                </Th>
                <Th colSpan={2} align="center">
                  PINJAMAN
                </Th>
                <Th colSpan={2} align="center">
                  ANGSURAN
                </Th>
                <Th colSpan={6} align="center">
                  TUNGGAKAN
                </Th>

                <Th rowSpan={2} className={colW.sisaPinjaman} align="left">
                  SISA PINJAMAN
                </Th>
                <Th rowSpan={2} className={colW.hutangPokok} align="left">
                  HUTANG POKOK
                </Th>
                <Th rowSpan={2} className={colW.hutangBunga} align="left">
                  HUTANG BUNGA
                </Th>

                <Th
                  rowSpan={2}
                  className={cn(colW.kolektibilitas, "whitespace-nowrap")}
                  align="left"
                >
                  KOLEKTIBLILITAS
                </Th>
              </tr>

              <tr className="bg-white">
                <Th className={colW.cabangKd} align="left">
                  KD
                </Th>
                <Th className={colW.cabangKet} align="left">
                  KET.
                </Th>

                <Th className={colW.jwBln} align="left">
                  BLN
                </Th>
                <Th className={cn(colW.jwDari, "whitespace-nowrap")} align="left">
                  DARI TGL.
                </Th>
                <Th className={cn(colW.jwSampai, "whitespace-nowrap")} align="left">
                  S/D TGL.
                </Th>

                <Th className={cn(colW.pinPokok, "whitespace-nowrap")} align="left">
                  SLD. POKOK
                </Th>
                <Th className={colW.pinBng} align="left">
                  BNG
                </Th>

                <Th className={colW.angPerBln} align="left">
                  PER BLN
                </Th>
                <Th className={cn(colW.angsuranSdhHr, "whitespace-nowrap")} align="left">
                  SDH/HR
                </Th>

                <Th className={colW.tBln} align="left">
                  BLN
                </Th>
                <Th className={colW.tNilai} align="left">
                  NILAI
                </Th>
                <Th className={colW.t1_30} align="left">
                  1-30 HR
                </Th>
                <Th className={colW.t31_60} align="left">
                  31-60 HR
                </Th>
                <Th className={colW.t61_90} align="left">
                  61-90 HR
                </Th>
                <Th className={colW.t90p} align="left">
                  {"\u003E"} 90 HR
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
                  const plafon = r.pinjamanSldPokok + 1500000;

                  const cabangKd =
                    r.cabangKd ??
                    (idx % 4 === 0
                      ? "KTR"
                      : idx % 4 === 1
                        ? "AND"
                        : idx % 4 === 2
                          ? "ADK"
                          : "YSP");
                  const cabangKet =
                    r.cabangKet ??
                    (cabangKd === "KTR"
                      ? "KANTOR"
                      : cabangKd === "AND"
                        ? "ANDRE"
                        : cabangKd === "ADK"
                          ? "DODY"
                          : "FEPRI");

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

                  const tunggakanBlnDisplay = String(r.tunggakanBln);

                  return (
                    <tr key={`${r.noNsb}-${idx}`} className="bg-white">
                      <Td className={colW.no} align="left">
                        {r.no}
                      </Td>

                      <Td className={cn(colW.noNsb, "whitespace-nowrap")} align="left">
                        {r.noNsb}
                      </Td>

                      <Td className={cn(colW.nama, "whitespace-nowrap")} align="left">
                        {r.nama}
                      </Td>

                      <Td className={cn(colW.status, "whitespace-nowrap")} align="left">
                        {status}
                      </Td>

                      <Td className={cn(colW.alamat, "truncate")} title={r.alamat} align="left">
                        {r.alamat}
                      </Td>

                      <Td className={cn(colW.tanggalPinjaman, "whitespace-nowrap")} align="left">
                        {tanggalPinjaman}
                      </Td>

                      <Td className={cn(colW.tanggalJatuhTempo, "whitespace-nowrap")} align="left">
                        {tanggalJatuhTempo}
                      </Td>

                      <Td className={cn(colW.jenisPinjaman)} align="left">
                        <Wrap2Lines>
                          Pinjaman
                          <br />
                          {jenisPinjaman}
                        </Wrap2Lines>
                      </Td>

                      <Td className={cn(colW.cabangKd, "whitespace-nowrap")} align="left">
                        <span className="tabular-nums">{cabangKd}</span>
                      </Td>

                      <Td
                        className={cn(colW.cabangKet, "whitespace-nowrap")}
                        align="left"
                        title={`${cabangKd} ${cabangKet}`}
                      >
                        <BranchKetOneLine kd={cabangKd} ket={cabangKet} />
                      </Td>

                      <Td className={cn(colW.plafon, "whitespace-nowrap")} align="right">
                        {formatIdr0(plafon)},00
                      </Td>

                      <Td className={cn(colW.aoId, "whitespace-nowrap")} align="left">
                        {r.aoId}
                      </Td>

                      <Td className={colW.jwBln} align="left">
                        {r.jangkaWaktuBln}
                      </Td>
                      <Td className={cn(colW.jwDari, "whitespace-nowrap")} align="left">
                        {r.dari}
                      </Td>
                      <Td className={cn(colW.jwSampai, "whitespace-nowrap")} align="left">
                        {r.sampai}
                      </Td>

                      <Td className={cn(colW.pinPokok, "whitespace-nowrap")} align="right">
                        {formatIdr0(r.pinjamanSldPokok)}
                      </Td>
                      <Td className={colW.pinBng} align="right">
                        {formatFloat2(r.pinjamanBng)}
                      </Td>

                      <Td className={colW.angPerBln} align="right">
                        {formatIdr0(r.angsuranPerBln)}
                      </Td>
                      <Td className={colW.angsuranSdhHr} align="right">
                        {formatFloat2(r.angsuranSdhHr)}
                      </Td>

                      <Td className={colW.tBln} align="left">
                        {tunggakanBlnDisplay}
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

                      <Td className={colW.sisaPinjaman} align="right">
                        {formatIdr0(sisaPinjaman)}
                      </Td>
                      <Td className={colW.hutangPokok} align="right">
                        {formatIdr0(hutangPokok)}
                      </Td>
                      <Td className={colW.hutangBunga} align="right">
                        {formatIdr0(hutangBunga)}
                      </Td>

                      <Td className={cn(colW.kolektibilitas, "whitespace-nowrap")} align="left">
                        {kolek}
                      </Td>
                    </tr>
                  );
                })
              )}

              {paged.length > 0 ? (
                <>
                  <TotalRowMergedToJangkaWaktu label="Total per Halaman" totals={totals} />
                  <TotalRowMergedToJangkaWaktu label="Total" totals={totals} />
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