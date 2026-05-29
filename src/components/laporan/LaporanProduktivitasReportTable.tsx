"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ProduktivitasRow = {
  no: number;
  kd: string;
  cabangAo: string;
  nama: string;
  plafond: string;
  saldoPokok: string;
  nilai: string;
  tunggakan1_30: string;
  tunggakan31_60: string;
  tunggakan61_90: string;
  tunggakan91: string;
  npl: string;
};

const rows: ProduktivitasRow[] = [
  {
    no: 1,
    kd: "KTR",
    cabangAo: "Kantor Pusat",
    nama: "KANTOR",
    plafond: "160,850,000",
    saldoPokok: "110,882,878",
    nilai: "2,226,046",
    tunggakan1_30: "2,226,046",
    tunggakan31_60: "",
    tunggakan61_90: "",
    tunggakan91: "",
    npl: "2.01",
  },
  {
    no: 2,
    kd: "AND",
    cabangAo: "Ubud",
    nama: "ANDRE",
    plafond: "1,587,521,000",
    saldoPokok: "1,366,590,042",
    nilai: "171,602,690",
    tunggakan1_30: "71,596,026",
    tunggakan31_60: "29,958,333",
    tunggakan61_90: "4,688,333",
    tunggakan91: "65,359,998",
    npl: "12.56",
  },
  {
    no: 3,
    kd: "ADK",
    cabangAo: "Gianyar",
    nama: "DODY",
    plafond: "1,216,150,000",
    saldoPokok: "914,831,958",
    nilai: "173,864,008",
    tunggakan1_30: "59,841,109",
    tunggakan31_60: "26,678,053",
    tunggakan61_90: "18,633,053",
    tunggakan91: "68,711,793",
    npl: "19.01",
  },
  {
    no: 4,
    kd: "YSP",
    cabangAo: "Denpasar",
    nama: "FEPRI",
    plafond: "1,371,050,000",
    saldoPokok: "1,026,738,841",
    nilai: "326,091,111",
    tunggakan1_30: "176,423,759",
    tunggakan31_60: "39,666,246",
    tunggakan61_90: "28,730,357",
    tunggakan91: "81,270,749",
    npl: "31.76",
  },
  {
    no: 5,
    kd: "YSM",
    cabangAo: "Badung",
    nama: "DIO",
    plafond: "1,043,385,000",
    saldoPokok: "652,917,763",
    nilai: "287,616,026",
    tunggakan1_30: "68,601,964",
    tunggakan31_60: "41,876,434",
    tunggakan61_90: "35,514,626",
    tunggakan91: "141,623,002",
    npl: "44.05",
  },
  {
    no: 6,
    kd: "KKM",
    cabangAo: "Sukawati",
    nama: "REMEDIAL 1",
    plafond: "231,102,000",
    saldoPokok: "223,772,837",
    nilai: "1,300,833",
    tunggakan1_30: "700,833",
    tunggakan31_60: "300,000",
    tunggakan61_90: "300,000",
    tunggakan91: "",
    npl: "0.58",
  },
  {
    no: 7,
    kd: "AMN",
    cabangAo: "Tabanan",
    nama: "ENGGAR",
    plafond: "604,865,000",
    saldoPokok: "452,239,955",
    nilai: "132,708,388",
    tunggakan1_30: "46,809,480",
    tunggakan31_60: "18,897,782",
    tunggakan61_90: "16,426,947",
    tunggakan91: "50,574,179",
    npl: "29.34",
  },
  {
    no: 8,
    kd: "DNI",
    cabangAo: "Klungkung",
    nama: "INDAH",
    plafond: "150,100,000",
    saldoPokok: "97,188,891",
    nilai: "25,275,337",
    tunggakan1_30: "11,072,168",
    tunggakan31_60: "3,279,500",
    tunggakan61_90: "2,502,000",
    tunggakan91: "8,421,669",
    npl: "26.01",
  },
];

const totals = {
  plafond: "6,365,023,000",
  saldoPokok: "4,845,163,165",
  nilai: "1,120,684,439",
  tunggakan1_30: "437,271,385",
  tunggakan31_60: "160,656,348",
  tunggakan61_90: "106,795,316",
  tunggakan91: "415,961,390",
  npl: "23.13",
};

