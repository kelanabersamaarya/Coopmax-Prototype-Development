"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CabangProduktivitasRow = {
  no: number;
  kodeCabang: string;
  namaCabang: string;
  plafond: string;
  saldoPokok: string;
  nilaiTunggakan: string;
  tunggakan1_30: string;
  tunggakan31_60: string;
  tunggakan61_90: string;
  tunggakan91: string;
  npl: string;
};

const rows: CabangProduktivitasRow[] = [
  {
    no: 1,
    kodeCabang: "KTR",
    namaCabang: "KANTOR PUSAT",
    plafond: "2,145,500,000",
    saldoPokok: "1,728,440,250",
    nilaiTunggakan: "96,850,000",
    tunggakan1_30: "42,250,000",
    tunggakan31_60: "18,600,000",
    tunggakan61_90: "12,000,000",
    tunggakan91: "24,000,000",
    npl: "5.60",
  },
  {
    no: 2,
    kodeCabang: "UBD",
    namaCabang: "UBUD",
    plafond: "1,385,250,000",
    saldoPokok: "1,074,332,900",
    nilaiTunggakan: "88,760,500",
    tunggakan1_30: "31,450,000",
    tunggakan31_60: "22,300,500",
    tunggakan61_90: "13,010,000",
    tunggakan91: "22,000,000",
    npl: "8.26",
  },
  {
    no: 3,
    kodeCabang: "GNR",
    namaCabang: "GIANYAR",
    plafond: "1,754,000,000",
    saldoPokok: "1,289,774,320",
    nilaiTunggakan: "142,510,000",
    tunggakan1_30: "55,200,000",
    tunggakan31_60: "31,750,000",
    tunggakan61_90: "20,560,000",
    tunggakan91: "35,000,000",
    npl: "11.05",
  },
  {
    no: 4,
    kodeCabang: "DPS",
    namaCabang: "DENPASAR",
    plafond: "980,750,000",
    saldoPokok: "752,910,640",
    nilaiTunggakan: "53,220,000",
    tunggakan1_30: "21,000,000",
    tunggakan31_60: "12,750,000",
    tunggakan61_90: "7,470,000",
    tunggakan91: "12,000,000",
    npl: "7.07",
  },
  {
    no: 5,
    kodeCabang: "BDG",
    namaCabang: "BADUNG",
    plafond: "1,124,850,000",
    saldoPokok: "884,705,055",
    nilaiTunggakan: "37,900,000",
    tunggakan1_30: "18,250,000",
    tunggakan31_60: "8,650,000",
    tunggakan61_90: "4,000,000",
    tunggakan91: "7,000,000",
    npl: "4.28",
  },
];

const totals = {
  plafond: "7,390,350,000",
  saldoPokok: "5,730,163,165",
  nilaiTunggakan: "419,240,500",
  tunggakan1_30: "168,150,000",
  tunggakan31_60: "94,050,500",
  tunggakan61_90: "57,040,000",
  tunggakan91: "100,000,000",
  npl: "7.32",
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

export default function LaporanProduktivitasCabangReportTable({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-slate-200/70">
        <div className="safe-x-scroll border-b border-slate-300 bg-white">
          <table className="w-full min-w-[1160px] border-collapse border-l border-r border-slate-300 bg-white">
            <thead className="bg-white">
              <tr>
                <Th rowSpan={2} className="w-[54px]" leftBorder>
                  No
                </Th>
                <Th colSpan={2}>Cabang</Th>
                <Th colSpan={2}>Kredit</Th>
                <Th colSpan={5}>Tunggakan Angsuran</Th>
                <Th rowSpan={2} className="w-[82px]" noRightBorder>
                  NPL
                  <br />
                  (%)
                </Th>
              </tr>

              <tr>
                <Th className="w-[70px]">KD</Th>
                <Th className="w-[190px]">Nama Cabang</Th>
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
                  <Td align="left">{row.kodeCabang}</Td>
                  <Td align="left">{row.namaCabang}</Td>
                  <Td align="right">{row.plafond}</Td>
                  <Td align="right">{row.saldoPokok}</Td>
                  <Td align="right">{row.nilaiTunggakan}</Td>
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
                  colSpan={3}
                  align="center"
                  className="border-l border-slate-200"
                >
                  Total
                </TotalCell>
                <TotalCell>{totals.plafond}</TotalCell>
                <TotalCell>{totals.saldoPokok}</TotalCell>
                <TotalCell>{totals.nilaiTunggakan}</TotalCell>
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