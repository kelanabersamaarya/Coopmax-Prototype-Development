import {
  Banknote,
  BatteryMedium,
  Check,
  Copy,
  Droplets,
  Eye,
  HandCoins,
  HeartPulse,
  Landmark,
  Monitor,
  PieChart,
  QrCode,
  Send,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingPhoneMockupShell from "@/components/mobile/new-mbanking/NewMBankingPhoneMockupShell";

type IllustrationVariant = "transfer" | "payment" | "portfolio";

function DecorativeText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-30 whitespace-nowrap rounded-full bg-white/90 px-3.5 py-1.5",
        "text-[11.5px] font-semibold tracking-[-0.02em] text-[#479DF4]",
        "shadow-[0_8px_22px_rgba(15,23,42,0.10)] ring-1 ring-[#DCEEFF]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function MiniStatusBar() {
  return (
    <div className="flex h-[28px] shrink-0 items-center justify-between px-[14px] pt-[6px] text-black">
      <div className="text-[9px] font-bold leading-none tracking-[-0.02em]">
        11:30
      </div>

      <div className="flex items-center gap-[4px]">
        <div className="flex h-[10px] items-end gap-[1px]" aria-hidden="true">
          <span className="h-[3px] w-[2px] rounded-full bg-black" />
          <span className="h-[5px] w-[2px] rounded-full bg-black" />
          <span className="h-[7px] w-[2px] rounded-full bg-black" />
          <span className="h-[9px] w-[2px] rounded-full bg-black" />
        </div>
        <Wifi className="h-[10px] w-[10px] text-black" strokeWidth={2.6} />
        <BatteryMedium
          className="h-[11px] w-[11px] text-black"
          strokeWidth={2.5}
        />
      </div>
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
        "relative overflow-hidden rounded-[15px] px-[12px] py-[12px] text-white",
        toneClass,
      )}
    >
      <div className="pointer-events-none absolute -right-[28px] -top-[28px] h-[82px] w-[82px] rounded-full bg-white/16" />
      <div className="pointer-events-none absolute right-[22px] top-[42px] h-[40px] w-[40px] rounded-full bg-white/10" />

      <div className="relative z-10">
        <div className="text-[11px] font-bold leading-tight text-white">
          {title}
        </div>
        <div className="mt-[12px] text-[8px] font-normal leading-none text-white/76">
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

