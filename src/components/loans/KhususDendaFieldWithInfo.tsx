"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import PenaltyDetailDialog, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialog";

function formatDmy(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function formatIdrLike(n: number) {
  const s = Math.round(Number.isFinite(n) ? n : 0).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const PENALTY_DETAIL_DAYS = 3;
const PENALTY_PER_DAY = 25000;

function buildPenaltyDetailRows(): PenaltyDetailRow[] {
  const due = new Date(2026, 0, 25); // 25-01-2026 (biar match contoh)
  return Array.from({ length: PENALTY_DETAIL_DAYS }).map((_v, i) => ({
    tanggalKeterlambatan: formatDmy(addDays(due, i + 1)),
    nominalDenda: formatIdrLike(PENALTY_PER_DAY),
  }));
}

export default function KhususDendaFieldWithInfo({
  value,
  onChange,
  disabled,
  inputClassName,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  inputClassName: string;
}) {
  const [open, setOpen] = React.useState(false);
  const rows = React.useMemo(() => buildPenaltyDetailRows(), []);

  return (
    <>
      <PenaltyDetailDialog open={open} onOpenChange={setOpen} rows={rows} />

      <div className="flex items-stretch gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClassName, "min-w-0 flex-1")}
          placeholder="0"
          inputMode="decimal"
          disabled={disabled}
        />

        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={disabled}
          className={cn(
            "inline-flex h-[30px] w-[30px] items-center justify-center rounded-full",
            "bg-[#2563eb] text-white ring-2 ring-[#2563eb]/20 transition hover:bg-[#1d4ed8]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563eb]/25",
            disabled ? "opacity-60 pointer-events-none" : "",
          )}
          aria-label="Rincian denda"
          title="Rincian denda"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}