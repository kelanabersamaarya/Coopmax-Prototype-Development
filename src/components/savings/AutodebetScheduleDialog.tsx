import * as React from "react";
import { Check, ChevronDown, Info, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

const loanAutodebetDays = "28, 29, 30, 31";

function accountValue(account: AccountOption) {
  return `${account.accountNo} - ${account.customerName} - ${account.productType}`;
}

function getAutodebetDay(date: string) {
  const match = /(\d+)/.exec(date ?? "");
  return match?.[1] ?? "";
}

function AutodebetToggle({
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

function FieldInfoTooltip() {
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-white ring-1 ring-[#2563EB]/20 transition hover:bg-[#1D4ED8]"
          aria-label="Informasi tanggal autodebet pinjaman"
          title="Informasi"
        >
          <Info className="h-3.5 w-3.5" strokeWidth={2.8} />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px] rounded-[8px] border-slate-200 bg-white px-3 py-2 text-[12px] font-medium leading-relaxed text-slate-700 shadow-xl">
        Autodebet pinjaman dilakukan otomatis di akhir bulan, yaitu antara
        tanggal 28, 29, 30, 31 sesuai tanggal terakhir pada bulan berjalan
      </TooltipContent>
    </Tooltip>
  );
}

function LoanBillingSummaryCard({
  account,
}: {
  account: AccountOption;
}) {
  const valuesByAccount: Record<
    string,
    {
      sisaPinjaman: string;
      tagihanPokok: string;
      tagihanBunga: string;
      tagihanDenda: string;
      totalTagihan: string;
    }
  > = {
    SMG260004: {
      sisaPinjaman: "10.553.571,00",
      tagihanPokok: "833.333,00",
      tagihanBunga: "83.333,00",
      tagihanDenda: "75.000,00",
      totalTagihan: "991.666,00",
    },
    "12260006": {
      sisaPinjaman: "1.040.000,00",
      tagihanPokok: "500.000,00",
      tagihanBunga: "40.000,00",
      tagihanDenda: "0,00",
      totalTagihan: "540.000,00",
    },
    "09240017": {
      sisaPinjaman: "8.900.000,00",
      tagihanPokok: "900.000,00",
      tagihanBunga: "89.000,00",
      tagihanDenda: "0,00",
      totalTagihan: "989.000,00",
    },
  };

  const summary = valuesByAccount[account.accountNo] ?? {
    sisaPinjaman: account.balance,
    tagihanPokok: "0,00",
    tagihanBunga: "0,00",
    tagihanDenda: "0,00",
    totalTagihan: "0,00",
  };

  const details = [
    { label: "Sisa Pinjaman", value: summary.sisaPinjaman },
    { label: "Tagihan Pokok", value: summary.tagihanPokok },
    { label: "Tagihan Bunga", value: summary.tagihanBunga },
    { label: "Tagihan Denda", value: summary.tagihanDenda },
    { label: "Total Tagihan", value: summary.totalTagihan },
  ];

  return (
    <div className="rounded-[5px] border border-slate-300 bg-white p-4 text-slate-900 shadow-sm">
      <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
        {account.productType}
      </div>

      <div className="mt-4 grid gap-x-7 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {details.map((detail) => (
          <div key={detail.label} className="min-w-0">
            <div className="text-[11px] font-semibold text-slate-600">
              {detail.label}
            </div>
            <div className="mt-1 text-[14px] font-extrabold tracking-tight text-slate-900">
              {detail.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalShell({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[528px]",
          "max-w-[528px] overflow-hidden rounded-[14px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

function ProcessConfirmDialog({
  open,
  isEditing,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <ModalShell open={open}>
      <div className="px-8 pb-5 pt-10 text-center sm:px-10">
        <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
          <div className="text-[54px] font-light leading-none text-[#f2b98f]">
            !
          </div>
        </div>
        <h3 className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
          {isEditing ? "Yakin untuk mengubah" : "Yakin untuk menambahkan"}
          <br />
          Jadwal Autodebet ?
        </h3>
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="h-[48px] w-[104px] rounded-[5px] bg-[#2f80ed] text-[16px] font-semibold text-white ring-2 ring-[#2f80ed]/35 transition hover:bg-[#266ed0]"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="h-[48px] w-[126px] rounded-[5px] bg-[#a6a6a6] text-[16px] font-semibold text-white ring-2 ring-[#a6a6a6]/25 transition hover:bg-[#969696]"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function ValidationErrorDialog({
  open,
  missingFields,
  onClose,
}: {
  open: boolean;
  missingFields: string[];
  onClose: () => void;
}) {
  return (
    <ModalShell open={open}>
      <div className="px-8 pb-5 pt-10 text-center sm:px-10">
        <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f87373]">
          <X className="h-[58px] w-[58px] text-[#f87373]" strokeWidth={2} />
        </div>
        <h3 className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
          Kesalahan
        </h3>
        <div className="mt-3 text-[17px] font-normal leading-relaxed text-[#3b4863]">
          {missingFields.map((field) => (
            <div key={field}>{field} wajib diisi.</div>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 h-[52px] min-w-[96px] rounded-[5px] bg-[#2f80ed] px-6 text-[16px] font-semibold text-white ring-2 ring-[#2f80ed]/35 transition hover:bg-[#266ed0]"
        >
          OK
        </button>
      </div>
    </ModalShell>
  );
}

function AutodebetDaySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const filteredDays = React.useMemo(() => {
    const normalizedQuery = query.trim();
    return normalizedQuery
      ? autodebetDays.filter((day) => day.includes(normalizedQuery))
      : autodebetDays;
  }, [query]);

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-[31px] w-full items-center justify-between rounded-[5px] border border-slate-500 bg-white px-3 text-left text-[14px] font-normal text-[#526685] shadow-none"
        aria-expanded={open}
      >
        <span className={value ? "text-[#526685]" : "text-slate-400"}>
          {value || "Pilih Tanggal Autodebet"}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[#526685] transition",
            open ? "rotate-180" : "",
          )}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[35px] z-50 overflow-hidden rounded-[2px] border border-slate-500 bg-white shadow-xl">
          <div className="border-b border-slate-200 p-2">
            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              inputMode="numeric"
              aria-label="Cari tanggal"
              className="h-[30px] rounded-[3px] border-slate-300 bg-white px-3 text-[13px] text-slate-700 shadow-none focus:border-black focus-visible:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="max-h-[210px] overflow-y-auto p-1">
            {filteredDays.length > 0 ? (
              filteredDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    onChange(day);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex h-7 w-full items-center rounded-none px-2 text-left text-[14px] font-normal transition",
                    value === day
                      ? "bg-[#5B3DF5] text-white"
                      : "text-[#002060] hover:bg-[#5B3DF5] hover:text-white",
                  )}
                >
                  {day}
                </button>
              ))
            ) : (
              <div className="px-2 py-3 text-[13px] text-slate-500">
                Tanggal tidak ditemukan.
              </div>
            )}
          </div>
        </div>
      ) : null}
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
  const [accountNo, setAccountNo] = React.useState("");
  const [autodebetDay, setAutodebetDay] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [validationErrorOpen, setValidationErrorOpen] = React.useState(false);
  const [missingFields, setMissingFields] = React.useState<string[]>([]);

  const isEditing = !!schedule;
  const isSavingsProduct = product === "Produk Simpanan";
  const isLoanProduct = product === "Produk Pinjaman";

  const selectedAccount = React.useMemo(
    () =>
      (accountOptions[product] ?? []).find(
        (account) => accountValue(account) === accountNo,
      ) ?? null,
    [accountNo, product],
  );

  React.useEffect(() => {
    if (!open) return;

    setInterMember(false);
    setProduct(schedule?.product ?? "");
    setAccountNo(schedule?.accountNo ?? "");
    setAutodebetDay(schedule ? getAutodebetDay(schedule.date) : "");
    setDescription(schedule?.description ?? "");
    setStatus(schedule?.status ?? false);
    setConfirmOpen(false);
    setValidationErrorOpen(false);
    setMissingFields([]);
  }, [open, schedule]);

  function validateForm() {
    const fields: string[] = [];

    if (!product) fields.push("Produk Tujuan");
    if (!accountNo) fields.push("No. Rekening Tujuan");
    if (isSavingsProduct && !autodebetDay) fields.push("Tanggal Autodebet");
    if (!description.trim()) fields.push("Keterangan");

    return fields;
  }

  function confirmProcess() {
    const fields = validateForm();
    setConfirmOpen(false);

    if (fields.length > 0) {
      setMissingFields(fields);
      setValidationErrorOpen(true);
      return;
    }

    onProcess({
      product,
      accountNo,
      date: isSavingsProduct
        ? `Setiap tanggal ${autodebetDay}`
        : isLoanProduct
          ? `Tanggal tersedia: ${loanAutodebetDays}`
          : "Setiap periode",
      description,
      status,
    });

    onOpenChange(false);
  }

  const inputClassName = cn(
    "autodebet-dialog-field",
    "h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
    "text-[14px] font-normal text-[#526685] shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const labelClassName = "text-[14px] font-normal text-[#002060]";

  return (
    <>
      <ProcessConfirmDialog
        open={confirmOpen}
        isEditing={isEditing}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmProcess}
      />
      <ValidationErrorDialog
        open={validationErrorOpen}
        missingFields={missingFields}
        onClose={() => setValidationErrorOpen(false)}
      />

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
                  <AutodebetToggle checked={interMember} onChange={setInterMember} />
                </div>

                <Label className={labelClassName}>Produk Tujuan</Label>
                <Select
                  value={product}
                  onValueChange={(value) => {
                    setProduct(value);
                    setAccountNo("");
                    setAutodebetDay("");
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
                    value={accountNo}
                    onValueChange={setAccountNo}
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
                          {accountValue(account)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedAccount && isLoanProduct ? (
                    <LoanBillingSummaryCard account={selectedAccount} />
                  ) : null}

                  {selectedAccount && !isLoanProduct ? (
                    <div className="grid gap-3 text-[14px] font-normal text-[#1F2A3D]">
                      <div>
                        No. Rekening :{" "}
                        <span className="font-semibold">
                          {selectedAccount.accountNo}
                        </span>
                      </div>
                      <div>
                        Nama Nasabah :{" "}
                        <span className="font-semibold">
                          {selectedAccount.customerName}
                        </span>
                      </div>
                      <div>
                        Tipe Produk :{" "}
                        <span className="font-semibold">
                          {selectedAccount.productType}
                        </span>
                      </div>
                      <div>
                        Saldo :{" "}
                        <span className="font-semibold">
                          {selectedAccount.balance}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                {isSavingsProduct ? (
                  <>
                    <Label className={labelClassName}>Tanggal Autodebet</Label>
                    <AutodebetDaySelect
                      value={autodebetDay}
                      onChange={setAutodebetDay}
                    />
                  </>
                ) : null}

                {isLoanProduct ? (
                  <>
                    <Label className="flex items-center pt-1 text-[14px] font-normal text-[#002060]">
                      Tanggal Autodebet
                      <FieldInfoTooltip />
                    </Label>
                    <Input
                      value={loanAutodebetDays}
                      readOnly
                      aria-readonly="true"
                      className="h-[31px] cursor-not-allowed rounded-[5px] border-[#CBD5E1] bg-slate-100 px-3 text-[14px] font-normal text-[#526685] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </>
                ) : null}

                <Label className={cn(labelClassName, "pt-1")}>Keterangan</Label>
                <Textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="min-h-[108px] rounded-[5px] border-[#CBD5E1] text-[14px] focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <Label className={cn(labelClassName, "pt-1")}>
                  Status Autodebet
                </Label>
                <div className="flex h-[31px] items-center">
                  <AutodebetToggle checked={status} onChange={setStatus} />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#CBD5E1] px-4 py-4">
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="h-[38px] rounded-[7px] bg-[#6F42C1] px-5 text-[14px] font-semibold text-white transition hover:bg-[#643ab0]"
              >
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
    </>
  );
}