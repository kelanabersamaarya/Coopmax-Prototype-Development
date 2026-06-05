"use client";

export default function EKolektorRecipientInfo() {
  return (
    <div className="mb-7">
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

      <div className="mt-7 grid gap-6">
        <div>
          <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
            Jenis transaksi
          </div>
          <div className="mt-2 text-[14px] font-extrabold leading-tight tracking-tight text-[#243464]">
            Angsuran Pinjaman
          </div>
        </div>

        <div>
          <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
            Nominal transaksi
          </div>
          <div className="mt-2 text-[14px] font-extrabold leading-tight tracking-tight text-[#243464]">
            Rp. 50.000,00
          </div>
        </div>

        <div>
          <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
            Nominal bunga
          </div>
          <div className="mt-2 text-[14px] font-extrabold leading-tight tracking-tight text-[#243464]">
            Rp. 0,00
          </div>
        </div>

        <div>
          <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
            Nominal denda
          </div>
          <div className="mt-2 text-[14px] font-extrabold leading-tight tracking-tight text-[#243464]">
            Rp. 0,00
          </div>
        </div>
      </div>
    </div>
  );
}