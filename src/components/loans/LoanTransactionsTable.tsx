"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Row = {
  noTransaksi: string;
  rekPinjaman: string;
  rekTabungan: string;
  idNasabah: string;
  namaNasabah: string;
  namaKolektor: string;
  produkPinjaman: string;
  tanggal: string; // dd-mm-yyyy
  jenisTransaksi: string;
  nominal: string;
  denda: string;
};

const seed: Row[] = [
  {
    noTransaksi: "BA/050526/0001",
    rekPinjaman: "12260006",
    rekTabungan: "-",
    idNasabah: "N2400029",
    namaNasabah: "Pangeran Sirait",
    namaKolektor: "Dinda Sudiati",
    produkPinjaman: "Pinjaman Bulanan",
    tanggal: "05-05-2026",
    jenisTransaksi: "Bayar Angsuran",
    nominal: "500.000,00",
    denda: "0,00",
  },
];

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        // lebih rapat lagi kiri-kanan
        "px-1.5 py-3 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900",
        "leading-[1.05] whitespace-nowrap",
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
  align?: "left" | "right" | "center";
}) {
  return (
    <td
      className={cn(
        "px-3 py-3 text-[13px] font-medium text-slate-900",
        "border-t border-slate-200",
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

const filterInputCls =
  "h-9 rounded-[8px] border-slate-300 bg-white text-[13px] font-medium shadow-none";
const filterSelectTriggerCls =
  "h-9 rounded-[8px] border-slate-300 bg-white text-[13px] font-medium shadow-none";

function EntriesPicker({
  pageSize,
  onPageSizeChange,
  className,
}: {
  pageSize: number;
  onPageSizeChange: (n: number) => void;
  className?: string;
}) {
  const triggerCls =
    "h-[34px] w-[76px] rounded-[10px] border-slate-200 bg-white px-2.5 text-[13px] font-semibold text-slate-900 shadow-sm";
  return (
    <div className={cn("flex items-center gap-3 text-[13px] text-slate-900", className)}>
      <span className="font-medium">Tampilkan</span>
      <Select value={String(pageSize)} onValueChange={(v) => onPageSizeChange(Number(v))}>
        <SelectTrigger className={triggerCls}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-slate-200">
          {[10, 20, 50, 100].map((n) => (
            <SelectItem key={n} value={String(n)}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="font-medium">entri</span>
    </div>
  );
}

function PaginationMinimal({
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
  const disabledPrev = page <= 1;
  const disabledNext = page >= pageCount;

  const btnBase = cn(
    "text-[13px] font-medium",
    "transition",
    "disabled:opacity-45 disabled:pointer-events-none",
  );

  return (
    <div className={cn("flex items-center gap-10", className)}>
      <button
        type="button"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={disabledPrev}
        className={cn(btnBase, "text-slate-400 hover:text-slate-600")}
      >
        Sebelumnya
      </button>

      <button
        type="button"
        onClick={() => onPage(Math.min(pageCount, page + 1))}
        disabled={disabledNext}
        className={cn(btnBase, "text-slate-400 hover:text-slate-600")}
      >
        Selanjutnya
      </button>
    </div>
  );
}

export default function LoanTransactionsTable({ className }: { className?: string }) {
  const rows = React.useMemo(() => seed, []);

  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  // filter state (prototype)
  const [qNoTransaksi, setQNoTransaksi] = React.useState("");
  const [qRekPinjaman, setQRekPinjaman] = React.useState("");
  const [qRekTabungan, setQRekTabungan] = React.useState("");
  const [qIdNasabah, setQIdNasabah] = React.useState("");
  const [qNamaNasabah, setQNamaNasabah] = React.useState("");
  const [qNamaKolektor, setQNamaKolektor] = React.useState("");
  const [qProduk, setQProduk] = React.useState<string>("Semua");
  const [qTanggal, setQTanggal] = React.useState("05-05-2026");
  const [qJenis, setQJenis] = React.useState<string>("Semua");
  const [qNominal, setQNominal] = React.useState("");
  const [qDenda, setQDenda] = React.useState("");

  const produkOptions = React.useMemo(() => {
    const set = new Set(rows.map((r) => r.produkPinjaman));
    return ["Semua", ...Array.from(set)];
  }, [rows]);

  const jenisOptions = React.useMemo(() => {
    const set = new Set(rows.map((r) => r.jenisTransaksi));
    return ["Semua", ...Array.from(set)];
  }, [rows]);

  const filtered = React.useMemo(() => {
    const f = (s: string) => s.trim().toLowerCase();
    const a = f(qNoTransaksi);
    const b = f(qRekPinjaman);
    const c = f(qRekTabungan);
    const d = f(qIdNasabah);
    const e = f(qNamaNasabah);
    const g = f(qNamaKolektor);
    const h = f(qTanggal);
    const i = f(qNominal);
    const j = f(qDenda);

    return rows.filter((r) => {
      const okA = a ? r.noTransaksi.toLowerCase().includes(a) : true;
      const okB = b ? r.rekPinjaman.toLowerCase().includes(b) : true;
      const okC = c ? r.rekTabungan.toLowerCase().includes(c) : true;
      const okD = d ? r.idNasabah.toLowerCase().includes(d) : true;
      const okE = e ? r.namaNasabah.toLowerCase().includes(e) : true;
      const okG = g ? r.namaKolektor.toLowerCase().includes(g) : true;

      const okProduk = qProduk === "Semua" ? true : r.produkPinjaman === qProduk;
      const okJenis = qJenis === "Semua" ? true : r.jenisTransaksi === qJenis;

      const okTanggal = h ? r.tanggal.toLowerCase().includes(h) : true;

      const okNominal = i ? r.nominal.toLowerCase().includes(i) : true;
      const okDenda = j ? r.denda.toLowerCase().includes(j) : true;

      return (
        okA &&
        okB &&
        okC &&
        okD &&
        okE &&
        okG &&
        okProduk &&
        okTanggal &&
        okJenis &&
        okNominal &&
        okDenda
      );
    });
  }, [
    qDenda,
    qIdNasabah,
    qJenis,
    qNamaKolektor,
    qNamaNasabah,
    qNoTransaksi,
    qNominal,
    qProduk,
    qRekPinjaman,
    qRekTabungan,
    qTanggal,
    rows,
  ]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [
    pageSize,
    qNoTransaksi,
    qRekPinjaman,
    qRekTabungan,
    qIdNasabah,
    qNamaNasabah,
    qNamaKolektor,
    qProduk,
    qTanggal,
    qJenis,
    qNominal,
    qDenda,
  ]);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  // diperkecil lagi untuk row filter
  const headerCellPad = "px-1.5 py-3";

  return (
    <div className={cn("mt-6", className)}>
      <div className="overflow-hidden rounded-2xl bg-white">
        <div className="px-3 pt-3">
          <EntriesPicker pageSize={pageSize} onPageSizeChange={setPageSize} />
        </div>

        <div className="safe-x-scroll">
          <table className="w-full min-w-[1320px] border-collapse bg-white">
            <thead className="bg-white">
              <tr>
                <Th className="w-[60px]">No.</Th>
                <Th className="w-[180px]">No. Transaksi</Th>
                <Th className="w-[140px]">Rek. Pinjaman</Th>
                <Th className="w-[140px]">Rek. Tabungan</Th>
                <Th className="w-[140px]">ID Nasabah</Th>
                <Th className="w-[180px]">Nama Nasabah</Th>
                <Th className="w-[180px]">Nama Kolektor</Th>
                <Th className="w-[170px]">Produk Pinjaman</Th>
                <Th className="w-[140px]">Tanggal</Th>
                <Th className="w-[170px]">Jenis Transaksi</Th>
                <Th className="w-[150px] text-right">Nominal</Th>
                <Th className="w-[110px] text-right">Denda</Th>
              </tr>

              <tr className="bg-white">
                <th className={headerCellPad} />
                <th className={headerCellPad}>
                  <Input
                    value={qNoTransaksi}
                    onChange={(e) => setQNoTransaksi(e.target.value)}
                    className={filterInputCls}
                  />
                </th>
                <th className={headerCellPad}>
                  <Input
                    value={qRekPinjaman}
                    onChange={(e) => setQRekPinjaman(e.target.value)}
                    className={filterInputCls}
                  />
                </th>
                <th className={headerCellPad}>
                  <Input
                    value={qRekTabungan}
                    onChange={(e) => setQRekTabungan(e.target.value)}
                    className={filterInputCls}
                  />
                </th>
                <th className={headerCellPad}>
                  <Input
                    value={qIdNasabah}
                    onChange={(e) => setQIdNasabah(e.target.value)}
                    className={filterInputCls}
                  />
                </th>
                <th className={headerCellPad}>
                  <Input
                    value={qNamaNasabah}
                    onChange={(e) => setQNamaNasabah(e.target.value)}
                    className={filterInputCls}
                  />
                </th>
                <th className={headerCellPad}>
                  <Input
                    value={qNamaKolektor}
                    onChange={(e) => setQNamaKolektor(e.target.value)}
                    className={filterInputCls}
                  />
                </th>
                <th className={headerCellPad}>
                  <Select value={qProduk} onValueChange={setQProduk}>
                    <SelectTrigger className={filterSelectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                      {produkOptions.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o === "Semua" ? "-- Semua --" : o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </th>

                <th className={headerCellPad}>
                  <div className="relative">
                    <Input
                      value={qTanggal}
                      onChange={(e) => setQTanggal(e.target.value)}
                      className={cn(
                        filterInputCls,
                        qTanggal ? "pr-12 rounded-r-none" : "",
                      )}
                    />

                    {qTanggal ? (
                      <button
                        type="button"
                        onClick={() => setQTanggal("")}
                        className={cn(
                          "absolute right-0 top-0",
                          "h-9 w-12",
                          "rounded-r-[8px] rounded-l-none",
                          "bg-slate-600 text-white",
                          "ring-1 ring-slate-600/20",
                          "transition hover:bg-slate-700",
                          "text-[18px] leading-none font-semibold",
                        )}
                        aria-label="Clear tanggal"
                        title="Clear"
                      >
                        ×
                      </button>
                    ) : null}
                  </div>
                </th>

                <th className={headerCellPad}>
                  <Select value={qJenis} onValueChange={setQJenis}>
                    <SelectTrigger className={filterSelectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                      {jenisOptions.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o === "Semua" ? "-- Semua --" : o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </th>

                <th className={cn(headerCellPad, "text-right")}>
                  <Input
                    value={qNominal}
                    onChange={(e) => setQNominal(e.target.value)}
                    className={cn(filterInputCls, "text-right")}
                  />
                </th>
                <th className={cn(headerCellPad, "text-right")}>
                  <Input
                    value={qDenda}
                    onChange={(e) => setQDenda(e.target.value)}
                    className={cn(filterInputCls, "text-right")}
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                paged.map((r, idx) => (
                  <tr key={`${r.noTransaksi}-${idx}`} className="bg-white">
                    <Td className="text-slate-900 tabular-nums">
                      {(page - 1) * pageSize + idx + 1}
                    </Td>
                    <Td>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {r.noTransaksi}
                      </a>
                    </Td>
                    <Td className="tabular-nums">{r.rekPinjaman}</Td>
                    <Td className="tabular-nums">{r.rekTabungan}</Td>
                    <Td className="tabular-nums">{r.idNasabah}</Td>
                    <Td>{r.namaNasabah}</Td>
                    <Td>{r.namaKolektor}</Td>
                    <Td>{r.produkPinjaman}</Td>
                    <Td className="tabular-nums whitespace-nowrap">{r.tanggal}</Td>
                    <Td>{r.jenisTransaksi}</Td>
                    <Td align="right" className="font-semibold text-emerald-700">
                      {r.nominal}
                    </Td>
                    <Td align="right" className="text-rose-600">
                      {r.denda}
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 px-3 py-4 md:flex-row md:items-center md:justify-between">
          <div className="text-[13px] font-medium text-slate-900">
            Menampilkan {showingStart} sampai {showingEnd} dari {filtered.length} entri
          </div>

          <PaginationMinimal page={page} pageCount={pageCount} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}