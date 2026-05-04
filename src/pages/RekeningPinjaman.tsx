import * as React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import LoanAccountDetailHeader from "@/components/loans/LoanAccountDetailHeader";
import LoanAccountDetailSections from "@/components/loans/LoanAccountDetailSections";
import { ChevronUp, ChevronDown } from "lucide-react";

type StatusFilter = "Semua" | "Aktif / Sudah Dicairkan" | "Lunas" | "Macet";

type Row = {
  id: string;
  noRekening: string;
  tanggalDaftar: string;
  produkPinjaman: string;
  idNasabah: string;
  namaNasabah: string;
  nominal: string;
  sisaPinjaman: string;
  bungaPerTahun: string;
  status: Exclude<StatusFilter, "Semua">;
};

const seed: Row[] = [
  {
    id: "RP-260001",
    noRekening: "SMG260004",
    tanggalDaftar: "07-04-2026",
    produkPinjaman: "Pinjaman Bulanan 9",
    idNasabah: "N2600006",
    namaNasabah: "Bapak Bagus",
    nominal: "12.000.000,00",
    sisaPinjaman: "10.553.571,00",
    bungaPerTahun: "12.00",
    status: "Aktif / Sudah Dicairkan",
  },
  {
    id: "RP-260002",
    noRekening: "klpk04.07260001",
    tanggalDaftar: "10-02-2026",
    produkPinjaman: "Pinjaman Bulanan 1",
    idNasabah: "N2500009",
    namaNasabah: "indah sari",
    nominal: "10.000.000,00",
    sisaPinjaman: "8.645.833,33",
    bungaPerTahun: "11.50",
    status: "Aktif / Sudah Dicairkan",
  },
  {
    id: "RP-260003",
    noRekening: "SMG260021",
    tanggalDaftar: "26-06-2024",
    produkPinjaman: "Pinjaman Harian",
    idNasabah: "N2400033",
    namaNasabah: "Rika Wastuti",
    nominal: "3.500.000,00",
    sisaPinjaman: "3.250.000,00",
    bungaPerTahun: "20.00",
    status: "Macet",
  },
];

