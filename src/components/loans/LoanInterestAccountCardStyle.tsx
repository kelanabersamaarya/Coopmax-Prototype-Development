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
  { label: "Tanggal Transaksi Terakhir", value: "14 Apr 2026" },
  { label: "Selisih Tanggal Transaksi", value: "6 Hari" },

  { label: "Tanggal Pinjaman Aktif", value: "07 Apr 2026" },
  { label: "Tanggal Pembayaran Setiap Bulan", value: "07" },
  { label: "Periode Waktu", value: "12 Bulan" },
  { label: "Metode Bunga Pinjaman", value: "Bunga Flat" },

  { label: "Bunga Per Tahun (%)", value: "12,00%" },
  { label: "Jumlah Pinjaman Diajukan", value: "12.000.000,00" },
  { label: "Jumlah Pinjaman Disetujui", value: "12.000.000,00" },
  { label: "Sisa Pinjaman", value: "10.553.571,00" },

  { label: "Sisa Bunga Pinjaman", value: "1.266.429,00" },
  { label: "Angsuran Pokok", value: "1.000.000,00" },
  { label: "Angsuran Bunga", value: "120.000,00" },
  { label: "Hutang Pokok", value: "0,00" },

  { label: "Hutang Bunga", value: "0,00" },
  { label: "Jumlah Hutang Pokok", value: "0 Kali" },
  { label: "Jumlah Hutang Bunga", value: "0 Kali" },
  { label: "Total Bayar Bunga", value: "120.000,00" },

  { label: "Total Harus Bayar", value: "1.120.000,00" },
  { label: "Kolektibilitas", value: "-" },
  {
    label: "Status",
    value: (
      <span className="inline-flex rounded-[4px] bg-lime-400 px-2 py-1 text-[11px] font-extrabold leading-none text-slate-900">
        Aktif / Sudah Dicairkan
      </span>
    ),
  },
  {
    label: "Skema Tagihan",
    value: (
      <span>
        Tagihan Sesuai Jadwal
        <br />
        Angsuran
      </span>
    ),
  },

  { label: "Satuan Grace Period", value: "Bulan" },
  { label: "Durasi Grace Period", value: "3" },
];

function AccountFields() {
  return (
    <div className="loan-interest-reference-fields grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
      {accountFields.map((field) => (
        <div key={field.label} className="min-w-0">
          <div className="text-[12px] font-semibold leading-tight text-white/85">
            {field.label}
          </div>
          <div className="mt-1 text-[14px] font-extrabold leading-snug tracking-tight text-white">
            {field.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LoanInterestAccountCardStyle() {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const wizard = document.querySelector<HTMLElement>(
      '[data-loan-interest-wizard="true"]',
    );

    if (!wizard) return;

    const card = Array.from(
      wizard.querySelectorAll<HTMLElement>("div"),
    ).find((element) => {
      const text = element.textContent ?? "";
      return (
        text.includes("INFORMASI REKENING PINJAMAN") &&
        element.className.includes("bg-[#17a2b8]")
      );
    });

    const originalFields = card?.querySelector<HTMLElement>(
      ".mt-7.grid",
    );

    if (!card || !originalFields) return;

    card.classList.add("loan-interest-reference-card");
    originalFields.classList.add("loan-interest-original-fields-hidden");
    setTarget(card);

    return () => {
      card.classList.remove("loan-interest-reference-card");
      originalFields.classList.remove("loan-interest-original-fields-hidden");
      setTarget(null);
    };
  }, []);

  return (
    <>
      <style>
        {`
          .loan-interest-reference-card {
            overflow: hidden !important;
            border-radius: 5px !important;
            background-color: #1aa0b5 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }

          .loan-interest-reference-card
            > div:first-child {
            padding: 20px 28px 0 !important;
          }

          .loan-interest-reference-card
            .loan-interest-original-fields-hidden {
            display: none !important;
          }

          .loan-interest-reference-fields {
            padding: 20px 28px 24px !important;
          }

          @media (max-width: 639px) {
            .loan-interest-reference-card
              > div:first-child {
              padding: 16px 16px 0 !important;
            }

            .loan-interest-reference-fields {
              padding: 16px !important;
            }
          }
        `}
      </style>

      {target ? createPortal(<AccountFields />, target) : null}
    </>
  );
}