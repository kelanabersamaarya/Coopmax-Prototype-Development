"use client";

import { toast } from "sonner";

const loanAccounts = [
  {
    productName: "LP Denda RP",
    customerName: "KORMANI",
    accountNo: "3259238260108",
    address: "Penatih",
  },
  {
    productName: "Pinjaman Billing",
    customerName: "LAURA PATEL",
    accountNo: "7260175",
    address: "Denpasar",
  },
  {
    productName: "Pinjaman Bulanan",
    customerName: "I KETUT AGUS PASEK JAYA ARTA",
    accountNo: "SMG260004",
    address: "Sidakarya",
  },
];

export default function EKolektorPinjamanInfo({
  onSelect,
}: {
  onSelect?: () => void;
}) {
  return (
    <div className="mt-[22px] grid w-full gap-[14px]">
      {loanAccounts.map((account) => (
        <div
          key={account.accountNo}
          className="relative h-[160px] w-full overflow-hidden rounded-[12px] bg-white shadow-[0_3px_12px_rgba(15,23,42,0.08)]"
        >
          <div className="flex h-full items-start gap-[16px] px-[18px] pb-[48px] pt-[14px]">
            <div className="grid h-[55px] w-[55px] shrink-0 place-items-center rounded-full bg-[#004FC7]">
              <span className="text-[14px] font-normal leading-none text-white">
                {account.customerName.charAt(0)}
              </span>
            </div>

            <div className="min-w-0 pt-[2px]">
              <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#172957]">
                {account.productName}
              </div>
              <div className="mt-[5px] truncate text-[14px] font-extrabold leading-tight tracking-tight text-[#172957]">
                {account.customerName}
              </div>
              <div className="mt-[5px] text-[14px] font-extrabold leading-tight tracking-tight text-[#172957]">
                {account.accountNo}
              </div>
              <div className="mt-[5px] text-[14px] font-normal leading-tight tracking-tight text-[#63809E]">
                {account.address}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onSelect) {
                onSelect();
                return;
              }

              toast("Pilih pinjaman (prototype)", {
                description: "Aksi tombol belum dihubungkan.",
              });
            }}
            className="absolute inset-x-0 bottom-0 h-[45px] bg-[#004FC7] text-[14px] font-semibold text-white transition active:bg-[#0046B3]"
          >
            Pilih
          </button>
        </div>
      ))}
    </div>
  );
}