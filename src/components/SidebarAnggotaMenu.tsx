"use client";

import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Users, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SubItem = {
  label: string;
  to?: string; // jika ada route nyata
  disabled?: boolean;
};

const items: SubItem[] = [
  { label: "Iuran Simpanan", disabled: true },
  { label: "Transaksi", to: "/anggota/transaksi" },
];

export default function SidebarAnggotaMenu() {
  const location = useLocation();
  const isActive = location.pathname.startsWith("/anggota");
  const [open, setOpen] = React.useState<boolean>(isActive);

  React.useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

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
          <Users className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
          Anggota
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
              {items.map((it) => {
                const base =
                  "block w-full rounded-xl px-2.5 py-2 text-left text-[13px] font-semibold transition";

                if (it.disabled || !it.to) {
                  return (
                    <button
                      key={it.label}
                      type="button"
                      onClick={() =>
                        toast("Iuran Simpanan (prototype)", {
                          description: "Halaman Iuran Simpanan belum dibuat.",
                        })
                      }
                      className={cn(base, "text-slate-800 hover:bg-slate-50")}
                    >
                      {it.label}
                    </button>
                  );
                }

                return (
                  <NavLink
                    key={it.label}
                    to={it.to}
                    className={({ isActive }) =>
                      cn(
                        base,
                        isActive
                          ? "bg-violet-600 text-white"
                          : "text-slate-800 hover:bg-slate-50",
                      )
                    }
                  >
                    {it.label}
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