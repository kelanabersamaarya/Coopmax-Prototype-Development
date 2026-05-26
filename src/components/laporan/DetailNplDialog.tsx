"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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

function Cell({
  children,
  className,
  align = "left",
  colSpan,
}: {
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={cn(
        "border border-[#CDD4E0] bg-white px-2 py-1.5 text-[13px] font-normal text-slate-900",
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

function HeaderCell({
  children,
  className,
  colSpan,
  rowSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(
        "border border-[#CDD4E0] bg-white px-2 py-1.5 text-center text-[13px] font-semibold text-slate-800",
        className,
      )}
    >
      {children}
    </th>
  );
}

export default function DetailNplDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex w-[calc(100vw-1rem)] max-w-[760px] flex-col overflow-hidden",
          "max-h-[85vh] sm:w-[760px]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col bg-white">
          <div className="flex shrink-0 items-center justify-between gap-3 px-6 py-4">
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              Detail NPL
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="shrink-0 bg-slate-200" />

          <div className="min-h-0 flex-1 overflow-auto px-5 py-5 sm:px-6">
            <div className="safe-x-scroll rounded-[5px] border border-[#CDD4E0] bg-white">
              <table className="w-full min-w-[680px] border-collapse bg-white">
                <thead>
                  <tr>
                    <HeaderCell rowSpan={2} className="w-[46px]">
                      No
                    </HeaderCell>
                    <HeaderCell colSpan={2}>Cabang</HeaderCell>
                    <HeaderCell colSpan={5}>N P L</HeaderCell>
                  </tr>
                  <tr>
                    <HeaderCell className="w-[52px]">KD</HeaderCell>
                    <HeaderCell className="w-[170px]">Ket.</HeaderCell>
                    <HeaderCell className="w-[92px]">1-30 hr</HeaderCell>
                    <HeaderCell className="w-[92px]">31-60 hr</HeaderCell>
                    <HeaderCell className="w-[92px]">61-90 hr</HeaderCell>
                    <HeaderCell className="w-[92px]">> 91 hr</HeaderCell>
                    <HeaderCell className="w-[92px]">Jumlah</HeaderCell>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r) => (
                    <tr key={r.no} className="bg-white">
                      <Cell align="center">{r.no}</Cell>
                      <Cell>{r.kd}</Cell>
                      <Cell>{r.ket}</Cell>
                      <Cell align="right">{r.npl1_30}</Cell>
                      <Cell align="right">{r.npl31_60}</Cell>
                      <Cell align="right">{r.npl61_90}</Cell>
                      <Cell align="right">{r.npl91}</Cell>
                      <Cell align="right">{r.jumlah}</Cell>
                    </tr>
                  ))}

                  <tr className="bg-white">
                    <Cell colSpan={3} align="left" className="font-semibold">
                      Total
                    </Cell>
                    <Cell align="right" className="font-semibold">
                      9.02
                    </Cell>
                    <Cell align="right" className="font-semibold">
                      3.31
                    </Cell>
                    <Cell align="right" className="font-semibold">
                      2.20
                    </Cell>
                    <Cell align="right" className="font-semibold">
                      8.58
                    </Cell>
                    <Cell align="right" className="font-semibold">
                      23.13
                    </Cell>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Separator className="shrink-0 bg-slate-200" />

          <div className="shrink-0 px-6 py-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex h-[30px] w-[90px] items-center justify-center gap-2 rounded-[6px]",
                  "bg-[#77839A] text-[11px] font-bold tracking-tight text-white",
                  "ring-1 ring-[#77839A]/25 transition hover:bg-[#6b768c]",
                )}
              >
                <X className="h-4 w-4" strokeWidth={3} />
                Tutup
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}