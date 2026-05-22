di JSX dan typo total tgkPokok pada tabel laporan pinjaman.">
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import SortableHeaderLabel from "@/components/laporan/SortableHeaderLabel";

type Row = {
  no: number;
  noRekening: string;
  namaNasabah: string;
  alamat: string;
  status: string;
  jenisPinjaman: string;
  tanggalPinjaman: string;
  kolektor: string;
  jwBln: string;
  jwRange: string;
  jatuhTempo: string;
  bunga: string;
  jumlahPinjaman: string;
  angsuranPerBln: string;
  angsuranSdhHr: string;
  tunggakanBln: string;
  tunggakanNilai: string;
  tunggakan1_30: string;
  tunggakan31_60: string;
  tunggakan61_90: string;
  tunggakan90p: string;
  tgkPokok: string;
  tgkBunga: string;
  sisaPinjaman: string;
  kolektibilitas: string;
};

type ThProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode;
};

function Th({ children, className, ...props }: ThProps) {
  return (
    <th
      {...props}
      className={cn(
        "border-b border-r border-slate-300/80 px-2 py-3",
        "align-middle text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-800",
        className,
      )}
    >
      {children}
    </th>
  );
}

function PlainHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("leading-[1.05] whitespace-nowrap text-left", className)}>
      {children}
    </div>
  );
}

