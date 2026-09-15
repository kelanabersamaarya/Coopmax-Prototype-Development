import * as React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { openBlankReportPdfPreview, openReportPdfPreview } from "@/utils/pdf-preview";
import { NeracaSaldoRecapTable } from "@/components/accounting/AccountingRecapTables";

const detailedRows = [
  ["Aktiva", "", "", "section"],
  ["AKTIVA LANCAR", "", "", "section"],
  ["KAS DAN BANK", "", "", "section"],
  ["KAS", "", "", "section"],
  ["1.1.1.2 - KAS TELLER I MADE SUYASTRA", "0,00", "0,00"],
  ["1.1.1.3 - KAS TELLER NI KADEK HEPY MAYAHANI", "0,00", "0,00"],
  ["1.1.1.1 - KAS DIATANG", "296.987.000,00", "1.052.565.000,00"],
  ["TOTAL KAS", "296.987.000,00", "1.052.565.000,00", "total"],
  ["TABUNGAN DI BANK", "", "", "section"],
  ["1.1.2.1 - TABUNGAN BANK BNI", "191.585.901,00", "94.760.666,00"],
  ["1.1.2.2 - TABUNGAN BANK BRI", "8.942.174.145,00", "6.938.430.019,00"],
  ["1.1.2.3 - TABUNGAN BPD / ARINDO", "25.000.000,00", "25.000.000,00"],
  ["1.1.2.4 - TABUNGAN BANK MANDIRI", "3.155.494.729,00", "2.656.876.827,00"],
  ["1.1.2.5 - TABUNGAN BANK BCA", "416.618.013,00", "418.687.877,00"],
  ["1.1.2.6 - TABUNGAN BANK BUKOPIN", "0,00", "0,00"],
  ["1.1.2.7 - TABUNGAN BANK BPD BALI", "5.500.340.393,00", "5.235.943.506,00"],
  ["TOTAL TABUNGAN DI BANK", "18.231.213.181,00", "15.369.698.895,00", "total"],
  ["TABUNGAN DI LEMBAGA NON BANK", "", "", "section"],
  ["1.1.3.1 - TABUNGAN LPD UNGASAN", "1.509.192.882,00", "1.509.192.882,00"],
  ["1.1.3.2 - DEPOSITO ARINDO", "0,00", "0,00"],
  ["1.1.3.3 - TABUNGAN LEMBAGA LAIN", "0,00", "0,00"],
  ["TOTAL TABUNGAN DI LEMBAGA NON BANK", "1.509.192.882,00", "1.509.192.882,00", "total"],
  ["DEPOSITO DI BANK", "", "", "section"],
  ["1.1.4.1 - DEPOSITO BNI", "6.000.000.000,00", "6.000.000.000,00"],
  ["1.1.4.2 - DEPOSITO BCA", "0,00", "0,00"],
  ["1.1.4.3 - DEPOSITO BPD", "0,00", "0,00"],
  ["1.1.4.4 - DEPOSITO MANDIRI", "2.000.000.000,00", "2.000.000.000,00"],
  ["1.1.4.5 - DEPOSITO BRI", "1.000.000.000,00", "1.000.000.000,00"],
  ["TOTAL DEPOSITO DI BANK", "9.000.000.000,00", "9.000.000.000,00", "total"],
  ["TOTAL KAS DAN BANK", "29.037.393.063,00", "26.931.456.777,00", "total"],
  ["PIUTANG", "", "", "section"],
  ["PINJAMAN YANG DIBERIKAN", "", "", "section"],
  ["1.2.1.1 - PINJAMAN BULANAN", "28.745.357.000,00", "28.912.437.000,00"],
  ["1.2.1.2 - PINJAMAN MUSIMAN", "0,00", "0,00"],
  ["1.2.1.3 - PINJAMAN HARIAN", "0,00", "0,00"],
  ["TOTAL PINJAMAN YANG DIBERIKAN", "28.745.357.000,00", "28.912.437.000,00", "total"],
  ["TOTAL AKTIVA LANCAR", "57.195.206.063,00", "55.250.349.777,00", "total"],
  ["AKTIVA TETAP", "", "", "section"],
  ["1.2.1.4 - INVENTARIS DAN MEBEL KANTOR", "0,00", "0,00"],
  ["1.2.1.5 - KONSTRUKSI DALAM PENGERJAAN-GEDUNG", "1.097.019.186,00", "1.318.966.902,00"],
  ["1.2.1.1 - TANAH", "1.948.597.000,00", "2.448.597.000,00"],
  ["1.2.1.2 - BANGUNAN", "0,00", "0,00"],
  ["1.2.1.3 - KENDARAAN", "89.080.000,00", "89.080.000,00"],
  ["TOTAL AKTIVA", "60.294.813.562,00", "59.069.886.375,00", "total"],
  ["TOTAL AKTIVA TETAP", "3.405.152.686,00", "4.127.100.462,00", "total"],
  ["AKUMULASI PENYUSUTAN AKTIVA TETAP", "", "", "section"],
  ["1.2.2.1 - AKUM. PENY. BANGUNAN", "0,00", "0,00"],
  ["1.2.2.2 - AKUM. PENY. KENDARAAN", "0,00", "0,00"],
  ["1.2.2.3 - AKUM. PENY. INVENTARIS & MEBEL", "(305.545.187,00)", "(307.563.864,00)"],
  ["TOTAL AKTIVA", "3.099.607.499,00", "3.819.536.598,00", "total"],
  ["TOTAL AKTIVA", "60.294.813.562,00", "59.069.886.375,00", "grand"],
  ["TOTAL KEWAJIBAN + EKUITAS", "60.294.813.562,00", "59.069.886.375,00", "grand"],
] as const;

