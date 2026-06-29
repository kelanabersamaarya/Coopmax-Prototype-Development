"use client";

import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import SakEpStandardToggle from "@/components/accounting/SakEpStandardToggle";

export type AccountingMenuGroupId =
  | "transaksi"
  | "laporan"
  | "laporan-sakep"
  | "pengaturan";

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
    id: "laporan-sakep",
    label: "LAPORAN SAKEP",
    items: [
      "Posisi Keuangan",
      "Perhitungan Hasil Usaha",
      "Arus Kas",
      "Perubahan Ekuitas",
      "Catatan Atas Laporan Keuangan (CALK)",
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
  return (
    <aside
      className={cn(
        "min-w-0 rounded-[5px] bg-white p-2 shadow-sm ring-1 ring-slate-200/70",
        className,
      )}
    >
      <div className="rounded-[5px] bg-white px-2 pb-4 pt-1">
        <div className="flex items-center gap-4">
          <div className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[2px] bg-[#f7b7df] text-black">
            <Shield className="h-6 w-6" strokeWidth={2.2} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-[18px] font-semibold leading-tight text-[#002060]">
              SAK EP
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-[5px] bg-white px-0 py-1">
          <div className="min-w-0 text-[12px] font-semibold leading-snug text-[#002060]">
            Tetapkan SAK-EP Sebagai Stander
          </div>
          <SakEpStandardToggle checked />
        </div>
      </div>

      <div className="space-y-3">
        {groups.map((group) => {
          return (
            <div key={group.id} className="rounded-[5px] bg-white">
              <div className="flex w-full items-center rounded-[5px] bg-white px-2.5 py-2 text-left">
                <span className="min-w-0 flex-1 truncate text-[14px] font-bold text-black">
                  {group.label}
                </span>
              </div>

              <div className="px-2 py-1">
                <div className="space-y-0.5">
                  {group.items.map((itemLabel) => {
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
                        className="flex w-full items-center rounded-[5px] px-2.5 py-1 text-left transition hover:bg-slate-50"
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
          );
        })}
      </div>

      <div className="sr-only">
        {active.groupLabel} {active.itemLabel}
      </div>
    </aside>
  );
}