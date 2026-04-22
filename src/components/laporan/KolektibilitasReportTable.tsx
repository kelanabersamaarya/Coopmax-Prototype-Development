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
};

function formatIdr0(n: number) {
  const rounded = Math.round(n);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatFloat2(n: number) {
  return n.toFixed(2);
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
        "border border-slate-200 bg-slate-50 px-3 py-2 align-middle",
        "text-[11px] font-extrabold uppercase tracking-wide text-slate-600",
        align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left",
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
        "border border-slate-200 px-3 py-2 align-top",
        "text-[13px] text-slate-800",
        align === "center" ? "text-center" : align === "right" ? "text-right tabular-nums" : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

const colW = {
  no: "w-[60px]",
  noNsb: "w-[110px]",
  nama: "w-[170px]",
  alamat: "w-[230px]",
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
  page = 1,
  totalEntries,
  className,
}: {
  rows: KolektibilitasRow[];
  pageSize?: number;
  page?: number;
  totalEntries?: number;
  className?: string;
}) {
  const pageTotalEntries = totalEntries ?? rows.length;

  const totalsPage = React.useMemo(() => {
    return rows.reduce(
      (acc, r) => {
        acc.pokok += r.pinjamanSldPokok;
        acc.nilai += r.tunggakanNilai;
        return acc;
      },
      { pokok: 0, nilai: 0 },
    );
  }, [rows]);

  // Prototype total global: jika totalEntries diberikan dan lebih besar, kita tampilkan total sama dengan total per halaman.
  // Nanti saat data beneran datang dari backend, bisa ganti dengan total global dari API.
  const totalsAll = totalsPage;

  const showingStart = pageTotalEntries === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(pageTotalEntries, page * pageSize);

  return (
    <div className={cn("mt-6", className)}>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/60 shadow-sm backdrop-blur">
        <div className="safe-x-scroll">
          <table className="min-w-[1700px] w-full border-collapse">
            <thead className="sticky top-0 z-10">
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
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={18}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data laporan.
                  </td>
                </tr>
              ) : (
                rows.map((r, idx) => (
                  <tr
                    key={`${r.noNsb}-${idx}`}
                    className={cn(
                      "text-sm",
                      idx % 2 === 0 ? "bg-white/70" : "bg-slate-50/60",
                    )}
                  >
                    <Td className={colW.no} align="center">
                      {r.no}
                    </Td>
                    <Td className={colW.noNsb}>
                      <span className="font-semibold text-slate-900">
                        {r.noNsb}
                      </span>
                    </Td>
                    <Td className={colW.nama}>
                      <div className="font-semibold text-slate-900">{r.nama}</div>
                    </Td>
                    <Td className={colW.alamat}>
                      <div className="text-slate-700">{r.alamat}</div>
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

              {/* TOTAL PER HALAMAN */}
              {rows.length > 0 ? (
                <tr className="bg-emerald-50/60">
                  <td colSpan={8} className="border border-slate-200 px-3 py-2.5">
                    <div className="text-[12px] font-extrabold uppercase tracking-wide text-slate-700">
                      Total per Halaman
                    </div>
                  </td>
                  <td className="border border-slate-200 px-3 py-2.5 text-right text-[13px] font-extrabold tabular-nums text-slate-900">
                    {formatIdr0(totalsPage.pokok)}
                  </td>
                  <td className="border border-slate-200 px-3 py-2.5" />
                  <td colSpan={3} className="border border-slate-200 px-3 py-2.5" />
                  <td className="border border-slate-200 px-3 py-2.5 text-right text-[13px] font-extrabold tabular-nums text-slate-900">
                    {formatIdr0(totalsPage.nilai)}
                  </td>
                  <td colSpan={4} className="border border-slate-200 px-3 py-2.5" />
                </tr>
              ) : null}

              {/* TOTAL */}
              {rows.length > 0 ? (
                <tr className="bg-emerald-100/60">
                  <td colSpan={8} className="border border-slate-200 px-3 py-2.5">
                    <div className="text-[12px] font-extrabold uppercase tracking-wide text-slate-700">
                      Total
                    </div>
                  </td>
                  <td className="border border-slate-200 px-3 py-2.5 text-right text-[13px] font-extrabold tabular-nums text-slate-900">
                    {formatIdr0(totalsAll.pokok)}
                  </td>
                  <td className="border border-slate-200 px-3 py-2.5" />
                  <td colSpan={3} className="border border-slate-200 px-3 py-2.5" />
                  <td className="border border-slate-200 px-3 py-2.5 text-right text-[13px] font-extrabold tabular-nums text-slate-900">
                    {formatIdr0(totalsAll.nilai)}
                  </td>
                  <td colSpan={4} className="border border-slate-200 px-3 py-2.5" />
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 text-xs font-medium text-slate-600">
          Menampilkan {showingStart} sampai {showingEnd} dari {pageTotalEntries}{" "}
          entri
        </div>
      </div>
    </div>
  );
}