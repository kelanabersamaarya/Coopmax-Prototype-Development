"use client";

export default function EKolektorRecipientInfo() {
  return (
    <div className="mb-7">
      <div className="text-[30px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
        Rekening Tujuan
      </div>

      <div className="mt-7 flex items-center gap-[40px]">
        <div className="grid h-[86px] w-[86px] shrink-0 place-items-center rounded-full bg-[#2CB4DC] text-[52px] font-normal leading-none text-white">
          L
        </div>

        <div className="min-w-0">
          <div className="text-[34px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
            Laura Patel
          </div>
          <div className="mt-4 text-[36px] font-extrabold leading-none tracking-tight text-[#243464]">
            7260175
          </div>
        </div>
      </div>
    </div>
  );
}