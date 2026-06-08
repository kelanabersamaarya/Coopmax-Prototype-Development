"use client";

export default function MBankingLoanTransactionHistory() {
  return (
    <section className="-mx-6 mt-7 min-h-[390px] bg-[#F2F2F2] px-6 pb-16 pt-6">
      <h2 className="text-[18px] font-extrabold leading-tight tracking-tight text-[#203064]">
        Riwayat Transaksi
      </h2>

      <div className="mt-8 flex flex-col items-center text-center">
        <svg
          viewBox="0 0 220 170"
          fill="none"
          className="h-[170px] w-[220px]"
          aria-hidden="true"
        >
          <path d="M48 74L82 46H169L196 74H48Z" fill="#A8A8A8" />
          <path d="M82 46H169L194 72H105L82 46Z" fill="#BDBDBD" />
          <path d="M79 70H170V140H79V70Z" fill="#B9B9B9" />
          <path d="M79 70L105 95H194L170 70H79Z" fill="#6F6F6F" />
          <path d="M105 86H194V96H105V86Z" fill="#9B9B9B" />
          <path d="M82 46L105 70H194L170 46H82Z" fill="#B5B5B5" />

          <circle cx="108" cy="101" r="3.2" fill="#203040" />
          <circle cx="140" cy="101" r="3.2" fill="#203040" />

          <path
            d="M110 124C116 113 132 113 138 124"
            stroke="#7A7A7A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <rect x="164" y="121" width="14" height="18" fill="white" />
        </svg>

        <div className="mt-5 text-[20px] font-extrabold leading-tight tracking-tight text-[#23305A]">
          Tidak Ada Riwayat Transaksi
        </div>
      </div>
    </section>
  );
}