"use client";

const detailCards = [
  {
    title: "Angsuran Pokok",
  },
  {
    title: "",
  },
];

export default function EKolektorInstallmentDetailSection() {
  return (
    <div className="mt-[14px] grid grid-cols-2 gap-[14px]">
      {detailCards.map((card, index) => (
        <div
          key={`${card.title || "empty"}-${index}`}
          className="min-h-[210px] rounded-[12px] border-[1.5px] border-[#8E8E8E] bg-white px-[14px] py-[18px]"
        >
          {card.title ? (
            <div className="whitespace-nowrap text-[14px] font-extrabold leading-tight tracking-tight text-[#8A8A8A]">
              {card.title}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}