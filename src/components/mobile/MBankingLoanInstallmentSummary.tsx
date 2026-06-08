"use client";

function AmountRow({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
        {label}
      </div>
      <div className="mt-[6px] text-[14px] font-extrabold leading-tight tracking-tight text-black">
        {value}
      </div>
    </div>
  );
}

export default function MBankingLoanInstallmentSummary() {
  return (
    <section className="mt-4">
      <div className="rounded-[24px] bg-white px-7 py-6 shadow-[0_4px_14px_rgba(15,23,42,0.20)] ring-1 ring-slate-100">
        <div className="grid grid-cols-2 gap-5">
          <div className="min-w-0">
            <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
              Total Bayar
            </div>
            <div className="mt-[8px] text-[14px] font-extrabold leading-tight tracking-tight text-black">
              Rp. 408.333,33
            </div>

            <div className="mt-[10px] grid gap-[8px]">
              <AmountRow label="Pokok" value="Rp. 208.333,33" />
              <AmountRow label="Hutang Pokok" value="Rp. 0,00" />
              <AmountRow label="Denda" value="Rp. 0,00" />
            </div>
          </div>

          <div className="min-w-0 text-right">
            <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
              Angsuran Ke-1
            </div>
            <div className="mt-[8px] text-[14px] font-extrabold leading-tight tracking-tight text-[#EF3E4A]">
              Belum Dibayar
            </div>

            <div className="mt-[12px] grid gap-[8px]">
              <AmountRow label="Bunga" value="Rp. 200.000,00" align="right" />
              <AmountRow label="Hutang Bunga" value="Rp. 0,00" align="right" />
              <AmountRow
                label="Sisa Pinjaman"
                value="Rp. 10.000.000,00"
                align="right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}