const recapRows = [
  ["- Pendapatan Jasa Pinjaman Anggota", "271.745.389", "44.326.000", "828.916.050", "(227.419.389)", "(83,7)"],
  ["- Pendapatan Administrasi Anggota", "57.967.166", "6.613.000", "94.723.110", "(51.354.166)", "(88,6)"],
  ["- Pendapatan Denda Pinjaman", "2.772.000", "3.366.000", "13.632.000", "594.000", "21,4"],
  ["- Pendapatan Jasa Pelayanan Lainnya Anggota", "3.833.265", "-", "3.415.000", "(3.833.265)", "(100,0)"],
  ["Jumlah Partisipasi Anggota", "336.317.820", "54.305.000", "940.686.160", "(282.012.820)", "(83,9)", true],
  ["- Beban Jasa Simpanan /Tabungan dari Anggota", "25.092.108", "-", "73.216.900", "(25.092.108)", "(100,0)"],
  ["- Beban Jasa Simpanan Berjangka dari Anggota", "110.656.635", "35.606.500", "277.855.000", "(75.050.135)", "(67,8)"],
  ["Jumlah Beban Bunga", "204.226.178", "35.606.500", "532.333.047", "(168.619.678)", "(82,6)", true],
  ["JUMLAH BEBAN USAHA", "289.150.237", "38.956.500", "761.923.258", "(250.193.737)", "(86,5)", true],
  ["SISA HASIL USAHA BRUTO", "47.167.583", "15.348.500", "178.762.902", "(31.819.083)", "(67,5)", true],
  ["SISA HASIL USAHA", "78.571.115", "45.800.081", "286.787.679", "(32.771.034)", "(41,7)", true],
  ["PENGHASILAN KOMPREHENSIF", "-", "-", "-", "-", "-", true],
] as const;

