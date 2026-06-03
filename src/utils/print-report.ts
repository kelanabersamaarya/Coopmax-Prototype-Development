export function openReportPrintPreview() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const styleId = "dyad-print-report-style";

  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @media print {
        @page {
          size: A4 landscape;
          margin: 5mm;
        }

        body.dyad-print-report {
          background: #ffffff !important;
        }

        body.dyad-print-report * {
          visibility: hidden !important;
        }

        body.dyad-print-report .print-report-area,
        body.dyad-print-report .print-report-area * {
          visibility: visible !important;
        }

        body.dyad-print-report .print-report-area {
          position: absolute !important;
          inset: 0 auto auto 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          background: #ffffff !important;
          color: #000000 !important;
          overflow: visible !important;
        }

        body.dyad-print-report .print-only {
          display: block !important;
        }

        body.dyad-print-report .no-print,
        body.dyad-print-report .print-hide,
        body.dyad-print-report .print-hide * {
          display: none !important;
          visibility: hidden !important;
        }

        body.dyad-print-report .safe-x-scroll,
        body.dyad-print-report .print-scroll-reset {
          overflow: visible !important;
          max-width: none !important;
          width: 100% !important;
        }

        body.dyad-print-report .safe-x-scroll::-webkit-scrollbar,
        body.dyad-print-report .print-scroll-reset::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        body.dyad-print-report .print-report-area .rounded-\\[5px\\],
        body.dyad-print-report .print-report-area .rounded-2xl,
        body.dyad-print-report .print-report-area .rounded-3xl {
          border-radius: 0 !important;
        }

        body.dyad-print-report .print-report-area .shadow-sm,
        body.dyad-print-report .print-report-area .shadow,
        body.dyad-print-report .print-report-area .shadow-xl {
          box-shadow: none !important;
        }

        body.dyad-print-report .print-report-area table {
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          table-layout: fixed !important;
          border-collapse: collapse !important;
          break-inside: auto;
        }

        body.dyad-print-report .print-report-area thead {
          display: table-header-group !important;
        }

        body.dyad-print-report .print-report-area tr {
          break-inside: avoid;
          break-after: auto;
        }

        body.dyad-print-report .print-report-area th,
        body.dyad-print-report .print-report-area td {
          width: auto !important;
          min-width: 0 !important;
          max-width: none !important;
          padding: 2px 3px !important;
          font-size: 7px !important;
          line-height: 1.08 !important;
          white-space: normal !important;
          overflow: visible !important;
          text-overflow: clip !important;
          word-break: normal !important;
          overflow-wrap: anywhere !important;
        }

        body.dyad-print-report .print-report-area th {
          font-weight: 700 !important;
          letter-spacing: 0 !important;
        }

        body.dyad-print-report .print-report-area td {
          font-weight: 500 !important;
        }

        body.dyad-print-report .print-report-area .truncate {
          overflow: visible !important;
          text-overflow: clip !important;
          white-space: normal !important;
        }

        body.dyad-print-report .print-report-area .tabular-nums,
        body.dyad-print-report .print-report-area .whitespace-nowrap {
          white-space: normal !important;
        }

        body.dyad-print-report .print-report-area .p-3,
        body.dyad-print-report .print-report-area .p-4,
        body.dyad-print-report .print-report-area .md\\:p-4 {
          padding: 0 !important;
        }

        body.dyad-print-report .print-report-area .mt-6 {
          margin-top: 6px !important;
        }

        body.dyad-print-report .print-report-area .mb-4 {
          margin-bottom: 6px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const cleanup = () => {
    document.body.classList.remove("dyad-print-report");
    window.removeEventListener("afterprint", cleanup);
  };

  document.body.classList.add("dyad-print-report");
  window.addEventListener("afterprint", cleanup);
  window.print();

  window.setTimeout(cleanup, 1000);
}