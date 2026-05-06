"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import LoanBillingAndSummarySection from "@/components/loans/LoanBillingAndSummarySection";

function InfoCol({
  label,
  value,
  align = "left",
  big = false,
  tone = "light",
}: {
  label: string;
  value: React.ReactNode;
  align?: "left" | "right";
  big?: boolean;
  tone?: "light" | "dark";
}) {
  const labelCls = tone === "dark" ? "text-white/85" : "text-slate-600";
  const valueCls = tone === "dark" ? "text-white" : "text-slate-900";

  return (
    <div className={cn("min-w-0", align === "right" ? "text-right" : "text-left")}>
      <div
        className={cn(
          "grid",
          big ? "grid-rows-[18px_30px]" : "grid-rows-[18px_30px]",
        )}
      >
        <div
          className={cn(
            "self-start text-[12px] font-semibold leading-none",
            labelCls,
          )}
        >
          {label}
        </div>

        <div
          className={cn(
            "self-start leading-snug",
            valueCls,
            big
              ? "text-[14px] font-extrabold tracking-tight"
              : "text-[14px] font-bold",
          )}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function DividerLine({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div
      className={cn("h-px w-full", tone === "dark" ? "bg-white/20" : "bg-slate-200")}
    />
  );
}

function SectionTitleDark({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[14px] font-extrabold tracking-tight text-white">
      {children}
    </div>
  );
}

function DetailLoanGridRow({
  items,
}: {
  items: Array<{ label: string; value: React.ReactNode }>;
}) {
  return (
    <div className="grid gap-x-10 gap-y-4 md:grid-cols-4">
      {items.map((it) => (
        <InfoCol key={it.label} label={it.label} value={it.value} tone="dark" />
      ))}
    </div>
  );
}

export default function LoanAccountInfoPreview({
  accountNo,
  className,
}: {
  accountNo: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const nasabah = React.useMemo(
    () => ({
      id: "N2600006",
      nama: "Bapak Bagus",
      alamat: "Sidakarya",
    }),
    [],
  );

  // Teal seperti referensi (dipakai langsung agar match)
  const tealBg = "bg-[#1aa0b5]";

  return (
    <div className={cn("overflow-hidden rounded-[8px] bg-white", className)}>
      {/* Section Informasi Rekening - teal seperti gambar */}
      <div className={cn(tealBg, "px-5 py-5 text-white")}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="min-w-0 text-base font-extrabold tracking-tight text-white">
              INFORMASI REKENING
            </div>

            <span className="inline-flex shrink-0 items-center rounded-full bg-rose-600 px-3 py-1 text-[12px] font-semibold text-white ring-1 ring-rose-600/20">
              Belum Terproses
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2",
              "rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-800",
              "ring-1 ring-white/60 transition hover:bg-white/90",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-white/25",
            )}
            aria-expanded={open}
            aria-label={open ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
            title={open ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
          >
            <span className="whitespace-nowrap">
              {open ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-slate-600 transition",
                open ? "rotate-180" : "",
              )}
            />
          </button>
        </div>

        <div className="mt-5">
          <div className="grid gap-x-10 gap-y-4 md:grid-cols-4">
            <InfoCol
              label="No. Rekening Pinjaman"
              value={accountNo}
              big
              tone="dark"
            />
            <InfoCol label="Produk Pinjaman" value="Pinjaman Billing" tone="dark" />
            <InfoCol
              label="Skema Tagihan"
              value={
                <span className="block">
                  Tagihan Sesuai Jadwal
                  <br />
                  Angsuran
                </span>
              }
              tone="dark"
            />
            <InfoCol label="Satuan Grace Period" value="Bulan" tone="dark" />

            <InfoCol label="Durasi Grace Period" value="3" tone="dark" />
            <InfoCol
              label="Sisa Pokok Pinjaman"
              value="10.000.000,00"
              tone="dark"
            />
            <div className="hidden md:block" />
            <div className="hidden md:block" />
          </div>
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200",
            open
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <div className="mt-4">
              <DividerLine tone="dark" />

              <div className="mt-4">
                <SectionTitleDark>INFORMASI NASABAH</SectionTitleDark>

                <div className="mt-4 grid gap-x-10 gap-y-4 md:grid-cols-4">
                  <InfoCol label="ID Nasabah" value={nasabah.id} big tone="dark" />
                  <InfoCol label="Nama" value={nasabah.nama} tone="dark" />
                  <InfoCol label="Alamat" value={nasabah.alamat} tone="dark" />
                  <div className="hidden md:block" />

                  <div className="hidden md:block" />
                  <div className="hidden md:block" />
                  <div className="hidden md:block" />
                  <div className="hidden md:block" />
                </div>
              </div>

              {/* === DETAIL PINJAMAN === */}
              <div className="mt-5">
                <DividerLine tone="dark" />

                <div className="mt-4">
                  <SectionTitleDark>DETAIL PINJAMAN</SectionTitleDark>

                  <div className="mt-4">
                    <DetailLoanGridRow
                      items={[
                        { label: "Jangka Waktu", value: "12 Bulan" },
                        { label: "Angsuran Ke", value: "2" },
                        { label: "Tanggal Realisasi", value: "01-03-2026" },
                        { label: "Tanggal Jatuh Tempo", value: "16-03-2027" },
                      ]}
                    />

                    <div className="mt-4">
                      <DetailLoanGridRow
                        items={[
                          { label: "Tanggal Transaksi Terakhir", value: "25 Maret 2026" },
                          { label: "Bunga Pertahun", value: "10,00%" },
                          { label: "Metode Bunga", value: "Bunga Efektif" },
                          { label: "", value: "" },
                        ]}
                      />
                    </div>

                    {/* Divider tengah DIHILANGKAN sesuai screenshot */}

                    <div className="mt-5">
                      <DetailLoanGridRow
                        items={[
                          { label: "Plafond", value: "10.000.000,00" },
                          { label: "Sisa Total Pinjaman", value: "9.625.000" },
                          { label: "Sisa Pokok Pinjaman", value: "9.116.000" },
                          { label: "Pokok", value: "0" },
                        ]}
                      />

                      <div className="mt-4">
                        <DetailLoanGridRow
                          items={[
                            { label: "Bunga", value: "0" },
                            { label: "Denda", value: "0" },
                            { label: "Angsuran", value: "0" },
                            { label: "Selisih Tanggal Transaksi", value: "0" },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* === END DETAIL PINJAMAN === */}
            </div>
          </div>
        </div>
      </div>

      {/* Area bawah: padding di inner container agar divider/garis sejajar + rounded bawah terlihat */}
      <div className="bg-white py-4">
        <div className="px-5 pb-2">
          <LoanBillingAndSummarySection className="mt-0" />
        </div>
      </div>
    </div>
  );
}