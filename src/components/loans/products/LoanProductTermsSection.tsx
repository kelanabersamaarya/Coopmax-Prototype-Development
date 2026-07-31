"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import FieldTooltip from "@/components/loans/FieldTooltip";

const terms = [
  {
    id: "interest",
    label: "Penyesuaian Suku Bunga Pinjaman",
    tooltip:
      "Aktifkan agar suku bunga pinjaman dapat diubah sesuai kebijakan setelah rekening dibuat",
  },
  {
    id: "arrears",
    label: "Penyesuaian Tunggakan Bunga",
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
  const graceHeading = headings.find(
    (element) => element.textContent?.trim() === "Konfigurasi Grace Period",
  );

  if (!graceHeading) return null;

  return graceHeading.closest(".rounded-3xl, .rounded-\\[5px\\]");
}

function findActionButtons(card: HTMLElement) {
  return Array.from(card.children).find((child) => {
    const text = child.textContent?.toLowerCase() ?? "";
    return text.includes("batalkan") && text.includes("simpan");
  });
}

export default function LoanProductTermsSection() {
  const location = useLocation();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const [enabledTerms, setEnabledTerms] = React.useState<Record<string, boolean>>({
    interest: false,
    arrears: false,
    tenor: false,
  });

  React.useEffect(() => {
    if (!isLoanProductFormPath(location.pathname)) {
      setTarget(null);
      return;
    }

    let retryId = 0;
    let attempts = 0;
    let portalTarget: HTMLElement | null = null;

    const placeSection = () => {
      const card = findFormCard();
      const actions = card ? findActionButtons(card) : null;

      if (!card || !actions) {
        attempts += 1;

        if (attempts < 20) {
          retryId = window.setTimeout(placeSection, 100);
        }

        return;
      }

      portalTarget = document.createElement("div");
      portalTarget.className = "loan-product-terms-section-portal";
      card.insertBefore(portalTarget, actions);
      setTarget(portalTarget);
    };

    placeSection();

    return () => {
      window.clearTimeout(retryId);
      portalTarget?.remove();
      setTarget(null);
    };
  }, [location.pathname]);

  if (!target) return null;

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