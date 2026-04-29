"use client";

import * as React from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type StatusKeanggotaan = "Semua" | "Anggota" | "Calon";

export type Nasabah = {
  id: string;
  nama: string;
  noIdentitas: string;
  alamat: string;
  status: "Anggota" | "Calon";
};

const seed: Nasabah[] = Array.from({ length: 28 }).map((_, i) => ({
  id: "N2500010",
  nama: i % 3 === 0 ? "Gaby" : i % 3 === 1 ? "Nyoman Ariana" : "Komang Dewa",
  noIdentitas: "2233445",
  alamat: "Jl. Galang",
  status: i % 5 === 0 ? "Calon" : "Anggota",
}));

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

  const R = "rounded-[5px]";

  const prevNextCls = cn(
    "h-10 px-5 text-[14px] font-semibold",
    "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
    "transition hover:bg-slate-200",
    "disabled:opacity-60 disabled:pointer-events-none",
    R,
  );

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        className={prevNextCls}
        disabled={page === 1}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

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
                "h-10 w-10 text-[14px] font-semibold ring-1 transition",
                R,
                active
                  ? "bg-violet-600 text-white ring-violet-600"
                  : "bg-slate-100 text-slate-800 ring-slate-200 hover:bg-slate-200",
              )}
            >
              {it}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={prevNextCls}
        disabled={page === pageCount}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </button>
    </div>
  );
}

