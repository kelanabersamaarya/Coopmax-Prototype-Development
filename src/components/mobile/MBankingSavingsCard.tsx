"use client";

export default function MBankingSavingsCard() {
  return (
    <section className="px-6 pt-1">
      <div className="h-[147px] w-full rounded-[14px] bg-[#004FC7] px-5 py-5 text-white shadow-[0_8px_22px_rgba(0,79,199,0.20)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[16px] font-extrabold leading-tight tracking-tight text-white">
              Simpanan Sukarela
            </div>
            <div className="mt-8 text-[10px] font-normal leading-none text-[#678DD8]">
              No Rekening
            </div>
            <div className="mt-2 text-[12px] font-semibold leading-none text-white">
              4260029
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-full px-1 text-[12px] font-semibold leading-none text-white transition active:scale-[0.98]"
          >
            Detail
          </button>
        </div>
      </div>
    </section>
  );
}