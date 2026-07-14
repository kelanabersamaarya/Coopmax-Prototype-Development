"use client";

import { CalendarDays, Clock3, HandCoins, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BillingRow } from "@/components/loans/BillingTableWithStatus";

const PENALTY_ROWS = 3;
const PENALTY_AMOUNT = "75.000";

function isGracePeriodBill(row: BillingRow) {
  return row.tagihanPokok === "0,00" || row.sisaPokok === "0,00";
}

function DetailAmountRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[8px]">
      <div className="min-w-0 text-[13px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>

      <div className="shrink-0 text-right text-[13px] font-bold leading-tight text-black tabular-nums">
        {value}
      </div>
    </div>
  );
}

function TotalAmountRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 pt-[12px]">
      <div className="min-w-0 text-[14px] font-bold leading-tight text-black">
        {label}
      </div>

      <div className="shrink-0 text-right text-[15px] font-bold leading-tight text-black tabular-nums">
        {value}
      </div>
    </div>
  );
}

function RemainingBillCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] bg-white px-4 py-4 ring-1 ring-[#EEF0F4]">
      <div className="flex items-center gap-2 text-[11px] font-normal leading-none text-[#8F8F8F]">
        <Icon className="h-[14px] w-[14px] text-[#479DF4]" strokeWidth={2.5} />
        {label}
      </div>

      <div className="mt-[10px] truncate text-[14px] font-bold leading-tight text-black tabular-nums">
        {value}
      </div>
    </div>
  );
}

export default function NewMBankingBillCard({
  row,
  globalIndex,
}: {
  row: BillingRow;
  globalIndex: number;
}) {
  const inGracePeriod = isGracePeriodBill(row);
  const hasPenalty = globalIndex < PENALTY_ROWS;
  const penalty = hasPenalty ? PENALTY_AMOUNT : "0,00";

  return (
    <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.12)] ring-1 ring-[#EEF0F4]">
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_52%,#7C3AED_100%)] px-5 py-4 text-white">
        <div className="pointer-events-none absolute -right-[42px] -top-[42px] h-[128px] w-[128px] rounded-full bg-white/16" />
        <div className="pointer-events-none absolute right-[50px] top-[48px] h-[56px] w-[56px] rounded-full bg-cyan-200/16" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[12px] font-normal leading-none text-white/80">
              <CalendarDays className="h-[15px] w-[15px]" strokeWidth={2.5} />
              Jatuh Tempo
            </div>

            <div className="mt-[8px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-white">
              {row.jatuhTempo}
            </div>
          </div>

          <span
            className={cn(
              "inline-flex min-h-[28px] shrink-0 items-center rounded-full px-3",
              "text-[11px] font-bold leading-none",
              inGracePeriod
                ? "bg-white text-[#2563EB]"
                : "bg-white/18 text-white ring-1 ring-white/20",
            )}
          >
            {inGracePeriod ? "Grace Period" : "Tagihan Aktif"}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5 pt-4">
        {inGracePeriod ? (
          <div className="mb-4 flex items-start gap-3 rounded-[16px] bg-[#EEF6FF] px-4 py-3 ring-1 ring-[#CFE4FF]">
            <span className="mt-[1px] grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
              <Info className="h-[15px] w-[15px]" strokeWidth={2.7} />
            </span>

            <div className="min-w-0">
              <div className="text-[12px] font-bold leading-tight text-black">
                Periode Grace Period
              </div>
              <div className="mt-[4px] text-[11.5px] font-normal leading-relaxed text-[#315E8F]">
                Pada periode ini nasabah hanya membayar bunga.
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <RemainingBillCard
            icon={HandCoins}
            label="Sisa Pokok"
            value={row.sisaPokok}
          />

          <RemainingBillCard
            icon={Clock3}
            label="Sisa Bunga"
            value={row.sisaBunga}
          />
        </div>

        <div className="mt-4 rounded-[18px] bg-[#F8FAFC] px-4 py-4 ring-1 ring-[#EEF0F4]">
          <DetailAmountRow label="Tagihan Pokok" value={row.tagihanPokok} />
          <DetailAmountRow label="Tagihan Bunga" value={row.tagihanBunga} />
          <DetailAmountRow label="Tagihan Denda" value={penalty} />

          <div className="my-[8px] h-px w-full bg-[#E5E7EB]" />

          <TotalAmountRow
            label="Total Tagihan Belum Dibayar"
            value={row.totalBelumDibayar}
          />
        </div>
      </div>
    </article>
  );
}