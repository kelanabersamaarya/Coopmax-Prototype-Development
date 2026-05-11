import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ExternalLink, FileText, ReceiptText, ArrowLeft, Trash2 } from "lucide-react";

function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full px-4",
        "bg-transparent text-[13px] font-semibold text-slate-700",
        "ring-1 ring-slate-200 shadow-none",
        "transition hover:bg-slate-50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
      )}
    >
      <Icon className="h-4.5 w-4.5 text-slate-600" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[14px] font-extrabold uppercase tracking-wide text-slate-700">
      {children}
    </div>
  );
}

function InfoHeaderField({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="text-[11px] font-semibold text-white/85">{label}</div>
      <div className="mt-1 text-[13px] font-extrabold tracking-tight text-white">
        <span className="block break-words leading-snug">{value}</span>
      </div>
    </div>
  );
}

function KVRow({
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
        "grid items-baseline gap-x-3 gap-y-1 py-1.5",
        right
          ? "[grid-template-columns:minmax(0,180px)_14px_minmax(0,1fr)]"
          : "[grid-template-columns:minmax(0,220px)_14px_minmax(0,1fr)]",
      )}
    >
      <div className="text-[12.5px] text-slate-600">{label}</div>
      <div className="text-center text-[12.5px] font-semibold text-slate-300">
        :
      </div>
      <div className="text-[12.5px] font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Pill({
  children,
  tone = "emerald",
}: {
  children: React.ReactNode;
  tone?: "emerald" | "rose" | "lime";
}) {
  const cls =
    tone === "rose"
      ? "bg-rose-600 text-white ring-1 ring-rose-600/20"
      : tone === "lime"
        ? "bg-lime-500 text-white ring-1 ring-lime-500/20"
        : "bg-emerald-600 text-white ring-1 ring-emerald-600/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-2.5 py-1 text-[11px] font-extrabold leading-none",
        cls,
      )}
    >
      {children}
    </span>
  );
}

