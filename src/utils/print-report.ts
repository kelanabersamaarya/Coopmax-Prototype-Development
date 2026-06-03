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
          margin: 8mm;
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
          background: #ffffff !important;
          color: #000000 !important;
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
        }

        body.dyad-print-report .safe-x-scroll::-webkit-scrollbar,
        body.dyad-print-report .print-scroll-reset::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        body.dyad-print-report table {
          break-inside: auto;
        }

        body.dyad-print-report tr {
          break-inside: avoid;
          break-after: auto;
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