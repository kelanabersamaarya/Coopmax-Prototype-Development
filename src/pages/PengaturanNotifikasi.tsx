import { Pencil, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const notificationRows = [
  ["Transaksi Penarikan", "Transaksi", "Transaksi Penarikan Simpanan", "Tidak Aktif", "Aktif", "Aktif"],
  ["Simpanan Wajib", "Pengingat", "pengingat_simpanan_wajib", "Tidak Aktif", "Aktif", "Aktif"],
  ["Simpanan Berjangka", "Pengingat", "pengingat_simpanan_berjangka", "Tidak Aktif", "Aktif", "Aktif"],
  ["Setoran Simpanan", "Transaksi", "Transaksi Setoran Simpanan", "Tidak Aktif", "Tidak Aktif", "Aktif"],
  ["Pengirim Transfer Antar Rekening", "Pengingat", "push_notif_pengirim_transfer_antar_rekening", "Tidak Aktif", "Aktif", "Aktif"],
  ["Pengajuan Pinjaman", "Pengingat", "push_notif_pengajuan_pinjaman", "Tidak Aktif", "Aktif", "Aktif"],
  ["Penerima Transfer Antar Rekening", "Pengingat", "push_notif_penerima_transfer_antar_rekening", "Tidak Aktif", "Aktif", "Aktif"],
  ["Pencairan Pinjaman", "Pengingat", "info_pencairan_pinjaman", "Tidak Aktif", "Aktif", "Aktif"],
  ["Pembukaan Rekening", "Transaksi", "Pembukaan Rekening Simpanan", "Tidak Aktif", "Aktif", "Aktif"],
  ["Pembaharuan Status Pinjaman", "Pengingat", "push_notif_pembaruan_status_pinjaman", "Tidak Aktif", "Aktif", "Aktif"],
  ["Jatuh Tempo Pinjaman", "Pengingat", "pengingat_jatuh_tempo_pinjaman", "Tidak Aktif", "Aktif", "Aktif"],
  ["Gagal Transfer Antar Bank", "Pengingat", "push_notif_gagal_transfer_antar_bank", "Tidak Aktif", "Aktif", "Aktif"],
  ["Bunga Simpanan", "Transaksi", "Bunga Simpanan Sukarela", "Tidak Aktif", "Aktif", "Aktif"],
  ["Angsuran", "Pengingat", "pengingat_angsuran", "Tidak Aktif", "Tidak Aktif", "Aktif"],
];

export default function PengaturanNotifikasi() {
  return (
    <div className="min-h-screen bg-[#f5f7fc] px-4 py-7 text-[#002060] md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-semibold">Pengaturan Notifikasi <span className="text-[16px] font-normal">Daftar</span></h1>
        <Button className="h-9 bg-transparent text-[#526784] shadow-none hover:bg-white"><Plus className="mr-2 h-4 w-4" />Tambah</Button>
      </div>
      <section className="mt-8 rounded-[22px] bg-white px-5 py-6 shadow-sm md:px-6">
        <div className="mb-4 text-[13px] text-slate-800">Tampilkan <select className="mx-1 h-7 rounded border border-slate-300 bg-white px-1"><option>20</option></select> entri</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] border-collapse text-[12px] text-[#123664]">
            <thead><tr className="text-left text-[12px] font-bold uppercase tracking-wide"><th className="w-[5%] px-2 py-2">No.</th><th className="w-[20%] bg-[#eef0f4] px-2 py-2">Judul</th><th className="w-[12%] px-2 py-2">Jenis</th><th className="w-[27%] px-2 py-2">Key</th><th className="w-[12%] px-2 py-2">SMS</th><th className="w-[13%] px-2 py-2">Push Notification</th><th className="w-[9%] px-2 py-2">Status</th><th className="w-[7%] px-2 py-2">Aksi</th></tr><tr className="border-b border-slate-300"><th /><th className="px-2 py-2"><input className="h-8 w-full rounded border border-slate-300" /></th><th className="px-2 py-2"><select className="h-8 w-full rounded border border-slate-300 bg-white text-slate-500"><option>-- Semua --</option></select></th><th colSpan={5} /></tr></thead>
            <tbody>{notificationRows.map((row, index) => <tr key={row[0]} className="border-b border-slate-200"><td className="px-2 py-2">{index + 1}</td>{row.map((value, cellIndex) => <td key={`${row[0]}-${cellIndex}`} className="px-2 py-2">{value}</td>)}<td className="px-2 py-2"><Pencil className="inline h-4 w-4 text-blue-600" /><X className="ml-3 inline h-4 w-4 rounded-full bg-rose-500 p-0.5 text-white" /></td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-5 text-[13px] text-slate-700">Menampilkan 1 sampai 14 dari 14 entri</div>
      </section>
    </div>
  );
}
