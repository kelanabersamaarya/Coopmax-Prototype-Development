import * as React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const recapRows = [
  ["- Pendapatan Jasa Pinjaman Anggota", "271.745.389", "44.326.000", "828.916.050", "(227.419.389)", "(83,7)"],
  ["- Pendapatan Administrasi Anggota", "57.967.166", "6.613.000", "94.723.110", "(51.354.166)", "(88,6)"],
  ["- Pendapatan Denda Pinjaman", "2.772.000", "3.366.000", "13.632.000", "594.000", "21,4"],
  ["- Pendapatan Jasa Pelayanan Lainnya Anggota", "3.833.265", "-", "3.415.000", "(3.833.265)", "(100,0)"],
  ["Jumlah Partisipasi Anggota", "336.317.820", "54.305.000", "940.686.160", "(282.012.820)", "(83,9)", true],
  ["- Beban Jasa Simpanan /Tabungan dari Anggota", "25.092.108", "-", "73.216.900", "(25.092.108)", "(100,0)"],
  ["- Beban Jasa Simpanan Berjangka dari Anggota", "110.656.635", "35.606.500", "277.855.000", "(75.050.135)", "(67,8)"],
  ["- Beban Jasa Modal Simp. Khusus Dari Anggota", "62.445.761", "-", "167.189.983", "(62.445.761)", "(100,0)"],
  ["- Beban Jasa Simpanan Berencana / SIMADRI", "6.031.674", "-", "14.071.161", "(6.031.674)", "(100,0)"],
  ["Jumlah Beban Bunga", "204.226.178", "35.606.500", "532.333.047", "(168.619.678)", "(82,6)", true],
  ["Beban Penyisihan Pinjaman Ragu-ragu", "6.000.000", "-", "12.000.000", "(6.000.000)", "(100,0)"],
  ["Beban Kepegawaian/Karyawan", "61.658.333", "-", "177.138.000", "(61.658.333)", "(100,0)"],
  ["Beban Administrasi, Perlengkapan & Umum", "1.790.416", "1.357.000", "6.675.000", "(433.416)", "(24,2)"],
  ["Beban Penyusutan dan Amortisasi", "2.500.000", "-", "10.155.011", "(2.500.000)", "(100,0)"],
  ["Beban Listrik, air dan telepon", "1.549.433", "1.322.000", "6.143.000", "(227.433)", "(14,7)"],
  ["Beban Pemeliharaan Software & Inventaris", "2.083.333", "-", "7.390.000", "(2.083.333)", "(100,0)"],
  ["Beban Operasional lain", "9.342.544", "671.000", "10.089.000", "(8.671.544)", "(92,8)"],
  ["JUMLAH BEBAN USAHA", "289.150.237", "38.956.500", "761.923.258", "(250.193.737)", "(86,5)", true],
  ["SISA HASIL USAHA BRUTO", "47.167.583", "15.348.500", "178.762.902", "(31.819.083)", "(67,5)", true],
  ["Jumlah Hasil Investasi", "-", "-", "-", "-", "-"],
  ["Jumlah Beban Perkoperasian", "(12.666.666)", "-", "(38.250.000)", "12.666.666", "(100,0)"],
  ["Jumlah pendapatan lain-lain", "57.312.423", "34.254.722", "190.317.044", "(23.057.701)", "(40,2)"],
  ["Jumlah Pendapatan dan biaya lain-lain", "(10.326.321)", "(3.803.141)", "(34.275.489)", "6.523.180", "(63,2)"],
  ["Sisa Hasil Usaha sebelum Pajak", "81.487.019", "45.800.081", "156.041.555", "(16.534.521)", "(35,2)"],
  ["Pajak Penghasilan", "2.915.904", "-", "9.766.778", "(2.915.904)", "(43,8)"],
  ["SISA HASIL USAHA", "78.571.115", "45.800.081", "286.787.679", "(32.771.034)", "(41,7)", true],
  ["PENGHASILAN KOMPREHENSIF", "-", "-", "-", "-", "-", true],
] as const;

export default function NeracaSaldoReport() {
  const [period, setPeriod] = React.useState("Perbulan");
  const [date, setDate] = React.useState("2026-09-10");
  const [reportType, setReportType] = React.useState("Laporan Terperinci");
  const [isReportVisible, setIsReportVisible] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-[10px] bg-white text-[#08265a]">
      <div className="p-1 md:p-0">
        <h1 className="text-[21px] font-bold">Laporan <span className="font-normal">Neraca Saldo</span></h1>
        <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          <ReportSelect label="Periode" value={period} options={["Perbulan", "Harian", "Per tahun"]} onChange={(value) => { setPeriod(value); setIsReportVisible(false); }} />
          <label className="w-full text-[13px] md:max-w-[245px]">Tanggal Laporan
            <div className="mt-1.5 flex h-[31px] overflow-hidden rounded-[5px] border border-[#c8d3e5]"><span className="inline-flex w-12 items-center justify-center bg-slate-100 text-slate-400"><CalendarDays className="h-5 w-5" /></span><Input type="date" value={date} onChange={(event) => { setDate(event.target.value); setIsReportVisible(false); }} className="date-report-input h-full rounded-none border-0 text-[13px] shadow-none focus-visible:ring-0" /></div>
          </label>
          <ReportSelect label="Jenis Laporan" value={reportType} options={["Laporan Terperinci", "Laporan Rekap"]} onChange={(value) => { setReportType(value); setIsReportVisible(false); }} />
        </div>
        <Button type="button" onClick={() => setIsReportVisible(true)} className="mt-2 h-[31px] rounded-[6px] bg-violet-600 px-3 text-[12px] hover:bg-violet-700">Tampilkan Laporan</Button>
      </div>
      {isReportVisible ? <div className="mt-6 overflow-x-auto border border-[#c8d3e5]"><table className="w-full min-w-[900px] border-collapse text-[12px]"><thead><tr className="uppercase tracking-wider text-[#526786]"><th className="border border-[#c8d3e5] px-2 py-2 text-left">Perkiraan</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">Rencana</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">Bulan Ini</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">s/d Bulan Ini</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">Deviasi</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">%</th></tr></thead><tbody><tr className="bg-[#dfe6eb] font-bold"><td colSpan={6} className="border border-[#c8d3e5] px-2 py-1">PARTISIPASI ANGGOTA</td></tr><tr className="bg-[#dfe6eb] font-bold"><td colSpan={6} className="border border-[#c8d3e5] px-2 py-1">BEBAN USAHA</td></tr>{recapRows.map((row) => <tr key={row[0]} className={row[6] ? "font-bold" : ""}><td className="border border-[#c8d3e5] px-2 py-1">{row[0]}</td>{row.slice(1, 6).map((value, index) => <td key={index} className="border border-[#c8d3e5] px-2 py-1 text-right tabular-nums">{value}</td>)}</tr>)}</tbody></table></div> : null}
    </div>
  );
}

function ReportSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="w-full text-[13px] md:max-w-[245px]">{label}<div className="relative mt-1.5"><select value={value} onChange={(event) => onChange(event.target.value)} className="h-[31px] w-full appearance-none rounded-[5px] border border-[#c8d3e5] bg-white px-3 text-[13px] outline-none focus:ring-2 focus:ring-violet-200">{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-slate-500" /></div></label>;
}
