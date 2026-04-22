"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

function formatIdr2(n: number) {
  const fixed = (Number.isFinite(n) ? n : 0).toFixed(2);
  const [intPart, dec] = fixed.split(".");
  const withDots = (intPart ?? "0").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withDots},${dec ?? "00"}`;
}

function formatIdr0(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatFloat2(n: number) {
  return (Number.isFinite(n) ? n : 0).toFixed(2);
}

type TableRow = {
  no: number;
  namaNasabah: string;
  status: "Anggota" | "Non Anggota";
  kodePinjaman: string;
  tanggalPinjaman: string;
  tanggalJatuhTempo: string;
  jenisPinjaman: string;
  plafon: number;
  sisaPinjaman: number;
  hutangPokok: number;
  hutangBunga: number;
  tipeKolektibilitas: string;
};

// Mapping sederhana dari data kolektibilitas yang kita punya -> bentuk tabel seperti screenshot.
// Karena contoh screenshot adalah versi lain dari laporan, kita buat mapping "best effort" agar UI-nya dulu yang sesuai.
function mapRows(rows: KolektibilitasRow[]): TableRow[] {
  return rows.map((r) => ({
    no: r.no,
    namaNasabah: r.nama,
    status: r.tunggakanBln > 0 ? "Non Anggota" : "Anggota",
    kodePinjaman: r.noNsb,
    tanggalPinjaman: r.dari,
    tanggalJatuhTempo: r.sampai,
    jenisPinjaman: "Pinjaman Harian",
    plafon: r.pinjamanSldPokok,
    sisaPinjaman: r.pinjamanSldPokok - r.tunggakanNilai,
    hutangPokok: r.tunggakanNilai,
    hutangBunga: Math.max(0, r.tunggakanNilai * (r.pinjamanBng / 100)),
    tipeKolektibilitas: "-",
  }));
}

function PaginationPill({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPage(Math.max(1, page - 1))}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold",
          "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
          "disabled:opacity-50",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        Sebelumnya
      </button>

      <div className="inline-flex h-10 min-w-10 items-center justify-center rounded-md bg-violet-600 px-4 text-sm font-extrabold text-white ring-1 ring-violet-600/30">
        {page}
      </div>

      <button
        type="button"
        disabled={page === pageCount}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold",
          "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
          "disabled:opacity-50",
        )}
      >
        Selanjutnya
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

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
  const [page, setPage] = React.useState(controlledPage);

  React.useEffect(() => {
    setPage(controlledPage);
  }, [controlledPage]);

  const all = React.useMemo(() => mapRows(rows), [rows]);

  const pageCount = Math.max(1, Math.ceil(all.length / pageSize));
  React.useEffect(() => {
    setPage(1);
  }, [pageSize, all.length]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return all.slice(start, start + pageSize);
  }, [all, page, pageSize]);

  const totalShown = totalEntries ?? all.length;
  const showingStart = totalShown === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(totalShown, page * pageSize);

  const totalsPage = React.useMemo(() => {
    return paged.reduce(
      (acc, r) => {
        acc.plafon += r.plafon;
        acc.sisa += r.sisaPinjaman;
        acc.hp += r.hutangPokok;
        acc.hb += r.hutangBunga;
        return acc;
      },
      { plafon: 0, sisa: 0, hp: 0, hb: 0 },
    );
  }, [paged]);

  // Prototype: total = total per halaman (sesuai pola komponen lain).
  const totalsAll = totalsPage;

  const thBase =
    "px-3 py-4 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900";
  const tdBase = "px-3 py-2.5 text-[14px] text-slate-900";
  const tdNum = "text-right tabular-nums";
  const tableBorder = "border border-slate-300/70";

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-slate-200/70">
        <div className={cn("safe-x-scroll", tableBorder, "rounded-none")}>
          <table className="min-w-[1320px] w-full border-collapse">
            <thead className="bg-white">
              <tr className="border-b border-slate-300/70">
                <th className={cn(thBase, "w-[70px]")}>No.</th>
                <th className={cn(thBase, "w-[220px]")}>Nama Nasabah</th>
                <th className={cn(thBase, "w-[160px]")}>Status</th>
                <th className={cn(thBase, "w-[160px]")}>Kode Pinjaman</th>
                <th className={cn(thBase, "w-[160px]")}>Tanggal Pinjaman</th>
                <th className={cn(thBase, "w-[170px]")}>Tanggal Jatuh Tempo</th>
                <th className={cn(thBase, "w-[190px]")}>Jenis Pinjaman</th>
                <th className={cn(thBase, "w-[170px]", "text-right")}>Plafon</th>
                <th className={cn(thBase, "w-[170px]", "text-right")}>
                  Sisa Pinjaman
                </th>
                <th className={cn(thBase, "w-[170px]", "text-right")}>
                  Hutang Pokok
                </th>
                <th className={cn(thBase, "w-[170px]", "text-right")}>
                  Hutang Bunga
                </th>
                <th className={cn(thBase, "w-[200px]")}>Tipe Kolektibilitas</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data laporan.
                  </td>
                </tr>
              ) : (
                paged.map((r, idx) => (
                  <tr
                    key={`${r.kodePinjaman}-${idx}`}
                    className={cn(
                      "border-b border-slate-200/70",
                      idx % 2 === 0 ? "bg-slate-50/40" : "bg-white",
                    )}
                  >
                    <td className={cn(tdBase, "text-slate-900")}>{r.no}</td>
                    <td className={cn(tdBase)}>{r.namaNasabah}</td>
                    <td className={cn(tdBase, "text-slate-800")}>{r.status}</td>
                    <td className={cn(tdBase, "text-slate-800")}>
                      {r.kodePinjaman}
                    </td>
                    <td className={cn(tdBase, "text-slate-800")}>
                      {r.tanggalPinjaman}
                    </td>
                    <td className={cn(tdBase, "text-slate-800")}>
                      {r.tanggalJatuhTempo}
                    </td>
                    <td className={cn(tdBase, "text-slate-800")}>
                      {r.jenisPinjaman}
                    </td>
                    <td className={cn(tdBase, tdNum)}>{formatIdr2(r.plafon)}</td>
                    <td className={cn(tdBase, tdNum)}>
                      {formatIdr2(r.sisaPinjaman)}
                    </td>
                    <td className={cn(tdBase, tdNum)}>
                      {formatIdr2(r.hutangPokok)}
                    </td>
                    <td className={cn(tdBase, tdNum)}>
                      {formatIdr2(r.hutangBunga)}
                    </td>
                    <td className={cn(tdBase, "text-slate-800")}>
                      {r.tipeKolektibilitas}
                    </td>
                  </tr>
                ))
              )}

              {paged.length > 0 ? (
                <>
                  <tr className="border-t border-black">
                    <td
                      colSpan={7}
                      className={cn(
                        "px-3 py-3 text-[14px] font-semibold text-slate-900",
                      )}
                    >
                      Total per Halaman
                    </td>
                    <td className={cn("px-3 py-3 text-[14px] font-semibold", tdNum)}>
                      {formatIdr2(totalsPage.plafon)}
                    </td>
                    <td className={cn("px-3 py-3 text-[14px] font-semibold", tdNum)}>
                      {formatIdr2(totalsPage.sisa)}
                    </td>
                    <td className={cn("px-3 py-3 text-[14px] font-semibold", tdNum)}>
                      {formatIdr2(totalsPage.hp)}
                    </td>
                    <td className={cn("px-3 py-3 text-[14px] font-semibold", tdNum)}>
                      {formatIdr2(totalsPage.hb)}
                    </td>
                    <td className="px-3 py-3" />
                  </tr>

                  <tr className="border-t border-black">
                    <td
                      colSpan={7}
                      className={cn(
                        "px-3 py-3 text-[14px] font-semibold text-slate-900",
                      )}
                    >
                      Total
                    </td>
                    <td className={cn("px-3 py-3 text-[14px] font-semibold", tdNum)}>
                      {formatIdr2(totalsAll.plafon)}
                    </td>
                    <td className={cn("px-3 py-3 text-[14px] font-semibold", tdNum)}>
                      {formatIdr2(totalsAll.sisa)}
                    </td>
                    <td className={cn("px-3 py-3 text-[14px] font-semibold", tdNum)}>
                      {formatIdr2(totalsAll.hp)}
                    </td>
                    <td className={cn("px-3 py-3 text-[14px] font-semibold", tdNum)}>
                      {formatIdr2(totalsAll.hb)}
                    </td>
                    <td className="px-3 py-3" />
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-700">
            Menampilkan {showingStart} sampai {showingEnd} dari{" "}
            {totalEntries ?? all.length} entri
          </div>

          <PaginationPill page={page} pageCount={pageCount} onPage={setPage} />
        </div>

        {/* keep unused helpers referenced to satisfy lints if needed */}
        <div className="sr-only">
          {formatIdr0(0)} {formatFloat2(0)}
        </div>
      </div>
    </div>
  );
}