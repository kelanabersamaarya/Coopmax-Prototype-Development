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

export default function MBankingLoanInstallmentSummary({
  totalBayar = "Rp. 408.333,33",
  angsuranKe = "Angsuran Ke-1",
  status = "Belum Dibayar",
  pokok = "Rp. 208.333,33",
  bunga = "Rp. 200.000,00",
  hutangPokok = "Rp. 0,00",
  hutangBunga = "Rp. 0,00",
  denda = "Rp. 0,00",
  sisaPinjaman = "Rp. 10.000.000,00",
}: {
  totalBayar?: string;
  angsuranKe?: string;
  status?: string;
  pokok?: string;
  bunga?: string;
  hutangPokok?: string;
  hutangBunga?: string;
  denda?: string;
  sisaPinjaman?: string;
}) {
  return (
    <section className="mt-4">
      <div className="rounded-[24px] bg-white px-7 py-6 shadow-[0_4px_14px_rgba(15,23,42,0.20)] ring-1 ring-slate-100">
        <div className="grid grid-cols-2 gap-5">
          <div className="min-w-0">
            <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
              Total Bayar
            </div>
            <div className="mt-[8px] text-[14px] font-extrabold leading-tight tracking-tight text-black">
              {totalBayar}
            </div>

            <div className="mt-[10px] grid gap-[8px]">
              <AmountRow label="Pokok" value={pokok} />
              <AmountRow label="Hutang Pokok" value={hutangPokok} />
              <AmountRow label="Denda" value={denda} />
            </div>
          </div>

          <div className="min-w-0 text-right">
            <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
              {angsuranKe}
            </div>
            <div className="mt-[8px] text-[14px] font-extrabold leading-tight tracking-tight text-[#EF3E4A]">
              {status}
            </div>

            <div className="mt-[12px] grid gap-[8px]">
              <AmountRow label="Bunga" value={bunga} align="right" />
              <AmountRow label="Hutang Bunga" value={hutangBunga} align="right" />
              <AmountRow
                label="Sisa Pinjaman"
                value={sisaPinjaman}
                align="right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}