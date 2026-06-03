"use client";

import * as React from "react";

export default function ReportPrintHeader({
  title,
  printedAt,
}: {
  title: string;
  printedAt: string;
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
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        KOPERASI COOPMAX
      </div>

      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "5px",
          fontSize: "17px",
          fontWeight: 800,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>

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

      <div
        className="report-header-line-thick"
        style={{
          display: "block",
          width: "100%",
          height: "0",
          marginTop: "8px",
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
    </div>
  );
}