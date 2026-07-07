"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import FieldTooltip from "@/components/loans/FieldTooltip";
import PaymentLinkWhatsappQrDialog from "@/components/loans/products/PaymentLinkWhatsappQrDialog";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
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
  const [whatsappQrOpen, setWhatsappQrOpen] = React.useState(false);

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
      <PaymentLinkWhatsappQrDialog
        open={whatsappQrOpen}
        onOpenChange={setWhatsappQrOpen}
      />

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
                <div className="rounded-[5px] border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900">
                  <div className="flex items-center gap-2 text-[16px] font-semibold leading-snug">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Info className="h-4 w-4" />
                    </span>
                    Jadwal Pengiriman Pengingat Pembayaran Tagihan
                  </div>

                  <div className="mt-3 text-[14px] font-medium leading-relaxed">
                    Pengingat pembayaran tagihan akan dikirim otomatis pada 7 hari, 3
                    hari, satu hari sebelum jatuh tempo, tepat pada hari jatuh tempo
                    serta 1 hari, 3 hari, dan 7 hari setelah jatuh tempo.
                  </div>
                </div>

                <div className="rounded-[5px] border border-rose-200 bg-rose-50 px-4 py-3 text-rose-950">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="text-[16px] font-semibold leading-snug">
                        Koneksi ke Whatsapp
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-[14px] font-medium leading-relaxed text-rose-800">
                        <span className="h-3 w-3 shrink-0 rounded-full bg-rose-600 ring-2 ring-rose-200" />
                        Status : Belum Terhubung ke Whatsapp
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setWhatsappQrOpen(true)}
                      className={cn(
                        "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[5px] px-4",
                        "bg-emerald-600 text-[14px] font-semibold text-white",
                        "ring-1 ring-emerald-600/20 transition hover:bg-emerald-700",
                        "focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600/20",
                      )}
                    >
                      <span>Hubungan ke Whatsapp</span>
                      <WhatsappIcon className="h-4.5 w-4.5 text-white" />
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