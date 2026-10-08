import type { ReactNode } from "react";
import { CircleX, History, List, ExternalLink, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const accounts = {
  "55260003": { accountNo: "55260003", customer: "Surya Pratama", id: "N2600020", closedAt: "02 Oct 2026" },
  "55260004": { accountNo: "55260004", customer: "M.JOHAN PAKPAHAN, SIPMA", id: "N2600021", closedAt: "02 Oct 2026" },
  "55260002": { accountNo: "55260002", customer: "Andika Wijaya", id: "N2600019", closedAt: "02 Oct 2026" },
  "55260005": { accountNo: "55260005", customer: "Jaya Kumara", id: "N2600022", closedAt: "02 Oct 2026" },
};

type Account = (typeof accounts)[keyof typeof accounts];

function DetailRow({ label, value, children }: { label: string; value?: string; children?: ReactNode }) {
  return <div className="grid grid-cols-[minmax(190px,1fr)_14px_minmax(0,1fr)] items-center gap-x-2 py-1.5 text-[13px]"><span className="text-[#7186a8]">{label}</span><span className="font-semibold text-[#8da0bd]">:</span><span className="font-semibold text-[#14223b]">{children ?? value ?? ""}</span></div>;
}

function SummaryItem({ label, value, children }: { label: string; value?: string; children?: ReactNode }) {
  return <div><p className="text-[13px] text-white/75">{label}</p><strong className="text-[14px]">{children ?? value}</strong></div>;
}

export default function TutupRekeningBerjangkaDetail() {
  const navigate = useNavigate();
  const { accountNo = "55260003" } = useParams();
  const account: Account = accounts[decodeURIComponent(accountNo) as keyof typeof accounts] ?? accounts["55260003"];

  return <div className="min-h-screen bg-[#f5f7fc] px-4 pb-8 pt-6 text-[#08285f] md:px-10 md:pt-8">
    <div className="flex flex-wrap items-center justify-between gap-4 px-1"><h1 className="text-xl font-semibold tracking-tight md:text-2xl">Tutup Rekening <span className="font-normal">Detail</span></h1><div className="flex flex-wrap justify-end gap-2"><Button className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm"><History className="mr-2 h-4 w-4" />Riwayat Transaksi</Button><Button onClick={() => navigate("../")} className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm"><List className="mr-2 h-4 w-4" />Kembali ke Daftar</Button><Button className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm"><X className="mr-2 h-4 w-4" />Pembatalan Tutup Rekening</Button></div></div>
    <Card className="mt-5 rounded-[22px] border-0 bg-white p-5 shadow-[0_12px_35px_rgba(40,70,120,0.04)] md:p-5"><section><h2 className="text-[14px] font-bold uppercase">Informasi Rekening</h2><div className="mt-5 rounded-[11px] bg-[#5944ff] p-5 text-white"><p className="text-[13px] font-bold uppercase">SIJAKOP</p><div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4"><SummaryItem label="Kode Deposito" value={account.accountNo} /><SummaryItem label="Kolektor" value="Dinda Sudati" /><SummaryItem label="Tanggal Dibuat" value="02 Oct 2026" /><SummaryItem label="Tanggal Jatuh Tempo" value="02 Oct 2027" /><SummaryItem label="Tanggal Ditutup" value={account.closedAt} /><SummaryItem label="Periode Waktu" value="12 Bulan" /><SummaryItem label="Bunga Per Tahun (%)" value="10,00 %" /><SummaryItem label="Saldo" value="0,00" /><SummaryItem label="Saldo Bunga" value="0,00" /><SummaryItem label="Status"><span className="inline-block rounded-[3px] bg-[#ed1745] px-1.5 py-0.5 text-[12px] font-bold">Tutup</span></SummaryItem><SummaryItem label="Keterangan" value="OK" /></div></div></section><section className="mt-9 border-t border-[#dfe3e9] pt-4"><h2 className="mb-4 text-[14px] font-bold uppercase">Informasi Nasabah</h2><div className="grid gap-x-12 lg:grid-cols-2"><div><DetailRow label="ID"><span className="text-[#245be9]">{account.id} <ExternalLink className="inline h-4 w-4" /></span></DetailRow><DetailRow label="NIP" value="0000" /><DetailRow label="Nama" value={account.customer} /><DetailRow label="Tanggal Lahir" value="2004-10-26" /><DetailRow label="Kategori Nasabah" value="Anggota" /><DetailRow label="Jenis Kelamin" value="Perempuan" /><DetailRow label="Alamat" value="Tabanan" /><DetailRow label="Hubungan dengan Koperasi" value="Calon Anggota" /><DetailRow label="Tanggal Daftar" value="2026-10-02" /><DetailRow label="Tag" /><DetailRow label="Unit" /><DetailRow label="Status Verifikasi KTP"><span className="inline-flex items-center gap-2 rounded-[4px] bg-[#ffe5e5] px-4 py-2 font-medium text-red-600"><CircleX className="h-5 w-5 fill-red-600 text-white" />BELUM TERVERIFIKASI</span></DetailRow><DetailRow label="Status"><span className="rounded-[3px] bg-green-600 px-1.5 py-0.5 text-xs font-bold text-white">Aktif</span></DetailRow></div><div><DetailRow label="Agama" value="Hindu" /><DetailRow label="Profesi" value="SWASTA" /><DetailRow label="Jenis Identitas" value="KTP" /><DetailRow label="No. Identitas" value="889998888998889" /><DetailRow label="No. Telp/Handphone" value="87721980075" /><DetailRow label="Alamat Email" /></div></div></section></Card>
  </div>;
}
