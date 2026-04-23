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
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatFloat2(n: number) {
  return (Number.isFinite(n) ? n : 0).toFixed(2);
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
        "border border-slate-300/70 bg-white px-3 py-3 align-middle",
        "text-[12px] font-extrabold uppercase tracking-wide text-slate-900",
        align === "center"
          ? "text-center"
          : align === "right"
            ? "text-right"
            : "text-left",
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
  title,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  title?: string;
}) {
  return (
    <td
      title={title}
      className={cn(
        "border border-slate-200/70 px-3 py-2.5 align-top",
        "text-[14px] font-normal text-slate-900",
        align === "center"
          ? "text-center"
          : align === "right"
            ? "text-right tabular-nums"
            : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

function PaginationLikeExample({
  page,
  pageCount,
  onPage,
  className,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
  className?: string;
}) {
  // Selalu tampil, meski 1 halaman (sesuai kebutuhan UI contoh)
  const disabledPrev = page <= 1;
  const disabledNext = page >= pageCount;

  const navBtn = (disabled: boolean) =>
    cn(
      "h-10 px-4 text-sm font-semibold",
      "bg-slate-100 text-slate-400",
      disabled ? "opacity-70" : "text-slate-600 hover:bg-slate-200",
    );

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <button
        type="button"
        className={cn("rounded-none", navBtn(disabledPrev))}
        disabled={disabledPrev}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

      <div className="inline-flex h-10 min-w-10 items-center justify-center bg-violet-600 px-4 text-sm font-extrabold text-white">
        {page}
      </div>

      <button
        type="button"
        className={cn("rounded-none", navBtn(disabledNext))}
        disabled={disabledNext}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}

const colW = {
  no: "w-[60px]",
  noNsb: "w-[140px]",

  nama: "w-[220px]",
  status: "w-[140px]",

  alamat: "w-[170px]",

  // Kolom tambahan UI sesuai request
  kodePinjaman: "w-[150px]",
  tanggalPinjaman: "w-[150px]",
  tanggalJatuhTempo: "w-[170px]",
  jenisPinjaman: "w-[170px]",
  plafon: "w-[160px]",

  aoId: "w-[90px]",

  jwBln: "w-[70px]",
  jwDari: "w-[130px]",
  jwSampai: "w-[130px]",

  pinPokok: "w-[130px]",
  pinBng: "w-[90px]",

  angPerBln: "w-[130px]",
  angSdhHr: "w-[90px]",

  // Tunggakan
  tBln: "w-[90px]",
  tNilai: "w-[160px]",
  t1_30: "w-[140px]",
  t31_60: "w-[140px]",
  t61_90: "w-[140px]",
  t90p: "w-[140px]",

  // Tambahan setelah tunggakan
  sisaPinjaman: "w-[160px]",
  hutangPokok: "w-[150px]",
  hutangBunga: "w-[150px]",

  // UBAH: sedikit dilebarkan biar header muat 1 baris
  kolektibilitas: "w-[190px]",
};

type KolektibilitasLabel = "Macet" | "Lancar" | "Diragukan" | "Kurang Lancar";

function deriveKolektibilitas(r: KolektibilitasRow): KolektibilitasLabel {
  // Aturan sederhana berbasis tunggakan bulan (prototype)
  if (r.tunggakanBln >= 4) return "Macet";
  if (r.tunggakanBln === 3) return "Diragukan";
  if (r.tunggakanBln === 2) return "Kurang Lancar";
  return "Lancar";
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
  const [page, setPage] = React.useState<number>(controlledPage);

  React.useEffect(() => {
    setPage(controlledPage);
  }, [controlledPage]);

  const totalEntriesResolved = totalEntries ?? rows.length;

  // Penting: pageCount dihitung dari totalEntries (agar pagination muncul walau rows masih seed)
  const pageCount = Math.max(1, Math.ceil(totalEntriesResolved / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, rows.length, totalEntriesResolved]);

  // Prototype: data per halaman belum terhubung ke backend.
  // Untuk sekarang, kita tetap render "rows" yang diberikan.
  const paged = React.useMemo(() => rows, [rows]);

  const showingStart =
    totalEntriesResolved === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(totalEntriesResolved, page * pageSize);

  const totalsPage = React.useMemo(() => {
    return paged.reduce(
      (acc, r) => {
        acc.pokok += r.pinjamanSldPokok;

        acc.nilai += r.tunggakanNilai;
        acc.t1_30 += r.tunggakan1_30;
        acc.t31_60 += r.tunggakan31_60;
        acc.t61_90 += r.tunggakan61_90;
        acc.t90p += r.tunggakan90p;

        // dummy totals untuk kolom tambahan UI (agar total row tetap rapi)
        acc.sisa += Math.max(0, r.pinjamanSldPokok - r.tunggakanNilai);
        acc.hutangPokok += Math.max(0, Math.round(r.tunggakanNilai * 0.35));
        acc.hutangBunga += Math.max(0, Math.round(r.tunggakanNilai * 0.15));

        return acc;
      },
      {
        pokok: 0,
        nilai: 0,
        t1_30: 0,
        t31_60: 0,
        t61_90: 0,
        t90p: 0,
        sisa: 0,
        hutangPokok: 0,
        hutangBunga: 0,
      },
    );
  }, [paged]);

  const totalsAll = totalsPage;

  const totalRowLabelClass =
    "border border-slate-200/70 px-3 py-3 text-[14px] font-extrabold text-slate-900";
  const totalRowNumberClass =
    "border border-slate-200/70 px-3 py-3 text-right text-[14px] font-extrabold tabular-nums text-slate-900";

  // Total jumlah kolom pada tbody (harus sinkron untuk colSpan empty state)
  const totalColumns =
    1 /*No*/ +
    1 /*NO.REKENING*/ +
    1 /*Nama*/ +
    1 /*Status*/ +
    1 /*Alamat*/ +
    1 /*Kode Pinjaman*/ +
    1 /*Tanggal Pinjaman*/ +
    1 /*Tanggal Jatuh Tempo*/ +
    1 /*Jenis Pinjaman*/ +
    1 /*Plafon*/ +
    1 /*AO ID*/ +
    3 /*Jangka Waktu*/ +
    2 /*Pinjaman*/ +
    2 /*Angsuran*/ +
    6 /*Tunggakan*/ +
    3 /*Tambahan setelah tunggakan*/ +
    1; /*Kolektiblilitas*/

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-slate-200/70">
        <div
          className={cn("safe-x-scroll", "rounded-none border border-slate-300/70")}
        >
          <table className="min-w-[2860px] w-full border-collapse bg-white">
            <thead className="bg-white">
              <tr>
                <Th rowSpan={2} className={colW.no}>
                  No.
                </Th>

                <Th rowSpan={2} className={colW.noNsb}>
                  NO.REKENING
                </Th>

                <Th rowSpan={2} className={colW.nama}>
                  Nama
                </Th>

                <Th rowSpan={2} className={colW.status} align="center">
                  Status
                </Th>

                <Th rowSpan={2} className={colW.alamat}>
                  Alamat
                </Th>

                <Th rowSpan={2} className={colW.kodePinjaman} align="left">
                  Kode Pinjaman
                </Th>

                <Th rowSpan={2} className={colW.tanggalPinjaman} align="left">
                  Tanggal Pinjaman
                </Th>

                <Th rowSpan={2} className={colW.tanggalJatuhTempo} align="left">
                  Tanggal Jatuh Tempo
                </Th>

                <Th rowSpan={2} className={colW.jenisPinjaman} align="left">
                  Jenis Pinjaman
                </Th>

                <Th rowSpan={2} className={colW.plafon} align="left">
                  Plafon
                </Th>

                <Th rowSpan={2} className={colW.aoId} align="left">
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

                <Th rowSpan={2} className={colW.sisaPinjaman} align="left">
                  Sisa Pinjaman
                </Th>
                <Th rowSpan={2} className={colW.hutangPokok} align="left">
                  Hutang Pokok
                </Th>
                <Th rowSpan={2} className={colW.hutangBunga} align="left">
                  Hutang Bunga
                </Th>

                {/* UBAH: nowrap biar 1 baris */}
                <Th
                  rowSpan={2}
                  className={cn(colW.kolektibilitas, "whitespace-nowrap")}
                  align="left"
                >
                  Kolektiblilitas
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
                  {"\u003E"} 90 Hr
                </Th>
              </tr>
            </thead>

            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={totalColumns}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data laporan.
                  </td>
                </tr>
              ) : (
                paged.map((r, idx) => {
                  const kolek = deriveKolektibilitas(r);

                  const status = idx % 5 === 0 ? "Calon" : "Anggota";
                  const kodePinjaman = `KP-${String(r.no).padStart(3, "0")}`;
                  const tanggalPinjaman = r.dari;
                  const tanggalJatuhTempo = r.sampai;
                  const jenisPinjaman =
                    idx % 2 === 0 ? "Pinjaman Bulanan" : "Pinjaman Harian";
                  const plafon = r.pinjamanSldPokok + 1500000;

                  const sisaPinjaman = Math.max(
                    0,
                    r.pinjamanSldPokok - r.tunggakanNilai,
                  );
                  const hutangPokok = Math.max(
                    0,
                    Math.round(r.tunggakanNilai * 0.35),
                  );
                  const hutangBunga = Math.max(
                    0,
                    Math.round(r.tunggakanNilai * 0.15),
                  );

                  return (
                    <tr
                      key={`${r.noNsb}-${idx}`}
                      className={cn(
                        idx % 2 === 0 ? "bg-slate-50/40" : "bg-white",
                      )}
                    >
                      <Td className={colW.no} align="center">
                        {r.no}
                      </Td>

                      <Td className={cn(colW.noNsb, "whitespace-nowrap")}>
                        {r.noNsb}
                      </Td>

                      <Td className={cn(colW.nama, "whitespace-nowrap")}>
                        {r.nama}
                      </Td>

                      <Td className={colW.status} align="center">
                        {status}
                      </Td>

                      <Td className={cn(colW.alamat, "truncate")} title={r.alamat}>
                        {r.alamat}
                      </Td>

                      <Td
                        className={cn(colW.kodePinjaman, "whitespace-nowrap text-left")}
                        align="left"
                      >
                        {kodePinjaman}
                      </Td>

                      <Td
                        className={cn(colW.tanggalPinjaman, "whitespace-nowrap text-left")}
                        align="left"
                      >
                        {tanggalPinjaman}
                      </Td>

                      <Td
                        className={cn(
                          colW.tanggalJatuhTempo,
                          "whitespace-nowrap text-left",
                        )}
                        align="left"
                      >
                        {tanggalJatuhTempo}
                      </Td>

                      <Td
                        className={cn(colW.jenisPinjaman, "whitespace-nowrap text-left")}
                        align="left"
                      >
                        {jenisPinjaman}
                      </Td>

                      <Td className={cn(colW.plafon, "whitespace-nowrap text-left")} align="left">
                        {formatIdr0(plafon)}
                      </Td>

                      <Td className={cn(colW.aoId, "whitespace-nowrap text-left")} align="left">
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

                      <Td className={colW.sisaPinjaman} align="right">
                        {formatIdr0(sisaPinjaman)}
                      </Td>
                      <Td className={colW.hutangPokok} align="right">
                        {formatIdr0(hutangPokok)}
                      </Td>
                      <Td className={colW.hutangBunga} align="right">
                        {formatIdr0(hutangBunga)}
                      </Td>

                      <Td
                        className={cn(colW.kolektibilitas, "font-semibold")}
                        align="center"
                      >
                        {kolek}
                      </Td>
                    </tr>
                  );
                })
              )}

              {paged.length > 0 ? (
                <tr className="border-t border-black">
                  <td colSpan={16} className={totalRowLabelClass}>
                    Total per Halaman
                  </td>

                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.pokok)}
                  </td>

                  <td className="border border-slate-200/70 px-3 py-3" />

                  <td colSpan={2} className="border border-slate-200/70 px-3 py-3" />

                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.nilai)}
                  </td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.t1_30)}
                  </td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.t31_60)}
                  </td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.t61_90)}
                  </td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.t90p)}
                  </td>

                  <td className={totalRowNumberClass}>{formatIdr0(totalsPage.sisa)}</td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.hutangPokok)}
                  </td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsPage.hutangBunga)}
                  </td>

                  <td className="border border-slate-200/70 px-3 py-3" />
                </tr>
              ) : null}

              {paged.length > 0 ? (
                <tr className="border-t border-black">
                  <td colSpan={16} className={totalRowLabelClass}>
                    Total
                  </td>

                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsAll.pokok)}
                  </td>

                  <td className="border border-slate-200/70 px-3 py-3" />

                  <td colSpan={2} className="border border-slate-200/70 px-3 py-3" />

                  <td className={totalRowNumberClass}>{formatIdr0(totalsAll.nilai)}</td>
                  <td className={totalRowNumberClass}>{formatIdr0(totalsAll.t1_30)}</td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsAll.t31_60)}
                  </td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsAll.t61_90)}
                  </td>
                  <td className={totalRowNumberClass}>{formatIdr0(totalsAll.t90p)}</td>

                  <td className={totalRowNumberClass}>{formatIdr0(totalsAll.sisa)}</td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsAll.hutangPokok)}
                  </td>
                  <td className={totalRowNumberClass}>
                    {formatIdr0(totalsAll.hutangBunga)}
                  </td>

                  <td className="border border-slate-200/70 px-3 py-3" />
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-700">
            Menampilkan {showingStart} sampai {showingEnd} dari{" "}
            {totalEntriesResolved} entri
          </div>

          <PaginationLikeExample page={page} pageCount={pageCount} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}