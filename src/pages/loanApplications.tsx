import * as React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

type Status = "Semua" | "Diajukan" | "Disetujui" | "Ditolak";

type Row = {
  id: string;
  noRekening: string;
  tanggalDaftar: string; // dd-mm-yyyy
  produkPinjaman: string;
  idNasabah: string;
  namaNasabah: string;
  nominal: number;
  bungaPerTahun: number;
  status: Exclude<Status, "Semua">;
};

const seedRows: Row[] = [
  {
    id: "row-1",
    noRekening: "PB260002",
    tanggalDaftar: "01-04-2026",
    produkPinjaman: "Pinjaman Billing",
    idNasabah: "NT002766",
    namaNasabah: "Pia Permata S.Gz",
    nominal: 50_000_000,
    bungaPerTahun: 10.0,
    status: "Disetujui",
  },
  {
    id: "row-2",
    noRekening: "7260139",
    tanggalDaftar: "16-03-2026",
    produkPinjaman: "Pinjaman Koperasi",
    idNasabah: "NT002764",
    namaNasabah: "Jessica Yuniar",
    nominal: 10_000_000,
    bungaPerTahun: 24.0,
    status: "Disetujui",
  },
  {
    id: "row-3",
    noRekening: "7260127",
    tanggalDaftar: "03-02-2026",
    produkPinjaman: "Pinjaman Koperasi",
    idNasabah: "A001363",
    namaNasabah: "Aurora Ciaobella Rahimah S.Kom",
    nominal: 400_000_000,
    bungaPerTahun: 14.4,
    status: "Diajukan",
  },
  {
    id: "row-4",
    noRekening: "7260121",
    tanggalDaftar: "29-01-2026",
    produkPinjaman: "Pinjaman Koperasi",
    idNasabah: "A001310",
    namaNasabah: "Kacung Manullang",
    nominal: 213_000_000,
    bungaPerTahun: 18.0,
    status: "Disetujui",
  },
  {
    id: "row-5",
    noRekening: "7260108",
    tanggalDaftar: "26-01-2026",
    produkPinjaman: "Pinjaman Koperasi",
    idNasabah: "A003274",
    namaNasabah: "Laila Widiastuti S.T.",
    nominal: 2_560_000,
    bungaPerTahun: 21.6,
    status: "Disetujui",
  },
  {
    id: "row-6",
    noRekening: "7260104",
    tanggalDaftar: "26-01-2026",
    produkPinjaman: "Pinjaman Koperasi",
    idNasabah: "A001388",
    namaNasabah: "Hasna Mulyani",
    nominal: 300_000_000,
    bungaPerTahun: 18.0,
    status: "Diajukan",
  },
  {
    id: "row-7",
    noRekening: "7260073",
    tanggalDaftar: "19-01-2026",
    produkPinjaman: "Pinjaman Koperasi",
    idNasabah: "A005268",
    namaNasabah: "Mala Halimah",
    nominal: 10_000_000,
    bungaPerTahun: 21.6,
    status: "Ditolak",
  },
  {
    id: "row-8",
    noRekening: "7260067",
    tanggalDaftar: "14-01-2026",
    produkPinjaman: "Pinjaman Koperasi",
    idNasabah: "A005255",
    namaNasabah: "Luwes Hutagalung M.M.",
    nominal: 368_000_000,
    bungaPerTahun: 18.0,
    status: "Diajukan",
  },
];

function formatIdrLike(n: number) {
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
}
function formatRate(n: number) {
  return n.toFixed(2).replace(".", ",");
}

function statusBadgeClass(status: Exclude<Status, "Semua">) {
  if (status === "Disetujui") return "bg-emerald-600 hover:bg-emerald-600";
  if (status === "Diajukan") return "bg-lime-600 hover:bg-lime-600";
  return "bg-rose-600 hover:bg-rose-600";
}

function statusLabel(status: Exclude<Status, "Semua">) {
  if (status === "Ditolak") return "Nonaktif / Ditolak";
  return status;
}

