"use client";

import * as React from "react";
import {
  AUTODEBET_SCHEDULES_CHANGED_EVENT,
  getAutodebetSchedules,
} from "@/lib/autodebetSchedulesStore";

function findScheduleStatusRows() {
  return Array.from(
    document.querySelectorAll<HTMLTableRowElement>(
      "table tbody tr",
    ),
  ).filter((row) => {
    const cells = row.querySelectorAll<HTMLTableCellElement>("td");

    return (
      cells.length >= 8 &&
      cells[1]?.textContent?.trim() === "Produk Pinjaman"
    );
  });
}

function syncVisibleStatuses() {
  findScheduleStatusRows().forEach((row) => {
    const cells = row.querySelectorAll<HTMLTableCellElement>("td");
    const destinationAccount = cells[2]?.textContent?.trim() ?? "";
    const statusCell = cells[cells.length - 2];

    if (!destinationAccount || !statusCell) return;

    const schedule = Object.values(
      JSON.parse(
        window.localStorage.getItem("dyad.autodebet-schedules.v1") ?? "{}",
      ) as Record<string, ReturnType<typeof getAutodebetSchedules>>,
    )
      .flat()
      .find((item) => item.accountNo === destinationAccount);

    if (!schedule) return;

    const badge = statusCell.querySelector("span");
    if (!badge) return;

    const active = schedule.status;

    badge.textContent = active ? "Aktif" : "Tidak Aktif";
    badge.classList.toggle("bg-[#3BB001]", active);
    badge.classList.toggle("bg-[#DC3545]", !active);
  });
}

export default function AutodebetScheduleStatusSync() {
  React.useEffect(() => {
    const observer = new MutationObserver(syncVisibleStatuses);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener(AUTODEBET_SCHEDULES_CHANGED_EVENT, syncVisibleStatuses);
    syncVisibleStatuses();

    return () => {
      observer.disconnect();
      window.removeEventListener(
        AUTODEBET_SCHEDULES_CHANGED_EVENT,
        syncVisibleStatuses,
      );
    };
  }, []);

  return null;
}