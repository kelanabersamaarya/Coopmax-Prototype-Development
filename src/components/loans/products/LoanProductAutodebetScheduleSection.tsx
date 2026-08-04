"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import FieldTooltip from "@/components/loans/FieldTooltip";

function isConsolidationLoanProductPath(pathname: string, search: string) {
  const isMainLoanProduct =
    pathname.startsWith("/loan-products") &&
    !pathname.startsWith("/loan-products/cabang");

  const isSakLoanProduct =
    pathname.startsWith("/sak-ep-cabang/loan-products") &&
    !pathname.startsWith("/sak-ep-cabang/loan-products/cabang");

  const isBranchForm = new URLSearchParams(search).get("from") === "cabang";

  return (isMainLoanProduct || isSakLoanProduct) && !isBranchForm;
}

function findLoanProductFormCard() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>("div"));

  const scheduleHeading = elements.find(
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

export default function LoanProductAutodebetScheduleSection() {
  const location = useLocation();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const [autodebetEnabled, setAutodebetEnabled] = React.useState(false);

  React.useEffect(() => {
    if (!isConsolidationLoanProductPath(location.pathname, location.search)) {
      setTarget(null);
      return;
    }

    let retryId = 0;
    let attempts = 0;
    let portalTarget: HTMLElement | null = null;

    const placeSection = () => {
      const formCard = findLoanProductFormCard();
      const actionButtons = formCard ? findActionButtons(formCard) : null;

      if (!formCard || !actionButtons) {
        attempts += 1;

        if (attempts < 20) {
          retryId = window.setTimeout(placeSection, 100);
        }

        return;
      }

      portalTarget = document.createElement("div");
      portalTarget.className = "loan-product-autodebet-schedule-portal";
      formCard.insertBefore(portalTarget, actionButtons);
      setTarget(portalTarget);
    };

    placeSection();

    return () => {
      window.clearTimeout(retryId);
      portalTarget?.remove();
      setTarget(null);
    };
  }, [location.pathname, location.search]);

  if (!target) return null;

  return createPortal(
    <section className="loan-product-autodebet-schedule-section">
      <Separator className="my-6 bg-slate-200/70" />

      <div className="text-base font-semibold text-slate-900">
        <span className="inline-flex items-center">
          Proses Autodebet
          <FieldTooltip content="Aktifkan untuk memproses pembayaran angsuran secara otomatis dari rekening sumber dana yang telah ditentukan." />
        </span>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
        <label
          htmlFor="loan-product-autodebet-enabled"
          className="text-sm font-normal text-slate-900"
        >
          Proses Autodebet
        </label>

        <Switch
          id="loan-product-autodebet-enabled"
          checked={autodebetEnabled}
          onCheckedChange={setAutodebetEnabled}
        />
      </div>
    </section>,
    target,
  );
}