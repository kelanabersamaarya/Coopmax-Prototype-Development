import * as React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getLoanProducts } from "@/lib/loanProductsStore";
import { toast } from "sonner";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 -mt-5 rounded-t-[5px] bg-[#F9FAFF] px-5 py-3 ring-1 ring-slate-200/70 md:-mx-6 md:-mt-6 md:px-6">
      <div className="text-[16px] font-extrabold uppercase tracking-wide text-slate-900">
        {children}
      </div>
    </div>
  );
}

function Field({
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
      <div className="text-[12px] font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-[14px] font-extrabold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

function StatusPill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "red" | "slate";
}) {
  const cls =
    tone === "green"
      ? "bg-lime-500 text-white ring-1 ring-lime-500/25"
      : tone === "red"
        ? "bg-rose-500 text-white ring-1 ring-rose-500/25"
        : "bg-slate-200 text-slate-800 ring-1 ring-slate-200";

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-[6px] px-3 text-[12px] font-semibold",
        cls,
      )}
    >
      {children}
    </span>
  );
}

function TopActionButton({
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
        "inline-flex h-9 items-center gap-2 rounded-full px-4",
        "bg-transparent text-[13px] font-semibold text-slate-700",
        "ring-1 ring-slate-200 shadow-none",
        "transition hover:bg-slate-50",
      )}
    >
      <Icon className="h-4.5 w-4.5 text-slate-600" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function methodLabel(scheme: string) {
  if (scheme === "Anuitas") return "Bunga Efektif";
  if (scheme === "Menurun") return "Menurun";
  return "Bunga Flat";
}

export default function LoanProductDetail() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  const product = React.useMemo(() => {
    const all = getLoanProducts();
    return all.find((p) => p.id === id) ?? null;
  }, [id]);

  const sectionCardCls =
    "rounded-[5px] border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <h1 className="text-[28px] font-extrabold tracking-tight text-black md:text-[32px]">
                Produk Pinjaman
              </h1>
              <span className="text-[18px] font-normal tracking-tight text-black md:text-[20px]">
                Detail
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TopActionButton
              icon={ArrowLeft}
              label="Kembali ke Daftar"
              onClick={() => navigate("/loan-products")}
            />
            <TopActionButton
              icon={Pencil}
              label="Ubah"
              onClick={() =>
                navigate(`/loan-products/${encodeURIComponent(id)}/edit`)
              }
            />
            <TopActionButton
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

        <div className="mt-6">
          {!product ? (
            <Card className="rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur">
              <div className="text-sm font-semibold text-slate-900">
                Produk tidak ditemukan.
              </div>
              <div className="mt-2 text-sm text-slate-600">
                ID: <span className="font-semibold">{id}</span>
              </div>
              <div className="mt-4">
                <Link to="/loan-products" className="text-blue-600 hover:underline">
                  Kembali ke daftar
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="rounded-3xl border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur md:p-5">
              <div className="grid gap-[35px]">
                <Card className={sectionCardCls}>
                  <SectionTitle>Konfigurasi Dasar Produk Pinjaman</SectionTitle>

                  <div className="mt-4 grid gap-4 md:grid-cols-4">
                    <Field label="Nama" value={product.name} />
                    <Field
                      label="RC"
                      value={<StatusPill tone="red">Tidak Aktif</StatusPill>}
                    />
                    <Field label="Periode Pinjaman" value="Bulan" />
                    <Field label="Minimal Periode Pinjaman" value="1 Bulan" />

                    <Field
                      label="Maksimal Periode Pinjaman"
                      value={`${product.tenorMonths} Bulan`}
                    />
                    <Field
                      label="Metode Bunga Pinjaman"
                      value={methodLabel(product.billingScheme)}
                    />
                    <Field
                      label="Bunga Per Tahun (%)"
                      value={`${product.interestRateYearly.toFixed(2)} %`}
                    />
                    <Field label="Minimal Pinjaman" value="Rp. 1.000,00" />

                    <Field label="Maksimal Pinjaman" value="Rp. 100.000.000,00" />
                    <Field label="Administrasi" value="Rp. 0,00" />
                    <Field label="Propisi" value="Rp. 0,00" />
                    <Field label="Materai" value="Rp. 0,00" />

                    <Field
                      label="Akumulasi Denda Pinjaman"
                      value={<StatusPill tone="red">Tidak Aktif</StatusPill>}
                    />
                    <Field label="Denda Pinjaman" value="0,00%" />
                    <Field
                      label="Agunan"
                      value={<StatusPill tone="green">Aktif</StatusPill>}
                    />
                    <Field
                      label="Status"
                      value={<StatusPill tone="green">Aktif</StatusPill>}
                    />
                  </div>
                </Card>

                <Card className={sectionCardCls}>
                  <SectionTitle>Konfigurasi Tagihan Angsuran</SectionTitle>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field
                      label="Tagihan Angsuran Menggunakan Tabel Angsuran"
                      value={<StatusPill tone="green">Aktif</StatusPill>}
                    />
                    <Field
                      label="Skema Tagihan"
                      value="Tagihan Diterbitkan Penuh di Awal (Jadwal Tetap)"
                    />
                  </div>
                </Card>

                <Card className={sectionCardCls}>
                  <SectionTitle>Konfigurasi Denda</SectionTitle>

                  <div className="mt-4 grid gap-4 md:grid-cols-4">
                    <Field label="Metode dan Nilai Denda" value="Rp. 10.000,00" />
                    <Field label="Dasar Perhitungan" value="Pokok" />
                    <Field label="Jumlah Hari Keterlambatan" value="5" />
                    <Field
                      label="Proses Denda Berulang"
                      value={<StatusPill tone="green">Aktif</StatusPill>}
                    />
                  </div>
                </Card>

                <Card className={sectionCardCls}>
                  <SectionTitle>Konfigurasi Grace Period</SectionTitle>

                  <div className="mt-4 grid gap-4 md:grid-cols-4">
                    <Field
                      label="Grace Period"
                      value={<StatusPill tone="green">Aktif</StatusPill>}
                    />
                    <Field label="Skema Grace Period" value="Hanya Bayar Bunga" />
                    <Field label="Satuan Grace Period" value="Bulan" />
                    <Field label="Durasi Grace Period" value="3" />
                  </div>
                </Card>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}