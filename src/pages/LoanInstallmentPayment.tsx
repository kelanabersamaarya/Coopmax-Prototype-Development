import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
import { CheckSquare, X } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
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
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-5 sm:px-8">
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

                  toast.success("Pembayaran Angsuran tersimpan (prototype)", {
                    description: `${tanggal} • ${jenis} • ${kolektor}`,
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