import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type ProductType = "Produk Pinjaman" | "Produk Tabungan";
type StatusType = "Diajukan" | "Diproses" | "Ditolak";

type Row = {
  id: string;
  nama: string;
  phone: string;
  email: string;
  alamat: string;
  tanggalRegistrasi: string;
  produk: ProductType;
  status: StatusType;
};

// Seed harus konsisten dengan halaman daftar (prototype)
const seed: Row[] = [
  {
    id: "1",
    nama: "DEWA PUTU ADAT",
    phone: "085461231456",
    email: "dewaadat@gmail.com",
    alamat: "BR. TENGKULAK KAJA KANGIN",
    tanggalRegistrasi: "2026-04-20 16:02:58",
    produk: "Produk Pinjaman",
    status: "Diajukan",
  },
  {
    id: "2",
    nama: "Website ini tidak aman",
    phone: "08794561245",
    email: "coba@gmail.com",
    alamat: "Website ini tidak aman",
    tanggalRegistrasi: "2026-04-20 15:04:33",
    produk: "Produk Pinjaman",
    status: "Ditolak",
  },
  {
    id: "3",
    nama: "DEWA ADAT",
    phone: "082214789635",
    email: "DEWAADAT@GMAIL.COM",
    alamat: "TENGKULAK KAJA",
    tanggalRegistrasi: "2026-04-06 16:47:01",
    produk: "Produk Pinjaman",
    status: "Diproses",
  },
  {
    id: "4",
    nama: "DEWA PUTU ADAT",
    phone: "082247977335",
    email: "dewaadat@gmail.com",
    alamat: "BR TENGKULAK KAJA",
    tanggalRegistrasi: "2026-04-06 16:02:03",
    produk: "Produk Pinjaman",
    status: "Diajukan",
  },
  {
    id: "5",
    nama: "Uji Coba (mohon diabaikan)",
    phone: "0812121212122",
    email: "uji@coba.com",
    alamat: "Indonesia",
    tanggalRegistrasi: "2026-04-06 15:56:04",
    produk: "Produk Tabungan",
    status: "Diproses",
  },
  {
    id: "6",
    nama: "Kadek Mas Suteyajasa",
    phone: "089505954431",
    email: "suteyajasa9@gmail.com",
    alamat: "Jl. Natuna",
    tanggalRegistrasi: "2026-03-10 13:28:00",
    produk: "Produk Pinjaman",
    status: "Diajukan",
  },
];

function StatusPill({ status }: { status: StatusType }) {
  if (status === "Diproses" || status === "Diajukan") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-[8px] px-4 py-2",
          "bg-[#3BB001] text-white",
          "text-[14px] font-extrabold leading-none",
          "min-h-[34px]",
        )}
      >
        {status}
      </span>
    );
  }

  // Ditolak
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[8px] px-3 py-1.5",
        "bg-rose-600 text-white",
        "text-[13px] font-semibold leading-none",
      )}
    >
      Ditolak
    </span>
  );
}

function TealInfoItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[12px] font-semibold text-white/85">
        <span className="block break-words">{label}</span>
      </div>
      <div className="mt-1 text-[14px] font-extrabold tracking-tight text-white">
        <span className="block break-words leading-snug">{value}</span>
      </div>
    </div>
  );
}

function TealInfoPanel({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: React.ReactNode }>;
}) {
  return (
    <div className="overflow-hidden rounded-[8px] bg-[#1aa0b5] text-white ring-1 ring-white/10 shadow-sm">
      <div className="px-6 py-6 sm:px-7 sm:py-7">
        <div className="text-[14px] font-extrabold tracking-tight text-white">
          {title}
        </div>

        <div
          className={cn(
            "mt-5 grid gap-x-10 gap-y-5",
            "sm:[grid-template-columns:repeat(2,minmax(0,1fr))]",
            "lg:[grid-template-columns:repeat(4,minmax(0,1fr))]",
          )}
        >
          {items.map((it) => (
            <TealInfoItem key={it.label} label={it.label} value={it.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ObsSamudraHartaDetail() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  const data = React.useMemo(() => seed.find((r) => r.id === id) ?? null, [id]);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="mx-auto w-full max-w-[1680px]">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Pendaftaran Online
            </h1>
            <div className="text-base font-semibold text-slate-600">
              Detail Pendaftar
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => navigate("/obs-samudra-harta")}
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2",
                "text-[13px] font-semibold text-slate-700 ring-1 ring-slate-200 shadow-sm",
                "transition hover:bg-slate-50",
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </button>
          </div>

          {!data ? (
            <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur">
              <div className="text-sm font-semibold text-slate-900">
                Data pendaftar tidak ditemukan.
              </div>
              <div className="mt-2 text-sm text-slate-600">
                ID: <span className="font-semibold">{id}</span>
              </div>
              <div className="mt-4">
                <Link
                  to="/obs-samudra-harta"
                  className="text-blue-600 hover:underline"
                >
                  Kembali ke daftar
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-0 shadow-sm backdrop-blur">
              <div className="px-6 py-6 sm:px-10 sm:py-8">
                <div className="text-[14px] font-extrabold uppercase tracking-wide text-slate-900">
                  INFORMASI PENDAFTAR BARU
                </div>

                {/* Panel teal */}
                <div className="mt-5">
                  <TealInfoPanel
                    title={
                      data.produk === "Produk Pinjaman"
                        ? "PINJAMAN KOPERASI"
                        : "TABUNGAN"
                    }
                    items={[
                      { label: "Nama Pendaftar", value: data.nama },
                      { label: "Nomor Telepon", value: data.phone },
                      { label: "Email", value: data.email },
                      { label: "Alamat", value: data.alamat },
                      {
                        label: "Tanggal Registrasi",
                        value: data.tanggalRegistrasi,
                      },
                      { label: "Produk", value: data.produk },
                      { label: "Status", value: <StatusPill status={data.status} /> },
                    ]}
                  />
                </div>
              </div>

              <div className="h-px w-full bg-slate-200/70" />

              <div className="px-6 py-6 sm:px-10 sm:py-8">
                <div className="text-[16px] font-extrabold uppercase tracking-wide text-slate-900">
                  GAMBAR
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-slate-200">
                  <div className="safe-x-scroll bg-white">
                    <table className="w-full min-w-[680px] border-collapse">
                      <thead className="bg-white">
                        <tr className="border-b border-slate-200 text-left text-[12px] font-extrabold uppercase tracking-wide text-[#64748B]">
                          <th className="w-[70px] px-4 py-3">NO</th>
                          <th className="px-4 py-3">FILE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan={2}
                            className="px-4 py-10 text-center text-sm text-slate-600"
                          >
                            Tidak ada file.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}