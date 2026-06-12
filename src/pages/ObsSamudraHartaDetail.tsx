import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { List, Save, FilePlus2 } from "lucide-react";
import { toast } from "sonner";
import UpdateStatusDialog, {
  type UpdateStatusDialogPrefill,
} from "@/components/obs/UpdateStatusDialog";
import {
  getObsRegistrationStatus,
  type ObsStatus,
} from "@/lib/obsRegistrationsStore";
import {
  getObsRegistrationHistory,
  type ObsStatusHistoryRow,
} from "@/lib/obsRegistrationsHistoryStore";

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
    nama: "Made Adi",
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
  {
    id: "7",
    nama: "Kadek Adi Pratama",
    phone: "081239990001",
    email: "kadek.adi@gmail.com",
    alamat: "Jl. Raya Ubud, Gianyar",
    tanggalRegistrasi: "2026-04-08 09:24:12",
    produk: "Produk Tabungan",
    status: "Diajukan",
  },
  {
    id: "8",
    nama: "Ni Made Ayu Lestari",
    phone: "087861234500",
    email: "ayu.lestari@gmail.com",
    alamat: "Br. Denjalan, Batubulan",
    tanggalRegistrasi: "2026-04-11 11:15:40",
    produk: "Produk Tabungan",
    status: "Diajukan",
  },
  {
    id: "9",
    nama: "I Wayan Sutama",
    phone: "082145678900",
    email: "wayan.sutama@gmail.com",
    alamat: "Jl. Cok Gede Rai, Peliatan",
    tanggalRegistrasi: "2026-04-12 14:38:05",
    produk: "Produk Tabungan",
    status: "Ditolak",
  },
];

