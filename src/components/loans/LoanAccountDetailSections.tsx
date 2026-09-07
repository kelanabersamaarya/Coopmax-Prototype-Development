"use client";

import * as React from "react";
import { createPortal } from "react-dom";
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
  CircleX,
  X,
  SquareCheckBig,
  CircleAlert,
  Check,
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
  const [rollbackRow, setRollbackRow] = React.useState<StatusHistoryRow | null>(null);
  const [rollbackReason, setRollbackReason] = React.useState("");
  const [showRollbackConfirmation, setShowRollbackConfirmation] = React.useState(false);
  const [showRollbackSuccess, setShowRollbackSuccess] = React.useState(false);
  const [showRollbackBlocked, setShowRollbackBlocked] = React.useState(false);
  const [rollbackTab, setRollbackTab] = React.useState<"informasi" | "amortisasi">("informasi");
  const [amortizationPage, setAmortizationPage] = React.useState(1);
  const interestRate = useLoanInterestRate(accountNo, 12);

  React.useEffect(() => {
    if (!rollbackRow) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [rollbackRow]);
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
            <KeyValueRow label="Alamat Email" value="putu@gmail.com" right />
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
                            if (row.status === "Aktif / Sudah Dicairkan") {
                              if (accountNo.toLowerCase() === "klpk04.07260001") {
                                setShowRollbackBlocked(true);
                                return;
                              }
                              setRollbackRow(row);
                              setRollbackReason("");
                              return;
                            }
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

      {rollbackRow && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[100] flex min-h-screen w-screen items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-[1px]">
          <div className="max-h-[75vh] w-full max-w-[980px] overflow-y-auto rounded-xl bg-white shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <h2 className="text-lg font-extrabold text-slate-900">Perubahan Status Pinjaman</h2>
              <button
                type="button"
                onClick={() => setRollbackRow(null)}
                className="text-2xl leading-none text-slate-900"
                aria-label="Tutup"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex gap-3 rounded-xl border border-amber-400 bg-amber-50 p-3 text-slate-900">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <div className="text-sm font-extrabold">Dampak Perubahan Status Pinjaman</div>
                  <p className="mt-1 text-xs">Status pinjaman akan dikembalikan dari Aktif menjadi Disetujui, serta transaksi amortisasi dan jurnal amortisasi terkait akan dihapus/dibatalkan.</p>
                </div>
              </div>

              <div className="flex w-full items-center">
                <button
                  type="button"
                  onClick={() => setRollbackTab("informasi")}
                  className={cn(
                    "flex w-1/2 items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
                    rollbackTab === "informasi"
                      ? "bg-[#5b45f5] text-white shadow-sm"
                      : "text-slate-500 hover:text-[#5b45f5]",
                  )}
                >
                  Informasi Pinjaman
                </button>
                <button
                  type="button"
                  onClick={() => setRollbackTab("amortisasi")}
                  className={cn(
                    "flex w-1/2 items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
                    rollbackTab === "amortisasi"
                      ? "bg-[#5b45f5] text-white shadow-sm"
                      : "text-slate-500 hover:text-[#5b45f5]",
                  )}
                >
                  Transaksi Amortisasi
                </button>
              </div>

              {rollbackTab === "informasi" && (
              <div className="rounded-xl bg-cyan-600 p-5 text-white">
                <div className="mb-5 text-sm font-extrabold uppercase">Informasi Rekening Pinjaman</div>
                <div className="grid gap-4 sm:grid-cols-4">
                  <div><div className="text-xs opacity-80">No. Rek. Pinjaman</div><div className="mt-1 text-base font-bold">{accountNo}</div></div>
                  <div><div className="text-xs opacity-80">Produk Pinjaman</div><div className="mt-1 text-base font-bold">Pinjaman Bulanan 1</div></div>
                  <div><div className="text-xs opacity-80">Nama Nasabah</div><div className="mt-1 text-base font-bold">Dinda Farida</div></div>
                  <div><div className="text-xs opacity-80">Tanggal Pinjaman Dibuat</div><div className="mt-1 text-base font-bold">03 September 2026</div></div>
                  <div><div className="text-xs opacity-80">Tanggal Pinjaman Aktif</div><div className="mt-1 text-base font-bold">03 September 2026</div></div>
                  <div><div className="text-xs opacity-80">Tanggal Jatuh Tempo</div><div className="mt-1 text-base font-bold">03 September 2027</div></div>
                  <div><div className="text-xs opacity-80">Nominal Pinjaman Diajukan</div><div className="mt-1 text-base font-bold">10.000.000,00</div></div>
                  <div><div className="text-xs opacity-80">Nominal Pinjaman Disetujui</div><div className="mt-1 text-base font-bold">10.000.000,00</div></div>
                </div>
              </div>
              )}

              {rollbackTab === "amortisasi" && (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-extrabold uppercase">
                      Pengakuan Piutang Bunga
                    </div>
                    <div className="overflow-hidden">
                      <table className="w-full table-fixed text-sm text-slate-600">
                        <thead className="bg-white text-xs font-extrabold uppercase tracking-wide text-slate-700">
                          <tr className="border-b border-slate-200">
                            <th className="w-[7%] whitespace-nowrap bg-white px-2 py-3 text-center">No.</th>
                            <th className="w-[13%] px-2 py-3 text-center leading-tight">
                              <span className="block">Tanggal</span>
                              <span className="block">Pembayaran</span>
                            </th>
                            <th className="w-[13%] px-2 py-3 text-center">Pokok</th>
                            <th className="w-[12%] px-2 py-3 text-center">Bunga</th>
                            <th className="w-[19%] px-2 py-3 text-center leading-tight">
                              <span className="block">Bunga Yang</span>
                              <span className="block">Telah Dibayarkan</span>
                            </th>
                            <th className="w-[16%] px-2 py-3 text-center leading-tight">
                              <span className="block">Sisa Bunga Yang</span>
                              <span className="block">Dapat Diakui</span>
                            </th>
                            <th className="w-[15%] px-2 py-3 text-center leading-tight">
                              <span className="block">Piutang Bunga Yang</span>
                              <span className="block">Telah Diakui</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="whitespace-nowrap px-2 py-2 text-center">1</td>
                            <td className="whitespace-nowrap bg-white px-2 py-2 text-center">07-09-2026</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">1.083.333</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">195.000</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">195.000</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">0</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">195.000</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="whitespace-nowrap px-2 py-2 text-center">2</td>
                            <td className="whitespace-nowrap bg-white px-2 py-2 text-center">07-10-2026</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">1.083.333</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">178.750</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">0</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">178.750</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">0</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="whitespace-nowrap px-2 py-2 text-center">3</td>
                            <td className="whitespace-nowrap bg-white px-2 py-2 text-center">07-11-2026</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">1.083.333</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">162.500</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">0</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">162.500</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">0</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="whitespace-nowrap px-2 py-2 text-center">4</td>
                            <td className="whitespace-nowrap bg-white px-2 py-2 text-center">07-12-2026</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">1.083.333</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">146.250</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">0</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">146.250</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">0</td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap px-2 py-2 text-center">5</td>
                            <td className="whitespace-nowrap bg-white px-2 py-2 text-center">07-01-2027</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">1.083.333</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">129.000</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">0</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">129.000</td>
                            <td className="whitespace-nowrap px-2 py-2 text-right">0</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="flex items-center justify-end border-t border-slate-200 px-3 py-3 text-sm">
                        <button
                          type="button"
                          onClick={() => setAmortizationPage(1)}
                          className="h-11 rounded-l-sm bg-[#eef1f6] px-4 font-medium text-[#c7cfdd] transition-colors hover:bg-[#e5e9f0]"
                        >
                          Previous
                        </button>
                        <span className="flex h-11 min-w-10 items-center justify-center bg-[#5b45f5] px-3 font-semibold text-white">
                          {amortizationPage}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAmortizationPage(2)}
                          className="h-11 rounded-r-sm bg-[#eef1f6] px-4 font-medium text-[#c7cfdd] transition-colors hover:bg-[#e5e9f0]"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-extrabold uppercase">
                      Biaya Administrasi
                    </div>
                    <div className="overflow-hidden">
                      <table className="w-full table-fixed text-sm text-slate-600">
                        <thead className="bg-white text-xs font-extrabold uppercase tracking-wide text-slate-700">
                          <tr className="border-b border-slate-200">
                            <th className="w-[7%] whitespace-nowrap px-2 py-3 text-center">No.</th>
                            <th className="w-[18%] px-2 py-3 text-center leading-tight">
                              <span className="block">Tanggal</span>
                              <span className="block">Pembayaran</span>
                            </th>
                            <th className="w-[23%] px-2 py-3 text-center leading-tight">
                              <span className="block">Amortisasi Biaya</span>
                              <span className="block">Administrasi</span>
                            </th>
                            <th className="w-[23%] px-2 py-3 text-center leading-tight">
                              <span className="block">Sisa Amortisasi</span>
                              <span className="block">Biaya Administrasi</span>
                            </th>
                            <th className="w-[29%] px-2 py-3 text-center leading-tight">
                              <span className="block">Pendapatan Biaya Administrasi</span>
                              <span className="block">Telah Diakui</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["1", "07-09-2026", "9.720", "626", "9.094"],
                            ["2", "07-10-2026", "8.978", "8.978", "0"],
                            ["3", "07-11-2026", "8.224", "8.224", "0"],
                            ["4", "07-12-2026", "7.459", "7.459", "0"],
                            ["5", "07-01-2027", "6.681", "6.681", "0"],
                          ].map(([no, tanggal, amortisasi, sisa, pendapatan], index) => (
                            <tr key={no} className={cn(index < 4 && "border-b border-slate-100")}>
                              <td className="whitespace-nowrap px-2 py-2 text-center">{no}</td>
                              <td className="whitespace-nowrap bg-slate-100 px-2 py-2 text-center">{tanggal}</td>
                              <td className="whitespace-nowrap px-2 py-2 text-right">{amortisasi}</td>
                              <td className="whitespace-nowrap px-2 py-2 text-right">{sisa}</td>
                              <td className="whitespace-nowrap px-2 py-2 text-right">{pendapatan}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex items-center justify-end border-t border-slate-200 px-3 py-3 text-sm">
                        <button
                          type="button"
                          className="h-11 rounded-l-sm bg-[#eef1f6] px-4 font-medium text-[#c7cfdd]"
                        >
                          Previous
                        </button>
                        <span className="flex h-11 min-w-10 items-center justify-center bg-[#5b45f5] px-3 font-semibold text-white">1</span>
                        <button
                          type="button"
                          className="h-11 rounded-r-sm bg-[#eef1f6] px-4 font-medium text-[#c7cfdd]"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="sticky bottom-0 z-10 flex justify-end gap-4 border-t border-slate-200 bg-white px-5 py-4">
              <button
                type="button"
                onClick={() => setRollbackRow(null)}
                className="inline-flex h-7 w-[90px] items-center justify-center gap-1 rounded-md bg-[#7d8fbd] px-2 text-xs font-normal text-white shadow-sm transition-colors hover:bg-[#6f81ad]"
              >
                <X className="h-4 w-4 stroke-[2.5]" />
                Batalkan
              </button>
              <button
                type="button"
                onClick={() => setShowRollbackConfirmation(true)}
                className="inline-flex h-7 w-[90px] items-center justify-center gap-1 rounded-md bg-[#2db900] px-2 text-xs font-normal text-white shadow-sm transition-colors hover:bg-[#249700]"
              >
                <SquareCheckBig className="h-4 w-4 stroke-[2.5]" />
                Simpan
              </button>
            </div>
          </div>
        </div>,
            document.body,
          )
        : null}

      {showRollbackConfirmation && rollbackRow && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/65 p-4">
              <div className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-2xl">
                <div className="flex justify-center">
                  <CircleAlert className="h-24 w-24 stroke-[1.5] text-orange-200" />
                </div>
                <h2 className="mt-5 text-center text-xl font-bold leading-tight text-slate-950">
                  Yakin Melakukan Perubahan Status Pinjaman?
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRollbackConfirmation(false);
                      setShowRollbackSuccess(true);
                    }}
                    className="h-12 rounded-md bg-[#348bd1] text-base font-medium text-white transition-colors hover:bg-[#287cbe]"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRollbackConfirmation(false)}
                    className="h-12 rounded-md bg-[#7d8fbd] text-base font-medium text-white transition-colors hover:bg-[#6f81ad]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      {showRollbackBlocked && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 p-4">
              <div className="w-full max-w-[560px] rounded-2xl bg-white px-6 py-7 shadow-2xl">
                <div className="flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#ffd0aa] text-[#ffbd85]">
                    <span className="text-5xl font-light leading-none">!</span>
                  </div>
                </div>
                <h2 className="mt-5 text-center text-xl font-bold text-slate-950">
                  Perubahan Status Tidak Dapat Dilakukan
                </h2>
                <p className="mx-auto mt-4 max-w-[490px] text-center text-base leading-tight text-slate-500">
                  Perubahan status tidak dapat dilakukan karena sudah terdapat proses tutup buku pada periode September 2026. Lakukan pembatalan tutup buku pada periode September 2026 untuk melakukan perubahan status
                </p>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowRollbackBlocked(false)}
                    className="h-10 w-[100px] rounded-md border-2 border-[#b6cee4] bg-[#348bd1] text-sm font-medium text-white shadow-[0_0_0_4px_rgba(182,206,228,0.25)] transition-colors hover:bg-[#287cbe]"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      {showRollbackSuccess && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 p-4">
              <div className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-2xl">
                <div className="flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-[#bce6aa]">
                    <Check className="h-14 w-14 stroke-[3.5] text-[#38ae00]" />
                  </div>
                </div>
                <h2 className="mt-5 text-center text-xl font-bold leading-tight text-black">
                  Perubahan Status Pinjaman Berhasil
                  <br />
                  Dilakukan
                </h2>
                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setHistory((current) => current.filter((item) => item.no !== rollbackRow?.no));
                      setShowRollbackSuccess(false);
                      setRollbackRow(null);
                      toast("Perubahan status disimpan");
                    }}
                    className="h-12 w-[145px] rounded-md border-2 border-[#b6cee4] bg-[#348bd1] text-base font-medium text-white shadow-[0_0_0_4px_rgba(182,206,228,0.25)] transition-colors hover:bg-[#287cbe]"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </Card>
  );
}