"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import SortableHeaderLabel from "@/components/laporan/SortableHeaderLabel";

type DetailPinjamanRow = {
  no: number;
  noRekening: string;
  idNasabah: string;
  namaNasabah: string;
  alamat: string;
  statusNasabah: string;
  jenisPinjaman: string;
  tanggalPinjaman: string;
  tanggalJatuhTempo: string;
  kolektor: string;
  jangkaWaktu: string;
  bunga: string;
  plafon: string;
  sisaPokok: string;
  sisaBunga: string;
  angsuranPokok: string;
  angsuranBunga: string;
  statusPinjaman: string;
};

const rows: DetailPinjamanRow[] = [
  {
    no: 1,
    noRekening: "SMG260004",
    idNasabah: "N2600006",
    namaNasabah: "Bapak Bagus",
    alamat: "Sidakarya",
    statusNasabah: "Anggota",
    jenisPinjaman: "Pinjaman Billing",
    tanggalPinjaman: "07-04-2026",
    tanggalJatuhTempo: "07-04-2027",
    kolektor: "Gina Farida M.M.",
    jangkaWaktu: "12 Bulan",
    bunga: "12.00%",
    plafon: "12.000.000,00",
    sisaPokok: "10.553.571,00",
    sisaBunga: "1.266.429,00",
    angsuranPokok: "1.000.000,00",
    angsuranBunga: "120.000,00",
    statusPinjaman: "Aktif / Sudah Dicairkan",
  },
  {
    no: 2,
    noRekening: "klpk04.07260001",
    idNasabah: "N2500009",
    namaNasabah: "Indah Sari",
    alamat: "Jl. Galang",
    statusNasabah: "Non Anggota",
    jenisPinjaman: "Pinjaman Bulanan 1",
    tanggalPinjaman: "10-02-2026",
    tanggalJatuhTempo: "10-02-2027",
    kolektor: "Kolektor A",
    jangkaWaktu: "12 Bulan",
    bunga: "11.50%",
    plafon: "10.000.000,00",
    sisaPokok: "8.645.833,33",
    sisaBunga: "950.000,00",
    angsuranPokok: "833.333,00",
    angsuranBunga: "95.833,00",
    statusPinjaman: "Aktif / Sudah Dicairkan",
  },
  {
    no: 3,
    noRekening: "12260006",
    idNasabah: "N2400029",
    namaNasabah: "Pangeran Sirait",
    alamat: "Sidakarya",
    statusNasabah: "Non Anggota",
    jenisPinjaman: "Pinjaman Bulanan",
    tanggalPinjaman: "30-04-2026",
    tanggalJatuhTempo: "30-04-2027",
    kolektor: "Dinda Sudiati",
    jangkaWaktu: "12 Bulan",
    bunga: "24.00%",
    plafon: "2.000.000,00",
    sisaPokok: "1.040.000,00",
    sisaBunga: "240.000,00",
    angsuranPokok: "166.700,00",
    angsuranBunga: "40.000,00",
    statusPinjaman: "Aktif / Sudah Dicairkan",
  },
  {
    no: 4,
    noRekening: "072260001",
    idNasabah: "N2400033",
    namaNasabah: "Rika Wastuti",
    alamat: "Jl. Kenanga No. 12",
    statusNasabah: "Anggota",
    jenisPinjaman: "Pinjaman Harian",
    tanggalPinjaman: "31-03-2026",
    tanggalJatuhTempo: "30-09-2026",
    kolektor: "Kolektor B",
    jangkaWaktu: "18 Bulan",
    bunga: "20.00%",
    plafon: "22.000.000,00",
    sisaPokok: "22.000.000,00",
    sisaBunga: "1.800.000,00",
    angsuranPokok: "650.000,00",
    angsuranBunga: "183.333,00",
    statusPinjaman: "Macet",
  },
];

