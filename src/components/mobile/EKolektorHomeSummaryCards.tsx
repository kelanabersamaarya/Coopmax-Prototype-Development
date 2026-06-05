"use client";

const cards = [
  {
    title: "Total Debitur",
    value: "128",
  },
  {
    title: "Total Tagihan",
    value: "48,2 Jt",
  },
  {
    title: "Tertagih",
    value: "12,5 Jt",
  },
];

export default function EKolektorHomeSummaryCards() {
  return (
    <div className="relative z-10 -mt-[18px] px-5">
      <div className="grid grid-cols-3 gap-[10px]">
        {cards.map((card) => (
          <div
            key={card.title}
            className="h-[123px] min-w-0 overflow-hidden rounded-[11px] bg-white shadow-[0_4px_16px_rgba(15,23,42,0.10)]"
          >
            <div className="h-[74px] rounded-t-[11px] bg-[#24b8df]" />

            <div className="px-[9px] pb-2 pt-[9px]">
              <div className="truncate text-[9px] font-normal leading-none text-[#707070]">
                {card.title}
              </div>
              <div className="mt-[7px] truncate text-[12px] font-extrabold leading-none text-[#111d4a]">
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}