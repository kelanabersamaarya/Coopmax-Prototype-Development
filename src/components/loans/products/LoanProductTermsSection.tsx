"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import FieldTooltip from "@/components/loans/FieldTooltip";

const AUTODEBET_PORTAL_CLASS = "loan-product-autodebet-schedule-portal";
const TERMS_PORTAL_CLASS = "loan-product-terms-section-portal";

const terms = [
  {
    id: "interest",
    label: "Penyesuaian Suku Bunga Pinjaman",
    tooltip:
      "Aktifkan agar suku bunga pinjaman dapat diubah sesuai kebijakan setelah rekening dibuat",
  },
  {
    id: "arrears",
    label: "Penyesuaian Nominal Bunga Pinjaman",
    tooltip:
      "Aktifkan agar nilai tunggakan bunga pinjaman dapat diubah sesuai kebijakan setelah rekening dibuat",
  },
  {
    id: "tenor",
    label: "Penyesuaian Jangka Waktu Pinjaman",
    tooltip:
      "Aktifkan agar jangka waktu atau tenor pinjaman dapat diubah sesuai kebijakan setelah rekening pinjaman dibuat.",
  },
] as const;

function isLoanProductFormPath(pathname: string) {
  return (
    pathname.endsWith("/loan-products/new") ||
    /\/loan-products\/[^/]+\/edit$/.test(pathname)
  );
}

function findFormCard() {
  const headings = Array.from(document.querySelectorAll<HTMLElement>("div"));
  const scheduleHeading = headings.find(
    (element) =>
      element.textContent?.trim() === "Konfigurasi Tagihan Angsuran",
  );

  if (!scheduleHeading) return null;

  let current = scheduleHeading.parentElement;

  while (current && current !== document.body) {
    const text = current.textContent ?? "";

    if (
      text.includes("Konfigurasi Tagihan Angsuran") &&
      text.includes("Batalkan") &&
      text.includes("Simpan")
    ) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
}

function findActionButtons(card: HTMLElement) {
  return Array.from(card.children).find((child) => {
    const text = child.textContent?.toLowerCase() ?? "";
    return text.includes("batalkan") && text.includes("simpan");
  });
}

function hasInstallmentTableEnabled(card: HTMLElement) {
  return Boolean(card.querySelector('input[id^="mode-"]'));
}

export default function LoanProductTermsSection() {
  const location = useLocation();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const [installmentTableEnabled, setInstallmentTableEnabled] =
    React.useState(false);
  const [enabledTerms, setEnabledTerms] = React.useState<Record<string, boolean>>({
    interest: false,
    arrears: false,
    tenor: false,
  });

  React.useEffect(() => {
    if (!isLoanProductFormPath(location.pathname)) {
      setTarget(null);
      setInstallmentTableEnabled(false);
      return;
    }

    let retryId = 0;
    let attempts = 0;
    let observer: MutationObserver | null = null;
    const portalTarget = document.createElement("div");
    portalTarget.className = TERMS_PORTAL_CLASS;

    const syncPositionAndVisibility = () => {
      const card = findFormCard();
      const actionButtons = card ? findActionButtons(card) : null;

      if (!card || !actionButtons) {
        attempts += 1;

        if (attempts < 30) {
          retryId = window.setTimeout(syncPositionAndVisibility, 100);
        }

        return;
      }

      const autodebetTarget = card.querySelector<HTMLElement>(
        `.${AUTODEBET_PORTAL_CLASS}`,
      );
      const placementAnchor = actionButtons;

      if (
        portalTarget.parentElement !== card ||
        portalTarget.previousSibling !== autodebetTarget
      ) {
        card.insertBefore(portalTarget, placementAnchor);
      }

      setTarget(portalTarget);
      setInstallmentTableEnabled(hasInstallmentTableEnabled(card));

      if (!observer) {
        observer = new MutationObserver(syncPositionAndVisibility);
        observer.observe(card, {
          childList: true,
          subtree: true,
        });
      }
    };

    syncPositionAndVisibility();

    return () => {
      window.clearTimeout(retryId);
      observer?.disconnect();
      portalTarget.remove();
      setTarget(null);
      setInstallmentTableEnabled(false);
    };
  }, [location.pathname]);

  if (!target || !installmentTableEnabled) return null;

  return createPortal(
    <section className="loan-product-terms-section">
      <Separator className="my-6 bg-slate-200/70" />

      <div className="text-base font-semibold text-slate-900">
        Ketentuan Produk Pinjaman
      </div>

      <div className="mt-4 grid gap-5">
        {terms.map((term) => (
          <div
            key={term.id}
            className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center"
          >
            <div className="inline-flex items-center text-sm font-normal text-slate-900">
              {term.label}
              <FieldTooltip content={term.tooltip} />
            </div>

            <Switch
              checked={enabledTerms[term.id]}
              onCheckedChange={(checked) =>
                setEnabledTerms((current) => ({
                  ...current,
                  [term.id]: checked,
                }))
              }
              aria-label={term.label}
            />
          </div>
        ))}
      </div>
    </section>,
    target,
  );
}