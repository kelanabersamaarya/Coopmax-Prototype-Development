import * as React from "react";
import { cn } from "@/lib/utils";
import NewMBankingOnboardingIllustration from "@/components/mobile/new-mbanking/NewMBankingOnboardingIllustration";

const cooperativeLogoSources = [
  "/logo koperasi_splash.png",
  "/logo koperasi_splash.jpg",
  "/logo koperasi_splash.jpeg",
  "/logo koperasi_splash.webp",
  "/logo koperasi_splash",
];

const djoinLogoSources = [
  "/logo djoin_splash.png",
  "/logo djoin_splash.jpg",
  "/logo djoin_splash.jpeg",
  "/logo djoin_splash.webp",
  "/logo djoin_splash",
];

const onboardingSlides = [
  {
    title: "Transfer Jadi Lebih Praktis",
    description:
      "Kirim dana ke sesama rekening koperasi atau ke bank lain dengan cepat, praktis, dan aman langsung dari aplikasi.",
    illustration: "transfer" as const,
  },
  {
    title: "Bayar dan Beli Apa Saja Lebih Cepat",
    description:
      "Mulai dari tagihan rutin, paket data, token PLN,top up e-wallet, hingga pembayaran dengan QRIS semua bisa dilakukan dari satu aplikasi.",
    illustration: "payment" as const,
  },
  {
    title: "Semua Aset Anda dalam Genggaman",
    description:
      "Akses informasi simpanan, pinjaman, dan deposito Anda secara praktis untuk membantu Anda tetap terhubung dengan kondisi keuangan.",
    illustration: "portfolio" as const,
  },
];

function FallbackCooperativeLogo() {
  return (
    <div className="grid h-[44px] w-[42px] place-items-center rounded-full bg-white text-[9px] font-extrabold text-[#0B63CE] ring-1 ring-slate-200">
      KSP
    </div>
  );
}

function CooperativeLogo() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) return <FallbackCooperativeLogo />;

  return (
    <img
      src={cooperativeLogoSources[sourceIndex]}
      alt="Logo koperasi"
      className="h-[44px] w-[42px] shrink-0 rounded-full object-cover"
      draggable={false}
      onError={() => {
        const nextIndex = sourceIndex + 1;

        if (nextIndex < cooperativeLogoSources.length) {
          setSourceIndex(nextIndex);
          return;
        }

        setShowFallback(true);
      }}
    />
  );
}

function DjoinLogo() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) {
    return (
      <span className="text-[19px] font-semibold leading-none tracking-[-0.02em] text-black">
        By Djoin
      </span>
    );
  }

  return (
    <img
      src={djoinLogoSources[sourceIndex]}
      alt="By Djoin"
      className="h-[27px] w-[92px] object-contain"
      draggable={false}
      onError={() => {
        const nextIndex = sourceIndex + 1;

        if (nextIndex < djoinLogoSources.length) {
          setSourceIndex(nextIndex);
          return;
        }

        setShowFallback(true);
      }}
    />
  );
}

function OnboardingSlider({
  activeIndex,
  onChange,
}: {
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="flex h-[10px] items-center justify-center gap-[6px]">
      {onboardingSlides.map((slide, index) => {
        const active = index === activeIndex;

        return (
          <button
            key={slide.title}
            type="button"
            onClick={() => onChange(index)}
            className={cn(
              "h-[10px] rounded-full transition-all duration-1000 ease-out",
              active ? "w-[31px] bg-[#479DF4]" : "w-[10px] bg-[#D8D8D8]",
            )}
            aria-label={`Buka slide ${index + 1}`}
            aria-current={active ? "true" : undefined}
          />
        );
      })}
    </div>
  );
}

