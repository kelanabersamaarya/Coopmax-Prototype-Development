import * as React from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { openBlankReportPdfPreview, openReportPdfPreview } from "@/utils/pdf-preview";

const journalRows = [
  {
    no: "1",
    member: "Laura Patel",
    accountNo: "SK01260002",
    transaction: "TRANSAKSI SETORAN SIMPANAN",
    ref: "AK/TAB/2/100826/00001",
    account: "Kas",
    debit: "50.000,00",
    debitCode: "1.1.1.1",
    credit: "",
    creditCode: "",
    note: "Penarikan tabungan untuk keperluan anggota",
    detail: "Setoran Tabungan untuk No. Rekening P001260013 atas nama Neri Susilawati [No. Transaksi : STR/110926/0001] [Keterangan : Keperluan Sehari - Hari]",
  },
  {
    no: "2",
    member: "Laura Patel",
    accountNo: "SK01260002",
    transaction: "TRANSAKSI SETORAN SIMPANAN",
    ref: "AK/TAB/2/100826/00001",
    account: "Simpanan Sukarela",
    debit: "",
    debitCode: "",
    credit: "50.000,00",
    creditCode: "2.1.3",
    note: "",
    detail: "Setoran Tabungan untuk No. Rekening P001260013 atas nama Neri Susilawati [No. Transaksi : STR/110926/0001] [Keterangan : Keperluan Sehari - Hari]",
  },
  {
    no: "3",
    member: "Budi Santoso",
    accountNo: "SK01260017",
    transaction: "TRANSAKSI PENARIKAN SIMPANAN",
    ref: "AK/TAB/2/100826/00002",
    account: "Simpanan Sukarela",
    debit: "25.000,00",
    debitCode: "2.1.3",
    credit: "",
    creditCode: "",
    note: "Penarikan simpanan anggota",
    detail: "Setoran Tabungan untuk No. Rekening P001260013 atas nama Neri Susilawati [No. Transaksi : STR/110926/0001] [Keterangan : Keperluan Sehari - Hari]",
  },
  {
    no: "4",
    member: "Budi Santoso",
    accountNo: "SK01260017",
    transaction: "TRANSAKSI PENARIKAN SIMPANAN",
    ref: "AK/TAB/2/100826/00002",
    account: "Kas",
    debit: "",
    debitCode: "",
    credit: "25.000,00",
    creditCode: "1.1.1.1",
    note: "",
    detail: "Setoran Tabungan untuk No. Rekening P001260013 atas nama Neri Susilawati [No. Transaksi : STR/110926/0001] [Keterangan : Keperluan Sehari - Hari]",
  },
];

