"use client";

const leftItems = [
  {
    title: "Tagihan Pokok",
    subtitle: "833.333",
  },
  {
    title: "Tagihan Bunga",
    subtitle: "83.333",
  },
  {
    title: "Tagihan Denda",
    subtitle: "75.000",
  },
  {
    title: "Total Tagihan",
    subtitle: "991.666",
  },
];

const rightItems = [
  {
    title: "Angsuran ke",
    subtitle: "1",
  },
  {
    title: "Angsuran Lunas",
    subtitle: "0",
  },
  {
    title: "Angsuran Seharusnya",
    subtitle: "0",
  },
];

function DetailInfoCard({
  items,
}: {
  items: Array<{ title: string; subtitle: string }>;
}) {
  return (
    <div className="min-h-[210px] rounded-[12px] border-[1.5px] border-[#8E8E8E] bg-white px-[14px] py-[18px]">
      <div className="grid">
        {items.map((item, index) => (
          <div key={item.title}>
            <div className={index === 0 ? "" : "pt-[13px]"}>
              <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
                {item.title}
              </div>
              <div className="mt-[8px] overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-extrabold leading-tight tracking-tight text-[#23305A]">
                {item.subtitle}
              </div>
            </div>

            {index < items.length - 1 ? (
              <div className="mt-[13px] h-px w-full bg-[#B8B8B8]" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EKolektorInstallmentDetailSection() {
  return (
    <div className="mt-[14px] grid grid-cols-2 gap-[14px]">
      <DetailInfoCard items={leftItems} />
      <DetailInfoCard items={rightItems} />
    </div>
  );
}