"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type AutodebetSchedule = {
  product: string;
  accountNo: string;
  date: string;
  description: string;
  status: boolean;
};

type AccountOption = {
  accountNo: string;
  customerName: string;
  productType: string;
  balance: string;
};

const accountOptions: Record<string, AccountOption[]> = {
  "Produk Simpanan": [
    {
      accountNo: "SMG250001",
      customerName: "Rika Wastuti",
      productType: "Simpanan Multiguna",
      balance: "2.500.000,00",
    },
    {
      accountNo: "4260029",
      customerName: "Pangeran Sirait",
      productType: "Simpanan Sukarela",
      balance: "2.750.000,00",
    },
  ],
  "Produk Pinjaman": [
    {
      accountNo: "09240017",
      customerName: "Rika Wastuti",
      productType: "Pinjaman Bulanan",
      balance: "8.900.000,00",
    },
    {
      accountNo: "SMG260004",
      customerName: "Bapak Bagus",
      productType: "Pinjaman Billing",
      balance: "10.553.571,00",
    },
    {
      accountNo: "12260006",
      customerName: "Pangeran Sirait",
      productType: "Pinjaman Bulanan",
      balance: "1.040.000,00",
    },
  ],
};

const autodebetDays = Array.from({ length: 31 }, (_, index) =>
  String(index + 1),
);

function accountValue(account: AccountOption) {
  return `${account.accountNo} - ${account.customerName} - ${account.productType}`;
}

function getAutodebetDay(date: string) {
  const match = /(\d+)/.exec(date ?? "");
  return match?.[1] ?? "";
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[22px] w-[49px] items-center rounded-full p-[3px]",
        checked ? "bg-[#635BFF]" : "bg-[#A89BFF]",
      )}
      aria-pressed={checked}
    >
      <span
        className={cn(
          "absolute text-[9px] font-bold text-white",
          checked ? "left-[7px]" : "right-[7px]",
        )}
      >
        {checked ? "ON" : "OFF"}
      </span>
      <span
        className={cn(
          "h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[27px]" : "translate-x-0",
        )}
      />
    </button>
  );
}

