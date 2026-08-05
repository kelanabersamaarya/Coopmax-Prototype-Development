"use client";

import * as React from "react";
import { BarChart3, ChevronDown, FileBarChart2, Home } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function SidebarMitraKaryaMenu() {
  const location = useLocation();
  const reportActive = location.pathname.startsWith("/mitra-karya/laporan");
  const [reportOpen, setReportOpen] = React.useState(reportActive);

  React.useEffect(() => {
    if (reportActive) setReportOpen(true);
  }, [reportActive]);

  return (
    <div className="space-y-1">
      <NavLink
        to="/dashboard"
        className="flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-[13px] font-semibold text-slate-800 transition hover:bg-slate-50"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Home className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1">Dashboard Pengembangan</span>
      </NavLink>

      <div className="rounded-2xl bg-white">
        <button
          type="button"
          onClick={() => setReportOpen((current) => !current)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left text-[13px] font-semibold transition",
            reportActive
              ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
              : "text-slate-800 hover:bg-slate-50",
          )}
          aria-expanded={reportOpen}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <BarChart3 className="h-4.5 w-4.5" />
          </span>
          <span className="min-w-0 flex-1">Laporan</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-400 transition",
              reportOpen ? "rotate-180" : "",
            )}
          />
        </button>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200",
            reportOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <div className="px-2.5 pb-2 pt-2">
              <NavLink
                to="/mitra-karya/laporan/anggota"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-xl px-2.5 py-2 text-[13px] font-semibold transition",
                    isActive
                      ? "bg-violet-600 text-white"
                      : "text-slate-800 hover:bg-slate-50",
                  )
                }
              >
                <FileBarChart2 className="h-4 w-4" />
                Laporan Anggota
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}