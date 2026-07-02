"use client";

export default function NewMBankingScanningAnimation() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center px-10">
      <div className="relative h-[220px] w-[220px] overflow-hidden rounded-[22px]">
        <div className="absolute inset-x-6 top-0 h-px bg-white/20" />
        <div className="absolute inset-x-6 bottom-0 h-px bg-white/20" />
        <div className="absolute inset-y-6 left-0 w-px bg-white/20" />
        <div className="absolute inset-y-6 right-0 w-px bg-white/20" />

        <div className="absolute inset-x-0 top-0 h-[72px] animate-[scan-move_1.8s_ease-in-out_infinite]">
          <div className="mx-auto h-[2px] w-[190px] rounded-full bg-[#479DF4] shadow-[0_0_18px_rgba(71,157,244,0.95)]" />
          <div className="mx-auto h-[54px] w-[190px] bg-[linear-gradient(to_bottom,rgba(71,157,244,0.32),rgba(71,157,244,0))]" />
        </div>

        <style>
          {`
            @keyframes scan-move {
              0% {
                transform: translateY(18px);
                opacity: 0.25;
              }
              12% {
                opacity: 1;
              }
              50% {
                opacity: 1;
              }
              88% {
                opacity: 1;
              }
              100% {
                transform: translateY(178px);
                opacity: 0.25;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}