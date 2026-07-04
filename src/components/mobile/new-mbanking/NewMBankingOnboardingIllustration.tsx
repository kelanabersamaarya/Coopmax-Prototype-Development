import {
  Check,
  CreditCard,
  HandCoins,
  QrCode,
  Send,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingPhoneMockupShell from "@/components/mobile/new-mbanking/NewMBankingPhoneMockupShell";

type IllustrationVariant = "transfer" | "payment" | "portfolio";

export default function NewMBankingOnboardingIllustration({
  variant,
  className,
}: {
  variant: IllustrationVariant;
  className?: string;
}) {
  if (variant === "transfer") {
    return (
      <NewMBankingPhoneMockupShell className={className}>
        <div className="h-full bg-[#F6FAFF] px-[12px] py-[12px]">
          <div className="text-[9px] font-semibold text-[#8F8F8F]">
            Sumber Dana
          </div>

          <div className="mt-[8px] rounded-[15px] bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_55%,#7C3AED_100%)] px-[11px] py-[12px] text-white">
            <div className="flex items-center gap-[8px]">
              <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#18B7A1]">
                <WalletCards className="h-[18px] w-[18px] text-white" strokeWidth={2.6} />
              </span>
              <div className="min-w-0">
                <div className="text-[8px] text-white/80">Simpanan Kaya</div>
                <div className="mt-[3px] text-[12px] font-bold leading-tight">
                  112233111
                </div>
                <div className="mt-[3px] text-[9px] font-semibold text-white/90">
                  Rp. 4.000.000,00
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[18px] flex items-center justify-center gap-[8px]">
            <div className="grid h-[40px] w-[40px] place-items-center rounded-full bg-white text-[#479DF4] shadow-sm ring-1 ring-[#DDEBFF]">
              <Send className="h-[20px] w-[20px]" strokeWidth={2.6} />
            </div>
            <div className="h-px w-[40px] bg-[#C7DAF5]" />
            <div className="grid h-[40px] w-[40px] place-items-center rounded-full bg-white text-[#18B7A1] shadow-sm ring-1 ring-[#DDF7F2]">
              <CreditCard className="h-[20px] w-[20px]" strokeWidth={2.6} />
            </div>
          </div>

          <div className="mt-[18px] rounded-[15px] bg-white px-[12px] py-[13px] shadow-sm ring-1 ring-[#E5E7EB]">
            <div className="text-[11px] font-bold leading-tight text-black">
              Transfer Antar Bank
            </div>
            <div className="mt-[5px] text-[9px] text-[#8F8F8F]">
              BCA • 22111122333
            </div>
            <div className="mt-[12px] text-right text-[13px] font-bold text-black">
              Rp. 50.000
            </div>
          </div>
        </div>
      </NewMBankingPhoneMockupShell>
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