function parseIdrLike(input: string) {
  const normalized = input.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatIdr2(value: number) {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function GroupTh({
  children,
  colSpan,
  rowSpan,
  className,
}: {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(
        "border-b border-r border-t border-slate-300/80 bg-white px-2 py-3 align-middle",
        "text-center text-[11px] font-extrabold uppercase tracking-wide text-slate-800",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Th({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      className={cn(
        "border-b border-r border-slate-300/80 bg-white px-2 py-3 align-middle",
        "text-[11px] font-extrabold uppercase tracking-wide text-slate-800",
        align === "right"
          ? "text-right"
          : align === "center"
            ? "text-center"
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
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <td
      className={cn(
        "border-b border-r border-slate-200 px-2 py-2 align-top",
        "text-[12px] font-medium text-slate-900",
        align === "right"
          ? "whitespace-nowrap text-right tabular-nums"
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

function TotalRow({
  label,
  totals,
}: {
  label: string;
  totals: {
    plafon: number;
    sisaPokok: number;
    sisaBunga: number;
    angsuranPokok: number;
    angsuranBunga: number;
  };
}) {
  return (
    <tr className="border-t border-black bg-white">
      <td
        colSpan={12}
        className="border-b border-r border-slate-300/80 px-2 py-2.5 text-[12px] font-extrabold text-slate-900"
      >
        {label}
      </td>
      <td className="border-b border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-extrabold text-slate-900 tabular-nums">
        {formatIdr2(totals.plafon)}
      </td>
      <td className="border-b border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-extrabold text-slate-900 tabular-nums">
        {formatIdr2(totals.sisaPokok)}
      </td>
      <td className="border-b border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-extrabold text-slate-900 tabular-nums">
        {formatIdr2(totals.sisaBunga)}
      </td>
      <td className="border-b border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-extrabold text-slate-900 tabular-nums">
        {formatIdr2(totals.angsuranPokok)}
      </td>
      <td className="border-b border-r border-slate-300/80 px-2 py-2.5 text-right text-[12px] font-extrabold text-slate-900 tabular-nums">
        {formatIdr2(totals.angsuranBunga)}
      </td>
      <td className="border-b border-r border-slate-300/80 px-2 py-2.5" />
    </tr>
  );
}

function PaginationBar() {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
      <button
        type="button"
        disabled
        className="h-10 px-4 text-[14px] font-semibold text-slate-400"
      >
        Sebelumnya
      </button>
      <div className="grid h-10 w-10 place-items-center bg-violet-600 text-[14px] font-extrabold text-white">
        1
      </div>
      <button
        type="button"
        disabled
        className="h-10 px-4 text-[14px] font-semibold text-slate-400"
      >
        Selanjutnya
      </button>
    </div>
  );
}

export default function DetailPinjamanReportTable({
  className,
}: {
  className?: string;
}) {
  const totals = React.useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.plafon += parseIdrLike(row.plafon);
        acc.sisaPokok += parseIdrLike(row.sisaPokok);
        acc.sisaBunga += parseIdrLike(row.sisaBunga);
        acc.angsuranPokok += parseIdrLike(row.angsuranPokok);
        acc.angsuranBunga += parseIdrLike(row.angsuranBunga);
        return acc;
      },
      {
        plafon: 0,
        sisaPokok: 0,
        sisaBunga: 0,
        angsuranPokok: 0,
        angsuranBunga: 0,
      },
    );
  }, []);

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-[5px] border border-slate-200/70 bg-white/90 p-3 shadow-sm backdrop-blur md:p-4">
        <div className="overflow-hidden rounded-[5px] bg-white ring-1 ring-slate-200">
          <div className="safe-x-scroll">
            <table className="w-full min-w-[2050px] border-collapse border-l border-slate-300/80 bg-white">
              <thead className="bg-white">
                <tr>
                  <GroupTh rowSpan={2} className="w-[48px] text-left">
                    No.
                  </GroupTh>
                  <GroupTh colSpan={6}>Informasi Nasabah</GroupTh>
                  <GroupTh colSpan={5}>Informasi Pinjaman</GroupTh>
                  <GroupTh colSpan={5}>Nominal Pinjaman</GroupTh>
                  <GroupTh rowSpan={2} className="w-[170px] text-left">
                    Status
                  </GroupTh>
                </tr>

                <tr>
                  <Th className="w-[130px]">
                    <SortableHeaderLabel lines={["No.", "Rekening"]} />
                  </Th>
                  <Th className="w-[120px]">
                    <SortableHeaderLabel lines={["ID", "Nasabah"]} />
                  </Th>
                  <Th className="w-[165px]">
                    <SortableHeaderLabel lines={["Nama", "Nasabah"]} />
                  </Th>
                  <Th className="w-[170px]">
                    <SortableHeaderLabel lines={["Alamat"]} />
                  </Th>
                  <Th className="w-[115px]">
                    <SortableHeaderLabel lines={["Status", "Nasabah"]} />
                  </Th>
                  <Th className="w-[165px]">
                    <SortableHeaderLabel lines={["Jenis", "Pinjaman"]} />
                  </Th>

                  <Th className="w-[120px]">
                    <SortableHeaderLabel lines={["Tanggal", "Pinjaman"]} />
                  </Th>
                  <Th className="w-[130px]">
                    <SortableHeaderLabel lines={["Tanggal", "Jatuh Tempo"]} />
                  </Th>
                  <Th className="w-[145px]">
                    <SortableHeaderLabel lines={["Kolektor"]} />
                  </Th>
                  <Th className="w-[105px]">Jangka Waktu</Th>
                  <Th className="w-[90px]" align="right">
                    Bunga
                  </Th>

                  <Th className="w-[140px]" align="right">
                    Plafon
                  </Th>
                  <Th className="w-[150px]" align="right">
                    Sisa Pokok
                  </Th>
                  <Th className="w-[150px]" align="right">
                    Sisa Bunga
                  </Th>
                  <Th className="w-[150px]" align="right">
                    Angsuran Pokok
                  </Th>
                  <Th className="w-[150px]" align="right">
                    Angsuran Bunga
                  </Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {rows.map((row, idx) => (
                  <tr
                    key={row.noRekening}
                    className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                  >
                    <Td>{row.no}</Td>
                    <Td className="font-semibold text-blue-600">{row.noRekening}</Td>
                    <Td className="tabular-nums">{row.idNasabah}</Td>
                    <Td>{row.namaNasabah}</Td>
                    <Td>{row.alamat}</Td>
                    <Td>{row.statusNasabah}</Td>
                    <Td>{row.jenisPinjaman}</Td>

                    <Td className="whitespace-nowrap tabular-nums">
                      {row.tanggalPinjaman}
                    </Td>
                    <Td className="whitespace-nowrap tabular-nums">
                      {row.tanggalJatuhTempo}
                    </Td>
                    <Td>{row.kolektor}</Td>
                    <Td>{row.jangkaWaktu}</Td>
                    <Td align="right">{row.bunga}</Td>

                    <Td align="right">{row.plafon}</Td>
                    <Td align="right">{row.sisaPokok}</Td>
                    <Td align="right">{row.sisaBunga}</Td>
                    <Td align="right">{row.angsuranPokok}</Td>
                    <Td align="right">{row.angsuranBunga}</Td>
                    <Td>{row.statusPinjaman}</Td>
                  </tr>
                ))}

                <TotalRow label="Total per Halaman" totals={totals} />
                <TotalRow label="Total" totals={totals} />
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-[14px] text-slate-900">
            Menampilkan 1 sampai {rows.length} dari {rows.length} entri
          </div>
          <PaginationBar />
        </div>
      </div>
    </div>
  );
}