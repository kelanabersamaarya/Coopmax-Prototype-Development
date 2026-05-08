import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import LoanAccountPickerDialog from "@/components/loans/LoanAccountPickerDialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import LoanWriteoffAccountSummary from "@/components/loans/LoanWriteoffAccountSummary";
import LoanWriteoffSectionHeader from "@/components/loans/LoanWriteoffSectionHeader";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const H = "h-[30px]";
const R = "rounded-[5px]";

function toDmyFromIso(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((iso ?? "").trim());
  if (!m) return "";
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function FieldRow({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
      <div className="text-[14px] font-normal text-slate-900">
        {label}
        {required ? <span className="text-rose-600">*</span> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function deriveNasabahNameByAccountNo(accountNo: string) {
  if (accountNo === "12260006") return "Pangeran Sirait";
  if (accountNo === "12260002") return "gaby";
  if (accountNo === "12260001") return "Rika Wastuti";
  if (accountNo === "210260001") return "Jenan Aditama";
  if (accountNo === "072260001") return "Rika Wastuti";
  return "Nasabah";
}

export default function LoanPemutihanDaftar() {
  const [qNasabah, setQNasabah] = React.useState("");
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const [tanggal, setTanggal] = React.useState(() => {
    const todayIso = new Date().toISOString().slice(0, 10);
    return toDmyFromIso(todayIso) || "06-05-2026";
  });

  const [nominal, setNominal] = React.useState("0,00");
  const [keterangan, setKeterangan] = React.useState("");
  const [confirm, setConfirm] = React.useState(false);

  function openPicker() {
    setPickerOpen(true);
  }

  const selectedAccountNo = qNasabah.trim();
  const showSummary = selectedAccountNo.length > 0;

  const summary = React.useMemo(() => {
    if (!showSummary) return null;

    const nama = deriveNasabahNameByAccountNo(selectedAccountNo);

    // Prototype numbers (bisa diganti data real nanti)
    const sisaPokok = "10.553.571,00";
    const sisaBunga = "1.266.429,00";
    const sisaDenda = "0,00";

    const totalKewajibanBerjalan = "11.820.000,00";

    return {
      nama,
      sisaPokok,
      sisaBunga,
      sisaDenda,
      totalKewajibanBerjalan,
    };
  }, [selectedAccountNo, showSummary]);

  // Detail Pemutihan Pinjaman (prototype values) — semua default nominal = 0,00
  const detail = React.useMemo(() => {
    if (!showSummary)
      return {
        bayarPokok: "0,00",
        bayarBunga: "0,00",
        bayarHutang: "0,00",
      };

    return {
      bayarPokok: "0,00",
      bayarBunga: "0,00",
      bayarHutang: "0,00",
    };
  }, [showSummary]);

  React.useEffect(() => {
    if (showSummary) return;
    setNominal("0,00");
    setKeterangan("");
    setConfirm(false);
  }, [showSummary]);

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <LoanAccountPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        query={qNasabah}
        onPick={(accountNo) => {
          setQNasabah(accountNo);
          setPickerOpen(false);
          toast.success("Rekening dipilih", { description: accountNo });
        }}
      />

      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Pemutihan Pinjaman
          </h1>
          <div className="text-base font-semibold text-slate-600">Tambah</div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur">
          <div className="grid gap-[15px]">
            {/* 1) No. Rekening + tombol cari */}
            <FieldRow label="No. Rekening" required>
              <div className="flex w-full items-stretch">
                <Input
                  value={qNasabah}
                  onChange={(e) => setQNasabah(e.target.value)}
                  placeholder="Cari nasabah"
                  className={cn(
                    H,
                    "min-w-0 w-full",
                    "rounded-l-[5px] rounded-r-none",
                    "border-slate-300 bg-white text-[14px] font-medium text-slate-900",
                    "shadow-sm",
                    "placeholder:text-slate-500",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  )}
                />

                <button
                  type="button"
                  onClick={openPicker}
                  className={cn(
                    H,
                    "w-11 shrink-0",
                    "rounded-r-[5px] rounded-l-none",
                    "bg-[#6B7A90] text-white",
                    "ring-1 ring-[#6B7A90]/20 transition hover:bg-[#5f6d82]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
                  )}
                  aria-label="Cari"
                  title="Cari"
                >
                  <Search className="mx-auto h-4.5 w-4.5" />
                </button>
              </div>
            </FieldRow>

            {/* Header + Ringkasan rekening (muncul setelah pilih rekening) */}
            {showSummary && summary ? (
              <div className="mt-2">
                <LoanWriteoffSectionHeader title="Informasi Rekening" />

                <LoanWriteoffAccountSummary
                  className="mt-4"
                  accountNo={selectedAccountNo}
                  customerName={summary.nama}
                  sisaPokok={summary.sisaPokok}
                  sisaBunga={summary.sisaBunga}
                  sisaDenda={summary.sisaDenda}
                  totalKewajibanBerjalan={summary.totalKewajibanBerjalan}
                />

                <div className="mt-3 text-center text-[13px] font-semibold tracking-tight text-slate-800">
                  Detail Pemutihan Pinjaman
                </div>

                {/* Divider persis di bawah teks Detail Pemutihan Pinjaman */}
                <Separator className="mt-3 bg-slate-200/70" />

                {/* Form Detail Pemutihan Pinjaman */}
                <div className="mt-4 grid gap-[15px]">
                  <FieldRow label="Tanggal" required>
                    <DatePickerDmyField
                      value={tanggal}
                      onChange={setTanggal}
                      inputClassName={cn(
                        H,
                        R,
                        "border-slate-300 bg-white pr-11 text-[14px] font-medium text-slate-900",
                        "shadow-sm",
                      )}
                      popoverAlign="end"
                      placeholder="DD-MM-YYYY"
                    />
                  </FieldRow>

                  <FieldRow label="Jenis Transaksi" required>
                    <Input
                      value="Pemutihan Pinjaman"
                      readOnly
                      className={cn(
                        H,
                        R,
                        "w-full",
                        "border-slate-300 bg-slate-200/70 text-[14px] font-medium text-slate-800",
                        "shadow-sm",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                      )}
                    />
                  </FieldRow>

                  <FieldRow label="Nominal">
                    <Input
                      value={nominal}
                      onChange={(e) => setNominal(e.target.value)}
                      className={cn(
                        H,
                        R,
                        "w-full",
                        "border-slate-300 bg-white text-[14px] font-medium text-slate-900",
                        "shadow-sm",
                        "text-left",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                      )}
                      placeholder="0,00"
                      inputMode="decimal"
                    />
                  </FieldRow>

                  <FieldRow label="Bayar Pokok">
                    <Input
                      value={detail?.bayarPokok ?? "0,00"}
                      readOnly
                      className={cn(
                        H,
                        R,
                        "w-full",
                        "border-slate-300 bg-slate-200/70 text-[14px] font-medium text-slate-800",
                        "shadow-sm",
                        "text-left",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                      )}
                    />
                  </FieldRow>

                  <FieldRow label="Bayar Bunga">
                    <Input
                      value={detail?.bayarBunga ?? "0,00"}
                      readOnly
                      className={cn(
                        H,
                        R,
                        "w-full",
                        "border-slate-300 bg-slate-200/70 text-[14px] font-medium text-slate-800",
                        "shadow-sm",
                        "text-left",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                      )}
                    />
                  </FieldRow>

                  <FieldRow label="Bayar Hutang Bunga">
                    <Input
                      value={detail?.bayarHutang ?? "0,00"}
                      readOnly
                      className={cn(
                        H,
                        R,
                        "w-full",
                        "border-slate-300 bg-slate-200/70 text-[14px] font-medium text-slate-800",
                        "shadow-sm",
                        "text-left",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                      )}
                    />
                  </FieldRow>

                  <FieldRow label="Keterangan">
                    <Textarea
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                      className={cn(
                        "min-h-[96px]",
                        R,
                        "w-full",
                        "border-slate-300 bg-white text-[14px] font-medium text-slate-900",
                        "shadow-sm",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                      )}
                      placeholder="Tulis keterangan…"
                    />
                  </FieldRow>

                  <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                    <div className="hidden sm:block" />
                    <label className="flex items-center gap-3 text-[14px] font-medium text-slate-900">
                      <Checkbox
                        checked={confirm}
                        onCheckedChange={(v) => setConfirm(!!v)}
                      />
                      Yakin untuk melunasi pemutihan pinjaman ini
                    </label>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="sr-only">
            <div>{R}</div>
          </div>
        </div>
      </div>
    </div>
  );
}