"use client";

import { useState } from "react";
import { ArrowLeft, Bell } from "lucide-react";

const transferNotifications = [
  {
    type: "Transfer In",
    amount: "Rp2.500.000",
    date: "20 Jul 2026",
    time: "11:49",
    status: "Berhasil",
  },
  {
    type: "Transfer Out Antar Bank",
    amount: "Rp750.000",
    date: "19 Jul 2026",
    time: "14:22",
    status: "Berhasil",
  },
  {
    type: "Transfer Out Antar Simpanan",
    amount: "Rp500.000",
    date: "18 Jul 2026",
    time: "09:15",
    status: "Berhasil",
  },
  {
    type: "Pembayaran Pinjaman",
    amount: "Rp991.666",
    date: "17 Jul 2026",
    time: "16:08",
    status: "Berhasil",
  },
  {
    type: "Transfer Out Antar Bank",
    amount: "Rp1.250.000",
    date: "14 Jul 2026",
    time: "10:18",
    status: "Gagal",
  },
];

const infoNotifications = [
  {
    type: "Spesial Harpelnas",
    date: "20 Jul 2026",
    time: "12:00",
    image: "/banner_sample.jpeg",
  },
];

export default function MBankingNotificationsPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"transfer" | "info">("transfer");

  return (
    <div className="flex h-full min-h-full flex-col overflow-y-auto bg-white text-[#23305A] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="px-6 pb-5 pt-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali ke halaman utama"
          className="grid h-10 w-10 place-items-center rounded-full text-[#004FC7] transition active:scale-90"
        >
          <ArrowLeft className="h-8 w-8" strokeWidth={2.2} />
        </button>
        <h1 className="mt-5 text-[24px] font-extrabold leading-tight text-[#004FC7]">
          Notifikasi
        </h1>
      </header>

      <main className="px-6 pb-12">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setActiveTab("transfer")}
            className={`rounded-full px-7 py-3 text-[16px] font-bold shadow-sm transition ${
              activeTab === "transfer"
                ? "bg-[#004FC7] text-white"
                : "text-[#004FC7]"
            }`}
          >
            Transfer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`rounded-full px-7 py-3 text-[16px] font-bold shadow-sm transition ${
              activeTab === "info"
                ? "bg-[#004FC7] text-white"
                : "text-[#004FC7]"
            }`}
          >
            Info
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          {activeTab === "transfer"
            ? transferNotifications.map((notification) => (
                <article
                  key={`${notification.type}-${notification.date}-${notification.time}`}
                  className="rounded-[20px] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(30,47,83,0.09)]"
                >
                  <div className="flex items-start gap-3">
                    <Bell className="mt-1 h-7 w-7 shrink-0 fill-[#004FC7] text-[#004FC7]" strokeWidth={1.8} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[16px] font-bold leading-tight text-[#23305A]">
                            {notification.type}
                          </p>
                          <p className="mt-1 text-[14px] font-semibold text-[#004FC7]">
                            {notification.amount}
                          </p>
                        </div>
                        <div className="shrink-0 text-right text-[13px] leading-[1.2] text-[#23305A]">
                          <p>{notification.date}</p>
                          <p>{notification.time}</p>
                          <p
                            className={`mt-1 font-bold ${
                              notification.status === "Gagal"
                                ? "text-[#DC2626]"
                                : "text-[#16A34A]"
                            }`}
                          >
                            {notification.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            : infoNotifications.map((notification) => (
                <article
                  key={`${notification.type}-${notification.date}-${notification.time}`}
                  className="rounded-[20px] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(30,47,83,0.09)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[16px] font-bold leading-tight text-[#23305A]">
                        {notification.type}
                      </p>
                      <img
                        src={notification.image}
                        alt={notification.type}
                        className="mt-3 w-full rounded-[12px] object-cover"
                      />
                    </div>
                    <div className="shrink-0 text-right text-[13px] leading-[1.2] text-[#23305A]">
                      <p>{notification.date}</p>
                      <p>{notification.time}</p>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </main>
    </div>
  );
}