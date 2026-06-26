"use client";

import { NavLink } from "react-router-dom";
import { Calculator, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SidebarSakAkuntingMenu() {
  return (
    <NavLink
      to="/sak-ep-cabang/akunting"
      className={({ isActive }) =>
        cn(
          "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left transition",
          isActive
            ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
            : "bg-white text-slate-900 hover:bg-slate-50",
        )
      }
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
        <Calculator className="h-4.5 w-4.5" />
      </span>

      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
        Akunting
      </span>

      <ChevronRight className="h-4.5 w-4.5 text-slate-300 group-hover:text-slate-400" />
    </NavLink>
  );
}