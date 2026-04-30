import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type LoanApplicationStatus =
  | "Semua"
  | "Draft"
  | "Diajukan"
  | "Ditolak"
  | "Disetujui"
  | "Nonaktif / Ditolak";

type LoanApplicationRow = {
  id: string;
  noRekening: string;
  tanggalDaftar: string;
  produkPinjaman: string;
  idNasabah: string;
  namaNasabah: string;
  nominal: string;
  bungaPerTahun: string;
  status: Exclude<LoanApplicationStatus, "Semua">;
};

const seed: LoanApplicationRow[] = [
  {
    id: "APP-260001",
    noRekening: "072260001",
    tanggalDaftar: "05-02-2026",
    produkPinjaman: "Pinjaman Harian",
    idNasabah: "N2400033",
    namaNasabah: "Rika Wastuti",
    nominal: "22.000.000,00",
    bungaPerTahun: "20.00",
    status: "Disetujui",
  },
  {
    id: "APP-260002",
    noRekening: "SMG250006",
    tanggalDaftar: "03-12-2025",
    produkPinjaman: "Pinjaman Bulanan 9",
    idNasabah: "N2500006",
    namaNasabah: "Andri Komara",
    nominal: "5.000.000,00",
    bungaPerTahun: "0.99",
    status: "Nonaktif / Ditolak",
  },
  {
    id: "APP-260003",
    noRekening: "SMG250003",
    tanggalDaftar: "02-12-2025",
    produkPinjaman: "Pinjaman Bulanan 9",
    idNasabah: "N2500010",
    namaNasabah: "gaby",
    nominal: "5.000.000,00",
    bungaPerTahun: "0.99",
    status: "Disetujui",
  },
  {
    id: "APP-260004",
    noRekening: "12250003",
    tanggalDaftar: "01-04-2025",
    produkPinjaman: "Pinjaman Bulanan",
    idNasabah: "N2400029",
    namaNasabah: "Pangeran Sirait",
    nominal: "24.000.000,00",
    bungaPerTahun: "12.00",
    status: "Disetujui",
  },
  {
    id: "APP-260005",
    noRekening: "klp03.06240001",
    tanggalDaftar: "22-11-2024",
    produkPinjaman: "Pinjaman Bulanan 5",
    idNasabah: "N2400028",
    namaNasabah: "Rahmi Melani",
    nominal: "24.000.000,00",
    bungaPerTahun: "0.00",
    status: "Disetujui",
  },
  {
    id: "APP-260006",
    noRekening: "09240015",
    tanggalDaftar: "26-06-2024",
    produkPinjaman: "Pinjaman Bulanan 17",
    idNasabah: "N2400029",
    namaNasabah: "Pangeran Sirait",
    nominal: "12.000.000,00",
    bungaPerTahun: "24.00",
    status: "Disetujui",
  },
];

function StatusBadge({ status }: { status: LoanApplicationRow["status"] }) {
  const map: Record<
    LoanApplicationRow["status"],
    { className: string; label: string }
  > = {
    Draft: {
      className: "bg-slate-200 text-slate-900 hover:bg-slate-200",
      label: "Draft",
    },
    Diajukan: {
      className: "bg-blue-600 text-white hover:bg-blue-600",
      label: "Diajukan",
    },
    Ditolak: {
      className: "bg-rose-600 text-white hover:bg-rose-600",
      label: "Ditolak",
    },
    "Nonaktif / Ditolak": {
      className: "bg-rose-600 text-white hover:bg-rose-600",
      label: "Nonaktif / Ditolak",
    },
    Disetujui: {
      className: "bg-emerald-600 text-white hover:bg-emerald-600",
      label: "Disetujui",
    },
  };

  const v = map[status];

  return (
    <Badge
      className={cn(
        "rounded-[5px] px-2.5 py-1 text-[11px] font-normal leading-none",
        v.className,
      )}
    >
      {v.label}
    </Badge>
  );
}

