"use client";

import { Calculator, ChevronRight, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function SidebarAstitiDanaLestariMenu() {
  return (
    <div className="space-y-1">
      <NavLink
        to="/astiti-dana-lestari/dashboard"
        className={({ isActive }) =>
          cn(
            "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left text-[13px] font-semibold transition",
            isActive
              ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
              : "bg-white text-slate-800 hover:bg-slate-50",
          )
        }
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Home className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1">Dashboard Pengembangan</span>
        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-400" />
      </NavLink>

      <NavLink
        to="/astiti-dana-lestari/akunting"
        className={({ isActive }) =>
          cn(
            "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left text-[13px] font-semibold transition",
            isActive
              ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
              : "bg-white text-slate-800 hover:bg-slate-50",
          )
        }
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Calculator className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1">Akunting</span>
        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-400" />
      </NavLink>
    </div>
  );
}
