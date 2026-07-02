import * as React from "react";
import { cn } from "@/lib/utils";

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
    imageSources: [
      "/onboarding_1.png",
      "/onboarding_1.jpg",
      "/onboarding_1.jpeg",
      "/onboarding_1.webp",
      "/onboarding_1",
    ],
  },
  {
    title: "Bayar dan Beli Apa Saja Lebih Cepat",
    description:
      "Mulai dari tagihan rutin, paket data, token PLN,top up e-wallet, hingga pembayaran dengan QRIS semua bisa dilakukan dari satu aplikasi.",
    imageSources: [
      "/onboarding_2.png",
      "/onboarding_2.jpg",
      "/onboarding_2.jpeg",
      "/onboarding_2.webp",
      "/onboarding_2",
    ],
  },
  {
    title: "Semua Aset Anda dalam Genggaman",
    description:
      "Akses informasi simpanan, pinjaman, dan deposito Anda secara praktis untuk membantu Anda tetap terhubung dengan kondisi keuangan.",
    imageSources: [
      "/onboarding_3.png",
      "/onboarding_3.jpg",
      "/onboarding_3.jpeg",
      "/onboarding_3.webp",
      "/onboarding_3",
    ],
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

function OnboardingIllustration({
  sources,
  title,
}: {
  sources: string[];
  title: string;
}) {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  React.useEffect(() => {
    setSourceIndex(0);
    setShowFallback(false);
  }, [sources]);

  if (showFallback) {
    return (
      <div className="grid h-[285px] w-[420px] max-w-full place-items-center rounded-[26px] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="text-center text-[13px] font-semibold text-slate-500">
          {title}
        </div>
      </div>
    );
  }

  return (
    <img
      src={sources[sourceIndex]}
      alt={title}
      className="h-[285px] w-[420px] max-w-full object-contain transition-opacity duration-300"
      draggable={false}
      onError={() => {
        const nextIndex = sourceIndex + 1;

        if (nextIndex < sources.length) {
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
              "h-[10px] rounded-full transition-all",
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
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % onboardingSlides.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9]">
      <div className="flex shrink-0 flex-col items-center px-6 pt-[30px]">
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

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 pb-[266px] pt-[16px]">
        <OnboardingIllustration
          sources={slide.imageSources}
          title={slide.title}
        />
      </div>

      <div className="absolute inset-x-0 bottom-[282px] z-20 flex justify-center">
        <OnboardingSlider activeIndex={activeSlide} onChange={setActiveSlide} />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-[266px] rounded-t-[30px] bg-white px-6 pt-[41px]">
        <div className="text-center">
          <h1 className="mx-auto max-w-[330px] text-[20px] font-semibold leading-[1.18] tracking-[-0.035em] text-black">
            {slide.title}
          </h1>
          <p className="mx-auto mt-[25px] max-w-[325px] text-[14px] font-normal leading-[1.45] tracking-[-0.01em] text-[#8F8F8F]">
            {slide.description}
          </p>
        </div>

        <div className="mt-[28px] flex items-center justify-center gap-[10px]">
          <button
            type="button"
            onClick={onRegister}
            className={cn(
              "h-[46px] w-[170px] rounded-[10px] border-2 border-[#3D98FF] bg-white",
              "text-[12px] font-normal leading-none text-[#3D98FF]",
              "transition active:scale-[0.98]",
            )}
          >
            Daftar
          </button>

          <button
            type="button"
            onClick={onLogin}
            className={cn(
              "h-[46px] w-[170px] rounded-[10px] bg-[#479DF4]",
              "text-[12px] font-normal leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}