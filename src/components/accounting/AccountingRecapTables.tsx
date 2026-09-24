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

export function PerhitunganHasilUsahaRecapTable() {
  return <table className="w-full min-w-[760px] border-collapse text-[12px]"><thead><tr className="uppercase tracking-wider text-[#526786]"><th className="border border-[#c8d3e5] px-2 py-2 text-center">Perkiraan</th><th className="border border-[#c8d3e5] px-2 py-2 text-center">Bulan Ini</th><th className="border border-[#c8d3e5] px-2 py-2 text-center">s/d Bulan Ini</th><th className="border border-[#c8d3e5] px-2 py-2 text-center">Deviasi</th><th className="border border-[#c8d3e5] px-2 py-2 text-center">%</th></tr></thead><tbody><tr className="bg-[#dfe6eb] font-bold"><td colSpan={5} className="border border-[#c8d3e5] px-2 py-1">PARTISIPASI ANGGOTA</td></tr>{shuRows.map((row, index) => <tr key={`${row[0]}-${index}`} className={row[6] ? "font-bold" : ""}><td className="border border-[#c8d3e5] px-2 py-1">{row[0]}</td>{row.slice(2, 6).map((value, valueIndex) => <td key={valueIndex} className="border border-[#c8d3e5] px-2 py-1 text-right tabular-nums">{value}</td>)}</tr>)}</tbody></table>;
}

export function NeracaSaldoRecapTable() {
  return <div className="grid w-full grid-cols-2 gap-1 bg-white p-1"><table className="w-full border-collapse text-[11px]"><tbody><tr className="bg-[#dfe6eb] font-bold"><td className="border border-[#c8d3e5] px-3 py-1">ASET</td></tr><tr><td className="border border-[#c8d3e5] px-3 py-1">Kas dan Setara Kas</td></tr><tr className="font-bold"><td className="border border-[#c8d3e5] px-3 py-1">TOTAL ASET</td></tr></tbody></table><table className="w-full border-collapse text-[11px]"><tbody><tr className="bg-[#dfe6eb] font-bold"><td className="border border-[#c8d3e5] px-3 py-1">LIABILITAS</td></tr><tr><td className="border border-[#c8d3e5] px-3 py-1">Simp. Sukarela Anggota</td></tr><tr className="bg-[#dfe6eb] font-bold"><td className="border border-[#c8d3e5] px-3 py-1">EKUITAS</td></tr></tbody></table></div>;
}
