"use client";

export default function LoanInterestAdjustmentHoverStyle() {
  return (
    <style>
      {`
        body:has([data-interest-adjustment-dialog="true"])
          [data-radix-select-content]
          [role="option"][data-highlighted],
        body:has([data-interest-adjustment-dialog="true"])
          [data-radix-select-content]
          [role="option"]:hover,
        body:has([data-interest-adjustment-dialog="true"])
          [data-radix-popper-content-wrapper]
          [role="option"][data-highlighted],
        body:has([data-interest-adjustment-dialog="true"])
          [data-radix-popper-content-wrapper]
          [role="option"]:hover {
          background-color: #2563eb !important;
          color: #ffffff !important;
        }

        body:has([data-interest-adjustment-dialog="true"])
          [data-radix-select-content]
          [role="option"][data-highlighted]
          *,
        body:has([data-interest-adjustment-dialog="true"])
          [data-radix-select-content]
          [role="option"]:hover
          *,
        body:has([data-interest-adjustment-dialog="true"])
          [data-radix-popper-content-wrapper]
          [role="option"][data-highlighted]
          *,
        body:has([data-interest-adjustment-dialog="true"])
          [data-radix-popper-content-wrapper]
          [role="option"]:hover
          * {
          color: #ffffff !important;
        }
      `}
    </style>
  );
}