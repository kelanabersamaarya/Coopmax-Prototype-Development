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
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Row = {
  no: number;
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
};

const seed: Row[] = [
  {
    no: 2,
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
    no: 1,
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

function IconCellButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200 transition hover:bg-white"
      aria-label="Detail transaksi"
      title="Detail transaksi"
    >
      <ExternalLink className="h-4 w-4" />
    </button>
  );
}

function DeleteCellButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-700 ring-1 ring-rose-200 transition hover:bg-white"
      aria-label="Hapus"
      title="Hapus"
    >
      <XCircle className="h-4 w-4" />
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
    // Prototype: filter hanya berdasarkan substring tanggal.
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[calc(100vw-2.5rem)]",
          "max-w-[1240px]",
          "max-h-[85vh]",
          "overflow-hidden",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          // pastikan X bawaan shadcn tidak muncul (biar X hanya satu)
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                Riwayat Transaksi
              </div>
              <div className="mt-0.5 text-xs font-semibold text-slate-500">
                Rekening: <span className="text-slate-700">{accountNo}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          {/* Body */}
          <div
            className="overflow-auto px-5 py-4 sm:px-6"
            style={{ maxHeight: "calc(85vh - 64px - 84px)" }}
          >
            <div className="grid gap-3">
              <div className="text-sm font-semibold text-slate-900">
                Tanggal Transaksi
              </div>

              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center">
                <div className="relative">
                  <Input
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                    placeholder="Tanggal awal"
                    className="h-11 rounded-2xl border-slate-200 bg-white pr-11"
                  />
                  {dateStart ? (
                    <button
                      type="button"
                      onClick={() => setDateStart("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-9 items-center justify-center rounded-xl bg-slate-700 text-white hover:bg-slate-800"
                      aria-label="Clear tanggal awal"
                      title="Clear"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>

                <div className="relative">
                  <Input
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                    placeholder="Tanggal akhir"
                    className="h-11 rounded-2xl border-slate-200 bg-white pr-11"
                  />
                  {dateEnd ? (
                    <button
                      type="button"
                      onClick={() => setDateEnd("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-9 items-center justify-center rounded-xl bg-slate-700 text-white hover:bg-slate-800"
                      aria-label="Clear tanggal akhir"
                      title="Clear"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>

                <Button
                  onClick={() =>
                    toast("Cari (prototype)", {
                      description:
                        "Filter diterapkan otomatis saat Anda mengetik.",
                    })
                  }
                  className="h-11 rounded-2xl bg-slate-700 px-6 text-white hover:bg-slate-800"
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
                  <SelectTrigger className="h-9 w-[96px] rounded-xl border-slate-200 bg-white">
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
                <div className="text-sm text-slate-700">entries</div>
              </div>

              <div className="mt-2 overflow-hidden rounded-2xl ring-1 ring-slate-200">
                <div className="safe-x-scroll bg-white">
                  <table className="w-full min-w-[1180px] border-collapse">
                    <thead className="bg-white">
                      <tr className="border-b border-slate-200 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-800">
                        <th className="w-[70px] px-4 py-3">No.</th>
                        <th className="w-[120px] px-4 py-3">Angsuran Ke-</th>
                        <th className="w-[140px] px-4 py-3">Tanggal</th>
                        <th className="min-w-[190px] px-4 py-3">
                          Tipe Transaksi
                        </th>
                        <th className="w-[140px] px-4 py-3 text-right">
                          Nominal
                        </th>
                        <th className="w-[150px] px-4 py-3 text-right">
                          Angsuran Pokok
                        </th>
                        <th className="w-[150px] px-4 py-3 text-right">
                          Angsuran Bunga
                        </th>
                        <th className="w-[130px] px-4 py-3 text-right">
                          Hutang Pokok
                        </th>
                        <th className="w-[130px] px-4 py-3 text-right">
                          Hutang Bunga
                        </th>
                        <th className="w-[110px] px-4 py-3 text-right">Denda</th>
                        <th className="w-[170px] px-4 py-3 text-right">
                          Sisa Pinjaman Akhir
                        </th>
                        <th className="min-w-[200px] px-4 py-3">Keterangan</th>
                        <th className="w-[140px] px-4 py-3 text-center">
                          Aksi
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
                        paged.map((r, idx) => (
                          <tr
                            key={`${r.no}-${idx}`}
                            className={cn(
                              "border-t border-slate-100 text-sm",
                              idx % 2 === 0 ? "bg-slate-50/70" : "bg-white",
                            )}
                          >
                            <td className="px-4 py-3 text-slate-700">{r.no}</td>
                            <td className="px-4 py-3 text-slate-700">
                              {r.angsuranKe}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              {r.tanggal}
                            </td>
                            <td className="px-4 py-3 text-slate-900">
                              <div className="leading-tight">{r.tipe}</div>
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                              {r.nominal}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                              {r.angsuranPokok}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                              {r.angsuranBunga}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                              {r.hutangPokok}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                              {r.hutangBunga}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                              {r.denda}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                              {r.sisaPinjamanAkhir}
                            </td>
                            <td className="px-4 py-3 text-slate-700">
                              <div className="max-w-[260px] leading-snug">
                                {r.keterangan}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-center gap-2">
                                <DeleteCellButton
                                  onClick={() =>
                                    toast("Hapus (prototype)", {
                                      description: `Transaksi #${r.no} belum terhubung ke data.`,
                                    })
                                  }
                                />
                                <IconCellButton
                                  onClick={() =>
                                    toast("Detail transaksi (prototype)", {
                                      description: `${r.tipe} • ${r.tanggal}`,
                                    })
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-700">
                  Showing {showingStart} to {showingEnd} of {filtered.length}{" "}
                  entries
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-10 rounded-xl border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>

                  <div className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-violet-600 px-4 text-sm font-extrabold text-white">
                    {page}
                  </div>

                  <Button
                    variant="outline"
                    className="h-10 rounded-xl border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
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

          {/* Footer */}
          <div className="px-5 py-4 sm:px-6">
            <div className="flex justify-end">
              <Button
                onClick={() => onOpenChange(false)}
                className="h-11 rounded-2xl bg-slate-600 px-6 text-white hover:bg-slate-700"
              >
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