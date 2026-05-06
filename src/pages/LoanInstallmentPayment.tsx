import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckSquare, Search, X, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoanAccountPickerDialog from "@/components/loans/LoanAccountPickerDialog";
import SectionDividerLabel from "@/components/loans/SectionDividerLabel";
import LoanAccountInfoPreview from "@/components/loans/LoanAccountInfoPreview";
import { Separator } from "@/components/ui/separator";

const R = "rounded-[5px]";
const H = "h-[30px]";
const GAP = "gap-[15px]";

const TX_TYPES = ["Bayar Angsuran"] as const;
const COLLECTORS = [
  "Pilih Kolektor",
  "Dinda Sudiati",
  "Kolektor A",
  "Kolektor B",
] as const;

function toDmyFromIso(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((iso ?? "").trim());
  if (!m) return "";
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function deriveNasabahNameByAccountNo(accountNo: string) {
  // Selaras dengan seed di LoanAccountPickerDialog (seed5)
  if (accountNo === "12260006") return "Pangeran Sirait";
  if (accountNo === "12260002") return "gaby";
  if (accountNo === "12260001") return "Rika Wastuti";
  if (accountNo === "210260001") return "Jenan Aditama";
  if (accountNo === "072260001") return "Rika Wastuti";
  return "Nasabah";
}

export default function LoanInstallmentPayment() {
  const navigate = useNavigate();

  const [tanggal, setTanggal] = React.useState(() => {
    const todayIso = new Date().toISOString().slice(0, 10);
    return toDmyFromIso(todayIso) || "06-05-2026";
  });

  const [jenis, setJenis] = React.useState<(typeof TX_TYPES)[number]>(
    "Bayar Angsuran",
  );
  const [kolektor, setKolektor] = React.useState<(typeof COLLECTORS)[number]>(
    "Pilih Kolektor",
  );

  const [selectedAccounts, setSelectedAccounts] = React.useState<string[]>([]);
  const [qNasabah, setQNasabah] = React.useState("");
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const selectTriggerCls = cn(
    H,
    R,
    "w-full border border-slate-200 bg-white px-3 text-[14px] font-medium text-slate-900 shadow-sm",
    "justify-between",
    "[&>svg]:text-slate-400",
  );

  const labelCls = "text-[14px] font-normal text-slate-900";
  const requiredStar = <span className="text-rose-600">*</span>;

  const actionBtnBase = cn(
    "inline-flex items-center justify-center gap-2",
    R,
    "h-[28px] w-[90px] px-2 text-[11px] font-bold tracking-tight text-white",
    "ring-1 transition",
    "leading-none",
  );

  const actionIconCls = "h-4 w-4";

  const hasAccounts = selectedAccounts.length > 0;

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <LoanAccountPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        query={qNasabah}
        onPick={(accountNo) => {
          const nama = deriveNasabahNameByAccountNo(accountNo);

          setSelectedAccounts((prev) => {
            if (prev.includes(accountNo)) {
              toast("Rekening sudah dipilih", {
                description: `${nama} • ${accountNo}`,
              });
              return prev;
            }
            return [...prev, accountNo];
          });

          setQNasabah(accountNo);
          setPickerOpen(false);

          toast.success("Berhasil Menampilkan Tagihan Nasabah", {
            description: `${nama} • ${accountNo}`,
          });
        }}
      />

      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Transaksi Pinjaman
          </h1>
          <div className="text-base font-normal tracking-tight text-black">
            Pembayaran
          </div>
        </div>

        <Card className="mt-6 overflow-hidden rounded-3xl border-slate-200/70 bg-white/90 p-0 shadow-sm backdrop-blur">
          <div className="px-6 py-6 sm:px-8">
            <div className={cn("grid", GAP)}>
              <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <div className={labelCls}>
                  Tanggal{requiredStar}
                </div>
                <DatePickerDmyField
                  value={tanggal}
                  onChange={setTanggal}
                  inputClassName={cn(
                    H,
                    R,
                    "border-slate-200 bg-white text-[14px] pr-11",
                  )}
                  popoverAlign="end"
                  placeholder="DD-MM-YYYY"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <div className={labelCls}>
                  Jenis Transaksi{requiredStar}
                </div>
                <Select value={jenis} onValueChange={(v) => setJenis(v as any)}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    {TX_TYPES.map((t) => (
                      <SelectItem key={t} value={t} className="rounded-lg">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <div className={labelCls}>
                  Kolektor{requiredStar}
                </div>
                <Select
                  value={kolektor}
                  onValueChange={(v) => setKolektor(v as any)}
                >
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue placeholder="Pilih Kolektor" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    {COLLECTORS.map((k) => (
                      <SelectItem key={k} value={k} className="rounded-lg">
                        {k}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="h-px w-full bg-slate-200" />

              {/* Search + delete */}
              <div className="w-full">
                <div className="flex w-full items-stretch gap-2">
                  <div className="flex min-w-0 flex-1 items-stretch">
                    <Input
                      value={qNasabah}
                      onChange={(e) => setQNasabah(e.target.value)}
                      placeholder="Cari nasabah"
                      className={cn(
                        H,
                        "rounded-l-[5px] rounded-r-none",
                        "border-slate-200 bg-white text-[13px]",
                        "placeholder:text-slate-400",
                        "shadow-sm",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                      )}
                    />

                    <button
                      type="button"
                      onClick={() => setPickerOpen(true)}
                      className={cn(
                        "inline-flex w-11 items-center justify-center",
                        H,
                        "rounded-r-[5px] rounded-l-none",
                        "bg-slate-600 text-white ring-1 ring-slate-600/20",
                        "transition hover:bg-slate-700",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
                      )}
                      aria-label="Cari nasabah"
                      title="Cari"
                    >
                      <Search className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAccounts((prev) => {
                        if (prev.length === 0) return prev;
                        const removed = prev[prev.length - 1]!;
                        const nama = deriveNasabahNameByAccountNo(removed);
                        toast("Rekening dihapus", {
                          description: `${nama} • ${removed}`,
                        });
                        return prev.slice(0, -1);
                      });

                      setQNasabah("");
                    }}
                    style={{
                      backgroundColor: "#DC3545",
                      borderColor: "#DC3545",
                    }}
                    className={cn(
                      "inline-flex w-11 items-center justify-center",
                      H,
                      R,
                      "text-white ring-1 ring-[rgba(220,53,69,0.25)]",
                      "transition",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(220,53,69,0.25)]",
                    )}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "#c72f3d";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "#DC3545";
                    }}
                    aria-label="Hapus rekening terakhir"
                    title="Hapus rekening terakhir"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Divider label selalu tampil */}
                <div className="mt-5">
                  <SectionDividerLabel label="Informasi Rekening & Nasabah" />
                </div>

                {/* Preview hanya jika ada rekening */}
                {hasAccounts ? (
                  <div className="mt-4 space-y-0">
                    {selectedAccounts.map((acc, idx) => {
                      const isLast = idx === selectedAccounts.length - 1;

                      return (
                        <React.Fragment key={`${acc}-${idx}`}>
                          <LoanAccountInfoPreview
                            key={`preview-${acc}-${idx}`}
                            accountNo={acc}
                            className="mt-0"
                          />

                          {!isLast ? (
                            <div className="px-2 sm:px-3">
                              <div className="py-6">
                                <div className="h-[2px] w-full rounded-full bg-slate-200/80" />
                              </div>
                            </div>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-4 rounded-[5px] bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
                    Belum ada rekening dipilih. Klik <span className="font-semibold">Tambah Transaksi</span> untuk memilih rekening.
                  </div>
                )}

                <div className="sr-only">
                  <Separator />
                </div>
              </div>

              <div className="h-px w-full bg-slate-200" />

              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className={cn(
                  "w-full",
                  "inline-flex items-center justify-center gap-2",
                  "h-10",
                  "rounded-[5px]",
                  "bg-blue-600 text-white",
                  "ring-1 ring-blue-600/25",
                  "transition hover:bg-blue-700",
                  "text-[13px] font-semibold",
                )}
              >
                <Plus className="h-4.5 w-4.5" />
                Tambah Transaksi
              </button>

              <div className="sr-only">
                <button type="button" onClick={() => setQNasabah(qNasabah)}>
                  sync
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 sm:px-8 sm:pb-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={cn(
                  actionBtnBase,
                  "bg-[#77839A] ring-[#77839A]/25 hover:bg-[#6b768c]",
                )}
              >
                <X className={actionIconCls} strokeWidth={3} />
                Batalkan
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!tanggal.trim()) {
                    toast("Tanggal wajib diisi", {
                      description: "Silakan pilih tanggal transaksi.",
                    });
                    return;
                  }
                  if (kolektor === "Pilih Kolektor") {
                    toast("Kolektor wajib dipilih", {
                      description: "Silakan pilih kolektor terlebih dahulu.",
                    });
                    return;
                  }
                  if (selectedAccounts.length === 0) {
                    toast("Rekening pinjaman wajib dipilih", {
                      description:
                        "Klik Tambah Transaksi untuk memilih rekening pinjaman.",
                    });
                    return;
                  }

                  toast.success("Pembayaran Angsuran tersimpan (prototype)", {
                    description: `${tanggal} • ${jenis} • ${kolektor} • ${selectedAccounts.length} rekening`,
                  });
                  navigate(-1);
                }}
                className={cn(
                  actionBtnBase,
                  "bg-[#2fb300] ring-[#2fb300]/25 hover:bg-[#279800]",
                )}
              >
                <CheckSquare className={actionIconCls} strokeWidth={3} />
                Simpan
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}