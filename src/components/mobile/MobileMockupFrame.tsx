type MobileScreenshot = {
  src: string;
  alt: string;
};

type MobileMockupFrameProps = {
  title?: string;
  subtitle?: string;
  screenshots: MobileScreenshot[];
};

export default function MobileMockupFrame({
  title,
  subtitle,
  screenshots,
}: MobileMockupFrameProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-2 py-0 sm:px-4">
      <div className="sr-only">
        {title}
        {subtitle ? ` ${subtitle}` : ""}
      </div>

      <div className="relative w-[min(100%,430px)] rounded-[3.35rem] bg-slate-950 p-3.5 shadow-[0_30px_80px_rgba(15,23,42,0.34)] ring-1 ring-slate-800/80 sm:p-4">
        <div className="pointer-events-none absolute left-1/2 top-3.5 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-950 shadow-sm sm:top-4">
          <div className="mx-auto mt-2 h-1.5 w-14 rounded-full bg-slate-700" />
        </div>

        <div className="relative overflow-hidden rounded-[2.65rem] bg-slate-100 ring-1 ring-white/10">
          <div className="absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-slate-100 via-slate-100/95 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-slate-100 via-slate-100/90 to-transparent" />

          <div className="h-[calc(100vh-2rem)] min-h-[760px] max-h-[1040px] overflow-y-auto overscroll-contain bg-slate-100 px-3 pb-6 pt-12 [scrollbar-width:thin] [scrollbar-color:#94a3b8_transparent] sm:px-3.5">
            {screenshots.length > 0 ? (
              <div className="space-y-3.5">
                {screenshots.map((screenshot, index) => (
                  <img
                    key={`${screenshot.src}-${index}`}
                    src={screenshot.src}
                    alt={screenshot.alt}
                    loading="lazy"
                    className="w-full rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center px-5">
                <div className="h-48 w-full rounded-[2rem] border border-dashed border-slate-300 bg-white shadow-sm" />
              </div>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[3.35rem] ring-1 ring-white/10" />
      </div>
    </section>
  );
}