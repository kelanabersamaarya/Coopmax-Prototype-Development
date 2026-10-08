import { ExternalLink, History, List, X, CircleX } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

const accounts: Record<string, { accountNo: string; customer: string; product: string; closedAt: string }> = {
  P002260021: { accountNo: "P002260021", customer: "Jaya Kumara", product: "Simpanan Wajib", closedAt: "02 Oct 2026" },
  P001260021: { accountNo: "P001260021", customer: "Jaya Kumara", product: "Simpanan Pokok", closedAt: "02 Oct 2026" },
  SK01260015: { accountNo: "SK01260015", customer: "Jaya Kumara", product: "Simpanan Sukarela", closedAt: "02 Oct 2026" },
};

function Row({ label, value, children }: { label: string; value?: string; children?: ReactNode }) {
  return <div className="grid grid-cols-[minmax(0,205px)_14px_minmax(0,1fr)] items-baseline gap-x-3 py-1.5 text-[13px]"><span className="text-[#7186a8]">{label}</span><span className="text-center text-[#8da0bd]">:</span><span className="font-bold text-[#17233b]">{children ?? value ?? "-"}</span></div>;
}

export default function TutupRekeningDetail() {
  const navigate = useNavigate();
  const { accountNo = "" } = useParams();
  const account = accounts[decodeURIComponent(accountNo)] ?? { accountNo: decodeURIComponent(accountNo), customer: "Jaya Kumara", product: "Simpanan Wajib", closedAt: "02 Oct 2026" };
  const routePrefix = window.location.pathname.startsWith("/anggota/") ? "/anggota/simpanan" : "/simpanan";

  return <div className="min-h-screen bg-[#f5f7fc] px-4 pb-8 pt-6 text-[#08285f] md:px-10 md:pt-8">
    <div className="flex flex-col gap-4 px-1"><h1 className="text-xl font-semibold tracking-tight md:text-2xl">Tutup Rekening <span className="font-normal">Detail</span></h1><div className="flex flex-wrap justify-end gap-2"><Button className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm hover:bg-violet-50"><History className="mr-2 h-4 w-4" />Riwayat Transaksi</Button><Button onClick={() => navigate(`${routePrefix}/tutup-rekening`)} className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm hover:bg-violet-50"><List className="mr-2 h-4 w-4" />Kembali ke Daftar</Button><Button className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm hover:bg-violet-50"><X className="mr-2 h-4 w-4" />Pembatalan Tutup Rekening</Button></div></div>
    <Card className="mt-5 rounded-[22px] border-0 bg-white p-5 shadow-[0_12px_35px_rgba(40,70,120,0.04)] md:p-5"><section><h2 className="text-[14px] font-bold uppercase">Informasi Rekening</h2><div className="mt-5 rounded-[11px] bg-[#7140c5] p-5 text-white"><p className="text-[13px] font-bold uppercase">{account.product}</p><div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-white/75">Kode Tabungan</p><b>{account.accountNo}</b></div><div><p className="text-white/75">Kolektor</p><b>Dinda Sudati</b></div><div><p className="text-white/75">Tanggal Dibuat</p><b>02 Oct 2026</b></div><div><p className="text-white/75">Tanggal Ditutup</p><b>{account.closedAt}</b></div><div><p className="text-white/75">Bunga</p><b>0,000 % / Tahun</b></div><div><p className="text-white/75">Saldo</p><b>0,00</b></div><div><p className="text-white/75">Tabungan Berjangka</p><span className="inline-block rounded-[3px] bg-[#e93455] px-3 text-[12px] font-bold">Tidak</span></div><div><p className="text-white/75">Status</p><span className="inline-block rounded-[3px] bg-[#e93455] px-3 text-[12px] font-bold">Tutup</span></div><div><p className="text-white/75">Keterangan</p><b>OK</b></div></div></div></section><section className="mt-9 border-t border-[#dfe3e9] pt-4"><h2 className="mb-4 text-[14px] font-bold uppercase">Informasi Nasabah</h2><div className="grid gap-x-12 lg:grid-cols-2"><div><Row label="ID"><span className="text-[#245be9]">A2600021 <ExternalLink className="inline h-4 w-4" /></span></Row><Row label="NIP" /><Row label="Nama" value={account.customer} /><Row label="Tanggal Lahir" value="2010-10-03" /><Row label="Kategori Nasabah" value="Anggota" /><Row label="Jenis Kelamin" value="Perempuan" /><Row label="Alamat" /><Row label="Hubungan dengan Koperasi" value="Anggota" /><Row label="Tanggal Daftar" value="2026-10-02" /><Row label="Tag" /><Row label="Unit" /><Row label="Status Verifikasi KTP"><span className="inline-flex items-center gap-2 rounded-[4px] bg-[#ffe5e5] px-4 py-1 font-medium text-red-600"><CircleX className="h-5 w-5 fill-red-600 text-white" />BELUM TERVERIFIKASI</span></Row><Row label="Status"><span className="rounded-[3px] bg-[#e93455] px-1.5 py-0.5 text-xs font-bold text-white">Tidak Aktif</span></Row></div><div><Row label="Agama" value="Islam" /><Row label="Pekerjaan" value="SWASTA" /><Row label="Perusahaan Tempat Bekerja" /><Row label="Alamat Perusahaan Tempat Bekerja" /><Row label="Jenis Identitas" value="KTP" /><Row label="No. Identitas" value="54455443334455" /><Row label="No. Telp/Handphone" value="87721980079" /><Row label="Alamat Email" /></div></div></section></Card>
  </div>;
}
