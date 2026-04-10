import { Link } from "react-router-dom";
import * as React from "react";
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
import { getLoanProducts, LoanProduct } from "@/lib/loanProductsStore";
import { cn } from "@/lib/utils";
import { Eye, Pencil, Plus, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";

type StatusFilter = "Semua" | "Aktif" | "Nonaktif";

function deriveCode(p: LoanProduct) {
  if (p.id.startsWith("seed-")) return p.id === "seed-1" ? "100" : "99";
  // Ambil 4 karakter pertama id sebagai pseudo-kode, dibuat uppercase agar mirip kode
  return p.id.slice(0, 4).toUpperCase();
}

function billingLabel(scheme: LoanProduct["billingScheme"]) {
  // Menyesuaikan istilah di referensi (kurang-lebih)
  if (scheme === "Anuitas") return "Bunga Efektif";
  if (scheme === "Menurun") return "Menurun";
  return "Bunga Flat";
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

  const showAround = 2;
  const first = 1;
  const last = pageCount;

  push(first);

  const left = Math.max(first + 1, page - showAround);
  const right = Math.min(last - 1, page + showAround);

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

export default function LoanProducts() {
  const products = React.useMemo(() => getLoanProducts(), []);

  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  const [qCode, setQCode] = React.useState("");
  const [qName, setQName] = React.useState("");
  const [method, setMethod] = React.useState<string>("Semua");
  const [rateMax, setRateMax] = React.useState<string>("");
  const [status, setStatus] = React.useState<StatusFilter>("Semua");

  const filtered = React.useMemo(() => {
    const codeQ = qCode.trim().toLowerCase();
    const nameQ = qName.trim().toLowerCase();
    const methodQ = method;
    const maxRate = rateMax.trim() === "" ? null : Number(rateMax);

    return products.filter((p) => {
      const code = deriveCode(p).toLowerCase();
      const name = p.name.toLowerCase();
      const methodLabel = billingLabel(p.billingScheme);

      const okCode = codeQ ? code.includes(codeQ) : true;
      const okName = nameQ ? name.includes(nameQ) : true;
      const okMethod = methodQ === "Semua" ? true : methodLabel === methodQ;

      const okRate =
        maxRate === null || Number.isNaN(maxRate)
          ? true
          : p.interestRateYearly <= maxRate;

      // Prototype: semua dianggap Aktif (karena store belum punya field status)
      const rowStatus: StatusFilter = "Aktif";
      const okStatus = status === "Semua" ? true : rowStatus === status;

      return okCode && okName && okMethod && okRate && okStatus;
    });
  }, [products, qCode, qName, method, rateMax, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, qCode, qName, method, rateMax, status]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Produk Pinjaman
              </h1>
              <div className="text-sm font-semibold text-slate-500">Daftar</div>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Kelola katalog produk pinjaman. Tampilan daftar meniru tabel
              referensi (filter & pagination sederhana).
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800 hover:bg-slate-50"
          >
            <Link to="/loan-products/new">
              <Plus className="mr-2 h-4 w-4" /> Tambah
            </Link>
          </Button>
        </div>

        <Separator className="my-6 bg-slate-200/70" />

        <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-slate-600">Tampilkan</Label>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => setPageSize(Number(v))}
              >
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
                onClick={() => {
                  setQCode("");
                  setQName("");
                  setMethod("Semua");
                  setRateMax("");
                  setStatus("Semua");
                  toast("Filter direset", {
                    description: "Semua filter kembali ke default.",
                  });
                }}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <div className="overflow-auto">
              <table className="w-full min-w-[980px] border-collapse">
                <thead className="bg-slate-50">
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                    <th className="w-[70px] px-4 py-3">No.</th>
                    <th className="w-[120px] px-4 py-3">Kode</th>
                    <th className="min-w-[260px] px-4 py-3">Pinjaman</th>
                    <th className="w-[210px] px-4 py-3">Metode Perhitungan</th>
                    <th className="w-[170px] px-4 py-3">Bunga per Tahun (%)</th>
                    <th className="w-[120px] px-4 py-3">Status</th>
                    <th className="w-[170px] px-4 py-3">Aksi</th>
                  </tr>
                  <tr className="border-t border-slate-200 bg-white">
                    <th className="px-4 py-2" />
                    <th className="px-4 py-2">
                      <Input
                        value={qCode}
                        onChange={(e) => setQCode(e.target.value)}
                        placeholder=""
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Input
                        value={qName}
                        onChange={(e) => setQName(e.target.value)}
                        placeholder=""
                        className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                      />
                    </th>
                    <th className="px-4 py-2">
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger className="h-9 rounded-xl border-slate-200 bg-white text-sm">
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">Semua</SelectItem>
                          <SelectItem value="Bunga Efektif">
                            Bunga Efektif
                          </SelectItem>
                          <SelectItem value="Bunga Flat">Bunga Flat</SelectItem>
                          <SelectItem value="Menurun">Menurun</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                    <th className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Input
                          value={rateMax}
                          onChange={(e) => setRateMax(e.target.value)}
                          inputMode="decimal"
                          placeholder="0%"
                          className="h-9 rounded-xl border-slate-200 bg-white text-sm"
                        />
                      </div>
                    </th>
                    <th className="px-4 py-2">
                      <Select
                        value={status}
                        onValueChange={(v) => setStatus(v as StatusFilter)}
                      >
                        <SelectTrigger className="h-9 rounded-xl border-slate-200 bg-white text-sm">
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">Semua</SelectItem>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {paged.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-sm text-slate-600"
                      >
                        Tidak ada data yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    paged.map((p, idx) => {
                      const no = (page - 1) * pageSize + idx + 1;
                      const code = deriveCode(p);
                      const methodLabel = billingLabel(p.billingScheme);
                      return (
                        <tr
                          key={p.id}
                          className="border-t border-slate-100 text-sm text-slate-800"
                        >
                          <td className="px-4 py-3 text-slate-700">{no}</td>
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {code}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-slate-900">
                              {p.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-700">
                            {methodLabel}
                          </td>
                          <td className="px-4 py-3 text-slate-700">
                            {p.interestRateYearly.toFixed(2)}%
                          </td>
                          <td className="px-4 py-3">
                            <Badge className="rounded-full bg-emerald-500 px-3 text-white hover:bg-emerald-500">
                              Aktif
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-white"
                                onClick={() =>
                                  toast("Lihat (prototype)", {
                                    description: `Produk: ${p.name}`,
                                  })
                                }
                                aria-label="Lihat"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-200 hover:bg-white"
                                onClick={() =>
                                  toast("Nonaktifkan (prototype)", {
                                    description:
                                      "Status belum disimpan (store belum punya field status).",
                                  })
                                }
                                aria-label="Nonaktifkan"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-200 hover:bg-white"
                                onClick={() =>
                                  toast("Edit (prototype)", {
                                    description:
                                      "Edit belum diimplementasikan di scope ini.",
                                  })
                                }
                                aria-label="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-700 ring-1 ring-rose-200 hover:bg-white"
                                onClick={() =>
                                  toast("Hapus (prototype)", {
                                    description:
                                      "Hapus belum diimplementasikan di scope ini.",
                                  })
                                }
                                aria-label="Hapus"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
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
              Menampilkan {showingStart} sampai {showingEnd} dari{" "}
              {filtered.length} entri
            </div>

            <Pagination page={page} pageCount={pageCount} onPage={setPage} />
          </div>
        </Card>
      </div>
    </div>
  );
}