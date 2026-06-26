"use client";

import * as React from "react";
import {
  BarChart3,
  ChevronDown,
  FileText,
  ReceiptText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AccountingMenuGroupId = "transaksi" | "laporan" | "pengaturan";

export type AccountingMenuItem = {
  groupId: AccountingMenuGroupId;
  groupLabel: string;
  itemLabel: string;
};

type AccountingGroup = {
  id: AccountingMenuGroupId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
};

const groups: AccountingGroup[] = [
  {
    id: "transaksi",
    label: "TRANSAKSI",
    icon: ReceiptText,
    items: [
      "Dashboard",
      "Jurnal Umum",
      "Saldo Awal",
      "Tutup Buku",
      "Pembatalan Tutup Buku",
      "Posting Jurnal Kolektif",
      "Posting Jurnal",
    ],
  },
  {
    id: "laporan",
    label: "LAPORAN",
    icon: BarChart3,
    items: [
      "Jurnal Umum",
      "Buku Kas Harian",
      "Buku Besar",
      "Neraca Harian",
      "Neraca Percobaan",
      "Perhitungan Hasil Usaha",
      "Arus Kas",
      "Neraca Saldo",
      "Perubahan Ekuitas",
      "Neraca Lajur",
    ],
  },
  {
    id: "pengaturan",
    label: "PENGATURAN",
    icon: Settings,
    items: [
      "Kode Akun",
      "Urutan Akun",
      "Akun Transaksi",
      "Tutup Kantor",
      "Perubahan Ekuitas",
      "Template Jurnal",
      "Tipe Jurnal",
    ],
  },
];

export default function AccountingSidebar({
  active,
  onChange,
  className,
}: {
  active: AccountingMenuItem;
  onChange: (item: AccountingMenuItem) => void;
  className?: string;
}) {
  const [openGroups, setOpenGroups] = React.useState<
    Record<AccountingMenuGroupId, boolean>
  >({
    transaksi: true,
    laporan: true,
    pengaturan: true,
  });

  function toggleGroup(groupId: AccountingMenuGroupId) {
    setOpenGroups((current) => ({
      ...current,
      [groupId]: !current[groupId],
    }));
  }

  return (
    <aside
      className={cn(
        "min-w-0 rounded-[5px] bg-white p-2 shadow-sm ring-1 ring-slate-200/70",
        className,
      )}
    >
      <div className="px-2 py-2">
        <div className="text-[12px] font-extrabold uppercase tracking-wide text-slate-500">
          Menu Akunting
        </div>
      </div>

      <div className="space-y-2">
        {groups.map((group) => {
          const Icon = group.icon;
          const isOpen = openGroups[group.id];

          return (
            <div key={group.id} className="rounded-[5px] bg-white">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[5px] px-2.5 py-2.5 text-left transition",
                  active.groupId === group.id
                    ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
                    : "bg-white text-slate-900 hover:bg-slate-50",
                )}
                aria-expanded={isOpen}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] bg-slate-100 text-slate-700">
                  <Icon className="h-4.5 w-4.5" />
                </span>

                <span className="min-w-0 flex-1 truncate text-[13px] font-extrabold">
                  {group.label}
                </span>

                <ChevronDown
                  className={cn(
                    "h-4.5 w-4.5 text-slate-400 transition",
                    isOpen ? "rotate-180" : "rotate-0",
                  )}
                />
              </button>

              <div
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0">
                  <div className="space-y-1 px-2 py-2">
                    {group.items.map((itemLabel) => {
                      const isActive =
                        active.groupId === group.id &&
                        active.itemLabel === itemLabel;

                      return (
                        <button
                          key={`${group.id}-${itemLabel}`}
                          type="button"
                          onClick={() =>
                            onChange({
                              groupId: group.id,
                              groupLabel: group.label,
                              itemLabel,
                            })
                          }
                          className={cn(
                            "flex w-full items-center gap-2 rounded-[5px] px-2.5 py-2 text-left transition",
                            isActive
                              ? "bg-violet-600 text-white"
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                          )}
                        >
                          <FileText
                            className={cn(
                              "h-4 w-4 shrink-0",
                              isActive ? "text-white" : "text-slate-400",
                            )}
                          />
                          <span className="min-w-0 truncate text-[13px] font-semibold">
                            {itemLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}