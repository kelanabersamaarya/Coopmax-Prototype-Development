import { Copy, Eye, HandCoins, PieChart, TrendingUp, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingPhoneMockupShell from "@/components/mobile/new-mbanking/NewMBankingPhoneMockupShell";

function DecorativeText({
  children,
  icon: Icon,
  className,
}: {
  children: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-30 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-3.5 py-1.5",
        "text-[11.5px] font-semibold tracking-[-0.02em] text-[#479DF4]",
        "shadow-[0_8px_22px_rgba(15,23,42,0.10)] ring-1 ring-[#DCEEFF]",
        className,
      )}
    >
      {Icon ? (
        <Icon
          className="h-[13px] w-[13px] shrink-0 text-[#479DF4]"
          strokeWidth={2.7}
        />
      ) : null}
      <span>{children}</span>
    </div>
  );
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeSlice(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${centerX} ${centerY}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function PieText({
  x,
  y,
  percent,
  label,
}: {
  x: number;
  y: number;
  percent: string;
  label: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="white"
      style={{
        filter: "drop-shadow(0 1px 1px rgba(15,23,42,0.28))",
      }}
    >
      <tspan x={x} dy="0" fontSize="13" fontWeight="800">
        {percent}
      </tspan>
      <tspan x={x} dy="12" fontSize="7.5" fontWeight="600">
        {label}
      </tspan>
    </text>
  );
}

function PortfolioPieChart() {
  const center = 74;
  const radius = 66;

  return (
    <div className="relative mx-auto h-[148px] w-[148px]">
      <svg
        viewBox="0 0 148 148"
        className="h-full w-full drop-shadow-[0_8px_18px_rgba(15,23,42,0.12)]"
        aria-label="Komposisi aset"
      >
        <path
          d={describeSlice(center, center, radius, -20, 124)}
          fill="#2F80ED"
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d={describeSlice(center, center, radius, 124, 196)}
          fill="#2DAE63"
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d={describeSlice(center, center, radius, 196, 340)}
          fill="#55C7E8"
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        <PieText x={98} y={45} percent="40%" label="Kaya" />
        <PieText x={96} y={104} percent="20%" label="Deposito" />
        <PieText x={43} y={92} percent="40%" label="Mapan" />
      </svg>
    </div>
  );
}

function MiniPortfolioProductCard({
  title,
  label,
  value,
  tone = "blue",
}: {
  title: string;
  label: string;
  value: string;
  tone?: "blue" | "orange" | "teal";
}) {
  const toneClass =
    tone === "orange"
      ? "bg-[linear-gradient(135deg,#F59E0B_0%,#EA580C_56%,#C2410C_100%)]"
      : tone === "teal"
        ? "bg-[linear-gradient(135deg,#14B8A6_0%,#0F766E_55%,#115E59_100%)]"
        : "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_52%,#1D4ED8_100%)]";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[15px] px-[12px] py-[11px] text-white",
        toneClass,
      )}
    >
      <div className="pointer-events-none absolute -right-[28px] -top-[28px] h-[82px] w-[82px] rounded-full bg-white/16" />
      <div className="pointer-events-none absolute right-[22px] top-[42px] h-[40px] w-[40px] rounded-full bg-white/10" />

      <div className="relative z-10">
        <div className="truncate text-[10.5px] font-bold leading-tight text-white">
          {title}
        </div>
        <div className="mt-[10px] text-[8px] font-normal leading-none text-white/76">
          {label}
        </div>
        <div className="mt-[5px] flex items-center gap-[4px] text-[10px] font-bold leading-tight text-white">
          <span className="truncate">{value}</span>
          <Copy className="h-[9px] w-[9px] shrink-0" strokeWidth={2.4} />
        </div>
      </div>
    </div>
  );
}

