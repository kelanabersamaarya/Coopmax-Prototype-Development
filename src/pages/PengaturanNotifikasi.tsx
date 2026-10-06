import { useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const notificationRows = [
  ["Transaksi Penarikan", "Transaksi", "Transaksi Penarikan Simpanan", "Tidak Aktif", "Aktif", "Aktif"],
  ["Simpanan Wajib", "Pengingat", "pengingat_simpanan_wajib", "Tidak Aktif", "Aktif", "Aktif"],
  ["Simpanan Berjangka", "Pengingat", "pengingat_simpanan_berjangka", "Tidak Aktif", "Aktif", "Aktif"],
  ["Setoran Simpanan", "Transaksi", "Transaksi Setoran Simpanan", "Tidak Aktif", "Tidak Aktif", "Aktif"],
  ["Pengirim Transfer Antar Rekening", "Pengingat", "push_notif_pengirim_transfer_antar_rekening", "Tidak Aktif", "Aktif", "Aktif"],
];

export default function PengaturanNotifikasi() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [jenisFilter, setJenisFilter] = useState("");
  const filteredRows = jenisFilter
    ? notificationRows.filter((row) => row[1] === jenisFilter)
    : notificationRows;
  const totalPages = 1;

  return (
    <div className="min-h-screen bg-[#f5f7fc] px-4 py-7 text-[#002060] md:px-8">
      <div className="flex items-center justify-between gap-4 px-1">
        <h1 className="text-[22px] font-semibold">Pengaturan Notifikasi <span className="text-[16px] font-normal">Daftar</span></h1>
        <Button onClick={() => navigate("/pengaturan-notifikasi/tambah")} className="h-10 rounded-full bg-white px-5 text-[13px] font-medium text-[#526784] shadow-sm hover:bg-slate-50"><Plus className="mr-2 h-4 w-4" />Tambah</Button>
      </div>
      <section className="mt-8 rounded-[22px] bg-white px-3 py-6 shadow-sm md:px-5">
        <div className="mb-4 text-[13px] text-slate-800">Tampilkan <select className="mx-1 h-7 rounded border border-slate-300 bg-white px-1"><option>5</option></select> entri</div>
        <div className="w-full overflow-hidden">
          <table className="w-full table-fixed border-collapse text-[11px] text-[#123664] md:text-[12px]">
            <colgroup>
              <col className="w-[4%]" /><col className="w-[16%]" /><col className="w-[10%]" /><col className="w-[23%]" />
              <col className="w-[10%]" /><col className="w-[15%]" /><col className="w-[10%]" /><col className="w-[8%]" />
            </colgroup>
            <thead>
              <tr className="text-left text-[10px] font-bold uppercase tracking-wide md:text-[12px]">
                <th className="px-1 py-2">No.</th><th className="bg-[#eef0f4] px-1 py-2">Judul</th><th className="px-1 py-2">Jenis</th><th className="px-1 py-2">Key</th><th className="px-1 py-2">SMS</th><th className="px-1 py-2">Push Notification</th><th className="px-1 py-2">Status</th><th className="px-1 py-2">Aksi</th>
              </tr>
              <tr className="border-b border-slate-300">
                <th /><th className="px-1 py-2"><input aria-label="Cari judul" className="h-7 w-full min-w-0 rounded border border-slate-300 px-1" /></th><th className="px-1 py-2"><select aria-label="Filter jenis" value={jenisFilter} onChange={(event) => setJenisFilter(event.target.value)} className="h-7 w-full min-w-0 rounded border border-slate-300 bg-white text-slate-500"><option value="">-- Semua --</option><option value="Transaksi">Transaksi</option><option value="Pengingat">Pengingat</option><option value="Push Notifikasi">Push Notifikasi</option></select></th><th colSpan={5} />
              </tr>
            </thead>
            <tbody>{filteredRows.map((row) => { const originalIndex = notificationRows.indexOf(row); return <tr key={row[0]} className="border-b border-slate-200"><td className="break-words px-1 py-2 align-top">{originalIndex + 1}</td>{row.map((value, cellIndex) => <td key={`${row[0]}-${cellIndex}`} className="break-words px-1 py-2 align-top">{cellIndex >= 3 ? <span className={`inline-flex rounded px-1.5 py-1 text-[10px] font-bold leading-none text-white ${value === "Aktif" ? "bg-green-600" : "bg-red-500"}`}>{value}</span> : value}</td>)}<td className="whitespace-nowrap px-1 py-2 align-top"><button type="button" aria-label={`Ubah ${row[0]}`} onClick={() => navigate(`/pengaturan-notifikasi/ubah/${originalIndex + 1}`)}><Pencil className="inline h-4 w-4 text-blue-600" /></button><button type="button" aria-label={`Hapus ${row[0]}`}><X className="ml-1 inline h-4 w-4 rounded-full bg-rose-500 p-0.5 text-white" /></button></td></tr>; })}</tbody>
          </table>
        </div>
        <div className="mt-5 flex flex-col gap-4 text-[13px] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>Menampilkan {filteredRows.length ? 1 : 0} sampai {filteredRows.length} dari {filteredRows.length} entri</span>
          <nav aria-label="Pagination" className="flex items-center gap-1">
            <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="h-9 rounded-l bg-[#eef1f5] px-3 text-[#c7d3e4] transition-colors enabled:hover:bg-[#e1e6ed]">Sebelumnya</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} type="button" onClick={() => setCurrentPage(page)} aria-current={currentPage === page ? "page" : undefined} className={`h-9 min-w-9 px-3 font-semibold transition-colors ${currentPage === page ? "bg-[#7138e8] text-white" : "bg-[#eef1f5] text-[#c7d3e4] hover:bg-[#e1e6ed]"}`}>{page}</button>)}
            <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} className="h-9 rounded-r bg-[#eef1f5] px-3 text-[#c7d3e4] transition-colors enabled:hover:bg-[#e1e6ed]">Selanjutnya</button>
          </nav>
        </div>
      </section>
    </div>
  );
}
