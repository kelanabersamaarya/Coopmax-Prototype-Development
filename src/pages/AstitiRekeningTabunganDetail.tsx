import { CalendarDays, ExternalLink, History, List, PenLine, Printer, XSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type Account = {
  accountNo: string;
  registeredAt: string;
  product: string;
  customerId: string;
  customerName: string;
  balance: string;
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return <div className="grid grid-cols-[205px_14px_minmax(0,1fr)] gap-1 text-[13px] leading-8"><span className="text-[#7186a8]">{label}</span><span>:</span><span className="font-medium text-[#14284b]">{children}</span></div>;
}

function Action({ icon: Icon, children, onClick }: { icon: typeof History; children: ReactNode; onClick?: () => void }) {
  return <Button variant="ghost" onClick={onClick} className="h-10 rounded-full bg-white px-3.5 text-[13px] font-normal text-[#526784] shadow-sm hover:bg-slate-50"><Icon className="mr-2 h-[17px] w-[17px]" />{children}</Button>;
}

function QrPreview() {
  return <div className="h-[156px] w-[156px] bg-white p-2"><svg viewBox="0 0 21 21" className="h-full w-full" shapeRendering="crispEdges"><rect width="21" height="21" fill="white" /><path fill="black" d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0zM2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2zM9 1h2v3H9zM8 6h3v2H8zM12 8h2v3h-2zM8 10h2v2H8zM15 9h2v2h-2zM18 11h3v2h-3zM10 14h3v2h-3zM8 17h2v3H8zM12 18h2v2h-2zM15 14h2v3h-2zM18 16h3v3h-3zM6 9h2v2H6zM3 10h3v2H3zM13 5h2v2h-2z" /></svg></div>;
}

export default function AstitiRekeningTabunganDetail({ account, onBack }: { account: Account; onBack: () => void }) {
  return <div className="min-h-screen bg-[#f5f7fc] px-4 pb-8 pt-5 text-[#08285f] md:px-8 lg:px-10">
    <div className="px-1 sm:px-2">
      <h1 className="text-[21px] font-semibold">Rekening Tabungan <span className="font-normal">Detail</span></h1>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Action icon={CalendarDays}>Riwayat Transaksi Autodebet</Action>
        <Action icon={History}>Riwayat Transaksi</Action>
        <Action icon={XSquare}>Tutup Rekening</Action>
        <Action icon={Printer}>Dokumen⌄</Action>
        <Action icon={List} onClick={onBack}>Kembali ke Daftar</Action>
        <Action icon={PenLine}>Ubah</Action>
      </div>
    </div>
    <main className="mt-6 rounded-[20px] bg-white px-5 py-7 shadow-[0_12px_35px_rgba(40,70,120,0.04)] md:px-5 lg:px-5"><h2 className="text-[14px] font-bold uppercase">Informasi Rekening</h2><div className="mt-5 grid gap-8 lg:grid-cols-[185px_1fr] lg:items-center"><div><QrPreview /><div className="mt-3 flex gap-2"><Button className="h-8 rounded-[4px] bg-[#3267ee] px-3 text-[12px] hover:bg-[#2858d4]">▤ Preview</Button><Button className="h-8 rounded-[4px] bg-[#3267ee] px-3 text-[12px] hover:bg-[#2858d4]"><Printer className="mr-1 h-3.5 w-3.5" />Cetak</Button></div></div><div className="rounded-[11px] bg-[#7140c5] px-5 py-5 text-white"><p className="text-[13px] font-bold uppercase">{account.product}</p><div className="mt-3 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-[12px] text-white/75">Kode Tabungan</p><p className="font-bold">{account.accountNo}</p></div><div><p className="text-[12px] text-white/75">Kolektor</p><p className="font-bold">kopkardbs_kolektor</p></div><div><p className="text-[12px] text-white/75">Tanggal Dibuat</p><p className="font-bold">{account.registeredAt}</p></div><div><p className="text-[12px] text-white/75">Saldo</p><p className="font-bold">{account.balance}</p></div><div><p className="text-[12px] text-white/75">Bunga Per Tahun (%)</p><p className="font-bold">0,00 %</p></div><div><p className="text-[12px] text-white/75">Tabungan Berjangka</p><span className="rounded-[3px] bg-[#e93455] px-4 text-[12px] font-bold">Tidak</span></div><div><p className="text-[12px] text-white/75">Status</p><span className="rounded-[3px] bg-[#4bc800] px-4 text-[12px] font-bold">Aktif</span></div><div><p className="text-[12px] text-white/75">Label</p><p className="font-bold">-</p></div></div></div></div><section className="mt-8 border-t border-[#dfe3e9] pt-4"><h2 className="text-[14px] font-bold uppercase">Informasi Nasabah</h2><div className="mt-4 grid gap-x-12 lg:grid-cols-2"><div><Row label="ID"><span className="inline-flex items-center gap-1 text-[#245be9]">{account.customerId}<ExternalLink className="h-4 w-4" /></span></Row><Row label="NIP">-</Row><Row label="Nama">{account.customerName}</Row><Row label="Tanggal Lahir">1956-11-10</Row><Row label="Kategori Nasabah">Anggota</Row><Row label="Jenis Kelamin">Laki - Laki</Row><Row label="Alamat">Jalan</Row><Row label="Hubungan dengan Koperasi">Anggota</Row><Row label="Tanggal Daftar">2026-09-11</Row><Row label="Tag">-</Row><Row label="Unit">-</Row><Row label="Status Verifikasi KTP"><span className="inline-flex items-center gap-2 rounded-[4px] bg-[#ffe5e5] px-3 py-1 text-red-600"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white">×</span>BELUM TERVERIFIKASI</span></Row><Row label="Status"><span className="rounded-[3px] bg-[#4bc800] px-1.5 py-0.5 text-[12px] font-bold text-white">Aktif</span></Row></div><div><Row label="Agama">Islam</Row><Row label="Profesi">SWASTA</Row><Row label="Jenis Identitas">KTP</Row><Row label="No. Identitas">373020088840006</Row><Row label="No. Telp/Handphone">81284116604</Row><Row label="Alamat Email">djoko.manggolo@gmail.com</Row></div></div></section></main>
  </div>;
}
