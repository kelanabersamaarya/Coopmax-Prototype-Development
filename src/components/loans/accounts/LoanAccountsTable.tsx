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
import type {
  LoanAccountRow,
  LoanAccountsFilterHandlers,
  LoanAccountsFilterState,
  StatusFilter,
} from "./loan-account-types";
import LoanAccountStatusBadge from "./LoanAccountStatusBadge";
import LoanAccountsPaginationBar from "./LoanAccountsPaginationBar";
import { ThLabel } from "./LoanAccountsTableHeader";

export default function LoanAccountsTable({
  rows,
  paged,
  filters,
  filterHandlers,
  productOptions,
  pageSize,
  page,
  pageCount,
  showingStart,
  showingEnd,
  filteredCount,
  onPageSizeChange,
  onPage,
  onSelectAccount,
}: {
  rows: LoanAccountRow[];
  paged: LoanAccountRow[];
  filters: LoanAccountsFilterState;
  filterHandlers: LoanAccountsFilterHandlers;
  productOptions: string[];
  pageSize: number;
  page: number;
  pageCount: number;
  showingStart: number;
  showingEnd: number;
  filteredCount: number;
  onPageSizeChange: (value: number) => void;
  onPage: (page: number) => void;
  onSelectAccount: (accountNo: string) => void;
}) {
  const th = "px-1.5 py-2";
  const filterCell = "px-1.5 py-1";
  const td = "px-1.5 py-1.5";

  const filterInputCls =
    "h-7 rounded-[6px] border-slate-300 bg-white text-[12.5px] font-normal shadow-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/20";
  const filterSelectTriggerCls =
    "h-7 rounded-[6px] border-slate-300 bg-white text-[12.5px] shadow-none focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20";

  const pageSizeTriggerCls =
    "h-7 w-[68px] rounded-[6px] border-slate-300 bg-white px-2 text-[12.5px] font-semibold text-slate-900 shadow-none";

  const noColW = "w-[40px] min-w-[40px] max-w-[40px]";
  const tanggalDaftarColW = "w-[100px] min-w-[100px] max-w-[100px]";
  const idNasabahColW = "w-[120px] min-w-[120px] max-w-[120px]";
  const bungaColW = "w-[100px] min-w-[100px] max-w-[100px]";

  return (
    <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
      <div className="flex items-center gap-2 pb-3 text-[13px] font-medium text-slate-800">
        <span>Tampilkan</span>
        <Select value={String(pageSize)} onValueChange={(v) => onPageSizeChange(Number(v))}>
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
          <table className="w-full min-w-[1020px] border-collapse">
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

                <th className={cn(idNasabahColW, th)}>
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

                <th className={cn(bungaColW, th)}>
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
                    value={filters.qNoRek}
                    onChange={(e) => filterHandlers.setQNoRek(e.target.value)}
                    className={filterInputCls}
                    placeholder=""
                  />
                </th>
                <th className={cn(tanggalDaftarColW, filterCell)}>
                  <Input
                    value={filters.qTanggal}
                    onChange={(e) => filterHandlers.setQTanggal(e.target.value)}
                    className={filterInputCls}
                    placeholder=""
                  />
                </th>
                <th className={filterCell}>
                  <Select value={filters.qProduk} onValueChange={filterHandlers.setQProduk}>
                    <SelectTrigger className={cn(filterSelectTriggerCls, "font-normal")}>
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
                <th className={cn(idNasabahColW, filterCell)}>
                  <Input
                    value={filters.qIdNasabah}
                    onChange={(e) => filterHandlers.setQIdNasabah(e.target.value)}
                    className={filterInputCls}
                    placeholder=""
                  />
                </th>
                <th className={filterCell}>
                  <Input
                    value={filters.qNamaNasabah}
                    onChange={(e) => filterHandlers.setQNamaNasabah(e.target.value)}
                    className={filterInputCls}
                    placeholder=""
                  />
                </th>
                <th className={cn(filterCell, "text-right")}>
                  <Input
                    value={filters.qNominal}
                    onChange={(e) => filterHandlers.setQNominal(e.target.value)}
                    className={cn(filterInputCls, "text-right tabular-nums")}
                    placeholder="0,00"
                    inputMode="decimal"
                  />
                </th>
                <th className={cn(filterCell, "text-right")}>
                  <Input
                    value={filters.qSisa}
                    onChange={(e) => filterHandlers.setQSisa(e.target.value)}
                    className={cn(filterInputCls, "text-right tabular-nums")}
                    placeholder="0,00"
                    inputMode="decimal"
                  />
                </th>
                <th className={cn(bungaColW, filterCell)}>
                  <Input
                    value={filters.qBunga}
                    onChange={(e) => filterHandlers.setQBunga(e.target.value)}
                    className={filterInputCls}
                    placeholder=""
                    inputMode="decimal"
                  />
                </th>
                <th className={filterCell}>
                  <Select
                    value={filters.qStatus}
                    onValueChange={(v) => filterHandlers.setQStatus(v as StatusFilter)}
                  >
                    <SelectTrigger className={cn(filterSelectTriggerCls, "font-normal")}>
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
                  <td colSpan={10} className="px-4 py-10 text-center text-sm text-slate-600">
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
                    <td className={cn(td, noColW, "text-left text-slate-900 tabular-nums")}>
                      {(page - 1) * pageSize + idx + 1}
                    </td>

                    <td className={cn(td, "text-left")}>
                      <button
                        type="button"
                        onClick={() => onSelectAccount(r.noRekening)}
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
                        idNasabahColW,
                        "text-left text-slate-900 tabular-nums whitespace-nowrap",
                      )}
                    >
                      {r.idNasabah}
                    </td>

                    <td className={cn(td, "text-left text-slate-900")}>
                      {r.namaNasabah}
                    </td>

                    <td className={cn(td, "text-right text-slate-900 tabular-nums whitespace-nowrap")}>
                      {r.nominal}
                    </td>

                    <td className={cn(td, "text-right text-slate-900 tabular-nums whitespace-nowrap")}>
                      {r.sisaPinjaman}
                    </td>

                    <td
                      className={cn(
                        td,
                        bungaColW,
                        "text-left text-slate-900 tabular-nums whitespace-nowrap",
                      )}
                    >
                      {r.bungaPerTahun}
                    </td>

                    <td className={cn(td, "text-left")}>
                      <div className="text-left">
                        <LoanAccountStatusBadge status={r.status} />
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
          Menampilkan {showingStart} sampai {showingEnd} dari {filteredCount} entri{" "}
          <span className="text-slate-600">
            (disaring dari {rows.length} entri keseluruhan)
          </span>
        </div>

        <LoanAccountsPaginationBar page={page} pageCount={pageCount} onPage={onPage} />
      </div>
    </Card>
  );
}