function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  if (pageCount <= 1) return null;

  const items: Array<number | "ellipsis"> = [];
  const push = (v: number | "ellipsis") => items.push(v);

  const first = 1;
  const last = pageCount;

  push(first);

  const around = 2;
  const left = Math.max(first + 1, page - around);
  const right = Math.min(last - 1, page + around);

  if (left > first + 1) push("ellipsis");
  for (let i = left; i <= right; i++) push(i);
  if (right < last - 1) push("ellipsis");

  if (last !== first) push(last);

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        className="h-9 rounded-xl border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
        disabled={page === 1}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </Button>

      <div className="flex items-center gap-1">
        {items.map((it, idx) => {
          if (it === "ellipsis") {
            return (
              <div
                key={`e-${idx}`}
                className="px-2 text-sm font-semibold text-slate-400"
              >
                …
              </div>
            );
          }

          const active = it === page;
          return (
            <button
              key={it}
              type="button"
              onClick={() => onPage(it)}
              className={cn(
                "h-9 w-9 rounded-xl text-sm font-semibold ring-1 transition",
                active
                  ? "bg-[hsl(var(--app-accent))] text-white ring-[hsl(var(--app-accent))]"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
              )}
            >
              {it}
            </button>
          );
        })}
      </div>

      <Button
        variant="outline"
        className="h-9 rounded-xl border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
        disabled={page === pageCount}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </Button>
    </div>
  );
}

