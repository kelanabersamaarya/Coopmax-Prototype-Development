"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type NplRow = {
  no: number;
  kd: string;
  ket: string;
  npl1_30: string;
  npl31_60: string;
  npl61_90: string;
  npl91: string;
  jumlah: string;
};

const rows: NplRow[] = [
  {
    no: 1,
    kd: "KTR",
    ket: "KANTOR",
    npl1_30: "2.01",
    npl31_60: "",
    npl61_90: "",
    npl91: "",
    jumlah: "2.01",
  },
  {
    no: 2,
    kd: "AND",
    ket: "ANDRE",
    npl1_30: "5.24",
    npl31_60: "2.19",
    npl61_90: "0.34",
    npl91: "4.78",
    jumlah: "12.56",
  },
  {
    no: 3,
    kd: "ADK",
    ket: "DODY",
    npl1_30: "6.54",
    npl31_60: "2.92",
    npl61_90: "2.04",
    npl91: "7.51",
    jumlah: "19.01",
  },
  {
    no: 4,
    kd: "YSP",
    ket: "FEPRI",
    npl1_30: "17.18",
    npl31_60: "3.86",
    npl61_90: "2.80",
    npl91: "7.92",
    jumlah: "31.76",
  },
  {
    no: 5,
    kd: "YSM",
    ket: "DIO",
    npl1_30: "10.51",
    npl31_60: "6.41",
    npl61_90: "5.44",
    npl91: "21.69",
    jumlah: "44.05",
  },
  {
    no: 6,
    kd: "KKM",
    ket: "REMEDIAL 1",
    npl1_30: "0.31",
    npl31_60: "0.13",
    npl61_90: "0.13",
    npl91: "",
    jumlah: "0.58",
  },
  {
    no: 7,
    kd: "AMN",
    ket: "ENGGAR",
    npl1_30: "10.35",
    npl31_60: "4.18",
    npl61_90: "3.63",
    npl91: "11.18",
    jumlah: "29.34",
  },
  {
    no: 8,
    kd: "DNI",
    ket: "INDAH",
    npl1_30: "11.39",
    npl31_60: "3.37",
    npl61_90: "2.57",
    npl91: "8.67",
    jumlah: "26.01",
  },
];

const totals = {
  npl1_30: "9.02",
  npl31_60: "3.31",
  npl61_90: "2.20",
  npl91: "8.58",
  jumlah: "23.13",
};

function Th({
  children,
  className,
  colSpan,
  rowSpan,
  align = "center",
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
        "text-[12px] font-extrabold uppercase tracking-wide text-slate-900",
        align === "right"
          ? "text-right"
          : align === "left"
            ? "text-left"
            : "text-center",
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

export default function DetailNplReportTable({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-slate-200/70">
        <div className="safe-x-scroll border-b border-slate-300 bg-white">
          <table className="w-full min-w-[760px] border-collapse border-l border-r border-slate-300 bg-white">
            <thead className="bg-white">
              <tr>
                <Th rowSpan={2} className="w-[54px]" align="left" leftBorder>
                  No
                </Th>
                <Th colSpan={2}>Cabang</Th>
                <Th colSpan={5} noRightBorder>
                  N P L
                </Th>
              </tr>

              <tr>
                <Th className="w-[62px]" align="left">
                  KD
                </Th>
                <Th className="w-[180px]" align="left">
                  Ket.
                </Th>
                <Th className="w-[110px]" align="right">
                  1-30 hr
                </Th>
                <Th className="w-[110px]" align="right">
                  31-60 hr
                </Th>
                <Th className="w-[110px]" align="right">
                  61-90 hr
                </Th>
                <Th className="w-[110px]" align="right">
                  {">"} 91 hr
                </Th>
                <Th className="w-[110px]" align="right" noRightBorder>
                  Jumlah
                </Th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.no} className="bg-white">
                  <Td align="left" leftBorder>
                    {row.no}
                  </Td>
                  <Td align="left">{row.kd}</Td>
                  <Td align="left">{row.ket}</Td>
                  <Td align="right">{row.npl1_30}</Td>
                  <Td align="right">{row.npl31_60}</Td>
                  <Td align="right">{row.npl61_90}</Td>
                  <Td align="right">{row.npl91}</Td>
                  <Td align="right" noRightBorder>
                    {row.jumlah}
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
                <TotalCell>{totals.npl1_30}</TotalCell>
                <TotalCell>{totals.npl31_60}</TotalCell>
                <TotalCell>{totals.npl61_90}</TotalCell>
                <TotalCell>{totals.npl91}</TotalCell>
                <TotalCell className="border-r-0">{totals.jumlah}</TotalCell>
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