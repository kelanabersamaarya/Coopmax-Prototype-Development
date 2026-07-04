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
      <div
        className={cn(
          "relative h-[285px] w-[420px] max-w-full overflow-hidden rounded-[30px] bg-[#F6FAFF] px-5 py-5 shadow-sm ring-1 ring-[#E5EEF8]",
          className,
        )}
      >
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#479DF4]/15" />
        <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-[#18B7A1]/12" />

        <div className="relative z-10">
          <div className="text-[13px] font-semibold text-[#8F8F8F]">
            Sumber Dana
          </div>

          <div className="mt-3 rounded-[18px] bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_55%,#7C3AED_100%)] px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#18B7A1]">
                <WalletCards className="h-6 w-6 text-white" strokeWidth={2.6} />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] text-white/80">Simpanan Kaya</div>
                <div className="mt-1 text-[16px] font-bold leading-tight">
                  112233111
                </div>
                <div className="mt-1 text-[12px] font-semibold text-white/90">
                  Rp. 4.000.000,00
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#479DF4] shadow-sm ring-1 ring-[#DDEBFF]">
              <Send className="h-6 w-6" strokeWidth={2.6} />
            </div>
            <div className="h-px w-16 bg-[#C7DAF5]" />
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#18B7A1] shadow-sm ring-1 ring-[#DDF7F2]">
              <CreditCard className="h-6 w-6" strokeWidth={2.6} />
            </div>
          </div>

          <div className="mt-5 rounded-[18px] bg-white px-4 py-4 shadow-sm ring-1 ring-[#E5E7EB]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[13px] font-bold text-black">
                  Transfer Antar Bank
                </div>
                <div className="mt-1 text-[11px] text-[#8F8F8F]">
                  BCA • 22111122333
                </div>
              </div>
              <div className="text-right text-[14px] font-bold text-black">
                Rp. 50.000
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "payment") {
    return (
      <div
        className={cn(
          "relative h-[285px] w-[420px] max-w-full overflow-hidden rounded-[30px] bg-[#F9FBFF] px-5 py-5 shadow-sm ring-1 ring-[#E5EEF8]",
          className,
        )}
      >
        <div className="absolute -right-10 top-8 h-36 w-36 rounded-full bg-[#F59E0B]/14" />
        <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[#479DF4]/12" />

        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "QRIS", icon: QrCode, color: "bg-[#479DF4]" },
              { label: "Bayar", icon: HandCoins, color: "bg-[#EF4444]" },
              { label: "Beli", icon: Smartphone, color: "bg-[#06B6D4]" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[18px] bg-white px-2 py-3 text-center shadow-sm ring-1 ring-[#EDF1F7]"
                >
                  <span
                    className={cn(
                      "mx-auto grid h-12 w-12 place-items-center rounded-[15px] text-white",
                      item.color,
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </span>
                  <div className="mt-2 text-[11px] font-semibold text-black">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 rounded-[24px] bg-white px-5 py-5 text-center shadow-sm ring-1 ring-[#E5E7EB]">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#EAF8EF]">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#33AA00] text-white">
                <Check className="h-8 w-8" strokeWidth={3.6} />
              </div>
            </div>

            <div className="mt-4 text-[15px] font-bold text-black">
              Transaksi Berhasil
            </div>
            <div className="mt-2 text-[22px] font-bold text-black">
              Rp. 50.000,00
            </div>
            <div className="mt-2 text-[11px] text-[#8F8F8F]">
              Mini Mart • QRIS
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-[285px] w-[420px] max-w-full overflow-hidden rounded-[30px] bg-[#F8FAFC] px-5 py-5 shadow-sm ring-1 ring-[#E5EEF8]",
        className,
      )}
    >
      <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#7C3AED]/12" />
      <div className="absolute -bottom-10 left-8 h-32 w-32 rounded-full bg-[#14B8A6]/12" />

      <div className="relative z-10">
        <div className="rounded-[22px] bg-[#4BA2F5] px-5 py-5 text-center text-white">
          <div className="text-[12px] text-white/90">Total Aset</div>
          <div className="mt-2 text-[24px] font-bold">Rp. 50.000.000,00</div>
        </div>

        <div className="mt-5 grid grid-cols-[120px_minmax(0,1fr)] gap-4">
          <div className="relative h-[120px] w-[120px] rounded-full bg-[#55C7E8]">
            <div className="absolute right-0 top-0 h-[70px] w-[70px] rounded-tr-full bg-[#2F80ED]" />
            <div className="absolute bottom-0 right-0 h-[68px] w-[68px] rounded-br-full bg-[#2DAE63]" />
            <div className="absolute left-1/2 top-1/2 grid h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white">
              <ShieldCheck className="h-7 w-7 text-[#479DF4]" strokeWidth={2.5} />
            </div>
          </div>

          <div className="grid gap-3">
            {[
              ["Simpanan Kaya", "40%"],
              ["Simpanan Mapan", "40%"],
              ["Deposito", "20%"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-[15px] bg-white px-4 py-3 shadow-sm ring-1 ring-[#EEF0F4]"
              >
                <div className="text-[12px] font-semibold text-black">{label}</div>
                <div className="text-[12px] font-bold text-[#479DF4]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}