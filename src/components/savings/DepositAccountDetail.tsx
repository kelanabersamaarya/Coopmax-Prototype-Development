import * as React from "react";
import { CalendarDays, ChevronDown, FileText, History, List, Percent, Pencil, Printer, Trash2, XSquare } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DepositTransactionHistoryDialog from "@/components/savings/DepositTransactionHistoryDialog";

export type DepositDetailAccount = {
  rekening: string;
  tanggal: string;
  produk: string;
  idNasabah: string;
  nama: string;
  saldo: string;
  bunga: string;
  bungaTahun: string;
  status: "Aktif";
};

function Action({ icon: Icon, children, onClick }: { icon: React.ElementType; children: React.ReactNode; onClick: () => void }) {
  return <Button variant="ghost" onClick={onClick} className="h-10 rounded-full bg-white px-3.5 text-[13px] font-normal text-[#526784] shadow-sm hover:bg-[#5b45f5] hover:text-white"><Icon className="mr-2 h-4 w-4" />{children}</Button>;
}

function QrCode() {
  return <div className="h-[156px] w-[156px] bg-white p-1"><svg viewBox="0 0 21 21" className="h-full w-full" shapeRendering="crispEdges"><rect width="21" height="21" fill="white" /><path fill="black" d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0zM2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2zM9 1h2v3H9zM8 6h3v2H8zM12 8h2v3h-2zM8 10h2v2H8zM15 9h2v2h-2zM18 11h3v2h-3zM10 14h3v2h-3zM8 17h2v3H8zM12 18h2v2h-2zM15 14h2v3h-2zM18 16h3v3h-3zM6 9h2v2H6zM3 10h3v2H3zM13 5h2v2h-2z" /></svg></div>;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="grid grid-cols-[minmax(150px,205px)_14px_minmax(0,1fr)] gap-1 py-1 text-[13px] leading-7"><span className="text-[#7186a8]">{label}</span><span>:</span><span className="font-medium text-[#14284b]">{value}</span></div>;
}

export default function DepositAccountDetail({ account, onBack }: { account: DepositDetailAccount; onBack: () => void }) {
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const action = (label: string) => label === "Riwayat Transaksi" ? setHistoryOpen(true) : toast(label, { description: "Fitur ini tersedia pada prototipe rekening deposito." });
  return <div className="min-h-screen bg-[hsl(var(--app-bg))] px-2 pb-8 pt-6 text-[#08285f] md:px-3 md:pt-8">
    <DepositTransactionHistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} accountNo={account.rekening} />
    <div className="flex items-baseline gap-2"><h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Rekening Deposito</h1><span className="text-sm font-semibold text-slate-600">Detail</span></div>
    <div className="mt-5 flex flex-wrap gap-2"><Action icon={CalendarDays} onClick={() => action("Perpanjangan Deposito")}>Perpanjangan Deposito</Action><Action icon={History} onClick={() => action("Riwayat Transaksi")}>Riwayat Transaksi</Action><Action icon={XSquare} onClick={() => action("Tutup Rekening")}>Tutup Rekening</Action><Action icon={Printer} onClick={() => action("Bilyet Deposito")}>Bilyet Deposito</Action><Action icon={FileText} onClick={() => action("Dokumen")}>Dokumen <ChevronDown className="ml-0.5 h-3.5 w-3.5" /></Action><Action icon={CalendarDays} onClick={() => action("Ubah Jatuh Tempo")}>Ubah Jatuh Tempo</Action><Action icon={Percent} onClick={() => action("Ubah Bunga")}>Ubah Bunga</Action><Action icon={Pencil} onClick={() => action("Ubah")}>Ubah</Action><Action icon={Trash2} onClick={() => action("Hapus")}>Hapus</Action><Action icon={List} onClick={onBack}>Kembali ke Daftar</Action></div>
    <Card className="mt-5 rounded-3xl border-slate-200/70 bg-white p-5 shadow-sm md:p-6"><h2 className="text-[14px] font-bold uppercase text-slate-900">Informasi Rekening</h2><div className="mt-5 grid gap-8 lg:grid-cols-[185px_minmax(0,1fr)]"><div><QrCode /><div className="mt-3 flex gap-2"><Button onClick={() => action("Preview QR")} className="h-8 rounded-md bg-blue-600 px-2 text-xs"><FileText className="mr-1 h-3.5 w-3.5" />Preview</Button><Button onClick={() => action("Cetak QR")} className="h-8 rounded-md bg-blue-600 px-2 text-xs"><Printer className="mr-1 h-3.5 w-3.5" />Cetak</Button></div></div><div className="rounded-[10px] bg-[#5745f6] p-5 text-white shadow-sm"><p className="font-bold">{account.produk}</p><div className="mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4"><div><span className="text-white/70">Kode Deposito</span><br /><b>{account.rekening}</b></div><div><span className="text-white/70">Kolektor</span><br /><b>Hilda Usamah</b></div><div><span className="text-white/70">Tanggal Dibuat</span><br /><b>{account.tanggal}</b></div><div><span className="text-white/70">Tanggal Jatuh Tempo</span><br /><b>29 Jan 2027</b></div><div><span className="text-white/70">Periode Waktu</span><br /><b>12 Bulan</b></div><div><span className="text-white/70">Bunga</span><br /><b>{account.bungaTahun.replace(".", ",")} % / Tahun</b></div><div><span className="text-white/70">Saldo</span><br /><b>{account.saldo}</b></div><div><span className="text-white/70">Saldo Bunga</span><br /><b>{account.bunga}</b></div><div><span className="text-white/70">No. Rekening Tabungan</span><br /><b>-</b></div><div><span className="text-white/70">Status</span><br /><Badge className="mt-0.5 rounded bg-lime-500 px-1.5 py-0.5 text-xs text-white hover:bg-lime-500">{account.status}</Badge></div></div></div></div>
      <section className="mt-8 border-t border-slate-200 pt-4"><h2 className="text-[14px] font-bold uppercase text-slate-900">Informasi Nasabah</h2><div className="mt-4 grid gap-x-12 lg:grid-cols-2"><div><InfoRow label="ID" value={<span className="text-blue-600">{account.idNasabah} ↗</span>} /><InfoRow label="NIP" value="2215754047" /><InfoRow label="Nama" value={account.nama} /><InfoRow label="Tanggal Lahir" value="2003-04-01" /><InfoRow label="Kategori Nasabah" value="Anggota" /><InfoRow label="Jenis Kelamin" value="Perempuan" /><InfoRow label="Alamat" value="Batu bulan" /><InfoRow label="Hubungan dengan Koperasi" value="Calon Anggota" /><InfoRow label="Tanggal Daftar" value="2024-04-29" /><InfoRow label="Tag" value="" /><InfoRow label="Unit" value="" /><InfoRow label="Status Verifikasi KTP" value={<span className="inline-flex rounded bg-red-100 px-3 py-1 text-red-600">◉ BELUM TERVERIFIKASI</span>} /><InfoRow label="Status" value={<Badge className="rounded bg-green-600 px-1.5 py-0.5 text-xs hover:bg-green-600">Aktif</Badge>} /></div><div><InfoRow label="Agama" value="Hindu" /><InfoRow label="Profesi" value="WIRASWASTA" /><InfoRow label="Jenis Identitas" value="KTP" /><InfoRow label="No. Identitas" value="1304760912222393" /><InfoRow label="No. Telp/Handphone" value="0289 9152 242" /><InfoRow label="Alamat Email" value="desakhandayani@gmail.com" /></div></div></section><section className="mt-8 border-t border-slate-200 pt-4"><h2 className="text-[14px] font-bold uppercase text-slate-900">Informasi Biaya</h2><p className="mt-7 px-2 text-[13px] text-slate-800">Tidak ada biaya</p></section></Card>
  </div>;
}
