"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DebtField = { label: string; value: string };

const changeHistory = [
  {
    date: "07-04-2026 10:35",
    user: "Gusman",
    description: "Penyesuaian tunggakan pokok berdasarkan verifikasi pembayaran.",
  },
];

function AccountField({ label, value }: DebtField) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-semibold text-white/85">{label}</div>
      <div className="mt-1 break-words text-[14px] font-extrabold leading-snug text-white">
        {value}
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  before,
  after,
}: {
  label: string;
  before: string;
  after: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] gap-3 border-t border-slate-100 px-4 py-3 text-[13px]">
      <div className="font-medium text-slate-800">{label}</div>
      <div className="text-right tabular-nums text-slate-600">{before}</div>
      <div className="text-right font-bold tabular-nums text-[#5B3DF5]">
        {after}
      </div>
    </div>
  );
}

function ConfirmationDialog({
  open,
  onCancel,
  onYes,
}: {
  open: boolean;
  onCancel: () => void;
  onYes: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? onCancel() : null)}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] max-w-[528px] overflow-hidden rounded-[5px]",
          "border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="px-8 pb-5 pt-10 text-center sm:px-10">
          <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <div className="text-[54px] font-light leading-none text-[#f2b98f]">
              !
            </div>
          </div>

          <h3 className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Yakin untuk melakukan perubahan?
          </h3>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onYes}
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
      </DialogContent>
    </Dialog>
  );
}

