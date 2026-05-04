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

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="text-xs font-semibold text-white/85">{label}</div>
      <div className="mt-1 text-sm font-extrabold tracking-tight text-white">
        <span className="block break-words leading-snug">{value}</span>
      </div>
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
}: {
  accountNo: string;
}) {
  const [history, setHistory] = React.useState<StatusHistoryRow[]>(
    () => statusHistorySeed,
  );

  return (
    <Card className="mt-4 rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
      {/* SUBSECTION: INFORMASI REKENING */}
      <SubSectionHeader title="INFORMASI REKENING" />
      <Separator className="my-4 bg-slate-200/70" />

      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* QR + actions */}
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
                toast("Preview (prototype)", {
                  description: `Rekening: ${accountNo}`,
                })
              }
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white ring-1 ring-blue-600/20 transition hover:bg-blue-700"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button
              type="button"
              onClick={() =>
                toast("Cetak (prototype)", {
                  description: `Rekening: ${accountNo}`,
                })
              }
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white ring-1 ring-blue-600/20 transition hover:bg-blue-700"
            >
              <Printer className="h-4 w-4" />
              Cetak
            </button>
          </div>
        </Card>

        {/* Main teal panel */}
        <div className="min-w-0 overflow-hidden rounded-3xl bg-[#17a2b8] p-5 text-white shadow-sm ring-1 ring-white/10 md:p-6">
          <div className="text-sm font-extrabold tracking-wide">
            PINJAMAN BULANAN 9
          </div>

          <div
            className={cn(
              "mt-5 grid gap-x-8 gap-y-5",
              "sm:[grid-template-columns:repeat(2,minmax(0,1fr))]",
              "lg:[grid-template-columns:repeat(4,minmax(0,1fr))]",
            )}
          >
            <Field label="Kode Pinjaman" value={accountNo} />
            <Field label="Sektor Pinjaman" value="Umum" />
            <Field label="Tujuan Pinjaman" value="Konsumtif" />
            <Field label="Kolektor" value="Gina Farida M.M." />

            <Field label="Tanggal Dibuat" value="07 Apr 2026" />
            <Field label="Tanggal Jatuh Tempo" value="07 Apr 2027" />
            <Field label="Tanggal Transaksi Terakhir" value="14 Apr 2026" />
            <Field label="Selisih Tanggal Transaksi" value="6 Hari" />

            <Field label="Tanggal Pinjaman Aktif" value="07 Apr 2026" />
            <Field label="Tanggal Pembayaran Setiap Bulan" value="07" />
            <Field label="Periode Waktu" value="12 Bulan" />
            <Field label="Metode Bunga Pinjaman" value="Bunga Flat" />

            <Field label="Bunga Per Tahun (%)" value="12,00%" />
            <Field label="Jumlah Pinjaman Diajukan" value="12.000.000,00" />
            <Field label="Jumlah Pinjaman Disetujui" value="12.000.000,00" />
            <Field label="Sisa Pinjaman" value="10.553.571,00" />

            <Field label="Sisa Bunga Pinjaman" value="1.266.429,00" />
            <Field label="Angsuran Pokok" value="1.000.000,00" />
            <Field label="Angsuran Bunga" value="120.000,00" />
            <Field label="Hutang Pokok" value="0,00" />

            <Field label="Hutang Bunga" value="0,00" />
            <Field label="Jumlah Hutang Pokok" value="0 Kali" />
            <Field label="Jumlah Hutang Bunga" value="0 Kali" />
            <Field label="Total Bayar Bunga" value="120.000,00" />

            <Field label="Total Harus Bayar" value="1.120.000,00" />
            <Field label="Kolektibilitas" value="-" />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white/85">Status</div>
              <div className="mt-2">
                <span className="inline-flex items-center rounded-md bg-lime-500 px-2.5 py-1 text-xs font-extrabold text-white ring-1 ring-lime-200/30">
                  Aktif / Sudah Dicairkan
                </span>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>

      {/* Divider antar subsection */}
      <Separator className="my-6 bg-slate-200/70" />

      {/* SUBSECTION: INFORMASI NASABAH */}
      <SubSectionHeader title="INFORMASI NASABAH" />

      {/* NOTE: border/ring di section ini dihapus */}
      <div className="mt-4 rounded-3xl bg-transparent p-0 ring-0 md:p-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <KeyValueRow
              label="ID"
              value={
                <span className="inline-flex items-center gap-2">
                  <span className="text-blue-600">N2600006</span>
                  <button
                    type="button"
                    onClick={() => toast("Buka data nasabah (prototype)")}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-200 hover:bg-blue-100"
                    aria-label="Buka"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </span>
              }
            />
            <KeyValueRow label="NIP" value="-" />
            <KeyValueRow label="Nama" value="Bapak Bagus" />
            <KeyValueRow label="Tanggal Lahir" value="2026-04-07" />
            <KeyValueRow label="Kategori Nasabah" value="Anggota" />
            <KeyValueRow label="Jenis Kelamin" value="Laki - Laki" />
            <KeyValueRow label="Alamat" value="Sidakarya" />
            <KeyValueRow label="Hubungan dengan Koperasi" value="Calon Anggota" />
            <KeyValueRow label="Tanggal Daftar" value="2026-04-07" />
            <KeyValueRow label="Tag" value="-" />
            <KeyValueRow label="Unit" value="-" />
            <KeyValueRow
              label="Status Verifikasi KTP"
              value={<StatusPill tone="bad">BELUM TERVERIFIKASI</StatusPill>}
            />
            <KeyValueRow label="Status" value={<StatusPill tone="ok">Aktif</StatusPill>} />
          </div>

          <div>
            <KeyValueRow label="Agama" value="Hindu" right />
            <KeyValueRow label="Profesi" value="Tidak Bekerja" right />
            <KeyValueRow label="Jenis Identitas" value="KTP" right />
            <KeyValueRow label="No. Identitas" value="887878787878787" right />
            <KeyValueRow label="No. Telp/Handphone" value="887878787" right />
            <KeyValueRow label="Alamat Email" value="-" right />
          </div>
        </div>
      </div>

      {/* Divider antar subsection */}
      <Separator className="my-6 bg-slate-200/70" />

      {/* SUBSECTION: INFORMASI KREDIT */}
      <SubSectionHeader title="INFORMASI KREDIT" />

      {/* NOTE: border/ring & garis-garis per baris dihapus */}
      <div className="mt-4 rounded-3xl bg-transparent p-0 ring-0 md:p-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <KeyValueRow label="Tanggal Realisasi" value="07-04-2026" />
            <KeyValueRow label="Besar Pinjaman / Plafond" value="12.000.000,00" />
            <KeyValueRow label="Propisi" value="0,00" />
            <KeyValueRow label="Administrasi" value="120.000,00" />
            <KeyValueRow label="Biaya Asuransi" value="0,00" />
          </div>

          <div>
            <KeyValueRow label="Jumlah Potongan" value="0" right />
            <KeyValueRow label="Penerimaan Bersih" value="11.880.000,00" right />
            <KeyValueRow
              label="Terbilang"
              value="Sebelas Juta Delapan Ratus Delapan Puluh Ribu"
              right
            />
            <KeyValueRow label="Dicairkan ke Rekening Tabungan" value="-" right />
          </div>
        </div>
      </div>

      {/* Divider antar subsection */}
      <Separator className="my-6 bg-slate-200/70" />

      {/* SUBSECTION: DATA ANGGOTA KELUARGA */}
      <SubSectionHeader title="DATA ANGGOTA KELUARGA" />

      <div className="mt-4 space-y-6 rounded-3xl bg-white p-5 ring-1 ring-slate-200/70 md:p-6">
        {/* Warning banner */}
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
                Silakan lakukan verifikasi nasabah untuk mendapatkan data anggota
                keluarga. Anda dapat melakukan verifikasi nasabah melalui form edit
                pinjaman dengan mengklik tombol di samping.
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
            className={cn(
              "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold",
              "bg-[#0b3b72] text-white ring-1 ring-[#0b3b72]/20 transition hover:bg-[#0a3363]",
              "w-full sm:w-[320px]",
            )}
          >
            <ShieldCheck className="h-4.5 w-4.5" />
            Proses Verifikasi Data
          </button>
        </div>

        {/* Informasi file */}
        <div>
          <SectionTitle>INFORMASI FILE</SectionTitle>
          <Separator className="my-3 bg-slate-200/70" />
          <div className="text-sm text-slate-700">Tidak ada file yang diupload</div>
        </div>

        {/* Riwayat perubahan status */}
        <div>
          <SectionTitle>RIWAYAT PERUBAHAN STATUS</SectionTitle>
          <Separator className="my-3 bg-slate-200/70" />

          <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
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
                    history.map((r) => (
                      <tr key={r.no} className="border-t border-slate-100 text-sm">
                        <td className="px-4 py-3 text-slate-700">{r.no}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {r.status}
                        </td>
                        <td className="px-4 py-3 text-slate-800">{r.tanggal}</td>
                        <td className="px-4 py-3 text-slate-800">{r.diubahOleh}</td>
                        <td className="px-4 py-3 text-slate-800">{r.deskripsi}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center">
                            <button
                              type="button"
                              onClick={() => {
                                setHistory((prev) => prev.filter((x) => x.no !== r.no));
                                toast("Hapus (prototype)", {
                                  description: `Riwayat #${r.no} dihapus.`,
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
        </div>
      </div>
    </Card>
  );
}