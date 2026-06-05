"use client";

import { ChevronRight } from "lucide-react";

const informationItems = [
  {
    title: "Simpanan",
    subtitle: "Informasi simpanan anda",
  },
  {
    title: "Pinjaman",
    subtitle: "Informasi pinjaman anda",
  },
  {
    title: "Deposito",
    subtitle: "Informasi deposito anda",
  },
  {
    title: "Simpanan Wajib",
    subtitle: "Informasi simpanan wajib anda",
  },
  {
    title: "Simpanan Pokok",
    subtitle: "Informasi simpanan pokok anda",
  },
  {
    title: "Mutasi Rekening",
    subtitle: "Informasi mutasi rekening anda",
  },
  {
    title: "Mutasi Pinjaman",
    subtitle: "Informasi mutasi pinjaman anda",
  },
];

export default function MBankingInfoList() {
  return (
    <div className="px-6 pb-8 pt-7">
      <h2 className="text-[20px] font-extrabold leading-tight tracking-tight text-[#203064]">
        Daftar Informasi
      </h2>

      <div className="mt-5 grid gap-0">
        {informationItems.map((item) => (
          <button
            key={item.title}
            type="button"
            className="flex w-full items-center justify-between gap-4 border-b border-[#E8E8E8] py-4 text-left transition active:scale-[0.99]"
          >
            <div className="min-w-0">
              <div className="text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
                {item.title}
              </div>
              <div className="mt-0.5 text-[12px] font-normal leading-tight tracking-tight text-[#A2A2A2]">
                {item.subtitle}
              </div>
            </div>

            <ChevronRight
              className="h-5 w-5 shrink-0 text-[#203064]"
              strokeWidth={2.5}
            />
          </button>
        ))}
      </div>
    </div>
  );
}