export default function LoanDebtChangeWizard({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [step, setStep] = React.useState(1);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [principalDebt, setPrincipalDebt] = React.useState("0,00");
  const [interestDebt, setInterestDebt] = React.useState("0,00");
  const [otherDebt, setOtherDebt] = React.useState("0,00");

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setHistoryOpen(false);
    setPrincipalDebt("0,00");
    setInterestDebt("0,00");
    setOtherDebt("0,00");
  }, [open]);

  const fields: DebtField[] = [
    { label: "No. Rek. Pinjaman", value: accountNo },
    { label: "Nama Anggota / Debitur", value: "Bapak Bagus" },
    { label: "Produk Pinjaman", value: "Pinjaman Billing" },
    { label: "Status Pinjaman", value: "Aktif / Sudah Dicairkan" },
    { label: "Baki Debet Pokok", value: "10.553.571,00" },
    { label: "Tunggakan Pokok", value: "0,00" },
    { label: "Tunggakan Bunga", value: "0,00" },
    { label: "Denda dan Biaya Lainnya", value: "0,00" },
    { label: "Total Kewajiban", value: "10.553.571,00" },
  ];

  function nextStep() {
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }

    toast.success("Perubahan hutang tersimpan", {
      description: `Rekening ${accountNo} berhasil diperbarui.`,
    });
    onOpenChange(false);
  }

  return (
    <>
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent
          className={cn(
            "w-[calc(100vw-1rem)] max-w-[760px] overflow-hidden",
            "rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
            "[&>button[aria-label=Close]]:hidden",
            "[&>button.absolute.right-4.top-4]:hidden",
            "[&_[data-slot=dialog-close]]:hidden",
          )}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <h3 className="text-[18px] font-extrabold text-slate-900">
              Riwayat Perubahan Hutang
            </h3>
            <button
              type="button"
              onClick={() => setHistoryOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {changeHistory.map((item) => (
              <div
                key={item.date}
                className="rounded-[10px] bg-slate-50 p-4 ring-1 ring-slate-200"
              >
                <div className="text-[13px] font-extrabold text-slate-900">
                  {item.date}
                </div>
                <div className="mt-1 text-[12px] font-semibold text-[#5B3DF5]">
                  {item.user}
                </div>
                <div className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={false}
        onCancel={() => {}}
        onYes={() => {}}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          data-loan-debt-wizard="true"
          className={cn(
            "w-[calc(100vw-1rem)] sm:w-[860px]",
            "max-w-[860px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
            "[&>button[aria-label=Close]]:hidden",
            "[&>button.absolute.right-4.top-4]:hidden",
            "[&_[data-slot=dialog-close]]:hidden",
          )}
        >
          <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-[18px] font-extrabold leading-tight tracking-tight text-slate-900">
              Ubah Hutang Pinjaman
            </h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex items-center justify-center gap-3 overflow-x-auto px-6 py-5">
            {[1, 2, 3].map((number) => (
              <React.Fragment key={number}>
                <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
                  <span
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-full text-[18px] font-extrabold",
                      number <= step
                        ? "bg-[#5B3DF5] text-white"
                        : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {number}
                  </span>
                  <span
                    className={cn(
                      "text-[12px] font-semibold leading-tight",
                      step === number ? "text-slate-900" : "text-slate-500",
                    )}
                  >
                    {number === 1
                      ? "Informasi Pinjaman"
                      : number === 2
                        ? "Simulasi"
                        : "Simpan Perubahan"}
                  </span>
                </div>

                {number < 3 ? (
                  <div
                    className={cn(
                      "mb-5 h-[2px] min-w-10 flex-1",
                      number < step ? "bg-[#5B3DF5]" : "bg-slate-200",
                    )}
                  />
                ) : null}
              </React.Fragment>
            ))}
          </div>

          <Separator className="bg-slate-200" />

          <main className="max-h-[58vh] overflow-auto px-6 pb-6 pt-0 sm:px-8">
            {step === 1 ? (
              <div className="rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-[14px] font-extrabold tracking-wide">
                    INFORMASI REKENING PINJAMAN
                  </div>
                  <button
                    type="button"
                    onClick={() => setHistoryOpen(true)}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-[5px] bg-white px-3 text-[12px] font-semibold text-[#168294]"
                  >
                    <Clock3 className="h-4 w-4" />
                    Lihat Riwayat Perubahan
                  </button>
                </div>

                <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                  {fields.map((field) => (
                    <AccountField key={field.label} {...field} />
                  ))}
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-6 pt-6">
                <div>
                  <h3 className="text-[14px] font-bold uppercase tracking-wide text-black">
                    Simulasi Perubahan Hutang
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                    Masukkan penyesuaian kewajiban untuk melihat ringkasan sebelum
                    disimpan.
                  </p>
                </div>

                <div className="grid gap-4 rounded-[12px] border border-slate-200 bg-[#F9FAFF] p-5">
                  {[
                    {
                      label: "Tunggakan Pokok Baru",
                      value: principalDebt,
                      onChange: setPrincipalDebt,
                    },
                    {
                      label: "Tunggakan Bunga Baru",
                      value: interestDebt,
                      onChange: setInterestDebt,
                    },
                    {
                      label: "Denda dan Biaya Lainnya",
                      value: otherDebt,
                      onChange: setOtherDebt,
                    },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className="grid gap-2 sm:grid-cols-[200px_minmax(0,1fr)] sm:items-center"
                    >
                      <label className="text-[14px] text-[#002060]">
                        {field.label}
                      </label>
                      <Input
                        value={field.value}
                        onChange={(event) => field.onChange(event.target.value)}
                        className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        inputMode="decimal"
                      />
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] gap-3 bg-[#F9FAFF] px-4 py-3 text-[12px] font-bold uppercase text-black">
                    <span>Informasi</span>
                    <span className="text-right">Sebelum</span>
                    <span className="text-right">Simulasi</span>
                  </div>
                  <SummaryRow
                    label="Tunggakan Pokok"
                    before="0,00"
                    after={principalDebt || "0,00"}
                  />
                  <SummaryRow
                    label="Tunggakan Bunga"
                    before="0,00"
                    after={interestDebt || "0,00"}
                  />
                  <SummaryRow
                    label="Denda dan Biaya"
                    before="0,00"
                    after={otherDebt || "0,00"}
                  />
                  <SummaryRow
                    label="Total Kewajiban"
                    before="10.553.571,00"
                    after="10.553.571,00 + penyesuaian"
                  />
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-6 pt-6">
                <div>
                  <h3 className="text-[14px] font-bold uppercase tracking-wide text-black">
                    Simpan Perubahan Hutang
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                    Periksa kembali penyesuaian berikut sebelum menyimpan.
                  </p>
                </div>

                <div className="rounded-[12px] border border-slate-200 bg-[#F9FAFF] p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-[12px] font-semibold text-slate-500">
                        Rekening Pinjaman
                      </div>
                      <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                        {accountNo}
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-slate-500">
                        Nama Debitur
                      </div>
                      <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                        Bapak Bagus
                      </div>
                    </div>
                  </div>

                  <Separator className="my-5 bg-slate-200" />

                  <div className="grid gap-4">
                    {[
                      { label: "Tunggakan Pokok", value: principalDebt },
                      { label: "Tunggakan Bunga", value: interestDebt },
                      { label: "Denda dan Biaya Lainnya", value: otherDebt },
                    ].map((field) => (
                      <div
                        key={field.label}
                        className="flex items-center justify-between gap-4 text-[14px]"
                      >
                        <span className="text-slate-600">{field.label}</span>
                        <span className="font-extrabold tabular-nums text-[#5B3DF5]">
                          {field.value || "0,00"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </main>

          <footer className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            {step === 1 ? (
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[12px] font-semibold text-white transition hover:bg-[#6b768c]"
              >
                <X className="h-4 w-4" strokeWidth={3} />
                Batal
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep((current) => current - 1)}
                className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[12px] font-semibold text-white transition hover:bg-[#6b768c]"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={3} />
                Kembali
              </button>
            )}

            <button
              type="button"
              onClick={nextStep}
              className={cn(
                "inline-flex h-10 min-w-[145px] items-center justify-center gap-2 rounded-[5px] px-5 text-[12px] font-semibold text-white transition",
                step === 3
                  ? "bg-[#2fb300] hover:bg-[#279800]"
                  : "bg-[#5B3DF5] hover:bg-[#4C32D9]",
              )}
            >
              {step === 3 ? "Simpan Perubahan" : "Lanjutkan"}
              {step === 3 ? (
                <Check className="h-4 w-4" strokeWidth={3} />
              ) : (
                <ChevronRight className="h-4 w-4" strokeWidth={3} />
              )}
            </button>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  );
}