export default function GeneralJournalReport({ isV2 = false }: { isV2?: boolean }) {
  const [date, setDate] = React.useState("2025-11-05");
  const [visible, setVisible] = React.useState(false);

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

  const exportPdf = () => {
    const previewWindow = openBlankReportPdfPreview("Jurnal Umum");
    if (!previewWindow) return;
    requestAnimationFrame(() => {
      openReportPdfPreview({ title: "Jurnal Umum", targetWindow: previewWindow });
    });
  };

  return (
    <div className="rounded-[5px] bg-white px-1 py-2 text-slate-950 md:px-4 md:py-4">
      <div className="flex items-baseline gap-3">
        <h1 className="text-[22px] font-extrabold tracking-tight">Laporan</h1>
        <span className="text-[16px] font-normal">Jurnal Umum</span>
      </div>

      <div className="mt-7 max-w-[340px]">
        <label htmlFor="journal-date" className="text-[14px] font-medium">
          Tanggal Laporan
        </label>
        <div className="mt-2 flex h-[26px] w-[143px] overflow-hidden rounded-[5px] border border-slate-300 bg-white shadow-sm">
          <span className="inline-flex w-[46px] shrink-0 items-center justify-center border-r border-slate-300 bg-slate-100 text-slate-400">
            <CalendarDays className="h-[19px] w-[19px]" strokeWidth={2} />
          </span>
          <Input
            id="journal-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="journal-date-input h-full rounded-none border-0 px-2 text-[12px] shadow-none focus-visible:ring-0"
          />
        </div>
        <Button
          type="button"
          onClick={() => setVisible(true)}
          className="mt-3 h-[28px] w-[123px] rounded-[6px] bg-violet-600 px-2 text-[12px] font-normal text-white hover:bg-violet-700"
        >
          Tampilkan Laporan
        </Button>
      </div>

      {visible ? (
        <section className="mt-10" aria-label="Hasil laporan jurnal umum">
          <div className="mb-12 text-center">
            <h2 className="text-[18px] font-extrabold leading-tight">Jurnal Umum</h2>
            <p className="text-[18px] font-extrabold leading-tight">{formattedDate}</p>
          </div>

          <div className={`${isV2 ? "print-report-area" : ""} overflow-hidden rounded-none border border-slate-300`}>
          <div className="print-hide flex min-h-[48px] justify-end gap-2 border-b border-slate-300 px-5 py-3">
            <Button className="h-[25px] w-[95px] rounded-[5px] bg-green-600 px-2 text-[12px] font-normal hover:bg-green-700">
              Export Excel
            </Button>
            <Button onClick={exportPdf} className="h-[25px] w-[95px] rounded-[5px] bg-rose-600 px-2 text-[12px] font-normal hover:bg-rose-700">
              Export PDF
            </Button>
          </div>
          {isV2 && (
            <div className="journal-pdf-header export-only-journal-header">
              <img src="/publiccoopmax-logo.png.png" alt="Logo Koperasi Coopmax" className="journal-pdf-logo" />
              <div className="journal-pdf-title">
                <div>Koperasi Coopmax</div>
                <div>Nomor BH : 21/KC/04-2025</div>
                <div>Email: coopmax@kop.com</div>
              </div>
              <div className="journal-pdf-rule" />
              <div className="journal-pdf-report-title">
                <div>Jurnal Umum</div>
                <div>{formattedDate}</div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
              <table className={`journal-table ${isV2 ? "min-w-[900px]" : "min-w-[1500px]"} w-full border-collapse text-[12px]`}>
                <thead className="font-bold">
                  <tr>
                    <th rowSpan={2} className={`journal-cell whitespace-nowrap ${isV2 ? "w-[55px]" : "w-[70px]"}`}>NO</th>
                    {!isV2 && <th rowSpan={2} className="journal-cell w-[250px]">NAMA ANGGOTA</th>}
                    {!isV2 && <th rowSpan={2} className="journal-cell w-[190px]">NO. REKENING</th>}
                    {!isV2 && <th rowSpan={2} className="journal-cell w-[220px]">JENIS<br />TRANSAKSI</th>}
                    <th rowSpan={2} className={`journal-cell ${isV2 ? "w-[180px]" : "w-[300px]"}`}>REF</th>
                    <th rowSpan={2} className={`journal-cell ${isV2 ? "w-[210px]" : "w-[270px]"}`}>NAMA AKUN DAN<br />KETERANGAN</th>
                    <th colSpan={2} className="journal-cell h-[72px]">DEBET</th>
                    <th colSpan={2} className="journal-cell">KREDIT</th>
                    <th rowSpan={2} className={`journal-cell ${isV2 ? "w-[190px]" : "w-[250px]"}`}>{isV2 ? "DETAIL TRANSAKSI" : "KETERANGAN"}</th>
                  </tr>
                  <tr>
                    <th className={`journal-cell ${isV2 ? "w-[115px]" : "w-[170px]"}`}>JUMLAH</th>
                    <th className={`journal-cell ${isV2 ? "w-[105px]" : "w-[150px]"}`}>KODE AKUN</th>
                    <th className={`journal-cell ${isV2 ? "w-[115px]" : "w-[170px]"}`}>JUMLAH</th>
                    <th className={`journal-cell ${isV2 ? "w-[105px]" : "w-[150px]"}`}>KODE AKUN</th>
                  </tr>
                </thead>
                <tbody>
                  {journalRows.map((row, rowIndex) => (
                    <tr key={row.no}>
                      <td className="journal-cell text-center align-top">{row.no}</td>
                      {!isV2 && <td className="journal-cell align-top">{row.member}</td>}
                      {!isV2 && <td className="journal-cell align-top">{row.accountNo}</td>}
                      {!isV2 && <td className="journal-cell align-top uppercase">{row.transaction}</td>}
                      <td className="journal-cell align-top">{row.ref}</td>
                      <td className="journal-cell align-top">{row.account}</td>
                      <td className="journal-cell text-right align-top">{row.debit}</td>
                      <td className="journal-cell align-top">{row.debitCode}</td>
                      <td className="journal-cell text-right align-top">{row.credit}</td>
                      <td className="journal-cell align-top">{row.creditCode}</td>
                      {isV2 ? (
                        rowIndex % 2 === 0 ? (
                          <td rowSpan={2} className="journal-cell journal-group-cell journal-group-end align-top">
                            {row.detail}
                          </td>
                        ) : null
                      ) : (
                        <td className="journal-cell align-top">{row.note}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 text-[15px] md:flex-row md:items-center md:justify-between">
            <span>Menampilkan 1 sampai 4 dari 4 entri (disaring dari 592 entri keseluruhan)</span>
            <div className="flex items-center gap-1">
              <Button disabled className="rounded-none bg-slate-100 text-slate-300">Sebelumnya</Button>
              <Button className="rounded-none bg-indigo-600 text-white hover:bg-indigo-700">1</Button>
              <Button disabled className="rounded-none bg-slate-100 text-slate-300">Selanjutnya</Button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