function ThLabel({
  children,
  sortable = true,
  className,
}: {
  children: React.ReactNode;
  sortable?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-1.5", className)}>
      <div className="leading-[1.05]">{children}</div>
      {sortable ? (
        <span className="inline-flex flex-col leading-none text-slate-900/80">
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
  if (pageCount <= 1) {
    return (
      <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
        <button
          type="button"
          disabled
          className="h-10 px-4 text-[14px] font-medium text-slate-400"
        >
          Sebelumnya
        </button>
        <div className="h-10 w-10 bg-violet-600 text-[14px] font-semibold text-white grid place-items-center">
          1
        </div>
        <button
          type="button"
          disabled
          className="h-10 px-4 text-[14px] font-medium text-slate-400"
        >
          Selanjutnya
        </button>
      </div>
    );
  }

  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  const btnBase =
    "h-10 px-4 text-[14px] font-medium transition disabled:text-slate-400";

  return (
    <div className="inline-flex items-center overflow-hidden rounded-[2px] bg-slate-100">
      <button
        type="button"
        className={cn(btnBase, "text-slate-500 hover:bg-slate-200")}
        disabled={prevDisabled}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

      <button
        type="button"
        className="h-10 w-10 bg-violet-600 text-[14px] font-semibold text-white"
        onClick={() => onPage(page)}
        aria-current="page"
      >
        {page}
      </button>

      <button
        type="button"
        className={cn(btnBase, "text-slate-500 hover:bg-slate-200")}
        disabled={nextDisabled}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}

export default function LoanApplications() {
  const rows = React.useMemo(() => seed, []);

  const [qNoRek, setQNoRek] = React.useState("");
  const [qTanggal, setQTanggal] = React.useState("");
  const [qProduk, setQProduk] = React.useState<string>("Semua");
  const [qIdNasabah, setQIdNasabah] = React.useState("");
  const [qNamaNasabah, setQNamaNasabah] = React.useState("");
  const [qNominal, setQNominal] = React.useState("0,00");
  const [qBunga, setQBunga] = React.useState("");
  const [qStatus, setQStatus] = React.useState<LoanApplicationStatus>("Semua");

  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  const filtered = React.useMemo(() => {
    const noRekQ = qNoRek.trim().toLowerCase();
    const tanggalQ = qTanggal.trim().toLowerCase();
    const produkQ = qProduk;
    const idNasabahQ = qIdNasabah.trim().toLowerCase();
    const namaQ = qNamaNasabah.trim().toLowerCase();
    const bungaQ = qBunga.trim().toLowerCase();
    const statusQ = qStatus;

    return rows.filter((r) => {
      const okNoRek = noRekQ ? r.noRekening.toLowerCase().includes(noRekQ) : true;
      const okTanggal = tanggalQ
        ? r.tanggalDaftar.toLowerCase().includes(tanggalQ)
        : true;
      const okProduk = produkQ === "Semua" ? true : r.produkPinjaman === produkQ;
      const okId = idNasabahQ ? r.idNasabah.toLowerCase().includes(idNasabahQ) : true;
      const okNama = namaQ ? r.namaNasabah.toLowerCase().includes(namaQ) : true;
      const okBunga = bungaQ ? r.bungaPerTahun.toLowerCase().includes(bungaQ) : true;

      const okNominal = true;

      const okStatus = statusQ === "Semua" ? true : r.status === statusQ;

      return (
        okNoRek &&
        okTanggal &&
        okProduk &&
        okId &&
        okNama &&
        okNominal &&
        okBunga &&
        okStatus
      );
    });
  }, [qBunga, qIdNasabah, qNamaNasabah, qNoRek, qProduk, qStatus, qTanggal, rows]);

  const productOptions = React.useMemo(() => {
    const set = new Set<string>(rows.map((r) => r.produkPinjaman));
    return ["Semua", ...Array.from(set)];
  }, [rows]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, qNoRek, qTanggal, qProduk, qIdNasabah, qNamaNasabah, qNominal, qBunga, qStatus]);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  // lebih rapat
  const th = "px-2 py-2.5";
  const filterCell = "px-2 py-1.5";
  const td = "px-2 py-2";

  const produkColW = "w-[150px] max-w-[150px]";
  const namaColW = "w-[170px] max-w-[170px]";

  const filterInputCls =
    "h-8 rounded-[6px] border-slate-300 bg-white text-[13px] shadow-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/20";
  const filterSelectTriggerCls =
    "h-8 rounded-[6px] border-slate-300 bg-white text-[13px] shadow-none focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20";

  const pageSizeTriggerCls =
    "h-7 w-[68px] rounded-[6px] border-slate-300 bg-white px-2 text-[12.5px] font-semibold text-slate-900 shadow-none";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Daftar Pengajuan Pinjaman
              </h1>
              <div className="text-sm font-semibold text-slate-500">Daftar</div>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800 hover:bg-slate-50"
          >
            <Link to="/loans/applications/new">
              <Plus className="mr-2 h-4 w-4" />
              Tambah
            </Link>
          </Button>
        </div>

        <Separator className="my-6 bg-slate-200/70" />

        <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex items-center gap-2 pb-3 text-[13px] font-medium text-slate-800">
            <span>Tampilkan</span>
            <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
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

          {/* TABLE tanpa horizontal scroll */}
          <div className="overflow-hidden bg-white">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-white">
                <tr className="border-b border-slate-300/70 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                  <th className={cn("w-[44px] whitespace-nowrap", th)}>
                    <ThLabel sortable={false}>No.</ThLabel>
                  </th>

                  <th className={cn("w-[130px]", th)}>
                    <ThLabel>
                      <span className="block">No.</span>
                      <span className="block">Rekening</span>
                    </ThLabel>
                  </th>

                  <th className={cn("w-[120px]", th)}>
                    <ThLabel>
                      <span className="block">Tanggal</span>
                      <span className="block">Daftar</span>
                    </ThLabel>
                  </th>

                  <th className={cn("w-[150px]", th)}>
                    <ThLabel>
                      <span className="block">Produk</span>
                      <span className="block">Pinjaman</span>
                    </ThLabel>
                  </th>

                  {/* sembunyikan di layar kecil agar tidak perlu scroll */}
                  <th className={cn("hidden lg:table-cell w-[120px]", th)}>
                    <ThLabel>
                      <span className="block">ID.</span>
                      <span className="block">Nasabah</span>
                    </ThLabel>
                  </th>

                  <th className={cn("w-[160px]", th)}>
                    <ThLabel>Nama Nasabah</ThLabel>
                  </th>

                  <th className={cn("w-[140px] text-right", th)}>
                    <div className="flex items-center justify-end gap-1.5">
                      <ThLabel className="justify-end">Nominal</ThLabel>
                    </div>
                  </th>

                  <th className={cn("hidden xl:table-cell w-[110px]", th)}>
                    <ThLabel>
                      <span className="block">Bunga</span>
                      <span className="block">/Thn (%)</span>
                    </ThLabel>
                  </th>

                  <th className={cn("w-[150px]", th)}>
                    <ThLabel>Status</ThLabel>
                  </th>
                </tr>

                <tr className="border-b border-slate-200 bg-white">
                  <th className={filterCell} />
                  <th className={filterCell}>
                    <Input
                      value={qNoRek}
                      onChange={(e) => setQNoRek(e.target.value)}
                      className={filterInputCls}
                      placeholder=""
                    />
                  </th>
                  <th className={filterCell}>
                    <Input
                      value={qTanggal}
                      onChange={(e) => setQTanggal(e.target.value)}
                      className={filterInputCls}
                      placeholder=""
                    />
                  </th>
                  <th className={cn(filterCell, produkColW)}>
                    <Select value={qProduk} onValueChange={setQProduk}>
                      <SelectTrigger className={cn(filterSelectTriggerCls, "w-full")}>
                        <SelectValue placeholder="-- Semua" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200">
                        {productOptions.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p === "Semua" ? "-- Semua --" : p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </th>

                  <th className={cn("hidden lg:table-cell", filterCell)}>
                    <Input
                      value={qIdNasabah}
                      onChange={(e) => setQIdNasabah(e.target.value)}
                      className={filterInputCls}
                      placeholder=""
                    />
                  </th>

                  <th className={cn(filterCell, namaColW)}>
                    <Input
                      value={qNamaNasabah}
                      onChange={(e) => setQNamaNasabah(e.target.value)}
                      className={filterInputCls}
                      placeholder=""
                    />
                  </th>

                  <th className={filterCell}>
                    <Input
                      value={qNominal}
                      onChange={(e) => setQNominal(e.target.value)}
                      className={cn(filterInputCls, "text-right tabular-nums")}
                      placeholder="0,00"
                      inputMode="decimal"
                    />
                  </th>

                  <th className={cn("hidden xl:table-cell", filterCell)}>
                    <Input
                      value={qBunga}
                      onChange={(e) => setQBunga(e.target.value)}
                      className={filterInputCls}
                      placeholder=""
                      inputMode="decimal"
                    />
                  </th>

                  <th className={filterCell}>
                    <Select
                      value={qStatus}
                      onValueChange={(v) => setQStatus(v as LoanApplicationStatus)}
                    >
                      <SelectTrigger className={filterSelectTriggerCls}>
                        <SelectValue placeholder="-- Semua --" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200">
                        <SelectItem value="Semua">-- Semua --</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Diajukan">Diajukan</SelectItem>
                        <SelectItem value="Disetujui">Disetujui</SelectItem>
                        <SelectItem value="Ditolak">Ditolak</SelectItem>
                        <SelectItem value="Nonaktif / Ditolak">
                          Nonaktif / Ditolak
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {paged.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
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
                      <td className={cn(td, "text-slate-900 tabular-nums")}>
                        {(page - 1) * pageSize + idx + 1}
                      </td>

                      <td className={td}>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="block truncate font-semibold text-blue-600 hover:underline"
                          title={r.noRekening}
                        >
                          {r.noRekening}
                        </a>
                      </td>

                      <td className={cn(td, "text-slate-900 tabular-nums whitespace-nowrap")}>
                        {r.tanggalDaftar}
                      </td>

                      <td className={cn(td, "truncate text-slate-900")} title={r.produkPinjaman}>
                        {r.produkPinjaman}
                      </td>

                      <td
                        className={cn(
                          "hidden lg:table-cell",
                          td,
                          "text-slate-900 tabular-nums whitespace-nowrap",
                        )}
                      >
                        {r.idNasabah}
                      </td>

                      <td className={cn(td, "truncate text-slate-900")} title={r.namaNasabah}>
                        {r.namaNasabah}
                      </td>

                      <td className={cn(td, "text-right font-medium text-slate-900 tabular-nums")}>
                        {r.nominal}
                      </td>

                      <td className={cn("hidden xl:table-cell", td, "text-slate-900 tabular-nums")}>
                        {r.bungaPerTahun}
                      </td>

                      <td className={td}>
                        <StatusBadge status={r.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-[14px] text-slate-900">
              Menampilkan {showingStart} sampai {showingEnd} dari {filtered.length} entri{" "}
              <span className="text-slate-600">
                (disaring dari {rows.length} entri keseluruhan)
              </span>
            </div>

            <PaginationBar page={page} pageCount={pageCount} onPage={setPage} />
          </div>
        </Card>
      </div>
    </div>
  );
}