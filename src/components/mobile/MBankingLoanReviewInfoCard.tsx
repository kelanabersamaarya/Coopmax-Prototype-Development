"use client";

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
        {label}
      </div>
      <div className="mt-2 text-[14px] font-extrabold leading-tight tracking-tight text-[#243464]">
        {value}
      </div>
    </div>
  );
}

export default function MBankingLoanReviewInfoCard() {
  return (
    <section className="mt-8 rounded-[26px] bg-white px-6 py-7 shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
      <div>
        <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
          Rekening Tujuan
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="grid h-[48px] w-[48px] shrink-0 place-items-center rounded-full bg-[#2CB4DC] text-[24px] font-normal leading-none text-white">
            L
          </div>

          <div className="min-w-0">
            <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
              Laura Patel
            </div>
            <div className="mt-2 text-[14px] font-extrabold leading-none tracking-tight text-[#243464]">
              7260175
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 grid gap-6">
        <InfoRow label="Jenis transaksi" value="Angsuran Pinjaman" />
        <InfoRow label="Nominal transaksi" value="Rp. 50.000,00" />
        <InfoRow label="Nominal bunga" value="Rp. 0,00" />
        <InfoRow label="Nominal denda" value="Rp. 0,00" />
      </div>
    </section>
  );
}