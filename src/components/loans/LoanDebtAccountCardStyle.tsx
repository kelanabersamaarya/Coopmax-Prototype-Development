"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

type AccountField = {
  label: string;
  value: string;
};

const accountFields: AccountField[] = [
  { label: "Kode Pinjaman", value: "SMG260004" },
  { label: "Nama Nasabah", value: "Agus" },
  { label: "Sektor Pinjaman", value: "Umum" },
  { label: "Tujuan Pinjaman", value: "Konsumtif" },
  { label: "Kolektor", value: "Gina Farida M.M." },
  { label: "Tanggal Dibuat", value: "07 Apr 2026" },
  { label: "Tanggal Jatuh Tempo", value: "07 Apr 2027" },
  { label: "Tanggal Pinjaman Aktif", value: "07 Apr 2026" },
  { label: "Tanggal Transaksi Terakhir", value: "14 Apr 2026" },
  { label: "Selisih Tanggal Transaksi", value: "6 Hari" },
  { label: "Tanggal Pembayaran Setiap Bulan", value: "07" },
  { label: "Periode Waktu", value: "12 Bulan" },
  { label: "Suku Bunga Saat Ini (%)", value: "12,00%" },
  { label: "Metode Bunga Pinjaman", value: "Bunga Flat" },
  { label: "Angsuran Pokok", value: "1.000.000,00" },
  { label: "Angsuran Bunga", value: "120.000,00" },
  { label: "Sisa Pinjaman", value: "10.553.571,00" },
  { label: "Sisa Bunga Pinjaman", value: "1.266.429,00" },
  { label: "Total Harus Bayar", value: "1.120.000,00" },
  { label: "Total Bayar Bunga", value: "120.000,00" },
  { label: "Jumlah Hutang Pokok", value: "0 Kali" },
  { label: "Jumlah Hutang Bunga", value: "0 Kali" },
  { label: "Hutang Pokok", value: "0,00" },
  { label: "Hutang Bunga", value: "0,00" },
  { label: "Skema Tagihan", value: "Tagihan Sesuai Jadwal Angsuran" },
  { label: "Kolektibilitas", value: "-" },
  { label: "Satuan Grace Period", value: "Bulan" },
  { label: "Durasi Grace Period", value: "3" },
  { label: "Status", value: "Aktif / Sudah Disalurkan" },
];

function AccountFields() {
  const [expanded, setExpanded] = React.useState(false);

  const compactLabels = new Set([
    "Kode Pinjaman",
    "Nama Nasabah",
    "Sektor Pinjaman",
    "Tujuan Pinjaman",
    "Tanggal Jatuh Tempo",
    "Tanggal Pinjaman Aktif",
    "Tanggal Pembayaran Setiap Bulan",
    "Periode Waktu",
    "Suku Bunga Saat Ini (%)",
    "Metode Bunga Pinjaman",
    "Angsuran Pokok",
    "Angsuran Bunga",
    "Sisa Pinjaman",
    "Total Harus Bayar",
    "Status",
  ]);

  const visibleFields = expanded
    ? accountFields
    : accountFields.filter((field) => compactLabels.has(field.label));

  return (
    <>
      <div className="loan-debt-reference-fields grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleFields.map((field) => (
          <div key={field.label} className="min-w-0">
            <div className="text-[11px] font-semibold leading-tight text-white/85">
              {field.label}
            </div>
            <div className="mt-1 text-[14px] font-extrabold leading-snug tracking-tight text-white">
              {field.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="inline-flex items-center gap-1 rounded-full px-1 text-[12px] font-semibold text-white transition hover:text-white/80"
          aria-expanded={expanded}
          aria-label={
            expanded
              ? "Tampilkan lebih sedikit informasi rekening"
              : "Tampilkan lebih banyak informasi rekening"
          }
        >
          {expanded ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </>
  );
}

function findWizardCard() {
  const wizard = document.querySelector<HTMLElement>(
    '[data-loan-debt-wizard="true"][data-loan-debt-step="1"]',
  );

  if (!wizard) return null;

  return (
    Array.from(wizard.querySelectorAll<HTMLElement>("div")).find((element) => {
      const className = String(element.className ?? "");

      return (
        className.includes("bg-[#17a2b8]") &&
        (element.textContent ?? "").includes("INFORMASI REKENING PINJAMAN")
      );
    }) ?? null
  );
}

function findOriginalFields(card: HTMLElement) {
  return Array.from(card.children).find((child) => {
    const element = child as HTMLElement;
    const className = String(element.className ?? "");

    return className.includes("mt-7") && className.includes("grid");
  }) as HTMLElement | undefined;
}

function restoreCard(card: HTMLElement | null) {
  if (!card) return;

  card.classList.remove("loan-debt-reference-card");

  const fields = findOriginalFields(card);
  if (fields) fields.style.display = "";
}

export default function LoanDebtAccountCardStyle() {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  const cardRef = React.useRef<HTMLElement | null>(null);
  const originalFieldsRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    let frameId = 0;

    function restore() {
      restoreCard(cardRef.current);
      cardRef.current = null;
      originalFieldsRef.current = null;
      setTarget(null);
    }

    function syncCard() {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const card = findWizardCard();

        if (!card) {
          restore();
          return;
        }

        const originalFields = findOriginalFields(card);
        if (!originalFields) return;

        if (cardRef.current && cardRef.current !== card) {
          restoreCard(cardRef.current);
        }

        cardRef.current = card;
        originalFieldsRef.current = originalFields;
        originalFields.style.display = "none";
        card.classList.add("loan-debt-reference-card");
        setTarget(card);
      });
    }

    const observer = new MutationObserver(syncCard);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    syncCard();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      restore();
    };
  }, []);

  return (
    <>
      <style>
        {`
          .loan-debt-reference-card {
            position: relative !important;
            overflow: hidden !important;
            border-radius: 8px !important;
            background-color: #1aa0b5 !important;
            padding: 20px 24px 24px !important;
            box-shadow: none !important;
          }

          .loan-debt-reference-fields {
            margin-top: 28px !important;
          }

          @media (max-width: 639px) {
            .loan-debt-reference-card {
              padding: 16px !important;
            }

            .loan-debt-reference-fields {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
              margin-top: 20px !important;
            }
          }
        `}
      </style>

      {target && target.isConnected ? createPortal(<AccountFields />, target) : null}
    </>
  );
}