function Td({
  children,
  className,
  align = "left",
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  tone?: "default" | "muted";
}) {
  return (
    <td
      className={cn(
        "border-b border-r border-slate-200 px-2 py-2 align-top",
        "text-[12px] font-medium",
        tone === "muted" ? "text-slate-600" : "text-slate-900",
        align === "right"
          ? "text-right tabular-nums whitespace-nowrap"
          : align === "center"
            ? "text-center"
            : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

function normalizeStatus(s: string) {
  const v = (s ?? "").toLowerCase();
  if (v.includes("non")) return "Non Anggota";
  return "Anggota";
}

function parseIdNumber(s: string): number {
  if (!s) return 0;
  const cleaned = s.replace(/\./g, "").replace(/\s/g, "").replace(/,/g, ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatIdNumber(n: number): string {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function PaginationBar({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  const btnBase = cn(
    "h-10 px-4 text-[14px] font-semibold transition",
    "bg-slate-100 text-slate-500 hover:bg-slate-200",
    "disabled:opacity-60 disabled:pointer-events-none",
  );

  return (
    <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
      <button
        type="button"
        className={btnBase}
        disabled={prevDisabled}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

      <button
        type="button"
        className="grid h-10 w-10 place-items-center bg-violet-600 text-[14px] font-extrabold text-white"
        aria-current="page"
        onClick={() => onPage(page)}
      >
        {page}
      </button>

      <button
        type="button"
        className={btnBase}
        disabled={nextDisabled}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}

const seedRows: Row[] = [
  {
    no: 1,
    noRekening: "SMG260004",
    namaNasabah: "Bapak Bagus",
    alamat: "Jl. Sunset APRIL 43",
    status: "Anggota",
    jenisPinjaman: "Pinjaman Billing",
    tanggalPinjaman: "07-04-2026",
    kolektor: "Gina Farida M.M.",
    jwBln: "12",
    jwRange: "08/12/25-08/12/26",
    jatuhTempo: "07-04-2027",
    bunga: "12.00",
    jumlahPinjaman: "12.000.000,00",
    angsuranPerBln: "270.833",
    angsuranSdhHr: "2 / 2",
    tunggakanBln: "0",
    tunggakanNilai: "0,00",
    tunggakan1_30: "0,00",
    tunggakan31_60: "0,00",
    tunggakan61_90: "0,00",
    tunggakan90p: "0,00",
    tgkPokok: "0,00",
    tgkBunga: "0,00",
    sisaPinjaman: "10.553.571,00",
    kolektibilitas: "Lancar",
  },
  {
    no: 2,
    noRekening: "klpk04.07260001",
    namaNasabah: "Indah Sari",
    alamat: "Jl. Galang",
    status: "Non Anggota",
    jenisPinjaman: "Pinjaman Billing",
    tanggalPinjaman: "10-02-2026",
    kolektor: "Kolektor A",
    jwBln: "12",
    jwRange: "24/07/25-24/07/26",
    jatuhTempo: "10-02-2027",
    bunga: "11.50",
    jumlahPinjaman: "10.000.000,00",
    angsuranPerBln: "270.833",
    angsuranSdhHr: "6 / 7",
    tunggakanBln: "1",
    tunggakanNilai: "270.833",
    tunggakan1_30: "270.833",
    tunggakan31_60: "0",
    tunggakan61_90: "0",
    tunggakan90p: "0",
    tgkPokok: "0,00",
    tgkBunga: "0,00",
    sisaPinjaman: "8.645.833,33",
    kolektibilitas: "Lancar",
  },
  {
    no: 3,
    noRekening: "SMG260021",
    namaNasabah: "Rika Wastuti",
    alamat: "Jl. Kenanga No. 12",
    status: "Anggota",
    jenisPinjaman: "Pinjaman Harian",
    tanggalPinjaman: "26-06-2024",
    kolektor: "Kolektor B",
    jwBln: "10",
    jwRange: "15/05/25-15/03/26",
    jatuhTempo: "26-04-2025",
    bunga: "20.00",
    jumlahPinjaman: "3.500.000,00",
    angsuranPerBln: "216.667",
    angsuranSdhHr: "0 / 3",
    tunggakanBln: "3",
    tunggakanNilai: "650.001",
    tunggakan1_30: "216.667",
    tunggakan31_60: "216.667",
    tunggakan61_90: "216.667",
    tunggakan90p: "0",
    tgkPokok: "220.000,00",
    tgkBunga: "0,00",
    sisaPinjaman: "3.250.000,00",
    kolektibilitas: "Macet",
  },
  {
    no: 4,
    noRekening: "12260006",
    namaNasabah: "Pangeran Sirait",
    alamat: "Sidakarya",
    status: "Non Anggota",
    jenisPinjaman: "Pinjaman Bulanan 9",
    tanggalPinjaman: "30-04-2026",
    kolektor: "Dinda Sudiati",
    jwBln: "12",
    jwRange: "06/08/24-06/08/25",
    jatuhTempo: "30-04-2027",
    bunga: "24.00",
    jumlahPinjaman: "2.000.000,00",
    angsuranPerBln: "216.667",
    angsuranSdhHr: "2 / 4",
    tunggakanBln: "2",
    tunggakanNilai: "433.334",
    tunggakan1_30: "216.667",
    tunggakan31_60: "216.667",
    tunggakan61_90: "0",
    tunggakan90p: "0",
    tgkPokok: "0,00",
    tgkBunga: "0,00",
    sisaPinjaman: "1.040.000,00",
    kolektibilitas: "Lancar",
  },
  {
    no: 5,
    noRekening: "072260001",
    namaNasabah: "Rika Wastuti",
    alamat: "Jl. Mawar",
    status: "Anggota",
    jenisPinjaman: "Pinjaman Harian",
    tanggalPinjaman: "31-03-2026",
    kolektor: "Kolektor A",
    jwBln: "18",
    jwRange: "03/12/25-03/06/27",
    jatuhTempo: "30-09-2026",
    bunga: "20.00",
    jumlahPinjaman: "22.000.000,00",
    angsuranPerBln: "650.000",
    angsuranSdhHr: "4 / 18",
    tunggakanBln: "0",
    tunggakanNilai: "0",
    tunggakan1_30: "0",
    tunggakan31_60: "0",
    tunggakan61_90: "0",
    tunggakan90p: "0",
    tgkPokok: "0,00",
    tgkBunga: "0,00",
    sisaPinjaman: "22.000.000,00",
    kolektibilitas: "Lancar",
  },
];

export default function LoanReportTable({
  className,
  pageSize = 20,
}: {
  className?: string;
  pageSize?: number;
}) {
  const rows = React.useMemo(() => seedRows, []);

  const [page, setPage] = React.useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, pageSize, rows]);

  const totalsPage = React.useMemo(() => {
    const sum = (pick: (r: Row) => string) =>
      paged.reduce((acc, r) => acc + parseIdNumber(pick(r)), 0);
    return {
      jumlahPinjaman: sum((r) => r.jumlahPinjaman),
      tgkPokok: sum((r) => r.tgkPokok),
      tgkBunga: sum((r) => r.tgkBunga),
      sisaPinjaman: sum((r) => r.sisaPinjaman),
      tunggakanNilai: sum((r) => r.tunggakanNilai),
      tunggakan1_30: sum((r) => r.tunggakan1_30),
      tunggakan31_60: sum((r) => r.tunggakan31_60),
      tunggakan61_90: sum((r) => r.tunggakan61_90),
      tunggakan90p: sum((r) => r.tunggakan90p),
    };
  }, [paged]);

  const totalsAll = React.useMemo(() => {
    const sum = (pick: (r: Row) => string) =>
      rows.reduce((acc, r) => acc + parseIdNumber(pick(r)), 0);
    return {
      jumlahPinjaman: sum((r) => r.jumlahPinjaman),
      tgkPokok: sum((r) => r.tgkPokok),
      tgkBunga: sum((r) => r.tgkBunga),
      sisaPinjaman: sum((r) => r.sisaPinjaman),
      tunggakanNilai: sum((r) => r.tunggakanNilai),
      tunggakan1_30: sum((r) => r.tunggakan1_30),
      tunggakan31_60: sum((r) => r.tunggakan31_60),
      tunggakan61_90: sum((r) => r.tunggakan61_90),
      tunggakan90p: sum((r) => r.tunggakan90p),
    };
  }, [rows]);

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);

  const COLS = 25;
  const LABEL_SPAN = 12;
  const totalDivider = "border-t border-slate-300/80";

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-[5px] border border-slate-200/70 bg-white/90 p-3 shadow-sm backdrop-blur md:p-4">
        <div className="overflow-hidden rounded-[5px] bg-white ring-1 ring-slate-200">
          <div className="safe-x-scroll">
            <table className="w-full min-w-[2420px] border-collapse border-l border-t border-slate-300/80 bg-white">
              <thead className="bg-white">
                <tr className="bg-white">
                  <Th rowSpan={2} className="h-[88px] w-[46px]">
                    NO
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[118px]">
                    <SortableHeaderLabel lines={["NO", "REKENING"]} />
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[135px]">
                    <SortableHeaderLabel lines={["NAMA", "NASABAH"]} />
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[130px]">
                    <SortableHeaderLabel lines={["ALAMAT"]} />
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[95px]">
                    <PlainHeader>
                      STATUS
                      <br />
                      NASABAH
                    </PlainHeader>
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[145px]">
                    <SortableHeaderLabel lines={["JENIS", "PINJAMAN"]} />
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[105px]">
                    <SortableHeaderLabel lines={["TANGGAL", "PINJAMAN"]} />
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[110px]">
                    <SortableHeaderLabel lines={["KOLEKTOR"]} />
                  </Th>

                  <th
                    colSpan={2}
                    className={cn(
                      "h-[44px] border-b border-r border-slate-300/80 px-2 py-3",
                      "bg-white text-center align-middle text-[11px] font-extrabold uppercase tracking-wide text-slate-800",
                    )}
                  >
                    Jangka Waktu
                  </th>

                  <Th rowSpan={2} className="h-[88px] w-[112px]">
                    <SortableHeaderLabel lines={["JATUH", "TEMPO"]} />
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[82px]">
                    <SortableHeaderLabel lines={["BUNGA"]} />
                  </Th>

                  <Th rowSpan={2} className="h-[88px] w-[145px]">
                    <SortableHeaderLabel lines={["JUMLAH", "PINJAMAN"]} />
                  </Th>

                  <th
                    colSpan={2}
                    className={cn(
                      "h-[44px] border-b border-r border-slate-300/80 px-2 py-3",
                      "bg-white text-center align-middle text-[11px] font-extrabold uppercase tracking-wide text-slate-800",
                    )}
                  >
                    Angsuran
                  </th>

                  <th
                    colSpan={6}
                    className={cn(
                      "h-[44px] border-b border-r border-slate-300/80 px-2 py-3",
                      "bg-white text-center align-middle text-[11px] font-extrabold uppercase tracking-wide text-slate-800",
                    )}
                  >
                    Tunggakan
                  </th>

                  <Th rowSpan={2} className="h-[88px] w-[98px]">
                    <PlainHeader>TGK. POKOK</PlainHeader>
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[98px]">
                    <PlainHeader>TGK. BUNGA</PlainHeader>
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[110px]">
                    <SortableHeaderLabel
                      lines={["SISA PINJAMAN"]}
                      className="[&_span]:whitespace-nowrap"
                    />
                  </Th>
                  <Th rowSpan={2} className="h-[88px] w-[125px]">
                    <SortableHeaderLabel lines={["KOLEKTIBILITAS"]} />
                  </Th>
                </tr>

                <tr className="bg-white">
                  <Th className="h-[44px] w-[54px] bg-white">Bln</Th>
                  <Th className="h-[44px] w-[118px] bg-white">
                    Dari tgl. s/d tgl.
                  </Th>

                  <Th className="h-[44px] w-[108px] bg-white">Per bln</Th>
                  <Th className="h-[44px] w-[86px] bg-white">Sdh/Hr</Th>

                  <Th className="h-[44px] w-[54px] bg-white">Bln</Th>
                  <Th className="h-[44px] w-[105px] bg-white">Nilai</Th>
                  <Th className="h-[44px] w-[105px] bg-white">1-30 Hr</Th>
                  <Th className="h-[44px] w-[105px] bg-white">31-60 Hr</Th>
                  <Th className="h-[44px] w-[105px] bg-white">61-90 Hr</Th>
                  <Th className="h-[44px] w-[105px] bg-white">> 90 Hr</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {paged.length === 0 ? (
                  <tr>
                    <td
                      colSpan={COLS}
                      className="border-b border-r border-slate-200 px-4 py-10 text-center text-sm text-slate-600"
                    >
                      Tidak ada data.
                    </td>
                  </tr>
                ) : (
                  paged.map((r, idx) => (
                    <tr
                      key={`${r.noRekening}-${idx}`}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                    >
                      <Td className="w-[46px]" align="left">
                        <span className="tabular-nums">{r.no}</span>
                      </Td>

                      <Td className="w-[118px] font-normal" align="left">
                        <div className="truncate" title={r.noRekening}>
                          {r.noRekening}
                        </div>
                      </Td>

                      <Td className="w-[135px]" align="left">
                        <div className="truncate" title={r.namaNasabah}>
                          {r.namaNasabah}
                        </div>
                      </Td>

                      <Td className="w-[130px]" align="left">
                        <div className="truncate" title={r.alamat}>
                          {r.alamat}
                        </div>
                      </Td>

                      <Td className="w-[95px]" align="left">
                        <span className="whitespace-nowrap">
                          {normalizeStatus(r.status)}
                        </span>
                      </Td>

                      <Td className="w-[145px]" align="left">
                        <div
                          className="whitespace-normal leading-snug"
                          title={r.jenisPinjaman}
                        >
                          {r.jenisPinjaman}
                        </div>
                      </Td>

                      <Td className="w-[105px]" align="left">
                        <span className="tabular-nums whitespace-nowrap">
                          {r.tanggalPinjaman}
                        </span>
                      </Td>

                      <Td className="w-[110px]" align="left">
                        <div className="truncate" title={r.kolektor}>
                          {r.kolektor}
                        </div>
                      </Td>

                      <Td className="w-[54px]" align="right">
                        {r.jwBln}
                      </Td>
                      <Td className="w-[118px]" align="left">
                        <div className="truncate" title={r.jwRange}>
                          {r.jwRange}
                        </div>
                      </Td>

                      <Td className="w-[112px]" align="left">
                        <span className="tabular-nums whitespace-nowrap">
                          {r.jatuhTempo}
                        </span>
                      </Td>

                      <Td className="w-[82px]" align="right">
                        {r.bunga}
                      </Td>

                      <Td className="w-[145px]" align="right">
                        {r.jumlahPinjaman}
                      </Td>

                      <Td className="w-[108px]" align="right">
                        {r.angsuranPerBln}
                      </Td>
                      <Td className="w-[86px]" align="right">
                        {r.angsuranSdhHr}
                      </Td>

                      <Td className="w-[54px]" align="right">
                        {r.tunggakanBln}
                      </Td>
                      <Td className="w-[105px]" align="right">
                        {r.tunggakanNilai}
                      </Td>
                      <Td className="w-[105px]" align="right">
                        {r.tunggakan1_30}
                      </Td>
                      <Td className="w-[105px]" align="right">
                        {r.tunggakan31_60}
                      </Td>
                      <Td className="w-[105px]" align="right">
                        {r.tunggakan61_90}
                      </Td>
                      <Td className="w-[105px]" align="right">
                        {r.tunggakan90p}
                      </Td>

                      <Td className="w-[98px]" align="right">
                        {r.tgkPokok}
                      </Td>

                      <Td className="w-[98px]" align="right">
                        {r.tgkBunga}
                      </Td>

                      <Td className="w-[110px]" align="right">
                        {r.sisaPinjaman}
                      </Td>

                      <Td className="w-[125px]" align="left">
                        {r.kolektibilitas}
                      </Td>
                    </tr>
                  ))
                )}

                {rows.length ? (
                  <>
                    <tr className="bg-white">
                      <td
                        colSpan={LABEL_SPAN}
                        className="border-t border-r border-slate-300/80 px-2 py-2.5 text-[12px] font-semibold text-slate-900"
                      >
                        Total per Halaman
                      </td>

                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums">
                        {formatIdNumber(totalsPage.jumlahPinjaman)}
                      </td>

                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5" />
                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5" />

                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5" />
                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums">
                        {formatIdNumber(totalsPage.tunggakanNilai)}
                      </td>
                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums">
                        {formatIdNumber(totalsPage.tunggakan1_30)}
                      </td>
                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums">
                        {formatIdNumber(totalsPage.tunggakan31_60)}
                      </td>
                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums">
                        {formatIdNumber(totalsPage.tunggakan61_90)}
                      </td>
                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums">
                        {formatIdNumber(totalsPage.tunggakan90p)}
                      </td>

                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums">
                        {formatIdNumber(totalsPage.tgkPokok)}
                      </td>
                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums">
                        {formatIdNumber(totalsPage.tgkBunga)}
                      </td>
                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums">
                        {formatIdNumber(totalsPage.sisaPinjaman)}
                      </td>
                      <td className="border-t border-r border-slate-300/80 px-2 py-2.5" />
                    </tr>

                    <tr className="bg-white">
                      <td
                        colSpan={LABEL_SPAN}
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-[12px] font-semibold text-slate-900",
                          totalDivider,
                        )}
                      >
                        Total
                      </td>

                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums",
                          totalDivider,
                        )}
                      >
                        {formatIdNumber(totalsAll.jumlahPinjaman)}
                      </td>

                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5",
                          totalDivider,
                        )}
                      />
                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5",
                          totalDivider,
                        )}
                      />

                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5",
                          totalDivider,
                        )}
                      />
                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums",
                          totalDivider,
                        )}
                      >
                        {formatIdNumber(totalsAll.tunggakanNilai)}
                      </td>
                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums",
                          totalDivider,
                        )}
                      >
                        {formatIdNumber(totalsAll.tunggakan1_30)}
                      </td>
                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums",
                          totalDivider,
                        )}
                      >
                        {formatIdNumber(totalsAll.tunggakan31_60)}
                      </td>
                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums",
                          totalDivider,
                        )}
                      >
                        {formatIdNumber(totalsAll.tunggakan61_90)}
                      </td>
                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums",
                          totalDivider,
                        )}
                      >
                        {formatIdNumber(totalsAll.tunggakan90p)}
                      </td>

                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums",
                          totalDivider,
                        )}
                      >
                        {formatIdNumber(totalsAll.tgkPokok)}
                      </td>
                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums",
                          totalDivider,
                        )}
                      >
                        {formatIdNumber(totalsAll.tgkBunga)}
                      </td>
                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-semibold text-slate-900 tabular-nums",
                          totalDivider,
                        )}
                      >
                        {formatIdNumber(totalsAll.sisaPinjaman)}
                      </td>
                      <td
                        className={cn(
                          "border-r border-slate-300/80 px-2 py-2.5",
                          totalDivider,
                        )}
                      />
                    </tr>
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-[14px] text-slate-900">
            Menampilkan {showingStart} sampai {showingEnd} dari {rows.length} entri
          </div>

          <PaginationBar page={page} pageCount={pageCount} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}