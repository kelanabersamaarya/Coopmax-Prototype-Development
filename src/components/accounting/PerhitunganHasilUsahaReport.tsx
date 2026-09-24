import * as React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { openBlankReportPdfPreview, openReportPdfPreview } from "@/utils/pdf-preview";

const rows = [
  ["4.1.1 - Pendapatan Jasa Simpanan Anggota", "100,724,998,582,550.00", "0.00", "100,724,998,582,550.00"],
  ["4.1.2 - Pendapatan Administrasi Anggota", "14,911,742.06", "0.00", "14,911,742.06"],
  ["4.1.3 - Pendapatan Provisi Anggota", "0.00", "0.00", "0.00"],
  ["4.1.4 - Pendapatan Jasa Pelayanan Lainnya Anggota", "3,943,500.00", "0.00", "3,943,500.00"],
  ["TOTAL PARTISIPASI BRUTO ANGGOTA", "100,725,017,437,792.06", "0.00", "100,725,017,437,792.06", true],
  ["4.2.1 - Pendapatan Jasa Simpanan Calon Anggota", "0.00", "0.00", "0.00"],
  ["4.2.2 - Pendapatan Administrasi Calon Anggota", "0.00", "0.00", "0.00"],
  ["4.2.3 - Pendapatan Provisi Calon Anggota", "0.00", "0.00", "0.00"],
  ["TOTAL PENDAPATAN DARI CALON ANGGOTA", "0.00", "0.00", "0.00", true],
  ["5.1.1.1 - Beban Jasa Simpanan Sukarela/Tabungan Dari Anggota", "-54,000.00", "601,321,779,498.48", "601,321,725,498.48"],
  ["5.1.1.2 - Beban Jasa Simpanan Berjangka Dari Anggota", "42,972,733.33", "0.00", "42,972,733.33"],
  ["5.1.1 - Beban Anggota Lainnya", "0.00", "0.00", "0.00"],
  ["TOTAL Beban Pokok Anggota", "42,918,733.33", "601,321,779,498.48", "601,364,698,231.81", true],
  ["5.2.1 - Biaya Gaji Karyawan", "2,200,000.00", "0.00", "2,200,000.00"],
  ["5.2.2 - Biaya Penggunaan Listrik", "1,050,000.00", "0.00", "1,050,000.00"],
  ["5.2.7 - Biaya Internet & Jaringan", "550,000.00", "0.00", "550,000.00"],
  ["5.2.9 - Biaya Keperluan Kantor", "8,525,000.00", "0.00", "8,525,000.00"],
  ["TOTAL Beban Usaha", "12,325,000.00", "0.00", "12,325,000.00", true],
  ["Total Pendapatan", "100,725,017,437,792.06", "0.00", "100,725,017,437,792.06", true],
  ["Total Biaya", "55,243,733.33", "601,321,779,498.48", "601,377,023,231.81", true],
  ["Laba/Rugi", "100,724,962,194,058.73", "(601,321,779,498.48)", "100,123,640,414,560.25", true],
  ["Laba/Rugi Setelah Pajak", "90,652,465,974,652.86", "0.00", "90,111,276,373,104.22", true],
] as const;

