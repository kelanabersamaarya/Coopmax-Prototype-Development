"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const tabs = [
  "Biaya Admin",
  "Range Bunga",
  "Fee Kolektor",
  "Kupon",
  "Range Pajak Bunga",
  "Label",
] as const;

type TabId = (typeof tabs)[number];

const tabActions: Record<TabId, string[]> = {
  "Biaya Admin": ["Tambah Biaya Admin", "Tambah Biaya Admin Mbanking"],
  "Range Bunga": ["Tambah Range Bunga", "Tambah Tipe Transaksi Bunga"],
  "Fee Kolektor": ["Tambah Fee Kolektor"],
  Kupon: ["Tambah Kupon"],
  "Range Pajak Bunga": ["Tambah Range Pajak"],
  Label: ["Tambah Tabel"],
};

export default function SavingsProductAdditionalTabs({
  onAddAdminFee,
}: {
  onAddAdminFee: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<TabId>("Biaya Admin");
  const actions = tabActions[activeTab];
  const hasMultipleActions = actions.length > 1;

  function handleAction(label: string) {
    if (label === "Tambah Biaya Admin") {
      onAddAdminFee();
      return;
    }

    toast(`${label} (prototype)`, {
      description: "Form detail akan ditambahkan berikutnya.",
    });
  }

  return (
    <div className="savings-product-additional-tabs mt-8">
      <div className="mb-5 text-[18px] font-bold leading-tight text-black">
        Pengaturan
      </div>

      <div className="overflow-hidden rounded-[5px] border border-slate-200 bg-white">
        <div className="safe-x-scroll bg-[#B8C4D8]">
          <div className="flex min-w-max">
            {tabs.map((tab) => {
              const active = tab === activeTab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "h-[54px] min-w-[120px] border-r border-[#9FABBF] px-5",
                    "text-[14px] font-normal transition",
                    active
                      ? "bg-white text-[#002060]"
                      : "bg-[#B8C4D8] text-[#435775] hover:bg-[#AEBBD0]",
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-[92px] bg-white px-4 py-6">
          <div
            className={cn(
              "flex items-start gap-3",
              hasMultipleActions ? "flex-col" : "flex-wrap",
            )}
          >
            {actions.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleAction(label)}
                className={cn(
                  "inline-flex h-[35px] items-center justify-center gap-2 rounded-[5px] px-5",
                  "bg-[#3366FF] text-[14px] font-semibold text-white",
                  "ring-1 ring-[#3366FF]/25 transition hover:bg-[#2855d9]",
                  "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              >
                <Plus className="h-4 w-4" strokeWidth={3} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}