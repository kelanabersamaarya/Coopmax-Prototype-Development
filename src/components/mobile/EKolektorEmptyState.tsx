"use client";

export default function EKolektorEmptyState({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <img
        src="/kolektor_empty.png"
        alt=""
        className="h-auto w-full max-w-[250px] object-contain"
      />
      <div className="mt-4 text-[18px] font-extrabold leading-tight tracking-tight text-[#23305A]">
        {title}
      </div>
    </div>
  );
}
