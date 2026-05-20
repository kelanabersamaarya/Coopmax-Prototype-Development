"use client";

import * as React from "react";
import { X, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type StatusKtp = "Belum Terverifikasi" | "Terverifikasi";
type StatusKeanggotaan = "Calon Anggota" | "Anggota";

type Row = {
  no: number;
  id: string;
  nama: string;
  noIdentitas: string;
  statusKtp: StatusKtp;
  alamat: string;
  statusKeanggotaan: StatusKeanggotaan;
};

const seed: Row[] = [
  {
    no: 1,
    id: "N2600013",
    nama: "jhasdjasd",
    noIdentitas: "SIM A - 1276289833001177",
    statusKtp: "Belum Terverifikasi",
    alamat: "jl. galang",
    statusKeanggotaan: "Calon Anggota",
  },
  {
    no: 2,
    id: "N2600011",
    nama: "SUTA-II",
    noIdentitas: "KTP - 350733180763002",
    statusKtp: "Belum Terverifikasi",
    alamat: "DSN BENDIL WILIN 24/3 KADENANGAN PAGELARAN",
    statusKeanggotaan: "Calon Anggota",
  },
  {
    no: 3,
    id: "N2600006",
    nama: "Bapak Bagus",
    noIdentitas: "KTP - 887878787878787",
    statusKtp: "Belum Terverifikasi",
    alamat: "Sidakarya",
    statusKeanggotaan: "Calon Anggota",
  },
  {
    no: 4,
    id: "N2500010",
    nama: "gaby",
    noIdentitas: "KTP - 191828282929",
    statusKtp: "Belum Terverifikasi",
    alamat: "jl. galang",
    statusKeanggotaan: "Calon Anggota",
  },
  {
    no: 5,
    id: "N2500009",
    nama: "indah sari",
    noIdentitas: "KTP - 721991828282",
    statusKtp: "Belum Terverifikasi",
    alamat: "jl. kamboja",
    statusKeanggotaan: "Calon Anggota",
  },
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

function StatusKtpPill({ v }: { v: StatusKtp }) {
  const isBad = v === "Belum Terverifikasi";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "h-7 rounded-full px-3 text-[11px] font-extrabold uppercase tracking-wide",
        isBad ? "bg-rose-600 text-white ring-1 ring-rose-600/25" : "bg-emerald-600 text-white ring-1 ring-emerald-600/25",
      )}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
        <span className="block h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      {v}
    </span>
  );
}

const R = "rounded-[5px]";