function StatusBadge({ status }: { status: Row["status"] }) {
  const map: Record<Row["status"], { className: string; label: string }> = {
    "Aktif / Sudah Dicairkan": {
      className: "bg-emerald-600 text-white hover:bg-emerald-600",
      label: "Aktif / Sudah Dicairkan",
    },
    Lunas: {
      className: "bg-slate-200 text-slate-800 hover:bg-slate-200",
      label: "Lunas",
    },
    Macet: {
      className: "bg-rose-600 text-white hover:bg-rose-600",
      label: "Macet",
    },
  };

  const v = map[status];
  return (
    <Badge
      className={cn(
        "whitespace-nowrap rounded-[5px] px-2.5 py-1 text-[11px] font-normal leading-none",
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
    <div className={cn("flex items-center justify-between gap-2", className)}>
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
        <div className="grid h-10 w-10 place-items-center bg-violet-600 text-[14px] font-semibold text-white">
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

export default function RekeningPinjaman() {
  const location = useLocation();
  const rows = React.useMemo(() => seed, []);

  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  const [qNoRek, setQNoRek] = React.useState("");
  const [qTanggal, setQTanggal] = React.useState("");
  const [qProduk, setQProduk] = React.useState<string>("Semua");
  const [qIdNasabah, setQIdNasabah] = React.useState("");
  const [qNamaNasabah, setQNamaNasabah] = React.useState("");
  const [qNominal, setQNominal] = React.useState("0,00");
  const [qSisa, setQSisa] = React.useState("0,00");
  const [qBunga, setQBunga] = React.useState("");
  const [qStatus, setQStatus] = React.useState<StatusFilter>("Semua");

  const [selectedAccountNo, setSelectedAccountNo] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const state = location.state as { selectedAccountNo?: string } | null;
    if (state?.selectedAccountNo) {
      setSelectedAccountNo(state.selectedAccountNo);
    }
  }, [location.state]);

  const productOptions = React.useMemo(() => {
    const set = new Set<string>(rows.map((r) => r.produkPinjaman));
    return ["Semua", ...Array.from(set)];
  }, [rows]);

  const filtered = React.useMemo(() => {
    const noRekQ = qNoRek.trim().toLowerCase();
    const tanggalQ = qTanggal.trim().toLowerCase();
    const produkQ = qProduk;
    const idQ = qIdNasabah.trim().toLowerCase();
    const namaQ = qNamaNasabah.trim().toLowerCase();
    const bungaQ = qBunga.trim().toLowerCase();
    const statusQ = qStatus;

    return rows.filter((r) => {
      const okNoRek = noRekQ ? r.noRekening.toLowerCase().includes(noRekQ) : true;
      const okTanggal = tanggalQ
        ? r.tanggalDaftar.toLowerCase().includes(tanggalQ)
        : true;
      const okProduk = produkQ === "Semua" ? true : r.produkPinjaman === produkQ;
      const okId = idQ ? r.idNasabah.toLowerCase().includes(idQ) : true;
      const okNama = namaQ ? r.namaNasabah.toLowerCase().includes(namaQ) : true;
      const okBunga = bungaQ ? r.bungaPerTahun.toLowerCase().includes(bungaQ) : true;
      const okStatus = statusQ === "Semua" ? true : r.status === statusQ;

      const okNominal = true;
      const okSisa = true;

      return (
        okNoRek &&
        okTanggal &&
        okProduk &&
        okId &&
        okNama &&
        okNominal &&
        okSisa &&
        okBunga &&
        okStatus
      );
    });
  }, [
    qBunga,
    qIdNasabah,
    qNamaNasabah,
    qNoRek,
    qProduk,
    qStatus,
    qTanggal,
    qNominal,
    qSisa,
    rows,
  ]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [
    pageSize,
    qNoRek,
    qTanggal,
    qProduk,
    qIdNasabah,
    qNamaNasabah,
    qNominal,
    qSisa,
    qBunga,
    qStatus,
  ]);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  const isDetail = !!selectedAccountNo;

  // lebih rapat lagi
  const th = "px-1.5 py-2";
  const filterCell = "px-1.5 py-1";
  const td = "px-1.5 py-1.5";

  const filterInputCls =
    "h-7 rounded-[6px] border-slate-300 bg-white text-[12.5px] shadow-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/20";
  const filterSelectTriggerCls =
    "h-7 rounded-[6px] border-slate-300 bg-white text-[12.5px] shadow-none focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20";

  const pageSizeTriggerCls =
    "h-7 w-[68px] rounded-[6px] border-slate-300 bg-white px-2 text-[12.5px] font-semibold text-slate-900 shadow-none";

  const noColW = "w-[40px] min-w-[40px] max-w-[40px]";
  const tanggalDaftarColW = "w-[120px] min-w-[120px] max-w-[120px]";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        {selectedAccountNo ? (
          <>
            <LoanAccountDetailHeader
              accountNo={selectedAccountNo}
              onBack={() => setSelectedAccountNo(null)}
              onAction={(label) =>
                toast(`${label} (prototype)`, {
                  description: `Rekening: ${selectedAccountNo}`,
                })
              }
            />

            <LoanAccountDetailSections accountNo={selectedAccountNo} />
          </>
        ) : null}

        {isDetail ? null : (
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                    Rekening Pinjaman
                  </h1>
                  <div className="text-sm font-semibold text-slate-500">Daftar</div>
                </div>
              </div>
            </div>

            <Separator className="my-6 bg-slate-200/70" />

            <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
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
                  <table className="w-full min-w-[1200px] border-collapse">
                    <thead className="bg-white">
                      <tr className="border-b border-slate-300/70 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900">
                        <th className={cn(noColW, "whitespace-nowrap", th)}>
                          <ThLabel sortable={false}>No.</ThLabel>
                        </th>

                        <th className={cn("w-[190px]", th)}>
                          <ThLabel>
                            <span className="block">No.</span>
                            <span className="block">Rekening</span>
                          </ThLabel>
                        </th>

                        <th className={cn(tanggalDaftarColW, th)}>
                          <ThLabel>
                            <span className="block">Tanggal</span>
                            <span className="block">Daftar</span>
                          </ThLabel>
                        </th>

                        <th className={cn("w-[190px]", th)}>
                          <ThLabel>
                            <span className="block">Produk</span>
                            <span className="block">Pinjaman</span>
                          </ThLabel>
                        </th>

                        <th className={cn("w-[150px]", th)}>
                          <ThLabel>
                            <span className="block">ID.</span>
                            <span className="block">Nasabah</span>
                          </ThLabel>
                        </th>

                        <th className={cn("w-[190px]", th)}>
                          <ThLabel>
                            <span className="block">Nama</span>
                            <span className="block">Nasabah</span>
                          </ThLabel>
                        </th>

                        <th className={cn("w-[190px]", th)}>
                          <ThLabel>Nominal</ThLabel>
                        </th>

                        <th className={cn("w-[190px]", th)}>
                          <ThLabel>
                            <span className="block">Sisa</span>
                            <span className="block">Pinjaman</span>
                          </ThLabel>
                        </th>

                        <th className={cn("w-[160px]", th)}>
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
                        <th className={cn(noColW, filterCell)} />
                        <th className={filterCell}>
                          <Input
                            value={qNoRek}
                            onChange={(e) => setQNoRek(e.target.value)}
                            className={filterInputCls}
                            placeholder=""
                          />
                        </th>
                        <th className={cn(tanggalDaftarColW, filterCell)}>
                          <Input
                            value={qTanggal}
                            onChange={(e) => setQTanggal(e.target.value)}
                            className={filterInputCls}
                            placeholder=""
                          />
                        </th>
                        <th className={filterCell}>
                          <Select value={qProduk} onValueChange={setQProduk}>
                            <SelectTrigger className={filterSelectTriggerCls}>
                              <SelectValue placeholder="-- Semua --" />
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
                        <th className={filterCell}>
                          <Input
                            value={qIdNasabah}
                            onChange={(e) => setQIdNasabah(e.target.value)}
                            className={filterInputCls}
                            placeholder=""
                          />
                        </th>
                        <th className={filterCell}>
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
                            className={filterInputCls}
                            placeholder="0,00"
                            inputMode="decimal"
                          />
                        </th>
                        <th className={filterCell}>
                          <Input
                            value={qSisa}
                            onChange={(e) => setQSisa(e.target.value)}
                            className={filterInputCls}
                            placeholder="0,00"
                            inputMode="decimal"
                          />
                        </th>
                        <th className={filterCell}>
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
                            onValueChange={(v) => setQStatus(v as StatusFilter)}
                          >
                            <SelectTrigger className={filterSelectTriggerCls}>
                              <SelectValue placeholder="-- Semua --" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-200">
                              <SelectItem value="Semua">-- Semua --</SelectItem>
                              <SelectItem value="Aktif / Sudah Dicairkan">
                                Aktif / Sudah Dicairkan
                              </SelectItem>
                              <SelectItem value="Lunas">Lunas</SelectItem>
                              <SelectItem value="Macet">Macet</SelectItem>
                            </SelectContent>
                          </Select>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {paged.length === 0 ? (
                        <tr>
                          <td
                            colSpan={10}
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
                            <td
                              className={cn(
                                td,
                                noColW,
                                "text-left text-slate-900 tabular-nums",
                              )}
                            >
                              {(page - 1) * pageSize + idx + 1}
                            </td>

                            <td className={cn(td, "text-left")}>
                              <button
                                type="button"
                                onClick={() => setSelectedAccountNo(r.noRekening)}
                                title={r.noRekening}
                                className={cn(
                                  "block w-full text-left",
                                  "font-semibold text-blue-600 hover:underline",
                                  "break-all leading-snug",
                                )}
                              >
                                {r.noRekening}
                              </button>
                            </td>

                            <td
                              className={cn(
                                td,
                                tanggalDaftarColW,
                                "text-left text-slate-900 tabular-nums whitespace-nowrap",
                              )}
                            >
                              {r.tanggalDaftar}
                            </td>

                            <td className={cn(td, "text-left text-slate-900")}>
                              {r.produkPinjaman}
                            </td>

                            <td
                              className={cn(
                                td,
                                "text-left text-slate-900 tabular-nums whitespace-nowrap",
                              )}
                            >
                              {r.idNasabah}
                            </td>

                            <td className={cn(td, "text-left text-slate-900")}>
                              {r.namaNasabah}
                            </td>

                            <td
                              className={cn(
                                td,
                                "text-left text-slate-900 tabular-nums whitespace-nowrap",
                              )}
                            >
                              {r.nominal}
                            </td>

                            <td
                              className={cn(
                                td,
                                "text-left text-slate-900 tabular-nums whitespace-nowrap",
                              )}
                            >
                              {r.sisaPinjaman}
                            </td>

                            <td
                              className={cn(
                                td,
                                "text-left text-slate-900 tabular-nums whitespace-nowrap",
                              )}
                            >
                              {r.bungaPerTahun}
                            </td>

                            <td className={cn(td, "text-left")}>
                              <div className="text-left">
                                <StatusBadge status={r.status} />
                              </div>
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
                  entri{" "}
                  <span className="text-slate-600">
                    (disaring dari {rows.length} entri keseluruhan)
                  </span>
                </div>

                <PaginationBar page={page} pageCount={pageCount} onPage={setPage} />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}