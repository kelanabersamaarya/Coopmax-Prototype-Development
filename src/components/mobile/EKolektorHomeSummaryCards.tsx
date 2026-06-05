"use client";

const cards = [
  {
    title: "Penarikan",
    value: "10",
  },
  {
    title: "Setoran",
    value: "10",
  },
  {
    title: "Angsuran Pinjaman",
    value: "10",
  },
];

export default function EKolektorHomeSummaryCards() {
  return (
    <div className="relative z-10 mt-[10px] px-5">
      <div className="grid grid-cols-3 gap-[10px]">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex h-[123px] min-w-0 flex-col justify-center overflow-hidden rounded-[11px] bg-[#004FC7] px-[9px] text-center shadow-[0_4px_16px_rgba(15,23,42,0.10)]"
          >
            <div className="text-[30px] font-extrabold leading-none tracking-tight text-white">
              {card.value}
            </div>
            <div className="mt-3 text-[14px] font-semibold leading-tight text-white">
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}