export default function NeracaSaldoReport() {
  const [period, setPeriod] = React.useState("Perbulan");
  const [date, setDate] = React.useState("2026-09-10");
  const [reportType, setReportType] = React.useState("Laporan Terperinci");
  const [shownDate, setShownDate] = React.useState("10 September 2026");
  const [isReportVisible, setIsReportVisible] = React.useState(false);

  const showReport = () => {
    const nextDate = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T00:00:00`));
    setShownDate(nextDate);
    setIsReportVisible(true);
  };

  const exportPdf = (layout: "Scontro" | "Staffel") => {
    const reportArea = document.querySelector(".neraca-saldo-pdf-report");
    if (!reportArea) return;
    const previewWindow = openBlankReportPdfPreview(`Neraca Saldo - ${layout}`);
    if (!previewWindow) return;
    requestAnimationFrame(() => {
      const table = reportArea.querySelector("table");
      let reportContent = reportArea.innerHTML;
      const boldDescriptions = new Set([
        "Aktiva",
        "AKTIVA LANCAR",
        "KAS DAN BANK",
        "KAS",
        "TOTAL KAS",
        "TABUNGAN DI BANK",
        "TOTAL TABUNGAN DI BANK",
        "TABUNGAN DI LEMBAGA NON BANK",
        "TOTAL TABUNGAN DI LEMBAGA NON BANK",
        "DEPOSITO DI BANK",
        "TOTAL DEPOSITO DI BANK",
        "TOTAL KAS DAN BANK",
        "PIUTANG",
        "PINJAMAN YANG DIBERIKAN",
        "TOTAL PINJAMAN YANG DIBERIKAN",
        "TOTAL AKTIVA LANCAR",
        "AKTIVA TETAP",
        "TOTAL AKTIVA",
        "TOTAL AKTIVA TETAP",
        "AKUMULASI PENYUSUTAN AKTIVA TETAP",
        "TOTAL KEWAJIBAN + EKUITAS",
      ]);
      const boldDescriptionsInTable = (targetTable: HTMLTableElement) => {
        targetTable.querySelectorAll("tbody tr").forEach((row) => {
          const description = row.querySelector("td:first-child");
          const text = description?.textContent?.trim() ?? "";
          if (description && (boldDescriptions.has(text) || !/^\d+(?:\.\d+)+\s*-/.test(text))) {
            const strong = document.createElement("strong");
            strong.textContent = text;
            description.replaceChildren(strong);
            description.classList.add("neraca-bold-description");
            description.style.setProperty("font-weight", "700", "important");
          }
        });
      };

      const boldRecapRows = (targetTable: HTMLTableElement) => {
        targetTable.querySelectorAll("tbody tr.font-bold").forEach((row) => {
          const description = row.querySelector("td:first-child");
          if (!description || description.querySelector("strong")) return;
          const strong = document.createElement("strong");
          strong.textContent = description.textContent?.trim() ?? "";
          description.replaceChildren(strong);
          description.style.setProperty("font-weight", "700", "important");
        });
      };

      if (reportType === "Laporan Terperinci" && table) {
        if (layout === "Scontro") {
          const leftTable = table.cloneNode(true) as HTMLTableElement;
          const rightTable = table.cloneNode(true) as HTMLTableElement;
          const leftBody = leftTable.querySelector("tbody");
          const rightBody = rightTable.querySelector("tbody");
          const sourceRows = Array.from(table.querySelectorAll("tbody tr"));
          const splitAt = Math.ceil(sourceRows.length / 2);

          leftBody?.replaceChildren(...sourceRows.slice(0, splitAt).map((row) => row.cloneNode(true)));
          rightBody?.replaceChildren(...sourceRows.slice(splitAt).map((row) => row.cloneNode(true)));
          boldDescriptionsInTable(leftTable);
          boldDescriptionsInTable(rightTable);
          reportContent = `<div class="neraca-scontro-columns"><div>${leftTable.outerHTML}</div><div>${rightTable.outerHTML}</div></div>`;
        } else {
          const staffelTable = table.cloneNode(true) as HTMLTableElement;
          boldDescriptionsInTable(staffelTable);
          reportContent = staffelTable.outerHTML;
        }
      } else if (reportType === "Laporan Rekap") {
        const recapTables = Array.from(reportArea.querySelectorAll("table")) as HTMLTableElement[];
        recapTables.forEach(boldRecapRows);
        if (layout === "Staffel" && recapTables.length > 1) {
          const staffelTable = recapTables[0].cloneNode(true) as HTMLTableElement;
          const staffelBody = staffelTable.querySelector("tbody");
          const additionalRows = recapTables.slice(1).flatMap((recapTable) =>
            Array.from(recapTable.querySelectorAll("tbody tr")).map((row) => row.cloneNode(true)),
          );
          staffelBody?.append(...additionalRows);
          reportContent = staffelTable.outerHTML;
        } else {
          reportContent = reportArea.innerHTML;
        }
      }

      openReportPdfPreview({
        title: `Neraca Saldo - ${layout}`,
        targetWindow: previewWindow,
        reportHtml: `<style>.neraca-${layout.toLowerCase()} { width: 100%; }.neraca-${layout.toLowerCase()} table { border-collapse: collapse; }.neraca-${layout.toLowerCase()} table thead th { text-align: inherit; }.neraca-${layout.toLowerCase()} table tbody td.neraca-bold-description { font-weight: 700 !important; }.neraca-${layout.toLowerCase()} table tbody tr.neraca-bold-row td:first-child { font-weight: 700 !important; }.neraca-scontro .grid { display: grid !important; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important; gap: 0 !important; width: 100% !important; }.neraca-scontro-columns { display: grid !important; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important; gap: 18px !important; width: 100% !important; }.neraca-scontro .grid > table, .neraca-scontro-columns > div { width: 100% !important; min-width: 0 !important; }.neraca-scontro .grid > table th:first-child, .neraca-scontro .grid > table td:first-child, .neraca-scontro-columns table th:first-child, .neraca-scontro-columns table td:first-child { width: 48% !important; }.neraca-scontro .grid > table th, .neraca-scontro .grid > table td, .neraca-scontro-columns table th, .neraca-scontro-columns table td { border: 1px solid #777 !important; }.neraca-scontro .grid > table thead th, .neraca-scontro-columns table thead th { text-align: center !important; }.neraca-scontro .grid > table tbody td:first-child, .neraca-scontro-columns table tbody td:first-child { text-align: left !important; }.neraca-scontro .grid > table tbody td:not(:first-child), .neraca-scontro-columns table tbody td:not(:first-child) { text-align: right !important; }</style><div class="neraca-export-header"><strong>Koperasi Astiti Dana Lestari</strong><span>Laporan Neraca Saldo</span><span>${reportType} · ${shownDate}</span></div><div class="neraca-${layout.toLowerCase()}">${reportContent}</div>`,
      });
    });
  };

  return (
    <div className="overflow-hidden rounded-[10px] bg-white text-[#08265a]">
      <div className="p-1 md:p-0">
        <h1 className="text-[21px] font-bold">Laporan <span className="font-normal">Neraca Saldo</span></h1>
        <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          <ReportSelect label="Periode" value={period} options={["Perbulan", "Harian", "Per tahun"]} onChange={(value) => { setPeriod(value); setIsReportVisible(false); }} />
          <label className="w-full text-[13px] md:max-w-[245px]">Tanggal Laporan<div className="mt-1.5 flex h-[31px] overflow-hidden rounded-[5px] border border-[#c8d3e5]"><span className="inline-flex w-12 items-center justify-center bg-slate-100 text-slate-400"><CalendarDays className="h-5 w-5" /></span><Input type="date" value={date} onChange={(event) => { setDate(event.target.value); setIsReportVisible(false); }} className="date-report-input h-full rounded-none border-0 text-[13px] shadow-none focus-visible:ring-0" /></div></label>
          <ReportSelect label="Jenis Laporan" value={reportType} options={["Laporan Terperinci", "Laporan Rekap"]} onChange={(value) => { setReportType(value); setIsReportVisible(false); }} />
        </div>
        <Button type="button" onClick={showReport} className="mt-2 h-[31px] rounded-[6px] bg-violet-600 px-3 text-[12px] hover:bg-violet-700">Tampilkan Laporan</Button>
      </div>
      {isReportVisible ? (
        <>
          <h2 className="mt-5 text-center text-[18px] font-semibold">Laporan Neraca Saldo per {shownDate}</h2>
          <div className="neraca-saldo-pdf-report mt-2 overflow-x-auto border border-[#c8d3e5]">
          <div className="print-hide flex min-w-[680px] justify-end gap-2 border-b border-[#c8d3e5] p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" className="h-9 rounded-[7px] bg-green-600 px-4 text-xs hover:bg-green-700">Export Excel<ChevronDown className="ml-2 h-3.5 w-3.5" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[165px] rounded-[5px] border-slate-200 bg-white p-1 text-slate-700 shadow-lg">
                <DropdownMenuItem onSelect={() => toast.success("Export Excel bentuk Scontro dipilih")} className="cursor-pointer rounded-[4px] px-3 py-2 text-[13px] focus:bg-slate-100">Bentuk Scontro</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast.success("Export Excel bentuk Staffel dipilih")} className="cursor-pointer rounded-[4px] px-3 py-2 text-[13px] focus:bg-slate-100">Bentuk Staffel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" className="h-9 rounded-[7px] bg-rose-600 px-4 text-xs hover:bg-rose-700">Export PDF<ChevronDown className="ml-2 h-3.5 w-3.5" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[165px] rounded-[5px] border-slate-200 bg-white p-1 text-slate-700 shadow-lg">
                <DropdownMenuItem onSelect={() => exportPdf("Scontro")} className="cursor-pointer rounded-[4px] px-3 py-2 text-[13px] focus:bg-slate-100">Bentuk Scontro</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => exportPdf("Staffel")} className="cursor-pointer rounded-[4px] px-3 py-2 text-[13px] focus:bg-slate-100">Bentuk Staffel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {reportType === "Laporan Rekap" ? <NeracaSaldoRecapTable /> : <DetailedTable />}
          </div>
        </>
      ) : null}
    </div>
  );
}

