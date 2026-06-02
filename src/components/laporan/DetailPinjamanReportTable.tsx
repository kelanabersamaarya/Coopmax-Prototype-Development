"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import SortableHeaderLabel from "@/components/laporan/SortableHeaderLabel";

type DetailPinjamanRow = {
  no: number;
  noRekening: string;
  cabangPembukaanRekening: string;
  namaNasabah: string;
  alamat: string;
  aoId: string;
  jwBln: string;
  periode: string;
  saldoPokok: string;
  bunga: string;
  angsuranPerBln: string;
  angsuranSdhHr: string;
  tunggakanBln: string;
  tunggakanNilai: string;
  tunggakan1_30: string;
  tunggakan31_60: string;
  tunggakan61_90: string;
  tunggakan90p: string;
};

const rows: DetailPinjamanRow[] = [
  {
    no: 111,
    noRekening: "007041",
    cabangPembukaanRekening: "Kantor Pusat",
    namaNasabah: "Achmad Syafi'i / -",
    alamat: "Jl. Mayjend",
    aoId: "ADK",
    jwBln: "12",
    periode: "19/11/25-19/11/26",
    saldoPokok: "3,749,999",
    bunga: "2.50",
    angsuranPerBln: "541,667",
    angsuranSdhHr: "3 / 3",
    tunggakanBln: "0",
    tunggakanNilai: "",
    tunggakan1_30: "",
    tunggakan31_60: "",
    tunggakan61_90: "",
    tunggakan90p: "",
  },
  {
    no: 112,
    noRekening: "007056",
    cabangPembukaanRekening: "Ubud",
    namaNasabah: "Sukar / Soinem",
    alamat: "Jl. A Yani",
    aoId: "ADK",
    jwBln: "12",
    periode: "16/02/26-16/02/27",
    saldoPokok: "5,000,000",
    bunga: "2.50",
    angsuranPerBln: "541,667",
    angsuranSdhHr: "0 / 0",
    tunggakanBln: "0",
    tunggakanNilai: "",
    tunggakan1_30: "",
    tunggakan31_60: "",
    tunggakan61_90: "",
    tunggakan90p: "",
  },
  {
    no: 113,
    noRekening: "007057",
    cabangPembukaanRekening: "Gianyar",
    namaNasabah: "Jujon / Sumiati",
    alamat: "Jl. Kyai",
    aoId: "ADK",
    jwBln: "18",
    periode: "26/06/25-26/12/26",
    saldoPokok: "3,111,112",
    bunga: "2.50",
    angsuranPerBln: "322,222",
    angsuranSdhHr: "4 / 8",
    tunggakanBln: "4",
    tunggakanNilai: "1,288,888",
    tunggakan1_30: "322,222",
    tunggakan31_60: "322,222",
    tunggakan61_90: "322,222",
    tunggakan90p: "322,222",
  },
  {
    no: 114,
    noRekening: "007075",
    cabangPembukaanRekening: "Denpasar",
    namaNasabah: "Hanafi Wibowo / -",
    alamat: "Dsn Karng",
    aoId: "ADK",
    jwBln: "10",
    periode: "24/11/25-24/09/26",
    saldoPokok: "7,200,000",
    bunga: "2.50",
    angsuranPerBln: "1,125,000",
    angsuranSdhHr: "2 / 3",
    tunggakanBln: "1",
    tunggakanNilai: "1,125,000",
    tunggakan1_30: "1,125,000",
    tunggakan31_60: "",
    tunggakan61_90: "",
    tunggakan90p: "",
  },
  {
    no: 115,
    noRekening: "007114",
    cabangPembukaanRekening: "Badung",
    namaNasabah: "Ira Purwandari / -",
    alamat: "Jl. Kauman",
    aoId: "AND",
    jwBln: "8",
    periode: "03/11/25-03/07/26",
    saldoPokok: "2,500,000",
    bunga: "3.00",
    angsuranPerBln: "620,000",
    angsuranSdhHr: "3 / 4",
    tunggakanBln: "1",
    tunggakanNilai: "620,000",
    tunggakan1_30: "620,000",
    tunggakan31_60: "",
    tunggakan61_90: "",
    tunggakan90p: "",
  },
  {
    no: 116,
    noRekening: "007114",
    cabangPembukaanRekening: "Kantor Pusat",
    namaNasabah: "Ira Purwandari / -",
    alamat: "Jl. Kauman",
    aoId: "AND",
    jwBln: "10",
    periode: "04/11/25-04/09/26",
    saldoPokok: "6,300,000",
    bunga: "2.50",
    angsuranPerBln: "1,125,000",
    angsuranSdhHr: "3 / 3",
    tunggakanBln: "0",
    tunggakanNilai: "",
    tunggakan1_30: "",
    tunggakan31_60: "",
    tunggakan61_90: "",
    tunggakan90p: "",
  },
  {
    no: 117,
    noRekening: "007155",
    cabangPembukaanRekening: "Ubud",
    namaNasabah: "Eko Cahyono",
    alamat: "Dsn Demak",
    aoId: "ADK",
    jwBln: "12",
    periode: "26/01/26-26/01/27",
    saldoPokok: "5,000,000",
    bunga: "2.50",
    angsuranPerBln: "541,667",
    angsuranSdhHr: "0 / 1",
    tunggakanBln: "1",
    tunggakanNilai: "541,667",
    tunggakan1_30: "541,667",
    tunggakan31_60: "",
    tunggakan61_90: "",
    tunggakan90p: "",
  },
  {
    no: 118,
    noRekening: "007157",
    cabangPembukaanRekening: "Gianyar",
    namaNasabah: "Didik Yulianto / Y",
    alamat: "Dsn Karang",
    aoId: "ADK",
    jwBln: "12",
    periode: "26/01/26-26/01/27",
    saldoPokok: "3,000,000",
    bunga: "2.50",
    angsuranPerBln: "325,000",
    angsuranSdhHr: "0 / 1",
    tunggakanBln: "1",
    tunggakanNilai: "325,000",
    tunggakan1_30: "325,000",
    tunggakan31_60: "",
    tunggakan61_90: "",
    tunggakan90p: "",
  },
];

