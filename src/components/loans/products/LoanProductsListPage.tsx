import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Plus, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";
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
import { getLoanProducts } from "@/lib/loanProductsStore";
import { cn } from "@/lib/utils";
import LoanProductActionButton from "@/components/loans/products/LoanProductActionButton";
import LoanProductsPaginationBar from "@/components/loans/products/LoanProductsPaginationBar";
import LoanProductsTableHeaderLabel from "@/components/loans/products/LoanProductsTableHeaderLabel";
import {
  deriveLoanProductCode,
  getLoanProductBillingLabel,
  LOAN_PRODUCT_METHOD_FILTER_OPTIONS,
  LOAN_PRODUCT_PAGE_SIZE_OPTIONS,
  LOAN_PRODUCT_STATUS_FILTER_OPTIONS,
  type StatusFilter,
} from "@/components/loans/products/loan-product-list-utils";

export type LoanProductsListVariant = "consolidation" | "branch";

type LoanProductsListPageProps = {
  variant: LoanProductsListVariant;
  title: string;
  subtitle?: string;
  showCreateButton?: boolean;
  createPath?: string;
  editPath: (id: string) => string;
  detailPath: (id: string) => string;
};

function cleanProductListTitle(title: string) {
  return title.replace(/\s+(Cabang|Konsolidasi)\b/gi, "").trim();
}

export default function LoanProductsListPage({
  variant,
  title,
  subtitle = "Daftar",
  showCreateButton = false,
  createPath,
  editPath,
  detailPath,
}: LoanProductsListPageProps) {
  const navigate = useNavigate();
  const products = React.useMemo(() => getLoanProducts(), []);
  const displayTitle = cleanProductListTitle(title);

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
      const code = deriveLoanProductCode(p).toLowerCase();
      const name = p.name.toLowerCase();
      const methodLabel = getLoanProductBillingLabel(p.billingScheme);

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
                {displayTitle}
              </h1>
              <div className="text-sm font-semibold text-slate-500">{subtitle}</div>
            </div>
          </div>

          {showCreateButton && createPath ? (
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800 hover:bg-slate-50"
            >
              <Link to={createPath}>
                <Plus className="mr-2 h-4 w-4" /> Tambah
              </Link>
            </Button>
          ) : null}
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex items-center gap-2 pb-3 text-[13px] font-medium text-slate-800">
            <span>Tampilkan</span>
            <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className={pageSizeTriggerCls}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                {LOAN_PRODUCT_PAGE_SIZE_OPTIONS.map((n) => (
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
                      <LoanProductsTableHeaderLabel sortable={false}>No.</LoanProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[120px]", th)}>
                      <LoanProductsTableHeaderLabel>Kode</LoanProductsTableHeaderLabel>
                    </th>
                    <th className={cn("min-w-[260px]", th)}>
                      <LoanProductsTableHeaderLabel>Pinjaman</LoanProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[210px]", th)}>
                      <LoanProductsTableHeaderLabel>
                        <span className="block">Metode</span>
                        <span className="block">Perhitungan</span>
                      </LoanProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[170px]", th)}>
                      <LoanProductsTableHeaderLabel>
                        <span className="block">Bunga per</span>
                        <span className="block">Tahun (%)</span>
                      </LoanProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[120px]", th)}>
                      <LoanProductsTableHeaderLabel>Status</LoanProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[170px]", th)}>
                      <LoanProductsTableHeaderLabel sortable={false}>Aksi</LoanProductsTableHeaderLabel>
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
                          {LOAN_PRODUCT_METHOD_FILTER_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
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
                      <Select value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
                        <SelectTrigger className={filterSelectTriggerCls}>
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          {LOAN_PRODUCT_STATUS_FILTER_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </th>
                    <th className={filterCell} />
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {paged.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-600">
                        Tidak ada data yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    paged.map((p, idx) => {
                      const no = (page - 1) * pageSize + idx + 1;
                      const code = deriveLoanProductCode(p);
                      const methodLabel = getLoanProductBillingLabel(p.billingScheme);

                      return (
                        <tr
                          key={p.id}
                          className={cn(
                            "border-b border-slate-200 text-[13px]",
                            idx % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                          )}
                        >
                          <td className={cn(td, "text-slate-900 tabular-nums")}>{no}</td>
                          <td className={cn(td, "font-medium text-slate-900")}>{code}</td>
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
                              <LoanProductActionButton
                                label="Lihat"
                                tone="slate"
                                onClick={() => navigate(detailPath(p.id))}
                              >
                                <Eye className="h-5 w-5" />
                              </LoanProductActionButton>

                              <LoanProductActionButton
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
                              </LoanProductActionButton>

                              <Link
                                to={editPath(p.id)}
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

                              <LoanProductActionButton
                                label="Hapus"
                                tone="rose"
                                onClick={() =>
                                  toast("Hapus (prototype)", {
                                    description: "Hapus belum diimplementasikan di scope ini.",
                                  })
                                }
                              >
                                <Trash2 className="h-5 w-5" />
                              </LoanProductActionButton>
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

            <LoanProductsPaginationBar page={page} pageCount={pageCount} onPage={setPage} />
          </div>
        </Card>

        <div className="sr-only">{variant}</div>
      </div>
    </div>
  );
}