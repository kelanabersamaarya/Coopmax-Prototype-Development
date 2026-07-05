"use client";

import * as React from "react";
import {
  Droplets,
  HeartPulse,
  Landmark,
  Map,
  Monitor,
  QrCode,
  Smartphone,
  Trash2,
  Wifi,
  Zap,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SavedPaymentItem = {
  id: string;
  name: string;
  info: string;
};

type SavedPaymentCategory = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconClassName: string;
  items: SavedPaymentItem[];
};

function getCategoryId(item: SavedPaymentItem) {
  const text = `${item.name} ${item.info}`.toLowerCase();

  if (text.includes("qris")) return "qris";
  if (text.includes("pln") || text.includes("listrik")) return "electricity";
  if (text.includes("pdam") || text.includes("air")) return "water";
  if (text.includes("pbb")) return "pbb";
  if (text.includes("internet") || text.includes("indihome")) return "internet";
  if (text.includes("tv") || text.includes("transvision")) return "tv";
  if (text.includes("finance") || text.includes("adira")) return "finance";
  if (text.includes("bpjs") || text.includes("kesehatan")) return "bpjs";
  if (
    text.includes("pulsa") ||
    text.includes("pascabayar") ||
    text.includes("xl")
  ) {
    return "postpaid-phone";
  }

  return "other";
}

const categoryMeta: Record<
  string,
  {
    label: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    iconClassName: string;
  }
> = {
  qris: {
    label: "QRIS",
    icon: QrCode,
    iconClassName: "bg-[#479DF4] text-white",
  },
  electricity: {
    label: "Listrik",
    icon: Zap,
    iconClassName: "bg-[#F59E0B] text-white",
  },
  water: {
    label: "Air",
    icon: Droplets,
    iconClassName: "bg-[#06B6D4] text-white",
  },
  pbb: {
    label: "PBB",
    icon: Map,
    iconClassName: "bg-[#8B5CF6] text-white",
  },
  internet: {
    label: "Internet",
    icon: Wifi,
    iconClassName: "bg-[#2563EB] text-white",
  },
  tv: {
    label: "TV",
    icon: Monitor,
    iconClassName: "bg-[#14B8A6] text-white",
  },
  finance: {
    label: "Finance",
    icon: Landmark,
    iconClassName: "bg-[#3B82F6] text-white",
  },
  bpjs: {
    label: "BPJS Kesehatan",
    icon: HeartPulse,
    iconClassName: "bg-[#22C55E] text-white",
  },
  "postpaid-phone": {
    label: "Pulsa Pascabayar",
    icon: Smartphone,
    iconClassName: "bg-[#479DF4] text-white",
  },
  other: {
    label: "Lainnya",
    icon: Zap,
    iconClassName: "bg-[#64748B] text-white",
  },
};

const categoryOrder = [
  "qris",
  "electricity",
  "water",
  "internet",
  "bpjs",
  "postpaid-phone",
  "pbb",
  "tv",
  "finance",
  "other",
];

function groupItems(items: SavedPaymentItem[]) {
  const grouped = new Map<string, SavedPaymentItem[]>();

  items.forEach((item) => {
    const categoryId = getCategoryId(item);
    grouped.set(categoryId, [...(grouped.get(categoryId) ?? []), item]);
  });

  return categoryOrder
    .map((categoryId): SavedPaymentCategory | null => {
      const categoryItems = grouped.get(categoryId) ?? [];
      if (categoryItems.length === 0) return null;

      const meta = categoryMeta[categoryId] ?? categoryMeta.other;

      return {
        id: categoryId,
        label: meta.label,
        icon: meta.icon,
        iconClassName: meta.iconClassName,
        items: categoryItems,
      };
    })
    .filter((category): category is SavedPaymentCategory => Boolean(category));
}

function EmptySavedPayments() {
  return (
    <div className="py-[44px] text-center">
      <div className="text-[15px] font-bold text-black">
        Belum Ada Pembayaran Tersimpan
      </div>
      <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
        Pilih kategori pembayaran untuk menyimpan tagihan favorit.
      </div>
    </div>
  );
}

function SavedPaymentRow({
  item,
  icon: Icon,
  iconClassName,
  onOpen,
  onDelete,
}: {
  item: SavedPaymentItem;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconClassName: string;
  onOpen: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex min-h-[64px] items-center justify-between gap-4 py-[10px]">
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 flex-1 items-center gap-3 text-left transition active:scale-[0.99]"
        aria-label={`Buka pembayaran ${item.name}`}
      >
        <span
          className={cn(
            "grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full",
            iconClassName,
          )}
        >
          <Icon className="h-[23px] w-[23px] text-white" strokeWidth={2.35} />
        </span>

        <div className="min-w-0">
          <div className="truncate text-[14px] font-bold leading-tight tracking-[-0.015em] text-black">
            {item.name}
          </div>
          <div className="mt-[4px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
            {item.info}
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[8px] bg-[#FCE4E7] text-[#DC3545] transition active:scale-[0.96]"
        aria-label={`Hapus ${item.name}`}
        title="Hapus"
      >
        <Trash2 className="h-[16px] w-[16px] text-[#DC3545]" strokeWidth={2.7} />
      </button>
    </div>
  );
}

export default function NewMBankingSavedPaymentAccordion({
  items,
  onOpenItem,
  onDeleteItem,
}: {
  items: SavedPaymentItem[];
  onOpenItem: (item: SavedPaymentItem) => void;
  onDeleteItem: (id: string) => void;
}) {
  const categories = React.useMemo(() => groupItems(items), [items]);
  const [openIds, setOpenIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    setOpenIds(categories.map((category) => category.id));
  }, [categories]);

  function toggle(categoryId: string) {
    setOpenIds((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId],
    );
  }

  if (categories.length === 0) return <EmptySavedPayments />;

  return (
    <div className="mt-[18px] grid gap-[12px]">
      {categories.map((category) => {
        const Icon = category.icon;
        const open = openIds.includes(category.id);

        return (
          <section
            key={category.id}
            className="overflow-hidden rounded-[18px] bg-white ring-1 ring-[#EEF0F4]"
          >
            <button
              type="button"
              onClick={() => toggle(category.id)}
              className="flex min-h-[58px] w-full items-center gap-3 px-4 py-3 text-left transition active:scale-[0.99]"
              aria-expanded={open}
            >
              <span
                className={cn(
                  "grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full",
                  category.iconClassName,
                )}
              >
                <Icon className="h-[20px] w-[20px] text-white" strokeWidth={2.4} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-bold leading-tight text-black">
                  {category.label}
                </span>
                <span className="mt-[4px] block text-[11px] font-normal leading-none text-[#8F8F8F]">
                  {category.items.length} tersimpan
                </span>
              </span>

              <ChevronDown
                className={cn(
                  "h-[21px] w-[21px] shrink-0 text-black transition-transform duration-200",
                  open ? "rotate-180" : "rotate-0",
                )}
                strokeWidth={2.6}
              />
            </button>

            {open ? (
              <div className="border-t border-[#EEF0F4] px-4">
                <div className="divide-y divide-[#EEF0F4]">
                  {category.items.map((item) => (
                    <SavedPaymentRow
                      key={item.id}
                      item={item}
                      icon={category.icon}
                      iconClassName={category.iconClassName}
                      onOpen={() => onOpenItem(item)}
                      onDelete={() => onDeleteItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}