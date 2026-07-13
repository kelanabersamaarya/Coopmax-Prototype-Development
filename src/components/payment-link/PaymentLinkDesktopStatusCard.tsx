"use client";

import * as React from "react";
import { Check, Clock3, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PaymentLinkDesktopStatus } from "@/components/payment-link/payment-link-status-types";
import PaymentLinkDesktopFrame from "@/components/payment-link/PaymentLinkDesktopFrame";

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
    title: "Pembayaran Angsuran Pinjaman via Link Berhasil Dilakukan",
    icon: Check,
    outerClassName: "bg-emerald-50",
    innerClassName: "bg-[#33aa00]",
  },
  gagal: {
    title: "Pembayaran Angsuran Pinjaman via Link Gagal Dilakukan",
    icon: X,
    outerClassName: "bg-[#fce4e7]",
    innerClassName: "bg-[#dc3545]",
  },
  kedaluwarsa: {
    title: "Pembayaran via Link Telah Kedaluwarsa",
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
  const isExpired = status === "kedaluwarsa";

  return (
    <Card
      className={cn(
        "border-0 bg-transparent p-0 shadow-none ring-0",
        className,
      )}
    >
      <PaymentLinkDesktopFrame className="min-h-[800px]">
        <div className="flex min-h-[776px] items-center justify-center bg-white px-8 py-10">
          {isExpired ? (
            <section className="flex min-h-[610px] w-full max-w-[720px] flex-col items-center justify-center rounded-[30px] bg-white px-8 py-12 text-center shadow-[0_20px_56px_rgba(15,23,42,0.10)] ring-1 ring-slate-200">
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
                  <Icon
                    className="h-[56px] w-[56px] text-white"
                    strokeWidth={2.2}
                  />
                </div>
              </div>

              <h2 className="mt-8 max-w-[460px] text-[24px] font-extrabold leading-tight tracking-tight text-slate-950">
                {content.title}
              </h2>
            </section>
          ) : (
            <section className="grid w-full max-w-[1180px] overflow-hidden rounded-[30px] bg-white shadow-[0_20px_56px_rgba(15,23,42,0.10)] ring-1 ring-slate-200 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex min-h-[610px] flex-col items-center justify-center bg-white px-8 py-12 text-center">
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
                    <Icon
                      className="h-[58px] w-[58px] text-white"
                      strokeWidth={3.8}
                    />
                  </div>
                </div>

                <h2 className="mt-8 max-w-[420px] text-[24px] font-extrabold leading-tight tracking-tight text-slate-950">
                  {content.title}
                </h2>
              </div>

              <div className="flex min-h-[610px] items-center justify-center bg-white px-8 py-12">
                <div className="w-full max-w-[620px]">
                  <div className="rounded-[22px] bg-[#f6f8fb] px-5 py-6 text-center">
                    <div className="text-[12px] font-medium leading-none text-slate-500">
                      Nominal Transaksi
                    </div>
                    <div className="mt-3 text-[32px] font-extrabold leading-tight tracking-tight text-slate-950">
                      Rp. 991.666,00
                    </div>
                  </div>

                  <div className="mt-5 rounded-[22px] border border-slate-200 bg-white px-5 py-2">
                    <InfoRow label="Tanggal Transaksi" value="03 Juli 2026" />
                    <div className="h-px w-full bg-slate-100" />
                    <InfoRow label="Waktu Transaksi" value="15:16 WIB" />
                    <div className="h-px w-full bg-slate-100" />
                    <InfoRow
                      label="Metode Transaksi"
                      value="Transfer Antar Bank"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </PaymentLinkDesktopFrame>
    </Card>
  );
}