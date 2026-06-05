"use client";

const leftItems = [
  {
    label: "Tagihan Pokok",
    value: "833.333",
  },
  {
    label: "Tagihan Bunga",
    value: "83.333",
  },
  {
    label: "Tagihan Denda",
    value: "75.000",
  },
  {
    label: "Total Tagihan",
    value: "991.666",
  },
];

const rightItems = [
  {
    label: "Angsuran ke",
    value: "1",
  },
  {
    label: "Angsuran Lunas",
    value: "0",
  },
  {
    label: "Angsuran Seharusnya",
    value: "0",
  },
];

function SummaryBox({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="min-h-[210px] rounded-[12px] border-[1.5px] border-[#B8B8B8] bg-white px-[14px] py-[4px]">
      <div className="grid gap-0">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={index === 0 ? "py-[14px]" : "border-t border-[#B8B8B8] py-[14px]"}
          >
            <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
              {item.label}
            </div>
            <div className="mt-[9px] overflow-hidden text-ellipsis whitespace-nowrap text-[20px] font-extrabold leading-none tracking-tight text-[#203064]">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MBankingLoanInstallmentSummary() {
  return (
    <section className="mt-5 grid grid-cols-2 gap-[14px]">
      <SummaryBox items={leftItems} />
      <SummaryBox items={rightItems} />
    </section>
  );
}