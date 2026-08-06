"use client";

import * as React from "react";
import { createPortal } from "react-dom";

type AccountField = {
  label: string;
  value: React.ReactNode;
};

const accountFields: AccountField[] = [
  { label: "Kode Pinjaman", value: "SMG260004" },
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
  { label: "Produk Pinjaman", value: "Pinjaman Billing" },
  {
    label: "Bunga Per Tahun (%)",
    value: (
      <span className="inline-flex rounded-[5px] bg-[#3BB001] px-2.5 py-1 text-white">
        12,00%
      </span>
    ),
  },
  { label: "Metode Bunga Pinjaman", value: "Bunga Flat" },
  { label: "Jumlah Pinjaman Diajukan", value: "12.000.000,00" },
  { label: "Jumlah Pinjaman Disetujui", value: "12.000.000,00" },
  { label: "Sisa Pinjaman", value: "10.553.571,00" },
  { label: "Angsuran Pokok", value: "1.000.000,00" },
  { label: "Angsuran Bunga", value: "120.000,00" },
  { label: "Jumlah Hutang Pokok", value: "0 Kali" },
  { label: "Sisa Bunga Pinjaman", value: "1.266.429,00" },
  { label: "Hutang Bunga", value: "0,00" },
  { label: "Jumlah Hutang Bunga", value: "0 Kali" },
  { label: "Hutang Pokok", value: "0,00" },
  { label: "Total Harus Bayar", value: "1.120.000,00" },
  { label: "Total Bayar Bunga", value: "120.000,00" },
  { label: "Skema Tagihan", value: "Tagihan Sesuai Jadwal Angsuran" },
  {
    label: "Status",
    value: (
      <span className="inline-flex rounded-[5px] bg-[#3BB001] px-2.5 py-1 text-[11px] font-extrabold leading-none text-white">
        Aktif / Sudah Dicairkan
      </span>
    ),
  },
  { label: "Kolektibilitas", value: "-" },
  { label: "Satuan Grace Period", value: "Bulan" },
  { label: "Durasi Grace Period", value: "3" },
];

function AccountFields() {
  const [expanded, setExpanded] = React.useState(false);

  const compactFields = [
    ...accountFields.slice(0, 8),
    accountFields[12],
  ];

  const visibleFields = expanded ? accountFields : compactFields;

  return (
    <>
      <div className="loan-interest-reference-fields grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
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
          className="text-[12px] font-semibold text-white underline underline-offset-4 transition hover:text-white/80"
          aria-expanded={expanded}
        >
          {expanded ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
        </button>
      </div>
    </>
  );
}

function findWizardCard() {
  const wizard = document.querySelector<HTMLElement>(
    '[data-loan-interest-wizard="true"]',
  );

  if (!wizard || wizard.dataset.loanInterestStep !== "1") return null;

  return (
    Array.from(wizard.querySelectorAll<HTMLElement>("div")).find((element) => {
      const text = element.textContent ?? "";
      const className = String(element.className ?? "");

      return (
        text.includes("INFORMASI REKENING PINJAMAN") &&
        className.includes("bg-[#17a2b8]")
      );
    }) ?? null
  );
}

function findOriginalFields(card: HTMLElement) {
  return Array.from(card.querySelectorAll<HTMLElement>("div")).find(
    (element) => {
      const className = String(element.className ?? "");
      return className.includes("mt-7") && className.includes("grid");
    },
  );
}

function restoreCard(card: HTMLElement | null) {
  if (!card) return;

  card.classList.remove("loan-interest-reference-card");

  const originalFields = findOriginalFields(card);
  if (originalFields) {
    originalFields.style.display = "";
  }
}

export default function LoanInterestAccountCardStyle() {
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
        card.classList.add("loan-interest-reference-card");
        setTarget(card);
      });
    }

    const observer = new MutationObserver(syncCard);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
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
          .loan-interest-reference-card {
            overflow: hidden !important;
            border-radius: 8px !important;
            background-color: #1aa0b5 !important;
            padding: 20px 24px 24px !important;
            box-shadow: none !important;
          }

          .loan-interest-reference-card > div:first-child {
            padding: 0 !important;
          }

          .loan-interest-reference-card > div:first-child > div:first-child {
            min-height: 28px !important;
          }

          .loan-interest-reference-fields {
            margin-top: 28px !important;
          }

          .loan-interest-reference-fields > div {
            min-width: 0 !important;
          }

          @media (max-width: 639px) {
            .loan-interest-reference-card {
              padding: 16px !important;
            }

            .loan-interest-reference-fields {
              margin-top: 20px !important;
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
          }
        `}
      </style>

      {target && target.isConnected ? createPortal(<AccountFields />, target) : null}
    </>
  );
}