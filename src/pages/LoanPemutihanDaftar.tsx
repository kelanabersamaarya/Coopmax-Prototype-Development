import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import LoanAccountPickerDialog from "@/components/loans/LoanAccountPickerDialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const H = "h-[30px]";
const R = "rounded-[5px]";

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

export default function LoanPemutihanDaftar() {
  const [qNasabah, setQNasabah] = React.useState("");
  const [pickerOpen, setPickerOpen] = React.useState(false);

  function openPicker() {
    setPickerOpen(true);
  }

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
            {/* No. Rekening + tombol cari */}
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

            {/* Jenis Transaksi (readonly) */}
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
          </div>

          <div className="sr-only">
            {/* keep constant used */}
            <div>{R}</div>
          </div>
        </div>
      </div>
    </div>
  );
}