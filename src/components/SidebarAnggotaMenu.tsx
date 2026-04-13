"use client";

import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Users, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SubItem = {
  label: string;
  to?: string; // jika ada route nyata
  disabled?: boolean;
};

const items: SubItem[] = [
  { label: "Pendaftaran Anggota", disabled: true },
  { label: "Pendaftaran Calon Anggota", disabled: true },
  { label: "Anggota", disabled: true },
  { label: "Calon Anggota", disabled: true },
  { label: "Transaksi", to: "/anggota/transaksi" },
  { label: "Cetak Buku Anggota", disabled: true },
  { label: "Kategori Anggota", disabled: true },
  { label: "Penggabungan Data", disabled: true },
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
          "group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition",
          isActive
            ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
            : "bg-white hover:bg-slate-50 text-slate-900",
        )}
        aria-expanded={open}
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Users className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[15px] font-semibold">
          Anggota
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-slate-400 transition",
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
          <div className="px-3 pb-2 pt-2">
            <div className="space-y-1 rounded-2xl bg-white px-2 py-2">
              {items.map((it) => {
                const base =
                  "block w-full rounded-xl px-3 py-2 text-[15px] font-semibold transition";
                if (it.to) {
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
                }

                return (
                  <button
                    key={it.label}
                    type="button"
                    className={cn(
                      base,
                      "text-slate-500 hover:bg-slate-50 text-left",
                      it.disabled ? "cursor-not-allowed opacity-70" : "",
                    )}
                    disabled={it.disabled}
                    onClick={() => {
                      // menu placeholder: belum ada route
                    }}
                  >
                    {it.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}