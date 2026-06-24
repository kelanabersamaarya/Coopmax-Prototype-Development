"use client";

import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

type SubItem = {
  label: string;
  to: string;
};

const items: SubItem[] = [
  {
    label: "Produk Simpanan Cabang",
    to: "/sak-ep-cabang/simpanan/produk-simpanan-cabang",
  },
  {
    label: "Produk Simpanan Konsolidasi",
    to: "/sak-ep-cabang/simpanan/produk-simpanan-konsolidasi",
  },
];

export default function SidebarSakSimpananMenu() {
  const location = useLocation();
  const isActive = location.pathname.startsWith("/sak-ep-cabang/simpanan");
  const [open, setOpen] = React.useState<boolean>(isActive);

  React.useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  return (
    <div className="rounded-2xl bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left transition",
          isActive
            ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
            : "bg-white text-slate-900 hover:bg-slate-50",
        )}
        aria-expanded={open}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Landmark className="h-4.5 w-4.5" />
        </span>

        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
          Simpanan
        </span>

        <ChevronDown
          className={cn(
            "h-4.5 w-4.5 text-slate-400 transition",
            open ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="px-2.5 pb-2 pt-2">
            <div className="space-y-1 rounded-2xl bg-white px-2 py-2">
              {items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "block w-full rounded-xl px-2.5 py-2 text-[13px] font-semibold transition",
                      isActive
                        ? "bg-violet-600 text-white"
                        : "text-slate-800 hover:bg-slate-50",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}