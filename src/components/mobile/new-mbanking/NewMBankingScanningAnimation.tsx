"use client";

export default function NewMBankingScanningAnimation() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[132px] top-0 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(71,157,244,0.10),transparent_58%)]" />

      <div className="absolute inset-x-0 top-0 h-[120px] animate-[scan-full-screen_2s_ease-in-out_infinite]">
        <div className="mx-auto h-[3px] w-[88%] rounded-full bg-[#479DF4] shadow-[0_0_22px_rgba(71,157,244,1)]" />
        <div className="mx-auto h-[96px] w-[88%] bg-[linear-gradient(to_bottom,rgba(71,157,244,0.34),rgba(71,157,244,0.12),rgba(71,157,244,0))]" />
      </div>

      <div className="absolute left-[8%] right-[8%] top-[18%] h-px bg-white/10" />
      <div className="absolute left-[8%] right-[8%] top-[38%] h-px bg-white/10" />
      <div className="absolute left-[8%] right-[8%] top-[58%] h-px bg-white/10" />
      <div className="absolute left-[8%] right-[8%] top-[78%] h-px bg-white/10" />

      <style>
        {`
          @keyframes scan-full-screen {
            0% {
              transform: translateY(-110px);
              opacity: 0.18;
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
              transform: translateY(calc(100vh - 250px));
              opacity: 0.18;
            }
          }
        `}
      </style>
    </div>
  );
}