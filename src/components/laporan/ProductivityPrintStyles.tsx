"use client";

import * as React from "react";

export default function ProductivityPrintStyles() {
  return (
    <style>
      {`
        .productivity-report-print-content table thead tr:last-child th,
        .productivity-report-print-content table thead tr:first-child th[rowspan] {
          border-bottom: 2px solid #111827 !important;
        }

        @media print {
          .productivity-report-print-content table thead tr:last-child th,
          .productivity-report-print-content table thead tr:first-child th[rowspan] {
            border-bottom: 2px solid #111827 !important;
          }
        }
      `}
    </style>
  );
}