"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FieldTooltip from "@/components/loans/FieldTooltip";
import {
  isLoanProductAutodebetEnabled,
  setLoanProductAutodebetEnabled,
} from "@/lib/loanProductAutodebetStore";
import { syncLoanProductAutodebetSchedules } from "@/lib/autodebetSchedulesStore";

const SCHEDULE_SECTIONS_PORTAL_CLASS =
  "loan-product-schedule-sections-portal";

const terms = [
  {
    id: "interest",
    label: "Penyesuaian Suku Bunga Pinjaman",
    tooltip:
      "Aktifkan agar suku bunga pinjaman dapat diubah sesuai kebijakan setelah rekening dibuat.",
  },
  {
    id: "arrears",
    label: "Penyesuaian Nominal Bunga Pinjaman",
    tooltip:
      "Aktifkan agar nilai tunggakan bunga pinjaman dapat diubah sesuai kebijakan setelah rekening dibuat.",
  },
  {
    id: "tenor",
    label: "Penyesuaian Jangka Waktu Pinjaman",
    tooltip:
      "Aktifkan agar jangka waktu atau tenor pinjaman dapat diubah sesuai kebijakan setelah rekening pinjaman dibuat.",
  },
] as const;

type InsufficientBalanceRule = "unpaid" | "partial-payment";

function isConsolidationLoanProductPath(pathname: string, search: string) {
  const isMainLoanProduct =
    pathname.startsWith("/loan-products") &&
    !pathname.startsWith("/loan-products/cabang");

  const isSakLoanProduct =
    pathname.startsWith("/sak-ep-cabang/loan-products") &&
    !pathname.startsWith("/sak-ep-cabang/loan-products/cabang");

  return (
    (isMainLoanProduct || isSakLoanProduct) &&
    new URLSearchParams(search).get("from") !== "cabang"
  );
}

function findLoanProductFormCard() {
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
  return Boolean(card.querySelector('[id^="mode-"]'));
}

function getProductName(card: HTMLElement) {
  const productInput = card.querySelector<HTMLInputElement>(
    'input[placeholder="Masukkan Produk Pinjaman"]',
  );

  return productInput?.value.trim() || "";
}

export default function LoanProductAutodebetScheduleSection() {
  const location = useLocation();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const [installmentTableEnabled, setInstallmentTableEnabled] =
    React.useState(false);
  const [productName, setProductName] = React.useState("");
  const [autodebetEnabled, setAutodebetEnabled] = React.useState(false);
  const [insufficientBalanceRule, setInsufficientBalanceRule] =
    React.useState<InsufficientBalanceRule>("unpaid");
  const [enabledTerms, setEnabledTerms] = React.useState<Record<string, boolean>>({
    interest: false,
    arrears: false,
    tenor: false,
  });

  React.useEffect(() => {
    if (!isConsolidationLoanProductPath(location.pathname, location.search)) {
      setTarget(null);
      setInstallmentTableEnabled(false);
      return;
    }

    let retryId = 0;
    let attempts = 0;
    let observer: MutationObserver | null = null;
    const portalTarget = document.createElement("div");
    portalTarget.className = SCHEDULE_SECTIONS_PORTAL_CLASS;

    const syncPositionAndVisibility = () => {
      const formCard = findLoanProductFormCard();
      const actionButtons = formCard ? findActionButtons(formCard) : null;

      if (!formCard || !actionButtons) {
        attempts += 1;

        if (attempts < 30) {
          retryId = window.setTimeout(syncPositionAndVisibility, 100);
        }

        return;
      }

      if (
        portalTarget.parentElement !== formCard ||
        portalTarget.nextSibling !== actionButtons
      ) {
        formCard.insertBefore(portalTarget, actionButtons);
      }

      const nextProductName = getProductName(formCard);

      setTarget(portalTarget);
      setInstallmentTableEnabled(hasInstallmentTableEnabled(formCard));

      if (nextProductName !== productName) {
        setProductName(nextProductName);
        setAutodebetEnabled(
          isLoanProductAutodebetEnabled(nextProductName, false),
        );
      }

      if (!observer) {
        observer = new MutationObserver(syncPositionAndVisibility);
        observer.observe(formCard, {
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
  }, [location.pathname, location.search, productName]);

  function updateAutodebetEnabled(enabled: boolean) {
    setAutodebetEnabled(enabled);
    setLoanProductAutodebetEnabled(productName, enabled);
    syncLoanProductAutodebetSchedules(productName, enabled);
  }

  if (!target || !installmentTableEnabled) return null;

  return createPortal(
    <section className="loan-product-schedule-extra-sections">
      <Separator className="my-6 bg-slate-200/70" />

      <div className="text-base font-semibold text-slate-900">
        <span className="inline-flex items-center">
          Proses Autodebet
          <FieldTooltip content="Aktifkan untuk memproses pembayaran angsuran secara otomatis dari rekening sumber dana yang telah ditentukan." />
        </span>
      </div>

      <div className="mt-4 grid gap-5">
        <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
          <label
            htmlFor="loan-product-autodebet-enabled"
            className="text-sm font-normal text-slate-900"
          >
            Proses Autodebet
          </label>

          <Switch
            id="loan-product-autodebet-enabled"
            checked={autodebetEnabled}
            onCheckedChange={updateAutodebetEnabled}
          />
        </div>

        {autodebetEnabled ? (
          <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
            <div className="pt-1 text-sm font-normal text-slate-900">
              Ketentuan jika saldo rekening tidak mencukupi
            </div>

            <RadioGroup
              value={insufficientBalanceRule}
              onValueChange={(value) =>
                setInsufficientBalanceRule(value as InsufficientBalanceRule)
              }
              className="grid gap-x-6 gap-y-3 sm:grid-cols-2"
            >
              <label className="flex cursor-pointer items-center gap-3 text-sm font-normal text-slate-900">
                <RadioGroupItem value="unpaid" />
                <span>Tagihan Tidak Dibayarkan (Transaksi Dinyatakan Gagal)</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 text-sm font-normal text-slate-900">
                <RadioGroupItem value="partial-payment" />
                <span>Tagihan Dibayarkan Sebagian</span>
              </label>
            </RadioGroup>
          </div>
        ) : null}
      </div>

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