"use client";

import * as React from "react";

export default function ProductivityPrintStyles() {
  return (
    <style>
      {`
        .productivity-report-print-content .report-print-header {
          border-bottom: 0 !important;
          padding-bottom: 0 !important;
          margin-bottom: 12px !important;
        }

        .productivity-report-print-content .report-print-header > div:nth-last-child(2) {
          display: block !important;
          height: 2px !important;
          width: 100% !important;
          margin-top: 8px !important;
          background: #111827 !important;
        }

        .productivity-report-print-content .report-print-header > div:nth-last-child(1) {
          display: block !important;
          height: 1px !important;
          width: 100% !important;
          margin-top: 2px !important;
          background: #111827 !important;
        }

        @media print {
          .productivity-report-print-content .report-print-header {
            border-bottom: 0 !important;
            padding-bottom: 0 !important;
            margin-bottom: 12px !important;
          }

          .productivity-report-print-content .report-print-header > div:nth-last-child(2) {
            display: block !important;
            height: 2px !important;
            width: 100% !important;
            margin-top: 8px !important;
            background: #111827 !important;
          }

          .productivity-report-print-content .report-print-header > div:nth-last-child(1) {
            display: block !important;
            height: 1px !important;
            width: 100% !important;
            margin-top: 2px !important;
            background: #111827 !important;
          }
        }
      `}
    </style>
  );
}