function AccountSummary({
  account,
  isLoan,
}: {
  account: AccountOption;
  isLoan: boolean;
}) {
  const details = isLoan
    ? [
        ["Total Pinjaman", account.accountNo === "SMG260004" ? "12.000.000,00" : account.balance],
        ["Sisa Pinjaman", account.balance],
        ["Tagihan Pokok", "833.333,00"],
        ["Tagihan Bunga", "83.333,00"],
        ["Tagihan Denda", "75.000,00"],
        ["Total Tagihan", "991.666,00"],
      ]
    : [
        ["No. Rekening", account.accountNo],
        ["Nama Nasabah", account.customerName],
        ["Produk Simpanan", account.productType],
        ["Saldo Simpanan", account.balance],
        ["Bunga per Tahun", "3,00%"],
      ];

  return (
    <div className="rounded-[5px] border border-slate-300 bg-white p-4 shadow-sm">
      <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
        {isLoan ? "Informasi Pinjaman" : "Informasi Rekening"}
      </div>

      <div className="mt-4 grid gap-x-7 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {details.map(([label, value]) => (
          <div key={label}>
            <div className="text-[11px] font-semibold text-slate-600">
              {label}
            </div>
            <div className="mt-1 text-[14px] font-extrabold text-slate-900">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AutodebetScheduleDialog({
  open,
  onOpenChange,
  schedule,
  onProcess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule?: AutodebetSchedule | null;
  onProcess: (schedule: AutodebetSchedule) => void;
}) {
  const [interMember, setInterMember] = React.useState(false);
  const [product, setProduct] = React.useState("");
  const [selectedAccountValue, setSelectedAccountValue] = React.useState("");
  const [autodebetDay, setAutodebetDay] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [error, setError] = React.useState("");

  const isSavingsProduct = product === "Produk Simpanan";
  const isLoanProduct = product === "Produk Pinjaman";

  const selectedAccount = React.useMemo(
    () =>
      (accountOptions[product] ?? []).find(
        (account) => accountValue(account) === selectedAccountValue,
      ) ?? null,
    [product, selectedAccountValue],
  );

  React.useEffect(() => {
    if (!open) return;

    setInterMember(false);
    setProduct(schedule?.product ?? "");
    setSelectedAccountValue(schedule?.accountNo ?? "");
    setAutodebetDay(schedule ? getAutodebetDay(schedule.date) : "");
    setDescription(schedule?.description ?? "");
    setStatus(schedule?.status ?? false);
    setError("");
  }, [open, schedule]);

  function save() {
    const missing: string[] = [];

    if (!product) missing.push("Produk Tujuan");
    if (!selectedAccountValue) missing.push("No. Rekening Tujuan");
    if (isSavingsProduct && !autodebetDay) missing.push("Tanggal Autodebet");
    if (!description.trim()) missing.push("Keterangan");

    if (missing.length > 0) {
      setError(`${missing.join(", ")} wajib diisi.`);
      return;
    }

    onProcess({
      product,
      accountNo: selectedAccountValue,
      date: isSavingsProduct
        ? `Setiap tanggal ${autodebetDay}`
        : "Otomatis mengikuti jadwal pinjaman",
      description: description.trim(),
      status,
    });

    onOpenChange(false);
  }

  const inputClassName =
    "h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3 text-[14px] font-normal text-[#526685] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";
  const labelClassName = "text-[14px] font-normal text-[#002060]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[760px]",
          "max-w-[760px] overflow-hidden rounded-[14px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between border-b border-[#CBD5E1] px-5 py-4">
            <h2 className="text-[18px] font-bold leading-tight text-[#1F2A3D]">
              Jadwal Autodebet
            </h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" strokeWidth={3} />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-auto px-5 py-8 sm:px-10">
            <div className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start">
              <Label className={cn(labelClassName, "pt-1")}>
                Transaksi Rekening
                <br />
                Anggota/Nasabah lain
              </Label>
              <div className="flex h-[31px] items-center">
                <Toggle checked={interMember} onChange={setInterMember} />
              </div>

              <Label className={labelClassName}>Produk Tujuan</Label>
              <Select
                value={product}
                onValueChange={(value) => {
                  setProduct(value);
                  setSelectedAccountValue("");
                  setAutodebetDay("");
                  setError("");
                }}
              >
                <SelectTrigger className={inputClassName}>
                  <SelectValue placeholder="Pilih Produk" />
                </SelectTrigger>
                <SelectContent className="rounded-[5px] border-slate-200">
                  <SelectItem value="Produk Simpanan">Produk Simpanan</SelectItem>
                  <SelectItem value="Produk Pinjaman">Produk Pinjaman</SelectItem>
                </SelectContent>
              </Select>

              <Label className={labelClassName}>No. Rekening Tujuan</Label>
              <div className="grid gap-4">
                <Select
                  value={selectedAccountValue}
                  onValueChange={(value) => {
                    setSelectedAccountValue(value);
                    setError("");
                  }}
                  disabled={!product}
                >
                  <SelectTrigger
                    className={cn(
                      inputClassName,
                      !product ? "bg-slate-100 text-slate-400" : "",
                    )}
                  >
                    <SelectValue placeholder="Pilih Rekening" />
                  </SelectTrigger>

                  <SelectContent className="rounded-[5px] border-slate-200">
                    {(accountOptions[product] ?? []).map((account) => (
                      <SelectItem
                        key={account.accountNo}
                        value={accountValue(account)}
                      >
                        {account.customerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedAccount ? (
                  <AccountSummary
                    account={selectedAccount}
                    isLoan={isLoanProduct}
                  />
                ) : null}
              </div>

              {isSavingsProduct ? (
                <>
                  <Label className={labelClassName}>Tanggal Autodebet</Label>
                  <Select value={autodebetDay} onValueChange={setAutodebetDay}>
                    <SelectTrigger className={inputClassName}>
                      <SelectValue placeholder="Pilih Tanggal Autodebet" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[240px] rounded-[5px] border-slate-200">
                      {autodebetDays.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : null}

              <Label className={cn(labelClassName, "pt-1")}>Keterangan</Label>
              <Textarea
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setError("");
                }}
                className="min-h-[108px] rounded-[5px] border-[#CBD5E1] text-[14px] focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <Label className={cn(labelClassName, "pt-1")}>
                Status Autodebet
              </Label>
              <div className="flex h-[31px] items-center">
                <Toggle checked={status} onChange={setStatus} />
              </div>
            </div>

            {error ? (
              <div className="mt-5 rounded-[5px] bg-rose-50 px-4 py-3 text-[13px] font-semibold text-rose-700 ring-1 ring-rose-200">
                {error}
              </div>
            ) : null}
          </div>

          <div className="flex justify-end gap-3 border-t border-[#CBD5E1] px-4 py-4">
            <button
              type="button"
              onClick={save}
              className="inline-flex h-[38px] items-center gap-2 rounded-[7px] bg-[#6F42C1] px-5 text-[14px] font-semibold text-white transition hover:bg-[#643ab0]"
            >
              <Check className="h-4 w-4" strokeWidth={3} />
              Proses
            </button>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-[7px] bg-[#77839A] px-4 text-[14px] font-semibold text-white transition hover:bg-[#6b768c]"
            >
              <X className="h-4 w-4" strokeWidth={3} />
              Tutup
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}