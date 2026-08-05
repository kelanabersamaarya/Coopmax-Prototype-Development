"use client";

import * as React from "react";
import { createPortal } from "react-dom";

type AccountField =
  | {
      kind: "field";
      label: string;
      value: React.ReactNode;
    }
  | {
      kind: "section";
      label: string;
    };

const accountFields: AccountField[] = [
  { kind: "field", label: "Kode Pinjaman", value: "SMG260004" },
  { kind: "field", label: "Sektor Pinjaman", value: "Umum" },
  { kind: "field", label: "Tujuan Pinjaman", value: "Konsumtif" },
  { kind: "field", label: "Kolektor", value: "Gina Farida M.M." },

  { kind: "field", label: "Tanggal Dibuat", value: "07 Apr 2026" },
  { kind: "field", label: "Tanggal Jatuh Tempo", value: "07 Apr 2027" },
  { kind: "field", label: "Tanggal Pinjaman Aktif", value: "07 Apr 2026" },
  { kind: "field", label: "Tanggal Transaksi Terakhir", value: "14 Apr 2026" },

  { kind: "field", label: "Selisih Tanggal Transaksi", value: "6 Hari" },
  { kind: "field", label: "Tanggal Pembayaran Setiap Bulan", value: "07" },
  { kind: "field", label: "Periode Waktu", value: "12 Bulan" },
  { kind: "field", label: "Produk Pinjaman", value: "Pinjaman Billing" },

  { kind: "field", label: "Bunga Per Tahun (%)", value: "12,00%" },
  { kind: "field", label: "Metode Bunga Pinjaman", value: "Bunga Flat" },
  {
    kind: "field",
    label: "Jumlah Pinjaman Diajukan",
    value: "12.000.000,00",
  },
  {
    kind: "field",
    label: "Jumlah Pinjaman Disetujui",
    value: "12.000.000,00",
  },

  { kind: "field", label: "Sisa Pinjaman", value: "10.553.571,00" },
  { kind: "section", label: "Angsuran & Pembayaran" },
  { kind: "field", label: "Angsuran Pokok", value: "1.000.000,00" },
  { kind: "field", label: "Angsuran Bunga", value: "120.000,00" },

  { kind: "field", label: "Jumlah Hutang Pokok", value: "0 Kali" },
  { kind: "field", label: "Sisa Bunga Pinjaman", value: "1.266.429,00" },
  { kind: "field", label: "Hutang Bunga", value: "0,00" },
  { kind: "field", label: "Jumlah Hutang Bunga", value: "0 Kali" },

  { kind: "field", label: "Hutang Pokok", value: "0,00" },
  { kind: "field", label: "Total Harus Bayar", value: "1.120.000,00" },
  { kind: "field", label: "Total Bayar Bunga", value: "120.000,00" },
  {
    kind: "field",
    label: "Skema Tagihan",
    value: "Tagihan Sesuai Jadwal Angsuran",
  },

  {
    kind: "field",
    label: "Status",
    value: (
      <span className="inline-flex rounded-[5px] bg-lime-500 px-2.5 py-1 text-[11px] font-extrabold leading-none text-white">
        Aktif / Sudah Dicairkan
      </span>
    ),
  },
  { kind: "field", label: "Kolektibilitas", value: "-" },
  { kind: "field", label: "Satuan Grace Period", value: "Bulan" },
  { kind: "field", label: "Durasi Grace Period", value: "3" },
];

function AccountFields() {
  return (
    <div className="loan-interest-reference-fields grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
      {accountFields.map((field, index) => {
        if (field.kind === "section") {
          return (
            <div
              key={`${field.label}-${index}`}
              className="col-span-full border-b border-white/25 pb-1 text-[13px] font-extrabold uppercase tracking-wide text-white"
            >
              {field.label}
            </div>
          );
        }

        return (
          <div key={field.label} className="min-w-0">
            <div className="text-[11px] font-semibold leading-tight text-white/85">
              {field.label}
            </div>
            <div className="mt-1 text-[14px] font-extrabold leading-snug tracking-tight text-white">
              {field.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function findWizardCard() {
  const wizard = document.querySelector<HTMLElement>(
    '[data-loan-interest-wizard="true"]',
  );

  if (!wizard) return null;

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

export default function LoanInterestAccountCardStyle() {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    let frameId = 0;

    function syncCard() {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const card = findWizardCard();

        if (!card) {
          setTarget(null);
          return;
        }

        const originalFields = Array.from(
          card.querySelectorAll<HTMLElement>("div"),
        ).find((element) => {
          const className = String(element.className ?? "");
          return className.includes("mt-7") && className.includes("grid");
        });

        if (!originalFields) return;

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

      const card = findWizardCard();

      if (card) {
        card.classList.remove("loan-interest-reference-card");

        Array.from(card.querySelectorAll<HTMLElement>("div")).forEach(
          (element) => {
            const className = String(element.className ?? "");

            if (className.includes("mt-7") && className.includes("grid")) {
              element.style.display = "";
            }
          },
        );
      }
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

      {target ? createPortal(<AccountFields />, target) : null}
    </>
  );
}