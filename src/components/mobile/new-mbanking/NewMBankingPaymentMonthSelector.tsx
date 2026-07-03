import { cn } from "@/lib/utils";

const monthOptions = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export default function NewMBankingPaymentMonthSelector({
  activeMonth,
  onChange,
  className,
}: {
  activeMonth: string;
  onChange: (month: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-[9px] overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {monthOptions.map((month) => {
        const active = month === activeMonth;

        return (
          <button
            key={month}
            type="button"
            onClick={() => onChange(month)}
            className={cn(
              "h-[34px] shrink-0 rounded-full px-[17px]",
              "text-[13px] font-semibold leading-none transition active:scale-[0.98]",
              active
                ? "bg-[#479DF4] text-white"
                : "bg-[#F1F3F6] text-black",
            )}
            aria-current={active ? "page" : undefined}
          >
            {month}
          </button>
        );
      })}
    </div>
  );
}