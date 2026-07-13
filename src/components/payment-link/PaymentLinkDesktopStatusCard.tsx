"use client";

import { Check, Clock3, Copy, X } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PaymentLinkDesktopStatus } from "@/components/payment-link/payment-link-status-types";

const statusContent: Record<
  PaymentLinkDesktopStatus,
  {
    title: string;
    description: string;
    badge: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    outerClassName: string;
    innerClassName: string;
    badgeClassName: string;
  }
> = {
  berhasil: {
    title: "Pembayaran Angsuran Pinjaman Berhasil Dilakukan",
    description: "Transaksi pembayaran via Payment Link berhasil diproses.",
    badge: "Berhasil",
    icon: Check,
    outerClassName: "bg-emerald-50",
    innerClassName: "bg-[#33AA00]",
    badgeClassName: "bg-[#3BB001] text-white",
  },
  gagal: {
    title: "Pembayaran Angsuran Pinjaman Gagal Dilakukan",
    description: "Transaksi pembayaran via Payment Link gagal diproses.",
    badge: "Gagal",
    icon: X,
    outerClassName: "bg-[#FCE4E7]",
    innerClassName: "bg-[#DC3545]",
    badgeClassName: "bg-[#DC3545] text-white",
  },
  kedaluwarsa: {
    title: "Payment Link Kedaluwarsa",
    description: "Payment Link sudah melewati batas waktu pembayaran.",
    badge: "Kedaluwarsa",
    icon: Clock3,
    outerClassName: "bg-amber-50",
    innerClassName: "bg-amber-500",
    badgeClassName: "bg-amber-500 text-white",
  },
};

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0 text-[13px] font-medium leading-tight text-slate-500">
        {label}
      </div>
      <div className="max-w-[260px] text-right text-[13px] font-extrabold leading-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

export default function PaymentLinkDesktopStatusCard({
  status,
  className,
}: {
  status: PaymentLinkDesktopStatus;
  className?: string;
}) {
  const content = statusContent[status];
  const Icon = content.icon;

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-3xl border-slate-200/70 bg-white/90 shadow-sm backdrop-blur",
        className,
      )}
    >
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[430px] flex-col items-center justify-center bg-[#F9FAFB] px-6 py-10 text-center">
          <div
            className={cn(
              "flex h-[128px] w-[128px] items-center justify-center rounded-full",
              content.outerClassName,
            )}
          >
            <div
              className={cn(
                "flex h-[92px] w-[92px] items-center justify-center rounded-full text-white",
                content.innerClassName,
              )}
            >
              <Icon className="h-[58px] w-[58px] text-white" strokeWidth={3.8} />
            </div>
          </div>

          <h2 className="mt-8 max-w-[420px] text-[24px] font-extrabold leading-tight tracking-tight text-slate-950">
            {content.title}
          </h2>

          <p className="mt-3 max-w-[420px] text-[14px] font-medium leading-relaxed text-slate-600">
            {content.description}
          </p>

          <span
            className={cn(
              "mt-6 inline-flex items-center rounded-full px-4 py-2 text-[13px] font-extrabold leading-none",
              content.badgeClassName,
            )}
          >
            {content.badge}
          </span>
        </div>

        <div className="px-5 py-6 md:px-7 md:py-8">
          <div className="text-[15px] font-extrabold uppercase tracking-wide text-slate-900">
            Detail Pembayaran
          </div>

          <div className="mt-5 rounded-2xl bg-[#F6F8FB] px-5 py-5 text-center">
            <div className="text-[12px] font-medium leading-none text-slate-500">
              Nominal Transaksi
            </div>
            <div className="mt-3 text-[32px] font-extrabold leading-tight tracking-tight text-slate-950">
              Rp. 991.666,00
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-2">
            <InfoRow label="No. Payment Link" value="PL/260626/0001" />
            <div className="h-px w-full bg-slate-100" />
            <InfoRow label="Nama Anggota" value="Laura Patel" />
            <div className="h-px w-full bg-slate-100" />
            <InfoRow label="No. Rek. Pinjaman" value="SMG260004" />
            <div className="h-px w-full bg-slate-100" />
            <InfoRow label="Tanggal Transaksi" value="03 Juli 2026" />
            <div className="h-px w-full bg-slate-100" />
            <InfoRow label="Waktu Transaksi" value="15:16 WIB" />
            <div className="h-px w-full bg-slate-100" />
            <InfoRow label="Metode Pembayaran" value="Transfer Antar Bank" />
            <div className="h-px w-full bg-slate-100" />
            <InfoRow
              label="Ref ID"
              value={
                <span className="inline-flex items-center justify-end gap-2">
                  112221111222
                  <button
                    type="button"
                    onClick={() =>
                      toast.success("Ref ID disalin (prototype)", {
                        description: "112221111222",
                      })
                    }
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                    aria-label="Salin Ref ID"
                    title="Salin Ref ID"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </span>
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );
}