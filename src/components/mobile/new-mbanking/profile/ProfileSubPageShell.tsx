import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

export default function ProfileSubPageShell({
  title,
  onBack,
  children,
  className,
}: {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const useJustifiedText =
    title === "Kebijakan Privasi" || title === "Syarat dan Ketentuan";

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="min-w-0 flex-1 truncate text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            {title}
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section
          data-profile-sub-page-title={title}
          className={cn(
            "min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]",
            useJustifiedText ? "profile-policy-justified-text" : "",
            className,
          )}
        >
          {children}
        </section>
      </main>
    </div>
  );
}