const totalRows = {
  saldoPokok: "4,794,829,831",
  tunggakanNilai: "1,120,442,772",
  tunggakan1_30: "437,029,718",
  tunggakan31_60: "160,656,348",
  tunggakan61_90: "106,795,316",
  tunggakan90p: "415,961,390",
};

function cleanNasabahName(name: string) {
  return name.split("/")[0]?.trim() ?? name;
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
        "border-b border-r border-slate-300/80 bg-white px-2 py-2.5 align-middle",
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

function GroupTh({
  children,
  colSpan,
  rowSpan,
  className,
  align = "center",
}: {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(
        "border-b border-r border-t border-slate-300/80 bg-white px-2 py-2.5 align-middle",
        "text-[11px] font-extrabold uppercase tracking-wide text-slate-800",
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
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <td
      className={cn(
        "border-b border-r border-slate-200 px-2 py-1.5 align-top",
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

function TotalCell({
  children,
  colSpan,
  align = "right",
  className,
}: {
  children?: React.ReactNode;
  colSpan?: number;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <td
      colSpan={colSpan}
      className={cn(
        "border-b border-r border-slate-300/80 bg-white px-2 py-2",
        "text-[12px] font-extrabold text-slate-900",
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

function TotalSummaryRow({
  label,
  hideCabangPembukaanRekening,
}: {
  label: string;
  hideCabangPembukaanRekening: boolean;
}) {
  return (
    <tr className="border-t border-slate-300/80 bg-white">
      <TotalCell colSpan={hideCabangPembukaanRekening ? 7 : 8} align="left">
        {label}
      </TotalCell>
      <TotalCell>{totalRows.saldoPokok}</TotalCell>
      <TotalCell />
      <TotalCell />
      <TotalCell />
      <TotalCell />
      <TotalCell />
      <TotalCell>{totalRows.tunggakanNilai}</TotalCell>
      <TotalCell>{totalRows.tunggakan1_30}</TotalCell>
      <TotalCell>{totalRows.tunggakan31_60}</TotalCell>
      <TotalCell>{totalRows.tunggakan61_90}</TotalCell>
      <TotalCell>{totalRows.tunggakan90p}</TotalCell>
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
  selectedCabangPembukaanRekening,
  hideCabangPembukaanRekening = false,
}: {
  className?: string;
  selectedCabangPembukaanRekening?: string;
  hideCabangPembukaanRekening?: boolean;
}) {
  const visibleRows = React.useMemo(() => {
    if (!selectedCabangPembukaanRekening) return rows;
    return rows.filter(
      (row) => row.cabangPembukaanRekening === selectedCabangPembukaanRekening,
    );
  }, [selectedCabangPembukaanRekening]);

  const colSpan = hideCabangPembukaanRekening ? 17 : 18;
  const minWidth = hideCabangPembukaanRekening ? "min-w-[1596px]" : "min-w-[1716px]";

  return (
    <div className={cn("mt-6", className)}>
      <div className="rounded-[5px] border border-slate-200/70 bg-white/90 p-3 shadow-sm backdrop-blur md:p-4">
        <div className="overflow-hidden rounded-[5px] bg-white ring-1 ring-slate-200">
          <div className="safe-x-scroll">
            <table
              className={cn(
                "w-full border-collapse border-l border-t border-slate-300/80 bg-white",
                minWidth,
              )}
            >
              <thead className="bg-white">
                <tr>
                  <GroupTh rowSpan={2} className="w-[38px] px-1.5" align="left">
                    No
                  </GroupTh>
                  <GroupTh rowSpan={2} className="w-[96px]" align="left">
                    <SortableHeaderLabel
                      lines={["No.", "Rekening"]}
                      className="[&_span]:whitespace-nowrap"
                    />
                  </GroupTh>
                  {!hideCabangPembukaanRekening ? (
                    <GroupTh rowSpan={2} className="w-[120px]" align="left">
                      <SortableHeaderLabel
                        lines={["Cabang", "Pembukaan", "Rekening"]}
                      />
                    </GroupTh>
                  ) : null}
                  <GroupTh rowSpan={2} className="w-[130px]" align="left">
                    <SortableHeaderLabel lines={["Nama", "Nasabah"]} />
                  </GroupTh>
                  <GroupTh rowSpan={2} className="w-[120px]" align="left">
                    <SortableHeaderLabel lines={["Alamat"]} />
                  </GroupTh>
                  <GroupTh rowSpan={2} className="w-[60px]" align="left">
                    AO ID
                  </GroupTh>
                  <GroupTh colSpan={2}>Jangka Waktu</GroupTh>
                  <GroupTh colSpan={3}>Pinjaman</GroupTh>
                  <GroupTh colSpan={2}>Angsuran</GroupTh>
                  <GroupTh colSpan={6}>Tunggakan</GroupTh>
                </tr>

                <tr>
                  <Th className="w-[30px] px-1 text-left whitespace-nowrap">Bln</Th>
                  <Th className="w-[132px]">Dari tgl. s/d tgl.</Th>
                  <Th className="w-[108px]">Sld. Pokok</Th>
                  <Th className="w-[44px] px-1.5">Bng</Th>
                  <Th className="w-[82px]">Per bln</Th>
                  <Th className="w-[58px] px-1.5">Sdh/Hr</Th>
                  <Th className="w-[30px] px-1 text-left whitespace-nowrap">Bln</Th>
                  <Th className="w-[115px]">Nilai</Th>
                  <Th className="w-[115px]">1-30 Hr</Th>
                  <Th className="w-[115px]">31-60 Hr</Th>
                  <Th className="w-[115px]">61-90 Hr</Th>
                  <Th className="w-[115px]">{"> 90 Hr"}</Th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {visibleRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={colSpan}
                      className="px-4 py-10 text-center text-sm text-slate-600"
                    >
                      Tidak ada data.
                    </td>
                  </tr>
                ) : (
                  visibleRows.map((row, idx) => {
                    const cleanName = cleanNasabahName(row.namaNasabah);

                    return (
                      <tr
                        key={`${row.noRekening}-${row.no}-${idx}`}
                        className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                      >
                        <Td className="w-[38px] max-w-[38px] px-1.5 text-center tabular-nums">
                          {idx + 1}
                        </Td>
                        <Td className="w-[96px] max-w-[96px] tabular-nums">
                          <div className="truncate" title={row.noRekening}>
                            {row.noRekening}
                          </div>
                        </Td>
                        {!hideCabangPembukaanRekening ? (
                          <Td className="w-[120px] max-w-[120px]">
                            <div
                              className="truncate"
                              title={row.cabangPembukaanRekening}
                            >
                              {row.cabangPembukaanRekening}
                            </div>
                          </Td>
                        ) : null}
                        <Td className="w-[130px] max-w-[130px]">
                          <div className="truncate" title={cleanName}>
                            {cleanName}
                          </div>
                        </Td>
                        <Td>
                          <div className="truncate" title={row.alamat}>
                            {row.alamat}
                          </div>
                        </Td>
                        <Td>{row.aoId}</Td>
                        <Td className="w-[30px] max-w-[30px] px-1 tabular-nums">
                          {row.jwBln}
                        </Td>
                        <Td className="whitespace-nowrap tabular-nums">
                          {row.periode}
                        </Td>
                        <Td className="w-[108px] max-w-[108px]" align="right">
                          {row.saldoPokok}
                        </Td>
                        <Td className="w-[44px] max-w-[44px] px-1.5" align="right">
                          {row.bunga}
                        </Td>
                        <Td className="w-[82px] max-w-[82px]" align="left">
                          {row.angsuranPerBln}
                        </Td>
                        <Td className="w-[58px] max-w-[58px] px-1.5" align="left">
                          {row.angsuranSdhHr}
                        </Td>
                        <Td
                          className="w-[30px] max-w-[30px] px-1 tabular-nums"
                          align="left"
                        >
                          {row.tunggakanBln}
                        </Td>
                        <Td align="right">{row.tunggakanNilai}</Td>
                        <Td align="right">{row.tunggakan1_30}</Td>
                        <Td align="right">{row.tunggakan31_60}</Td>
                        <Td align="right">{row.tunggakan61_90}</Td>
                        <Td align="right">{row.tunggakan90p}</Td>
                      </tr>
                    );
                  })
                )}

                {visibleRows.length > 0 ? (
                  <>
                    <TotalSummaryRow
                      label="Total per Halaman"
                      hideCabangPembukaanRekening={hideCabangPembukaanRekening}
                    />
                    <TotalSummaryRow
                      label="Total"
                      hideCabangPembukaanRekening={hideCabangPembukaanRekening}
                    />
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-[14px] text-slate-900">
            Menampilkan 1 sampai {visibleRows.length} dari {visibleRows.length} entri
          </div>
          <PaginationBar />
        </div>
      </div>
    </div>
  );
}