"use client";

export default function EKolektorEmptyState({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img
        src="/kolektor_empty.png"
        alt="Tidak Ada Data Simpanan"
        className="h-auto w-full max-w-[300px] object-contain"
      />
    </div>
  );
}
