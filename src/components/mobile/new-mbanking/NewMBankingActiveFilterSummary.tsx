import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NewMBankingTransactionFilters } from "@/components/mobile/new-mbanking/NewMBankingTransactionFilterPage";

function FilterChip({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[30px] max-w-full items-center rounded-full",
        "bg-[#EEF6FF] px-[12px] py-[7px]",
        "text-[12px] font-semibold leading-tight text-[#2563EB]",
        "ring-1 ring-[#BFE0FF]",
      )}
    >
      <span className="truncate">{label}</span>
    </span>
  );
}

export default function NewMBankingActiveFilterSummary({
  filters,
  onClear,
}: {
  filters: NewMBankingTransactionFilters | null;
  onClear: () => void;
}) {
  if (!filters) return null;

  const chips: string[] = [];

  if (filters.sourceFunds.length > 0) {
    chips.push(...filters.sourceFunds.map((item) => `Sumber: ${item}`));
  }

  chips.push(`Periode: ${filters.period}`);

  if (filters.period === "Pilih Tanggal") {
    if (filters.startDate) chips.push(`Awal: ${filters.startDate}`);
    if (filters.endDate) chips.push(`Akhir: ${filters.endDate}`);
  }

  if (filters.methods.length > 0) {
    chips.push(...filters.methods.map((item) => `Metode: ${item}`));
  }

  return (
    <section className="mt-[14px] rounded-[18px] bg-[#F8FAFC] px-4 py-4 ring-1 ring-[#E5E7EB]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[13px] font-bold leading-tight text-black">
            Filter Aktif
          </div>
          <div className="mt-[4px] text-[11px] font-normal leading-relaxed text-[#8F8F8F]">
            Riwayat transaksi sedang ditampilkan sesuai filter berikut.
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className={cn(
            "inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full",
            "bg-white text-[#8F8F8F] ring-1 ring-[#D8D8D8]",
            "transition active:scale-[0.96]",
          )}
          aria-label="Hapus filter"
          title="Hapus filter"
        >
          <X className="h-[17px] w-[17px]" strokeWidth={2.6} />
        </button>
      </div>

      <div className="mt-[12px] flex flex-wrap gap-[8px]">
        {chips.map((chip) => (
          <FilterChip key={chip} label={chip} />
        ))}
      </div>
    </section>
  );
}