"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CabangRow = {
  no: number;
  kodeCabang: string;
  namaCabang: string;
  jumlahAo: string;
  jumlahNasabah: string;
  plafond: string;
  saldoPokok: string;
  tunggakanNilai: string;
  tunggakan1_30: string;
  tunggakan31_60: string;
  tunggakan61_90: string;
  tunggakan91: string;
  npl: string;
};

const rows: CabangRow[] = [
  {
    no: 1,
    kodeCabang: "KTR",
    namaCabang: "Kantor Pusat",
    jumlahAo: "8",
    jumlahNasabah: "126",
    plafond: "6,365,023,000",
    saldoPokok: "4,845,163,165",
    tunggakanNilai: "1,120,684,439",
    tunggakan1_30: "437,271,385",
    tunggakan31_60: "160,656,348",
    tunggakan61_90: "106,795,316",
    tunggakan91: "415,961,390",
    npl: "23.13",
  },
  {
    no: 2,
    kodeCabang: "UBD",
    namaCabang: "Cabang Ubud",
    jumlahAo: "5",
    jumlahNasabah: "84",
    plafond: "3,126,500,000",
    saldoPokok: "2,418,920,500",
    tunggakanNilai: "486,214,800",
    tunggakan1_30: "188,120,700",
    tunggakan31_60: "72,450,000",
    tunggakan61_90: "49,600,000",
    tunggakan91: "176,044,100",
    npl: "20.10",
  },
  {
    no: 3,
    kodeCabang: "DPS",
    namaCabang: "Cabang Denpasar",
    jumlahAo: "6",
    jumlahNasabah: "97",
    plafond: "4,012,250,000",
    saldoPokok: "3,105,775,250",
    tunggakanNilai: "537,915,400",
    tunggakan1_30: "220,400,000",
    tunggakan31_60: "86,315,400",
    tunggakan61_90: "58,700,000",
    tunggakan91: "172,500,000",
    npl: "17.32",
  },
  {
    no: 4,
    kodeCabang: "GNY",
    namaCabang: "Cabang Gianyar",
    jumlahAo: "4",
    jumlahNasabah: "68",
    plafond: "2,485,000,000",
    saldoPokok: "1,884,900,000",
    tunggakanNilai: "309,650,000",
    tunggakan1_30: "95,200,000",
    tunggakan31_60: "55,900,000",
    tunggakan61_90: "31,250,000",
    tunggakan91: "127,300,000",
    npl: "16.43",
  },
];

const totals = {
  jumlahAo: "23",
  jumlahNasabah: "375",
  plafond: "15,988,773,000",
  saldoPokok: "12,254,758,915",
  tunggakanNilai: "2,454,464,639",
  tunggakan1_30: "941, -",
  tunggakan1_30Display: "941, -".replace("941, -", "941, -"),
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

function parseNumber(value: string) {
  const cleaned = value.replace(/[^\d]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatNumber(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function LaporanProduktivitasCabangReportTable({
  className,
}: {
  className?: string;
}) {
  const computedTotals = React.useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.jumlahAo += parseNumber(row.jumlahAo);
        acc.jumlahNasabah += parseNumber(row.jumlahNasabah);
        acc.plafond += parseNumber(row.plafond);
        acc.saldoPokok += parseNumber(row.saldoPokok);
        acc.tunggakanNilai += parseNumber(row.tunggakanNilai);
        acc.tunggakan1_30 += parseNumber(row.tunggakan1_30);
        acc.tunggakan31_60 += parseNumber(row.tunggakan31_60);
        acc.tunggakan61_90 += parseNumber(row.tunggakan61_90);
        acc.tunggakan91 += parseNumber(row.tunggakan91);
        return acc;
      },
      {
        jumlahAo: 0,
        jumlahNasabah: 0,
        plafond: 0,
        saldoPokok: 0,
        tunggakanNilai: 0,
        tunggakan1_30: 0,
        tunggakan31_60: 0,
        tunggakan61_90: 0,
        tunggakan91: 0,
      },
    );
  }, []);

  const totalNpl =
    computedTotals.saldoPokok > 0
      ? ((computedTotals.tunggakanNilai / computedTotals.saldoPokok) * 100).toFixed(2)
      : "0.00";

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-slate-200/70">
        <div className="safe-x-scroll border-b border-slate-300 bg-white">
          <table className="w-full min-w-[1360px] border-collapse border-l border-r border-slate-300 bg-white">
            <thead className="bg-white">
              <tr>
                <Th rowSpan={2} className="w-[54px]" leftBorder>
                  No
                </Th>
                <Th colSpan={2}>Cabang</Th>
                <Th colSpan={2}>Produktivitas</Th>
                <Th colSpan={2}>Kredit</Th>
                <Th colSpan={5}>Tunggakan Angsuran</Th>
                <Th rowSpan={2} className="w-[82px]" noRightBorder>
                  NPL
                  <br />
                  (%)
                </Th>
              </tr>

              <tr>
                <Th className="w-[76px]">KD</Th>
                <Th className="w-[180px]">Nama Cabang</Th>
                <Th className="w-[92px]">AO</Th>
                <Th className="w-[120px]">Nasabah</Th>
                <Th className="w-[155px]">Plafond</Th>
                <Th className="w-[155px]">Sld. Pokok</Th>
                <Th className="w-[145px]">Nilai</Th>
                <Th className="w-[135px]">1 - 30 hr</Th>
                <Th className="w-[135px]">31 - 60 hr</Th>
                <Th className="w-[135px]">61 - 90 hr</Th>
                <Th className="w-[135px]">{">"} 91 hr</Th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.kodeCabang} className="bg-white">
                  <Td align="left" leftBorder>
                    {row.no}
                  </Td>
                  <Td align="left">{row.kodeCabang}</Td>
                  <Td align="left">{row.namaCabang}</Td>
                  <Td align="right">{row.jumlahAo}</Td>
                  <Td align="right">{row.jumlahNasabah}</Td>
                  <Td align="right">{row.plafond}</Td>
                  <Td align="right">{row.saldoPokok}</Td>
                  <Td align="right">{row.tunggakanNilai}</Td>
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
                <TotalCell>{formatNumber(computedTotals.jumlahAo)}</TotalCell>
                <TotalCell>{formatNumber(computedTotals.jumlahNasabah)}</TotalCell>
                <TotalCell>{formatNumber(computedTotals.plafond)}</TotalCell>
                <TotalCell>{formatNumber(computedTotals.saldoPokok)}</TotalCell>
                <TotalCell>{formatNumber(computedTotals.tunggakanNilai)}</TotalCell>
                <TotalCell>{formatNumber(computedTotals.tunggakan1_30)}</TotalCell>
                <TotalCell>{formatNumber(computedTotals.tunggakan31_60)}</TotalCell>
                <TotalCell>{formatNumber(computedTotals.tunggakan61_90)}</TotalCell>
                <TotalCell>{formatNumber(computedTotals.tunggakan91)}</TotalCell>
                <TotalCell className="border-r-0">{totalNpl}</TotalCell>
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

        <div className="sr-only">
          {totals.jumlahAo}
          {totals.jumlahNasabah}
        </div>
      </div>
    </div>
  );
}