function DetailedTable() {
  return (
    <table className="w-full min-w-[680px] border-collapse text-[11px]">
      <colgroup><col className="w-[52%]" /><col className="w-[24%]" /><col className="w-[24%]" /></colgroup>
      <thead><tr className="bg-[#dfe6eb] uppercase tracking-wider text-[#526786]"><th className="border border-[#c8d3e5] px-3 py-2 text-center">Deskripsi</th><th className="border border-[#c8d3e5] px-3 py-2 text-center">Bulan Lalu</th><th className="border border-[#c8d3e5] px-3 py-2 text-center">Bulan Ini</th></tr></thead>
      <tbody>{detailedRows.map((row, index) => <tr key={`${row[0]}-${index}`} className={row[3] === "grand" ? "bg-[#dfe6eb] font-bold" : row[3] === "total" ? "font-bold" : row[3] === "section" ? "font-bold" : ""}><td className="break-words border border-[#c8d3e5] px-3 py-1">{row[0]}</td><td className="border border-[#c8d3e5] px-2 py-1 text-right tabular-nums">{row[1]}</td><td className="border border-[#c8d3e5] px-2 py-1 text-right tabular-nums">{row[2]}</td></tr>)}</tbody>
    </table>
  );
}

function SimpleRecapTable() {
  return <table className="w-full min-w-[900px] border-collapse text-[12px]"><thead><tr className="uppercase tracking-wider text-[#526786]"><th className="border border-[#c8d3e5] px-2 py-2 text-left">Perkiraan</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">Rencana</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">Bulan Ini</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">s/d Bulan Ini</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">Deviasi</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">%</th></tr></thead><tbody><tr className="bg-[#dfe6eb] font-bold"><td colSpan={6} className="border border-[#c8d3e5] px-2 py-1">PARTISIPASI ANGGOTA</td></tr>{recapRows.map((row, index) => <tr key={`${row[0]}-${index}`} className={row[6] ? "font-bold" : ""}><td className="border border-[#c8d3e5] px-2 py-1">{row[0]}</td>{row.slice(1, 6).map((value, valueIndex) => <td key={valueIndex} className="border border-[#c8d3e5] px-2 py-1 text-right tabular-nums">{value}</td>)}</tr>)}</tbody></table>;
}

function ReportSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="w-full text-[13px] md:max-w-[245px]">{label}<div className="relative mt-1.5"><select value={value} onChange={(event) => onChange(event.target.value)} className="h-[31px] w-full appearance-none rounded-[5px] border border-[#c8d3e5] bg-white px-3 text-[13px] outline-none focus:ring-2 focus:ring-violet-200">{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-slate-500" /></div></label>;
}
