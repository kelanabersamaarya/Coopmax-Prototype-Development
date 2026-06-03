"use client";

import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SidebarPengaturanUmumMenu() {
  const location = useLocation();
  const isActive = location.pathname.startsWith("/pengaturan-umum");

  return (
    <NavLink
      to="/pengaturan-umum"
      className={cn(
        "group relative flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left transition",
        isActive
          ? "bg-violet-50 text-violet-700 ring-1 ring-violet-100"
          : "bg-white text-slate-900 hover:bg-slate-50",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive ? (
        <span className="absolute left-0 top-1/2 h-9 w-1 -translate-y-1/2 rounded-r-full bg-violet-600" />
      ) : null}

      <span
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-2xl",
          isActive ? "bg-violet-50 text-violet-700" : "bg-slate-100 text-slate-700",
        )}
      >
        <Wrench className="h-4.5 w-4.5" />
      </span>

      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
        Pengaturan Umum
      </span>

      <ChevronDown
        className={cn(
          "h-4.5 w-4.5 transition",
          isActive ? "text-violet-300" : "text-slate-400 group-hover:text-slate-500",
        )}
      />
    </NavLink>
  );
}