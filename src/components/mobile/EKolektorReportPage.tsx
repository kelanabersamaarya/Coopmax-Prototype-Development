"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import EKolektorBottomNav from "@/components/mobile/EKolektorBottomNav";
import { cn } from "@/lib/utils";

type ReportTab = "setoran" | "penarikan" | "angsuran" | "realisasi";

type ReportEntry = {
  name: string;
  account: string;
  type: string;
  amount: string;
  date: string;
  time: string;
};

const entries: ReportEntry[] = [
  { name: "Emma Walker", account: "4260059", type: "Simpanan Sukarela", amount: "+Rp. 5.000,00", date: "22 Okt 2026", time: "13:44" },
  { name: "Surya Negara", account: "4260060", type: "Simpanan Sukarela", amount: "+Rp. 5.000,00", date: "21 Okt 2026", time: "15:50" },
  { name: "Emma Walker", account: "4260059", type: "Simpanan Sukarela", amount: "+Rp. 5.000,00", date: "22 Okt 2026", time: "13:44" },
  { name: "Surya Negara", account: "4260060", type: "Simpanan Sukarela", amount: "+Rp. 5.000,00", date: "21 Okt 2026", time: "15:50" },
];

const tabs: { id: ReportTab; label: string }[] = [
  { id: "setoran", label: "Setoran" },
  { id: "penarikan", label: "Penarikan" },
  { id: "angsuran", label: "Angsuran" },
  { id: "realisasi", label: "Realisasi" },
];

export default function EKolektorReportPage({
  onHome,
  onTransactions,
  onBack,
}: {
  onHome: () => void;
  onTransactions: () => void;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<ReportTab>("setoran");
  const [productOpen, setProductOpen] = React.useState(false);
  const [product, setProduct] = React.useState("Pilih Produk");
  const [showTotal, setShowTotal] = React.useState(false);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[243px] overflow-hidden bg-[#27afd4] px-[38px] pt-[7px] text-white">
          <div className="pointer-events-none absolute -right-[52px] -top-[62px] h-[190px] w-[280px] rounded-full bg-[#69c8e4]/55" />
          <div className="pointer-events-none absolute -right-[96px] top-[90px] h-[190px] w-[210px] rounded-full border-[25px] border-[#7bd1e8]/45" />
          <h1 className="relative text-[30px] font-extrabold leading-tight tracking-[-1px]">Laporan</h1>
          <div className="relative -mx-[38px] mt-[37px] flex gap-[18px] overflow-hidden px-[38px] pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "shrink-0 rounded-full px-[25px] py-[13px] text-[20px] font-extrabold leading-none transition",
                  activeTab === tab.id ? "bg-white text-[#2aaed3] shadow-sm" : "text-white hover:bg-white/10",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <main className="relative -mt-[1px] rounded-t-[34px] bg-white px-[36px] pb-8 pt-[39px] shadow-[0_-4px_18px_rgba(0,0,0,0.04)]">
          <div className="flex h-[80px] items-center rounded-[15px] bg-[#f1f1f1] px-[16px] text-[#364463]">
            <button type="button" className="flex min-w-0 flex-1 items-center justify-between text-left text-[17px] leading-[1.35]" onClick={() => setShowTotal(false)}>
              <span>28 Sep<br />2026</span><ChevronDown className="h-5 w-5 shrink-0 text-[#222]" />
            </button>
            <span className="mx-[11px] h-[62px] w-[2px] bg-[#c9c9c9]" />
            <button type="button" className="flex min-w-0 flex-1 items-center justify-between text-left text-[17px] leading-[1.35]" onClick={() => setShowTotal(false)}>
              <span>28 Okt<br />2026</span><ChevronDown className="h-5 w-5 shrink-0 text-[#222]" />
            </button>
          </div>

          <div className="mt-[45px] flex items-center gap-[19px]">
            <div className="relative min-w-0 flex-1">
              <button type="button" onClick={() => setProductOpen((open) => !open)} className="flex h-[96px] w-full items-center justify-between rounded-[15px] bg-[#f1f1f1] px-[19px] text-left text-[17px] text-[#929292]">
                <span className="truncate">{product}</span><ChevronDown className="h-6 w-6 shrink-0 text-[#858585]" />
              </button>
              {productOpen ? (
                <div className="absolute left-0 right-0 top-[99px] z-20 overflow-hidden rounded-[14px] border border-slate-100 bg-white shadow-lg">
                  {["Semua Produk", "Simpanan Sukarela", "Simpanan Wajib"].map((item) => (
                    <button key={item} type="button" className="block w-full px-4 py-3 text-left text-[15px] text-slate-700 hover:bg-slate-50" onClick={() => { setProduct(item); setProductOpen(false); }}>
                      {item}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button type="button" onClick={() => setShowTotal((visible) => !visible)} className="h-[72px] shrink-0 rounded-full bg-[#28afd4] px-[19px] text-[17px] font-medium text-white shadow-sm transition active:scale-[0.98]">Lihat Total &gt;</button>
          </div>

          {showTotal ? <div className="mt-3 rounded-xl bg-[#e9f8fc] px-4 py-3 text-center text-[15px] font-bold text-[#168eaf]">Total {activeTab}: Rp. 20.000,00</div> : null}

          <div className="mt-[35px] space-y-[38px]">
            {entries.map((entry, index) => (
              <article key={`${entry.account}-${index}`} className="relative min-h-[222px] overflow-hidden rounded-[25px] border border-[#e5e5e5] bg-white pl-[84px] pr-[16px] pt-[17px] shadow-[0_2px_5px_rgba(0,0,0,0.16)]">
                <div className="absolute left-0 top-0 flex h-[72px] w-[70px] items-center justify-center rounded-br-[25px] bg-[#303030] text-[28px] font-bold text-white">{index + 1}</div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 text-[18px] font-extrabold leading-[1.22] text-black">
                    <div>{entry.name}</div><div>{entry.account}</div>
                  </div>
                  <div className="shrink-0 text-right text-[18px] font-extrabold leading-[1.18] text-[#43ad58]">{entry.amount}</div>
                </div>
                <div className="mt-[10px] text-[16px] font-semibold leading-tight text-[#a1a1a1]">{entry.type}</div>
                <div className="absolute right-[16px] top-[68px] text-right text-[15px] font-semibold leading-[1.55] text-[#858585]">{entry.date}<br />{entry.time}</div>
                <button type="button" className="mt-[20px] rounded-full bg-[#f3bf2e] px-[25px] py-[11px] text-[15px] font-extrabold text-white">Belum Diverifikasi</button>
              </article>
            ))}
          </div>
        </main>
      </div>

      <EKolektorBottomNav activeTab="report" onHomeClick={onHome} onTransactionClick={onTransactions} onReportClick={() => {}} onAndroidBack={onBack} />
    </div>
  );
}
