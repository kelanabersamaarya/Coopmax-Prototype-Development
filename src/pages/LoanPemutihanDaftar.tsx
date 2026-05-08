import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import LoanAccountPickerDialog from "@/components/loans/LoanAccountPickerDialog";
import { toast } from "sonner";

const H = "h-[30px]";
const R = "rounded-[5px]";

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
          {/* Search field like image #1 */}
          <div className="w-full max-w-[520px]">
            <div className="flex w-full items-stretch">
              <input
                value={qNasabah}
                onChange={(e) => setQNasabah(e.target.value)}
                placeholder="Cari nasabah"
                className={cn(
                  H,
                  "w-full min-w-0",
                  "rounded-l-[5px] rounded-r-none",
                  "border border-slate-300 bg-white px-3",
                  "text-[14px] font-medium text-slate-900",
                  "shadow-sm",
                  "placeholder:text-slate-500",
                  "focus-visible:outline-none focus-visible:ring-0",
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
          </div>

          <div className="mt-5 text-sm font-medium text-slate-700">
            Klik tombol cari untuk membuka daftar rekening pinjaman (modal).
          </div>
        </div>
      </div>
    </div>
  );
}