"use client";

export default function EKolektorAndroidNavBar({
  onBack,
}: {
  onBack?: () => void;
}) {
  return (
    <div className="h-[32px] shrink-0 bg-[#05070d] px-6">
      <div className="flex h-full items-center justify-center gap-[54px]">
        <button
          type="button"
          onClick={onBack}
          className="grid h-7 w-9 place-items-center rounded-full transition active:bg-white/10"
          aria-label="Kembali"
          title="Kembali"
        >
          <span
            className="block h-0 w-0 border-y-[5px] border-r-[9px] border-y-transparent border-r-[#f8fafc]"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className="grid h-7 w-9 place-items-center rounded-full transition active:bg-white/10"
          aria-label="Home Android"
          title="Home"
        >
          <span
            className="block h-[9px] w-[9px] rounded-full border-[1.6px] border-[#f8fafc]"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className="grid h-7 w-9 place-items-center rounded-full transition active:bg-white/10"
          aria-label="Recent apps"
          title="Recent"
        >
          <span
            className="block h-[9px] w-[9px] rounded-[1.5px] border-[1.6px] border-[#f8fafc]"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}