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
  angsuranPerBln: string;
  angsuranSdhHr: string; // format "2 / 2"
  tunggakanBln: string; // "0"
  tunggakanNilai: string; // "270,833"
  tunggakan1_30: string;
  tunggakan31_60: string;
  tunggakan61_90: string;
  tunggakan90p: string;
  tgkPokok: string; // "0,00"
  tgkBunga: string; // "0,00"
  sisaPinjaman: string; // "1.040.000,00"
  kolektibilitas: string; // "Lancar" | ...
};

type ThProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode;
};

function Th({ children, className, ...props }: ThProps) {
  return (
    <th
      {...props}
      className={cn(
        "px-3 py-3",
        "border-b border-slate-300/80",
        "text-[12px] font-extrabold uppercase tracking-wide text-slate-800",
        "text-left",
        // memastikan header rowSpan (atas) tidak punya garis horizontal di bawahnya
        props.rowSpan && Number(props.rowSpan) > 1 ? "border-b-0" : "",
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
    status: "Non Anggota",
    jenisPinjaman: "Pinjaman Billing",
    tanggalPinjaman: "10-02-2026",
    kolektor: "Kolektor A",
    jw: "12 Bulan",
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
    status: "Anggota",
    jenisPinjaman: "Pinjaman Harian",
    tanggalPinjaman: "26-06-2024",
    kolektor: "Kolektor B",
    jw: "10 Bulan",
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
    status: "Non Anggota",
    jenisPinjaman: "Pinjaman Bulanan 9",
    tanggalPinjaman: "30-04-2026",
    kolektor: "Dinda Sudiati",
    jw: "12 Bulan",
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
    status: "Anggota",
    jenisPinjaman: "Pinjaman Harian",
    tanggalPinjaman: "31-03-2026",
    kolektor: "Kolektor A",
    jw: "6 Bulan",
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

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
          <div className="safe-x-scroll">
            <table className="w-full min-w-[3050px] border-collapse bg-white">
              <thead className="bg-white">
                <tr className="bg-white">
                  <Th rowSpan={2} className="w-[60px] align-bottom">
                    <SortableHeaderLabel lines={["NO"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[150px] align-bottom">
                    <SortableHeaderLabel lines={["NO", "REKENING"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[220px] align-bottom">
                    <SortableHeaderLabel lines={["NAMA", "NASABAH"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[160px] align-bottom">
                    <SortableHeaderLabel lines={["STATUS", "NASABAH"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[190px] align-bottom">
                    <SortableHeaderLabel lines={["JENIS", "PINJAMAN"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[180px] align-bottom">
                    <SortableHeaderLabel lines={["TANGGAL", "PINJAMAN"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[180px] align-bottom">
                    <SortableHeaderLabel lines={["KOLEKTOR"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[110px] align-bottom">
                    <SortableHeaderLabel lines={["JW"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[140px] align-bottom">
                    <SortableHeaderLabel lines={["JATUH", "TEMPO"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[120px] align-bottom">
                    <SortableHeaderLabel lines={["BUNGA"]} />
                  </Th>

                  <Th rowSpan={2} className="w-[190px] align-bottom">
                    <SortableHeaderLabel lines={["JUMLAH", "PINJAMAN"]} />
                  </Th>

                  <th
                    colSpan={2}
                    className={cn(
                      "px-3 py-2",
                      "text-center text-[12px] font-extrabold uppercase tracking-wide text-slate-800",
                      "bg-transparent border-b-0",
                    )}
                  >
                    Angsuran
                  </th>

                  <th
                    colSpan={6}
                    className={cn(
                      "px-3 py-2",
                      "text-center text-[12px] font-extrabold uppercase tracking-wide text-slate-800",
                      // seperti contoh: tanpa background & tanpa garis horizontal
                      "bg-transparent border-b-0",
                    )}
                  >
                    Tunggakan
                  </th>

                  <Th rowSpan={2} className="w-[150px] align-bottom">
                    <SortableHeaderLabel lines={["TGK", "POKOK"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[150px] align-bottom">
                    <SortableHeaderLabel lines={["TGK.", "BUNGA"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[190px] align-bottom">
                    <SortableHeaderLabel lines={["SISA", "PINJAMAN"]} />
                  </Th>
                  <Th rowSpan={2} className="w-[170px] align-bottom">
                    <SortableHeaderLabel lines={["KOLEKTIBILITAS"]} />
                  </Th>
                </tr>

                <tr className="bg-white">
                  <Th className="w-[140px] border-b-0 bg-transparent">Per bln</Th>
                  <Th className="w-[110px] border-b-0 bg-transparent">Sdh/Hr</Th>

                  <Th className="w-[80px] border-b-0 bg-transparent">Bln</Th>
                  <Th className="w-[140px] border-b-0 bg-transparent">Nilai</Th>
                  <Th className="w-[140px] border-b-0 bg-transparent">1-30 Hr</Th>
                  <Th className="w-[140px] border-b-0 bg-transparent">31-60 Hr</Th>
                  <Th className="w-[140px] border-b-0 bg-transparent">61-90 Hr</Th>
                  <Th className="w-[140px] border-b-0 bg-transparent">&gt; 90 Hr</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={23} className="px-4 py-10 text-center text-sm text-slate-600">
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

                      <Td className="w-[190px]" align="left">
                        <div className="whitespace-normal leading-snug" title={r.jenisPinjaman}>
                          {r.jenisPinjaman}
                        </div>
                      </Td>

                      <Td className="w-[180px]" align="left">
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

                      <Td className="w-[120px]" align="right">
                        {r.bunga}
                      </Td>

                      <Td className="w-[190px]" align="right">
                        {r.jumlahPinjaman}
                      </Td>

                      <Td className="w-[140px]" align="right">
                        {r.angsuranPerBln}
                      </Td>
                      <Td className="w-[110px]" align="right">
                        {r.angsuranSdhHr}
                      </Td>

                      <Td className="w-[80px]" align="right">
                        {r.tunggakanBln}
                      </Td>
                      <Td className="w-[140px]" align="right">
                        {r.tunggakanNilai}
                      </Td>
                      <Td className="w-[140px]" align="right">
                        {r.tunggakan1_30}
                      </Td>
                      <Td className="w-[140px]" align="right">
                        {r.tunggakan31_60}
                      </Td>
                      <Td className="w-[140px]" align="right">
                        {r.tunggakan61_90}
                      </Td>
                      <Td className="w-[140px]" align="right">
                        {r.tunggakan90p}
                      </Td>

                      <Td className="w-[150px]" align="right">
                        {r.tgkPokok}
                      </Td>

                      <Td className="w-[150px]" align="right">
                        {r.tgkBunga}
                      </Td>

                      <Td className="w-[190px]" align="right">
                        {r.sisaPinjaman}
                      </Td>

                      <Td className="w-[170px]" align="left">
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
