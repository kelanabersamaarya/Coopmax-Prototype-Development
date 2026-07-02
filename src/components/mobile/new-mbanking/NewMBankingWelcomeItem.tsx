import { cn } from "@/lib/utils";

export default function NewMBankingWelcomeItem({
  className,
}: {
  className?: string;
}) {
  return (
    <section className={cn("mt-[32px]", className)}>
      <div className="text-[14px] font-normal leading-none tracking-[-0.01em] text-[#8F8F8F]">
        Selamat Datang,
      </div>

      <div className="mt-[8px] text-[24px] font-bold leading-tight tracking-[-0.04em] text-black">
        Laura Patel
      </div>
    </section>
  );
}