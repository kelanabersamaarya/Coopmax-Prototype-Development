import * as React from "react";
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { toast } from "sonner";
import MemberReportEntriesPicker from "@/components/mitra-karya/MemberReportEntriesPicker";
import { Card } from "@/components/ui/card";

const rows = [
  { id: "A33444", name: "Nyoman Simpen", date: "15-06-2023", address: "Surabaya", phone: "821707610807", category: "Anggota", pokok: "5.000.000,00", wajib: "5.000.000,00", khusus: "0,00", penyertaan: "0,00", total: "10.000.000,00", ktp: "Tersedia" },
  { id: "A33444", name: "Nyoman Simpen", date: "15-06-2023", address: "Surabaya", phone: "821707610807", category: "Anggota", pokok: "5.000.000,00", wajib: "5.000.000,00", khusus: "0,00", penyertaan: "0,00", total: "10.000.000,00", ktp: "Tersedia" },
];

function Header({ children, sortable = true }: { children: React.ReactNode; sortable?: boolean }) {
  return <div className="flex items-center justify-between gap-2 leading-[1.15]"><span>{children}</span>{sortable ? <span className="inline-flex flex-col leading-none"><ChevronUp className="h-3.5 w-3.5" /><ChevronDown className="-mt-1 h-3.5 w-3.5" /></span> : null}</div>;
}

function MoneyTotal({ children }: { children: React.ReactNode }) {
  return <td className="ktp-report-cell text-right font-bold whitespace-nowrap">{children}</td>;
}

export default function MitraKaryaLaporanKtp() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <Card className="rounded-[5px] border-0 bg-white p-4 shadow-sm md:p-6">
          <MemberReportEntriesPicker className="mb-10 text-[17px]" />
          <div className="ktp-report-scroll">
            <table className="ktp-report-table">
              <thead>
                <tr>
                  <th className="ktp-report-cell w-[70px]">NO.</th>
                  <th className="ktp-report-cell w-[175px]"><Header>NO.<br />ANGGOTA</Header></th>
                  <th className="ktp-report-cell w-[210px]"><Header>NAMA</Header></th>
                  <th className="ktp-report-cell w-[165px]"><Header>TANGGAL<br />DAFTAR</Header></th>
                  <th className="ktp-report-cell w-[180px]"><Header>ALAMAT</Header></th>
                  <th className="ktp-report-cell w-[230px]"><Header>NO.<br />HANDPHONE</Header></th>
                  <th className="ktp-report-cell w-[180px]"><Header>KATEGORI</Header></th>
                  <th className="ktp-report-cell w-[205px]"><Header>SIMPANAN<br />POKOK</Header></th>
                  <th className="ktp-report-cell w-[205px]"><Header>SIMPANAN<br />WAJIB</Header></th>
                  <th className="ktp-report-cell w-[205px]"><Header>SIMPANAN<br />KHUSUS</Header></th>
                  <th className="ktp-report-cell w-[225px]">SIMPANAN<br />PENYERTAAN</th>
                  <th className="ktp-report-cell w-[210px]">SIMPANAN<br />TOTAL</th>
                  <th className="ktp-report-cell w-[155px]"><Header>STATUS</Header></th>
                  <th className="ktp-report-cell w-[160px]"><Header>FILE KTP</Header></th>
                  <th className="ktp-report-cell w-[100px]"><Header>AKSI</Header></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => <tr key={`${row.id}-${index}`}>
                  <td className="ktp-report-cell">{index + 1}</td><td className="ktp-report-cell">{row.id}</td><td className="ktp-report-cell">{row.name}</td><td className="ktp-report-cell">{row.date}</td><td className="ktp-report-cell">{row.address}</td><td className="ktp-report-cell">{row.phone}</td><td className="ktp-report-cell">{row.category}</td>
                  <td className="ktp-report-cell text-right">{row.pokok}</td><td className="ktp-report-cell text-right">{row.wajib}</td><td className="ktp-report-cell text-right">{row.khusus}</td><td className="ktp-report-cell text-right">{row.penyertaan}</td><td className="ktp-report-cell text-right">{row.total}</td>
                  <td className="ktp-report-cell"><span className="ktp-badge">Anggota</span></td><td className="ktp-report-cell"><span className="ktp-badge">{row.ktp}</span></td><td className="ktp-report-cell text-center"><button type="button" onClick={() => toast("Detail anggota (prototype)")} aria-label={`Lihat ${row.name}`}><Eye className="mx-auto h-6 w-6 text-slate-500" /></button></td>
                </tr>)}
                <tr className="ktp-total-row"><td className="ktp-report-cell font-bold" colSpan={7}>Total per Halaman</td><MoneyTotal>10.000.000,00</MoneyTotal><MoneyTotal>10.000.000,00</MoneyTotal><MoneyTotal>0,00</MoneyTotal><MoneyTotal>0,00</MoneyTotal><MoneyTotal>10.000.000,00</MoneyTotal><td colSpan={3} /></tr>
                <tr className="ktp-total-row"><td className="ktp-report-cell font-bold" colSpan={7}>Total</td><MoneyTotal>10.000.000,00</MoneyTotal><MoneyTotal>10.000.000,00</MoneyTotal><MoneyTotal>0,00</MoneyTotal><MoneyTotal>0,00</MoneyTotal><MoneyTotal>10.000.000,00</MoneyTotal><td colSpan={3} /></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-10 flex flex-col gap-4 text-[14px] md:flex-row md:items-center md:justify-between"><span>Menampilkan 1 sampai 2 dari 2 entri (disaring dari 50,310 entri keseluruhan)</span><div className="flex items-center gap-1"><button disabled className="ktp-page-button">Sebelumnya</button><span className="ktp-page-number">1</span><button disabled className="ktp-page-button">Selanjutnya</button></div></div>
        </Card>
      </div>
    </div>
  );
}
