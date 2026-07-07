"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Info, LogOut, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import FieldTooltip from "@/components/loans/FieldTooltip";
import { cn } from "@/lib/utils";

const SECTION_TITLE = "Pengingat Pembayaran Tagihan / Payment Link";
const SECTION_TOOLTIP =
  "Aktifkan fitur ini untuk mengatur pengingat pembayaran tagihan dan tanggal berlaku Payment Link.";

type LoanProductPaymentLinkSectionProps = {
  enabled: boolean;
  onEnabledChange: (value: boolean) => void;
  publishDate: string;
  onPublishDateChange: (value: string) => void;
  expiryDate: string;
  onExpiryDateChange: (value: string) => void;
  inputClassName?: string;
  showSeparator?: boolean;
  showTitle?: boolean;
  className?: string;
};

function SectionTitle() {
  return (
    <div className="text-base font-semibold text-slate-900">
      <span className="inline-flex items-center">
        {SECTION_TITLE}
        <FieldTooltip content={SECTION_TOOLTIP} />
      </span>
    </div>
  );
}

function findLoanProductFormContainer(anchor: HTMLElement) {
  let current = anchor.parentElement;

  while (current && current !== document.body) {
    const text = current.textContent ?? "";

    const looksLikeLoanProductForm =
      text.includes("Konfigurasi Tagihan Angsuran") &&
      text.includes("Konfigurasi Grace Period") &&
      text.includes("Simpan");

    if (looksLikeLoanProductForm) return current;

    current = current.parentElement;
  }

  return null;
}

function findActionButtonsContainer(container: HTMLElement) {
  const children = Array.from(container.children).reverse();

  return (
    children.find((child) => {
      const text = child.textContent?.toLowerCase() ?? "";
      return text.includes("batalkan") && text.includes("simpan");
    }) ?? null
  );
}

export default function LoanProductPaymentLinkSection(
  props: LoanProductPaymentLinkSectionProps,
) {
  const {
    enabled,
    onEnabledChange,
    showSeparator = true,
    showTitle = true,
    className,
  } = props;

  const location = useLocation();
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  const initializedDefaultRef = React.useRef(false);
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (initializedDefaultRef.current) return;

    const isPinjamanBillingEdit =
      location.pathname.startsWith("/loan-products/") &&
      location.pathname.endsWith("/edit");

    if (!isPinjamanBillingEdit || enabled) return;

    initializedDefaultRef.current = true;
    onEnabledChange(true);
  }, [enabled, location.pathname, onEnabledChange]);

  React.useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const container = findLoanProductFormContainer(anchor);
    if (!container) return;

    const target = document.createElement("div");
    target.className = "loan-product-payment-link-portal-target";

    const actionButtons = findActionButtonsContainer(container);
    container.insertBefore(target, actionButtons);

    setPortalTarget(target);

    return () => {
      target.remove();
    };
  }, []);

  const content = (
    <div className={cn("loan-product-payment-link-section", className)}>
      {showSeparator ? <Separator className="my-6 bg-slate-200/70" /> : null}

      {showTitle ? <SectionTitle /> : null}

      <div className={cn("grid gap-5", showTitle ? "mt-4" : "")}>
        <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-start">
          <div className="text-sm font-normal text-slate-900">Payment Link</div>

          <div className="grid gap-3">
            <div className="flex items-center justify-start">
              <Switch checked={enabled} onCheckedChange={onEnabledChange} />
            </div>

            {enabled ? (
              <>
                <div className="rounded-[5px] border border-blue-200 bg-blue-50 px-4 py-4 text-blue-900">
                  <div className="flex items-center gap-2 text-[16px] font-semibold leading-snug">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Info className="h-4 w-4" />
                    </span>
                    <span>Jadwal Pengiriman Pengingat Pembayaran Tagihan</span>
                  </div>

                  <div className="mt-4 text-[14px] font-medium leading-relaxed">
                    Pengingat pembayaran tagihan akan dikirim otomatis pada 7 hari, 3
                    hari, satu hari sebelum jatuh tempo, tepat pada hari jatuh tempo
                    serta 1 hari, 3 hari, dan 7 hari setelah jatuh tempo.
                  </div>
                </div>

                <div className="rounded-[5px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-emerald-950">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[16px] font-semibold leading-snug">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                          <Phone className="h-4.5 w-4.5" />
                        </span>
                        <span>Koneksi ke Whatsapp</span>
                      </div>

                      <div className="ml-10 mt-4">
                        <div className="flex items-center gap-2 text-[14px] font-semibold leading-relaxed text-emerald-800">
                          <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-600 ring-2 ring-emerald-200" />
                          Status : Terhubung ke Whatsapp
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-[14px] font-medium leading-relaxed text-emerald-900">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                            <Phone className="h-4 w-4" />
                          </span>
                          <span>Nomor HP : 0812 3456 7890</span>
                        </div>

                        <div className="mt-1 text-[13px] font-medium leading-relaxed text-emerald-800">
                          Terhubung sejak : 7 Juli 2026, 12:46 WIB
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onEnabledChange(false)}
                      className={cn(
                        "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[5px] px-4",
                        "bg-rose-600 text-[14px] font-semibold text-white",
                        "ring-1 ring-rose-600/20 transition hover:bg-rose-700",
                        "focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-600/20",
                      )}
                    >
                      <span>Putuskan Koneksi</span>
                      <LogOut className="h-4.5 w-4.5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div ref={anchorRef} className="hidden" />
      {portalTarget
        ? createPortal(
            <div>
              <Separator className="my-6 bg-slate-200/70" />
              <SectionTitle />
              <div className="mt-4">{content}</div>
            </div>,
            portalTarget,
          )
        : content}
    </>
  );
}