export default function NewMBankingOnboardingPortfolioMockup({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[492px] w-[390px] max-w-full items-center justify-center",
        className,
      )}
    >
      <DecorativeText
        icon={PieChart}
        className="left-[8px] top-[80px] rotate-[-9deg]"
      >
        Pantau Seluruh Aset
      </DecorativeText>
      <DecorativeText
        icon={WalletCards}
        className="right-[0px] top-[154px] rotate-[9deg]"
      >
        Simpanan
      </DecorativeText>
      <DecorativeText
        icon={HandCoins}
        className="left-[2px] bottom-[128px] rotate-[7deg]"
      >
        Pinjaman
      </DecorativeText>
      <DecorativeText
        icon={TrendingUp}
        className="right-[4px] bottom-[82px] rotate-[-8deg]"
      >
        Deposito
      </DecorativeText>

      <div className="pointer-events-none absolute left-[28px] top-[152px] z-0 h-20 w-20 rounded-full bg-[#55C7E8]/14 blur-xl" />
      <div className="pointer-events-none absolute right-[18px] top-[218px] z-0 h-24 w-24 rounded-full bg-[#F59E0B]/12 blur-xl" />
      <div className="pointer-events-none absolute bottom-[50px] left-[116px] z-0 h-20 w-20 rounded-full bg-[#2DAE63]/12 blur-xl" />

      <NewMBankingPhoneMockupShell className="relative z-10">
        <div className="flex h-full flex-col overflow-hidden bg-white text-black">
          <div className="shrink-0 bg-[#F9F9F9]">
            <div className="flex h-[38px] items-center gap-[7px] px-[14px]">
              <div className="grid h-[24px] w-[24px] place-items-center rounded-[7px] bg-white text-black shadow-sm">
                <span className="text-[14px] font-bold leading-none">‹</span>
              </div>

              <div className="text-[12px] font-bold leading-tight tracking-[-0.03em] text-black">
                Portofolio
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden bg-white px-[14px] pt-[12px]">
            <div className="rounded-full bg-[#EEF0F4] p-[3px]">
              <div className="grid grid-cols-2 gap-[3px]">
                <div className="grid h-[28px] place-items-center rounded-full bg-[#479DF4] text-[9px] font-bold leading-none text-white">
                  Aset
                </div>
                <div className="grid h-[28px] place-items-center rounded-full text-[9px] font-bold leading-none text-[#4B5563]">
                  Pinjaman
                </div>
              </div>
            </div>

            <div className="relative mt-[12px] overflow-hidden rounded-[18px] bg-[#4BA2F5] px-[12px] py-[15px] text-center text-white">
              <div className="pointer-events-none absolute -left-[58px] -top-[82px] h-[160px] w-[160px] rounded-full bg-[#f56ac8]" />
              <div className="pointer-events-none absolute -right-[42px] -top-[36px] h-[112px] w-[112px] rounded-full bg-[#8fc2f3]" />
              <div className="pointer-events-none absolute -bottom-[58px] right-[-38px] h-[138px] w-[138px] rounded-full bg-[#65d0e8]" />
              <div className="pointer-events-none absolute inset-0 bg-white/10" />

              <div className="relative z-10">
                <div className="text-[9px] text-white/90">Total Aset</div>
                <div className="mt-[6px] flex items-center justify-center gap-[5px]">
                  <div className="text-[18px] font-bold leading-tight">
                    Rp. 50.000.000
                  </div>
                  <Eye className="h-[12px] w-[12px]" strokeWidth={2.4} />
                </div>
              </div>
            </div>

            <div className="mt-[13px]">
              <PortfolioPieChart />
            </div>

            <div className="mt-[11px] grid gap-[7px]">
              <MiniPortfolioProductCard
                title="Simpanan Kaya"
                label="Saldo"
                value="Rp. 20.000.000"
              />

              <MiniPortfolioProductCard
                title="Deposito Koperasi"
                label="Nominal Deposito"
                value="Rp. 10.000.000"
                tone="orange"
              />

              <MiniPortfolioProductCard
                title="Pinjaman Billing"
                label="Sisa Pinjaman"
                value="Rp. 10.000.000"
                tone="teal"
              />
            </div>
          </div>
        </div>
      </NewMBankingPhoneMockupShell>
    </div>
  );
}