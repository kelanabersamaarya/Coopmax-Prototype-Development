"use client";

import { ArrowDownToLine, ArrowUpFromLine, BadgeDollarSign } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EKolektorBottomNav from "@/components/mobile/EKolektorBottomNav";
import EKolektorTransactionHeader from "@/components/mobile/EKolektorTransactionHeader";

const transactionMenus = [
  {
    title: "Penarikan",
    description: "Catat transaksi penarikan anggota.",
    icon: ArrowUpFromLine,
    color: "bg-[#004FC7]",
  },
  {
    title: "Setoran",
    description: "Catat transaksi setoran simpanan.",
    icon: ArrowDownToLine,
    color: "bg-[#27B4DF]",
  },
  {
    title: "Angsuran Pinjaman",
    description: "Proses pembayaran angsuran pinjaman.",
    icon: BadgeDollarSign,
    color: "bg-[#39B54A]",
  },
];

export default function EKolektorTransactions({
  onBackHome,
}: {
  onBackHome: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#F4F4F4]">
      <EKolektorTransactionHeader onCancel={onBackHome} />

      <div className="min-h-0 flex-1 overflow-y-auto bg-[#F4F4F4] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="rounded-t-[32px] bg-[#F4F4F4] px-5 pb-7 pt-7">
          <div className="rounded-[15px] bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="text-[16px] font-extrabold leading-tight tracking-tight text-black">
              Pilih Jenis Transaksi
            </div>
            <div className="mt-1 text-[12px] font-normal leading-relaxed text-[#8A8A8A]">
              Gunakan menu berikut untuk memulai transaksi kolektor.
            </div>

            <div className="mt-5 grid gap-3">
              {transactionMenus.map((menu) => {
                const Icon = menu.icon;

                return (
                  <button
                    key={menu.title}
                    type="button"
                    onClick={() =>
                      toast(`${menu.title} (prototype)`, {
                        description: "Form transaksi akan dibuat pada tahap berikutnya.",
                      })
                    }
                    className={cn(
                      "flex min-h-[78px] w-full items-center gap-4 rounded-[13px] bg-white px-3 py-3 text-left",
                      "ring-1 ring-slate-200 transition active:scale-[0.99]",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full text-white shadow-sm",
                        menu.color,
                      )}
                    >
                      <Icon className="h-[24px] w-[24px]" strokeWidth={2.7} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-extrabold leading-tight tracking-tight text-black">
                        {menu.title}
                      </span>
                      <span className="mt-1 block text-[11px] font-normal leading-relaxed text-[#8A8A8A]">
                        {menu.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 rounded-[15px] bg-white p-4 shadow-[0_4px_18px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="text-[15px] font-extrabold leading-tight tracking-tight text-black">
              Riwayat Transaksi
            </div>
            <div className="mt-3 rounded-[11px] bg-[#F7F7F7] px-4 py-5 text-center text-[12px] font-normal leading-relaxed text-[#8E8E8E]">
              Belum ada transaksi yang dipilih.
            </div>
          </div>
        </div>
      </div>

      <EKolektorBottomNav
        activeTab="transaction"
        onHomeClick={onBackHome}
        onTransactionClick={() => {}}
        onReportClick={() =>
          toast("Laporan (prototype)", {
            description: "Menu laporan E-Kolektor belum dibuat.",
          })
        }
        onAndroidBack={onBackHome}
      />
    </div>
  );
}