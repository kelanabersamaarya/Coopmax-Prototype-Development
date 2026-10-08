"use client";

import * as React from "react";
import {
  Calculator,
  ChevronDown,
  ChevronRight,
  CreditCard,
  HandCoins,
  Home,
  WalletCards,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type MenuSectionProps = {
  label: string;
  icon: React.ElementType;
  active: boolean;
  items: Array<{ label: string; to: string }>;
};

function MenuSection({ label, icon: Icon, active, items }: MenuSectionProps) {
  const [open, setOpen] = React.useState(active);

  React.useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return (
    <div className="rounded-2xl bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left transition",
          active
            ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
            : "bg-white text-slate-800 hover:bg-slate-50",
        )}
        aria-expanded={open}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
          {label}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 text-slate-400 transition", open && "rotate-180")}
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
            <div className="rounded-2xl bg-white px-2 py-2">
              {items.map((item) => (
                <NavLink
                  key={item.to}
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

export default function SidebarAstitiDanaLestariMenu() {
  const location = useLocation();
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left text-[13px] font-semibold transition",
      isActive
        ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
        : "bg-white text-slate-800 hover:bg-slate-50",
    );

  return (
    <div className="space-y-1">
      <NavLink to="/dashboard" className={linkClass}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Home className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1">Dashboard Pengembangan</span>
        <ChevronRight className="h-4 w-4 text-slate-300" />
      </NavLink>

      <MenuSection
        label="Simpanan"
        icon={WalletCards}
        active={location.pathname.startsWith("/astiti-dana-lestari/simpanan")}
        items={[
          { label: "Transaksi Simpanan", to: "/astiti-dana-lestari/simpanan/transaksi" },
          { label: "Daftar Rekening", to: "/astiti-dana-lestari/simpanan/rekening" },
        ]}
      />
      <MenuSection
        label="Pinjaman"
        icon={HandCoins}
        active={location.pathname.startsWith("/astiti-dana-lestari/pinjaman")}
        items={[
          { label: "Transaksi Pinjaman", to: "/astiti-dana-lestari/pinjaman/transaksi" },
          { label: "Rekening Pinjaman", to: "/astiti-dana-lestari/pinjaman/rekening" },
        ]}
      />
      <MenuSection
        label="Simpanan Berjangka"
        icon={CreditCard}
        active={location.pathname.startsWith("/astiti-dana-lestari/simpanan-berjangka")}
        items={[
          {
            label: "Transaksi Simpanan Berjangka",
            to: "/astiti-dana-lestari/simpanan-berjangka/transaksi",
          },
          {
            label: "Rekening Simpanan Berjangka",
            to: "/astiti-dana-lestari/simpanan-berjangka/rekening",
          },
        ]}
      />

      <NavLink to="/astiti-dana-lestari/akunting" className={linkClass}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Calculator className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1">Akunting</span>
        <ChevronRight className="h-4 w-4 text-slate-300" />
      </NavLink>
    </div>
  );
}
