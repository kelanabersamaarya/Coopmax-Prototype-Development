"use client";

import * as React from "react";
import {
  BarChart3,
  Calculator,
  ChevronDown,
  ChevronRight,
  HandCoins,
  Home,
  UsersRound,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const memberItems = [
  { label: "Pendaftaran Anggota", to: "/mitra-karya/anggota/pendaftaran" },
  { label: "Anggota", to: "/mitra-karya/anggota" },
  { label: "Pendaftaran Calon Anggota", to: "/mitra-karya/calon-anggota/pendaftaran" },
  { label: "Calon Anggota", to: "/mitra-karya/calon-anggota" },
];

const reportItems = [
  { label: "Laporan Anggota", to: "/mitra-karya/laporan/anggota" },
];

export default function SidebarMitraKaryaMenu() {
  const location = useLocation();
  const memberActive = location.pathname.startsWith("/mitra-karya/anggota") || location.pathname.startsWith("/mitra-karya/calon-anggota") || location.pathname === "/anggota/transaksi";
  const memberListActive = location.pathname === "/mitra-karya/anggota" || location.pathname === "/mitra-karya/calon-anggota";
  const loanActive = location.pathname.startsWith("/mitra-karya/pinjaman");
  const reportActive = location.pathname.startsWith("/mitra-karya/laporan");
  const [memberOpen, setMemberOpen] = React.useState(memberActive);
  const [loanOpen, setLoanOpen] = React.useState(loanActive);
  const [reportOpen, setReportOpen] = React.useState(reportActive);

  React.useEffect(() => {
    if (memberActive) setMemberOpen(true);
    if (loanActive) setLoanOpen(true);
    if (reportActive) setReportOpen(true);
  }, [memberActive, loanActive, reportActive]);

  const accountingActive = location.pathname.startsWith("/mitra-karya/akunting");

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
          onClick={() => setMemberOpen((current) => !current)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left text-[13px] font-semibold transition",
            memberListActive ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200" : "text-slate-800 hover:bg-slate-50",
          )}
          aria-expanded={memberOpen}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <UsersRound className="h-4.5 w-4.5" />
          </span>
          <span className="min-w-0 flex-1">Anggota</span>
          <ChevronDown className={cn("h-4 w-4 text-slate-400 transition", memberOpen ? "rotate-180" : "")} />
        </button>

        <div className={cn("grid overflow-hidden transition-[grid-template-rows,opacity] duration-200", memberOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
          <div className="min-h-0">
            <div className="space-y-1 px-2.5 pb-2 pt-2">
              {memberItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/mitra-karya/anggota" || item.to === "/mitra-karya/calon-anggota"}
                  className={({ isActive }) => cn(
                    "flex items-center rounded-xl px-2.5 py-2 text-[13px] font-semibold transition",
                    isActive ? "bg-violet-600 text-white" : "text-slate-800 hover:bg-slate-50",
                  )}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white">
        <button
          type="button"
          onClick={() => setLoanOpen((current) => !current)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left text-[13px] font-semibold transition",
            loanActive ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200" : "text-slate-800 hover:bg-slate-50",
          )}
          aria-expanded={loanOpen}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <HandCoins className="h-4.5 w-4.5" />
          </span>
          <span className="min-w-0 flex-1">Pinjaman</span>
          <ChevronDown className={cn("h-4 w-4 text-slate-400 transition", loanOpen ? "rotate-180" : "")} />
        </button>

        <div className={cn("grid overflow-hidden transition-[grid-template-rows,opacity] duration-200", loanOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
          <div className="min-h-0">
            <div className="space-y-1 px-2.5 pb-2 pt-2">
              <NavLink
                to="/mitra-karya/pinjaman/pengajuan"
                className={({ isActive }) => cn(
                  "flex items-center rounded-xl px-2.5 py-2 text-[13px] font-semibold transition",
                  isActive ? "bg-violet-600 text-white" : "text-slate-800 hover:bg-slate-50",
                )}
              >
                Daftar Pengajuan Pinjaman
              </NavLink>
              <NavLink
                to="/mitra-karya/pinjaman/rekening"
                className={({ isActive }) => cn(
                  "flex items-center rounded-xl px-2.5 py-2 text-[13px] font-semibold transition",
                  isActive ? "bg-violet-600 text-white" : "text-slate-800 hover:bg-slate-50",
                )}
              >
                Rekening Pinjaman
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <NavLink
        to="/mitra-karya/akunting"
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left text-[13px] font-semibold transition",
          accountingActive ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200" : "text-slate-800 hover:bg-slate-50",
        )}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Calculator className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1">Akunting</span>
        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-400" />
      </NavLink>

      <div className="rounded-2xl bg-white">
        <button
          type="button"
          onClick={() => setReportOpen((current) => !current)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2.5 text-left text-[13px] font-semibold transition",
            reportActive ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200" : "text-slate-800 hover:bg-slate-50",
          )}
          aria-expanded={reportOpen}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <BarChart3 className="h-4.5 w-4.5" />
          </span>
          <span className="min-w-0 flex-1">Laporan</span>
          <ChevronDown className={cn("h-4 w-4 text-slate-400 transition", reportOpen ? "rotate-180" : "")} />
        </button>

        <div className={cn("grid overflow-hidden transition-[grid-template-rows,opacity] duration-200", reportOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
          <div className="min-h-0">
            <div className="space-y-1 px-2.5 pb-2 pt-2">
              {reportItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => cn(
                    "flex items-center rounded-xl px-2.5 py-2 text-[13px] font-semibold transition",
                    isActive ? "bg-violet-600 text-white" : "text-slate-800 hover:bg-slate-50",
                  )}
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
