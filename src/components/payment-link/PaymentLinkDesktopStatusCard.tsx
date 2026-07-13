"use client";

import * as React from "react";
import { Check, Clock3, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PaymentLinkDesktopStatus } from "@/components/payment-link/payment-link-status-types";
import PaymentLinkDesktopFrame from "@/components/payment-link/PaymentLinkDesktopFrame";

const expiredDescription =
  "Pembayaran via link tidak dapat dilakukan karena link yang anda gunakan telah kedaluwarsa atau melewati batas waktu penggunaan";

const statusContent: Record<
  PaymentLinkDesktopStatus,
  {
    title: string;
    description?: string;
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
    description: expiredDescription,
    icon: Clock3,
    outerClassName: "bg-amber-50",
    innerClassName: "bg-amber-500",
  },
};

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
        "border-0 bg-transparent p-0 shadow-none ring-0",
        className,
      )}
    >
      <PaymentLinkDesktopFrame className="min-h-[800px]">
        <div className="flex min-h-[776px] items-center justify-center bg-white px-8 py-10">
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
                  className="h-[58px] w-[58px] text-white"
                  strokeWidth={status === "kedaluwarsa" ? 2.2 : 3.8}
                />
              </div>
            </div>

            <h2 className="mt-8 max-w-[460px] text-[24px] font-extrabold leading-tight tracking-tight text-slate-950">
              {content.title}
            </h2>

            {content.description ? (
              <p className="mt-4 max-w-[560px] text-[15px] font-medium leading-relaxed text-slate-600">
                {content.description}
              </p>
            ) : null}
          </section>
        </div>
      </PaymentLinkDesktopFrame>
    </Card>
  );
}