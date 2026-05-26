"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LoanAccountRow = {
  noRekening: string;
  tanggalDaftar: string; // dd-mm-yyyy
  produkPinjaman: string;
  idNasabah: string;
  namaNasabah: string;
  nominal: string;
  sisaPinjaman: string;
  bungaPerTahun: string;
};

const seed5: LoanAccountRow[] = [
  {
    noRekening: "12260006",
    tanggalDaftar: "30-04-2026",
    produkPinjaman: "Pinjaman Bulanan",
    idNasabah: "N2400029",
    namaNasabah: "Pangeran Sirait",
    nominal: "2.000.000,00",
    sisaPinjaman: "1.040.000,00",
    bungaPerTahun: "24.00",
  },
  {
    noRekening: "12260002",
    tanggalDaftar: "26-04-2026",
    produkPinjaman: "Pinjaman Bulanan",
    idNasabah: "N2500010",
    namaNasabah: "gaby",
    nominal: "2.000.000,00",
    sisaPinjaman: "1.833.300,00",
    bungaPerTahun: "30.00",
  },
  {
    noRekening: "12260001",
    tanggalDaftar: "23-04-2026",
    produkPinjaman: "Pinjaman Bulanan",
    idNasabah: "A100001",
    namaNasabah: "Rika Wastuti",
    nominal: "18.000.000,00",
    sisaPinjaman: "17.360.000,00",
    bungaPerTahun: "24.00",
  },
  {
    noRekening: "210260001",
    tanggalDaftar: "23-04-2026",
    produkPinjaman: "Pinjaman RC",
    idNasabah: "A2600005",
    namaNasabah: "Jenan Aditama",
    nominal: "700.000.000,00",
    sisaPinjaman: "1.000.000.000,00",
    bungaPerTahun: "18.00",
  },
  {
    noRekening: "072260001",
    tanggalDaftar: "31-03-2026",
    produkPinjaman: "Pinjaman Harian",
    idNasabah: "A100001",
    namaNasabah: "Rika Wastuti",
    nominal: "22.000.000,00",
    sisaPinjaman: "22.000.000,00",
    bungaPerTahun: "20.00",
  },
];

// Tambah seed supaya bisa pilih banyak rekening (prototype)
const seed: LoanAccountRow[] = [
  ...seed5,
  ...Array.from({ length: 20 }).map((_, i) => {
    const n = i + 1;
    const noRekening = `1226${String(10 + n).padStart(4, "0")}`;
    const namaNasabah =
      n % 5 === 0
        ? "Komang Dewa"
        : n % 5 === 1
          ? "Nyoman Ariana"
          : n % 5 === 2
            ? "Gaby"
            : n % 5 === 3
              ? "Rika Wastuti"
              : "Pangeran Sirait";

    return {
      noRekening,
      tanggalDaftar: "30-04-2026",
      produkPinjaman: n % 3 === 0 ? "Pinjaman Billing" : "Pinjaman Bulanan",
      idNasabah: `N26${String(1000 + n).padStart(4, "0")}`,
      namaNasabah,
      nominal: `${(2_000_000 + n * 150_000).toLocaleString("id-ID")},00`,
      sisaPinjaman: `${(1_500_000 + n * 120_000).toLocaleString("id-ID")},00`,
      bungaPerTahun: n % 2 === 0 ? "24.00" : "18.00",
    };
  }),
];

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
    <div className={cn("flex items-start justify-between gap-2", className)}>
      <div className="leading-[1.05]">{children}</div>
      {sortable ? (
        <span className="mt-[1px] inline-flex flex-col leading-none text-black">
          <ChevronUp className="-mb-0.5 h-3.5 w-3.5" />
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </div>
  );
}

const R = "rounded-[5px]";

