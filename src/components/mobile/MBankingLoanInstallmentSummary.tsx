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

function SummaryColumn({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="grid gap-0">
      {items.map((item) => (
        <div key={item.label} className="border-t border-[#B8B8B8] py-[14px]">
          <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
            {item.label}
          </div>
          <div className="mt-[9px] text-[20px] font-extrabold leading-none tracking-tight text-[#203064]">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MBankingLoanInstallmentSummary() {
  return (
    <section className="mt-5 grid grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] gap-4">
      <SummaryColumn items={leftItems} />

      <div className="min-h-full w-px bg-[#B8B8B8]" />

      <SummaryColumn items={rightItems} />
    </section>
  );
}