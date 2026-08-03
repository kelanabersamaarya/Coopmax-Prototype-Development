"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  QrCode,
  Printer,
  Eye,
  ExternalLink,
  AlertTriangle,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useLoanInterestRate } from "@/lib/loanInterestStore";
import InformasiRekeningHeader from "@/components/anggota/InformasiRekeningHeader";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-extrabold tracking-wide text-slate-900">
      {children}
    </div>
  );
}

function SubSectionHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <SectionTitle>{title}</SectionTitle>
    </div>
  );
}

function KeyValueRow({
  label,
  value,
  right = false,
}: {
  label: string;
  value: React.ReactNode;
  right?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid items-baseline gap-x-3 gap-y-1 py-2",
        right
          ? "[grid-template-columns:minmax(0,180px)_14px_minmax(0,1fr)]"
          : "[grid-template-columns:minmax(0,220px)_14px_minmax(0,1fr)]",
      )}
    >
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-center text-sm font-semibold text-slate-400">:</div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function StatusPill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "ok" | "warn" | "bad";
}) {
  const map = {
    ok: "bg-emerald-600 text-white",
    warn: "bg-amber-500 text-white",
    bad: "bg-rose-600 text-white",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-extrabold",
        map[tone],
      )}
    >
      {children}
    </span>
  );
}

function ActiveBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-extrabold text-white">
      {children}
    </span>
  );
}

function SuccessBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-extrabold text-white">
      {children}
    </span>
  );
}

type StatusHistoryRow = {
  no: number;
  status: string;
  tanggal: string;
  diubahOleh: string;
  deskripsi: string;
};

const statusHistorySeed: StatusHistoryRow[] = [
  {
    no: 1,
    status: "Aktif / Sudah Dicairkan",
    tanggal: "07-04-2026",
    diubahOleh: "Gusman",
    deskripsi: "tess",
  },
  {
    no: 2,
    status: "Disetujui",
    tanggal: "07-04-2026",
    diubahOleh: "Gusman",
    deskripsi: "Tes",
  },
  {
    no: 3,
    status: "Diajukan",
    tanggal: "07-04-2026",
    diubahOleh: "Gusman",
    deskripsi: "Tes",
  },
];

