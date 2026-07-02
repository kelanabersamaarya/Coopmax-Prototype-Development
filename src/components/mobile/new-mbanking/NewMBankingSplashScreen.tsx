import logoUrl from "@/assets/mobile/new-mbanking/logo.svg";

export default function NewMBankingSplashScreen() {
  return (
    <div className="relative flex h-full min-h-full overflow-hidden bg-[#EEF6FF] px-8 py-10 text-[#102A43]">
      <div className="absolute -right-14 top-16 h-44 w-44 rounded-full bg-[#0B63CE]/12" />
      <div className="absolute -left-20 bottom-20 h-56 w-56 rounded-full bg-[#18B7A1]/14" />
      <div className="absolute bottom-10 right-8 h-20 w-20 rounded-[2rem] bg-[#F59E0B]/16 rotate-12" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-[2.2rem] bg-white shadow-[0_22px_55px_rgba(11,99,206,0.18)] ring-1 ring-[#0B63CE]/10 animate-[fade-in_0.7s_ease-out_both]">
          <img src={logoUrl} alt="New Mbanking" className="h-14 w-14 object-contain object-left" />
        </div>

        <img
          src={logoUrl}
          alt="New Mbanking"
          className="h-[42px] w-auto animate-[fade-in_0.8s_ease-out_0.12s_both]"
        />

        <p className="mt-5 max-w-[250px] text-[14px] font-medium leading-relaxed text-[#486581] animate-[fade-in_0.8s_ease-out_0.24s_both]">
          Mobile banking koperasi yang lebih cepat, aman, dan nyaman.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 text-center">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#0B63CE]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#18B7A1] [animation-delay:120ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#F59E0B] [animation-delay:240ms]" />
        </div>
        <p className="text-[11px] font-semibold tracking-[0.22em] text-[#829AB1]">
          NEW_MBANKING
        </p>
      </div>
    </div>
  );
}