export default function TransaksiPinjamanDetail() {
  const navigate = useNavigate();
  const params = useParams<{ trxNo: string }>();
  const trxNo = params.trxNo ?? "";

  // Prototype data mengikuti screenshot
  const rekPinjaman = "12260002";
  const kolektor = "Hilda Usamah";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
              Transaksi Pinjaman Detail
            </h1>
            <div className="sr-only">{trxNo}</div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <ActionButton
              icon={ReceiptText}
              label="Kwitansi"
              onClick={() =>
                toast("Kwitansi (prototype)", { description: `Transaksi: ${trxNo}` })
              }
            />
            <ActionButton
              icon={FileText}
              label="Kwitansi Kas"
              onClick={() =>
                toast("Kwitansi Kas (prototype)", { description: `Transaksi: ${trxNo}` })
              }
            />
            <ActionButton
              icon={ArrowLeft}
              label="Kembali ke Daftar"
              onClick={() => navigate("/loans/transactions")}
            />
            <ActionButton
              icon={Trash2}
              label="Hapus"
              onClick={() =>
                toast("Hapus (prototype)", { description: "Aksi hapus belum diimplementasikan." })
              }
            />
          </div>
        </div>

        <div className="mt-5 rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
          <SectionTitle>INFORMASI REKENING</SectionTitle>

          <div className="mt-4 overflow-hidden rounded-2xl bg-[#17a2b8] p-5 text-white ring-1 ring-white/10 md:p-6">
            <div className="text-[12px] font-extrabold tracking-wide text-white/90">
              PINJAMAN BULANAN
            </div>

            <div
              className={cn(
                "mt-5 grid gap-x-10 gap-y-5",
                "sm:[grid-template-columns:repeat(2,minmax(0,1fr))]",
                "lg:[grid-template-columns:repeat(4,minmax(0,1fr))]",
              )}
            >
              <InfoHeaderField
                label="Rek. Pinjaman"
                value={
                  <span className="inline-flex items-center gap-2">
                    {rekPinjaman}
                    <ExternalLink className="h-4 w-4 text-white/85" />
                  </span>
                }
              />
              <InfoHeaderField label="Rek. Tabungan" value="-" />
              <InfoHeaderField label="Sektor Pinjaman" value="-" />
              <InfoHeaderField label="Kolektor" value={kolektor} />

              <InfoHeaderField label="Tanggal Dibuat" value="26 Apr 2026" />
              <InfoHeaderField label="Tanggal Jatuh Tempo" value="26 Apr 2027" />
              <InfoHeaderField label="Periode Waktu" value="12 Bulan" />
              <InfoHeaderField label="Metode Bunga" value="Bunga Flat" />

              <InfoHeaderField label="Bunga Per Tahun (%)" value="30.00 %" />
              <InfoHeaderField label="Jumlah Pinjaman" value="2.000.000,00" />
              <InfoHeaderField label="Sisa Pinjaman" value="1.333.300,00" />
              <InfoHeaderField label="Angsuran Pokok" value="166.700,00" />

              <InfoHeaderField label="Angsuran Bunga" value="50.000,00" />
              <InfoHeaderField label="Hutang Pokok" value="0" />
              <InfoHeaderField label="Hutang Bunga" value="0,00" />
              <InfoHeaderField
                label="Status"
                value={<Pill tone="lime">Aktif / Sudah Dicairkan</Pill>}
              />
            </div>
          </div>

          <div className="my-6 h-px w-full bg-slate-200/70" />

          <SectionTitle>INFORMASI NASABAH</SectionTitle>

          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div>
              <KVRow
                label="ID"
                value={
                  <span className="inline-flex items-center gap-2 text-blue-600">
                    N2500010 <ExternalLink className="h-4 w-4" />
                  </span>
                }
              />
              <KVRow label="NIP" value="-" />
              <KVRow label="Nama" value="gaby" />
              <KVRow label="Tanggal Lahir" value="2025-10-08" />
              <KVRow label="Kategori Nasabah" value="Anggota Lama" />
              <KVRow label="Jenis Kelamin" value="Perempuan" />
              <KVRow label="Alamat" value="Jl. galang" />
              <KVRow label="Hubungan dengan Koperasi" value="Calon Anggota" />
              <KVRow label="Tanggal Daftar" value="2025-10-09" />
              <KVRow label="Tag" value="-" />
              <KVRow label="Unit" value="-" />
              <KVRow
                label="Status Verifikasi KTP"
                value={<Pill tone="rose">BELUM TERVERIFIKASI</Pill>}
              />
              <KVRow label="Status" value={<Pill tone="emerald">Aktif</Pill>} />
            </div>

            <div>
              <KVRow label="Agama" value="Hindu" right />
              <KVRow label="Profesi" value="PNS" right />
              <KVRow label="Jenis Identitas" value="KTP" right />
              <KVRow label="No. Identitas" value="191828282929" right />
              <KVRow label="No. Telp/Handphone" value="8133700004555" right />
              <KVRow label="Alamat Email" value="gaby@gmail.com" right />
            </div>
          </div>

          <div className="my-6 h-px w-full bg-slate-200/70" />

          <SectionTitle>INFORMASI TRANSAKSI</SectionTitle>

          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div>
              <KVRow label="No Transaksi" value={trxNo || "BA/080526/0003"} />
              <KVRow label="Rek. Tabungan" value="-" />
              <KVRow label="Kolektor" value={kolektor} />
              <KVRow label="Tanggal Transaksi" value="08-05-2026" />
              <KVRow label="Jenis Transaksi" value="Bayar Angsuran" />
              <KVRow label="Denda" value="0,00" />
              <KVRow label="Nominal" value="500.000,00" />
              <KVRow label="Pinjaman Awal" value="1.833.300,00" />
              <KVRow label="Pinjaman Akhir" value="1.333.300,00" />
              <KVRow label="Tanggal Dibuat" value="08-05-2026 10:34:30" />
              <KVRow label="Waktu Transaksi" value="10:34:29" />
              <KVRow label="Periode Transaksi" value="Mei 2026" />
            </div>

            <div>
              <KVRow label="Angsuran Pokok" value="500.000,00" right />
              <KVRow label="Angsuran Bunga" value="0,00" right />
              <KVRow label="Angsuran Hutang Pokok" value="0,00" right />
              <KVRow label="Angsuran Hutang Bunga" value="0,00" right />
              <KVRow label="Deskripsi" value="-" right />
              <KVRow label="Catatan" value="-" right />
              <KVRow label="Dibuat Oleh" value="Arya Dharma" right />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}