export default function PerhitunganHasilUsahaReport() {
  const [period, setPeriod] = React.useState("Perbulan");
  const [date, setDate] = React.useState("2026-09-10");
  const [showDetail, setShowDetail] = React.useState(false);
  const [shownDate, setShownDate] = React.useState("10 September 2026");
  const [isReportVisible, setIsReportVisible] = React.useState(false);

  const showReport = () => {
    const nextDate = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T00:00:00`));
    setShownDate(nextDate);
    setIsReportVisible(true);
  };

  const exportPdf = (format: "scontro" | "staffel") => {
    const previewWindow = openBlankReportPdfPreview(`Perhitungan Hasil Usaha - ${format === "scontro" ? "Scontro" : "Staffel"}`);
    if (!previewWindow) return;
    requestAnimationFrame(() => {
      const reportArea = document.querySelector(".shu-report-area");
      if (!reportArea) return;
      const formatLabel = format === "scontro" ? "Bentuk Scontro" : "Bentuk Staffel";
      const reportType = "Laporan Terperinci";
      const exportBody = buildShuExportBody(format, reportType);
      openReportPdfPreview({
        title: `Perhitungan Hasil Usaha - ${formatLabel}`,
        targetWindow: previewWindow,
        reportHtml: `<div class="shu-export-header"><div class="shu-letterhead"><img src="/publiccoopmax-logo.png.png" alt="Logo Koperasi Coopmax" /><div class="shu-letterhead-info"><strong>Koperasi Coopmax</strong><span>Nomor BH : 21/KC/04-2025</span><span>Email: coopmax@kop.com</span></div></div><div class="shu-letterhead-rule"></div><div class="shu-report-title">Laporan Perhitungan Hasil Usaha per ${shownDate}</div><small>${formatLabel} • ${reportType}</small></div>${exportBody}`,
      });
    });
  };

  return (
    <div className="overflow-hidden rounded-[10px] bg-white text-[#08265a]">
      <div className="p-1 md:p-0">
        <h1 className="text-[21px] font-bold">Laporan <span className="font-normal">Perhitungan Hasil Usaha</span></h1>
        <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          <div className="flex w-full flex-col gap-2 md:max-w-[245px]">
            <label className="w-full text-[13px]">Periode
              <div className="relative mt-1.5">
                <select value={period} onChange={(e) => { setPeriod(e.target.value); setIsReportVisible(false); }} className="h-[31px] w-full appearance-none rounded-[5px] border border-[#c8d3e5] bg-white px-3 text-[13px] outline-none focus:ring-2 focus:ring-violet-200">
                  <option>Perbulan</option><option>Harian</option><option>Per tahun</option>
                </select><ChevronDown className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-slate-500" />
              </div>
            </label>
            <label className="flex h-[31px] items-center gap-2 text-[13px]">
              <Checkbox checked={showDetail} onCheckedChange={(checked) => { setShowDetail(checked === true); setIsReportVisible(false); }} className="rounded-[4px] border-[#9aa9bf] data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600" />
              <span>Laporan Detail</span>
            </label>
          </div>
          <label className="w-full text-[13px] md:max-w-[245px]">Tanggal Laporan
            <div className="mt-1.5 flex h-[31px] overflow-hidden rounded-[5px] border border-[#c8d3e5]">
              <span className="inline-flex w-12 items-center justify-center bg-slate-100 text-slate-400"><CalendarDays className="h-5 w-5" /></span>
              <Input type="date" value={date} onChange={(e) => { setDate(e.target.value); setIsReportVisible(false); }} className="date-report-input h-full rounded-none border-0 text-[13px] shadow-none focus-visible:ring-0" />
            </div>
          </label>
        </div>
        <Button onClick={showReport} className="mt-2 h-[31px] rounded-[6px] bg-violet-600 px-3 text-[12px] hover:bg-violet-700">Tampilkan Laporan</Button>
      </div>

      {isReportVisible ? (
        <>
          <h2 className="mt-5 text-center text-[18px] font-semibold">Laporan Perhitungan Hasil Usaha per {shownDate}</h2>
          <div className="shu-report-area mt-2 overflow-x-auto border border-[#c8d3e5]">
            <div className="print-hide flex min-w-[760px] justify-end gap-2 border-b border-[#c8d3e5] p-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-9 rounded-[7px] bg-green-600 px-3 text-xs hover:bg-green-700">Export Excel<ChevronDown className="ml-2 h-3.5 w-3.5" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[165px] rounded-[5px] border-slate-200 bg-white p-1 text-slate-700 shadow-lg">
                  <DropdownMenuItem onSelect={() => toast.success("Export Excel bentuk Scontro dipilih")} className="cursor-pointer rounded-[4px] px-3 py-2 text-[13px] focus:bg-slate-100">Bentuk Scontro</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => toast.success("Export Excel bentuk Staffel dipilih")} className="cursor-pointer rounded-[4px] px-3 py-2 text-[13px] focus:bg-slate-100">Bentuk Staffel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-9 rounded-[7px] bg-rose-600 px-3 text-xs hover:bg-rose-700">Export PDF<ChevronDown className="ml-2 h-3.5 w-3.5" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[165px] rounded-[5px] border-slate-200 bg-white p-1 text-slate-700 shadow-lg">
                  <DropdownMenuItem onSelect={() => exportPdf("scontro")} className="cursor-pointer rounded-[4px] px-3 py-2 text-[13px] focus:bg-slate-100">Bentuk Scontro</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => exportPdf("staffel")} className="cursor-pointer rounded-[4px] px-3 py-2 text-[13px] focus:bg-slate-100">Bentuk Staffel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        <table className="min-w-[760px] w-full border-collapse text-[12px]">
          <thead><tr className="uppercase tracking-wider text-[#526786]"><th className="border-b border-r border-[#c8d3e5] px-3 py-2 text-center">Deskripsi</th><th className="border-b border-r border-[#c8d3e5] px-3 py-2 text-center">Bulan Lalu</th><th className="border-b border-r border-[#c8d3e5] px-3 py-2 text-center">Bulan Ini</th><th className="border-b border-[#c8d3e5] px-3 py-2 text-center">Jumlah</th></tr></thead>
          <tbody>
          <tr className="bg-[#dfe6eb] font-semibold"><td colSpan={4} className="border-b border-[#c8d3e5] px-3 py-1 text-center">Pendapatan</td></tr>
          <tr className="font-bold"><td colSpan={4} className="border-b border-[#c8d3e5] px-8 py-1">PARTISIPASI BRUTO ANGGOTA</td></tr>
          {rows.slice(0, 5).map((row) => <ReportRow key={row[0]} row={row} />)}
          <tr className="bg-[#dfe6eb] font-semibold"><td colSpan={4} className="border-b border-[#c8d3e5] px-3 py-1 text-center">Biaya</td></tr>
          <tr className="font-bold"><td colSpan={4} className="border-b border-[#c8d3e5] px-8 py-1">BEBAN POKOK</td></tr>
          {rows.slice(5).map((row) => <ReportRow key={row[0]} row={row} />)}
          </tbody>
        </table>
          </div>
        </>
      ) : null}
    </div>
  );
}

function buildShuExportBody(format: "scontro" | "staffel", reportType: string) {
  const reportArea = document.querySelector(".shu-report-area");
  const tables = reportArea ? Array.from(reportArea.querySelectorAll("table")) : [];

  if (format === "staffel") {
    return `<div class="shu-staffel shu-staffel-${reportType === "Laporan Rekap" ? "rekap" : "terperinci"}">${tables.map((table) => table.outerHTML).join("")}</div>`;
  }

  if (reportType === "Laporan Rekap" && tables.length >= 2) {
    return `<div class="shu-scontro shu-scontro-rekap">${tables.slice(0, 2).map((table) => `<div class="shu-scontro-column">${table.outerHTML}</div>`).join("")}</div>`;
  }

  const sourceTable = tables[0];
  if (!sourceTable) return "";
  const leftTable = sourceTable.cloneNode(true) as HTMLTableElement;
  const rightTable = sourceTable.cloneNode(true) as HTMLTableElement;
  const rows = Array.from(sourceTable.querySelectorAll("tbody tr"));
  const splitIndex = rows.findIndex((row) => row.textContent?.trim() === "Biaya");

  if (splitIndex >= 0) {
    leftTable.querySelector("tbody")?.replaceChildren(...rows.slice(0, splitIndex).map((row) => row.cloneNode(true)));
    rightTable.querySelector("tbody")?.replaceChildren(...rows.slice(splitIndex).map((row) => row.cloneNode(true)));
  }

  return `<div class="shu-scontro"><div class="shu-scontro-column">${leftTable.outerHTML}</div><div class="shu-scontro-column">${rightTable.outerHTML}</div></div>`;
}


function ReportRow({ row }: { row: readonly [string, string, string, string, boolean?] }) {
  const total = row[4];
  return <tr className={total ? "font-bold" : ""}><td className="border-b border-r border-[#c8d3e5] px-8 py-1">{row[0]}</td><td className="border-b border-r border-[#c8d3e5] px-2 py-1 text-right">{row[1]}</td><td className="border-b border-r border-[#c8d3e5] px-2 py-1 text-right">{row[2]}</td><td className={"border-b border-[#c8d3e5] px-2 py-1 text-right " + (row[0].includes("Laba/Rugi") ? "text-lime-600" : "")}>{row[3]}</td></tr>;
}
