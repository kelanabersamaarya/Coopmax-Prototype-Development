"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import SortableHeaderLabel from "@/components/laporan/SortableHeaderLabel";

type Row = {
  no: number;
  noRekening: string;
  namaNasabah: string;
  status: string;
  jenisPinjaman: string;
  tanggalPinjaman: string; // dd-mm-yyyy
  kolektor: string;
  jw: string; // contoh "12 Bulan"
  jatuhTempo: string; // dd-mm-yyyy
  bunga: string; // "24.00"
  jumlahPinjaman: string; // "2.000.000,00"
  tgkPokok: string; // "0,00"
  tgkBunga: string; // "0,00"
  sisaPinjaman: string; // "1.040.000,00"
  kolektibilitas: string; // "Lancar" | ...
};

function Th({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      className={cn(
        "px-3 py-3",
        "border-b border-slate-300/80",
        "text-[12px] font-extrabold uppercase tracking-wide text-slate-800",
        // header selalu rata kiri seperti contoh
        "text-left",
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
        "px-3 py-2.5 align-top",
        "border-b border-slate-200",
        "text-[13px] font-medium",
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
      <button type="button" className={btnBase} disabled={prevDisabled} onClick={() => onPage(Math.max(1, page - 1))}>
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

      <button type="button" className={btnBase} disabled={nextDisabled} onClick={() => onPage(Math.min(pageCount, page + 1))}>
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
    status: "Anggota",
    jenisPinjaman: "Pinjaman Billing",
    tanggalPinjaman: "07-04-2026",
    kolektor: "Gina Farida M.M.",
    jw: "12 Bulan",
    jatuhTempo: "07-04-2027",
    bunga: "12.00",
    jumlahPinjaman: "12.000.000,00",
    tgkPokok: "0,00",
    tgkBunga: "0,00",
    sisaPinjaman: "10.553.571,00",
    kolektibilitas: "Lancar",
  },
  {
    no: 2,
    noRekening: "klpk04.07260001",
    namaNasabah: "Indah Sari",
    status: "Non Anggota",
    jenisPinjaman: "Pinjaman Billing",
    tanggalPinjaman: "10-02-2026",
    kolektor: "Kolektor A",
    jw: "12 Bulan",
    jatuhTempo: "10-02-2027",
    bunga: "11.50",
    jumlahPinjaman: "10.000.000,00",
    tgkPokok: "0,00",
    tgkBunga: "0,00",
    sisaPinjaman: "8.645.833,33",
    kolektibilitas: "Lancar",
  },
  {
    no: 3,
    noRekening: "SMG260021",
    namaNasabah: "Rika Wastuti",
    status: "Anggota",
    jenisPinjaman: "Pinjaman Harian",
    tanggalPinjaman: "26-06-2024",
    kolektor: "Kolektor B",
    jw: "10 Bulan",
    jatuhTempo: "26-04-2025",
    bunga: "20.00",
    jumlahPinjaman: "3.500.000,00",
    tgkPokok: "220.000,00",
    tgkBunga: "0,00",
    sisaPinjaman: "3.250.000,00",
    kolektibilitas: "Macet",
  },
  {
    no: 4,
    noRekening: "12260006",
    namaNasabah: "Pangeran Sirait",
    status: "Non Anggota",
    jenisPinjaman: "Pinjaman Bulanan 9",
    tanggalPinjaman: "30-04-2026",
    kolektor: "Dinda Sudiati",
    jw: "12 Bulan",
    jatuhTempo: "30-04-2027",
    bunga: "24.00",
    jumlahPinjaman: "2.000.000,00",
    tgkPokok: "0,00",
    tgkBunga: "0,00",
    sisaPinjaman: "1.040.000,00",
    kolektibilitas: "Lancar",
  },
  {
    no: 5,
    noRekening: "072260001",
    namaNasabah: "Rika Wastuti",
    status: "Anggota",
    jenisPinjaman: "Pinjaman Harian",
    tanggalPinjaman: "31-03-2026",
    kolektor: "Kolektor A",
    jw: "6 Bulan",
    jatuhTempo: "30-09-2026",
    bunga: "20.00",
    jumlahPinjaman: "22.000.000,00",
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

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
          <div className="safe-x-scroll">
            <table className="w-full min-w-[1600px] border-collapse bg-white">
              <thead className="bg-white">
                <tr className="bg-white">
                  <Th className="w-[60px]" align="left">
                    <SortableHeaderLabel lines={["NO"]} />
                  </Th>
                  <Th className="w-[150px]" align="left">
                    <SortableHeaderLabel lines={["NO", "REKENING"]} />
                  </Th>
                  <Th className="w-[220px]" align="left">
                    <SortableHeaderLabel lines={["NAMA", "NASABAH"]} />
                  </Th>
                  <Th className="w-[160px]" align="left">
                    <SortableHeaderLabel lines={["STATUS", "NASABAH"]} />
                  </Th>
                  <Th className="w-[180px]" align="left">
                    <SortableHeaderLabel lines={["JENIS", "PINJAMAN"]} />
                  </Th>
                  <Th className="w-[140px]" align="left">
                    <SortableHeaderLabel lines={["TANGGAL", "PINJAMAN"]} />
                  </Th>
                  <Th className="w-[180px]" align="left">
                    <SortableHeaderLabel lines={["KOLEKTOR"]} />
                  </Th>
                  <Th className="w-[110px]" align="left">
                    <SortableHeaderLabel lines={["JW"]} />
                  </Th>
                  <Th className="w-[140px]" align="left">
                    <SortableHeaderLabel lines={["JATUH", "TEMPO"]} />
                  </Th>
                  <Th className="w-[110px]" align="right">
                    <SortableHeaderLabel lines={["BUNGA"]} />
                  </Th>
                  <Th className="w-[170px]" align="right">
                    <SortableHeaderLabel lines={["JUMLAH", "PINJAMAN"]} />
                  </Th>
                  <Th className="w-[140px]" align="right">
                    <SortableHeaderLabel lines={["TGK", "POKOK"]} />
                  </Th>
                  <Th className="w-[140px]" align="right">
                    <SortableHeaderLabel lines={["TGK.", "BUNGA"]} />
                  </Th>
                  <Th className="w-[170px]" align="right">
                    <SortableHeaderLabel lines={["SISA", "PINJAMAN"]} />
                  </Th>
                  <Th className="w-[160px]" align="left">
                    <SortableHeaderLabel lines={["KOLEKTIBILITAS"]} />
                  </Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="px-4 py-10 text-center text-sm text-slate-600">
                      Tidak ada data.
                    </td>
                  </tr>
                ) : (
                  paged.map((r, idx) => (
                    <tr key={`${r.noRekening}-${idx}`} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <Td className="w-[60px]" align="left">
                        <span className="tabular-nums">{r.no}</span>
                      </Td>

                      <Td className="w-[150px]" align="left">
                        <div className="truncate font-semibold" title={r.noRekening}>
                          {r.noRekening}
                        </div>
                      </Td>

                      <Td className="w-[220px]" align="left">
                        <div className="truncate" title={r.namaNasabah}>
                          {r.namaNasabah}
                        </div>
                      </Td>

                      <Td className="w-[160px]" align="left">
                        <span className="whitespace-nowrap">{normalizeStatus(r.status)}</span>
                      </Td>

                      <Td className="w-[180px]" align="left">
                        <div className="whitespace-normal leading-snug" title={r.jenisPinjaman}>
                          {r.jenisPinjaman}
                        </div>
                      </Td>

                      <Td className="w-[140px]" align="left">
                        <span className="tabular-nums whitespace-nowrap">{r.tanggalPinjaman}</span>
                      </Td>

                      <Td className="w-[180px]" align="left">
                        <div className="truncate" title={r.kolektor}>
                          {r.kolektor}
                        </div>
                      </Td>

                      <Td className="w-[110px]" align="left">
                        {r.jw}
                      </Td>

                      <Td className="w-[140px]" align="left">
                        <span className="tabular-nums whitespace-nowrap">{r.jatuhTempo}</span>
                      </Td>

                      <Td className="w-[110px]" align="right">
                        {r.bunga}
                      </Td>

                      <Td className="w-[170px]" align="right">
                        {r.jumlahPinjaman}
                      </Td>

                      <Td className="w-[140px]" align="right">
                        {r.tgkPokok}
                      </Td>

                      <Td className="w-[140px]" align="right">
                        {r.tgkBunga}
                      </Td>

                      <Td className="w-[170px]" align="right">
                        {r.sisaPinjaman}
                      </Td>

                      <Td className="w-[160px]" align="left">
                        {r.kolektibilitas}
                      </Td>
                    </tr>
                  ))
                )}
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
