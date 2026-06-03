type PdfPreviewOptions = {
  title?: string;
  targetWindow?: Window | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&")
    .replaceAll("<", "<")
    .replaceAll(">", ">")
    .replaceAll('"', "&quot;");
}

function writeLoadingPage(targetWindow: Window, title: string) {
  const safeTitle = escapeHtml(title);

  targetWindow.document.open();
  targetWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${safeTitle}</title>
        <style>
          body {
            margin: 0;
            background: #ffffff;
            color: #111827;
            font-family: Arial, Helvetica, sans-serif;
          }

          .loading {
            min-height: 100vh;
            display: grid;
            place-items: center;
            color: #334155;
            font-size: 14px;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="loading">Menyiapkan preview PDF...</div>
      </body>
    </html>
  `);
  targetWindow.document.close();
}

export function openBlankReportPdfPreview(title = "export") {
  if (typeof window === "undefined") return null;

  const targetWindow = window.open("", "_blank");
  if (!targetWindow) return null;

  writeLoadingPage(targetWindow, title);
  return targetWindow;
}

export function openReportPdfPreview({
  title = "export",
  targetWindow,
}: PdfPreviewOptions = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const previewWindow = targetWindow ?? window.open("", "_blank");
  if (!previewWindow) return;

  const reportArea = document.querySelector(".print-report-area");
  const reportHtml =
    reportArea?.innerHTML ??
    `<div class="empty-state">Laporan belum tersedia. Klik Cari terlebih dahulu.</div>`;

  const safeTitle = escapeHtml(title);

  previewWindow.document.open();
  previewWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${safeTitle}</title>
        <style>
          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            min-height: 100%;
            background: #ffffff;
            color: #111827;
            font-family: Arial, Helvetica, sans-serif;
          }

          body {
            overflow: auto;
          }

          .pdf-preview-shell {
            min-height: 100vh;
            background: #ffffff;
            padding: 0;
          }

          .pdf-page {
            width: 100%;
            max-width: 100%;
            margin: 0;
            background: #ffffff;
            color: #111827;
            padding: 0;
          }

          .empty-state {
            min-height: 320px;
            display: grid;
            place-items: center;
            color: #475569;
            font-size: 14px;
            font-weight: 700;
          }

          .print-only {
            display: block !important;
          }

          .no-print,
          .print-hide,
          .print-hide * {
            display: none !important;
          }

          .safe-x-scroll,
          .print-scroll-reset {
            overflow: visible !important;
            max-width: none !important;
            width: 100% !important;
          }

          .safe-x-scroll::-webkit-scrollbar,
          .print-scroll-reset::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }

          .pdf-page .rounded-\\[5px\\],
          .pdf-page .rounded-2xl,
          .pdf-page .rounded-3xl {
            border-radius: 0 !important;
          }

          .pdf-page .shadow-sm,
          .pdf-page .shadow,
          .pdf-page .shadow-xl {
            box-shadow: none !important;
          }

          .pdf-page table {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
            break-inside: auto;
          }

          .pdf-page thead {
            display: table-header-group !important;
          }

          .pdf-page tr {
            break-inside: avoid;
            break-after: auto;
          }

          .pdf-page th,
          .pdf-page td {
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

          .pdf-page th {
            font-weight: 700 !important;
            letter-spacing: 0 !important;
          }

          .pdf-page td {
            font-weight: 500 !important;
          }

          .pdf-page .truncate {
            overflow: visible !important;
            text-overflow: clip !important;
            white-space: normal !important;
          }

          .pdf-page .tabular-nums,
          .pdf-page .whitespace-nowrap {
            white-space: normal !important;
          }

          .pdf-page .p-3,
          .pdf-page .p-4,
          .pdf-page .md\\:p-4 {
            padding: 0 !important;
          }

          .pdf-page .mt-6 {
            margin-top: 6px !important;
          }

          .pdf-page .mb-4 {
            margin-bottom: 6px !important;
          }

          @media print {
            @page {
              size: A4 landscape;
              margin: 5mm;
            }

            html,
            body,
            .pdf-preview-shell,
            .pdf-page {
              background: #ffffff !important;
              overflow: visible !important;
            }

            .pdf-preview-shell {
              min-height: auto !important;
            }
          }
        </style>
      </head>

      <body>
        <main class="pdf-preview-shell">
          <section class="pdf-page">${reportHtml}</section>
        </main>
      </body>
    </html>
  `);
  previewWindow.document.close();
  previewWindow.focus();
}