export default function NewMBankingOnboardingIntro({
  onLogin,
  onRegister,
}: {
  onLogin: () => void;
  onRegister: () => void;
}) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const slide = onboardingSlides[activeSlide];

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % onboardingSlides.length);
    }, 6800);

    return () => window.clearTimeout(timeoutId);
  }, [activeSlide]);

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9]">
      <style>
        {`
          .onboarding-brand-safe {
            transform-origin: top center;
          }

          .onboarding-illustration-position {
            top: 214px;
          }

          .onboarding-illustration-scale {
            --onboarding-illustration-scale: clamp(0.56, calc((100dvh - 450px) / 492), 0.74);
          }

          @keyframes onboarding-soft-image-enter {
            0% {
              opacity: 0;
              transform: translate3d(22px, 10px, 0) scale(calc(var(--onboarding-illustration-scale) * 0.978));
              filter: blur(2px);
            }
            45% {
              opacity: 0.72;
              filter: blur(0.8px);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(var(--onboarding-illustration-scale));
              filter: blur(0);
            }
          }

          @keyframes onboarding-soft-text-enter {
            0% {
              opacity: 0;
              transform: translate3d(0, 16px, 0);
              filter: blur(1.4px);
            }
            45% {
              opacity: 0.72;
              filter: blur(0.6px);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
              filter: blur(0);
            }
          }

          @media (max-height: 760px) {
            .onboarding-illustration-position {
              top: 210px;
            }

            .onboarding-illustration-scale {
              --onboarding-illustration-scale: clamp(0.48, calc((100dvh - 430px) / 492), 0.61);
            }
          }

          @media (max-height: 680px) {
            .onboarding-illustration-position {
              top: 196px;
            }

            .onboarding-illustration-scale {
              --onboarding-illustration-scale: clamp(0.40, calc((100dvh - 404px) / 492), 0.50);
            }
          }

          @media (max-height: 600px) {
            .onboarding-brand-safe {
              transform: scale(0.9);
              padding-top: 20px !important;
            }

            .onboarding-illustration-position {
              top: 176px;
            }

            .onboarding-illustration-scale {
              --onboarding-illustration-scale: 0.36;
            }
          }

          @media (max-height: 540px) {
            .onboarding-brand-safe {
              transform: scale(0.82);
              padding-top: 14px !important;
            }

            .onboarding-illustration-position {
              top: 154px;
            }

            .onboarding-illustration-scale {
              --onboarding-illustration-scale: 0.30;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .onboarding-soft-image,
            .onboarding-soft-text {
              animation: none !important;
            }

            .onboarding-soft-image {
              transform: scale(var(--onboarding-illustration-scale));
            }
          }
        `}
      </style>

      <div className="onboarding-brand-safe relative z-30 flex shrink-0 flex-col items-center px-6 pt-[30px]">
        <div className="flex items-center justify-center gap-[10px]">
          <CooperativeLogo />
          <div className="whitespace-nowrap text-[18px] font-semibold leading-none tracking-[-0.035em] text-black">
            M-Banking Koperasi
          </div>
        </div>

        <div className="mt-[5px]">
          <DjoinLogo />
        </div>
      </div>

      <div className="onboarding-illustration-position pointer-events-none absolute inset-x-0 z-0 flex justify-center overflow-visible px-5">
        <div
          key={`image-${activeSlide}`}
          className="onboarding-soft-image onboarding-illustration-scale origin-top will-change-transform"
          style={{
            animation:
              "onboarding-soft-image-enter 1850ms cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <NewMBankingOnboardingIllustration variant={slide.illustration} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[282px] z-30 flex justify-center">
        <OnboardingSlider activeIndex={activeSlide} onChange={setActiveSlide} />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-[266px] rounded-t-[30px] bg-white px-6 pt-[41px] shadow-[0_-16px_32px_rgba(15,23,42,0.06)]">
        <div
          key={`text-${activeSlide}`}
          className="onboarding-soft-text will-change-transform"
          style={{
            animation:
              "onboarding-soft-text-enter 1750ms cubic-bezier(0.16, 1, 0.3, 1) 280ms both",
          }}
        >
          <div className="text-center">
            <h1 className="mx-auto max-w-[330px] text-[20px] font-semibold leading-[1.18] tracking-[-0.035em] text-black">
              {slide.title}
            </h1>
            <p className="mx-auto mt-[25px] max-w-[325px] text-[14px] font-normal leading-[1.45] tracking-[-0.01em] text-[#8F8F8F]">
              {slide.description}
            </p>
          </div>
        </div>

        <div className="mt-[28px] flex items-center justify-center gap-[10px]">
          <button
            type="button"
            onClick={onRegister}
            className={cn(
              "h-[46px] w-[170px] rounded-[10px] border-2 border-[#3D98FF] bg-white",
              "text-[16px] font-normal leading-none text-[#3D98FF]",
              "transition duration-300 active:scale-[0.98]",
            )}
          >
            Daftar
          </button>

          <button
            type="button"
            onClick={onLogin}
            className={cn(
              "h-[46px] w-[170px] rounded-[10px] bg-[#479DF4]",
              "text-[16px] font-normal leading-none text-white",
              "transition duration-300 active:scale-[0.98]",
            )}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}