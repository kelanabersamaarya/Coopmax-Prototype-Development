import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ExternalLink, FileText, ReceiptText, ArrowLeft, Trash2 } from "lucide-react";
import { getLoanTransaction } from "@/lib/loanTransactionStore";

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
        "inline-flex h-9 items-center gap-2 rounded-[5px] px-2.5",
        "bg-transparent text-[13px] font-normal text-[#5d7092]",
        "border-0 shadow-none",
        "transition hover:bg-white",
        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
      )}
    >
      <Icon className="h-4.5 w-4.5 text-slate-600" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[14px] font-bold uppercase text-[#092c62]">
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
        "grid gap-2 text-[13px] leading-8",
        right
          ? "grid-cols-[minmax(150px,185px)_1fr] sm:grid-cols-[200px_1fr]"
          : "grid-cols-[minmax(150px,185px)_1fr] sm:grid-cols-[200px_1fr]",
      )}
    >
      <span className="text-[#7186a8]">{label}</span>
      <span className="text-[#14284b]">: {value}</span>
    </div>
  );
}

function Pill({
  children,
  tone = "emerald",
}: {
  children: React.ReactNode;
  tone?: "emerald" | "rose" | "lime" | "lunas";
}) {
  const cls =
    tone === "rose"
      ? "bg-rose-600 text-white ring-1 ring-rose-600/20"
      : tone === "lime"
        ? "bg-lime-500 text-white ring-1 ring-lime-500/20"
        : tone === "lunas"
          ? "bg-[#3BB001] text-white ring-1 ring-[#3BB001]/25"
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
  const savedTransaction = getLoanTransaction(trxNo);

  return (
    <div className="min-h-screen bg-[#f5f7fc] px-4 pb-6 pt-5 text-[#08285f] md:px-8 md:pt-6 lg:px-10">
      <div className="flex flex-col gap-4 px-1 sm:px-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <h1 className="text-[21px] font-semibold tracking-[-0.02em] text-[#08285f]">
                Transaksi Pinjaman <span className="font-normal">Detail</span>
              </h1>
            </div>

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
                toast("Hapus (prototype)", {
                  description: "Aksi hapus belum diimplementasikan.",
                })
              }
            />
          </div>
        </div>

        <main className="mt-6 rounded-[20px] border-0 bg-white px-5 py-7 shadow-[0_12px_35px_rgba(40,70,120,0.04)] md:mt-7 md:px-8 lg:px-5 lg:py-7">
          <section>
          <SectionTitle>INFORMASI REKENING</SectionTitle>

          <div className="mt-4 overflow-hidden rounded-2xl bg-[#17a2b8] p-5 text-white ring-1 ring-white/10 md:p-6">
            <div className="text-[12px] font-extrabold tracking-wide text-white/90">
              PINJAMAN BILLING
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
              <InfoHeaderField label="Skema Tagihan" value="Tagihan Sesuai Jadwal Angsuran" />
              <InfoHeaderField label="Satuan Grace Period" value="Bulan" />
              <InfoHeaderField label="Kolektor" value={kolektor} />

              <InfoHeaderField label="Durasi Grace Period" value="3" />
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
              <InfoHeaderField label="Status" value={<Pill tone="lunas">Lunas</Pill>} />
            </div>
          </div>
          </section>

          <section className="mt-8 border-t border-[#dfe3e9] pt-3">
          <SectionTitle>INFORMASI NASABAH</SectionTitle>

          <div className="mt-4 grid gap-x-12 lg:grid-cols-2">
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
              <KVRow label="Perusahaan Tempat Bekerja" value="-" right />
              <KVRow label="Alamat Perusahaan Tempat Bekerja" value="-" right />
              <KVRow label="Jenis Identitas" value="KTP" right />
              <KVRow label="No. Identitas" value="191828282929" right />
              <KVRow label="No. Telp/Handphone" value="8133700004555" right />
              <KVRow label="Alamat Email" value="gaby@gmail.com" right />
            </div>
          </div>
          </section>

          <section className="mt-7 border-t border-[#dfe3e9] pt-3">
          <SectionTitle>INFORMASI TRANSAKSI</SectionTitle>

          <div className="mt-4 grid gap-x-12 lg:grid-cols-2">
            <div>
              <KVRow label="No Transaksi" value={trxNo || "BA/080526/0003"} />
              <KVRow label="Rek. Tabungan" value="-" />
              <KVRow label="Kolektor" value={kolektor} />
              <KVRow label="Tanggal Transaksi" value="08-05-2026" />
              <KVRow label="Jenis Transaksi" value="Pemutihan Pinjaman" />
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
              <KVRow label="Catatan" value={savedTransaction?.keterangan || "-"} right />
              <KVRow label="Dibuat Oleh" value="Arya Dharma" right />
            </div>
          </div>
          </section>
        </main>
    </div>
  );
}