"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

type Row = {
  angsuranKe: string;
  tanggal: string;
  tipe: string;
  nominal: string;
  angsuranPokok: string;
  angsuranBunga: string;
  hutangPokok: string;
  hutangBunga: string;
  denda: string;
  sisaPinjamanAkhir: string;
  keterangan: string;
  canceled?: boolean;
};

const seed: Row[] = [
  {
    angsuranKe: "",
    tanggal: "20-04-2026",
    tipe: "Pemutihan Pinjaman",
    nominal: "250.000",
    angsuranPokok: "166.667",
    angsuranBunga: "83.333",
    hutangPokok: "0",
    hutangBunga: "0",
    denda: "0",
    sisaPinjamanAkhir: "9.333.333",
    keterangan: "DIBATALKAN — Salah input nominal, transaksi diganti.",
    canceled: true,
  },
  {
    angsuranKe: "",
    tanggal: "17-04-2026",
    tipe: "Pembayaran Angsuran",
    nominal: "79.861",
    angsuranPokok: "0",
    angsuranBunga: "79.861",
    hutangPokok: "0",
    hutangBunga: "0",
    denda: "0",
    sisaPinjamanAkhir: "9.583.333",
    keterangan: "",
  },
  {
    angsuranKe: "",
    tanggal: "10-04-2026",
    tipe: "Pembayaran Angsuran",
    nominal: "500.000",
    angsuranPokok: "416.667",
    angsuranBunga: "83.333",
    hutangPokok: "0",
    hutangBunga: "0",
    denda: "0",
    sisaPinjamanAkhir: "9.583.333",
    keterangan: "transaksi pembayaran khusus",
  },
];

const R = "rounded-[5px]";
const H = "h-[30px]";

function DetailActionButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center",
        R,
        "bg-transparent text-slate-700",
        "ring-0 shadow-none border-0",
        "transition hover:bg-slate-900/5 hover:text-slate-900",
        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
      )}
      aria-label="Detail transaksi"
      title="Detail transaksi"
    >
      <ExternalLink className="h-5 w-5" />
    </button>
  );
}

