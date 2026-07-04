import {
  Banknote,
  Check,
  CreditCard,
  HandCoins,
  Landmark,
  QrCode,
  Send,
  ShieldCheck,
  Smartphone,
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
      <NewMBankingPhoneMockupShell className={className}>
        <div className="h-full bg-[#F9FBFF] px-[12px] py-[12px]">
          <div className="grid grid-cols-3 gap-[7px]">
            {[
              { label: "QRIS", icon: QrCode, color: "bg-[#479DF4]" },
              { label: "Bayar", icon: HandCoins, color: "bg-[#EF4444]" },
              { label: "Beli", icon: Smartphone, color: "bg-[#06B6D4]" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[13px] bg-white px-[5px] py-[9px] text-center shadow-sm ring-1 ring-[#EDF1F7]"
                >
                  <span
                    className={cn(
                      "mx-auto grid h-[34px] w-[34px] place-items-center rounded-[11px] text-white",
                      item.color,
                    )}
                  >
                    <Icon className="h-[17px] w-[17px]" strokeWidth={2.5} />
                  </span>
                  <div className="mt-[6px] text-[8px] font-semibold text-black">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-[18px] rounded-[20px] bg-white px-[14px] py-[18px] text-center shadow-sm ring-1 ring-[#E5E7EB]">
            <div className="mx-auto grid h-[58px] w-[58px] place-items-center rounded-full bg-[#EAF8EF]">
              <div className="grid h-[42px] w-[42px] place-items-center rounded-full bg-[#33AA00] text-white">
                <Check className="h-[27px] w-[27px]" strokeWidth={3.6} />
              </div>
            </div>

            <div className="mt-[14px] text-[12px] font-bold text-black">
              Transaksi Berhasil
            </div>
            <div className="mt-[8px] text-[18px] font-bold text-black">
              Rp. 50.000,00
            </div>
            <div className="mt-[7px] text-[9px] text-[#8F8F8F]">
              Mini Mart • QRIS
            </div>
          </div>
        </div>
      </NewMBankingPhoneMockupShell>
    );
  }

  return (
    <NewMBankingPhoneMockupShell className={className}>
      <div className="h-full bg-[#F8FAFC] px-[12px] py-[12px]">
        <div className="rounded-[17px] bg-[#4BA2F5] px-[12px] py-[15px] text-center text-white">
          <div className="text-[9px] text-white/90">Total Aset</div>
          <div className="mt-[6px] text-[18px] font-bold">Rp. 50.000.000</div>
        </div>

        <div className="mt-[18px] flex justify-center">
          <div className="relative h-[112px] w-[112px] rounded-full bg-[#55C7E8] shadow-sm">
            <div className="absolute right-0 top-0 h-[66px] w-[66px] rounded-tr-full bg-[#2F80ED]" />
            <div className="absolute bottom-0 right-0 h-[62px] w-[62px] rounded-br-full bg-[#2DAE63]" />
            <div className="absolute left-1/2 top-1/2 grid h-[48px] w-[48px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white">
              <ShieldCheck className="h-[24px] w-[24px] text-[#479DF4]" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="mt-[16px] grid gap-[7px]">
          {[
            ["Simpanan Kaya", "40%"],
            ["Simpanan Mapan", "40%"],
            ["Deposito", "20%"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-[12px] bg-white px-[10px] py-[9px] shadow-sm ring-1 ring-[#EEF0F4]"
            >
              <div className="text-[9px] font-semibold text-black">{label}</div>
              <div className="text-[9px] font-bold text-[#479DF4]">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </NewMBankingPhoneMockupShell>
  );
}