"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Info, LogOut, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import FieldTooltip from "@/components/loans/FieldTooltip";
import { cn } from "@/lib/utils";
import PaymentLinkWhatsappQrDialog from "@/components/loans/products/PaymentLinkWhatsappQrDialog";
import PaymentLinkDisconnectConfirmDialog from "@/components/loans/products/PaymentLinkDisconnectConfirmDialog";
import WhatsappIcon from "@/components/icons/WhatsappIcon";

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

function isLoanProductEditPath(pathname: string) {
  return pathname.includes("/loan-products/") && pathname.endsWith("/edit");
}

function ConnectedWhatsappCard({
  onDisconnectClick,
}: {
  onDisconnectClick: () => void;
}) {
  return (
    <div className="rounded-[5px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-emerald-950">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[16px] font-semibold leading-snug">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <span>Koneksi ke Whatsapp</span>
          </div>

          <div className="ml-9 mt-2 grid gap-1 text-[14px] font-semibold leading-relaxed text-emerald-800">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-600 ring-2 ring-emerald-200" />
              Status : Terhubung ke Whatsapp
            </div>
            <div>0812 3456 7890</div>
            <div>Terhubung sejak : 7 Juli 2026, 12:46 WIB</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onDisconnectClick}
          className={cn(
            "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[5px] px-4",
            "bg-[#DC3545] text-[14px] font-semibold text-white",
            "ring-1 ring-[#DC3545]/20 transition hover:bg-[#c72f3d]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DC3545]/20",
          )}
        >
          <span>Putuskan Koneksi</span>
          <LogOut className="h-4.5 w-4.5 text-white" />
        </button>
      </div>
    </div>
  );
}

function DisconnectedWhatsappCard({
  onConnect,
}: {
  onConnect: () => void;
}) {
  return (
    <div className="rounded-[5px] border border-rose-200 bg-rose-50 px-4 py-4 text-rose-950">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[16px] font-semibold leading-snug">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white">
              <Phone className="h-4 w-4" />
            </span>
            <span>Koneksi ke Whatsapp</span>
          </div>

          <div className="ml-9 mt-2">
            <div className="flex items-center gap-2 text-[14px] font-semibold leading-relaxed text-rose-800">
              <span className="h-3 w-3 shrink-0 rounded-full bg-rose-600 ring-2 ring-rose-200" />
              Status : Belum Terhubung ke Whatsapp
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onConnect}
          className={cn(
            "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-[5px] px-4",
            "bg-[#16A34A] text-[14px] font-semibold text-white",
            "ring-1 ring-[#16A34A]/20 transition hover:bg-[#15803D]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#16A34A]/20",
          )}
        >
          <span>Hubungkan ke Whatsapp</span>
          <WhatsappIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
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
  const isEditPage = isLoanProductEditPath(location.pathname);
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  const initializedDefaultRef = React.useRef(false);
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null);
  const [whatsappQrOpen, setWhatsappQrOpen] = React.useState(false);
  const [disconnectConfirmOpen, setDisconnectConfirmOpen] = React.useState(false);
  const [whatsappConnected, setWhatsappConnected] = React.useState(isEditPage);

  React.useEffect(() => {
    setWhatsappConnected(isEditPage);
  }, [isEditPage]);

  React.useEffect(() => {
    if (initializedDefaultRef.current) return;

    if (!isEditPage || enabled) return;

    initializedDefaultRef.current = true;
    onEnabledChange(true);
  }, [enabled, isEditPage, onEnabledChange]);

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
        onConnected={() => setWhatsappConnected(true)}
      />

      <PaymentLinkDisconnectConfirmDialog
        open={disconnectConfirmOpen}
        onCancel={() => setDisconnectConfirmOpen(false)}
        onConfirm={() => {
          setDisconnectConfirmOpen(false);
          setWhatsappConnected(false);
        }}
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
                <div className="rounded-[5px] border border-blue-200 bg-blue-50 px-4 py-4 text-blue-900">
                  <div className="flex items-center gap-2 text-[16px] font-semibold leading-snug">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Info className="h-4 w-4" />
                    </span>
                    <span>Jadwal Pengiriman Pengingat Pembayaran Tagihan</span>
                  </div>

                  <div className="ml-9 mt-1 text-[14px] font-medium leading-relaxed">
                    Pengingat pembayaran tagihan akan dikirim otomatis pada 7 hari, 3
                    hari, satu hari sebelum jatuh tempo, tepat pada hari jatuh tempo
                    serta 1 hari, 3 hari, dan 7 hari setelah jatuh tempo.
                  </div>
                </div>

                {whatsappConnected ? (
                  <ConnectedWhatsappCard
                    onDisconnectClick={() => setDisconnectConfirmOpen(true)}
                  />
                ) : (
                  <DisconnectedWhatsappCard onConnect={() => setWhatsappQrOpen(true)} />
                )}
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