import * as React from "react";

const shuRows = [
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

const neracaSections = [
  { title: "ASET", rows: [["Kas dan Setara Kas", "29,819,609,327", "29,036,059,385"], ["Piutang Bunga", "-", "-"], ["Pinjaman Anggota", "29,803,570,000", "29,894,208,000"], ["Penyisihan Piutang Anggota", "(572,544,000)", "(572,544,000)"], ["Aset Tetap", "2,005,441,458", "2,525,441,458"], ["Aset Lain-Lain", "-", "-"]], total: ["TOTAL ASET", "61,056,076,785", "60,883,164,843"] },
  { title: "LIABILITAS", rows: [["Simp. Sukarela Anggota", "27,262,566,288", "27,003,854,387"], ["Simp. Berjangka Anggota", "21,107,000,000", "21,157,000,000"], ["Simp. Berencana/SIMADRI", "342,290,966", "324,481,844"], ["Simp. Jasa Anggota", "2,092,543,852", "2,092,543,852"], ["Dana Titipan", "699,639,840", "699,639,840"], ["Liabilitas Imbalan Kerja", "227,000,000", "227,000,000"], ["Liabilitas Lain", "58,329,765", "58,935,765"]], total: ["TOTAL LIABILITAS", "51,890,120,711", "51,664,405,688"] },
  { title: "EKUITAS", rows: [["Simp. Pokok / Modal Tetap", "217,300,000", "217,300,000"], ["Simp. Wajib / Modal Tambahan", "2,184,625,000", "2,191,628,000"], ["Cadangan Umum", "3,039,964,625", "3,039,964,625"], ["Cadangan Risiko", "534,078,851", "534,078,851"], ["SHU Periode Berjalan", "240,987,598", "286,787,679"], ["Simp. Khusus", "2,949,000,000", "2,949,000,000"]], total: ["TOTAL EKUITAS", "9,165,956,074", "9,218,759,155"] },
] as const;

export function PerhitunganHasilUsahaRecapTable() {
  return <table className="w-full min-w-[900px] border-collapse text-[12px]"><thead><tr className="uppercase tracking-wider text-[#526786]"><th className="border border-[#c8d3e5] px-2 py-2 text-left">Perkiraan</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">Rencana</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">Bulan Ini</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">s/d Bulan Ini</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">Deviasi</th><th className="border border-[#c8d3e5] px-2 py-2 text-right">%</th></tr></thead><tbody><tr className="bg-[#dfe6eb] font-bold"><td colSpan={6} className="border border-[#c8d3e5] px-2 py-1">PARTISIPASI ANGGOTA</td></tr>{shuRows.map((row, index) => <tr key={`${row[0]}-${index}`} className={row[6] ? "font-bold" : ""}><td className="border border-[#c8d3e5] px-2 py-1">{row[0]}</td>{row.slice(1, 6).map((value, valueIndex) => <td key={valueIndex} className="border border-[#c8d3e5] px-2 py-1 text-right tabular-nums">{value}</td>)}</tr>)}</tbody></table>;
}

function RecapSectionColumn({ sections }: { sections: readonly (typeof neracaSections[number])[] }) {
  return <table className="w-full table-fixed border-collapse text-[11px]"><colgroup><col className="w-[42%]" /><col className="w-[29%]" /><col className="w-[29%]" /></colgroup><thead><tr className="uppercase tracking-wider text-[#526786]"><th className="border border-[#c8d3e5] px-1.5 py-2 text-left">Perkiraan</th><th className="border border-[#c8d3e5] px-1 py-2 text-right">Bulan Lalu</th><th className="border border-[#c8d3e5] px-1 py-2 text-right">Bulan Ini</th></tr></thead><tbody>{sections.map((section) => <React.Fragment key={section.title}><tr className="bg-[#dfe6eb] font-bold"><td colSpan={3} className="border border-[#c8d3e5] px-3 py-1">{section.title}</td></tr>{section.rows.map((row) => <tr key={row[0]}><td className="border border-[#c8d3e5] px-2 py-1">{row[0]}</td><td className="border border-[#c8d3e5] px-2 py-1 text-right tabular-nums">{row[1]}</td><td className="border border-[#c8d3e5] px-2 py-1 text-right tabular-nums">{row[2]}</td></tr>)}<tr className="font-bold"><td className="border border-[#c8d3e5] px-2 py-1">{section.total[0]}</td><td className="border border-[#c8d3e5] px-2 py-1 text-right">{section.total[1]}</td><td className="border border-[#c8d3e5] px-2 py-1 text-right">{section.total[2]}</td></tr></React.Fragment>)}</tbody></table>;
}

export function NeracaSaldoRecapTable() {
  return <div className="grid w-full grid-cols-2 gap-1 bg-white p-1"><RecapSectionColumn sections={[neracaSections[0]]} /><RecapSectionColumn sections={[neracaSections[1], neracaSections[2]]} /></div>;
}
