"use client";

import { cn } from "@/lib/utils";

const leftItems = [
  {
    title: "Angsuran Pokok",
    subtitle: "833.333",
  },
  {
    title: "Hutang Pokok",
    subtitle: "0,00",
  },
  {
    title: "Total Pokok",
    subtitle: "833.333",
  },
  {
    title: "Total Denda",
    subtitle: "0,00",
  },
];

const rightItems = [
  {
    title: "Angsuran Bunga",
    subtitle: "83.333",
  },
  {
    title: "Hutang Bunga",
    subtitle: "0,00",
  },
  {
    title: "Total Bunga",
    subtitle: "83.333",
  },
];

function DetailInfoCard({
  items,
  className,
}: {
  items: Array<{ title: string; subtitle: string }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "self-start rounded-[12px] border-[1.5px] border-[#8E8E8E] bg-white px-[14px] py-[18px]",
        className,
      )}
    >
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
    <div className="mt-[14px] grid grid-cols-2 items-start gap-[14px]">
      <DetailInfoCard items={leftItems} />
      <DetailInfoCard items={rightItems} />
    </div>
  );
}