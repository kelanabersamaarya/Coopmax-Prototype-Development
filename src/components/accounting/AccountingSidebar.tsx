"use client";

import * as React from "react";
import { ChevronsUpDown, ClipboardList } from "lucide-react";
import { Switch } from "@/components/ui/switch";
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
  items: string[];
};

const groups: AccountingGroup[] = [
  {
    id: "transaksi",
    label: "TRANSAKSI",
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
  const [sakEpStandard, setSakEpStandard] = React.useState(false);

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
      <div className="rounded-[5px] bg-white px-2 pb-4 pt-1">
        <div className="flex items-start gap-4">
          <div className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[2px] bg-[#f7b7df] text-black">
            <ClipboardList className="h-6 w-6" strokeWidth={2.2} />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[18px] font-semibold leading-tight text-[#002060]">
              ETAP
            </div>
            <div className="mt-2 text-[10px] font-normal leading-tight text-[#596882]">
              Klik untuk mengubah
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] text-[#002060] transition hover:bg-slate-50"
            aria-label="Ubah standar"
            title="Ubah standar"
          >
            <ChevronsUpDown className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </div>

        <div className="mt-7 flex items-center justify-between gap-3">
          <div className="text-[10px] font-semibold leading-tight text-[#596882]">
            Tetapkan SAK-EP Sebagai Standar
          </div>
          <Switch checked={sakEpStandard} onCheckedChange={setSakEpStandard} />
        </div>
      </div>

      <div className="space-y-3">
        {groups.map((group) => {
          const isOpen = openGroups[group.id];

          return (
            <div key={group.id} className="rounded-[5px] bg-white">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className={cn(
                  "flex w-full items-center rounded-[5px] px-2.5 py-2 text-left transition",
                  active.groupId === group.id
                    ? "bg-violet-50 ring-1 ring-violet-200"
                    : "bg-white hover:bg-slate-50",
                )}
                aria-expanded={isOpen}
              >
                <span className="min-w-0 flex-1 truncate text-[14px] font-bold text-black">
                  {group.label}
                </span>
              </button>

              <div
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0">
                  <div className="space-y-0.5 px-2 py-1">
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
                            "flex w-full items-center rounded-[5px] px-2.5 py-1 text-left transition",
                            isActive ? "bg-violet-50" : "hover:bg-slate-50",
                          )}
                        >
                          <span className="min-w-0 truncate text-[12px] font-medium text-[#596882]">
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