export default function NewMBankingOnboardingIllustration({
  variant,
  className,
}: {
  variant: IllustrationVariant;
  className?: string;
}) {
  if (variant === "transfer") {
    return (
      <div className={cn("relative flex h-[492px] w-[390px] max-w-full items-center justify-center", className)}>
        <DecorativeText className="left-[0px] top-[72px] rotate-[-10deg]">
          Rekening Simpanan
        </DecorativeText>
        <DecorativeText className="right-[-4px] top-[150px] rotate-[9deg]">
          Saldo Real-time
        </DecorativeText>
        <DecorativeText className="left-[8px] bottom-[132px] rotate-[7deg]">
          Nomor VA
        </DecorativeText>
        <DecorativeText className="right-[4px] bottom-[84px] rotate-[-8deg]">
          Transfer Cepat
        </DecorativeText>

        <div className="pointer-events-none absolute left-[28px] top-[158px] z-0 h-20 w-20 rounded-full bg-[#EF4444]/10 blur-xl" />
        <div className="pointer-events-none absolute right-[24px] top-[210px] z-0 h-24 w-24 rounded-full bg-[#479DF4]/14 blur-xl" />
        <div className="pointer-events-none absolute bottom-[54px] left-[112px] z-0 h-20 w-20 rounded-full bg-[#18B7A1]/12 blur-xl" />

        <NewMBankingPhoneMockupShell className="relative z-10">
          <div className="h-full bg-white">
            <div className="bg-[#F9F9F9] px-[14px] pb-[10px] pt-[9px]">
              <div className="flex items-center gap-[7px]">
                <div className="grid h-[24px] w-[24px] place-items-center rounded-[7px] bg-white text-black shadow-sm">
                  <span className="text-[14px] font-bold leading-none">‹</span>
                </div>
                <div className="text-[12px] font-bold leading-none text-black">
                  Rekening Simpanan
                </div>
              </div>
            </div>

            <div className="h-[calc(100%-43px)] overflow-hidden bg-white px-[14px] pt-[12px]">
              <div className="relative overflow-hidden rounded-[21px] bg-[linear-gradient(135deg,#4BA2F5_0%,#2563EB_46%,#7C3AED_100%)] px-[15px] py-[16px] text-white">
                <div className="pointer-events-none absolute -right-[28px] -top-[26px] h-[84px] w-[84px] rounded-full bg-white/18" />
                <div className="pointer-events-none absolute right-[18px] top-[50px] h-[54px] w-[54px] rounded-full bg-cyan-200/18" />

                <div className="relative z-10 grid gap-[15px]">
                  <div>
                    <div className="text-[9px] font-normal text-white/80">
                      Produk Simpanan
                    </div>
                    <div className="mt-[5px] text-[14px] font-bold leading-tight">
                      Simpanan Harian
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-normal text-white/80">
                      No. Rek. Simpanan
                    </div>
                    <div className="mt-[5px] flex items-center gap-[5px] text-[12px] font-bold">
                      <span>112233111</span>
                      <span className="text-[10px] text-white/80">⧉</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-normal text-white/80">
                      Nomor VA
                    </div>
                    <div className="mt-[5px] flex items-center gap-[5px] text-[12px] font-bold">
                      <span>88810 112233111</span>
                      <span className="text-[10px] text-white/80">⧉</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-normal text-white/80">
                      Saldo Simpanan
                    </div>
                    <div className="mt-[5px] text-[14px] font-bold">
                      Rp. 4.000.000,00
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[15px] grid grid-cols-3 justify-items-center gap-[8px]">
                {[
                  {
                    label: "Transfer",
                    icon: Send,
                    color: "bg-[#18B7A1]",
                  },
                  {
                    label: "Setor",
                    icon: Banknote,
                    color: "bg-[#479DF4]",
                  },
                  {
                    label: "Bank",
                    icon: Landmark,
                    color: "bg-[#F59E0B]",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="flex flex-col items-center">
                      <span
                        className={cn(
                          "grid h-[42px] w-[42px] place-items-center rounded-[12px] text-white",
                          item.color,
                        )}
                      >
                        <Icon className="h-[20px] w-[20px]" strokeWidth={2.4} />
                      </span>
                      <span className="mt-[6px] text-[8px] font-medium leading-none text-black">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-[16px]">
                <div className="text-[11px] font-bold leading-tight text-black">
                  Riwayat Transaksi
                </div>

                <div className="mt-[9px] grid gap-[9px]">
                  {[
                    ["Setoran", "+Rp. 500.000"],
                    ["Transfer Keluar", "-Rp. 250.000"],
                  ].map(([label, amount]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-[14px] bg-[#F8FAFC] px-[11px] py-[10px] ring-1 ring-[#EEF0F4]"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-[9px] font-bold text-black">
                          {label}
                        </div>
                        <div className="mt-[3px] text-[8px] text-[#8F8F8F]">
                          20 Juni 2026
                        </div>
                      </div>
                      <div
                        className={cn(
                          "text-[9px] font-bold",
                          amount.startsWith("+")
                            ? "text-[#15965A]"
                            : "text-[#D12C3B]",
                        )}
                      >
                        {amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </NewMBankingPhoneMockupShell>
      </div>
    );
  }

  if (variant === "payment") {
    return (
      <div className={cn("relative flex h-[492px] w-[390px] max-w-full items-center justify-center", className)}>
        <DecorativeText className="left-[4px] top-[78px] rotate-[-9deg]">
          Bayar Tagihan
        </DecorativeText>
        <DecorativeText className="right-[-3px] top-[154px] rotate-[9deg]">
          Listrik & Internet
        </DecorativeText>
        <DecorativeText className="left-[2px] bottom-[128px] rotate-[7deg]">
          Pembayaran Tersimpan
        </DecorativeText>
        <DecorativeText className="right-[2px] bottom-[82px] rotate-[-8deg]">
          Riwayat Cepat
        </DecorativeText>

        <div className="pointer-events-none absolute left-[28px] top-[148px] z-0 h-20 w-20 rounded-full bg-[#F59E0B]/12 blur-xl" />
        <div className="pointer-events-none absolute right-[18px] top-[214px] z-0 h-24 w-24 rounded-full bg-[#479DF4]/14 blur-xl" />
        <div className="pointer-events-none absolute bottom-[50px] left-[118px] z-0 h-20 w-20 rounded-full bg-[#EF4444]/10 blur-xl" />

        <NewMBankingPhoneMockupShell className="relative z-10">
          <div className="flex h-full flex-col overflow-hidden bg-white text-black">
            <div className="shrink-0 bg-[#F9F9F9]">
              <MiniStatusBar />

              <div className="flex h-[38px] items-center gap-[7px] px-[14px]">
                <div className="grid h-[24px] w-[24px] place-items-center rounded-[7px] bg-white text-black shadow-sm">
                  <span className="text-[14px] font-bold leading-none">‹</span>
                </div>

                <div className="text-[12px] font-bold leading-tight tracking-[-0.03em] text-black">
                  Bayar
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden bg-[#F9F9F9]">
              <div className="bg-[#F9F9F9] px-[14px] pb-[16px] pt-[14px]">
                <div className="grid grid-cols-4 items-start gap-x-[9px] gap-y-[13px]">
                  {[
                    { label: "Listrik", icon: Zap, frame: "bg-[#F59E0B]" },
                    { label: "Air", icon: Droplets, frame: "bg-[#06B6D4]" },
                    { label: "Internet", icon: Wifi, frame: "bg-[#2563EB]" },
                    { label: "BPJS", icon: HeartPulse, frame: "bg-[#22C55E]" },
                    { label: "Pulsa", icon: Smartphone, frame: "bg-[#479DF4]" },
                    { label: "TV", icon: Monitor, frame: "bg-[#14B8A6]" },
                    { label: "QRIS", icon: QrCode, frame: "bg-[#8B5CF6]" },
                    { label: "Belanja", icon: ShoppingCart, frame: "bg-[#EF4444]" },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="flex min-w-0 flex-col items-center text-center">
                        <span
                          className={cn(
                            "grid h-[38px] w-[38px] place-items-center rounded-[11px] text-white",
                            item.frame,
                          )}
                        >
                          <Icon className="h-[18px] w-[18px] text-white" strokeWidth={2.3} />
                        </span>

                        <span className="mt-[5px] max-w-[48px] text-center text-[7.5px] font-normal leading-[1.15] text-black">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="min-h-[260px] rounded-t-[24px] bg-white px-[14px] pb-[18px] pt-[13px]">
                <div className="rounded-full bg-[#F1F3F6] p-[3px]">
                  <div className="grid grid-cols-2 gap-[3px]">
                    <div className="grid h-[28px] place-items-center rounded-full bg-[#479DF4] text-[9px] font-normal leading-none text-white">
                      Tersimpan
                    </div>
                    <div className="grid h-[28px] place-items-center rounded-full text-[9px] font-normal leading-none text-[#6B7280]">
                      Riwayat
                    </div>
                  </div>
                </div>

                <div className="mt-[13px] divide-y divide-[#EEF0F4]">
                  {[
                    {
                      title: "PLN Rumah",
                      subtitle: "Listrik - 530000112233",
                      icon: Zap,
                      tone: "bg-[#FFF7E6] text-[#F59E0B]",
                    },
                    {
                      title: "IndiHome",
                      subtitle: "Internet - 122334455667",
                      icon: Wifi,
                      tone: "bg-[#EAF3FF] text-[#2563EB]",
                    },
                    {
                      title: "BPJS Keluarga",
                      subtitle: "BPJS Kesehatan - 0001234567890",
                      icon: HeartPulse,
                      tone: "bg-[#EAF8EF] text-[#22C55E]",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex min-h-[50px] items-center justify-between gap-2 py-[8px]"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <span
                            className={cn(
                              "grid h-[32px] w-[32px] shrink-0 place-items-center rounded-full",
                              item.tone,
                            )}
                          >
                            <Icon className="h-[15px] w-[15px]" strokeWidth={2.4} />
                          </span>

                          <div className="min-w-0">
                            <div className="truncate text-[9px] font-bold leading-tight text-black">
                              {item.title}
                            </div>
                            <div className="mt-[3px] truncate text-[7.5px] font-normal leading-tight text-[#8F8F8F]">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="grid h-[24px] w-[24px] shrink-0 place-items-center rounded-[7px] bg-[#FCE4E7] text-[#DC3545]">
                          ×
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </NewMBankingPhoneMockupShell>
      </div>
    );
  }

  return (
    <div className={cn("relative flex h-[492px] w-[390px] max-w-full items-center justify-center", className)}>
      <DecorativeText className="left-[8px] top-[80px] rotate-[-9deg]">
        Total Aset
      </DecorativeText>
      <DecorativeText className="right-[0px] top-[154px] rotate-[9deg]">
        Komposisi Aset
      </DecorativeText>
      <DecorativeText className="left-[2px] bottom-[128px] rotate-[7deg]">
        Simpanan
      </DecorativeText>
      <DecorativeText className="right-[4px] bottom-[82px] rotate-[-8deg]">
        Deposito
      </DecorativeText>

      <div className="pointer-events-none absolute left-[28px] top-[152px] z-0 h-20 w-20 rounded-full bg-[#55C7E8]/14 blur-xl" />
      <div className="pointer-events-none absolute right-[18px] top-[218px] z-0 h-24 w-24 rounded-full bg-[#F59E0B]/12 blur-xl" />
      <div className="pointer-events-none absolute bottom-[50px] left-[116px] z-0 h-20 w-20 rounded-full bg-[#2DAE63]/12 blur-xl" />

      <NewMBankingPhoneMockupShell className="relative z-10">
        <div className="flex h-full flex-col overflow-hidden bg-white text-black">
          <div className="shrink-0 bg-[#F9F9F9]">
            <MiniStatusBar />

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

            <div className="mt-[16px] flex justify-center">
              <div className="relative h-[126px] w-[126px] rounded-full bg-[#55C7E8] shadow-sm">
                <div className="absolute right-0 top-0 h-[75px] w-[75px] rounded-tr-full bg-[#2F80ED]" />
                <div className="absolute bottom-0 right-0 h-[70px] w-[70px] rounded-br-full bg-[#2DAE63]" />
                <div className="absolute left-1/2 top-1/2 grid h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white">
                  <PieChart className="h-[24px] w-[24px] text-[#479DF4]" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <div className="mt-[15px] grid gap-[8px]">
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