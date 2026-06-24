import * as React from "react";
import { Eye, Pencil, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import SavingsProductActionButton from "@/components/savings/products/SavingsProductActionButton";
import SavingsProductsPaginationBar from "@/components/savings/products/SavingsProductsPaginationBar";
import SavingsProductsTableHeaderLabel from "@/components/savings/products/SavingsProductsTableHeaderLabel";
import {
  SAVINGS_PRODUCT_INTEREST_TYPE_OPTIONS,
  SAVINGS_PRODUCT_PAGE_SIZE_OPTIONS,
  SAVINGS_PRODUCT_STATUS_OPTIONS,
  savingsProductRowsSeed,
  type SavingsProductStatus,
} from "@/components/savings/products/savings-product-list-utils";

export default function SavingsProductsListPage({
  title,
  subtitle = "Daftar",
}: {
  title: string;
  subtitle?: string;
}) {
  const rows = React.useMemo(() => savingsProductRowsSeed, []);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  const [qKode, setQKode] = React.useState("");
  const [qNama, setQNama] = React.useState("");
  const [jenisBunga, setJenisBunga] = React.useState<string>("Semua");
  const [qBunga, setQBunga] = React.useState("");
  const [qBerjangka, setQBerjangka] = React.useState<string>("Semua");
  const [status, setStatus] = React.useState<SavingsProductStatus>("Semua");

  const filtered = React.useMemo(() => {
    const kodeQ = qKode.trim().toLowerCase();
    const namaQ = qNama.trim().toLowerCase();
    const bungaQ = qBunga.trim().toLowerCase();

    return rows.filter((row) => {
      const okKode = kodeQ ? row.kode.toLowerCase().includes(kodeQ) : true;
      const okNama = namaQ ? row.namaProduk.toLowerCase().includes(namaQ) : true;
      const okJenis =
        jenisBunga === "Semua" ? true : row.jenisBunga === jenisBunga;
      const okBunga = bungaQ
        ? row.bungaTabungan.toLowerCase().includes(bungaQ)
        : true;
      const okBerjangka =
        qBerjangka === "Semua" ? true : row.tabunganBerjangka === qBerjangka;
      const okStatus = status === "Semua" ? true : row.status === status;

      return okKode && okNama && okJenis && okBunga && okBerjangka && okStatus;
    });
  }, [jenisBunga, qBerjangka, qBunga, qKode, qNama, rows, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, qKode, qNama, jenisBunga, qBunga, qBerjangka, status]);

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
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            {title}
          </h1>
          <div className="text-sm font-semibold text-slate-500">{subtitle}</div>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex items-center gap-2 pb-3 text-[13px] font-medium text-slate-800">
            <span>Tampilkan</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className={pageSizeTriggerCls}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                {SAVINGS_PRODUCT_PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>entri</span>
          </div>

          <div className="overflow-hidden bg-white">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[980px] border-collapse">
                <thead className="bg-white">
                  <tr className="border-b border-slate-300/70 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                    <th className={cn("w-[70px] whitespace-nowrap", th)}>
                      <SavingsProductsTableHeaderLabel sortable={false}>
                        No.
                      </SavingsProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[120px]", th)}>
                      <SavingsProductsTableHeaderLabel>
                        Kode
                      </SavingsProductsTableHeaderLabel>
                    </th>
                    <th className={cn("min-w-[260px]", th)}>
                      <SavingsProductsTableHeaderLabel>
                        Nama Produk
                      </SavingsProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[190px]", th)}>
                      <SavingsProductsTableHeaderLabel>
                        Jenis Bunga
                      </SavingsProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[170px]", th)}>
                      <SavingsProductsTableHeaderLabel>
                        Bunga Tabungan
                      </SavingsProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[170px]", th)}>
                      <SavingsProductsTableHeaderLabel>
                        Tabungan Berjangka
                      </SavingsProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[120px]", th)}>
                      <SavingsProductsTableHeaderLabel>
                        Status
                      </SavingsProductsTableHeaderLabel>
                    </th>
                    <th className={cn("w-[170px]", th)}>
                      <SavingsProductsTableHeaderLabel sortable={false}>
                        Aksi
                      </SavingsProductsTableHeaderLabel>
                    </th>
                  </tr>

                  <tr className="border-b border-slate-200 bg-white">
                    <th className={filterCell} />
                    <th className={filterCell}>
                      <Input
                        value={qKode}
                        onChange={(event) => setQKode(event.target.value)}
                        placeholder=""
                        className={filterInputCls}
                      />
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={qNama}
                        onChange={(event) => setQNama(event.target.value)}
                        placeholder=""
                        className={filterInputCls}
                      />
                    </th>
                    <th className={filterCell}>
                      <Select value={jenisBunga} onValueChange={setJenisBunga}>
                        <SelectTrigger className={filterSelectTriggerCls}>
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          {SAVINGS_PRODUCT_INTEREST_TYPE_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </th>
                    <th className={filterCell}>
                      <Input
                        value={qBunga}
                        onChange={(event) => setQBunga(event.target.value)}
                        placeholder="0%"
                        className={filterInputCls}
                      />
                    </th>
                    <th className={filterCell}>
                      <Select value={qBerjangka} onValueChange={setQBerjangka}>
                        <SelectTrigger className={filterSelectTriggerCls}>
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="Semua">Semua</SelectItem>
                          <SelectItem value="Ya">Ya</SelectItem>
                          <SelectItem value="Tidak">Tidak</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                    <th className={filterCell}>
                      <Select
                        value={status}
                        onValueChange={(value) =>
                          setStatus(value as SavingsProductStatus)
                        }
                      >
                        <SelectTrigger className={filterSelectTriggerCls}>
                          <SelectValue placeholder="Semua" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          {SAVINGS_PRODUCT_STATUS_OPTIONS.map((option) => (
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
                      <td
                        colSpan={8}
                        className="px-4 py-10 text-center text-sm text-slate-600"
                      >
                        Tidak ada data yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    paged.map((row, index) => (
                      <tr
                        key={row.id}
                        className={cn(
                          "border-b border-slate-200 text-[13px]",
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                        )}
                      >
                        <td className={cn(td, "text-slate-900 tabular-nums")}>
                          {(page - 1) * pageSize + index + 1}
                        </td>
                        <td className={cn(td, "font-medium text-slate-900")}>
                          {row.kode}
                        </td>
                        <td className={td}>
                          <div className="font-medium text-slate-900">
                            {row.namaProduk}
                          </div>
                        </td>
                        <td className={cn(td, "text-slate-900")}>
                          {row.jenisBunga}
                        </td>
                        <td className={cn(td, "text-slate-900 tabular-nums")}>
                          {row.bungaTabungan}
                        </td>
                        <td className={cn(td, "text-slate-900")}>
                          {row.tabunganBerjangka}
                        </td>
                        <td className={td}>
                          <Badge
                            className={cn(
                              "rounded-md px-2.5 py-1 text-[11px] font-bold leading-none text-white",
                              row.status === "Aktif"
                                ? "bg-emerald-600 hover:bg-emerald-600"
                                : "bg-rose-600 hover:bg-rose-600",
                            )}
                          >
                            {row.status}
                          </Badge>
                        </td>
                        <td className={td}>
                          <div className="flex items-center gap-1.5">
                            <SavingsProductActionButton
                              label="Lihat"
                              tone="slate"
                              onClick={() =>
                                toast("Lihat produk simpanan (prototype)", {
                                  description: row.namaProduk,
                                })
                              }
                            >
                              <Eye className="h-5 w-5" />
                            </SavingsProductActionButton>

                            <SavingsProductActionButton
                              label="Nonaktifkan"
                              tone="amber"
                              onClick={() =>
                                toast("Nonaktifkan (prototype)", {
                                  description: row.namaProduk,
                                })
                              }
                            >
                              <XCircle className="h-5 w-5" />
                            </SavingsProductActionButton>

                            <SavingsProductActionButton
                              label="Ubah"
                              tone="sky"
                              onClick={() =>
                                toast("Ubah produk simpanan (prototype)", {
                                  description: row.namaProduk,
                                })
                              }
                            >
                              <Pencil className="h-5 w-5" />
                            </SavingsProductActionButton>

                            <SavingsProductActionButton
                              label="Hapus"
                              tone="rose"
                              onClick={() =>
                                toast("Hapus (prototype)", {
                                  description: row.namaProduk,
                                })
                              }
                            >
                              <Trash2 className="h-5 w-5" />
                            </SavingsProductActionButton>
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
              Menampilkan {showingStart} sampai {showingEnd} dari{" "}
              {filtered.length} entri{" "}
              <span className="text-slate-600">
                (disaring dari {rows.length} entri keseluruhan)
              </span>
            </div>

            <SavingsProductsPaginationBar
              page={page}
              pageCount={pageCount}
              onPage={setPage}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}