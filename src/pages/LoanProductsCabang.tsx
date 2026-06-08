import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLoanProducts, LoanProduct } from "@/lib/loanProductsStore";
import { cn } from "@/lib/utils";
import {
  Eye,
  Pencil,
  Trash2,
  XCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

type StatusFilter = "Semua" | "Aktif" | "Nonaktif";

function deriveCode(p: LoanProduct) {
  if (p.id.startsWith("seed-")) return p.id === "seed-1" ? "100" : "99";
  return p.id.slice(0, 4).toUpperCase();
}

function billingLabel(scheme: LoanProduct["billingScheme"]) {
  if (scheme === "Anuitas") return "Bunga Efektif";
  if (scheme === "Menurun") return "Menurun";
  return "Bunga Flat";
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

function IconOnlyAction({
  label,
  tone = "slate",
  onClick,
  children,
}: {
  label: string;
  tone?: "slate" | "amber" | "sky" | "rose";
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const toneCls: Record<string, string> = {
    slate: "text-slate-600 hover:text-slate-900",
    amber: "text-amber-600 hover:text-amber-700",
    sky: "text-sky-600 hover:text-sky-700",
    rose: "text-rose-600 hover:text-rose-700",
  };

  const cls = cn(
    "inline-flex h-8 w-8 items-center justify-center",
    "rounded-full bg-transparent ring-0 shadow-none",
    "transition-colors",
    "hover:bg-slate-900/5",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
    toneCls[tone],
  );

  if (!onClick) {
    return (
      <span className={cls} aria-label={label} title={label}>
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

export default function LoanProductsCabang() {
  const navigate = useNavigate();
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

      const rowStatus: StatusFilter = "Aktif";
      const okStatus = status === "Semua" ? true : rowStatus === status;

      return okCode && okName && okMethod && okRate && okStatus;
    });
  }, [products, qCode, qName, method, rateMax, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, qCode, qName, method, rateMax, status]);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  const filterInputCls =
    "h-8 rounded-[6px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/20";
  const filterSelectTriggerCls =
    "h-8 rounded-[6px] border-slate-300 bg-white text-[13px] font-normal shadow-none focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20";

  const pageSizeTriggerCls =
    "h-7 w-[68px] rounded-[6px] border-slate-300 bg-white px-2 text-[12.5px] font-semibold text-slate-900 shadow-none";

  const th = "px-3 py-3";
  const filterCell = "px-3 py-1.5";
  const td = "px-3 py-2.5";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Produk Pinjaman Cabang
              </h1>
              <div className="text-sm font-semibold text-slate-500">Daftar</div>
            </div>
          </div>
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

          <div className="sr-only">
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

          <div className="overflow-hidden bg-white">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[980px] border-collapse">
                <thead className="bg-white">
                  <tr className="border-b border-slate-300/70 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                    <th className={cn("w-[70px] whitespace-nowrap", th)}>
                      <ThLabel sortable={false}>No.</ThLabel>
                    </th>
                    <th className={cn("w-[120px]", th)}>
                      <ThLabel>Kode</ThLabel>
                    </th>
                    <th className={cn("min-w-[260px]", th)}>
                      <ThLabel>Pinjaman</ThLabel>
                    </th>
                    <th className={cn("w-[210px]", th)}>
                      <ThLabel>
                        <span className="block">Metode</span>
                        <span className="block">Perhitungan</span>
                      </ThLabel>
                    </th>
                    <th className={cn("w-[170px]", th)}>
                      <ThLabel>
                        <span className="block">Bunga per</span>
                        <span className="block">Tahun (%)</span>
                      </ThLabel>
                    </th>
                    <th className={cn("w-[120px]", th)}>
                      <ThLabel>Status</ThLabel>
                    </th>
                    <th className={cn("w-[170px]", th)}>
                      <ThLabel sortable={false}>Aksi</ThLabel>
                    </th>
                  </tr>

                  <tr className="border-b border-slate-200 bg-white">
                    <th className={filterCell} />
                    <th className={filterCell}>
                      <Input
                        value={qCode}
                        onChange={(e) => setQCode(e.target.value)}
                        placeholder=""
                        className={filterInputCls}
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={qName}
                        onChange={(e) => setQName(e.target.value)}
                        placeholder=""
                        className={filterInputCls}
                      />
                    </th>
                    <th className={filterCell}>
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger className={filterSelectTriggerCls}>
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">Semua</SelectItem>
                          <SelectItem value="Bunga Efektif">Bunga Efektif</SelectItem>
                          <SelectItem value="Bunga Flat">Bunga Flat</SelectItem>
                          <SelectItem value="Menurun">Menurun</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={rateMax}
                        onChange={(e) => setRateMax(e.target.value)}
                        inputMode="decimal"
                        placeholder="0%"
                        className={filterInputCls}
                      />
                    </th>
                    <th className={filterCell}>
                      <Select
                        value={status}
                        onValueChange={(v) => setStatus(v as StatusFilter)}
                      >
                        <SelectTrigger className={filterSelectTriggerCls}>
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">Semua</SelectItem>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                    <th className={filterCell} />
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
                          className={cn(
                            "border-b border-slate-200 text-[13px]",
                            idx % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                          )}
                        >
                          <td className={cn(td, "text-slate-900 tabular-nums")}>
                            {no}
                          </td>

                          <td className={cn(td, "font-medium text-slate-900")}>
                            {code}
                          </td>

                          <td className={td}>
                            <div className="font-medium text-slate-900">{p.name}</div>
                          </td>

                          <td className={cn(td, "text-slate-900")}>{methodLabel}</td>

                          <td className={cn(td, "text-slate-900 tabular-nums")}>
                            {p.interestRateYearly.toFixed(2)}%
                          </td>

                          <td className={td}>
                            <Badge className="rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-bold leading-none text-white hover:bg-emerald-600">
                              Aktif
                            </Badge>
                          </td>

                          <td className={td}>
                            <div className="flex items-center gap-1.5">
                              <IconOnlyAction
                                label="Lihat"
                                tone="slate"
                                onClick={() => navigate(`/loan-products/${p.id}`)}
                              >
                                <Eye className="h-5 w-5" />
                              </IconOnlyAction>

                              <IconOnlyAction
                                label="Nonaktifkan"
                                tone="amber"
                                onClick={() =>
                                  toast("Nonaktifkan (prototype)", {
                                    description:
                                      "Status belum disimpan (store belum punya field status).",
                                  })
                                }
                              >
                                <XCircle className="h-5 w-5" />
                              </IconOnlyAction>

                              <Link
                                to={`/loan-products/${p.id}/edit?from=cabang`}
                                className={cn(
                                  "inline-flex h-8 w-8 items-center justify-center rounded-full",
                                  "bg-transparent ring-0 shadow-none",
                                  "transition-colors hover:bg-slate-900/5",
                                  "text-sky-600 hover:text-sky-700",
                                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
                                )}
                                aria-label="Edit"
                                title="Ubah"
                              >
                                <Pencil className="h-5 w-5" />
                              </Link>

                              <IconOnlyAction
                                label="Hapus"
                                tone="rose"
                                onClick={() =>
                                  toast("Hapus (prototype)", {
                                    description:
                                      "Hapus belum diimplementasikan di scope ini.",
                                  })
                                }
                              >
                                <Trash2 className="h-5 w-5" />
                              </IconOnlyAction>
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
            <div className="text-[14px] text-slate-900">
              Menampilkan {showingStart} sampai {showingEnd} dari {filtered.length} entri{" "}
              <span className="text-slate-600">
                (disaring dari {products.length} entri keseluruhan)
              </span>
            </div>

            <PaginationBar page={page} pageCount={pageCount} onPage={setPage} />
          </div>
        </Card>
      </div>
    </div>
  );
}