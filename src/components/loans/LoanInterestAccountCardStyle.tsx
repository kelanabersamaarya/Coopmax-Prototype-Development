"use client";

export default function LoanInterestAccountCardStyle() {
  return (
    <style>
      {`
        [data-loan-interest-wizard="true"]
          > main
          > div.grid.gap-7
          > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\] {
          overflow: hidden !important;
          border-radius: 5px !important;
          background-color: #1aa0b5 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }

        [data-loan-interest-wizard="true"]
          > main
          > div.grid.gap-7
          > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\]
          > div:first-child {
          padding: 20px 24px 0 !important;
        }

        [data-loan-interest-wizard="true"]
          > main
          > div.grid.gap-7
          > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\]
          > div:first-child
          > div:first-child {
          min-height: 28px !important;
        }

        [data-loan-interest-wizard="true"]
          > main
          > div.grid.gap-7
          > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\]
          > div.mt-7.grid {
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 20px 40px !important;
          padding: 20px 24px 24px !important;
        }

        [data-loan-interest-wizard="true"]
          > main
          > div.grid.gap-7
          > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\]
          > div.mt-7.grid
          > div {
          min-width: 0 !important;
        }

        [data-loan-interest-wizard="true"]
          > main
          > div.grid.gap-7
          > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\]
          > div.mt-7.grid
          > div
          > div:first-child {
          color: rgb(255 255 255 / 0.85) !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          line-height: 1.25 !important;
        }

        [data-loan-interest-wizard="true"]
          > main
          > div.grid.gap-7
          > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\]
          > div.mt-7.grid
          > div
          > div:last-child {
          margin-top: 4px !important;
          color: #ffffff !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          line-height: 1.35 !important;
        }

        @media (max-width: 1023px) {
          [data-loan-interest-wizard="true"]
            > main
            > div.grid.gap-7
            > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\]
            > div.mt-7.grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 639px) {
          [data-loan-interest-wizard="true"]
            > main
            > div.grid.gap-7
            > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\]
            > div:first-child {
            padding: 16px 16px 0 !important;
          }

          [data-loan-interest-wizard="true"]
            > main
            > div.grid.gap-7
            > div.rounded-\\[8px\\].bg-\\[\\#17a2b8\\]
            > div.mt-7.grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 16px !important;
          }
        }
      `}
    </style>
  );
}