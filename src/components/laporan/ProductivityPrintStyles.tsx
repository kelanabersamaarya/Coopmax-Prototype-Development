"use client";

import * as React from "react";

export default function ProductivityPrintStyles() {
  return (
    <style>
      {`
        .productivity-report-print-content .report-print-header {
          border-bottom: 4px double #111827 !important;
          padding-bottom: 8px !important;
          margin-bottom: 12px !important;
        }

        .productivity-report-print-content .report-print-header > div:nth-last-child(-n + 2) {
          display: none !important;
        }

        @media print {
          .productivity-report-print-content .report-print-header {
            border-bottom: 4px double #111827 !important;
            padding-bottom: 8px !important;
            margin-bottom: 12px !important;
          }

          .productivity-report-print-content .report-print-header > div:nth-last-child(-n + 2) {
            display: none !important;
          }
        }
      `}
    </style>
  );
}