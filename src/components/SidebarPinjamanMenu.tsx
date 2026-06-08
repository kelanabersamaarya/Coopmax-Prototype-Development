"use client";

import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, HandCoins } from "lucide-react";
import { cn } from "@/lib/utils";

type SubItem = {
  label: string;
  to: string;
  disabled?: boolean;
};

const items: SubItem[] = [
  { label: "Daftar Pengajuan Pinjaman", to: "/loans/applications" },
  { label: "Rekening Pinjaman", to: "/loans/accounts" },
  { label: "Transaksi Pinjaman", to: "/loans/transactions" },
  { label: "Produk Pinjaman Konsolidasi", to: "/loan-products" },
  { label: "Produk Pinjaman Cabang", to: "/loan-products/cabang" },
];

export default function SidebarPinjamanMenu() {
  const location = useLocation();

  const isActive =
    location.pathname.startsWith("/loan-products") ||
    location.pathname.startsWith("/loans") ||
    location.pathname.startsWith("/anggota/transaksi");
  const [open, setOpen] = React.useState<boolean>(isActive);

  React.useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  function isItemActive(item: SubItem) {
    if (item.to === "/loan-products") {
      return (
        location.pathname === "/loan-products" ||
        (location.pathname.startsWith("/loan-products/") &&
          location.pathname !== "/loan-products/cabang" &&
          location.search !== "?from=cabang")
      );
    }

    if (item.to === "/loan-products/cabang") {
      return (
        location.pathname === "/loan-products/cabang" ||
        (location.pathname.startsWith("/loan-products/") &&
          location.search === "?from=cabang")
      );
    }

    return location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
  }

  return (
    <div className="rounded-2xl bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left transition",
          isActive
            ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
            : "bg-white hover:bg-slate-50 text-slate-900",
        )}
        aria-expanded={open}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <HandCoins className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
          Pinjaman
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
              {items.map((item) => {
                const active = isItemActive(item);

                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={cn(
                      "block w-full rounded-xl px-2.5 py-2 text-[13px] font-semibold transition",
                      active
                        ? "bg-violet-600 text-white"
                        : "text-slate-800 hover:bg-slate-50",
                    )}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}