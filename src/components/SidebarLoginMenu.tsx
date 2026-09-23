"use client";

import * as React from "react";
import { ChevronDown, Clock3 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function SidebarLoginMenu() {
  const location = useLocation();
  const isActive =
    location.pathname === "/login/simulasi-dashboard" ||
    location.pathname === "/login/simulasi" ||
    location.pathname === "/login/simulasi-operasional-tutup" ||
    location.pathname === "/login/simulasi-login-operasional-tutup";
  const [open, setOpen] = React.useState(isActive);

  React.useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  const linkClass = ({ isActive: linkActive }: { isActive: boolean }) =>
    cn(
      "block w-full rounded-xl px-2.5 py-2 text-[13px] font-semibold transition",
      linkActive ? "bg-violet-600 text-white" : "text-slate-800 hover:bg-slate-50",
    );

  return (
    <div className="rounded-2xl bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left transition",
          isActive
            ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
            : "bg-white text-slate-900 hover:bg-slate-50",
        )}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
          <Clock3 className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">Simulasi</span>
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
              <NavLink to="/login/simulasi-dashboard" className={linkClass}>
                Jam Operasional
              </NavLink>
              <NavLink to="/login/simulasi" className={linkClass}>
                Simulasi Login
              </NavLink>
              <NavLink to="/login/simulasi-operasional-tutup" className={linkClass}>
                Operasional Tutup
              </NavLink>
              <NavLink to="/login/simulasi-login-operasional-tutup" className={linkClass}>
                Simulasi Login Operasional Tutup
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
