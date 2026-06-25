"use client";

import * as React from "react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import LoanProductSaveSuccessModal from "@/components/loans/products/LoanProductSaveSuccessModal";

export default function LoanProductSaveConfirmGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const targetButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const bypassRef = React.useRef(false);

  const isLoanProductCreate =
    location.pathname.endsWith("/loan-products/new") ||
    location.pathname.endsWith("/obs-samudra-harta/loan-products/new") ||
    location.pathname.endsWith("/sak-ep-cabang/loan-products/new");

  const successMessage = isLoanProductCreate
    ? "Berhasil Menambahkan Data"
    : "Berhasil Memperbarui";

  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (bypassRef.current) return;

    const target = event.target as HTMLElement | null;
    const button = target?.closest("button") as HTMLButtonElement | null;

    if (!button || button.disabled) return;

    const label = (button.textContent ?? "").trim().toLowerCase();
    const isSaveButton = label.includes("simpan");

    if (!isSaveButton) return;

    event.preventDefault();
    event.stopPropagation();

    targetButtonRef.current = button;
    setConfirmOpen(true);
  }

  function showSuccessModal() {
    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  function finishSave() {
    setSuccessOpen(false);
    bypassRef.current = true;

    window.requestAnimationFrame(() => {
      targetButtonRef.current?.click();

      window.setTimeout(() => {
        bypassRef.current = false;
        targetButtonRef.current = null;
      }, 0);
    });
  }

  return (
    <div onClickCapture={handleClickCapture}>
      {children}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent
          className={cn(
            "w-[calc(100vw-2rem)] sm:w-[528px]",
            "max-w-[528px]",
            "rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
            "overflow-hidden",
            "[&>button[aria-label=Close]]:hidden",
            "[&>button.absolute.right-4.top-4]:hidden",
            "[&_[data-slot=dialog-close]]:hidden",
            "[&_[data-radix-dialog-close]]:hidden",
          )}
        >
          <div className="px-8 pb-5 pt-10 text-center sm:px-10">
            <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6] bg-white">
              <div className="text-[54px] font-light leading-none text-[#f2b98f]">
                !
              </div>
            </div>

            <div className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
              Yakin untuk menyimpan data ?
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={showSuccessModal}
                className={cn(
                  "h-[48px] w-[104px] rounded-[5px]",
                  "bg-[#2f80ed] text-[16px] font-semibold text-white",
                  "ring-2 ring-[#2f80ed]/35 transition hover:bg-[#266ed0]",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2f80ed]/25",
                )}
              >
                Yes
              </button>

              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className={cn(
                  "h-[48px] w-[126px] rounded-[5px]",
                  "bg-[#a6a6a6] text-[16px] font-semibold text-white",
                  "ring-2 ring-[#a6a6a6]/25 transition hover:bg-[#969696]",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#a6a6a6]/25",
                )}
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <LoanProductSaveSuccessModal
        open={successOpen}
        onOpenChange={setSuccessOpen}
        onOk={finishSave}
        message={successMessage}
      />
    </div>
  );
}