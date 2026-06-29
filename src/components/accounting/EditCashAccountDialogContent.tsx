"use client";

import * as React from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import AccountingTogglePill from "@/components/accounting/AccountingTogglePill";

const coaOptions = [
  "BANK BRI KSBA CABANG RUTENG 1763-01-000063-56-0",
  "Kas Teller",
  "Kas Besar",
  "Kas Operasional",
  "Bank",
];

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
          {coaOptions.map((option) => (
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
  const [enabled, setEnabled] = React.useState(true);
  const [items, setItems] = React.useState<string[]>([
    "BANK BRI KSBA CABANG RUTENG 1763-01-000063-56-0",
    "",
  ]);

  function addItem() {
    setItems((current) => [...current, ""]);
  }

  function updateItem(index: number, value: string) {
    setItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  }

  function deleteItem(index: number) {
    setItems((current) => {
      if (current.length <= 1) return [""];
      return current.filter((_item, itemIndex) => itemIndex !== index);
    });
  }

  function save() {
    toast.success("Akun Kas diperbarui (prototype)", {
      description: "COA Account berhasil diperbarui.",
    });
    onClose();
  }

  return (
    <div className="bg-white">
      <div className="px-[26px] py-[27px]">
        <div className="grid gap-[14px]">
          <div>
            <AccountingTogglePill checked={enabled} onChange={setEnabled} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-[11px] font-extrabold uppercase leading-none tracking-wide text-[#72809B]">
              COA Account
            </div>

            <button
              type="button"
              onClick={addItem}
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
            {items.map((item, index) => (
              <CoaAccountRow
                key={`${index}-${item}`}
                value={item}
                onChange={(value) => updateItem(index, value)}
                onDelete={() => deleteItem(index)}
              />
            ))}
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