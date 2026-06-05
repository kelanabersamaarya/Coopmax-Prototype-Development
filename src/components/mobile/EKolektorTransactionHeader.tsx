"use client";

export default function EKolektorTransactionHeader({
  onCancel,
}: {
  onCancel: () => void;
}) {
  return (
    <header className="relative h-[96px] shrink-0 overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
      <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
      <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <h1 className="text-[24px] font-extrabold leading-none tracking-tight text-white">
          Tambah Transaksi
        </h1>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-1 text-[14px] font-semibold leading-none text-[#BFD3F5] transition active:scale-[0.98]"
        >
          Batal
        </button>
      </div>
    </header>
  );
}