"use client";

import * as React from "react";
import { createPortal } from "react-dom";
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

  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null);

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
        <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
          <div className="text-sm font-normal text-slate-900">Payment Link</div>

          <div className="flex items-center justify-start">
            <Switch checked={enabled} onCheckedChange={onEnabledChange} />
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