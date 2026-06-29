"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
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
import AccountingCoaAccountRows from "@/components/accounting/AccountingCoaAccountRows";
import {
  getAccountingCoaAccountEdit,
  saveAccountingCoaAccountEdit,
} from "@/lib/accountingCoaAccountStore";

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

export default function EditCashAccountDialogContent({
  onClose,
  accountCode = "1.1.1.1",
  accountName = "KAS",
}: {
  onClose: () => void;
  accountCode?: string;
  accountName?: string;
}) {
  const [type, setType] = React.useState("1.1 - KAS DAN SETARA KAS");
  const [code, setCode] = React.useState(accountCode);
  const [name, setName] = React.useState(accountName.toUpperCase());
  const [nominalMinus, setNominalMinus] = React.useState(false);
  const [status, setStatus] = React.useState(true);
  const [cash, setCash] = React.useState(true);
  const [coaAccounts, setCoaAccounts] = React.useState<string[]>([
    "BANK BRI KSBA CABANG RUTENG 1763-01-000063-56-0",
    "",
  ]);

  React.useEffect(() => {
    const saved = getAccountingCoaAccountEdit(accountCode);

    setType(saved?.type ?? "1.1 - KAS DAN SETARA KAS");
    setCode(saved?.code ?? accountCode);
    setName((saved?.name ?? accountName).toUpperCase());
    setNominalMinus(saved?.nominalMinus ?? false);
    setStatus(saved?.status ?? true);
    setCash(saved?.cash ?? true);
    setCoaAccounts(saved?.coaAccounts ?? [
      "BANK BRI KSBA CABANG RUTENG 1763-01-000063-56-0",
      "",
    ]);
  }, [accountCode, accountName]);

  function save() {
    saveAccountingCoaAccountEdit(accountCode, {
      type,
      code,
      name,
      nominalMinus,
      status,
      cash,
      coaAccounts,
      arusKasDebit: "(kosong)",
      arusKasKredit: "(kosong)",
    });

    toast.success("Akun Kas diperbarui", {
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

          <AccountingCoaAccountRows
            values={coaAccounts}
            onChange={setCoaAccounts}
          />
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