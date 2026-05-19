import * as React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronUp, ChevronDown } from "lucide-react";

type ProductType = "-- Semua --" | "Produk Pinjaman" | "Produk Tabungan";
type StatusType = "-- Semua --" | "Diajukan" | "Diproses" | "Ditolak";

type Row = {
  id: string;
  nama: string;
  phone: string;
  email: string;
  alamat: string;
  tanggalRegistrasi: string; // yyyy-mm-dd hh:mm:ss (sesuai screenshot)
  produk: Exclude<ProductType, "-- Semua --">;
  status: Exclude<StatusType, "-- Semua --">;
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

function ThLabel({
  children,
  className,
  sortable = true,
}: {
  children: React.ReactNode;
  className?: string;
  sortable?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <div className="leading-[1.05]">{children}</div>
      {sortable ? (
        <span className="inline-flex flex-col leading-none text-slate-900/70">
          <ChevronUp className="-mb-0.5 h-3.5 w-3.5" />
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </div>
  );
}

function PaginationBar({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  return (
    <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
      <button
        type="button"
        className={cn(
          "h-10 px-4 text-[14px] font-medium transition",
          prevDisabled
            ? "text-slate-300"
            : "text-slate-500 hover:bg-slate-200",
        )}
        disabled={prevDisabled}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

      <button
        type="button"
        className="grid h-10 w-10 place-items-center bg-violet-600 text-[14px] font-semibold text-white"
        onClick={() => onPage(page)}
        aria-current="page"
      >
        {page}
      </button>

      <button
        type="button"
        className={cn(
          "h-10 px-4 text-[14px] font-medium transition",
          nextDisabled
            ? "text-slate-300"
            : "text-slate-500 hover:bg-slate-200",
        )}
        disabled={nextDisabled}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}

function StatusPill({ status }: { status: Row["status"] }) {
  const cls =
    status === "Diajukan"
      ? "bg-amber-500 text-white ring-1 ring-amber-500/20"
      : status === "Diproses"
        ? "bg-blue-600 text-white ring-1 ring-blue-600/20"
        : "bg-rose-600 text-white ring-1 ring-rose-600/20";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[5px] px-2.5 py-1",
        "text-[12px] font-semibold leading-none whitespace-nowrap",
        cls,
      )}
    >
      {status}
    </span>
  );
}

export default function ObsSamudraHarta() {
  const rows = React.useMemo(() => seed, []);

  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  const [qNama, setQNama] = React.useState<string>("");

  const [qPhone, setQPhone] = React.useState("");
  const [qEmail, setQEmail] = React.useState("");
  const [qAlamat, setQAlamat] = React.useState("");
  const [qTanggal, setQTanggal] = React.useState("");
  const [qProduk, setQProduk] = React.useState<ProductType>("-- Semua --");
  const [qStatus, setQStatus] = React.useState<StatusType>("-- Semua --");

  const filtered = React.useMemo(() => {
    const namaQ = qNama.trim().toLowerCase();
    const phoneQ = qPhone.trim().toLowerCase();
    const emailQ = qEmail.trim().toLowerCase();
    const alamatQ = qAlamat.trim().toLowerCase();
    const tglQ = qTanggal.trim().toLowerCase();

    return rows.filter((r) => {
      const okNama = namaQ ? r.nama.toLowerCase().includes(namaQ) : true;
      const okPhone = phoneQ ? r.phone.toLowerCase().includes(phoneQ) : true;
      const okEmail = emailQ ? r.email.toLowerCase().includes(emailQ) : true;
      const okAlamat = alamatQ ? r.alamat.toLowerCase().includes(alamatQ) : true;
      const okTgl = tglQ
        ? r.tanggalRegistrasi.toLowerCase().includes(tglQ)
        : true;
      const okProduk = qProduk === "-- Semua --" ? true : r.produk === qProduk;
      const okStatus = qStatus === "-- Semua --" ? true : r.status === qStatus;

      return okNama && okPhone && okEmail && okAlamat && okTgl && okProduk && okStatus;
    });
  }, [qAlamat, qEmail, qNama, qPhone, qProduk, qStatus, qTanggal, rows]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, qNama, qPhone, qEmail, qAlamat, qTanggal, qProduk, qStatus]);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  const th = "px-3 py-3";
  const filterCell = "px-3 py-2";
  const td = "px-3 py-2";

  const filterInputCls =
    "h-9 rounded-[6px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

  const produkSelectTriggerCls =
    "h-9 rounded-[6px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

  const statusSelectTriggerCls =
    "h-9 rounded-[6px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

  const pageSizeTriggerCls =
    "h-8 w-[74px] rounded-[6px] border-slate-300 bg-white px-2 text-[13px] font-medium text-slate-900 shadow-none";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Pendaftaran Online
          </h1>
          <div className="text-base font-semibold text-slate-600">Daftar</div>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex items-center gap-2 pb-3 text-[13px] font-medium text-slate-800">
            <span>Tampilkan</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => setPageSize(Number(v))}
            >
              <SelectTrigger className={pageSizeTriggerCls}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                {[10, 20, 50, 100].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>entri</span>
          </div>

          <div className="overflow-hidden bg-white">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[1120px] border-collapse">
                <thead className="bg-white">
                  <tr className="border-b border-slate-300/70 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                    <th className={cn("w-[44px] whitespace-nowrap", th)}>
                      <ThLabel sortable={false}>No.</ThLabel>
                    </th>

                    <th className={cn("w-[210px]", th)}>
                      <ThLabel>NAMA</ThLabel>
                    </th>
                    <th className={cn("w-[190px]", th)}>
                      <ThLabel>NO. TELP/HANDPHONE</ThLabel>
                    </th>
                    <th className={cn("w-[220px]", th)}>
                      <ThLabel>EMAIL</ThLabel>
                    </th>

                    <th className={cn("w-[280px] max-w-[280px]", th)}>
                      <ThLabel>ALAMAT</ThLabel>
                    </th>

                    <th className={cn("w-[210px]", th)}>
                      <ThLabel>TANGGAL REGISTRASI</ThLabel>
                    </th>

                    <th className={cn("w-[200px]", th)}>
                      <ThLabel>PRODUK</ThLabel>
                    </th>

                    {/* ✅ kolom baru: STATUS */}
                    <th className={cn("w-[140px]", th)}>
                      <ThLabel>STATUS</ThLabel>
                    </th>
                  </tr>

                  <tr className="border-b border-slate-200 bg-white">
                    <th className={filterCell} />

                    <th className={filterCell}>
                      <Input
                        value={qNama}
                        onChange={(e) => setQNama(e.target.value)}
                        className={filterInputCls}
                        placeholder=""
                      />
                    </th>

                    <th className={filterCell}>
                      <Input
                        value={qPhone}
                        onChange={(e) => setQPhone(e.target.value)}
                        className={filterInputCls}
                        placeholder=""
                      />
                    </th>

                    <th className={filterCell}>
                      <Input
                        value={qEmail}
                        onChange={(e) => setQEmail(e.target.value)}
                        className={filterInputCls}
                        placeholder=""
                      />
                    </th>

                    <th className={cn(filterCell, "w-[280px] max-w-[280px]")}>
                      <Input
                        value={qAlamat}
                        onChange={(e) => setQAlamat(e.target.value)}
                        className={filterInputCls}
                        placeholder=""
                      />
                    </th>

                    <th className={filterCell}>
                      <div className="relative">
                        <Input
                          value={qTanggal}
                          onChange={(e) => setQTanggal(e.target.value)}
                          className={cn(filterInputCls, "pr-11")}
                          placeholder=""
                        />
                        <button
                          type="button"
                          onClick={() => setQTanggal("")}
                          className={cn(
                            "absolute right-0 top-0",
                            "h-9 w-10",
                            "rounded-r-[6px] rounded-l-none",
                            "bg-slate-600 text-white ring-1 ring-slate-600/20",
                            "transition hover:bg-slate-700",
                            "text-[16px] font-semibold leading-none",
                          )}
                          aria-label="Clear tanggal"
                          title="Clear"
                        >
                          ×
                        </button>
                      </div>
                    </th>

                    <th className={filterCell}>
                      <Select
                        value={qProduk}
                        onValueChange={(v) => setQProduk(v as ProductType)}
                      >
                        <SelectTrigger className={produkSelectTriggerCls}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="-- Semua --">-- Semua --</SelectItem>
                          <SelectItem value="Produk Pinjaman">
                            Produk Pinjaman
                          </SelectItem>
                          <SelectItem value="Produk Tabungan">
                            Produk Tabungan
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </th>

                    {/* ✅ filter STATUS */}
                    <th className={filterCell}>
                      <Select
                        value={qStatus}
                        onValueChange={(v) => setQStatus(v as StatusType)}
                      >
                        <SelectTrigger className={statusSelectTriggerCls}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="-- Semua --">-- Semua --</SelectItem>
                          <SelectItem value="Diajukan">Diajukan</SelectItem>
                          <SelectItem value="Diproses">Diproses</SelectItem>
                          <SelectItem value="Ditolak">Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {paged.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-10 text-center text-sm text-slate-600"
                      >
                        Tidak ada data yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    paged.map((r, idx) => (
                      <tr
                        key={r.id}
                        className={cn(
                          "border-b border-slate-200 text-[13px]",
                          idx % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                        )}
                      >
                        <td className={cn(td, "tabular-nums text-slate-900")}>
                          {(page - 1) * pageSize + idx + 1}
                        </td>

                        <td className={cn(td)}>
                          <button
                            type="button"
                            onClick={(e) => e.preventDefault()}
                            className="block w-full truncate text-left font-semibold text-blue-600 hover:underline"
                            title={r.nama}
                          >
                            {r.nama}
                          </button>
                        </td>

                        <td className={cn(td, "tabular-nums whitespace-nowrap")}>
                          {r.phone}
                        </td>

                        <td className={cn(td, "truncate")} title={r.email}>
                          {r.email}
                        </td>

                        <td
                          className={cn(td, "w-[280px] max-w-[280px] truncate")}
                          title={r.alamat}
                        >
                          {r.alamat}
                        </td>

                        <td className={cn(td, "tabular-nums whitespace-nowrap")}>
                          {r.tanggalRegistrasi}
                        </td>

                        <td className={cn(td, "whitespace-nowrap")}>{r.produk}</td>

                        <td className={cn(td)}>
                          <StatusPill status={r.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-[14px] text-slate-900">
              Menampilkan {showingStart} sampai {showingEnd} dari {filtered.length}{" "}
              entri
            </div>

            <PaginationBar page={page} pageCount={pageCount} onPage={setPage} />
          </div>
        </Card>
      </div>
    </div>
  );
}