export default function NasabahPickerDialog({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onPick?: (n: Nasabah) => void;
}) {
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(1);

  const [qId, setQId] = React.useState("");
  const [qNama, setQNama] = React.useState("");
  const [qNo, setQNo] = React.useState("");
  const [qAlamat, setQAlamat] = React.useState("");
  const [status, setStatus] = React.useState<StatusKeanggotaan>("Semua");

  const filtered = React.useMemo(() => {
    const idQ = qId.trim().toLowerCase();
    const namaQ = qNama.trim().toLowerCase();
    const noQ = qNo.trim().toLowerCase();
    const alamatQ = qAlamat.trim().toLowerCase();

    return seed.filter((n) => {
      const okId = idQ ? n.id.toLowerCase().includes(idQ) : true;
      const okNama = namaQ ? n.nama.toLowerCase().includes(namaQ) : true;
      const okNo = noQ ? n.noIdentitas.toLowerCase().includes(noQ) : true;
      const okAlamat = alamatQ ? n.alamat.toLowerCase().includes(alamatQ) : true;
      const okStatus =
        status === "Semua"
          ? true
          : status === "Anggota"
            ? n.status === "Anggota"
            : n.status === "Calon";
      return okId && okNama && okNo && okAlamat && okStatus;
    });
  }, [qAlamat, qId, qNama, qNo, status]);

  const totalEntries = 495;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, qId, qNama, qNo, qAlamat, status]);

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const showingStart = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(filtered.length, page * pageSize);

  // Header + separator height kira-kira 56px (py-3) + 1px line
  const dialogMaxH = "70vh";
  const contentMaxH = "calc(70vh - 56px - 1px)";

  const R = "rounded-[5px]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2.5rem)]",
          "max-w-[920px]",
          `max-h-[${dialogMaxH}]`,
          "overflow-hidden",
          R,
          "border-slate-200 p-0 shadow-xl",
          // scoped: hide default shadcn close button (X kecil pojok kanan)
          "[&>button[aria-label=Close]]:hidden [&>button[aria-label=Close]]:!hidden",
          "[&_[data-slot=dialog-close]]:hidden [&_[data-slot=dialog-close]]:!hidden",
          "[&>button.absolute.right-4.top-4]:hidden [&>button.absolute.right-4.top-4]:!hidden",
          "[&>button[data-state]]:hidden [&>button[data-state]]:!hidden",
        )}
      >
        {/* HEADER DIPERKECIL */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 sm:px-6 sm:py-3">
          <div className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            Nasabah
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={cn(
                    "h-8 bg-[hsl(var(--app-accent))] px-4 text-sm text-white hover:bg-[hsl(var(--app-accent-2))]",
                    R,
                  )}
                >
                  Tambah <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={cn("border-slate-200 p-1", R)}>
                <DropdownMenuItem
                  className={cn(R)}
                  onClick={() => toast("Tambah Nasabah (prototype)")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Nasabah
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn(R)}
                  onClick={() => toast("Import (prototype)")}
                >
                  Import Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center text-slate-700 transition hover:bg-slate-100",
                R,
              )}
              aria-label="Tutup dialog"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Separator className="bg-slate-200" />

        {/* KONTEN: tanpa scroll vertikal, dipaksa muat */}
        <div
          className={cn(
            `h-[${contentMaxH}]`,
            "overflow-hidden px-5 py-3 sm:px-6 sm:py-4",
          )}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm text-slate-700">Tampilkan</div>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => setPageSize(Number(v))}
            >
              <SelectTrigger
                className={cn("h-8 w-[92px] border-slate-200 bg-white", R)}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={cn("border-slate-200", R)}>
                {[5, 10, 20, 50].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-sm text-slate-700">Entri</div>
          </div>

          <div className={cn("mt-3 overflow-hidden ring-1 ring-slate-200", R)}>
            <div className="min-w-0 max-w-full overflow-x-hidden">
              <table className="w-full max-w-full table-fixed border-collapse">
                <thead className="bg-white">
                  <tr className="text-left text-sm font-semibold text-slate-900">
                    <th className="w-[52px] px-3 py-2.5">No.</th>
                    <th className="w-[110px] px-3 py-2.5">ID</th>
                    <th className="w-[140px] px-3 py-2.5">NAMA</th>
                    <th className="w-[140px] px-3 py-2.5">NO. IDENTITAS</th>
                    <th className="w-[180px] px-3 py-2.5">ALAMAT</th>
                    <th className="w-[120px] px-3 py-2.5">STATUS</th>
                  </tr>

                  <tr className="border-t border-slate-200 bg-white">
                    <th className="px-3 py-2.5" />
                    <th className="px-3 py-2.5">
                      <Input
                        value={qId}
                        onChange={(e) => setQId(e.target.value)}
                        placeholder="ID"
                        className={cn("h-8 w-full border-slate-200 bg-white", R)}
                      />
                    </th>
                    <th className="px-3 py-2.5">
                      <Input
                        value={qNama}
                        onChange={(e) => setQNama(e.target.value)}
                        placeholder="Nama"
                        className={cn("h-8 w-full border-slate-200 bg-white", R)}
                      />
                    </th>
                    <th className="px-3 py-2.5">
                      <Input
                        value={qNo}
                        onChange={(e) => setQNo(e.target.value)}
                        placeholder="No Identitas"
                        className={cn("h-8 w-full border-slate-200 bg-white", R)}
                      />
                    </th>
                    <th className="px-3 py-2.5">
                      <Input
                        value={qAlamat}
                        onChange={(e) => setQAlamat(e.target.value)}
                        placeholder="Alamat"
                        className={cn("h-8 w-full border-slate-200 bg-white", R)}
                      />
                    </th>
                    <th className="px-3 py-2.5">
                      <Select
                        value={status}
                        onValueChange={(v) => setStatus(v as StatusKeanggotaan)}
                      >
                        <SelectTrigger
                          className={cn("h-8 w-full border-slate-200 bg-white", R)}
                        >
                          <SelectValue placeholder="-- Semua" />
                        </SelectTrigger>
                        <SelectContent className={cn("border-slate-200", R)}>
                          <SelectItem value="Semua">-- Semua</SelectItem>
                          <SelectItem value="Anggota">Anggota</SelectItem>
                          <SelectItem value="Calon">Calon</SelectItem>
                        </SelectContent>
                      </Select>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {paged.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-sm text-slate-600"
                      >
                        Tidak ada data.
                      </td>
                    </tr>
                  ) : (
                    paged.map((n, idx) => {
                      const no = (page - 1) * pageSize + idx + 1;
                      const isClickable = !!onPick;

                      return (
                        <tr
                          key={`${n.id}-${idx}`}
                          className={cn(
                            "border-t border-slate-200 text-sm text-slate-900",
                            isClickable
                              ? "cursor-pointer hover:bg-slate-50"
                              : "cursor-default",
                          )}
                          role={isClickable ? "button" : undefined}
                          tabIndex={isClickable ? 0 : undefined}
                          onClick={() => onPick?.(n)}
                          onKeyDown={(e) => {
                            if (!onPick) return;
                            if (e.key === "Enter" || e.key === " ") onPick(n);
                          }}
                        >
                          <td className="px-3 py-3">{no}</td>
                          <td className="bg-slate-50 px-3 py-3">
                            <div className="truncate" title={n.id}>
                              {n.id}
                            </div>
                          </td>
                          <td className="px-3 py-3 font-medium">
                            <div className="truncate" title={n.nama}>
                              {n.nama}
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="truncate" title={n.noIdentitas}>
                              {n.noIdentitas}
                            </div>
                          </td>
                          <td className="px-3 py-3 text-slate-800">
                            <div className="truncate" title={n.alamat}>
                              {n.alamat}
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="truncate" title={n.status}>
                              {n.status}
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

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-slate-700">
              Menampilkan {showingStart} sampai {showingEnd} dari {totalEntries}{" "}
              entri
            </div>
            <Pagination page={page} pageCount={pageCount} onPage={setPage} />
          </div>

          <div className="mt-4 flex items-center justify-end">
            {/* Hapus background di belakang icon X (tetap pertahankan icon & copywriting) */}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "inline-flex h-11 items-center justify-center gap-3 px-6",
                R,
                "bg-slate-600 text-sm font-semibold text-white",
                "ring-1 ring-slate-600/25 transition hover:bg-slate-700",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-600/25",
              )}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center text-white">
                ×
              </span>
              Batalkan
            </button>
          </div>

          {onPick ? (
            <div className="sr-only">
              <Card />
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}