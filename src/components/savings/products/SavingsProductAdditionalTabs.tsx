"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  "Biaya Admin",
  "Bunga",
  "Fee Kolektor",
  "Kupon",
  "Range Pajak Bunga",
  "Label",
] as const;

type TabId = (typeof tabs)[number];

export default function SavingsProductAdditionalTabs({
  onAddAdminFee,
}: {
  onAddAdminFee: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<TabId>("Biaya Admin");

  return (
    <div className="savings-product-additional-tabs mt-8 overflow-hidden rounded-[5px] border border-slate-200 bg-white">
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
        {activeTab === "Biaya Admin" ? (
          <button
            type="button"
            onClick={onAddAdminFee}
            className={cn(
              "inline-flex h-[35px] items-center justify-center gap-2 rounded-[5px] px-5",
              "bg-[#3366FF] text-[14px] font-semibold text-white",
              "ring-1 ring-[#3366FF]/25 transition hover:bg-[#2855d9]",
              "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            Tambah Biaya Admin
          </button>
        ) : (
          <div className="text-[13px] font-normal text-slate-500">
            Pengaturan {activeTab} belum diisi.
          </div>
        )}
      </div>
    </div>
  );
}