export default function NasabahPickerModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [pageSize] = React.useState<number>(20);

  const [qId, setQId] = React.useState("");
  const [qNama, setQNama] = React.useState("");
  const [qNo, setQNo] = React.useState("");
  const [qAlamat, setQAlamat] = React.useState("");
  const [qStatusKtp, setQStatusKtp] = React.useState<string>("-- Semua --");
  const [qStatusKeanggotaan, setQStatusKeanggotaan] = React.useState<string>("-- Semua --");

  React.useEffect(() => {
    if (!open) return;
    setQId("");
    setQNama("");
    setQNo("");
    setQAlamat("");
    setQStatusKtp("-- Semua --");
    setQStatusKeanggotaan("-- Semua --");
  }, [open]);

  const filtered = React.useMemo(() => {
    const idQ = qId.trim().toLowerCase();
    const namaQ = qNama.trim().toLowerCase();
    const noQ = qNo.trim().toLowerCase();
    const alamatQ = qAlamat.trim().toLowerCase();

    return seed.filter((r) => {
      const okId = idQ ? r.id.toLowerCase().includes(idQ) : true;
      const okNama = namaQ ? r.nama.toLowerCase().includes(namaQ) : true;
      const okNo = noQ ? r.noIdentitas.toLowerCase().includes(noQ) : true;
      const okAlamat = alamatQ ? r.alamat.toLowerCase().includes(alamatQ) : true;

      const okKtp =
        qStatusKtp === "-- Semua --"
          ? true
          : qStatusKtp === "Belum Terverifikasi"
            ? r.statusKtp === "Belum Terverifikasi"
            : r.statusKtp === "Terverifikasi";

      const okKeanggotaan =
        qStatusKeanggotaan === "-- Semua --"
          ? true
          : qStatusKeanggotaan === "Calon Anggota"
            ? r.statusKeanggotaan === "Calon Anggota"
            : r.statusKeanggotaan === "Anggota";

      return okId && okNama && okNo && okAlamat && okKtp && okKeanggotaan;
    });
  }, [qAlamat, qId, qNama, qNo, qStatusKeanggotaan, qStatusKtp]);

  const rows = filtered.slice(0, 5);
  const totalEntries = rows.length;

  const filterInputCls =
    "h-8 rounded-[6px] border-slate-300 bg-white text-[12px] font-normal text-black shadow-none placeholder:text-black/60 focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/20";

  const selectTriggerCls = cn(
    "h-8 rounded-[6px] border-slate-300 bg-white px-2 text-[12px] font-normal text-black shadow-none",
    "focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/20",
  );

  const th = "px-3 py-3";
  const filterCell = "px-3 py-2";
  const td = "px-3 py-2.5";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[calc(100vw-2.5rem)]",
          "max-w-[1200px]",
          "max-h-[85vh] overflow-hidden",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          // hide default close button
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-[18px] font-semibold tracking-tight text-black">
              Nasabah
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className={cn(
                      "h-8 px-4 text-[12px] font-semibold leading-none",
                      "bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-2))]",
                      R,
                    )}
                  >
                    Tambah <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={cn("border-slate-200 p-1", R)} align="end">
                  <DropdownMenuItem
                    className={cn(R)}
                    onClick={() => toast("Tambah Nasabah (prototype)")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Nasabah
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(R)}
                    onClick={() => toast("Import Data (prototype)")}
                  >
                    Import Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center",
                  "text-black transition hover:bg-slate-100",
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

          <div
            className="overflow-auto px-6 py-5"
            style={{ maxHeight: "calc(85vh - 64px - 66px)" }}
          >
            <div className="flex items-center gap-2 text-[13px] font-normal text-black">
              <div>Show</div>
              <div className="inline-flex h-8 items-center rounded-[6px] border border-slate-300 bg-white px-2 text-[12px] text-black shadow-none">
                {pageSize}
              </div>
              <div>entries</div>
            </div>

            <div className={cn("mt-4 overflow-hidden ring-1 ring-slate-200", R)}>
              <div className="safe-x-scroll bg-white">
                <table className="w-full min-w-[1050px] border-collapse">
                  <thead className="bg-white">
                    <tr className="border-b border-slate-300/70 text-left text-[12px] font-extrabold uppercase tracking-wide text-black">
                      <th className={cn("w-[70px] whitespace-nowrap", th)}>
                        <ThLabel sortable={false}>No</ThLabel>
                      </th>
                      <th className={cn("w-[120px]", th)}>
                        <ThLabel>ID</ThLabel>
                      </th>
                      <th className={cn("w-[170px]", th)}>
                        <ThLabel>Nama</ThLabel>
                      </th>
                      <th className={cn("w-[220px]", th)}>
                        <ThLabel>No Identitas</ThLabel>
                      </th>
                      <th className={cn("w-[210px]", th)}>
                        <ThLabel>Status Verifikasi KTP</ThLabel>
                      </th>
                      <th className={cn("min-w-[280px]", th)}>
                        <ThLabel>Alamat</ThLabel>
                      </th>
                      <th className={cn("w-[170px]", th)}>
                        <ThLabel>Status Keanggotaan</ThLabel>
                      </th>
                    </tr>

                    <tr className="border-b border-slate-200 bg-white text-[12px] font-normal text-black">
                      <th className={filterCell} />
                      <th className={filterCell}>
                        <Input
                          value={qId}
                          onChange={(e) => setQId(e.target.value)}
                          className={filterInputCls}
                          placeholder="ID"
                        />
                      </th>
                      <th className={filterCell}>
                        <Input
                          value={qNama}
                          onChange={(e) => setQNama(e.target.value)}
                          className={filterInputCls}
                          placeholder="Nama"
                        />
                      </th>
                      <th className={filterCell}>
                        <Input
                          value={qNo}
                          onChange={(e) => setQNo(e.target.value)}
                          className={filterInputCls}
                          placeholder="No Identitas"
                        />
                      </th>
                      <th className={filterCell}>
                        <Select value={qStatusKtp} onValueChange={setQStatusKtp}>
                          <SelectTrigger className={selectTriggerCls}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-200">
                            <SelectItem value="-- Semua --">-- Semua --</SelectItem>
                            <SelectItem value="Belum Terverifikasi">
                              Belum Terverifikasi
                            </SelectItem>
                            <SelectItem value="Terverifikasi">Terverifikasi</SelectItem>
                          </SelectContent>
                        </Select>
                      </th>
                      <th className={filterCell}>
                        <Input
                          value={qAlamat}
                          onChange={(e) => setQAlamat(e.target.value)}
                          className={filterInputCls}
                          placeholder="Alamat"
                        />
                      </th>
                      <th className={filterCell}>
                        <Select
                          value={qStatusKeanggotaan}
                          onValueChange={setQStatusKeanggotaan}
                        >
                          <SelectTrigger className={selectTriggerCls}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-200">
                            <SelectItem value="-- Semua --">-- Semua --</SelectItem>
                            <SelectItem value="Calon Anggota">Calon Anggota</SelectItem>
                            <SelectItem value="Anggota">Anggota</SelectItem>
                          </SelectContent>
                        </Select>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-600">
                          Tidak ada data.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r, idx) => (
                        <tr
                          key={r.id}
                          className={cn(
                            "border-b border-slate-200 text-[12px] text-black",
                            idx % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                          )}
                        >
                          <td className={cn(td, "tabular-nums")}>{r.no}</td>
                          <td className={cn(td, "tabular-nums font-semibold")}>{r.id}</td>
                          <td className={cn(td, "font-medium")}>{r.nama}</td>
                          <td className={cn(td, "whitespace-nowrap")}>{r.noIdentitas}</td>
                          <td className={cn(td)}>
                            <StatusKtpPill v={r.statusKtp} />
                          </td>
                          <td className={cn(td, "whitespace-normal leading-snug")}>{r.alamat}</td>
                          <td className={cn(td)}>{r.statusKeanggotaan}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-3 text-[14px] text-black">
              Showing 1 to {totalEntries} of {totalEntries} entries
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}