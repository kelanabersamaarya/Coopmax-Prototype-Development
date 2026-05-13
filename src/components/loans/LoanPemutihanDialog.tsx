"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { X, CheckSquare, Eye, Check } from "lucide-react";
import { toast } from "sonner";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import DaftarTagihanReadOnlyDialog from "@/components/loans/DaftarTagihanReadOnlyDialog";
import LoanPemutihanConfirmModal from "@/components/loans/LoanPemutihanConfirmModal";
import LoanPemutihanSuccessModal from "@/components/loans/LoanPemutihanSuccessModal";

function RowKV({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid items-center gap-3 py-1.5 [grid-template-columns:170px_minmax(0,1fr)]">
      <div className="text-sm font-normal text-slate-700">{label}</div>
      <div className="text-sm font-normal text-slate-900">{value}</div>
    </div>
  );
}

function RowKVWithAction({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-3 py-1.5 [grid-template-columns:170px_minmax(0,1fr)]">
      <div className="text-sm font-normal text-slate-700">{label}</div>
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 text-sm font-normal text-slate-900">{value}</div>
          <div className="shrink-0">{action}</div>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-normal text-slate-700">{children}</div>;
}

function parseIdrLike(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;

  // "11.820.000,00" -> 11820000
  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatIdr2(n: number) {
  const value = Number.isFinite(n) ? n : 0;
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function onlyDigits(s: string) {
  return (s ?? "").replace(/[^\d]/g, "");
}

function formatRibuanFromDigits(digits: string) {
  const cleaned = onlyDigits(digits);
  if (cleaned === "") return "";
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function caretPosFromDigitsLeft(formatted: string, digitsLeft: number) {
  if (digitsLeft <= 0) return 0;

  const comma = formatted.indexOf(",");
  const max = comma >= 0 ? comma : formatted.length;

  let seen = 0;
  for (let i = 0; i < max; i++) {
    if (/\d/.test(formatted[i] ?? "")) {
      seen++;
      if (seen >= digitsLeft) return i + 1;
    }
  }
  return max;
}

/**
 * Format IDR:
 * - Ambil hanya digit SEBELUM koma (bagian integer).
 * - Tambahkan ",00" otomatis.
 * - Jika kosong -> "" (biarkan kosong; placeholder akan muncul)
 */
function formatIdrCurrencyFromRaw(raw: string) {
  const s = (raw ?? "").trim();
  if (!s) return "";

  const beforeComma = s.split(",")[0] ?? "";
  const digits = onlyDigits(beforeComma);
  if (!digits) return "";

  const normalized = digits.replace(/^0+(?=\d)/, "");
  const ribuan = formatRibuanFromDigits(normalized);

  // jika user benar-benar mengetik 0, tetap tampil 0,00
  const safeRibuan = ribuan === "" ? "0" : ribuan;

  return `${safeRibuan},00`;
}

const TIPE_TRANSAKSI = "Pemutihan Pinjaman";

const R5 = "rounded-[5px]";
const H30 = "h-[30px]";

export default function LoanPemutihanDialog({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  accountNo: string;
}) {
  const [tagihanOpen, setTagihanOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  const [tanggal, setTanggal] = React.useState("20-04-2026");
  const [tipeTransaksi, setTipeTransaksi] = React.useState(TIPE_TRANSAKSI);

  // Nominal tampil formatted (contoh "500.000,00"), kosong jika belum diisi
  const [nominal, setNominal] = React.useState("");

  const nominalRef = React.useRef<HTMLInputElement | null>(null);
  const lastDigitsLeftRef = React.useRef<number | null>(null);

  const [keterangan, setKeterangan] = React.useState("");
  const [confirm, setConfirm] = React.useState(false);

  const shouldToastOnSuccessCloseRef = React.useRef(false);
  const didToastRef = React.useRef(false);

  React.useEffect(() => {
    if (!open) return;
    setTanggal("20-04-2026");
    setTipeTransaksi(TIPE_TRANSAKSI);
    setNominal("");
    setKeterangan("");
    setConfirm(false);
    setTagihanOpen(false);
    setConfirmOpen(false);
    setSuccessOpen(false);
    shouldToastOnSuccessCloseRef.current = false;
    didToastRef.current = false;
  }, [open]);

  // restore caret after formatting (jaga caret hanya di area integer, sebelum koma)
  React.useLayoutEffect(() => {
    const el = nominalRef.current;
    const digitsLeft = lastDigitsLeftRef.current;
    if (!el || digitsLeft === null) return;

    const pos = caretPosFromDigitsLeft(nominal, digitsLeft);
    try {
      el.setSelectionRange(pos, pos);
    } catch {
      // ignore
    }
    lastDigitsLeftRef.current = null;
  }, [nominal]);

  const footerH = 72; // kira-kira tinggi footer + separator

  const btnBase = cn(
    "inline-flex items-center justify-center gap-2",
    "w-[90px]",
    H30,
    "px-2",
    "rounded-[6px]",
    "text-[11px] font-bold tracking-tight text-white",
    "ring-1 transition",
    "leading-none",
    "focus:outline-none focus-visible:ring-4",
  );

  const nominalN = React.useMemo(() => parseIdrLike(nominal), [nominal]);

  // Rasio mengikuti contoh screenshot (±)
  const POKOK_RATIO = 0.893;
  const bungaN = React.useMemo(
    () => Math.max(0, Math.round(nominalN * (1 - POKOK_RATIO))),
    [nominalN],
  );
  const pokokN = React.useMemo(
    () => Math.max(0, nominalN - bungaN),
    [nominalN, bungaN],
  );
  const hutangBungaN = 0;
  const dendaN = 0;

  const inputBase = cn(
    H30,
    R5,
    "border-slate-200 bg-white text-slate-900",
    "font-normal",
    "shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const selectBase = cn(
    H30,
    R5,
    "w-full border border-slate-200 bg-white px-3 text-sm font-normal text-slate-900",
    "shadow-sm outline-none transition",
    "focus:border-[hsl(var(--app-accent))] focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20",
  );

  const checkboxCls = cn(
    "h-4 w-4 rounded-[2px]",
    "border border-[#1D4ED8]",
    "data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB]",
    "data-[state=checked]:text-white",
    "shadow-none ring-0",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const viewBillsBtnCls = cn(
    "inline-flex items-center gap-2",
    "h-[30px] px-3",
    "rounded-[6px]",
    "bg-[#0b5bd3] text-white",
    "ring-1 ring-[#0b5bd3]/25 transition hover:bg-[#0a52bf]",
    "text-[13px] font-semibold",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b5bd3]/20",
  );

  function validateBeforeConfirm() {
    if (!keterangan.trim()) {
      toast("Keterangan wajib diisi", {
        description: "Mohon isi keterangan terlebih dahulu.",
      });
      return false;
    }
    if (!confirm) {
      toast("Konfirmasi diperlukan", {
        description: "Centang persetujuan sebelum menyimpan.",
      });
      return false;
    }
    return true;
  }

  function showPemutihanSuccessToast() {
    toast.custom((t) => (
      <div className="w-[min(520px,calc(100vw-1rem))]">
        <div
          className={cn(
            "rounded-[10px] bg-emerald-600 text-white shadow-xl",
            "ring-1 ring-emerald-700/40",
            "px-4 py-3",
          )}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
              <Check className="h-5 w-5 text-white" strokeWidth={3} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold leading-none">
                Pemutihan Pinjaman Berhasil
              </div>
            </div>

            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full",
                "bg-transparent ring-0 shadow-none",
                "text-white/90 transition hover:text-white",
                "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              )}
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-4.5 w-4.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    ));
  }

  function doSave() {
    // simulate "saved" (prototype)
    void formatIdr2(nominalN);
    void accountNo;
    void tanggal;
  }

  function maybeToastAfterSuccessClose() {
    if (!shouldToastOnSuccessCloseRef.current) return;
    if (didToastRef.current) return;
    didToastRef.current = true;
    showPemutihanSuccessToast();
  }

  // Prototype info (sesuai permintaan list)
  const customerName = "Bapak Bagus";
  const totalPinjaman = "12.000.000,00";
  const angsuranPokok = "1.000.000,00";
  const angsuranBunga = "120.000,00";
  const sisaPokok = "10.553.571,00";
  const sisaBunga = "1.266.429,00";
  const sisaDenda = "0,00";
  const totalKewajibanBerjalan = "11.820.000,00";

  return (
    <>
      <DaftarTagihanReadOnlyDialog open={tagihanOpen} onOpenChange={setTagihanOpen} />

      <LoanPemutihanConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onYes={() => {
          setConfirmOpen(false);
          doSave();
          // toast akan dipanggil ketika modal sukses ditutup (OK/backdrop/ESC)
          shouldToastOnSuccessCloseRef.current = true;
          setSuccessOpen(true);
        }}
      />

      <LoanPemutihanSuccessModal
        open={successOpen}
        onOpenChange={(v) => {
          // fallback: kalau user tutup via backdrop/ESC
          if (!v) maybeToastAfterSuccessClose();
          setSuccessOpen(v);
        }}
        onOk={() => {
          // ✅ Pasti trigger toast saat OK
          if (!didToastRef.current) {
            didToastRef.current = true;
            showPemutihanSuccessToast();
          }
          shouldToastOnSuccessCloseRef.current = false;

          setSuccessOpen(false);
          onOpenChange(false);
        }}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "w-[calc(100vw-1.25rem)] sm:w-[760px]",
            "max-w-[760px]",
            "max-h-[85vh]",
            "rounded-3xl border-slate-200 p-0 shadow-2xl",
            "overflow-hidden",
            // HIDE default shadcn/radix close button (biar X cuma 1)
            "[&>button[aria-label=Close]]:hidden",
            "[&>button.absolute.right-4.top-4]:hidden",
            "[&_[data-slot=dialog-close]]:hidden",
            "[&_[data-radix-dialog-close]]:hidden",
          )}
        >
          <div className="bg-white">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-6 py-4">
              <div className="text-lg font-semibold tracking-tight text-slate-900">
                Pemutihan Pinjaman
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

            {/* Body (scroll) */}
            <div
              className="overflow-auto px-6 py-5"
              style={{ maxHeight: `calc(85vh - 64px - ${footerH}px)` }}
            >
              {/* Summary (updated) */}
              <div className="rounded-2xl bg-white">
                <div className="grid gap-1">
                  <RowKV label="No. Rekening Pinjaman" value={accountNo} />
                  <RowKV label="Nama Nasabah" value={customerName} />
                  <RowKV label="Total Pinjaman" value={totalPinjaman} />
                  <RowKV label="Angsuran Pokok" value={angsuranPokok} />
                  <RowKV label="Angsuran Bunga" value={angsuranBunga} />
                  <RowKV label="Sisa Pokok" value={sisaPokok} />
                  <RowKV label="Sisa Bunga" value={sisaBunga} />
                  <RowKV label="Sisa Denda" value={sisaDenda} />

                  {/* tombol nempel di samping nominal */}
                  <div className="grid items-center gap-3 py-1.5 [grid-template-columns:170px_minmax(0,1fr)]">
                    <div className="text-sm font-normal text-slate-700">
                      Total Kewajiban Berjalan
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="min-w-0 text-sm font-normal text-slate-900">
                          {totalKewajibanBerjalan}
                        </div>

                        <button
                          type="button"
                          className={viewBillsBtnCls}
                          onClick={() => setTagihanOpen(true)}
                          aria-label="Lihat Tagihan"
                          title="Lihat Tagihan"
                        >
                          <Eye className="h-4 w-4" />
                          Lihat Tagihan
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* keep helper component used (avoid unused) */}
                  <div className="sr-only">
                    <RowKVWithAction label="x" value="y" action={<span />} />
                  </div>
                </div>
              </div>

              <Separator className="my-5 bg-slate-200/80" />

              {/* Form */}
              <div className="grid gap-4 pb-6">
                <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                  <FieldLabel>
                    Tanggal<span className="text-rose-600"> *</span>
                  </FieldLabel>

                  <DatePickerDmyField
                    value={tanggal}
                    onChange={setTanggal}
                    inputClassName={cn(inputBase, "pr-11 text-sm")}
                    popoverAlign="end"
                    placeholder="DD-MM-YYYY"
                  />
                </div>

                <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                  <FieldLabel>
                    Tipe Transaksi<span className="text-rose-600"> *</span>
                  </FieldLabel>
                  <div className="relative">
                    <select
                      value={tipeTransaksi}
                      onChange={(e) => setTipeTransaksi(e.target.value)}
                      className={selectBase}
                    >
                      <option value={TIPE_TRANSAKSI}>{TIPE_TRANSAKSI}</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                  <FieldLabel>Nominal</FieldLabel>
                  <Input
                    ref={nominalRef}
                    value={nominal}
                    onChange={(e) => {
                      const raw = e.target.value ?? "";
                      const caret = e.target.selectionStart ?? raw.length;

                      const left = raw.slice(0, caret);
                      const leftBeforeComma = left.split(",")[0] ?? "";
                      const digitsLeft = onlyDigits(leftBeforeComma).length;
                      lastDigitsLeftRef.current = digitsLeft;

                      setNominal(formatIdrCurrencyFromRaw(raw));
                    }}
                    className={cn(inputBase, "text-sm")}
                    placeholder="0,00"
                    inputMode="numeric"
                  />
                </div>

                <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                  <FieldLabel>Bayar Pokok</FieldLabel>
                  <div className="text-sm font-normal text-slate-900">
                    {formatIdr2(pokokN)}
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                  <FieldLabel>Bayar Bunga</FieldLabel>
                  <div className="text-sm font-normal text-slate-900">
                    {formatIdr2(bungaN)}
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                  <FieldLabel>Bayar Hutang Bunga</FieldLabel>
                  <div className="text-sm font-normal text-slate-900">
                    {formatIdr2(hutangBungaN)}
                  </div>
                </div>

                {/* tambahan field baru */}
                <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                  <FieldLabel>Bayar Denda</FieldLabel>
                  <div className="text-sm font-normal text-slate-900">
                    {formatIdr2(dendaN)}
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start">
                  <FieldLabel>
                    Keterangan<span className="text-rose-600"> *</span>
                  </FieldLabel>
                  <Textarea
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className={cn(
                      R5,
                      "min-h-[120px] border-slate-200 bg-white text-sm font-normal text-slate-900",
                    )}
                  />
                </div>

                <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                  <div className="hidden sm:block" />
                  <label className="flex items-center gap-3 text-sm font-normal text-slate-900">
                    <Checkbox
                      className={checkboxCls}
                      checked={confirm}
                      onCheckedChange={(v) => setConfirm(!!v)}
                    />
                    Yakin untuk melunasi pemutihan pinjaman ini
                  </label>
                </div>
              </div>
            </div>

            {/* Divider di atas tombol */}
            <Separator className="bg-slate-200" />

            {/* Footer (sticky) */}
            <div className="sticky bottom-0 bg-white px-6 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    btnBase,
                    "bg-slate-500 ring-slate-500/20 hover:bg-slate-600 focus-visible:ring-slate-500/25",
                  )}
                >
                  <X className="h-4 w-4" strokeWidth={3} />
                  Tutup
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!validateBeforeConfirm()) return;
                    setConfirmOpen(true);
                  }}
                  className={cn(
                    btnBase,
                    "bg-green-600 ring-green-600/20 hover:bg-green-700 focus-visible:ring-green-600/25",
                  )}
                >
                  <CheckSquare className="h-4 w-4" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}