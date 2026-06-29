"use client";

import * as React from "react";
import { ChevronDown, Trash2 } from "lucide-react";
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
];

const coaAccountOptions = [
  "BANK BRI KSBA CABANG RUTENG 1763-01-000063-56-0",
  "Kas Teller",
  "Kas Besar",
  "Kas Operasional",
  "Bank",
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

function CoaAccountRow({
  value,
  onChange,
  onDelete,
}: {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-[8px]">
      <div className="relative min-w-0 flex-1">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-[31px] w-full appearance-none rounded-[5px] border border-[#CBD5E1] bg-white px-3 pr-9",
            "text-[14px] font-normal text-[#526685] shadow-none outline-none",
            "focus:border-[#CBD5E1] focus:ring-0",
          )}
        >
          <option value=""></option>
          {coaAccountOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#526685]" />
      </div>

      <button
        type="button"
        onClick={onDelete}
        className={cn(
          "inline-flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-[5px]",
          "bg-[#DC3545] text-white transition hover:bg-[#c72f3d]",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
        aria-label="Hapus COA Account"
        title="Hapus"
      >
        <Trash2 className="h-[15px] w-[15px]" strokeWidth={3} />
      </button>
    </div>
  );
}

export default function EditCashAccountDialogContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const [type, setType] = React.useState("1.1 - KAS DAN SETARA KAS");
  const [code, setCode] = React.useState("1.1.1.1");
  const [name, setName] = React.useState("KAS");
  const [nominalMinus, setNominalMinus] = React.useState(false);
  const [status, setStatus] = React.useState(true);
  const [cash, setCash] = React.useState(true);
  const [coaAccounts, setCoaAccounts] = React.useState<string[]>([
    "BANK BRI KSBA CABANG RUTENG 1763-01-000063-56-0",
    "",
  ]);

  function addCoaAccount() {
    setCoaAccounts((current) => [...current, ""]);
  }

  function updateCoaAccount(index: number, value: string) {
    setCoaAccounts((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  }

  function deleteCoaAccount(index: number) {
    setCoaAccounts((current) => {
      if (current.length <= 1) return [""];
      return current.filter((_item, itemIndex) => itemIndex !== index);
    });
  }

  function save() {
    toast.success("Akun Kas diperbarui (prototype)", {
      description: `${code} • ${name}`,
    });
    onClose();
  }

  const inputClassName = cn(
    "h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
    "text-[14px] font-normal text-[#526685] shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="bg-white">
      <div className="border-b border-[#CBD5E1] px-[26px] py-[18px]">
        <div className="text-[18px] font-extrabold leading-tight text-[#1F2A3D]">
          Edit Chart of Account
        </div>
      </div>

      <div className="max-h-[calc(90vh-72px-72px)] overflow-auto px-[26px] py-[27px]">
        <div className="grid gap-[10px]">
          <div className="grid gap-[6px]">
            <FieldLabel>TYPE</FieldLabel>
            <FormSelect value={type} onChange={setType} options={typeOptions} />
          </div>

          <div className="grid gap-[6px]">
            <FieldLabel>CODE</FieldLabel>
            <Input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className={inputClassName}
            />
          </div>

          <div className="mt-[8px] grid gap-[6px]">
            <FieldLabel>NAME</FieldLabel>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value.toUpperCase())}
              className={cn(inputClassName, "uppercase")}
            />
          </div>

          <div className="grid gap-[7px]">
            <FieldLabel>NOMINAL MINUS</FieldLabel>
            <AccountingTogglePill
              checked={nominalMinus}
              onChange={setNominalMinus}
            />
          </div>

          <div className="grid gap-[7px]">
            <FieldLabel>STATUS</FieldLabel>
            <AccountingTogglePill checked={status} onChange={setStatus} />
          </div>

          <div className="grid gap-[7px]">
            <FieldLabel>CASH</FieldLabel>
            <AccountingTogglePill checked={cash} onChange={setCash} />
          </div>

          <div className="mt-[4px] grid gap-[10px]">
            <div className="flex items-center justify-between gap-3">
              <FieldLabel>COA ACCOUNT</FieldLabel>

              <button
                type="button"
                onClick={addCoaAccount}
                className={cn(
                  "h-[29px] rounded-[5px] px-4",
                  "bg-[#17A2B8] text-[13px] font-semibold text-white",
                  "transition hover:bg-[#148ea1]",
                  "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              >
                Add Item
              </button>
            </div>

            <div className="grid gap-[8px]">
              {coaAccounts.map((item, index) => (
                <CoaAccountRow
                  key={`${index}-${item}`}
                  value={item}
                  onChange={(value) => updateCoaAccount(index, value)}
                  onDelete={() => deleteCoaAccount(index)}
                />
              ))}
            </div>
          </div>
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
            onClick={onClose}
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
  );
}