export default function LoanTransactionHistoryDialog({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  accountNo: string;
}) {
  const navigate = useNavigate();
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    if (!open) return;
    setDateStart("");
    setDateEnd("");
    setPageSize(20);
    setPage(1);
  }, [open]);

  const filtered = React.useMemo(() => {
    const s = dateStart.trim();
    const e = dateEnd.trim();

    return seed.filter((r) => {
      const okStart = s ? r.tanggal.includes(s) : true;
      const okEnd = e ? r.tanggal.includes(e) : true;
      return okStart && okEnd;
    });
  }, [dateEnd, dateStart]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  React.useEffect(() => setPage(1), [pageSize, dateStart, dateEnd]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  const headerTh =
    "px-[5px] py-2.5 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-700";
  const tdBase = "px-[5px] py-2.5 text-[13px] font-normal text-slate-900";

  const selectTriggerCls = cn(
    H,
    "w-[96px] border-slate-200 bg-white",
    R,
    "shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const inputCls = cn(
    H,
    "border-slate-200 bg-white",
    R,
    "shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const btnCariCls = cn(
    H,
    "px-4",
    R,
    "bg-slate-700 text-white hover:bg-slate-800",
  );

  const btnTutupFooterCls = cn(
    H,
    "w-[80px] px-0",
    "bg-slate-600 text-white hover:bg-slate-700",
    R,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[calc(100vw-2.5rem)]",
          "max-w-[1240px]",
          "max-h-[85vh]",
          "overflow-hidden",
          R,
          "border-slate-200 p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                Riwayat Transaksi
              </div>
              <div className="sr-only">{accountNo}</div>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center",
                R,
                "text-slate-700 transition hover:bg-slate-100",
              )}
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          <div
            className="overflow-auto px-5 py-4 sm:px-6"
            style={{ maxHeight: "calc(85vh - 64px - 84px)" }}
          >
            <div className="grid gap-3">
              <div className="text-sm font-semibold text-slate-900">
                Tanggal Transaksi
              </div>

              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center">
                <Input
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  placeholder="Tanggal awal"
                  className={cn(inputCls)}
                />

                <Input
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  placeholder="Tanggal akhir"
                  className={cn(inputCls)}
                />

                <Button
                  onClick={() =>
                    toast("Cari (prototype)", {
                      description: "Filter diterapkan otomatis saat Anda mengetik.",
                    })
                  }
                  className={btnCariCls}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Cari
                </Button>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <div className="text-sm text-slate-700">Show</div>
                <Select
                  value={String(pageSize)}
                  onValueChange={(v) => setPageSize(Number(v))}
                >
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={cn("border-slate-200", R)}>
                    {[10, 20, 50, 100].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-sm text-slate-700">entries</div>
              </div>

              <div className={cn("mt-2 overflow-hidden ring-1 ring-slate-200", R)}>
                <div className="safe-x-scroll bg-white">
                  <table className="w-full min-w-[1220px] border-collapse">
                    <thead className="bg-white">
                      <tr className="border-b border-slate-200">
                        <th className={cn(headerTh, "w-[58px]")}>No.</th>

                        <th className={cn(headerTh, "w-[120px]")}>
                          Angsuran
                          <br />
                          Ke-
                        </th>

                        <th className={cn(headerTh, "w-[120px]")}>Tanggal</th>

                        <th className={cn(headerTh, "w-[170px]")}>
                          Tipe
                          <br />
                          Transaksi
                        </th>

                        <th className={cn(headerTh, "w-[140px]")}>Nominal</th>

                        <th className={cn(headerTh, "w-[150px]")}>
                          Angsuran
                          <br />
                          Pokok
                        </th>

                        <th className={cn(headerTh, "w-[150px]")}>
                          Angsuran
                          <br />
                          Bunga
                        </th>

                        <th className={cn(headerTh, "w-[140px]")}>
                          Hutang
                          <br />
                          Pokok
                        </th>

                        <th className={cn(headerTh, "w-[140px]")}>
                          Hutang
                          <br />
                          Bunga
                        </th>

                        <th className={cn(headerTh, "w-[110px]")}>Denda</th>

                        <th className={cn(headerTh, "w-[160px]")}>
                          Sisa Pinjaman
                          <br />
                          Akhir
                        </th>

                        <th className={cn(headerTh, "w-[180px]")}>Keterangan</th>

                        <th className={cn(headerTh, "w-[120px]")}>
                          Detail
                          <br />
                          Transaksi
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {paged.length === 0 ? (
                        <tr>
                          <td
                            colSpan={13}
                            className="px-4 py-10 text-center text-sm text-slate-600"
                          >
                            Tidak ada transaksi.
                          </td>
                        </tr>
                      ) : (
                        paged.map((r, idx) => {
                          const derivedNo = (page - 1) * pageSize + idx + 1;
                          const trxNo = `BA/${r.tanggal.replaceAll("-", "")}/${String(
                            derivedNo,
                          ).padStart(4, "0")}`;

                          return (
                            <tr
                              key={`${r.tanggal}-${derivedNo}`}
                              className={cn(
                                "border-t border-slate-100",
                                idx % 2 === 0 ? "bg-slate-50/70" : "bg-white",
                              )}
                            >
                              <td className={cn(tdBase, "text-slate-700 tabular-nums")}>
                                {derivedNo}
                              </td>

                              <td className={cn(tdBase, "text-slate-700 tabular-nums")}>
                                {r.angsuranKe || "-"}
                              </td>

                              <td
                                className={cn(
                                  tdBase,
                                  "text-slate-900 tabular-nums whitespace-nowrap",
                                )}
                              >
                                {r.tanggal}
                              </td>

                              <td className={cn(tdBase, "text-slate-900")}>
                                <div className="whitespace-normal leading-snug">
                                  {r.tipe}
                                </div>
                              </td>

                              <td
                                className={cn(
                                  tdBase,
                                  "text-right text-emerald-700 tabular-nums whitespace-nowrap",
                                )}
                              >
                                {r.nominal}
                              </td>

                              <td
                                className={cn(
                                  tdBase,
                                  "text-right text-emerald-700 tabular-nums whitespace-nowrap",
                                )}
                              >
                                {r.angsuranPokok}
                              </td>

                              <td
                                className={cn(
                                  tdBase,
                                  "text-right text-emerald-700 tabular-nums whitespace-nowrap",
                                )}
                              >
                                {r.angsuranBunga}
                              </td>

                              <td
                                className={cn(
                                  tdBase,
                                  "text-right text-emerald-700 tabular-nums whitespace-nowrap",
                                )}
                              >
                                {r.hutangPokok}
                              </td>

                              <td
                                className={cn(
                                  tdBase,
                                  "text-right text-emerald-700 tabular-nums whitespace-nowrap",
                                )}
                              >
                                {r.hutangBunga}
                              </td>

                              <td
                                className={cn(
                                  tdBase,
                                  "text-right text-emerald-700 tabular-nums whitespace-nowrap",
                                )}
                              >
                                {r.denda}
                              </td>

                              <td
                                className={cn(
                                  tdBase,
                                  "text-right text-emerald-700 tabular-nums whitespace-nowrap",
                                )}
                              >
                                {r.sisaPinjamanAkhir}
                              </td>

                              <td className={cn(tdBase, "text-slate-700")}>
                                <span className="text-slate-400">-</span>
                              </td>

                              <td className={cn(tdBase)}>
                                <div className="flex justify-start">
                                  <DetailActionButton
                                    onClick={() => {
                                      onOpenChange(false);
                                      navigate(
                                        `/loans/transactions/${encodeURIComponent(trxNo)}`,
                                      );
                                    }}
                                  />
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

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-700">
                  Showing {showingStart} to {showingEnd} of {filtered.length} entries
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50",
                      R,
                    )}
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>

                  <div
                    className={cn(
                      "inline-flex h-10 min-w-10 items-center justify-center bg-violet-600 px-4 text-sm font-extrabold text-white",
                      R,
                    )}
                  >
                    {page}
                  </div>

                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50",
                      R,
                    )}
                    disabled={page === pageCount}
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-5 py-4 sm:px-6">
            <div className="flex justify-end">
              <Button onClick={() => onOpenChange(false)} className={btnTutupFooterCls}>
                <X className="mr-2 h-4 w-4" />
                Tutup
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}