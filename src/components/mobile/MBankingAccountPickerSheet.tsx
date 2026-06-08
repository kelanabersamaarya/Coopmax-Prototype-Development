"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const accounts = ["SK01260002 - arya"];

export default function MBankingAccountPickerSheet({
  open,
  onOpenChange,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (account: string) => void;
}) {
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    setQuery("");
  }, [open]);

  if (!open) return null;

  const filteredAccounts = accounts.filter((account) =>
    account.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="absolute inset-0 z-[90] flex items-end bg-black/50">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup pilihan rekening"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          "relative z-10 w-full rounded-t-[30px] bg-white",
          "px-4 pb-10 pt-5 shadow-[0_-18px_45px_rgba(15,23,42,0.18)]",
          "min-h-[58%]",
        )}
      >
        <div className="text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
          Pilih Rekening
        </div>

        <div className="mt-7">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari..."
            className={cn(
              "h-[40px] w-full rounded-[12px] border-0 bg-[#F1F1F1] px-5",
              "text-[16px] font-normal text-black shadow-none outline-none",
              "placeholder:text-[16px] placeholder:font-normal placeholder:text-[#8F8F8F]",
            )}
          />
        </div>

        <div className="mt-8 grid gap-5">
          {filteredAccounts.map((account) => (
            <button
              key={account}
              type="button"
              onClick={() => {
                onSelect(account);
                onOpenChange(false);
              }}
              className="w-full text-left text-[16px] font-normal leading-tight tracking-tight text-black transition active:scale-[0.99]"
            >
              {account}
            </button>
          ))}

          {filteredAccounts.length === 0 ? (
            <div className="text-[16px] font-normal text-[#8F8F8F]">
              Rekening tidak ditemukan.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}