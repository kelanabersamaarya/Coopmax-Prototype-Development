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

      <SelectContent className="rounded-[5px] border-slate-200">
        {options.map((option) => (
          <SelectItem key={option} value={option} className="rounded-[5px]">
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
                <FormSelect
                  value={type}
                  onChange={setType}
                  options={["(kosong)", "Detail", "Header"]}
                />
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
                    <FormSelect
                      value={arusKasDebit}
                      onChange={setArusKasDebit}
                      options={["(kosong)", "Operasional", "Investasi", "Pendanaan"]}
                    />
                  </div>

                  <div className="grid gap-[6px]">
                    <FieldLabel>ARUS KAS KREDIT</FieldLabel>
                    <FormSelect
                      value={arusKasKredit}
                      onChange={setArusKasKredit}
                      options={["(kosong)", "Operasional", "Investasi", "Pendanaan"]}
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