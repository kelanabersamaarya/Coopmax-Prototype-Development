"use client";

import * as React from "react";

export default function ReportPrintHeader({
  title,
  printedAt,
  reportBasis,
  reportType,
}: {
  title: string;
  printedAt: string;
  reportBasis?: string;
  reportType?: string;
}) {
  return (
    <div
      className="hidden print-only mb-4 report-print-header"
      style={{
        display: "none",
        width: "100%",
        textAlign: "center",
        marginBottom: "12px",
        paddingBottom: "8px",
        color: "#111827",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: 1.45,
        }}
      >
        <div>Koperasi Coopmax</div>
        <div>Nomor BH : 21/KC/04-2025</div>
        <div>Email: coopmax@kop.com</div>
      </div>

      <div
        className="report-header-line-thick"
        style={{
          display: "block",
          width: "100%",
          height: "0",
          marginTop: "10px",
          borderTop: "2px solid #111827",
          background: "transparent",
        }}
      />
      <div
        className="report-header-line-thin"
        style={{
          display: "block",
          width: "100%",
          height: "0",
          marginTop: "2px",
          borderTop: "1px solid #111827",
          background: "transparent",
        }}
      />

      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "10px",
          fontSize: "17px",
          fontWeight: 800,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>

      {!reportBasis ? (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "4px",
            fontSize: "10px",
            fontWeight: 500,
            color: "#475569",
          }}
        >
          Dicetak pada {printedAt}
        </div>
      ) : null}

      {reportBasis ? (
        <div
          style={{
            width: "100%",
            marginTop: "10px",
            textAlign: "left",
            fontSize: "13px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Laporan Berdasarkan:
          {reportType ? (
            <div style={{ marginTop: "4px", fontWeight: 400 }}>
              Jenis Laporan : {reportType}
            </div>
          ) : (
            <div style={{ marginTop: "4px", fontWeight: 400 }}>{reportBasis}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
