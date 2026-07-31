"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

function isLoanProductFormPath(pathname: string) {
  return (
    pathname.endsWith("/loan-products/new") ||
    /\/loan-products\/[^/]+\/edit$/.test(pathname)
  );
}

function findFormCard() {
  const headings = Array.from(document.querySelectorAll<HTMLElement>("div"));
  const graceHeading = headings.find(
    (element) =>
      element.textContent?.trim() === "Konfigurasi Grace Period",
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
  const [interestAdjustment, setInterestAdjustment] = React.useState(false);
  const [interestArrearsAdjustment, setInterestArrearsAdjustment] =
    React.useState(false);
  const [tenorAdjustment, setTenorAdjustment] = React.useState(false);

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
        <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
          <div className="text-sm font-normal text-slate-900">
            Penyesuaian Suku Bunga Pinjaman
          </div>
          <Switch
            checked={interestAdjustment}
            onCheckedChange={setInterestAdjustment}
            aria-label="Penyesuaian Suku Bunga Pinjaman"
          />
        </div>

        <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
          <div className="text-sm font-normal text-slate-900">
            Penyesuaian Tunggakan Bunga
          </div>
          <Switch
            checked={interestArrearsAdjustment}
            onCheckedChange={setInterestArrearsAdjustment}
            aria-label="Penyesuaian Tunggakan Bunga"
          />
        </div>

        <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
          <div className="text-sm font-normal text-slate-900">
            Penyesuaian Jangka Waktu Pinjaman
          </div>
          <Switch
            checked={tenorAdjustment}
            onCheckedChange={setTenorAdjustment}
            aria-label="Penyesuaian Jangka Waktu Pinjaman"
          />
        </div>
      </div>
    </section>,
    target,
  );
}