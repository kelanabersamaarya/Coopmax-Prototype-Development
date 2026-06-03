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

        .productivity-report-print-content .report-print-header .report-header-line-thick {
          display: block !important;
          height: 0 !important;
          width: 100% !important;
          margin-top: 8px !important;
          border-top: 2px solid #111827 !important;
          background: transparent !important;
        }

        .productivity-report-print-content .report-print-header .report-header-line-thin {
          display: block !important;
          height: 0 !important;
          width: 100% !important;
          margin-top: 2px !important;
          border-top: 1px solid #111827 !important;
          background: transparent !important;
        }

        @media print {
          .productivity-report-print-content .report-print-header {
            border-bottom: 0 !important;
            padding-bottom: 0 !important;
            margin-bottom: 12px !important;
          }

          .productivity-report-print-content .report-print-header .report-header-line-thick {
            display: block !important;
            height: 0 !important;
            width: 100% !important;
            margin-top: 8px !important;
            border-top: 2px solid #111827 !important;
            background: transparent !important;
          }

          .productivity-report-print-content .report-print-header .report-header-line-thin {
            display: block !important;
            height: 0 !important;
            width: 100% !important;
            margin-top: 2px !important;
            border-top: 1px solid #111827 !important;
            background: transparent !important;
          }
        }
      `}
    </style>
  );
}