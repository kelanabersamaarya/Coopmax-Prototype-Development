"use client";

export default function LoanInterestAccountCardStyle() {
  return (
    <style>
      {`
        /* Card informasi rekening pada wizard Ubah Suku Bunga */
        [data-loan-interest-wizard="true"] main > div.grid > div[class*="bg-\\\\[\\\\#17a2b8\\\\]"] {
          overflow: hidden !important;
          border-radius: 8px !important;
          background-color: #1aa0b5 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }

        /* Judul dan tombol riwayat tetap menggunakan struktur wizard asli */
        [data-loan-interest-wizard="true"] main > div.grid > div[class*="bg-\\\\[\\\\#17a2b8\\\\]"] > div:first-child {
          padding: 20px 24px 0 !important;
        }

        [data-loan-interest-wizard="true"] main > div.grid > div[class*="bg-\\\\[\\\\#17a2b8\\\\]"] > div:first-child > div:first-child {
          min-height: 28px !important;
        }

        /* Susunan field mengikuti InformasiRekeningHeader pada detail rekening */
        [data-loan-interest-wizard="true"] main > div.grid > div[class*="bg-\\\\[\\\\#17a2b8\\\\]"] > div.mt-7.grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)) !important;
          gap: 16px 40px !important;
          margin-top: 20px !important;
          padding: 0 24px 24px !important;
        }

        [data-loan-interest-wizard="true"] main > div.grid > div[class*="bg-\\\\[\\\\#17a2b8\\\\]"] > div.mt-7.grid > div {
          min-width: 0 !important;
        }

        [data-loan-interest-wizard="true"] main > div.grid > div[class*="bg-\\\\[\\\\#17a2b8\\\\]"] > div.mt-7.grid > div > div:first-child {
          color: rgba(255, 255, 255, 0.85) !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          line-height: 1.25 !important;
        }

        [data-loan-interest-wizard="true"] main > div.grid > div[class*="bg-\\\\[\\\\#17a2b8\\\\]"] > div.mt-7.grid > div > div:last-child {
          margin-top: 4px !important;
          color: #ffffff !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          line-height: 1.35 !important;
        }

        @media (max-width: 639px) {
          [data-loan-interest-wizard="true"] main > div.grid > div[class*="bg-\\\\[\\\\#17a2b8\\\\]"] > div:first-child {
            padding: 16px 16px 0 !important;
          }

          [data-loan-interest-wizard="true"] main > div.grid > div[class*="bg-\\\\[\\\\#17a2b8\\\\]"] > div.mt-7.grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-top: 16px !important;
            padding: 0 16px 16px !important;
          }
        }
      `}
    </style>
  );
}