export default function LoanAccountDetailSections({
  accountNo,
  meta,
}: {
  accountNo: string;
  meta?: {
    skemaTagihan?: string;
    satuanGracePeriod?: string;
    durasiGracePeriod?: string;
  };
}) {
  const [history, setHistory] = React.useState<StatusHistoryRow[]>(
    () => statusHistorySeed,
  );
  const interestRate = useLoanInterestRate(accountNo, 12);
  const formattedInterestRate = `${interestRate.toFixed(2).replace(".", ",")}%`;

  return (
    <Card className="mt-4 rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
      <SubSectionHeader title="INFORMASI REKENING" />

      <div className="mt-4 grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Card className="rounded-3xl border-slate-200/70 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-extrabold tracking-tight text-slate-900">
              QR
            </div>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 ring-1 ring-slate-200">
              <QrCode className="h-5 w-5" />
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
            <div className="grid place-items-center p-4">
              <div className="grid h-[140px] w-[140px] place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                <div className="text-center text-[11px] font-semibold text-slate-600">
                  QR CODE
                  <div className="mt-1 text-[10px] text-slate-500">
                    {accountNo}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() =>
                toast("Preview (prototype)", { description: `Rekening: ${accountNo}` })
              }
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white ring-1 ring-blue-600/20 transition hover:bg-blue-700"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button
              type="button"
              onClick={() =>
                toast("Cetak (prototype)", { description: `Rekening: ${accountNo}` })
              }
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white ring-1 ring-blue-600/20 transition hover:bg-blue-700"
            >
              <Printer className="h-4 w-4" />
              Cetak
            </button>
          </div>
        </Card>

        <div className="min-w-0">
          <InformasiRekeningHeader
            title="PINJAMAN BULANAN 9"
            items={[
              { label: "Kode Pinjaman", value: accountNo },
              { label: "Sektor Pinjaman", value: "Umum" },
              { label: "Tujuan Pinjaman", value: "Konsumtif" },
              { label: "Kolektor", value: "Gina Farida M.M." },
              { label: "Tanggal Dibuat", value: "07 Apr 2026" },
              { label: "Tanggal Jatuh Tempo", value: "07 Apr 2027" },
              { label: "Tanggal Transaksi Terakhir", value: "14 Apr 2026" },
              { label: "Selisih Tanggal Transaksi", value: "6 Hari" },
              { label: "Tanggal Pinjaman Aktif", value: "07 Apr 2026" },
              { label: "Tanggal Pembayaran Setiap Bulan", value: "07" },
              { label: "Periode Waktu", value: "12 Bulan" },
              { label: "Metode Bunga Pinjaman", value: "Bunga Flat" },
              { label: "Bunga Per Tahun (%)", value: formattedInterestRate },
              { label: "Jumlah Pinjaman Diajukan", value: "12.000.000,00" },
              { label: "Jumlah Pinjaman Disetujui", value: "12.000.000,00" },
              { label: "Sisa Pinjaman", value: "10.553.571,00" },
              { label: "Sisa Bunga Pinjaman", value: "1.266.429,00" },
              { label: "Angsuran Pokok", value: "1.000.000,00" },
              { label: "Angsuran Bunga", value: "120.000,00" },
              { label: "Hutang Pokok", value: "0,00" },
              { label: "Hutang Bunga", value: "0,00" },
              { label: "Jumlah Hutang Pokok", value: "0 Kali" },
              { label: "Jumlah Hutang Bunga", value: "0 Kali" },
              { label: "Total Bayar Bunga", value: "120.000,00" },
              { label: "Total Harus Bayar", value: "1.120.000,00" },
              { label: "Kolektibilitas", value: "-" },
              {
                label: "Status",
                value: (
                  <span className="inline-flex items-center rounded-md bg-lime-500 px-2.5 py-1 text-xs font-extrabold text-white ring-1 ring-lime-200/30">
                    Aktif / Sudah Dicairkan
                  </span>
                ),
              },
              ...(meta?.skemaTagihan
                ? [{ label: "Skema Tagihan", value: meta.skemaTagihan }]
                : []),
              ...(meta?.satuanGracePeriod
                ? [{ label: "Satuan Grace Period", value: meta.satuanGracePeriod }]
                : []),
              ...(meta?.durasiGracePeriod
                ? [{ label: "Durasi Grace Period", value: meta.durasiGracePeriod }]
                : []),
            ]}
          />
        </div>
      </div>

      <Separator className="my-6 bg-slate-200/70" />

      <SubSectionHeader title="INFORMASI NASABAH" />

      <div className="mt-4 rounded-3xl bg-transparent p-0 ring-0 md:p-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <KeyValueRow
              label="ID"
              value={
                <span className="inline-flex items-center gap-2">
                  <span className="text-blue-600">N2400033</span>
                  <button
                    type="button"
                    onClick={() => toast("Buka data nasabah (prototype)")}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-200 hover:bg-blue-100"
                    aria-label="Buka data nasabah"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </span>
              }
            />
            <KeyValueRow label="NIP" value="-" />
            <KeyValueRow label="Nama" value="Rika Wastuti" />
            <KeyValueRow label="Tanggal Lahir" value="1990-01-02" />
            <KeyValueRow label="Kategori Nasabah" value="Anggota" />
            <KeyValueRow label="Jenis Kelamin" value="Perempuan" />
            <KeyValueRow label="Alamat" value="Jl. Sri Rama No. 49" />
            <KeyValueRow label="Hubungan dengan Koperasi" value="Calon Anggota" />
            <KeyValueRow label="Tanggal Daftar" value="2024-12-06" />
            <KeyValueRow label="Tag" value="-" />
            <KeyValueRow label="Unit" value="-" />
            <KeyValueRow
              label="Status Verifikasi KTP"
              value={
                <span className="inline-flex items-center gap-2 rounded-[5px] bg-rose-100 px-3 py-2 text-[12px] font-semibold text-red-600">
                  <CircleX className="h-4 w-4" />
                  BELUM TERVERIFIKASI
                </span>
              }
            />
            <KeyValueRow
              label="Status"
              value={<StatusPill tone="bad">Tidak Aktif</StatusPill>}
            />
          </div>

          <div>
            <KeyValueRow label="Agama" value="Hindu" right />
            <KeyValueRow label="Profesi" value="SWASTA" right />
            <KeyValueRow label="Jenis Identitas" value="KTP" right />
            <KeyValueRow label="No. Identitas" value="6203617005258715" right />
            <KeyValueRow label="No. Telp/Handphone" value="023 5822 6972" right />
            <KeyValueRow label="Alamat Email" value="putua@gmail.com" right />
          </div>
        </div>
      </div>

      <Separator className="my-6 bg-slate-200/70" />

      <SubSectionHeader title="INFORMASI KREDIT" />

      <div className="mt-4 rounded-3xl bg-transparent p-0 ring-0 md:p-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <KeyValueRow label="Tanggal Realisasi" value="16-03-2026" />
            <KeyValueRow label="Besar Pinjaman / Plafon" value="10.000.000" />
            <KeyValueRow label="Biaya Administrasi" value="100.000" />
            <KeyValueRow label="Biaya Materai" value="200.000" />
            <KeyValueRow label="Jumlah Potongan" value="322.000" />
            <KeyValueRow label="Penerimaan Bersih" value="9.678.000" />
            <KeyValueRow
              label="Terbilang"
              value={
                <span className="block leading-snug">
                  Sembilan Juta Enam Ratus
                  <br />
                  Tujuh Puluh Delapan Ribu
                </span>
              }
            />
            <KeyValueRow label="Dicairkan ke Rekening Tabungan" value="8503046" />
          </div>

          <div>
            <KeyValueRow label="Satuan Grace Period" value="Bulan" right />
            <KeyValueRow label="Durasi Grace Period" value="6" right />
            <KeyValueRow
              label="Status Grace Period"
              value={<ActiveBadge>Aktif</ActiveBadge>}
              right
            />
            <KeyValueRow
              label="Skema Tagihan"
              value={
                <span className="font-semibold">
                  Tagihan Sesuai Jadwal Angsuran
                </span>
              }
              right
            />
            <KeyValueRow
              label="Tagihan Angsuran Menggunakan Tabel Angsuran"
              value={<ActiveBadge>Aktif</ActiveBadge>}
              right
            />
            <KeyValueRow
              label="Status Tabel Angsuran"
              value={
                <SuccessBadge>
                  <span className="mr-1">✓</span> Berhasil Tersinkron
                </SuccessBadge>
              }
              right
            />
          </div>
        </div>
      </div>

      <Separator className="my-6 bg-slate-200/70" />

      <SubSectionHeader title="DATA ANGGOTA KELUARGA" />

      <div className="mt-4">
        <div className="flex flex-col gap-3 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 ring-1 ring-amber-200">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-extrabold tracking-tight text-amber-950">
                Data nasabah belum terverifikasi.
              </div>
              <div className="mt-1 text-sm leading-relaxed text-amber-900">
                Silakan lakukan verifikasi nasabah untuk mendapatkan data anggota keluarga.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              toast("Proses Verifikasi Data (prototype)", {
                description: "Aksi verifikasi belum terhubung.",
              })
            }
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#0b3b72] px-4 text-sm font-semibold text-white ring-1 ring-[#0b3b72]/20 transition hover:bg-[#0a3363] sm:w-[320px]"
          >
            <ShieldCheck className="h-4.5 w-4.5" />
            Proses Verifikasi Data
          </button>
        </div>
      </div>

      <Separator className="my-6 bg-slate-200/70" />

      <SubSectionHeader title="INFORMASI AGUNAN" />
      <div className="mt-4 text-sm text-slate-700">Tidak ada agunan</div>

      <Separator className="my-6 bg-slate-200/70" />

      <SubSectionHeader title="INFORMASI FILE" />
      <div className="mt-4 text-sm text-slate-700">
        Tidak ada file yang diupload
      </div>

      <Separator className="my-6 bg-slate-200/70" />

      <SubSectionHeader title="RIWAYAT PERUBAHAN STATUS" />

      <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-200">
        <div className="safe-x-scroll">
          <table className="w-full min-w-[980px] border-collapse bg-white">
            <thead className="bg-slate-50">
              <tr className="text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-600">
                <th className="w-[70px] px-4 py-3">No.</th>
                <th className="w-[280px] px-4 py-3">Status</th>
                <th className="w-[160px] px-4 py-3">Tanggal</th>
                <th className="w-[160px] px-4 py-3">Diubah Oleh</th>
                <th className="min-w-[360px] px-4 py-3">Deskripsi</th>
                <th className="w-[100px] px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Belum ada riwayat.
                  </td>
                </tr>
              ) : (
                history.map((row) => (
                  <tr key={row.no} className="border-t border-slate-100 text-sm">
                    <td className="px-4 py-3 text-slate-700">{row.no}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {row.status}
                    </td>
                    <td className="px-4 py-3 text-slate-800">{row.tanggal}</td>
                    <td className="px-4 py-3 text-slate-800">
                      {row.diubahOleh}
                    </td>
                    <td className="px-4 py-3 text-slate-800">
                      {row.deskripsi}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setHistory((current) =>
                              current.filter((item) => item.no !== row.no),
                            );
                            toast("Hapus (prototype)", {
                              description: `Riwayat #${row.no} dihapus.`,
                            });
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-700 ring-1 ring-rose-200 hover:bg-white"
                          aria-label="Hapus"
                          title="Hapus"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}