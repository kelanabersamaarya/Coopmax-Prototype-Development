import type { ReactNode } from "react";
import { History, List, Printer, ExternalLink, CircleX } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type DepositAccount = {
  account: string;
  id: string;
  name: string;
  transaction: string;
  oldDue: string;
  newDue: string;
  oldBalance: string;
  newBalance: string;
};

const accounts: Record<string, DepositAccount> = {
  "55250001": { account: "55250001", id: "A2300013", name: "Yulia Farida", transaction: "08-05-2026", oldDue: "08-05-2026", newDue: "08-05-2027", oldBalance: "100.000.000,00", newBalance: "100.000.000,00" },
  "55230011": { account: "55230011", id: "A2300001", name: "Balijan Uwais", transaction: "24-07-2026", oldDue: "24-07-2026", newDue: "24-07-2027", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  "55230010": { account: "55230010", id: "A2300024", name: "Jessica Uyainah S.Gz", transaction: "31-08-2026", oldDue: "31-08-2026", newDue: "31-08-2027", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  "55230008": { account: "55230008", id: "A2300023", name: "Jamil Thamrin", transaction: "17-07-2025", oldDue: "18-07-2025", newDue: "18-07-2027", oldBalance: "50.000.000,00", newBalance: "50.000.000,00" },
  "55230007": { account: "55230007", id: "A2300013", name: "Yulia Farida", transaction: "15-06-2026", oldDue: "16-06-2026", newDue: "16-06-2027", oldBalance: "10.000.000,00", newBalance: "10.000.000,00" },
  "55230006": { account: "55230006", id: "A2300024", name: "Jessica Uyainah S.Gz", transaction: "15-06-2025", oldDue: "16-06-2025", newDue: "16-06-2026", oldBalance: "1.000.000,00", newBalance: "1.000.000,00" },
  "55230001": { account: "55230001", id: "A2300008", name: "Jelita Padmasari", transaction: "06-06-2024", oldDue: "07-06-2024", newDue: "07-06-2025", oldBalance: "20.000.000,00", newBalance: "20.000.000,00" },
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return <div className="grid grid-cols-[minmax(190px,245px)_14px_minmax(0,1fr)] items-center gap-x-3 py-2.5 text-[14px]"><span className="text-[#52627d]">{label}</span><span className="text-center font-semibold text-[#91a6c6]">:</span><span className="font-bold text-[#18243a]">{children}</span></div>;
}

export default function PerpanjanganDepositoDetail() {
  const navigate = useNavigate();
  const { accountNo = "55250001" } = useParams();
  const account = accounts[decodeURIComponent(accountNo)] ?? accounts["55250001"];

  return <div className="min-h-screen bg-[#f5f7fc] px-4 pb-8 pt-6 text-[#08285f] md:px-10 md:pt-8">
    <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-xl font-semibold tracking-tight md:text-2xl">Perpanjangan Deposit <span className="font-normal">Detail</span></h1><div className="flex flex-wrap justify-end gap-2"><Button className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm"><Printer className="mr-2 h-4 w-4" />Dokumen</Button><Button className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm"><History className="mr-2 h-4 w-4" />Riwayat Transaksi</Button><Button onClick={() => navigate("../")} className="h-10 rounded-full bg-white px-4 text-[13px] font-normal text-[#526784] shadow-sm"><List className="mr-2 h-4 w-4" />Kembali ke Daftar</Button></div></div>
    <Card className="mt-5 rounded-[22px] border-0 bg-white p-5 shadow-[0_12px_35px_rgba(40,70,120,0.04)]"><section><h2 className="text-[14px] font-bold uppercase">Informasi Rekening</h2><div className="mt-5 rounded-[11px] bg-[#5944ff] p-5 text-white"><p className="text-[13px] font-bold uppercase">SIJAKOP</p><div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-[12px] text-white/75">Kode Deposito</p><b>{account.account}</b></div><div><p className="text-[12px] text-white/75">Kolektor</p><b>Dinda Sudati</b></div><div><p className="text-[12px] text-white/75">Tanggal Transaksi</p><b>{account.transaction}</b></div><div><p className="text-[12px] text-white/75">Jatuh Tempo Lama</p><b>{account.oldDue}</b></div><div><p className="text-[12px] text-white/75">Jatuh Tempo Baru</p><b>{account.newDue}</b></div><div><p className="text-[12px] text-white/75">Saldo Lama</p><b>{account.oldBalance}</b></div><div><p className="text-[12px] text-white/75">Saldo Baru</p><b>{account.newBalance}</b></div><div><p className="text-[12px] text-white/75">Status</p><span className="inline-block rounded bg-[#4bc800] px-2 py-1 text-xs font-bold">Berhasil</span></div></div></div></section><section className="mt-9 border-t border-[#dfe3e9] pt-4"><h2 className="mb-5 text-[13px] font-bold uppercase tracking-wide text-[#18243a]">Informasi Nasabah</h2><div className="grid gap-x-16 lg:grid-cols-2"><div><Row label="ID"><span className="inline-flex items-center gap-2 text-[#2868ed]">{account.id}<span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#b8d3ff] bg-[#f0f6ff]"><ExternalLink className="h-4 w-4" /></span></span></Row><Row label="NIP">-</Row><Row label="Nama">{account.name}</Row><Row label="Tanggal Lahir">1990-01-02</Row><Row label="Kategori Nasabah">Anggota</Row><Row label="Jenis Kelamin">Perempuan</Row><Row label="Alamat">Jl. Sri Rama No. 49</Row><Row label="Hubungan dengan Koperasi">Calon Anggota</Row><Row label="Tanggal Daftar">2024-12-06</Row><Row label="Tag">-</Row><Row label="Unit">-</Row><Row label="Status Verifikasi KTP"><span className="inline-flex w-fit items-center gap-2 rounded-md bg-[#ffe2e2] px-3 py-2 text-[12px] font-bold text-red-600"><CircleX className="h-4 w-4" />BELUM TERVERIFIKASI</span></Row><Row label="Status"><span className="inline-flex rounded bg-[#ed1745] px-2.5 py-1 text-[12px] font-bold text-white">Tidak Aktif</span></Row></div><div><Row label="Agama">Hindu</Row><Row label="Pekerjaan">SWASTA</Row><Row label="Perusahaan Tempat Bekerja">-</Row><Row label="Alamat Perusahaan Tempat Bekerja">-</Row><Row label="Jenis Identitas">KTP</Row><Row label="No. Identitas">6203617005258715</Row><Row label="No. Telp/Handphone">023 5822 6972</Row><Row label="Alamat Email">putu@gmail.com</Row></div></div></section></Card>
  </div>;
}