export default function LoanAccountPickerDialog({
  open,
  onOpenChange,
  query,
  onPick,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  query: string;
  onPick: (accountNo: string) => void;
}) {
  const [q, setQ] = React.useState(query);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(1);

  React.useEffect(() => {
    if (!open) return;
    // IMPORTANT: selalu reset filter saat modal dibuka,
    // supaya popup kedua dan seterusnya tetap menampilkan jumlah data yang sama.
    setQ("");
    setPageSize(20);
    setPage(1);
  }, [open]);

  const filtered = React.useMemo(() => {
    const s = (q ?? "").trim().toLowerCase();
    if (!s) return seed;
    return seed.filter((r) => {
      return (
        r.noRekening.toLowerCase().includes(s) ||
        r.namaNasabah.toLowerCase().includes(s) ||
        r.idNasabah.toLowerCase().includes(s) ||
        r.produkPinjaman.toLowerCase().includes(s)
      );
    });
  }, [q]);

  const totalEntries: number = 47; // sesuai contoh tampilan (prototype)
  const pageCount = Math.max(1, Math.ceil(totalEntries / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, q]);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const rows = React.useMemo(() => {
    // Tampilkan semua hasil (prototype): tidak dibatasi 5 lagi.
    return filtered;
  }, [filtered]);

  const showingStart = totalEntries === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(totalEntries, page * pageSize);

  const th = "px-3 py-3";
  const td = "px-3 py-2.5";
  const filterCell = "px-3 py-2";

  // Header tabel tetap bold
  const headerTextCls =
    "text-[12px] font-extrabold uppercase tracking-wide text-black";

  // Selain header: jangan bold
  const bodyTextCls = "text-[12px] font-normal text-black";

  const filterInputCls =
    "h-8 rounded-[6px] border-slate-300 bg-white text-[12px] font-normal text-black shadow-none placeholder:text-black/60 focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/20";
  const filterSelectTriggerCls =
    "h-8 rounded-[6px] border-slate-300 bg-white text-[12px] font-normal text-black shadow-none focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20 [&_[data-placeholder]]:text-black/60";

  const pageSizeTriggerCls = cn(
    "h-8 w-[64px] rounded-[6px] border border-slate-300 bg-white px-2",
    "text-[13px] font-normal text-black",
    "shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-black",
  );

  const navBtnCls = (disabled: boolean) =>
    cn(
      "h-10 px-5 text-[14px] font-normal",
      "rounded-[2px] bg-slate-100 text-black",
      "transition",
      disabled ? "opacity-60 pointer-events-none" : "hover:bg-slate-200",
    );

  function pick(accountNo: string) {
    onPick(accountNo);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[calc(100vw-2.5rem)]",
          "max-w-[1200px]",
          "max-h-[85vh] overflow-hidden",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-[18px] font-semibold tracking-tight text-black">
              Rekening Pinjaman
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-black transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          <div
            className="overflow-auto px-6 py-5"
            style={{ maxHeight: "calc(85vh - 64px - 66px - 72px)" }}
          >
            <div className="flex items-center gap-2 text-[13px] font-normal text-black">
              <div>Tampilkan</div>
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
              <div>entri</div>
            </div>

            <div className={cn("mt-4 overflow-hidden ring-1 ring-slate-200", R)}>
              <div className="safe-x-scroll bg-white">
                <table className="w-full min-w-[1050px] border-collapse">
                  <thead className="bg-white">
                    <tr
                      className={cn(
                        "border-b border-slate-300/70 text-left",
                        headerTextCls,
                      )}
                    >
                      <th className={cn("w-[70px] whitespace-nowrap", th)}>
                        <ThLabel sortable={false}>No.</ThLabel>
                      </th>

                      <th className={cn("w-[160px]", th)}>
                        <ThLabel>
                          <span className="block">No.</span>
                          <span className="block">Rekening</span>
                        </ThLabel>
                      </th>

                      <th className={cn("w-[140px]", th)}>
                        <ThLabel>
                          <span className="block">Tanggal</span>
                          <span className="block">Daftar</span>
                        </ThLabel>
                      </th>

                      <th className={cn("w-[170px]", th)}>
                        <ThLabel>
                          <span className="block">Produk</span>
                          <span className="block">Pinjaman</span>
                        </ThLabel>
                      </th>

                      <th className={cn("w-[140px]", th)}>
                        <ThLabel>
                          <span className="block">ID.</span>
                          <span className="block">Nasabah</span>
                        </ThLabel>
                      </th>

                      <th className={cn("min-w-[220px]", th)}>
                        <ThLabel>Nama Nasabah</ThLabel>
                      </th>

                      <th className={cn("w-[160px]", th)}>
                        <ThLabel>
                          <span className="block">Nominal</span>
                        </ThLabel>
                      </th>

                      <th className={cn("w-[160px]", th)}>
                        <ThLabel>
                          <span className="block">Sisa Pinjaman</span>
                        </ThLabel>
                      </th>

                      <th className={cn("w-[110px]", th)}>
                        <ThLabel>
                          <span className="block">Bunga</span>
                          <span className="block">Per Tahun</span>
                          <span className="block">(%)</span>
                        </ThLabel>
                      </th>
                    </tr>

                    <tr className={cn("border-b border-slate-200 bg-white", bodyTextCls)}>
                      <th className={filterCell} />

                      <th className={filterCell}>
                        <Input
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                          className={filterInputCls}
                          placeholder=""
                        />
                      </th>

                      <th className={filterCell}>
                        <div className="relative">
                          <Input
                            value=""
                            onChange={() => {}}
                            className={cn(filterInputCls, "pr-10")}
                            placeholder=""
                            readOnly
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setQ("");
                            }}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-[6px] bg-slate-600 text-white ring-1 ring-slate-600/20 transition hover:bg-slate-700"
                            aria-label="Clear tanggal"
                            title="Clear"
                          >
                            ×
                          </button>
                        </div>
                      </th>

                      <th className={filterCell}>
                        <Select value="-- Semua --" onValueChange={() => {}}>
                          <SelectTrigger className={filterSelectTriggerCls}>
                            <SelectValue placeholder="-- Semua --" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-200">
                            <SelectItem value="-- Semua --">-- Semua --</SelectItem>
                          </SelectContent>
                        </Select>
                      </th>

                      <th className={filterCell}>
                        <Input className={filterInputCls} placeholder="" />
                      </th>

                      <th className={filterCell}>
                        <Input className={filterInputCls} placeholder="" />
                      </th>

                      <th className={cn(filterCell, "text-right")}>
                        <Input
                          className={cn(filterInputCls, "text-right tabular-nums")}
                          placeholder="0,00"
                          inputMode="decimal"
                        />
                      </th>

                      <th className={cn(filterCell, "text-right")}>
                        <Input
                          className={cn(filterInputCls, "text-right tabular-nums")}
                          placeholder="0,00"
                          inputMode="decimal"
                        />
                      </th>

                      <th className={filterCell}>
                        <Input className={filterInputCls} placeholder="" />
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-4 py-10 text-center text-sm text-black"
                        >
                          Tidak ada rekening yang cocok.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r, idx) => (
                        <tr
                          key={r.noRekening}
                          className={cn(
                            "border-b border-slate-200",
                            bodyTextCls,
                            idx % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                            "cursor-pointer",
                            "hover:bg-slate-50",
                            "focus-within:bg-slate-50",
                          )}
                          role="button"
                          tabIndex={0}
                          onClick={() => pick(r.noRekening)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              pick(r.noRekening);
                            }
                          }}
                          aria-label={`Pilih rekening ${r.noRekening}`}
                        >
                          <td className={cn(td, "tabular-nums")}>{idx + 1}</td>

                          <td className={cn(td, "text-left tabular-nums whitespace-nowrap")}>
                            <span className="font-semibold text-black">
                              {r.noRekening}
                            </span>
                          </td>

                          <td className={cn(td, "tabular-nums whitespace-nowrap")}>
                            {r.tanggalDaftar}
                          </td>

                          <td className={cn(td, "whitespace-normal leading-snug")}>
                            {r.produkPinjaman}
                          </td>

                          <td className={cn(td, "tabular-nums whitespace-nowrap")}>
                            {r.idNasabah}
                          </td>

                          <td className={cn(td)}>{r.namaNasabah}</td>

                          <td className={cn(td, "text-right tabular-nums whitespace-nowrap")}>
                            {r.nominal}
                          </td>

                          <td className={cn(td, "text-right tabular-nums whitespace-nowrap")}>
                            {r.sisaPinjaman}
                          </td>

                          <td className={cn(td, "tabular-nums whitespace-nowrap")}>
                            {r.bungaPerTahun}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination: above divider button tutup */}
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-[14px] text-black">
                Menampilkan {showingStart} sampai {showingEnd} dari {totalEntries} entri
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={navBtnCls(page <= 1)}
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Sebelumnya
                </button>
                <button
                  type="button"
                  className={navBtnCls(page >= pageCount)}
                  disabled={page >= pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 px-4",
                  "rounded-[5px] bg-slate-600 text-white",
                  "ring-1 ring-slate-600/20 transition hover:bg-slate-700",
                  "text-[14px] font-normal",
                )}
              >
                <span className="text-[18px] leading-none">×</span>
                Tutup
              </button>
            </div>

            <div className="sr-only">{R}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}