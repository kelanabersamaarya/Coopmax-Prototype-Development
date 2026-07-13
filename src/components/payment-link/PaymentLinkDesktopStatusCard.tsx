"use client";

import * as React from "react";
import { Check, Clock3, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PaymentLinkDesktopStatus } from "@/components/payment-link/payment-link-status-types";

const statusContent: Record<
  PaymentLinkDesktopStatus,
  {
    title: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    outerClassName: string;
    innerClassName: string;
  }
> = {
  berhasil: {
    title: "Pembayaran Angsuran Pinjaman Berhasil Dilakukan",
    icon: Check,
    outerClassName: "bg-emerald-50",
    innerClassName: "bg-[#33AA00]",
  },
  gagal: {
    title: "Pembayaran Angsuran Pinjaman Gagal Dilakukan",
    icon: X,
    outerClassName: "bg-[#FCE4E7]",
    innerClassName: "bg-[#DC3545]",
  },
  kedaluwarsa: {
    title: "Payment Link Kedaluwarsa",
    icon: Clock3,
    outerClassName: "bg-amber-50",
    innerClassName: "bg-amber-500",
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
        </div>

        <div className="px-5 py-6 md:px-7 md:py-8">
          <div className="mb-4 text-center text-[15px] font-extrabold uppercase tracking-wide text-slate-900">
            DETAIL TRANSAKSI
          </div>

          <div className="rounded-2xl bg-[#F6F8FB] px-5 py-5 text-center">
            <div className="text-[12px] font-medium leading-none text-slate-500">
              Nominal Transaksi
            </div>
            <div className="mt-3 text-[32px] font-extrabold leading-tight tracking-tight text-slate-950">
              Rp. 991.666,00
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-2">
            <InfoRow label="Tanggal Transaksi" value="03 Juli 2026" />
            <div className="h-px w-full bg-slate-100" />
            <InfoRow label="Waktu Transaksi" value="15:16 WIB" />
            <div className="h-px w-full bg-slate-100" />
            <InfoRow label="Metode Pembayaran" value="Transfer Antar Bank" />
          </div>
        </div>
      </div>
    </Card>
  );
}