export default function LoanApplications() {
  const rows = React.useMemo(() => seedRows, []);

  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  const [qNoRekening, setQNoRekening] = React.useState("");
  const [qTanggal, setQTanggal] = React.useState("");
  const [qProduk, setQProduk] = React.useState<string>("Semua");
  const [qIdNasabah, setQIdNasabah] = React.useState("");
  const [qNama, setQNama] = React.useState("");
  const [qNominal, setQNominal] = React.useState<string>("0,00");
  const [qBunga, setQBunga] = React.useState("");
  const [qStatus, setQStatus] = React.useState<Status>("Semua");

  const filtered = React.useMemo(() => {
    const noQ = qNoRekening.trim().toLowerCase();
    const tanggalQ = qTanggal.trim().toLowerCase();
    const idQ = qIdNasabah.trim().toLowerCase();
    const namaQ = qNama.trim().toLowerCase();

    const nominalMax =
      qNominal.trim() === "" ? null : Number(qNominal.replace(/[^\d]/g, ""));
    const bungaMax =
      qBunga.trim() === ""
        ? null
        : Number(qBunga.replace(",", ".").replace(/[^\d.]/g, ""));

    return rows.filter((r) => {
      const okNo = noQ ? r.noRekening.toLowerCase().includes(noQ) : true;
      const okTanggal = tanggalQ
        ? r.tanggalDaftar.toLowerCase().includes(tanggalQ)
        : true;
      const okProduk = qProduk === "Semua" ? true : r.produkPinjaman === qProduk;
      const okId = idQ ? r.idNasabah.toLowerCase().includes(idQ) : true;
      const okNama = namaQ ? r.namaNasabah.toLowerCase().includes(namaQ) : true;

      const okNominal =
        nominalMax === null || Number.isNaN(nominalMax)
          ? true
          : r.nominal <= nominalMax;

      const okBunga =
        bungaMax === null || Number.isNaN(bungaMax)
          ? true
          : r.bungaPerTahun <= bungaMax;

      const okStatus = qStatus === "Semua" ? true : r.status === qStatus;

      return okNo && okTanggal && okProduk && okId && okNama && okNominal && okBunga && okStatus;
    });
  }, [rows, qNoRekening, qTanggal, qProduk, qIdNasabah, qNama, qNominal, qBunga, qStatus]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, qNoRekening, qTanggal, qProduk, qIdNasabah, qNama, qNominal, qBunga, qStatus]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const totalEntries = 495; // mengikuti referensi
  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  const produkOptions = React.useMemo(() => {
    const set = new Set(rows.map((r) => r.produkPinjaman));
    return ["Semua", ...Array.from(set)];
  }, [rows]);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Pengajuan Pinjaman
              </h1>
              <div className="text-sm font-semibold text-slate-500">Daftar</div>
            </div>
          </div>

          <Button
            variant="outline"
            className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800 hover:bg-slate-50"
            asChild
          >
            <Link to="/loans/applications/new">
              <Plus className="mr-2 h-4 w-4" /> Tambah
            </Link>
          </Button>
        </div>

        <Separator className="my-6 bg-slate-200/70" />

        <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-slate-600">Tampilkan</Label>
              <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
                <SelectTrigger className="h-9 w-[90px] rounded-xl border-slate-200 bg-white">
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
              <div className="text-xs text-slate-600">Entri</div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-9 rounded-xl border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
                asChild
              >
                <Link to="/loan-products">Produk Pinjaman</Link>
              </Button>

              <Button
                variant="outline"
                className="h-9 rounded-xl border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
                onClick={() =>
                  toast("Filter (prototype)", {
                    description: "Filter lanjutan belum diaktifkan.",
                  })
                }
              >
                Filter
              </Button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <div className="overflow-auto">
              <table className="w-full min-w-[980px] border-collapse">
                <thead className="bg-white">
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                    <th className="w-[70px] px-4 py-3">No.</th>
                    <th className="w-[140px] px-4 py-3">No. Rekening</th>
                    <th className="w-[160px] px-4 py-3">Tanggal Daftar</th>
                    <th className="min-w-[220px] px-4 py-3">Produk Pinjaman</th>
                    <th className="w-[140px] px-4 py-3">ID. Nasabah</th>
                    <th className="min-w-[220px] px-4 py-3">Nama Nasabah</th>
                    <th className="w-[170px] px-4 py-3">Nominal</th>
                    <th className="w-[150px] px-4 py-3">Bunga per Tahun (%)</th>
                    <th className="w-[140px] px-4 py-3">Status</th>
                  </tr>

                  <tr className="border-t border-slate-200 bg-white">
                    <th className="px-4 py-2" />
                    <th className="px-4 py-2">
                      <Input
                        value={qNoRekening}
                        onChange={(e) => setQNoRekening(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Input
                        value={qTanggal}
                        onChange={(e) => setQTanggal(e.target.value)}
                        placeholder=""
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Select value={qProduk} onValueChange={setQProduk}>
                        <SelectTrigger className="h-9 rounded-xl border-slate-200 bg-white text-sm">
                          <SelectValue placeholder="-- Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          {produkOptions.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p === "Semua" ? "-- Semua" : p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </th>
                    <th className="px-4 py-2">
                      <Input
                        value={qIdNasabah}
                        onChange={(e) => setQIdNasabah(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Input
                        value={qNama}
                        onChange={(e) => setQNama(e.target.value)}
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Input
                        value={qNominal}
                        onChange={(e) => setQNominal(e.target.value)}
                        inputMode="decimal"
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm text-right"
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Input
                        value={qBunga}
                        onChange={(e) => setQBunga(e.target.value)}
                        inputMode="decimal"
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Select value={qStatus} onValueChange={(v) => setQStatus(v as Status)}>
                        <SelectTrigger className="h-9 rounded-xl border-slate-200 bg-white text-sm">
                          <SelectValue placeholder="-- Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">-- Semua --</SelectItem>
                          <SelectItem value="Diajukan">Diajukan</SelectItem>
                          <SelectItem value="Disetujui">Disetujui</SelectItem>
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
                        colSpan={9}
                        className="px-4 py-10 text-center text-sm text-slate-600"
                      >
                        Tidak ada data yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    paged.map((r, idx) => {
                      const no = (page - 1) * pageSize + idx + 1;
                      return (
                        <tr
                          key={r.id}
                          className={cn(
                            "border-t text-sm text-slate-800",
                            idx % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                          )}
                        >
                          <td className="px-4 py-3 text-slate-700">{no}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              className="font-semibold text-blue-600 hover:underline"
                              onClick={() =>
                                toast("Detail pengajuan (prototype)", {
                                  description: `No Rekening: ${r.noRekening}`,
                                })
                              }
                            >
                              {r.noRekening}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-slate-700">
                            {r.tanggalDaftar}
                          </td>
                          <td className="px-4 py-3 text-slate-800">
                            {r.produkPinjaman}
                          </td>
                          <td className="px-4 py-3 text-slate-700">{r.idNasabah}</td>
                          <td className="px-4 py-3 text-slate-900">
                            {r.namaNasabah}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-700">
                            {formatIdrLike(r.nominal)}
                          </td>
                          <td className="px-4 py-3 text-slate-700">
                            {formatRate(r.bungaPerTahun)}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={cn(
                                "rounded-md px-3 py-1 text-white",
                                statusBadgeClass(r.status),
                              )}
                            >
                              {statusLabel(r.status)}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-xs text-slate-600">
              Menampilkan {showingStart} sampai {showingEnd} dari {totalEntries} entri
            </div>

            <Pagination page={page} pageCount={pageCount} onPage={setPage} />
          </div>
        </Card>
      </div>
    </div>
  );
}