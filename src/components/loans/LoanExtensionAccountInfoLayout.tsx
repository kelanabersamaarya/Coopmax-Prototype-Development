"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const GRID_SELECTOR = ".loan-extension-account-grid";
const MARKER_CLASS = "loan-extension-account-reference-mounted";

type AccountItem = {
  label: string;
  value: string;
  status?: boolean;
  highlight?: boolean;
};

const accountItems: AccountItem[] = [
  { label: "Kode Pinjaman", value: "SMG260004" },
  { label: "Nama Nasabah", value: "Bapak Bagus" },
  { label: "Sektor Pinjaman", value: "Umum" },
  { label: "Tujuan Pinjaman", value: "Konsumtif" },
  { label: "Kolektor", value: "Gina Farida M.M." },
  { label: "Tanggal Dibuat", value: "07 Apr 2026" },
  { label: "Tanggal Jatuh Tempo", value: "07 Apr 2027" },
  { label: "Tanggal Pinjaman Aktif", value: "07 Apr 2026" },
  { label: "Tanggal Transaksi Terakhir", value: "14 Apr 2026" },
  { label: "Selisih Tanggal Transaksi", value: "6 Hari" },
  { label: "Tanggal Pembayaran Setiap Bulan", value: "07" },
  { label: "Periode Waktu", value: "12 Bulan", highlight: true },
  { label: "Sisa Tenor", value: "12 Bulan", highlight: true },
  { label: "Produk Pinjaman", value: "Pinjaman Billing" },
  { label: "Bunga Per Tahun (%)", value: "12,00%" },
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
  { label: "Status", value: "Aktif / Sudah Dicairkan", status: true },
  { label: "Kolektibilitas", value: "-" },
  { label: "Satuan Grace Period", value: "Bulan" },
  { label: "Durasi Grace Period", value: "3" },
];

const compactLabels = [
  "Kode Pinjaman",
  "Nama Nasabah",
  "Sektor Pinjaman",
  "Tujuan Pinjaman",
  "Kolektor",
  "Tanggal Dibuat",
  "Tanggal Jatuh Tempo",
  "Periode Waktu",
  "Sisa Tenor",
];

function createField(item: AccountItem) {
  const field = document.createElement("div");
  field.className = "loan-extension-account-field";
  field.dataset.accountItemLabel = item.label;

  const label = document.createElement("div");
  label.className = "loan-extension-account-label";
  label.textContent = item.label;

  const value = document.createElement("div");
  value.className = "loan-extension-account-value";

  if (item.status || item.highlight) {
    const badge = document.createElement("span");
    badge.className = item.highlight
      ? "loan-extension-account-period-highlight"
      : "loan-extension-account-status";
    badge.textContent = item.value;
    value.appendChild(badge);
  } else {
    value.textContent = item.value;
  }

  field.append(label, value);
  return field;
}

function getWizardGrid() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard) return null;

  const grids = Array.from(
    wizard.querySelectorAll<HTMLElement>(GRID_SELECTOR),
  );

  const primaryGrid = grids[0] ?? null;
  grids.slice(1).forEach((grid) => grid.remove());

  return primaryGrid;
}

function orderFields(grid: HTMLElement) {
  const fieldsByLabel = new Map<string, HTMLElement>();

  Array.from(
    grid.querySelectorAll<HTMLElement>(".loan-extension-account-field"),
  ).forEach((field) => {
    const label = field.dataset.accountItemLabel?.trim() ?? "";

    if (!label || fieldsByLabel.has(label)) {
      field.remove();
      return;
    }

    fieldsByLabel.set(label, field);
  });

  const orderedFields = accountItems.map((item) => {
    return fieldsByLabel.get(item.label) ?? createField(item);
  });

  const currentFields = Array.from(grid.children);

  if (
    currentFields.length !== orderedFields.length ||
    currentFields.some((field, index) => field !== orderedFields[index])
  ) {
    grid.replaceChildren(...orderedFields);
  }
}

function applyCompactVisibility(grid: HTMLElement, expanded: boolean) {
  Array.from(
    grid.querySelectorAll<HTMLElement>(".loan-extension-account-field"),
  ).forEach((field) => {
    const label = field.dataset.accountItemLabel ?? "";
    const shouldShow = expanded || compactLabels.includes(label);

    field.style.setProperty(
      "display",
      shouldShow ? "block" : "none",
      "important",
    );
  });
}

function mountAccountInfo() {
  const grid = getWizardGrid();
  if (!grid) return;

  grid.classList.add(MARKER_CLASS, "loan-extension-account-grid-reference");
  orderFields(grid);

  const accountNoField = grid.querySelector<HTMLElement>(
    '[data-account-item-label="Kode Pinjaman"] .loan-extension-account-value',
  );

  if (accountNoField) accountNoField.textContent = "SMG260004";

  const customerNameField = grid.querySelector<HTMLElement>(
    '[data-account-item-label="Nama Nasabah"] .loan-extension-account-value',
  );

  if (customerNameField) customerNameField.textContent = "Bapak Bagus";

  const expanded =
    grid.dataset.accountInfoExpanded === "true";

  applyCompactVisibility(grid, expanded);
}

export default function LoanExtensionAccountInfoLayout() {
  React.useEffect(() => {
    let frameId = 0;
    let retryId = 0;
    let attempts = 0;

    const sync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(mountAccountInfo);
    };

    const retryMount = () => {
      attempts += 1;
      sync();

      if (attempts < 30) {
        retryId = window.setTimeout(retryMount, 120);
      }
    };

    const observer = new MutationObserver(sync);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    retryMount();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(retryId);
      observer.disconnect();
    };
  }, []);

  return null;
}