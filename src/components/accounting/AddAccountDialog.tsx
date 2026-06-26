"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import AccountingTogglePill from "@/components/accounting/AccountingTogglePill";
import CashFlowSelect from "@/components/accounting/CashFlowSelect";

const typeOptions = [
  "(kosong)",
  "Aset",
  "1.1 - KAS DAN SETARA KAS",
  "1.3 - ASET TETAP",
  "1.4 - ASET TIDAK BERWUJUD",
  "1.5 - ASET LAIN-LAIN",
  "1.1.2 - Bank",
  "1.1.3 - Simpanan Pada Koperasi Lain",
  "1.3 - PIUTANG USAHA",
  "1.1.4 - Penyertaan",
  "1.3.3 - PENDAPATAN LAINNYA",
  "Liabilitas",
  "2.1 - SIMPANAN ANGGOTA",
  "2.2 - SIMPANAN KOPERASI LAIN",
  "2.13 - LIABILITAS LAIN",
  "2.12 - Dana Bagian SHU",
  "2.5 - UTANG PINJAMAN",
  "Ekuitas",
  "3.1 - EKUITAS",
  "3.1.7 - SHU Belum Dibagi",
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] font-extrabold uppercase leading-none tracking-wide text-[#72809B]">
      {children}
    </label>
  );
}

function FormSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
          "text-[14px] font-normal text-[#4B5F7B] shadow-none",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          "[&>svg]:hidden",
        )}
      >
        <SelectValue />
        <span className="ml-auto inline-flex h-4 w-4 items-center justify-center text-[#526685]">
          <ChevronDown className="h-4 w-4" />
        </span>
      </SelectTrigger>

      <SelectContent
        className={cn(
          "max-h-[320px] rounded-[5px] border-slate-200 bg-white p-0 shadow-xl",
          "[&_[data-radix-select-item-indicator]]:hidden",
          "[&_[data-slot=select-item-indicator]]:hidden",
          "[&>span.absolute.right-2]:hidden",
          "[&_[data-radix-collection-item]]:pl-4",
          "[&_[data-radix-collection-item]]:pr-4",
        )}
      >
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className={cn(
              "rounded-none px-4 py-2.5 text-[14px] font-normal text-black",
              "hover:bg-violet-600 hover:text-white",
              "focus:bg-violet-600 focus:text-white",
              "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
              "data-[state=checked]:bg-white data-[state=checked]:text-black",
              "[&_[data-radix-select-item-indicator]]:hidden",
              "[&_[data-slot=select-item-indicator]]:hidden",
              "[&>span.absolute.right-2]:hidden",
            )}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function AddAccountDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [type, setType] = React.useState("(kosong)");
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [nominalMinus, setNominalMinus] = React.useState(false);
  const [status, setStatus] = React.useState(true);
  const [cash, setCash] = React.useState(true);
  const [arusKasDebit, setArusKasDebit] = React.useState("(kosong)");
  const [arusKasKredit, setArusKasKredit] = React.useState("(kosong)");

  React.useEffect(() => {
    if (!open) return;

    setType("(kosong)");
    setCode("");
    setName("");
    setNominalMinus(false);
    setStatus(true);
    setCash(true);
    setArusKasDebit("(kosong)");
    setArusKasKredit("(kosong)");
  }, [open]);

  function save() {
    toast.success("Akun ditambahkan (prototype)", {
      description: `${code || "Kode"} • ${name || "Akun Baru"}`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[518px]",
          "max-w-[518px]",
          "max-h-[90vh] overflow-hidden",
          "rounded-[14px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="border-b border-[#CBD5E1] px-[26px] py-[18px]">
            <div className="text-[18px] font-extrabold leading-tight text-[#1F2A3D]">
              Tambah Akun
            </div>
          </div>

          <div className="max-h-[calc(90vh-72px-72px)] overflow-auto px-[26px] py-[27px]">
            <div className="grid gap-[10px]">
              <div className="grid gap-[6px]">
                <FieldLabel>Type</FieldLabel>
                <FormSelect value={type} onChange={setType} options={typeOptions} />
              </div>

              <div className="grid gap-[6px]">
                <FieldLabel>Code</FieldLabel>
                <Input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className={cn(
                    "h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
                    "text-[14px] font-normal text-[#526685] shadow-none",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  )}
                />
              </div>

              <div className="mt-[8px] grid gap-[6px]">
                <FieldLabel>Name</FieldLabel>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={cn(
                    "h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
                    "text-[14px] font-normal uppercase text-[#526685] shadow-none",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  )}
                />
              </div>

              <div className="grid gap-[7px]">
                <FieldLabel>Nominal Minus</FieldLabel>
                <AccountingTogglePill
                  checked={nominalMinus}
                  onChange={setNominalMinus}
                />
              </div>

              <div className="grid gap-[7px]">
                <FieldLabel>Status</FieldLabel>
                <AccountingTogglePill checked={status} onChange={setStatus} />
              </div>

              <div className="grid gap-[7px]">
                <FieldLabel>Cash</FieldLabel>
                <AccountingTogglePill checked={cash} onChange={setCash} />
              </div>

              {!cash ? (
                <>
                  <div className="grid gap-[6px]">
                    <FieldLabel>ARUS KAS DEBIT</FieldLabel>
                    <CashFlowSelect
                      value={arusKasDebit}
                      onChange={setArusKasDebit}
                    />
                  </div>

                  <div className="grid gap-[6px]">
                    <FieldLabel>ARUS KAS KREDIT</FieldLabel>
                    <CashFlowSelect
                      value={arusKasKredit}
                      onChange={setArusKasKredit}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="border-t border-[#CBD5E1] px-[16px] py-[19px]">
            <div className="flex justify-end gap-[8px]">
              <button
                type="button"
                onClick={save}
                className={cn(
                  "h-[32px] min-w-[61px] rounded-[5px] px-4",
                  "bg-[#635BFF] text-[14px] font-semibold text-white",
                  "transition hover:bg-[#554cf0]",
                  "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "h-[32px] min-w-[70px] rounded-[5px] border border-[#9AA8C0] bg-white px-4",
                  "text-[14px] font-normal text-[#72809B]",
                  "transition hover:bg-slate-50",
                  "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}