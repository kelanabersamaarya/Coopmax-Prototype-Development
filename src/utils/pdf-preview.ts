type PdfPreviewOptions = {
  title?: string;
  targetWindow?: Window | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
            background: #111111;
            color: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
          }

          .loading {
            min-height: 100vh;
            display: grid;
            place-items: center;
            color: #e8eaed;
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
            background: #111111;
            color: #111827;
            font-family: Arial, Helvetica, sans-serif;
          }

          body {
            overflow: hidden;
          }

          .pdf-shell {
            height: 100vh;
            display: grid;
            grid-template-rows: 50px minmax(0, 1fr);
            background: #111111;
          }

          .pdf-toolbar {
            position: relative;
            display: flex;
            align-items: center;
            height: 50px;
            padding: 0 14px;
            background: #111111;
            color: #f5f5f5;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
            font-size: 13px;
          }

          .toolbar-left,
          .toolbar-center,
          .toolbar-right {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .toolbar-left {
            min-width: 260px;
          }

          .toolbar-center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }

          .toolbar-right {
            margin-left: auto;
          }

          .toolbar-menu {
            width: 30px;
            height: 30px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            color: #f5f5f5;
            font-size: 18px;
            line-height: 1;
          }

          .toolbar-title {
            max-width: 220px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
          }

          .toolbar-page {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #ffffff;
            font-weight: 600;
          }

          .page-box,
          .zoom-box {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 34px;
            height: 26px;
            padding: 0 9px;
            border-radius: 2px;
            background: #242424;
            color: #ffffff;
            font-weight: 600;
          }

          .toolbar-divider {
            width: 1px;
            height: 24px;
            background: rgba(255, 255, 255, 0.22);
          }

          .toolbar-icon {
            width: 30px;
            height: 30px;
            display: inline-grid;
            place-items: center;
            border: 0;
            border-radius: 50%;
            background: transparent;
            color: #f5f5f5;
            cursor: pointer;
            font-size: 17px;
            line-height: 1;
          }

          .toolbar-icon:hover,
          .toolbar-menu:hover {
            background: rgba(255, 255, 255, 0.12);
          }

          .pdf-body {
            min-height: 0;
            display: grid;
            grid-template-columns: 292px minmax(0, 1fr);
            background: #111111;
          }

          .pdf-sidebar {
            min-height: 0;
            overflow: auto;
            padding: 24px 18px;
            background: #171717;
            border-right: 1px solid rgba(255, 255, 255, 0.08);
          }

          .thumb {
            width: 190px;
            margin: 0 auto 32px;
            color: #ffffff;
            text-align: center;
          }

          .thumb-card {
            height: 126px;
            overflow: hidden;
            background: #ffffff;
            border: 4px solid transparent;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
          }

          .thumb.active .thumb-card {
            border-color: #8ab4f8;
          }

          .thumb-page {
            transform: scale(0.16);
            transform-origin: top left;
            width: 1120px;
            height: 790px;
            background: #ffffff;
            color: #111827;
            overflow: hidden;
          }

          .thumb-label {
            margin-top: 10px;
            color: #ffffff;
            font-size: 15px;
            font-weight: 500;
          }

          .pdf-stage {
            min-width: 0;
            min-height: 0;
            overflow: auto;
            padding: 24px 28px 40px;
            background: #111111;
          }

          .pdf-page {
            width: 1120px;
            min-height: 790px;
            margin: 0 auto;
            background: #ffffff;
            color: #111827;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
            padding: 12px;
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
          .print-scroll-reset::-webkit-scrollbar,
          .pdf-sidebar::-webkit-scrollbar,
          .pdf-stage::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }

          .safe-x-scroll::-webkit-scrollbar,
          .print-scroll-reset::-webkit-scrollbar {
            display: none;
          }

          .pdf-page .rounded-\\[5px\\],
          .pdf-page .rounded-2xl,
          .pdf-page .rounded-3xl,
          .thumb-page .rounded-\\[5px\\],
          .thumb-page .rounded-2xl,
          .thumb-page .rounded-3xl {
            border-radius: 0 !important;
          }

          .pdf-page .shadow-sm,
          .pdf-page .shadow,
          .pdf-page .shadow-xl,
          .thumb-page .shadow-sm,
          .thumb-page .shadow,
          .thumb-page .shadow-xl {
            box-shadow: none !important;
          }

          .pdf-page table,
          .thumb-page table {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
            border: 1px solid #94a3b8 !important;
          }

          .pdf-page thead,
          .thumb-page thead {
            display: table-header-group !important;
          }

          .pdf-page tr,
          .thumb-page tr {
            break-inside: avoid;
            break-after: auto;
          }

          .pdf-page th,
          .pdf-page td,
          .thumb-page th,
          .thumb-page td {
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
            border: 1px solid #94a3b8 !important;
            background-color: #ffffff !important;
            color: #111827 !important;
          }

          .pdf-page th,
          .thumb-page th {
            font-weight: 700 !important;
            letter-spacing: 0 !important;
            background-color: #f8fafc !important;
            text-align: center !important;
            vertical-align: middle !important;
          }

          .pdf-page thead th,
          .thumb-page thead th {
            text-align: center !important;
            vertical-align: middle !important;
          }

          .pdf-page td,
          .thumb-page td {
            font-weight: 500 !important;
          }

          .pdf-page .truncate,
          .thumb-page .truncate {
            overflow: visible !important;
            text-overflow: clip !important;
            white-space: normal !important;
          }

          .pdf-page .tabular-nums,
          .pdf-page .whitespace-nowrap,
          .thumb-page .tabular-nums,
          .thumb-page .whitespace-nowrap {
            white-space: normal !important;
          }

          .pdf-page .p-3,
          .pdf-page .p-4,
          .pdf-page .md\\:p-4,
          .thumb-page .p-3,
          .thumb-page .p-4,
          .thumb-page .md\\:p-4 {
            padding: 0 !important;
          }

          .pdf-page .mt-6,
          .thumb-page .mt-6 {
            margin-top: 6px !important;
          }

          .pdf-page .mb-4,
          .thumb-page .mb-4 {
            margin-bottom: 6px !important;
          }

          @media print {
            @page {
              size: A4 landscape;
              margin: 5mm;
            }

            body {
              overflow: visible;
              background: #ffffff !important;
            }

            .pdf-toolbar,
            .pdf-sidebar {
              display: none !important;
            }

            .pdf-shell,
            .pdf-body,
            .pdf-stage {
              display: block !important;
              height: auto !important;
              overflow: visible !important;
              background: #ffffff !important;
              padding: 0 !important;
            }

            .pdf-page {
              width: 100% !important;
              min-height: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
            }
          }
        </style>
      </head>

      <body>
        <div class="pdf-shell">
          <div class="pdf-toolbar">
            <div class="toolbar-left">
              <div class="toolbar-menu">☰</div>
              <div class="toolbar-title">${safeTitle}</div>
            </div>

            <div class="toolbar-center">
              <div class="toolbar-page">
                <span class="page-box">1</span>
                <span>/</span>
                <span>2</span>
              </div>

              <div class="toolbar-divider"></div>

              <button class="toolbar-icon" type="button" aria-label="Zoom out">−</button>
              <span class="zoom-box">75%</span>
              <button class="toolbar-icon" type="button" aria-label="Zoom in">+</button>

              <div class="toolbar-divider"></div>

              <button class="toolbar-icon" type="button" aria-label="Fit page">▣</button>
              <button class="toolbar-icon" type="button" aria-label="Rotate">⟲</button>
            </div>

            <div class="toolbar-right">
              <button class="toolbar-icon" type="button" aria-label="Download">⇩</button>
              <button class="toolbar-icon" type="button" aria-label="Print" onclick="window.print()">⎙</button>
              <button class="toolbar-icon" type="button" aria-label="More">⋮</button>
            </div>
          </div>

          <div class="pdf-body">
            <aside class="pdf-sidebar">
              <div class="thumb active">
                <div class="thumb-card">
                  <div class="thumb-page">${reportHtml}</div>
                </div>
                <div class="thumb-label">1</div>
              </div>

              <div class="thumb">
                <div class="thumb-card">
                  <div class="thumb-page"></div>
                </div>
                <div class="thumb-label">2</div>
              </div>
            </aside>

            <main class="pdf-stage">
              <section class="pdf-page">${reportHtml}</section>
            </main>
          </div>
        </div>
      </body>
    </html>
  `);
  previewWindow.document.close();
  previewWindow.focus();
}