function StatusPill({ status }: { status: StatusType }) {
  if (status === "Diproses" || status === "Diajukan") {
    return (
      <span
        className={cn(
          "inline-flex min-h-[34px] items-center justify-center rounded-[8px] px-4 py-2",
          "bg-[#3BB001] text-white",
          "text-[14px] font-extrabold leading-none",
        )}
      >
        {status}
      </span>
    );
  }

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
    <div className="overflow-hidden rounded-[8px] bg-[#1aa0b5] text-white shadow-sm ring-1 ring-white/10">
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

function InsetDivider() {
  return (
    <div className="px-6 sm:px-10">
      <div className="h-px w-full bg-slate-200/70" />
    </div>
  );
}

function TopPillButton({
  icon: Icon,
  label,
  onClick,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-3 rounded-full bg-white px-5",
        "text-[15px] font-semibold text-slate-800",
        "shadow-sm ring-1 ring-slate-200",
        "transition hover:bg-slate-50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
        className,
      )}
    >
      <Icon className="h-5 w-5 text-slate-600" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function loanMetaById(id: string) {
  const map: Record<
    string,
    {
      nominalPengajuan: string;
      jangkaWaktu: string;
      kolektor: string;
      deskripsi: string;
    }
  > = {
    "1": {
      nominalPengajuan: "12.000.000,00",
      jangkaWaktu: "12 Bulan",
      kolektor: "Gina Farida M.M.",
      deskripsi: "Pengajuan pinjaman koperasi untuk kebutuhan konsumtif.",
    },
    "2": {
      nominalPengajuan: "2.000.000,00",
      jangkaWaktu: "9 Bulan",
      kolektor: "Kolektor A",
      deskripsi: "Pengajuan pinjaman mikro (prototype).",
    },
    "3": {
      nominalPengajuan: "5.000.000,00",
      jangkaWaktu: "12 Bulan",
      kolektor: "Kolektor B",
      deskripsi: "Pengajuan pinjaman untuk modal usaha (prototype).",
    },
    "4": {
      nominalPengajuan: "10.000.000,00",
      jangkaWaktu: "12 Bulan",
      kolektor: "Gina Farida M.M.",
      deskripsi: "Pengajuan pinjaman koperasi (prototype).",
    },
    "6": {
      nominalPengajuan: "7.500.000,00",
      jangkaWaktu: "10 Bulan",
      kolektor: "Kolektor A",
      deskripsi: "Pengajuan pinjaman (prototype).",
    },
  };

  return (
    map[id] ?? {
      nominalPengajuan: "-",
      jangkaWaktu: "-",
      kolektor: "-",
      deskripsi: "-",
    }
  );
}

function defaultUpdateStatusPrefill(
  data: Row | null,
  loanMeta: ReturnType<typeof loanMetaById>,
  effectiveStatus: ObsStatus,
  idKey: string,
): UpdateStatusDialogPrefill {
  return {
    nikPemohon: idKey,
    namaPemohon: data?.nama ?? "Pemohon",
    verified: false,
    tanggal: "20-05-2026",
    pinjamanDiajukan:
      loanMeta.nominalPengajuan === "-"
        ? "30.000.000,00"
        : loanMeta.nominalPengajuan,
    pinjamanDisetujui:
      loanMeta.nominalPengajuan === "-"
        ? "30.000.000,00"
        : loanMeta.nominalPengajuan,
    deskripsi: "",
    status: effectiveStatus,
  };
}

type TableHistoryRow = {
  rowId: string;
  no: number;
  status: string;
  tanggal: string;
  diubahOleh: string;
  deskripsi: string;
};

export default function ObsSamudraHartaDetail() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  const data = React.useMemo(() => seed.find((r) => r.id === id) ?? null, [id]);
  const isSavingsDetail = data?.produk === "Produk Tabungan";
  const isLoanDetail = data?.produk === "Produk Pinjaman";

  const idKey = id;

  const [status, setStatus] = React.useState<ObsStatus>(() => {
    const stored = getObsRegistrationStatus(idKey);
    return stored ?? (data?.status ?? "Diajukan");
  });

  const [historyTick, setHistoryTick] = React.useState(0);

  React.useEffect(() => {
    const stored = getObsRegistrationStatus(idKey);
    setStatus(stored ?? (data?.status ?? "Diajukan"));
    setHistoryTick((t) => t + 1);
  }, [data?.status, id, idKey]);

  const historyRows = React.useMemo<TableHistoryRow[]>(() => {
    const stored: ObsStatusHistoryRow[] = getObsRegistrationHistory(idKey);

    if (stored.length > 0) {
      return stored
        .slice()
        .reverse()
        .map((r, idx) => ({
          rowId: r.id,
          no: idx + 1,
          status: r.status,
          tanggal: r.tanggal,
          diubahOleh: r.diubahOleh,
          deskripsi: r.deskripsi,
        }));
    }

    return [
      {
        rowId: "seed-1",
        no: 1,
        status: "Aktif / Sudah Dicairkan",
        tanggal: "07-04-2026",
        diubahOleh: "Gusman",
        deskripsi: "tess",
      },
      {
        rowId: "seed-2",
        no: 2,
        status: "Disetujui",
        tanggal: "07-04-2026",
        diubahOleh: "Gusman",
        deskripsi: "Tes",
      },
      {
        rowId: "seed-3",
        no: 3,
        status: "Diajukan",
        tanggal: "07-04-2026",
        diubahOleh: "Gusman",
        deskripsi: "Tes",
      },
    ];
  }, [historyTick, idKey]);

  const loanMeta = React.useMemo(() => loanMetaById(id), [id]);

  const [updateOpen, setUpdateOpen] = React.useState(false);

  const updatePrefill = React.useMemo(
    () => defaultUpdateStatusPrefill(data, loanMeta, status, idKey),
    [data, loanMeta, status, idKey],
  );

  const showCreateLoanButton =
    status === "Diproses" && data?.produk === "Produk Pinjaman";

  const historyTh = "px-4 py-2.5";
  const historyTd = "px-4 py-1.5";

  const pendaftarItems = React.useMemo(() => {
    if (!data) return [];

    const baseItems: Array<{ label: string; value: React.ReactNode }> = [
      { label: "Nama Pendaftar", value: data.nama },
      { label: "Nomor Telepon", value: data.phone },
      { label: "Email", value: data.email },
      { label: "Alamat", value: data.alamat },
      { label: "Tanggal Registrasi", value: data.tanggalRegistrasi },
    ];

    if (data.produk === "Produk Pinjaman") {
      return [
        ...baseItems,
        { label: "Tipe Produk", value: "Pinjaman" },
        { label: "Produk", value: "Pinjaman Koperasi" },
        {
          label: "Nominal Pengajuan",
          value: loanMeta.nominalPengajuan,
        },
        { label: "Jangka Waktu", value: loanMeta.jangkaWaktu },
        { label: "Kolektor", value: loanMeta.kolektor },
        { label: "Deskripsi", value: loanMeta.deskripsi },
        { label: "Status", value: <StatusPill status={status as StatusType} /> },
      ];
    }

    return [
      ...baseItems,
      {
        label: "Produk",
        value: data.produk === "Produk Tabungan" ? "Produk Simpanan" : data.produk,
      },
    ];
  }, [data, loanMeta, status]);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      {isLoanDetail ? (
        <UpdateStatusDialog
          open={updateOpen}
          onOpenChange={setUpdateOpen}
          prefill={updatePrefill}
          onSave={(next) => {
            setStatus(next.status);
            setHistoryTick((t) => t + 1);

            toast.success("Perbarui Status tersimpan (prototype)", {
              description: `Status: ${next.status}`,
            });
          }}
        />
      ) : null}

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

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <TopPillButton
              icon={List}
              label="Kembali ke Daftar"
              onClick={() => navigate("/obs-samudra-harta")}
              className="w-[194px]"
            />

            {isLoanDetail ? (
              <TopPillButton
                icon={Save}
                label="Perbarui Status"
                onClick={() => setUpdateOpen(true)}
                className="w-[194px]"
              />
            ) : null}

            {showCreateLoanButton ? (
              <TopPillButton
                icon={FilePlus2}
                label="Buat Pengajuan Pinjaman"
                onClick={() => {
                  toast.success("Membuka form Pengajuan Pinjaman", {
                    description:
                      "Form akan dibuka dalam modul OBS Samudra Harta.",
                  });
                  navigate("/obs-samudra-harta/loans/applications/new?prefill=empty");
                }}
                className="w-[240px]"
              />
            ) : null}
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

                <div className="mt-5">
                  <TealInfoPanel
                    title={
                      data.produk === "Produk Pinjaman"
                        ? "PINJAMAN KOPERASI"
                        : "SIMPANAN"
                    }
                    items={pendaftarItems}
                  />
                </div>
              </div>

              <InsetDivider />

              <div className="px-6 pb-6 pt-3 sm:px-10 sm:pb-8 sm:pt-4">
                <div className="text-[14px] font-extrabold uppercase tracking-wide text-slate-900">
                  GAMBAR
                </div>

                <div className="mt-5 overflow-hidden rounded-[5px] ring-1 ring-slate-200">
                  <div className="safe-x-scroll bg-white">
                    <table className="w-full min-w-[680px] border-collapse">
                      <thead className="bg-white">
                        <tr className="border-b border-slate-200 text-left text-[12px] font-extrabold uppercase tracking-wide text-[#64748B]">
                          <th className="w-[70px] px-4 py-2.5">NO</th>
                          <th className="px-4 py-2.5">FILE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan={2}
                            className="px-4 py-8 text-center text-sm text-slate-600"
                          >
                            Tidak ada file.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {isSavingsDetail ? null : (
                <>
                  <InsetDivider />

                  <div className="px-6 pb-6 pt-4 sm:px-10 sm:pb-8">
                    <div className="text-[14px] font-extrabold uppercase tracking-wide text-slate-900">
                      INFORMASI FILE
                    </div>

                    <div className="mt-4 text-[14px] font-medium text-slate-700">
                      Tidak ada file yang diupload
                    </div>
                  </div>

                  <InsetDivider />

                  <div className="px-6 pb-7 pt-4 sm:px-10 sm:pb-9">
                    <div className="text-[14px] font-extrabold uppercase tracking-wide text-slate-900">
                      RIWAYAT PERUBAHAN STATUS
                    </div>

                    <div className="mt-4 overflow-hidden rounded-[5px] bg-white ring-1 ring-slate-200">
                      <div className="safe-x-scroll">
                        <table className="w-full min-w-[980px] border-collapse bg-white">
                          <thead className="bg-white">
                            <tr className="border-b border-slate-200 text-left text-[12px] font-extrabold uppercase tracking-wide text-[#334155]">
                              <th
                                className={cn(
                                  "w-[80px]",
                                  historyTh,
                                  "border-r border-slate-200",
                                )}
                              >
                                NO.
                              </th>
                              <th
                                className={cn(
                                  "w-[320px]",
                                  historyTh,
                                  "border-r border-slate-200",
                                )}
                              >
                                STATUS
                              </th>
                              <th
                                className={cn(
                                  "w-[180px]",
                                  historyTh,
                                  "border-r border-slate-200",
                                )}
                              >
                                TANGGAL
                              </th>
                              <th
                                className={cn(
                                  "w-[180px]",
                                  historyTh,
                                  "border-r border-slate-200",
                                )}
                              >
                                DIUBAH OLEH
                              </th>
                              <th
                                className={cn(
                                  "min-w-[360px]",
                                  historyTh,
                                  "border-r border-slate-200",
                                )}
                              >
                                DESKRIPSI
                              </th>

                              <th className={cn("w-[110px]", historyTh)}>
                                AKSI
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {historyRows.length === 0 ? (
                              <tr>
                                <td
                                  colSpan={6}
                                  className="px-4 py-7 text-center text-sm text-slate-600"
                                >
                                  Belum ada riwayat.
                                </td>
                              </tr>
                            ) : (
                              historyRows.map((r, idx) => (
                                <tr
                                  key={r.rowId}
                                  className={cn(
                                    "border-t border-slate-200 text-[14px] font-normal text-slate-900",
                                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                                  )}
                                >
                                  <td
                                    className={cn(
                                      historyTd,
                                      "border-r border-slate-200 font-normal tabular-nums",
                                    )}
                                  >
                                    {r.no}
                                  </td>
                                  <td
                                    className={cn(
                                      historyTd,
                                      "border-r border-slate-200 font-normal",
                                    )}
                                  >
                                    {r.status}
                                  </td>
                                  <td
                                    className={cn(
                                      historyTd,
                                      "whitespace-nowrap border-r border-slate-200 font-normal tabular-nums",
                                    )}
                                  >
                                    {r.tanggal}
                                  </td>
                                  <td
                                    className={cn(
                                      historyTd,
                                      "border-r border-slate-200 font-normal",
                                    )}
                                  >
                                    {r.diubahOleh}
                                  </td>
                                  <td
                                    className={cn(
                                      historyTd,
                                      "border-r border-slate-200 font-normal",
                                    )}
                                  >
                                    {r.deskripsi}
                                  </td>

                                  <td
                                    className={cn(
                                      historyTd,
                                      "text-center text-slate-400",
                                    )}
                                  >
                                    {/* intentionally blank */}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="sr-only">{historyTick}</div>
                  </div>
                </>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}