function Th({
  children,
  className,
  colSpan,
  rowSpan,
  leftBorder = false,
  noRightBorder = false,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  align?: "left" | "center" | "right";
  leftBorder?: boolean;
  noRightBorder?: boolean;
}) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(
        "border-b border-t border-slate-300 bg-white px-2 py-2.5 align-middle",
        leftBorder ? "border-l border-slate-300" : "",
        noRightBorder ? "" : "border-r border-slate-300",
        "text-center text-[12px] font-extrabold uppercase tracking-wide text-slate-900",
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
  leftBorder = false,
  noRightBorder = false,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  leftBorder?: boolean;
  noRightBorder?: boolean;
}) {
  return (
    <td
      className={cn(
        "border-b border-slate-200 px-2 py-2 align-top",
        leftBorder ? "border-l border-slate-200" : "",
        noRightBorder ? "" : "border-r border-slate-200",
        "text-[13px] font-medium text-slate-900",
        align === "right"
          ? "text-right tabular-nums"
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

function TotalCell({
  children,
  align = "right",
  className,
  colSpan,
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={cn(
        "border-b border-r border-slate-200 px-2 py-2.5 text-[13px] font-extrabold text-slate-900",
        align === "right"
          ? "text-right tabular-nums"
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

export default function LaporanProduktivitasReportTable({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-slate-200/70">
        <div className="safe-x-scroll border-b border-slate-300 bg-white">
          <table className="w-full min-w-[1280px] border-collapse border-l border-r border-slate-300 bg-white">
            <thead className="bg-white">
              <tr>
                <Th rowSpan={2} className="w-[54px]" leftBorder>
                  No
                </Th>
                <Th colSpan={3}>AO</Th>
                <Th colSpan={2}>Kredit</Th>
                <Th colSpan={5}>Tunggakan Angsuran</Th>
                <Th rowSpan={2} className="w-[82px]" noRightBorder>
                  NPL
                  <br />
                  (%)
                </Th>
              </tr>

              <tr>
                <Th className="w-[62px]">KD</Th>
                <Th className="w-[150px]">
                  Cabang AO
                  <br />
                  Terdaftar
                </Th>
                <Th className="w-[150px]">Nama</Th>
                <Th className="w-[150px]">Plafond</Th>
                <Th className="w-[150px]">Sld. Pokok</Th>
                <Th className="w-[135px]">Nilai</Th>
                <Th className="w-[135px]">1 - 30 hr</Th>
                <Th className="w-[135px]">31 - 60 hr</Th>
                <Th className="w-[135px]">61 - 90 hr</Th>
                <Th className="w-[135px]">{">"} 91 hr</Th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.no} className="bg-white">
                  <Td align="left" leftBorder>
                    {row.no}
                  </Td>
                  <Td align="left">{row.kd}</Td>
                  <Td align="left">{row.cabangAo}</Td>
                  <Td align="left">{row.nama}</Td>
                  <Td align="right">{row.plafond}</Td>
                  <Td align="right">{row.saldoPokok}</Td>
                  <Td align="right">{row.nilai}</Td>
                  <Td align="right">{row.tunggakan1_30}</Td>
                  <Td align="right">{row.tunggakan31_60}</Td>
                  <Td align="right">{row.tunggakan61_90}</Td>
                  <Td align="right">{row.tunggakan91}</Td>
                  <Td align="right" noRightBorder>
                    {row.npl}
                  </Td>
                </tr>
              ))}

              <tr className="border-t border-black bg-white">
                <TotalCell
                  colSpan={4}
                  align="center"
                  className="border-l border-slate-200"
                >
                  Total
                </TotalCell>
                <TotalCell>{totals.plafond}</TotalCell>
                <TotalCell>{totals.saldoPokok}</TotalCell>
                <TotalCell>{totals.nilai}</TotalCell>
                <TotalCell>{totals.tunggakan1_30}</TotalCell>
                <TotalCell>{totals.tunggakan31_60}</TotalCell>
                <TotalCell>{totals.tunggakan61_90}</TotalCell>
                <TotalCell>{totals.tunggakan91}</TotalCell>
                <TotalCell className="border-r-0">{totals.npl}</TotalCell>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-[12px] text-slate-700">
            Menampilkan 1 sampai {rows.length} dari {rows.length} entri
          </div>

          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              disabled
              className="h-10 rounded-none bg-slate-100 px-4 text-[12px] font-semibold text-slate-400"
            >
              Sebelumnya
            </button>
            <div className="inline-flex h-10 min-w-10 items-center justify-center bg-violet-600 px-4 text-[12px] font-extrabold text-white">
              1
            </div>
            <button
              type="button"
              disabled
              className="h-10 rounded-none bg-slate-100 px-4 text-[12px] font-semibold text-slate-400"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}